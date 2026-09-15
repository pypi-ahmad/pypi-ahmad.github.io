import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { revealMotion } from "../../themeMotion";
import { homeMetrics, featuredProfessionalProjects } from "../../data/homePage";
import "./ProfessionalWork.css";

export function MetricsStrip({ theme }) {
  return <section className="metrics-section" aria-label="Professional results" style={{ color: theme.secondaryText }}>
    <ul className="metrics-strip" style={{ background: theme.evidenceSurface, borderColor: theme.evidenceBorder }}>
      {homeMetrics.map(metric => <li key={metric.label}>
        <Link to={metric.href} aria-label={`${metric.label}: ${metric.value}. Read the project story.`}>
          <strong style={{ color: theme.evidenceText }}>{metric.value}</strong>
          <span className="metric-label" style={{ color: theme.accentSolid }}>{metric.label}</span>
          <span className="metric-context" style={{ color: theme.secondaryText }}>{metric.context}</span>
        </Link>
      </li>)}
    </ul>
    <p className="metrics-disclosure">Reported team and system results from internal employer evaluations. Project stories explain the scope and my contributions.</p>
  </section>;
}

export default function ProfessionalWork({ theme }) {
  return <section id="professional-work" className="professional-section" aria-labelledby="professional-work-title" style={{ color: theme.secondaryText }}>
    <p className="professional-eyebrow" style={{ color: theme.secondaryText }}>Selected professional work</p>
    <h2 id="professional-work-title" style={{ color: theme.text }}>Featured professional projects</h2>
    <p>Three projects spanning production machine learning, document AI, and agentic workflows.</p>
    <Link className="professional-link" to="/experience">View all professional work</Link>
    <div className="professional-grid">
      {featuredProfessionalProjects.map((project, index) => <motion.article {...revealMotion(index)} key={project.id} aria-labelledby={`professional-${project.id}`} style={{ background: theme.cardBackgroundAlt, borderColor: theme.borderSoft }}>
        <p className="professional-company">{project.company}</p>
        <h3 id={`professional-${project.id}`} style={{ color: theme.text }}>{project.title}</h3>
        <p>{project.summary}</p>
        <h4 style={{ color: theme.text }}>My contribution</h4>
        <p>{project.contribution}</p>
        <Link className="professional-link" to={`/experience#${project.id}`} aria-label={`Read ${project.title} professional story`}>Read project story</Link>
      </motion.article>)}
    </div>
  </section>;
}
