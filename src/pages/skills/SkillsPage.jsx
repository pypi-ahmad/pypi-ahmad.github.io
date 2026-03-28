/**
 * Skills Page (/skills)
 *
 * Full technical skills grid organized by domain. Each section shows
 * Iconify skill icons linking to official docs and an optional text
 * bullet list.  Driven by `skillsPageData` from the data layer.
 *
 * Props: { theme }
 */
import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { motion } from "framer-motion";
import { skillsPageData } from "../../portfolio";
import SkillIcon from "../../components/icons/SkillIcon";
import "./SkillsPage.css";
import { buildThemeBackground, buildThemeShadow } from "../../themeMotion";

/** Individual skill category section within the page grid. */
const SkillSection = ({ section, theme }) => {
  return (
    <div
      className="skill-section"
      style={{
        background: buildThemeBackground(theme.cardBackgroundAlt, theme.surfacePattern),
        border: `${theme.panelBorderWidth} ${theme.panelBorderStyle} ${theme.borderSoft}`,
        borderRadius: theme.surfaceRadius,
        boxShadow: buildThemeShadow(`0 20px 44px ${theme.shadowColor}`, theme.panelGlow),
      }}
    >
      <h3
        className="skill-section-title"
        style={{
          color: theme.text,
          fontFamily: theme.accentFontFamily,
          letterSpacing: theme.accentLetterSpacing,
        }}
      >
        {section.title}
      </h3>
      {section.softwareSkills.length > 0 && (
        <div className="skills-icon-grid">
          {section.softwareSkills.map((skill, index) => (
            <a
              key={index}
              href={skill.link}
              target="_blank"
              rel="noopener noreferrer"
              className="skill-icon-item"
              style={{
                background: buildThemeBackground(theme.accentSoft, theme.buttonPattern),
                border: `${theme.panelBorderWidth} ${theme.panelBorderStyle} ${theme.borderSoft}`,
                borderRadius: theme.controlRadius,
                boxShadow: buildThemeShadow(`0 16px 30px ${theme.shadowColor}`, theme.buttonGlow),
                color: theme.text,
              }}
            >
              <SkillIcon skill={skill} className="iconify skill-page-icon" />
              <span
                className="skill-icon-name"
                style={{ color: theme.secondaryText }}
              >
                {skill.skillName}
              </span>
            </a>
          ))}
        </div>
      )}
      {section.skills && section.skills.length > 0 && (
        <ul className="skill-text-list">
          {section.skills.map((s, i) => (
            <li key={i} className="skill-text-item" style={{ color: theme.secondaryText }}>
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

function SkillsPage(props) {
  const theme = props.theme;
  return (
    <div className="skills-main">
      <Header />
      <div className="basic-skills">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="skills-heading-div">
            <div className="skills-heading-text-div">
              <h1 className="skills-heading-text" style={{ color: theme.text }}>
                {skillsPageData.title}
              </h1>
              <p
                className="skills-header-detail-text subTitle"
                style={{ color: theme.secondaryText }}
              >
                {skillsPageData.subtitle}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="skills-card-div">
            {skillsPageData.skills.map((section, index) => (
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                  key={index}
                >
                    <SkillSection section={section} theme={theme} />
                </motion.div>
            ))}
        </div>
      </div>
      <Footer theme={props.theme} />
    </div>
  );
}

export default SkillsPage;
