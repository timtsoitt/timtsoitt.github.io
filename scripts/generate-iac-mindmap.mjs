import { mkdir, readFile, writeFile } from "node:fs/promises";

const model = JSON.parse(
  await readFile(
    new URL("../src/data/iac-choices.json", import.meta.url),
    "utf8",
  ),
);
const nodes = new Map(model.nodes.map((node) => [node.id, node]));
const entryPoints = new Set(
  model.edges
    .filter(({ source }) => nodes.get(source).kind === "branch")
    .map(({ target }) => target),
);

const colors = {
  resources: {
    entry: "#e9f2e3",
    border: "#cbd6c1",
    line: "#627e53",
    ink: "#34492a",
    outcome: "#34582d",
  },
  clients: {
    entry: "#e8f0fe",
    border: "#cbd8ec",
    line: "#5378ad",
    ink: "#2a4b75",
    outcome: "#285799",
  },
  shared: {
    border: "#d8cfe4",
    line: "#76638c",
    ink: "#514065",
    outcome: "#584377",
  },
};

const wide = {
  file: "aws-iac-choices.svg",
  width: 1190,
  height: 464,
  panels: [
    { id: "own", tone: "resources", box: [16, 16, 533, 432] },
    { tone: "shared", box: [590, 16, 253, 432] },
    { id: "clients", tone: "clients", box: [861, 16, 313, 432] },
  ],
  boxes: {
    bootstrap: [42, 103, 208, 60],
    resources: [320, 103, 207, 60],
    where: [320, 217, 207, 60],
    lifecycle: [42, 217, 208, 60],
    stacksets: [611, 103, 211, 60],
    terraform: [611, 216, 211, 60],
    pulumi: [611, 304, 211, 60],
    controllers: [611, 378, 211, 60],
    client: [894, 103, 253, 60],
  },
  // Each connector lists its bends followed by the label's center, when shown.
  routes: {
    "bootstrap:resources": [
      [
        [250, 133],
        [320, 133],
      ],
      [285, 133],
    ],
    "bootstrap:stacksets": [
      [
        [146, 103],
        [146, 78],
        [717, 78],
        [717, 103],
      ],
      [285, 78],
    ],
    "resources:where": [
      [
        [424, 163],
        [424, 217],
      ],
      [424, 190],
    ],
    "resources:terraform": [
      [
        [491, 163],
        [491, 177],
        [653, 177],
        [653, 216],
      ],
      [512, 177],
    ],
    "where:lifecycle": [
      [
        [320, 247],
        [250, 247],
      ],
      [285, 247],
    ],
    "where:terraform": [
      [
        [527, 246],
        [611, 246],
      ],
      [570, 246],
    ],
    "lifecycle:controllers": [
      [
        [146, 277],
        [146, 408],
        [611, 408],
      ],
      [285, 408],
    ],
    "lifecycle:terraform": [
      [
        [222, 277],
        [222, 296],
        [669, 296],
        [669, 276],
      ],
      [415, 296],
    ],
    "client:pulumi": [
      [
        [1021, 163],
        [1021, 334],
        [822, 334],
      ],
      [1021, 246],
    ],
    "client:stacksets": [
      [
        [894, 133],
        [822, 133],
      ],
      [877, 133],
    ],
    "client:terraform": [
      [
        [850, 133],
        [850, 246],
        [822, 246],
      ],
    ],
  },
};

