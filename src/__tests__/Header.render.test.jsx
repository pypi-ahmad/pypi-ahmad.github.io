/**
 * Header — UI Rendering Tests
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

  it("renders navigation links with correct href paths", async () => {
    renderWithProviders(<Header />);
    await openMenu();
    expect(screen.getByText("Home").closest("a")).toHaveAttribute("href", "/home");
    expect(screen.getByText("Education and Certifications").closest("a")).toHaveAttribute(
      "href",
      "/education"
    );
    expect(screen.getByText("Experience").closest("a")).toHaveAttribute("href", "/experience");
    expect(screen.getByText("Skills").closest("a")).toHaveAttribute("href", "/skills");
    expect(screen.getByText("Projects").closest("a")).toHaveAttribute("href", "/projects");
    expect(screen.getByText("Contact Me").closest("a")).toHaveAttribute("href", "/contact");
  });

  it("renders the theme toggle button with aria-label", async () => {
    renderWithProviders(<Header />);
    await openMenu();
    const toggleBtn = screen.getByRole("button", { name: "Toggle Theme" });
    expect(toggleBtn).toBeInTheDocument();
  });

  it("renders the hamburger menu button", () => {
    renderWithProviders(<Header />);
    const menuButton = screen.getByRole("button", { name: "Toggle navigation menu" });
    expect(menuButton).toBeInTheDocument();
    expect(menuButton).toHaveAttribute("aria-controls", "site-menu");
  });

  it("renders the logo as a link to /home when isSplash is false", async () => {
    renderWithProviders(<Header />);
    await openMenu();
    const logoLink = screen.getByText("ahmad.m()").closest("a");
    expect(logoLink).toHaveAttribute("href", "/home");
  });

  it("applies neutral dark surface color on toggle button in dark mode", async () => {
    renderWithProviders(<Header />);
    await openMenu();
    const toggleBtn = screen.getByRole("button", { name: "Toggle Theme" });
    expect(toggleBtn).toHaveStyle({ backgroundColor: "#16243A" });
  });

  it("applies neutral light surface color on toggle button in light mode", async () => {
    renderWithProviders(<Header />, { theme: "light" });
    await openMenu();
    const toggleBtn = screen.getByRole("button", { name: "Toggle Theme" });
    expect(toggleBtn).toHaveStyle({ backgroundColor: "#E2E8F0" });
  });
});
