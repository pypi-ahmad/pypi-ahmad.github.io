/**
 * Education Page (/education)
 *
 * Recruiter-facing proof sheet for academic background and certifications.
 *
 * Props: { theme }
 */
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Educations from "../../containers/education/Educations";
import Certifications from "../../containers/certifications/Certifications";
import { buildThemeBackground, buildThemeShadow, revealMotion } from "../../themeMotion";
import "./EducationComponent.css";

function Education(props) {
  const theme = props.theme;
  return (
    <div className="education-main">
      <Header />
      <main id="main-content">
        <div className="education-content">
          <section
            className="education-hero"
            aria-labelledby="education-title"
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
            <motion.p {...revealMotion(0, true)} className="education-eyebrow" style={{ color: theme.accentSolid }}>
              Education & credentials
            </motion.p>
            <h1 id="education-title" style={{ color: theme.text }}>
              Academic foundations for applied AI.
            </h1>
            <motion.p {...revealMotion(1, true)} className="education-intro" style={{ color: theme.secondaryText }}>
              Formal training in data analytics and computer science, reinforced
              by focused credentials in generative AI, machine learning, deep
              learning, and data systems.
            </motion.p>
          </section>

          <Educations theme={props.theme} />
          <Certifications theme={props.theme} />

          <motion.section
            {...revealMotion()}
            className="education-projects-bridge"
            aria-labelledby="education-projects-title"
            style={{
              background: buildThemeBackground(
                theme.cardBackgroundAlt,
                theme.surfacePattern
              ),
              border: `${theme.panelBorderWidth} ${theme.panelBorderStyle} ${theme.borderSoft}`,
              borderRadius: theme.surfaceRadius,
            }}
          >
            <div>
              <p className="education-eyebrow" style={{ color: theme.accentSolid }}>
                Learning put into practice
              </p>
              <h2 id="education-projects-title" style={{ color: theme.text }}>
                See the work behind the coursework.
              </h2>
              <p style={{ color: theme.secondaryText }}>
                Explore open-source work across model training, agents,
                evaluation, document AI, local-first tools, and developer
                workflows.
              </p>
            </div>
            <Link
              className="education-projects-link"
              to="/projects"
              style={{
                background: theme.accentGradient,
                color: theme.accentText,
                borderRadius: theme.controlRadius,
              }}
            >
              Explore projects
            </Link>
          </motion.section>
        </div>
      </main>
      <Footer theme={props.theme} />
    </div>
  );
}

export default Education;
