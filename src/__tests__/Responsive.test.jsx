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
    renderWithProviders(<Header theme={darkTheme} setTheme={vi.fn()} />);
    const checkbox = document.getElementById("menu-btn");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute("type", "checkbox");
    expect(checkbox).toHaveClass("menu-btn");
  });

  it("renders the hamburger label targeting the menu-btn", () => {
    renderWithProviders(<Header theme={darkTheme} setTheme={vi.fn()} />);
    const label = document.querySelector('label[for="menu-btn"]');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass("menu-icon");
  });

  it("renders the navicon span inside the hamburger label", () => {
    renderWithProviders(<Header theme={darkTheme} setTheme={vi.fn()} />);
    const navicon = document.querySelector(".navicon");
    expect(navicon).toBeInTheDocument();
    expect(navicon.tagName.toLowerCase()).toBe("span");
  });

  it("hamburger checkbox is unchecked by default (menu closed)", () => {
    renderWithProviders(<Header theme={darkTheme} setTheme={vi.fn()} />);
    const checkbox = document.getElementById("menu-btn");
    expect(checkbox.checked).toBe(false);
  });

  it("menu <ul> has the 'menu' class for CSS-based responsive toggle", () => {
    renderWithProviders(<Header theme={darkTheme} setTheme={vi.fn()} />);
    const menu = document.querySelector("ul.menu");
    expect(menu).toBeInTheDocument();
  });

  it("all 6 nav links are inside the menu <ul>", () => {
    renderWithProviders(<Header theme={darkTheme} setTheme={vi.fn()} />);
    const menu = document.querySelector("ul.menu");
    const links = menu.querySelectorAll("a");
    expect(links.length).toBe(6);
  });

  it("theme toggle button is inside the menu <ul>", () => {
    renderWithProviders(<Header theme={darkTheme} setTheme={vi.fn()} />);
    const menu = document.querySelector("ul.menu");
    const toggleBtn = menu.querySelector('button[aria-label="Toggle Theme"]');
    expect(toggleBtn).toBeInTheDocument();
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
    renderWithProviders(<Header theme={darkTheme} setTheme={vi.fn()} />);
    const headerEl = document.querySelector("header.header");
    expect(headerEl).toBeInTheDocument();
  });

  it("Header logo is a clickable link", () => {
    renderWithProviders(<Header theme={darkTheme} setTheme={vi.fn()} />);
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
