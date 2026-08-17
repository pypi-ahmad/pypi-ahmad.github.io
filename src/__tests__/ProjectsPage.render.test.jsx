import React from "react";
import { screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { describe, expect, it } from "vitest";
import Projects from "../pages/projects/Projects";
import { renderWithProviders, darkTheme } from "../test/testUtils";

expect.extend(toHaveNoViolations);

const expectedNames = [
  "LoRA Fine-tune Studio",
  "Tool-Using Browser Agent",
  "Self-Improving Prompt Optimizer",
  "NL2SQL Agent",
  "Autonomous Coding Agent Crew",
  "Multi-Agent Debate Decision System",
  "Multi-Agent Research Assistant",
  "Local-First Knowledge Base Agent",
  "Intelligent Personal Finance Agent",
  "Document Intelligence Agent",
  "Autonomous Job Application Agent",
  "AutoTabML Studio",
  "Codebase Understanding Agent",
];

describe("Projects page", () => {
  it("renders the recruiter-focused hero", () => {
    renderWithProviders(<Projects theme={darkTheme} />);
    expect(screen.getByText("Open-source applied AI")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: "Projects" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View GitHub profile" })).toHaveAttribute(
      "href",
      "https://github.com/pypi-ahmad"
    );
  });

  it("renders all 13 projects once and in priority order", () => {
    const { container } = renderWithProviders(<Projects theme={darkTheme} />);
    const names = Array.from(
      container.querySelectorAll(".projects-section .project-card__name")
    ).map(node => node.textContent);

    expect(names).toEqual(expectedNames);
    expect(container.querySelectorAll(".projects-section .project-card")).toHaveLength(13);
  });

  it("marks only the first four cards as priority work", () => {
    const { container } = renderWithProviders(<Projects theme={darkTheme} />);
    const cards = Array.from(container.querySelectorAll(".project-card-wrap"));

    expect(cards.filter(card => card.dataset.priority === "true")).toHaveLength(4);
    expect(cards.slice(0, 4).every(card => card.dataset.priority === "true")).toBe(true);
    expect(cards.slice(4).every(card => card.dataset.priority === "false")).toBe(true);
  });

  it("uses explicit, safe repository links", () => {
    renderWithProviders(<Projects theme={darkTheme} />);
    const links = screen.getAllByRole("link", { name: /repository on GitHub$/ });

    expect(links).toHaveLength(13);
    expect(links[0]).toHaveAttribute(
      "href",
      "https://github.com/pypi-ahmad/lora-qlora-fine-tuning-app"
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
