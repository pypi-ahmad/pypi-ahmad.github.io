/**
 * Projects Page (/projects)
 *
 * Two sections:
 *  1. Enterprise Systems — SystemCard showcase of production systems
 *  2. Open Source Projects — ProjectCard grid (shown only if data exists)
 *
 * Includes a "More Projects" button linking to the GitHub profile.
 *
 * Props: { theme }
 */
import React, { useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import SystemCard from "../../components/SystemDesign/SystemCard";
import { motion } from "framer-motion";
import { projectsHeader, projects, socialMediaLinks, systems } from "../../portfolio.js";
import "./Projects.css";
import ProjectsImg from "./ProjectsImg";
import styled from "styled-components";
import {
  buildThemeBackground,
  buildThemeShadow,
  themeElevatedSurfaceTransition,
  themeTextTransition,
} from "../../themeMotion";

const ProjectsButton = styled.a`
  background: ${props => buildThemeBackground(props.theme.buttonColor, props.theme.buttonPattern)};
  color: ${props => props.theme.buttonText};
  border: ${props => `${props.theme.panelBorderWidth} ${props.theme.panelBorderStyle} ${props.theme.borderColor}`};
  border-radius: ${props => props.theme.controlRadius};
  box-shadow: ${props => buildThemeShadow(`0 18px 44px ${props.theme.shadowColor}`, props.theme.buttonGlow)};
  font-family: ${props => props.theme.accentFontFamily};
  letter-spacing: ${props => props.theme.accentLetterSpacing};
  transition: transform 0.2s ease, background-color var(--theme-transition-medium), color var(--theme-transition-fast), border-color var(--theme-transition-fast), box-shadow var(--theme-transition-slow);
  &:hover {
    color: ${props => props.theme.buttonText};
    transform: translateY(-2px);
  }
`;

function Projects(props) {
  const theme = props.theme;
  const [activeSystem, setActiveSystem] = useState(null);

  return (
    <div className="projects-main">
      <Header />
      <div className="basic-projects">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="projects-heading-div">
            <div className="projects-heading-img-div">
              <ProjectsImg theme={theme} />
            </div>
            <div className="projects-heading-text-div">
              <h1
                className="projects-heading-text"
                style={{ color: theme.text, transition: themeTextTransition }}
              >
                {projectsHeader.title}
              </h1>
              <p
                className="projects-header-detail-text subTitle"
                style={{ color: theme.secondaryText, transition: themeTextTransition }}
              >
                {projectsHeader["description"]}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Systems Showcase Section */}
      <div
        className="systems-div-main"
        style={{
          padding: "2rem 5%",
          background: buildThemeBackground(theme.bodyAlt, theme.surfacePattern),
          borderTop: `${theme.panelBorderWidth} ${theme.panelBorderStyle} ${theme.borderSoft}`,
          borderBottom: `${theme.panelBorderWidth} ${theme.panelBorderStyle} ${theme.borderSoft}`,
          borderRadius: theme.surfaceRadius,
          boxShadow: buildThemeShadow(`0 18px 40px ${theme.shadowColor}`, theme.panelGlow),
          transition: themeElevatedSurfaceTransition,
        }}
      >
        <h2
          style={{
            color: theme.text,
            fontFamily: theme.accentFontFamily,
            letterSpacing: theme.accentLetterSpacing,
            transition: themeTextTransition,
            textAlign: "center",
            marginBottom: "2rem",
            fontSize: "2.5rem",
          }}
        >
          Enterprise Systems
        </h2>
        {systems.data.map((sys, index) => (
          <div
            key={index}
            onMouseEnter={() => setActiveSystem(sys.id)}
            onMouseLeave={() => setActiveSystem(null)}
            style={{
              transition: "opacity 0.3s ease",
              opacity: activeSystem && activeSystem !== sys.id ? 0.4 : 1,
            }}
          >
            <SystemCard system={sys} theme={theme} />
          </div>
        ))}
      </div>

      {/* Projects Section */}
      {projects.data.length > 0 && (
        <div
          className="systems-div-main"
          style={{
            padding: "2rem 5%",
            background: buildThemeBackground(theme.bodyAlt, theme.surfacePattern),
            borderTop: `${theme.panelBorderWidth} ${theme.panelBorderStyle} ${theme.borderSoft}`,
            borderBottom: `${theme.panelBorderWidth} ${theme.panelBorderStyle} ${theme.borderSoft}`,
            borderRadius: theme.surfaceRadius,
            boxShadow: buildThemeShadow(`0 18px 40px ${theme.shadowColor}`, theme.panelGlow),
            transition: themeElevatedSurfaceTransition,
          }}
        >
          <h2
            style={{
              color: theme.text,
              fontFamily: theme.accentFontFamily,
              letterSpacing: theme.accentLetterSpacing,
              transition: themeTextTransition,
              textAlign: "center",
              marginBottom: "2rem",
              fontSize: "2.5rem",
            }}
          >
            Open Source Projects
          </h2>

          <div className="repo-cards-div-main">
            {projects.data.map((repo) => {
              return <ProjectCard key={repo.name} repo={repo} theme={theme} />;
            })}
          </div>
        </div>
      )}
      <br />
      <br />
      <br />
      <ProjectsButton
        theme={theme}
        className="general-btn"
        href={socialMediaLinks.github}
        target="_blank"
        rel="noopener noreferrer"
      >
        More Projects (Github)
      </ProjectsButton>
      <br />
      <br />
      <Footer theme={props.theme} onToggle={props.onToggle} />
    </div>
  );
}

export default Projects;
