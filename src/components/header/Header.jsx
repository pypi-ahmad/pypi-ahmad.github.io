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
import React, { useEffect, useState } from "react";
import "./Header.css";
import { motion } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    resolvedTheme,
    themeMode,
    toggleMode,
  } = useThemeController();
  const location = useLocation();
  const theme = resolvedTheme;

  const link = settings.isSplash ? "/splash" : "/home";

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { className: "homei", to: "/home", label: "Home" },
    {
      className: "ec",
      to: "/education",
      label: "Education and Certifications",
    },
    { className: "xp", to: "/experience", label: "Experience" },
    { className: "skills", to: "/skills", label: "Skills" },
    { className: "projects", to: "/projects", label: "Projects" },
    { className: "cr", to: "/contact", label: "Contact Me" },
    { className: "themei", to: "/theme", label: "Theme" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen((currentOpen) => !currentOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const icon =
    themeMode === "dark" ? (
      <HiMoon strokeWidth={1} size={20} color={theme.secondaryText} />
    ) : (
      <CgSun strokeWidth={1} size={20} color={theme.accentSolid} />
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
          <button
            className={`menu-icon${isMenuOpen ? " is-open" : ""}`}
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="site-menu"
            onClick={toggleMenu}
            style={{
              background: buildThemeBackground(theme.buttonColor, theme.buttonPattern),
              color: theme.text,
              borderColor: theme.borderColor,
              borderWidth: theme.panelBorderWidth,
              borderStyle: theme.panelBorderStyle,
              borderRadius: theme.controlRadius,
              boxShadow: buildThemeShadow(`0 12px 28px ${theme.shadowColor}`, theme.buttonGlow),
              transition: themeSurfaceTransition,
            }}
          >
            <span className="navicon"></span>
          </button>
          <ul
            id="site-menu"
            className={`menu${isMenuOpen ? " menu--open" : ""}`}
            hidden={!isMenuOpen}
            style={{
              background: buildThemeBackground(theme.cardBackgroundAlt, theme.surfacePattern),
              borderColor: theme.borderSoft,
              borderWidth: theme.panelBorderWidth,
              borderStyle: theme.panelBorderStyle,
              borderRadius: theme.surfaceRadius,
              boxShadow: buildThemeShadow(`0 18px 42px ${theme.shadowColor}`, theme.panelGlow),
              transition: themeElevatedSurfaceTransition,
            }}
          >
            <li className="menu-brand-item">
              <NavLink
                to={link}
                className="menu-brand"
                onClick={closeMenu}
                style={{
                  color: theme.text,
                  fontFamily: theme.accentFontFamily,
                  letterSpacing: theme.accentLetterSpacing,
                  transition: themeSurfaceTransition,
                }}
              >
                {greeting.logoName}
              </NavLink>
            </li>
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  className={item.className}
                  to={item.to}
                  style={navigationLinkStyle(theme)}
                  onClick={closeMenu}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li className="menu-theme-toggle-item">
              <button
                className="change-theme-btn"
                onClick={() => {
                  toggleMode();
                  closeMenu();
                }}
                type="button"
                style={{
                  cursor: "pointer",
                  height: "45px",
                  width: "45px",
                  margin: 0,
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
