import { motion } from "framer-motion";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import CaseStudy from "../../components/CaseStudy/CaseStudy";
import { projectsHeader, projects, caseStudies, socialMediaLinks } from "../../portfolio.js";
import { buildThemeBackground, buildThemeShadow, revealMotion } from "../../themeMotion";
import "./Projects.css";

const coveredRepositories = new Set(caseStudies.flatMap(study => study.repositories.map(repository => repository.url)));
const moreProjects = projects.data.filter(project => !coveredRepositories.has(project.url));

export default function Projects({ theme }) {
  return (
    <div className="projects-main">
      <Header />
      <main id="main-content">
        <section
          className="projects-hero"
          aria-labelledby="projects-title"
          style={{
            background: buildThemeBackground(theme.heroGradient, theme.heroPattern),
            border: `${theme.panelBorderWidth} ${theme.panelBorderStyle} ${theme.borderSoft}`,
            borderRadius: theme.heroRadius,
            boxShadow: buildThemeShadow(
              `0 2px 8px ${theme.shadowColor}`,
              theme.panelGlow
            ),
          }}
        >
          <h1 id="projects-title" style={{ color: theme.text }}>
            {projectsHeader.title}
          </h1>
          <motion.p {...revealMotion(1, true)} className="projects-intro" style={{ color: theme.secondaryText }}>
            {projectsHeader.description}
          </motion.p>
          <motion.div {...revealMotion(2, true)}>
            <a
              className="projects-github-link"
              href={socialMediaLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: theme.accentGradient,
                color: theme.accentText,
                borderRadius: theme.controlRadius,
              }}
            >
              View GitHub profile
            </a>
          </motion.div>
        </section>

        <section className="projects-section" aria-label="Project case studies">
          {caseStudies.map(study => <CaseStudy key={study.id} study={study} />)}
        </section>
        <section className="projects-section" aria-labelledby="recent-projects-title">
          <motion.div {...revealMotion()} className="projects-section-heading">
            <h2 id="recent-projects-title" style={{ color: theme.text }}>
              More projects
            </h2>
          </motion.div>
          <div className="repo-cards-div-main">
            {moreProjects.map((project, index) => (
              <ProjectCard
                key={project.url}
                repo={project}
                index={index + 1}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer theme={theme} />
    </div>
  );
}
