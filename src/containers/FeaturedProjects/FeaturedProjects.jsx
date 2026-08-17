import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { projects } from "../../portfolio";

const Container = styled.section`
  width: min(var(--container-max-width), calc(100% - (var(--page-gutter) * 2)));
  margin: 0 auto;
  padding: var(--section-spacing) 0;
  text-align: center;
`;

const Title = styled(motion.h2)`
  color: ${props => props.theme.text};
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--section-gap-tight);

  @media (max-width: 768px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const ProjectsLink = styled(Link)`
  display: inline-flex;
  margin-top: 2rem;
  padding: 0.9rem 1.5rem;
  border-radius: ${props => props.theme.controlRadius};
  background: ${props => props.theme.accentGradient};
  color: ${props => props.theme.accentText};
  font-weight: 700;
  text-decoration: none;

  &:hover {
    color: ${props => props.theme.accentText};
    transform: translateY(-2px);
  }
`;

export default function FeaturedProjects({ theme }) {
  return (
    <Container id="selected-work" aria-labelledby="selected-work-title">
      <Title
        id="selected-work-title"
        theme={theme}
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Selected work
      </Title>
      <Grid>
        {projects.data.slice(0, 4).map(project => (
          <ProjectCard key={project.url} repo={project} theme={theme} />
        ))}
      </Grid>
      <ProjectsLink theme={theme} to="/projects">
        See all projects
      </ProjectsLink>
    </Container>
  );
}
