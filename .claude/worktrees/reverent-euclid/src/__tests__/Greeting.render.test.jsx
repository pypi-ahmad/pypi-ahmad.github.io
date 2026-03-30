/**
 * Greeting (Hero) — UI Rendering Tests
 *
 * Verifies the Greeting component renders the hero section with
 * title, full name, subtitle, hero bullets, philosophy, and CTA buttons.
 *
 * Source: src/containers/greeting/Greeting.jsx
 * Data:   src/data/greeting.js
 */
import React from "react";
import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Greeting from "../containers/greeting/Greeting";
import { renderWithProviders, darkTheme } from "../test/testUtils";

describe("Greeting — UI Rendering", () => {
  it("renders the hero title 'Hello.'", () => {
    renderWithProviders(<Greeting theme={darkTheme} />);
    expect(screen.getByRole("heading", { level: 1, name: "Hello." })).toBeInTheDocument();
  });

  it("renders the full name 'Ahmad Mujtaba.'", () => {
    renderWithProviders(<Greeting theme={darkTheme} />);
    expect(screen.getByText(/Ahmad Mujtaba/)).toBeInTheDocument();
  });

  it("renders the subtitle text", () => {
    renderWithProviders(<Greeting theme={darkTheme} />);
    expect(screen.getByText(/production-grade AI systems/)).toBeInTheDocument();
  });

  it("renders all 4 hero bullet points", () => {
    renderWithProviders(<Greeting theme={darkTheme} />);
    expect(screen.getByText(/99% extraction accuracy/)).toBeInTheDocument();
    expect(screen.getByText(/RAG-grounded Computer-Using Agent/)).toBeInTheDocument();
    expect(screen.getByText(/multi-agent research system/)).toBeInTheDocument();
    expect(screen.getByText(/MCP-based UI automation/)).toBeInTheDocument();
  });

  it("renders the engineering philosophy quote", () => {
    renderWithProviders(<Greeting theme={darkTheme} />);
    expect(screen.getByText(/LLMs are powerful but unreliable/)).toBeInTheDocument();
  });

  it("renders the 'Contact Me' button", () => {
    renderWithProviders(<Greeting theme={darkTheme} />);
    expect(screen.getByRole("button", { name: "Contact Me" })).toBeInTheDocument();
  });

  it("renders the 'Download Resume' link", () => {
    renderWithProviders(<Greeting theme={darkTheme} />);
    const resumeLink = screen.getByText("Download Resume");
    expect(resumeLink).toBeInTheDocument();
    expect(resumeLink.closest("a")).toHaveAttribute("href", "/Resume.pdf");
  });

  it("renders the 'View Cover Letter' link", () => {
    renderWithProviders(<Greeting theme={darkTheme} />);
    const coverLink = screen.getByText("View Cover Letter");
    expect(coverLink).toBeInTheDocument();
    expect(coverLink.closest("a")).toHaveAttribute("href", "/Cover.pdf");
  });

  it("applies accent color to the full name", () => {
    renderWithProviders(<Greeting theme={darkTheme} />);
    const nameSpan = screen.getByText(/Ahmad Mujtaba\./);
    expect(nameSpan).toHaveStyle({ color: darkTheme.accentColor });
  });

  it("renders hero bullets as list items", () => {
    renderWithProviders(<Greeting theme={darkTheme} />);
    const bullets = screen.getAllByRole("listitem");
    expect(bullets.length).toBeGreaterThanOrEqual(4);
  });
});
