import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { caseStudies } from "../../portfolio";
import { revealMotion } from "../../themeMotion";

const Container = styled.section`
  width: min(var(--container-max-width), calc(100% - (var(--page-gutter) * 2)));
  margin: 0 auto;
  padding-block-start: var(--section-spacing);
  text-align: start;
`;

const Title = styled(motion.h2)`
  color: ${props => props.theme.text};
  font-size: var(--section-title-size);
  margin: 0 0 var(--stack-lg);
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: var(--section-title-size);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 24rem), 1fr));
  gap: var(--section-gap-tight);

  > :first-child { grid-column: 1 / -1; }

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
  // Selection follows the authored project order rather than timestamps or a network response.
  return (
    <Container id="selected-work" aria-labelledby="selected-work-title">
      <Title
        id="selected-work-title"
        theme={theme}
        {...revealMotion()}
      >
        Personal projects & experiments
      </Title>
      <Grid>
        {caseStudies.filter(project => !project.homeFeature).map((project, index) => (
          <ProjectCard key={project.id} repo={project} caseStudy revealIndex={index} />
        ))}
      </Grid>
      <ProjectsLink className="motion-action" theme={theme} to="/projects">
        View projects
      </ProjectsLink>
    </Container>
  );
}
