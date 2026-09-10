# Coding Conventions

## Core Sections (Required)

### 1) Naming Rules

These describe observed style across the source inventory; they are not all lint-enforced.

| Item | Rule | Example | Evidence |
| --- | --- | --- | --- |
| Components/files | PascalCase component and JSX basename | ContactLinksList | `src/components/socialMedia/ContactLinksList.jsx` |
| Data files/variables | camelCase | socialMediaLinks | `src/data/socialMedia.js` |
| Functions/hooks | camelCase, use prefix for hooks | parseStoredThemeMode, useThemeController | `src/themeController.jsx` |
| Shared constants | UPPER_SNAKE_CASE | DEFAULT_ACCENT | `src/theme.js` |
| Types/interfaces | No general TS interface convention established | [TODO] Future typed conventions | `tsconfig.typecheck.json` |
| Directories | Feature/layer names with mixed casing | socialMedia, ProjectCard, HomeDetails | `src/` file inventory |

Private field prefixes are not an established convention in inspected components.

### 2) Formatting and Linting

- ESLint recommended flat config; no-unused-vars disabled. no-undef disabled for src/__tests__ and src/test.
- `npm run lint` targets src JS/JSX, not the entire repository.
- Prettier is declared; `.prettierignore` exists, but no dedicated format script or formatter rule config was detected.
- Most source uses two spaces, semicolons, double quotes; Vite config uses single quotes. Match the touched file.
- TypeScript allows JS but sets checkJs false and skipLibCheck true; strict is not enabled. Do not describe it as strict typing.

### 3) Import and Module Conventions

ES module imports are relative, with both extensionless and explicit .js forms. Components commonly group library imports, local components/data, and CSS, but no ordering rule is configured. `src/portfolio.js` re-exports named content exports; components commonly default-export their main component.

### 4) Error and Logging Conventions

`ErrorBoundary.jsx` shows a generic error and refresh button. Theme parsing falls back on invalid JSON; missing provider usage throws a descriptive error. Browser storage access itself is not caught. No structured application logger or required log-context schema was found. `stress-test.mjs` uses console output for diagnostics.

`CONTRIBUTING.md` forbids real credentials in tests and requires the tracked analytics ID to stay empty. All application data is public browser content.

### 5) Testing Conventions

Tests use *.test.js/jsx, primarily under src/__tests__, plus src/App.test.jsx. Shared renderWithProviders wraps routing, theme, and reduced motion. setup.js mocks observers, matchMedia and scrollTo. Behavior tests explicitly clear localStorage before theme tests. No coverage threshold is configured.

### 6) Evidence

- `eslint.config.js`, `tsconfig.typecheck.json`, `.prettierignore`, `package.json`
- `src/themeController.jsx`, `src/components/ErrorBoundary.jsx`, `src/portfolio.js`
- `src/test/setup.js`, `src/test/testUtils.jsx`, `src/__tests__/Behavior.test.jsx`
- `CONTRIBUTING.md`
