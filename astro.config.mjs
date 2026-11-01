import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://mehedihasanrahib.de",
  output: "static",
  adapter: vercel(),
  integrations: [react(), mdx(), sitemap()],
  markdown: { syntaxHighlight: false },
  vite: { plugins: [tailwindcss()] },
  build: { inlineStylesheets: "never" },
  security: { csp: true },
  devToolbar: { enabled: false },
});
