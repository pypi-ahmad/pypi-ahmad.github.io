import React from "react";
import { screen, within } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { describe, expect, it } from "vitest";
import Education from "../pages/education/EducationComponent";
import { renderWithProviders, darkTheme } from "../test/testUtils";

expect.extend(toHaveNoViolations);

const expectedCertificates = [
  "Claude Certified Associate - Foundations",
  "Claude Code 101",
  "Building with the Claude API",
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

  it("features the professional certification before the thirteen course certificates", () => {
    const { container } = renderWithProviders(<Education theme={darkTheme} />);
    const professionalSection = container.querySelector("#professional-certification");
    const courseSection = container.querySelector("#certs");
    const certificateNames = Array.from(container.querySelectorAll(".cert-card__title"))
      .map(node => node.textContent);

    expect(certificateNames).toEqual(expectedCertificates);
    expect(professionalSection.querySelectorAll(".cert-card")).toHaveLength(1);
    expect(within(professionalSection).getByRole("heading", {
      level: 3,
      name: "Claude Certified Associate - Foundations",
    })).toBeInTheDocument();
    expect(courseSection.querySelectorAll(".cert-card")).toHaveLength(13);
    expect(within(courseSection).queryByText("Claude Certified Associate - Foundations"))
      .not.toBeInTheDocument();
    expect(within(courseSection).getByText(
      "13 course-completion certificates grouped by focus area for faster review."
    )).toBeInTheDocument();
  });

  it("groups credentials in recruiter-priority order", () => {
    const { container } = renderWithProviders(<Education theme={darkTheme} />);
    const categoryNames = Array.from(
      container.querySelectorAll(".certification-group-heading h3")
    ).map(node => node.textContent);

    expect(categoryNames).toEqual(expectedCategories);
  });

  it("shows Anthropic credential evidence separately from course certificates", () => {
    const { container } = renderWithProviders(<Education theme={darkTheme} />);
    const professionalSection = container.querySelector("#professional-certification");
    const anthropicGroup = container.querySelector(".certification-group");
    const professionalLinks = within(professionalSection).getAllByRole("link");
    const courseLinks = within(anthropicGroup).getAllByRole("link");

    expect(professionalLinks.map(link => link.getAttribute("href"))).toEqual([
      "https://www.credly.com/badges/d9eace76-da4e-447f-b38b-9c39ac6edf6d",
      "/certifications/anthropic-claude-certified-associate-foundations.pdf",
    ]);
    expect(courseLinks.map(link => link.getAttribute("href"))).toEqual([
      "https://verify.skilljar.com/c/uubk52krkzap",
      "/certifications/anthropic-claude-code-101.pdf",
      "https://verify.skilljar.com/c/2njdrsdeigc4",
      "/certifications/anthropic-claude-api.pdf",
      "https://verify.skilljar.com/c/b3ejcctoop7p",
      "/certifications/anthropic-claude-101.pdf",
      "https://verify.skilljar.com/c/suzvk58nwng2",
      "/certifications/anthropic-ai-fluency-framework-foundations.pdf",
    ]);
    for (const link of [...professionalLinks, ...courseLinks]) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
    expect(within(professionalSection).getByText("Verify credential")).toBeInTheDocument();
    expect(within(anthropicGroup).getAllByText("Verify credential")).toHaveLength(4);
    expect(within(professionalSection).getByText("Issued August 31, 2026")).toBeInTheDocument();
    const certifiedCard = professionalSection.querySelector(".cert-card");
    const badge = certifiedCard?.querySelector(".cert-card__badge");
    expect(badge).toHaveAttribute(
      "src",
      "/images/certifications/claude-certified-associate-foundations.png"
    );
    expect(badge).toHaveAttribute("alt", "");
    expect(within(anthropicGroup).getByText("Completed August 18, 2026")).toBeInTheDocument();
    expect(within(anthropicGroup).getByText("Completed July 6, 2026")).toBeInTheDocument();
    expect(within(anthropicGroup).getByText("Completed March 10, 2026")).toBeInTheDocument();
    expect(within(anthropicGroup).getByText("Completed March 11, 2026")).toBeInTheDocument();
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
