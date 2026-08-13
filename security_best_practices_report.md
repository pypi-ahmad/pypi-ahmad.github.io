# Security Best Practices Report — pypi-ahmad.github.io

**Framework detected:** React 18 (JSX, Vite build) — no TypeScript, no backend. Evidence: `package.json` (`react@^18.3.1`, `vite`), `vite.config.js`, `vitest.config.js`, no server directory or API routes anywhere in the repo.

**References applied:** `javascript-typescript-react-web-frontend-security.md`, `javascript-general-web-frontend-security.md`.

## Executive summary

This is a static, client-only React SPA with no authentication, no backend, no user-submitted forms, and no data storage beyond a validated theme preference in `localStorage`. A full pass against both React-specific and general frontend rule sets (XSS sinks, `eval`/dynamic code execution, URL/redirect handling, `postMessage`, Web Storage, DOM clobbering, CSRF, service workers, file uploads, third-party scripts, CSP, dependency supply chain) found **zero exploitable code-level findings** — the codebase consistently uses safe patterns (JSX auto-escaping only, no `dangerouslySetInnerHTML`/`innerHTML`/`eval`, hardcoded navigation targets, allowlist-validated storage reads, `rel="noopener noreferrer"` on all external links). The two real gaps are both **infrastructure/configuration**, not code: no Content-Security-Policy or clickjacking headers are set anywhere, and the dev/build toolchain (`vite`, `vitest`) carries known advisories — though none of that vulnerable code ships in the production bundle.

## Findings

### Finding 1: No Content-Security-Policy or security headers configured
- Severity: Medium
- Rule ID: REACT-HEADERS-001 / REACT-CSP-001 / JS-CSP-001
- Location: `index.html:1-48` (no `<meta http-equiv="Content-Security-Policy">`), `vercel.json:1-4` (no `headers` block)
- Evidence: `index.html` `<head>` contains only favicon links, a canonical tag, and a static JSON-LD block — no CSP meta tag. `vercel.json` is `{"buildCommand": "npm run build", "outputDirectory": "build"}` with no `headers` array. The confirmed production deploy target, GitHub Pages (`.github/workflows/deploy.yml`, `peaceiris/actions-gh-pages@v4`), cannot serve custom response headers at all — this is a platform limitation, not something fixable in-repo for that path.
- Impact: Defense-in-depth against XSS and clickjacking is absent. Given no current XSS sinks exist in the code, exploitability today is low — but a CSP would be the safety net if one were ever introduced (e.g., a future `dangerouslySetInnerHTML` for markdown rendering), and `frame-ancestors`/`X-Frame-Options` would prevent the site from being iframed for clickjacking.
- Fix: If Vercel is a live/secondary deploy target, add a `headers` array to `vercel.json` setting `Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com`, plus `X-Content-Type-Options: nosniff` and `X-Frame-Options: DENY` (or `frame-ancestors 'none'` in the CSP). For the GitHub Pages path, the only in-repo option is a `<meta http-equiv="Content-Security-Policy">` tag in `index.html` — note this cannot carry `frame-ancestors` (meta-delivered CSP ignores it per spec), so clickjacking protection would remain unaddressed on that path regardless.
- False positive notes: If GitHub Pages is the sole, permanent deploy target, this is effectively unfixable without a different host or a CDN (e.g., Cloudflare) in front of it — worth noting as accepted risk rather than a code fix if so.

