import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ThemeProvider } from "styled-components";
import {
  DEFAULT_THEME_FAMILY,
  DEFAULT_THEME_MODE,
  resolveTheme,
  themes,
} from "./theme";

export const THEME_STORAGE_KEY = "theme";

const ThemeControllerContext = createContext(null);

function normalizeThemeSelection(selection) {
  const family =
    selection && typeof selection.family === "string" && themes[selection.family]
      ? selection.family
      : DEFAULT_THEME_FAMILY;
  const mode =
    selection && (selection.mode === "light" || selection.mode === "dark")
      ? selection.mode
      : DEFAULT_THEME_MODE;

  return { family, mode };
}

export function parseStoredThemeSelection(rawTheme) {
  if (!rawTheme) {
    return normalizeThemeSelection();
  }

  if (rawTheme === "light" || rawTheme === "dark") {
    return normalizeThemeSelection({
      family: DEFAULT_THEME_FAMILY,
      mode: rawTheme,
    });
  }

  try {
    const parsedTheme = JSON.parse(rawTheme);
    return normalizeThemeSelection(parsedTheme);
  } catch {
    return normalizeThemeSelection();
  }
}

function getInitialThemeSelection(initialThemeSelection) {
  if (initialThemeSelection) {
    return normalizeThemeSelection(initialThemeSelection);
  }

  if (typeof window === "undefined") {
    return normalizeThemeSelection();
  }

  return parseStoredThemeSelection(window.localStorage.getItem(THEME_STORAGE_KEY));
}

export function ThemeControllerProvider({ children, initialThemeSelection }) {
  const [themeSelection, setThemeSelection] = useState(() =>
    getInitialThemeSelection(initialThemeSelection)
  );

  const resolvedTheme = resolveTheme(themeSelection);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(
      THEME_STORAGE_KEY,
      JSON.stringify(themeSelection)
    );
  }, [themeSelection]);

  const value = useMemo(() => {
    function setThemeFamily(family) {
      setThemeSelection((currentSelection) =>
        normalizeThemeSelection({
          family,
          mode: currentSelection.mode,
        })
      );
    }

    function setMode(mode) {
      setThemeSelection((currentSelection) =>
        normalizeThemeSelection({
          family: currentSelection.family,
          mode,
        })
      );
    }

    function toggleMode() {
      setThemeSelection((currentSelection) =>
        normalizeThemeSelection({
          family: currentSelection.family,
          mode: currentSelection.mode === "light" ? "dark" : "light",
        })
      );
    }

    return {
      themeSelection,
      themeFamily: themeSelection.family,
      themeMode: themeSelection.mode,
      resolvedTheme,
      setThemeFamily,
      setMode,
      toggleMode,
    };
  }, [resolvedTheme, themeSelection]);

  return (
    <ThemeControllerContext.Provider value={value}>
      <ThemeProvider theme={resolvedTheme}>{children}</ThemeProvider>
    </ThemeControllerContext.Provider>
  );
}

export function useThemeController() {
  const context = useContext(ThemeControllerContext);

  if (!context) {
    throw new Error("useThemeController must be used within ThemeControllerProvider");
  }

  return context;
}

export function getStoredThemeSelection() {
  if (typeof window === "undefined") {
    return normalizeThemeSelection();
  }

  return parseStoredThemeSelection(window.localStorage.getItem(THEME_STORAGE_KEY));
}