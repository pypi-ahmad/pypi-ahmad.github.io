# GitHub dashboard

The homepage loads a small GitHub preview near the viewport. `/github` has six focused views: Overview, Projects, Activity, Impact, Arcade, and Animations. Each secondary view loads on demand. Overview leads with four key metrics, followed by a detailed statistics snapshot and rolling 365-day contribution heatmap. The snapshot uses repository count instead of an unsupported profile grade, calculates all-time and streak ranges from recorded days, and calculates language percentages from all public repository language bytes. The heatmap scrolls within its own labeled region on narrow screens and exposes exact daily counts in a native disclosure. Projects contains the selected work and repository explorer. Activity contains contribution history, comparisons, releases, and an advanced-metrics disclosure; legacy `#advanced-dashboard` links open that disclosure in Activity. Selecting Arcade loads the game interface without starting play.

Animations is separate from the playable arcade. It embeds the seven original animated SVGs from the profile repository's `output` branch, choosing light or dark assets from the site's theme. Each image loads only after Play and is removed on Stop; switching themes resets playback. This opt-in behavior also applies with reduced motion. Failed images offer Retry. These remote animations use their own generated grid, not the selected dashboard year, and remain accessible when dashboard JSON is unavailable.

## Public data contract

`src/data/github.js` defines the committed `/data/github.json` snapshot and the newer public export at `https://raw.githubusercontent.com/pypi-ahmad/pypi-ahmad/main/profile-stats/dashboard.json`. The shared store validates schema version 1, tries the saved snapshot first, then checks the remote once per session. Retry is explicit. Each request has an eight-second timeout and omits credentials. Invalid or older remote data cannot replace a valid snapshot. The timestamp and saved-data notice remain visible; data older than 72 hours gets a freshness warning.

The profile repository's `scripts/generate_github_stats.py` exports the JSON alongside its existing SVGs. Its scheduled workflow already stages the whole `profile-stats` directory. The exporter uses an explicit public-field allowlist and atomically replaces the JSON only after validation. Never embed a GitHub token in the portfolio.

Repository metrics cover public, owned, non-fork, non-archived repositories. Contribution totals are GitHub profile aggregates and may include private contribution counts, but private repository names are excluded. Contribution dates and calendar levels come from GitHub. Current streaks allow an unfinished current day; longest streaks cross year boundaries. Missing dates break streaks.

Repository language share uses language bytes, not commit counts. Recent language activity is a commit-weighted estimate using the existing collector's sample limits: up to 100 authored commits per repository across up to 100 repositories. Coding timezone and sample coverage are displayed. Release/download totals cover available repositories; traffic covers the available last 14 days. Unavailable metrics are null, not fabricated zeroes. Star history describes current stargazers by receipt date, not historical net star totals.

The Overview's “last 365 days” ends on `summary.streak.asOf`, crosses calendar-year boundaries, and sums only recorded daily counts. Missing dates remain visibly unavailable. The bundled snapshot renders first; each new application load then requests the latest validated daily export. This is a daily snapshot workflow, not real-time GitHub API streaming.

The additive schema-v1 fields `repositories`, `releases`, `externalPullRequests`, and `discoveryCoverage` power discovery. Older snapshots without them remain valid and show unavailable states. `scripts/discovery_export.py` paginates all public owned repositories and authored merged PRs, filters private/own-repository PRs, and reuses already-fetched releases. New discovery collection failures stop publication rather than claim partial history is complete. Both exporter and browser validate public links and record shapes.

Explorer defaults exclude forks and archives; inclusion filters expose them. Search covers name, description, and topics; language filtering uses GitHub's primary language. Featured ordering follows the existing portfolio catalog and never bypasses filters. Pages contain 12 repositories. Release and PR pages contain 10 entries. Creation/release history includes currently public archived originals but excludes forks, drafts, deleted repositories, and private repositories. Prereleases remain explicitly labeled. Notes are short text excerpts, with links to their complete source and optional release assets.

`src/data/githubWork.js` holds the three editorial project cards and evidence links. Review these manually when milestones change. Current next steps intentionally say “Not announced yet.” External impact intentionally shows an empty state when no public external merged PRs are present; stars and forks are supporting context, not an impact score.

Year comparisons default to shared month/day records between selected years. Unshared dates, including unmatched leap days and future dates, are excluded. Full recorded-year comparison is an explicit alternative. Missing months are not shown as zero; exact tables distinguish uncovered months. Percentage change is unavailable for missing coverage or a zero baseline.

