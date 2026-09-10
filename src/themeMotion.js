export const themeTextTransition =
  "color var(--theme-transition-colors), fill var(--theme-transition-colors), stroke var(--theme-transition-colors)";

export const themeSurfaceTransition =
  "background-color var(--theme-transition-colors), color var(--theme-transition-colors), border-color var(--theme-transition-colors), box-shadow var(--theme-transition-medium), transform var(--theme-transition-fast), filter var(--theme-transition-fast)";

export const themeElevatedSurfaceTransition =
  "background-color var(--theme-transition-colors), color var(--theme-transition-colors), border-color var(--theme-transition-colors), box-shadow var(--theme-transition-slow), transform var(--theme-transition-fast), filter var(--theme-transition-fast)";

const revealTarget = { opacity: 1, y: 0 };
const revealViewport = { once: true, amount: "some" };

/** Shared entrances; CSS also exposes content when motion preferences change. */
export function revealMotion(index = 0, onMount = false) {
  const reduced = typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches;

  return {
    "data-motion": "reveal",
    initial: reduced ? false : { opacity: 0, y: mobile ? 0 : 14 },
    ...(onMount ? { animate: revealTarget } : {
      whileInView: revealTarget,
      viewport: revealViewport,
    }),
    transition: {
      duration: reduced ? 0 : mobile ? 0.25 : 0.4,
      delay: reduced || mobile ? 0 : Math.min(Math.max(index, 0), 3) * 0.06,
      ease: [0.22, 1, 0.36, 1],
    },
  };
}

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
