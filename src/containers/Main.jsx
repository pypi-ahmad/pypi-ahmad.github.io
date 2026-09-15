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
 *  /fde         — Forward-deployed engineering foundations and learning
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
  fdePageData,
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
const FdePage = lazy(() => import("../pages/fde/FdePage"));
const GitHubPage = lazy(() => import("../pages/github/GitHubPage"));
const NotFound = lazy(() => import("../pages/notFound/NotFound"));

const routeFallbackStyle = {
  minHeight: "100vh",
  display: "grid",
  placeItems: "center",
  padding: "2rem 1.5rem",
};

const routeMeta = {
  fde: {
    title: "FDE learning journey | Ahmad Mujtaba",
    description: fdePageData.description,
    canonicalPath: "/fde",
  },
  github: {
    title: "GitHub statistics & contribution arcade | Ahmad Mujtaba",
    description: "Explore Ahmad Mujtaba's GitHub statistics, contribution history, and seven playable contribution games.",
    canonicalPath: "/github",
  },
  home: {
    title: "Ahmad Mujtaba | Production AI Engineer",
    description:
      "Production AI Engineer focused on multimodal document intelligence, LLM extraction architectures, agentic workflows, and LLM evaluation.",
    canonicalPath: "/",
  },
  experience: {
    title: "Experience | Ahmad Mujtaba",
    description: experience.description,
    canonicalPath: "/experience",
  },
  education: {
    title: "Education & certifications | Ahmad Mujtaba",
    description:
      "Degrees in computer science and data analytics, with credentials in generative AI, machine learning, deep learning, and data systems.",
    canonicalPath: "/education",
  },
  projects: {
    title: "AI engineering projects | Ahmad Mujtaba",
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
    description: "Loading Ahmad Mujtaba’s portfolio.",
    canonicalPath: "/",
    noindex: true,
  },
  notFound: {
    title: "Page not found | Ahmad Mujtaba",
    description: "This page could not be found on Ahmad Mujtaba’s portfolio.",
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
              <Route path="/fde" element={withRouteMeta(routeMeta.fde, <FdePage theme={props.theme} />)} />
              <Route path="/github" element={withRouteMeta(routeMeta.github, <GitHubPage {...props} />)} />
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
