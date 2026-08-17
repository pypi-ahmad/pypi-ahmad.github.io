import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { homePageData } from "../../portfolio";
import { buildThemeBackground, buildThemeShadow } from "../../themeMotion";

const Container = styled.section`
  width: min(var(--container-max-width), calc(100% - (var(--page-gutter) * 2)));
  margin: 0 auto;
  padding: var(--section-spacing) 0;
`;

const Method = styled.div`
  max-width: 820px;
  margin-bottom: 2rem;

  h2 {
    margin: 0 0 1rem;
    font-size: clamp(2rem, 4vw, 3rem);
  }

  p {
    margin: 0;
    font-size: clamp(1.1rem, 2vw, 1.35rem);
    line-height: 1.7;
  }
`;

const WorkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const WorkCard = styled.article`
  padding: 1.25rem;

  h3 {
    margin: 0 0 0.6rem;
    font-size: 1.05rem;
  }

  p {
    margin: 0;
    line-height: 1.55;
  }
`;

const Closing = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  align-items: center;
  margin-top: 2rem;
  padding: clamp(1.4rem, 4vw, 2.2rem);

  h2 {
    margin: 0 0 0.5rem;
    font-size: clamp(1.5rem, 3vw, 2rem);
  }

  p {
    max-width: 680px;
    margin: 0;
    line-height: 1.6;
  }

  @media (max-width: 700px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const ContactLink = styled(Link)`
  flex: 0 0 auto;
  padding: 0.8rem 1.25rem;
  border-radius: ${props => props.theme.controlRadius};
  background: ${props => props.theme.accentGradient};
  color: ${props => props.theme.accentText};
  font-weight: 700;
  text-decoration: none;

  &:focus-visible {
    outline: 2px solid var(--accent-solid);
    outline-offset: 3px;
  }
`;

export default function HomeDetails({ theme }) {
  return (
    <Container aria-labelledby="method-title">
      <Method>
        <h2 id="method-title" style={{ color: theme.text }}>
          How I work
        </h2>
        <p style={{ color: theme.secondaryText }}>{homePageData.method}</p>
      </Method>

      <WorkGrid aria-label="Applied AI work areas">
        {homePageData.workAreas.map(area => (
          <WorkCard
            key={area.title}
            style={{
              background: buildThemeBackground(
                theme.cardBackgroundAlt,
                theme.surfacePattern
              ),
              border: `${theme.panelBorderWidth} ${theme.panelBorderStyle} ${theme.borderSoft}`,
              borderRadius: theme.surfaceRadius,
              boxShadow: buildThemeShadow(
                `0 16px 32px ${theme.shadowColor}`,
                theme.panelGlow
              ),
            }}
          >
            <h3 style={{ color: theme.accentSolid }}>{area.title}</h3>
            <p style={{ color: theme.secondaryText }}>{area.description}</p>
          </WorkCard>
        ))}
      </WorkGrid>

      <Closing
        style={{
          background: buildThemeBackground(theme.accentSoft, theme.surfacePattern),
          border: `${theme.panelBorderWidth} ${theme.panelBorderStyle} ${theme.borderSoft}`,
          borderRadius: theme.surfaceRadius,
        }}
      >
        <div>
          <h2 style={{ color: theme.text }}>{homePageData.closing.title}</h2>
          <p style={{ color: theme.secondaryText }}>
            {homePageData.closing.description}
          </p>
        </div>
        <ContactLink theme={theme} to="/contact">
          Contact me
        </ContactLink>
      </Closing>
    </Container>
  );
}
