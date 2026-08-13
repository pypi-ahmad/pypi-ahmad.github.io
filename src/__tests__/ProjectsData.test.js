import { describe, expect, it } from "vitest";
import { projects } from "../data/projects";

const expectedTopUrls = [
  "https://github.com/pypi-ahmad/grounded-docparse",
  "https://github.com/pypi-ahmad/fine-tuning-app",
  "https://github.com/pypi-ahmad/local-ai-chat-studio",
  "https://github.com/pypi-ahmad/computer-use",
];

describe("projects data", () => {
  it("publishes the expected 13-project workflow-first catalog", () => {
    const projectUrls = projects.data.map(({ url }) => url);

    expect(projects.data).toHaveLength(13);
    expect(projectUrls.slice(0, 4)).toEqual(expectedTopUrls);
    expect(new Set(projectUrls).size).toBe(projectUrls.length);
    expect(projectUrls.filter((url) => url === expectedTopUrls[3])).toHaveLength(1);
  });

  it("keeps every project card complete and compact", () => {
    for (const project of projects.data) {
      expect(project).toMatchObject({
        name: expect.any(String),
        url: expect.stringMatching(/^https:\/\/github\.com\/pypi-ahmad\//),
        description: expect.any(String),
        category: expect.any(String),
      });
      expect(project.name.trim()).not.toBe("");
      expect(project.url.trim()).not.toBe("");
      expect(project.description.trim()).not.toBe("");
      expect(project.category.trim()).not.toBe("");
      expect(project.description).not.toMatch(/[\r\n]/);
      expect(project.description.length).toBeLessThanOrEqual(200);
    }
  });
});
