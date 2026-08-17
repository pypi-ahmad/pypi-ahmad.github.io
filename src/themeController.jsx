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
import { DEFAULT_ACCENT, DEFAULT_THEME_MODE, resolveTheme } from "./theme";

export const THEME_STORAGE_KEY = "theme";
export const ACCENT_STORAGE_KEY = "accent";

const ThemeControllerContext = createContext(null);

function normalizeThemeMode(mode) {
  return mode === "light" || mode === "dark" ? mode : DEFAULT_THEME_MODE;
}

function normalizeAccent(accent) {
  return accent === "blue" || accent === "pink" ? accent : DEFAULT_ACCENT;
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

function getInitialAccent(initialAccent) {
  if (initialAccent) {
    return normalizeAccent(initialAccent);
  }

  if (typeof window === "undefined") {
    return DEFAULT_ACCENT;
  }

  return normalizeAccent(window.localStorage.getItem(ACCENT_STORAGE_KEY));
}

export function ThemeControllerProvider({ children, initialThemeMode, initialAccent }) {
  const [themeMode, setThemeMode] = useState(() =>
    getInitialThemeMode(initialThemeMode)
  );
  const [accent, setAccentState] = useState(() => getInitialAccent(initialAccent));
  const fadeTimer = useRef(null);
  const resolvedTheme = resolveTheme(themeMode, accent);

  const startFade = useCallback(() => {
    const root =
      typeof document !== "undefined" ? document.getElementById("root") : null;

    if (root) {
      clearTimeout(fadeTimer.current);
      root.classList.add("theme-fading");
      fadeTimer.current = setTimeout(() => {
        root.classList.remove("theme-fading");
      }, 300);
    }
  }, []);

  const fadeAndApply = useCallback(updater => {
    startFade();
    setThemeMode(updater);
  }, [startFade]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(THEME_STORAGE_KEY, themeMode);
    }
  }, [themeMode]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(ACCENT_STORAGE_KEY, accent);
    }
  }, [accent]);

  const value = useMemo(() => {
    function setMode(mode) {
      fadeAndApply(() => normalizeThemeMode(mode));
    }

    function toggleMode() {
      fadeAndApply(currentMode =>
        currentMode === "light" ? "dark" : "light"
      );
    }

    function setAccent(nextAccent) {
      startFade();
      setAccentState(normalizeAccent(nextAccent));
    }

    return {
      accent,
      themeMode,
      resolvedTheme,
      setAccent,
      setMode,
      toggleMode,
    };
  }, [accent, fadeAndApply, resolvedTheme, startFade, themeMode]);

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
