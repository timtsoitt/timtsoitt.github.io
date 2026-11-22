import { defineConfig } from "astro/config";
import { satteri, satteriHeadingIdsPlugin } from "@astrojs/markdown-satteri";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import articleHeadingLinks from "./scripts/article-heading-links.mjs";

export default defineConfig({
  site: "https://timtsoitt.github.io",
  trailingSlash: "always",
  integrations: [mdx(), sitemap()],
  markdown: {
    processor: satteri({
      hastPlugins: [satteriHeadingIdsPlugin(), articleHeadingLinks],
    }),
    shikiConfig: { theme: "github-dark" },
  },
});
