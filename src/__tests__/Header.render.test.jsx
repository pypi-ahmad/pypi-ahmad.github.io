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

async function openMenu() {
  const user = userEvent.setup();
  await user.click(screen.getByRole("button", { name: "Toggle navigation menu" }));
}

describe("Header — UI Rendering", () => {
  it("offers a skip link before the navigation controls", async () => {
    renderWithProviders(<Header />);
    const user = userEvent.setup();
    await user.tab();
    const skip = screen.getByRole("link", { name: "Skip to content" });
    expect(skip).toHaveFocus();
    expect(skip).toHaveAttribute("href", "#main-content");
  });
  it("renders the logo text 'ahmad.m()' inside the dropdown menu", async () => {
    renderWithProviders(<Header />);
    await openMenu();
    expect(screen.getByText("ahmad.m()")).toBeInTheDocument();
  });

  it("renders all 6 main navigation links inside the dropdown menu", async () => {
    renderWithProviders(<Header />);
    await openMenu();
    const navLabels = [
      "Home",
      "Education and certifications",
      "Experience",
      "Skills",
      "Projects",
      "Contact",
    ];
    navLabels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("renders navigation links with correct href paths", async () => {
    renderWithProviders(<Header />);
    await openMenu();
    expect(screen.getByText("Home").closest("a")).toHaveAttribute("href", "/home");
    expect(screen.getByText("Education and certifications").closest("a")).toHaveAttribute("href", "/education");
    expect(screen.getByText("Experience").closest("a")).toHaveAttribute("href", "/experience");
    expect(screen.getByText("Skills").closest("a")).toHaveAttribute("href", "/skills");
    expect(screen.getByText("Projects").closest("a")).toHaveAttribute("href", "/projects");
    expect(screen.getByText("Contact").closest("a")).toHaveAttribute("href", "/contact");
  });

  it("renders the theme toggle button with aria-label", async () => {
    renderWithProviders(<Header />);
    await openMenu();
    const toggleBtn = screen.getByRole("button", { name: /Switch to (light|dark) mode/ });
    expect(toggleBtn).toBeInTheDocument();
  });

  it("does not render a Theme gallery link", async () => {
    renderWithProviders(<Header />);
    await openMenu();
    expect(screen.queryByRole("link", { name: "Theme" })).not.toBeInTheDocument();
  });

  it("does not render an accent selector", async () => {
    renderWithProviders(<Header />);
    await openMenu();

    expect(screen.queryByRole("group", { name: "Accent color" })).not.toBeInTheDocument();
  });

  it("renders the hamburger menu button", () => {
    renderWithProviders(<Header />);
    const menuButton = screen.getByRole("button", { name: "Toggle navigation menu" });
    expect(menuButton).toBeInTheDocument();
    expect(menuButton).toHaveAttribute("aria-controls", expect.any(String));
  });

  it("renders the logo as a link to /home when isSplash is false", async () => {
    renderWithProviders(<Header />);
    await openMenu();
    const logoLink = screen.getByText("ahmad.m()").closest("a");
    expect(logoLink).toHaveAttribute("href", "/home");
  });

  it("applies dark theme background color on toggle button in dark mode", async () => {
    renderWithProviders(<Header />);
    await openMenu();
    const toggleBtn = screen.getByRole("button", { name: /Switch to (light|dark) mode/ });
    expect(toggleBtn).toHaveStyle({ backgroundColor: "#1D2129" });
  });

  it("applies light theme background color on toggle button in light mode", async () => {
    renderWithProviders(<Header />, { theme: "light" });
    await openMenu();
    const toggleBtn = screen.getByRole("button", { name: /Switch to (light|dark) mode/ });
    expect(toggleBtn).toHaveStyle({ backgroundColor: "#EEE7DA" });
  });
});
