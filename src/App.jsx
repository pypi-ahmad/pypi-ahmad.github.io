/**
 * Root Application Component
 *
 * Provides the global context wrappers that every page needs:
 *  1. ThemeProvider  — styled-components theme (light/dark), persisted in localStorage
 *  2. MotionConfig   — Framer Motion respects user's "prefers-reduced-motion" setting
 *  3. GlobalStyles   — CSS reset & body theme styles
 *  4. AnimatedCursor — custom rainbow cursor (desktop only, toggleable in settings)
 *
 * The <Main /> component handles all routing.
 */
import React, { useState, useEffect } from "react";
import "./App.css";
import Main from "./containers/Main";
import { ThemeProvider } from "styled-components";
import { themes } from "./theme";
import { GlobalStyles } from "./global";
import { settings } from "./portfolio";
import ReactGA from "react-ga4";
import AnimatedCursor from "react-animated-cursor";
import { MotionConfig } from "framer-motion";

function App() {
  // Initialize Google Analytics (only when a tracking ID is configured)
  useEffect(() => {
    if (settings.googleTrackingID) {
      ReactGA.initialize(settings.googleTrackingID);
    }
  }, []);

  // Theme state — defaults to "dark", saved to localStorage on toggle
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const useCursor = settings.useCustomCursor;

  // Custom cursor is only shown on devices with a precise pointer (mouse)
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    setIsDesktop(window.matchMedia("(pointer: fine)").matches);
  }, []);

  return (
    <ThemeProvider theme={themes[theme]}>
      <MotionConfig reducedMotion="user">
        <GlobalStyles />
        {useCursor && isDesktop && (
          <AnimatedCursor
            color="255, 64, 129"
            innerSize={8}
            outerSize={8}
            innerScale={1.2}
            outerScale={1}
            outerAlpha={0}
            trailingSpeed={8}
            innerStyle={{
              zIndex: 9999,
            }}
            outerStyle={{
              zIndex: 9999,
              display: "none",
            }}
            clickables={[
              "a",
              'input[type="text"]',
              'input[type="email"]',
              'input[type="number"]',
              'input[type="submit"]',
              'input[type="image"]',
              "label[for]",
              "select",
              "textarea",
              "button",
              ".link",
            ]}
          />
        )}
        <div>
          <Main theme={themes[theme]} setTheme={setTheme} />
        </div>
      </MotionConfig>
    </ThemeProvider>
  );
}

export default App;
