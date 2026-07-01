/**
 * ExperienceAccordion — Collapsible work-experience sections.
 *
 * Uses native `<details>/<summary>` elements styled with styled-components.
 * The first panel opens by default.  Each panel contains ExperienceCard
 * components for its experiences.
 *
 * Props: { sections, theme }
 */
import React from "react";
import ExperienceCard from "../../components/experienceCard/ExperienceCard";
import styled from "styled-components";

const AccordionContainer = styled.div`
  width: min(var(--container-max-width), calc(100% - (var(--page-gutter) * 2)));
  margin: 0 auto var(--section-spacing);
  border-radius: var(--surface-radius, 20px);
  border: 1px solid ${({ theme }) => theme.borderSoft ?? theme.secondaryText};
  overflow: hidden;

  @media (max-width: 768px) {
    margin: 0 auto var(--section-spacing-tight);
  }

  @media (max-width: 480px) {
    margin: 0 auto var(--section-spacing-tight);
  }
`;

const AccordionPanel = styled.details`
  background-color: ${({ theme }) => theme.body};
  border-bottom: 1px solid ${({ theme }) => theme.borderSoft ?? theme.secondaryText};
  &:last-child {
    border-bottom: none;
  }
`;

const AccordionSummary = styled.summary`
  padding: 0.8rem 0.95rem;
  font-size: 1rem;
  font-family: "Google Sans", sans-serif;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.headerColor || theme.body};
  cursor: pointer;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  &::-webkit-details-marker {
    display: none;
  }
  
  &:hover {
    background-color: ${({ theme }) => theme.cardBackgroundAlt};
  }

  &::after {
    content: '+';
    font-size: 1.3rem;
  }

  ${AccordionPanel}[open] &::after {
    content: '-';
  }

  @media (max-width: 768px) {
    padding: 0.8rem;
    font-size: 0.98rem;
  }
`;

const AccordionContent = styled.div`
  padding: 0.9rem;
  background-color: ${({ theme }) => theme.body};
  display: grid;
  gap: var(--section-gap-tight);

  @media (max-width: 768px) {
    padding: 0.8rem;
  }
`;

function ExperienceAccordion(props) {
  const theme = props.theme;

  return (
    <AccordionContainer theme={theme}>
      {props.sections.map((section, index) => {
        return (
          <AccordionPanel key={section["title"]} theme={theme} open={index === 0}>
            <AccordionSummary theme={theme}>
              {section["title"]}
            </AccordionSummary>
            <AccordionContent theme={theme}>
              {section["experiences"].map((experience, i) => {
                return (
                  <ExperienceCard key={i} experience={experience} theme={theme} />
                );
              })}
            </AccordionContent>
          </AccordionPanel>
        );
      })}
    </AccordionContainer>
  );
}

export default ExperienceAccordion;
