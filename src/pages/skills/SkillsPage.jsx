import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { homePageData, projects, skillsPageData } from "../../portfolio";
import { buildThemeBackground, buildThemeShadow } from "../../themeMotion";
import "./SkillsPage.css";

export default function SkillsPage({ theme }) {
  const featuredProjects = skillsPageData.featuredProjectNames.map(name =>
    projects.data.find(project => project.name === name)
  );

  return (
    <div className="skills-main">
      <Header />
      <main id="main-content">
        <section
          className="skills-hero"
          aria-labelledby="skills-title"
          style={{
            background: buildThemeBackground(theme.heroGradient, theme.heroPattern),
            border: `${theme.panelBorderWidth} ${theme.panelBorderStyle} ${theme.borderSoft}`,
            borderRadius: theme.heroRadius,
            boxShadow: buildThemeShadow(`0 28px 80px ${theme.shadowColor}`, theme.panelGlow),
          }}
        >
          <p className="skills-eyebrow" style={{ color: theme.accentSolid }}>
            {skillsPageData.eyebrow}
          </p>
          <h1 id="skills-title" style={{ color: theme.text }}>
            {skillsPageData.title}
          </h1>
          <p className="skills-intro" style={{ color: theme.secondaryText }}>
            {skillsPageData.subtitle}
          </p>
        </section>

        <section className="skills-section" aria-labelledby="capabilities-title">
          <div className="skills-section-heading">
            <h2 id="capabilities-title" style={{ color: theme.text }}>Core capabilities</h2>
            <p style={{ color: theme.secondaryText }}>
              System-level skills organized around what gets built and verified.
            </p>
          </div>
          <div className="capability-grid">
            {skillsPageData.capabilities.map(capability => (
              <article
                key={capability.title}
                className="capability-card"
                style={{
                  background: buildThemeBackground(theme.cardBackgroundAlt, theme.surfacePattern),
                  border: `${theme.panelBorderWidth} ${theme.panelBorderStyle} ${theme.borderSoft}`,
                  borderRadius: theme.surfaceRadius,
                  boxShadow: buildThemeShadow(`0 16px 32px ${theme.shadowColor}`, theme.panelGlow),
                }}
              >
                <h3 style={{ color: theme.accentSolid }}>{capability.title}</h3>
                <p style={{ color: theme.secondaryText }}>{capability.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="skills-section" aria-labelledby="skills-evidence-title">
          <div className="skills-section-heading">
            <h2 id="skills-evidence-title" style={{ color: theme.text }}>Evidence in practice</h2>
            <p style={{ color: theme.secondaryText }}>
              Qualified employer outcomes and public implementations provide context for these capabilities.
            </p>
          </div>
          <ul className="skills-outcome-grid">
            {homePageData.outcomes.map(outcome => (
              <li
                key={outcome.label}
                style={{
                  background: buildThemeBackground(theme.accentSoft, theme.surfacePattern),
                  border: `${theme.panelBorderWidth} ${theme.panelBorderStyle} ${theme.borderSoft}`,
                  borderRadius: theme.surfaceRadius,
                }}
              >
                <strong style={{ color: theme.accentSolid }}>{outcome.metric}</strong>
                <h3 style={{ color: theme.text }}>{outcome.label}</h3>
                <p style={{ color: theme.secondaryText }}>{outcome.context}</p>
              </li>
            ))}
          </ul>
          <div className="skills-proof-grid">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.url} repo={project} index={index + 1} priority />
            ))}
          </div>
        </section>

        <section className="skills-section" aria-labelledby="toolkit-title">
          <div className="skills-section-heading">
            <h2 id="toolkit-title" style={{ color: theme.text }}>Working toolkit</h2>
            <p style={{ color: theme.secondaryText }}>
              A curated set of tools used across current work and public projects.
            </p>
          </div>
          <div className="toolkit-grid">
            {skillsPageData.toolGroups.map(group => (
              <article
                key={group.title}
                className="toolkit-group"
                style={{
                  background: theme.cardBackgroundAlt,
                  border: `${theme.panelBorderWidth} ${theme.panelBorderStyle} ${theme.borderSoft}`,
                  borderRadius: theme.surfaceRadius,
                }}
              >
                <h3 style={{ color: theme.text }}>{group.title}</h3>
                <ul>
                  {group.tools.map(tool => (
                    <li key={tool} style={{ color: theme.secondaryText, borderColor: theme.borderSoft }}>
                      {tool}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section
          className="skills-cta"
          style={{
            background: theme.accentSoft,
            border: `${theme.panelBorderWidth} ${theme.panelBorderStyle} ${theme.borderSoft}`,
            borderRadius: theme.surfaceRadius,
          }}
        >
          <div>
            <h2 style={{ color: theme.text }}>See the skills in working systems.</h2>
            <p style={{ color: theme.secondaryText }}>
              Review implementation details or discuss an Applied AI role or engagement.
            </p>
          </div>
          <div className="skills-cta-actions">
            <Link to="/projects" style={{ background: theme.accentGradient, color: theme.accentText }}>
              View projects
            </Link>
            <Link to="/contact" style={{ color: theme.text, borderColor: theme.borderSoft }}>
              Contact me
            </Link>
          </div>
        </section>
      </main>
      <Footer theme={theme} />
    </div>
  );
}
