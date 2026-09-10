# Codebase Structure

Snapshot: local portfolio at HEAD `4c9a60b`, 2026-09-10.

## Core Sections (Required)

### 1) Top-Level Map

| Path | Purpose | Evidence |
| --- | --- | --- |
| `src/` | Application and tests | `src/index.jsx` |
| `src/pages/` | Route components organized by feature | `src/containers/Main.jsx` |
| `src/components/` | Cards, header, footer, icons, SEO, contact links | `src/components/header/Header.jsx` |
| `src/containers/` | Router and composed content sections | `src/containers/Main.jsx`, `src/containers/FeaturedProjects/FeaturedProjects.jsx` |
| `src/data/` | Portfolio content and switches | `src/portfolio.js` |
| `src/assests/fonts/` | Local fonts; preserve existing assests spelling | `src/index.css` |
| `src/__tests__/`, `src/test/` | Suites and shared helpers | `vitest.config.js` |
| `public/` | Images, certificates, robots, sitemap and other copied static assets | `public/robots.txt`, `public/sitemap.xml` |
| `.github/` | CI, deployment, contribution templates | `.github/workflows/ci.yml` |
| `docs/` | Architecture, migration roadmap, this map | `docs/architecture.md` |
| `tasks/` | Existing asset-cleanup plan and checklist | `tasks/plan.md`, `tasks/todo.md` |
| `index.html`, `package.json` | HTML entry and package commands | Files themselves |
| `stress-test.mjs` | Standalone browser diagnostics | File itself |
| `scripts/check-motion.mjs` | Failing browser assertions, screenshots and cold-load comparison | README motion checks |
| `build/`, `node_modules/` | Generated output and installed dependencies | `.gitignore`, `vite.config.js` |
| `.codegraph/`, `.code-review-graph/`, `graphify-out/` | Local graph/index artifacts, not application layers | Scan and graph tool output |
| `.claude/`, `.cursor/`, `.playwright-mcp/`, `.ua/` | Local agent/browser artifacts, outside application flow | Scan and `.gitignore` |
| `lets-scroll-main/` | Pre-existing untracked adjacent directory; not wired into root application manifest | Initial git status, `package.json` |

Root images, PDFs, and `contacts-icons/` also exist. Presence alone does not establish that an asset is served or imported; use actual public paths/imports before changing them.

### 2) Entry Points

- Runtime: `index.html` imports `src/index.jsx`, which mounts `App`.
- Dev/build entry selection: Vite commands in `package.json`.
- Diagnostic entry: `stress-test.mjs`, requiring a preview server.
- CI and publishing entries: `.github/workflows/ci.yml`, `deploy.yml`.
- No application worker/server entry found. Astro is planned; no root Astro dependency or workspace exists.

### 3) Module Boundaries

These are observed responsibilities, not mechanically enforced architectural restrictions.

| Boundary | What belongs here | Outside observed responsibility |
| --- | --- | --- |
| Data | Copy, links, project objects, settings | Rendering or runtime API fetching |
| Pages/containers | Compose sections and route content | Credential storage |
| Components | Reusable UI | Authoritative project catalog ownership |
| Theme | Tokens, mode/accent state, persistence | Portfolio content |
| Public | Directly served assets | Private files or secrets |

### 4) Naming and Organization Rules

PascalCase JSX component names coexist with camelCase feature directories and exceptions such as `ProjectCard/`. Data files use camelCase names. Imports are relative; no configured path aliases were found in Vite or typecheck config. CSS is generally colocated with components/pages; newer sections also use styled-components.

### 5) Evidence

- `docs/.codebase-scan.txt` (raw scan; includes local artifacts)
- `index.html`, `src/index.jsx`, `src/portfolio.js`
- `package.json`, `vite.config.js`, `.gitignore`
- `docs/migration/astro-migration-roadmap.md`
