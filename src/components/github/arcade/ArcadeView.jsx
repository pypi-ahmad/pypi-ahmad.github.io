import { useEffect, useRef, useState } from "react";
import Arcade from "./Arcade";
import { games } from "./registry";
import { YearSelect } from "../ViewControls";
import {
  achievementLabels,
  clearProgress,
  dailyChallenge,
  ENGINE_VERSION,
  readProgress,
  recordRun,
} from "./progress";
export default function ArcadeView({ data, year, params, update }) {
  const [today, setToday] = useState(() =>
    new Date().toISOString().slice(0, 10),
  );
  const [progress, setProgress] = useState(readProgress);
  const progressRef = useRef(progress);
  const [message, setMessage] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [generation, setGeneration] = useState(0);
  const mode = params.get("mode") === "daily" ? "daily" : "free";
  const requestedDate = params.get("challenge");
  const challenge = dailyChallenge(requestedDate, today);
  const game = games.find((g) => g.id === params.get("game"))?.id || "snake";
  const [frozen, setFrozen] = useState(challenge);
  // A date rollover announces availability; only an explicit action replaces the current run.
  useEffect(() => {
    const timer = setInterval(
      () => setToday(new Date().toISOString().slice(0, 10)),
      30000,
    );
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    setFrozen(dailyChallenge(requestedDate));
  }, [requestedDate]);
  useEffect(() => {
    if (mode === "daily" && requestedDate !== frozen.date)
      update({ challenge: frozen.date }, true);
  }, [mode, frozen.date]);
  const effectiveGame = mode === "daily" ? frozen.game : game;
  const identity =
    mode === "daily"
      ? frozen.identity
      : `free:${year.year}:${data.generatedAt}:v${ENGINE_VERSION}`;
  const gameYear =
    mode === "daily"
      ? {
          year: 2000,
          days: [{ date: "2000-01-01", count: 1, level: 1 }],
          total: 1,
          challengeSeed: frozen.seed,
        }
      : year;
  function complete(run) {
    const previous = progressRef.current;
    const next = recordRun(run, previous);
    progressRef.current = next;
    setProgress(next);
    const newIds = next.achievements.filter(
      (id) => !previous.achievements.includes(id),
    );
    setMessage(
      newIds.length
        ? `Achievement unlocked: ${newIds.map((id) => achievementLabels[id]).join("; ")}.`
        : "Run completed.",
    );
  }
  function reset() {
    const success = clearProgress();
    if (success) {
      const empty = { version: 1, runs: [], achievements: [] };
      progressRef.current = empty;
      setProgress(empty);
      setGeneration((n) => n + 1);
    }
    setConfirm(false);
    setMessage(
      success
        ? "Arcade progress cleared on this browser."
        : "Unable to clear saved progress. Check browser storage permissions and try again.",
    );
  }
  return (
    <section id="contribution-arcade">
      <h2>Contribution arcade</h2>
      <p>
        Seven playable mini-games. Scores and achievements stay in this browser
        when local storage is available.
      </p>
      <div className="gh-filter-grid">
        <label>
          Play mode
          <select
            value={mode}
            onChange={(e) => {
              setFrozen(challenge);
              update({
                mode: e.target.value,
                challenge: e.target.value === "daily" ? challenge.date : null,
              });
            }}
          >
            <option value="free">Contribution free play</option>
            <option value="daily">Daily challenge</option>
          </select>
        </label>
        {mode === "free" && (
          <YearSelect
            years={data.years}
            value={year.year}
            onChange={(value) => update({ year: value })}
          />
        )}
      </div>
      {mode === "daily" && (
        <div className="gh-panel">
          <h3>Daily challenge · {frozen.date} UTC</h3>
          <p>
            {games.find((g) => g.id === effectiveGame).name} · Same date, engine
            version, and starting layout for every visitor. Unlimited retries.
          </p>
          {frozen.date !== today && (
            <button
              onClick={() => {
                const next = dailyChallenge(today);
                setFrozen(next);
                update({ challenge: today });
              }}
            >
              Play today’s challenge
            </button>
          )}
        </div>
      )}
      <Arcade
        key={`${mode}:${mode === "daily" ? identity : year.year}:${generation}`}
        year={gameYear}
        snapshot={mode === "daily" ? identity : data.generatedAt}
        selectedGame={effectiveGame}
        onGameChange={(id) => update({ game: id })}
        lockedGame={mode === "daily"}
        runContext={{
          mode,
          identity,
          challenge: mode === "daily" ? frozen.date : null,
        }}
        onComplete={complete}
      />
      <p role="status">{message}</p>
      <section className="gh-panel gh-section">
        <h3>Local achievements</h3>
        <ul className="gh-achievements">
          {Object.entries(achievementLabels).map(([id, label]) => (
            <li key={id}>
              {progress.achievements.includes(id) ? "Unlocked" : "Locked"} —{" "}
              {label}
            </li>
          ))}
        </ul>
        <h3>Recent game history</h3>
        <p>
          Latest 100 completed runs. Free-play scores are comparable only within
          the same contribution snapshot; daily scores use fixed scoring.
        </p>
        {!progress.runs.length ? (
          <p>No completed runs yet. Select Play and finish a game to start your history.</p>
        ) : (
          <details>
            <summary>View completed runs ({progress.runs.length})</summary>
            <ol className="gh-event-list">
              {progress.runs.map((run) => (
                <li key={run.id}>
                  <strong>{games.find((g) => g.id === run.game)?.name}</strong>{" "}
                  ·{" "}
                  {run.mode === "daily"
                    ? `Daily ${run.challenge}`
                    : "Free play"}{" "}
                  · {run.score} points ·{" "}
                  {run.outcome === "won" ? "Won" : "Finished"}
                  {run.score ===
                    Math.max(
                      ...progress.runs
                        .filter(
                          (item) =>
                            item.game === run.game &&
                            item.identity === run.identity,
                        )
                        .map((item) => item.score),
                    ) && " · Best in retained history"}
                  <p className="gh-hint">
                    {run.finishedAt.slice(0, 19).replace("T", " ")} UTC ·{" "}
                    {run.identity}
                  </p>
                </li>
              ))}
            </ol>
          </details>
        )}
        {confirm ? (
          <div role="group" aria-label="Confirm clearing arcade progress">
            <p>
              Clear all saved arcade scores, completed runs, and achievements on
              this browser? This cannot be undone.
            </p>
            <button className="gh-danger-button" onClick={reset}>
              Clear all arcade progress
            </button>
            <button onClick={() => setConfirm(false)}>Cancel</button>
          </div>
        ) : (
          <button onClick={() => setConfirm(true)}>
            Clear arcade progress
          </button>
        )}
      </section>
    </section>
  );
}
