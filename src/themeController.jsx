import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ThemeProvider } from "styled-components";
import {
  DEFAULT_THEME_FAMILY,
  DEFAULT_THEME_MODE,
  resolveTheme,
} from "./theme";

export const THEME_STORAGE_KEY = "theme";

const ThemeControllerContext = createContext(null);

function normalizeThemeSelection(selection) {
  const mode =
    selection && (selection.mode === "light" || selection.mode === "dark")
      ? selection.mode
      : DEFAULT_THEME_MODE;

  return { family: DEFAULT_THEME_FAMILY, mode };
}

export function parseStoredThemeSelection(rawTheme) {
  if (!rawTheme) {
    return null;
  }

  if (rawTheme === "light" || rawTheme === "dark") {
    return normalizeThemeSelection({ mode: rawTheme });
  }

  try {
    const parsedTheme = JSON.parse(rawTheme);
    return normalizeThemeSelection(parsedTheme);
  } catch {
    return null;
  }
}

function getSystemMode() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return DEFAULT_THEME_MODE;
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function getInitialThemeSelection(initialThemeSelection) {
  if (initialThemeSelection) {
    return normalizeThemeSelection(initialThemeSelection);
  }

  if (typeof window === "undefined") {
    return normalizeThemeSelection();
  }

  const storedSelection = parseStoredThemeSelection(
    window.localStorage.getItem(THEME_STORAGE_KEY)
  );

  if (storedSelection) {
    return storedSelection;
  }

  return normalizeThemeSelection({ mode: getSystemMode() });
}

export function ThemeControllerProvider({ children, initialThemeSelection }) {
  const [themeSelection, setThemeSelection] = useState(() =>
    getInitialThemeSelection(initialThemeSelection)
  );

  const resolvedTheme = resolveTheme(themeSelection);
  const fadeTimer = useRef(null);

  const fadeAndApply = useCallback((updater) => {
    const root = typeof document !== "undefined" ? document.getElementById("root") : null;
    if (root) {
      clearTimeout(fadeTimer.current);
      root.classList.add("theme-fading");
      fadeTimer.current = setTimeout(() => {
        root.classList.remove("theme-fading");
      }, 220);
    }
    setThemeSelection(updater);
  }, []);

  useEffect(
    () => () => {
      clearTimeout(fadeTimer.current);
    },
    []
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(themeSelection));
  }, [themeSelection]);

  const value = useMemo(() => {
    function setThemeFamily() {
      // Theme families were removed in the typography/layout refresh.
      return;
    }

    function setMode(mode) {
      fadeAndApply(() =>
        normalizeThemeSelection({ mode: mode === "light" ? "light" : "dark" })
      );
    }

    function toggleMode() {
      fadeAndApply((currentSelection) =>
        normalizeThemeSelection({
          mode: currentSelection.mode === "light" ? "dark" : "light",
        })
      );
    }

    return {
      themeSelection,
      themeFamily: DEFAULT_THEME_FAMILY,
      themeMode: themeSelection.mode,
      resolvedTheme,
      setThemeFamily,
      setMode,
      toggleMode,
    };
  }, [fadeAndApply, resolvedTheme, themeSelection]);

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

  const storedSelection = parseStoredThemeSelection(
    window.localStorage.getItem(THEME_STORAGE_KEY)
  );

  return storedSelection ?? normalizeThemeSelection({ mode: getSystemMode() });
}
