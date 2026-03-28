/**
 * Greeting — Home-page hero section.
 *
 * Displays the intro text, accent-colored name, subtitle, hero bullet
 * points, engineering philosophy quote, and CTA buttons (Contact Me,
 * Download Resume, View Cover Letter).  Document links verified via
 * HEAD request before opening.
 *
 * Props: { theme }
 */
import React, { useState } from "react";
import "./Greeting.css";
import { greeting } from "../../portfolio";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FeelingProud from "./FeelingProud";
import {
  buildThemeBackground,
  buildThemeShadow,
  themeElevatedSurfaceTransition,
  themeSurfaceTransition,
  themeTextTransition,
} from "../../themeMotion";

export default function Greeting(props) {
  const theme = props.theme;
  const navigate = useNavigate();
  const [docError, setDocError] = useState("");
  const resumeUrl = greeting.resumeLink
    ? `/${greeting.resumeLink}`
    : "";
  const coverUrl = greeting.coverLetterLink
    ? `/${greeting.coverLetterLink}`
    : "";

  const handleDocOpen = async (event, url, label) => {
    event.preventDefault();
    if (!url) {
      setDocError(`${label} is unavailable right now.`);
      return;
    }

    try {
      const response = await fetch(url, { method: "HEAD" });
      if (!response.ok) {
        throw new Error("missing");
      }
      setDocError("");
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (error) {
      setDocError(`${label} is unavailable right now.`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div
        className="greet-main"
        id="greeting"
        style={{
          background: buildThemeBackground(theme.heroGradient, theme.heroPattern),
          border: `${theme.panelBorderWidth} ${theme.panelBorderStyle} ${theme.borderSoft}`,
          borderRadius: theme.heroRadius,
          boxShadow: buildThemeShadow(`0 28px 80px ${theme.shadowColor}`, theme.panelGlow),
          transition:
            `border-color var(--theme-transition-fast), box-shadow var(--theme-transition-slow)`,
        }}
      >
        <div className="greeting-main">
          <div className="greeting-text-div">
            <div>
              <h1
                className="greeting-text"
                style={{
                  color: theme.text,
                  fontFamily: theme.accentFontFamily,
                  letterSpacing: theme.accentLetterSpacing,
                  transition: themeTextTransition,
                }}
              >
                {greeting.title}
              </h1>
              <p
                className="greeting-text-p subTitle"
                style={{ color: theme.secondaryText, transition: themeTextTransition }}
              >
                <span>I'm </span>
                <span
                  style={{
                    color: theme.accentColor,
                    fontFamily: theme.accentFontFamily,
                    letterSpacing: theme.accentLetterSpacing,
                    transition: themeTextTransition,
                  }}
                >
                  {greeting.fullName}.{" "}
                </span>
                {greeting.subTitle}
              </p>

              {/* Hero Bullets */}
              {greeting.heroBullets && greeting.heroBullets.length > 0 && (
                <ul className="hero-bullets" style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "1rem 0",
                  background: buildThemeBackground(theme.cardBackgroundAlt, theme.surfacePattern),
                  border: `${theme.panelBorderWidth} ${theme.panelBorderStyle} ${theme.borderSoft}`,
                  boxShadow: buildThemeShadow(`0 18px 40px ${theme.shadowColor}`, theme.panelGlow),
                  transition: themeElevatedSurfaceTransition,
                  borderRadius: theme.surfaceRadius,
                  paddingInline: "1.25rem",
                  paddingBlock: "1.1rem",
                }}>
                  {greeting.heroBullets.map((bullet, i) => (
                    <li key={i} style={{
                      fontSize: "0.95rem",
                      color: theme.secondaryText,
                      transition: themeTextTransition,
                      marginBottom: "0.4rem",
                      paddingLeft: "1.2rem",
                      position: "relative",
                    }}>
                      <span style={{
                        position: "absolute",
                        left: 0,
                        color: theme.accentColor,
                        transition: themeTextTransition,
                      }}>▸</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}

              {/* Philosophy */}
              {greeting.philosophy && (
                <p className="greeting-philosophy" style={{
                  fontSize: "0.9rem",
                  fontStyle: "italic",
                  color: theme.secondaryText,
                  borderLeft: `3px solid ${theme.accentColor}`,
                  transition:
                    `background-color var(--theme-transition-medium), color var(--theme-transition-fast), border-left-color var(--theme-transition-fast), box-shadow var(--theme-transition-medium)`,
                  paddingLeft: "1rem",
                  marginTop: "0.8rem",
                  marginBottom: "1.2rem",
                  lineHeight: "1.5",
                  background: buildThemeBackground(theme.accentSoft, theme.surfacePattern),
                  boxShadow: buildThemeShadow(`0 16px 32px ${theme.shadowColor}`, theme.panelGlow),
                  borderTopRightRadius: theme.controlRadius,
                  borderBottomRightRadius: theme.controlRadius,
                  paddingTop: "0.95rem",
                  paddingBottom: "0.95rem",
                  paddingRight: "1rem",
                }}>
                  {greeting.philosophy}
                </p>
              )}

              <div className="portfolio-repo-btn-div">
                <button
                  className="button"
                  onClick={() => {
                    navigate("/contact");
                  }}
                  style={{
                    background: buildThemeBackground(theme.buttonColor, theme.buttonPattern),
                    color: theme.buttonText,
                    marginRight: "15px",
                    border: `${theme.panelBorderWidth} ${theme.panelBorderStyle} ${theme.borderColor}`,
                    borderRadius: theme.controlRadius,
                    boxShadow: buildThemeShadow(`0 18px 40px ${theme.shadowColor}`, theme.buttonGlow),
                    fontFamily: theme.accentFontFamily,
                    letterSpacing: theme.accentLetterSpacing,
                    transition: themeSurfaceTransition,
                  }}
                >
                  Contact Me
                </button>
                {greeting.resumeLink && (
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button"
                    onClick={event =>
                      handleDocOpen(event, resumeUrl, "Resume")
                    }
                    style={{
                      background: buildThemeBackground(theme.buttonColor, theme.buttonPattern),
                      color: theme.buttonText,
                      marginRight: "15px",
                      display: "inline-flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textDecoration: "none",
                      border: `${theme.panelBorderWidth} ${theme.panelBorderStyle} ${theme.borderColor}`,
                      borderRadius: theme.controlRadius,
                      boxShadow: buildThemeShadow(`0 18px 40px ${theme.shadowColor}`, theme.buttonGlow),
                      fontFamily: theme.accentFontFamily,
                      letterSpacing: theme.accentLetterSpacing,
                      transition: themeSurfaceTransition,
                    }}
                  >
                    Download Resume
                  </a>
                )}
                {greeting.coverLetterLink && (
                  <a
                    href={coverUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button"
                    onClick={event =>
                      handleDocOpen(event, coverUrl, "Cover letter")
                    }
                    style={{
                      background: buildThemeBackground(theme.buttonColor, theme.buttonPattern),
                      color: theme.buttonText,
                      display: "inline-flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textDecoration: "none",
                      border: `${theme.panelBorderWidth} ${theme.panelBorderStyle} ${theme.borderColor}`,
                      borderRadius: theme.controlRadius,
                      boxShadow: buildThemeShadow(`0 18px 40px ${theme.shadowColor}`, theme.buttonGlow),
                      fontFamily: theme.accentFontFamily,
                      letterSpacing: theme.accentLetterSpacing,
                      transition: themeSurfaceTransition,
                    }}
                  >
                    View Cover Letter
                  </a>
                )}
              </div>
              {docError && (
                <p
                  className="doc-fallback-text"
                  style={{ color: theme.secondaryText, transition: themeTextTransition }}
                >
                  {docError}
                </p>
              )}
            </div>
          </div>
          <div className="greeting-image-div">
            <FeelingProud theme={theme} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
