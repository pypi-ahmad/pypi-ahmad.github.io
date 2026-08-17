/** Recent public projects. */
import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { motion } from "framer-motion";
import { projectsHeader, projects, socialMediaLinks } from "../../portfolio.js";
import "./Projects.css";
import ProjectsImg from "./ProjectsImg";
import styled from "styled-components";
import { themeTextTransition } from "../../themeMotion";

const ProjectsButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.9rem 1.5rem;
  min-height: 50px;
  margin-top: 2rem;
  background: ${props => props.theme.accentGradient};
  color: ${props => props.theme.accentText};
  border-radius: ${props => props.theme.controlRadius};
  font-weight: 700;
  text-decoration: none;

  &:hover {
    color: ${props => props.theme.accentText};
    transform: translateY(-2px);
  }
`;

export default function Projects({ theme }) {
  return (
    <div className="projects-main">
      <Header />
      <main id="main-content">
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
                  {projectsHeader.description}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <section className="projects-section" aria-labelledby="recent-projects-title">
          <h2 id="recent-projects-title" style={{ color: theme.text }}>
            Recent Projects
          </h2>
          <div className="repo-cards-div-main">
            {projects.data.map(project => (
              <ProjectCard key={project.url} repo={project} theme={theme} />
            ))}
          </div>
          <ProjectsButton
            theme={theme}
            href={socialMediaLinks.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            More Projects on GitHub
          </ProjectsButton>
        </section>
      </main>
      <Footer theme={theme} />
    </div>
  );
}
