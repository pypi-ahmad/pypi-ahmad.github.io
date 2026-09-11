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
# after build and preview:
node scripts/check-frontend.mjs
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
- [TODO] Current coverage percentages and remote CI status require a fresh run or GitHub query.

## 6) Evidence

- `package.json`, `vitest.config.js`, `src/test/setup.js`, `src/test/testUtils.jsx`
- `src/__tests__/Accessibility.test.jsx`, `src/__tests__/Behavior.test.jsx`, `src/__tests__/RouteNavigation.test.jsx`
- `.github/workflows/ci.yml`, `.github/workflows/deploy.yml`, `scripts/check-frontend.mjs`
