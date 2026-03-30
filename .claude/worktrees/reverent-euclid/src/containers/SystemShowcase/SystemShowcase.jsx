/**
 * SystemShowcase — Featured system architecture card on the home page.
 *
 * Pulls the first entry from `systems` data and renders it as a
 * prominent SystemCard.  Returns null if no systems are available.
 *
 * Props: { theme }
 */
import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import SystemCard from "../../components/SystemDesign/SystemCard";
import { systems } from "../../portfolio";

const Container = styled.div`
  padding: 2rem 1rem;
  text-align: center;

  @media (max-width: 480px) {
    padding: 1.5rem 0.75rem;
  }
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.6rem;
    margin-bottom: 1.5rem;
  }
`;

export default function SystemShowcase({ theme }) {
  const featured = systems.featured[0];
  if (!featured) return null;

  return (
    <Container id="systems">
      <Title
        theme={theme}
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ color: theme.text }}
      >
        Featured System Architecture
      </Title>
      <SystemCard system={featured} theme={theme} />
    </Container>
  );
}
