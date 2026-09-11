# Codebase Structure

## 1) Top-Level Map

| Path | Purpose | Evidence |
| --- | --- | --- |
| `src/` | React application source, styles, data, and tests | `src/index.jsx` |
| `public/` | Static images, certificates, favicon, manifest, robots, and sitemap | `public/` |
| `scripts/` | Browser, accessibility, motion, parity, and interaction diagnostics | `scripts/check-frontend.mjs` |
| `dev/` | Test fixtures for isolated component browser checks | `dev/` |
| `.github/` | Issue/PR templates plus CI and Pages deployment | `.github/workflows/` |
| `docs/` | Maintained architecture and historical migration record | `docs/architecture.md` |
| `knowledge/` | Repository knowledge notes | `knowledge/index.md` |
| `tasks/` | Existing cleanup plan and checklist | `tasks/plan.md` |

Generated or local-tool directories such as `build/`, `node_modules/`, `.codegraph/`, `.code-review-graph/`, `.ua/`, and `graphify-out/` are not application layers.

## 2) Entry Points

- Main runtime: `index.html` supplies `#root`; `src/index.jsx` mounts `App`.
- Application composition: `src/App.jsx` installs global providers; `src/containers/Main.jsx` owns the router and lazy page imports.
- Secondary executable entry points: `scripts/*.mjs` and `stress-test.mjs` require a locally running site; no server, worker, queue consumer, or CLI application was found.
- Development-only HTML entries under `dev/` mount isolated components through
  Vite. `dev/break-review/{project,certification,experience,contact}.html` contains
  synthetic stress fixtures; the pages explicitly mark visual inspection pending.
  They are not production routes or part of the configured production build input.
- Script selection: `npm run dev` and `npm run build` invoke Vite through `package.json`.

## 3) Module Boundaries

| Boundary | What belongs here | What must not own |
| --- | --- | --- |
| `src/data/` | Static portfolio facts and application switches | Rendering or API fetch logic |
| `src/portfolio.js` | Re-exporting content modules | Independent content copies |
| `src/components/` | Reusable cards, header, footer, SEO, navigation, and error UI | Route assembly or authoritative content data |
| `src/containers/` | Router and reusable composed sections | Persistent global state beyond their purpose |
| `src/pages/` | Route-level page composition | Cross-route application state |
| `src/theme*`, `src/global.js` | Theme tokens, local persistence, shared visual behavior | Portfolio copy |
| `src/test/`, `src/__tests__/` | Test setup, helpers, and assertions | Production runtime imports |

## 4) Naming and Organization Rules

- JSX components use PascalCase file and export names, for example `ProjectCard.jsx` and `RouteMeta.jsx`.
- Data files use camelCase, for example `homePage.js` and `socialMedia.js`.
- Directories mix feature camelCase names (`socialMedia`) with PascalCase component groups (`ProjectCard`).
- Imports are relative ESM imports; no path alias is configured. `src/portfolio.js` is the data barrel.
- CSS is generally co-located with components or pages; theme-aware surfaces also use styled-components.

## 5) Evidence

- `index.html`, `src/index.jsx`, `src/App.jsx`, `src/containers/Main.jsx`
- `src/components/`, `src/containers/`, `src/data/`, `src/pages/`, `src/test/`
- `package.json`, `vite.config.js`, `docs/codebase/.codebase-scan.txt`
