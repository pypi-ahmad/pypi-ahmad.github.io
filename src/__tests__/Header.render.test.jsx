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
import { describe, it, expect, vi } from "vitest";
import Header from "../components/header/Header";
import { renderWithProviders } from "../test/testUtils";

async function openMenu() {
  const user = userEvent.setup();
  await user.click(screen.getByRole("button", { name: "Toggle navigation menu" }));
}

describe("Header — UI Rendering", () => {
  it("uses the approved work-first navigation order", async () => {
    const { container } = renderWithProviders(<Header />);
    await openMenu();
    expect([...container.querySelectorAll(".menu a")].map(node => node.textContent)).toEqual([
      "Home", "Experience", "Projects", "Skills", "FDE", "Education and certifications", "GitHub", "Contact",
    ]);
  });
  it("measures the sticky header, updates on resize, and cleans up", () => {
    let resize;
    const disconnect = vi.fn();
    const observer = vi.spyOn(globalThis, "ResizeObserver").mockImplementation(function(callback) {
      resize = callback;
      return { observe: vi.fn(), disconnect };
    });
    const bounds = vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ height: 90 });
    try {
      const { unmount } = renderWithProviders(<Header />);
      expect(document.documentElement.style.getPropertyValue("--header-height")).toBe("90px");
      bounds.mockReturnValue({ height: 140 });
      resize();
      expect(document.documentElement.style.getPropertyValue("--header-height")).toBe("140px");
      unmount();
      expect(disconnect).toHaveBeenCalled();
      expect(document.documentElement.style.getPropertyValue("--header-height")).toBe("");
    } finally {
      bounds.mockRestore();
      observer.mockRestore();
    }
  });
  it("marks Home current at the root URL", async () => {
    renderWithProviders(<Header />, { initialEntries: ["/"] });
    await openMenu();
    expect(screen.getByRole("link", { name: "Home", exact: true })).toHaveAttribute("aria-current", "page");
  });
  it("offers a skip link before the navigation controls", async () => {
    renderWithProviders(<Header />);
    const user = userEvent.setup();
    await user.tab();
    const skip = screen.getByRole("link", { name: "Skip to content" });
    expect(skip).toHaveFocus();
    expect(skip).toHaveAttribute("href", "#main-content");
  });
  it("renders the logo text 'ahmad.m()'", async () => {
    renderWithProviders(<Header />);
    await openMenu();
    expect(screen.getByText("ahmad.m()")).toBeInTheDocument();
  });

  it("renders all eight page links inside the dropdown menu", async () => {
    renderWithProviders(<Header />);
    await openMenu();
    const navLabels = [
      "Home",
      "Education and certifications",
      "Experience",
      "FDE",
      "Skills",
      "Projects",
      "GitHub",
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

});
