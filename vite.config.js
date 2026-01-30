import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import envCompatible from 'vite-plugin-env-compatible';

export default defineConfig({
  // IMPORTANT: For User Pages (username.github.io), base must be '/'
  base: '/',
  plugins: [
    react(),
    svgr({
      // Support for import { ReactComponent as ... } syntax (CRA compatibility)
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
  define: {
    'process.env': {},
  },
  build: {
    outDir: 'build', // Ensures output goes to 'build' folder for gh-pages
  },
  server: {
    port: 3000,
    open: true,
  },
});