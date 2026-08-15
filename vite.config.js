/**
 * Vite Configuration
 *
 * Build tool config for the portfolio SPA. Migrated from Create React App
 * to Vite for faster dev-server startup and HMR.
 *
 * Plugins:
 *  - @vitejs/plugin-react  — JSX transform, Fast Refresh
 *  - vite-plugin-svgr      — Import SVGs as React components (CRA compat)
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

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
  ],

  // Shim process.env for libraries that expect a Node-like environment
  define: {
    'process.env': {},
  },

  build: {
    // Preserve the Vite 6 browser target instead of inheriting newer major-version defaults.
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
    outDir: 'build', // GitHub Pages uploads this folder
  },

  server: {
    port: 3000,
    open: true, // Auto-open browser on `npm run dev`
  },
});
