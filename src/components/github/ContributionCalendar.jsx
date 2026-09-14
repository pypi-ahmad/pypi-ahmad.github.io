import { useId, useState } from "react";
import { number } from "./GitHubSummary";

const months = Array.from({ length: 12 }, (_, i) =>
  new Date(Date.UTC(2024, i)).toLocaleString("en", {
    month: "long",
    timeZone: "UTC",
  }),
);
export function dayLabel(day) {
  return `${day.date}: ${number(day.count)} ${day.count === 1 ? "contribution" : "contributions"}`;
}

export default function ContributionCalendar({
  year,
  status = "ready",
  onRetry = () => {},
  view: controlledView,
  onViewChange,
  selectedDate,
  onDateChange,
}) {
  const id = useId();
  const [localSelected, setLocalSelected] = useState(null);
  const [localView, setLocalView] = useState("calendar");
  const selected = selectedDate === undefined ? localSelected : selectedDate;
  const view = controlledView ?? localView;
  const setSelected = (value) => {
    setLocalSelected(value);
    onDateChange?.(value);
  };
  const setView = (value) => {
    setLocalView(value);
    onViewChange?.(value);
  };
  const days = year?.days ?? [];
  const active = days.find((day) => day.date === selected) ?? days.at(-1);
  function move(event, index) {
    const delta = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -7,
      ArrowDown: 7,
      Home: -index,
      End: days.length - index - 1,
    }[event.key];
    if (delta === undefined) return;
    event.preventDefault();
    const next = days[Math.min(days.length - 1, Math.max(0, index + delta))];
    setSelected(next.date);
    document.getElementById(`${id}-${next.date}`)?.focus();
  }
  if (status === "loading")
    return <p role="status">Loading contribution history…</p>;
  if (status === "error")
    return (
      <div role="status">
        <p>Contribution history is unavailable.</p>
        <button onClick={onRetry}>Try again</button>
      </div>
    );
  if (!days.length)
    return <p>No contribution dates are available. Choose another year.</p>;
  const groups = months
    .map((month, index) => ({
      month,
      days: days.filter(
        (day) => new Date(`${day.date}T00:00:00Z`).getUTCMonth() === index,
      ),
    }))
    .filter((group) => group.days.length);
  return (
    <div className="gh-calendar">
      <div className="gh-toolbar">
        <p>
          <strong>{number(year.total)}</strong> contributions in {year.year}
        </p>
        <div className="gh-segments" aria-label="History view">
          <button
            aria-pressed={view === "calendar"}
            onClick={() => setView("calendar")}
          >
            Calendar
          </button>
          <button aria-pressed={view === "3d"} onClick={() => setView("3d")}>
            3D view
          </button>
        </div>
      </div>
      {year.total === 0 && (
        <p>
          No contributions recorded this year. Choose another year to explore
          more activity.
        </p>
      )}
      {view === "3d" && (
        <svg
          className="gh-isometric"
          viewBox="0 0 900 380"
          role="img"
          aria-label={`Isometric contribution history for ${year.year}. Exact values are in the calendar and table below.`}
        >
          {days.map((day, index) => {
            const first = new Date(Date.UTC(year.year, 0, 1));
            const offset =
              Math.round(
                (new Date(`${day.date}T00:00:00Z`) - first) / 86400000,
              ) + first.getUTCDay();
            const week = Math.floor(offset / 7),
              row = offset % 7;
            const x = 120 + week * 13 - row * 13,
              y = 75 + week * 3.5 + row * 8;
            const height = 3 + day.level * 12;
            return (
              <g
                key={day.date}
                className={`gh-level-${day.level}${active?.date === day.date ? " gh-cube-selected" : ""}`}
              >
                <title>{dayLabel(day)}</title>
                <path
                  d={`M${x},${y} l12,3.5 v${height} l-12,-3.5z`}
                  className="gh-cube-side"
                />
                <path
                  d={`M${x + 12},${y + 3.5} l12,-8 v${height} l-12,8z`}
                  className="gh-cube-side"
                />
                <path d={`M${x},${y} l12,-8 12,3.5 -12,8z`} />
              </g>
            );
          })}
        </svg>
      )}
      <p className="gh-hint">
        Select a date for its count. Use arrow keys to move between dates.
      </p>
      <div className="gh-months">
        {groups.map((group) => (
          <section
            className="gh-month"
            key={group.month}
            aria-label={`${group.month} ${year.year}`}
          >
            <h3>{group.month}</h3>
            <div className="gh-days">
              {group.days.map((day, monthIndex) => (
                <button
                  key={day.date}
                  id={`${id}-${day.date}`}
                  type="button"
                  className={`gh-day gh-level-${day.level}`}
                  style={
                    monthIndex === 0
                      ? {
                          gridColumnStart:
                            new Date(`${day.date}T00:00:00Z`).getUTCDay() + 1,
                        }
                      : undefined
                  }
                  aria-label={dayLabel(day)}
                  aria-pressed={active?.date === day.date}
                  title={dayLabel(day)}
                  tabIndex={active?.date === day.date ? 0 : -1}
                  onClick={() => setSelected(day.date)}
                  onKeyDown={(event) => move(event, days.indexOf(day))}
                >
                  {Number(day.date.slice(-2))}
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
      <p className="gh-day-detail" role="status" aria-atomic="true">
        {active ? dayLabel(active) : "Select a contribution date."}
      </p>
      <details className="gh-data-table">
        <summary>View exact daily counts</summary>
        {groups.map((group) => (
          <table key={group.month}>
            <caption>
              {group.month} {year.year}
            </caption>
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Contributions</th>
              </tr>
            </thead>
            <tbody>
              {group.days.map((day) => (
                <tr key={day.date}>
                  <th scope="row">{day.date}</th>
                  <td>{number(day.count)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </details>
    </div>
  );
}
