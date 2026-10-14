import React from "react";
import { screen, within } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { describe, expect, it } from "vitest";
import Education from "../pages/education/EducationComponent";
import { renderWithProviders, darkTheme } from "../test/testUtils";

expect.extend(toHaveNoViolations);

const expectedCertificates = [
  "Claude Certified Architect - Professional",
  "Claude Certified Developer - Foundations",
  "Claude Certified Architect - Foundations",
  "Claude Certified Associate - Foundations",
  "Certified Partner Specialist Gemini Enterprise Deployment",
  "Accelerate Development with Antigravity",
  "Add Agents to Gemini Enterprise",
  "Deploy Gemini Enterprise with Workspace Data Sources and Model Armor",
  "Govern Agent Access with Gemini Enterprise Agent Platform",
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

const expectedProfessionalSkills = [
  "Claude Projects",
  "Knowledge Management",
  "Model Selection",
  "Output evaluation",
  "Prompt Engineering",
  "Responsible AI",
  "Troubleshooting",
  "Workflow Integration",
];

describe("Education page", () => {
  it("renders the recruiter-focused proof-sheet hero", () => {
    renderWithProviders(<Education theme={darkTheme} />);

    expect(screen.getByText("Education & credentials")).toBeInTheDocument();
    expect(screen.getByRole("heading", {
      level: 1,
      name: "Academic foundations for AI engineering.",
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

  it("features professional certifications and Google Cloud skill badges before the thirteen course certificates", () => {
    const { container } = renderWithProviders(<Education theme={darkTheme} />);
    const professionalSection = container.querySelector("#professional-certification");
    const skillBadgeSection = container.querySelector("#google-cloud-skill-badges");
    const courseSection = container.querySelector("#certs");
    const certificateNames = Array.from(container.querySelectorAll(".cert-card__title"))
      .map(node => node.textContent);

    expect(certificateNames).toEqual(expectedCertificates);
    expect(professionalSection.querySelectorAll(".cert-card")).toHaveLength(5);
    expect(within(professionalSection).getByRole("heading", {
      level: 3,
      name: "Claude Certified Architect - Professional",
    })).toBeInTheDocument();
    expect(within(professionalSection).getByRole("heading", {
      level: 3,
      name: "Claude Certified Developer - Foundations",
    })).toBeInTheDocument();
    expect(within(professionalSection).getByRole("heading", {
      level: 3,
      name: "Claude Certified Architect - Foundations",
    })).toBeInTheDocument();
    expect(within(professionalSection).getByRole("heading", {
      level: 3,
      name: "Claude Certified Associate - Foundations",
    })).toBeInTheDocument();
    expect(within(professionalSection).getByRole("heading", {
      level: 3,
      name: "Certified Partner Specialist Gemini Enterprise Deployment",
    })).toBeInTheDocument();
    expect(skillBadgeSection.querySelectorAll(".cert-card")).toHaveLength(4);
    expect(courseSection.querySelectorAll(".cert-card")).toHaveLength(13);
    expect(within(courseSection).queryByText("Claude Certified Architect - Foundations"))
      .not.toBeInTheDocument();
    expect(within(courseSection).queryByText("Certified Partner Specialist Gemini Enterprise Deployment"))
      .not.toBeInTheDocument();
    expect(within(courseSection).queryByText("Add Agents to Gemini Enterprise"))
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
      "https://www.credly.com/badges/1066c045-512c-4a32-b868-dfa7ac33ee6d",
      "/certifications/anthropic-claude-certified-architect-professional.pdf",
      "https://www.credly.com/badges/073148fd-db6b-40ac-9895-00de4e291cb3",
      "/certifications/anthropic-claude-certified-developer-foundations.pdf",
      "https://www.credly.com/badges/d524da8d-1bb9-46b0-8844-c6f162a52dbd",
      "/certifications/anthropic-claude-certified-architect-foundations.pdf",
      "https://www.credly.com/badges/d9eace76-da4e-447f-b38b-9c39ac6edf6d",
      "/certifications/anthropic-claude-certified-associate-foundations.pdf",
      "https://www.credly.com/go/M2oOGTmo",
      "/certifications/google-cloud-certified-partner-specialist-gemini-enterprise-deployment.pdf",
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
    expect(within(professionalSection).getAllByText("Verify credential")).toHaveLength(5);
    expect(within(anthropicGroup).getAllByText("Verify credential")).toHaveLength(4);
    const architectCard = within(professionalSection).getByRole("heading", {
      name: "Claude Certified Architect - Foundations",
    }).closest("article");
    const associateCard = within(professionalSection).getByRole("heading", {
      name: "Claude Certified Associate - Foundations",
    }).closest("article");
    expect(within(architectCard).getByText("Issued September 30, 2026")).toBeInTheDocument();
    const architectBadge = architectCard.querySelector(".cert-card__badge");
    expect(architectBadge).toHaveAttribute(
      "src",
      "/images/certifications/claude-certified-architect-foundations.png"
    );
    expect(architectBadge).toHaveAttribute("alt", "");
    expect(within(associateCard).getByText("Issued August 31, 2026")).toBeInTheDocument();
    const skills = within(associateCard).getByRole("list", {
      name: "Credential skills",
    });
    expect(within(skills).getAllByRole("listitem").map(item => item.textContent))
      .toEqual(expectedProfessionalSkills);
    const badge = associateCard.querySelector(".cert-card__badge");
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

  it("shows Google Cloud credential evidence separately from course certificates", () => {
    const { container } = renderWithProviders(<Education theme={darkTheme} />);
    const professionalSection = container.querySelector("#professional-certification");
    const skillBadgeSection = container.querySelector("#google-cloud-skill-badges");
    const partnerCard = within(professionalSection).getByRole("heading", {
      name: "Certified Partner Specialist Gemini Enterprise Deployment",
    }).closest("article");
    const antigravityCard = within(skillBadgeSection).getByRole("heading", {
      name: "Accelerate Development with Antigravity",
    }).closest("article");

    expect(within(partnerCard).getByText("Issued October 7, 2026")).toBeInTheDocument();
    expect(partnerCard.querySelector(".cert-card__badge")).toHaveAttribute(
      "src",
      "/images/certifications/certified-partner-specialist-gemini-enterprise-deployment.png"
    );
    expect(within(partnerCard).getByRole("link", { name: /Verify credential/ })).toHaveAttribute(
      "href",
      "https://www.credly.com/go/M2oOGTmo"
    );
    expect(within(partnerCard).getByRole("link", { name: /View certificate PDF/ })).toHaveAttribute(
      "href",
      "/certifications/google-cloud-certified-partner-specialist-gemini-enterprise-deployment.pdf"
    );
    expect(within(skillBadgeSection).getAllByText("Issued October 7, 2026")).toHaveLength(4);
    expect(within(antigravityCard).getByRole("link", { name: /Verify credential/ })).toHaveAttribute(
      "href",
      "https://www.credly.com/go/YJPt5FVS"
    );
    expect(within(skillBadgeSection).getAllByRole("link").map(link => link.getAttribute("href"))).toEqual([
      "https://www.credly.com/go/YJPt5FVS",
      "/certifications/google-cloud-accelerate-development-with-antigravity.pdf",
      "https://www.credly.com/go/YXb6QduW",
      "/certifications/google-cloud-add-agents-to-gemini-enterprise.pdf",
      "https://www.credly.com/go/5gmsHXlG",
      "/certifications/google-cloud-deploy-gemini-enterprise-with-workspace-data-sources-and-model-armor.pdf",
      "https://www.credly.com/go/5pRqk9Wk",
      "/certifications/google-cloud-govern-agent-access-with-gemini-enterprise-agent-platform.pdf",
    ]);
  });

  it("links education to applied project work", () => {
    renderWithProviders(<Education theme={darkTheme} />);
    expect(screen.getByRole("link", { name: "View projects" })).toHaveAttribute(
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
