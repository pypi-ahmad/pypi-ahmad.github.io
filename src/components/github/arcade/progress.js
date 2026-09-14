export const PROGRESS_KEY = "github-arcade-progress:v1";
export const ENGINE_VERSION = 1;
export const gameIds = [
  "snake",
  "pacman",
  "breakout",
  "galaga",
  "bomberman",
  "puzzle",
  "minesweeper",
];
export function validDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(+date) && date.toISOString().slice(0, 10) === value;
}
export function dailyChallenge(
  value,
  today = new Date().toISOString().slice(0, 10),
) {
  const date = validDate(value) && value <= today ? value : today;
  const day = Math.floor(Date.parse(`${date}T00:00:00Z`) / 86400000);
  const game = gameIds[((day % 7) + 7) % 7];
  let seed = ENGINE_VERSION;
  for (const char of `${date}:${game}`)
    seed = Math.imul(seed ^ char.charCodeAt(0), 16777619) >>> 0;
  return {
    date,
    game,
    seed: seed || 1,
    identity: `daily:${date}:${game}:v${ENGINE_VERSION}`,
  };
}
export const achievementLabels = {
  finish: "Finish a game",
  win: "Win a game",
  seven: "Finish all seven games",
  three: "Win three different games",
  daily: "Win a daily challenge",
};
export function readProgress() {
  try {
    const data = JSON.parse(localStorage.getItem(PROGRESS_KEY));
    if (
      data?.version !== 1 ||
      !Array.isArray(data.runs) ||
      !Array.isArray(data.achievements)
    )
      return { version: 1, runs: [], achievements: [] };
    return {
      version: 1,
      runs: data.runs
        .filter(
          (r) =>
            typeof r.id === "string" &&
            gameIds.includes(r.game) &&
            ["daily", "free"].includes(r.mode) &&
            ["won", "lost"].includes(r.outcome) &&
            Number.isFinite(r.score) &&
            r.score >= 0 &&
            typeof r.identity === "string" &&
            Number.isFinite(Date.parse(r.finishedAt)),
        )
        .slice(0, 100),
      achievements: data.achievements.filter((id) =>
        Object.hasOwn(achievementLabels, id),
      ),
      finishedGames: (data.finishedGames || []).filter((id) =>
        gameIds.includes(id),
      ),
      wonGames: (data.wonGames || []).filter((id) => gameIds.includes(id)),
    };
  } catch {
    return { version: 1, runs: [], achievements: [] };
  }
}
export function recordRun(run, current = readProgress()) {
  if (current.runs.some((r) => r.id === run.id)) return current;
  const runs = [run, ...current.runs];
  const won = runs.filter((r) => r.outcome === "won");
  const finishedGames = [
    ...new Set([...(current.finishedGames || []), ...runs.map((r) => r.game)]),
  ];
  const wonGames = [
    ...new Set([...(current.wonGames || []), ...won.map((r) => r.game)]),
  ];
  const earned = [
    "finish",
    ...(wonGames.length ? ["win"] : []),
    ...(finishedGames.length === 7 ? ["seven"] : []),
    ...(wonGames.length >= 3 ? ["three"] : []),
    ...(won.some((r) => r.mode === "daily") ? ["daily"] : []),
  ];
  const next = {
    version: 1,
    runs: runs.slice(0, 100),
    achievements: [...new Set([...current.achievements, ...earned])],
    finishedGames,
    wonGames,
  };
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
  } catch {
    /* Keep the current session playable without storage. */
  }
  return next;
}
export function clearProgress() {
  try {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key === PROGRESS_KEY || key?.startsWith("github-arcade:"))
        keys.push(key);
    }
    keys.forEach((key) => localStorage.removeItem(key));
    return true;
  } catch {
    return false;
  }
}
