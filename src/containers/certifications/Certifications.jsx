/**
 * Certifications — Professional certifications grid.
 *
 * Maps `certifications.certifications` to CertificationCard components.
 * Used inside the Education page.
 *
 * Props: { theme }
 */
import React from "react";
import { motion } from "framer-motion";
import { revealMotion } from "../../themeMotion";
import "./Certifications.css";
import { certifications } from "../../portfolio";
import CertificationCard from "../../components/certificationCard/CertificationCard";

const categoryOrder = [
  "Generative AI",
  "Machine Learning",
  "Deep Learning",
  "Data Science",
  "Data Engineering",
];

function Certifications(props) {
  const theme = props.theme;
  return (
    <section className="education-section" id="certs" aria-labelledby="certs-title">
      <motion.div {...revealMotion()} className="education-section-heading">
        <p className="education-section-label" style={{ color: theme.accentSolid }}>
          Focused learning
        </p>
        <h2 id="certs-title" className="certs-header" style={{ color: theme.text }}>
          Professional certifications
        </h2>
        <p style={{ color: theme.secondaryText }}>
          Fourteen credentials grouped by focus area for faster review.
        </p>
      </motion.div>
      <div className="certification-groups">
        {categoryOrder.map((category) => {
          const categoryCertificates = certifications.certifications.filter(
            certificate => certificate.category === category
          );

          return (
            <motion.section
              {...revealMotion()}
              className="certification-group"
              key={category}
              aria-labelledby={`certification-group-${category.toLowerCase().replaceAll(" ", "-")}`}
            >
              <div className="certification-group-heading">
                <h3
                  id={`certification-group-${category.toLowerCase().replaceAll(" ", "-")}`}
                  style={{ color: theme.text }}
                >
                  {category}
                </h3>
                <span style={{ color: theme.secondaryText }}>
                  {categoryCertificates.length} {categoryCertificates.length === 1 ? "credential" : "credentials"}
                </span>
              </div>
              <div className="certs-body-div">
                {categoryCertificates.map(cert => (
                  <CertificationCard
                    key={cert.title}
                    certificate={cert}
                    theme={theme}
                  />
                ))}
              </div>
            </motion.section>
          );
        })}
      </div>
    </section>
  );
}

export default Certifications;
