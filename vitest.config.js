/**
 * Vitest Configuration
 *
 * Test runner config for the portfolio SPA. Uses jsdom for DOM
 * simulation and @testing-library/jest-dom for extended matchers.
 */
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  define: {
    "process.env": {},
  },

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.js"],
    css: true,
    include: ["src/**/*.{test,spec}.{js,jsx}"],
    // Keep runtime warnings visible so passing assertions cannot hide component errors.
    silent: false,
    // Accessibility tree scans can take longer than ordinary component assertions.
    testTimeout: 15000,
    coverage: {
      provider: "v8",
      reporter: ["text", "json"],
      thresholds: {
        statements: 85,
        branches: 75,
        functions: 75,
        lines: 85,
      },
    },
  },
});
