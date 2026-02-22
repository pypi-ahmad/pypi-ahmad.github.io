import React, { useState } from "react";
import ExperienceCard from "../../components/experienceCard/ExperienceCard";
import "./ExperienceAccordion.css";
import styled from "styled-components";

const AccordionContainer = styled.div`
  margin: 50px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.secondaryText};
  overflow: hidden;

  @media (max-width: 768px) {
    margin: 20px;
  }
`;

const AccordionPanel = styled.details`
  background-color: ${({ theme }) => theme.body};
  border-bottom: 1px solid ${({ theme }) => theme.secondaryText};
  &:last-child {
    border-bottom: none;
  }
`;

const AccordionSummary = styled.summary`
  padding: 20px;
  font-size: 1.2rem;
  font-family: "Google Sans Regular", sans-serif;
  font-weight: bold;
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
    background-color: ${({ theme }) => theme.imageDark};
  }

  &::after {
    content: '+';
    font-size: 1.5rem;
  }

  ${AccordionPanel}[open] &::after {
    content: '-';
  }
`;

const AccordionContent = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.body};
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