const compact = {
  file: "aws-iac-choices-compact.svg",
  width: 420,
  height: 622,
  panels: [
    { id: "clients", tone: "clients", box: [12, 12, 396, 130] },
    { id: "own", tone: "resources", box: [12, 156, 216, 454] },
    { tone: "shared", box: [254, 156, 154, 454] },
  ],
  boxes: {
    client: [28, 64, 205, 59],
    bootstrap: [28, 230, 190, 58],
    resources: [28, 326, 190, 58],
    where: [28, 434, 190, 58],
    lifecycle: [28, 530, 190, 58],
    pulumi: [266, 207, 122, 50],
    stacksets: [266, 272, 122, 56],
    terraform: [266, 426, 122, 64],
    controllers: [266, 530, 122, 64],
  },
  labels: {
    terraform: "OpenTofu /\nTerraform",
    controllers: "Resource\ncontrollers",
  },
  routes: {
    "client:pulumi": [
      [
        [233, 111],
        [375, 111],
        [375, 207],
      ],
      [303, 111],
    ],
    "client:stacksets": [
      [
        [233, 83],
        [397, 83],
        [397, 297],
        [388, 297],
      ],
      [303, 83],
    ],
    "client:terraform": [
      [
        [397, 297],
        [397, 458],
        [388, 458],
      ],
    ],
    "bootstrap:stacksets": [
      [
        [218, 259],
        [242, 259],
        [242, 293],
        [266, 293],
      ],
      [242, 276],
    ],
    "bootstrap:resources": [
      [
        [123, 288],
        [123, 326],
      ],
      [123, 307],
    ],
    "resources:where": [
      [
        [123, 384],
        [123, 434],
      ],
      [123, 409],
    ],
    "resources:terraform": [
      [
        [218, 355],
        [326, 355],
        [326, 426],
      ],
      [293, 355],
    ],
    "where:terraform": [
      [
        [218, 462],
        [266, 462],
      ],
      [241, 462],
    ],
    "where:lifecycle": [
      [
        [123, 492],
        [123, 530],
      ],
      [123, 511],
    ],
    "lifecycle:terraform": [
      [
        [218, 546],
        [242, 546],
        [242, 511],
        [328, 511],
        [328, 490],
      ],
      [328, 511],
    ],
    "lifecycle:controllers": [
      [
        [218, 569],
        [266, 569],
      ],
      [242, 569],
    ],
  },
};

const escape = (text) =>
  text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const card = ([x, y, width, height], fill, border, radius, borderWidth = 1) =>
  `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="${fill}" stroke="${border}" stroke-width="${borderWidth}"/>`;

function panel({ id, tone, box: [x, y, width, height] }, small) {
  const color = colors[tone];
  const label = id ? nodes.get(id).label.replaceAll("\n", " ") : "Outcomes";
  const inset = small ? 16 : 24;
  const baseline = y + (small ? 31 : 36);
  return [
    card([x, y, width, height], "#fffdfa", "#a7aa9d", 16, 2),
    `<rect x="${x + inset}" y="${baseline - 14}" width="4" height="16" rx="2" fill="${color.line}"/>`,
    `<text x="${x + inset + 13}" y="${baseline}" fill="${color.ink}" font-size="${small ? 16 : 20}" font-weight="700">${escape(label)}</text>`,
  ].join("");
}

function roundedPath(points) {
  const path = [`M${points[0].join(" ")}`];
  for (let index = 1; index < points.length - 1; index++) {
    const before = points[index - 1];
    const bend = points[index];
    const after = points[index + 1];
    const toBend = Math.hypot(bend[0] - before[0], bend[1] - before[1]);
    const fromBend = Math.hypot(after[0] - bend[0], after[1] - bend[1]);
    const radius = Math.min(12, toBend / 2, fromBend / 2);
    const start = bend.map(
      (value, axis) => value + ((before[axis] - value) * radius) / toBend,
    );
    const end = bend.map(
      (value, axis) => value + ((after[axis] - value) * radius) / fromBend,
    );
    path.push(`L${start.join(" ")} Q${bend.join(" ")} ${end.join(" ")}`);
  }
  path.push(`L${points.at(-1).join(" ")}`);
  return path.join(" ");
}

