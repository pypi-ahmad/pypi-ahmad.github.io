import React from "react";
import { screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { describe, expect, it } from "vitest";
import Projects from "../pages/projects/Projects";
import FeaturedProjects from "../containers/FeaturedProjects/FeaturedProjects";
import FeaturedTools from "../components/FeaturedTools/FeaturedTools";
import { caseStudies } from "../data/caseStudies";
import { renderWithProviders, darkTheme } from "../test/testUtils";

expect.extend(toHaveNoViolations);

const expectedNames = [
  "Tool-Using Browser Agent",
  "NL2SQL Agent",
  "Autonomous Coding Agent Crew",
  "Multi-Agent Debate Decision System",
  "Multi-Agent Research Assistant",
  "Local-First Knowledge Base Agent",
  "Intelligent Personal Finance Agent",
  "Autonomous Job Application Agent",
  "AutoTabML Studio",
  "Codebase Understanding Agent",
];

describe("Projects page", () => {
  it("connects all seven Home previews to accessible full case studies", () => {
    const { unmount } = renderWithProviders(<><FeaturedTools /><FeaturedProjects theme={darkTheme} /></>);
    expect(caseStudies).toHaveLength(7);
    for (const study of caseStudies) {
      const link = screen.getByRole("link", { name: `Read ${study.name} case study` });
      expect(link).toHaveAttribute("href", `/projects#${study.id}`);
      expect(link).not.toHaveAttribute("target");
    }
    unmount();
    renderWithProviders(<Projects theme={darkTheme} />);
    for (const study of caseStudies) {
      expect(screen.getByRole("article", { name: study.name })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: study.name })).toHaveAttribute("id", study.id);
    }
    expect(caseStudies[0].repositories).toHaveLength(8);
  });
  it("renders the recruiter-focused hero", () => {
    renderWithProviders(<Projects theme={darkTheme} />);
    expect(screen.getByText("Independent tools and research")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: "Projects" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View GitHub profile" })).toHaveAttribute(
      "href",
      "https://github.com/pypi-ahmad"
    );
  });

  it("renders ten additional projects without duplicating case studies", () => {
    const { container } = renderWithProviders(<Projects theme={darkTheme} />);
    const names = Array.from(
      container.querySelectorAll(".projects-section .project-card__name")
    ).map(node => node.textContent);

    expect(names).toEqual(expectedNames);
    expect(container.querySelectorAll(".projects-section .project-card")).toHaveLength(10);
  });

  it("keeps additional repository cards visually secondary", () => {
    const { container } = renderWithProviders(<Projects theme={darkTheme} />);
    const cards = Array.from(container.querySelectorAll(".project-card-wrap"));

    expect(cards.every(card => card.dataset.priority === "false")).toBe(true);
  });

  it("uses explicit, safe repository links", () => {
    renderWithProviders(<Projects theme={darkTheme} />);
    const links = screen.getAllByRole("link", { name: /repository on GitHub$/ });

    expect(links).toHaveLength(10);
    expect(links[0]).toHaveAttribute(
      "href",
      "https://github.com/pypi-ahmad/tool-using-browser-agent"
    );
    for (const link of links) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("removes the old illustration and duplicate GitHub footer action", () => {
    const { container } = renderWithProviders(<Projects theme={darkTheme} />);
    expect(container.querySelector(".projects-heading-img-div")).not.toBeInTheDocument();
    expect(screen.queryByText("More Projects on GitHub")).not.toBeInTheDocument();
  });

  it("has no automated accessibility violations", async () => {
    const { container } = renderWithProviders(<Projects theme={darkTheme} />);
    const results = await axe(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(results).toHaveNoViolations();
  });
});
