import { expect, test } from "@playwright/test";

test("home shows name, projects and working anchors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Mehedi Hasan Rahib");
  await expect(page.locator("#work article")).toHaveCount(5);
  await expect(page.locator(".timeline li")).toHaveCount(2);
  await expect(page.locator('a[href*="linkedin"]')).toHaveCount(0);
  await page.getByRole("link", { name: "See my work" }).click();
  await expect(page).toHaveURL(/#work$/);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  expect(errors).toEqual([]);
});

test("GitHub tile hydrates from the prerendered Hono API without CSP errors", async ({ page }) => {
  const problems: string[] = [];
  page.on("console", (m) => { if (m.type() === "error") problems.push(m.text()); });
  page.on("pageerror", (e) => problems.push(e.message));
  const api = await page.request.get("/api/github.json");
  expect(api.ok()).toBe(true);
  const data = await api.json();
  await page.goto("/");
  const tile = page.locator(".tile.github");
  await tile.scrollIntoViewIfNeeded();
  if (typeof data.publicRepos === "number") {
    await expect(tile.getByTestId("repo-count")).toHaveText(String(data.publicRepos));
  } else {
    await expect(tile).toContainText("public on GitHub");
  }
  expect(problems).toEqual([]);
});

test("MDX project page renders its sections and sitemap lists it", async ({ page }) => {
  await page.goto("/projects/patchpulse");
  for (const name of ["Why", "What I built", "How it is checked"]) {
    await expect(page.getByRole("heading", { level: 2, name })).toBeVisible();
  }
  const sitemap = await (await page.request.get("/sitemap-0.xml")).text();
  expect(sitemap).toContain("https://mehedihasanrahib.de/projects/patchpulse/");
});

test("project card opens its detail page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Sprungbrett Deutsch" }).click();
  await expect(page).toHaveURL(/\/projects\/sprungbrett-deutsch\/?$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Sprungbrett Deutsch");
  await expect(page.getByRole("link", { name: "View source" })).toHaveAttribute("href", /github\.com\/mehedi-hasan-2426\/sprungbrett-deutsch/);
});

test("unknown page shows 404", async ({ page }) => {
  const response = await page.goto("/nope");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Page not found");
});

test("external links are https", async ({ page }) => {
  await page.goto("/");
  const hrefs = await page.locator('a[href^="http"]').evaluateAll((as) => as.map((a) => a.getAttribute("href") ?? ""));
  expect(hrefs.length).toBeGreaterThan(0);
  for (const href of hrefs) expect(href).toMatch(/^https:\/\//);
});

test("skip link and focus are visible from the keyboard", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeInViewport();
});
