import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SkillsPage from "../pages/skills/SkillsPage";
import { skillsPageData } from "../data/skills";
import { homePageData } from "../data/homePage";
import { experience } from "../data/experience";
import { caseStudies } from "../data/caseStudies";
import { renderWithProviders, darkTheme } from "../test/testUtils";

describe("Skills with context", () => {
  it("orders sections and presents the lifecycle as a cross-project overview", () => {
    renderWithProviders(<SkillsPage theme={darkTheme} />);
    expect(within(screen.getByRole("main")).getAllByRole("heading", { level: 2 }).map(node => node.textContent)).toEqual([
      "Core capabilities", "Tools in context", "Evidence in practice", "AI system lifecycle", "Currently exploring", "See the skills in working systems.",
    ]);
    const lifecycle = within(screen.getByRole("region", { name: "AI system lifecycle" }));
    expect(lifecycle.getAllByRole("listitem").map(node => node.textContent)).toEqual([
      "Data", "Retrieval", "Model", "Agent", "State", "API", "Deployment", "Evaluation", "Observability", "Iteration",
    ]);
    expect(lifecycle.getByText(/across my projects, rather than in one shared architecture/i)).toBeInTheDocument();
  });

  it("renders every retained tool with context and a resolvable evidence destination", () => {
    renderWithProviders(<SkillsPage theme={darkTheme} />);
    const stories = new Set([
      ...experience.sections[0].experiences[0].projectGroups.map(group => group.id),
      "warranty-processing",
    ]);
    for (const group of skillsPageData.toolGroups) {
      const card = within(screen.getByRole("article", { name: group.title }));
      expect(card.getByText(group.description)).toBeInTheDocument();
      for (const example of group.examples) {
        expect(card.getByText(example.context)).toBeInTheDocument();
        expect(card.getByRole("link", { name: example.label })).toHaveAttribute("href", example.href);
        const tools = within(card.getByRole("list", { name: `${example.label} tools` }));
        expect(tools.getAllByRole("listitem").map(node => node.textContent)).toEqual(example.tools);
        if (example.href.startsWith("/experience#")) expect(stories.has(example.href.split("#")[1])).toBe(true);
        else if (example.href.startsWith("/projects#")) expect(caseStudies.some(study => study.id === example.href.split("#")[1])).toBe(true);
        else expect(example.href === "/experience" || example.href.startsWith("https://github.com/pypi-ahmad/")).toBe(true);
      }
    }
    const personal = within(screen.getByRole("article", { name: "Personal projects" }));
    expect(personal.getByText("Chroma")).toBeInTheDocument();
    expect(personal.getByRole("link", { name: "Chroma implementation" })).toHaveAttribute("href", "https://github.com/pypi-ahmad/google-okf-implementation");
  });

  it("keeps seven learning areas distinct from demonstrated experience", () => {
    renderWithProviders(<SkillsPage theme={darkTheme} />);
    const learning = within(screen.getByRole("region", { name: "Currently exploring" }));
    expect(learning.getByText(/as I learn forward-deployed engineering/)).toHaveTextContent(/learning interests, not production expertise/);
    expect(learning.getAllByRole("article")).toHaveLength(7);
    for (const area of skillsPageData.learning) {
      const card = within(learning.getByRole("article", { name: area.title }));
      expect(card.getAllByRole("listitem").map(node => node.textContent)).toEqual(area.topics);
    }
    expect(learning.getAllByText("LangGraph + MCP")).toHaveLength(1);
    expect(within(screen.getByRole("article", { name: "Professional delivery" })).getByText("LangGraph")).toBeInTheDocument();
    expect(within(screen.getByRole("article", { name: "Personal projects" })).getByText("Ollama")).toBeInTheDocument();
  });

  it("preserves capabilities, qualified outcomes, public projects, and contact actions", () => {
    const { container } = renderWithProviders(<SkillsPage theme={darkTheme} />);
    expect(container.querySelectorAll(".capability-card")).toHaveLength(5);
    expect(container.querySelectorAll(".skills-outcome-grid > li")).toHaveLength(5);
    expect(container.querySelectorAll(".skills-proof-grid .project-card")).toHaveLength(4);
    const evidence = within(screen.getByRole("region", { name: "Evidence in practice" }));
    for (const outcome of homePageData.outcomes) expect(evidence.getByText(outcome.context)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View projects" })).toHaveAttribute("href", "/projects");
    expect(screen.getByRole("link", { name: "Contact me" })).toHaveAttribute("href", "/contact");
  });
});
