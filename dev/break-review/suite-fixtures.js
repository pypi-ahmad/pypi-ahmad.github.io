import { reports as previous } from "./fixtures.js";
import { githubFixture } from "../../src/test/githubFixture.js";

// Fixtures are not career claims or live dashboard state. Old reports remain intact.
const widths = props => [
  { label: "320px container", width: 320, props },
  { label: "Very wide 1152px container", width: 1152, props },
  { label: "Squeezed by a sibling in a 640px grid", squeezed: true, props },
];
const row = (label, props) => ({ label, width: 320, props });
const noop = () => {};
const dashboard = githubFixture();
const typicalYear = dashboard.years[1];
const sentence = "A synthetic document workflow prepares evidence for review.";
const fixedCopy = "Text is authored in the portfolio, so artificial text-length and locale changes are omitted. No loading, error or disabled props exist.";
const staticState = "Loading, error and disabled states are omitted because this component does not receive them. Hover, focus and disclosures are yours to try.";
const list = (count, noun) => Array.from({ length: count }, (_, i) => `${noun} ${i + 1}`);

const portfolioReports = Object.fromEntries(Object.entries(previous).map(([key, report]) => [key, {
  ...report,
  omitted: `${fixedCopy} ${key === "contact" ? "Contact channels are capped at ten; zero items intentionally renders nothing because the page owns its empty message." : "Repeated lists retain quantity scenarios; synthetic capacity data is not a public result."}`,
  scenarios: report.scenarios.filter(s => !/^(Empty strings|One word|Typical content|Several sentences|Unbroken)/.test(s.label)),
}]));
const project = previous.project.scenarios.find(s => s.props.index).props.repo;
portfolioReports.project.scenarios.push(row("Internal case-study destination", { repo: { ...project, id: "fixture-project" }, caseStudy: true }));
const experience = previous.experience.scenarios.find(s => s.props.experience.systemContext).props.experience;
portfolioReports.experience.scenarios.push(row("Grouped professional projects with story and subprojects", {
  experience: { ...experience, projectGroups: [{ id: "fixture-group", title: "Synthetic document project", context: sentence,
    story: { problem: sentence, finding: sentence, decisions: list(3, "Decision"), lesson: sentence },
    subprojects: [{ title: "Synthetic prototype", description: sentence }], contributions: list(3, "Contribution"), outcomes: experience.outcomes }] },
}));
const certificate = previous.certification.scenarios.find(s => s.label === "3 course topics").props.certificate;
portfolioReports.certification.scenarios.push(row("Credential skills and level-three heading", { certificate: { ...certificate, skills: list(4, "Skill") }, headingLevel: 3 }));

const degree = { title: "Example institution", subtitle: "Example degree", duration: "2022–2024", logoPath: "iiitk_logo.svg", websiteLink: "https://example.com/education", descriptions: list(3, "Coursework") };
const study = { id: "fixture-study", category: "Synthetic example", name: "Document review", description: sentence, problem: sentence, built: sentence,
  decisions: list(3, "Decision"), evidence: "Synthetic evidence only.", limitations: "Not a portfolio result.", technologies: list(3, "Technology"),
  repositories: [{ name: "Example implementation", url: "https://example.com/repository", approach: sentence }] };
const repository = { name: "example-project", url: "https://github.com/example/project", description: sentence, language: "Python", topics: ["documents", "ai"], stars: 12, pushedAt: "2024-03-01T00:00:00Z", archived: false, fork: false };
const descriptions = [
  ["Empty description", ""], ["One-word description", "Parser"], ["Typical description", sentence],
  ["Several sentences", sentence.repeat(8)], ["Unbreakable description", "x".repeat(100)],
  ["Emoji only", "🔎"], ["Emoji mixed with text", "🔎 Document review"],
  ["RTL description", "مراجعة المستندات والأدلة"], ["Mixed-direction description", "مراجعة Python للمستندات"],
  ["Diacritics and tall scripts", "Ångström · tiếng Việt · दस्तावेज़ विश्लेषण"],
];
const yearDays = (count, zero = false) => {
  const days = Array.from({ length: count }, (_, i) => ({ date: new Date(Date.UTC(2024, 0, i + 1)).toISOString().slice(0, 10), count: zero ? 0 : i % 5, level: zero ? 0 : i % 5 }));
  return { year: 2024, days, total: days.reduce((total, day) => total + day.count, 0) };
};
const emptyDashboard = { ...dashboard, years: [], summary: { ...dashboard.summary, languages: [], stars: 0, repositories: 0, contributions: 0, commits: 0, pullRequests: 0, issues: 0, streak: { current: 0, longest: 0, asOf: "2024-03-01" } } };

