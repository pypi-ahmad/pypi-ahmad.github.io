/**
 * Theme Definitions
 *
 * Each theme is a flat object of design tokens consumed by styled-components
 * via <ThemeProvider>.  Components access tokens as `${({ theme }) => theme.text}`.
 *
 * Token overview:
 *  body / text / dark       — page background, primary text, darkest shade
 *  secondaryText            — muted text for descriptions
 *  accentColor / accentBright — brand accent (buttons, highlights)
 *  projectCard / imageDark  — card & image container backgrounds
 *  skinColor / skinColor2   — avatar SVG skin tones
 *  imageClothes / avatarMisc / avatarShoes — avatar SVG details
 */

const lightTheme = {
  name: "light",
  body: "#FFFFFF",
  text: "#343434",
  dark: "#000000",
  secondaryText: "#7F8DAA",
  accentColor: "#E3405F",
  accentBright: "#FC1056",
  projectCard: "#DCE4F2",
  skinColor: "#F7B799",
  skinColor2: "#FCB696",
  imageDark: "#dce4f2",
  imageClothes: "#dce4f2",
  avatarMisc: "#e9ecf2",
  avatarShoes: "#ccd2e3",
};

const darkTheme = {
  name: "dark",
  body: "#1D1D1D",
  text: "#FFFFFF",
  dark: "#000000",
  secondaryText: "#8D8D8D",
  accentColor: "#E3405F",
  accentBright: "#FC1056",
  projectCard: "#292A2D",
  skinColor: "#F7B799",
  skinColor2: "#FCB696",
  imageDark: "#292A2D",
  imageClothes: "#000000",
  avatarMisc: "#212121",
  avatarShoes: "#2B2B2B",
};

export const themes = { light: lightTheme, dark: darkTheme };
