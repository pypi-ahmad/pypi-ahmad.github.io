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

export default function ProjectCard({ repo: project, theme }) {
  const isLight = theme?.name === "light";

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className={`project-card ${isLight ? "light-mode" : ""}`}>

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
                >
                  <h2 className="project-title">{project.name}</h2>
                </a>
              ) : (
                <h2 className="project-title">{project.name}</h2>
              )}
            </div>
            {project.category && (
              <span className="project-category">{project.category}</span>
            )}
          </div>
          {project.tagline && (
            <p className="project-tagline">{project.tagline}</p>
          )}
        </div>

        {/* DESCRIPTION */}
        <p className="project-description">{project.description}</p>

        {/* METRICS */}
        {project.metrics && (
          <div className="project-metrics">
            {project.metrics.map((metric, i) => (
              <span key={i} className="project-metric" style={{
                color: isLight ? "#2a9d8f" : "#64ffda"
              }}>
                ⚡ {metric}
              </span>
            ))}
          </div>
        )}

        {/* TECH STACK (icons) */}
        <div className="project-tech">
          <ProjectLanguages logos={project.languages} />
        </div>

      </div>
    </motion.div>
  );
}
