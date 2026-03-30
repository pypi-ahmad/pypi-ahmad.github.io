/**
 * Vitest Configuration
 *
 * Test runner config for the portfolio SPA. Uses jsdom for DOM
 * simulation and @testing-library/jest-dom for extended matchers.
 */
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        exportType: "named",
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: "**/*.svg",
    }),
  ],

  define: {
    "process.env": {},
  },

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.js"],
    css: true,
    include: ["src/**/*.{test,spec}.{js,jsx}"],
    // Silence console noise from component renders
    silent: false,
    // Increase timeout for accessibility tests
    testTimeout: 15000,
  },
});
