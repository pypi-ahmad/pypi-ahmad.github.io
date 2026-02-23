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

import React, { useState } from "react";
import "./systems.css";
import SystemDiagram from "./SystemDiagram";
import { motion, AnimatePresence } from "framer-motion";

function SystemCard({ system, theme }) {
  const isLight = theme?.name === "light";
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className={`system-card ${isLight ? "light-mode" : ""}`}>

          {/* HEADER */}
          <div className="system-header">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <h2>{system.name}</h2>
                {system.tier === "featured" && (
                  <span style={{
                    fontSize: "0.65rem",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    padding: "2px 8px",
                    borderRadius: "3px",
                    background: isLight ? "#2a9d8f" : "#64ffda",
                    color: isLight ? "#fff" : "#0a192f",
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
           <div className="system-impact-preview" style={{ marginBottom: "1rem" }}>
            {(system.metrics || system.impact.slice(0, 3)).map((item, i) => (
              <span key={i} style={{ 
                display: "inline-block", 
                marginRight: "10px", 
                fontSize: "0.85rem", 
                fontWeight: "bold", 
                color: isLight ? "#2a9d8f" : "#64ffda" 
              }}>
                ⚡ {item}
              </span>
            ))}
          </div>

          {/* TECH STACK */}
          <div className="system-tech">
            {system.tech.map((tech, i) => (
              <span key={i} className="tech-badge" style={{
                background: isLight ? "#eee" : "#333",
                padding: "4px 8px",
                borderRadius: "4px",
                fontSize: "0.8rem",
                marginRight: "5px",
                marginBottom: "5px",
                display: "inline-block"
              }}>
                {tech}
              </span>
            ))}
          </div>

          {/* DIAGRAM PREVIEW */}
          {/* <SystemDiagram architecture={system.architecture} theme={theme} /> */}

          {/* EXPAND BUTTON */}
          <div 
            className="expand-btn"
            onClick={() => setIsModalOpen(true)}
            style={{ marginTop: "15px" }}
          >
            View Deep Dive & Architecture ▼
          </div>

        </div>
      </motion.div>

      {/* MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="system-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.8)",
              zIndex: 1000,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
              overflowY: "auto"
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
                borderRadius: "10px",
                maxWidth: "800px",
                width: "100%",
                maxHeight: "90vh",
                overflowY: "auto",
                position: "relative",
                color: isLight ? "#333" : "#fff"
              }}
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "15px",
                  background: "transparent",
                  border: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  color: "inherit"
                }}
              >
                ×
              </button>

              <h2 style={{ marginTop: 0 }}>{system.name}</h2>
              <p style={{ fontStyle: "italic", color: isLight ? "#555" : "#aaa" }}>{system.tagline}</p>
              
              <div style={{ marginTop: "20px" }}>
                <h3>Problem Statement</h3>
                <p>{system.problem_statement}</p>
              </div>

              <div style={{ marginTop: "20px" }}>
                <h3>Solution Overview</h3>
                <p>{system.solution_overview}</p>
              </div>

              <div style={{ marginTop: "20px" }}>
                <h3>Architecture Workflow</h3>
                <SystemDiagram architecture={system.architecture} theme={theme} />
              </div>

              <div style={{ marginTop: "20px" }}>
                <h3>Key Features</h3>
                <ul>
                  {system.key_features && system.key_features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>

               <div style={{ marginTop: "20px" }}>
                <h3>Implementation Details</h3>
                <p>{system.implementation_details}</p>
              </div>

              <div style={{ marginTop: "20px" }}>
                <h3>Challenges & Solutions</h3>
                {system.challenges_solutions && system.challenges_solutions.map((cs, i) => (
                  <div key={i} style={{ marginBottom: "10px" }}>
                    <strong>Challenge:</strong> {cs.challenge}<br/>
                    <strong>Solution:</strong> {cs.solution}
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "20px" }}>
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
