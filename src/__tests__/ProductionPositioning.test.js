import fs from "node:fs";
import { describe, expect, it } from "vitest";
import { homePageData, featuredProfessionalProjects } from "../data/homePage";
import { greeting } from "../data/greeting";
import { experience } from "../data/experience";
import { architectures } from "../data/architectures";
import { skillsPageData } from "../data/skills";
import { contactPageData } from "../data/contact";

const [deloitte, cognizant] = experience.sections[0].experiences;
const priorAuth = deloitte.projectGroups[0];

describe("Evidence-led production positioning", () => {
  it("updates the public summary and metadata without changing the employment title", () => {
    const html = fs.readFileSync("index.html", "utf8");
    const structuredData = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    expect(homePageData.hero.title).toMatch(/^Production AI Engineer/);
    for (const focus of ["multimodal document intelligence", "LLM extraction architectures", "agentic workflows", "LLM evaluation"]) {
      expect(homePageData.hero.title).toContain(focus);
      expect(greeting.subTitle).toContain(focus);
    }
    expect(structuredData.mainEntity.description).toBe(greeting.subTitle);
    expect(html).toContain(`content="${greeting.subTitle}"`);
    expect(structuredData.mainEntity.jobTitle).toBe("AI & Data Science Engineer");
    expect(deloitte.title).toBe(structuredData.mainEntity.jobTitle);
    expect(contactPageData.contactSection.description).toContain("remote-first");
  });

  it("keeps seven field groups separate from four passes and names the confirmed deployment", () => {
    expect(homePageData.hero.introduction).toContain("117 fields across seven related groups");
    for (const copy of [homePageData.hero.introduction, featuredProfessionalProjects[0].contribution, priorAuth.story.decisions.join(" "), architectures[0].notes.join(" ")]) {
      expect(copy).toContain("four-pass");
      expect(copy).toContain("seven");
      expect(copy).not.toMatch(/two-pass|seven-pass/);
    }
    expect(priorAuth.context).toContain("production in September 2026");
    expect(priorAuth.story.finding).toContain("separate Azure OpenAI calls");
    expect(architectures[0].paths[0].steps).toContain("Grouped Azure OpenAI extraction");
    expect(priorAuth.outcomes.map(({ metric, label }) => [metric, label])).toEqual([
      ["95%+", "Fax-classification accuracy"],
      ["80–81% to 92%+", "Structured-extraction accuracy"],
    ]);
  });

  it("retains existing-system ownership and does not introduce stronger metric claims", () => {
    expect(homePageData.hero.introduction).toContain("improved an existing warranty system");
    expect(cognizant.story.finding).toContain("already in production");
    expect(cognizant.story.finding).toContain("tuned hyperparameters");
    expect(cognizant.outcomes[0]).toMatchObject({ metric: "79% to 88%", label: "Warranty-classifier recall" });
    const copy = JSON.stringify([homePageData, featuredProfessionalProjects, experience, architectures, skillsPageData, contactPageData]);
    expect(copy).not.toMatch(/86%|94%|multi-agent extraction architectures|field-level accuracy|threshold tuning|eliminat\w* (?:all )?(?:504|timeouts)/i);
    expect(cognizant.disclosureNote).toContain("Infrastructure improvements are qualitative");
  });

  it("keeps new learning topics and personal tools out of professional delivery", () => {
    const [professional, personal] = skillsPageData.toolGroups;
    const learningTopics = skillsPageData.learning.flatMap(area => area.topics);
    for (const topic of ["Azure Event Grid", "Application Insights", "Precision-recall curves"]) {
      expect(learningTopics.filter(item => item === topic)).toHaveLength(1);
      expect(JSON.stringify(skillsPageData.toolGroups)).not.toContain(topic);
      expect(JSON.stringify(skillsPageData.capabilities)).not.toContain(topic);
    }
    const professionalTools = professional.examples.flatMap(example => example.tools);
    const personalTools = personal.examples.flatMap(example => example.tools);
    for (const tool of ["Pydantic", "LangChain", "Docker"]) {
      expect(personalTools).toContain(tool);
      expect(professionalTools).not.toContain(tool);
    }
    expect(skillsPageData.learningIntroduction).toContain("not production expertise");
  });
});
