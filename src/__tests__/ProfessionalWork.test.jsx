import React from "react";
import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProfessionalWork, { MetricsStrip } from "../components/ProfessionalWork/ProfessionalWork";
import Home from "../pages/home/HomeComponent";
import { homeMetrics, featuredProfessionalProjects } from "../data/homePage";
import { renderWithProviders, darkTheme } from "../test/testUtils";

describe("Home professional evidence", () => {
  it("keeps all four metric qualifications visible and links to the right stories", () => {
    renderWithProviders(<MetricsStrip theme={darkTheme} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
    for (const metric of homeMetrics) {
      expect(screen.getByText(metric.value)).toBeInTheDocument();
      expect(screen.getByText(metric.context)).toBeInTheDocument();
      expect(screen.getByRole("link", { name: `${metric.label}: ${metric.value}. Read the project story.` })).toHaveAttribute("href", metric.href);
    }
    expect(screen.getByText(/Reported team and system results/)).toBeInTheDocument();
  });

  it("renders three professional summaries with labelled personal contributions", () => {
    renderWithProviders(<ProfessionalWork theme={darkTheme} />);
    expect(screen.getAllByRole("article")).toHaveLength(3);
    for (const project of featuredProfessionalProjects) {
      const card = within(screen.getByRole("article", { name: project.title }));
      expect(card.getByRole("heading", { name: "My contribution" })).toBeInTheDocument();
      expect(card.getByText(project.company)).toBeInTheDocument();
      expect(card.getByRole("link")).toHaveAttribute("href", `/experience#${project.id}`);
    }
    expect(screen.getByRole("link", { name: "View all professional work" })).toHaveAttribute("href", "/experience");
  });

  it("orders professional evidence before architecture and keeps all personal previews", () => {
    const { container } = renderWithProviders(<Home theme={darkTheme} />);
    const main = container.querySelector("main");
    expect(Array.from(main.children).slice(0, 6).map(node => node.id || node.className)).toEqual([
      "greeting", "professional-work", "selected-work", "metrics-section", "architecture", "career-section",
    ]);
    expect(container.querySelectorAll("#greeting .outcome-card")).toHaveLength(0);
    expect(container.querySelectorAll("#selected-work .project-card")).toHaveLength(5);
    expect(screen.getByRole("heading", { name: "Personal projects & experiments" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View projects" })).toHaveAttribute("href", "/projects");
  });
});
