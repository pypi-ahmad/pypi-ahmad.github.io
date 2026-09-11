# Codebase Concerns

## 1) Top Risks (Prioritized)

| Severity | Concern | Evidence | Impact | Suggested action |
| --- | --- | --- | --- | --- |
| Medium | Static-route fallback paths are duplicated between the router and build command | `src/containers/Main.jsx`, `package.json` | A new route can fail on direct GitHub Pages navigation | Change both together; add a route/fallback contract test if routes grow |
| Medium | No runtime schema validation for portfolio data | `src/data/`, `src/portfolio.js` | Manual content edits can break views late | Keep data-contract tests current; add validation only if editing becomes frequent |
| Low | JavaScript type checking is limited | `tsconfig.typecheck.json` | Some runtime-shape mistakes evade `tsc` | [ASK USER] decide whether stronger JS checking or TypeScript migration is desired |
| Low | No application error telemetry | `src/components/ErrorBoundary.jsx` | Production render failures are visible only to visitors | [ASK USER] decide whether privacy-preserving client error reporting is wanted |

## 2) Technical Debt

| Debt item | Why it exists | Where | Risk if ignored | Suggested fix |
| --- | --- | --- | --- | --- |
| Styling has two systems | Co-located CSS and styled-components coexist | `src/**/*.css`, `src/global.js` | Visual rules can drift across theme-aware and legacy areas | Preserve local pattern; plan a migration only with a design-system goal |
| Manual deployment route remains | `gh-pages` script remains beside Actions deployment | `package.json`, `.github/workflows/deploy.yml` | Publication behavior can diverge | Resolve the architectural [ASK USER] decision in `ARCHITECTURE.md` |
| Large static asset collection | 88 files total about 11.6 MB | `public/`, scan output | Slow cold loads if many assets are requested | Measure production asset usage before compression/removal work |

## 3) Security and Reliability Gaps

- The public client has no backend authentication or user-input processing surface in inspected source.
- Static data and analytics configuration are delivered to browsers; do not add secrets to `src/data/settings.js`.
- [TODO] Repository settings for branch protection, Pages environment protection, Vercel access, and deployed revision were not queried.
- The error boundary recovers through a page reload but does not log context externally.

## 4) Performance and Scale Limits

- Content is bundled with the client, appropriate for the current static portfolio but not for large or frequently changing catalogs.
- Route-level lazy imports reduce initial page code, but static assets remain independently managed and need browser measurement before changes.
- `stress-test.mjs` contains local performance diagnostics; it is not part of the CI workflow.

## 5) Change-Prone Areas

- Recent history identifies `README.md`, `package.json`, `src/containers/Main.jsx`, `src/components/header/Header.jsx`, `src/pages/projects/Projects.jsx`, `src/data/experience.js`, and several navigation/theme tests as high-churn files.
- Treat router, header, theme, project ordering, and their contract tests as coupled change areas.
- No production-code `TODO`, `FIXME`, or `HACK` marker was found by the scan.

## 6) Evidence

- `docs/codebase/.codebase-scan.txt`
- `package.json`, `tsconfig.typecheck.json`, `README.md`
- `src/containers/Main.jsx`, `src/components/header/Header.jsx`, `src/components/ErrorBoundary.jsx`
- `src/data/`, `src/portfolio.js`, `.github/workflows/ci.yml`, `stress-test.mjs`
