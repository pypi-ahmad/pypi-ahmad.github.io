/**
 * App — Smoke Test
 *
 * Verifies the root <App /> component renders without throwing.
 * Uses React 18's createRoot API.
 */
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(<App />);
  root.unmount();
});
