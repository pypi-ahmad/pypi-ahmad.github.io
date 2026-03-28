/**
 * Global Styles (styled-components)
 *
 * Injected once at the app root via <GlobalStyles /> in App.jsx.
 * Sets body background/color from the active theme and applies
 * universal box-sizing and mobile overflow fixes.
 */
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --theme-transition-fast: 160ms cubic-bezier(0.2, 0.8, 0.2, 1);
    --theme-transition-medium: 220ms cubic-bezier(0.2, 0.8, 0.2, 1);
    --theme-transition-slow: 280ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    display: block;
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    transition:
      background-color var(--theme-transition-medium),
      color var(--theme-transition-fast);
  }

  @media (prefers-reduced-motion: reduce) {
    :root {
      --theme-transition-fast: 1ms linear;
      --theme-transition-medium: 1ms linear;
      --theme-transition-slow: 1ms linear;
    }

    html {
      scroll-behavior: auto;
    }
  }

  /* Mobile-only global fixes */
  @media (max-width: 768px) {
    html, body {
      overflow-x: hidden;
      width: 100%;
    }
    
    body {
      display: block;
    }

    h1 {
      font-size: 1.75rem;
    }

    h2 {
      font-size: 1.5rem;
    }
  }`;