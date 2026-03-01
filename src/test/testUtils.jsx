/**
 * Test Utilities
 *
 * Shared render wrappers that provide the same context the real app does:
 * BrowserRouter, ThemeProvider, and MotionConfig. Every test that renders
 * a component through the app's provider tree should use `renderWithProviders`.
 */
import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { MotionConfig } from "framer-motion";
import { themes } from "../theme";

/**
 * Renders a component wrapped in ThemeProvider + BrowserRouter + MotionConfig.
 * Mirrors the provider tree from App.jsx → Main.jsx.
 *
 * @param {React.ReactElement} ui - The component to render
 * @param {object} options
 * @param {string} options.theme - "light" or "dark" (default: "dark")
 * @param {string[]} options.initialEntries - MemoryRouter initial entries
 * @param {object} options.renderOptions - Extra RTL render options
 */
export function renderWithProviders(
  ui,
  { theme = "dark", initialEntries, ...renderOptions } = {}
) {
  const themeObj = themes[theme];
  const RouterComponent = initialEntries ? MemoryRouter : BrowserRouter;
  const routerProps = initialEntries ? { initialEntries } : {};

  function Wrapper({ children }) {
    return (
      <ThemeProvider theme={themeObj}>
        <MotionConfig reducedMotion="always">
          <RouterComponent {...routerProps}>{children}</RouterComponent>
        </MotionConfig>
      </ThemeProvider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

/** Dark theme object for direct prop passing in unit tests */
export const darkTheme = themes.dark;

/** Light theme object for direct prop passing in unit tests */
export const lightTheme = themes.light;
