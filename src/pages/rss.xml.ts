import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getArticles } from "../lib/articles";
import { site } from "../site";

export async function GET(context: APIContext) {
  return rss({
    title: site.title,
    description: site.description,
    site: context.site!,
    items: (await getArticles()).map(({ id, data }) => ({
      title: data.title,
      description: data.description,
      pubDate: data.date,
      link: `/articles/${id}/`,
    })),
  });
}
