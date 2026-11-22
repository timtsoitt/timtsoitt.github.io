document.querySelectorAll<HTMLElement>("[data-iac-tree]").forEach((tree) => {
  const controls = tree.querySelector<HTMLElement>("[data-iac-controls]");
  const status = tree.querySelector<HTMLElement>("[data-iac-status]");
  const announcement = tree.querySelector<HTMLElement>(
    "[data-iac-announcement]",
  );
  const buttons = tree.querySelectorAll<HTMLButtonElement>("[data-iac-filter]");
  const reset = tree.querySelector<HTMLButtonElement>("[data-iac-reset]");
  if (!controls || !status || !announcement) return;

  const tools = Array.from(
    tree.querySelectorAll<HTMLElement>("[data-iac-traits]"),
    (element) => ({
      element,
      name: element.querySelector("strong")?.textContent?.trim() ?? "",
      traits: element.dataset.iacTraits?.split(/\s+/) ?? [],
    }),
  );

  const filters = Array.from(buttons, (button) => ({
    button,
    trait: button.dataset.iacFilter ?? "",
    label: button.textContent?.trim() ?? "",
    selected: false,
  }));

  const render = () => {
    const active = filters.filter((filter) => filter.selected);
    const matches: string[] = [];
    tools.forEach(({ element, name, traits }) => {
      const matched =
        active.length > 0 &&
        active.every((filter) => traits.includes(filter.trait));
      element.classList.toggle("iac-tree-match", matched);
      if (matched) matches.push(name);
    });
    filters.forEach(({ button, selected }) => {
      button.setAttribute("aria-pressed", String(selected));
    });
    const summary = active.length
      ? `${matches.length} tools highlighted · ${active.map((filter) => filter.label).join(" + ")}`
      : "Select a characteristic to highlight matching tools.";
    status.textContent = summary;
    announcement.textContent = matches.length
      ? `${summary}. The matching tools are ${matches.join(", ")}.`
      : summary;
  };

  filters.forEach((filter) => {
    filter.button.addEventListener("click", () => {
      filter.selected = !filter.selected;
      render();
    });
  });
  reset?.addEventListener("click", () => {
    filters.forEach((filter) => {
      filter.selected = false;
    });
    render();
  });
  render();
  controls.hidden = false;
});
