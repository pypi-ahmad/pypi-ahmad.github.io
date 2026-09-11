import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { homePageData } from "../../portfolio";
import {
  buildThemeBackground,
  buildThemeShadow,
  themeSurfaceTransition,
  themeTextTransition,
  revealMotion,
} from "../../themeMotion";
import "./Greeting.css";

export default function Greeting({ theme }) {
  // Keep the main heading outside reveal wrappers so page identity is visible before entrances finish.
  return (
    <section
      id="greeting"
      className="greet-main"
      aria-labelledby="home-title"
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
        <div className="hero-atmosphere" aria-hidden="true" />
        <motion.p {...revealMotion(0, true)} className="hero-eyebrow" style={{ color: theme.accentSolid }}>
          {homePageData.hero.eyebrow}
        </motion.p>
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
        <motion.p
          {...revealMotion(1, true)}
          className="greeting-text-p"
          style={{ color: theme.secondaryText, transition: themeTextTransition }}
        >
          {homePageData.hero.introduction}
        </motion.p>
        <motion.div {...revealMotion(2, true)} className="hero-actions" aria-label="Portfolio actions">
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
        </motion.div>
      </div>

      <div className="outcomes" aria-labelledby="outcomes-title">
        <motion.div {...revealMotion()} className="section-heading-row">
          <h2 id="outcomes-title" style={{ color: theme.text }}>
            Evidence from internal work
          </h2>
          <p style={{ color: theme.secondaryText }}>
            These are team and system results from internal evaluations.
            Contribution notes identify the parts I worked on.
          </p>
        </motion.div>
        <ul className="outcome-grid">
          {homePageData.outcomes.map((outcome, index) => (
            <motion.li
              {...revealMotion(index)}
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
                transition: themeTextTransition,
              }}
            >
              <strong style={{ color: theme.text }}>
                {outcome.metric}
              </strong>
              <h3 style={{ color: theme.text }}>{outcome.label}</h3>
              <p style={{ color: theme.secondaryText }}>{outcome.context}</p>
              <p className="contribution" style={{ color: theme.secondaryText }}>
                {outcome.contribution}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
