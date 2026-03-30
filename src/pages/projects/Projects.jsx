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
import ProductTile from "../../components/SystemDesign/ProductTile";
import { motion } from "framer-motion";
import { projectsHeader, projects, socialMediaLinks, systems, platformHeader, platformInfrastructure, platformCategories } from "../../portfolio.js";
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

      {/* Agentic AI Platform Section */}
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
            marginBottom: "0.75rem",
            fontSize: "2.5rem",
          }}
        >
          {platformHeader.title}
        </h2>
        <p
          className="platform-subtitle"
          style={{
            color: theme.secondaryText,
            transition: themeTextTransition,
            textAlign: "center",
            marginBottom: "1.25rem",
            fontSize: "1.1rem",
            lineHeight: "1.6",
            maxWidth: "900px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {platformHeader.subtitle}
        </p>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
          <ProjectsButton
            theme={theme}
            className="general-btn"
            href={platformHeader.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "0.95rem", padding: "0.6rem 1.5rem" }}
          >
            View on GitHub
          </ProjectsButton>
        </div>

        {/* Shared Infrastructure */}
        <div
          className="platform-infra-card"
          style={{
            background: buildThemeBackground(theme.body, theme.surfacePattern),
            border: `${theme.panelBorderWidth} ${theme.panelBorderStyle} ${theme.borderColor}`,
            borderRadius: theme.controlRadius,
            padding: "1.5rem 2rem",
            marginBottom: "2rem",
            textAlign: "left",
            maxWidth: "900px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <h3
            style={{
              color: theme.text,
              fontFamily: theme.accentFontFamily,
              letterSpacing: theme.accentLetterSpacing,
              transition: themeTextTransition,
              marginBottom: "0.75rem",
              fontSize: "1.25rem",
            }}
          >
            Shared Platform Layer
          </h3>
          <p
            style={{
              color: theme.secondaryText,
              transition: themeTextTransition,
              fontSize: "0.95rem",
              lineHeight: "1.5",
              marginBottom: "1rem",
            }}
          >
            {platformInfrastructure.description}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {platformInfrastructure.tech.map((t) => (
              <span
                key={t}
                className="platform-tech-badge"
                style={{
                  background: buildThemeBackground(theme.buttonColor, theme.buttonPattern),
                  color: theme.buttonText,
                  padding: "0.25rem 0.75rem",
                  borderRadius: theme.controlRadius,
                  fontSize: "0.8rem",
                  fontFamily: theme.accentFontFamily,
                  letterSpacing: theme.accentLetterSpacing,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Category groups */}
        {platformCategories.map((category) => (
          <div key={category.name} className="platform-category-group" style={{ marginBottom: "2rem" }}>
            <h3
              className="platform-category-heading"
              style={{
                color: theme.text,
                fontFamily: theme.accentFontFamily,
                letterSpacing: theme.accentLetterSpacing,
                transition: themeTextTransition,
                textAlign: "center",
                marginBottom: "0.75rem",
                fontSize: "1.75rem",
              }}
            >
              {category.name}
            </h3>
            <p
              style={{
                color: theme.secondaryText,
                transition: themeTextTransition,
                textAlign: "center",
                marginBottom: "1.5rem",
                fontSize: "0.95rem",
                maxWidth: "800px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              {category.description}
            </p>
            <div className="product-tile-grid">
              {category.systems.map((sys) => (
                <ProductTile key={sys.id} system={sys} theme={theme} />
              ))}
            </div>
          </div>
        ))}
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
        <div className="product-tile-grid">
          {systems.data.map((sys, index) => (
            <ProductTile key={index} system={sys} theme={theme} />
          ))}
        </div>
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
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ProjectsButton
          theme={theme}
          className="general-btn"
          href={socialMediaLinks.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          More Projects (Github)
        </ProjectsButton>
      </div>
      <br />
      <br />
      <Footer theme={props.theme} />
    </div>
  );
}

export default Projects;
