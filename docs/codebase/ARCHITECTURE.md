# Architecture

## Core Sections (Required)

### 1) Architectural Style

Static client-rendered React SPA with feature pages, shared UI components, and a local data layer. This classification follows `src/index.jsx`, `src/containers/Main.jsx`, and `src/portfolio.js`; there is no server/data-service layer in the inspected application.

Constraints: static hosting, content bundled at build time, and client-side route metadata. The Astro roadmap is future intent, not implemented architecture.

### 2) System Flow

```text
index.html -> src/index.jsx -> App providers -> Main router
                                              -> RouteMeta
                                              -> lazy page -> sections/cards
                                                              <- portfolio.js <- data/*
```

1. HTML supplies baseline metadata and a React mount node.
2. `src/index.jsx` mounts App; `src/App.jsx` wraps the theme provider in an error boundary.
3. Theme initialization reads localStorage and resolves tokens; AppContent installs motion/global styles, optional cursor, and optional GA initialization.
4. `Main.jsx` provides Helmet and BrowserRouter, matches a route, and uses Suspense with visible loading feedback.
5. Pages render local content through the portfolio barrel. For example, FeaturedProjects renders `projects.data.slice(0, 4)`; project order therefore changes the home selection.
6. RouteMeta updates canonical/social metadata. Header actions update mode/accent through context and persist them to browser storage.

Routes: /, /home, /experience, /education, /projects, /skills, /contact, /splash, and wildcard. /home canonicalizes to /. Splash and not-found metadata use noindex.

### 3) Layer/Module Responsibilities

| Module | Owns | Outside observed scope | Evidence |
| --- | --- | --- | --- |
| App | Global providers, error fallback, optional features | Route table | `src/App.jsx` |
| Main | Routing, lazy loading, route metadata inputs | Content persistence | `src/containers/Main.jsx` |
| Theme controller | Context, storage, mode/accent selection | Contact/project data | `src/themeController.jsx` |
| Theme registry/global styles | Semantic tokens, global visual rules | Navigation | `src/theme.js`, `src/global.js` |
| Motion policy | Entrance timing, viewport reveal defaults, mobile/reduced behavior | Content and routing | `src/themeMotion.js`, `src/global.js` |
| Portfolio barrel/data | Static content | Network fetching | `src/portfolio.js`, `src/data/projects.js` |
| Contact links | Build/render public contact actions | Message delivery service | `src/components/socialMedia/ContactLinksList.jsx` |

### 4) Reused Patterns

| Pattern | Where found | Observed purpose |
| --- | --- | --- |
| Context/provider | Theme controller | Share mode/accent state |
| Composition | Home page | Assemble independently defined sections |
| Barrel exports | portfolio.js | Central content import path |
| Lazy loading with fallback | Main.jsx | Defer route modules |
| Error boundary | ErrorBoundary.jsx | Render refresh UI after React render failure |
| Data-driven rendering | FeaturedProjects, ContactLinksList | Map content into cards/links |

No application queues, background workers, dependency-injection container, or backend singleton service was found. Browser effects/timers handle theme transitions and optional initialization.

Motion remains in the existing Framer Motion/CSS path. `revealMotion(index, onMount)` supplies props directly to semantic motion elements; it adds no provider or generalized animation wrapper. Page headings stay visible. CSS enforces live reduced-motion preferences, immediate focused-content visibility, and opacity-only mobile reveals. Hero decoration uses two finite CSS animations; mobile and reduced-motion decoration is static. The native cursor is the default.

### 5) Known Architectural Risks

- Build emits explicit route HTML only for home, education, projects; remaining direct routes depend on hosting fallback behavior (`package.json`). Live HTTP status behavior is [TODO].
- Route-specific SEO runs in the browser; baseline HTML is not route-prerendered (`index.html`, `RouteMeta.jsx`).
- Theme storage access is unguarded against getItem/setItem exceptions; parsing fallback only handles invalid stored JSON (`themeController.jsx`).
- Deploy workflow builds/tests independently of lint/typecheck CI; no explicit dependency on the CI workflow appears in `deploy.yml`.
- Three accents exist: pink, blue, pink-indigo; defaults are dark + blue (`theme.js`). Older architecture prose may still list only two; source and the updated README are current.

### 6) Evidence

- `index.html`, `src/index.jsx`, `src/App.jsx`
- `src/containers/Main.jsx`, `src/containers/FeaturedProjects/FeaturedProjects.jsx`
- `src/themeController.jsx`, `src/theme.js`
- `src/components/seo/RouteMeta.jsx`, `src/components/ErrorBoundary.jsx`
- `package.json`, `.github/workflows/deploy.yml`
