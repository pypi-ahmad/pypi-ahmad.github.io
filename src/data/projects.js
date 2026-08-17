/**
 * Recent public projects, ordered by portfolio priority.
 * Each entry keeps the compact ProjectCard contract.
 */
export const projectsHeader = {
  title: "Projects",
  description:
    "Recent open-source work across model post-training, browser agents, agent evaluation, local-first AI, document intelligence, and developer tooling.",
};

export const projects = {
  data: [
    {
      name: "LoRA Fine-tune Studio",
      url: "https://github.com/pypi-ahmad/lora-qlora-fine-tuning-app",
      description:
        "Local guided Streamlit application for preparing datasets, running parameter-efficient LLM post-training on NVIDIA GPUs, monitoring jobs, and comparing adapters with base models.",
      category: "Model Training · Fine-Tuning",
    },
    {
      name: "Tool-Using Browser Agent",
      url: "https://github.com/pypi-ahmad/tool-using-browser-agent",
      description:
        "LangGraph, Playwright, and Streamlit browser agent that plans, acts, observes, and remembers, with human approval before sensitive actions.",
      category: "Agentic AI · Browser Automation",
    },
    {
      name: "Self-Improving Prompt Optimizer",
      url: "https://github.com/pypi-ahmad/self-improving-prompt-optimizer",
      description:
        "Agentic prompt-optimization system that mutates, evaluates, and selects candidates with multi-objective LLM-as-judge scoring against a fixed benchmark.",
      category: "Evaluation · Prompt Optimization",
    },
    {
      name: "NL2SQL Agent",
      url: "https://github.com/pypi-ahmad/natural-language-to-sql-agent",
      description:
        "Natural-language-to-SQL agent for SQLite and PostgreSQL with query review, audit trails, session tracking, and local or hosted model support.",
      category: "Agentic AI · Data Systems",
    },
    {
      name: "Autonomous Coding Agent Crew",
      url: "https://github.com/pypi-ahmad/autonomous-coding-agent-crew",
      description:
        "Local-first CrewAI and LangGraph coding crew with planning, parallel specialists, review, testing, debugging, documentation, and quality gates.",
      category: "Agentic AI · Developer Tools",
    },
    {
      name: "Multi-Agent Debate Decision System",
      url: "https://github.com/pypi-ahmad/multi-agent-debate-decision-system",
      description:
        "Local multi-agent debate system with moderated personas, optional document grounding, structured judging, recommendations, confidence, and risk reporting.",
      category: "Multi-Agent AI · Decision Support",
    },
    {
      name: "Multi-Agent Research Assistant",
      url: "https://github.com/pypi-ahmad/multi-agent-research-assistant",
      description:
        "LangGraph research system that coordinates planning, parallel research, critique, reflection, and writing to produce structured cited reports.",
      category: "Multi-Agent AI · Research",
    },
    {
      name: "Local-First Knowledge Base Agent",
      url: "https://github.com/pypi-ahmad/local-first-knowledge-base-agent",
      description:
        "Privacy-first agent that indexes notes, code, documents, media, and browser history for cited answers, temporal reasoning, and local knowledge graphs.",
      category: "Local AI · Knowledge Systems",
    },
    {
      name: "Intelligent Personal Finance Agent",
      url: "https://github.com/pypi-ahmad/intelligent-personal-finance-agent",
      description:
        "Local-first personal-finance copilot that ingests statements, learns category corrections, and keeps its ledger on the user’s machine.",
      category: "Local AI · Personal Finance",
    },
    {
      name: "Document Intelligence Agent",
      url: "https://github.com/pypi-ahmad/document-intelligence-agent",
      description:
        "GraphRAG document Q&A agent using LangGraph and ArcadeDB for extraction, community detection, hybrid retrieval, verification, and cross-document comparison.",
      category: "Document AI · GraphRAG",
    },
    {
      name: "Autonomous Job Application Agent",
      url: "https://github.com/pypi-ahmad/autonomous-job-application-agent",
      description:
        "Human-in-the-loop LangGraph agent that collects jobs, scores them against a resume, drafts tailored content, and tracks applications locally.",
      category: "Agentic AI · Workflow Automation",
    },
    {
      name: "AutoTabML Studio",
      url: "https://github.com/pypi-ahmad/AutoTabML-Studio",
      description:
        "Local-first AutoML workbench that turns tabular data into trained, evaluated, deployable models through reproducible Streamlit and CLI workflows.",
      category: "Machine Learning · AutoML",
    },
    {
      name: "Codebase Understanding Agent",
      url: "https://github.com/pypi-ahmad/codebase-understanding-agent",
      description:
        "Multi-agent Streamlit application that clones, scans, summarizes, and explains codebases, then answers repository questions through chat.",
      category: "Agentic AI · Developer Tools",
    },
  ],
};
