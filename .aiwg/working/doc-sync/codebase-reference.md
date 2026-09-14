# Codebase reference audit

Direction: `code-to-docs`  
Scope: `docs/codebase/ARCHITECTURE.md`, `CONCERNS.md`, `CONVENTIONS.md`,
`INTEGRATIONS.md`, `STACK.md`, `STRUCTURE.md`, and `TESTING.md`  
Supporting inventory: `docs/codebase/.codebase-scan.txt`

## Findings

### 1. Confirmed drift: README dependency concern is still true

`docs/codebase/CONCERNS.md:8` says the README incorrectly lists React
Bootstrap. The current `README.md:95` still says "React Bootstrap", while
`package.json` has no `react-bootstrap` or Bootstrap dependency. The concern is
accurate, but its suggested timing ("in the next documentation change") is now
actionable during this sync. The README should remove React Bootstrap; once
fixed, remove this concern rather than retaining a resolved warning.

### 2. Already synchronized: runtime and build stack

`STACK.md` matches the current manifest and configuration: React 19.3, React
Router 7.18, Vite 8.3, Node 24.21, npm 12.0.2, ESM, lockfile v3, `build/`
output, development port 3000, and the declared lint/typecheck/test/build
commands. Evidence: `package.json`, `.nvmrc`, `package-lock.json`, and
`vite.config.js`.

### 3. Already synchronized: routing and static-host fallback architecture

`ARCHITECTURE.md` correctly describes `index.html -> index.jsx -> App -> Main`,
the lazy BrowserRouter route set, route metadata, local data barrel, theme
storage, and generated direct-route HTML. The seven named routes in
`package.json` match the seven explicit non-root paths in `Main.jsx`; wildcard
handling remains client-side. The documented duplication risk is valid.

### 4. Already synchronized: removed component paths are absent

The maintained structure/conventions documents do not refer to the deleted
`App.css`, `SkillIcon`, `ProjectLanguages`, or `SocialMedia` modules. Current
call sites use `ContactLinksList`, barrel data imports, co-located CSS, and
global/theme styling as documented.

### 5. Already synchronized: testing and CI

`TESTING.md` matches `vitest.config.js` and workflows: jsdom, 15-second timeout,
V8 coverage, thresholds of 85% statements/lines and 75% branches/functions,
coverage plus Chromium checks in CI, and non-coverage `test:run` in deployment.
`scripts/check-frontend.mjs` does exercise the six documented content routes.

### 6. Already synchronized: integrations and persistence

`INTEGRATIONS.md` correctly reports no runtime fetch/API/database layer, optional
GA4 initialization, browser `localStorage` for theme/accent, bundled portfolio
data, GitHub Pages deployment, and Vercel build/output configuration. Evidence:
`src/App.jsx`, `src/themeController.jsx`, `src/data/settings.js`,
`.github/workflows/deploy.yml`, and `vercel.json`.

### 7. Already synchronized: lint and typecheck limitations

`CONVENTIONS.md` correctly states that ESLint disables `no-unused-vars`,
Prettier has no manifest script, and TypeScript has `checkJs: false`. Evidence:
`eslint.config.js`, `package.json`, and `tsconfig.typecheck.json`.

### 8. Human review: manual `gh-pages` route

`ARCHITECTURE.md`, `CONCERNS.md`, and `STACK.md` consistently flag or describe
the `gh-pages` script alongside the canonical Actions Pages deployment. Code
cannot determine whether this alternate publication route is intentional.
Retain the `[ASK USER]` decision until ownership confirms removal or support.

### 9. Human review: repository-external hosting controls

The `[TODO]` and `[ASK USER]` items for branch/environment protection, deployed
revision, Vercel account ownership, and access revocation cannot be verified
from repository files. They are appropriately qualified and should not be
converted into factual claims without querying those systems.

### 10. Human review: generated scan is transient supporting evidence

`.codebase-scan.txt` currently inventories local/generated directories,
including `.aiwg` and `.ua`, so it is not a stable source-of-truth document.
The maintained docs already qualify generated directories as non-application
layers. Decide whether to keep this scan untracked/regenerated or commit a
deliberately filtered snapshot.

## Recommended high-confidence change

- Remove "React Bootstrap" from `README.md` and then remove the resolved stale
  README row from `docs/codebase/CONCERNS.md`.

## Validation used

- Compared current manifest, Vite/Vitest/ESLint/TypeScript/Vercel configuration,
  CI/deploy workflows, app entry/provider/router source, theme persistence,
  current imports, browser-check route list, and public asset inventory.
- No maintained documentation or source file was modified by this audit.
