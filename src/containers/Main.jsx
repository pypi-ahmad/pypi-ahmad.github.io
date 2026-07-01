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
import { HelmetProvider } from "react-helmet-async";
import {
  settings,
  greeting,
  experience,
  projectsHeader,
  contactPageData,
  skillsPageData,
} from "../portfolio.js";
import RouteMeta from "../components/seo/RouteMeta";

const Home = lazy(() => import("../pages/home/HomeComponent"));
const Splash = lazy(() => import("../pages/splash/Splash"));
const Education = lazy(() => import("../pages/education/EducationComponent"));
const Experience = lazy(() => import("../pages/experience/Experience"));
const Contact = lazy(() => import("../pages/contact/ContactComponent"));
const Projects = lazy(() => import("../pages/projects/Projects"));
const SkillsPage = lazy(() => import("../pages/skills/SkillsPage"));
const NotFound = lazy(() => import("../pages/notFound/NotFound"));

const routeFallbackStyle = {
  minHeight: "100vh",
  display: "grid",
  placeItems: "center",
  padding: "2rem 1.5rem",
};

const routeMeta = {
  home: {
    title: "Ahmad Mujtaba | GenAI Engineer Portfolio",
    description: greeting.subTitle,
    canonicalPath: "/",
  },
  experience: {
    title: "Experience | Ahmad Mujtaba",
    description: experience.description,
    canonicalPath: "/experience",
  },
  education: {
    title: "Education | Ahmad Mujtaba",
    description:
      "Academic background, certifications, and continuous learning roadmap in AI and machine learning.",
    canonicalPath: "/education",
  },
  projects: {
    title: "Projects | Ahmad Mujtaba",
    description: projectsHeader.description,
    canonicalPath: "/projects",
  },
  skills: {
    title: "Skills | Ahmad Mujtaba",
    description: skillsPageData.subtitle,
    canonicalPath: "/skills",
  },
  contact: {
    title: "Contact | Ahmad Mujtaba",
    description: contactPageData.contactSection.description,
    canonicalPath: "/contact",
  },
  splash: {
    title: "Loading | Ahmad Mujtaba",
    description: "Loading Ahmad Mujtaba portfolio.",
    canonicalPath: "/",
    noindex: true,
  },
  notFound: {
    title: "Page Not Found | Ahmad Mujtaba",
    description: "The requested page could not be found on Ahmad Mujtaba portfolio.",
    noindex: true,
  },
};

function withRouteMeta(meta, element) {
  return (
    <>
      <RouteMeta {...meta} />
      {element}
    </>
  );
}

export default function Main(props) {
  return (
    <div>
      <HelmetProvider>
        <BrowserRouter basename="/">
          <Suspense
            fallback={(
              <div
                style={routeFallbackStyle}
                role="status"
                aria-live="polite"
                aria-busy="true"
              >
                Loading page...
              </div>
            )}
          >
            <Routes>
              <Route
                path="/"
                element={withRouteMeta(
                  routeMeta.home,
                  settings.isSplash ? (
                    <Splash {...props} theme={props.theme} />
                  ) : (
                    <Home {...props} theme={props.theme} />
                  )
                )}
              />
              <Route
                path="/home"
                element={withRouteMeta(
                  routeMeta.home,
                  <Home {...props} theme={props.theme} />
                )}
              />
              <Route
                path="/experience"
                element={withRouteMeta(
                  routeMeta.experience,
                  <Experience {...props} theme={props.theme} />
                )}
              />
              <Route
                path="/education"
                element={withRouteMeta(
                  routeMeta.education,
                  <Education {...props} theme={props.theme} />
                )}
              />
              <Route
                path="/contact"
                element={withRouteMeta(
                  routeMeta.contact,
                  <Contact {...props} theme={props.theme} />
                )}
              />
              <Route
                path="/splash"
                element={withRouteMeta(
                  routeMeta.splash,
                  <Splash {...props} theme={props.theme} />
                )}
              />
              <Route
                path="/projects"
                element={withRouteMeta(
                  routeMeta.projects,
                  <Projects {...props} theme={props.theme} />
                )}
              />
              <Route
                path="/skills"
                element={withRouteMeta(
                  routeMeta.skills,
                  <SkillsPage {...props} theme={props.theme} />
                )}
              />
              <Route
                path="*"
                element={withRouteMeta(
                  routeMeta.notFound,
                  <NotFound {...props} theme={props.theme} />
                )}
              />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </HelmetProvider>
    </div>
  );
}
