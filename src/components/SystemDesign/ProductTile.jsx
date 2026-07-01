/**
 * ProductTile — Compact product-style card for platform systems.
 *
 * Shows: name, category badge, short description.
 * Click anywhere on the tile to open the full deep-dive modal
 * (reuses the same modal as SystemCard).
 *
 * Props: { system, theme }
 */
import React, { useCallback, useRef, useState } from "react";
import "./ProductTile.css";
import SystemDiagram from "./SystemDiagram";
import { motion, AnimatePresence } from "framer-motion";
import useAccessibleDialog from "./useAccessibleDialog";

function ProductTile({ system, theme }) {
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
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35 }}
        viewport={{ once: true }}
      >
        <button
          ref={triggerRef}
          type="button"
          className="product-tile shadow-sm hover-shadow-lg layer-card"
          onClick={openModal}
          aria-label={`View ${system.name} deep dive`}
        >
          <div className="product-tile__header">
            <h3 className="product-tile__name">{system.name}</h3>
            <span className="product-tile__category">{system.category}</span>
          </div>
          <p className="product-tile__desc">{system.tagline}</p>
        </button>
      </motion.div>

      {/* MODAL — identical to SystemCard */}
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
              top: 0, left: 0, right: 0, bottom: 0,
              background: "var(--surface-overlay)",
              zIndex: "var(--layer-overlay)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "1rem",
              overflowY: "auto",
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
                boxShadow: "var(--shadow-lg)",
              }}
            >
              <button
                onClick={closeModal}
                aria-label="Close dialog"
                style={{
                  position: "absolute", top: "0.65rem", right: "0.65rem",
                  background: "transparent", border: "none",
                  fontSize: "1.3rem", cursor: "pointer", color: "inherit",
                }}
              >
                ×
              </button>

              <h2 style={{ marginTop: 0 }}>{system.name}</h2>
              <p style={{ color: theme.secondaryText, marginBottom: "0.45rem" }}>
                {system.tagline}
              </p>

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
                  {system.key_features && system.key_features.map((f, i) => (
                    <li key={i}>{f}</li>
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

export default ProductTile;
