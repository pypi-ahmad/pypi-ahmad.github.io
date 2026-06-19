# Ahmad Mujtaba — Portfolio

React single-page application for presenting professional experience, AI projects, and skills. Most portfolio content is maintained through plain JavaScript data modules in `src/data/`.

- **Live** — [my-portfolio-green-ten-63.vercel.app](https://my-portfolio-green-ten-63.vercel.app/)
- **Repo** — [github.com/pypi-ahmad/pypi-ahmad.github.io](https://github.com/pypi-ahmad/pypi-ahmad.github.io)

---

## Overview

| Aspect | Detail |
|---|---|
| Routes | 9 paths, 8 lazy-loaded page modules (`React.lazy` + `Suspense`) |
| Themes | 32 families × 2 modes (light/dark) = 64 resolved themes |
| Data layer | 10 modules barrel-exported through `src/portfolio.js` |
| Tests | 12 files, 147 tests (rendering, behavior, navigation, accessibility, contrast) |
| CI/CD | GitHub Actions — build + test on push/PR; automated GitHub Pages deploy on push to main |
| Hosting | Vercel (via `vercel.json`) and GitHub Pages (via `peaceiris/actions-gh-pages`) |

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI | React 18, React Bootstrap, styled-components |
| Build | Vite 8, `@vitejs/plugin-react`, `vite-plugin-svgr` |
| Routing | React Router DOM 6 |
| Animation | Framer Motion |
| Icons | react-icons, Font Awesome 5, Iconify (CDN) |
| Analytics | react-ga4 (disabled until a GA4 ID is configured in `settings.js`) |
| Testing | Vitest, @testing-library/react, jsdom, jest-axe, axe-core |
| Stress testing | Playwright (Chrome DevTools Protocol) |
| Node | `>=20.19.0 <21` |

---

## Pages and Routes

Defined in `src/containers/Main.jsx`. All page modules are lazy-loaded.

| Path | Page | Content |
|---|---|---|
| `/` | Home (or Splash) | Hero, system showcase, skills summary. Splash is toggled via `settings.isSplash`. |
| `/home` | Home | Same as `/` when splash is off |
| `/experience` | Experience | Work history accordion (3 entries) |
| `/education` | Education | 2 degrees, 9 certifications with PDF/verification links |
| `/contact` | Contact | Contact links, blog CTA |
| `/projects` | Projects | Platform catalog (20 systems), enterprise case studies (8), open-source projects (4) |
| `/skills` | Skills | 6-category skill grid with Iconify icons |
| `/theme` | Theme | 32-family theme gallery with light/dark toggle |
| `/splash` | Splash | Standalone splash screen |

---

## Data Architecture

All portfolio content lives in `src/data/` as plain JavaScript objects, re-exported through `src/portfolio.js`. No CMS or API — content updates are file edits.

| Module | Content |
|---|---|
| `settings.js` | Splash toggle, custom cursor toggle, Google Analytics ID |
| `greeting.js` | Hero title, subtitle, signal bullets, philosophy, resume/cover links |
| `socialMedia.js` | GitHub, LinkedIn, Gmail, Telegram, Discord (set link to `" "` to hide) |
| `skills.js` | 6-category skills page + 3-category home summary |
| `education.js` | 2 degrees + 9 certifications |
| `experience.js` | 3 work entries with structured bullet descriptions |
| `projects.js` | 4 open-source project tiles |
| `contact.js` | Contact page heading + blog CTA |
| `systems.js` | 8 enterprise case studies (4 featured + 4 supporting) |
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
├── ci.yml                  # Build + test on push/PR to main
└── deploy.yml              # Build, test, deploy to GitHub Pages on push to main

src/
├── index.jsx               # createRoot entry point
├── App.jsx                 # Provider stack: ErrorBoundary → Theme → Motion → GlobalStyles
├── global.js               # GlobalStyles — CSS custom properties
├── theme.js                # 32 theme families, createThemeTokens(), ensureContrast()
├── themeController.jsx     # ThemeControllerProvider, localStorage persistence, context API
├── themeMotion.js          # Reusable transition strings for themed surfaces
├── portfolio.js            # Barrel re-export of all 10 data modules
│
├── data/                   # Pure data modules — no JSX, no side effects
├── containers/             # Layout wrappers and section-level composition
│   └── Main.jsx            # BrowserRouter, Suspense, route definitions
├── components/             # Reusable UI: header, footer, cards, modals, icons
├── pages/                  # Route-level page components (lazy-loaded)
└── __tests__/              # 12 test files

stress-test.mjs             # Playwright + CDP: Core Web Vitals, network throttling, layout shift detection
vite.config.js              # Vite 8 config — port 3000, React plugin, svgr, env-compatible
vitest.config.js            # jsdom environment, 15s timeout
vercel.json                 # Vercel static deployment config
```

---

## Setup

### Prerequisites

- **Node.js** `>=20.19.0 <21`
- **npm**

### Install and run

```bash
git clone https://github.com/pypi-ahmad/pypi-ahmad.github.io.git
cd pypi-ahmad.github.io
npm install
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
| `npm run deploy` | Build + publish to GitHub Pages via `gh-pages` (manual; CI handles this automatically) |
| `npm test` | Vitest in watch mode |
| `npm run test:run` | Full test suite (single run) |
| `npm run test:coverage` | Test suite with coverage report |
| `node stress-test.mjs` | Playwright stress test (requires `npm run preview` running) |

---

## Testing

12 test files, 147 tests. Run with `npm run test:run`.

| Test File | Scope |
|---|---|
| `ThemeRegistry.test.jsx` | Contrast ratios (≥7:1 primary, ≥4.5:1 secondary) across all theme families |
| `Accessibility.test.jsx` | Structural accessibility checks for Header, Greeting, ExperienceCard, and ThemePage, plus axe-core scans on Header, Footer, and Greeting |
| `Behavior.test.jsx` | Theme persistence, gallery interaction, modal open/close, CTA behavior |
| `Navigation.test.jsx` | Route resolution, NavLink navigation, logo redirect |
| `Responsive.test.jsx` | Hamburger menu structure, viewport-dependent layout |
| `Pages.render.test.jsx` | Page-level smoke renders for all routes |
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
| `ci.yml` | Push or PR to `main` | Checkout → Node 20.19.0 → `npm ci` → `npm run build` → `npm run test:run` |
| `deploy.yml` | Push to `main` | Same as CI, then deploys `build/` to GitHub Pages via `peaceiris/actions-gh-pages@v4` |

---

## Known Limitations

- Client-rendered SPA — no SSR or SSG.
- `Suspense` fallback is a blank `div` (no loading skeleton).
- `color-contrast` axe rule is disabled in tests (jsdom cannot compute styles); contrast is verified via `ThemeRegistry` ratio checks instead.
