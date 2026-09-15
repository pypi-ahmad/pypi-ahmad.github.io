import { lazy, Suspense } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useDashboard } from "../../components/github/dashboardStore";
import { Summary, DataStatus } from "../../components/github/GitHubSummary";
import { githubWork } from "../../data/githubWork";
import { githubData } from "../../data/github";
import { normalizeViewParams } from "../../components/github/viewState";
import GitHubVisualOverview from "../../components/github/GitHubVisualOverview";
import "../../components/github/github.css";

const Projects = lazy(() => import("../../components/github/ProjectsView"));
const Activity = lazy(() => import("../../components/github/ActivityView"));
const Impact = lazy(() => import("../../components/github/ImpactView"));
const Arcade = lazy(() => import("../../components/github/arcade/ArcadeView"));
const Animations = lazy(() => import("../../components/github/AnimationsView"));
const tabs = ["overview", "projects", "activity", "impact", "arcade", "animations"];
const legacy = {
  "#statistics": "overview",
  "#advanced-dashboard": "activity",
  "#contribution-history": "activity",
  "#contribution-arcade": "arcade",
};
export default function GitHubPage({ theme }) {
  const state = useDashboard();
  const [rawParams, setParams] = useSearchParams();
  const params = normalizeViewParams(rawParams, state.data);
  const location = useLocation();
  const tab = tabs.includes(params.get("tab"))
    ? params.get("tab")
    : legacy[location.hash] || "overview";
  const data = state.data;
  const year =
    data?.years.find((item) => String(item.year) === params.get("year")) ??
    data?.years.at(-1);
  const update = (changes, replace = false) => {
    setParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        for (const [key, value] of Object.entries(changes)) {
          if (value === null || value === "") next.delete(key);
          else next.set(key, String(value));
        }
        if (!next.has("tab")) next.set("tab", tab);
        return next;
      },
      { replace, preventScrollReset: true },
    );
  };
  const props = { data, year, params, update };
  return (
    <>
      <Header />
      <main id="main-content" className="gh gh-page">
        <section className="gh-hero">
          <p className="gh-eyebrow">Open-source activity</p>
          <h1>GitHub statistics</h1>
          <p>My public repositories, releases, and contributions.</p>
          <a className="gh-button" href={githubData.profile}>
            View GitHub profile <span aria-hidden="true">↗</span>
          </a>
        </section>
        <nav className="gh-section-nav gh-view-nav" aria-label="GitHub views">
          {tabs.map((value) => {
            const next = new URLSearchParams(params);
            next.set("tab", value);
            return (
              <Link
                key={value}
                to={`?${next}`}
                aria-current={tab === value ? "page" : undefined}
              >
                {value[0].toUpperCase() + value.slice(1)}
              </Link>
            );
          })}
        </nav>
        {tab !== "animations" && <DataStatus {...state} />}
        {tab === "animations" && (
          <Suspense fallback={<p role="status">Loading animations…</p>}>
            <Animations />
          </Suspense>
        )}
        {data && (
          <Suspense fallback={<p role="status">Loading {tab}…</p>}>
            {tab === "overview" && (
              <>
                <section id="statistics" className="gh-section">
                  <h2>At a glance</h2>
                  <Summary summary={data.summary} compact />
                  <p className="gh-hint">{data.scope}</p>
                </section>
                <GitHubVisualOverview data={data} />
              </>
            )}
            {tab === "projects" && (
              <>
                <section className="gh-section">
                  <h2>What I’m building</h2>
                  <p>
                    Three selected projects, with milestones linked to public
                    evidence.
                  </p>
                  <div className="gh-repository-grid">
                    {githubWork.map((work) => (
                      <article key={work.repository} className="gh-panel">
                        <h3>
                          <a
                            href={`https://github.com/pypi-ahmad/${work.repository}`}
                          >
                            {work.name}
                          </a>
                        </h3>
                        <p>{work.description}</p>
                        <p>
                          <a href={work.evidence}>{work.milestone}</a>
                        </p>
                        <p>Next step: not announced yet</p>
                        <p className="gh-hint">
                          Last reviewed {work.reviewedAt}
                        </p>
                      </article>
                    ))}
                  </div>
                </section>
                <Projects {...props} />
              </>
            )}
            {tab === "activity" && <Activity {...props} />}
            {tab === "impact" && <Impact {...props} />}
            {tab === "arcade" && <Arcade {...props} />}
          </Suspense>
        )}
      </main>
      <Footer theme={theme} />
    </>
  );
}
