# Tim’s notebook

A personal profile and technical blog built with Astro, TypeScript, and CSS.
Write articles in Markdown, with optional MDX for custom components.

## Local development

Use Node.js 24 (see `.nvmrc`).

```sh
npm install
npm run dev
```

Open the local URL printed in your terminal. Astro reloads as you edit.

```sh
npm run check   # Check TypeScript and Astro components
npm run build   # Generate the static site in dist/
npm run preview # Preview the production build
```

## Write an article

Add a file such as `src/content/articles/my-first-article.md`:

```markdown
---
title: "My first technical article"
description: "A short explanation of what readers will learn."
date: 2026-11-16
tags: [Git, Tutorials]
draft: false
---

## The problem

Write your article here using Markdown.
```

The filename becomes the URL: `/articles/my-first-article/`.
Nested folders work too. Draft articles (`draft: true`) are excluded from the
website, article lists, and RSS. Future dates do not schedule publication;
use the draft flag to keep unfinished articles private.

Headings generate a table of contents. Fenced code blocks support syntax
highlighting; include a language such as `bash`, `python`, or `typescript`.
Put images in `public/images/` and use `![Alt text](/images/example.png)`.
Use `.mdx` when you want to import components in an article.

No sample articles are published. Copy `templates/article.md` into
`src/content/articles/` to start writing; set `draft: false` when ready.

## Customize

- `src/site.ts`: site name, description, and GitHub link.
- `src/pages/index.astro`: profile introduction and homepage.
- `src/styles/global.css`: colors, typography, and responsive layouts.
- `src/layouts/Base.astro`: navigation, metadata, and footer.
- `astro.config.mjs`: public URL and Astro integrations.
- `public/robots.txt`: sitemap URL (update if changing domains).

Typography uses Google Fonts with system fallbacks. Articles require no
client-side JavaScript. RSS is available at `/rss.xml`.

## GitHub Pages

In the repository’s **Settings → Pages → Build and deployment**, set the source
to **GitHub Actions**. `.github/workflows/deploy.yml` checks and builds pull
requests, then deploys pushes to `main`.

The URL is `https://timtsoitt.github.io`. This user Pages repository doesn’t
need a repository-name base path. Local edits do not deploy the website;
publishing requires committing and pushing the changes.

## Optional pre-commit hooks

```sh
pre-commit install
```

The existing repository hooks remain available for YAML and Markdown checks.
