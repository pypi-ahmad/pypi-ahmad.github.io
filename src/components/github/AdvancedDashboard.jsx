import { Metric, number } from "./GitHubSummary";

export function Bars({ title, values, suffix = "", note }) {
  const maximum = Math.max(1, ...values.map((item) => item[1]));
  return (
    <section className="gh-chart">
      <h3>{title}</h3>
      {note && <p className="gh-hint">{note}</p>}
      {values.length ? (
        <ul className="gh-bars">
          {values.map(([label, value]) => (
            <li key={label}>
              <div>
                <span>{label}</span>
                <strong>
                  {number(value)}
                  {suffix}
                </strong>
              </div>
              <div className="gh-track" aria-hidden="true">
                <span style={{ width: `${(100 * value) / maximum}%` }} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No values recorded for this period.</p>
      )}
    </section>
  );
}

export default function AdvancedDashboard({ data }) {
  const { reach: r, coding: c, distribution: d, summary: s } = data;
  const series = r.star_series;
  const maximum = Math.max(1, ...series.map((item) => item[1]));
  return (
    <div className="gh-advanced">
      <section className="gh-panel">
        <h3>Reach and collaboration</h3>
        <p className="gh-hint">
          Lifetime totals; repository counts use the scope below.
        </p>
        <dl className="gh-metrics">
          <Metric label="Forks" value={r.forks} />
          <Metric label="Watchers" value={r.watchers} />
          <Metric label="PR reviews" value={r.reviews} />
          <Metric
            label="Merged pull requests"
            value={r.merged_pull_requests}
            note={`Of ${number(r.pull_requests)} authored`}
          />
          <Metric label="Open issues" value={r.open_issues} />
          <Metric label="Closed issues" value={r.closed_issues} />
          <Metric label="External repositories" value={r.external_total} />
        </dl>
        <div className="gh-chart-grid">
          <section className="gh-chart">
            <h4>Stars over time</h4>
            <p className="gh-hint">
              Current stargazers by date received; stars later removed are not
              included.
            </p>
            <svg
              viewBox="0 0 600 160"
              className="gh-sparkline"
              role="img"
              aria-label={`${number(s.stars)} stars currently held. Monthly values in the table below.`}
            >
              <path d="M8 8V150H592" fill="none" className="gh-chart-axis" />
              <polyline
                points={series
                  .map(
                    ([, value], index) =>
                      `${8 + (584 * index) / Math.max(1, series.length - 1)},${150 - (138 * value) / maximum}`,
                  )
                  .join(" ")}
                fill="none"
                className="gh-chart-line"
              />
            </svg>
            <details className="gh-data-table">
              <summary>View monthly star counts</summary>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Month</th>
                    <th scope="col">Stars</th>
                  </tr>
                </thead>
                <tbody>
                  {series.map(([month, count]) => (
                    <tr key={month}>
                      <th scope="row">{month}</th>
                      <td>{number(count)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </details>
          </section>
          <section className="gh-chart">
            <h4>Recent external contributions</h4>
            {r.external_recent.length ? (
              <ul className="gh-repositories">
                {r.external_recent.map((name) => (
                  <li key={name}>
                    <a
                      href={`https://github.com/${name.split("/").map(encodeURIComponent).join("/")}`}
                    >
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No public external repositories recorded.</p>
            )}
          </section>
        </div>
      </section>
      <section className="gh-panel">
        <h3>Code and activity</h3>
        <p className="gh-hint">
          Recent activity: {c.recentDays} days. Line-change coverage:{" "}
          {c.coverage}/{c.repositories} repositories; these line totals cover
          available repository history.
        </p>
        <dl className="gh-metrics">
          <Metric label="Lines added" value={c.linesAdded} />
          <Metric label="Lines removed" value={c.linesRemoved} />
        </dl>
        <div className="gh-chart-grid">
          <Bars
            title="Recently used languages"
            values={c.languages}
            note="Estimated commit-weighted language activity"
          />
          <section className="gh-chart">
            <h4>Recently active repositories</h4>
            {c.activeRepositories.length ? (
              <ul className="gh-repositories">
                {c.activeRepositories.map(([name, date]) => (
                  <li key={name}>
                    <a
                      href={`https://github.com/pypi-ahmad/${encodeURIComponent(name)}`}
                    >
                      {name}
                    </a>
                    <time dateTime={date}>{date}</time>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No pushes in this period.</p>
            )}
          </section>
          <Bars
            title={`Commit days · ${c.timezone}`}
            values={c.weekdays.map((value, index) => [
              [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ][index],
              value,
            ])}
          />
          <Bars
            title={`Commit hours · ${c.timezone}`}
            values={c.hours.map((value, index) => [
              `${String(index).padStart(2, "0")}:00`,
              value,
            ])}
          />
        </div>
        <p className="gh-hint">{c.method}</p>
      </section>
      <section className="gh-panel">
        <h3>Distribution and repository traffic</h3>
        <p className="gh-hint">
          Releases and asset downloads: lifetime. Views and clones: last{" "}
          {d.trafficDays} days.
        </p>
        <dl className="gh-metrics">
          <Metric label="Published releases" value={d.releases} />
          <Metric label="Asset downloads" value={d.downloads} />
          <Metric label="Repository views" value={d.views} />
          <Metric label="Repository clones" value={d.clones} />
        </dl>
        <p className="gh-hint">
          Release coverage: {d.releaseCoverage}/{d.repositories} repositories.
          Traffic coverage: {d.trafficCoverage}/{d.repositories} repositories.
          Partial totals cover only available repositories.
        </p>
        <Bars title="Popular referrers" values={d.referrers} />
      </section>
    </div>
  );
}
