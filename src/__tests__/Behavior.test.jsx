/**
 * Component Behavior Tests
 *
 * Verifies theme persistence, Greeting CTAs, and ExperienceAccordion behavior.
 *
 * Sources:
 *  - src/components/header/Header.jsx     (theme toggle)
 *  - src/containers/greeting/Greeting.jsx  (CTA buttons)
 *  - src/containers/experienceAccordion/ExperienceAccordion.jsx (accordion)
 */
import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach } from "vitest";
import Header from "../components/header/Header";
import Greeting from "../containers/greeting/Greeting";
import ExperienceAccordion from "../containers/experienceAccordion/ExperienceAccordion";
import { renderWithProviders, darkTheme, lightTheme } from "../test/testUtils";

async function openHeaderMenu(user) {
  await user.click(screen.getByRole("button", { name: "Toggle navigation menu" }));
}

// ────────────────────────────────────────────────────────
// Theme Toggle Behavior
// ────────────────────────────────────────────────────────
describe("Header — Theme Toggle Behavior", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("switches from dark mode to light mode when toggled", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);

    await openHeaderMenu(user);
    const toggleBtn = screen.getByRole("button", { name: "Toggle Theme" });
    await user.click(toggleBtn);

    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("switches from light mode to dark mode when toggled", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />, { theme: "light" });

    await openHeaderMenu(user);
    const toggleBtn = screen.getByRole("button", { name: "Toggle Theme" });
    await user.click(toggleBtn);

    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("persists only the selected mode", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);

    await openHeaderMenu(user);
    const toggleBtn = screen.getByRole("button", { name: "Toggle Theme" });
    await user.click(toggleBtn);

    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("toggles back to dark after toggling to light", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);

    await openHeaderMenu(user);
    let toggleBtn = screen.getByRole("button", { name: "Toggle Theme" });
    await user.click(toggleBtn);
    expect(localStorage.getItem("theme")).toBe("light");

    await openHeaderMenu(user);
    toggleBtn = screen.getByRole("button", { name: "Toggle Theme" });
    await user.click(toggleBtn);
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("migrates a stored family object while preserving its mode", () => {
    localStorage.setItem(
      "theme",
      JSON.stringify({ family: "violet", mode: "light" })
    );

    renderWithProviders(<Header />, { useStoredTheme: true });

    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("selects and persists the blue accent independently of mode", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);

    await openHeaderMenu(user);
    await user.click(
      screen.getByRole("button", { name: "Use indigo and navy accent" })
    );

    expect(localStorage.getItem("accent")).toBe("blue");
    expect(localStorage.getItem("theme")).toBe("dark");
    expect(
      screen.getByRole("button", { name: "Use indigo and navy accent" })
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("restores a stored accent and falls back from invalid values", () => {
    localStorage.setItem("accent", "blue");
    const { unmount } = renderWithProviders(<Header />, { useStoredTheme: true });

    expect(
      screen.getByRole("button", { name: "Use indigo and navy accent", hidden: true })
    ).toHaveAttribute("aria-pressed", "true");

    unmount();
    localStorage.setItem("accent", "invalid");
    renderWithProviders(<Header />, { useStoredTheme: true });

    expect(localStorage.getItem("accent")).toBe("pink");
  });
});

// ────────────────────────────────────────────────────────
// Home hero CTA behavior
// ────────────────────────────────────────────────────────
describe("Home hero CTA behavior", () => {
  it("contact action points to /contact", () => {
    renderWithProviders(<Greeting theme={darkTheme} />);
    expect(screen.getByRole("link", { name: "Contact me" })).toHaveAttribute(
      "href",
      "/contact"
    );
  });

  it("résumé action has correct href and target attributes", () => {
    renderWithProviders(<Greeting theme={darkTheme} />);
    const resumeLink = screen.getByText("Download résumé").closest("a");
    expect(resumeLink).toHaveAttribute("href", "/Resume.pdf");
    expect(resumeLink).toHaveAttribute("target", "_blank");
    expect(resumeLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("selected-work action points to the project section", () => {
    renderWithProviders(<Greeting theme={darkTheme} />);
    expect(screen.getByRole("link", { name: "View selected work" })).toHaveAttribute(
      "href",
      "#selected-work"
    );
  });
});

// ────────────────────────────────────────────────────────
// ExperienceAccordion Behavior
// ────────────────────────────────────────────────────────
const mockSections = [
  {
    title: "Work",
    experiences: [
      {
        title: "AI and Data Science Engineer",
        company: "Deloitte",
        companyUrl: "https://www2.deloitte.com/",
        logoPath: "deloitte_logo.svg",
        duration: "July 2025 – Present",
        location: "Gurugram, India",
        descriptions: ["Built IDP system."],
        color: "#000000",
      },
    ],
  },
  {
    title: "Internship",
    experiences: [
      {
        title: "ML Intern",
        company: "AiEnsured",
        companyUrl: "https://aiensured.com/",
        logoPath: "aiensured_logo.svg",
        duration: "Jul 2021 - Aug 2021",
        location: "Remote, India",
        descriptions: ["Built CV models."],
        color: "#fc1f20",
      },
    ],
  },
];

describe("ExperienceAccordion — Expand/Collapse Behavior", () => {
  it("renders section titles as accordion summaries", () => {
    renderWithProviders(
      <ExperienceAccordion sections={mockSections} theme={darkTheme} />
    );
    expect(screen.getByText("Work")).toBeInTheDocument();
    expect(screen.getByText("Internship")).toBeInTheDocument();
  });

  it("first accordion panel is open by default", () => {
    renderWithProviders(
      <ExperienceAccordion sections={mockSections} theme={darkTheme} />
    );
    // The first <details> should have the "open" attribute
    const detailsElements = document.querySelectorAll("details");
    expect(detailsElements[0]).toHaveAttribute("open");
  });

  it("second accordion panel is closed by default", () => {
    renderWithProviders(
      <ExperienceAccordion sections={mockSections} theme={darkTheme} />
    );
    const detailsElements = document.querySelectorAll("details");
    expect(detailsElements[1]).not.toHaveAttribute("open");
  });

  it("shows experience card content inside first (open) panel", () => {
    renderWithProviders(
      <ExperienceAccordion sections={mockSections} theme={darkTheme} />
    );
    expect(screen.getByText("AI and Data Science Engineer")).toBeInTheDocument();
    expect(screen.getByText("Deloitte")).toBeInTheDocument();
  });
});
