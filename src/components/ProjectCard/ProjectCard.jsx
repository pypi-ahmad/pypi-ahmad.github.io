/**
 * ProjectCard — Compact product-tile card for open-source projects.
 *
 * Shows: name (accent link), category badge, short description (3-line clamp).
 * Entire card is clickable, linking to the project URL.
 *
 * Props: { repo (project object), theme }
 */
import React from "react";
import "./ProjectCard.css";
import { motion } from "framer-motion";

export default function ProjectCard({ repo: project }) {
  const CardWrapper = project.url ? "a" : "div";
  const wrapperProps = project.url
    ? { href: project.url, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
      viewport={{ once: true }}
    >
      <CardWrapper
        {...wrapperProps}
        className="project-card shadow-sm hover-shadow-lg layer-card"
      >
        <div className="project-card__header">
          <h3 className="project-card__name">{project.name}</h3>
          {project.category && (
            <span className="project-card__category">{project.category}</span>
          )}
        </div>
        <p className="project-card__desc">{project.description}</p>
      </CardWrapper>
    </motion.div>
  );
}
