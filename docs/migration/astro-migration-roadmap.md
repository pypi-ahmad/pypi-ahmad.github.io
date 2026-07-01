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

## Next queued work (before Astro scaffold)

- `SPA-012` Add route-level metadata management for SPA parity (`react-helmet-async`).
- `SPA-013` Add modal keyboard behavior (Esc, focus trap, focus restore).
- `SPA-014` Reduce baseline icon/font payload (Font Awesome tree + Iconify runtime).
- `SPA-015` Add lint/typecheck gates in CI (without breaking current build path).

## Astro scaffold start point

Scaffold only after `SPA-012` to `SPA-015` land:

- `apps/portfolio-astro/`
- Astro + React integration + TypeScript strict
- Content Collections for `projects`, `blog`, `experience`, `education`
- GitHub Pages build/deploy flow as canonical path
