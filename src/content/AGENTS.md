# Article guidelines

Apply these rules to Markdown and MDX articles under `src/content/articles/` and
to the code and assets that render them. Adapt the structure and level of
detail to each article’s topic, purpose, and audience.

## Editing scope

- Read the current passage and the surrounding argument. Treat the author’s
  latest edits, terminology, and naming choices as intentional.
- For grammar or spelling, fix only the affected wording. For a rewrite or
  reorganisation, improve the flow and cut repetition. Preserve the argument,
  degree of certainty, examples, and technical distinctions.
- Use context to resolve ambiguity. Ask a focused question if the intended
  meaning is unclear and choosing an interpretation would change the claim.
  Verify any technical correction that changes the argument and explain it in
  the final response.
- For a review or consistency check, report concrete issues. When asked to fix
  them, edit each confirmed issue in scope and verify the result.

## Voice and structure

- Write as an engineer explaining decisions and consequences to other engineers.
  Use first person for the author’s experience and opinions. Keep direct claims
  direct, and preserve deliberate criticism, humour, analogies, and profanity.
  Avoid filler such as “I think” and strings of “I’d” where they dilute the point.
- Use plain, idiomatic language. Focus code-quality criticism on the code people
  produce.
- Open with the problem, decision, or experience that frames the article. Keep
  descriptions brief and high-level. Introduce a diagram with the context needed
  to read it, and let the diagram show the decision paths.
- Keep related details in the same paragraph. Connect the cause, what happens,
  and why it matters. Use lists for steps or parallel cases, and tables for
  mappings. Give the closing paragraph a purpose beyond repeating the summary.
- Use descriptive headings. Use `##` for main sections, `###` for cases, and
  `####` for narrower examples. Keep siblings at the same level.

## Technical content

- Preserve the explanation when making the prose shorter. Keep the sequence of
  operations, responsibility, permission scope, lifecycle, and failure handling
  wherever those details explain the recommendation.
- Keep the author’s architecture and actors when elaborating. Distinguish
  firsthand work, recommendations, and hypothetical examples. Label shortened or
  illustrative output. Keep fields, counts, and comments consistent with the
  explanation. Use the same resource and change in side-by-side comparisons.
- Verify specific external behaviour with primary documentation as needed. Use
  descriptive links close to the claims they support. Keep opinions in the
  author’s voice and use sources for factual claims that need support.

## Presentation

- Keep text-only passages full width. Reuse `code-example-text` on the left and
  `code-example-code` on the right for paired explanations and snippets. They
  stack on mobile. Place the heading above the pair.
- Use padding and a divider to separate panel explanations from the snippets.
  Put each `code-example-label` directly above its code block and useful captions
  below it. Reserve callouts for intentional asides. Give every card and callout
  a visible, descriptive heading. A descriptive disclosure title counts as the
  heading.
- Preserve frontmatter, links, diagrams, code, data attributes, and interactions
  when editing prose. Give body permalinks only to headings in “On this page”.
  Match their fragment targets and preserve any links inside those headings.
- Keep diagram labels parallel and consistent with the prose and alt text.
  Leave room for arrowheads and keep labels clear of panel borders. For edits to
  the AWS decision diagram, update its source and regenerate both SVGs with
  `npm run diagram:iac`.

## Verification

- Compare the diff with the author’s request and reread the changed passage in
  context. Check for lost details, duplicated arguments, and inconsistent terms,
  spelling, examples, or decision paths.
- Run `npm run format:check` for prose changes. For changes to heading structure,
  code blocks, layout markup, or diagrams, also run `npm run check` and
  `npm run build`.
- For layout changes, inspect desktop and mobile renders. Check that
  explanations are visibly paired with their examples, diagram arrows and labels
  are readable, and table-of-contents links reach their headings. Report what you
  verified and any check you could not complete.
