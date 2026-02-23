/**
 * ProjectCard — Styled card for open-source project entries.
 *
 * Displays project name, description, language icons, and optional
 * metric badges. Animates in on scroll via Framer Motion.
 *
 * Props: { repo (project object), theme }
 */
import React from "react";
import ProjectLanguages from "../projectLanguages/ProjectLanguages";
import "./ProjectCard.css";
import { motion } from "framer-motion";
import styled from "styled-components";

const CardContainer = styled.div`
  color: rgb(88, 96, 105);
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 30px -15px;
  padding: 2rem;
  border-radius: 5px;
  height: 100%;
  transition: all 0.2s ease-in-out;
  &:hover {
    box-shadow: ${props => props.theme.imageDark} 0 2px 15px;
  }
`;

export default function ProjectCard({ repo: project, theme }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <CardContainer
        key={project.name}
          theme={theme}
          style={{ backgroundColor: theme.projectCard }}
        >
          <div className="repo-name-div">
            <p className="repo-name" style={{ color: theme.text }}>
              {project.name}
            </p>
          </div>
          <p className="repo-description" style={{ color: theme.text }}>
            {project.description}
          </p>
          <div className="repo-details">
            <ProjectLanguages logos={project.languages} />
          </div>
          {project.metrics && (
            <div style={{ marginTop: "1rem", display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {project.metrics.map((metric, i) => (
                <span
                  key={i}
                  style={{
                    backgroundColor: theme.accentColor,
                    color: "#fff",
                    padding: "5px 10px",
                    borderRadius: "15px",
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                  }}
                >
                  {metric}
                </span>
              ))}
            </div>
          )}
      </CardContainer>
    </motion.div>
  );
}
