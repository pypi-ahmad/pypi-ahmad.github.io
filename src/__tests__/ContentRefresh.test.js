import { describe, expect, it } from "vitest";
import { contactPageData } from "../data/contact";
import { experience } from "../data/experience";
import { projects } from "../data/projects";
import { skillsPageData } from "../data/skills";

describe("refreshed contact, skills, and experience content", () => {
  it("keeps Contact focused on direct channels without featured work", () => {
    expect(contactPageData).not.toHaveProperty("featuredSection");
    expect(contactPageData.contactSection.title).toBe("Let’s build useful AI systems.");
  });

  it("keeps the exact capability order", () => {
    expect(skillsPageData.capabilities.map(item => item.title)).toEqual([
      "Agentic systems & automation",
      "Retrieval & knowledge systems",
      "Document intelligence",
      "Evaluation & model adaptation",
      "AI product engineering",
    ]);
  });

  it("publishes the curated 24-tool toolkit", () => {
    expect(skillsPageData.toolGroups.map(group => group.title)).toEqual([
      "Agents & models",
      "Training & retrieval",
      "Engineering & delivery",
    ]);
    expect(skillsPageData.toolGroups.flatMap(group => group.tools)).toEqual([
      "LangGraph", "LangChain", "Playwright", "Model Context Protocol",
      "OpenAI", "Anthropic Claude", "Google Gemini", "Ollama",
      "PyTorch", "Transformers", "PEFT", "Milvus", "Chroma", "ArcadeDB",
      "Python", "FastAPI", "Streamlit", "Pydantic", "SQLite", "PostgreSQL",
      "Docker", "Azure", "AWS", "GitHub Actions",
    ]);
  });

  it("ties Skills proof to four existing public projects", () => {
    expect(skillsPageData.featuredProjectNames).toEqual([
      "LoRA Fine-tune Studio",
      "Tool-Using Browser Agent",
      "Self-Improving Prompt Optimizer",
      "Document Intelligence Agent",
    ]);
    const projectNames = new Set(projects.data.map(project => project.name));
    skillsPageData.featuredProjectNames.forEach(name => expect(projectNames.has(name)).toBe(true));
  });

  it("separates Deloitte context, contributions, outcomes, and disclosure scope", () => {
    const deloitte = experience.sections[0].experiences[0];

    expect(deloitte.systemContext).toHaveLength(3);
    expect(deloitte.contributions).toHaveLength(6);
    expect(deloitte.outcomes.map(outcome => outcome.metric)).toEqual([
      "38% to 80%",
      "~40% lower",
      "80–81% to above 90%",
      "90% to 99%",
    ]);
    expect(deloitte.disclosureNote).toMatch(/team and system results/i);
  });

  it("keeps older roles unchanged", () => {
    const [, cognizant, aiEnsured] = experience.sections[0].experiences;
    expect([cognizant.title, cognizant.duration]).toEqual([
      "Associate Data Scientist",
      "Sep 2022 - May 2025",
    ]);
    expect([aiEnsured.title, aiEnsured.duration]).toEqual([
      "Machine Learning Engineer Intern",
      "Jul 2021 - Aug 2021",
    ]);
  });
});
