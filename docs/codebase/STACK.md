# Technology Stack

## 1) Runtime Summary

| Area | Value | Evidence |
| --- | --- | --- |
| Primary language | JavaScript and JSX, using ESM | `package.json`, `src/index.jsx` |
| Runtime + version | Node.js `>=24.21.0 <25`; npm `>=12.0.2 <13` | `.nvmrc`, `package.json` |
| Package manager | npm 12.0.2 with lockfile v3 | `package.json`, `package-lock.json` |
| Module/build system | Vite 8 builds a React SPA into `build/` | `package.json`, `vite.config.js` |

## 2) Production Frameworks and Dependencies

| Dependency | Version | Role | Evidence |
| --- | --- | --- | --- |
| React / React DOM | `^19.3.0` | Browser UI and mounting | `package.json`, `src/index.jsx` |
| React Router DOM | `^7.18.3` | Client-side routes | `package.json`, `src/containers/Main.jsx` |
| styled-components | `^6.5.3` | Theme provider and global styles | `src/themeController.jsx`, `src/global.js` |
| Framer Motion | `^13.2.0` | Reduced-motion-aware animation | `src/themeMotion.js` |
| react-helmet-async | `^3.0.0` | Route metadata | `src/components/seo/RouteMeta.jsx` |
| react-ga4 | `^3.0.1` | Optional analytics initialization | `src/App.jsx`, `src/data/settings.js` |
| react-icons | `^5.7.0` | UI icons | `src/components/` |
| react-animated-cursor | `^2.11.2` | Optional fine-pointer cursor | `src/App.jsx`, `src/data/settings.js` |

## 3) Development Toolchain

| Tool | Purpose | Evidence |
| --- | --- | --- |
| Vite, React plugin, SVGR | Development server, production build, SVG imports | `vite.config.js` |
| ESLint | JavaScript and JSX linting | `eslint.config.js` |
| TypeScript | No-emit compatibility checking | `tsconfig.typecheck.json` |
| Vitest, Testing Library, jsdom | Component and behavior tests | `vitest.config.js`, `src/__tests__/` |
| axe-core, jest-axe, Playwright | Accessibility and Chromium browser checks | `scripts/check-frontend.mjs`, `.github/workflows/ci.yml` |
| Prettier | Available formatter; no formatting script is declared | `package.json` |

## 4) Key Commands

```bash
npm ci
npm run dev
npm run build
npm run lint
npm run typecheck
npm run test:run
npm run test:coverage
```

`npm run dev` uses port 3000. The build emits `build/`, then generates static fallback files for BrowserRouter. `npm run preview` serves the build locally. `npm run deploy` invokes `gh-pages` as a separate manual publication path.

## 5) Environment and Config

- Config sources: `vite.config.js`, `vitest.config.js`, `eslint.config.js`, `tsconfig.typecheck.json`, `vercel.json`, and `src/data/settings.js`.
- Required environment variables: none found. No `.env.example` or source environment-variable read was found.
- `settings.googleTrackingID` is an empty public-build setting; a real analytics ID is public client configuration, not a secret.
- No container, orchestration, or npm workspace configuration was detected.

## 6) Evidence

- `package.json`, `package-lock.json`, `.nvmrc`
- `vite.config.js`, `vitest.config.js`, `eslint.config.js`, `tsconfig.typecheck.json`
- `src/index.jsx`, `src/App.jsx`, `src/data/settings.js`
- `docs/codebase/.codebase-scan.txt`
