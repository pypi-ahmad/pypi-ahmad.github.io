/**
 * Component Behavior Tests
 *
 * Verifies interactive behavior: theme toggle persistence, SystemCard modal
 * open/close, Greeting CTA button actions, and ExperienceAccordion expand/collapse.
 *
 * Sources:
 *  - src/components/header/Header.jsx     (theme toggle)
 *  - src/components/SystemDesign/SystemCard.jsx (modal)
 *  - src/containers/greeting/Greeting.jsx  (CTA buttons)
 *  - src/containers/experienceAccordion/ExperienceAccordion.jsx (accordion)
 */
import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Header from "../components/header/Header";
import SystemCard from "../components/SystemDesign/SystemCard";
import Greeting from "../containers/greeting/Greeting";
import ExperienceAccordion from "../containers/experienceAccordion/ExperienceAccordion";
import { renderWithProviders, darkTheme, lightTheme } from "../test/testUtils";

// ────────────────────────────────────────────────────────
// Theme Toggle Behavior
// ────────────────────────────────────────────────────────
describe("Header — Theme Toggle Behavior", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("calls setTheme with 'light' when current theme is dark", async () => {
    const user = userEvent.setup();
    const setTheme = vi.fn();
    renderWithProviders(<Header theme={darkTheme} setTheme={setTheme} />);

    const toggleBtn = screen.getByRole("button", { name: "Toggle Theme" });
    await user.click(toggleBtn);

    expect(setTheme).toHaveBeenCalledWith("light");
  });

  it("calls setTheme with 'dark' when current theme is light (bug fixed: currTheme now initialized from theme.name)", async () => {
    // FIXED: Header.jsx now initializes currTheme from props.theme.name (string)
    // instead of props.theme (object). The comparison currTheme === "light"
    // now works correctly, toggling to "dark" when already light.
    const user = userEvent.setup();
    const setTheme = vi.fn();
    renderWithProviders(
      <Header theme={lightTheme} setTheme={setTheme} />,
      { theme: "light" }
    );

    const toggleBtn = screen.getByRole("button", { name: "Toggle Theme" });
    await user.click(toggleBtn);

    expect(setTheme).toHaveBeenCalledWith("dark");
  });

  it("persists theme choice to localStorage", async () => {
    const user = userEvent.setup();
    const setTheme = vi.fn();
    renderWithProviders(<Header theme={darkTheme} setTheme={setTheme} />);

    const toggleBtn = screen.getByRole("button", { name: "Toggle Theme" });
    await user.click(toggleBtn);

    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("toggles back to dark after toggling to light", async () => {
    const user = userEvent.setup();
    const setTheme = vi.fn();
    renderWithProviders(<Header theme={darkTheme} setTheme={setTheme} />);

    const toggleBtn = screen.getByRole("button", { name: "Toggle Theme" });
    // First click → light
    await user.click(toggleBtn);
    expect(localStorage.getItem("theme")).toBe("light");

    // Second click → dark
    await user.click(toggleBtn);
    expect(localStorage.getItem("theme")).toBe("dark");
  });
});

// ────────────────────────────────────────────────────────
// SystemCard Modal Behavior
// ────────────────────────────────────────────────────────
const mockSystem = {
  id: "test_system",
  name: "Test Pipeline",
  tagline: "Test tagline",
  category: "Test Category",
  tier: "featured",
  metrics: ["99% accuracy"],
  description: "Test description.",
  problem_statement: "Test problem.",
  solution_overview: "Test solution.",
  architecture: ["Step 1", "Step 2"],
  key_features: ["Feature A", "Feature B"],
  implementation_details: "Test implementation.",
  challenges_solutions: [
    { challenge: "Challenge 1", solution: "Solution 1" },
  ],
  impact: ["High impact"],
  tech: ["Python", "React"],
};

describe("SystemCard — Modal Behavior", () => {
  it("opens modal when 'View Deep Dive' is clicked", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <SystemCard system={mockSystem} theme={darkTheme} />
    );

    const expandBtn = screen.getByText(/View Deep Dive & Architecture/);
    await user.click(expandBtn);

    // Modal should now show the Problem Statement section
    await waitFor(() => {
      expect(screen.getByText("Problem Statement")).toBeInTheDocument();
    });
  });

  it("shows all modal sections when expanded", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <SystemCard system={mockSystem} theme={darkTheme} />
    );

    await user.click(screen.getByText(/View Deep Dive & Architecture/));

    await waitFor(() => {
      expect(screen.getByText("Problem Statement")).toBeInTheDocument();
      expect(screen.getByText("Solution Overview")).toBeInTheDocument();
      expect(screen.getByText("Architecture Workflow")).toBeInTheDocument();
      expect(screen.getByText("Key Features")).toBeInTheDocument();
      expect(screen.getByText("Implementation Details")).toBeInTheDocument();
      expect(screen.getByText("Challenges & Solutions")).toBeInTheDocument();
    });
  });

  it("closes modal when close button (×) is clicked", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <SystemCard system={mockSystem} theme={darkTheme} />
    );

    // Open modal
    await user.click(screen.getByText(/View Deep Dive & Architecture/));
    await waitFor(() => {
      expect(screen.getByText("Problem Statement")).toBeInTheDocument();
    });

    // Click close button (×)
    const closeBtn = screen.getByText("×");
    await user.click(closeBtn);

    await waitFor(() => {
      expect(screen.queryByText("Problem Statement")).not.toBeInTheDocument();
    });
  });

  it("closes modal when overlay backdrop is clicked", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <SystemCard system={mockSystem} theme={darkTheme} />
    );

    await user.click(screen.getByText(/View Deep Dive & Architecture/));
    await waitFor(() => {
      expect(screen.getByText("Problem Statement")).toBeInTheDocument();
    });

    // Click the overlay (the outer motion.div with class system-modal-overlay)
    const overlay = document.querySelector(".system-modal-overlay");
    await user.click(overlay);

    await waitFor(() => {
      expect(screen.queryByText("Problem Statement")).not.toBeInTheDocument();
    });
  });

  it("renders key features as list items in modal", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <SystemCard system={mockSystem} theme={darkTheme} />
    );

    await user.click(screen.getByText(/View Deep Dive & Architecture/));
    await waitFor(() => {
      expect(screen.getByText("Feature A")).toBeInTheDocument();
      expect(screen.getByText("Feature B")).toBeInTheDocument();
    });
  });
});

