import { Link } from "react-router-dom";
import { number } from "./GitHubSummary";

const DAY = 86400000;
const languageColors = [
  "#d95f0e",
  "#e34c26",
  "#3572a5",
  "#3178c6",
  "#f1e05a",
  "#89e051",
  "#663399",
  "#012456",
];

const parseDate = (stamp) => new Date(`${stamp}T00:00:00Z`);
const dateStamp = (date) => date.toISOString().slice(0, 10);
const shiftDate = (stamp, amount) => {
  const date = parseDate(stamp);
  date.setUTCDate(date.getUTCDate() + amount);
  return dateStamp(date);
};
const readableDate = (stamp, includeYear = true) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    ...(includeYear ? { year: "numeric" } : {}),
    timeZone: "UTC",
  }).format(parseDate(stamp));

export function flattenContributionDays(years = []) {
  return years
    .flatMap((year) => year.days)
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function languageShares(languages = [], limit = 8) {
  const total = languages.reduce((sum, language) => sum + language.bytes, 0);
  if (!total) return [];
  return languages.slice(0, limit).map((language, index) => ({
    ...language,
    color: languageColors[index % languageColors.length],
    percent: (language.bytes / total) * 100,
  }));
}

export function contributionRanges(years = [], asOf) {
  const days = flattenContributionDays(years);
  const counts = new Map(days.map((day) => [day.date, day.count]));
  const allTime = days.reduce((sum, day) => sum + day.count, 0);
  let currentEnd = asOf;
  if (counts.get(currentEnd) === 0) currentEnd = shiftDate(currentEnd, -1);
  let cursor = currentEnd;
  let currentStart = null;
  while ((counts.get(cursor) ?? 0) > 0) {
    currentStart = cursor;
    cursor = shiftDate(cursor, -1);
  }

  let longest = 0;
  let running = 0;
  let runningStart = null;
  let longestStart = null;
  let longestEnd = null;
  let previous = null;
  for (const day of days.filter((item) => item.date <= asOf)) {
    if (previous && shiftDate(previous, 1) !== day.date) running = 0;
    if (day.count > 0) {
      if (running === 0) runningStart = day.date;
      running += 1;
      if (running > longest) {
        longest = running;
        longestStart = runningStart;
        longestEnd = day.date;
      }
    } else {
      running = 0;
    }
    previous = day.date;
  }
  return {
    allTime,
    coverageStart: days[0]?.date ?? null,
    coverageEnd: days.at(-1)?.date ?? null,
    currentStart,
    currentEnd: currentStart ? currentEnd : null,
    longest,
    longestStart,
    longestEnd,
  };
}

export function rollingContributionWindow(years = [], asOf, length = 365) {
  const lookup = new Map(
    flattenContributionDays(years).map((day) => [day.date, day]),
  );
  const start = shiftDate(asOf, -(length - 1));
  const days = Array.from({ length }, (_, index) => {
    const date = shiftDate(start, index);
    return lookup.get(date) ?? { date, count: null, level: null };
  });
  const gridStart = shiftDate(start, -parseDate(start).getUTCDay());
  const gridEnd = shiftDate(asOf, 6 - parseDate(asOf).getUTCDay());
  const gridLength =
    Math.round((parseDate(gridEnd) - parseDate(gridStart)) / DAY) + 1;
  const cells = Array.from({ length: gridLength }, (_, index) => {
    const date = shiftDate(gridStart, index);
    const inWindow = date >= start && date <= asOf;
    return inWindow
      ? (lookup.get(date) ?? { date, count: null, level: null })
      : { date, outside: true, count: null, level: null };
  });
  const months = [];
  let previousMonth = null;
  for (const day of days) {
    const month = day.date.slice(0, 7);
    if (month !== previousMonth) {
      months.push({
        label: new Intl.DateTimeFormat("en-US", {
          month: "short",
          timeZone: "UTC",
        }).format(parseDate(day.date)),
        column:
          Math.floor((parseDate(day.date) - parseDate(gridStart)) / DAY / 7) +
          1,
      });
      previousMonth = month;
    }
  }
  return {
    start,
    end: asOf,
    days,
    cells,
    months,
    weeks: gridLength / 7,
    total: days.reduce((sum, day) => sum + (day.count ?? 0), 0),
    complete: days.every((day) => day.count !== null),
  };
}

const rangeLabel = (start, end) =>
  start && end
    ? `${readableDate(start)} – ${readableDate(end)}`
    : "Unavailable";
const shareLabel = (value) =>
  `${new Intl.NumberFormat("en-US", {
    maximumFractionDigits: value < 1 ? 2 : 1,
  }).format(value)}%`;

function StatisticsSnapshot({ data }) {
  const languages = languageShares(data.summary.languages);
  const ranges = contributionRanges(data.years, data.summary.streak.asOf);
  const languageLabel = languages
    .map((language) => `${language.name} ${shareLabel(language.percent)}`)
    .join(", ");
  return (
    <section
      className="gh-section gh-panel gh-visual-dashboard"
      aria-labelledby="github-snapshot-title"
    >
      <h2 id="github-snapshot-title">GitHub statistics snapshot</h2>
      <div className="gh-snapshot-main">
        <dl className="gh-snapshot-list">
          <div>
            <dt>Total stars earned</dt>
            <dd>{number(data.summary.stars)}</dd>
          </div>
          <div>
            <dt>Commits</dt>
            <dd>
              {number(data.summary.commits)} <span>past 12 months</span>
            </dd>
          </div>
          <div>
            <dt>Pull requests</dt>
            <dd>
              {number(data.summary.pullRequests)} <span>lifetime authored</span>
            </dd>
          </div>
          <div>
            <dt>Issues</dt>
            <dd>
              {number(data.summary.issues)} <span>lifetime authored</span>
            </dd>
          </div>
          <div>
            <dt>External repositories</dt>
            <dd>
              {number(data.reach.external_total)}{" "}
              <span>lifetime contributed to</span>
            </dd>
          </div>
        </dl>
        <div
          className="gh-repository-ring"
          aria-label={`${number(data.summary.repositories)} active original public repositories`}
        >
          <strong>{number(data.summary.repositories)}</strong>
          <span>Public repositories</span>
        </div>
        <div className="gh-language-share">
          <h3>Most used languages</h3>
          {languages.length ? (
            <>
              <div
                className="gh-language-bar"
                role="img"
                aria-label={`Repository language share: ${languageLabel}`}
              >
                {languages.map((language) => (
                  <span
                    key={language.name}
                    style={{
                      width: `${language.percent}%`,
                      background: language.color,
                    }}
                  />
                ))}
              </div>
              <ul>
                {languages.map((language) => (
                  <li key={language.name}>
                    <span
                      className="gh-language-dot"
                      style={{ background: language.color }}
                      aria-hidden="true"
                    />
                    <span>{language.name}</span>
                    <strong>{shareLabel(language.percent)}</strong>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>No repository language data is available.</p>
          )}
        </div>
      </div>
      <dl className="gh-snapshot-highlights">
        <div>
          <dt>Total contributions</dt>
          <dd className="gh-snapshot-value">{number(ranges.allTime)}</dd>
          <dd className="gh-snapshot-range">
            {rangeLabel(ranges.coverageStart, ranges.coverageEnd)}
          </dd>
        </div>
        <div>
          <dt>Current streak</dt>
          <dd className="gh-snapshot-value">
            {number(data.summary.streak.current)}
          </dd>
          <dd className="gh-snapshot-range">
            {rangeLabel(ranges.currentStart, ranges.currentEnd)}
          </dd>
        </div>
        <div>
          <dt>Longest streak</dt>
          <dd className="gh-snapshot-value">
            {number(data.summary.streak.longest)}
          </dd>
          <dd className="gh-snapshot-range">
            {rangeLabel(ranges.longestStart, ranges.longestEnd)}
          </dd>
        </div>
      </dl>
    </section>
  );
}

function ContributionHeatmap({ data }) {
  const window = rollingContributionWindow(
    data.years,
    data.summary.streak.asOf,
  );
  return (
    <section
      className="gh-section gh-panel gh-rolling-contributions"
      aria-labelledby="rolling-contributions-title"
    >
      <div className="gh-section-heading">
        <div>
          <h2 id="rolling-contributions-title">Contribution activity</h2>
          <p>
            <strong>{number(window.total)}</strong>{" "}
            {window.complete ? "contributions" : "recorded contributions"} in
            the last 365 days
          </p>
        </div>
        <Link to="/github?tab=activity">Explore contribution history</Link>
      </div>
      {!window.complete && (
        <p className="gh-hint">
          Some dates are unavailable and are not counted as zero.
        </p>
      )}
      <p className="gh-heatmap-scroll-hint">
        Scroll horizontally to see the full year.
      </p>
      <div
        className="gh-heatmap-scroll"
        role="region"
        aria-label="Rolling contribution calendar"
        tabIndex="0"
      >
        <div className="gh-heatmap" style={{ "--heatmap-weeks": window.weeks }}>
          <div className="gh-heatmap-months" aria-hidden="true">
            {window.months.map((month, index) => (
              <span
                key={`${month.label}-${index}`}
                style={{ gridColumnStart: month.column }}
              >
                {month.label}
              </span>
            ))}
          </div>
          <div className="gh-heatmap-body">
            <div className="gh-heatmap-weekdays" aria-hidden="true">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>
            <div className="gh-heatmap-grid" aria-hidden="true">
              {window.cells.map((day) => (
                <span
                  key={day.date}
                  className={
                    day.outside
                      ? "is-outside"
                      : day.level === null
                        ? "is-unavailable"
                        : `gh-level-${day.level}`
                  }
                  title={
                    day.outside
                      ? undefined
                      : day.count === null
                        ? `${day.date}: unavailable`
                        : `${day.date}: ${number(day.count)} ${day.count === 1 ? "contribution" : "contributions"}`
                  }
                />
              ))}
            </div>
          </div>
          <div
            className="gh-heatmap-legend"
            aria-label="Contribution intensity from less to more"
          >
            <span>Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <i
                key={level}
                className={`gh-level-${level}`}
                aria-hidden="true"
              />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>
      <details className="gh-data-table gh-rolling-table">
        <summary>View exact rolling daily counts</summary>
        <table>
          <caption>
            {readableDate(window.start)} to {readableDate(window.end)}
          </caption>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Contributions</th>
            </tr>
          </thead>
          <tbody>
            {window.days.map((day) => (
              <tr key={day.date}>
                <th scope="row">{day.date}</th>
                <td>
                  {day.count === null ? "Not available" : number(day.count)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </section>
  );
}

export default function GitHubVisualOverview({ data }) {
  return (
    <>
      <StatisticsSnapshot data={data} />
      <ContributionHeatmap data={data} />
    </>
  );
}
