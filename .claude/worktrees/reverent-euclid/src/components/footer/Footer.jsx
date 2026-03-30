/**
 * Footer — Simple site-wide footer with attribution.
 *
 * Props: { theme }
 */
import React from "react";
import "./Footer.css";
import { motion } from "framer-motion";
import { greeting } from "../../portfolio.js";
import { useThemeController } from "../../themeController";
import {
  themeElevatedSurfaceTransition,
  themeTextTransition,
} from "../../themeMotion";

export default function Footer(props) {
  const { resolvedTheme } = useThemeController();
  const theme = props.theme ?? resolvedTheme;

  return (
    <div
      className="footer-div"
      style={{
        borderTop: `1px solid ${theme.borderSoft}`,
        backgroundColor: theme.bodyAlt,
        boxShadow: `0 -10px 30px ${theme.shadowColor}`,
        transition: themeElevatedSurfaceTransition,
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <p className="footer-text" style={{ color: theme.secondaryText, transition: themeTextTransition }}>
          Made with <span role="img" aria-label="love">❤️</span> by {greeting.title2}
        </p>
      </motion.div>
    </div>
  );
}
