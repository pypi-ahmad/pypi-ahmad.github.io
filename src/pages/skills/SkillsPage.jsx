/**
 * Skills Page (/skills)
 *
 * Full technical skills grid organized by domain. Each section shows
 * Iconify skill icons linking to official docs and an optional text
 * bullet list.  Driven by `skillsPageData` from the data layer.
 *
 * Props: { theme, setTheme }
 */
import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { motion } from "framer-motion";
import { skillsPageData } from "../../portfolio";
import "./SkillsPage.css";

/** Individual skill category section within the page grid. */
const SkillSection = ({ section, theme }) => {
  return (
    <div
      className="skill-section"
      style={{
        backgroundColor: theme.imageDark,
        boxShadow: `0 5px 15px ${
          theme.imageDark === "#333"
            ? "rgba(255,255,255,0.1)"
            : "rgba(0,0,0,0.1)"
        }`,
      }}
    >
      <h3 className="skill-section-title" style={{ color: theme.text }}>
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
            >
              <span
                className="iconify skill-page-icon"
                data-icon={skill.fontAwesomeClassname}
                style={skill.style}
                data-inline="false"
              ></span>
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
      <Header theme={theme} setTheme={props.setTheme} />
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
