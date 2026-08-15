# Ahmad Mujtaba — Portfolio

React single-page application for presenting professional experience, AI projects, and skills. Most portfolio content is maintained through plain JavaScript data modules in `src/data/`.

- **Live (Canonical)** — [pypi-ahmad.github.io](https://pypi-ahmad.github.io/)
- **Live (Mirror)** — [my-portfolio-green-ten-63.vercel.app](https://my-portfolio-green-ten-63.vercel.app/)
- **Repo** — [github.com/pypi-ahmad/pypi-ahmad.github.io](https://github.com/pypi-ahmad/pypi-ahmad.github.io)

---

## Overview

| Aspect | Detail |
|---|---|
| Version | `2.2.0` |
| Routes | 9 named paths plus a catch-all 404; 9 lazy-loaded page modules (`React.lazy` + `Suspense`) |
| Themes | 32 families × 2 modes (light/dark) = 64 resolved themes |
| Data layer | 10 modules barrel-exported through `src/portfolio.js` |
| Tests | 14 files, 158 tests (rendering, behavior, navigation, accessibility, contrast, project catalog, route metadata) |
| CI/CD | GitHub Actions — lint, typecheck, build, and test on push/PR; automated GitHub Pages deploy on push to `main` |
| Hosting | GitHub Pages (official Pages actions) and Vercel (`vercel.json`) |

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI | React 19, React Bootstrap, styled-components |
| Build | Vite 8, `@vitejs/plugin-react`, `vite-plugin-svgr` |
| Routing | React Router DOM 7 |
| Animation | Framer Motion |
| Icons | `react-icons` plus a local `SkillIcon` registry (no Font Awesome or Iconify CDN) |
| Analytics | react-ga4 (disabled until a GA4 ID is configured in `settings.js`) |
| Testing | Vitest, @testing-library/react, jsdom, jest-axe, axe-core |
| Stress testing | Playwright (Chrome DevTools Protocol) |
| Node | `>=24.19.0 <25` |

---

## Pages and Routes

Defined in `src/containers/Main.jsx`. All page modules are lazy-loaded. Per-route title, description, canonical URL, robots, and Open Graph tags are set by `src/components/seo/RouteMeta.jsx` via `react-helmet-async`.

| Path | Page | Content |
|---|---|---|
| `/` | Home (or Splash) | Hero, system showcase, skills summary. Splash is toggled via `settings.isSplash` (currently off). |
| `/home` | Home | Same as `/` when splash is off |
| `/experience` | Experience | Work history accordion (Deloitte, Cognizant, AiEnsured) |
| `/education` | Education | 2 degrees, 9 certifications with PDF/verification links |
| `/contact` | Contact | Contact links (GitHub, LinkedIn, Gmail), blog CTA |
| `/projects` | Projects | Platform catalog (20 systems), enterprise case studies (12), open-source projects (13) |
| `/skills` | Skills | 6-category skill grid with bundled `SkillIcon` components |
| `/theme` | Theme | 32-family theme gallery with light/dark toggle (`noindex`) |
| `/splash` | Splash | Standalone splash screen (`noindex`) |
| `*` | Not Found | Catch-all 404 page (`noindex`) |

---

## Data Architecture

All portfolio content lives in `src/data/` as plain JavaScript objects, re-exported through `src/portfolio.js`. No CMS or API — content updates are file edits.

| Module | Content |
|---|---|
| `settings.js` | Splash toggle, custom cursor toggle, Google Analytics ID |
| `greeting.js` | Hero title, subtitle, signal bullets, philosophy, resume/cover links |
| `socialMedia.js` | GitHub, LinkedIn, Gmail (set a link to `" "` to hide; Telegram/Discord are hidden) |
| `skills.js` | 6-category skills page + 3-category home summary |
| `education.js` | 2 degrees + 9 certifications |
| `experience.js` | 3 work entries with structured bullet descriptions |
| `projects.js` | 13 open-source project tiles (local-first AI tools, agent platforms, GraphRAG) |
| `contact.js` | Contact page heading + blog CTA |
| `systems.js` | 12 enterprise case studies (5 featured + 7 supporting), including Deloitte healthcare and fraud-investigation work |
| `platform.js` | 20 platform systems (10 GenAI + 5 LangGraph + 5 CrewAI) + shared infrastructure metadata |

---

## Theme System

The theme engine is defined in `src/theme.js` and managed by `src/themeController.jsx`.

- **32 families**, each with light and dark variants (64 total resolved themes).
- `createThemeTokens()` derives semantic tokens (accent, gradient, shadow, glow, etc.) from raw family tokens.
- `ensureContrast()` enforces WCAG 4.5:1 minimum contrast by iteratively mixing the foreground toward a readable fallback.
- Theme selection is persisted in `localStorage` as `{ family, mode }` JSON. Legacy string values are normalized on read.
- Theme transitions use a 300ms CSS variable transition and a root opacity fade.
- `GlobalStyles` (in `src/global.js`) maps resolved tokens to CSS custom properties on `body`.

---

## Animation and Interaction

- Framer Motion entrance animations trigger once on scroll (`viewport={{ once: true }}`).
- `MotionConfig reducedMotion="user"` at the root respects the OS `prefers-reduced-motion` setting.
- System cards open modal dialogs (`role="dialog"`, `aria-modal="true"`) with overlay-click and close-button dismissal.
- Custom animated cursor activates only on devices with a precise pointer (`matchMedia("(pointer: fine)")`), controlled by `settings.useCustomCursor`.
- Root `ErrorBoundary` catches render-time exceptions and shows a recovery screen.

---

## Project Structure

```
.github/workflows/
├── ci.yml                  # Lint, typecheck, build, test on push/PR to main
└── deploy.yml              # Build, test, deploy to GitHub Pages on push to main

src/
├── index.jsx               # createRoot entry point
├── App.jsx                 # Provider stack: ErrorBoundary → Theme → Motion → GlobalStyles
├── App.test.jsx            # Root smoke test
├── global.js               # GlobalStyles — CSS custom properties
├── theme.js                # 32 theme families, createThemeTokens(), ensureContrast()
├── themeController.jsx     # ThemeControllerProvider, localStorage persistence, context API
├── themeMotion.js          # Reusable transition strings for themed surfaces
├── portfolio.js            # Barrel re-export of all 10 data modules
├── data/                   # Pure data modules — no JSX, no side effects
├── containers/             # Layout wrappers and section-level composition
│   └── Main.jsx            # BrowserRouter, HelmetProvider, Suspense, routes
├── components/             # Reusable UI: header, footer, cards, modals, icons
│   ├── icons/SkillIcon.jsx # Bundled skill-icon registry (react-icons + custom SVGs)
│   └── seo/RouteMeta.jsx   # Per-route Helmet title, description, canonical, OG tags
├── pages/                  # Route-level page components (lazy-loaded)
└── __tests__/              # 13 focused suites (14 files with App.test.jsx)

security_best_practices_report.md
graphify-out/               # Graphify knowledge-graph output
.ua/                        # Understand/architecture graph artifacts
.codegraph/                 # CodeGraph local index (database is gitignored)
tasks/                      # Local planning notes
stress-test.mjs             # Playwright + CDP: Core Web Vitals, throttling, layout shift
vite.config.js              # Vite 8 config — port 3000, React plugin, SVGR
vitest.config.js            # jsdom environment, 15s timeout
vercel.json                 # Vercel static deployment config
```

---

## Setup

### Prerequisites

- **Node.js** `>=24.19.0 <25` (local pin: `.nvmrc` → `24.19.0`)
- **npm** `>=12.0.2 <13` (repository pin: `12.0.2`)

### Install and run

```bash
git clone https://github.com/pypi-ahmad/pypi-ahmad.github.io.git
cd pypi-ahmad.github.io
npm install --global npm@12.0.2
npm ci
npm run dev
```

Opens `http://localhost:3000` automatically.

### Build

```bash
npm run build
```

Runs `vite build`, writes code-split chunks to `build/`, and copies `index.html` → `404.html` for SPA routing on GitHub Pages.

### Preview production build

```bash
npm run preview
```

Serves `build/` on `http://localhost:4173`.

---

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Vite dev server (port 3000, HMR) |
| `npm run build` | Production build → `build/` |
| `npm run preview` | Serve production build locally |
| `npm test` | Vitest in watch mode |
| `npm run test:run` | Full test suite (single run) |
| `npm run test:coverage` | Test suite with coverage report |
| `npm run lint` | ESLint over `src` (`.js`, `.jsx`) |
| `npm run typecheck` | `tsc --noEmit` via `tsconfig.typecheck.json` |
| `node stress-test.mjs` | Playwright stress test (requires `npm run preview` running) |

---

## Testing

14 test files, 158 tests (`npm run test:run` on current `main`).

| Test File | Scope |
|---|---|
| `ThemeRegistry.test.jsx` | Contrast ratios (≥7:1 primary, ≥4.5:1 secondary) across all theme families |
| `Accessibility.test.jsx` | Structural accessibility checks for Header, Greeting, ExperienceCard, and ThemePage, plus axe-core scans on Header, Footer, and Greeting |
| `Behavior.test.jsx` | Theme persistence, gallery interaction, modal open/close, CTA behavior |
| `Navigation.test.jsx` | Route resolution, NavLink navigation, logo redirect |
| `Responsive.test.jsx` | Hamburger menu structure, viewport-dependent layout |
| `Pages.render.test.jsx` | Page-level smoke renders for all routes |
| `ProjectsData.test.js` | Open-source catalog length (13), unique GitHub URLs, compact card fields |
| `RouteMetadata.test.jsx` | Per-route Helmet title, description, canonical, and robots tags |
| `App.test.jsx` | Root `<App />` smoke render |
| `*.render.test.jsx` | Component render verification (Greeting, Header, Footer, ExperienceCard, SystemCard) |

**Test infrastructure:**
- `src/test/setup.js` mocks `IntersectionObserver`, `matchMedia`, `scrollTo`, and `ResizeObserver` for jsdom.
- `src/test/testUtils.jsx` provides `renderWithProviders()` wrapping the production provider stack.
- Known axe rule overrides in tests: `color-contrast` (jsdom cannot compute styles), `region`, and `page-has-heading-one` for partial component renders.

**Stress testing** (`stress-test.mjs`): Uses Playwright + Chrome DevTools Protocol to measure Core Web Vitals (LCP, CLS, TBT), detect layout shifts per page, run Slow 3G / Fast 3G throttling, rapid navigation stress, broken UI detection, and mobile viewport testing.

---

## CI/CD

Two GitHub Actions workflows in `.github/workflows/`:

| Workflow | Trigger | Steps |
|---|---|---|
| `ci.yml` | Push or PR to `main` | Checkout → Node 24.19.0 → npm 12.0.2 → `npm ci` → `npm run lint` → `npm run typecheck` → `npm run build` → `npm run test:run` |
| `deploy.yml` | Push to `main` or manual dispatch | Build and test with Node 24.19.0/npm 12.0.2 → upload `build/` → deploy through official GitHub Pages actions |

GitHub Pages must use **Settings → Pages → Build and deployment → Source: GitHub Actions**. This replaces legacy `gh-pages` branch publishing; no manual `npm run deploy` command remains.

---

## Known Limitations

- Client-rendered SPA — no SSR or SSG. `index.html` still ships baseline metadata for non-JS crawlers; JS clients get per-route tags from `RouteMeta`.
- `color-contrast` axe rule is disabled in tests (jsdom cannot compute styles); contrast is verified via `ThemeRegistry` ratio checks instead.
- GitHub Pages cannot set CSP or clickjacking response headers. Details are in `security_best_practices_report.md`.
