# Changelog

## Unreleased

### Changed

- Replaced the three-way accent picker (pink, blue, pink-indigo) with a single indigo-to-navy visual identity; the header no longer shows accent swatches, and light/dark mode is the only remaining preference.
- Replaced Google Sans with variable Inter and Manrope fonts (Open Font License) and established a consistent site-wide typography scale.
- Warmed the light theme's color palette and enlarged page section labels, including the homepage eyebrow, for readability.
- Disabled Vercel's automatic Git-triggered deployment for the `gh-pages` branch (`vercel.json`); Vercel production deployments are now explicit.

## v3.0.0 - 2026-09-12

### Added

- Featured the Anthropic Claude Certified Associate credential separately from course-completion certificates.
- Added accessible route-loading feedback, focused error recovery, and an actionable empty-contact state.
- Expanded component, navigation, responsive-layout, motion, recovery, and browser regression coverage.

### Changed

- Refined responsive layouts, typography, theme controls, interaction feedback, and contrast across the portfolio.
- Synchronized contributor, testing, architecture, and project documentation with the current application.
- Removed the unused SVG transform plugin and its dependency chain.

## v2.4.0 - 2026-08-15

### Changed

- Upgraded package management to npm `12.0.2`, removed unused legacy tooling, and migrated deployment to official GitHub Pages actions.
- Migrated the repo to Node.js `>=24.19.0 <25` (local pin `24.19.0`) and upgraded frontend dependencies and GitHub Actions to current latest stable versions.

## v2.2.0 - 2026-07-02
- Added three Deloitte enterprise case studies for portfolio presentation: Document Fraud Detection Engine, Agentic Kickback & Referral Fraud Detection Platform, and Out-of-Network Claims Intelligence Dashboard.
- Expanded and refined recruiter-facing portfolio content across greeting, projects, skills, and Deloitte experience sections with updated modern AI engineering signal.
- Updated frontend dependencies to latest compatible versions and re-verified build/test execution.
