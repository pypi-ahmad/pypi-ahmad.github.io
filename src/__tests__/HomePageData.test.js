import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { homePageData, homeMetrics } from "../data/homePage";
import { experience } from "../data/experience";
import { projects } from "../data/projects";

describe("home page contract", () => {
  it("preserves the original repository catalog ordering", () => {
    expect(projects.data.slice(0, 4).map(project => project.name)).toEqual([
      "LoRA Fine-tune Studio",
      "Tool-Using Browser Agent",
      "Self-Improving Prompt Optimizer",
      "NL2SQL Agent",
    ]);
  });

  it("publishes qualified outcomes and four work areas", () => {
    expect(homePageData.outcomes).toHaveLength(5);
    expect(homePageData.workAreas.map(area => area.title)).toEqual([
      "Agentic systems",
      "Retrieval & document AI",
      "Evaluation & reliability",
      "Model adaptation & delivery",
    ]);
    expect(homePageData.outcomes.map(outcome => outcome.metric)).toEqual([
      "38% to 80%",
      "~40% lower",
      "80–81% to 92%+",
      "90% to 99%",
      "95%+",
    ]);
  });

  it("keeps shared Home and Skills metrics consistent with Experience", () => {
    // This guards internal copy consistency, not independent verification of career claims.
    const employerOutcomes = experience.sections[0].experiences.flatMap(role =>
      role.projectGroups ? role.projectGroups.flatMap(group => group.outcomes || []) : role.outcomes || []
    );
    for (const outcome of homePageData.outcomes) {
      expect(outcome.metric).toBe(
        employerOutcomes.find(item => item.label === outcome.label)?.metric
      );
    }
  });

  it("ties compact result values to their detailed outcomes", () => {
    const outcomes = experience.sections[0].experiences.flatMap(role => role.projectGroups ? role.projectGroups.flatMap(group => group.outcomes || []) : role.outcomes || []);
    expect(homeMetrics.map(metric => metric.value)).toEqual(["92%+", "95%+", "80%", "88%"]);
    for (const metric of homeMetrics) expect(outcomes.find(outcome => outcome.label === metric.sourceLabel).metric.endsWith(metric.value)).toBe(true);
  });

  it("uses plain punctuation in homepage prose while allowing numeric ranges", () => {
    expect(JSON.stringify(homePageData).replace(/\d–\d/g, "")).not.toMatch(/[—–“”]/);
  });

  it("ships AI engineering fallback metadata and ProfilePage structured data", () => {
    const html = fs.readFileSync(path.join(process.cwd(), "index.html"), "utf8");
    expect(html).toContain("Ahmad Mujtaba | Production AI Engineer");
    expect(html).toContain('"@type": "ProfilePage"');
    expect(html).toContain('"jobTitle": "AI & Data Science Engineer"');
  });
});
