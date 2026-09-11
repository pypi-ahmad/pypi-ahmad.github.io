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
  // Opaque token pairs are only one layer of coverage; browser checks include gradients and composition.
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
    expect(resolveTheme().name).toBe("dark");
    expect(resolveTheme("unknown").name).toBe("dark");
  });

  it("defaults missing or invalid accents to indigo", () => {
    expect(DEFAULT_ACCENT).toBe("blue");
    expect(resolveTheme("dark", "unknown").accentStart).toBe("#4F46E5");
    expect(resolveTheme("light", "unknown").accentStart).toBe("#4F46E5");
  });

  it("resolves light and dark modes", () => {
    expect(resolveTheme("light").name).toBe("light");
    expect(resolveTheme("dark").name).toBe("dark");
  });

  it("keeps the pink accent available in both modes", () => {
    expect(resolveTheme("light", "pink")).toBe(lightTheme);
    expect(resolveTheme("dark", "pink")).toBe(darkTheme);
  });

  it("keeps identical semantic token keys in both modes", () => {
    expect(Object.keys(lightTheme).sort()).toEqual(Object.keys(darkTheme).sort());
    expect(Object.keys(resolveTheme("light", "blue")).sort()).toEqual(
      Object.keys(lightTheme).sort()
    );
    expect(Object.keys(resolveTheme("dark", "blue")).sort()).toEqual(
      Object.keys(darkTheme).sort()
    );
    expect(Object.keys(resolveTheme("light", "pink-indigo")).sort()).toEqual(
      Object.keys(lightTheme).sort()
    );
    expect(Object.keys(resolveTheme("dark", "pink-indigo")).sort()).toEqual(
      Object.keys(darkTheme).sort()
    );
  });

  it.each(["light", "dark"])("resolves the blue accent in %s mode", mode => {
    const theme = resolveTheme(mode, "blue");

    expect(theme.accentStart).toBe("#4F46E5");
    expect(theme.accentEnd).toBe("#1E3A8A");
    expect(theme.accentGradient).toBe(
      "linear-gradient(135deg, #4F46E5 0%, #1E3A8A 100%)"
    );
    expect(theme.accentSolid).toBe(mode === "light" ? "#4338CA" : "#A5B4FC");
    expect(theme.heroGradient).toContain("rgba(79, 70, 229");
  });

  it.each(["light", "dark"])(
    "resolves the dark pink and indigo accent in %s mode",
    mode => {
      const theme = resolveTheme(mode, "pink-indigo");

      expect(theme.accentStart).toBe("#BE185D");
      expect(theme.accentEnd).toBe("#312E81");
      expect(theme.accentGradient).toBe(
        "linear-gradient(135deg, #BE185D 0%, #312E81 100%)"
      );
      expect(theme.accentSolid).toBe(mode === "light" ? "#9D174D" : "#F9A8D4");
      expect(theme.heroGradient).toContain("rgba(190, 24, 93");
      expect(theme.heroGradient).toContain("rgba(49, 46, 129");
      expect(getContrastRatio(theme.accentSolid, theme.body)).toBeGreaterThanOrEqual(4.5);
      expect(getContrastRatio(theme.accentText, theme.accentStart)).toBeGreaterThanOrEqual(4.5);
      expect(getContrastRatio(theme.accentText, theme.accentEnd)).toBeGreaterThanOrEqual(4.5);
    }
  );

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
    expect(theme.surfaceRadius).toBe("18px");
    expect(theme.panelBorderStyle).toBe("solid");
    expect(theme.accentFontFamily).toContain("Google Sans");
    expect(theme.separatorColor).toBe(theme.name === "light"
      ? "rgba(201, 215, 234, 0.55)" : "rgba(59, 61, 69, 0.78)");
  });
});

describe("Rendered surface contrast", () => {
  const appearances = ["light", "dark"].flatMap(mode =>
    ["blue", "pink", "pink-indigo"].map(accent => [mode, accent])
  );
  it.each(appearances)("%s / %s keeps secondary text readable on cards", (mode, accent) => {
    const theme = resolveTheme(mode, accent);
    expect(getContrastRatio(theme.accentSolid, theme.body)).toBeGreaterThanOrEqual(4.5);
    expect(getContrastRatio(theme.secondaryText, theme.cardBackgroundAlt)).toBeGreaterThanOrEqual(4.5);
    expect(getContrastRatio(theme.secondaryText, theme.bodyAlt)).toBeGreaterThanOrEqual(4.5);
    const soft = theme.accentSoft.match(/[\d.]+/g).map(Number);
    const canvas = hexToRgb(theme.body);
    const blended = "#" + ["r", "g", "b"].map((channel, index) =>
      Math.round(soft[index] * soft[3] + canvas[channel] * (1 - soft[3]))
        .toString(16).padStart(2, "0")
    ).join("");
    expect(getContrastRatio(theme.secondaryText, blended)).toBeGreaterThanOrEqual(4.5);
  });
  it.each(appearances)("%s / %s keeps labels readable throughout gradients", (mode, accent) => {
    const theme = resolveTheme(mode, accent);
    const start = hexToRgb(theme.accentStart);
    const end = hexToRgb(theme.accentEnd);
    for (let step = 0; step <= 100; step++) {
      const color = "#" + ["r", "g", "b"].map(channel =>
        Math.round(start[channel] + (end[channel] - start[channel]) * step / 100)
          .toString(16).padStart(2, "0")
      ).join("");
      expect(getContrastRatio(theme.accentText, color)).toBeGreaterThanOrEqual(4.5);
    }
  });
});
