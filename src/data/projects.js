/**
 * Projects Data
 *
 * `projectsHeader`  — Title and description for the /projects page header.
 * `projects.data`   — Array of open-source project cards.
 *
 * Each project: { name, url, description, category }
 */
export const projectsHeader = {
  title: "Projects",
  description:
    "Curated modern AI systems across agentic orchestration, document intelligence, multimodal workflows, retrieval evaluation, and local-first LLM product engineering.",
};

export const projects = {
  data: [
    {
      name: "Grounded Document Parser",
      url: "https://github.com/pypi-ahmad/grounded-docparse",
      description:
        "Workstation document-intelligence studio combining local GLM-OCR with bounded Luna recovery to produce grounded Markdown, structured JSON, extraction results, and annotated PDFs.",
      category: "Document AI · OCR & Extraction",
    },
    {
      name: "Fine-Tuning Studio",
      url: "https://github.com/pypi-ahmad/fine-tuning-app",
      description:
        "Local-first Streamlit studio for dataset preparation, post-training recipes, evaluation, adapter or merged-model export, and optional Ollama testing across supported GPU runtimes.",
      category: "Model Training · Fine-Tuning",
    },
    {
      name: "Local AI Chat Studio",
      url: "https://github.com/pypi-ahmad/local-ai-chat-studio",
      description:
        "Local-first FastAPI and React workspace for multi-provider streaming chat, model comparison, provenance-aware context, prompt-injection safeguards, memory, retrieval, and replayable bundles.",
      category: "Local AI · Chat & RAG",
    },
    {
      name: "Computer Use Workbench",
      url: "https://github.com/pypi-ahmad/computer-use",
      description:
        "Local single-user workbench for provider-native Computer Use agents with isolated desktop execution, typed APIs, live streaming, auditable actions, declarative workflows, and explicit safety policies.",
      category: "Agentic AI · Computer Use",
    },
    {
      name: "GenAI Systems Lab",
      url: "https://github.com/pypi-ahmad/genai-systems-lab",
      description:
        "Execution and evaluation platform for 20 AI systems spanning GenAI pipelines, LangGraph state machines, and CrewAI teams, with streaming, BYOK access, memory, and benchmark leaderboards.",
      category: "AI Platform",
    },
    {
      name: "Multi-Agent AI Studio",
      url: "https://github.com/pypi-ahmad/multi-agent-ai-studio",
      description:
        "Privacy-first local agent studio with LangGraph supervisor orchestration, Ollama-first model routing, Qdrant retrieval, and end-to-end verification artifacts.",
      category: "Agentic AI Platform",
    },
    {
      name: "Agentic Document Extraction",
      url: "https://github.com/pypi-ahmad/Agentic-Document-Extraction",
      description:
        "Document-intelligence workflow built around a four-stage LangGraph pipeline with confidence-aware extraction, schema validation, human-review handoffs, and MCP integration.",
      category: "Document AI · Agentic Workflow",
    },
    {
      name: "Domain-Adapted Embedding Alignment",
      url: "https://github.com/pypi-ahmad/domain-adapted-embedding-alignment",
      description:
        "Adapter-based embedding training and retrieval benchmarking for medical, legal, and cybersecurity domains, covering sparse, dense, hybrid, RAG, and GraphRAG evaluations.",
      category: "Retrieval · Fine-Tuning",
    },
    {
      name: "Local AI Software Engineer",
      url: "https://github.com/pypi-ahmad/local-ai-software-engineer",
      description:
        "Local-first engineering assistant for repository indexing, semantic and symbol search, architecture summaries, review and test generation, and governed terminal execution.",
      category: "Agentic AI · Developer Tools",
    },
    {
      name: "Local Video Intelligence Platform",
      url: "https://github.com/pypi-ahmad/local-video-intelligence-platform",
      description:
        "Local-first multimodal video pipeline combining OCR, transcription, timeline extraction, retrieval, RAG chat, and report generation with FastAPI and Next.js.",
      category: "Multimodal AI · Video Systems",
    },
    {
      name: "Local Research Assistant",
      url: "https://github.com/pypi-ahmad/local-research-assistant",
      description:
        "Local research workspace with multimodal ingestion, hybrid retrieval, citation-grounded chat, graph-backed study workflows, and reproducible end-to-end run artifacts.",
      category: "RAG Systems · Research Intelligence",
    },
    {
      name: "Repository-Specific SQL & Cypher Query Generator",
      url: "https://github.com/pypi-ahmad/Repository-Specific-SQL-Cypher-Query-Generator",
      description:
        "Schema-aware Text-to-SQL and Text-to-Cypher system with deterministic labeling, QLoRA training, and execution-aware evaluation across baseline and fine-tuned models.",
      category: "LLM Systems · Fine-Tuning & Evaluation",
    },
    {
      name: "Cybersecurity Threat Intelligence GraphRAG",
      url: "https://github.com/pypi-ahmad/Cybersecurity-Threat-Intelligence-GraphRAG",
      description:
        "Threat-intelligence assistant over MITRE ATT&CK STIX data using GraphRAG, agentic routing, hybrid retrieval, multimodal OCR and vision, and latency-aware evaluation.",
      category: "GraphRAG · Cybersecurity",
    },
  ],
};
