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
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import Header from "../components/header/Header";
import { renderWithProviders } from "../test/testUtils";

describe("Header — UI Rendering", () => {
  it("renders the logo text 'ahmad.m()'", () => {
    renderWithProviders(<Header />);
    expect(screen.getByText("ahmad.m()")).toBeInTheDocument();
  });

  it("renders all 6 navigation links", () => {
    renderWithProviders(<Header />);
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
    renderWithProviders(<Header />);
    expect(screen.getByText("Home").closest("a")).toHaveAttribute("href", "/home");
    expect(screen.getByText("Education and Certifications").closest("a")).toHaveAttribute("href", "/education");
    expect(screen.getByText("Experience").closest("a")).toHaveAttribute("href", "/experience");
    expect(screen.getByText("Skills").closest("a")).toHaveAttribute("href", "/skills");
    expect(screen.getByText("Projects").closest("a")).toHaveAttribute("href", "/projects");
    expect(screen.getByText("Contact Me").closest("a")).toHaveAttribute("href", "/contact");
  });

  it("renders the theme toggle button with aria-label", () => {
    renderWithProviders(<Header />);
    const toggleBtn = screen.getByRole("button", { name: "Toggle Theme" });
    expect(toggleBtn).toBeInTheDocument();
  });

  it("renders the theme family selector", () => {
    renderWithProviders(<Header />);
    const selector = screen.getByRole("combobox", { name: "Theme Family" });
    expect(selector).toBeInTheDocument();
    expect(selector).toHaveValue("default");
  });

  it("lists the new high-identity themes in the selector", () => {
    renderWithProviders(<Header />);

    [
      "Terminal",
      "Midnight Ops",
      "Paper Notebook",
      "Synthwave",
      "Arctic Frost",
      "Arctic",
      "Ember Forge",
      "Ember",
      "Coffee House",
      "Coffee",
      "Matrix Amber",
      "Blueprint",
      "Deep Space",
      "Sunset Gradient",
      "Luxury Gold",
      "Black Gold",
    ].forEach((label) => {
      expect(screen.getByRole("option", { name: label })).toBeInTheDocument();
    });
  });

  it("renders the theme gallery trigger", () => {
    renderWithProviders(<Header />);
    const galleryToggle = screen.getByRole("button", { name: /Theme Gallery/i });
    expect(galleryToggle).toBeInTheDocument();
    expect(galleryToggle).toHaveAttribute("aria-expanded", "false");
  });

  it("marks the default preview chip as active", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);

    await user.click(screen.getByRole("button", { name: /Theme Gallery/i }));

    const defaultPreview = screen.getByRole("button", { name: "Select Default theme" });
    expect(defaultPreview).toHaveAttribute("aria-pressed", "true");
  });

  it("renders the hamburger menu checkbox input", () => {
    renderWithProviders(<Header />);
    const menuCheckbox = document.getElementById("menu-btn");
    expect(menuCheckbox).toBeInTheDocument();
    expect(menuCheckbox.type).toBe("checkbox");
  });

  it("renders the logo as a link to /home when isSplash is false", () => {
    renderWithProviders(<Header />);
    const logoLink = screen.getByText("ahmad.m()").closest("a");
    expect(logoLink).toHaveAttribute("href", "/home");
  });

  it("applies dark theme background color on toggle button in dark mode", () => {
    renderWithProviders(<Header />);
    const toggleBtn = screen.getByRole("button", { name: "Toggle Theme" });
    expect(toggleBtn).toHaveStyle({ backgroundColor: "#292C3F" });
  });

  it("applies light theme background color on toggle button in light mode", () => {
    renderWithProviders(<Header />, { theme: "light" });
    const toggleBtn = screen.getByRole("button", { name: "Toggle Theme" });
    expect(toggleBtn).toHaveStyle({ backgroundColor: "#7CD1F7" });
  });
});
