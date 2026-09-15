import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import FdePage from "../pages/fde/FdePage";
import { fdePageData } from "../data/fde";
import { skillsPageData } from "../data/skills";
import { experience } from "../data/experience";
import { caseStudies } from "../data/caseStudies";
import { renderWithProviders, darkTheme } from "../test/testUtils";

describe("FDE foundations and learning", () => {
  it("shows nine evidence-backed capabilities without completion claims", () => {
    renderWithProviders(<FdePage theme={darkTheme} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(fdePageData.title);
    expect(screen.getAllByRole("article")).toHaveLength(9);
    expect(screen.getByText(/not completed FDE milestones/)).toBeInTheDocument();
    expect(screen.getAllByText("Professional experience", { exact: true })).toHaveLength(8);
    expect(screen.getByText("Personal project", { exact: true })).toBeInTheDocument();
    const valid = new Set([
      ...experience.sections[0].experiences[0].projectGroups.map(group => `/experience#${group.id}`),
      "/experience#warranty-processing",
      ...caseStudies.map(study => `/projects#${study.id}`),
    ]);
    for (const foundation of fdePageData.foundations) {
      const card = within(screen.getByRole("article", { name: foundation.title }));
      expect(card.getByText(foundation.description)).toBeInTheDocument();
      for (const link of foundation.links) {
        expect(valid.has(link.href)).toBe(true);
        expect(card.getByRole("link", { name: link.label })).toHaveAttribute("href", link.href);
      }
    }
  });

  it("reuses the learning titles without duplicating the full Skills toolkit", () => {
    renderWithProviders(<FdePage theme={darkTheme} />);
    const learning = within(screen.getByRole("region", { name: "Learning direction" }));
    expect(learning.getAllByRole("listitem").map(node => node.textContent)).toEqual(skillsPageData.learning.map(area => area.title));
    expect(learning.getByText(/do not represent production expertise/)).toBeInTheDocument();
    expect(learning.queryByText("DeepEval", { exact: true })).not.toBeInTheDocument();
    expect(learning.getByRole("link", { name: "Explore my skills and learning" })).toHaveAttribute("href", "/skills");
    expect(learning.getByRole("link", { name: "Contact me" })).toHaveAttribute("href", "/contact");
  });

  it("registers FDE in static hosting output and the sitemap", () => {
    const manifest = JSON.parse(readFileSync("package.json", "utf8"));
    expect(manifest.scripts.build).toContain("'fde'");
    expect(readFileSync("public/sitemap.xml", "utf8")).toContain("<loc>https://pypi-ahmad.github.io/fde</loc>");
  });
});
