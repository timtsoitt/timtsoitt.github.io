export const contentsHeadingDepths = [2, 3];

function mayContainLink(node) {
  return (
    (node.type === "element" && node.tagName === "a") ||
    node.type === "mdxJsxTextElement" ||
    node.type === "mdxTextExpression" ||
    (node.type === "raw" && /<a[\s>]/i.test(node.value)) ||
    node.children?.some(mayContainLink)
  );
}

export default {
  name: "article-heading-links",
  element: {
    filter: contentsHeadingDepths.map((depth) => `h${depth}`),
    visit(heading, ctx) {
      const { id } = heading.properties;
      if (
        typeof id !== "string" ||
        !id ||
        !ctx.fileURL?.pathname.includes("/src/content/articles/")
      )
        return;

      const marker = {
        type: "element",
        tagName: "span",
        properties: {
          className: ["article-heading-marker"],
          ariaHidden: "true",
        },
        children: [],
      };
      const link = {
        type: "element",
        tagName: "a",
        properties: {
          className: ["article-heading-link"],
          href: `#${encodeURIComponent(id)}`,
          title: "Link to this section",
        },
        children: [marker],
      };

      if (heading.children.some(mayContainLink)) {
        link.properties.ariaLabel = link.properties.title;
        ctx.appendChild(heading, link);
      } else {
        link.children.unshift(...heading.children);
        ctx.setField(heading, "children", [link]);
      }
    },
  },
};
