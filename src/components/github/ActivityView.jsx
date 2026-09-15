import { useLocation } from "react-router-dom";
import AdvancedDashboard, { Bars } from "./AdvancedDashboard";
import ContributionCalendar from "./ContributionCalendar";
import { Metric, number, Summary } from "./GitHubSummary";
import {
  compareYears,
  pageSlice,
  yearMetrics,
  sourceExcerpt,
} from "./discovery";
import { Pagination, Unavailable, YearSelect } from "./ViewControls";
const monthNames = Array.from({ length: 12 }, (_, i) =>
  new Date(Date.UTC(2024, i)).toLocaleString("en", {
    month: "long",
    timeZone: "UTC",
  }),
);
export function ReleaseTimeline({ data, year, params, update }) {
  if (!data.releases) return <Unavailable name="Release timeline" />;
  const repository = params.get("releaseRepo") || "";
  const selectedYear =
    params.get("releaseYear") === "all" ? "all" : String(year.year);
  const matches = data.releases.filter(
    (r) =>
      (selectedYear === "all" || r.publishedAt.startsWith(selectedYear)) &&
      (!repository || r.repository === repository),
  );
  const slice = pageSlice(matches, params.get("releasePage"));
  return (
    <section className="gh-section">
      <h2>Release timeline</h2>
      <div className="gh-filter-grid">
        <label>
          Release period
          <select
            value={selectedYear}
            onChange={(e) =>
              update({
                releaseYear: e.target.value === "all" ? "all" : null,
                releasePage: null,
              })
            }
          >
            <option value={year.year}>{year.year}</option>
            <option value="all">All years</option>
          </select>
        </label>
        <label>
          Release repository
          <select
            value={repository}
            onChange={(e) =>
              update({ releaseRepo: e.target.value, releasePage: null })
            }
          >
            <option value="">All repositories</option>
            {[...new Set(data.releases.map((r) => r.repository))]
              .sort()
              .map((r) => (
                <option key={r}>{r}</option>
              ))}
          </select>
        </label>
      </div>
      <p role="status">
        {matches.length === 1 ? "1 published release." : `${matches.length} published releases.`}
      </p>
      {!matches.length && (
        <p>
          No releases match this period and repository. Choose all years or
          another repository.
        </p>
      )}
      <ol className="gh-event-list">
        {slice.items.map((r) => (
          <li key={`${r.repository}:${r.id}`} className="gh-panel">
            <p className="gh-hint">
              <bdi>{r.repository}</bdi> ·{" "}
              <time dateTime={r.publishedAt}>{r.publishedAt.slice(0, 10)}</time>
              {r.prerelease && " · Prerelease"}
            </p>
            <h3>
              <a href={r.url}>
                <bdi>{r.title}</bdi>
              </a>
            </h3>
            <p>
              Version <bdi>{r.tag}</bdi>
            </p>
            <p className="gh-source-notes" dir="auto">
              {sourceExcerpt(r.notes) ||
                "No release notes provided. Open the release for details."}
            </p>
            <a href={r.url}>Read release notes: {r.repository} {r.tag}</a>
            {r.assets.length ? (
              <details>
                <summary>Download assets ({r.assets.length})</summary>
                <ul>
                  {r.assets.map((a) => (
                    <li key={a.url}>
                      <a href={a.url}>
                        <bdi>{a.name}</bdi>
                      </a>{" "}
                      · {number(a.size)} bytes
                    </li>
                  ))}
                </ul>
              </details>
            ) : (
              <p className="gh-hint">
                No downloadable assets attached. Source archives are available
                on the release page.
              </p>
            )}
          </li>
        ))}
      </ol>
      <Pagination
        {...slice}
        label="Releases"
        onPage={(releasePage) => update({ releasePage })}
      />
    </section>
  );
}
export default function ActivityView({ data, year, params, update }) {
  const location = useLocation();
  const languageTotal =
    data.summary.languages.reduce((n, r) => n + r.bytes, 0) || 1;
  const metrics = yearMetrics(year);
  const otherYears = data.years.filter((y) => y.year !== year.year);
  const other =
    otherYears.find((y) => String(y.year) === params.get("compare")) ||
    otherYears.filter((y) => y.year < year.year).at(-1) ||
    otherYears[0];
  const comparison = other
    ? compareYears(year, other, params.get("period") === "full")
    : null;
  const max = comparison
    ? Math.max(1, ...comparison.a.months, ...comparison.b.months)
    : 1;
  const created = data.repositories
    ? data.repositories.filter(
        (r) => !r.fork && r.createdAt.startsWith(String(year.year)),
      ).length
    : null;
  const released = data.releases
    ? data.releases.filter((r) => r.publishedAt.startsWith(String(year.year)))
        .length
    : null;
  return (
    <div>
      <div className="gh-section-heading">
        <h2>Year in review</h2>
        <YearSelect
          years={data.years}
          value={year.year}
          onChange={(value) =>
            update({ year: value, day: null, releasePage: null })
          }
        />
      </div>
      <dl className="gh-metrics">
        <Metric label="Contributions" value={metrics.total} />
        <Metric label="Active days" value={metrics.active} />
        <Metric
          label="Repositories created"
          value={created}
          note="Public repositories that aren’t forks, including archived repositories"
        />
        <Metric
          label="Published releases"
          value={released}
          note="Public repositories that aren’t forks, including archives and prereleases"
        />
      </dl>
      <p>
        Busiest {metrics.busiest.length > 1 ? "months (tied)" : "month"}:{" "}
        <strong>
          {metrics.busiest.length
            ? metrics.busiest.map((i) => monthNames[i]).join(", ")
            : "None — no contributions recorded"}
        </strong>
        .
      </p>
      <p className="gh-hint">
        Recorded coverage: {year.days[0]?.date || "unavailable"} to{" "}
        {year.days.at(-1)?.date || "unavailable"}.{" "}
        {data.discoveryCoverage?.scope ||
          "Repository and release history is unavailable in older snapshots."}{" "}
        Activity counts describe participation, not engineering quality.
      </p>
      <section className="gh-panel gh-section">
        <h2>Year-over-year comparison</h2>
        {comparison ? (
          <>
            <div className="gh-filter-grid">
              <YearSelect
                years={otherYears}
                value={other.year}
                label="Compare with"
                onChange={(compare) => update({ compare })}
              />
              <label>
                Comparison period
                <select
                  value={params.get("period") === "full" ? "full" : "matched"}
                  onChange={(e) => update({ period: e.target.value })}
                >
                  <option value="matched">Matched dates</option>
                  <option value="full">Full recorded years</option>
                </select>
              </label>
            </div>
            <p>{comparison.coverage}</p>
            <p>
              {year.year}: <strong>{number(comparison.a.total)}</strong>{" "}
              contributions on {comparison.a.active} active days. {other.year}:{" "}
              <strong>{number(comparison.b.total)}</strong> contributions on{" "}
              {comparison.b.active} active days.
            </p>
            <p>
              {comparison.comparable && comparison.b.total > 0
                ? `${number(((comparison.a.total - comparison.b.total) / comparison.b.total) * 100)}% contribution change.`
                : "Percentage change is not comparable without shared coverage and a nonzero baseline."}
            </p>
            <figure className="gh-comparison">
              <figcaption>
                Monthly contributions — solid bars: {year.year}; striped bars:{" "}
                {other.year}.
              </figcaption>
              <div aria-hidden="true">
                {monthNames.map((month, i) => (
                  <div className="gh-compare-row" key={month}>
                    <span>{month}</span>
                    <div>
                      <div
                        className="gh-compare-a"
                        style={{
                          width: `${(comparison.a.months[i] / max) * 100}%`,
                        }}
                      />
                      <div
                        className="gh-compare-b"
                        style={{
                          width: `${(comparison.b.months[i] / max) * 100}%`,
                        }}
                      />
                    </div>
                    <span>
                      {comparison.a.covered[i]
                        ? number(comparison.a.months[i])
                        : "—"}{" "}
                      /{" "}
                      {comparison.b.covered[i]
                        ? number(comparison.b.months[i])
                        : "—"}
                    </span>
                  </div>
                ))}
              </div>
            </figure>
            <details>
              <summary>View exact monthly counts</summary>
              <table>
                <caption>
                  Recorded monthly contributions for the chosen comparison
                  period
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Month</th>
                    <th scope="col">{year.year}</th>
                    <th scope="col">{other.year}</th>
                  </tr>
                </thead>
                <tbody>
                  {monthNames.map((month, i) => (
                    <tr key={month}>
                      <th scope="row">{month}</th>
                      <td>
                        {comparison.a.covered[i]
                          ? comparison.a.months[i]
                          : "Not covered"}
                      </td>
                      <td>
                        {comparison.b.covered[i]
                          ? comparison.b.months[i]
                          : "Not covered"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </details>
          </>
        ) : (
          <p>
            Another recorded year is needed for a comparison. Explore the
            contribution history below.
          </p>
        )}
      </section>
      <section id="contribution-history" className="gh-panel gh-section">
        <h2>Contribution history</h2>
        <ContributionCalendar
          year={year}
          view={params.get("calendar") === "3d" ? "3d" : "calendar"}
          onViewChange={(calendar) => update({ calendar })}
          selectedDate={params.get("day")}
          onDateChange={(day) => update({ day }, true)}
        />
      </section>
      <details
        id="advanced-dashboard"
        className="gh-panel gh-section"
        open={location.hash === "#advanced-dashboard" || undefined}
      >
        <summary>Explore advanced GitHub metrics</summary>
        <h2>Advanced dashboard</h2>
        <Summary summary={data.summary} />
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
          {data.summary.streak.asOf}; an unfinished current day does not break
          yesterday’s streak.
        </p>
      </details>
      <ReleaseTimeline
        data={data}
        year={year}
        params={params}
        update={update}
      />
    </div>
  );
}
