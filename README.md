# Ahmad Mujtaba | Portfolio

![Ahmad Mujtaba Portfolio](/images/portfolio.gif)

A clean, modern, and responsive developer portfolio, updated to **React 18**, **React Router v6**, and optional **Google Analytics 4**.

## 🚀 Technology Stack
- **React 18** (Hooks & Functional Components)
- **React Router v6** (Modern Routing)
- **Styled Components** (CSS-in-JS)
- **Google Analytics 4** (Integration ready)
- **PWA Support**

## 🛠 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/<your-repo>.git
   cd <your-repo>
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

4. **(Optional) Preview the production build locally**
   ```bash
   npm run build
   npx serve -s build
   ```
   Then open the URL printed by `serve`.

## 🎨 Customization

### 1. Personal Data
Edit **`src/portfolio.js`**. This is the single source of truth for:
- Name, Bio, Social Links
- Experience, Education, Certifications
- Projects, Skills, Contact Info

### 2. Analytics (GA4)
Set a GA4 Measurement ID (format `G-XXXXXXXXXX`) in `settings.googleTrackingID` inside `src/portfolio.js`.

### 2. Branding & Themes
Edit **`src/theme.js`** to customize the Light and Dark mode color palettes.

### 3. Deployment (GitHub Pages)
1. Open `package.json` and change the `"homepage"` field:
   ```json
   "homepage": "https://yourusername.github.io/repo-name"
   ```
2. Deploy:
   ```bash
   npm run deploy
   ```

### Deployment note: “`index.html` must be at the project root”
Some hosting platforms only look for an `index.html` in the *publish root* (often the repository root). For Create React App projects like this one:

- The production entry file is generated at `build/index.html`.
- `npm run deploy` (GitHub Pages) publishes the *contents of* `build/` to the site root, so the hosted site **does** have an `index.html` at its root.

If your platform deploys from the repository root (and you can’t change it), you must either:

- Configure the platform’s **publish directory** to `build/` (preferred when available), or
- Build and then upload/copy the contents of `build/` so they become the deployed root.

## 📂 Project Structure
- `src/portfolio.js`: **Main Configuration File**
- `src/theme.js`: Color themes
- `src/containers`: Logical Page Sections
- `src/components`: Reusable UI Components
- `src/pages`: Main Route Pages

## Note for Windows Users
If you encounter build errors related to `node-sass` or `openssl`, ensure you are using the commands above. This project has been migrated away from legacy build tools to standard `react-scripts` v5.
