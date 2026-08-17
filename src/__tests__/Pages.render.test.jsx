/**
 * Page Rendering Smoke Tests
 *
 * Each page component (Home, Experience, Education, Contact, Projects, Skills)
 * is rendered with providers to verify it mounts without crashing and displays
 * its primary heading.
 *
 * Sources: src/pages/home/HomeComponent.jsx, src/pages/experience/Experience.jsx,
 *          src/pages/education/EducationComponent.jsx, src/pages/contact/ContactComponent.jsx,
 *          src/pages/projects/Projects.jsx, src/pages/skills/SkillsPage.jsx
 */
import React from "react";
import { screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { renderWithProviders, darkTheme } from "../test/testUtils";

import Home from "../pages/home/HomeComponent.jsx";
import Experience from "../pages/experience/Experience.jsx";
import Education from "../pages/education/EducationComponent.jsx";
import Contact from "../pages/contact/ContactComponent.jsx";
import Projects from "../pages/projects/Projects.jsx";
import SkillsPage from "../pages/skills/SkillsPage.jsx";

const pageProps = { theme: darkTheme, setTheme: vi.fn() };

describe("Page Rendering Smoke Tests", () => {
  it("Home page renders the applied AI hero", () => {
    renderWithProviders(<Home {...pageProps} />);
    expect(screen.getByRole("heading", {
      level: 1,
      name: "I build applied AI systems and test whether they work.",
    })).toBeInTheDocument();
  });

  it("Home page renders the working method", () => {
    renderWithProviders(<Home {...pageProps} />);
    expect(screen.getByRole("heading", { level: 2, name: "How I work" })).toBeInTheDocument();
  });

  it("Experience page renders the experience heading", () => {
    renderWithProviders(<Experience {...pageProps} />);
    // "Experience" appears in both nav link and h1 — use heading role
    expect(
      screen.getByRole("heading", { level: 1, name: "Building and evaluating applied AI systems." })
    ).toBeInTheDocument();
  });

  it("Experience page renders grouped Deloitte context and outcomes", () => {
    renderWithProviders(<Experience {...pageProps} />);
    expect(screen.getByRole("heading", { name: "Team system context" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "My contributions" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Qualified outcomes" })).toBeInTheDocument();
  });

  it("Experience page uses the current Deloitte role and confidentiality boundary", () => {
    renderWithProviders(<Experience {...pageProps} />);
    expect(screen.getByText("AI and Data Science Engineer")).toBeInTheDocument();
    expect(screen.getByText(/team and system results from confidential employer evaluations/i)).toBeInTheDocument();
  });

  it("Education page renders the applied-AI education heading", () => {
    renderWithProviders(<Education {...pageProps} />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Academic foundations for applied AI.",
      })
    ).toBeInTheDocument();
  });

  it("Education page renders the credential positioning", () => {
    renderWithProviders(<Education {...pageProps} />);
    expect(screen.getByText("Education & credentials")).toBeInTheDocument();
    expect(screen.getByText("Professional certifications")).toBeInTheDocument();
  });

  it("Contact page renders its contact-first hero", () => {
    renderWithProviders(<Contact {...pageProps} />);
    // The contact section title from contact.js data
    expect(screen.getByRole("heading", { level: 1, name: "Let’s build useful AI systems." })).toBeInTheDocument();
  });

  it("Contact page renders email and résumé actions", () => {
    renderWithProviders(<Contact {...pageProps} />);
    expect(screen.getByRole("link", { name: "Email me" })).toHaveAttribute("href", "mailto:ahmad.iiitk@gmail.com");
    expect(screen.getByRole("link", { name: "Download résumé" })).toHaveAttribute("href", "/Resume.pdf");
  });

  it("Contact page removes the featured open-source section", () => {
    renderWithProviders(<Contact {...pageProps} />);
    expect(screen.queryByText("Featured Open Source")).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /LoRA Fine-tune Studio/ })).not.toBeInTheDocument();
  });

  it("Projects page renders 'Projects' heading", () => {
    renderWithProviders(<Projects {...pageProps} />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Projects" })
    ).toBeInTheDocument();
  });

  it("Projects page renders the recent-projects section", () => {
    renderWithProviders(<Projects {...pageProps} />);
    expect(screen.getByRole("heading", { level: 2, name: "Recent projects" })).toBeInTheDocument();
  });

  it("Home page renders the top four featured projects", () => {
    renderWithProviders(<Home {...pageProps} />);
    expect(screen.getByRole("heading", { level: 2, name: "Selected work" })).toBeInTheDocument();
    expect(screen.getByText("LoRA Fine-tune Studio")).toBeInTheDocument();
    expect(screen.getByText("NL2SQL Agent")).toBeInTheDocument();
    expect(screen.queryByText("Autonomous Coding Agent Crew")).not.toBeInTheDocument();
  });

  it("Skills page renders the reliable-systems heading", () => {
    renderWithProviders(<SkillsPage {...pageProps} />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Skills for reliable AI systems." })
    ).toBeInTheDocument();
  });

  it("Every page renders the Footer with attribution", () => {
    // Test with Home page — Footer is a child component
    renderWithProviders(<Home {...pageProps} />);
    expect(screen.getByText(/Made with/)).toBeInTheDocument();
  });

  it("Every page renders the Header with logo", () => {
    renderWithProviders(<Home {...pageProps} />);
    expect(screen.getByText("ahmad.m()")).toBeInTheDocument();
  });
});
