import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://mehedihasanrahib.com",
  build: { inlineStylesheets: "never" },
  devToolbar: { enabled: false },
});
