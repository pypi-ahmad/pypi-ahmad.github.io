import { beforeEach, afterEach, describe, it, expect, vi } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { renderWithProviders } from "../test/testUtils";
import { discoveryFixture } from "../test/discoveryFixture";
import {
  compareYears,
  exploreRepositories,
  pageSlice,
  safeGitHubUrl,
  validDiscovery,
  yearMetrics,
  sourceExcerpt,
} from "../components/github/discovery";
import { normalizeViewParams } from "../components/github/viewState";
import {
  dailyChallenge,
  recordRun,
  readProgress,
  clearProgress,
  gameIds,
  PROGRESS_KEY,
} from "../components/github/arcade/progress";
import { seedYear } from "../components/github/arcade/games/common";
import GitHubPage from "../pages/github/GitHubPage";
import RepositoryCard from "../components/github/RepositoryCard";
import { useDashboard } from "../components/github/dashboardStore";
vi.mock("../components/github/dashboardStore", () => ({
  useDashboard: vi.fn(),
}));
let data;
beforeEach(() => {
  data = discoveryFixture();
  localStorage.clear();
  useDashboard.mockReturnValue({ data, status: "current", retry: vi.fn() });
});
afterEach(() => vi.restoreAllMocks());
const run = (id, game = "snake", extra = {}) => ({
  id,
  game,
  mode: "free",
  score: 10,
  outcome: "won",
  identity: "test",
  finishedAt: "2026-09-14T00:00:00Z",
  ...extra,
});
describe("Public discovery contracts", () => {
  it("makes concise source excerpts without damaging technical identifiers", () => {
    expect(
      sourceExcerpt(
        "## Added\n- **Support** for `system_prompt` and [docs](https://github.com/x).",
      ),
    ).toBe("Added Support for system_prompt and docs.");
    expect(sourceExcerpt("```js\ncode();\n```")).toBe("");
    expect(
      sourceExcerpt("A long release note. ".repeat(50)).length,
    ).toBeLessThanOrEqual(301);
  });
  it("accepts additive and legacy snapshots, rejects unsafe links and malformed fields", () => {
    expect(validDiscovery(data)).toBe(true);
    expect(validDiscovery({})).toBe(true);
    for (const value of [
      "javascript:alert(1)",
      "https://github.com.evil.test/x",
      "https://user@github.com/x",
      "http://github.com/x",
      "garbage",
    ])
      expect(safeGitHubUrl(value)).toBe(false);
    data.releases[0].assets[0].url = "javascript:alert(1)";
    expect(validDiscovery(data)).toBe(false);
    data = discoveryFixture();
    data.repositories[0].stars = -1;
    expect(validDiscovery(data)).toBe(false);
    data = discoveryFixture();
    data.externalPullRequests = [{}];
    expect(validDiscovery(data)).toBe(false);
  });
  it("filters, ranks, sorts, and paginates without mutating the source", () => {
    const repos = data.repositories;
    const get = (q) =>
      exploreRepositories(repos, new URLSearchParams(q), "2024-03-01", [
        repos[5].url,
      ]);
    expect(get("")).toHaveLength(14);
    expect(get("")[0].name).toBe("repo-5");
    expect(repos[0].name).toBe("repo-0");
    expect(get("forks=1&archived=1")).toHaveLength(16);
    expect(get("language=Python&topic=ai&q=document")).toHaveLength(1);
    expect(get("activity=30")).toHaveLength(13);
    expect(get("sort=stars")[0].stars).toBe(13);
    expect(get("sort=name")[0].name).toBe("repo-0");
    expect(get("sort=recent")).toHaveLength(14);
    expect(pageSlice(repos, 999, 12).page).toBe(2);
    expect(pageSlice([], -1).pages).toBe(1);
  });
  it("normalizes invalid query parameters while keeping valid share state", () => {
    const params = normalizeViewParams(
      "tab=no&year=9999&compare=2023&calendar=3d&page=-2&topic=missing&language=missing&day=wrong&sort=bad&releaseRepo=unknown",
      data,
    );
    expect(params.toString()).toBe("compare=2023&calendar=3d");
  });
  it("matches shared calendar dates, excludes unshared leap days, and distinguishes uncovered months", () => {
    const year = (n, dates) => ({
      year: n,
      days: dates.map(([d, count]) => ({ date: `${n}-${d}`, count })),
    });
    const a = year(2024, [
        ["02-28", 2],
        ["02-29", 10],
        ["03-01", 0],
      ]),
      b = year(2023, [
        ["01-01", 8],
        ["02-28", 1],
        ["03-01", 0],
      ]);
    expect(compareYears(a, b).a.total).toBe(2);
    expect(compareYears(a, b).b.total).toBe(1);
    expect(compareYears(a, b, true).a.total).toBe(12);
    expect(compareYears(a, { days: [] }).comparable).toBe(false);
    expect(yearMetrics(a).covered[0]).toBe(false);
    expect(yearMetrics({ days: [] }).busiest).toEqual([]);
  });
});
describe("Daily challenges and retained progress", () => {
  it("rotates every game and gives stable date seeds independent of contributions", () => {
    const week = Array.from({ length: 7 }, (_, i) =>
      dailyChallenge(`2026-09-${String(i + 1).padStart(2, "0")}`, "2026-09-14"),
    );
    expect(new Set(week.map((c) => c.game)).size).toBe(7);
    expect(dailyChallenge("2026-09-01", "2026-09-14")).toEqual(week[0]);
    expect(dailyChallenge("2026-02-30", "2026-09-14").date).toBe("2026-09-14");
    expect(dailyChallenge("9999-01-01", "2026-09-14").date).toBe("2026-09-14");
    expect(seedYear({ challengeSeed: week[0].seed })).toBe(week[0].seed);
  });
  it("records once, retains 100 runs, and remembers achievements beyond retention", () => {
    let progress = readProgress();
    for (const [i, game] of gameIds.entries())
      progress = recordRun(run(String(i), game, { mode: "daily" }), progress);
    expect(progress.achievements).toHaveLength(5);
    expect(recordRun(run("0"), progress)).toBe(progress);
    for (let i = 7; i < 110; i++)
      progress = recordRun(run(String(i)), progress);
    expect(progress.runs).toHaveLength(100);
    expect(readProgress().achievements).toHaveLength(5);
    expect(progress.finishedGames).toHaveLength(7);
  });
  it("recovers corrupt/blocked storage and clears only arcade keys", () => {
    localStorage.setItem(PROGRESS_KEY, "broken");
    expect(readProgress().runs).toEqual([]);
    localStorage.setItem("theme", "dark");
    localStorage.setItem("github-arcade:snake", "4");
    expect(clearProgress()).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("denied");
    });
    expect(recordRun(run("blocked")).runs).toHaveLength(1);
  });
});
describe("Five focused views", () => {
  it("keeps legacy advanced links pointed at analytics in Activity", async () => {
    const { container } = renderWithProviders(<GitHubPage />, {
      initialEntries: ["/github#advanced-dashboard"],
    });
    expect(
      await screen.findByRole("heading", { name: "Advanced dashboard" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Activity", exact: true }),
    ).toHaveAttribute("aria-current", "page");
    expect(container.querySelector("#advanced-dashboard")).toHaveAttribute(
      "open",
    );
  });
  it("loads URL-selected filters and offers empty-result recovery", async () => {
    renderWithProviders(<GitHubPage />, {
      initialEntries: ["/github?tab=projects&q=document"],
    });
    expect(await screen.findByLabelText("Search repositories")).toHaveValue(
      "document",
    );
    expect(
      screen.getByRole("heading", { name: "What I’m building" }),
    ).toBeInTheDocument();
    expect(await screen.findByText(/1 repository found/)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Search repositories"), {
      target: { value: "no-match" },
    });
    expect(screen.getByText(/No repositories match/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Clear filters" }));
    expect(screen.getByText(/14 repositories found/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Next page" }));
    expect(screen.getByText("Page 2 of 2")).toBeInTheDocument();
  });
  it("restores activity view and exact data, including download links", async () => {
    const { container } = renderWithProviders(<GitHubPage />, {
      initialEntries: [
        "/github?tab=activity&year=2024&calendar=3d&day=2024-02-02",
      ],
    });
    expect(
      await screen.findByRole("heading", { name: "Year in review" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "3D view" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(
      screen.getByRole("link", { name: "First release" }),
    ).toBeInTheDocument();
    expect((await axe(container)).violations).toEqual([]);
  });
  it("shows honest impact emptiness", async () => {
    renderWithProviders(<GitHubPage />, {
      initialEntries: ["/github?tab=impact"],
    });
    expect(
      await screen.findByRole("heading", {
        name: "No merged pull requests to other public repositories",
      }),
    ).toBeInTheDocument();
  });
  it.each([
    ["projects", "repositories", "Project explorer"],
    ["activity", "releases", "Release timeline"],
    ["impact", "externalPullRequests", "External contribution history"],
  ])("offers valid recovery for legacy %s snapshots", async (tab, field, name) => {
    delete data[field];
    renderWithProviders(<GitHubPage />, {
      initialEntries: [`/github?tab=${tab}`],
    });
    const message = await screen.findByText(`${name} is not available in this snapshot.`, { exact: false });
    expect(message).toHaveAttribute("role", "status");
    expect(message).toHaveTextContent(`${name} is not available in this snapshot. View the GitHub profile.`);
    expect(message.querySelector("a")).toHaveAttribute("href", "https://github.com/pypi-ahmad");
    expect(screen.queryByText(/refreshing the data above/)).not.toBeInTheDocument();
  });
  it("renders missing metadata and does not turn unsafe data into a link", () => {
    const repo = {
      ...data.repositories[0],
      description: "",
      language: "",
      pushedAt: null,
      url: "javascript:bad",
      topics: [],
    };
    renderWithProviders(<RepositoryCard repository={repo} />);
    expect(screen.getByText(/No description/)).toBeInTheDocument();
    expect(screen.queryByRole("link")).toBeNull();
  });
});