function choice(node, [x, y, width, height], label, small) {
  const outcome = node.kind === "outcome";
  const entry = entryPoints.has(node.id);
  const shared =
    outcome &&
    new Set(
      model.edges
        .filter((edge) => edge.target === node.id)
        .map((edge) => edge.branch),
    ).size > 1;
  const color = colors[shared ? "shared" : node.branch];
  const name = label ?? node.label;
  const lines = name.split("\n");
  const font = small ? (width < 150 ? 14 : 15) : 17;
  const center = x + width / 2;
  const lineHeight = font + 4;
  const baseline =
    y +
    height / 2 +
    font * 0.34 -
    ((lines.length - 1) * lineHeight) / 2 -
    (node.caption ? 7 : 0);
  const title = lines
    .map(
      (line, index) =>
        `<tspan x="${center}" dy="${index ? lineHeight : 0}">${escape(line)}</tspan>`,
    )
    .join("");
  return [
    card(
      [x, y, width, height],
      outcome ? color.outcome : entry ? color.entry : "#fdfdfa",
      entry ? color.line : color.border,
      11,
    ),
    entry ? card([x + 12, y - 9, 64, 18], color.ink, "none", 9) : "",
    entry
      ? `<text x="${x + 44}" y="${y + 4}" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">Start here</text>`
      : "",
    `<text x="${center}" y="${baseline}" text-anchor="middle" font-size="${font}" font-weight="${outcome || entry ? 700 : 600}" fill="${outcome ? "#fff" : "#283229"}">${title}</text>`,
    node.caption
      ? `<text x="${center}" y="${baseline + lines.length * lineHeight - 1}" text-anchor="middle" font-size="${small ? 11 : 12}" fill="#eef4ec">${escape(node.caption)}</text>`
      : "",
  ].join("");
}

function render(layout) {
  const small = layout === compact;
  const arrows = ["clients", "resources"]
    .map(
      (branch) =>
        `<marker id="arrow-${branch}" viewBox="0 0 10 10" markerWidth="9" markerHeight="9" refX="9" refY="5" orient="auto" markerUnits="userSpaceOnUse"><path d="M0 0 9 5 0 10Z" fill="${colors[branch].line}"/></marker>`,
    )
    .join("");
  const paths = [];
  const labels = [];
  for (const edge of model.edges) {
    if (nodes.get(edge.source).kind === "branch") continue;
    const [points, labelAt] = layout.routes[`${edge.source}:${edge.target}`];
    const color = colors[edge.branch];
    paths.push(
      `<path d="${roundedPath(points)}" fill="none" stroke="${color.line}" stroke-width="${small ? 1.7 : 2}" stroke-linecap="round" marker-end="url(#arrow-${edge.branch})"/>`,
    );
    if (labelAt && edge.label) {
      const [x, y] = labelAt;
      const font = small ? 11 : 12;
      const height = font + 9;
      const width = Math.ceil(edge.label.length * font * 0.54 + 12);
      labels.push(
        card(
          [x - width / 2, y - height / 2, width, height],
          "#fdfdfa",
          color.border,
          height / 2,
        ),
      );
      labels.push(
        `<text x="${x}" y="${y + font * 0.34}" text-anchor="middle" font-size="${font}" font-weight="600" fill="${color.ink}">${escape(edge.label)}</text>`,
      );
    }
  }

  const { width, height } = layout;
  const panels = layout.panels.map((item) => panel(item, small));
  const boxes = Object.entries(layout.boxes).map(([id, box]) =>
    choice(nodes.get(id), box, layout.labels?.[id], small),
  );
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc">`,
    '<title id="title">Choosing infrastructure as code for AWS</title>',
    '<desc id="desc">Decision paths for in-house and customer environments lead to four recommendations in the Outcomes panel. Purple marks the two used in both environments: CloudFormation StackSets and OpenTofu or Terraform.</desc>',
    `<defs>${arrows}</defs>`,
    '<rect width="100%" height="100%" fill="#fbfaf7"/>',
    '<g font-family="DM Sans, system-ui, sans-serif">',
    ...panels,
    ...paths,
    ...boxes,
    ...labels,
    "</g></svg>",
    "",
  ].join("\n");
}

const output = new URL("../public/diagrams/", import.meta.url);
await mkdir(output, { recursive: true });
for (const layout of [wide, compact]) {
  await writeFile(new URL(layout.file, output), render(layout));
  console.log(`Generated ${layout.file} (${layout.width} × ${layout.height}).`);
}
