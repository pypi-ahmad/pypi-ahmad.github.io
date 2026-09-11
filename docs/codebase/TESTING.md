# Testing Patterns

## 1) Test Stack and Commands

- Primary framework: Vitest `^5.0.0` in jsdom.
- Assertions and mocks: Vitest globals (`expect`, `vi`), Testing Library, jest-dom, and jest-axe.
- Browser verification: Playwright and axe-core run against a production preview in CI.

```bash
npm run test:run
npm run test:coverage
npm run lint
npm run typecheck
npm run build
```

Browser scripts require an installed Chromium executable. Run
`npx playwright install chromium` once locally; CI uses
`npx playwright install --with-deps chromium` on Ubuntu.

Start only the servers required by the check below and leave them running.
The CI browser check needs the production preview; parity, press-feedback, and
recovery checks need both servers, each in a separate terminal:

```bash
# Terminal 1: development server on port 3000
npm run dev -- --strictPort
```

```bash
# Terminal 2: production preview on port 4173, after npm run build
npm run preview -- --host 127.0.0.1 --strictPort
```

Run checks in a third terminal from the repository root:

```bash
# Production preview (the CI browser check)
node scripts/check-frontend.mjs
# Development server
node scripts/check-frontend.mjs --base-url http://localhost:3000
# Both servers must be running for these three scripts
node scripts/check-frontend-parity.mjs
node scripts/check-press-feedback.mjs
node scripts/check-recovery.mjs
# Targeted interface checks take a positional URL, not --base-url
node scripts/check-interface-fixes.mjs http://localhost:3000
node scripts/check-interface-fixes.mjs http://127.0.0.1:4173
# Motion checks accept --base-url; preview is the default
node scripts/check-motion.mjs --interactions-only
node scripts/check-motion.mjs --interactions-only --base-url http://localhost:3000
```

## 2) Test Layout

- Vitest includes `src/**/*.{test,spec}.{js,jsx}`.
- Most suites are in `src/__tests__/`; `src/App.test.jsx` is colocated with the application entry.
- `src/test/setup.js` runs before each suite. `src/test/testUtils.jsx` provides `renderWithProviders`.
- Test names describe rendered behavior, data contracts, navigation, and theme outcomes.

## 3) Test Scope Matrix

| Scope | Covered? | Typical target | Notes |
| --- | --- | --- | --- |
| Unit/data | Yes | Theme parsing and portfolio data contracts | No remote service layer exists |
| Component integration | Yes | Pages, cards, header, routing, metadata | Runs in jsdom with browser API mocks |
| Accessibility | Partial | Accessible names, landmarks, selected axe scans | CI exercises six routes and header states in Chromium |
| Browser flow | Yes, focused | Responsive navigation, themes, focus, forced colors | Chromium-based; not a cross-browser or physical-device audit |
| Live-service integration | No established suite | Hosting and outbound links | No app API is implemented |

## 4) Mocking and Isolation Strategy

- Setup mocks `IntersectionObserver`, `ResizeObserver`, `matchMedia`, and `scrollTo` for jsdom.
- `renderWithProviders` selects `MemoryRouter` when `initialEntries` is provided; otherwise it uses `BrowserRouter` and always installs theme/motion context.
- Theme behavior tests manipulate localStorage and should clean it between cases.
- Common limitation: jsdom mocks do not prove real browser layout, pointer behavior, or device accessibility.

## 5) Coverage and Quality Signals

- `test:coverage` uses Vitest's V8 coverage provider.
- Global thresholds: 85% statements and lines; 75% branches and functions.
- CI runs install, lint, typecheck, build, coverage, Playwright Chromium installation, and `scripts/check-frontend.mjs` on push/PR to `main`.
- The deployment workflow runs lint, typecheck, build, and `test:run`, but it does not run coverage or the Chromium check; CI is the broader gate.
- Local verification on 2026-09-12: 191 tests passed across 25 suites. Coverage was
  89.70% statements, 82.84% branches, 81.69% functions, and 89.41% lines.
  Lint, typecheck, build, and diff whitespace checks passed. Remote CI and
  branch-protection status were not checked.
- The same day's production-preview frontend run passed its assertions across
  480 content layouts, 24 localization cases, eight expanded-navigation cases,
  24 navigation layouts, and 42 axe scans. It separately reported 42 `incomplete`
  results requiring review; those results are not accessibility passes.

