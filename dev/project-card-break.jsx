import React from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Header from "../src/components/header/Header";
import ProjectCard from "../src/components/ProjectCard/ProjectCard";
import { projects } from "../src/data/projects";
import { ThemeControllerProvider } from "../src/themeController";
import { GlobalStyles } from "../src/global";
import "../src/index.css";

const byNameLength = [...projects.data].sort((a, b) => a.name.length - b.name.length);
const short = byNameLength[0];
const long = byNameLength.at(-1);
const scenarios = [
  { label: "Short title · 320px", width: 320, repo: short, index: 1 },
  { label: "Long title · 320px · priority", width: 320, repo: long, index: 13, priority: true },
  { label: "No optional category or index · 390px", width: 390, repo: { ...long, category: undefined } },
  { label: "Wide container · 720px", width: 720, repo: long, index: 13 },
];

function ProjectCardScenarios() {
  return (
    <ThemeControllerProvider>
      <MotionConfig reducedMotion="user">
        <GlobalStyles />
        <MemoryRouter>
          <Header />
          <main style={{ padding: "1rem" }}>
            <h1>Project card scenarios</h1>
            <p>Manual visual inspection pending. No scenario is marked as a failure.</p>
            <p>Use the navigation’s theme controls, browser zoom, keyboard focus,
              and your reduced-motion setting. Cards use existing project content.</p>
            {scenarios.map(({ label, width, ...props }) => (
              <section key={label} style={{ width, maxWidth: "100%", marginBlock: "2rem" }}>
                <h2>{label}</h2>
                <ProjectCard {...props} />
              </section>
            ))}
            <section style={{ width: 640, maxWidth: "100%", marginBlock: "2rem" }}>
              <h2>Squeezed by a grid sibling</h2>
              <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 2fr)", gap: "1rem" }}>
                <p>Adjacent content</p>
                <ProjectCard repo={long} index={13} priority />
              </div>
            </section>
          </main>
        </MemoryRouter>
      </MotionConfig>
    </ThemeControllerProvider>
  );
}

if (import.meta.env.DEV) {
  createRoot(document.getElementById("root")).render(<ProjectCardScenarios />);
}
