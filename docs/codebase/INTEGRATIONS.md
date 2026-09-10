# External Integrations

## Core Sections (Required)

### 1) Integration Inventory

| System | Type | Purpose | Auth model | Criticality | Evidence |
| --- | --- | --- | --- | --- | --- |
| GitHub Pages | Static hosting | Canonical deployment | Actions pages:write/id-token:write | High | `.github/workflows/deploy.yml` |
| Vercel | Hosting configuration | Documented mirror | [TODO] External project settings | Secondary | `vercel.json`, `README.md` |
| Google Analytics 4 | Optional telemetry SDK | Conditional initialization | Measurement ID config, currently empty | Optional | `src/App.jsx`, `src/data/settings.js` |
| GitHub and social/contact destinations | Outbound links/mailto | Project evidence and contact | No app-managed login | Content-dependent | `src/data/projects.js`, `src/data/socialMedia.js`, `ContactLinksList.jsx` |
| npm registry | Build dependency supply | Install lockfile dependencies | No custom credential specified in workflow | Build-critical | `package-lock.json`, `.github/workflows/ci.yml` |

Source search found no fetch/axios calls, application API gateway, database client, or queue integration. An AI project listed in the portfolio is content, not an AI API integration in this website.

### 2) Data Stores

| Store | Role | Access | Key risk | Evidence |
| --- | --- | --- | --- | --- |
| Committed JS data | Portfolio content | portfolio barrel | Needs rebuild; no runtime schema | `src/portfolio.js` |
| Browser localStorage | Theme/accent preferences | getItem/setItem | Browser access exceptions uncaught | `src/themeController.jsx` |

No backend database or user-account store was found.

### 3) Secrets and Credentials Handling

The application does not read OPENAI_API_KEY or OPENAI_BASE_URL. Earlier environment-key checks are separate from website behavior. No application credential source was found in inspected source/config; this is not a historical secret audit.

Actions declares limited publishing permissions. Analytics remains disabled through an empty googleTrackingID. `.gitignore` excludes .env patterns; ignored files are not a security boundary for bundled client code.

[TODO] Remote credential lifecycle, host account configuration, and rotation policies were not inspected.

### 4) Reliability and Failure Behavior

There is no custom API retry/backoff, timeout, or circuit breaker because no application API fetch layer was found. Outbound navigation is handled by the browser. ErrorBoundary offers refresh after React failures; it is not an integration retry manager. Live external links and host fallback responses were not probed.

### 5) Observability for Integrations

GA initialization is conditional; no explicit ReactGA route-event calls were found. ErrorBoundary has no error-reporting hook. web-vitals is declared but no src import was found. Browser diagnostics exist in stress-test.mjs; production performance and runtime exceptions have no verified reporting pipeline.

### 6) Evidence

- `src/App.jsx`, `src/data/settings.js`, `src/themeController.jsx`
- `src/data/socialMedia.js`, `src/data/projects.js`
- `src/components/socialMedia/ContactLinksList.jsx`, `src/components/ErrorBoundary.jsx`
- `.github/workflows/deploy.yml`, `vercel.json`, `.gitignore`, `SECURITY.md`