## URL-backed views

The URL query carries `tab`, `year`, `compare`, `period`, `calendar`, `day`, `game`, `mode`, and `challenge`, plus explorer filters and pagination. For example: `/github?tab=activity&year=2025&calendar=3d`. Search edits replace the current history entry; explicit controls create entries. Invalid enumerations and unavailable filters fall back safely. Canonical metadata stays `/github`. Existing statistics/history/arcade fragment links resolve to their associated view.

## Refresh the saved snapshot

From `D:\AI\Github\pypi-ahmad`, with authenticated `gh` available:

```powershell
uv run --no-project python scripts/generate_github_stats.py --dashboard-only
uv run --no-project python -m unittest discover -s tests -v
Copy-Item profile-stats/dashboard.json D:\AI\Github\pypi-ahmad.github.io\public\data\github.json
```

Omit `--dashboard-only` to regenerate the existing SVGs too. Review the generated public data before publication. Export publication and portfolio deployment remain separate operations; until the export is published, the portfolio uses its saved snapshot.

## History and arcade

The year selector controls the calendar, isometric view, and the next game. Both history views use the same daily records. Date buttons support arrows, Home, and End; exact counts are also available as a table. The isometric illustration retains the selectable calendar below it.

Snake, Pac-Man, Breakout, Galaga, Bomberman, Puzzle Bobble, and Minesweeper each have a deterministic engine seeded by the selected year's contribution data. These are playable adaptations, not the profile README's animated SVGs. Instructions, keyboard controls, touch controls, Play, Pause, Resume, and Restart are available. Games pause when hidden, outside the viewport, or when focus leaves the arcade. An active run keeps its starting snapshot; restarting adopts refreshed data. Personal bests are local to the browser, game, year, and snapshot. No scores are transmitted.

Daily mode rotates one game per UTC date using a date/game/engine-version seed and fixed scoring independent of contribution updates. Shared dates open that day's challenge in Ready state. Midnight advertises the new challenge without changing an active run. Free play keeps its contribution-based rules.

`github-arcade-progress:v1` stores the latest 100 completed runs and lifetime achievement/game-completion sets. Existing `github-arcade:*` personal-best keys are retained. Duplicate completions are ignored. History marks best scores within retained matching game/snapshot contexts; scores from different contribution snapshots are not interchangeable. Storage failure leaves the session playable. Clear arcade progress requires confirmation and deletes only arcade keys, never theme preferences. No accounts, remote scores, or telemetry were added.

## Verification and interface review

Run `npm run lint`, `npm run typecheck`, `npm run test:coverage`, and `npm run build`. With production preview on port 4173, run `node scripts/check-frontend.mjs` and `node scripts/check-github.mjs`. The latter covers navigation, lazy game loading, all seven keyboard/touch lifecycles, calendar/3D selection parity, and saved-data recovery. Remote success is intercepted with the real committed snapshot for deterministic checks; remote failure is tested separately.

The design review covered layout, typography, color, copy, interaction feedback, and accessibility. Existing font and semantic theme tokens were retained. Metric labels state scope; unavailable values and stale data have explicit feedback. Native controls and exact-number alternatives accompany charts. The focused Chromium checks found no automated accessibility violations across light/dark modes at 320, 390, 768, and 1440 pixels; 200% text sizing caused no page overflow. Automated contrast and ARIA checks included incomplete results, so this is not a blanket accessibility certification. Canvas games have keyboard controls and textual status, but are not claimed to be fully nonvisual equivalents.

Desktop/mobile dashboard and arcade screenshots were visually inspected. The development-only `/dev/contribution-calendar-break.html` imports the real calendar with dense leap-year, sparse, single-date, zero, empty, loading, error, and squeezed-container cases. The inspected dark-mode report showed no layout breaks. It is not part of the production build. Browser proof uses Chromium and emulated touch, not Safari, physical devices, or a screen reader.

The repository-card report is `/dev/repository-card-break.html`. It uses only fixture props with the real component and app styling. Its single dark-mode visual pass showed no layout breaks in the rendered cases; expanded topic contents were not part of that visual pass. Both stress pages remain available in development and are excluded from the production build. See [the focused interface review](github-interface-review.md) for current coverage and limits.
