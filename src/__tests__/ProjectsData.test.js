import { describe, expect, it } from "vitest";
import { projects } from "../data/projects";

const expectedTopUrls = [
  "https://github.com/pypi-ahmad/lora-qlora-fine-tuning-app",
  "https://github.com/pypi-ahmad/tool-using-browser-agent",
  "https://github.com/pypi-ahmad/self-improving-prompt-optimizer",
  "https://github.com/pypi-ahmad/natural-language-to-sql-agent",
];

const expectedNames = [
  "LoRA Fine-tune Studio",
  "Tool-Using Browser Agent",
  "Self-Improving Prompt Optimizer",
  "NL2SQL Agent",
  "Autonomous Coding Agent Crew",
  "Multi-Agent Debate Decision System",
  "Multi-Agent Research Assistant",
  "Local-First Knowledge Base Agent",
  "Intelligent Personal Finance Agent",
  "Document Intelligence Agent",
  "Autonomous Job Application Agent",
  "AutoTabML Studio",
  "Codebase Understanding Agent",
];

describe("projects data", () => {
  it("publishes the expected 13-project workflow-first catalog", () => {
    const projectUrls = projects.data.map(({ url }) => url);

    expect(projects.data).toHaveLength(13);
    expect(projects.data.map(({ name }) => name)).toEqual(expectedNames);
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
