/**
 * DegreeCard — Academic degree display card.
 *
 * Shows a circular institution logo on the left and a bordered card body
 * on the right with title, subtitle, duration, descriptions, and a
 * "Visit Website" button.  Uses styled-components for theme-aware styling.
 *
 * Props: { degree, theme }
 */
import React from "react";
import "./DegreeCard.css";
import { motion } from "framer-motion";
import styled from "styled-components";

const DegreeImageDiv = styled.div`
  width: 220px;
  height: auto;
  max-width: 100%;
  box-sizing: border-box;
  flex-shrink: 0;
  border-radius: 50%;
  padding: 10px;
  border: 1px solid var(--border);
  margin-right: 50px;
  box-shadow: var(--shadow-sm);
  position: relative;
  z-index: var(--layer-card);
  transition: all 200ms cubic-bezier(0.2, 0.8, 0.2, 1);
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
  @media (max-width: 768px) {
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 15px;
    width: 175px;
    padding: 8px;
  }
`;

const DegreeCardBody = styled.div`
  border: 1px solid var(--border);
  border-radius: 12px;
  width: 100%;
  margin: 10px 0;
  box-sizing: border-box;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  position: relative;
  z-index: var(--layer-card);
  transition: all 200ms cubic-bezier(0.2, 0.8, 0.2, 1);
  &:hover,
  &:focus-within {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
  }
`;

const VisitButton = styled.p`
  text-decoration: none;
  color: ${props => props.theme.accentText};
  background: ${props => props.theme.accentGradient};
  padding: 15px;
  margin-top: 25px;
  border-radius: 4px;
  border-width: 0px;
  margin-bottom: 20px;
  min-width: 200px;
  min-height: 50px;
  font-weight: bold;
  font-family: Google Sans Regular;
  font-size: 17px;
  transition: transform var(--theme-transition-fast), background-color var(--theme-transition-medium), color var(--theme-transition-fast), box-shadow var(--theme-transition-medium);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  &:hover {
    color: ${props => props.theme.accentText};
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 2px 10px ${props => props.theme.accentSolid};
  }
  @media (max-width: 480px) {
    width: 100%;
    min-width: 0;
  }
`;

function DegreeCard(props) {
  const degree = props.degree;
  const theme = props.theme;
  const isCompactScreen = typeof window !== "undefined" && window.innerWidth <= 768;

  return (
    <div className="degree-card">
      <motion.div
        initial={{ rotateY: 90, opacity: 0 }}
        whileInView={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <DegreeImageDiv theme={theme}>
          <img
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              transform: "scale(50%, 50%)",
            }}
            src={`/images/${degree.logoPath}`}
            alt={degree.altName}
          />
        </DegreeImageDiv>
      </motion.div>
      <motion.div
        initial={isCompactScreen ? { y: 30, opacity: 0 } : { x: 50, opacity: 0 }}
        whileInView={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        style={{ width: "100%" }}
      >
        <DegreeCardBody theme={theme}>
          <div className="body-header">
            <div className="body-header-title">
              <h2 className="card-title" style={{ color: theme.text }}>
                {degree.title}
              </h2>
              <h3 className="card-subtitle" style={{ color: theme.secondaryText }}>
                {degree.subtitle}
              </h3>
            </div>
            <div className="body-header-duration">
              <h3 className="duration" style={{ color: theme.text }}>
                {degree.duration}
              </h3>
            </div>
          </div>
          <div className="body-content">
            {degree.descriptions.map((sentence) => {
              return (
                <p
                  key={sentence}
                  className="content-list"
                  style={{ color: theme.secondaryText }}
                >
                  {sentence}
                </p>
              );
            })}
            <a
              className="degree-visit-link"
              href={degree.websiteLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <VisitButton
                theme={theme}
                style={{ textDecoration: "none", background: theme.accentGradient }}
              >
                Visit Website
              </VisitButton>
            </a>
          </div>
        </DegreeCardBody>
      </motion.div>
    </div>
  );
}

export default DegreeCard;
