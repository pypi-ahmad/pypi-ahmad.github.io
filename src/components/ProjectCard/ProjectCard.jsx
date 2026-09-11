import { motion } from "framer-motion";
import { revealMotion } from "../../themeMotion";
import "./ProjectCard.css";

export default function ProjectCard({ repo: project, index, priority = false, revealIndex = 0 }) {
  const cardClassName = [
    "project-card-wrap",
    priority ? "project-card-wrap--priority" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <motion.article {...revealMotion(index ? index - 1 : revealIndex)} className={cardClassName} data-priority={priority ? "true" : "false"}>
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="project-card shadow-sm hover-shadow-lg layer-card"
        aria-label={`View ${project.name} repository on GitHub`}
      >
        <div className="project-card__meta">
          {index ? (
            <span className="project-card__number">
              {String(index).padStart(2, "0")}
            </span>
          ) : null}
          {project.category ? (
            <span className="project-card__category">{project.category}</span>
          ) : null}
        </div>
        <h3 className="project-card__name">{project.name}</h3>
        <p className="project-card__desc">{project.description}</p>
        <span className="project-card__link-text">
          View repository <span aria-hidden="true">↗</span>
        </span>
      </a>
    </motion.article>
  );
}
