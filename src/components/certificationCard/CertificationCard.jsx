/**
 * CertificationCard — Professional certification display card.
 *
 * Renders a card with a color-coded border (from `certificate.colorCode`),
 * header logo image, title, subtitle, and an optional PDF link button.
 *
 * Props: { certificate, theme }
 */
import React from "react";
import "./CertificationCard.css";
import { motion } from "framer-motion";
import styled from "styled-components";

const CertCardDiv = styled.div`
  box-shadow: 0px 2px 5px ${props => props.certificate.colorCode};
  border: 1px solid ${props => props.certificate.colorCode};
  &:hover {
    box-shadow: 0 5px 15px ${props => props.certificate.colorCode};
  }
`;

function CertificationCard(props) {
  const certificate = props.certificate;
  const theme = props.theme;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <CertCardDiv className="cert-card" certificate={certificate}>
        <div className="content">
          <a
            href={certificate.certificateLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="content-overlay"></div>
            <div
              className="cert-header"
              style={{ backgroundColor: certificate.colorCode }}
            >
              <img
                className="logo_img"
                src={`/${certificate.logoPath}`}
                alt={certificate.altName}
              />
            </div>
          </a>
        </div>
        <div className="cert-body">
          <h2 className="cert-body-title" style={{ color: theme.text }}>
            {certificate.title}
          </h2>
          <h3
            className="cert-body-subtitle"
            style={{ color: theme.secondaryText }}
          >
            {certificate.subtitle}
          </h3>
          {certificate.pdfLink && (
            <a
              href={certificate.pdfLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginTop: "10px",
                display: "inline-block",
                padding: "5px 10px",
                color: theme.text,
                backgroundColor: certificate.colorCode,
                borderRadius: "5px",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "0.9em",
              }}
            >
              View Certificate PDF
            </a>
          )}
        </div>
      </CertCardDiv>
    </motion.div>
  );
}

export default CertificationCard;
