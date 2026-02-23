/**
 * Global Styles (styled-components)
 *
 * Injected once at the app root via <GlobalStyles /> in App.jsx.
 * Sets body background/color from the active theme and applies
 * universal box-sizing and mobile overflow fixes.
 */
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
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
    transition: all 0.25s linear;
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