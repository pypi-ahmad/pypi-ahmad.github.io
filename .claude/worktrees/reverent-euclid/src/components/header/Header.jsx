/**
 * Header — Site-wide navigation bar
 *
 * Features:
 *  - Logo link (routes to /home or /splash based on settings)
 *  - Six NavLinks with active-state bold styling
 *  - Light/dark theme toggle button (persists choice to localStorage)
 *  - Responsive hamburger menu for mobile viewports
 *
 * Theme state comes from the global theme controller.
 */
import React from "react";
import "./Header.css";
import { motion } from "framer-motion";
import { NavLink, Link } from "react-router-dom";
import { greeting, settings } from "../../portfolio.js";
import { CgSun } from "react-icons/cg/";
import { HiMoon } from "react-icons/hi";
import { useThemeController } from "../../themeController";
import {
  buildThemeBackground,
  buildThemeShadow,
  themeSurfaceTransition,
  themeElevatedSurfaceTransition,
} from "../../themeMotion";

const navigationLinkStyle = (theme) => ({ isActive }) => ({
  fontWeight: isActive ? "bold" : "normal",
  borderRadius: theme.controlRadius,
  color: theme.text,
  backgroundColor: isActive ? theme.accentSoft : "transparent",
  boxShadow: isActive
    ? buildThemeShadow(`0 12px 30px ${theme.shadowColor}`, theme.buttonGlow)
    : "none",
  transition: themeSurfaceTransition,
});

function Header() {
  const {
    resolvedTheme,
    themeMode,
    toggleMode,
  } = useThemeController();
  const theme = resolvedTheme;

  const link = settings.isSplash ? "/splash" : "/home";

  const icon =
    themeMode === "dark" ? (
      <HiMoon
        strokeWidth={1}
        size={20}
        color={themeMode === "light" ? "#F9D784" : "#A7A7A7"}
      />
    ) : (
      <CgSun
        strokeWidth={1}
        size={20}
        color={themeMode === "light" ? "#F9D784" : "#A7A7A7"}
      />
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div>
        <header
          className="header"
          style={{
            background: buildThemeBackground(theme.headerSurface, theme.headerPattern),
            borderColor: theme.borderSoft,
            borderWidth: theme.panelBorderWidth,
            borderStyle: theme.panelBorderStyle,
            borderRadius: theme.surfaceRadius,
            boxShadow: buildThemeShadow(`0 18px 42px ${theme.shadowColor}`, theme.panelGlow),
            transition: themeElevatedSurfaceTransition,
          }}
        >
          <NavLink to={link} as={Link} className="logo">
            <span style={{ color: theme.text }}></span>
            <span
              className="logo-name"
              style={{
                color: theme.text,
                fontFamily: theme.accentFontFamily,
                letterSpacing: theme.accentLetterSpacing,
              }}
            >
              {greeting.logoName}
            </span>
            <span style={{ color: theme.text }}></span>
          </NavLink>
          <input className="menu-btn" type="checkbox" id="menu-btn" />
          <label className="menu-icon" htmlFor="menu-btn" aria-label="Toggle navigation menu">
            <span className="navicon"></span>
          </label>
          <ul className="menu">
            <li>
              <NavLink
                className="homei"
                to="/home"
                as={Link}
                style={navigationLinkStyle(theme)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className="ec"
                to="/education"
                as={Link}
                style={navigationLinkStyle(theme)}
              >
                Education and Certifications
              </NavLink>
            </li>
            <li>
              <NavLink
                className="xp"
                to="/experience"
                as={Link}
                style={navigationLinkStyle(theme)}
              >
                Experience
              </NavLink>
            </li>
            <li>
              <NavLink
                className="skills"
                to="/skills"
                as={Link}
                style={navigationLinkStyle(theme)}
              >
                Skills
              </NavLink>
            </li>
            <li>
              <NavLink
                className="projects"
                to="/projects"
                as={Link}
                style={navigationLinkStyle(theme)}
              >
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink
                className="cr"
                to="/contact"
                as={Link}
                style={navigationLinkStyle(theme)}
              >
                Contact Me
              </NavLink>
            </li>
            <li>
              <NavLink
                className="themei"
                to="/theme"
                as={Link}
                style={navigationLinkStyle(theme)}
              >
                Theme
              </NavLink>
            </li>
            <li style={{ listStyle: "none" }}>
              <button
                className="change-theme-btn"
                onClick={toggleMode}
                type="button"
                style={{
                  cursor: "pointer",
                  height: "45px",
                  width: "45px",
                  marginRight: "5px",
                  marginLeft: "10px",
                  paddingTop: "5px",
                  borderRadius: "50%",
                  borderColor: theme.borderColor,
                  borderWidth: theme.panelBorderWidth,
                  borderStyle: theme.panelBorderStyle,
                  alignItems: "center",
                  justifyContent: "center",
                  background: buildThemeBackground(theme.buttonColor, theme.buttonPattern),
                  color: theme.selectorText,
                  outline: "none",
                  transition: themeSurfaceTransition,
                  boxShadow:
                    themeMode === "light"
                      ? buildThemeShadow("0 6px 16px rgba(31, 41, 55, 0.08)", theme.buttonGlow)
                      : buildThemeShadow("0 8px 20px rgba(0, 0, 0, 0.28)", theme.buttonGlow),
                }}
                aria-label="Toggle Theme"
              >
                {icon}
              </button>
            </li>
          </ul>
        </header>
      </div>
    </motion.div>
  );
}

export default Header;
