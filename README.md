# Ahmad Mujtaba — GenAI Engineer Portfolio

> A content-driven React SPA that presents enterprise AI systems with the same rigor they were built: structured data, WCAG-verified theming, route-level code splitting, and 147 automated tests across rendering, behavior, navigation, accessibility, and contrast compliance.

**Live** — [pypi-ahmad.github.io](https://pypi-ahmad.github.io)

---

## Overview

This is not a portfolio template. It is a single-page application engineered to give recruiters a fast, high-signal view of production AI work — and to give engineers a codebase where content, theming, routing, and rendering are cleanly separated.

All portfolio content lives in 10 data modules under `src/data/`, re-exported through a single barrel (`src/portfolio.js`). Pages import data and render it through a themed, animated, accessibility-tested component tree. Most updates are data edits — no component rewrites required.

### At a Glance

| Dimension | Detail |
|---|---|
| Routes | 9 entries, 8 lazy-loaded page modules via `React.lazy` + `Suspense` |
| Theme engine | 32 families × 2 modes = 64 resolved themes, WCAG 4.5:1 enforced |
| Data layer | 10 modules barrel-exported through `src/portfolio.js` |
| Platform catalog | 20 AI systems (10 GenAI + 5 LangGraph + 5 CrewAI) |
| Case studies | 8 deep-dive systems (4 featured, 4 supporting) with modal drill-downs |
| Open-source projects | 3 repository tiles |
| Test suite | 12 files, 147 tests — rendering, behavior, navigation, a11y, contrast |
| Deployment | GitHub Pages (`gh-pages`) and Vercel-compatible static output |

---

## Features

### Content Architecture

- **Home** composes `Header → Greeting → SystemShowcase → SystemThinking → Skills → Footer`.
- **Projects** is the densest page, combining three data surfaces:
  - `platform.js` — 20-system Agentic AI Platform catalog rendered as `ProductTile` with modal deep-dives
  - `systems.js` — 8 enterprise case studies rendered as `SystemCard` with expandable architecture diagrams
  - `projects.js` — 3 open-source `ProjectCard` tiles linking directly to repositories
- **Education** renders degrees and 9 certifications from data objects, including PDF downloads and verification links.
- **Experience** renders 3 work entries (Deloitte, Cognizant, AiEnsured) through an accordion with reusable experience cards.
- **Skills** displays 6 categorized skill sections with Iconify icons on the full page, and 3 home-page summary categories.
- **Contact** and **social links** are fully configurable from data files without touching component code.

### Theme Engine

The theme system is the most technically dense subsystem in the codebase:

- **32 theme families** — each providing light and dark variants for 64 total resolved themes.
- **`createThemeTokens()`** derives ~40 semantic tokens (`accentSolid`, `accentGradient`, `heroGradient`, `cardBackgroundAlt`, `borderSoft`, `shadowColor`, etc.) from a smaller set of raw family tokens.
- **`ensureContrast()`** enforces WCAG 4.5:1 minimum contrast. It iteratively mixes the foreground color toward a readable fallback until the ratio passes, using proper WCAG relative luminance calculation (`hexToRgb` → `getRelativeLuminance` → `getContrastRatio`).
- **Immersive tokens** — select themes define custom `surfaceRadius`, `accentFontFamily`, `headerSurface`, `heroPattern`, `panelGlow`, and `buttonGlow` for high-identity visual experiences.
- **Persistence** — theme selection stored as `{ family, mode }` JSON in `localStorage`. Legacy string values (`"light"` / `"dark"`) are normalized on read.
- **Transitions** — theme changes apply CSS variable transitions via `--theme-transition-colors` (300ms ease-in-out) and a 300ms root opacity fade (`fadeAndApply` → `.theme-fading` class).

### Interaction & Animation

- Framer Motion entrance animations use `viewport={{ once: true }}` — elements animate in on first scroll, then stay.
- `MotionConfig reducedMotion="user"` at the root respects the OS `prefers-reduced-motion` preference.
- System cards open ARIA-compliant modal dialogs (`role="dialog"`, `aria-modal="true"`) with overlay-click and close-button dismissal.
- The custom animated cursor activates only when `settings.useCustomCursor` is true and `matchMedia("(pointer: fine)")` reports a precise pointer.
- Hero section validates resume/cover-letter links with a `HEAD` request before opening them.
- Root `ErrorBoundary` catches render-time exceptions and displays a recovery screen with a refresh button.

### Accessibility & Quality Assurance

- **axe-core scans** run in `Accessibility.test.jsx` against Header, Footer, Greeting, ExperienceCard, and ThemePage.
- **Contrast verification** — `ThemeRegistry.test.jsx` checks text contrast ratios (≥7:1 for primary text, ≥4.5:1 for secondary) across registered theme families.
- **`renderWithProviders()`** mirrors the production provider stack in tests: `BrowserRouter` + `ThemeControllerProvider` + `MotionConfig`.
- **Known exception** — the Header's toggle button sits as a direct child of `<ul>` instead of inside an `<li>`, producing a `list` rule violation that is documented and disabled in accessibility tests.
- **`stress-test.mjs`** uses Playwright + Chrome DevTools Protocol to measure Core Web Vitals, detect layout shifts, and test behavior under Slow 3G/Fast 3G network throttling.

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| UI framework | React, React DOM | 18.3.1 |
| Build toolchain | Vite | 8.0.3 |
| Routing | React Router DOM | 6.30.3 |
| Styling | styled-components | 6.3.8 |
| Animation | Framer Motion | 12.34.3 |
| UI library | React Bootstrap | 2.10.10 |
| Icons | react-icons + Font Awesome 5 + Iconify (CDN) | react-icons 4.12.0 |
| Custom cursor | react-animated-cursor | 2.11.2 |
| Analytics | react-ga4 (disabled until GA4 ID configured) | 2.1.0 |
| Web vitals | web-vitals | 3.5.2 |
| Testing | Vitest + @testing-library/react + jsdom + jest-axe + axe-core | Vitest 4.0.18, jsdom 28.1.0 |
| Stress testing | Playwright (CDP) | 1.58.2 |
| Build plugins | `@vitejs/plugin-react`, `vite-plugin-svgr`, `vite-plugin-env-compatible` | — |
| Deployment | gh-pages, Vercel | — |
| Node runtime | Node.js | `>=20.19.0 <21` |

---

## Architecture

### Provider Stack

The app mounts a small, explicit provider chain:

```
index.html
  └─ src/index.jsx  (createRoot)
       └─ <App />
            └─ <ErrorBoundary>
                 └─ <ThemeControllerProvider>
                      └─ <ThemeProvider theme={resolvedTheme}>   ← styled-components
                           └─ <MotionConfig reducedMotion="user">
                                ├─ <GlobalStyles />              ← CSS custom properties
                                ├─ <AnimatedCursor />            ← conditional (desktop + setting)
                                └─ <Main theme={resolvedTheme} />
                                     └─ <BrowserRouter>
                                          └─ <Suspense>
                                               └─ <Routes> ... </Routes>
```

- **`ErrorBoundary`** — class component, catches render-time exceptions, offers a refresh button.
- **`ThemeControllerProvider`** — reads localStorage, normalizes selection, resolves theme object, exposes `setThemeFamily` / `setMode` / `toggleMode` via context.
- **`GlobalStyles`** — injects ~30 CSS custom properties (`--text`, `--card`, `--border`, `--accent-solid`, `--shadow-sm`, `--glow-accent`, `--page-gutter`, `--heading-font-family`, etc.) onto `body`, plus universal box-sizing and color transitions on every element.

### Data Flow

```
src/data/*.js  →  src/portfolio.js (barrel)  →  pages / containers / components  →  themed UI
```

Content is static JavaScript objects, not fetched from a CMS. The 10 data modules:

| Module | Content |
|---|---|
| `settings.js` | Splash toggle, custom cursor toggle, Google Analytics ID |
| `greeting.js` | Hero title, subtitle, 4 signal bullets, philosophy statement, resume/cover links |
| `socialMedia.js` | GitHub, LinkedIn, Gmail, Telegram, Discord (set link to `" "` to hide) |
| `skills.js` | 6-category skills page data + 3-category home summary |
| `education.js` | 2 degrees + 9 certifications with PDF and verification links |
| `experience.js` | 3 work entries with structured bullet descriptions |
| `projects.js` | 3 open-source project tiles |
| `contact.js` | Contact page heading + blog CTA |
| `systems.js` | 8 deep-dive systems (4 featured + 4 supporting) with `get data()` accessor |
| `platform.js` | 20 platform systems + infrastructure metadata + category groupings |

### Route Map

`src/containers/Main.jsx` lazy-loads 8 page modules via `React.lazy` and maps them to 9 routes:

| Path | Module | Notes |
|---|---|---|
| `/` | `Splash` or `Home` | Conditional on `settings.isSplash` (currently `false`) |
| `/home` | `HomeComponent` | Hero, systems, skills |
| `/experience` | `Experience` | Work history accordion |
| `/education` | `EducationComponent` | Degrees + certifications |
| `/contact` | `ContactComponent` | Contact links + blog CTA |
| `/splash` | `Splash` | Standalone splash route |
| `/projects` | `Projects` | Platform catalog + systems + OSS projects |
| `/skills` | `SkillsPage` | Full 6-category skills grid |
| `/theme` | `ThemePage` | 32-family gallery + light/dark toggle |

`Suspense` fallback is a blank `div` with `minHeight: 100vh` — no loading skeleton.

### Theme Resolution Pipeline

```
localStorage('theme')
  → parseStoredThemeSelection()     // handle null, legacy "dark"/"light" strings, JSON
  → normalizeThemeSelection()       // validate family exists, mode is light|dark
  → resolveTheme({ family, mode })  // look up themes[family][mode], fallback to default dark
  → createThemeTokens()             // derive ~40 semantic tokens from raw family tokens
  → ensureContrast()                // WCAG 4.5:1 enforcement on secondaryText
  → <ThemeProvider>                 // styled-components injects theme object
  → <GlobalStyles />                // maps tokens to CSS custom properties
```

- `DEFAULT_THEME_FAMILY` = `"default"`, `DEFAULT_THEME_MODE` = `"dark"`.
- `ensureContrast()` mixes foreground toward a readable fallback in 4% increments until `getContrastRatio() >= 4.5`.
- `fadeAndApply()` adds `.theme-fading` (opacity 0.92) to `#root` for 300ms during theme transitions.

### Projects Page Composition

The densest page in the app, rendering five sequential sections:

1. **Page header** — `projectsHeader` title and description
2. **Agentic AI Platform** — `platformHeader` + `platformInfrastructure` (shared architecture, tech stack, features) + `platformCategories` (10 GenAI + 5 LangGraph + 5 CrewAI systems as `ProductTile`)
3. **Enterprise Systems** — `systems.data` (8 entries as `SystemCard` with expandable deep-dive modals containing problem statement, solution, architecture diagram, tech stack, implementation details, challenges, and impact metrics)
4. **Open Source Projects** — `projects.data` (3 entries as `ProjectCard`)
5. **GitHub CTA** — link to the profile

---

## Project Structure

```
src/
├── index.jsx                 # createRoot entry point
├── App.jsx                   # Provider stack: ErrorBoundary → Theme → Motion → GlobalStyles
├── App.css                   # Minimal app-level styles
├── index.css                 # 8 @font-face declarations, scrollbar, responsive breakpoints
├── global.js                 # GlobalStyles — ~30 CSS custom properties, universal transitions
├── theme.js                  # 32 theme families, createThemeTokens(), ensureContrast()
├── themeController.jsx       # ThemeControllerProvider, localStorage persistence, context API
├── themeMotion.js            # Reusable transition strings for themed surfaces
├── portfolio.js              # Barrel re-export of all 10 data modules
│
├── data/                     # Pure data — no JSX, no side effects
│   ├── settings.js           # Splash, cursor, GA toggles
│   ├── greeting.js           # Hero content, bullets, philosophy
│   ├── experience.js         # 3 work entries
│   ├── education.js          # 2 degrees + 9 certifications
│   ├── skills.js             # 6-category full page + 3-category home summary
│   ├── projects.js           # 3 OSS project tiles
│   ├── systems.js            # 8 deep-dive case studies (4 featured + 4 supporting)
│   ├── platform.js           # 20 platform systems across 3 paradigms
│   ├── contact.js            # Contact page and blog CTA
│   └── socialMedia.js        # Social links and descriptions
│
├── containers/               # Layout wrappers and section-level composition
│   ├── Main.jsx              # BrowserRouter, Suspense, route definitions
│   ├── greeting/             # Hero section with illustration
│   ├── SystemShowcase/       # Featured system on home page
│   ├── SystemThinking/       # AI methodology visualization
│   ├── skills/               # Home-page skills preview
│   ├── experienceAccordion/  # Expandable work history
│   ├── education/            # Degree + certification layout
│   └── certifications/       # Certification card grid
│
├── components/               # Reusable, self-contained UI pieces
│   ├── header/               # Navigation bar (6 NavLinks + logo + theme toggle)
│   ├── footer/               # "Made with ❤️" attribution
│   ├── ErrorBoundary.jsx     # Root error boundary
│   ├── SystemDesign/         # SystemCard, ProductTile, SystemDiagram
│   ├── ProjectCard/          # Compact repo card (3-line clamp)
│   ├── experienceCard/       # Work entry card
│   ├── degreeCard/           # Degree card
│   ├── certificationCard/    # Certification card with PDF link
│   ├── softwareSkills/       # Iconify-backed skill icon grid
│   ├── socialMedia/          # Social link buttons
│   └── icons/                # Custom SVG icon components
│
├── pages/                    # Route-level page components (lazy-loaded)
│   ├── home/                 # HomeComponent
│   ├── experience/           # Experience
│   ├── education/            # EducationComponent
│   ├── projects/             # Projects (platform + systems + OSS)
│   ├── skills/               # SkillsPage
│   ├── contact/              # ContactComponent
│   ├── splash/               # Splash screen
│   └── theme/                # ThemePage (gallery + toggle)
│
├── __tests__/                # 12 test files, 147 tests
│   ├── Accessibility.test.jsx
│   ├── Behavior.test.jsx
│   ├── Navigation.test.jsx
│   ├── Responsive.test.jsx
│   ├── ThemeRegistry.test.jsx
│   ├── Pages.render.test.jsx
│   ├── Greeting.render.test.jsx
│   ├── Header.render.test.jsx
│   ├── Footer.render.test.jsx
│   ├── ExperienceCard.render.test.jsx
│   └── SystemCard.render.test.jsx
│
└── test/
    ├── setup.js              # IntersectionObserver, matchMedia, ResizeObserver mocks
    └── testUtils.jsx          # renderWithProviders (Router + Theme + Motion)

stress-test.mjs               # Playwright + CDP: CWV, Slow/Fast 3G, layout shift detection
vite.config.js                # Vite 8 — port 3000, React plugin, svgr, env-compatible
vitest.config.js              # jsdom, 15s timeout, setup file
vercel.json                   # Vercel static deployment config
```

---

## Setup & Installation

### Prerequisites

- **Node.js** `>=20.19.0 <21`
- **npm**

### Install

```bash
git clone https://github.com/pypi-ahmad/pypi-ahmad.github.io.git
cd pypi-ahmad.github.io
npm install
```

### Development Server

```bash
npm run dev
```

Opens `http://localhost:3000` automatically. Uses `/` as the base path for GitHub user pages compatibility.

### Production Build

```bash
npm run build
```

1. Runs `vite build` targeting `es2020`+ browsers
2. Writes code-split chunks to `build/`
3. Copies `build/index.html` → `build/404.html` for SPA routing on GitHub Pages

### Preview Build Locally

```bash
npm run preview
```

Serves the `build/` directory on `http://localhost:4173`.

---

## Usage

### Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start Vite dev server (port 3000, HMR) |
| `npm run build` | Production build → `build/` |
| `npm run preview` | Preview production build locally |
| `npm run deploy` | Build + publish to GitHub Pages via `gh-pages` |
| `npm test` | Vitest in watch mode |
| `npm run test:run` | Full test suite (single run) |
| `npm run test:coverage` | Test suite with coverage report |
| `node stress-test.mjs` | Playwright stress test (requires `npm run preview` running) |

### Editing Content

All portfolio content lives in `src/data/`. No component code changes needed for content updates:

| File | Controls |
|---|---|
| `settings.js` | Splash screen, custom cursor, GA4 tracking ID |
| `greeting.js` | Hero title, subtitle, signal bullets, philosophy, resume/cover links |
| `experience.js` | Work history entries and bullet points |
| `education.js` | Degrees and certifications (with PDF and verification links) |
| `skills.js` | Home-page summary (3 categories) and full-page grid (6 categories) |
| `projects.js` | Open-source project tiles |
| `systems.js` | Enterprise AI case studies (4 featured + 4 supporting) |
| `platform.js` | 20-system Agentic AI Platform catalog |
| `socialMedia.js` | GitHub, LinkedIn, email, Telegram, Discord (set to `" "` to hide) |
| `contact.js` | Contact page heading and blog CTA |

### Adding a Theme Family

1. Define light and dark token objects in `src/theme.js` using `createThemeFamily(name, lightTokens, darkTokens)`
2. Add the family to the `themeFamilies` object
3. Add an entry to `themeFamilyOptions` array: `{ value: "my-theme", label: "My Theme" }`

The Theme page gallery picks it up automatically. `ensureContrast()` guarantees WCAG compliance for any color combination.

### Adding a System Case Study

Add an entry to `systems.featured` or `systems.supporting` in `src/data/systems.js`:

```js
{
  id: "unique_id",
  name: "System Name",
  tagline: "One-line positioning",
  category: "Category · Domain",
  tier: "featured",  // or "supporting"
  metrics: ["Key metric 1", "Key metric 2"],
  description: "...",
  problem_statement: "...",
  solution_overview: "...",
  architecture: ["Step 1", "Step 2", "..."],
  tech: ["Python", "FastAPI", "..."],
  key_features: ["..."],
  implementation_details: "...",
  challenges_solutions: [{ challenge: "...", solution: "..." }],
  impact: ["..."]
}
```

The `SystemCard` component handles rendering, modal expansion, and architecture diagram visualization.

---

## Testing

### Test Categories

| Test File | What It Verifies |
|---|---|
| `ThemeRegistry.test.jsx` | Contrast ratios (≥7:1 primary, ≥4.5:1 secondary) across theme families |
| `Accessibility.test.jsx` | Semantic HTML, ARIA attributes, axe-core WCAG 2.1 AA scans |
| `Behavior.test.jsx` | Theme persistence, gallery interaction, modal open/close, CTA behavior |
| `Navigation.test.jsx` | Route resolution, NavLink navigation, logo click redirect |
| `Responsive.test.jsx` | Hamburger menu structure, viewport-dependent layout |
| `Pages.render.test.jsx` | Page-level smoke renders for all routes |
| `*.render.test.jsx` | Component-level render verification (Greeting, Header, Footer, ExperienceCard, SystemCard) |

### Test Infrastructure

- **`src/test/setup.js`** mocks `IntersectionObserver` (Framer Motion `whileInView`), `matchMedia` (`pointer:fine` detection), `scrollTo`, and `ResizeObserver` for jsdom.
- **`src/test/testUtils.jsx`** provides `renderWithProviders()` — wraps components in the same provider stack as production: `BrowserRouter` + `ThemeControllerProvider` + `MotionConfig`.
- **Known axe exceptions**: `color-contrast` (jsdom cannot compute styles), `region` / `page-has-heading-one` (partial component rendering), `list` (Header toggle button as direct `<ul>` child — documented as a known issue).

### Current Results

```
Test Files  12 passed (12)
     Tests  147 passed (147)
```

---

## Limitations

- **No SSR / SSG** — the app is a client-rendered SPA. There is no server-side rendering or static site generation, so initial page load depends entirely on JavaScript execution.
- **No loading skeletons** — `Suspense` fallback is a blank `div`. Users see an empty viewport briefly while lazy-loaded chunks download.
- **jsdom contrast testing gap** — `color-contrast` axe rules are disabled in tests because jsdom does not compute CSS styles. Contrast is verified via manual `ThemeRegistry` ratio checks instead.
- **Header list semantics** — the theme toggle `<button>` is a direct child of the navigation `<ul>` instead of being wrapped in `<li>`, violating the HTML `list` rule. Documented in accessibility tests.
- **No i18n** — all content is English-only with no internationalization infrastructure.
- **Static data** — portfolio content is hardcoded JavaScript. There is no CMS, API, or build-time content pipeline.
- **No offline support** — no service worker or caching strategy for offline access.

---

## Future Improvements

- Add route-level loading skeletons to replace the blank `Suspense` fallback
- Fix the Header `<ul>` / `<button>` list semantics violation
- Enable the `color-contrast` axe rule with a CSS-in-JS style computation shim
- Add build-time sitemap and open-graph meta generation for SEO
- Implement a service worker for offline caching of static assets
- Add visual regression testing via Playwright screenshot comparisons
- Explore ISR/SSG via a framework like Next.js or Astro for improved initial load performance
