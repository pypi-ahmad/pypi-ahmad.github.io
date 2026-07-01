/**
 * SystemCard — Enterprise system case-study card with expandable modal.
 *
 * Card view: system name, featured badge, category, tagline, description,
 *            metric highlights, tech-stack badges, and a "View Deep Dive" CTA.
 *
 * Modal view (on click): full case-study — problem statement, solution overview,
 *                        architecture diagram (SystemDiagram), key features,
 *                        implementation details, challenges/solutions, and impact.
 *
 * Props: { system, theme }
 */
// src/components/SystemDesign/SystemCard.jsx

import React, { useCallback, useRef, useState } from "react";
import "./systems.css";
import SystemDiagram from "./SystemDiagram";
import { motion, AnimatePresence } from "framer-motion";
import useAccessibleDialog from "./useAccessibleDialog";

function SystemCard({ system, theme }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const triggerRef = useRef(null);
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);
  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);
  const dialogRef = useAccessibleDialog({
    isOpen: isModalOpen,
    onClose: closeModal,
    triggerRef,
  });

  return (
    <>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
          <div className="system-card shadow-sm hover-shadow-lg hover-translate-y-1 transition-all duration-200 layer-card">

          {/* HEADER */}
          <div className="system-header">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.55rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", flexWrap: "wrap" }}>
                <h2>{system.name}</h2>
                {system.tier === "featured" && (
                  <span style={{
                    fontSize: "0.66rem",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    padding: "0.2rem 0.5rem",
                    borderRadius: "999px",
                    background: theme.accentSoft,
                    color: theme.text,
                    border: `1px solid ${theme.borderSoft}`,
                  }}>Featured</span>
                )}
              </div>
              <span className="system-category">{system.category}</span>
            </div>
            <p className="system-tagline">{system.tagline}</p>
          </div>

          {/* DESCRIPTION */}
          <p className="system-description">{system.description}</p>

          {/* IMPACT PREVIEW (Metrics) */}
           <div className="system-impact-preview" style={{ marginBottom: "0.65rem", marginTop: "0.15rem" }}>
            {(system.metrics || system.impact.slice(0, 3)).map((item, i) => (
              <span key={i} style={{ 
                display: "inline-block", 
                marginRight: "0.55rem", 
                fontSize: "0.84rem", 
                fontWeight: "600", 
                color: theme.accentSolid
              }}>
                ⚡ {item}
              </span>
            ))}
          </div>

          {/* TECH STACK */}
          <div className="system-tech">
            {system.tech.map((tech, i) => (
              <span key={i} className="tech-badge" style={{
                background: theme.cardBackgroundAlt,
                padding: "0.24rem 0.55rem",
                borderRadius: "999px",
                fontSize: "0.76rem",
                display: "inline-block"
              }}>
                {tech}
              </span>
            ))}
          </div>

          {/* DIAGRAM PREVIEW */}
          {/* <SystemDiagram architecture={system.architecture} theme={theme} /> */}

          {/* EXPAND BUTTON */}
          <button 
            ref={triggerRef}
            className="expand-btn"
            onClick={openModal}
            style={{ marginTop: "0.75rem" }}
            type="button"
          >
            View Deep Dive & Architecture
          </button>

        </div>
      </motion.div>

      {/* MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="system-modal-overlay layer-overlay transition-all"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "var(--surface-overlay)",
              zIndex: "var(--layer-overlay)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "1rem",
              overflowY: "auto"
            }}
          >
            <motion.div 
              className="system-modal-content shadow-sm transition-all duration-200 layer-card"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              ref={dialogRef}
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              aria-label={`${system.name} deep dive`}
              style={{
                background: "var(--surface-card)",
                padding: "1.1rem",
                borderRadius: "var(--card-radius, 12px)",
                border: "1px solid var(--border)",
                maxWidth: "min(860px, 96vw)",
                width: "100%",
                maxHeight: "92vh",
                overflowY: "auto",
                position: "relative",
                color: theme.text,
                boxShadow: "var(--shadow-lg)"
              }}
            >
              <button 
                onClick={closeModal}
                aria-label="Close dialog"
                style={{
                  position: "absolute",
                  top: "0.65rem",
                  right: "0.65rem",
                  background: "transparent",
                  border: "none",
                  fontSize: "1.3rem",
                  cursor: "pointer",
                  color: "inherit"
                }}
              >
                ×
              </button>

              <h2 style={{ marginTop: 0 }}>{system.name}</h2>
              <p style={{ color: theme.secondaryText, marginBottom: "0.45rem" }}>{system.tagline}</p>
              
              <div style={{ marginTop: "1rem" }}>
                <h3>Problem Statement</h3>
                <p>{system.problem_statement}</p>
              </div>

              <div style={{ marginTop: "1rem" }}>
                <h3>Solution Overview</h3>
                <p>{system.solution_overview}</p>
              </div>

              <div style={{ marginTop: "1rem" }}>
                <h3>Architecture Workflow</h3>
                <SystemDiagram architecture={system.architecture} theme={theme} />
              </div>

              <div style={{ marginTop: "1rem" }}>
                <h3>Key Features</h3>
                <ul>
                  {system.key_features && system.key_features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>

               <div style={{ marginTop: "1rem" }}>
                <h3>Implementation Details</h3>
                <p>{system.implementation_details}</p>
              </div>

              <div style={{ marginTop: "1rem" }}>
                <h3>Challenges & Solutions</h3>
                {system.challenges_solutions && system.challenges_solutions.map((cs, i) => (
                  <div key={i} style={{ marginBottom: "0.55rem" }}>
                    <strong>Challenge:</strong> {cs.challenge}
                    <div><strong>Solution:</strong> {cs.solution}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "1rem" }}>
                <h3>Impact</h3>
                <ul>
                  {system.impact.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default SystemCard;
