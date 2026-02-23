/**
 * SystemThinking — Animated system-thinking methodology visualization.
 *
 * Displays a horizontal flow: LLM → Tools → Memory → Verification → Observability
 * with staggered entrance animations.  Uses styled-components for theming.
 *
 * Props: { theme }
 */
import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled.div`
  padding: 4rem 1rem;
  text-align: center;
  background-color: ${props => props.theme.body};
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: ${props => props.theme.text};
`;

const StepsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Step = styled(motion.div)`
  background: ${props => props.theme.imageDark};
  color: ${props => props.theme.text};
  padding: 1.5rem 2rem;
  border-radius: 12px;
  font-weight: bold;
  font-size: 1.2rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Arrow = styled(motion.div)`
  font-size: 2rem;
  color: ${props => props.theme.accentColor};
`;

const steps = ["LLM", "Tools", "Memory", "Verification", "Observability"];

export default function SystemThinking({ theme }) {
  return (
    <Container theme={theme}>
      <Title theme={theme}>System Thinking Methodology</Title>
      <StepsContainer>
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <Step
              theme={theme}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              {step}
            </Step>
            {index < steps.length - 1 && (
              <Arrow
                theme={theme}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.2 + 0.1, duration: 0.5 }}
                 viewport={{ once: true }}
              >
                →
              </Arrow>
            )}
          </React.Fragment>
        ))}
      </StepsContainer>
    </Container>
  );
}