## 6) Interface Regression Checks

Run the dev server on port 3000 and a freshly built production preview on port 4173.
The parity, press-feedback, and recovery scripts exercise both servers.

- `check-frontend.mjs` checks 480 content layouts per server: six routes, 20 widths
  from 320–1920px, LTR/RTL, and 100%/200% root text sizing. Text ranges, clipping
  ancestors, and card bounds supplement document overflow checks. It also checks
  24 pseudo-localized/German cases and eight expanded-navigation cases.
- `check-press-feedback.mjs` checks eight filled actions across six appearances
  at 390px and 1440px: 192 scenarios across both servers. It checks rest, hover,
  press, release, cancellation, keyboard focus, and reduced motion. Rendered
  background pixels beneath label bounds are captured with glyphs temporarily
  hidden and compared with the opaque text color against a 4.5:1 threshold.
  Existing card-link opacity/scale checks remain separate. Header separator and
  shadow variables and resolver-backed swatch gradients are checked in both modes.
  A historical 2026-09-11 run passed 192 primary-action and 112 card-link scenarios;
  the lowest sampled button-label contrast was 4.98:1. These counts describe that
  run, not proof that the current expanded card suite has been rerun.
- `node scripts/check-press-feedback.mjs --cards-only` runs the card-link checks
  without the primary-action sweep: 160 scenarios across development and production.
  Contact and Project cards stay opaque while pressed; their descriptions are
  sampled against rendered hover/pressed backgrounds across six appearances at
  390px and 1440px. Contact hover is also checked with a deliberately different
  focus-shadow token. Degree and certificate links retain their opacity feedback.
  Forced-colors and print scenarios check state behavior, not sampled contrast.
- `check-recovery.mjs` delays or rejects the Contact chunk to check loading
  announcements, cancellation, error-heading focus, and actual Refresh recovery.
  Refresh feedback is checked with normal/reduced motion, forced colors,
  increased contrast, and reduced transparency, plus interruption at 10% playback speed.
- `check-interface-fixes.mjs` checks enlarged-text leading, Contact/Skills grid
  wrapping in LTR/RTL, skip-link keyboard flows, Contact alignment, and Home metric
  leading. It targets specific regressions and is not run by the CI workflow.
- Unit tests cover theme token parity, swatch gradients, error landmarks/focus,
  and populated, partially configured, and whitespace-only contact channels.
  Empty Contact recovery links must use the resolved accent text color in all
  six appearances; theme tests enforce 4.5:1 against the page background.
- `Splash.test.jsx` covers immediate redirect when loaded, the load event,
  the three-second fallback, and listener/timer cleanup. `ThemeTransitions.test.jsx`
  checks transition cleanup after rapid toggles and unmounting.

The isolated review pages at `/dev/break-review/project.html`,
`/dev/break-review/certification.html`, `/dev/break-review/experience.html`, and
`/dev/break-review/contact.html` are available through the development server.
They render synthetic fixtures and remain marked "Visual inspection pending";
their presence does not establish a visual pass. These pages are not production
routes or CI checks.

The frontend script writes axe violations and `incomplete` results separately to
a temporary `report.json`. An incomplete result is not a pass. Gradient unit
tests remain useful checks of declared colors, not proof of rendered contrast.

Limitations: these are Chromium checks, not a full accessibility certification.
Root text sizing is not browser page zoom. Physical-device touch, APCA, embedded
artwork contrast, every animation frame, and other browser engines are not covered.
Press contrast is sampled after entrance animations settle. Coarse-pointer checks
use mouse input in a touch-enabled browser context, not physical touch hardware.

## 7) Evidence

- `package.json`, `vitest.config.js`, `src/test/setup.js`, `src/test/testUtils.jsx`
- `src/__tests__/Accessibility.test.jsx`, `src/__tests__/Behavior.test.jsx`, `src/__tests__/RouteNavigation.test.jsx`
- `src/__tests__/Splash.test.jsx`, `src/__tests__/ThemeTransitions.test.jsx`, `src/__tests__/ContactAvailability.test.jsx`
- `.github/workflows/ci.yml`, `.github/workflows/deploy.yml`, `scripts/check-frontend.mjs`
- `scripts/check-interface-fixes.mjs`, `scripts/check-recovery.mjs`, `dev/break-review/`
