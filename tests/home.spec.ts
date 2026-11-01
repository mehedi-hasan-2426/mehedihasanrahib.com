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
