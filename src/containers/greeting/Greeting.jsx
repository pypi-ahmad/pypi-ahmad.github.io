import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { greeting, homePageData } from "../../portfolio";
import {
  buildThemeBackground,
  buildThemeShadow,
  themeElevatedSurfaceTransition,
  themeSurfaceTransition,
  themeTextTransition,
} from "../../themeMotion";
import "./Greeting.css";

export default function Greeting({ theme }) {
  return (
    <motion.section
      id="greeting"
      className="greet-main"
      aria-labelledby="home-title"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        background: buildThemeBackground(theme.heroGradient, theme.heroPattern),
        border: `${theme.panelBorderWidth} ${theme.panelBorderStyle} ${theme.borderSoft}`,
        borderRadius: theme.heroRadius,
        boxShadow: buildThemeShadow(
          `0 28px 80px ${theme.shadowColor}`,
          theme.panelGlow
        ),
      }}
    >
      <div className="hero-copy">
        <p className="hero-eyebrow" style={{ color: theme.accentSolid }}>
          {homePageData.hero.eyebrow}
        </p>
        <h1
          id="home-title"
          className="greeting-text"
          style={{
            color: theme.text,
            fontFamily: theme.accentFontFamily,
            letterSpacing: theme.accentLetterSpacing,
            transition: themeTextTransition,
          }}
        >
          {homePageData.hero.title}
        </h1>
        <p
          className="greeting-text-p"
          style={{ color: theme.secondaryText, transition: themeTextTransition }}
        >
          {homePageData.hero.introduction}
        </p>
        <div className="hero-actions" aria-label="Portfolio actions">
          <a
            className="button"
            href="#selected-work"
            style={{
              background: theme.accentGradient,
              color: theme.accentText,
              borderColor: theme.borderColor,
              borderRadius: theme.controlRadius,
              transition: themeSurfaceTransition,
            }}
          >
            View selected work
          </a>
          <a
            className="button button-secondary"
            href={`/${greeting.resumeLink}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: theme.text,
              borderColor: theme.borderSoft,
              borderRadius: theme.controlRadius,
              transition: themeSurfaceTransition,
            }}
          >
            Download résumé
          </a>
          <Link
            className="button button-secondary"
            to="/contact"
            style={{
              color: theme.text,
              borderColor: theme.borderSoft,
              borderRadius: theme.controlRadius,
              transition: themeSurfaceTransition,
            }}
          >
            Contact me
          </Link>
        </div>
      </div>

      <div className="outcomes" aria-labelledby="outcomes-title">
        <div className="section-heading-row">
          <h2 id="outcomes-title" style={{ color: theme.text }}>
            Evidence from internal work
          </h2>
          <p style={{ color: theme.secondaryText }}>
            These are team and system results from confidential internal
            evaluations. Contribution notes identify the parts I worked on.
          </p>
        </div>
        <ul className="outcome-grid">
          {homePageData.outcomes.map(outcome => (
            <li
              key={outcome.label}
              className="outcome-card"
              style={{
                background: buildThemeBackground(
                  theme.cardBackgroundAlt,
                  theme.surfacePattern
                ),
                border: `${theme.panelBorderWidth} ${theme.panelBorderStyle} ${theme.borderSoft}`,
                borderRadius: theme.surfaceRadius,
                boxShadow: buildThemeShadow(
                  `0 18px 40px ${theme.shadowColor}`,
                  theme.panelGlow
                ),
                transition: themeElevatedSurfaceTransition,
              }}
            >
              <strong style={{ color: theme.accentSolid }}>
                {outcome.metric}
              </strong>
              <h3 style={{ color: theme.text }}>{outcome.label}</h3>
              <p style={{ color: theme.secondaryText }}>{outcome.context}</p>
              <p className="contribution" style={{ color: theme.secondaryText }}>
                {outcome.contribution}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}
