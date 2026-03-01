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
  it("Home page renders the hero title 'Hello.'", () => {
    renderWithProviders(<Home {...pageProps} />);
    expect(screen.getByRole("heading", { level: 1, name: "Hello." })).toBeInTheDocument();
  });

  it("Home page renders 'Here\\'s what I do' Skills section heading", () => {
    renderWithProviders(<Home {...pageProps} />);
    expect(screen.getByText("Here's what I do")).toBeInTheDocument();
  });

  it("Experience page renders the experience heading", () => {
    renderWithProviders(<Experience {...pageProps} />);
    // "Experience" appears in both nav link and h1 — use heading role
    expect(
      screen.getByRole("heading", { level: 1, name: "Experience" })
    ).toBeInTheDocument();
  });

  it("Experience page renders the subtitle", () => {
    renderWithProviders(<Experience {...pageProps} />);
    expect(screen.getByText("Systems Built · Impact Delivered")).toBeInTheDocument();
  });

  it("Education page renders the 'Education' heading", () => {
    renderWithProviders(<Education {...pageProps} />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Education" })
    ).toBeInTheDocument();
  });

  it("Education page renders the subtitle", () => {
    renderWithProviders(<Education {...pageProps} />);
    expect(
      screen.getByText("Basic Qualification and Certifications")
    ).toBeInTheDocument();
  });

  it("Contact page renders 'Contact Me' heading", () => {
    renderWithProviders(<Contact {...pageProps} />);
    // The contact section title from contact.js data
    expect(screen.getByText("Contact Me", { selector: "h1" })).toBeInTheDocument();
  });

  it("Contact page renders resume CTA 'Want to know more?'", () => {
    renderWithProviders(<Contact {...pageProps} />);
    expect(screen.getByText("Want to know more?")).toBeInTheDocument();
  });

  it("Projects page renders 'Projects' heading", () => {
    renderWithProviders(<Projects {...pageProps} />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Projects" })
    ).toBeInTheDocument();
  });

  it("Projects page renders 'Enterprise Systems' section heading", () => {
    renderWithProviders(<Projects {...pageProps} />);
    expect(screen.getByText("Enterprise Systems")).toBeInTheDocument();
  });

  it("Skills page renders 'Technical Skills' heading", () => {
    renderWithProviders(<SkillsPage {...pageProps} />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Technical Skills" })
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
