import React from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { FaDiscord, FaEnvelope } from "react-icons/fa";
import Header from "../../src/components/header/Header";
import ProjectCard from "../../src/components/ProjectCard/ProjectCard";
import CertificationCard from "../../src/components/certificationCard/CertificationCard";
import ExperienceCard from "../../src/components/experienceCard/ExperienceCard";
import ContactLinksList from "../../src/components/socialMedia/ContactLinksList";
import { ThemeControllerProvider, useThemeController } from "../../src/themeController";
import { GlobalStyles } from "../../src/global";
import "../../src/index.css";
import { reports } from "./fixtures";

const components = {
  project: ProjectCard,
  certification: CertificationCard,
  experience: ExperienceCard,
  contact: ContactLinksList,
};

function Report() {
  const { resolvedTheme } = useThemeController();
  const kind = document.documentElement.dataset.component;
  const report = reports[kind];
  const Component = components[kind];

  return (
    <>
      <Header />
      <main id="main-content">
        <h1>{report.title} stress-test page</h1>
        <p>{report.scope}</p>
        <p>Visual inspection pending. Nothing here is marked passed or broken.</p>
        <p>All content is fixture data, not portfolio claims. Example links are placeholders; local images are borrowed only to exercise image slots.</p>
        <p>Use the real header theme controls, browser zoom and OS reduced-motion setting. Tab through links and try hover and press feedback. Widths below are fixed containers, not viewport simulations; view on a wide browser to see them together.</p>
        <p>{report.omitted}</p>
        <nav aria-label="Stress-test pages">
          <ul>
            {Object.entries(reports).map(([key, value]) => (
              <li key={key}><a href={`./${key}.html`}>{value.title}</a></li>
            ))}
          </ul>
        </nav>
        {report.scenarios.map(({ label, width = 480, squeezed, props }) => {
          const fixtureProps = kind === "contact" ? {
            ...props,
            items: props.items.map(item => ({
              ...item,
              Icon: item.label === "Email" ? FaEnvelope : item.label === "Discord" ? FaDiscord : undefined,
            })),
          } : props;
          return (
            <section key={label}>
              <h2>{label}</h2>
              <p>Not visually inspected.</p>
              {squeezed ? (
                <div style={{ width: 640, display: "grid", gridTemplateColumns: "240px minmax(0, 1fr)", gap: "1rem" }}>
                  <p>Adjacent content</p>
                  <Component {...fixtureProps} theme={resolvedTheme} />
                </div>
              ) : (
                <div style={{ width }}>
                  <Component {...fixtureProps} theme={resolvedTheme} />
                </div>
              )}
            </section>
          );
        })}
      </main>
    </>
  );
}

// The scratch HTML entries mount only in development; production routing never imports this harness.
if (import.meta.env.DEV) {
  createRoot(document.getElementById("root")).render(
    <ThemeControllerProvider>
      <MotionConfig reducedMotion="user">
        <GlobalStyles />
        <MemoryRouter><Report /></MemoryRouter>
      </MotionConfig>
    </ThemeControllerProvider>
  );
}
