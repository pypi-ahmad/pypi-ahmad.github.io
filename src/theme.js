/**
 * Default portfolio theme.
 *
 * The site exposes one visual identity with light and dark modes. Components
 * consume the same semantic token contract in either mode.
 */

export const DEFAULT_THEME_MODE = "dark";
export const DEFAULT_ACCENT = "blue";

export const lightTheme = {
  name: "light",
  body: "#FFFFFF",
  text: "#343434",
  dark: "#000000",
  secondaryText: "#6A7489",
  accentColor: "#E3405F",
  accentBright: "#FC1056",
  accentStart: "#DC143C",
  accentEnd: "#FF69B4",
  accentSolid: "#EC3A72",
  accentGradient: "linear-gradient(135deg, #DC143C 0%, #FF69B4 100%)",
  accentText: "#F8FAFC",
  projectCard: "#DCE4F2",
  skinColor: "#F7B799",
  skinColor2: "#FCB696",
  imageDark: "#dce4f2",
  imageClothes: "#dce4f2",
  avatarMisc: "#e9ecf2",
  avatarShoes: "#ccd2e3",
  borderColor: "#c9d7ea",
  buttonColor: "#7CD1F7",
  hoverColor: "#f6f8fc",
  headerColor: "#FFFFFF",
  selectorBackground: "#ffffff",
  selectorText: "#343434",
  bodyAlt: "#F0F4FA",
  accentSoft: "rgba(236, 58, 114, 0.14)",
  cardBackgroundAlt: "#DCE4F2",
  borderSoft: "rgba(201, 215, 234, 0.55)",
  buttonText: "#0F172A",
  shadowColor: "rgba(52, 52, 52, 0.1)",
  heroGradient:
    "linear-gradient(135deg, #FFFFFF 0%, #F0F4FA 58%, rgba(236, 58, 114, 0.12) 100%)",
  glowColor: "rgba(236, 58, 114, 0.24)",
  surfaceRadius: "24px",
  heroRadius: "30px",
  controlRadius: "16px",
  pillRadius: "999px",
  panelBorderWidth: "1px",
  panelBorderStyle: "solid",
  accentFontFamily: '"Google Sans Medium", sans-serif',
  accentLetterSpacing: "normal",
  headerSurface: "transparent",
  headerPattern: "none",
  heroPattern: "none",
  surfacePattern: "none",
  buttonPattern: "none",
  panelGlow: "none",
  buttonGlow: "none",
};

export const darkTheme = {
  name: "dark",
  body: "#1D1D1D",
  text: "#FFFFFF",
  dark: "#000000",
  secondaryText: "#8D8D8D",
  accentColor: "#E3405F",
  accentBright: "#FC1056",
  accentStart: "#DC143C",
  accentEnd: "#FF69B4",
  accentSolid: "#EC3A72",
  accentGradient: "linear-gradient(135deg, #DC143C 0%, #FF69B4 100%)",
  accentText: "#F8FAFC",
  projectCard: "#292A2D",
  skinColor: "#F7B799",
  skinColor2: "#FCB696",
  imageDark: "#292A2D",
  imageClothes: "#000000",
  avatarMisc: "#212121",
  avatarShoes: "#2B2B2B",
  borderColor: "#3b3d45",
  buttonColor: "#292C3F",
  hoverColor: "#262830",
  headerColor: "#1D1D1D",
  selectorBackground: "#292A2D",
  selectorText: "#FFFFFF",
  bodyAlt: "#242526",
  accentSoft: "rgba(236, 58, 114, 0.22)",
  cardBackgroundAlt: "#292A2D",
  borderSoft: "rgba(59, 61, 69, 0.78)",
  buttonText: "#F8FAFC",
  shadowColor: "rgba(0, 0, 0, 0.34)",
  heroGradient:
    "linear-gradient(135deg, #1D1D1D 0%, #242526 58%, rgba(236, 58, 114, 0.18) 100%)",
  glowColor: "rgba(236, 58, 114, 0.34)",
  surfaceRadius: "24px",
  heroRadius: "30px",
  controlRadius: "16px",
  pillRadius: "999px",
  panelBorderWidth: "1px",
  panelBorderStyle: "solid",
  accentFontFamily: '"Google Sans Medium", sans-serif',
  accentLetterSpacing: "normal",
  headerSurface: "transparent",
  headerPattern: "none",
  heroPattern: "none",
  surfacePattern: "none",
  buttonPattern: "none",
  panelGlow: "none",
  buttonGlow: "none",
};

const blueAccent = {
  accentColor: "#6366F1",
  accentBright: "#818CF8",
  accentStart: "#6366F1",
  accentEnd: "#1E3A8A",
  accentGradient: "linear-gradient(135deg, #6366F1 0%, #1E3A8A 100%)",
};

const blueLightTheme = {
  ...lightTheme,
  ...blueAccent,
  accentSolid: "#4338CA",
  accentSoft: "rgba(99, 102, 241, 0.14)",
  heroGradient:
    "linear-gradient(135deg, #FFFFFF 0%, #F0F4FA 58%, rgba(99, 102, 241, 0.12) 100%)",
  glowColor: "rgba(99, 102, 241, 0.24)",
};

const blueDarkTheme = {
  ...darkTheme,
  ...blueAccent,
  accentSolid: "#818CF8",
  accentSoft: "rgba(99, 102, 241, 0.22)",
  heroGradient:
    "linear-gradient(135deg, #1D1D1D 0%, #242526 58%, rgba(99, 102, 241, 0.18) 100%)",
  glowColor: "rgba(99, 102, 241, 0.34)",
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
    "linear-gradient(135deg, #FFFFFF 0%, #F0F4FA 52%, rgba(190, 24, 93, 0.10) 76%, rgba(49, 46, 129, 0.14) 100%)",
  glowColor: "rgba(49, 46, 129, 0.24)",
};

const pinkIndigoDarkTheme = {
  ...darkTheme,
  ...pinkIndigoAccent,
  accentSolid: "#F472B6",
  accentSoft: "rgba(244, 114, 182, 0.20)",
  heroGradient:
    "linear-gradient(135deg, #1D1D1D 0%, #242526 52%, rgba(190, 24, 93, 0.16) 76%, rgba(49, 46, 129, 0.26) 100%)",
  glowColor: "rgba(129, 140, 248, 0.30)",
};

export function resolveTheme(mode = DEFAULT_THEME_MODE, accent = DEFAULT_ACCENT) {
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
