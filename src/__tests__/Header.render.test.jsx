/**
 * Header — UI Rendering Tests
 *
 * Verifies the Header component renders all navigation links, the logo,
 * and the theme toggle button with correct text and attributes.
 *
 * Source: src/components/header/Header.jsx
 */
import React from "react";
import { screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Header from "../components/header/Header";
import { renderWithProviders, darkTheme, lightTheme } from "../test/testUtils";

describe("Header — UI Rendering", () => {
  const defaultProps = { theme: darkTheme, setTheme: vi.fn() };

  it("renders the logo text 'ahmad.m()'", () => {
    renderWithProviders(<Header {...defaultProps} />);
    expect(screen.getByText("ahmad.m()")).toBeInTheDocument();
  });

  it("renders all 6 navigation links", () => {
    renderWithProviders(<Header {...defaultProps} />);
    const navLabels = [
      "Home",
      "Education and Certifications",
      "Experience",
      "Skills",
      "Projects",
      "Contact Me",
    ];
    navLabels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("renders navigation links with correct href paths", () => {
    renderWithProviders(<Header {...defaultProps} />);
    expect(screen.getByText("Home").closest("a")).toHaveAttribute("href", "/home");
    expect(screen.getByText("Education and Certifications").closest("a")).toHaveAttribute("href", "/education");
    expect(screen.getByText("Experience").closest("a")).toHaveAttribute("href", "/experience");
    expect(screen.getByText("Skills").closest("a")).toHaveAttribute("href", "/skills");
    expect(screen.getByText("Projects").closest("a")).toHaveAttribute("href", "/projects");
    expect(screen.getByText("Contact Me").closest("a")).toHaveAttribute("href", "/contact");
  });

  it("renders the theme toggle button with aria-label", () => {
    renderWithProviders(<Header {...defaultProps} />);
    const toggleBtn = screen.getByRole("button", { name: "Toggle Theme" });
    expect(toggleBtn).toBeInTheDocument();
  });

  it("renders the hamburger menu checkbox input", () => {
    renderWithProviders(<Header {...defaultProps} />);
    const menuCheckbox = document.getElementById("menu-btn");
    expect(menuCheckbox).toBeInTheDocument();
    expect(menuCheckbox.type).toBe("checkbox");
  });

  it("renders the logo as a link to /home when isSplash is false", () => {
    renderWithProviders(<Header {...defaultProps} />);
    const logoLink = screen.getByText("ahmad.m()").closest("a");
    expect(logoLink).toHaveAttribute("href", "/home");
  });

  it("applies dark theme background color on toggle button in dark mode", () => {
    renderWithProviders(<Header {...defaultProps} />);
    const toggleBtn = screen.getByRole("button", { name: "Toggle Theme" });
    expect(toggleBtn).toHaveStyle({ backgroundColor: "#292C3F" });
  });

  it("applies light theme background color on toggle button in light mode", () => {
    renderWithProviders(
      <Header theme={lightTheme} setTheme={vi.fn()} />,
      { theme: "light" }
    );
    const toggleBtn = screen.getByRole("button", { name: "Toggle Theme" });
    expect(toggleBtn).toHaveStyle({ backgroundColor: "#7CD1F7" });
  });
});
