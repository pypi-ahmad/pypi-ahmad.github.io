const baseFontStack = '"Google Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

function createTheme(mode, overrides = {}) {
  const isLight = mode === "light";

  return {
    family: "default",
    name: mode,
    body: isLight ? "#F8FAFC" : "#0B1220",
    text: isLight ? "#0F172A" : "#E5ECF5",
    dark: "#020617",
    secondaryText: isLight ? "#475569" : "#A7B4C8",
    accentColor: isLight ? "#0F766E" : "#4FD1C5",
    accentBright: isLight ? "#0EA5E9" : "#67E8F9",
    accentStart: isLight ? "#0F766E" : "#38BDF8",
    accentEnd: isLight ? "#0EA5E9" : "#4FD1C5",
    accentSolid: isLight ? "#0E7490" : "#22D3EE",
    accentGradient: isLight
      ? "linear-gradient(135deg, #0F766E 0%, #0EA5E9 100%)"
      : "linear-gradient(135deg, #38BDF8 0%, #4FD1C5 100%)",
    accentText: isLight ? "#F8FAFC" : "#06242A",
    projectCard: isLight ? "#FFFFFF" : "#111C30",
    skinColor: "#F7B799",
    skinColor2: "#FCB696",
    imageDark: isLight ? "#E2E8F0" : "#18263C",
    imageClothes: isLight ? "#E2E8F0" : "#18263C",
    avatarMisc: isLight ? "#CBD5E1" : "#1F2A3D",
    avatarShoes: isLight ? "#94A3B8" : "#273247",
    borderColor: isLight ? "#CBD5E1" : "#253447",
    buttonColor: isLight ? "#E2E8F0" : "#16243A",
    hoverColor: isLight ? "#F1F5F9" : "#132137",
    headerColor: isLight ? "#FFFFFF" : "#0E182B",
    selectorBackground: isLight ? "#FFFFFF" : "#111C30",
    selectorText: isLight ? "#0F172A" : "#E5ECF5",
    bodyAlt: isLight ? "#F1F5F9" : "#101A2E",
    accentSoft: isLight ? "rgba(14, 116, 144, 0.10)" : "rgba(34, 211, 238, 0.14)",
    cardBackgroundAlt: isLight ? "#F8FAFC" : "#131F34",
    borderSoft: isLight ? "rgba(100, 116, 139, 0.25)" : "rgba(148, 163, 184, 0.25)",
    buttonText: isLight ? "#0F172A" : "#DCE6F5",
    shadowColor: isLight ? "rgba(15, 23, 42, 0.08)" : "rgba(2, 6, 23, 0.38)",
    heroGradient: isLight
      ? "linear-gradient(160deg, #F8FAFC 0%, #F1F5F9 70%, rgba(14, 116, 144, 0.08) 100%)"
      : "linear-gradient(160deg, #0B1220 0%, #101A2E 65%, rgba(34, 211, 238, 0.10) 100%)",
    glowColor: isLight ? "rgba(14, 116, 144, 0.16)" : "rgba(34, 211, 238, 0.18)",
    surfaceRadius: "16px",
    heroRadius: "18px",
    controlRadius: "12px",
    pillRadius: "999px",
    panelBorderWidth: "1px",
    panelBorderStyle: "solid",
    accentFontFamily: baseFontStack,
    accentLetterSpacing: "normal",
    headerSurface: isLight
      ? "linear-gradient(180deg, rgba(248, 250, 252, 0.98) 0%, rgba(241, 245, 249, 0.98) 100%)"
      : "linear-gradient(180deg, rgba(11, 18, 32, 0.98) 0%, rgba(16, 26, 46, 0.98) 100%)",
    headerPattern: "none",
    heroPattern: "none",
    surfacePattern: "none",
    buttonPattern: "none",
    panelGlow: "none",
    buttonGlow: "none",
    ...overrides,
  };
}

export const DEFAULT_THEME_FAMILY = "default";
export const DEFAULT_THEME_MODE = "dark";

export const themes = {
  [DEFAULT_THEME_FAMILY]: {
    light: createTheme("light"),
    dark: createTheme("dark"),
  },
};

export const themeFamilyOptions = [{ value: "default", label: "Default" }];

export function resolveTheme(selection = {}) {
  const family =
    selection.family && themes[selection.family]
      ? themes[selection.family]
      : themes[DEFAULT_THEME_FAMILY];
  const mode = selection.mode === "light" ? "light" : DEFAULT_THEME_MODE;

  return family[mode];
}

export const lightTheme = themes.default.light;
export const darkTheme = themes.default.dark;
