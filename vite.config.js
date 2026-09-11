/**
 * Vite Configuration
 *
 * Shared transforms for the development server and production bundles.
 *
 * Plugins:
 *  - @vitejs/plugin-react  — JSX transform, Fast Refresh
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // For GitHub User Pages (username.github.io), base must be '/'
  base: '/',

  plugins: [react()],

  // Shim process.env for libraries that expect a Node-like environment
  define: {
    'process.env': {},
  },

  build: {
    // Pin browser syntax support so toolchain defaults cannot silently raise the browser floor.
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
    // The Pages workflow and package scripts consume this directory.
    outDir: 'build',
  },

  server: {
    port: 3000,
    open: true,
  },
});
