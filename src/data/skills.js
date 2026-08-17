/** Skills-page content, ordered for hiring-manager scanning. */
export const skillsPageData = {
  eyebrow: "Applied AI engineering",
  title: "Skills for reliable AI systems.",
  subtitle:
    "Applied AI engineering across agents, retrieval, document intelligence, evaluation, model adaptation, and production delivery—grounded in measured work and public implementations.",
  capabilities: [
    {
      title: "Agentic systems & automation",
      description:
        "Stateful, tool-using workflows with planning, approval gates, memory, retries, and observable failure handling.",
    },
    {
      title: "Retrieval & knowledge systems",
      description:
        "Hybrid retrieval, reranking, graph traversal, citations, and local-first memory for grounded answers.",
    },
    {
      title: "Document intelligence",
      description:
        "Layout-aware and multimodal extraction with typed outputs, confidence-aware retries, validation, and human review.",
    },
    {
      title: "Evaluation & model adaptation",
      description:
        "Fixed benchmarks, regression checks, LLM-as-judge comparison, prompt optimization, and LoRA/QLoRA workflows.",
    },
    {
      title: "AI product engineering",
      description:
        "Python applications and services with schema-first contracts, local/cloud model routing, reproducible environments, and deployment controls.",
    },
  ],
  featuredProjectNames: [
    "LoRA Fine-tune Studio",
    "Tool-Using Browser Agent",
    "Self-Improving Prompt Optimizer",
    "Document Intelligence Agent",
  ],
  toolGroups: [
    {
      title: "Agents & models",
      tools: [
        "LangGraph",
        "LangChain",
        "Playwright",
        "Model Context Protocol",
        "OpenAI",
        "Anthropic Claude",
        "Google Gemini",
        "Ollama",
      ],
    },
    {
      title: "Training & retrieval",
      tools: [
        "PyTorch",
        "Transformers",
        "PEFT",
        "Milvus",
        "Chroma",
        "ArcadeDB",
      ],
    },
    {
      title: "Engineering & delivery",
      tools: [
        "Python",
        "FastAPI",
        "Streamlit",
        "Pydantic",
        "SQLite",
        "PostgreSQL",
        "Docker",
        "Azure",
        "AWS",
        "GitHub Actions",
      ],
    },
  ],
};
