/**
 * Application Entry Point
 *
 * Bootstraps the React 18 app using createRoot and mounts <App /> into
 * the #root DOM node declared in index.html.
 *
 * Side-effect imports:
 *  - index.css    — global @font-face declarations, scrollbar styles, responsive rules
 *  - Font Awesome core + used icon packs — only the solid/brand sets referenced in source
 */
import React from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App";
import "./assests/font-awesome/css/fontawesome.css";
import "./assests/font-awesome/css/brands.css";
import "./assests/font-awesome/css/solid.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);
