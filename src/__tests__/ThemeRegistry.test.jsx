import { describe, expect, it } from "vitest";
import {
  resolveTheme,
  themeFamilyOptions,
  themes,
  DEFAULT_THEME_FAMILY,
  DEFAULT_THEME_MODE,
} from "../theme";

function hexToRgb(hex) {
  const normalized = hex.replace("#", "");
  const numeric = Number.parseInt(normalized, 16);
  return {
    r: (numeric >> 16) & 255,
    g: (numeric >> 8) & 255,
    b: numeric & 255,
  };
}

function relativeLuminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  const transform = (channel) => {
    const normalized = channel / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  };

  return 0.2126 * transform(r) + 0.7152 * transform(g) + 0.0722 * transform(b);
}

function contrastRatio(foreground, background) {
  const fg = relativeLuminance(foreground);
  const bg = relativeLuminance(background);
  const [lighter, darker] = fg > bg ? [fg, bg] : [bg, fg];
  return (lighter + 0.05) / (darker + 0.05);
}

describe("Theme registry — minimal light/dark contract", () => {
  it("exposes only the default theme family", () => {
    expect(Object.keys(themes)).toEqual([DEFAULT_THEME_FAMILY]);
    expect(themeFamilyOptions).toEqual([{ value: "default", label: "Default" }]);
  });

  it("resolves dark by default", () => {
    const theme = resolveTheme();
    expect(theme.name).toBe(DEFAULT_THEME_MODE);
  });

  it("resolves both light and dark variants", () => {
    const light = resolveTheme({ family: "default", mode: "light" });
    const dark = resolveTheme({ family: "default", mode: "dark" });

    expect(light.name).toBe("light");
    expect(dark.name).toBe("dark");
    expect(light.body).not.toBe(dark.body);
  });

  it("maintains readable text contrast in both modes", () => {
    const variants = [
      resolveTheme({ mode: "light" }),
      resolveTheme({ mode: "dark" }),
    ];

    variants.forEach((theme) => {
      const primary = contrastRatio(theme.text, theme.body);
      const secondary = contrastRatio(theme.secondaryText, theme.body);
      expect(primary).toBeGreaterThanOrEqual(7);
      expect(secondary).toBeGreaterThanOrEqual(4.5);
    });
  });

  it("keeps required semantic tokens for UI rendering", () => {
    const theme = resolveTheme({ mode: "dark" });

    [
      "body",
      "text",
      "secondaryText",
      "accentSolid",
      "accentGradient",
      "accentSoft",
      "projectCard",
      "cardBackgroundAlt",
      "borderSoft",
      "buttonColor",
      "buttonText",
      "surfaceRadius",
      "controlRadius",
      "accentFontFamily",
    ].forEach((token) => {
      expect(theme[token]).toBeTruthy();
    });
  });
});
