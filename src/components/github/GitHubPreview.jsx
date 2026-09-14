import { Link } from "react-router-dom";
import { useDashboard } from "./dashboardStore";
import { Summary, DataStatus } from "./GitHubSummary";
import "./github.css";

export default function GitHubPreview() {
  const state = useDashboard();
  return (
    <section className="gh gh-preview" aria-labelledby="github-preview-title">
      <div className="gh-section-heading">
        <div>
          <p className="gh-eyebrow">Open source, in numbers</p>
          <h2 id="github-preview-title">Building in the open.</h2>
        </div>
        <Link className="gh-button" to="/github">
          View GitHub dashboard <span aria-hidden="true">↗</span>
        </Link>
      </div>
      {state.data && <Summary summary={state.data.summary} compact />}
      <DataStatus {...state} />
    </section>
  );
}
