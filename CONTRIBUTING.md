# Contributing

Thank you for taking the time to contribute! This project is free, MIT-licensed, and genuinely community-driven. Every bug report, documentation fix, accessibility improvement, and feature idea helps.

## Ways to contribute

| Type | Where |
| --- | --- |
| Bug report | [Open a bug report](https://github.com/pypi-ahmad/pypi-ahmad.github.io/issues/new?template=bug_report.md) |
| Feature idea | [Open a feature request](https://github.com/pypi-ahmad/pypi-ahmad.github.io/issues/new?template=feature_request.md) |
| Documentation fix | Edit any `.md` file and open a pull request |
| Accessibility improvement | Issues or PRs tagged `a11y` |
| Theme or design tweak | Issues or PRs against `src/theme.js` or styled-components |
| Test coverage | New or improved tests in `src/__tests__/` |
| Code change | Fork → branch → PR (see below) |

**No financial support is needed or wanted.** The project is free. A clear issue or a well-tested pull request is more valuable than any donation.

## Local setup

### Prerequisites

- Node.js `24.19.0` (`.nvmrc` contains the pin — use `nvm use` or install manually)
- npm `12.0.2`

### Install

```bash
git clone https://github.com/pypi-ahmad/pypi-ahmad.github.io.git
cd pypi-ahmad.github.io
npm install --global npm@12.0.2
npm ci
```

### Development server

```bash
npm run dev
# opens http://localhost:3000
```

## Quality checks

Run all of these locally before pushing:

```bash
npm run lint        # ESLint
npm run typecheck   # TypeScript static analysis
npm run build       # production build (catches bundler errors)
npm run test:run    # full Vitest suite
```

CI runs the same sequence on every push and pull request to `main`. A failing check blocks merge.

## Pull request workflow

1. Fork the repository and create a branch from `main`.
2. Make your change — keep it focused on one concern.
3. Run the quality checks above and fix any failures.
4. Open a pull request against `main`.
5. Fill in the pull request template.
6. A maintainer will review and respond.

## Ground rules

- **No live credentials in tests.** Tests run in jsdom with mocked dependencies. Do not add tests that require real API keys, network calls, or environment secrets.
- **No analytics IDs.** `googleTrackingID` in `src/data/settings.js` must remain an empty string in the repository.
- **No donations or monetization features.** PRs that add tip jars, sponsor links, paywalled content, or any form of financial collection will not be merged.
- **Keep content accurate.** All portfolio content (`src/data/`) reflects real work. Do not add fabricated or speculative entries.
- **Match existing style.** Run `npm run lint` and address all errors before opening a PR.
- **One PR, one concern.** A PR that fixes a bug and adds an unrelated feature will be asked to split.

## Questions?

See [SUPPORT.md](SUPPORT.md) for where to ask questions and get help.
