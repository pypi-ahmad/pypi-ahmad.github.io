import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { motion } from "framer-motion";
import { useThemeController } from "../../themeController";
import { themeFamilyOptions, themes } from "../../theme";
import {
  buildThemeBackground,
  buildThemeShadow,
  themeElevatedSurfaceTransition,
  themeSurfaceTransition,
} from "../../themeMotion";
import { CgSun } from "react-icons/cg/";
import { HiMoon } from "react-icons/hi";
import "./ThemePage.css";

function ThemePage() {
  const { resolvedTheme, themeFamily, themeMode, setThemeFamily, toggleMode } =
    useThemeController();
  const theme = resolvedTheme;

  const icon =
    themeMode === "dark" ? (
      <HiMoon strokeWidth={1} size={20} color={theme.secondaryText} />
    ) : (
      <CgSun strokeWidth={1} size={20} color={theme.accentSolid} />
    );

  const previewThemes = themeFamilyOptions.map((familyOption) => {
    const familyTheme = themes[familyOption.value];
    return {
      ...familyOption,
      current: familyTheme[themeMode],
      light: familyTheme.light,
      dark: familyTheme.dark,
    };
  });

  return (
    <div className="theme-page-main">
      <Header />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="theme-page-container">
          <h1 className="theme-page-heading" style={{ color: theme.text }}>
            Theme
          </h1>
          <p className="theme-page-subtitle" style={{ color: theme.secondaryText }}>
            Choose a theme family and toggle between light &amp; dark mode.
          </p>

          <div className="theme-page-section">
            <div className="theme-page-section-title" style={{ color: theme.secondaryText }}>
              Mode &amp; Family
            </div>
            <div className="theme-page-controls-row">
              <button
                className="change-theme-btn"
                onClick={toggleMode}
                type="button"
                style={{
                  cursor: "pointer",
                  height: "45px",
                  width: "45px",
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
              <select
                className="theme-family-select"
                value={themeFamily}
                onChange={(event) => setThemeFamily(event.target.value)}
                aria-label="Theme Family"
                style={{
                  borderWidth: theme.panelBorderWidth,
                  borderStyle: theme.panelBorderStyle,
                  borderRadius: theme.controlRadius,
                  transition: themeSurfaceTransition,
                  boxShadow:
                    themeMode === "light"
                      ? buildThemeShadow("0 6px 16px rgba(31, 41, 55, 0.08)", theme.buttonGlow)
                      : buildThemeShadow("0 8px 20px rgba(0, 0, 0, 0.28)", theme.buttonGlow),
                }}
              >
                {themeFamilyOptions.map((family) => (
                  <option key={family.value} value={family.value}>
                    {family.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="theme-page-section">
            <div className="theme-page-section-title" style={{ color: theme.secondaryText }}>
              Gallery
            </div>
            <div className="theme-page-grid">
              {previewThemes.map((familyOption) => {
                const isActiveFamily = familyOption.value === themeFamily;
                return (
                  <button
                    key={familyOption.value}
                    type="button"
                    className={`theme-preview-chip${isActiveFamily ? " is-active" : ""}`}
                    onClick={() => setThemeFamily(familyOption.value)}
                    aria-pressed={isActiveFamily}
                    aria-label={`Select ${familyOption.label} theme`}
                    title={familyOption.label}
                    style={{
                      background: buildThemeBackground(
                        familyOption.current.heroGradient,
                        familyOption.current.heroPattern
                      ),
                      color: familyOption.current.text,
                      borderColor: isActiveFamily
                        ? familyOption.current.accentSolid
                        : familyOption.current.borderSoft,
                      transition: themeElevatedSurfaceTransition,
                      borderWidth: familyOption.current.panelBorderWidth,
                      borderStyle: familyOption.current.panelBorderStyle,
                      borderRadius: familyOption.current.surfaceRadius,
                      boxShadow: isActiveFamily
                        ? buildThemeShadow(
                            `0 18px 34px ${familyOption.current.glowColor}`,
                            familyOption.current.panelGlow
                          )
                        : buildThemeShadow(
                            `0 12px 24px ${familyOption.current.shadowColor}`,
                            familyOption.current.panelGlow
                          ),
                    }}
                  >
                    <span className="theme-preview-chip-header">
                      <span
                        className="theme-preview-chip-name"
                        style={{
                          fontFamily: familyOption.current.accentFontFamily,
                          letterSpacing: familyOption.current.accentLetterSpacing,
                        }}
                      >
                        {familyOption.label}
                      </span>
                      <span className="theme-preview-chip-mode">{themeMode}</span>
                    </span>
                    <span className="theme-preview-chip-swatches" aria-hidden="true">
                      {[
                        familyOption.light.accentStart,
                        familyOption.light.accentEnd,
                        familyOption.dark.accentStart,
                        familyOption.dark.accentEnd,
                      ].map((color, index) => (
                        <span
                          key={`${familyOption.value}-${index}`}
                          className="theme-preview-swatch"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </span>
                    <span className="theme-preview-chip-surface-row" aria-hidden="true">
                      <span
                        className="theme-preview-chip-surface"
                        style={{
                          background: buildThemeBackground(
                            familyOption.current.bodyAlt,
                            familyOption.current.surfacePattern
                          ),
                          borderColor: familyOption.current.borderSoft,
                          borderWidth: familyOption.current.panelBorderWidth,
                          borderStyle: familyOption.current.panelBorderStyle,
                        }}
                      />
                      <span
                        className="theme-preview-chip-surface"
                        style={{
                          background: buildThemeBackground(
                            familyOption.current.accentSoft,
                            familyOption.current.buttonPattern
                          ),
                          borderColor: familyOption.current.borderSoft,
                          borderWidth: familyOption.current.panelBorderWidth,
                          borderStyle: familyOption.current.panelBorderStyle,
                        }}
                      />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
      <Footer theme={theme} />
    </div>
  );
}

export default ThemePage;
