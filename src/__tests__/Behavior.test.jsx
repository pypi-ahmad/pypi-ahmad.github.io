/**
 * Component Behavior Tests
 *
 * Verifies theme persistence and Greeting CTA behavior.
 *
 * Sources:
 *  - src/components/header/Header.jsx     (theme toggle)
 *  - src/containers/greeting/Greeting.jsx  (CTA buttons)
 */
import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach } from "vitest";
import Header from "../components/header/Header";
import Greeting from "../containers/greeting/Greeting";
import { renderWithProviders, darkTheme, lightTheme } from "../test/testUtils";

async function openHeaderMenu(user) {
  await user.click(
    screen.getByRole("button", { name: "Toggle navigation menu" }),
  );
}

// ────────────────────────────────────────────────────────
// Theme Toggle Behavior
// ────────────────────────────────────────────────────────
describe("Header — Theme Toggle Behavior", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("switches from dark mode to light mode when toggled", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);

    await openHeaderMenu(user);
    const toggleBtn = screen.getByRole("button", {
      name: /Switch to (light|dark) mode/,
    });
    await user.click(toggleBtn);

    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("switches from light mode to dark mode when toggled", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />, { theme: "light" });

    await openHeaderMenu(user);
    const toggleBtn = screen.getByRole("button", {
      name: /Switch to (light|dark) mode/,
    });
    await user.click(toggleBtn);

    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("persists only the selected mode", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);

    await openHeaderMenu(user);
    const toggleBtn = screen.getByRole("button", {
      name: /Switch to (light|dark) mode/,
    });
    await user.click(toggleBtn);

    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("toggles back to dark after toggling to light", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);

    await openHeaderMenu(user);
    let toggleBtn = screen.getByRole("button", {
      name: /Switch to (light|dark) mode/,
    });
    await user.click(toggleBtn);
    expect(localStorage.getItem("theme")).toBe("light");

    await openHeaderMenu(user);
    toggleBtn = screen.getByRole("button", {
      name: /Switch to (light|dark) mode/,
    });
    await user.click(toggleBtn);
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("migrates a stored family object while preserving its mode", () => {
    localStorage.setItem(
      "theme",
      JSON.stringify({ family: "violet", mode: "light" }),
    );

    renderWithProviders(<Header />, { useStoredTheme: true });

    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("removes a legacy stored accent", () => {
    localStorage.setItem("accent", "retired-preset");
    renderWithProviders(<Header />, { useStoredTheme: true });

    expect(localStorage.getItem("accent")).toBeNull();
  });
});
// ────────────────────────────────────────────────────────
// Home hero CTA behavior
// ────────────────────────────────────────────────────────
describe("Home hero CTA behavior", () => {
  it("contact action points to /contact", () => {
    renderWithProviders(<Greeting theme={darkTheme} />);
    expect(screen.getByRole("link", { name: "Contact me" })).toHaveAttribute(
      "href",
      "/contact",
    );
  });

  it("selected-work action points to the project section", () => {
    renderWithProviders(<Greeting theme={darkTheme} />);
    expect(
      screen.getByRole("link", { name: "View selected work" }),
    ).toHaveAttribute("href", "#selected-work");
  });
});
