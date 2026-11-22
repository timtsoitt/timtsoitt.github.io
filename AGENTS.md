# Repository guidelines

This repository is an Astro site. For changes to article content or presentation,
follow the [article guidelines](src/content/AGENTS.md).

## Working tree

- Read the current files before editing. Preserve manual changes and naming
  choices, and keep edits scoped to the request.
- When reviewing uncommitted work, inspect staged, unstaged, and untracked changes.

## Checks

- Run `npm run format:check` for source or documentation changes.
- Run `npm run check` and `npm run build` for changes to site code or configuration.

## Commits and pull requests

- Include only staged changes in a commit. Stage additional changes only when the
  user explicitly asks.
- If GPG signing fails, stop and ask before continuing. Keep signing enabled.
- Use the pull request template in `.github/` when one exists. When pushing to a
  branch with an open pull request, review its description and update it if the
  new changes make it inaccurate or incomplete.
