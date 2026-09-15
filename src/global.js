/**
 * Global Styles (styled-components)
 *
 * Injected once at the app root via <GlobalStyles /> in App.jsx.
 * Establishes theme-aware typography, spacing rhythm, and layout gutters
 * so page-level CSS can stay focused on structure instead of text fixes.
 */
import { createGlobalStyle } from "styled-components";

function resolveHeadingLetterSpacing(theme) {
  return theme.accentLetterSpacing === "normal"
    ? "-0.03em"
    : theme.accentLetterSpacing;
}

// CSS variables bridge styled-components themes into the plain CSS used by page and card components.
export const GlobalStyles = createGlobalStyle`
  :root {
    --scrollbar-track: ${({ theme }) => theme.scrollbarTrack};
    --scrollbar-thumb: ${({ theme }) => theme.scrollbarThumb};
    --scrollbar-thumb-hover: ${({ theme }) => theme.scrollbarThumbHover};
    --theme-transition-fast: 160ms cubic-bezier(0.2, 0.8, 0.2, 1);
    --theme-transition-press: 100ms cubic-bezier(0.23, 1, 0.32, 1);
    --theme-transition-medium: 220ms cubic-bezier(0.2, 0.8, 0.2, 1);
    --theme-transition-slow: 280ms cubic-bezier(0.2, 0.8, 0.2, 1);
    --theme-transition-colors: 300ms ease-in-out;
    --container-max-width: 72rem;
    --section-spacing: clamp(2.5rem, 5vw, 4rem);
    --section-gap-tight: 1.5rem;
    --page-entry-gap: clamp(1rem, 2vw, 1.5rem);
    --page-title-size: clamp(2rem, 5vw, 3.5rem);
    --heading-leading: 1.4;
    --reading-measure: 65ch;
    --header-height: 6rem;
    --header-top: calc(0.75rem + env(safe-area-inset-top, 0px));
    --header-offset: calc(var(--header-height) + var(--header-top) + 0.75rem);
    --section-title-size: clamp(1.5rem, 3vw, 2.25rem);
    --hero-padding: clamp(1.5rem, 4vw, 3.5rem);
    --card-padding: clamp(1.25rem, 2vw, 1.75rem);
  }

  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  a[href],
  button,
  [role="button"],
  [tabindex]:not([tabindex="-1"]),
  input,
  select,
  textarea {
    transition:
      background-color var(--theme-transition-colors),
      color var(--theme-transition-colors),
      border-color var(--theme-transition-colors),
      outline-color var(--theme-transition-colors),
      text-decoration-color var(--theme-transition-colors),
      fill var(--theme-transition-colors),
      stroke var(--theme-transition-colors),
      box-shadow var(--theme-transition-fast),
      transform var(--theme-transition-fast);
  }

  html {
    font-size: 100%;
    scroll-padding-block-start: var(--header-offset);
    scroll-behavior: smooth;
  }

  body {
    --surface-background: ${({ theme }) => theme.body};
    --surface-feature: ${({ theme }) => theme.heroGradient};
    --surface-evidence: ${({ theme }) => theme.evidenceSurface};
    --text-evidence: ${({ theme }) => theme.evidenceText};
    --border-evidence: ${({ theme }) => theme.evidenceBorder};
    --header-surface: ${({ theme }) => theme.headerSurface};
    --surface-card: ${({ theme }) => theme.cardBackgroundAlt ?? theme.projectCard};
    --text: ${({ theme }) => theme.text};
    --text-primary: ${({ theme }) => theme.text};
    --text-secondary: ${({ theme }) => theme.secondaryText};
    --card: ${({ theme }) => theme.cardBackgroundAlt ?? theme.projectCard};
    --border: ${({ theme }) => theme.borderSoft ?? theme.borderColor};
    --control-border: ${({ theme }) => theme.name === "light" ? "#76767C" : "#77777D"};
    --separator: ${({ theme }) => theme.separatorColor};
    --shadow-color: ${({ theme }) => theme.shadowColor};
    --accent: ${({ theme }) => theme.accentGradient};
    --accent-solid: ${({ theme }) => theme.accentSolid};
    --accent-text: ${({ theme }) => theme.accentText};
    --accent-hover: ${({ theme }) => theme.accentSoft};
    --selection-background: ${({ theme }) => theme.accentSoft};
    --focus-shadow: ${({ theme }) => theme.accentSoft};
    --shadow-sm: ${({ theme }) => `0 2px 8px ${theme.shadowColor}`};
    --shadow-lg: ${({ theme }) => `0 12px 32px ${theme.shadowColor}`};
    --shadow-border: ${({ theme }) => theme.name === "light"
      ? "0 0 0 1px oklch(0 0 0 / 0.06), 0 1px 2px -1px oklch(0 0 0 / 0.06), 0 2px 4px 0 oklch(0 0 0 / 0.04)"
      : "0 0 0 1px oklch(1 0 0 / 0.08)"};
    --shadow-border-hover: ${({ theme }) => theme.name === "light"
      ? "0 0 0 1px oklch(0 0 0 / 0.08), 0 1px 2px -1px oklch(0 0 0 / 0.08), 0 2px 4px 0 oklch(0 0 0 / 0.06)"
      : "0 0 0 1px oklch(1 0 0 / 0.13)"};
    --layer-background: 0;
    --layer-card: 1;
    --layer-overlay: 40;
    --surface-radius: ${({ theme }) => theme.surfaceRadius};
    --hero-radius: ${({ theme }) => theme.heroRadius};
    --image-outline: ${({ theme }) => (theme.name === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)")};
    --control-radius: ${({ theme }) => theme.controlRadius ?? "16px"};
    --heading-font-family: ${({ theme }) => theme.accentFontFamily};
    --heading-letter-spacing: ${({ theme }) => resolveHeadingLetterSpacing(theme)};
    --body-font-family: system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", sans-serif;
    --page-gutter: clamp(1rem, 4vw, 2.75rem);
    --stack-sm: 0.75rem;
    --stack-md: 1rem;
    --stack-lg: 1.5rem;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    display: block;
    min-height: 100vh;
    margin: 0;
    font-family: var(--body-font-family);
    font-optical-sizing: auto;
    font-size: clamp(1rem, 0.98rem + 0.18vw, 1.0625rem);
    line-height: 1.6;
    letter-spacing: 0;
    text-rendering: optimizeLegibility;
    transition:
      background-color var(--theme-transition-colors),
      color var(--theme-transition-colors);
  }

  #root {
    min-height: 100vh;
    position: relative;
    z-index: var(--layer-background);
    isolation: isolate;
    opacity: 1;
  }


  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0 0 var(--stack-sm);
    color: var(--text-primary);
    font-family: var(--heading-font-family);
    line-height: var(--heading-leading);
    font-weight: 700;
    letter-spacing: -0.01em;
    text-wrap: balance;
    overflow-wrap: anywhere;
  }

  h1 { letter-spacing: -0.03em; }
  h2 { letter-spacing: -0.02em; }

  p {
    margin: 0 0 var(--stack-md);
    color: var(--text-secondary);
    line-height: inherit;
    text-wrap: pretty;
  }

  input:not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="file"]):not([type="image"]):not([type="submit"]):not([type="button"]):not([type="color"]),
  select,
  textarea {
    margin: 0;
    color: var(--text);
    background-color: var(--card);
    border: 1px solid var(--control-border);
    border-radius: var(--control-radius);
    font: inherit;
    line-height: 1.5;
    caret-color: var(--accent-solid);
    transition:
      background-color var(--theme-transition-colors),
      color var(--theme-transition-colors),
      border-color var(--theme-transition-colors),
      box-shadow var(--theme-transition-fast),
      outline-color var(--theme-transition-colors);
  }

  input:not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="file"]):not([type="image"]):not([type="submit"]):not([type="button"]):not([type="color"])::placeholder,
  textarea::placeholder {
    color: var(--text-secondary);
    opacity: 1;
  }

  select option {
    color: var(--text);
    background-color: var(--card);
  }

  input:not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="file"]):not([type="image"]):not([type="submit"]):not([type="button"]):not([type="color"]):focus-visible,
  select:focus-visible,
  textarea:focus-visible {
    outline: 2px solid var(--accent-solid);
    outline-offset: 2px;
    border-color: var(--accent-solid);
    box-shadow: 0 0 0 4px var(--focus-shadow);
  }

  a[href]:focus-visible,
  button:focus-visible,
  [role="button"]:focus-visible {
    outline: 2px solid var(--accent-solid);
    outline-offset: 3px;
    box-shadow: 0 0 0 4px var(--focus-shadow);
  }

  ul,
  ol {
    margin: 0 0 var(--stack-lg);
    padding-inline-start: 1.25rem;
  }

  li {
    line-height: 1.65;
  }

  p:last-child,
  ul:last-child,
  ol:last-child {
    margin-bottom: 0;
  }

  strong {
    color: var(--text-primary);
  }

  .shadow-sm {
    box-shadow: var(--shadow-sm);
  }

  /* Elevated presentation surfaces keep their border footprint, not a second depth ring. */
  :is(.greet-main, .projects-hero, .experience-hero, .education-hero,
      .skills-hero, .contact-hero, .fde-hero, .gh-hero, .project-card, .contact-links-anchor) {
    border: 1px solid transparent !important;
    box-shadow: var(--shadow-border) !important;
  }
  :is(.project-card, .contact-links-anchor) {
    transition: box-shadow 150ms ease-out, background-color 150ms ease-out,
      color 150ms ease-out, transform var(--theme-transition-press), opacity var(--theme-transition-press);
  }
  @media (hover: hover) and (pointer: fine) {
    :is(.project-card, .contact-links-anchor):hover {
      box-shadow: var(--shadow-border-hover) !important;
      border-color: var(--accent-solid) !important;
    }
  }
  :is(.project-card, .contact-links-anchor):focus-visible {
    box-shadow: var(--shadow-border-hover), 0 0 0 4px var(--focus-shadow) !important;
  }
  @media (forced-colors: active), print {
    :is(.greet-main, .projects-hero, .experience-hero, .education-hero,
        .skills-hero, .contact-hero, .fde-hero, .gh-hero, .project-card, .contact-links-anchor) {
      border-color: currentColor !important;
      box-shadow: none !important;
    }
  }

  .hover-shadow-lg:hover,
  .hover-shadow-lg:focus-within,
  .hover-shadow-lg:focus-visible {
    box-shadow: var(--shadow-lg);
  }

  .layer-card {
    position: relative;
    z-index: var(--layer-card);
  }

  .basic-contact {
    width: min(var(--container-max-width), calc(100% - (var(--page-gutter) * 2)));
    margin-inline: auto;
  }

  .button {
    margin-top: 0;
    margin-bottom: 0;
    min-height: 3.25rem;
    font-weight: 700;
  }

  /* Reveal targets keep their semantic elements and ordinary focus behavior. */
  [data-motion]:focus-within {
    opacity: 1 !important;
    transform: none !important;
  }

  .motion-fade {
    animation: motion-fade-in 250ms ease-out both;
  }

  @keyframes motion-fade-in {
    from { opacity: 0.5; }
    to { opacity: 1; }
  }

  :is(.button, .project-card, .contact-links-anchor, .contact-action,
      .projects-github-link, .education-projects-link, .not-found-link,
      .skills-cta-actions a, .motion-action) {
    transition: transform var(--theme-transition-fast),
      border-color var(--theme-transition-colors),
      background-color var(--theme-transition-colors),
      color var(--theme-transition-colors);
  }

  @media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
    :is(.button, .project-card, .contact-links-anchor, .contact-action,
        .projects-github-link, .education-projects-link, .not-found-link,
        .skills-cta-actions a, .motion-action):hover {
      transform: translateY(-2px);
    }
  }

  :is(.button, .project-card, .contact-links-anchor, .contact-action,
      .projects-github-link, .education-projects-link, .not-found-link,
      .skills-cta-actions a, .motion-action):focus-visible {
    transform: none !important;
    transition: none !important;
  }

  @media (hover: none), (pointer: coarse) {
    :is(.button, .contact-action,
        .projects-github-link, .education-projects-link, .not-found-link,
        .skills-cta-actions a, .motion-action):hover {
      transform: none !important;
    }
  }

  @media (max-width: 768px) {
    :root {
      --section-spacing: 2.5rem;
    }

    [data-motion] {
      transform: none !important;
    }
  }

  @media (prefers-reduced-motion: reduce), print {
    :root {
      --theme-transition-fast: 1ms linear;
      --theme-transition-medium: 1ms linear;
      --theme-transition-slow: 1ms linear;
      --theme-transition-colors: 1ms linear;
    }

    html {
      scroll-behavior: auto;
    }

    [data-motion] {
      opacity: 1 !important;
      transform: none !important;
      animation: none !important;
      transition: none !important;
    }

    #root {
      opacity: 1;
      transition: none;
    }

    :is(.button, .contact-action,
        .projects-github-link, .education-projects-link, .not-found-link,
        .skills-cta-actions a, .motion-action):hover {
      transform: none !important;
      transition: none !important;
    }
  }

  @media (max-width: 768px) {
    html,
    body {
      width: 100%;
    }
  }

  .route-loading-status {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  p, li, main a, main span, main strong { overflow-wrap: anywhere; }
  main :is(a, button) { max-inline-size: 100%; }
  img { outline: 1px solid var(--image-outline); outline-offset: -1px; }
  a { text-underline-position: from-font; text-decoration-thickness: from-font; }

  :is(button, .button, .contact-action, .projects-github-link,
      .education-projects-link, .not-found-link, .skills-cta-actions a, .motion-action):active:where(:not(:disabled):not([aria-disabled="true"])) {
    opacity: 0.88;
  }
  :is(.hero-actions .button:not(.button-secondary), .motion-action,
      .projects-github-link, .education-projects-link,
      .skills-cta-actions a:first-child, .contact-action--primary,
      .not-found-link):active {
    opacity: 1;
  }
  @media (prefers-reduced-motion: no-preference) {
    :is(button, .button, .contact-action, .projects-github-link,
        .education-projects-link, .not-found-link, .skills-cta-actions a, .motion-action):active:not(:focus-visible):not([data-static]):not(:disabled):not([aria-disabled="true"]) {
      transform: scale(0.98);
      transition: transform 100ms cubic-bezier(0.2, 0.8, 0.2, 1), opacity 100ms ease;
    }
  }
  /* Native link press feedback. Keep geometry on the link, not its reveal parent. */
  a:is(.project-card, .contact-links-anchor, .degree-card__link, .cert-card__actions a) {
    transition: box-shadow 150ms ease-out, transform var(--theme-transition-press),
      opacity var(--theme-transition-press),
      border-color var(--theme-transition-colors),
      background-color var(--theme-transition-colors),
      color var(--theme-transition-colors);
  }
  a:is(.degree-card__link, .cert-card__actions a):active:not(:focus-visible) {
    opacity: 0.90;
  }
  @media (prefers-reduced-motion: no-preference) {
    a:is(.project-card, .contact-links-anchor, .degree-card__link, .cert-card__actions a):active:not(:focus-visible) {
      transform: scale(0.98);
    }
  }
  @media (hover: none), (pointer: coarse) {
    a:is(.project-card, .contact-links-anchor):hover:not(:active) {
      transform: none;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    a:is(.project-card, .contact-links-anchor, .degree-card__link, .cert-card__actions a) {
      transform: none !important;
      transition: opacity var(--theme-transition-press);
    }
  }
  a:is(.project-card, .contact-links-anchor, .degree-card__link, .cert-card__actions a):focus-visible {
    transform: none !important;
    opacity: 1;
    transition: none !important;
  }
  @media (forced-colors: active), print {
    a:is(.project-card, .contact-links-anchor, .degree-card__link, .cert-card__actions a) {
      transform: none !important;
      opacity: 1 !important;
      transition: none !important;
    }
  }
  @media (forced-colors: active) {
    a[href]:focus-visible, button:focus-visible {
      outline: 2px solid Highlight;
      box-shadow: none;
    }
  }
`;
