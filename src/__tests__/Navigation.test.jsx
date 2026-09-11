/**
 * Navigation Flow Tests
 *
 * Verifies React Router navigation via the full app route tree (Main.jsx).
 * Tests that clicking NavLinks renders the correct page content,
 * and that direct URL entry (via browser history) resolves properly.
 *
 * Source: src/containers/Main.jsx, src/components/header/Header.jsx
 */
import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { MotionConfig } from "framer-motion";
import { ThemeControllerProvider } from "../themeController";
import { darkTheme } from "../theme";

import Main from "../containers/Main";

/** Renders the production route tree and waits for its lazy page to load. */
async function renderAtRoute(initialPath) {
  window.history.replaceState({}, "", initialPath);
  render(
    <ThemeControllerProvider
      initialThemeMode="dark"
    >
      <MotionConfig reducedMotion="always">
        <Main theme={darkTheme} />
      </MotionConfig>
    </ThemeControllerProvider>
  );
  await screen.findByRole("main");
}

describe("Navigation — Route Resolution", () => {
  it("'/' renders the Home page (isSplash=false)", async () => {
    await renderAtRoute("/");
    expect(await screen.findByRole("heading", { level: 1, name: "I build applied AI systems and test whether they work." })).toBeInTheDocument();
  });

  it("'/home' renders the Home page", async () => {
    await renderAtRoute("/home");
    expect(await screen.findByRole("heading", { level: 1, name: "I build applied AI systems and test whether they work." })).toBeInTheDocument();
  });

  it("'/experience' renders the Experience page", async () => {
    await renderAtRoute("/experience");
    expect(await screen.findByRole("heading", { level: 1, name: "Building and evaluating applied AI systems." })).toBeInTheDocument();
  });

  it("'/education' renders the Education page", async () => {
    await renderAtRoute("/education");
    expect(await screen.findByRole("heading", {
      level: 1,
      name: "Academic foundations for applied AI.",
    })).toBeInTheDocument();
  });

  it("'/contact' renders the Contact page", async () => {
    await renderAtRoute("/contact");
    expect(await screen.findByRole("heading", { level: 1, name: "Let’s build useful AI systems." })).toBeInTheDocument();
  });

  it("'/projects' renders the Projects page", async () => {
    await renderAtRoute("/projects");
    expect(await screen.findByRole("heading", { level: 2, name: "Recent projects" })).toBeInTheDocument();
  });

  it("'/skills' renders the Skills page", async () => {
    await renderAtRoute("/skills");
    expect(await screen.findByRole("heading", { level: 1, name: "Skills for reliable AI systems." })).toBeInTheDocument();
  });
});

describe("Navigation — NavLink Click Flow", () => {
  it("clicking 'Experience' NavLink navigates to Experience page", async () => {
    const user = userEvent.setup();
    await renderAtRoute("/home");

    await user.click(screen.getByRole("button", { name: "Toggle navigation menu" }));
    const experienceLink = screen.getByText("Experience", { selector: "a" });
    await user.click(experienceLink);
    expect(window.location.pathname).toBe("/experience");
    expect(await screen.findByRole("heading", { level: 1, name: "Building and evaluating applied AI systems." })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Toggle navigation menu" })).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByRole("main")).toHaveFocus();
  });

  it("clicking 'Education and certifications' NavLink navigates to Education page", async () => {
    const user = userEvent.setup();
    await renderAtRoute("/home");

    await user.click(screen.getByRole("button", { name: "Toggle navigation menu" }));
    const educationLink = screen.getByText("Education and certifications");
    await user.click(educationLink);
    expect(window.location.pathname).toBe("/education");
    expect(await screen.findByRole("heading", {
      level: 1,
      name: "Academic foundations for applied AI.",
    })).toBeInTheDocument();
  });

  it("clicking 'Contact' NavLink navigates to Contact page", async () => {
    const user = userEvent.setup();
    await renderAtRoute("/home");

    await user.click(screen.getByRole("button", { name: "Toggle navigation menu" }));
    const navLink = screen.getByRole("link", { name: "Contact" });
    await user.click(navLink);
    expect(window.location.pathname).toBe("/contact");
    expect(await screen.findByRole("heading", { level: 1, name: "Let’s build useful AI systems." })).toBeInTheDocument();
  });

  it("clicking 'Projects' NavLink navigates to Projects page", async () => {
    const user = userEvent.setup();
    await renderAtRoute("/home");

    await user.click(screen.getByRole("button", { name: "Toggle navigation menu" }));
    const projectsLink = screen.getByText("Projects", { selector: "a" });
    await user.click(projectsLink);
    expect(window.location.pathname).toBe("/projects");
    expect(await screen.findByRole("heading", { level: 2, name: "Recent projects" })).toBeInTheDocument();
  });

  it("clicking 'Skills' NavLink navigates to Skills page", async () => {
    const user = userEvent.setup();
    await renderAtRoute("/home");

    await user.click(screen.getByRole("button", { name: "Toggle navigation menu" }));
    const skillsLink = screen.getByText("Skills", { selector: "a" });
    await user.click(skillsLink);
    expect(window.location.pathname).toBe("/skills");
    expect(await screen.findByRole("heading", { level: 1, name: "Skills for reliable AI systems." })).toBeInTheDocument();
  });

  it("clicking logo navigates to Home page", async () => {
    const user = userEvent.setup();
    await renderAtRoute("/experience");

    await user.click(screen.getByRole("button", { name: "Toggle navigation menu" }));
    const logo = screen.getByText("ahmad.m()");
    await user.click(logo);
    expect(window.location.pathname).toBe("/home");
    expect(await screen.findByRole("heading", { level: 1, name: "I build applied AI systems and test whether they work." })).toBeInTheDocument();
  });
});
