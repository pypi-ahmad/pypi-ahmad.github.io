/**
 * Certifications and course certificates, grouped by focus area.
 *
 * Maps `certifications.certifications` to CertificationCard components.
 * Used inside the Education page.
 *
 * Props: { theme }
 */
import { motion } from "framer-motion";
import { revealMotion } from "../../themeMotion";
import "./Certifications.css";
import { certifications } from "../../portfolio";
import CertificationCard from "../../components/certificationCard/CertificationCard";

// Authored order keeps the reading hierarchy stable when credential records are reordered.
const categoryOrder = [
  "Generative AI",
  "Machine Learning",
  "Deep Learning",
  "Data Science",
  "Data Engineering",
];

const professionalCredentials = certifications.certifications.filter(
  certificate => certificate.credentialType === "professional"
);
const courseCertificates = certifications.certifications.filter(
  certificate => certificate.credentialType !== "professional"
);

function Certifications(props) {
  const theme = props.theme;
  return (
    <>
      <section
        className="education-section"
        id="professional-certification"
        aria-labelledby="professional-certification-title"
      >
        <motion.div {...revealMotion()} className="education-section-heading">
          <p className="education-section-label" style={{ color: theme.accentSolid }}>
            Featured achievement
          </p>
          <h2
            id="professional-certification-title"
            className="certs-header"
            style={{ color: theme.text }}
          >
            Professional certification
          </h2>
          <p style={{ color: theme.secondaryText }}>
            Anthropic certification in Claude foundations, issued August 31, 2026.
          </p>
        </motion.div>
        <motion.div {...revealMotion()} className="professional-certification-body">
          {professionalCredentials.map(certificate => (
            <CertificationCard
              key={certificate.title}
              certificate={certificate}
              theme={theme}
              headingLevel={3}
            />
          ))}
        </motion.div>
      </section>

      <section className="education-section" id="certs" aria-labelledby="certs-title">
        <motion.div {...revealMotion()} className="education-section-heading">
          <p className="education-section-label" style={{ color: theme.accentSolid }}>
            Focused learning
          </p>
          <h2 id="certs-title" className="certs-header" style={{ color: theme.text }}>
            Course certificates
          </h2>
          <p style={{ color: theme.secondaryText }}>
            {courseCertificates.length} course-completion certificates grouped by focus area for faster review.
          </p>
        </motion.div>
        <div className="certification-groups">
          {categoryOrder.map((category) => {
            const categoryCertificates = courseCertificates.filter(
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
    </>
  );
}

export default Certifications;
