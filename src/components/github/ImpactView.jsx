import { Metric } from "./GitHubSummary";
import { pageSlice, sourceExcerpt } from "./discovery";
import { Pagination, Unavailable } from "./ViewControls";
export default function ImpactView({ data, params, update }) {
  const records = data.externalPullRequests;
  const slice = pageSlice(records || [], params.get("impactPage"));
  return (
    <section>
      <h2>Open-source impact</h2>
      <p>
        Public, merged pull requests to repositories owned by others. Each entry
        links to the change itself.
      </p>
      <dl className="gh-metrics">
        <Metric
          label="External merged pull requests"
          value={records ? records.length : null}
        />
        <Metric label="Public repository stars" value={data.summary.stars} />
        <Metric label="Public repository forks" value={data.reach.forks} />
      </dl>
      {!records ? (
        <Unavailable name="External contribution history" />
      ) : !records.length ? (
        <div className="gh-panel">
          <h3>No public external merged pull requests found</h3>
          <p>
            Verified contributions will appear here after they are merged and
            included in a new snapshot.
          </p>
          <a href="https://github.com/search?q=is%3Apr+is%3Amerged+is%3Apublic+author%3Apypi-ahmad+-user%3Apypi-ahmad&type=pullrequests">
            View external merged pull requests on GitHub
          </a>
        </div>
      ) : (
        <ol className="gh-event-list">
          {slice.items.map((r) => (
            <li className="gh-panel" key={r.url}>
              <p className="gh-hint">
                <bdi>{r.repository}</bdi> · Merged{" "}
                <time dateTime={r.mergedAt}>{r.mergedAt.slice(0, 10)}</time>
              </p>
              <h3>
                <a href={r.url}>
                  <bdi>{r.title}</bdi>
                </a>
              </h3>
              <p dir="auto" className="gh-source-notes">
                {sourceExcerpt(r.description) ||
                  "Open the pull request to read the change and review discussion."}
              </p>
              <a href={r.url}>Read pull request #{r.number}</a>
            </li>
          ))}
        </ol>
      )}
      <Pagination
        {...slice}
        label="Contributions"
        onPage={(impactPage) => update({ impactPage })}
      />
    </section>
  );
}
