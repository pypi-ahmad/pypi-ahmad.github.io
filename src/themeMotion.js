export const themeTextTransition =
  "color var(--theme-transition-colors), fill var(--theme-transition-colors), stroke var(--theme-transition-colors)";

export const themeSurfaceTransition =
  "background-color var(--theme-transition-colors), color var(--theme-transition-colors), border-color var(--theme-transition-colors), box-shadow var(--theme-transition-medium), transform var(--theme-transition-fast), filter var(--theme-transition-fast)";

export const themeElevatedSurfaceTransition =
  "background-color var(--theme-transition-colors), color var(--theme-transition-colors), border-color var(--theme-transition-colors), box-shadow var(--theme-transition-slow), transform var(--theme-transition-fast), filter var(--theme-transition-fast)";

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