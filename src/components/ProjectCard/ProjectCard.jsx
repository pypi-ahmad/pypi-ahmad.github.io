import React from "react";
import ProjectLanguages from "../projectLanguages/ProjectLanguages";
import "./ProjectCard.css";
import { Fade } from "react-reveal";
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
    <div>
      <Fade bottom duration={2000} distance="40px">
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
        </CardContainer>
      </Fade>
    </div>
  );
}
