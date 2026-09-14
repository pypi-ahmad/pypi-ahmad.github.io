# Runbook

Operational notes for running this static site locally and diagnosing the failures its CI and build
process can actually produce. There is no running server process in production — GitHub Pages and
Vercel serve a pre-built static bundle — so "start/stop" here means the local dev/preview servers and
the CI/deploy pipelines, not a long-lived backend process.

## Start / stop

```bash
npm run dev       # start: Vite dev server on http://localhost:3000 (foreground; Ctrl+C to stop)
npm run build     # one-shot: produce build/ plus static per-route fallback HTML
npm run preview   # start: serve build/ on http://localhost:4173 (foreground; Ctrl+C to stop)
```

Both `dev` and `preview` run in the foreground and block the terminal; stop them with Ctrl+C (or, per
[`docs/codebase/TESTING.md`](codebase/TESTING.md), keep them running in dedicated terminals while a
browser-check script runs against them from a third terminal).

Deployment has no manual "start" step: pushing to `main` triggers `.github/workflows/deploy.yml`,
which builds, tests, and uploads the GitHub Pages artifact automatically. `npm run deploy` is a
separate, manual path (`gh-pages -d build`) that publishes directly from a local build; Vercel builds
from its own Git integration with `deploymentEnabled.gh-pages: false` in `vercel.json`, so it does not
trigger from GitHub Actions.

## Logs location

- **Local dev/preview**: server output and runtime errors print to the terminal that ran `npm run dev`
  / `npm run preview`. Browser-side errors (including anything the `ErrorBoundary` catches) appear only
  in that browser's DevTools console — nothing is sent to a remote log.
- **CI**: `.github/workflows/ci.yml` and `.github/workflows/deploy.yml` logs are on the run's GitHub
  Actions page. The browser-check step in CI writes axe/layout findings to a temporary `report.json`
  on the runner, not to a persisted artifact (per `docs/codebase/TESTING.md`).
- **Production**: no server-side or remote error log exists. `ErrorBoundary` swallows render failures
  behind a reload button and reports nothing externally.

## Common failures and where they come from

| Symptom | Likely cause | Where to look |
| --- | --- | --- |
| `npm ci` fails or resolves different versions | Local Node/npm doesn't match the pin | Check `node -v` / `npm -v` against `.nvmrc` (`24.21.0`) and `package.json` `engines` (npm `>=12.0.2 <13`) |
| `npm run lint` fails | ESLint rule violation | `eslint.config.js`; run `npm run lint` locally, it reports the offending file/line |
| `npm run typecheck` fails | `tsc --noEmit` compatibility issue (not full JS type checking — `checkJs: false`) | `tsconfig.typecheck.json` |
| `npm run build` fails | Bundler/JSX error Vite couldn't resolve | Vite's terminal output names the failing module |
| `npm run test:coverage` fails on thresholds | Coverage dropped below 85% statements/lines or 75% branches/functions | Vitest's coverage summary in the terminal; add/adjust tests, not the threshold |
| CI's "Browser checks" step fails | `scripts/check-frontend.mjs` couldn't reach the preview server, or found an axe/layout regression | The step's own log; the script polls `http://127.0.0.1:4173/` for up to 30s before failing |
| A direct visit to a route 404s on GitHub Pages but works when navigated to in-app | The route exists in `src/containers/Main.jsx` but wasn't added to the fallback list in `package.json`'s `build` script (documented risk, see `docs/codebase/CONCERNS.md`) | `package.json` `scripts.build`, `src/containers/Main.jsx` route table |
| Theme resets to dark unexpectedly | Stored `localStorage["theme"]` value didn't parse as `"light"`/`"dark"`; `parseStoredThemeMode()` falls back to the default | `src/themeController.jsx` |
| Deploy workflow succeeds but production still shows old content | Deploy workflow only runs on push to `main`; a `workflow_dispatch` re-run or a check of the Pages environment's deployed run is the next step | `.github/workflows/deploy.yml`, the repository's Pages environment/deployment history |

## Not covered by this runbook

There is no database, queue, background worker, or server process to restart, and no application
secrets to rotate — this is confirmed by the absence of any `.env`/`.env.example` file or
`process.env` read in `src/` (see [`docs/codebase/INTEGRATIONS.md`](codebase/INTEGRATIONS.md)).
Hosting-account-level operations (GitHub Pages environment protection, Vercel project settings,
domain configuration) live outside this repository and are unknown from source alone.
