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
 * Props: { theme, setTheme }
 */
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../pages/home/HomeComponent";
import Splash from "../pages/splash/Splash";
import Education from "../pages/education/EducationComponent";
import Experience from "../pages/experience/Experience";
import Contact from "../pages/contact/ContactComponent";
import Projects from "../pages/projects/Projects";
import SkillsPage from "../pages/skills/SkillsPage";
import { settings } from "../portfolio.js";

export default function Main(props) {
  return (
    <div>
      <BrowserRouter basename="/">
        <Routes>
          <Route
            path="/"
            element={
              settings.isSplash ? (
                <Splash {...props} theme={props.theme} setTheme={props.setTheme} />
              ) : (
                <Home {...props} theme={props.theme} setTheme={props.setTheme} />
              )
            }
          />
          <Route
            path="/home"
            element={<Home {...props} theme={props.theme} setTheme={props.setTheme} />}
          />
          <Route
            path="/experience"
            element={<Experience {...props} theme={props.theme} setTheme={props.setTheme} />}
          />
          <Route
            path="/education"
            element={<Education {...props} theme={props.theme} setTheme={props.setTheme} />}
          />
          <Route
            path="/contact"
            element={<Contact {...props} theme={props.theme} setTheme={props.setTheme} />}
          />
          <Route
            path="/splash"
            element={<Splash {...props} theme={props.theme} setTheme={props.setTheme} />}
          />
          <Route
            path="/projects"
            element={<Projects {...props} theme={props.theme} setTheme={props.setTheme} />}
          />
          <Route
            path="/skills"
            element={<SkillsPage {...props} theme={props.theme} setTheme={props.setTheme} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
