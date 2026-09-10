import React from "react";
import { motion } from "framer-motion";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ExperienceCard from "../../components/experienceCard/ExperienceCard";
import { experience } from "../../portfolio.js";
import { buildThemeBackground, buildThemeShadow, revealMotion } from "../../themeMotion";
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
          <motion.p {...revealMotion(0, true)} className="experience-eyebrow" style={{ color: theme.accentSolid }}>
            {experience.eyebrow}
          </motion.p>
          <h1 id="experience-title" style={{ color: theme.text }}>{experience.title}</h1>
          <motion.p {...revealMotion(1, true)} className="experience-intro" style={{ color: theme.secondaryText }}>
            {experience.description}
          </motion.p>
        </section>

        <section className="experience-timeline" aria-labelledby="roles-title">
          <motion.div {...revealMotion()} className="experience-section-heading">
            <h2 id="roles-title" style={{ color: theme.text }}>Roles</h2>
            <p style={{ color: theme.secondaryText }}>
              Recent work first, with employer outcomes separated from individual contributions.
            </p>
          </motion.div>
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
