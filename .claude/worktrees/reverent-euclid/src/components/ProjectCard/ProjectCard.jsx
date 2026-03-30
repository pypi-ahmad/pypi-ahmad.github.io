/**
 * ProjectCard — Styled card for open-source project entries.
 *
 * Matches the SystemCard visual language: glass background, accent border,
 * accent-colored title, ⚡ metric highlights, tech icons, and lift hover.
 *
 * Props: { repo (project object), theme }
 */
import React from "react";
import ProjectLanguages from "../projectLanguages/ProjectLanguages";
import "./ProjectCard.css";
import { motion } from "framer-motion";
import { buildThemeBackground, buildThemeShadow } from "../../themeMotion";

export default function ProjectCard({ repo: project, theme }) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div
        className="project-card"
        style={{
          background: buildThemeBackground(theme.cardBackgroundAlt, theme.surfacePattern),
          borderColor: theme.borderSoft,
          borderWidth: theme.panelBorderWidth,
          borderStyle: theme.panelBorderStyle,
          borderRadius: theme.surfaceRadius,
          boxShadow: buildThemeShadow(`0 24px 56px ${theme.shadowColor}`, theme.panelGlow),
          color: theme.text,
        }}
      >

        {/* HEADER */}
        <div className="project-header">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-title-link"
                  style={{
                    color: theme.accentColor,
                    fontFamily: theme.accentFontFamily,
                    letterSpacing: theme.accentLetterSpacing,
                  }}
                >
                  <h2 className="project-title">{project.name}</h2>
                </a>
              ) : (
                <h2
                  className="project-title"
                  style={{
                    color: theme.accentColor,
                    fontFamily: theme.accentFontFamily,
                    letterSpacing: theme.accentLetterSpacing,
                  }}
                >
                  {project.name}
                </h2>
              )}
            </div>
            {project.category && (
              <span
                className="project-category"
                style={{
                  background: buildThemeBackground(theme.accentSoft, theme.buttonPattern),
                  color: theme.accentColor,
                  borderColor: theme.borderSoft,
                  borderWidth: theme.panelBorderWidth,
                  borderStyle: theme.panelBorderStyle,
                  borderRadius: theme.pillRadius,
                  fontFamily: theme.accentFontFamily,
                  letterSpacing: theme.accentLetterSpacing,
                }}
              >
                {project.category}
              </span>
            )}
          </div>
          {project.tagline && (
            <p className="project-tagline" style={{ color: theme.secondaryText }}>
              {project.tagline}
            </p>
          )}
        </div>

        {/* DESCRIPTION */}
        <p className="project-description" style={{ color: theme.secondaryText }}>
          {project.description}
        </p>

        {/* METRICS */}
        {project.metrics && (
          <div className="project-metrics">
            {project.metrics.map((metric, i) => (
              <span
                key={i}
                className="project-metric"
                style={{
                  color: theme.accentColor,
                  background: buildThemeBackground(theme.accentSoft, theme.buttonPattern),
                  borderColor: theme.borderSoft,
                  borderWidth: theme.panelBorderWidth,
                  borderStyle: theme.panelBorderStyle,
                  borderRadius: theme.pillRadius,
                  boxShadow: buildThemeShadow(`0 14px 28px ${theme.shadowColor}`, theme.buttonGlow),
                  fontFamily: theme.accentFontFamily,
                  letterSpacing: theme.accentLetterSpacing,
                }}
              >
                ⚡ {metric}
              </span>
            ))}
          </div>
        )}

        {/* TECH STACK (icons) */}
        <div className="project-tech">
          <ProjectLanguages logos={project.languages} theme={theme} />
        </div>

      </div>
    </motion.div>
  );
}
