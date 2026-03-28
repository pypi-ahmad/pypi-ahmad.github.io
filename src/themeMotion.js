export const themeTextTransition =
  "color var(--theme-transition-fast), fill var(--theme-transition-fast), stroke var(--theme-transition-fast)";

export const themeSurfaceTransition =
  "background-color var(--theme-transition-medium), color var(--theme-transition-fast), border-color var(--theme-transition-fast), box-shadow var(--theme-transition-medium)";

export const themeElevatedSurfaceTransition =
  "background-color var(--theme-transition-medium), color var(--theme-transition-fast), border-color var(--theme-transition-fast), box-shadow var(--theme-transition-slow)";

export function buildThemeBackground(surface, pattern = "none") {
  if (!pattern || pattern === "none") {
    return surface;
  }

  return `${pattern}, ${surface}`;
}

export function buildThemeShadow(baseShadow, glow = "none") {
  if (!glow || glow === "none") {
    return baseShadow;
  }

  return `${baseShadow}, ${glow}`;
}