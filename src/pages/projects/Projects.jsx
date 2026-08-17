import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { projectsHeader, projects, socialMediaLinks } from "../../portfolio.js";
import { buildThemeBackground, buildThemeShadow } from "../../themeMotion";
import "./Projects.css";

export default function Projects({ theme }) {
  return (
    <div className="projects-main">
      <Header />
      <main id="main-content">
        <section
          className="projects-hero"
          aria-labelledby="projects-title"
          style={{
            background: buildThemeBackground(theme.heroGradient, theme.heroPattern),
            border: `${theme.panelBorderWidth} ${theme.panelBorderStyle} ${theme.borderSoft}`,
            borderRadius: theme.heroRadius,
            boxShadow: buildThemeShadow(
              `0 28px 80px ${theme.shadowColor}`,
              theme.panelGlow
            ),
          }}
        >
          <p className="projects-eyebrow" style={{ color: theme.accentSolid }}>
            Open-source applied AI
          </p>
          <h1 id="projects-title" style={{ color: theme.text }}>
            {projectsHeader.title}
          </h1>
          <p className="projects-intro" style={{ color: theme.secondaryText }}>
            {projectsHeader.description}
          </p>
          <a
            className="projects-github-link"
            href={socialMediaLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: theme.accentGradient,
              color: theme.accentText,
              borderRadius: theme.controlRadius,
            }}
          >
            View GitHub profile
          </a>
        </section>

        <section className="projects-section" aria-labelledby="recent-projects-title">
          <div className="projects-section-heading">
            <h2 id="recent-projects-title" style={{ color: theme.text }}>
              Recent projects
            </h2>
            <p style={{ color: theme.secondaryText }}>
              Ordered by portfolio priority. The first four also appear on the
              homepage.
            </p>
          </div>
          <div className="repo-cards-div-main">
            {projects.data.map((project, index) => (
              <ProjectCard
                key={project.url}
                repo={project}
                index={index + 1}
                priority={index < 4}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer theme={theme} />
    </div>
  );
}
