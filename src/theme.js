/**
 * Default portfolio theme.
 *
 * Three accent presets share light/dark base tokens. Keep mode-specific text
 * colors distinct from filled-action gradients so each role can retain contrast.
 */

export const DEFAULT_THEME_MODE = "dark";
export const DEFAULT_ACCENT = "blue";

export const lightTheme = {
  name: "light",
  body: "#F7F8FA",
  text: "#171A21",
  dark: "#000000",
  secondaryText: "#566174",
  accentColor: "#E3405F",
  accentBright: "#FC1056",
  accentStart: "#BE123C",
  accentEnd: "#C026D3",
  accentSolid: "#9F1239",
  accentGradient: "linear-gradient(135deg, #BE123C 0%, #C026D3 100%)",
  accentText: "#FFFFFF",
  projectCard: "#ECEFF4",
  skinColor: "#F7B799",
  skinColor2: "#FCB696",
  imageDark: "#dce4f2",
  imageClothes: "#dce4f2",
  avatarMisc: "#e9ecf2",
  avatarShoes: "#ccd2e3",
  borderColor: "#c9d7ea",
  buttonColor: "#ECEFF4",
  hoverColor: "#f6f8fc",
  headerColor: "#FFFFFF",
  selectorBackground: "#ffffff",
  selectorText: "#171A21",
  bodyAlt: "#FFFFFF",
  accentSoft: "rgba(236, 58, 114, 0.14)",
  cardBackgroundAlt: "#ECEFF4",
  borderSoft: "rgba(201, 215, 234, 0.55)",
  separatorColor: "rgba(201, 215, 234, 0.55)",
  buttonText: "#0F172A",
  shadowColor: "rgba(23, 26, 33, 0.04)",
  heroGradient:
    "linear-gradient(135deg, #FFFFFF 0%, #FFFFFF 58%, rgba(236, 58, 114, 0.12) 100%)",
  glowColor: "rgba(236, 58, 114, 0.24)",
  surfaceRadius: "18px",
  heroRadius: "24px",
  controlRadius: "12px",
  pillRadius: "999px",
  panelBorderWidth: "1px",
  panelBorderStyle: "solid",
  accentFontFamily: '"Google Sans", sans-serif',
  accentLetterSpacing: "normal",
  headerSurface: "#FFFFFF",
  headerPattern: "none",
  heroPattern: "none",
  surfacePattern: "none",
  buttonPattern: "none",
  panelGlow: "none",
  buttonGlow: "none",
};

export const darkTheme = {
  name: "dark",
  body: "#111318",
  text: "#F7F8FA",
  dark: "#000000",
  secondaryText: "#A8B0BF",
  accentColor: "#E3405F",
  accentBright: "#FC1056",
  accentStart: "#BE123C",
  accentEnd: "#C026D3",
  accentSolid: "#FDA4AF",
  accentGradient: "linear-gradient(135deg, #BE123C 0%, #C026D3 100%)",
  accentText: "#FFFFFF",
  projectCard: "#1D2129",
  skinColor: "#F7B799",
  skinColor2: "#FCB696",
  imageDark: "#1D2129",
  imageClothes: "#000000",
  avatarMisc: "#212121",
  avatarShoes: "#2B2B2B",
  borderColor: "#3b3d45",
  buttonColor: "#1D2129",
  hoverColor: "#262830",
  headerColor: "#111318",
  selectorBackground: "#1D2129",
  selectorText: "#FFFFFF",
  bodyAlt: "#171A21",
  accentSoft: "rgba(236, 58, 114, 0.22)",
  cardBackgroundAlt: "#1D2129",
  borderSoft: "rgba(59, 61, 69, 0.78)",
  separatorColor: "rgba(59, 61, 69, 0.78)",
  buttonText: "#F8FAFC",
  shadowColor: "rgba(0, 0, 0, 0.12)",
  heroGradient:
    "linear-gradient(135deg, #111318 0%, #171A21 58%, rgba(236, 58, 114, 0.18) 100%)",
  glowColor: "rgba(236, 58, 114, 0.34)",
  surfaceRadius: "18px",
  heroRadius: "24px",
  controlRadius: "12px",
  pillRadius: "999px",
  panelBorderWidth: "1px",
  panelBorderStyle: "solid",
  accentFontFamily: '"Google Sans", sans-serif',
  accentLetterSpacing: "normal",
  headerSurface: "#171A21",
  headerPattern: "none",
  heroPattern: "none",
  surfacePattern: "none",
  buttonPattern: "none",
  panelGlow: "none",
  buttonGlow: "none",
};

const blueAccent = {
  accentColor: "#4F46E5",
  accentBright: "#818CF8",
  accentStart: "#4F46E5",
  accentEnd: "#1E3A8A",
  accentGradient: "linear-gradient(135deg, #4F46E5 0%, #1E3A8A 100%)",
};

const blueLightTheme = {
  ...lightTheme,
  ...blueAccent,
  accentSolid: "#4338CA",
  accentSoft: "rgba(79, 70, 229, 0.14)",
  heroGradient:
    "linear-gradient(135deg, #FFFFFF 0%, #FFFFFF 58%, rgba(79, 70, 229, 0.12) 100%)",
  glowColor: "rgba(79, 70, 229, 0.24)",
};

const blueDarkTheme = {
  ...darkTheme,
  ...blueAccent,
  accentSolid: "#A5B4FC",
  accentSoft: "rgba(79, 70, 229, 0.22)",
  heroGradient:
    "linear-gradient(135deg, #111318 0%, #171A21 58%, rgba(79, 70, 229, 0.18) 100%)",
  glowColor: "rgba(79, 70, 229, 0.34)",
};

const pinkIndigoAccent = {
  accentColor: "#BE185D",
  accentBright: "#F472B6",
  accentStart: "#BE185D",
  accentEnd: "#312E81",
  accentGradient: "linear-gradient(135deg, #BE185D 0%, #312E81 100%)",
};

const pinkIndigoLightTheme = {
  ...lightTheme,
  ...pinkIndigoAccent,
  accentSolid: "#9D174D",
  accentSoft: "rgba(190, 24, 93, 0.14)",
  heroGradient:
    "linear-gradient(135deg, #FFFFFF 0%, #FFFFFF 52%, rgba(190, 24, 93, 0.10) 76%, rgba(49, 46, 129, 0.14) 100%)",
  glowColor: "rgba(49, 46, 129, 0.24)",
};

const pinkIndigoDarkTheme = {
  ...darkTheme,
  ...pinkIndigoAccent,
  accentSolid: "#F9A8D4",
  accentSoft: "rgba(244, 114, 182, 0.20)",
  heroGradient:
    "linear-gradient(135deg, #111318 0%, #171A21 52%, rgba(190, 24, 93, 0.16) 76%, rgba(49, 46, 129, 0.26) 100%)",
  glowColor: "rgba(129, 140, 248, 0.30)",
};

export function resolveTheme(mode = DEFAULT_THEME_MODE, accent = DEFAULT_ACCENT) {
  // Return shared preset objects; consumers must not mutate the selected theme.
  const resolvedAccent =
    accent === "pink" || accent === "blue" || accent === "pink-indigo"
      ? accent
      : DEFAULT_ACCENT;

  if (resolvedAccent === "blue") {
    return mode === "light" ? blueLightTheme : blueDarkTheme;
  }

  if (resolvedAccent === "pink-indigo") {
    return mode === "light" ? pinkIndigoLightTheme : pinkIndigoDarkTheme;
  }

  return mode === "light" ? lightTheme : darkTheme;
}
