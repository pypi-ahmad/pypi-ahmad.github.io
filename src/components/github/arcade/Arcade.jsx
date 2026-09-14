import { useEffect, useRef, useState } from "react";
import { useThemeController } from "../../../themeController";
import { games } from "./registry";
import { number } from "../GitHubSummary";

const keys = {
  ArrowUp: "up",
  w: "up",
  ArrowDown: "down",
  s: "down",
  ArrowLeft: "left",
  a: "left",
  ArrowRight: "right",
  d: "right",
};
export function readBest(key) {
  try {
    const value = Number(localStorage.getItem(key));
    return Number.isFinite(value) && value >= 0 ? value : 0;
  } catch {
    return 0;
  }
}
export default function Arcade({
  year,
  snapshot,
  selectedGame,
  onGameChange,
  lockedGame = false,
  runContext,
  onComplete,
}) {
  const [localId, setId] = useState("snake");
  const id = selectedGame ?? localId;
  const run = useRef(null);
  const game = games.find((item) => item.id === id);
  const [storedModel, setModel] = useState(null);
  const loadedGame = useRef(null);
  const model = loadedGame.current === id ? storedModel : null;
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [best, setBest] = useState(0);
  const [flagging, setFlagging] = useState(false);
  const [focusedCell, setFocusedCell] = useState(0);
  const state = useRef(null),
    engine = useRef(null),
    canvas = useRef(null),
    board = useRef(null);
  const input = useRef({}),
    colorRef = useRef({}),
    storageKey = useRef("");
  const { themeMode } = useThemeController();
  const status = model?.status ?? "loading";
  const canPlay = year.total > 0;
  const commit = (next) => {
    state.current = next;
    setModel(next);
  };
  function chooseGame(nextId) {
    if (nextId === id) return;
    state.current = null;
    input.current = {};
    setModel(null);
    setId(nextId);
    onGameChange?.(nextId);
  }
  function tapDirection(direction) {
    if (state.current?.status !== "playing") return;
    input.current.pointer = undefined;
    commit(
      engine.current.step(
        state.current,
        { direction },
        ["snake", "pacman", "bomberman"].includes(id) ? 0.16 : 0.04,
      ),
    );
    input.current.direction = undefined;
  }

  useEffect(() => {
    let cancelled = false;
    engine.current = null;
    state.current = null;
    input.current = {};
    setModel(null);
    setError(false);
    setFlagging(false);
    setFocusedCell(0);
    storageKey.current = `github-arcade:${id}:${year.year}:${snapshot}`;
    setBest(readBest(storageKey.current));
    game
      .load()
      .then((module) => {
        if (!cancelled) {
          engine.current = module;
          loadedGame.current = id;
          const initial = { ...module.create(year), status: "ready" };
          state.current = initial;
          setModel(initial);
        }
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
      input.current = {};
    };
    // A background refresh must not replace the contribution snapshot of an active run.
  }, [id, year.year, attempt]);

  function pause() {
    if (state.current?.status === "playing")
      commit({ ...state.current, status: "paused" });
    input.current = {};
  }
  useEffect(() => {
    const hidden = () => {
      if (document.hidden) pause();
    };
    const released = (event) => {
      if (keys[event.key] === input.current.direction)
        input.current.direction = undefined;
      if (event.key === " ") input.current.action = false;
    };
    document.addEventListener("visibilitychange", hidden);
    window.addEventListener("blur", pause);
    window.addEventListener("keyup", released);
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => !entry.isIntersecting)) pause();
    });
    if (board.current) observer.observe(board.current);
    return () => {
      document.removeEventListener("visibilitychange", hidden);
      window.removeEventListener("blur", pause);
      window.removeEventListener("keyup", released);
      observer.disconnect();
    };
  }, [id, status === "loading"]);

  function paint(s) {
    const element = canvas.current;
    if (!element || !engine.current?.draw || !s) return;
    const ctx = element.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(
      element.width / s.width,
      0,
      0,
      element.height / s.height,
      0,
      0,
    );
    const c = colorRef.current;
    ctx.fillStyle = c.surface;
    ctx.fillRect(0, 0, s.width, s.height);
    engine.current.draw(ctx, s, c);
    if (s.status !== "playing") {
      ctx.fillStyle = "rgba(17,19,24,0.85)";
      ctx.fillRect(0, s.height * 0.4, s.width, s.height * 0.2);
      ctx.fillStyle = c.text;
      ctx.font = `600 ${s.width / 25}px sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText(
        {
          ready: "Ready to play",
          paused: "Paused",
          won: "Challenge complete",
          lost: "Game over",
        }[s.status],
        s.width / 2,
        s.height * 0.52,
      );
      ctx.textAlign = "start";
    }
  }
  useEffect(() => {
    if (board.current) {
      const css = getComputedStyle(board.current);
      colorRef.current = Object.fromEntries(
        ["surface", "text", "muted", "accent", "danger", "reward"].map(
          (name) => [name, css.getPropertyValue(`--gh-game-${name}`).trim()],
        ),
      );
    }
    paint(state.current);
  }, [model, themeMode]);

  useEffect(() => {
    if (status !== "playing" || id === "minesweeper") return;
    let frame, previousTime;
    const tick = (time) => {
      if (state.current?.status !== "playing") return;
      const dt =
        previousTime === undefined
          ? 0
          : Math.min(0.04, (time - previousTime) / 1000);
      previousTime = time;
      const before = state.current,
        next = engine.current.step(before, input.current, dt);
      state.current = next;
      paint(next);
      if (
        next.score !== before.score ||
        next.lives !== before.lives ||
        next.status !== before.status ||
        next.wave !== before.wave
      )
        setModel(next);
      if (next.status === "playing") frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [status, id]);

  useEffect(() => {
    if (status === "won" || status === "lost") {
      const value = Math.max(readBest(storageKey.current), model.score);
      setBest(value);
      try {
        localStorage.setItem(storageKey.current, String(value));
      } catch {
        /* Play remains available when storage is blocked. */
      }
      if (run.current && !run.current.recorded) {
        run.current.recorded = true;
        onComplete?.({
          ...run.current,
          game: id,
          score: model.score,
          outcome: status,
          finishedAt: new Date().toISOString(),
        });
      }
    }
  }, [status, model?.score]);

  function start() {
    if (!engine.current || !canPlay) return;
    storageKey.current = `github-arcade:${id}:${year.year}:${snapshot}`;
    setBest(readBest(storageKey.current));
    input.current = {};
    commit(engine.current.create(year));
    run.current = {
      id:
        globalThis.crypto?.randomUUID?.() ??
        `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      mode: runContext?.mode || "free",
      identity: runContext?.identity || storageKey.current,
      challenge: runContext?.challenge || null,
    };
    board.current?.focus();
  }
  function handleKey(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      pause();
      return;
    }
    if (status !== "playing" || id === "minesweeper") return;
    const direction = keys[event.key];
    if (direction || event.key === " ") {
      if (event.target.tagName === "BUTTON" && event.key === " ") return;
      event.preventDefault();
      input.current.pointer = undefined;
      if (direction) input.current.direction = direction;
      else input.current.action = true;
    }
  }
  function point(event) {
    if (!state.current || id === "minesweeper") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    input.current.pointer = {
      x: ((event.clientX - bounds.left) / bounds.width) * state.current.width,
      y: ((event.clientY - bounds.top) / bounds.height) * state.current.height,
    };
  }
  function cellAction(index, flag = flagging) {
    if (state.current?.status === "playing")
      commit(engine.current.step(state.current, { cell: index, flag }, 0));
  }
  function cellKey(event, index) {
    const delta = { ArrowUp: -9, ArrowDown: 9, ArrowLeft: -1, ArrowRight: 1 }[
      event.key
    ];
    if (delta !== undefined) {
      event.preventDefault();
      event.stopPropagation();
      const next = Math.max(0, Math.min(80, index + delta));
      setFocusedCell(next);
      board.current.querySelector(`[data-cell="${next}"]`)?.focus();
    } else if (event.key.toLowerCase() === "f") {
      event.preventDefault();
      cellAction(index, true);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
      cellAction(index, false);
    }
  }
  const outcomes = {
    ready: "Ready",
    playing: "Playing",
    paused: "Paused — resume when ready",
    won: "Challenge complete",
    lost: "Game over — restart to try again",
    loading: "Loading game…",
  };
  return (
    <div
      className="gh-arcade"
      onKeyDown={handleKey}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) pause();
      }}
    >
      <div className="gh-game-picker" aria-label="Choose a game">
        {games
          .filter((item) => !lockedGame || item.id === id)
          .map((item) => (
            <button
              key={item.id}
              aria-pressed={id === item.id}
              onClick={() => chooseGame(item.id)}
            >
              {item.name}
            </button>
          ))}
      </div>
      <h3>{game.name}</h3>
      <p id="game-instructions">{game.instructions} Escape pauses the game.</p>
      {!canPlay && (
        <p>
          No contributions recorded in {year.year}. Choose another contribution
          year above to play.
        </p>
      )}
      {error ? (
        <p role="status">
          This game could not load.{" "}
          <button onClick={() => setAttempt((value) => value + 1)}>
            Try loading game again
          </button>
        </p>
      ) : (
        <>
          <p role="status" aria-atomic="true">
            {outcomes[status]}
          </p>
          <div className="gh-game-score">
            <span>
              Score <strong>{number(model?.score ?? 0)}</strong>
            </span>
            <span>
              Personal best <strong>{number(best)}</strong>
            </span>
            {model && ["pacman", "breakout", "galaga"].includes(id) && (
              <span>
                Lives <strong>{model.lives}</strong>
              </span>
            )}
            {model?.wave && <span>Wave {model.wave}/3</span>}
          </div>
          <div className="gh-game-controls">
            <button
              className="gh-button"
              disabled={!model || !canPlay}
              onClick={start}
            >
              {status === "ready" || status === "loading" ? "Play" : "Restart"}
            </button>
            {status === "playing" && <button onClick={pause}>Pause</button>}
            {status === "paused" && (
              <button
                onClick={() => {
                  commit({ ...state.current, status: "playing" });
                  board.current?.focus();
                }}
              >
                Resume
              </button>
            )}
          </div>
          {model && (
            <div
              className="gh-game-stage"
              ref={board}
              tabIndex={0}
              role="group"
              aria-label={`${game.name} game board`}
              aria-describedby="game-instructions"
            >
              {id === "minesweeper" ? (
                <div className="gh-mines">
                  {model.cells.map((cell, index) => {
                    const revealed =
                      cell.open || (status === "lost" && cell.mine);
                    const label = revealed
                      ? cell.mine
                        ? "Mine"
                        : `${cell.count} adjacent mines`
                      : cell.flag
                        ? "Flagged"
                        : "Hidden";
                    return (
                      <button
                        key={index}
                        className={`gh-mine${revealed ? " is-open" : ""}`}
                        data-cell={index}
                        tabIndex={focusedCell === index ? 0 : -1}
                        aria-label={`Row ${Math.floor(index / 9) + 1}, column ${(index % 9) + 1}: ${label}`}
                        aria-disabled={status !== "playing"}
                        onFocus={() => setFocusedCell(index)}
                        onClick={() => cellAction(index)}
                        onKeyDown={(event) => cellKey(event, index)}
                      >
                        {revealed
                          ? cell.mine
                            ? "✕"
                            : cell.count || "·"
                          : cell.flag
                            ? "⚑"
                            : "·"}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <canvas
                  ref={canvas}
                  width={1000}
                  height={Math.round((1000 * model.height) / model.width)}
                  aria-label={`${game.name}: ${game.target}`}
                  onPointerDown={(event) => {
                    event.currentTarget.setPointerCapture(event.pointerId);
                    board.current.focus();
                    point(event);
                  }}
                  onPointerMove={(event) => {
                    if (event.buttons) point(event);
                  }}
                  onPointerUp={() => {
                    input.current.pointer = undefined;
                  }}
                  onPointerCancel={() => {
                    input.current.pointer = undefined;
                  }}
                >
                  Use a browser with Canvas support to play this game.
                </canvas>
              )}
            </div>
          )}
          {id === "minesweeper" ? (
            <div className="gh-segments" aria-label="Cell action">
              <button
                aria-pressed={!flagging}
                onClick={() => setFlagging(false)}
              >
                Reveal
              </button>
              <button aria-pressed={flagging} onClick={() => setFlagging(true)}>
                Flag
              </button>
            </div>
          ) : (
            <div className="gh-game-touch">
              <div className="gh-dpad" aria-label="Direction controls">
                {[null, "up", null, "left", "down", "right"].map(
                  (direction, i) =>
                    direction ? (
                      <button
                        key={direction}
                        aria-label={`Move ${direction}`}
                        disabled={status !== "playing"}
                        onPointerDown={(event) => {
                          event.currentTarget.setPointerCapture(
                            event.pointerId,
                          );
                          input.current.pointer = undefined;
                          input.current.direction = direction;
                        }}
                        onPointerUp={() => {
                          input.current.direction = undefined;
                        }}
                        onPointerCancel={() => {
                          input.current.direction = undefined;
                        }}
                        onClick={() => tapDirection(direction)}
                      >
                        {
                          { up: "↑", down: "↓", left: "←", right: "→" }[
                            direction
                          ]
                        }
                      </button>
                    ) : (
                      <span key={i} />
                    ),
                )}
              </div>
              {game.action && (
                <button
                  disabled={status !== "playing"}
                  onPointerDown={(event) => {
                    event.currentTarget.setPointerCapture(event.pointerId);
                    input.current.action = true;
                  }}
                  onPointerUp={() => {
                    input.current.action = false;
                  }}
                  onPointerCancel={() => {
                    input.current.action = false;
                  }}
                  onClick={() => {
                    if (status === "playing") {
                      const next = engine.current.step(
                        state.current,
                        { ...input.current, action: true },
                        0.016,
                      );
                      commit(next);
                    }
                  }}
                >
                  {game.action}
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
