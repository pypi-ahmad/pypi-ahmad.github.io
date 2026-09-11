# Architecture

## 1) Architectural Style

- Primary style: static, client-rendered React SPA organized by UI layer and route feature.
- Why: the browser entry mounts React, `Main.jsx` routes to lazy page modules, and pages consume committed JavaScript data through a barrel module.
- Primary constraints: static hosting with BrowserRouter fallbacks; all content ships in the client bundle; mode/accent preferences persist only in browser localStorage.

## 2) System Flow

```text
index.html -> src/index.jsx -> App providers -> Main router -> lazy page -> shared components -> src/portfolio.js -> src/data/*
```

1. `index.html` loads `src/index.jsx`, which creates the React root.
2. `App.jsx` installs the error boundary, theme/motion providers, and global styles; analytics/cursor behavior is conditional.
3. `Main.jsx` owns HelmetProvider and BrowserRouter, renders a Suspense fallback with separate polite loading status, and maps route metadata to lazy page components.
4. A page composes reusable header, footer, and cards, then reads committed portfolio objects from `src/portfolio.js`.
5. `themeController.jsx` validates persisted values, resolves semantic tokens in `theme.js`, and writes valid choices to localStorage.
6. Vite builds client assets; the build command writes fallback HTML for GitHub Pages direct-route recovery.

## 3) Layer/Module Responsibilities

| Layer or module | Owns | Must not own | Evidence |
| --- | --- | --- | --- |
| Entry and providers | Mounting, fallback boundary, global providers | Route-specific content | `src/index.jsx`, `src/App.jsx` |
| Routing | URL matching, lazy imports, metadata pairing, focus/scroll behavior | Data persistence | `src/containers/Main.jsx`, `src/components/RouteNavigation.jsx` |
| Pages and components | Visual composition, navigation, card rendering | Remote data access | `src/pages/`, `src/components/` |
| Data | Copy, URLs, project/experience/education records, feature flags | UI behavior | `src/data/`, `src/portfolio.js` |
| Theme | Token registry, preference migration, local persistence | Portfolio facts | `src/theme.js`, `src/themeController.jsx` |

## 4) Reused Patterns

| Pattern | Where found | Why it exists |
| --- | --- | --- |
| Provider/context | Theme controller and styled-components provider | Makes resolved theme available application-wide |
| Data barrel | `src/portfolio.js` | Gives pages one import boundary for content |
| Route metadata wrapper | `withRouteMeta` in `src/containers/Main.jsx` | Couples each route to title, canonical, social tags, and robots rule |
| Lazy route imports | `src/containers/Main.jsx` | Splits route code and exposes a loading state |
| Post-navigation focus | `src/components/RouteNavigation.jsx` | Focuses changed pathnames; skips its scroll reset on initial, fragment, and history navigation |
| Error recovery | `src/components/ErrorBoundary.jsx` | Focuses a named error heading and provides a document reload |
| Filtered contact channels | `src/components/socialMedia/ContactLinksList.jsx`, `src/pages/contact/ContactComponent.jsx` | Hides blank values and shows recovery when all channels are unavailable |
| Shared motion helper | `src/themeMotion.js` | Applies consistent reduced-motion behavior |

## 5) Known Architectural Risks

- The route list is duplicated in `Main.jsx` and the post-build fallback-generation command; a new route can work during client navigation but fail on a direct static-host request if both are not updated.
- Content objects have tests but no runtime schema validator, so malformed edits are detected by tests/build behavior rather than at the data boundary.
- [ASK USER] Decide whether the retained manual `gh-pages` script is still an approved deployment route alongside the GitHub Actions Pages artifact workflow.

## 6) Evidence

Related references: [Structure](STRUCTURE.md), [Stack](STACK.md),
[Conventions](CONVENTIONS.md), [Integrations](INTEGRATIONS.md),
[Concerns](CONCERNS.md), and [Testing](TESTING.md).

- `index.html`, `src/index.jsx`, `src/App.jsx`
- `src/containers/Main.jsx`, `src/components/RouteNavigation.jsx`, `src/components/seo/RouteMeta.jsx`
- `src/portfolio.js`, `src/data/`, `src/theme.js`, `src/themeController.jsx`
- `package.json`, `vite.config.js`
