import React, { useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import SystemCard from "../../components/SystemDesign/SystemCard";
import { motion } from "framer-motion";
import { projectsHeader, projects, socialMediaLinks, systems } from "../../portfolio.js";
import "./Projects.css";
import ProjectsImg from "./ProjectsImg";
import styled from "styled-components";

const ProjectsButton = styled.a`
  background-color: ${props => props.theme.accentBright};
  &:hover {
    color: white;
  }
`;

function Projects(props) {
  const theme = props.theme;
  const [activeSystem, setActiveSystem] = useState(null);

  return (
    <div className="projects-main">
      <Header theme={theme} setTheme={props.setTheme} />
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
                style={{ color: theme.text }}
              >
                {projectsHeader.title}
              </h1>
              <p
                className="projects-header-detail-text subTitle"
                style={{ color: theme.secondaryText }}
              >
                {projectsHeader["description"]}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Systems Showcase Section */}
      <div className="systems-div-main" style={{ padding: "2rem 5%" }}>
        <h2
          style={{
            color: theme.text,
            textAlign: "center",
            marginBottom: "2rem",
            fontSize: "2.5rem",
          }}
        >
          Enterprise Systems
        </h2>
        {systems.data.map((sys, index) => (
          <div
            key={index}
            onMouseEnter={() => setActiveSystem(sys.id)}
            onMouseLeave={() => setActiveSystem(null)}
            style={{
              transition: "opacity 0.3s ease",
              opacity: activeSystem && activeSystem !== sys.id ? 0.4 : 1,
            }}
          >
            <SystemCard system={sys} theme={theme} />
          </div>
        ))}
      </div>

      {/* Projects Section */}
      {projects.data.length > 0 && (
        <>
          <h2
            style={{
              color: theme.text,
              textAlign: "center",
              marginTop: "4rem",
              marginBottom: "2rem",
              fontSize: "2.5rem",
            }}
          >
            Open Source Projects
          </h2>

          <div className="repo-cards-div-main">
            {projects.data.map((repo) => {
              return <ProjectCard repo={repo} theme={theme} />;
            })}
          </div>
        </>
      )}
      <br />
      <br />
      <br />
      <ProjectsButton
        theme={theme}
        className="general-btn"
        href={socialMediaLinks.github}
        target="_blank"
        rel="noopener noreferrer"
      >
        More Projects (Github)
      </ProjectsButton>
      <br />
      <br />
      <Footer theme={props.theme} onToggle={props.onToggle} />
    </div>
  );
}

export default Projects;
