import React from "react";
import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Architecture from "../components/Architecture/Architecture";
import Experience from "../pages/experience/Experience";
import { architectures } from "../data/architectures";
import { renderWithProviders, darkTheme } from "../test/testUtils";

describe("Professional architecture summaries", () => {
  it("renders three systems with links to their actual Experience headings", () => {
    const { unmount } = renderWithProviders(<Architecture theme={darkTheme} />);
    expect(screen.getAllByRole("article")).toHaveLength(3);
    for (const system of architectures) {
      expect(screen.getByRole("link", { name: `Read ${system.title} engineering story` })).toHaveAttribute("href", `/experience#${system.id}`);
    }
    unmount();
    const { container } = renderWithProviders(<Experience theme={darkTheme} />);
    for (const system of architectures) {
      const heading = container.querySelector(`#${system.id}`);
      expect(heading).toHaveAttribute("tabindex", "-1");
      expect(heading).toHaveAttribute("data-case-study-heading");
    }
  });

  it("keeps the prior-auth order and retry policy distinct", () => {
    expect(architectures[0].paths[0].steps).toEqual([
      "Fax documents", "Type and urgency classification", "Eligible authorization documents", "Azure Content Understanding Markdown", "Grouped Azure OpenAI extraction", "Validation and business rules", "Structured output or review outcome",
    ]);
    expect(architectures[0].notes.join(" ")).toMatch(/117 fields across seven related groups/);
    expect(architectures[0].notes.join(" ")).toMatch(/individual passes are not shown/);
  });

  it("converges the two computer-use context paths without inventing a loop", () => {
    expect(architectures[1].paths.map(path => path.steps)).toEqual([
      ["Milvus retrieval", "Reranking", "Retrieved context"],
      ["Playwright MCP", "Accessibility-tree snapshots and compressed-vision context"],
    ]);
    expect(architectures[1].convergence).toBe("Agent reasoning");
  });

  it("keeps CLU beside FastAPI and out of the Functions offload path", () => {
    renderWithProviders(<Architecture theme={darkTheme} />);
    const warranty = within(screen.getByRole("article", { name: "Warranty classification and NLP processing" }));
    expect(within(warranty.getByRole("list", { name: "NLP call from FastAPI" })).getByText("Azure CLU")).toBeInTheDocument();
    const offload = warranty.getByRole("list", { name: "Separate processing offload from FastAPI" });
    expect(within(offload).queryByText("Azure CLU")).not.toBeInTheDocument();
    expect(within(offload).getAllByRole("listitem").map(node => node.textContent.replace("↓", ""))).toEqual([
      "Azure Blob Storage", "Azure Functions", "Validation, transformation, and persistence",
    ]);
  });
});
