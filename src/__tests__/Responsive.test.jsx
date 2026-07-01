/**
 * Responsiveness Tests
 */
import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
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
    expect(menuButton).toHaveAttribute("aria-controls", "site-menu");
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
    const menu = document.getElementById("site-menu");
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
    expect(menu).toHaveAttribute("hidden");
  });

  it("menu opens when the hamburger button is clicked", async () => {
    renderWithProviders(<Header />);
    const user = userEvent.setup();
    const menuButton = screen.getByRole("button", { name: "Toggle navigation menu" });
    const menu = document.getElementById("site-menu");

    await user.click(menuButton);

    expect(menuButton).toHaveAttribute("aria-expanded", "true");
    expect(menu).not.toHaveAttribute("hidden");
  });

  it("all 7 links including the site label are inside the menu <ul>", async () => {
    renderWithProviders(<Header />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Toggle navigation menu" }));
    const menu = document.querySelector("ul.menu");
    const links = menu.querySelectorAll("a");
    expect(links.length).toBe(7);
  });

  it("theme toggle button is inside the menu <ul>", async () => {
    renderWithProviders(<Header />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Toggle navigation menu" }));
    const menu = document.querySelector("ul.menu");
    const toggleBtn = menu.querySelector('button[aria-label="Toggle Theme"]');
    expect(toggleBtn).toBeInTheDocument();
  });

  it("keeps Contact Me and toggle as the final interactive items", async () => {
    renderWithProviders(<Header />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Toggle navigation menu" }));
    const menu = document.querySelector("ul.menu");
    const menuItems = Array.from(menu.children).map((item) => {
      if (item.querySelector('a[href="/contact"]')) {
        return "contact";
      }

      if (item.querySelector('button[aria-label="Toggle Theme"]')) {
        return "toggle";
      }

      return item.textContent.trim();
    });

    expect(menuItems.slice(-2)).toEqual(["contact", "toggle"]);
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

  it("Hero bullet list has no default list-style", () => {
    renderWithProviders(<Greeting theme={darkTheme} />);
    const bulletList = document.querySelector(".hero-bullets");
    expect(bulletList).toBeInTheDocument();
    expect(bulletList).toHaveStyle({ listStyle: "none" });
  });
});
