# Security Policy

## Security surface

This is a **static, client-only application**. It has no backend server, no database, no authentication service, and no external API of its own. The attack surface is correspondingly limited:

- All code runs in the visitor's browser.
- No user data is collected or stored server-side.
- Google Analytics is disabled by default (`googleTrackingID` is an empty string).
- GitHub Pages serves pre-built static assets — no server-side execution.

## What to report

Please report:

- **Supply-chain vulnerabilities** — a dependency in `package.json` with a known CVE that affects what this project ships to browsers
- **Content injection** — a way to inject arbitrary HTML or scripts through rendered portfolio data
- **Credential exposure** — evidence that an API key, token, or secret has been committed to the repository

Please do not report:

- Vulnerabilities in browsers or browser extensions — report those to the browser vendor
- Issues with your own fork or deployment — you are responsible for your own configuration (see [DISCLAIMER.md](DISCLAIMER.md))
- Missing security headers on GitHub Pages — the hosting platform controls response headers

## Supported versions

Security fixes are applied to the `main` branch. There are no separately maintained release branches.

## Reporting a vulnerability

1. **Do not open a public GitHub Issue** for a vulnerability that could be exploited before a fix is available.
2. Use [GitHub's private security advisory](https://github.com/pypi-ahmad/pypi-ahmad.github.io/security/advisories/new) to report privately.
3. Include: a clear description, steps to reproduce, assessed impact, and any suggested remediation.

If you are unsure whether a finding warrants private disclosure, err on the side of using the private advisory — it is easy to convert to a public discussion later.

## Response

The maintainer will acknowledge the report, assess severity, and communicate a fix timeline through the advisory. Fixes land on `main` and are noted in the commit message. There is no formal bug-bounty program.
