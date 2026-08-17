import React from "react";
import { screen, within } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { describe, expect, it } from "vitest";
import Education from "../pages/education/EducationComponent";
import { renderWithProviders, darkTheme } from "../test/testUtils";

expect.extend(toHaveNoViolations);

const expectedCertificates = [
  "Claude with the Anthropic API",
  "Claude 101",
  "AI Fluency: Framework & Foundations",
  "Machine Learning Specialization",
  "Advanced Learning Algorithms",
  "Supervised Machine Learning",
  "Unsupervised Learning & Recommenders",
  "Machine Learning A-Z™",
  "Deep Learning A-Z™",
  "Deep Learning A-Z™ Hands-On",
  "Data Science for Professionals",
  "SQL for Data Science",
];

const expectedCategories = [
  "Generative AI",
  "Machine Learning",
  "Deep Learning",
  "Data Science",
  "Data Engineering",
];

describe("Education page", () => {
  it("renders the recruiter-focused proof-sheet hero", () => {
    renderWithProviders(<Education theme={darkTheme} />);

    expect(screen.getByText("Education & credentials")).toBeInTheDocument();
    expect(screen.getByRole("heading", {
      level: 1,
      name: "Academic foundations for applied AI.",
    })).toBeInTheDocument();
  });

  it("renders both degrees in order", () => {
    const { container } = renderWithProviders(<Education theme={darkTheme} />);
    const degreeNames = Array.from(container.querySelectorAll(".degree-card h3"))
      .map(node => node.textContent);

    expect(degreeNames).toEqual([
      "M.Tech in Data Analytics and Decision Sciences",
      "B.Tech in Computer Science Engineering",
    ]);
  });

  it("renders all twelve certificates in portfolio order", () => {
    const { container } = renderWithProviders(<Education theme={darkTheme} />);
    const certificateNames = Array.from(container.querySelectorAll(".cert-card h4"))
      .map(node => node.textContent);

    expect(certificateNames).toEqual(expectedCertificates);
  });

  it("groups credentials in recruiter-priority order", () => {
    const { container } = renderWithProviders(<Education theme={darkTheme} />);
    const categoryNames = Array.from(
      container.querySelectorAll(".certification-group-heading h3")
    ).map(node => node.textContent);

    expect(categoryNames).toEqual(expectedCategories);
  });

  it("links Anthropic certificates only to descriptive local PDFs", () => {
    const { container } = renderWithProviders(<Education theme={darkTheme} />);
    const anthropicGroup = container.querySelector(".certification-group");
    const links = within(anthropicGroup).getAllByRole("link");

    expect(links).toHaveLength(3);
    expect(links.map(link => link.getAttribute("href"))).toEqual([
      "/certifications/anthropic-claude-api.pdf",
      "/certifications/anthropic-claude-101.pdf",
      "/certifications/anthropic-ai-fluency-framework-foundations.pdf",
    ]);
    for (const link of links) {
      expect(link).toHaveTextContent("View certificate PDF");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
    expect(within(anthropicGroup).queryByText("Verify credential")).not.toBeInTheDocument();
  });

  it("links education to applied project work", () => {
    renderWithProviders(<Education theme={darkTheme} />);
    expect(screen.getByRole("link", { name: "Explore projects" })).toHaveAttribute(
      "href",
      "/projects"
    );
  });

  it("has no automated accessibility violations", async () => {
    const { container } = renderWithProviders(<Education theme={darkTheme} />);
    const results = await axe(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(results).toHaveNoViolations();
  });
});
