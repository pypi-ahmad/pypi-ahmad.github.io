# Portfolio architecture

## Purpose and boundaries

This document explains how the current portfolio works so a new contributor can find the right code, understand its constraints, and make a safe change. It describes the React and Vite single-page application in this repository. The planned Astro migration is separate work tracked in [the migration roadmap](migration/astro-migration-roadmap.md).

The deployed application is static. It has no server application, database, authentication layer, or runtime content API. Portfolio content is committed as JavaScript data and bundled with the client.

## System context

```mermaid
flowchart LR
  visitor[Visitor] --> browser[React application in browser]
  contributor[Contributor] --> source[Repository source and content]
  source --> ci[GitHub Actions CI]
  source --> vercel[Vercel build]
  ci --> pages[GitHub Pages]
  pages --> browser
  vercel --> browser
  browser --> github[Public GitHub repositories]
  browser --> analytics[Optional Google Analytics 4]
```

GitHub Pages is the canonical host. Vercel provides a mirror. The application links to public project repositories and can send analytics only when `googleTrackingID` is configured. The committed value is empty.

## Runtime structure

```mermaid
flowchart TD
  html[index.html] --> entry[src/index.jsx]
  entry --> app[src/App.jsx]
  app --> providers[Error, theme, motion, analytics providers]
  providers --> main[src/containers/Main.jsx]
  main --> metadata[RouteMeta]
  main --> pages[Lazy page components]
  pages --> components[Shared components]
  pages --> portfolio[src/portfolio.js]
  portfolio --> data[src/data modules]
  providers --> themes[Theme controller and theme registry]
```

`src/index.jsx` mounts React. `src/App.jsx` installs global providers and styles. `src/containers/Main.jsx` owns the browser router, lazy page imports, loading fallback, and route metadata. Pages compose shared components and read content through `src/portfolio.js`, which re-exports the data modules.

This separation keeps content edits out of page components. It is a convention rather than an enforced schema. Tests protect important contracts such as project order, required project fields, homepage outcomes, and the first four featured projects.

## Homepage and project data

`src/data/homePage.js` owns homepage copy for the hero, qualified outcomes, working method, work areas, and closing contact prompt. `src/data/projects.js` owns the 13 project-card objects. The homepage reads `projects.data.slice(0, 4)`, so array order is part of the homepage contract.

Project entries keep this shape:

```js
{
  name: "Project name",
  url: "https://github.com/pypi-ahmad/repository",
  description: "One sentence derived from the repository README.",
  category: "Area · Focus"
}
```

Changing one of the first four entries changes both project-page order and homepage selection. Update contract tests with any deliberate reorder.

## Routing, metadata, and static hosting

React Router handles `/`, `/home`, `/experience`, `/education`, `/projects`, `/skills`, `/contact`, `/splash`, and the catch-all page. Each route is paired with `RouteMeta`, which manages its title, description, canonical URL, robots rule, Open Graph tags, and Twitter tags.

Both `/` and `/home` render the homepage. Metadata normalizes `/home` to the canonical root URL. The production build copies `index.html` to `404.html` for GitHub Pages route recovery. It also creates `home/index.html`, `education/index.html`, and `projects/index.html` so direct requests for those routes return HTTP 200.

`index.html` supplies fallback metadata before React loads. Its JSON-LD describes a `ProfilePage` whose main entity is Ahmad Mujtaba. When homepage positioning changes, update both fallback metadata and runtime route metadata.

## Light and dark modes

`src/themeController.jsx` reads the saved light or dark mode from `localStorage`, migrates older family-and-mode objects, and resolves the matching default token set. Without a valid saved choice, it uses dark mode. `src/theme.js` contains the two complete token sets consumed by styled-components and global CSS variables.

Components should use semantic tokens such as text, secondary text, card background, border, and accent so both modes remain readable. Interactive components also need visible focus states and reduced-motion behavior.

## Design decisions

### Content stays in the repository

Plain JavaScript data keeps deployment simple and makes every content change reviewable. The tradeoff is that content updates require a code review and new build.

### Routes load lazily

Route-level lazy loading keeps initial JavaScript smaller. Every lazy route needs a stable loading state and must work through the static-host fallback.

### Styling uses both styled-components and CSS

Older areas use CSS files while newer theme-aware surfaces often use styled-components. Match the local pattern when changing a component. A broad styling migration is outside normal feature work.

### GitHub Pages remains canonical

Canonical metadata points to `https://pypi-ahmad.github.io/`. Deployment runs from `main`. Feature branches can build and test locally but do not deploy automatically.

## Contributor reference

| Task | Command | Check |
| --- | --- | --- |
| Install exact dependencies | `npm ci` | Lockfile resolves without changes |
| Run locally | `npm run dev` | Vite serves port 3000 |
| Lint | `npm run lint` | ESLint reports no errors |
| Typecheck | `npm run typecheck` | TypeScript emits no errors |
| Test | `npm run test:run` | Complete Vitest suite passes |
| Build | `npm run build` | `build/`, `404.html`, `home/index.html`, `education/index.html`, and `projects/index.html` exist |
| Preview | `npm run preview` | Production build serves port 4173 |

The typecheck configuration allows JavaScript but sets `checkJs` to `false`. It verifies module and configuration compatibility, not complete static typing for every JavaScript expression.

CI runs install, lint, typecheck, build, and tests for pushes and pull requests targeting `main`. The deployment workflow builds and tests before uploading the GitHub Pages artifact. It does not run lint or typecheck, so local verification and CI remain necessary.

## Safe change map

| Change | Start here | Also verify |
| --- | --- | --- |
| Homepage wording or outcomes | `src/data/homePage.js` | Home rendering and content-contract tests |
| Project order or copy | `src/data/projects.js` | Projects data test and homepage top four |
| Route or canonical URL | `src/containers/Main.jsx` | Route metadata, direct build paths, sitemap |
| Theme tokens or persistence | `src/theme.js`, `src/themeController.jsx` | Light/dark contrast and stored-mode migration |
| Fallback SEO | `index.html` | Runtime metadata remains consistent |

Follow [CONTRIBUTING.md](../CONTRIBUTING.md) for branch, commit, and pull-request procedure. Keep content claims tied to committed public sources or approved sanitized work notes.

## Current constraints

- BrowserRouter depends on generated static fallbacks for direct GitHub Pages requests.
- Portfolio data has test coverage but no runtime schema validator.
- JavaScript checking is limited by `checkJs: false`.
- Visual changes require checks in both light and dark modes.
- Astro architecture does not exist in the current application.

## Evidence index

| Claim | Local source | Confidence |
| --- | --- | --- |
| Runtime entry and providers | `src/index.jsx`, `src/App.jsx` | Verified |
| Routes and runtime metadata | `src/containers/Main.jsx`, `src/components/seo/RouteMeta.jsx` | Verified |
| Content data flow | `src/portfolio.js`, `src/data/` | Verified |
| Light/dark mode selection | `src/themeController.jsx`, `src/theme.js` | Verified |
| Build fallbacks | `package.json` | Verified |
| CI and deployment steps | `.github/workflows/ci.yml`, `.github/workflows/deploy.yml` | Verified |
| Hosting configuration outside repository | GitHub and Vercel project settings | Unverified |
