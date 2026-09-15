import { githubData } from "../../data/github";
export const number = (value) =>
  value === null
    ? "Unavailable"
    : new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 }).format(
        value,
      );

export function Metric({ label, value, note }) {
  return (
    <div className="gh-metric" data-evidence={Number.isFinite(value) ? "true" : undefined}>
      <dt>{label}</dt>
      <dd>
        {number(value)}
        {note && <p>{note}</p>}
      </dd>
    </div>
  );
}
export function Summary({ summary, compact = false }) {
  return (
    <dl className="gh-metrics">
      <Metric
        label="Stars"
        value={summary.stars}
        note="Public repositories I own"
      />
      <Metric
        label="Repositories"
        value={summary.repositories}
        note="Public repositories, excluding forks and archives"
      />
      <Metric
        label="Contributions"
        value={summary.contributions}
        note="Past 12 months"
      />
      <Metric
        label="Current streak"
        value={summary.streak.current}
        note="Consecutive days"
      />
      {!compact && (
        <>
          <Metric
            label="Commits"
            value={summary.commits}
            note="Past 12 months"
          />
          <Metric
            label="Pull requests"
            value={summary.pullRequests}
            note="Authored to date"
          />
          <Metric
            label="Issues"
            value={summary.issues}
            note="Authored to date"
          />
          <Metric
            label="Longest streak"
            value={summary.streak.longest}
            note="Consecutive days since joining"
          />
        </>
      )}
    </dl>
  );
}
export function DataStatus({ data, status, retry }) {
  if (!data)
    return (
      <div className="gh-status" role="status">
        {status === "error" ? (
          <>
            <p>Unable to load GitHub data. Retry loading it or view my GitHub profile.</p>
            <button onClick={retry}>Retry GitHub data</button>{" "}
            <a href={githubData.profile}>View GitHub profile</a>
          </>
        ) : (
          <p>Loading GitHub activity…</p>
        )}
      </div>
    );
  return null;
}
