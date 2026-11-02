import { expect, test } from "@playwright/test";

test("home shows name, projects and working anchors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Mehedi Hasan Rahib");
  await expect(page.locator(".featured-project")).toHaveCount(2);
  await expect(page.locator(".minor-project")).toHaveCount(3);
  for (const img of await page.locator(".featured-project img").all()) {
    await img.scrollIntoViewIfNeeded();
    await expect(img).toHaveJSProperty("complete", true);
    expect(await img.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBeGreaterThan(0);
    expect(await img.getAttribute("alt")).not.toBe("");
  }
  await expect(page.locator(".featured-project").first().getByRole("link", { name: "Live demo" })).toHaveAttribute(
    "href",
    "https://sprung.mehedihasanrahib.de",
  );
  await expect(page.locator("#skills [data-use=work]").first()).toBeVisible();
  await expect(page.locator(".availability")).toContainText("2027");
  await expect(page).toHaveTitle(/Software developer, cloud and DevOps/);
  await expect(page.locator("#experience .timeline li")).toHaveCount(1);
  await expect(page.locator("#education .timeline li")).toHaveCount(3);
  await expect(page.locator("#education")).toContainText("Biotechnology studies, discontinued");
  await expect(page.locator("#education")).toContainText("Hochschule Niederrhein");
  await expect(page.locator("#education")).toContainText("Studienkolleg");
  await expect(page.locator("#education")).toContainText("Hochschule Anhalt");
  await expect(page.locator("#experience")).toContainText("Nov 2024 – 2027, ongoing");
  await expect(page.locator('a[href*="linkedin"]')).toHaveCount(0);
  const github = page.locator(".intro").getByRole("link", { name: "GitHub profile", exact: true });
  await expect(github).toHaveAttribute("href", "https://github.com/mehedi-hasan-2426");
  await expect(github).toHaveText("");
  await expect(github.locator("svg.icon")).toHaveAttribute("aria-hidden", "true");
  const box = await github.boundingBox();
  expect(box?.width ?? 0).toBeGreaterThanOrEqual(44);
  expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
  await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "About" }).click();
  await expect(page).toHaveURL(/#about$/);
  await expect(page.locator("#about")).toContainText("Before moving into IT, I studied biotechnology.");
  await expect(page.locator("#about")).toContainText("expected to finish in 2027");
  await expect(page.locator("#experience")).toContainText("Training in application development");
  for (const technology of [
    "Next.js",
    "React",
    "TypeScript",
    "GitHub Actions",
    "Elastic Stack",
    "SQLite",
    "Java",
    "Linux",
  ]) {
    await expect(
      page
        .locator("#skills .tags li")
        .filter({ hasText: new RegExp(`^${technology.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`) }),
    ).toBeVisible();
  }
  await expect(page.locator("#skills")).not.toContainText("TFLint");
  await expect(page.locator("#skills")).not.toContainText("Trivy");
  await expect(page.locator("#skills .legend")).toContainText("Professional experience");
  await expect(page.locator("#skills .legend")).toContainText("Projects and coursework");
  await expect(page.locator("#learning li")).toHaveCount(3);
  await page.locator(".intro").getByRole("link", { name: "Explore my projects" }).click();
  await expect(page).toHaveURL(/#work$/);
  await page.locator(".intro").getByRole("link", { name: "Let's connect" }).click();
  await expect(page).toHaveURL(/#contact$/);
  const og = await page.locator('meta[property="og:image"]').getAttribute("content");
  expect(og).toBe("https://mehedihasanrahib.de/og.jpg");
  for (const asset of ["/hero-bg.avif", "/hero-bg.webp", "/og.jpg"]) {
    expect((await page.request.get(asset)).ok()).toBe(true);
  }
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(1);
  expect(errors).toEqual([]);
});

test("GitHub tile hydrates from the prerendered Hono API without CSP errors", async ({ page }) => {
  const problems: string[] = [];
  page.on("console", (m) => {
    if (m.type() === "error") problems.push(m.text());
  });
  page.on("pageerror", (e) => problems.push(e.message));
  const api = await page.request.get("/api/github.json");
  expect(api.ok()).toBe(true);
  const data = await api.json();
  await page.goto("/");
  const tile = page.locator(".contact .github");
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

test("case study link opens the project page with architecture", async ({ page }) => {
  await page.goto("/");
  await page.locator('[data-project="sprungbrett-deutsch"]').getByRole("link", { name: "Case study" }).click();
  await expect(page).toHaveURL(/\/projects\/sprungbrett-deutsch\/?$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Sprungbrett Deutsch");
  await expect(page.getByRole("link", { name: "GitHub", exact: true })).toHaveAttribute(
    "href",
    /github\.com\/mehedi-hasan-2426\/sprungbrett-deutsch/,
  );
  await expect(page.getByRole("heading", { level: 2, name: "Architecture" })).toBeVisible();
  await expect(page).toHaveTitle("Sprungbrett Deutsch | Mehedi Hasan Rahib");
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
  for (const path of ["/", "/projects/patchpulse", "/nope"]) {
    await page.goto(path);
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
    await expect(page.getByRole("link", { name: "Skip to content" })).toBeInViewport();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("main")).toBeFocused();
  }
});
