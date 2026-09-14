import { useEffect, useSyncExternalStore } from "react";
import { githubData } from "../../data/github";
import { validDiscovery } from "./discovery";

const numeric = (value) =>
  typeof value === "number" && Number.isFinite(value) && value >= 0;
const nullable = (value) => value === null || numeric(value);
const pairs = (values) =>
  Array.isArray(values) &&
  values.every(
    (item) =>
      Array.isArray(item) && typeof item[0] === "string" && numeric(item[1]),
  );

export function isDashboard(data) {
  try {
    if (!validDiscovery(data)) return false;
    if (
      data.schemaVersion !== 1 ||
      data.login !== "pypi-ahmad" ||
      !Number.isFinite(Date.parse(data.generatedAt)) ||
      typeof data.scope !== "string"
    )
      return false;
    const { summary: s, reach: r, coding: c, distribution: d, years } = data;
    if (
      ![
        s.stars,
        s.repositories,
        s.contributions,
        s.commits,
        s.pullRequests,
        s.issues,
        s.streak.current,
        s.streak.longest,
      ].every(numeric)
    )
      return false;
    if (
      !Array.isArray(s.languages) ||
      !s.languages.every((x) => typeof x.name === "string" && numeric(x.bytes))
    )
      return false;
    if (
      ![
        r.forks,
        r.watchers,
        r.reviews,
        r.pull_requests,
        r.merged_pull_requests,
        r.open_issues,
        r.closed_issues,
        r.external_total,
      ].every(numeric) ||
      !pairs(r.star_series)
    )
      return false;
    if (
      !Array.isArray(r.external_recent) ||
      !r.external_recent.every((x) => typeof x === "string")
    )
      return false;
    if (
      ![
        c.linesAdded,
        c.linesRemoved,
        d.releases,
        d.downloads,
        d.views,
        d.clones,
      ].every(nullable)
    )
      return false;
    if (
      ![
        c.recentDays,
        c.coverage,
        c.repositories,
        d.releaseCoverage,
        d.trafficCoverage,
        d.repositories,
        d.trafficDays,
      ].every(numeric)
    )
      return false;
    if (
      typeof c.timezone !== "string" ||
      typeof c.method !== "string" ||
      !pairs(c.languages) ||
      !pairs(d.referrers)
    )
      return false;
    if (
      !Array.isArray(c.activeRepositories) ||
      !c.activeRepositories.every(
        (x) => Array.isArray(x) && x.every((v) => typeof v === "string"),
      )
    )
      return false;
    if (
      c.weekdays.length !== 7 ||
      c.hours.length !== 24 ||
      ![...c.weekdays, ...c.hours].every(numeric)
    )
      return false;
    if (!Array.isArray(years) || !years.length) return false;
    const seen = new Set();
    const seenYears = new Set();
    return years.every((year) => {
      if (
        !Number.isInteger(year.year) ||
        seenYears.has(year.year) ||
        !Array.isArray(year.days) ||
        !numeric(year.total)
      )
        return false;
      seenYears.add(year.year);
      let total = 0;
      const valid = year.days.every((day) => {
        const parsed = new Date(`${day.date}T00:00:00Z`);
        if (
          !/^\d{4}-\d{2}-\d{2}$/.test(day.date) ||
          !Number.isFinite(+parsed) ||
          parsed.toISOString().slice(0, 10) !== day.date ||
          parsed.getUTCFullYear() !== year.year ||
          seen.has(day.date) ||
          !Number.isInteger(day.count) ||
          day.count < 0 ||
          !Number.isInteger(day.level) ||
          day.level < 0 ||
          day.level > 4
        )
          return false;
        seen.add(day.date);
        total += day.count;
        return true;
      });
      return valid && total === year.total;
    });
  } catch {
    return false;
  }
}

export function createDashboardStore(fetcher = (...args) => fetch(...args)) {
  let state = { data: null, status: "idle" };
  let pending;
  const listeners = new Set();
  const update = (next) => {
    state = next;
    listeners.forEach((listener) => listener());
  };
  async function request(url) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    try {
      const response = await fetcher(url, {
        signal: controller.signal,
        credentials: "omit",
      });
      if (!response.ok) throw new Error("Unavailable snapshot");
      const data = await response.json();
      if (!isDashboard(data)) throw new Error("Invalid snapshot");
      return data;
    } finally {
      clearTimeout(timeout);
    }
  }
  return {
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    getSnapshot: () => state,
    load(retry = false) {
      if (pending) return pending;
      if (state.status !== "idle" && !retry) return Promise.resolve();
      pending = (async () => {
        update({ ...state, status: "loading" });
        if (!state.data) {
          try {
            update({
              data: await request(githubData.snapshot),
              status: "saved",
            });
          } catch {
            /* The public export can still recover a missing local snapshot. */
          }
        }
        try {
          const data = await request(githubData.latest);
          if (
            !state.data ||
            Date.parse(data.generatedAt) >= Date.parse(state.data.generatedAt)
          )
            update({ data, status: "current" });
          else update({ ...state, status: "saved" });
        } catch {
          update({ ...state, status: state.data ? "saved" : "error" });
        }
      })().finally(() => {
        pending = null;
      });
      return pending;
    },
  };
}

export const dashboardStore = createDashboardStore();
export function useDashboard() {
  const state = useSyncExternalStore(
    dashboardStore.subscribe,
    dashboardStore.getSnapshot,
  );
  useEffect(() => {
    dashboardStore.load();
  }, []);
  return { ...state, retry: () => dashboardStore.load(true) };
}
