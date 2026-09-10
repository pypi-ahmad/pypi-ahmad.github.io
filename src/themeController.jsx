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
  return accent === "blue" || accent === "pink" || accent === "pink-indigo"
    ? accent
    : DEFAULT_ACCENT;
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

export function ThemeControllerProvider({
  children,
  initialThemeMode,
  initialAccent,
}) {
  const [themeMode, setThemeMode] = useState(() =>
    getInitialThemeMode(initialThemeMode),
  );
  const [accent, setAccentState] = useState(() =>
    getInitialAccent(initialAccent),
  );
  const transitionStyle = useRef(null);
  const transitionFrames = useRef([]);
  const resolvedTheme = resolveTheme(themeMode, accent);

  const suppressTransitions = useCallback(() => {
    transitionFrames.current.forEach(cancelAnimationFrame);
    transitionFrames.current = [];
    if (!transitionStyle.current) {
      const style = document.createElement("style");
      style.textContent = "*,*::before,*::after{transition:none !important}";
      document.head.append(style);
      transitionStyle.current = style;
    }
    // Commit the override before React applies new theme tokens.
    void document.body.offsetHeight;
    transitionFrames.current = [
      requestAnimationFrame(() => {
        transitionFrames.current = [
          requestAnimationFrame(() => {
            transitionStyle.current?.remove();
            transitionStyle.current = null;
            transitionFrames.current = [];
          }),
        ];
      }),
    ];
  }, []);

  useEffect(
    () => () => {
      transitionFrames.current.forEach(cancelAnimationFrame);
      transitionStyle.current?.remove();
    },
    [],
  );

  const applyMode = useCallback(
    (updater) => {
      suppressTransitions();
      setThemeMode(updater);
    },
    [suppressTransitions],
  );

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
      if (normalizeThemeMode(mode) !== themeMode)
        applyMode(() => normalizeThemeMode(mode));
    }

    function toggleMode() {
      applyMode((currentMode) => (currentMode === "light" ? "dark" : "light"));
    }

    function setAccent(nextAccent) {
      if (normalizeAccent(nextAccent) === accent) return;
      suppressTransitions();
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
  }, [accent, applyMode, resolvedTheme, suppressTransitions, themeMode]);

  return (
    <ThemeControllerContext.Provider value={value}>
      <ThemeProvider theme={resolvedTheme}>{children}</ThemeProvider>
    </ThemeControllerContext.Provider>
  );
}

export function useThemeController() {
  const context = useContext(ThemeControllerContext);

  if (!context) {
    throw new Error(
      "useThemeController must be used within ThemeControllerProvider",
    );
  }

  return context;
}

export function getStoredThemeMode() {
  if (typeof window === "undefined") {
    return DEFAULT_THEME_MODE;
  }

  return parseStoredThemeMode(window.localStorage.getItem(THEME_STORAGE_KEY));
}
