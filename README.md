<div align="center">

<img src="logo192.png" width="96" alt="Portfolio logo" />

# Ahmad Mujtaba: Applied AI portfolio

**GitHub:** [github.com/pypi-ahmad/pypi-ahmad.github.io](https://github.com/pypi-ahmad/pypi-ahmad.github.io)

[![CI](https://github.com/pypi-ahmad/pypi-ahmad.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/pypi-ahmad/pypi-ahmad.github.io/actions/workflows/ci.yml)
[![Deploy](https://github.com/pypi-ahmad/pypi-ahmad.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/pypi-ahmad/pypi-ahmad.github.io/actions/workflows/deploy.yml)
[![Release](https://img.shields.io/github/v/release/pypi-ahmad/pypi-ahmad.github.io)](https://github.com/pypi-ahmad/pypi-ahmad.github.io/releases/latest)
[![Node.js](https://img.shields.io/badge/Node.js-24.21.0-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![npm](https://img.shields.io/badge/npm-12.0.2-CB3837?logo=npm&logoColor=white)](https://www.npmjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

A responsive React 19 and Vite 8 portfolio for Ahmad Mujtaba, an Applied AI Engineer. It presents qualified work outcomes, 13 public projects, professional experience, education, and technical skills. One consistent visual theme supports light and dark modes. The site has no backend, database, or authentication. GitHub Actions deploys the static build to GitHub Pages after each push to `main`.

## Table of Contents

- [Demo](#demo)
- [Welcome](#welcome)
- [Disclaimer](#disclaimer)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Commands](#commands)
- [How It Works](#how-it-works)
- [Routes](#routes)
- [Configuration](#configuration)
- [Testing and Quality](#testing-and-quality)
- [Deployment](#deployment)
- [Documentation](#documentation)

---

## Demo

| | |
| --- | --- |
| **Live site** | [pypi-ahmad.github.io](https://pypi-ahmad.github.io/) |
| **Vercel mirror** | [my-portfolio-green-ten-63.vercel.app](https://my-portfolio-green-ten-63.vercel.app/) |
| **Repository** | [github.com/pypi-ahmad/pypi-ahmad.github.io](https://github.com/pypi-ahmad/pypi-ahmad.github.io) |

## Welcome

This project is **free**, MIT-licensed, and community-driven. Clone it, run it locally, file bugs, suggest features, or send pull requests — all are welcome.

**Please do not send money.** Donations and sponsorship are not needed or wanted. A useful issue or a well-tested PR is more than enough.

## Disclaimer

> [!CAUTION]
> **All data you enter, display, or process through this application is 100% your responsibility.** This includes any content you put in `src/data/`, any Google Analytics ID you configure, and any credentials you add to your environment. Do not commit API keys or tokens to version control — Vite bundles client code for public delivery.

Software is provided **as is**, without warranty. Full text: [DISCLAIMER.md](DISCLAIMER.md)

## Features

**Content pages**

- Professional profile, experience timeline, education, degrees, certifications, skills catalog, and contact page.
- Homepage with qualified internal outcomes, contribution boundaries, and four selected projects.
- 13 public projects with configured GitHub repository links.

**Theming**

- One visual theme with light and dark modes plus selectable pink, blue, and pink-indigo accents.
- Mode and accent selections persist independently in `localStorage`; older family-and-mode values migrate automatically.

**UX and accessibility**

- Responsive navigation disclosure, project and contact grids, experience cards, and credential groups.
- Brief hero entrance, once-per-mount scroll reveals, and fine-pointer hover feedback.
- Reduced-motion support, including preference changes while browsing; native browser cursor by default.
- Lazy-loaded routes with visible, politely announced loading feedback and a catch-all 404 page.
- Route focus management, a focused error-recovery heading with Refresh, and a contact empty state.

**SEO and metadata**

- Route-level `<title>`, `<meta description>`, canonical URL, `robots`, Open Graph, and Twitter Card tags via `react-helmet-async`.
- `ProfilePage` structured data with Ahmad Mujtaba as its main `Person` entity.
- `public/sitemap.xml` and `public/robots.txt` included.

**Quality**

- Tests cover rendering, navigation, theming, accessibility, content contracts, and route metadata.
- Automated lint, typecheck, build, and test on every push and pull request to `main`.
- Optional Google Analytics 4 integration, disabled by default.

## Tech Stack

| Area | Technology |
| --- | --- |
| UI | React 19, styled-components v6 |
| Routing | React Router DOM 7 |
| Build | Vite 8, `@vitejs/plugin-react` |
| Animation | Framer Motion v13 and CSS; optional cursor package disabled by default |
| Metadata | react-helmet-async |
| Icons and images | react-icons v5 and static PNG/SVG assets in `public/` |
| Analytics | react-ga4 |
| Testing | Vitest 5, Testing Library 16, jsdom, jest-axe, axe-core |
| Browser testing | Playwright, Chrome DevTools Protocol |
| Quality | ESLint 10, TypeScript 7 (`checkJs: false`), Prettier |
| Runtime | Node.js `>=24.21.0 <25`, npm `>=12.0.2 <13` |
| Hosting | GitHub Pages (primary), Vercel (mirror) |

## Project Structure

```text
.
├── .github/
│   ├── ISSUE_TEMPLATE/            # Bug report and feature request templates
│   ├── PULL_REQUEST_TEMPLATE.md   # PR checklist and quality gate
│   └── workflows/
│       ├── ci.yml                 # Lint, typecheck, coverage, and Chromium browser checks on push/PR
│       └── deploy.yml             # GitHub Pages deployment on push to main
├── dev/                           # Isolated browser review pages; development-only
├── docs/
│   ├── architecture.md            # Current runtime and safe change map
│   ├── codebase/                  # Detailed contributor references
│   └── migration/
│       └── astro-migration-roadmap.md  # Retired Astro migration planning record
├── public/                        # Static assets, favicon, manifest, sitemap, robots
├── scripts/                       # Browser, recovery, motion, and parity checks
├── src/
│   ├── __tests__/                 # Rendering, a11y, navigation, content contracts
│   ├── components/                # Reusable cards, navigation, icons, and SEO
│   ├── containers/
│   │   └── Main.jsx               # Route definitions, lazy loading, RouteMeta, 404
│   ├── data/                      # Portfolio content — edit these to customise
│   ├── pages/                     # Lazy-loaded route-level page components
│   ├── test/                      # Shared Vitest setup and render helpers
│   ├── App.jsx                    # Error/theme providers, motion policy, analytics initialization
│   ├── index.jsx                  # React DOM entry point
│   ├── portfolio.js               # Barrel re-export of all src/data/* modules
│   ├── theme.js                   # Light/dark semantic tokens and accent variants
│   └── themeController.jsx        # Mode/accent state, persistence, and provider
├── index.html                     # Vite HTML entry point and baseline metadata
├── stress-test.mjs                # Playwright performance and resilience checks
├── vite.config.js                 # Dev server (port 3000) and production build config
├── vitest.config.js               # jsdom test environment configuration
├── vercel.json                    # Vercel static deployment configuration
└── package.json                   # Scripts, dependencies, and Node/npm version pins
```

## Getting Started

### Prerequisites

- Node.js `24.21.0` — `.nvmrc` contains the pin; run `nvm use` or install manually
- npm `12.0.2`
- Git

### Install

```bash
git clone https://github.com/pypi-ahmad/pypi-ahmad.github.io.git
cd pypi-ahmad.github.io
npm install --global npm@12.0.2
npm ci
```

### Start the development server

```bash
npm run dev
```

Vite opens the site at [http://localhost:3000](http://localhost:3000) with hot-module replacement.

### Create a production build

```bash
npm run build
```

Output goes to `build/`. The build script copies `build/index.html` to `build/404.html` for GitHub Pages route recovery and creates `build/<route>/index.html` for `/home`, `/experience`, `/education`, `/contact`, `/splash`, `/projects`, and `/skills`.

### Preview the production build locally

```bash
npm run preview
# serves http://localhost:4173
```

Open the printed URL in your browser. Use `-- --strictPort` with either server
command when running browser scripts that expect fixed ports 3000 and 4173.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Vite development server on port 3000 |
| `npm run start` | Alias for the Vite development server |
| `npm run build` | Build production assets into `build/` |
| `npm run preview` | Preview the production build on port 4173 |
| `npm run lint` | Run ESLint across JavaScript and JSX source files |
| `npm run typecheck` | Run TypeScript static checks without emitting files |
| `npm test` | Start Vitest in watch mode |
| `npm run test:run` | Run the complete test suite once |
| `npm run test:coverage` | Run tests, generate V8 coverage, and enforce global thresholds |

Browser scripts require Chromium: run `npx playwright install chromium` once.
To run the browser stress test, build first and start the preview server, then in a second terminal:

```bash
node stress-test.mjs
```

The focused motion check exits nonzero on failed assertions. With a production preview at `http://127.0.0.1:4173`, run:

```bash
node scripts/check-motion.mjs
```

It checks routes, desktop/mobile layouts, keyboard focus, reduced motion, theme changes, and navigation. Screenshots and three cold-load measurements per viewport are saved to an OS temp directory printed at completion. Capture an unchanged build with `--baseline`, then run the changed build with `--compare <baseline-report.json>` to check content/link preservation and the 5 KiB initial-JavaScript gzip budget. The focused `scripts/check-frontend.mjs` browser and accessibility check runs in CI; this performance-comparison script remains local-only.

### Motion policy

`src/themeMotion.js` owns shared entrances: 400 ms with 14 px vertical travel on desktop, 60 ms stagger capped at 180 ms, and once-per-mount viewport reveals. Mobile uses a 250 ms opacity-only entrance without stagger. Primary page headings remain outside entrance animations.

`src/global.js` keeps focused and printed content visible and overrides motion immediately when the browser's reduced-motion preference changes. Home's two CSS accent shapes settle after 3.6 seconds; they stay static on mobile and under reduced motion. The animation uses existing dependencies and local CSS, with no video generation, media downloads, or API key.

## How It Works

```text
index.html
   └── src/index.jsx           React DOM entry point
         └── App.jsx           Installs: ErrorBoundary, ThemeControllerProvider,
                               MotionConfig, GlobalStyles, optional cursor;
                               initializes analytics when configured
               └── Main.jsx    HelmetProvider + BrowserRouter + RouteMeta
                     └── <Lazy page>    renders from src/data/* via portfolio.js
```

**Data flow:** All portfolio content lives as plain JavaScript objects in `src/data/`. Every data module is re-exported through `src/portfolio.js` so pages import from a single barrel. No runtime API, CMS, or build-time data fetching is involved.

**Theme flow:** `themeController.jsx` reads the saved light/dark mode and pink, blue, or pink-indigo accent from separate `localStorage` keys, migrates older family-and-mode values, resolves the matching token set from `src/theme.js`, and passes it through styled-components' `ThemeProvider`. Dark mode and the indigo-to-navy accent are the fallbacks when nothing valid is stored.

**Routing:** `Main.jsx` defines all routes with `React.lazy`. Each route is paired with a `RouteMeta` component that writes the page-specific `<title>`, canonical URL, Open Graph tags, and robots directive into `<head>` via `react-helmet-async`.

Pending routes show a loading landmark and a separate polite status message.
After a different pathname commits, `RouteNavigation` focuses its main landmark.
Initial visits and same-page anchors keep native focus behavior and skip the
application's scroll-to-top action. History and cross-route fragment navigation
also skip that scroll action; a changed pathname still focuses the destination.

**Analytics:** `App.jsx` initializes GA4 once when `AppContent` mounts, but only when `settings.googleTrackingID` is non-empty. The current source does not send explicit route pageview events.

## Routes

| Path | Content |
| --- | --- |
| `/` | Home page, or optional splash page if `isSplash: true` |
| `/home` | Home page |
| `/experience` | Professional experience, contributions, and qualified outcomes |
| `/education` | Degrees, certifications, and courses |
| `/projects` | 13 recent public projects |
| `/skills` | Applied-AI capabilities, project evidence, and curated toolkit |
| `/contact` | Configured contact channels, or an unavailable message with Return home |
| `/splash` | Loading screen that replaces itself with `/home` when ready (marked `noindex`) |
| `*` | Accessible 404 page (marked `noindex`) |

## Configuration

### Feature switches

Global settings live in `src/data/settings.js`:

```js
export const settings = {
  isSplash: false,       // true → show splash page at /
  useCustomCursor: false, // native browser cursor; true opts into the custom cursor
  googleTrackingID: "",  // set a GA4 measurement ID to enable analytics
};
```

> [!NOTE]
> `googleTrackingID` must remain an empty string in the repository. Never commit a real GA4 ID — Vite bundles client code for public delivery.

The splash screen redirects immediately if the document is already loaded, or
on the `load` event. Its three-second timeout is a fallback, not a minimum wait.
Direct `/splash` visits use this behavior regardless of `isSplash`.

### Portfolio content

Update these files to customise the site content without touching any page component:

| File | Content |
| --- | --- |
| `src/data/greeting.js` | Shared identity |
| `src/data/homePage.js` | Homepage hero, outcomes, method, and work areas |
| `src/data/socialMedia.js` | Social and email links |
| `src/data/experience.js` | Employment history |
| `src/data/education.js` | Degrees, certifications, and courses |
| `src/data/projects.js` | Open-source projects (13 entries) |
| `src/data/skills.js` | Skills-page capabilities, proof projects, and curated tools |
| `src/data/contact.js` | Contact-page content |

On Contact, an empty or whitespace-only channel value in `socialMedia.js` hides that channel.
An empty `gmail` value also hides the primary email action. If all channels are
empty, Contact shows an unavailable message and Return home instead of an empty
channel list. These settings control visibility; they do not validate remote URLs.

The first four projects appear on Home. Skills selects evidence projects by exact
name and shares Home's outcome data; preserve qualifiers and keep metrics consistent
with Experience when editing those records.

### Appearance

`src/theme.js` defines one visual identity in light and dark modes with crimson-to-pink, indigo-to-navy, and dark-pink-to-indigo accents. The header provides three accent swatches beside the mode toggle. `src/themeController.jsx` persists mode as `theme=light|dark` and accent as `accent=pink|blue|pink-indigo`, while preserving older stored-mode migration.

## Testing and Quality

The repository test suite covers:

- Page and component rendering
- Navigation and route resolution
- Light/dark and accent persistence, legacy-value migration, and contrast ratios
- Responsive navigation structure
- Project catalog data integrity
- Homepage content and featured-project contracts
- Route metadata, canonical URLs, and `noindex` flags
- Accessibility checks with Testing Library, jest-axe, and axe-core

CI runs on every push and pull request to `main`:

```text
npm ci → lint → typecheck → build → test:coverage → Chromium browser checks
```

Require all CI checks to pass before merging. Whether GitHub enforces that policy
depends on repository settings, which are not defined by these workflow files.
The TypeScript check is limited because `checkJs` is disabled; passing it does
not establish full JavaScript type safety.

See the [testing reference](docs/codebase/TESTING.md) for server setup, focused
browser commands, dated local results, and accessibility limitations. Automated
axe `incomplete` results require review and are not passes.

## Deployment

### GitHub Pages (primary)

Every push to `main` triggers `.github/workflows/deploy.yml`, which installs
dependencies, runs lint, typecheck, build, and `test:run`, then deploys `build/`
via `actions/upload-pages-artifact` and `actions/deploy-pages`. It can also be
started manually. The separate CI workflow is not a dependency of deployment;
coverage and browser checks are not repeated in the deployment workflow.

> [!IMPORTANT]
> GitHub Pages must be configured to use **GitHub Actions** as the deployment source: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

### Vercel (mirror)

`vercel.json` points Vercel at `npm run build` and serves the `build/` directory.
Configure Vercel to build repository source, normally `main`, rather than the
compiled `gh-pages` branch. Remote project settings and deployed revisions are
not verified by the checked-in configuration.
The configured Vercel build command runs only the build, not lint, typecheck,
unit tests, coverage, or browser checks.

### Manual publication (gh-pages)

The separate `npm run deploy` command runs `predeploy` (a build), then publishes
`build/` using `gh-pages`. It does not run lint, typecheck, unit tests, coverage,
or browser checks, and does not configure GitHub Pages to serve that branch.
Its presence is not approval to publish; confirm the intended hosting path with
the maintainer before using it.

## Documentation

| Document | Description |
| --- | --- |
| [docs/architecture.md](docs/architecture.md) | Current SPA structure, data flow, decisions, and safe change map |
| [docs/codebase/ARCHITECTURE.md](docs/codebase/ARCHITECTURE.md) | Entry point to the detailed architecture, structure, stack, conventions, integrations, concerns, and testing references |
| [CONTRIBUTING.md](CONTRIBUTING.md) | How to contribute: local setup, quality checks, PR workflow, and ground rules |
| [SUPPORT.md](SUPPORT.md) | Common questions, how to get help, GitHub Issues as the sole support path |
| [SECURITY.md](SECURITY.md) | Security surface, what to report, and how to report privately |
| [DISCLAIMER.md](DISCLAIMER.md) | Data responsibility, no-warranty statement, and credential ownership guidance |
| [docs/migration/astro-migration-roadmap.md](docs/migration/astro-migration-roadmap.md) | Retired Astro migration planning record |

---

<p align="center">Made with ❤️ by Ahmad Mujtaba</p>