export const reports = {
  ...portfolioReports,
  degree: { title: "DegreeCard", scope: "Accepts degree identity and coursework; renders the education card.", omitted: fixedCopy,
    scenarios: [...[0, 1, 3, 30].map(count => row(`${count} coursework items`, { degree: { ...degree, descriptions: list(count, "Coursework") } })), ...widths({ degree })] },
  "case-study": { title: "CaseStudy", scope: "Accepts a study with decisions, technologies and repository links; renders a project story.", omitted: `${fixedCopy} Open each disclosure manually to inspect its content.`,
    scenarios: [...[0, 1, 3, 30].map(count => row(`${count} decisions and technologies`, { study: { ...study, decisions: list(count, "Decision"), technologies: list(count, "Technology") } })),
      row("Multiple implementations and optional demo", { study: { ...study, repositories: [...study.repositories, { name: "Second implementation", url: "https://example.com/second" }], demoUrl: "https://example.com/demo" } }), ...widths({ study })] },
  disclosure: { title: "CaseStudyDisclosure", scope: "Accepts a label, optional heading association and child content; renders the native story disclosure.", omitted: `${fixedCopy} Open state is not a prop: expand manually. Print behavior belongs to the page review.`,
    scenarios: [row("Short content", { label: "Read case study", children: sentence }), row("Long child content", { label: "Read project story", children: sentence.repeat(20) }), ...widths({ label: "Read case study", children: sentence })] },
  repository: { title: "RepositoryCard", github: true, scope: "Accepts public repository metadata; renders a linked summary in the GitHub explorer.", omitted: `${staticState} Names stay within GitHub syntax; topics stop at the supported twenty-item maximum.`,
    scenarios: [...descriptions.map(([label, description]) => row(label, { repository: { ...repository, description } })),
      row("Missing optional metadata", { repository: { ...repository, description: "", language: "", pushedAt: null, topics: [], stars: 0 } }),
      row("100-character repository name", { repository: { ...repository, name: "a".repeat(100) } }),
      ...[0, 1, 2, 20].map(count => row(`${count} topics`, { repository: { ...repository, topics: list(count, "topic").map(s => s.replace(" ", "-")) } })),
      row("Featured archived fork; large star count", { featured: true, repository: { ...repository, archived: true, fork: true, stars: 1234567 } }), ...widths({ repository })] },
  calendar: { title: "ContributionCalendar", github: true, scope: "Accepts dated contribution counts and load status; renders calendar and 3D history with a selected day.", omitted: "Date values are structured, not free text. No invented locale strings or multi-year day arrays. One year is capped at 366 days. No disabled prop.",
    scenarios: [row("Loading", { status: "loading" }), row("Error and retry", { status: "error", onRetry: noop }),
      ...[0, 1, 29, 366].map(count => row(`${count} contribution dates`, { year: yearDays(count) })),
      row("Full year with zero contributions", { year: yearDays(366, true) }), row("3D view and selected date", { year: typicalYear, view: "3d", selectedDate: "2024-02-14" }), ...widths({ year: typicalYear })] },
  overview: { title: "GitHubVisualOverview", github: true, scope: "Accepts a dashboard fixture; renders statistics, languages and a rolling contribution heatmap.", omitted: `${staticState} Fixtures preserve valid dates and numeric shapes. Fixed labels are not localized artificially.`,
    scenarios: [row("Zero metrics and missing history", { data: emptyDashboard }), row("One reported language", { data: { ...dashboard, summary: { ...dashboard.summary, languages: dashboard.summary.languages.slice(0, 1) } } }),
      row("Twenty language entries", { data: { ...dashboard, summary: { ...dashboard.summary, languages: list(20, "Language").map(name => ({ name, bytes: 100 })) } } }), ...widths({ data: dashboard })] },
  metric: { title: "Metric", github: true, scope: "Accepts a numeric value, label and optional note; renders one dashboard metric.", omitted: `${staticState} Fixed labels and notes retain authored shapes; values do not repeat.`,
    scenarios: [...[null, 0, 1, 1234567].map(value => row(`Value ${value ?? "unavailable"}`, { label: "Stars", value, note: "Synthetic fixture" })), row("No optional note", { label: "Stars", value: 12 }), ...widths({ label: "Stars", value: 12, note: "Synthetic fixture" })] },
  summary: { title: "Summary", github: true, scope: "Accepts summary numbers; renders compact or full dashboard metrics.", omitted: `${staticState} Metric count is fixed by compact mode; arbitrary quantities and label changes are omitted.`,
    scenarios: [row("Compact", { summary: dashboard.summary, compact: true }), row("All zero values", { summary: emptyDashboard.summary }),
      row("Large values", { summary: { ...dashboard.summary, stars: 1234567, contributions: 9876543 } }), ...widths({ summary: dashboard.summary })] },
  status: { title: "DataStatus", github: true, scope: "Accepts data presence and loading status; renders the GitHub loading or recovery message.", omitted: "Fixed copy; no list, free-text or disabled props. Data present intentionally renders no status message. Retry is a local no-op, not a network request.",
    scenarios: [row("Loading", { status: "loading" }), row("Error", { status: "error", retry: noop }), row("Ready; no message", { status: "ready", data: dashboard }), ...widths({ status: "error", retry: noop })] },
  bars: { title: "Bars", github: true, scope: "Accepts label/value pairs and optional context; renders a dashboard bar chart.", omitted: `${staticState} Counts are nonnegative. Variable repository labels can be long; title and note are fixed copy.`,
    scenarios: [...[0, 1, 3, 30].map(count => row(`${count} bars`, { title: "Fixture chart", values: list(count, "Repository").map((label, i) => [label, i + 1]) })),
      row("Long repository label and zero value", { title: "Fixture chart", values: [["a".repeat(100), 0]] }), row("Large value and suffix", { title: "Fixture chart", values: [["Example", 1234567]], suffix: " downloads", note: "Synthetic fixture" }), ...widths({ title: "Fixture chart", values: [["Example", 10]] })] },
  pagination: { title: "Pagination", github: true, scope: "Accepts current and total pages; renders previous/next controls for GitHub lists.", omitted: "Fixed labels; no free text or loading/error props. Boundary pages supply disabled controls. Callbacks stay local.",
    scenarios: [row("One page; controls absent", { page: 1, pages: 1, onPage: noop }), ...[1, 5, 10].map(page => row(`Page ${page} of ten`, { page, pages: 10, onPage: noop })),
      row("Large page count", { page: 500, pages: 1000, onPage: noop }), ...widths({ page: 1, pages: 10, onPage: noop })] },
  year: { title: "YearSelect", github: true, scope: "Accepts available years and selected value; renders the contribution-year select.", omitted: "Years are numeric, not localized free text. Empty years are excluded: the production caller requires history. Seven years matches the current 2020–2026 history; invented earlier or future years are excluded. Use the native select manually; no loading/error/disabled props.",
    scenarios: [...[1, 2, 7].map(count => row(`${count} available years`, { years: Array.from({ length: count }, (_, i) => ({ year: 2020 + i })), value: "2020", onChange: noop })), ...widths({ years: dashboard.years, value: "2024", onChange: noop })] },
  unavailable: { title: "Unavailable", github: true, scope: "Accepts the unavailable dataset name; renders the snapshot recovery message.", omitted: "Dataset names are authored by the application. No variable text, list, loading or disabled props.",
    scenarios: [...["Repository discovery", "Release history", "External pull requests"].map(name => row(name, { name })), ...widths({ name: "External pull requests" })] },
};
