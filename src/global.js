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

export const GlobalStyles = createGlobalStyle`
  :root {
    --theme-transition-fast: 160ms cubic-bezier(0.2, 0.8, 0.2, 1);
    --theme-transition-medium: 220ms cubic-bezier(0.2, 0.8, 0.2, 1);
    --theme-transition-slow: 280ms cubic-bezier(0.2, 0.8, 0.2, 1);
    --theme-transition-colors: 300ms ease-in-out;
    --container-max-width: 72rem;
    --section-spacing: 4rem;
    --section-spacing-tight: 2rem;
    --section-gap: 2rem;
    --section-gap-tight: 1.5rem;
  }

  *,
  *::after,
  *::before {
    box-sizing: border-box;
    transition:
      background-color var(--theme-transition-colors),
      color var(--theme-transition-colors),
      border-color var(--theme-transition-colors),
      outline-color var(--theme-transition-colors),
      text-decoration-color var(--theme-transition-colors),
      fill var(--theme-transition-colors),
      stroke var(--theme-transition-colors);
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    --surface-background: ${({ theme }) => theme.body};
    --surface-card: ${({ theme }) => theme.cardBackgroundAlt ?? theme.projectCard};
    --surface-overlay: ${({ theme }) =>
      theme.name === "light" ? "rgba(15, 23, 42, 0.26)" : "rgba(2, 6, 23, 0.72)"};
    --text: ${({ theme }) => theme.text};
    --text-primary: ${({ theme }) => theme.text};
    --text-secondary: ${({ theme }) => theme.secondaryText};
    --card: ${({ theme }) => theme.cardBackgroundAlt ?? theme.projectCard};
    --border: ${({ theme }) => theme.borderSoft ?? theme.borderColor};
    --accent: ${({ theme }) => theme.accentGradient};
    --accent-solid: ${({ theme }) => theme.accentSolid};
    --accent-text: ${({ theme }) => theme.accentText};
    --accent-hover: ${({ theme }) => theme.accentSoft};
    --focus-shadow: ${({ theme }) => theme.accentSoft};
    --glow-accent: ${({ theme }) => theme.accentSoft};
    --shadow-sm: ${({ theme }) => `0 10px 24px ${theme.shadowColor}`};
    --shadow-lg: ${({ theme }) => `0 24px 56px ${theme.shadowColor}`};
    --layer-background: 0;
    --layer-card: 1;
    --layer-overlay: 40;
    --control-radius: ${({ theme }) => theme.controlRadius ?? "16px"};
    --heading-font-family: ${({ theme }) => theme.accentFontFamily};
    --heading-letter-spacing: ${({ theme }) => resolveHeadingLetterSpacing(theme)};
    --body-font-family: "Montserrat", "Google Sans Regular", -apple-system, BlinkMacSystemFont,
      "Segoe UI", sans-serif;
    --page-gutter: clamp(1rem, 4vw, 2.75rem);
    --stack-xs: 0.45rem;
    --stack-sm: 0.75rem;
    --stack-md: 1rem;
    --stack-lg: 1.5rem;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    display: block;
    min-height: 100vh;
    margin: 0;
    font-family: var(--body-font-family);
    font-size: clamp(1rem, 0.98rem + 0.18vw, 1.0625rem);
    line-height: 1.7;
    letter-spacing: 0.01em;
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
    transition: opacity 250ms ease-in-out;
  }

  #root.theme-fading {
    opacity: 0.92;
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
    line-height: 1.08;
    font-weight: 700;
    letter-spacing: var(--heading-letter-spacing);
    text-wrap: balance;
  }

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
    border: 1px solid var(--border);
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
    padding-left: 1.25rem;
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

  .hover-shadow-lg:hover,
  .hover-shadow-lg:focus-within,
  .hover-shadow-lg:focus-visible {
    box-shadow: var(--shadow-lg);
  }

  .hover-translate-y-1:hover,
  .hover-translate-y-1:focus-within,
  .hover-translate-y-1:focus-visible {
    transform: translateY(-4px);
  }

  @media (max-width: 768px) {
    .hover-translate-y-1:hover,
    .hover-translate-y-1:focus-within,
    .hover-translate-y-1:focus-visible {
      transform: none;
    }
  }

  .transition-all {
    transition: all 200ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .transition-colors {
    transition-property: background-color, color, border-color, outline-color, text-decoration-color, fill, stroke;
    transition-timing-function: ease-in-out;
  }

  .duration-200 {
    transition-duration: 200ms;
  }

  .duration-300 {
    transition-duration: 300ms;
  }

  .layer-card {
    position: relative;
    z-index: var(--layer-card);
  }

  .layer-overlay {
    z-index: var(--layer-overlay);
  }

  .main,
  .basic-projects,
  .basic-experience,
  .basic-education,
  .basic-contact,
  .basic-skills {
    width: min(var(--container-max-width), calc(100% - (var(--page-gutter) * 2)));
    margin-left: auto;
    margin-right: auto;
  }

  .main {
    padding-top: var(--section-spacing-tight);
    padding-bottom: var(--section-spacing-tight);
  }

  .basic-projects,
  .basic-experience,
  .basic-education,
  .basic-contact,
  .basic-skills {
    padding-top: var(--section-spacing);
    padding-bottom: var(--section-spacing);
  }

  .greet-main {
    max-width: min(var(--container-max-width), 100%);
    margin-top: 0;
    padding: clamp(1.5rem, 3vw, 2.5rem);
  }

  .greeting-main,
  .projects-heading-div,
  .experience-heading-div,
  .heading-div,
  .contact-heading-div,
  .blog-heading-div,
  .address-heading-div {
    align-items: center;
    gap: var(--section-gap);
  }

  .greeting-main > * {
    margin-bottom: 0;
  }

  .greeting-text,
  .projects-heading-text,
  .experience-heading-text,
  .heading-text,
  .contact-heading-text,
  .blog-heading-text,
  .skills-heading-text,
  .skills-header,
  .contact-cta-text {
    font-family: var(--heading-font-family);
    font-size: clamp(2.3rem, 4vw, 3.75rem);
    font-weight: 700;
    line-height: 1.05;
    letter-spacing: var(--heading-letter-spacing);
    margin-bottom: var(--stack-sm);
  }

  .greeting-text {
    margin-top: 0;
    font-size: clamp(2.85rem, 7vw, 4.85rem);
    line-height: 0.96;
  }

  .greeting-nickname,
  .address-heading-text,
  .skills-heading,
  .skill-section-title,
  .project-title,
  .experience-card-title,
  .card-title,
  .cert-body-title,
  .system-header h2 {
    font-family: var(--heading-font-family);
    font-weight: 700;
    letter-spacing: var(--heading-letter-spacing);
    line-height: 1.18;
  }

  .greeting-nickname {
    display: block;
    margin-bottom: var(--stack-sm);
    font-size: clamp(1.2rem, 2vw, 1.7rem);
    line-height: 1.25;
  }

  .skills-heading {
    font-size: clamp(1.7rem, 3vw, 2.7rem);
    margin: 0 0 var(--stack-sm);
    padding-bottom: 0;
  }

  .address-heading-text,
  .skill-section-title,
  .project-title,
  .experience-card-title,
  .card-title,
  .cert-body-title,
  .system-header h2 {
    font-size: clamp(1.2rem, 1.05rem + 0.85vw, 1.75rem);
    margin-top: 0;
    margin-bottom: var(--stack-xs);
  }

  .projects-heading-sub-text,
  .experience-heading-sub-text,
  .heading-sub-text,
  .greeting-text-p,
  .projects-header-detail-text,
  .experience-header-detail-text,
  .contact-header-detail-text,
  .blog-header-detail-text,
  .skills-header-detail-text,
  .contact-cta-subtext,
  .contact-social-intro,
  .skills-text,
  .skills-text-subtitle,
  .subTitle,
  .project-description,
  .system-tagline,
  .system-description,
  .light-mode .system-tagline,
  .light-mode .system-description,
  .system-impact li,
  .light-mode .system-impact li,
  .card-subtitle,
  .cert-body-subtitle,
  .skill-text-item,
  .doc-fallback-text {
    color: var(--text-secondary);
    font-family: var(--body-font-family);
    line-height: 1.7;
  }

  .greeting-text-p,
  .projects-header-detail-text,
  .experience-header-detail-text,
  .contact-header-detail-text,
  .blog-header-detail-text,
  .skills-header-detail-text,
  .contact-cta-subtext,
  .contact-social-intro {
    max-width: min(40rem, 100%);
    margin-left: auto;
    margin-right: auto;
    font-size: clamp(1rem, 0.98rem + 0.32vw, 1.18rem);
  }

  .greeting-text-p {
    margin-right: 0;
    margin-bottom: var(--stack-lg);
    font-size: clamp(1.08rem, 0.98rem + 0.7vw, 1.4rem);
  }

  .projects-heading-sub-text,
  .experience-heading-sub-text,
  .heading-sub-text {
    margin-bottom: var(--stack-sm);
    font-size: clamp(1.1rem, 1rem + 0.55vw, 1.4rem);
  }

  .contact-cta-subtext,
  .contact-social-intro,
  .skills-text,
  .skills-text-subtitle,
  .project-description,
  .system-tagline,
  .system-description,
  .system-impact li,
  .card-subtitle,
  .cert-body-subtitle,
  .skill-text-item,
  .doc-fallback-text {
    font-size: 1rem;
  }

  .skills-text-div {
    margin-top: var(--section-spacing-tight);
    padding: clamp(1.5rem, 3vw, 2.5rem);
  }

  .skills-image-div > * {
    margin-top: var(--section-spacing-tight);
  }

  .projects-heading-text-div,
  .experience-heading-text-div,
  .heading-text-div,
  .contact-heading-text-div,
  .blog-heading-text-div,
  .address-heading-text-div,
  .skills-heading-div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .button-greeting-div,
  .portfolio-repo-btn-div {
    display: flex;
    flex-wrap: wrap;
    gap: 0.85rem;
  }

  .button {
    margin-top: 0;
    margin-bottom: 0;
    min-height: 3.25rem;
    font-weight: 700;
  }

  .experience-card-description ul,
  .hero-bullets {
    margin-bottom: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    :root {
      --theme-transition-fast: 1ms linear;
      --theme-transition-medium: 1ms linear;
      --theme-transition-slow: 1ms linear;
      --theme-transition-colors: 1ms linear;
    }

    html {
      scroll-behavior: auto;
    }
  }

  @media (max-width: 768px) {
    html,
    body {
      overflow-x: hidden;
      width: 100%;
    }

    .greeting-text {
      font-size: clamp(2rem, 8vw, 2.7rem);
    }

    .greeting-text-p,
    .projects-header-detail-text,
    .experience-header-detail-text,
    .contact-header-detail-text,
    .blog-header-detail-text,
    .skills-header-detail-text {
      font-size: 1rem;
    }

    .projects-heading-text,
    .experience-heading-text,
    .heading-text,
    .contact-heading-text,
    .blog-heading-text,
    .skills-heading-text,
    .skills-header,
    .contact-cta-text {
      font-size: clamp(1.95rem, 7vw, 2.5rem);
      margin-top: var(--section-spacing-tight);
    }

    .greeting-main,
    .projects-heading-div,
    .experience-heading-div,
    .heading-div,
    .contact-heading-div,
    .blog-heading-div,
    .address-heading-div {
      gap: var(--section-gap-tight);
    }

    .greet-main {
      padding: 1.25rem;
    }
  }
`;