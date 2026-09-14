# Technical notes

This complements [`docs/architecture.md`](../docs/architecture.md) and
[`docs/codebase/STACK.md`](codebase/STACK.md) with the parts a first-time reader is most likely to
get wrong: why specific libraries are used, and the invariants, error handling, and persistence paths
that aren't obvious from reading a single file in isolation.

## Stack choices the code makes obvious

- **React 19 + Vite 8, no meta-framework.** `src/index.jsx` calls `createRoot` directly; there is no
  server-rendering, file-based routing, or API layer anywhere in `src/`. The build is a pure static
  bundle (`vite.config.js`, `outDir: 'build'`).
- **React Router 7 with route-level lazy imports** (`src/containers/Main.jsx`). Because the deployed
  target is static hosting (GitHub Pages) with no server-side rewrites, `package.json`'s `build`
  script copies `build/index.html` to `build/404.html` and to `build/<route>/index.html` for every
  route — the client router's only way to survive a direct hit on a non-root URL.
- **styled-components, used specifically for theme propagation.** `src/themeController.jsx` wraps the
  tree in styled-components' `<ThemeProvider>` so any component can read `props.theme` without prop
  drilling. `src/global.js`'s `createGlobalStyle` block then re-exposes the same theme object as plain
  CSS custom properties (`--text`, `--accent-solid`, `--shadow-color`, etc.), which is why older,
  plain-CSS components can stay theme-aware without importing styled-components themselves.
- **Framer Motion, constrained to reduced-motion-aware entrance animation.** `src/themeMotion.js`'s
  `revealMotion()` checks `prefers-reduced-motion` and viewport width itself before returning motion
  props; `MotionConfig reducedMotion="user"` in `src/App.jsx` is the second, framework-level layer of
  the same guarantee.
- **react-helmet-async for per-route SEO**, driven entirely by the `routeMeta` table in
  `src/containers/Main.jsx` — there is no per-page `<Helmet>` usage outside `RouteMeta`.

## Invariants

- **Theme mode is always `"light"` or `"dark"`.** `normalizeThemeMode()` and `parseStoredThemeMode()`
  (`src/themeController.jsx:17-38`) collapse anything else — including legacy JSON-wrapped values from
  an earlier accent-family scheme — to `DEFAULT_THEME_MODE` (`"dark"`, `src/theme.js:8`). Any code
  reading theme mode from `localStorage` directly (rather than through the controller) must not assume
  the raw value is well-formed.
- **`lightTheme`/`darkTheme` are shared, must-not-mutate presets** (`src/theme.js:11-115`,
  `resolveTheme()` comment at `:118`). They are plain objects, not factories; a component that wants a
  derived value must compute it locally rather than writing back into the theme object.
- **The homepage's first four projects are a contract, not an accident.** Home reads
  `projects.data.slice(0, 4)` (see `docs/architecture.md`); reordering `src/data/projects.js` changes
  both the projects page and the homepage's featured selection, and is guarded by a content-contract
  test. Reorder the array and the test together.
- **Route additions must be made in two places.** `src/containers/Main.jsx`'s route table and the post-build
  fallback generation in `package.json`'s `build` script both enumerate routes independently
  (`docs/codebase/CONCERNS.md` calls this out as the top architectural risk). A route added to one and
  not the other will work in-app but 404 on a direct static-host request.

## Error handling

- **Render failures are caught once, at the top**, by `src/components/ErrorBoundary.jsx` (a class
  component, required for `getDerivedStateFromError`/`componentDidCatch`). Recovery is a full
  `window.location.reload()` — there is no remote error reporting; a production render crash is visible
  only to the affected visitor.
- **Theme/route inputs prefer silent fallback over throwing.** Malformed stored theme values normalize
  to the default (see Invariants above) rather than raising; `RouteMeta`'s `normalizePath()`
  (`src/components/seo/RouteMeta.jsx:7-21`) similarly folds unusual paths to a canonical form instead
  of erroring.
- **`localStorage` access itself is not wrapped in try/catch** in `themeController.jsx`. A browser that
  throws on storage access (privacy mode, disabled storage) will surface that exception uncaught —
  this is a known, undocumented-until-now gap, not a deliberate design decision.

## Persistence paths

- **The only client-side persistence is `localStorage["theme"]`**, a raw `"light"`/`"dark"` string
  (`THEME_STORAGE_KEY` in `src/themeController.jsx:13`). On mount, `getInitialThemeMode()` reads it
  through `parseStoredThemeMode()`, which also tolerates the legacy JSON-object shape from a retired
  accent-family preference. Every mode change also calls `localStorage.removeItem("accent")` — cleanup
  for that retired key, not an active feature.
- **There is no other browser storage, cookie, or server-side session.** Portfolio content itself is
  not persisted at runtime at all; it is committed JavaScript (`src/data/*.js`) bundled at build time
  and re-exported through `src/portfolio.js`. Changing content means editing source and shipping a new
  build, not writing to any store.
