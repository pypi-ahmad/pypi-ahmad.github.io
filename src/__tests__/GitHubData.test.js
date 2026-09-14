import { describe, it, expect, vi } from "vitest";
import {
  isDashboard,
  createDashboardStore,
} from "../components/github/dashboardStore";
import { githubFixture } from "../test/githubFixture";

const response = (data) => ({ ok: true, json: async () => data });
describe("GitHub snapshot contract", () => {
  it("accepts a complete snapshot and rejects malformed or unsafe numbers", () => {
    expect(isDashboard(githubFixture())).toBe(true);
    for (const modify of [
      (d) => {
        d.schemaVersion = 2;
      },
      (d) => {
        d.summary.stars = -1;
      },
      (d) => {
        d.summary.languages = null;
      },
      (d) => {
        d.reach.external_recent = [2];
      },
      (d) => {
        d.coding.hours = [];
      },
      (d) => {
        d.distribution.views = Infinity;
      },
      (d) => {
        d.years[1].days[0].date = "2024-02-30";
      },
      (d) => {
        d.years[1].days.push(d.years[1].days[0]);
      },
      (d) => {
        d.years[0].total = 15;
      },
      (d) => {
        d.years.push(d.years[0]);
      },
      (d) => {
        d.coding.method = null;
      },
      (d) => {
        d.coding.activeRepositories = [[1]];
      },
      (d) => {
        d.reach.star_series = [["now", -1]];
      },
      (d) => {
        d.coding.coverage = -1;
      },
      (d) => {
        d.years = [];
      },
    ]) {
      const data = githubFixture();
      modify(data);
      expect(isDashboard(data)).toBe(false);
    }
    expect(isDashboard(null)).toBe(false);
  });
  it("shares one request and only accepts newer validated remote data", async () => {
    const saved = githubFixture(),
      fresh = { ...githubFixture(), generatedAt: "2024-03-02T12:00:00Z" };
    const fetcher = vi
      .fn()
      .mockResolvedValueOnce(response(saved))
      .mockResolvedValueOnce(response(fresh));
    const store = createDashboardStore(fetcher),
      listener = vi.fn(),
      unsubscribe = store.subscribe(listener);
    const first = store.load();
    expect(store.load()).toBe(first);
    await first;
    expect(store.getSnapshot()).toEqual({ data: fresh, status: "current" });
    await store.load();
    expect(fetcher).toHaveBeenCalledTimes(2);
    expect(listener).toHaveBeenCalled();
    unsubscribe();
  });
  it("keeps valid saved data on errors, older data, and schema changes", async () => {
    for (const remote of [
      response({}),
      response({ ...githubFixture(), generatedAt: "2024-01-01T00:00:00Z" }),
      { ok: false },
    ]) {
      const fetcher = vi
        .fn()
        .mockResolvedValueOnce(response(githubFixture()))
        .mockResolvedValueOnce(remote);
      const store = createDashboardStore(fetcher);
      await store.load();
      expect(store.getSnapshot().status).toBe("saved");
      expect(store.getSnapshot().data.summary.stars).toBe(12);
    }
  });
  it("recovers a missing local file from remote and supports explicit retry", async () => {
    const fetcher = vi
      .fn()
      .mockRejectedValueOnce(new Error("offline"))
      .mockRejectedValueOnce(new Error("offline"))
      .mockResolvedValueOnce(response(githubFixture()))
      .mockResolvedValueOnce(response(githubFixture()));
    const store = createDashboardStore(fetcher);
    await store.load();
    expect(store.getSnapshot().status).toBe("error");
    await store.load(true);
    expect(store.getSnapshot().status).toBe("current");
    const remoteOnly = createDashboardStore(
      vi
        .fn()
        .mockResolvedValueOnce({ ok: false })
        .mockResolvedValueOnce(response(githubFixture())),
    );
    await remoteOnly.load();
    expect(remoteOnly.getSnapshot().status).toBe("current");
  });
  it("aborts slow requests after eight seconds", async () => {
    vi.useFakeTimers();
    const fetcher = vi.fn(
      (_url, { signal }) =>
        new Promise((_resolve, reject) =>
          signal.addEventListener("abort", () => reject(new Error("aborted"))),
        ),
    );
    const store = createDashboardStore(fetcher);
    const pending = store.load();
    await vi.advanceTimersByTimeAsync(16000);
    await pending;
    expect(store.getSnapshot().status).toBe("error");
    vi.useRealTimers();
  });
});
