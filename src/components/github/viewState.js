const choices = {
  tab: ["overview", "projects", "activity", "impact", "arcade"],
  calendar: ["calendar", "3d"],
  period: ["matched", "full"],
  mode: ["free", "daily"],
  game: [
    "snake",
    "pacman",
    "breakout",
    "galaga",
    "bomberman",
    "puzzle",
    "minesweeper",
  ],
  sort: ["recent", "name", "stars"],
  activity: ["30", "90", "365"],
  forks: ["1"],
  archived: ["1"],
  releaseYear: ["all"],
};
export function normalizeViewParams(source, data) {
  const params = new URLSearchParams(source);
  for (const [key, values] of Object.entries(choices))
    if (params.has(key) && !values.includes(params.get(key)))
      params.delete(key);
  for (const key of ["page", "releasePage", "impactPage"])
    if (params.has(key) && !/^[1-9]\d{0,6}$/.test(params.get(key)))
      params.delete(key);
  if (data) {
    for (const key of ["year", "compare"])
      if (
        params.has(key) &&
        !data.years.some((y) => String(y.year) === params.get(key))
      )
        params.delete(key);
    if (
      params.has("day") &&
      !data.years.some((y) => y.days.some((d) => d.date === params.get("day")))
    )
      params.delete("day");
    if (data.repositories) {
      if (
        params.has("language") &&
        !data.repositories.some((r) => r.language === params.get("language"))
      )
        params.delete("language");
      if (
        params.has("topic") &&
        !data.repositories.some((r) => r.topics.includes(params.get("topic")))
      )
        params.delete("topic");
    }
    if (
      data.releases &&
      params.has("releaseRepo") &&
      !data.releases.some((r) => r.repository === params.get("releaseRepo"))
    )
      params.delete("releaseRepo");
  }
  return params;
}
