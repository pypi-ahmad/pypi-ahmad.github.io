/**
 * Responsiveness Tests
 *
 * Verifies viewport-dependent rendering: hamburger menu visibility,
 * CSS class presence for responsive layouts, and mobile-specific
 * element behavior.
 *
 * Note: jsdom does not implement layout, so these tests verify DOM structure
 * and CSS class application rather than computed pixel values. True visual
 * regression testing requires a browser-based runner (Playwright/Cypress).
 *
 * Sources:
 *  - src/components/header/Header.jsx (hamburger menu)
 *  - src/global.js (mobile breakpoint at 768px)
 *  - src/containers/experienceAccordion/ExperienceAccordion.jsx (mobile margin)
 */
import React from "react";
import { screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Header from "../components/header/Header";
import Greeting from "../containers/greeting/Greeting";
import { renderWithProviders, darkTheme } from "../test/testUtils";

describe("Responsiveness — Hamburger Menu Structure", () => {
  it("renders the hamburger checkbox input for mobile toggle", () => {
    renderWithProviders(<Header />);
    const checkbox = document.getElementById("menu-btn");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute("type", "checkbox");
    expect(checkbox).toHaveClass("menu-btn");
  });

  it("renders the hamburger label targeting the menu-btn", () => {
    renderWithProviders(<Header />);
    const label = document.querySelector('label[for="menu-btn"]');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass("menu-icon");
  });

  it("renders the navicon span inside the hamburger label", () => {
    renderWithProviders(<Header />);
    const navicon = document.querySelector(".navicon");
    expect(navicon).toBeInTheDocument();
    expect(navicon.tagName.toLowerCase()).toBe("span");
  });

  it("hamburger checkbox is unchecked by default (menu closed)", () => {
    renderWithProviders(<Header />);
    const checkbox = document.getElementById("menu-btn");
    expect(checkbox.checked).toBe(false);
  });

  it("menu <ul> has the 'menu' class for CSS-based responsive toggle", () => {
    renderWithProviders(<Header />);
    const menu = document.querySelector("ul.menu");
    expect(menu).toBeInTheDocument();
  });

  it("all 6 nav links are inside the menu <ul>", () => {
    renderWithProviders(<Header />);
    const menu = document.querySelector("ul.menu");
    const links = menu.querySelectorAll("a");
    expect(links.length).toBe(6);
  });

  it("theme toggle button is inside the menu <ul>", () => {
    renderWithProviders(<Header />);
    const menu = document.querySelector("ul.menu");
    const toggleBtn = menu.querySelector('button[aria-label="Toggle Theme"]');
    expect(toggleBtn).toBeInTheDocument();
  });

  it("theme family selector is inside the menu <ul>", () => {
    renderWithProviders(<Header />);
    const menu = document.querySelector("ul.menu");
    const selector = menu.querySelector('select[aria-label="Theme Family"]');
    expect(selector).toBeInTheDocument();
  });

  it("theme gallery toggle is inside the menu <ul>", () => {
    renderWithProviders(<Header />);
    const menu = document.querySelector("ul.menu");
    const galleryToggle = menu.querySelector('button[aria-controls="theme-family-preview-panel"]');
    expect(galleryToggle).toBeInTheDocument();
  });

  it("keeps Contact Me, theme selector, and toggle in the correct final order", () => {
    renderWithProviders(<Header />);
    const menu = document.querySelector("ul.menu");
    const menuItems = Array.from(menu.children).map((item) => {
      if (item.querySelector('a[href="/contact"]')) {
        return "contact";
      }

      if (item.querySelector('select[aria-label="Theme Family"]')) {
        return "selector";
      }

      if (item.querySelector('button[aria-label="Toggle Theme"]')) {
        return "toggle";
      }

      return item.textContent.trim();
    });

    expect(menuItems.slice(-3)).toEqual(["contact", "selector", "toggle"]);
  });

  it("renders theme preview buttons for the visual picker", () => {
    renderWithProviders(<Header />);
    const previewButtons = document.querySelectorAll(".theme-preview-chip");
    expect(previewButtons.length).toBeGreaterThanOrEqual(26);
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

  it("Header logo is a clickable link", () => {
    renderWithProviders(<Header />);
    const logo = screen.getByText("ahmad.m()");
    expect(logo.closest("a")).toBeTruthy();
  });

  it("Greeting section has the greet-main container", () => {
    renderWithProviders(<Greeting theme={darkTheme} />);
    const greetDiv = document.getElementById("greeting");
    expect(greetDiv).toBeInTheDocument();
    expect(greetDiv).toHaveClass("greet-main");
  });

  it("Hero bullet list has no default list-style", () => {
    renderWithProviders(<Greeting theme={darkTheme} />);
    const bulletList = document.querySelector(".hero-bullets");
    expect(bulletList).toBeInTheDocument();
    expect(bulletList).toHaveStyle({ listStyle: "none" });
  });
});
