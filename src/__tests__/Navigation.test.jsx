/**
 * Navigation Flow Tests
 *
 * Verifies React Router navigation via the full app route tree (Main.jsx).
 * Tests that clicking NavLinks renders the correct page content,
 * and that direct URL entry (via MemoryRouter) resolves properly.
 *
 * Source: src/containers/Main.jsx, src/components/header/Header.jsx
 */
import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { MotionConfig } from "framer-motion";
import { themes } from "../theme";

import Home from "../pages/home/HomeComponent";
import Experience from "../pages/experience/Experience";
import Education from "../pages/education/EducationComponent";
import Contact from "../pages/contact/ContactComponent";
import Projects from "../pages/projects/Projects";
import SkillsPage from "../pages/skills/SkillsPage";

const theme = themes.dark;
const setTheme = vi.fn();
const routeProps = { theme, setTheme };

/**
 * Renders the full route tree inside a MemoryRouter at the given path.
 */
function renderAtRoute(initialPath) {
  return render(
    <ThemeProvider theme={theme}>
      <MotionConfig reducedMotion="always">
        <MemoryRouter initialEntries={[initialPath]}>
          <Routes>
            <Route path="/" element={<Home {...routeProps} />} />
            <Route path="/home" element={<Home {...routeProps} />} />
            <Route path="/experience" element={<Experience {...routeProps} />} />
            <Route path="/education" element={<Education {...routeProps} />} />
            <Route path="/contact" element={<Contact {...routeProps} />} />
            <Route path="/projects" element={<Projects {...routeProps} />} />
            <Route path="/skills" element={<SkillsPage {...routeProps} />} />
          </Routes>
        </MemoryRouter>
      </MotionConfig>
    </ThemeProvider>
  );
}

describe("Navigation — Route Resolution", () => {
  it("'/' renders the Home page (isSplash=false)", () => {
    renderAtRoute("/");
    expect(screen.getByRole("heading", { level: 1, name: "Hello." })).toBeInTheDocument();
  });

  it("'/home' renders the Home page", () => {
    renderAtRoute("/home");
    expect(screen.getByRole("heading", { level: 1, name: "Hello." })).toBeInTheDocument();
  });

  it("'/experience' renders the Experience page", () => {
    renderAtRoute("/experience");
    expect(screen.getByText("Systems Built · Impact Delivered")).toBeInTheDocument();
  });

  it("'/education' renders the Education page", () => {
    renderAtRoute("/education");
    expect(screen.getByRole("heading", { level: 1, name: "Education" })).toBeInTheDocument();
  });

  it("'/contact' renders the Contact page", () => {
    renderAtRoute("/contact");
    expect(screen.getByText("Want to know more?")).toBeInTheDocument();
  });

  it("'/projects' renders the Projects page", () => {
    renderAtRoute("/projects");
    expect(screen.getByText("Enterprise Systems")).toBeInTheDocument();
  });

  it("'/skills' renders the Skills page", () => {
    renderAtRoute("/skills");
    expect(screen.getByRole("heading", { level: 1, name: "Technical Skills" })).toBeInTheDocument();
  });
});

describe("Navigation — NavLink Click Flow", () => {
  it("clicking 'Experience' NavLink navigates to Experience page", async () => {
    const user = userEvent.setup();
    renderAtRoute("/home");

    const experienceLink = screen.getByText("Experience", { selector: "a" });
    await user.click(experienceLink);
    expect(screen.getByText("Systems Built · Impact Delivered")).toBeInTheDocument();
  });

  it("clicking 'Education and Certifications' NavLink navigates to Education page", async () => {
    const user = userEvent.setup();
    renderAtRoute("/home");

    const educationLink = screen.getByText("Education and Certifications");
    await user.click(educationLink);
    expect(screen.getByRole("heading", { level: 1, name: "Education" })).toBeInTheDocument();
  });

  it("clicking 'Contact Me' NavLink navigates to Contact page", async () => {
    const user = userEvent.setup();
    renderAtRoute("/home");

    // Get the nav link (not the CTA button)
    const contactLinks = screen.getAllByText("Contact Me");
    const navLink = contactLinks.find((el) => el.closest("a")?.getAttribute("href") === "/contact");
    await user.click(navLink);
    expect(screen.getByText("Want to know more?")).toBeInTheDocument();
  });

  it("clicking 'Projects' NavLink navigates to Projects page", async () => {
    const user = userEvent.setup();
    renderAtRoute("/home");

    const projectsLink = screen.getByText("Projects", { selector: "a" });
    await user.click(projectsLink);
    expect(screen.getByText("Enterprise Systems")).toBeInTheDocument();
  });

  it("clicking 'Skills' NavLink navigates to Skills page", async () => {
    const user = userEvent.setup();
    renderAtRoute("/home");

    const skillsLink = screen.getByText("Skills", { selector: "a" });
    await user.click(skillsLink);
    expect(screen.getByRole("heading", { level: 1, name: "Technical Skills" })).toBeInTheDocument();
  });

  it("clicking logo navigates to Home page", async () => {
    const user = userEvent.setup();
    renderAtRoute("/experience");

    const logo = screen.getByText("ahmad.m()");
    await user.click(logo);
    expect(screen.getByRole("heading", { level: 1, name: "Hello." })).toBeInTheDocument();
  });
});
