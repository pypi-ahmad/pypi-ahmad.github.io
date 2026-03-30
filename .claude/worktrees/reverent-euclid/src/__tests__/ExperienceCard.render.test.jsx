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
import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ExperienceCard from "../components/experienceCard/ExperienceCard";
import { renderWithProviders, darkTheme } from "../test/testUtils";

const mockExperience = {
  title: "GenAI Engineer",
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
  it("renders the job title", () => {
    renderWithProviders(
      <ExperienceCard experience={mockExperience} theme={darkTheme} />
    );
    expect(screen.getByText("GenAI Engineer")).toBeInTheDocument();
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
