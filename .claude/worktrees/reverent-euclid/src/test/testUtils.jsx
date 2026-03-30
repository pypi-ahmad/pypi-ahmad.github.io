/**
 * Test Utilities
 *
 * Shared render wrappers that provide the same context the real app does:
 * BrowserRouter, ThemeControllerProvider, and MotionConfig. Every test that renders
 * a component through the app's provider tree should use `renderWithProviders`.
 */
import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { darkTheme, lightTheme } from "../theme";
import { ThemeControllerProvider } from "../themeController";

/**
 * Renders a component wrapped in ThemeControllerProvider + BrowserRouter + MotionConfig.
 * Mirrors the provider tree from App.jsx → Main.jsx.
 *
 * @param {React.ReactElement} ui - The component to render
 * @param {object} options
 * @param {string} options.theme - "light" or "dark" (default: "dark")
 * @param {string} options.themeFamily - active theme family (default: "default")
 * @param {boolean} options.useStoredTheme - when true, use localStorage instead of an explicit initial theme
 * @param {string[]} options.initialEntries - MemoryRouter initial entries
 * @param {object} options.renderOptions - Extra RTL render options
 */
export function renderWithProviders(
  ui,
  {
    theme = "dark",
    themeFamily = "default",
    useStoredTheme = false,
    initialEntries,
    ...renderOptions
  } = {}
) {
  const RouterComponent = initialEntries ? MemoryRouter : BrowserRouter;
  const routerProps = initialEntries ? { initialEntries } : {};

  function Wrapper({ children }) {
    return (
      <ThemeControllerProvider
        initialThemeSelection={
          useStoredTheme
            ? undefined
            : { family: themeFamily, mode: theme }
        }
      >
        <MotionConfig reducedMotion="always">
          <RouterComponent {...routerProps}>{children}</RouterComponent>
        </MotionConfig>
      </ThemeControllerProvider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

/** Dark theme object for direct prop passing in unit tests */
export { darkTheme };

/** Light theme object for direct prop passing in unit tests */
export { lightTheme };