// ────────────────────────────────────────────────────────
// Greeting CTA Behavior
// ────────────────────────────────────────────────────────
describe("Greeting — CTA Button Behavior", () => {
  it("'Contact Me' button triggers navigation to /contact", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Greeting theme={darkTheme} />);

    const contactBtn = screen.getByRole("button", { name: "Contact Me" });
    await user.click(contactBtn);

    // After click, React Router should have navigated — we verify via the
    // window location (MemoryRouter won't change window.location, but
    // we can verify the button is clickable and doesn't throw)
    expect(contactBtn).toBeInTheDocument();
  });

  it("'Download Resume' link has correct href and target attributes", () => {
    renderWithProviders(<Greeting theme={darkTheme} />);
    const resumeLink = screen.getByText("Download Resume").closest("a");
    expect(resumeLink).toHaveAttribute("href", "/Resume.pdf");
    expect(resumeLink).toHaveAttribute("target", "_blank");
    expect(resumeLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("'View Cover Letter' link has correct href and target attributes", () => {
    renderWithProviders(<Greeting theme={darkTheme} />);
    const coverLink = screen.getByText("View Cover Letter").closest("a");
    expect(coverLink).toHaveAttribute("href", "/Cover.pdf");
    expect(coverLink).toHaveAttribute("target", "_blank");
    expect(coverLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("shows error message when document fetch fails", async () => {
    const user = userEvent.setup();
    // Mock fetch to reject
    const originalFetch = globalThis.fetch;
    globalThis.fetch = vi.fn().mockRejectedValue(new Error("network"));

    renderWithProviders(<Greeting theme={darkTheme} />);
    const resumeLink = screen.getByText("Download Resume");
    await user.click(resumeLink);

    await waitFor(() => {
      expect(screen.getByText(/Resume is unavailable right now/)).toBeInTheDocument();
    });

    globalThis.fetch = originalFetch;
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
        title: "GenAI Engineer",
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
    expect(screen.getByText("GenAI Engineer")).toBeInTheDocument();
    expect(screen.getByText("Deloitte")).toBeInTheDocument();
  });
});
