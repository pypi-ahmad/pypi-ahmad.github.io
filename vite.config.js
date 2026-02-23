/**
 * Vite Configuration
 *
 * Build tool config for the portfolio SPA. Migrated from Create React App
 * to Vite for faster dev-server startup and HMR.
 *
 * Plugins:
 *  - @vitejs/plugin-react  — JSX transform, Fast Refresh
 *  - vite-plugin-svgr      — Import SVGs as React components (CRA compat)
 *  - vite-plugin-env-compatible — Expose REACT_APP_* env vars as process.env.*
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import envCompatible from 'vite-plugin-env-compatible';

export default defineConfig({
  // For GitHub User Pages (username.github.io), base must be '/'
  base: '/',

  plugins: [
    react(),
    svgr({
      // Enable named export: import { ReactComponent as Icon } from './icon.svg'
      svgrOptions: {
        exportType: 'named',
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: '**/*.svg',
    }),
    envCompatible(),
  ],

  // Shim process.env for libraries that expect a Node-like environment
  define: {
    'process.env': {},
  },

  build: {
    outDir: 'build', // gh-pages deploys from this folder
  },

  server: {
    port: 3000,
    open: true, // Auto-open browser on `npm run dev`
  },
});