import { number } from "./GitHubSummary";
import { safeGitHubUrl } from "./discovery";
export default function RepositoryCard({ repository: repo, featured = false }) {
  return (
    <article className="gh-panel gh-repository-card">
      <div className="gh-badges">
        {featured && <span>Featured</span>}
        {repo.archived && <span>Archived</span>}
        {repo.fork && <span>Fork</span>}
      </div>
      <h3>
        {safeGitHubUrl(repo.url) ? (
          <a href={repo.url}>
            <bdi>{repo.name}</bdi>
          </a>
        ) : (
          <bdi>{repo.name}</bdi>
        )}
      </h3>
      <p dir="auto">
        {repo.description ||
          "No description provided. Open the repository for its README."}
      </p>
      <p className="gh-hint">
        {repo.language || "Language not reported"} · {number(repo.stars)}{" "}
        {repo.stars === 1 ? "star" : "stars"}
      </p>
      {repo.topics.length > 0 && (
        <details>
          <summary>Topics ({repo.topics.length})</summary>
          <ul className="gh-topic-list">
            {repo.topics.map((topic) => (
              <li key={topic}>
                <bdi>{topic}</bdi>
              </li>
            ))}
          </ul>
        </details>
      )}
      <p className="gh-hint">
        {repo.pushedAt ? (
          <>
            Last push{" "}
            <time dateTime={repo.pushedAt}>{repo.pushedAt.slice(0, 10)}</time>
          </>
        ) : (
          "No push date available"
        )}
      </p>
    </article>
  );
}
