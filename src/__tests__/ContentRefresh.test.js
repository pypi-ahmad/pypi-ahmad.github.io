import { describe, expect, it } from "vitest";
import { contactPageData } from "../data/contact";
import { experience } from "../data/experience";
import { projects } from "../data/projects";
import { skillsPageData } from "../data/skills";

describe("refreshed contact, skills, and experience content", () => {
  it("keeps Contact focused on direct channels without featured work", () => {
    expect(contactPageData).not.toHaveProperty("featuredSection");
    expect(contactPageData.contactSection.title).toBe("Discuss a production AI role or project.");
  });

  it("keeps the exact capability order", () => {
    expect(skillsPageData.capabilities.map(item => item.title)).toEqual([
      "LLM architectures & agentic workflows",
      "Retrieval & knowledge systems",
      "Multimodal document intelligence",
      "Evaluation & production ML",
      "Event-driven cloud & backend systems",
    ]);
  });

  it("expands confirmed professional tools while retaining personal-project tools", () => {
    expect(skillsPageData.toolGroups.map(group => group.title)).toEqual([
      "Professional delivery",
      "Personal projects",
    ]);
    const tools = skillsPageData.toolGroups.flatMap(group => group.examples.flatMap(example => example.tools));
    expect(tools).toHaveLength(32);
    expect(new Set(tools).size).toBe(32);
    expect(tools.toSorted()).toEqual([
      "LangGraph", "LangChain", "Playwright", "Model Context Protocol",
      "Azure OpenAI", "Azure Content Understanding", "Azure Databricks", "Anthropic Claude", "Google Gemini", "Ollama",
      "PyTorch", "Transformers", "PEFT", "Milvus", "Chroma", "ArcadeDB",
      "Python", "FastAPI", "Streamlit", "Pydantic", "SQLite", "PostgreSQL",
      "Docker", "AWS", "GitHub Actions", "Azure App Service", "Azure Blob Storage",
      "Azure Functions", "Azure CLU", "Random Forest", "XGBoost", "Power BI",
    ].toSorted());
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

    expect(deloitte.projectGroups).toHaveLength(4);
    expect(deloitte.projectGroups[1].subprojects).toHaveLength(3);
    expect(deloitte).not.toHaveProperty("systemContext");
    expect(deloitte).not.toHaveProperty("contributions");
    expect(deloitte).not.toHaveProperty("outcomes");
    expect(deloitte.projectGroups.flatMap(group => group.outcomes || []).map(outcome => outcome.metric)).toEqual([
      "95%+",
      "80–81% to 92%+",
      "38% to 80%",
      "~40% lower",
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
