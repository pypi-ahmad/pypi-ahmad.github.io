export function githubFixture() {
  const days = Array.from({ length: 29 }, (_, i) => ({
    date: `2024-02-${String(i + 1).padStart(2, "0")}`,
    count: i % 5,
    level: i % 5,
  }));
  return {
    schemaVersion: 1,
    login: "pypi-ahmad",
    generatedAt: "2024-03-01T12:00:00Z",
    scope: "Public repository aggregates.",
    summary: {
      stars: 12,
      repositories: 8,
      contributions: 100,
      commits: 75,
      pullRequests: 3,
      issues: 2,
      streak: { current: 4, longest: 8, asOf: "2024-03-01" },
      languages: [
        { name: "Python", bytes: 300 },
        { name: "JavaScript", bytes: 100 },
      ],
    },
    reach: {
      forks: 1,
      watchers: 2,
      reviews: 3,
      pull_requests: 3,
      merged_pull_requests: 2,
      open_issues: 1,
      closed_issues: 1,
      external_total: 1,
      external_recent: ["example/public-repo"],
      star_series: [
        ["2024-01", 4],
        ["2024-02", 12],
      ],
    },
    coding: {
      recentDays: 30,
      timezone: "Asia/Kolkata",
      linesAdded: 120,
      linesRemoved: 30,
      coverage: 5,
      repositories: 8,
      activeRepositories: [["sample", "2024-02-28"]],
      languages: [["Python", 10]],
      weekdays: [1, 2, 3, 4, 5, 0, 0],
      hours: Array(24).fill(1),
      method: "Sampled default-branch commits.",
    },
    distribution: {
      releases: 3,
      downloads: 20,
      views: null,
      clones: null,
      releaseCoverage: 8,
      trafficCoverage: 0,
      repositories: 8,
      referrers: [],
      trafficDays: 14,
    },
    years: [
      {
        year: 2023,
        days: [{ date: "2023-12-31", count: 1, level: 1 }],
        total: 1,
      },
      {
        year: 2024,
        days,
        total: days.reduce((sum, day) => sum + day.count, 0),
      },
    ],
  };
}
