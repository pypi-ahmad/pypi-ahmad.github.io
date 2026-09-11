/**
 * Main — Application Router
 *
 * Defines all client-side routes using React Router v7.
 * The root path "/" conditionally shows the Splash screen or Home page
 * based on `settings.isSplash`.
 *
 * Route map:
 *  /            — Splash or Home (configurable)
 *  /home        — Home page
 *  /experience  — Work experience
 *  /education   — Degrees & certifications
 *  /contact     - Contact channels and availability
 *  /splash      — Loading splash screen
 *  /projects    — Recent open-source projects
 *  /skills      — Applied AI capabilities, evidence, and toolkit
 *
 * Pages are lazy-loaded so Vite can code-split them into separate chunks.
 *
 * Props: { theme }
 */
import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import {
  settings,
  experience,
  projectsHeader,
  contactPageData,
  skillsPageData,
} from "../portfolio.js";
import RouteMeta from "../components/seo/RouteMeta";
import RouteNavigation from "../components/RouteNavigation";

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
    title: "Ahmad Mujtaba | Applied AI Engineer",
    description:
      "Applied AI Engineer working on document AI, RAG, agents, and evaluation.",
    canonicalPath: "/",
  },
  experience: {
    title: "Experience | Ahmad Mujtaba",
    description: experience.description,
    canonicalPath: "/experience",
  },
  education: {
    title: "Education & Certifications | Ahmad Mujtaba",
    description:
      "Academic foundations in computer science and data analytics, with focused credentials in generative AI, machine learning, deep learning, and data systems.",
    canonicalPath: "/education",
  },
  projects: {
    title: "Applied AI Projects | Ahmad Mujtaba",
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

function RouteFallback({ setPending }) {
  // The status region lives outside Suspense so loading and cancellation share one announcement.
  useEffect(() => {
    setPending(true);
    return () => setPending(false);
  }, [setPending]);

  return (
    <main style={routeFallbackStyle} aria-label="Loading page" aria-busy="true">
      Loading page…
    </main>
  );
}

export default function Main(props) {
  const [pending, setPending] = useState(false);
  // Disabling router transitions exposes the fallback instead of retaining the old page under a new URL.
  return (
    <div>
      <HelmetProvider>
        <BrowserRouter basename="/" useTransitions={false}>
          <div className="route-loading-status" role="status" aria-live="polite" aria-atomic="true">
            {pending ? "Loading page…" : ""}
          </div>
          <Suspense
            fallback={<RouteFallback setPending={setPending} />}
          >
            <RouteNavigation />
            <Routes>
              <Route
                path="/"
                element={withRouteMeta(
                  routeMeta.home,
                  settings.isSplash ? (
                    <Splash />
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
                  <Splash />
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
