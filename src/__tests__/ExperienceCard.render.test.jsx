/**
 * ExperienceCard — UI Rendering Tests
 *
 * Verifies the ExperienceCard component renders job details
 * (title, company, duration, location, descriptions).
 *
 * Source: src/components/experienceCard/ExperienceCard.jsx
 * Data:   src/data/experience.js
 */
import React from "react";
import { screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ExperienceCard from "../components/experienceCard/ExperienceCard";
import { renderWithProviders, darkTheme } from "../test/testUtils";
import { experience } from "../data/experience";

const mockExperience = {
  title: "AI and Data Science Engineer",
  company: "Deloitte",
  companyUrl: "https://www2.deloitte.com/",
  logoPath: "deloitte_logo.svg",
  duration: "July 2025 – Present",
  location: "Gurugram, India",
  descriptions: [
    "Built a high-precision Intelligent Document Processing (IDP) system.",
    "Improved extraction accuracy from ~90% to ~99%.",
  ],
  color: "#000000",
};

describe("ExperienceCard — UI Rendering", () => {
  it("keeps each Deloitte metric and subproject within its own group", () => {
    const { container } = renderWithProviders(
      <ExperienceCard experience={experience.sections[0].experiences[0]} theme={darkTheme} />
    );
    const groups = Array.from(container.querySelectorAll(".experience-project-group"));
    expect(groups).toHaveLength(4);
    expect(groups.map(group => group.querySelector("h4").textContent)).toEqual([
      "Prior-authorization document processing",
      "Healthcare integrity and fraud analytics",
      "Computer-use and multi-agent reasoning",
      "Policy-entity extraction",
    ]);
    const metrics = groups.map(group => Array.from(group.querySelectorAll(".experience-outcomes strong"), node => node.textContent));
    expect(metrics).toEqual([["95%+", "80–81% to 92%+"], [], ["38% to 80%", "~40% lower"], ["90% to 99%"]]);
    expect(screen.getByRole("region", { name: "Prior-authorization document processing Reported results" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Computer-use and multi-agent reasoning Reported results" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Policy-entity extraction Reported results" })).toBeInTheDocument();
    const integrity = within(groups[1]);
    for (const name of ["Document integrity and fraud detection", "Out-of-network claims analytics", "Referral-pattern analytics"]) {
      expect(integrity.getByRole("heading", { name, level: 5 })).toBeInTheDocument();
    }
    expect(integrity.getByText(/seven-agent/).closest("section")).toHaveTextContent("Document integrity and fraud detection");
    expect(integrity.queryByText(/prototype|production/i)).not.toBeInTheDocument();
    expect(screen.getAllByText("Scope note")).toHaveLength(1);
    const labelledSections = container.querySelectorAll("section[aria-labelledby]");
    expect(new Set(Array.from(labelledSections, node => node.getAttribute("aria-labelledby"))).size).toBe(labelledSections.length);
  });
  it("renders the job title", () => {
    renderWithProviders(
      <ExperienceCard experience={mockExperience} theme={darkTheme} />
    );
    expect(screen.getByText("AI and Data Science Engineer")).toBeInTheDocument();
  });

  it("renders the company name as a link", () => {
    renderWithProviders(
      <ExperienceCard experience={mockExperience} theme={darkTheme} />
    );
    const companyLink = screen.getByText("Deloitte");
    expect(companyLink.closest("a")).toHaveAttribute(
      "href",
      "https://www2.deloitte.com/"
    );
  });

  it("renders the duration text", () => {
    renderWithProviders(
      <ExperienceCard experience={mockExperience} theme={darkTheme} />
    );
    expect(screen.getByText("July 2025 – Present")).toBeInTheDocument();
  });

  it("renders the location text", () => {
    renderWithProviders(
      <ExperienceCard experience={mockExperience} theme={darkTheme} />
    );
    expect(screen.getByText("Gurugram, India")).toBeInTheDocument();
  });

  it("renders description bullet points", () => {
    renderWithProviders(
      <ExperienceCard experience={mockExperience} theme={darkTheme} />
    );
    expect(
      screen.getByText(/high-precision Intelligent Document Processing/)
    ).toBeInTheDocument();
    expect(screen.getByText(/extraction accuracy from ~90%/)).toBeInTheDocument();
  });
});
