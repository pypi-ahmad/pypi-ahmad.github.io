---
type: Architecture
title: Portfolio website architecture
description: Runtime, content ownership, themes, hosting, and validation boundaries for Ahmad's portfolio.
status: draft
generated:
  by: okf-skill/0.2
  at: 2026-09-10T13:12:34+05:30
sources:
  - id: architecture-map
    resource: ../../docs/codebase/ARCHITECTURE.md
  - id: testing-map
    resource: ../../docs/codebase/TESTING.md
  - id: app
    resource: ../../src/App.jsx
  - id: router
    resource: ../../src/containers/Main.jsx
  - id: portfolio-data
    resource: ../../src/portfolio.js
  - id: featured-projects
    resource: ../../src/containers/FeaturedProjects/FeaturedProjects.jsx
  - id: theme
    resource: ../../src/theme.js
  - id: theme-controller
    resource: ../../src/themeController.jsx
  - id: package
    resource: ../../package.json
  - id: settings
    resource: ../../src/data/settings.js
  - id: motion
    resource: ../../src/themeMotion.js
  - id: motion-css
    resource: ../../src/global.js
  - id: hero-motion
    resource: ../../src/containers/greeting/Greeting.css
  - id: motion-check
    resource: ../../scripts/check-motion.mjs
  - id: typecheck
    resource: ../../tsconfig.typecheck.json
  - id: deploy
    resource: ../../.github/workflows/deploy.yml
  - id: migration
    resource: ../../docs/migration/astro-migration-roadmap.md
---

# Portfolio architecture

This is an agent-authored draft, not human-reviewed knowledge. It describes the local portfolio at HEAD `4c9a60b` plus uncommitted motion changes, inspected on 2026-09-10. Current source and tests are factual authority when they differ from this summary.

## Runtime and content

The portfolio is a static React/Vite single-page application. The inspected website has no backend, database, authentication service, or runtime content API. Portfolio projects describing AI systems are display content, not website API integrations.[^architecture-map]

`index.html` loads `src/index.jsx`, which mounts App. App provides the error boundary, theme controller, global styles, motion configuration, optional cursor, and conditional analytics initialization. Main owns BrowserRouter, lazy route components, Suspense feedback, and route metadata.[^app][^router][^architecture-map]

Routes cover home, experience, education, projects, skills, contact, optional splash, and a not-found page. `/home` canonicalizes to `/`.[^architecture-map]

Content lives in `src/data/` and is re-exported through `src/portfolio.js`. The homepage selects the first four project entries, so reordering the catalog also changes featured work.[^portfolio-data][^featured-projects]

## Appearance and configuration

The theme controller stores mode and accent independently in localStorage. Supported modes are light/dark; accents are pink, blue, and pink-indigo. Defaults are dark and blue. Invalid stored mode JSON falls back, but storage access exceptions are not caught by the controller.[^theme][^theme-controller]

Settings currently disable splash, analytics, and the custom cursor. No API key is required for the inspected portfolio application.[^settings][^architecture-map]

The existing Framer Motion path uses shared entrance props from `revealMotion`: desktop 400 ms/14 px, 60 ms stagger capped at 180 ms, and once-per-mount reveals triggered by any intersection. Mobile uses 250 ms opacity-only entrances without stagger. Main headings remain outside entrance animations. Global CSS exposes focused and printed content and applies live reduced-motion overrides; the home accent decoration settles after 3.6 seconds and is static on mobile or reduced motion. No animation dependency or media asset was added.[^motion][^motion-css][^hero-motion][^architecture-map]

## Build and hosting boundaries

The build creates `build/`, copies the entry HTML to `404.html`, and creates explicit HTML copies for home, education, and projects. Other direct routes rely on hosting fallback behavior. Live HTTP status behavior has not been verified in this mapping.[^package][^architecture-map]

GitHub Pages deployment runs on pushes to main or manual dispatch. Its workflow builds and tests, but does not run lint/typecheck itself or explicitly depend on the separate CI workflow.[^deploy]

The existing roadmap plans an Astro migration after the SPA-014 icon audit. Astro is not the current application architecture. Whether that roadmap remains the desired direction is unresolved; this concept does not authorize migration.[^migration][^package]

## Validation and limits

Use `npm run lint`, `npm run typecheck`, `npm run test:run`, and `npm run build` as the documented local checks. The motion implementation check recorded all four passing, including 151 tests across 19 files; these are snapshot results, not a guarantee for future edits.[^testing-map]

Typecheck sets `checkJs: false`, so a passing result does not establish strict JavaScript type safety. Coverage percentages, live hosting settings, and current vulnerability status were not verified. The older stress script is diagnostic rather than a reliable failure-exit gate. `scripts/check-motion.mjs` supplies focused failing browser assertions and optional before/after content and loading-cost comparison; current execution results belong in the testing map.[^typecheck][^testing-map][^motion-check]

## Detailed map

The seven documents in `docs/codebase/` cover stack, structure, architecture, conventions, integrations, testing, and concerns. Consult those documents and their source references when a task needs more detail.[^architecture-map][^testing-map]

[^architecture-map]: Source-backed architecture map in docs/codebase/ARCHITECTURE.md.
[^testing-map]: Test configuration and local execution snapshot in docs/codebase/TESTING.md.
[^app]: Global application providers in src/App.jsx.
[^router]: Route composition in src/containers/Main.jsx.
[^portfolio-data]: Data exports in src/portfolio.js.
[^featured-projects]: Homepage project selection in FeaturedProjects.jsx.
[^theme]: Semantic theme tokens and accent resolution in src/theme.js.
[^theme-controller]: State and storage behavior in src/themeController.jsx.
[^package]: Dependency and build declarations in package.json.
[^settings]: Feature switches in src/data/settings.js.
[^motion]: Shared entrance defaults in src/themeMotion.js.
[^motion-css]: Live preference and focus behavior in src/global.js.
[^hero-motion]: Finite decorative motion in Greeting.css.
[^motion-check]: Browser assertions and measurements in scripts/check-motion.mjs.
[^typecheck]: Compiler options in tsconfig.typecheck.json.
[^deploy]: GitHub Pages workflow in .github/workflows/deploy.yml.
[^migration]: Planned Astro direction in docs/migration/astro-migration-roadmap.md.
