/**
 * SystemDiagram — Step-by-step architecture flow visualization.
 *
 * Renders each architecture step as an animated box with connecting
 * arrows between them.  Supports both light and dark themes.
 *
 * Props: { architecture: string[], theme }
 */
// src/components/SystemDesign/SystemDiagram.jsx

import React from "react";
import "./systems.css";
import { motion } from "framer-motion";

function SystemDiagram({ architecture, theme }) {
  const isLight = theme?.name === "light";
  
  if (!architecture || architecture.length === 0) return null;

  return (
    <div className={`diagram-wrapper ${isLight ? "light-mode" : ""}`}>
      <div className="diagram-container">
        {architecture.map((step, index) => (
          <React.Fragment key={index}>
            <div className="diagram-step">
              <motion.div 
                className="diagram-box"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ scale: 1.08, zIndex: 10 }}
              >
                {step}
              </motion.div>

              {index !== architecture.length - 1 && (
                <motion.div 
                  className="diagram-arrow"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.1 }}
                >
                  →
                </motion.div>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default SystemDiagram;
