# Public documentation drift audit
## Scope

- Direction: `code-to-docs`
- Documents: `README.md`, `docs/architecture.md`, and
  `docs/migration/astro-migration-roadmap.md`
- Evidence sources: `package.json`, `.nvmrc`, CI and deployment workflows,
  runtime entry/provider/router files, and theme implementation files named in
  the audit assignment
- Mode: read-only; no maintained documentation or code was changed

## Findings

### Confirmed drift

1. **README lists React Bootstrap, but the project does not use or declare it.**
   `README.md:95` calls the UI stack "React Bootstrap". `package.json` has React
   and styled-components but no `react-bootstrap` or `bootstrap` dependency,
   and no matching source import was found. Remove React Bootstrap from the
   table unless it is intentionally being restored.

2. **Architecture documentation understates generated direct-route pages.**
   `docs/architecture.md:67` says the build creates only `home/index.html`,
   `education/index.html`, and `projects/index.html`; its build check at line
   104 repeats that subset. The `package.json` build script generates pages for
   `home`, `experience`, `education`, `contact`, `splash`, `projects`, and
   `skills`, in addition to `404.html`. Document all seven routes or describe
   them collectively to prevent future list drift.

3. **Architecture documentation describes only two accent variants.**
   `docs/architecture.md:73` says accents switch between crimson-to-pink and
   indigo-to-navy. `src/theme.js` and `src/themeController.jsx` support three
   values: `pink`, `blue`, and `pink-indigo`. README's Appearance section is
   already accurate. Update the architecture explanation to include the third
   pink-to-indigo variant.

4. **README's theme-flow summary omits one supported accent.**
   `README.md:230` describes saved "pink/blue" accent selection, while the
   controller accepts `pink`, `blue`, and `pink-indigo`. The same README
   correctly enumerates all three at lines 72 and 282. Align the summary with
   those sections.

5. **Provider diagrams characterize analytics as a provider.**
   `README.md:222` and `docs/architecture.md:32` group analytics with installed
   providers. In `src/App.jsx`, analytics is initialized conditionally in a
   `useEffect`; it is not a context/provider wrapper. Reword to "global setup"
   or separate analytics initialization from ErrorBoundary, theme, and motion.

### Already synchronized

6. **Runtime and toolchain versions match.** README's React 19, Vite 8, Node
   `24.21.0`, npm `12.0.2`, React Router 7, styled-components 6, Framer Motion
   13, and Vitest 5 claims agree with `package.json` and `.nvmrc`.

7. **Routes and metadata behavior match.** Both maintained documents list the
   eight explicit routes plus a catch-all. `src/containers/Main.jsx` confirms
   lazy loading, visible Suspense fallback, per-route metadata, `/home`
   canonicalized to `/`, and `noindex` on splash and not-found routes.

8. **CI and GitHub Pages deployment descriptions match.** CI performs install,
   lint, typecheck, build, coverage tests, Chromium installation, and browser
   checks. Deployment performs install, lint, typecheck, build, one-shot tests,
   then uploads and deploys `build/` with the Pages actions.

9. **The Astro roadmap is clearly retired and its current implementation
   claims are consistent with the scoped sources.** The wildcard route,
   loading fallback, route metadata, lint/typecheck gates, and canonical
   GitHub Pages direction are represented in current runtime/workflow files.

### Human review

10. **External hosting status cannot be established from the scoped code.**
    The README and architecture document call GitHub Pages canonical and
    Vercel a live mirror. Repository configuration supports those builds, but
    availability and current platform settings require external verification.

## Suggested high-confidence edits

- Remove React Bootstrap from the README stack table.
- Correct the generated-route description and build checklist.
- Enumerate all three accents consistently.
- Distinguish analytics initialization from React providers.

## Validation performed

- Compared dependency and script claims with `package.json` and `.nvmrc`.
- Compared CI/deploy prose with both workflow YAML files.
- Compared routing/provider/theme prose with the scoped source files.
- Searched source and dependency manifests for Bootstrap usage; none found.