### Finding 2: Dev/build-tooling dependencies have known advisories (not reachable in production)
- Severity: Low
- Rule ID: REACT-SUPPLY-001
- Location: `package-lock.json` (via `npm audit`)
- Evidence: `npm audit --audit-level=moderate` reports 15 advisories (1 critical, 8 high, 4 moderate, 2 low) — `vitest` (critical: arbitrary file read via UI server, GHSA-5xrq-8626-4rwp), `vite` (high: path traversal in optimized deps `.map` handling, `server.fs.deny` bypass, dev-server WebSocket arbitrary file read), `launch-editor` (NTLMv2 hash disclosure via Windows UNC path), `yaml` transitive via `cosmiconfig` (moderate: stack overflow on deeply nested input), `undici` (Set-Cookie SameSite downgrade, cross-user cache disclosure).
- Impact: All flagged code paths are dev-server/test-runner-only (`vite`'s dev server, `vitest --ui`). CI (`ci.yml`) runs `vitest run` (no `--ui`) and `vite build`; the production artifact served by GitHub Pages is static `build/` output containing none of this tooling. Real exposure is limited to a developer running `npm run dev` or `vitest --ui` on a network-reachable interface.
- Fix: Run `npm audit fix` (not `--force`) next maintenance cycle; review the resulting `vite`/`vitest` version bumps for breaking changes before committing, per this skill's audit-triage guidance (fixes available, no forced major jumps needed based on current advisory data).
- False positive notes: Would escalate to Medium/High if the dev server is ever run on a shared network or exposed via a tunnel (e.g., `ngrok`) — not the case per current CI/deploy configuration.

## Not applicable (checked, no findings)

- **XSS / DOM injection** (REACT-XSS-001/002, REACT-DOM-001, JS-XSS-001-004): no `dangerouslySetInnerHTML`, `innerHTML`, `outerHTML`, `insertAdjacentHTML`, `document.write`, `eval`, or `new Function` anywhere in `src/` (repo-wide grep, zero matches).
- **URL/redirect handling** (REACT-URL-001, REACT-REDIRECT-001, JS-URL-001/002): only one `navigate()` call in the entire codebase (`Greeting.jsx:169`, `navigate("/contact")`) — a hardcoded literal, not derived from any URL parameter, storage, or user input. No open-redirect surface exists.
- **postMessage** (REACT-POSTMSG-001, JS-MSG-001): not used anywhere in `src/`.
- **Web Storage / token handling** (REACT-AUTH-001, JS-STORAGE-001): `themeController.jsx:35-53` reads a `localStorage` theme value, wraps `JSON.parse` in try/catch, and passes the result through `normalizeThemeSelection()`, which validates `family` against the known `themes` object and `mode` against a `"light"|"dark"` enum before use — correctly treats storage as untrusted and allowlists the result. No auth tokens or session identifiers are stored client-side (no auth exists).
- **CSRF / authorization** (REACT-CSRF-001, REACT-AUTHZ-001): not applicable — no cookies, no authentication, no state-changing requests of any kind.
- **DOM clobbering** (FS-DOMC-001): no `window.<name> ||` / `document.<name> ||` config-fallback patterns found.
- **File uploads** (REACT-FILE-001): no `<input type="file">`, `FileReader`, or upload UI anywhere in the app.
- **Service workers** (REACT-SW-001): no `serviceWorker.register` call anywhere — this Vite-based app doesn't register one at all.
- **Third-party scripts / SRI** (REACT-3P-001, REACT-SRI-001, JS-SUPPLY-001, JS-SRI-001): `index.html` loads no external `<script src>` tags at all — only a same-origin module entry point. `react-ga4` (`App.jsx:18,27`) is npm-bundled, not injected as a raw script tag, and is currently inert (`googleTrackingID: ""` in `src/data/settings.js:11` — the `if (settings.googleTrackingID)` guard means `ReactGA.initialize` never runs today). If a tracking ID is added later, Google's `gtag.js` (which GA4 loads dynamically) can't practically carry SRI since Google updates it unversioned — an accepted, industry-standard limitation, not a fixable code issue.
- **Secrets in bundle** (REACT-CONFIG-001): no API keys/secrets found in `src/` or `public/` (grep for key/secret/token/PEM patterns; only hit was descriptive prose in `platform.js` about a portfolio case study's architecture, not a real credential).

## Criticality calibration (for this repo)

- **Critical/High**: would require an actual XSS sink reachable with attacker-controlled data, a secret committed to the repo, or an auth bypass — none exist because there's no auth and no dynamic HTML rendering.
- **Medium**: missing defense-in-depth (this report's Finding 1) — matters if a future feature introduces a new sink, not exploitable today.
- **Low**: dev-tooling-only dependency advisories (Finding 2), SRI gaps on unavoidably-dynamic third-party scripts.

## Summary

2 findings, both configuration/infrastructure-level, neither currently exploitable given the app's static, no-auth architecture. No code changes needed — the codebase already follows this stack's secure-by-default patterns consistently.

Report written to: `security_best_practices_report.md`
