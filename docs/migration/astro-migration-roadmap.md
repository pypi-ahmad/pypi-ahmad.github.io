# Astro Migration Roadmap (Execution Tracker)

This file tracks implementation while the current Vite SPA remains live.

## Locked decisions

- Canonical host: `https://pypi-ahmad.github.io/` (GitHub Pages)
- Blog/content source (v1): in-repo Markdown/MDX via Astro Content Collections
- Styling direction (v1): design tokens + CSS modules

## Completed in SPA (safe-first)

- `SPA-001` Added wildcard route + `NotFound` page.
- `SPA-002` Replaced blank router suspense fallback with a visible loading state.
- `SPA-003` Added semantic landmarks (`nav` in header, `main` in page routes).
- `SPA-004` Removed dead code in Projects page.
- `SPA-005` Fixed Contact heading hierarchy (removed duplicate `h1`).
- `SPA-006` Fixed Degree CTA semantics (`span` instead of `p` inside link).
- `SPA-007` Consolidated metadata assets by removing root duplicates (`manifest.json`, `robots.txt`) and using `public/` as source of truth.
- `SPA-008` Fixed OG image reference to an existing static asset.
- `SPA-009` Added image loading/decoding hints and stable logo dimensions in card components.
- `SPA-010` Added `public/sitemap.xml` and `Sitemap` pointer in `public/robots.txt`.
- `SPA-011` Updated README to reflect GitHub Pages canonical host.
- `SPA-012` Added route-level metadata management (`react-helmet-async`); `RouteMeta` component supplies title, description, canonical, robots, Open Graph, and Twitter tags per route.
- `SPA-015` Added lint (`eslint`) and typecheck (`tsc --noEmit`) gates in CI; both run before build on every push and pull request to `main`.

## Next queued work (before Astro scaffold)

- `SPA-014` Audit icon payload (`react-icons` tree-shaking); confirm only imported icons are bundled.

## Astro scaffold start point

Scaffold only after `SPA-014` lands:

- `apps/portfolio-astro/`
- Astro + React integration + TypeScript strict
- Content Collections for `projects`, `blog`, `experience`, `education`
- GitHub Pages build/deploy flow as canonical path
