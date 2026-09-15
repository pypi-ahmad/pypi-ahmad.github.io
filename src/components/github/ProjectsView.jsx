import { projects } from "../../data/projects";
import RepositoryCard from "./RepositoryCard";
import { exploreRepositories, pageSlice } from "./discovery";
import { Pagination, Unavailable } from "./ViewControls";
const featured = projects.data.map((project) => project.url);
export default function ProjectsView({ data, params, update }) {
  const repos = data.repositories;
  if (!repos) return <Unavailable name="Project explorer" />;
  const results = exploreRepositories(
    repos,
    params,
    data.generatedAt,
    featured,
  );
  const slice = pageSlice(results, params.get("page"), 12);
  const filter = (key, value, replace = false) =>
    update({ [key]: value, page: null }, replace);
  const clear = () =>
    update(
      Object.fromEntries(
        [
          "q",
          "language",
          "topic",
          "activity",
          "sort",
          "forks",
          "archived",
          "page",
        ].map((key) => [key, null]),
      ),
    );
  return (
    <section>
      <h2>Project explorer</h2>
      <p>
        Explore public repositories. Featured projects appear in the same order as on the portfolio.
      </p>
      <div className="gh-panel gh-filter-grid">
        <label>
          Search repositories
          <input
            type="search"
            value={params.get("q") || ""}
            onChange={(e) => filter("q", e.target.value, true)}
            placeholder="Name, description, or topic"
          />
        </label>
        <label>
          Primary language
          <select
            value={params.get("language") || ""}
            onChange={(e) => filter("language", e.target.value)}
          >
            <option value="">All languages</option>
            {[...new Set(repos.map((r) => r.language).filter(Boolean))]
              .sort()
              .map((v) => (
                <option key={v}>{v}</option>
              ))}
          </select>
        </label>
        <label>
          Topic
          <select
            value={params.get("topic") || ""}
            onChange={(e) => filter("topic", e.target.value)}
          >
            <option value="">All topics</option>
            {[...new Set(repos.flatMap((r) => r.topics))].sort().map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </label>
        <label>
          Last push
          <select
            value={params.get("activity") || ""}
            onChange={(e) => filter("activity", e.target.value)}
          >
            <option value="">Any time</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
        </label>
        <label>
          Sort repositories
          <select
            value={params.get("sort") || ""}
            onChange={(e) => filter("sort", e.target.value)}
          >
            <option value="">Featured first</option>
            <option value="recent">Latest push</option>
            <option value="stars">Most stars</option>
            <option value="name">Name</option>
          </select>
        </label>
        <div className="gh-checks">
          <label>
            <input
              type="checkbox"
              checked={params.get("forks") === "1"}
              onChange={(e) => filter("forks", e.target.checked ? "1" : null)}
            />{" "}
            Include forks
          </label>
          <label>
            <input
              type="checkbox"
              checked={params.get("archived") === "1"}
              onChange={(e) =>
                filter("archived", e.target.checked ? "1" : null)
              }
            />{" "}
            Include archived repositories
          </label>
        </div>
        <button data-static onClick={clear}>Clear filters</button>
      </div>
      <p role="status">
        {params.get("q")
          ? results.length === 1 ? `1 repository found for “${params.get("q")}”.` : `${results.length} repositories found for “${params.get("q")}”.`
          : results.length === 1 ? "1 repository found." : `${results.length} repositories found.`}
      </p>
      {!results.length && (
        <p>
          No repositories match these filters. Clear filters to explore public repositories that aren’t forks or archived.
        </p>
      )}
      <div className="gh-repository-grid">
        {slice.items.map((repo) => (
          <RepositoryCard
            key={repo.fullName}
            repository={repo}
            featured={featured.includes(repo.url)}
          />
        ))}
      </div>
      <Pagination
        {...slice}
        label="Repositories"
        onPage={(page) => update({ page })}
      />
      <p className="gh-hint">
        Recent activity is measured from this snapshot’s date, not the current
        browser date.
      </p>
    </section>
  );
}
