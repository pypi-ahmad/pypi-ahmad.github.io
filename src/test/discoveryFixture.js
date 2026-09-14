import { githubFixture } from "./githubFixture";
export function discoveryFixture() {
  return {
    ...githubFixture(),
    repositories: Array.from({ length: 16 }, (_, i) => ({
      name: `repo-${i}`,
      fullName: `pypi-ahmad/repo-${i}`,
      url: `https://github.com/pypi-ahmad/repo-${i}`,
      description: i === 0 ? "Document intelligence" : "A public project",
      language: i % 2 ? "JavaScript" : "Python",
      topics: [i % 2 ? "web" : "ai"],
      stars: i,
      fork: i === 14,
      archived: i === 15,
      createdAt: "2024-01-01T00:00:00Z",
      pushedAt: i === 13 ? null : "2024-02-29T00:00:00Z",
    })),
    releases: [
      {
        id: 1,
        repository: "pypi-ahmad/repo-0",
        title: "First release",
        tag: "v1",
        url: "https://github.com/pypi-ahmad/repo-0/releases/tag/v1",
        publishedAt: "2024-02-01T00:00:00Z",
        prerelease: false,
        notes: "Public release notes",
        assets: [
          {
            name: "package.zip",
            url: "https://github.com/pypi-ahmad/repo-0/releases/download/v1/package.zip",
            size: 1024,
            downloads: 2,
          },
        ],
      },
    ],
    externalPullRequests: [],
    discoveryCoverage: {
      repositories: "complete",
      releases: "complete",
      externalPullRequests: "complete",
      scope: "Currently public repositories only.",
    },
  };
}
