import { getCollection } from 'astro:content';

export async function getArticles() {
  return (await getCollection('articles', ({ data }) => import.meta.env.DEV || !data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function formatDate(date: Date) {
  return date.toLocaleDateString('en', {
    year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC',
  });
}

export function readingTime(body = '') {
  return Math.max(1, Math.ceil(body.trim().split(/\s+/).length / 200));
}
