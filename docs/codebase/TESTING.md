# Testing Patterns

## Core Sections (Required)

### 1) Test Stack and Commands

Vitest ^4.1.10, jsdom ^30.0.1, Testing Library, Vitest expect/vi, jest-dom and jest-axe. Versions are manifest ranges.

```sh
npm run test:run
npm run test:run -- src/__tests__/Behavior.test.jsx
npm run test:coverage
# With a production build and preview server already running:
node stress-test.mjs
node scripts/check-motion.mjs
```

`npm test` is watch mode. Browser diagnostics require Playwright Chromium and localhost:4173.

### 2) Test Layout

Vitest includes `src/**/*.{test,spec}.{js,jsx}`. Most suites reside in src/__tests__; App.test.jsx is colocated. src/test/setup.js runs before every file with globals and jsdom enabled, CSS handling, and a 15-second test timeout. testUtils.jsx supplies renderWithProviders.

### 3) Test Scope Matrix

| Scope | Covered? | Typical target | Notes |
| --- | --- | --- | --- |
| Unit/data | Yes | Theme token resolution, project/home contracts | ThemeRegistry, ProjectsData, HomePageData |
| Component integration | Yes | Navigation, theme persistence, route metadata | Browser APIs simulated in jsdom |
| Accessibility | Partial | Landmarks, names, selected axe checks, token contrast | Not a complete manual accessibility audit |
| Browser flows/performance | Focused motion gate plus older diagnostic script | Routes, preferences, focus, themes, mobile layout, cold loads | Not invoked by CI workflows |
| Live service integration | Not established | Hosting/external links | Tests do not require API credentials |

### 4) Mocking and Isolation Strategy

setup.js provides no-op IntersectionObserver and ResizeObserver, vi.fn matchMedia returning a fine pointer, and mocked scrollTo. renderWithProviders uses MemoryRouter when initialEntries is supplied, otherwise BrowserRouter; motion is reduced. Behavior theme tests clear storage; App tests explicitly clean up rendering. Do not infer real layout or actual device behavior from these mocks.

RouteMetadata waits for titles with a 10-second limit. [TODO] Historical flake rate is unknown; no failure occurred in this run.

### 5) Coverage and Quality Signals

Verified 2026-09-10 at local HEAD 4c9a60b plus uncommitted motion changes, using existing installed dependencies:

| Check | Result |
| --- | --- |
| npm run test:run | 19 files, 151 tests passed |
| npm run lint | Passed |
| npm run typecheck | Passed; checkJs false limits assurance |
| npm run build | Passed; generated route chunks and static fallback copies |

Coverage script exists, but no provider/threshold is configured in vitest.config.js, and no @vitest/coverage-* direct dependency is declared. [TODO] Coverage execution and percentages unverified. No dependencies were installed during mapping.

The focused browser motion check covers all six content routes at desktop/mobile widths, immediate reduced-motion visibility, live preference changes, short viewports, printing, keyboard focus, six themes, native cursor, bounded hover, anchor navigation, history, not-found recovery, and splash redirect. It writes screenshots and JSON measurements to an OS temp directory. `--interactions-only` runs the focused interaction checks without load/route measurements.

For repeatable before/after comparison, capture the unchanged production build with `--baseline`, then rebuild the changes and run `--compare <baseline-report.json>`. Comparison fails on content/link drift, initial gzip JavaScript growth above 5 KiB, load CLS growth above 0.01, or median LCP growth above the larger of 20% and 150 ms. Long tasks are also recorded for review; timings are local lab measurements, not production guarantees.

Final local Chromium comparison passed on 2026-09-10. Three fresh browser contexts per viewport used disabled HTTP cache; mobile used 4x CPU throttling, 1.6 Mbps download, and 150 ms latency.

| Viewport | Median LCP before / after | Maximum load CLS before / after | Initial gzip JavaScript before / after |
| --- | --- | --- | --- |
| Desktop 1440 x 900 | 448 / 424 ms | 0.00761 / 0.00757 | 150,515 / 151,173 bytes |
| Mobile 390 x 900 | 2,488 / 1,824 ms | 0.01572 / 0.01522 | 150,515 / 151,173 bytes |

Added initial JavaScript: 658 bytes gzip (0.64 KiB), below the 5 KiB budget. No long tasks occurred during the one-second idle observation after hero motion settled; initial-load long tasks remain in the raw measurements. Route checks also covered 320 px reduced-motion layout and a 320 x 200 short viewport. Screenshots were reviewed at desktop/mobile sizes and in all six themes.

Local temp artifacts: baseline `portfolio-motion-9WRlT1/report.json`; final report and screenshots `portfolio-motion-hKxHOV/`. These are temporary local evidence, not tracked build artifacts. Chromium emulation does not establish Safari, Firefox, physical-device, or production performance.

Live-host HTTP checks, coverage percentages, the older stress diagnostics, and dependency vulnerability audit were not run. `stress-test.mjs` catches step failures and logs them; it remains diagnostic. The focused motion script exits nonzero on assertion failures.

CI runs lint, typecheck, build, tests on pushes/PRs to main. Deploy runs build/tests only. Remote branch protection enforcement was not queried.

### 6) Evidence

- `vitest.config.js`, `package.json`, `src/test/setup.js`, `src/test/testUtils.jsx`
- `src/__tests__/ThemeRegistry.test.jsx`, `src/__tests__/Behavior.test.jsx`, `src/__tests__/RouteMetadata.test.jsx`
- `src/__tests__/Accessibility.test.jsx`, `src/App.test.jsx`
- `src/__tests__/themeMotion.test.js`, `scripts/check-motion.mjs`
- `stress-test.mjs`, `.github/workflows/ci.yml`, `.github/workflows/deploy.yml`
- Terminal checks summarized above; these are local results, not remote CI status.
