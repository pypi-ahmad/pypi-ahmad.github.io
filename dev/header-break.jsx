import React from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Header from "../src/components/header/Header";
import { ThemeControllerProvider } from "../src/themeController";
import { GlobalStyles } from "../src/global";
import "../src/index.css";

function HeaderScenarios() {
  return (
    <ThemeControllerProvider>
      <MotionConfig reducedMotion="user">
        <GlobalStyles />
        <MemoryRouter>
          <main style={{ padding: "1rem" }}>
            <h1>Header scenarios</h1>
            <p>Manual visual inspection pending. These are interactive scenarios,
              not a claim that every case has passed.</p>
            <p>
              Open each navigation panel and tab through its links. Try Escape,
              outside clicks, rapid toggles, browser zoom, and reduced motion.
              Use the real theme controls to change appearance.
            </p>
            <p>
              Fixed labels and item counts are authored by the site. No
              artificial content, loading, or error states are supplied.
            </p>
            {[320, 390, 1152].map((width) => (
              <section
                key={width}
                style={{ width, maxWidth: "100%", marginBlock: "2rem" }}
              >
                <h2>{width}px container</h2>
                <Header />
              </section>
            ))}
            <section
              style={{ maxWidth: "100%", width: 640, marginBlock: "2rem" }}
            >
              <h2>Squeezed by a grid sibling</h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr) minmax(0, 2fr)",
                }}
              >
                <p>Adjacent content</p>
                <div style={{ minWidth: 0 }}>
                  <Header />
                </div>
              </div>
            </section>
          </main>
        </MemoryRouter>
      </MotionConfig>
    </ThemeControllerProvider>
  );
}

if (import.meta.env.DEV) {
  createRoot(document.getElementById("root")).render(<HeaderScenarios />);
}
