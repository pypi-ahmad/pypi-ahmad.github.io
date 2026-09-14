/**
 * Responsiveness Tests
 *
 * Verifies disclosure semantics and responsive class hooks. The same
 * navigation list is visible on wide screens and disclosed on compact screens.
 *
 * Note: jsdom does not implement layout, so these tests verify DOM structure
 * and CSS class application rather than computed pixel values. True visual
 * regression testing requires a browser-based runner (Playwright/Cypress).
 *
 * Sources:
 *  - src/components/header/Header.jsx (hamburger menu)
 *  - src/global.js (mobile breakpoint at 768px)
 */
import React from "react";
import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Header from "../components/header/Header";
import Greeting from "../containers/greeting/Greeting";
import { renderWithProviders, darkTheme } from "../test/testUtils";

describe("Responsiveness — Hamburger Menu Structure", () => {
  it("renders the hamburger menu button", () => {
    renderWithProviders(<Header />);
    const menuButton = screen.getByRole("button", { name: "Toggle navigation menu" });
    expect(menuButton).toBeInTheDocument();
    expect(menuButton).toHaveClass("menu-icon");
  });

  it("links the hamburger button to the dropdown menu", () => {
    renderWithProviders(<Header />);
    const menuButton = screen.getByRole("button", { name: "Toggle navigation menu" });
    expect(menuButton).toHaveAttribute("aria-controls", expect.any(String));
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
  });

  it("renders the navicon span inside the hamburger button", () => {
    renderWithProviders(<Header />);
    const navicon = document.querySelector(".navicon");
    expect(navicon).toBeInTheDocument();
    expect(navicon.tagName.toLowerCase()).toBe("span");
  });

  it("menu is collapsed by default", () => {
    renderWithProviders(<Header />);
    const menuButton = screen.getByRole("button", { name: "Toggle navigation menu" });
    const menu = document.getElementById(screen.getByRole("button", { name: "Toggle navigation menu" }).getAttribute("aria-controls"));
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
    expect(menu).toHaveAttribute("hidden");
  });

  it("menu opens when the hamburger button is clicked", async () => {
    renderWithProviders(<Header />);
    const user = userEvent.setup();
    const menuButton = screen.getByRole("button", { name: "Toggle navigation menu" });
    const menu = document.getElementById(screen.getByRole("button", { name: "Toggle navigation menu" }).getAttribute("aria-controls"));

    await user.click(menuButton);

    expect(menuButton).toHaveAttribute("aria-expanded", "true");
    expect(menu).not.toHaveAttribute("hidden");
  });

  it("keeps seven page links in one navigation list", async () => {
    renderWithProviders(<Header />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Toggle navigation menu" }));
    const menu = document.querySelector("ul.menu");
    const links = menu.querySelectorAll("a");
    expect(links.length).toBe(7);
    expect(menu.contains(screen.getByText("ahmad.m()"))).toBe(false);
  });

  it("keeps the theme toggle available outside the dropdown", async () => {
    renderWithProviders(<Header />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Toggle navigation menu" }));
    const menu = document.querySelector("ul.menu");
    const toggleBtn = screen.getByRole("button", { name: /Switch to .* mode/ });
    expect(menu.contains(toggleBtn)).toBe(false);
  });

  it("keeps the obsolete accent selector out of the menu", async () => {
    renderWithProviders(<Header />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Toggle navigation menu" }));

    expect(screen.queryByRole("group", { name: "Accent color" })).not.toBeInTheDocument();
  });

  it("keeps Contact last in page navigation", async () => {
    renderWithProviders(<Header />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Toggle navigation menu" }));
    const menu = document.querySelector("ul.menu");
    const menuItems = Array.from(menu.children).map((item) => {
      if (item.querySelector('a[href="/contact"]')) {
        return "contact";
      }

      if (item.querySelector('button.change-theme-btn')) {
        return "toggle";
      }

      return item.textContent.trim();
    });

    expect(menuItems.at(-1)).toBe("contact");
  });

  it("keeps desktop navigation accessible and moves focus when resizing", () => {
    let change;
    const remove = vi.fn();
    const original = window.matchMedia;
    window.matchMedia = vi.fn((query) => query !== "(min-width: 80rem)" ? original(query) : ({
      matches: true,
      addEventListener: (_event, listener) => { change = listener; },
      removeEventListener: remove,
    }));
    const { unmount } = renderWithProviders(<Header />);
    const link = screen.getByRole("link", { name: "Experience" });
    expect(screen.queryByRole("button", { name: "Toggle navigation menu" })).not.toBeInTheDocument();
    link.focus();
    act(() => change({ matches: false }));
    const trigger = screen.getByRole("button", { name: "Toggle navigation menu" });
    expect(trigger).toHaveFocus();
    expect(link.closest("ul")).toHaveAttribute("inert");
    act(() => change({ matches: true }));
    expect(screen.getByText("ahmad.m()")).toHaveFocus();
    expect(link.closest("ul")).not.toHaveAttribute("inert");
    unmount();
    expect(remove).toHaveBeenCalled();
    window.matchMedia = original;
  });
});

describe("Responsiveness — Viewport matchMedia", () => {
  it("matchMedia is mocked to return true for pointer:fine (desktop)", () => {
    const result = window.matchMedia("(pointer: fine)");
    expect(result.matches).toBe(true);
  });

  it("matchMedia returns false for non-matching queries", () => {
    const result = window.matchMedia("(max-width: 768px)");
    expect(result.matches).toBe(false);
  });
});

describe("Responsiveness — Layout Structure Assertions", () => {
  it("Header renders inside a <header> semantic element", () => {
    renderWithProviders(<Header />);
    const headerEl = document.querySelector("header.header");
    expect(headerEl).toBeInTheDocument();
  });

  it("Header logo is a clickable link", async () => {
    renderWithProviders(<Header />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Toggle navigation menu" }));
    const logo = screen.getByText("ahmad.m()");
    expect(logo.closest("a")).toBeTruthy();
  });

  it("Greeting section has the greet-main container", () => {
    renderWithProviders(<Greeting theme={darkTheme} />);
    const greetDiv = document.getElementById("greeting");
    expect(greetDiv).toBeInTheDocument();
    expect(greetDiv).toHaveClass("greet-main");
  });

  it("Outcome list has no default list style", () => {
    renderWithProviders(<Greeting theme={darkTheme} />);
    const bulletList = document.querySelector(".outcome-grid");
    expect(bulletList).toBeInTheDocument();
    expect(bulletList).toHaveStyle({ listStyle: "none" });
  });
});
