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
import { DEFAULT_THEME_MODE, resolveTheme } from "./theme";

export const THEME_STORAGE_KEY = "theme";

const ThemeControllerContext = createContext(null);

function normalizeThemeMode(mode) {
  return mode === "light" || mode === "dark" ? mode : DEFAULT_THEME_MODE;
}

export function parseStoredThemeMode(rawTheme) {
  if (rawTheme === "light" || rawTheme === "dark") {
    return rawTheme;
  }

  try {
    const parsedTheme = JSON.parse(rawTheme);

    if (typeof parsedTheme === "string") {
      return normalizeThemeMode(parsedTheme);
    }

    return normalizeThemeMode(parsedTheme?.mode);
  } catch {
    return DEFAULT_THEME_MODE;
  }
}

function getInitialThemeMode(initialThemeMode) {
  if (initialThemeMode) {
    return normalizeThemeMode(initialThemeMode);
  }

  if (typeof window === "undefined") {
    return DEFAULT_THEME_MODE;
  }

  return parseStoredThemeMode(window.localStorage.getItem(THEME_STORAGE_KEY));
}

export function ThemeControllerProvider({ children, initialThemeMode }) {
  const [themeMode, setThemeMode] = useState(() =>
    getInitialThemeMode(initialThemeMode)
  );
  const fadeTimer = useRef(null);
  const resolvedTheme = resolveTheme(themeMode);

  const fadeAndApply = useCallback(updater => {
    const root =
      typeof document !== "undefined" ? document.getElementById("root") : null;

    if (root) {
      clearTimeout(fadeTimer.current);
      root.classList.add("theme-fading");
      fadeTimer.current = setTimeout(() => {
        root.classList.remove("theme-fading");
      }, 300);
    }

    setThemeMode(updater);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(THEME_STORAGE_KEY, themeMode);
    }
  }, [themeMode]);

  const value = useMemo(() => {
    function setMode(mode) {
      fadeAndApply(() => normalizeThemeMode(mode));
    }

    function toggleMode() {
      fadeAndApply(currentMode =>
        currentMode === "light" ? "dark" : "light"
      );
    }

    return {
      themeMode,
      resolvedTheme,
      setMode,
      toggleMode,
    };
  }, [fadeAndApply, resolvedTheme, themeMode]);

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

export function getStoredThemeMode() {
  if (typeof window === "undefined") {
    return DEFAULT_THEME_MODE;
  }

  return parseStoredThemeMode(window.localStorage.getItem(THEME_STORAGE_KEY));
}
