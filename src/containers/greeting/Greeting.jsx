import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { homePageData, socialMediaLinks } from "../../portfolio";
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
          `0 2px 8px ${theme.shadowColor}`,
          theme.panelGlow
        ),
      }}
    >
      <div className="hero-copy">
        <div className="hero-atmosphere" aria-hidden="true" />
        <motion.p {...revealMotion(0, true)} className="hero-eyebrow" style={{ color: theme.secondaryText }}>
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
        <motion.div {...revealMotion(2, true)} className="hero-actions">
          <Link
            className="button"
            to="/contact"
            style={{
              background: theme.accentGradient,
              color: theme.accentText,
              borderColor: theme.borderColor,
              borderRadius: theme.controlRadius,
              transition: themeSurfaceTransition,
            }}
          >
            Contact me
          </Link>
          <a
            className="button button-secondary"
            href="#professional-work"
            style={{
              color: theme.text,
              borderColor: theme.borderSoft,
              borderRadius: theme.controlRadius,
              transition: themeSurfaceTransition,
            }}
          >
            View professional work
          </a>
          {socialMediaLinks.github?.trim() && (
            <a className="button button-secondary" href={socialMediaLinks.github.trim()}
              style={{ color: theme.text, borderColor: theme.borderSoft, borderRadius: theme.controlRadius }}>
              View GitHub profile
            </a>
          )}
        </motion.div>
      </div>

    </section>
  );
}
