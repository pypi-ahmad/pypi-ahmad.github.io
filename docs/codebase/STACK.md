# Technology Stack

Snapshot: 2026-09-10, local HEAD `4c9a60b` on `feat/add-contact-details`. Scope: portfolio application; adjacent untracked `lets-scroll-main/` excluded.

## Core Sections (Required)

### 1) Runtime Summary

| Area | Value | Evidence |
| --- | --- | --- |
| Primary language | JavaScript, JSX, CSS; no standalone language version pin | `src/index.jsx`, `src/index.css` |
| Runtime | Browser application; Node >=24.19.0 <25 for tooling, .nvmrc pin 24.19.0 | `package.json`, `.nvmrc` |
| Package manager | npm 12.0.2; lockfile committed | `package.json`, `package-lock.json` |
| Module/build system | ES modules, Vite 8, React plugin, SVGR | `package.json`, `vite.config.js` |

Local commands reported Node v24.20.0 and npm 12.0.2; Node satisfies the declared range but differs from the exact CI pin.

### 2) Production Frameworks and Dependencies

Versions below are declared ranges, not a claim about every installed transitive version.

| Dependency | Version | Role | Evidence |
| --- | --- | --- | --- |
| react, react-dom | ^19.2.8 each | Components and browser mounting | `package.json`, `src/index.jsx` |
| react-router-dom | ^7.18.2 | Browser routing | `src/containers/Main.jsx` |
| styled-components | ^6.5.2 | Theme provider and styles | `src/themeController.jsx`, `src/global.js` |
| framer-motion | ^13.1.0 | Motion and reduced-motion configuration | `src/App.jsx` |
| react-animated-cursor | ^2.11.2 | Optional fine-pointer cursor | `src/App.jsx` |
| react-bootstrap | ^2.10.10 | UI dependency | `package.json` |
| react-ga4 | ^3.0.1 | Optional analytics initialization | `src/App.jsx` |
| react-helmet-async | ^3.0.0 | Route metadata | `src/components/seo/RouteMeta.jsx` |
| react-icons | ^5.7.0 | Icons | `src/components/socialMedia/ContactLinksList.jsx` |
| web-vitals | ^6.1.0 | Declared dependency; no source import found | `package.json`; source search |

### 3) Development Toolchain

All direct development declarations from `package.json`:

| Tools and declared versions | Purpose |
| --- | --- |
| vite ^8.2.1, @vitejs/plugin-react 6.0.5, vite-plugin-svgr ^5.2.0 | Build, JSX, SVG imports |
| vitest ^4.1.10, jsdom ^30.0.1 | Test runner and DOM environment |
| @testing-library/dom ^10.4.1, @testing-library/react ^16.3.2, @testing-library/user-event ^14.6.4, @testing-library/jest-dom ^7.0.1 | DOM queries, interactions, assertions |
| axe-core ^4.13.0, @axe-core/react ^4.13.0, jest-axe ^11.0.0 | Accessibility tooling |
| playwright ^1.62.1 | Browser diagnostics |
| eslint ^10.8.1, @eslint/js ^10.0.1, globals ^17.11.0 | Lint |
| typescript ^7.0.2 | Limited static checking of JS project |
| prettier ^3.9.6 | Available formatter |
| gh-pages ^6.3.0 | Alternate deployment script |
| ajv ^8.20.0 | Declared schema-validation tooling dependency; application use not established |

The cursor's React dependencies are overridden to root React versions in `package.json`. No container configuration or npm workspace configuration was detected.

### 4) Key Commands

```sh
npm ci
npm run dev
npm run lint
npm run typecheck
npm run test:run
npm run build
npm run preview
```

Dev uses port 3000. Build emits `build/`; preview defaults to port 4173. `npm test` watches; `npm run test:coverage` requests coverage. `npm run deploy` publishes with gh-pages and must not be used as a diagnostic command.

### 5) Environment and Config

- `vite.config.js`: base /, explicit browser targets, build directory, process.env shim.
- `src/data/settings.js`: splash disabled, custom cursor disabled, analytics ID empty.
- No required application environment variables found in inspected source; no API key needed to run the portfolio.
- `.github/workflows/ci.yml` and `deploy.yml` pin Node/npm. `vercel.json` declares build command and output.
- [TODO] Current remote hosting settings and deployed revision were not queried.

### 6) Evidence

- `package.json`, `package-lock.json`, `.nvmrc`
- `vite.config.js`, `vitest.config.js`, `tsconfig.typecheck.json`
- `src/App.jsx`, `src/data/settings.js`
- `.github/workflows/ci.yml`, `.github/workflows/deploy.yml`
