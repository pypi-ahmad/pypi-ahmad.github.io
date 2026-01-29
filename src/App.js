import React, { useState, useEffect } from "react";
import "./App.css";
import Main from "./containers/Main";
import { ThemeProvider } from "styled-components";
import { themes } from "./theme";
import { GlobalStyles } from "./global";
import { settings } from "./portfolio";
import ReactGA from "react-ga4";
import AnimatedCursor from "react-animated-cursor";

function App() {
  useEffect(() => {
    if (settings.googleTrackingID) {
      ReactGA.initialize(settings.googleTrackingID);
    }
  }, []);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const useCursor = settings.useCustomCursor;

  return (
    <ThemeProvider theme={themes[theme]}>
      <>
        <GlobalStyles />
        {useCursor && (
          <AnimatedCursor
            color="255, 255, 255"
            innerSize={8}
            outerSize={35}
            innerScale={0.7}
            outerScale={1.5}
            outerAlpha={0}
            trailingSpeed={8}
            innerStyle={{
              zIndex: 9999,
              backgroundColor: "transparent",
              animation: "cursorRainbow 2s linear infinite",
            }}
            outerStyle={{
              zIndex: 9999,
              backgroundColor: "transparent",
              border: "2px solid",
              animation: "cursorRainbow 2s linear infinite",
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
      </>
    </ThemeProvider>
  );
}

export default App;
