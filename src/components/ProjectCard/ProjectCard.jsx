import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { revealMotion } from "../../themeMotion";
import "./ProjectCard.css";

export default function ProjectCard({ repo: project, index, priority = false, revealIndex = 0, caseStudy = false }) {
  const Destination = caseStudy ? Link : "a";
  const destinationProps = caseStudy
    ? { to: `/projects#${project.id}`, "aria-label": `Read ${project.name} case study` }
    : { href: project.url, target: "_blank", rel: "noopener noreferrer", "aria-label": `View ${project.name} repository on GitHub` };
  // Numbered grids use a one-based index; unnumbered placements can stagger with revealIndex alone.
  const cardClassName = [
    "project-card-wrap",
    priority ? "project-card-wrap--priority" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <motion.article {...revealMotion(index ? index - 1 : revealIndex)} className={cardClassName} data-priority={priority ? "true" : "false"}>
      <Destination
        {...destinationProps}
        className="project-card shadow-sm hover-shadow-lg layer-card"
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
          {caseStudy ? "Read case study" : "View repository"} <span aria-hidden="true">{caseStudy ? "→" : "↗"}</span>
        </span>
      </Destination>
    </motion.article>
  );
}
