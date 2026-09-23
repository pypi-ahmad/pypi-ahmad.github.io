import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { axe } from "jest-axe";
import FeaturedTools from "../components/FeaturedTools/FeaturedTools";
import { renderWithProviders } from "../test/testUtils";

describe("Featured document tools", () => {
  beforeEach(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    vi.spyOn(window, "matchMedia").mockImplementation(query => ({
      ...media,
      media: query,
      matches: query === "(prefers-reduced-motion: reduce)",
    }));
  });
  afterEach(() => vi.restoreAllMocks());
  it("shows separate features with release READMEs and interactive diagrams", async () => {
    const { container } = renderWithProviders(<FeaturedTools />);
    expect(screen.getAllByRole("article")).toHaveLength(2);
    for (const [name, id, version] of [["GroundMark", "groundmark", "v0.1.0"], ["DocLayout", "doclayout", "v2.1.0"]]) {
      const feature = within(screen.getByRole("article", { name }));
      expect(feature.getByRole("link", { name: `Read ${name} README` })).toHaveAttribute("href", `https://github.com/pypi-ahmad/${name}/blob/${version}/README.md`);
      expect(feature.getByRole("link", { name: `Read ${name} case study` })).toHaveAttribute("href", `/projects#${id}`);
      const diagram = feature.getByTitle(`${name}: System architecture (interactive)`);
      expect(diagram).toHaveAttribute("loading", "lazy");
      expect(feature.getByRole("link", { name: "Open System architecture in a new tab" })).toHaveAttribute("href", diagram.getAttribute("src"));
      expect(feature.getByText("Install and try")).toBeVisible();
    }
    expect(screen.getByRole("link", { name: "Explore DocLayout diagrams" })).toHaveAttribute("href", "/projects#doclayout");
    expect(screen.queryByRole("link", { name: "Explore GroundMark diagrams" })).not.toBeInTheDocument();
    for (const body of container.querySelectorAll(".featured-tool__body")) {
      expect((await axe(body)).violations).toEqual([]);
    }
  });

  it("copies the exact published installation and usage commands", async () => {
    const user = userEvent.setup();
    const write = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue();
    renderWithProviders(<FeaturedTools />);
    const commands = [
      ["GroundMark: Install with uv", 'uv tool install --python 3.14 "https://github.com/pypi-ahmad/GroundMark/releases/download/v0.1.0/groundmark-0.1.0-py3-none-any.whl"'],
      ["GroundMark: Open the browser app", "groundmark"],
      ["GroundMark: Or extract from the terminal", "groundmark input.pdf output --all"],
      ["DocLayout: Install the CLI with uv", 'uv tool install "git+https://github.com/pypi-ahmad/DocLayout.git@v2.1.0"'],
      ["DocLayout: Or install the CLI and browser app with uv", 'uv tool install "doclayout[gui] @ git+https://github.com/pypi-ahmad/DocLayout.git@v2.1.0"'],
      ["DocLayout: Use the CLI: export all formats", "doclayout input.pdf output --all"],
      ["DocLayout: Launch the browser app (requires the browser installation)", "doclayout_gui"],
    ];
    for (const [label, code] of commands) {
      const button = screen.getByRole("button", { name: `Copy ${label}` });
      expect(button.closest(".featured-tool__command").querySelector("code").textContent).toBe(code);
      await user.click(button);
      expect(write).toHaveBeenLastCalledWith(code);
    }
    expect(screen.getAllByText("Copied.")).toHaveLength(7);
    write.mockRestore();
  });

  it("keeps commands selectable and explains clipboard failure", async () => {
    const user = userEvent.setup();
    const write = vi.spyOn(navigator.clipboard, "writeText").mockRejectedValue(new Error("denied"));
    renderWithProviders(<FeaturedTools />);
    await user.click(screen.getByRole("button", { name: "Copy GroundMark: Open the browser app" }));
    expect(screen.getByText("Copy unavailable. Select and copy the command below.")).toBeVisible();
    expect(screen.getByText("groundmark", { selector: "code" })).toBeVisible();
    write.mockRestore();
  });
});
