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
Nested folders work too. Draft articles (`draft: true`) are visible locally with
`npm run dev`, but excluded from the production website, article lists, and RSS.
Anyone with access to the repository can still read the draft Markdown.
Future dates do not schedule publication.

Headings generate a table of contents. Fenced code blocks support syntax
highlighting; include a language such as `bash`, `python`, or `typescript`.
Put images in `public/images/` and use `![Alt text](/images/example.png)`.
Use `.mdx` when you want to import components in an article.

No sample articles are published. Copy `templates/article.md` into
`src/content/articles/` to start writing; set `draft: false` when ready.

## Customize

- `src/site.ts`: site name, description, and LinkedIn link.
- `src/pages/index.astro`: profile introduction and homepage.
- `src/styles/global.css`: colors, typography, and responsive layouts.
- `src/layouts/Base.astro`: navigation, metadata, and footer.
- `astro.config.mjs`: public URL and Astro integrations.
- `public/robots.txt`: sitemap URL (update if changing domains).

Typography uses Google Fonts with system fallbacks. Article content works without
client-side JavaScript. RSS is available at `/rss.xml`.

## View counts

[GoatCounter](https://timtsoitt.goatcounter.com/) supplies the public count in
each article's metadata. There is no site-wide footer total. Enable **Allow adding
visitor counts on your website** in GoatCounter's site settings to expose the
counts, while keeping the dashboard private. This setting allows public access
to page counts; it does not publish the referrer report.

Counts stay hidden until the service responds, including when JavaScript is
disabled, the service is unavailable, or a blocker prevents it from loading.
GoatCounter counts visits rather than every reload, and public counts can be
cached for up to four hours. A newly tracked article may stay hidden until its
count becomes available. Counts are maintained by GoatCounter, not this repository.

## Private analytics

[GoatCounter](https://timtsoitt.goatcounter.com/) collects visits and referring
sites for the owner's dashboard. Its script loads only in production on the
hostname configured in `astro.config.mjs`, excluding local previews. No analytics
dashboard or referrer data is embedded in the website. Keep GoatCounter's dashboard
visibility set to private in its account settings.

Tracking begins after deployment and can be blocked by visitors' browsers or
extensions. Some visits have no available referrer.

## GitHub Pages

In the repository’s **Settings → Pages → Build and deployment**, set the source
to **GitHub Actions**. `.github/workflows/deploy.yml` checks and builds pull
requests, then deploys pushes to `main`.

The URL is `https://timtsoitt.github.io`. This user Pages repository doesn’t
need a repository-name base path. Local edits do not deploy the website;
publishing requires committing and pushing the changes.

## Optional pre-commit hooks

Run `npm install` to install Prettier and its Astro plugin. Install
[pre-commit](https://pre-commit.com/#install), then enable the hooks:

```sh
pre-commit install
```

The repository hooks check YAML and JSON syntax, merge-conflict markers, trailing
whitespace (preserving Markdown hard breaks), file endings, and files over 1 MiB.
Kingfisher scans staged changes for secrets, with live credential validation disabled
and secret values redacted in its output. Its official `kingfisher-auto` hook
downloads and caches the binary on first use; no manual Kingfisher installation
or Docker is required. The initial download requires network access.

Prettier checks formatting of supported staged files, including Astro components,
without rewriting them. Run `npm run format` to format the project or
`npm run format:check` to check it. To format just one file, use
`npx prettier --write src/pages/index.astro`.
CI runs formatting, Astro checks, and the production build.
