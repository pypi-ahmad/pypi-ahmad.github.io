/**
 * Certifications — Professional certifications grid.
 *
 * Maps `certifications.certifications` to CertificationCard components.
 * Used inside the Education page.
 *
 * Props: { theme }
 */
import React from "react";
import "./Certifications.css";
import { motion } from "framer-motion";
import { certifications } from "../../portfolio";
import CertificationCard from "../../components/certificationCard/CertificationCard";

function Certifications(props) {
  const theme = props.theme;
  return (
    <div className="main" id="certs">
      <div className="certs-header-div">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h1 className="certs-header" style={{ color: theme.text }}>
            Certifications
          </h1>
        </motion.div>
      </div>
      <div className="certs-body-div">
        {certifications.certifications.map((cert) => {
          return (
            <CertificationCard
              key={cert.title}
              certificate={cert}
              theme={theme}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Certifications;
