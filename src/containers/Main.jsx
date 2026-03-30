/**
 * Main — Application Router
 *
 * Defines all client-side routes using React Router v6.
 * The root path "/" conditionally shows the Splash screen or Home page
 * based on `settings.isSplash`.
 *
 * Route map:
 *  /            — Splash or Home (configurable)
 *  /home        — Home page
 *  /experience  — Work experience
 *  /education   — Degrees & certifications
 *  /contact     — Contact information & blog
 *  /splash      — Loading splash screen
 *  /projects    — Enterprise systems & open-source projects
 *  /skills      — Full skills grid
 *
 * Pages are lazy-loaded so Vite can code-split them into separate chunks.
 *
 * Props: { theme }
 */
import React, { lazy, Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { settings } from "../portfolio.js";

const Home = lazy(() => import("../pages/home/HomeComponent"));
const Splash = lazy(() => import("../pages/splash/Splash"));
const Education = lazy(() => import("../pages/education/EducationComponent"));
const Experience = lazy(() => import("../pages/experience/Experience"));
const Contact = lazy(() => import("../pages/contact/ContactComponent"));
const Projects = lazy(() => import("../pages/projects/Projects"));
const SkillsPage = lazy(() => import("../pages/skills/SkillsPage"));
const ThemePage = lazy(() => import("../pages/theme/ThemePage"));

export default function Main(props) {
  return (
    <div>
      <BrowserRouter basename="/">
        <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
          <Routes>
            <Route
              path="/"
              element={
                settings.isSplash ? (
                  <Splash {...props} theme={props.theme} />
                ) : (
                  <Home {...props} theme={props.theme} />
                )
              }
            />
            <Route
              path="/home"
              element={<Home {...props} theme={props.theme} />}
            />
            <Route
              path="/experience"
              element={<Experience {...props} theme={props.theme} />}
            />
            <Route
              path="/education"
              element={<Education {...props} theme={props.theme} />}
            />
            <Route
              path="/contact"
              element={<Contact {...props} theme={props.theme} />}
            />
            <Route
              path="/splash"
              element={<Splash {...props} theme={props.theme} />}
            />
            <Route
              path="/projects"
              element={<Projects {...props} theme={props.theme} />}
            />
            <Route
              path="/skills"
              element={<SkillsPage {...props} theme={props.theme} />}
            />
            <Route
              path="/theme"
              element={<ThemePage {...props} theme={props.theme} />}
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}
