# Code Conventions

## 1) Naming and File Organization

- Component functions and JSX files use PascalCase (`Header`, `ProjectCard.jsx`); ordinary helpers use camelCase (`buildThemeShadow`, `normalizeAccent`).
- Data module filenames use camelCase. Component folders vary between camelCase and PascalCase, so preserve the local folder style.
- Page, component, and test CSS commonly live next to their owning source file.
- Route pages import portfolio data from the `src/portfolio.js` barrel rather than directly duplicating objects.

## 2) Formatting and Static Analysis

- ESLint's recommended configuration applies to `src/**/*.{js,jsx}` and root `.js` files.
- `no-unused-vars` is explicitly disabled. ESLint does not currently enforce unused-code cleanup.
- Prettier is installed and `.prettierignore` exists, but the manifest has no formatting script or checked-in Prettier configuration.
- `npm run typecheck` executes `tsc --noEmit`, but `checkJs` is false; it does not provide full JavaScript type checking.
- Run: `npm run lint`, `npm run typecheck`, `npm run test:run`, and `npm run build` for source changes.
- Keep comments concise and durable: explain non-obvious constraints, ownership,
  or reasons. Do not repeat straightforward code or add notes to meet a quota.

## 3) Import and Module Conventions

- Use relative ESM imports. No alias mapping is configured in Vite or TypeScript settings.
- Imports are generally grouped by package first and local module second; no automated import-order rule is configured.
- Use `src/portfolio.js` as the public re-export boundary for portfolio data.

## 4) Error and Logging Conventions

- Render-time failures reach the class-based `ErrorBoundary`, which replaces the
  UI with a named main landmark, focuses its error heading, and provides Refresh.
- Route metadata and theme parsing prefer safe defaults rather than throwing for missing/invalid user-controlled values.
- Browser diagnostic scripts use Node assertions and nonzero failure behavior; the legacy stress script logs caught step failures.
- No application logging, client error-reporting service, or sensitive-data redaction utility was found.

## 5) Testing Conventions

- Tests use `*.test.js` and `*.test.jsx`, primarily under `src/__tests__/`; `src/App.test.jsx` is colocated.
- `renderWithProviders` is the standard wrapper for router, theme, and reduced-motion context.
- Browser APIs absent from jsdom are mocked in `src/test/setup.js`.
- Treat DOM mocks and token contrast tests as limited checks. Real clipping,
  rendered contrast, and interaction states require browser verification.
- Coverage is expected in CI through `npm run test:coverage` and configured thresholds.

## 6) Evidence

- `eslint.config.js`, `tsconfig.typecheck.json`, `.prettierignore`, `package.json`
- `src/themeController.jsx`, `src/components/ErrorBoundary.jsx`, `src/test/testUtils.jsx`
- `vitest.config.js`, `scripts/check-frontend.mjs`
