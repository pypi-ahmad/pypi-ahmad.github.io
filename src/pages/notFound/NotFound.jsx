import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import {
  buildThemeBackground,
  buildThemeShadow,
  themeElevatedSurfaceTransition,
} from "../../themeMotion";
import "./NotFound.css";

function NotFound(props) {
  const theme = props.theme;

  return (
    <div className="not-found-main">
      <Header />
      <main className="basic-not-found" id="main-content">
        <section
          className="not-found-card"
          style={{
            background: buildThemeBackground(theme.bodyAlt, theme.surfacePattern),
            border: `${theme.panelBorderWidth} ${theme.panelBorderStyle} ${theme.borderSoft}`,
            boxShadow: buildThemeShadow(`0 18px 40px ${theme.shadowColor}`, theme.panelGlow),
            transition: themeElevatedSurfaceTransition,
          }}
          aria-labelledby="not-found-title"
        >
          <p className="not-found-code" style={{ color: theme.text }}>
            404
          </p>
          <h1 id="not-found-title" className="not-found-title" style={{ color: theme.text }}>
            Page not found
          </h1>
          <p className="not-found-description" style={{ color: theme.secondaryText }}>
            The page you requested does not exist or has moved. Use the button
            below to return to the portfolio homepage.
          </p>
          <div className="not-found-actions">
            <Link
              to="/home"
              className="not-found-link"
              style={{
                background: theme.accentGradient,
                color: theme.accentText,
              }}
            >
              Go to Home
            </Link>
          </div>
        </section>
      </main>
      <Footer theme={theme} />
    </div>
  );
}

export default NotFound;
