/**
 * Accessibility Tests
 *
 * Two layers:
 *  1. Structural WCAG checks — semantic HTML, ARIA attributes, roles
 *  2. axe-core automated scan — catches a11y violations (WCAG 2.1 AA)
 *
 * Sources: All page/component files audited in Phase 4.
 */
import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { axe, toHaveNoViolations } from "jest-axe";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Greeting from "../containers/greeting/Greeting";
import ExperienceCard from "../components/experienceCard/ExperienceCard";
import ThemePage from "../pages/theme/ThemePage";
import { renderWithProviders, darkTheme } from "../test/testUtils";

// Extend expect with axe matchers
expect.extend(toHaveNoViolations);

// ────────────────────────────────────────────────────────
// Structural Accessibility Checks
// ────────────────────────────────────────────────────────
describe("Accessibility — Semantic HTML & ARIA", () => {
  it("Header uses a <header> element", () => {
    renderWithProviders(<Header />);
    expect(document.querySelector("header")).toBeInTheDocument();
  });

  it("Theme toggle button has an aria-label", async () => {
    renderWithProviders(<Header />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Toggle navigation menu" }));
    const btn = screen.getByRole("button", { name: "Toggle Theme" });
    expect(btn).toHaveAttribute("aria-label", "Toggle Theme");
  });

  it("Theme family selector has an accessible name on the Theme page", () => {
    renderWithProviders(<ThemePage />, { initialEntries: ["/theme"] });
    const selector = screen.getByRole("combobox", { name: "Theme Family" });
    expect(selector).toBeInTheDocument();
  });

  it("Navigation links are accessible (rendered as <a> tags)", async () => {
    renderWithProviders(<Header />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Toggle navigation menu" }));
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThanOrEqual(8);
  });

  it("Footer heart emoji has role='img' and aria-label='love'", () => {
    renderWithProviders(<Footer theme={darkTheme} />);
    const heart = screen.getByRole("img", { name: "love" });
    expect(heart).toBeInTheDocument();
  });

  it("Greeting hero section has an h1 heading", () => {
    renderWithProviders(<Greeting theme={darkTheme} />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toBeInTheDocument();
    expect(h1).toHaveTextContent("Hello.");
  });

  it("Greeting hero bullets render as a <ul> with <li> items", () => {
    renderWithProviders(<Greeting theme={darkTheme} />);
    const list = document.querySelector("ul.hero-bullets");
    expect(list).toBeInTheDocument();
    const items = list.querySelectorAll("li");
    expect(items.length).toBe(4);
  });

  it("Resume link has rel='noopener noreferrer' for security", () => {
    renderWithProviders(<Greeting theme={darkTheme} />);
    const resumeLink = screen.getByText("Download Resume").closest("a");
    expect(resumeLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("Cover Letter link has target='_blank'", () => {
    renderWithProviders(<Greeting theme={darkTheme} />);
    const coverLink = screen.getByText("View Cover Letter").closest("a");
    expect(coverLink).toHaveAttribute("target", "_blank");
  });

  it("ExperienceCard company link has proper href", () => {
    renderWithProviders(
      <ExperienceCard
        experience={{
          title: "Engineer",
          company: "TestCo",
          companyUrl: "https://example.com",
          logoPath: "logo.svg",
          duration: "2024",
          location: "City",
          descriptions: ["Description"],
          color: "#000",
        }}
        theme={darkTheme}
      />
    );
    const link = screen.getByText("TestCo").closest("a");
    expect(link).toHaveAttribute("href", "https://example.com");
  });
});

// ────────────────────────────────────────────────────────
// axe-core Automated Scans
// ────────────────────────────────────────────────────────
describe("Accessibility — axe-core Scans", () => {
  it("Header has no critical accessibility violations", async () => {
    const { container } = renderWithProviders(<Header />);
    const results = await axe(container, {
      rules: {
        // Disable rules that fire on partials (no full page structure)
        region: { enabled: false },
        "page-has-heading-one": { enabled: false },
        // Disable color contrast since jsdom doesn't compute styles
        "color-contrast": { enabled: false },
      },
    });
    expect(results).toHaveNoViolations();
  });

  it("Footer has no critical accessibility violations", async () => {
    const { container } = renderWithProviders(<Footer theme={darkTheme} />);
    const results = await axe(container, {
      rules: {
        region: { enabled: false },
        "page-has-heading-one": { enabled: false },
        "color-contrast": { enabled: false },
      },
    });
    expect(results).toHaveNoViolations();
  });

  it("Greeting section has no critical accessibility violations", async () => {
    const { container } = renderWithProviders(
      <Greeting theme={darkTheme} />
    );
    const results = await axe(container, {
      rules: {
        region: { enabled: false },
        "color-contrast": { enabled: false },
      },
    });
    expect(results).toHaveNoViolations();
  });
});
