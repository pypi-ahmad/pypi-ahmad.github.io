import { describe, expect, it } from "vitest";
import * as themeModule from "../theme";
import {
  DEFAULT_ACCENT,
  DEFAULT_THEME_MODE,
  darkTheme,
  lightTheme,
  resolveTheme,
} from "../theme";

function hexToRgb(hex) {
  const normalizedHex = hex.replace("#", "");
  const numericHex = Number.parseInt(normalizedHex, 16);

  return {
    r: (numericHex >> 16) & 255,
    g: (numericHex >> 8) & 255,
    b: numericHex & 255,
  };
}

function getRelativeLuminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  const transformChannel = channel => {
    const normalizedChannel = channel / 255;
    return normalizedChannel <= 0.03928
      ? normalizedChannel / 12.92
      : ((normalizedChannel + 0.055) / 1.055) ** 2.4;
  };

  return (
    0.2126 * transformChannel(r) +
    0.7152 * transformChannel(g) +
    0.0722 * transformChannel(b)
  );
}

function getContrastRatio(foregroundHex, backgroundHex) {
  const foreground = getRelativeLuminance(foregroundHex);
  const background = getRelativeLuminance(backgroundHex);
  const [lighter, darker] =
    foreground > background ? [foreground, background] : [background, foreground];

  return (lighter + 0.05) / (darker + 0.05);
}

describe("Default theme", () => {
  it("exports only one light-dark theme contract", () => {
    expect(themeModule).not.toHaveProperty("themes");
    expect(themeModule).not.toHaveProperty("themeFamilyOptions");
    expect(themeModule).not.toHaveProperty("DEFAULT_THEME_FAMILY");
    expect(lightTheme.name).toBe("light");
    expect(darkTheme.name).toBe("dark");
  });

  it("defaults invalid modes to dark", () => {
    expect(DEFAULT_THEME_MODE).toBe("dark");
    expect(resolveTheme()).toBe(darkTheme);
    expect(resolveTheme("unknown")).toBe(darkTheme);
  });

  it("defaults missing or invalid accents to pink", () => {
    expect(DEFAULT_ACCENT).toBe("pink");
    expect(resolveTheme("dark", "unknown")).toBe(darkTheme);
    expect(resolveTheme("light", "unknown")).toBe(lightTheme);
  });

  it("resolves light and dark modes", () => {
    expect(resolveTheme("light")).toBe(lightTheme);
    expect(resolveTheme("dark")).toBe(darkTheme);
  });

  it("keeps identical semantic token keys in both modes", () => {
    expect(Object.keys(lightTheme).sort()).toEqual(Object.keys(darkTheme).sort());
    expect(Object.keys(resolveTheme("light", "blue")).sort()).toEqual(
      Object.keys(lightTheme).sort()
    );
    expect(Object.keys(resolveTheme("dark", "blue")).sort()).toEqual(
      Object.keys(darkTheme).sort()
    );
  });

  it.each(["light", "dark"])("resolves the blue accent in %s mode", mode => {
    const theme = resolveTheme(mode, "blue");

    expect(theme.accentStart).toBe("#6366F1");
    expect(theme.accentEnd).toBe("#1E3A8A");
    expect(theme.accentGradient).toBe(
      "linear-gradient(135deg, #6366F1 0%, #1E3A8A 100%)"
    );
    expect(theme.accentSolid).toBe(mode === "light" ? "#4338CA" : "#818CF8");
    expect(theme.heroGradient).toContain("rgba(99, 102, 241");
  });

  it.each([
    ["light", lightTheme],
    ["dark", darkTheme],
  ])("keeps %s mode text readable", (_mode, theme) => {
    expect(getContrastRatio(theme.text, theme.body)).toBeGreaterThanOrEqual(7);
    expect(getContrastRatio(theme.secondaryText, theme.body)).toBeGreaterThanOrEqual(4.5);
  });

  it.each([lightTheme, darkTheme])("retains the component token contract", theme => {
    expect(theme.accentGradient).toContain("linear-gradient");
    expect(theme.heroGradient).toContain("linear-gradient");
    expect(theme.surfaceRadius).toBe("24px");
    expect(theme.panelBorderStyle).toBe("solid");
    expect(theme.accentFontFamily).toContain("Google Sans Medium");
  });
});
