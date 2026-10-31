import { defineConfig, devices } from "@playwright/test";

const channel = process.env.PW_CHANNEL || undefined;

export default defineConfig({
  testDir: "tests",
  reporter: process.env.CI ? "github" : "list",
  use: { baseURL: "http://127.0.0.1:4173" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], channel } },
    { name: "mobile", use: { ...devices["Pixel 7"], channel } },
  ],
  webServer: { command: "python -m http.server 4173 --bind 127.0.0.1", url: "http://127.0.0.1:4173/", reuseExistingServer: false },
});
