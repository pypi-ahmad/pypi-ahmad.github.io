import { githubData } from "../../data/github";
export const number = (value) =>
  value === null
    ? "Unavailable"
    : new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 }).format(
        value,
      );

export function Metric({ label, value, note }) {
  return (
    <div className="gh-metric">
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
        note="Public owned repositories"
      />
      <Metric
        label="Repositories"
        value={summary.repositories}
        note="Active, original public repositories"
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
            note="Lifetime authored"
          />
          <Metric
            label="Issues"
            value={summary.issues}
            note="Lifetime authored"
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
            <p>GitHub data is unavailable. Try again or view the profile.</p>
            <button onClick={retry}>Try again</button>{" "}
            <a href={githubData.profile}>View GitHub profile</a>
          </>
        ) : (
          <p>Loading GitHub activity…</p>
        )}
      </div>
    );
  const delayed = Date.now() - Date.parse(data.generatedAt) > 72 * 3600000;
  return (
    <div className="gh-freshness">
      <p>
        Updated{" "}
        <time dateTime={data.generatedAt}>
          {new Date(data.generatedAt).toLocaleString("en-GB", {
            timeZone: "UTC",
            dateStyle: "medium",
            timeStyle: "short",
          })}{" "}
          UTC
        </time>
        {status === "saved" ? " · Saved snapshot" : ""}
      </p>
      {delayed && (
        <p>
          Updates are delayed.{" "}
          <button className="gh-text-button" onClick={retry}>
            Check for updates
          </button>{" "}
          or <a href={githubData.profile}>view GitHub profile</a>.
        </p>
      )}
    </div>
  );
}
