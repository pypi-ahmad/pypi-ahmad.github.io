# Codebase Concerns

Snapshot: 2026-09-10, local HEAD 4c9a60b. Findings document current code; no application fixes were made.

## Core Sections (Required)

### 1) Top Risks (Prioritized)

| Severity | Concern | Evidence | Impact | Suggested action |
| --- | --- | --- | --- | --- |
| Medium | Explicit HTML copies cover only home/education/projects | `package.json` build script | Other direct routes rely on host fallback; SEO/status may differ | Verify deployed HTTP statuses before choosing a fix |
| Medium | JS checking disabled; unused variables not linted | `tsconfig.typecheck.json`, `eslint.config.js` | Passing gates do not establish strict static correctness | Add targeted checking when modifying high-risk modules |
| Medium | Deployment workflow independent of lint/typecheck CI | `.github/workflows/deploy.yml` | Source can deploy without those gates within this workflow | Review desired release gate |
| Low | localStorage operations not exception-safe | `src/themeController.jsx` | Restricted storage can send app to generic error fallback | Reproduce restricted-storage behavior before changing |
| Low | Browser diagnostic errors do not force failure exit | `stress-test.mjs` main loop/catch | Shell success can hide failed measurements | Treat output as diagnostics, not CI proof |

### 2) Technical Debt

| Debt | Why it exists | Where | Risk | Suggested action |
| --- | --- | --- | --- | --- |
| Theme documentation drift | [TODO] Historical cause not established | README and docs/architecture vs theme registry | Contributors miss third accent | Sync prose to pink, blue, pink-indigo |
| Limited type validation | checkJs deliberately false in current config; rationale unknown | tsconfig.typecheck.json | Incorrect assumptions about test coverage | State limitation; consider incremental checking |
| Cleanup plan still open | Existing task files retain unchecked items | tasks/plan.md, tasks/todo.md | Old plans mistaken for completed changes | Review separately; listed image files still exist |
| Declared web-vitals without source import | [TODO] Rationale unknown | package.json, source search | Misleading telemetry expectation | Confirm whether measurement is desired |

Scan found no production TODO/FIXME/HACK markers. This does not mean no technical debt. Test coverage gaps are tracked in TESTING.md, separate from production issues.

### 3) Security Concerns

| Risk | OWASP category | Evidence | Current mitigation | Gap |
| --- | --- | --- | --- | --- |
| Client-delivered secrets if added later | N/A; architectural boundary | App is static; CONTRIBUTING rules | No credential-reading application integration found; analytics disabled | Historical secret audit not run |
| Dependency supply chain | N/A; no specific vulnerability established | package-lock.json, CI npm ci | Lockfile installs | [TODO] Current advisory assessment |
| Host security headers | N/A | SECURITY.md, vercel.json | Platform-owned static serving | [TODO] Live response headers not inspected |

No confirmed exploitable vulnerability was established by this mapping. The generic error boundary does not expose a stack trace in its rendered fallback.

### 4) Performance and Scaling Concerns

| Concern | Evidence | Current symptom | Scaling risk | Suggested improvement |
| --- | --- | --- | --- | --- |
| Initial JS and fonts | Build output; src/index.css | Main JS 324.10 kB / 105.38 kB gzip; Montserrat asset 245.70 kB emitted | Transfer/parse cost on slower devices | Measure actual route requests before optimizing |
| Global style concentration | src/global.js, 520 lines at snapshot | Shared typography, spacing, transitions | Visual changes affect many routes | Check representative pages/modes |
| Icon payload audit pending | Astro migration roadmap SPA-014 | No current bundle attribution measurement | Unknown unused icon cost | Run scoped bundle inspection when authorized |

Emitted asset size is not proof every visitor downloads it. Browser stress script was not run, so no LCP/CLS/INP or scaling result is claimed. Backend query/queue scaling does not apply to the inspected static application.

### 5) Fragile/High-Churn Areas

Counts are file appearances in commits over the scan's last-90-days window, not bug counts.

| Area | Why sensitive | Churn signal | Safe change strategy |
| --- | --- | --- | --- |
| README.md | User setup and behavior contract | 17 | Cross-check claims against config/source |
| package.json | Runtime/build/deploy commands | 10 | Verify lockfile and quality commands |
| Behavior.test.jsx | Theme interaction contract | 9 | Preserve deliberate mode/accent behavior |
| Main.jsx | All route dispatch and metadata | 8 | Run navigation and metadata suites |
| Pages.render.test.jsx | Broad rendering contract | 8 | Review intended content changes |
| package-lock.json; docs/architecture.md; RouteMetadata.test.jsx | Dependencies and architecture/SEO contract | 7 each | Keep related source/docs/tests aligned |
| src/data/experience.js | Public work claims | 6 | Preserve evidence and contribution boundaries |

Source-only line counts identified global.js as the largest inspected application source at 520 lines. Raw scan counts include binary/local graph artifacts; do not use its 168,275-line aggregate as application LOC. The scan also missed the JSX entry point and custom stress script; manual inspection corrected those omissions.

### 6) `[ASK USER]` Questions

1. [ASK USER] Is the existing Astro migration roadmap still the intended direction, including the SPA-014 icon audit before scaffolding?

Intent versus reality:
- Older architecture prose describes two accents; source, tests, and the updated README implement/document three.
- README describes JS-checking tooling; checkJs is false, so its assurance is limited.
- Astro roadmap explicitly plans future scaffolding; current application remains React/Vite. This is pending intent, not a failed migration.
- Existing asset-cleanup checklist is unchecked and its three named files are still present; deletion is not part of this mapping.
- Scan misses React entry/performance tooling and includes generated/local index material; corrected map follows source.

### 7) Evidence

- `docs/.codebase-scan.txt`: history, churn, scan limitations
- `package.json`, `tsconfig.typecheck.json`, `eslint.config.js`
- `src/themeController.jsx`, `src/theme.js`, `src/global.js`, `src/index.css`
- `stress-test.mjs`, `.github/workflows/deploy.yml`
- `README.md`, `docs/architecture.md`, `docs/migration/astro-migration-roadmap.md`
- `tasks/plan.md`, `tasks/todo.md`, `SECURITY.md`
- Local terminal: git status/HEAD, source line counts, quality commands and build sizes recorded in this map.

Workflow: Phase 1 scan/intent complete; Phase 2 investigation complete; Phase 3 seven documents populated; Phase 4 evidence/section validation complete after checks. The intent question above remains open and does not prevent documenting current implementation.
