# External Integrations

## 1) Integration Inventory

| System | Type | Purpose | Auth model | Criticality | Evidence |
| --- | --- | --- | --- | --- | --- |
| GitHub repositories | Outbound browser links | Project and profile links | Public URLs | Medium | `src/data/projects.js`, `src/data/socialMedia.js` |
| Google Analytics 4 | Browser analytics SDK | Optional client-side analytics | Public measurement ID in `settings` | Low while disabled | `src/App.jsx`, `src/data/settings.js` |
| GitHub Pages | Static hosting | Canonical deployment | GitHub Actions token permissions | High | `.github/workflows/deploy.yml` |
| Vercel | Static-host mirror | Builds and serves `build/` | [TODO] Hosting-account configuration is outside the repository | Low | `vercel.json`, `README.md` |

No runtime HTTP client, fetch call, database driver, queue client, API gateway, or service-mesh configuration was found in application source.

## 2) Data Stores

| Store | Role | Access layer | Key risk | Evidence |
| --- | --- | --- | --- | --- |
| Browser localStorage | Persists theme mode and accent | `ThemeControllerProvider` | Missing/malformed values normalize to defaults; storage-access exceptions are not caught | `src/themeController.jsx` |
| Bundled JavaScript data | Portfolio content at build time | `src/portfolio.js` | Updates require source edit and redeployment | `src/data/`, `src/portfolio.js` |

No server-side database or distributed cache was found.

## 3) Secrets and Credentials Handling

- Credential sources: no required runtime secret or environment variable was found.
- The analytics measurement ID is intentionally empty by default; a configured ID would be delivered to browsers and must not be treated as confidential.
- GitHub Actions uses declared `pages: write` and `id-token: write` permissions for deployment; repository/environment configuration is [TODO] outside the checked-in workflow.
- Rotation and hosting-account lifecycle practices: [ASK USER] define the owner and rotation/revocation process for GitHub Pages and Vercel access.

## 4) Reliability and Failure Behavior

- Retry/backoff, timeout, and circuit-breaker policies: none in application source because it has no runtime remote API calls.
- Missing or invalid local theme preferences normalize to supported values.
- The controller does not wrap localStorage reads or writes in error handling;
  blocked storage is not covered by the malformed-value fallback.
- Contact URLs are configured outbound links. Empty/whitespace-only values hide
  channels; this is a visibility rule, not URL validation or a reachability check.
- An uncaught React render error displays the local error boundary fallback; no remote reporting is implemented.
- Static-host deep-link reliability depends on the generated fallback HTML included by `npm run build`.

## 5) Observability for Integrations

- Application logging around integrations: none found.
- Metrics/tracing: optional GA4 only when a measurement ID is configured; no error telemetry found.
- CI browser checks write temporary reports, but they are not production monitoring.

## 6) Evidence

- `src/App.jsx`, `src/data/settings.js`, `src/themeController.jsx`
- `src/data/projects.js`, `src/data/socialMedia.js`, `src/portfolio.js`
- `.github/workflows/deploy.yml`, `vercel.json`, `package.json`
