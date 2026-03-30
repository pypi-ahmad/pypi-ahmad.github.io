/**
 * ProductTile — Compact product-style card for platform systems.
 *
 * Shows: name, category badge, short description.
 * Click anywhere on the tile to open the full deep-dive modal
 * (reuses the same modal as SystemCard).
 *
 * Props: { system, theme }
 */
import React, { useState } from "react";
import "./ProductTile.css";
import SystemDiagram from "./SystemDiagram";
import { motion, AnimatePresence } from "framer-motion";

function ProductTile({ system, theme }) {
  const isLight = theme?.name === "light";
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35 }}
        viewport={{ once: true }}
      >
        <button
          type="button"
          className={`product-tile ${isLight ? "product-tile--light" : ""}`}
          onClick={() => setIsModalOpen(true)}
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
            className="system-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={`${system.name} deep dive`}
            style={{
              position: "fixed",
              top: 0, left: 0, right: 0, bottom: 0,
              background: "rgba(0,0,0,0.8)",
              zIndex: 1000,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
              overflowY: "auto",
            }}
          >
            <motion.div
              className={`system-modal-content ${isLight ? "light-mode" : ""}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: isLight ? "#fff" : "#1e1e1e",
                padding: "2rem",
                borderRadius: "12px",
                maxWidth: "800px",
                width: "100%",
                maxHeight: "90vh",
                overflowY: "auto",
                position: "relative",
                color: isLight ? "#333" : "#fff",
              }}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                aria-label="Close dialog"
                style={{
                  position: "absolute", top: "15px", right: "15px",
                  background: "transparent", border: "none",
                  fontSize: "1.5rem", cursor: "pointer", color: "inherit",
                }}
              >
                ×
              </button>

              <h2 style={{ marginTop: 0 }}>{system.name}</h2>
              <p style={{ fontStyle: "italic", color: isLight ? "#555" : "#aaa", marginBottom: "0.5rem" }}>
                {system.tagline}
              </p>

              <div style={{ marginTop: "24px" }}>
                <h3>Problem Statement</h3>
                <p>{system.problem_statement}</p>
              </div>
              <div style={{ marginTop: "24px" }}>
                <h3>Solution Overview</h3>
                <p>{system.solution_overview}</p>
              </div>
              <div style={{ marginTop: "24px" }}>
                <h3>Architecture Workflow</h3>
                <SystemDiagram architecture={system.architecture} theme={theme} />
              </div>
              <div style={{ marginTop: "24px" }}>
                <h3>Key Features</h3>
                <ul>
                  {system.key_features && system.key_features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
              <div style={{ marginTop: "24px" }}>
                <h3>Implementation Details</h3>
                <p>{system.implementation_details}</p>
              </div>
              <div style={{ marginTop: "24px" }}>
                <h3>Challenges & Solutions</h3>
                {system.challenges_solutions && system.challenges_solutions.map((cs, i) => (
                  <div key={i} style={{ marginBottom: "12px" }}>
                    <strong>Challenge:</strong> {cs.challenge}<br />
                    <strong>Solution:</strong> {cs.solution}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "24px" }}>
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
