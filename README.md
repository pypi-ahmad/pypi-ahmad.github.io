# Ahmad Mujtaba — AI Engineering Portfolio

A responsive React portfolio showcasing applied AI experience, production system designs, open-source projects, technical skills, education, and certifications.

[![CI](https://github.com/pypi-ahmad/pypi-ahmad.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/pypi-ahmad/pypi-ahmad.github.io/actions/workflows/ci.yml)
[![Deploy](https://github.com/pypi-ahmad/pypi-ahmad.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/pypi-ahmad/pypi-ahmad.github.io/actions/workflows/deploy.yml)
[![Release](https://img.shields.io/github/v/release/pypi-ahmad/pypi-ahmad.github.io)](https://github.com/pypi-ahmad/pypi-ahmad.github.io/releases/latest)
[![Node.js](https://img.shields.io/badge/Node.js-24.19.0-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![npm](https://img.shields.io/badge/npm-12.0.2-CB3837?logo=npm&logoColor=white)](https://www.npmjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Demo

- **Live site:** [pypi-ahmad.github.io](https://pypi-ahmad.github.io/)
- **Vercel mirror:** [my-portfolio-green-ten-63.vercel.app](https://my-portfolio-green-ten-63.vercel.app/)

<p align="center">
  <img src="home-320.png" width="320" alt="Mobile preview of Ahmad Mujtaba's portfolio" />
</p>

## Features

- Professional profile, experience, education, certifications, skills, and contact pages.
- Applied-AI platform catalog with 20 systems across GenAI, LangGraph, and CrewAI categories.
- 12 anonymized enterprise case studies and 13 linked open-source projects.
- 32 visual theme families with light and dark modes, producing 64 resolved themes.
- Persisted theme selection with backward-compatible `localStorage` parsing.
- Responsive navigation, layouts, cards, accordions, galleries, and accessible dialogs.
- Route-level title, description, canonical, robots, Open Graph, and Twitter metadata.
- Lazy-loaded route modules with an accessible loading state and catch-all 404 page.
- Reduced-motion support and a desktop-only animated cursor.
- Optional Google Analytics 4 integration, disabled by default.
- Automated linting, type checking, builds, tests, and GitHub Pages deployment.

## Tech Stack

| Area            | Technology                                                    |
| --------------- | ------------------------------------------------------------- |
| UI              | React 19, React Bootstrap, styled-components                  |
| Routing         | React Router DOM 7                                            |
| Build           | Vite 8, `@vitejs/plugin-react`, SVGR                          |
| Animation       | Framer Motion, react-animated-cursor                          |
| Metadata        | react-helmet-async                                            |
| Icons           | react-icons and local SVG components                          |
| Analytics       | react-ga4                                                     |
| Testing         | Vitest, Testing Library, jsdom, jest-axe, axe-core            |
| Browser testing | Playwright and Chrome DevTools Protocol                       |
| Quality         | ESLint 10, TypeScript 7 in JavaScript-checking mode, Prettier |
| Runtime         | Node.js `>=24.19.0 <25`, npm `>=12.0.2 <13`                   |
| Hosting         | GitHub Pages and Vercel                                       |

## Project Structure

```text
.
├── .github/workflows/
│   ├── ci.yml                     # Lint, typecheck, build, and tests
│   └── deploy.yml                 # Official GitHub Pages deployment
├── public/                        # Static assets, certificates, manifest, SEO files
├── src/
│   ├── __tests__/                 # Focused behavior, rendering, and accessibility tests
│   ├── components/                # Reusable cards, dialogs, navigation, icons, and SEO
│   ├── containers/                # Page sections and application router
│   │   └── Main.jsx               # Routes, metadata, lazy loading, and 404 handling
│   ├── data/                      # Portfolio content and feature configuration
│   ├── pages/                     # Lazy-loaded route-level components
│   ├── test/                      # Shared test setup and render helpers
│   ├── App.jsx                    # Global providers and application shell
│   ├── index.jsx                  # React DOM entry point
│   ├── portfolio.js               # Data-module barrel export
│   ├── theme.js                   # Theme registry and contrast-safe token generation
│   └── themeController.jsx        # Theme state, persistence, and provider
├── index.html                     # Vite HTML entry and baseline metadata
├── stress-test.mjs                # Playwright performance and resilience checks
├── vite.config.js                 # Development and production build configuration
├── vitest.config.js               # jsdom test configuration
├── vercel.json                    # Vercel static deployment configuration
└── package.json                   # Scripts, dependencies, and runtime requirements
```

## Installation and Setup

### Prerequisites

- Node.js `24.19.0` (`.nvmrc` contains the project pin)
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

Vite opens the site at [http://localhost:3000](http://localhost:3000).

### Create a production build

```bash
npm run build
```

The build is written to `build/`. The build script also copies `build/index.html` to `build/404.html` so direct SPA routes work on GitHub Pages.

### Preview the production build

```bash
npm run preview
```

The preview server runs at [http://localhost:4173](http://localhost:4173).

## Environment Variables

No environment variables are required. This is a static, client-only application with no backend, database, authentication service, or secret configuration.

Google Analytics is configured through `googleTrackingID` in `src/data/settings.js`. It is empty by default, so analytics remains disabled. Never place private credentials in client-side configuration because Vite bundles client code for public delivery.

## Usage

| Command                 | Purpose                                             |
| ----------------------- | --------------------------------------------------- |
| `npm run dev`           | Start Vite development server on port 3000          |
| `npm run start`         | Alias for the Vite development server               |
| `npm run build`         | Build production assets into `build/`               |
| `npm run preview`       | Preview the production build on port 4173           |
| `npm run lint`          | Run ESLint across JavaScript and JSX source files   |
| `npm run typecheck`     | Run TypeScript static checks without emitting files |
| `npm test`              | Start Vitest in watch mode                          |
| `npm run test:run`      | Run the complete test suite once                    |
| `npm run test:coverage` | Run tests and generate coverage output              |

To run the browser stress test, build and start the preview server first:

```bash
npm run build
npm run preview
```

In another terminal:

```bash
node stress-test.mjs
```

## How It Works

```text
index.html
   ↓
src/index.jsx
   ↓
App
   ├── ErrorBoundary
   ├── ThemeControllerProvider → styled-components ThemeProvider
   ├── MotionConfig → reduced-motion preference
   ├── GlobalStyles
   └── Main
       ├── HelmetProvider
       ├── BrowserRouter
       ├── RouteMeta
       └── Lazy-loaded page component
               ↓
          src/portfolio.js
               ↓
          src/data/*.js
```

`src/index.jsx` mounts the React application. `App.jsx` installs global error, theme, motion, style, analytics, and cursor behavior. `Main.jsx` selects a lazy-loaded page for the current route and supplies route-specific metadata.

Pages render portfolio content from plain JavaScript objects in `src/data/`, re-exported through `src/portfolio.js`. No runtime API or CMS is required. Theme selection is resolved by `themeController.jsx`, passed through styled-components, and persisted under the `theme` key in `localStorage`.

## Routes

| Path          | Content                                                   |
| ------------- | --------------------------------------------------------- |
| `/`           | Home page, or optional splash page                        |
| `/home`       | Home page                                                 |
| `/experience` | Professional experience                                   |
| `/education`  | Degrees and certifications                                |
| `/projects`   | AI platform, enterprise systems, and open-source projects |
| `/skills`     | Complete skill catalog                                    |
| `/contact`    | Contact links and blog call-to-action                     |
| `/theme`      | Theme gallery; marked `noindex`                           |
| `/splash`     | Standalone splash screen; marked `noindex`                |
| `*`           | Accessible 404 page; marked `noindex`                     |

## Configuration

Global feature switches live in `src/data/settings.js`:

```js
export const settings = {
  isSplash: false,
  useCustomCursor: true,
  googleTrackingID: "",
};
```

- Set `isSplash` to `true` to show the splash page at `/`.
- Set `useCustomCursor` to `false` to use the browser cursor.
- Set `googleTrackingID` to a public GA4 measurement ID to enable analytics.

Portfolio content can be updated without changing page components:

| File                      | Content                                            |
| ------------------------- | -------------------------------------------------- |
| `src/data/greeting.js`    | Hero copy, profile links, resume, and cover letter |
| `src/data/socialMedia.js` | Social and email links                             |
| `src/data/experience.js`  | Employment history                                 |
| `src/data/education.js`   | Degrees and certifications                         |
| `src/data/projects.js`    | Open-source projects                               |
| `src/data/systems.js`     | Enterprise AI case studies                         |
| `src/data/platform.js`    | Applied-AI platform catalog                        |
| `src/data/skills.js`      | Home and full-page skill groups                    |
| `src/data/contact.js`     | Contact-page content                               |

Themes are registered in `src/theme.js`. Each family supplies light and dark palettes; shared token generation derives semantic colors, surfaces, shadows, gradients, and contrast-safe text values.

## Testing and Quality

The repository contains 14 test files and 158 tests covering:

- Page and component rendering
- Navigation and route resolution
- Theme persistence, migration, and contrast ratios
- Dialog and gallery behavior
- Responsive navigation structure
- Project catalog integrity
- Route metadata and canonical URLs
- Accessibility checks with Testing Library, jest-axe, and axe-core

CI runs on pushes and pull requests to `main`:

```text
npm ci → lint → typecheck → build → tests
```

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`. The workflow builds and tests the application, uploads `build/` with `actions/upload-pages-artifact`, and deploys it with `actions/deploy-pages`.

GitHub Pages must use **Settings → Pages → Build and deployment → Source: GitHub Actions**.

Vercel uses `vercel.json` with `npm run build` and serves the same `build/` directory.

## License

Licensed under the [MIT License](LICENSE).

<p align="center">Made with ❤️ by Ahmad Mujtaba</p>
