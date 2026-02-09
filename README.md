# 🚀 Developer Portfolio 2.0

[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-222?logo=github&logoColor=white)](https://pages.github.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, blazing-fast developer portfolio built with **React** and **Vite**. Showcase your skills, projects, certifications, and experience — all in one beautiful, customizable template.

> 🎉 **Recently migrated from Create-React-App to Vite** for lightning-fast development and optimized builds!

---

## 📸 Preview

<!-- Replace this placeholder with your own screenshot -->
![Portfolio Preview](./src/assests/images/portfolio-preview.png)

> *Add your own screenshot by replacing the image above!*

---

## ⚡ Tech Stack

| Technology | Description |
|------------|-------------|
| **[React 18](https://reactjs.org/)** | Modern UI library with hooks and concurrent features |
| **[Vite](https://vitejs.dev/)** | Next-generation frontend build tool — super fast HMR |
| **[React Router DOM](https://reactrouter.com/)** | Declarative routing for React applications |
| **[React Bootstrap](https://react-bootstrap.github.io/)** | Bootstrap components rebuilt for React |
| **[Styled Components](https://styled-components.com/)** | CSS-in-JS for component-level styling |
| **[React Icons](https://react-icons.github.io/react-icons/)** | Popular icon packs as React components |
| **[BaseUI](https://baseweb.design/)** | Modern React UI framework |
| **[React Reveal](https://www.react-reveal.com/)** | Scroll animations and effects |
| **[React GA4](https://github.com/codler/react-ga4)** | Google Analytics 4 integration |
| **[gh-pages](https://www.npmjs.com/package/gh-pages)** | Deploy to GitHub Pages with ease |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **[Node.js](https://nodejs.org/)** (v18 or higher recommended)
- **npm** (comes bundled with Node.js)

### Installation

1. **Fork this repository** — Click the "Fork" button at the top right of this page.

2. **Clone your forked repo:**
   ```bash
   git clone https://github.com/pypi-ahmad/pypi-ahmad.github.io.git
   cd pypi-ahmad.github.io
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

### Run Locally

Start the development server:

```bash
npm run dev
```

🎉 Open your browser and navigate to **[http://localhost:5173](http://localhost:5173)** to see your portfolio in action!

> **Note:** Vite uses port `5173` by default. If it's in use, it will automatically pick the next available port.

### Build for Production

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

### Deployment to GitHub Pages

This project is pre-configured for seamless deployment to GitHub Pages:

```bash
npm run deploy
```

**What happens:**
1. `npm run build` is automatically triggered (via `predeploy` script)
2. The `build` folder is pushed to the `gh-pages` branch
3. Your portfolio goes live at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

> **Tip:** Make sure you've configured the `homepage` field in `package.json` if deploying to a custom path.

---

## 🎨 How to Customize

### 1. Personal Information — `src/portfolio.js`

This is **the main configuration file**. Edit it to make the portfolio yours:

```javascript
// Update your greeting
const greeting = {
  title: "Hello.",
  title2: "YourName",
  logo_name: "yourname.dev()",
  full_name: "Your Full Name",
  subTitle: "Your Tagline | Your Role",
  resumeLink: "your-resume.pdf",
  mail: "mailto:your@email.com",
};

// Add your social links
const socialMediaLinks = {
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  gmail: "your@email.com",
  // ... more options available
};

// Showcase your skills, experience, education, projects, etc.
```

### 2. Analytics (GA4)

Set a GA4 Measurement ID (format `G-XXXXXXXXXX`) in `settings.googleTrackingID` inside `src/portfolio.js`:

```javascript
const settings = {
  isSplash: false,
  useCustomCursor: true,
  googleTrackingID: "G-XXXXXXXXXX", // Your GA4 ID here
};
```

### 3. Color Theme — `src/theme.js`

Customize the look and feel by editing the color schemes:

```javascript
const lightTheme = {
  name: "light",
  body: "#FFFFFF",
  text: "#343434",
  accentColor: "#E3405F",    // Your brand color
  accentBright: "#FC1056",
  projectCard: "#DCE4F2",
  // ... more customizable properties
};

const darkTheme = {
  name: "dark",
  body: "#1D1D1D",
  text: "#FFFFFF",
  accentColor: "#E3405F",
  // ... matches light theme structure
};
```

### 4. Images & Assets — `src/assests/images/`

Replace the default images with your own:

- **Profile picture**
- **Project screenshots**
- **Custom icons or logos**

> **Note:** The folder is named `assests` (not `assets`) — keep this in mind when adding new images.

---

## 📁 Project Structure

```
MyPortfolio/
├── public/                    # Static files
│   ├── index.html             # HTML template
│   ├── manifest.json          # PWA manifest
│   └── images/                # Public images
│
├── src/
│   ├── portfolio.js           # 📝 YOUR DATA GOES HERE
│   ├── theme.js               # 🎨 Color customization
│   ├── global.js              # Global settings
│   ├── App.jsx                # Main App component
│   ├── index.jsx              # Entry point
│   │
│   ├── components/            # Reusable UI components
│   │   ├── header/            # Navigation header
│   │   ├── footer/            # Page footer
│   │   ├── ProjectCard/       # Project display cards
│   │   ├── certificationCard/ # Certification cards
│   │   ├── degreeCard/        # Education cards
│   │   ├── experienceCard/    # Work experience cards
│   │   ├── socialMedia/       # Social links
│   │   └── softwareSkills/    # Skill icons
│   │
│   ├── containers/            # Section containers
│   │   ├── greeting/          # Hero section
│   │   ├── skills/            # Skills showcase
│   │   ├── education/         # Education timeline
│   │   ├── certifications/    # Certifications grid
│   │   ├── experienceAccordion/ # Work experience
│   │   └── contact/           # Contact section
│   │
│   ├── pages/                 # Route pages
│   │   ├── home/
│   │   ├── skills/
│   │   ├── education/
│   │   ├── experience/
│   │   ├── projects/
│   │   └── contact/
│   │
│   └── assests/               # Static assets
│       ├── images/            # Image files
│       ├── fonts/             # Custom fonts
│       └── font-awesome/      # Icon library
│
├── build/                     # Production build output
├── package.json               # Dependencies & scripts
├── vite.config.js             # Vite configuration
└── README.md                  # You are here! 👋
```

---

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (hot reload) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run deploy` | Deploy to GitHub Pages |

---

## 🌟 Features

- ✅ **Blazing Fast** — Powered by Vite for instant HMR
- ✅ **Responsive Design** — Looks great on all devices
- ✅ **Dark/Light Mode** — Built-in theme toggle
- ✅ **Smooth Animations** — Scroll-triggered reveals
- ✅ **SEO Optimized** — Meta tags and semantic HTML
- ✅ **Analytics Ready** — Google Analytics 4 integration
- ✅ **Easy Deployment** — One command to GitHub Pages
- ✅ **Customizable** — Change colors, content, and layout easily

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 💖 Acknowledgements

- Built with love and lots of ☕
- Inspired by the developer community
- Thanks to all contributors and forkers!

---

<p align="center">
  <b>If you found this helpful, please ⭐ star this repository!</b>
</p>
