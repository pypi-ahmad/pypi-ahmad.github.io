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

  it("uses navy and indigo as the shared accent", () => {
    expect(DEFAULT_ACCENT).toBe("navy-indigo");
    expect(resolveTheme("dark", "unknown").accentStart).toBe("#172554");
    expect(resolveTheme("light", "unknown").accentStart).toBe("#172554");
    expect(resolveTheme("dark", "retired-preset")).toBe(darkTheme);
    expect(resolveTheme("light", "retired-preset")).toBe(lightTheme);
  });

  it("resolves light and dark modes", () => {
    expect(resolveTheme("light").name).toBe("light");
    expect(resolveTheme("dark").name).toBe("dark");
  });

  it("keeps identical semantic token keys in both modes", () => {
    expect(Object.keys(lightTheme).sort()).toEqual(Object.keys(darkTheme).sort());
  });

  it.each(["light", "dark"])("resolves the navy-indigo accent in %s mode", mode => {
    const theme = resolveTheme(mode, "navy-indigo");

    expect(theme.accentStart).toBe("#172554");
    expect(theme.accentEnd).toBe("#312E81");
    expect(theme.accentGradient).toBe(
      "linear-gradient(135deg, #172554 0%, #312E81 100%)"
    );
    expect(theme.accentSolid).toBe(mode === "light" ? "#312E81" : "#B4B0EB");
    expect(theme.heroGradient).toBe(mode === "light" ? "#F2F5FD" : "#1B1D28");
  });

  it.each([
    ["light", lightTheme],
    ["dark", darkTheme],
  ])("keeps %s mode text readable", (_mode, theme) => {
    expect(getContrastRatio(theme.text, theme.body)).toBeGreaterThanOrEqual(7);
    expect(getContrastRatio(theme.secondaryText, theme.body)).toBeGreaterThanOrEqual(4.5);
  });

  it.each([lightTheme, darkTheme])("retains the component token contract", theme => {
    expect(theme.accentGradient).toBe("linear-gradient(135deg, #172554 0%, #312E81 100%)");
    expect(theme.heroGradient).not.toBe(theme.bodyAlt);
    expect(theme.surfaceRadius).toBe("18px");
    expect(theme.panelBorderStyle).toBe("solid");
    expect(theme.accentFontFamily).toContain("system-ui");
    expect(theme.separatorColor).toBe(theme.name === "light"
      ? "rgba(0, 0, 0, 0.10)" : "rgba(255, 255, 255, 0.12)");
  });
});

describe("Scrollbar contrast", () => {
  it.each([lightTheme, darkTheme])("keeps $name scrollbar handles distinguishable in both states", theme => {
    for (const foreground of [theme.scrollbarThumb, theme.scrollbarThumbHover]) {
      expect(getContrastRatio(foreground, theme.scrollbarTrack)).toBeGreaterThanOrEqual(3);
    }
  });
});

describe("Rendered surface contrast", () => {
  const modes = ["light", "dark"];
  it.each(modes)("%s mode separates evidence from interactive accents", mode => {
    const theme = resolveTheme(mode);
    expect([theme.evidenceSurface, theme.evidenceText, theme.evidenceBorder]).toEqual(
      mode === "light" ? ["#EDF8F5", "#246157", "#B9D1CB"] : ["#142622", "#A2CFC5", "#34544E"]
    );
    expect(theme.evidenceText).not.toBe(theme.accentSolid);
    for (const background of [theme.heroGradient, theme.evidenceSurface]) {
      for (const foreground of [theme.text, theme.secondaryText, theme.accentSolid]) {
        expect(getContrastRatio(foreground, background)).toBeGreaterThanOrEqual(4.5);
      }
    }
    expect(getContrastRatio(theme.evidenceText, theme.evidenceSurface)).toBeGreaterThanOrEqual(4.5);
  });
  it.each(modes)("%s mode keeps secondary text readable on cards", mode => {
    const theme = resolveTheme(mode);
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
  it.each(modes)("%s mode keeps filled action labels readable", mode => {
    const theme = resolveTheme(mode);
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
