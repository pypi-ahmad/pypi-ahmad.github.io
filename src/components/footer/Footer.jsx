/**
 * Footer — Simple site-wide footer with attribution.
 *
 * Props: { theme }
 */
import React from "react";
import "./Footer.css";
import { motion } from "framer-motion";
import { greeting } from "../../portfolio.js";
import {
  themeElevatedSurfaceTransition,
  themeTextTransition,
} from "../../themeMotion";

export default function Footer(props) {
  return (
    <div
      className="footer-div"
      style={{
        borderTop: `1px solid ${props.theme.borderSoft}`,
        backgroundColor: props.theme.bodyAlt,
        boxShadow: `0 -10px 30px ${props.theme.shadowColor}`,
        transition: themeElevatedSurfaceTransition,
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <p className="footer-text" style={{ color: props.theme.secondaryText, transition: themeTextTransition }}>
          Made with <span role="img" aria-label="love">❤️</span> by {greeting.title2}
        </p>
      </motion.div>
    </div>
  );
}
