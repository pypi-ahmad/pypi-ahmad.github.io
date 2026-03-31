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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.9rem 1.5rem;
  min-height: 50px;
  max-width: 100%;
  box-sizing: border-box;
  text-align: center;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.2;
  white-space: nowrap;
  cursor: pointer;
  background: ${props => props.theme.accentGradient};
  color: ${props => props.theme.accentText};
  border: ${props => `${props.theme.panelBorderWidth} ${props.theme.panelBorderStyle} ${props.theme.borderColor}`};
  border-radius: ${props => props.theme.controlRadius};
  box-shadow: ${props => buildThemeShadow(`0 18px 44px ${props.theme.shadowColor}`, props.theme.buttonGlow)};
  font-family: ${props => props.theme.accentFontFamily};
  letter-spacing: ${props => props.theme.accentLetterSpacing};
  filter: brightness(1);
  transition:
    transform 200ms ease-in-out,
    filter 200ms ease-in-out,
    background-color 200ms ease-in-out,
    color 200ms ease-in-out,
    border-color 200ms ease-in-out,
    box-shadow 200ms ease-in-out;
  &:hover {
    color: ${props => props.theme.accentText};
    filter: brightness(1.04);
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    width: 100%;
    white-space: normal;
  }
`;

function Projects(props) {
  const theme = props.theme;
  const [activeSystem, setActiveSystem] = useState(null);
  const sectionShellStyle = {
    padding: "var(--section-spacing) var(--page-gutter)",
    background: buildThemeBackground(theme.bodyAlt, theme.surfacePattern),
    borderTop: `${theme.panelBorderWidth} ${theme.panelBorderStyle} ${theme.borderSoft}`,
    borderBottom: `${theme.panelBorderWidth} ${theme.panelBorderStyle} ${theme.borderSoft}`,
    borderRadius: theme.surfaceRadius,
    boxShadow: buildThemeShadow(`0 18px 40px ${theme.shadowColor}`, theme.panelGlow),
    transition: themeElevatedSurfaceTransition,
  };

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
        className="systems-div-main section-accent-glow"
        style={sectionShellStyle}
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
            maxWidth: "56rem",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {platformHeader.subtitle}
        </p>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
          <ProjectsButton
            theme={theme}
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
          className="platform-infra-card shadow-sm hover-shadow-lg hover-translate-y-1 transition-all duration-200 layer-card"
          style={{
            background: buildThemeBackground(theme.cardBackgroundAlt, theme.surfacePattern),
            border: `${theme.panelBorderWidth} ${theme.panelBorderStyle} ${theme.borderColor}`,
            borderRadius: "12px",
            padding: "24px 32px",
            marginBottom: "2rem",
            textAlign: "left",
            maxWidth: "56rem",
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
                maxWidth: "50rem",
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
        style={sectionShellStyle}
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
          style={sectionShellStyle}
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
              return <ProjectCard key={repo.name} repo={repo} />;
            })}
          </div>
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: `0 var(--page-gutter) var(--section-spacing)`,
        }}
      >
        <ProjectsButton
          theme={theme}
          href={socialMediaLinks.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          More Projects (Github)
        </ProjectsButton>
      </div>
      <Footer theme={props.theme} />
    </div>
  );
}

export default Projects;
