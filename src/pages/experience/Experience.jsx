import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ExperienceCard from "../../components/experienceCard/ExperienceCard";
import { experience } from "../../portfolio.js";
import { buildThemeBackground, buildThemeShadow } from "../../themeMotion";
import "./Experience.css";

export default function Experience({ theme }) {
  const roles = experience.sections.flatMap(section => section.experiences);

  return (
    <div className="experience-main">
      <Header />
      <main id="main-content">
        <section
          className="experience-hero"
          aria-labelledby="experience-title"
          style={{
            background: buildThemeBackground(theme.heroGradient, theme.heroPattern),
            border: `${theme.panelBorderWidth} ${theme.panelBorderStyle} ${theme.borderSoft}`,
            borderRadius: theme.heroRadius,
            boxShadow: buildThemeShadow(`0 28px 80px ${theme.shadowColor}`, theme.panelGlow),
          }}
        >
          <p className="experience-eyebrow" style={{ color: theme.accentSolid }}>
            {experience.eyebrow}
          </p>
          <h1 id="experience-title" style={{ color: theme.text }}>{experience.title}</h1>
          <p className="experience-intro" style={{ color: theme.secondaryText }}>
            {experience.description}
          </p>
        </section>

        <section className="experience-timeline" aria-labelledby="roles-title">
          <div className="experience-section-heading">
            <h2 id="roles-title" style={{ color: theme.text }}>Roles</h2>
            <p style={{ color: theme.secondaryText }}>
              Recent work first, with employer outcomes separated from individual contributions.
            </p>
          </div>
          <div className="experience-role-list">
            {roles.map(role => (
              <ExperienceCard key={`${role.company}-${role.title}`} experience={role} theme={theme} />
            ))}
          </div>
        </section>
      </main>
      <Footer theme={theme} />
    </div>
  );
}
