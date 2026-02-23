/**
 * Application Entry Point
 *
 * Bootstraps the React 18 app using createRoot and mounts <App /> into
 * the #root DOM node declared in index.html.
 *
 * Side-effect imports:
 *  - index.css    — global @font-face declarations, scrollbar styles, responsive rules
 *  - all.css      — local Font Awesome 5 icon stylesheet
 */
import React from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App";
import "./assests/font-awesome/css/all.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);
