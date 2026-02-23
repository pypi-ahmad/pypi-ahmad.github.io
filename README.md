# Developer Portfolio 2.0

[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-222?logo=github&logoColor=white)](https://pypi-ahmad.github.io)

A modern, performance-first developer portfolio built with **React 18** and **Vite**. Features enterprise system case-study showcases, professional certifications, work experience, and a full skills grid — all driving from a single data layer.

> Migrated from Create React App to **Vite 6** for faster dev-server startup and optimized production builds.

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [React](https://reactjs.org/) | 18.3 | UI library (hooks, createRoot) |
| [Vite](https://vitejs.dev/) | 6.0 | Build tool, dev server, HMR |
| [React Router DOM](https://reactrouter.com/) | 6.30 | Client-side routing (8 routes) |
| [Styled Components](https://styled-components.com/) | 6.3 | CSS-in-JS theming & component styles |
| [Framer Motion](https://www.framer.com/motion/) | 12.34 | Scroll-triggered & entrance animations |
| [React Bootstrap](https://react-bootstrap.github.io/) | 2.10 | Tooltip overlays for skill icons |
| [React Icons](https://react-icons.github.io/react-icons/) | 4.12 | Theme toggle icons (sun/moon) |
| [React Animated Cursor](https://github.com/stephenscaff/react-animated-cursor) | 2.11 | Custom cursor effect (desktop only) |
| [React GA4](https://github.com/codler/react-ga4) | 2.1 | Google Analytics 4 integration |
| [Iconify](https://iconify.design/) | 1.0.4 | Skill icons via CDN (`data-icon` attributes) |
| [Font Awesome](https://fontawesome.com/) | 5.15 | Social media icons |
| [gh-pages](https://www.npmjs.com/package/gh-pages) | 6.3 | One-command deploy to GitHub Pages |

---

## Getting Started

### Prerequisites

- **[Node.js](https://nodejs.org/)** v18+ (npm included)

### Install & Run

```bash
git clone https://github.com/pypi-ahmad/pypi-ahmad.github.io.git
cd pypi-ahmad.github.io
npm install
npm run dev
```

Open **http://localhost:3000** — the dev server auto-opens the browser.

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server (port 3000, hot reload) |
| `npm run build` | Production build to `build/` + copy `index.html` to `404.html` for SPA routing |
| `npm run preview` | Serve production build locally |
| `npm run deploy` | Build + push `build/` to `gh-pages` branch |

---

## Architecture

```
src/
├── index.jsx              # React 18 createRoot entry point
├── App.jsx                # Root: ThemeProvider + MotionConfig + AnimatedCursor + Router
├── global.js              # GlobalStyles (styled-components CSS reset)
├── theme.js               # Light/dark theme token definitions
├── portfolio.js           # Barrel export — re-exports all data modules
│
├── data/                  # ← ALL portfolio content lives here
│   ├── settings.js        #   Splash toggle, cursor toggle, GA4 ID
│   ├── greeting.js        #   Hero text, bullets, philosophy, resume link
│   ├── socialMedia.js     #   Social platform URLs & descriptions
│   ├── skills.js          #   Skills page grid + home-page skill cards
│   ├── education.js       #   Degrees, certifications (with PDF links)
│   ├── experience.js      #   Work history (accordion sections)
│   ├── projects.js        #   Open-source project cards
│   ├── contact.js         #   Contact section & blog link
│   ├── achievements.js    #   Impact metrics
│   └── systems.js         #   Enterprise system case studies (featured + supporting)
│
├── components/            # Reusable presentational components
│   ├── header/            #   Nav bar with theme toggle & hamburger menu
│   ├── footer/            #   Attribution footer
│   ├── socialMedia/       #   Icon-button row + structured contact list
│   ├── softwareSkills/    #   Iconify skill icons with tooltips
│   ├── ProjectCard/       #   Open-source project card
│   ├── projectLanguages/  #   Language/tech icons for project cards
│   ├── degreeCard/        #   Academic degree card
│   ├── certificationCard/ #   Certification card with PDF link
│   ├── experienceCard/    #   Work experience entry
│   └── SystemDesign/      #   SystemCard (card + modal deep-dive) & SystemDiagram
│
├── containers/            # Section-level containers (compose components + data)
│   ├── Main.jsx           #   BrowserRouter with all Route definitions
│   ├── greeting/          #   Hero section + SVG avatar illustration
│   ├── skills/            #   "Here's what I do" + alternating skill cards
│   ├── education/         #   Degrees list
│   ├── certifications/    #   Certifications grid
│   ├── experienceAccordion/ # Styled accordion of experience cards
│   ├── SystemShowcase/    #   Featured system on home page
│   ├── SystemThinking/    #   Methodology visualization
│   └── contact/           #   (Legacy — unused in current routing)
│
├── pages/                 # Full-page compositions (Header + containers + Footer)
│   ├── home/              #   / and /home — landing page
│   ├── skills/            #   /skills — full skills grid
│   ├── education/         #   /education — degrees + certifications
│   ├── experience/        #   /experience — work history
│   ├── projects/          #   /projects — systems showcase + project cards
│   ├── contact/           #   /contact — resume CTA + social links + blog
│   └── splash/            #   /splash — loading animation (optional)
│
└── assests/               # Static assets (note: folder named "assests")
    ├── fonts/             #   Agustina, Montserrat, Google Sans variants
    ├── images/            #   Logos, certifications, etc.
    └── font-awesome/      #   Local FA 5.15 distribution
```

### Data Flow

All portfolio content is centralized in `src/data/*.js` files, barrel-exported through `src/portfolio.js`. Components import from `../../portfolio` and never hardcode content. To update the site, edit the data files — no component changes needed.

### Theme System

Two theme objects (`lightTheme`, `darkTheme`) in `src/theme.js` provide design tokens. The active theme is:
- Stored in `localStorage` (key: `"theme"`, default: `"dark"`)
- Passed down via styled-components `<ThemeProvider>`
- Toggled by the sun/moon button in the Header

### Routing

React Router v6 with `<BrowserRouter>`. The build script copies `index.html` to `404.html` so SPA client-side routing works on GitHub Pages (which serves 404.html for unknown paths).

---

## Customization Guide

### 1. Portfolio Content — `src/data/`

Edit the files in `src/data/` to make the portfolio yours. Key files:

| File | What to edit |
|---|---|
| `greeting.js` | Name, title, subtitle, hero bullets, philosophy, resume link |
| `socialMedia.js` | Social platform URLs (set to `" "` to hide) |
| `skills.js` | Skill categories, Iconify icon IDs, bullet descriptions |
| `education.js` | Degrees and certifications |
| `experience.js` | Work history entries |
| `projects.js` | Open-source project cards |
| `systems.js` | Enterprise system case studies |
| `contact.js` | Contact page text and blog link |
| `settings.js` | Splash screen, custom cursor, GA4 tracking ID |

### 2. Theme Colors — `src/theme.js`

Modify the color tokens in `lightTheme` and `darkTheme`:

```js
const darkTheme = {
  body: "#1D1D1D",       // Page background
  text: "#FFFFFF",        // Primary text
  accentColor: "#E3405F", // Brand accent (buttons, highlights)
  accentBright: "#FC1056", // Bright accent variant
  // ... see theme.js for all tokens
};
```

### 3. Images & Assets

- Institution logos: `src/assests/images/`
- Certification images: `src/assests/images/certifications/`
- Certification PDFs: `public/certifications/`
- Resume/Cover Letter: place PDFs in `public/` and update paths in `greeting.js`

### 4. Skill Icons

Icons use [Iconify](https://iconify.design/) format: `"simple-icons:python"`. Browse available icons at [icon-sets.iconify.design](https://icon-sets.iconify.design/).

### 5. Google Analytics

Set your GA4 Measurement ID in `src/data/settings.js`:

```js
export const settings = {
  googleTrackingID: "G-XXXXXXXXXX",
};
```

---

## Deployment

### GitHub Pages (pre-configured)

```bash
npm run deploy
```

This runs `vite build`, then pushes the `build/` folder to the `gh-pages` branch. The site goes live at the URL defined in `package.json` `homepage` field.

For a **User site** (`username.github.io`), ensure:
- Repository name matches `username.github.io`
- `homepage` in `package.json` is `"https://username.github.io"`
- `base` in `vite.config.js` is `"/"`

---

## Features

- **Fast** — Vite-powered dev server and optimized production builds
- **Responsive** — Mobile-first layout with breakpoints at 768px and 1380px
- **Dark/Light Mode** — Theme toggle persisted to localStorage
- **Animations** — Framer Motion scroll-triggered entrances (respects `prefers-reduced-motion`)
- **System Case Studies** — Expandable cards with architecture diagrams, problem/solution framing, and impact metrics
- **SEO** — Open Graph meta tags, semantic HTML, canonical URL
- **PWA Ready** — Web manifest and mobile icon support
- **Custom Cursor** — Rainbow animated cursor on desktop (toggleable)
- **SPA Routing** — GitHub Pages compatible with 404.html fallback

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  <b>If you found this helpful, please star this repository!</b>
</p>
