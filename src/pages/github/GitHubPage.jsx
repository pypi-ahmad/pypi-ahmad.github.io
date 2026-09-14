import { lazy, Suspense, useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useDashboard } from "../../components/github/dashboardStore";
import { Summary, DataStatus } from "../../components/github/GitHubSummary";
import AdvancedDashboard, {
  Bars,
} from "../../components/github/AdvancedDashboard";
import { githubWork } from "../../data/githubWork";
import { githubData } from "../../data/github";
import { normalizeViewParams } from "../../components/github/viewState";
import "../../components/github/github.css";

const Projects = lazy(() => import("../../components/github/ProjectsView"));
const Activity = lazy(() => import("../../components/github/ActivityView"));
const Impact = lazy(() => import("../../components/github/ImpactView"));
const Arcade = lazy(() => import("../../components/github/arcade/ArcadeView"));
const tabs = ["overview", "projects", "activity", "impact", "arcade"];
const legacy = {
  "#statistics": "overview",
  "#advanced-dashboard": "overview",
  "#contribution-history": "activity",
  "#contribution-arcade": "arcade",
};
export default function GitHubPage({ theme }) {
  const state = useDashboard();
  const [rawParams, setParams] = useSearchParams();
  const params = normalizeViewParams(rawParams, state.data);
  const location = useLocation();
  const [shared, setShared] = useState("");
  const [fallback, setFallback] = useState("");
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
  useEffect(() => {
    setShared("");
    setFallback("");
  }, [location.search]);
  async function share() {
    const url = new URL(window.location.href);
    url.search = params.toString();
    url.searchParams.set("tab", tab);
    if (year) url.searchParams.set("year", String(year.year));
    if (
      tab === "arcade" &&
      params.get("mode") === "daily" &&
      !params.get("challenge")
    )
      url.searchParams.set("challenge", new Date().toISOString().slice(0, 10));
    try {
      await navigator.clipboard.writeText(url.href);
      setShared("View link copied.");
      setFallback("");
    } catch {
      setShared("Copy the view link below.");
      setFallback(url.href);
    }
  }
  const props = { data, year, params, update };
  const languageTotal =
    data?.summary.languages.reduce((n, r) => n + r.bytes, 0) || 1;
  return (
    <>
      <Header />
      <main id="main-content" className="gh gh-page">
        <section className="gh-hero">
          <p className="gh-eyebrow">Open-source activity</p>
          <h1>GitHub statistics</h1>
          <p>A closer look at what I build, share, and contribute.</p>
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
        <div className="gh-toolbar">
          <button onClick={share}>Copy view link</button>
          <span role="status">{shared}</span>
        </div>
        {fallback && (
          <label>
            View link
            <input
              readOnly
              value={fallback}
              onFocus={(e) => e.target.select()}
            />
          </label>
        )}
        <DataStatus {...state} />
        {data && (
          <Suspense fallback={<p role="status">Loading {tab}…</p>}>
            {tab === "overview" && (
              <>
                <section id="statistics" className="gh-section">
                  <h2>At a glance</h2>
                  <Summary summary={data.summary} />
                  <p className="gh-hint">{data.scope}</p>
                </section>
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
                        <p>Next step: Not announced yet</p>
                        <p className="gh-hint">
                          Editorial update reviewed {work.reviewedAt}
                        </p>
                      </article>
                    ))}
                  </div>
                </section>
                <details
                  id="advanced-dashboard"
                  className="gh-panel gh-section"
                  open={location.hash === "#advanced-dashboard" || undefined}
                >
                  <summary>Explore advanced GitHub metrics</summary>
                  <h2>Advanced dashboard</h2>
                  <Bars
                    title="Repository language share"
                    values={data.summary.languages
                      .slice(0, 8)
                      .map((r) => [
                        r.name,
                        Math.round((r.bytes / languageTotal) * 1000) / 10,
                      ])}
                    suffix="%"
                    note="Top eight languages by bytes; percentages use all language bytes."
                  />
                  <AdvancedDashboard data={data} />
                  <p className="gh-hint">
                    Streaks follow GitHub calendar dates through{" "}
                    {data.summary.streak.asOf}; an unfinished current day does
                    not break yesterday’s streak.
                  </p>
                </details>
              </>
            )}
            {tab === "projects" && <Projects {...props} />}
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
