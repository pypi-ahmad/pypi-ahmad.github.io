import { useState } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { FaDiscord, FaEnvelope } from "react-icons/fa";
import Header from "../../src/components/header/Header";
import ProjectCard from "../../src/components/ProjectCard/ProjectCard";
import ExperienceCard from "../../src/components/experienceCard/ExperienceCard";
import DegreeCard from "../../src/components/degreeCard/DegreeCard";
import CertificationCard from "../../src/components/certificationCard/CertificationCard";
import ContactLinksList from "../../src/components/socialMedia/ContactLinksList";
import CaseStudy from "../../src/components/CaseStudy/CaseStudy";
import CaseStudyDisclosure from "../../src/components/CaseStudy/CaseStudyDisclosure";
import RepositoryCard from "../../src/components/github/RepositoryCard";
import ContributionCalendar from "../../src/components/github/ContributionCalendar";
import GitHubVisualOverview from "../../src/components/github/GitHubVisualOverview";
import { Metric, Summary, DataStatus } from "../../src/components/github/GitHubSummary";
import { Bars } from "../../src/components/github/AdvancedDashboard";
import { Pagination, YearSelect, Unavailable } from "../../src/components/github/ViewControls";
import { ThemeControllerProvider, useThemeController } from "../../src/themeController";
import { GlobalStyles } from "../../src/global";
import "../../src/index.css";
import "../../src/components/github/github.css";
import { reports } from "./suite-fixtures.js";

const components = { project: ProjectCard, experience: ExperienceCard, degree: DegreeCard, certification: CertificationCard,
  contact: ContactLinksList, "case-study": CaseStudy, disclosure: CaseStudyDisclosure, repository: RepositoryCard,
  calendar: ContributionCalendar, overview: GitHubVisualOverview, metric: Metric, summary: Summary, status: DataStatus,
  bars: Bars, pagination: Pagination, year: YearSelect, unavailable: Unavailable };

export function Instance({ kind, props, scenario }) {
  const { resolvedTheme } = useThemeController();
  const [value, setValue] = useState(props.value);
  const [page, setPage] = useState(props.page);
  const Component = components[kind];
  const supplied = { ...props, theme: resolvedTheme };
  if (kind === "year") Object.assign(supplied, { value, onChange: setValue });
  if (kind === "pagination") Object.assign(supplied, { page, onPage: setPage });
  if (kind === "contact") supplied.items = props.items.map(item => ({ ...item, Icon: item.label === "Email" ? FaEnvelope : item.label === "Discord" ? FaDiscord : undefined }));
  if (kind === "case-study") supplied.study = { ...props.study, id: `fixture-study-${scenario}` };
  if (kind === "experience") supplied.experience = { ...props.experience,
    ...(props.experience.projectGroups ? { projectGroups: props.experience.projectGroups.map((group, i) => ({ ...group, id: `fixture-group-${scenario}-${i}` })) } : {}) };
  return kind === "metric" ? <dl><Component {...supplied} /></dl> : <Component {...supplied} />;
}

function Suite() {
  const kind = new URLSearchParams(window.location.search).get("component");
  const report = Object.hasOwn(reports, kind) ? reports[kind] : null;
  return <>
    <Header />
    <main id="main-content" className={report?.github ? "gh" : undefined}>
      <h1>{report ? `${report.title} stress-test report` : "Portfolio stress-test reports"}</h1>
      <p>Visual inspection pending. No browser was already available for the one-pass Break review; no scenario is marked passed or broken.</p>
      <p>Fixture data is synthetic, not portfolio claims. Links are examples. Production components, fonts and the navy/indigo theme are unchanged.</p>
      <p>View on a wide browser to see fixed-width cases together. Use the real theme control, browser zoom and OS reduced-motion preference. Tab through controls and open disclosures; their hidden content has not been inspected.</p>
      <nav aria-label="Report navigation"><a href="./index.html">All component reports</a>{" · "}<a href="./page-review.md">Whole-page review</a></nav>
      {report ? <>
        <p>{report.scope}</p><p>Excluded axes: {report.omitted}</p>
        <h2>Planned scenarios</h2><ol>{report.scenarios.map(s => <li key={s.label}>{s.label}</li>)}</ol>
        {report.scenarios.map((s, index) => <section key={s.label}>
          <h2>{s.label}</h2><p>Not visually inspected.</p>
          {s.squeezed ? <div style={{ width: 640, display: "grid", gridTemplateColumns: "240px minmax(0, 1fr)", gap: "1rem" }}>
            <p>Adjacent content</p><div><Instance kind={kind} props={s.props} scenario={index} /></div>
          </div> : <div style={{ width: s.width ?? 480 }}><Instance kind={kind} props={s.props} scenario={index} /></div>}
        </section>)}
      </> : <>
        {kind && <p>Unknown component. Choose a report below.</p>}
        <p>{Object.keys(reports).length} component reports · {Object.values(reports).reduce((total, entry) => total + entry.scenarios.length, 0)} planned scenarios.</p>
        <table><thead><tr><th>Component</th><th>Scenarios</th><th>Inspection</th></tr></thead><tbody>
          {Object.entries(reports).map(([key, entry]) => <tr key={key}><td><a href={`?component=${key}`}>{entry.title}</a></td><td>{entry.scenarios.length}</td><td>Pending your visual pass</td></tr>)}
        </tbody></table>
        <p>The separate page review covers the header, footer, home sections, inline Skills/FDE content, page layouts and all six GitHub views. Earlier local reports remain preserved and are not evidence for this run.</p>
      </>}
    </main>
  </>;
}

if (import.meta.env.DEV && typeof document !== "undefined") createRoot(document.getElementById("root")).render(
  <ThemeControllerProvider><MotionConfig reducedMotion="user"><GlobalStyles /><MemoryRouter><Suite /></MemoryRouter></MotionConfig></ThemeControllerProvider>,
);
