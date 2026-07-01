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
      name: "CUA — Computer Using Agent",
      url: "https://github.com/pypi-ahmad/computer-use",
      description:
        "Multi-provider Computer Use workbench built with React and FastAPI, running all desktop actions inside an isolated Docker Ubuntu/XFCE sandbox with provider-native search planning, safety confirmations, live WebSocket streaming, and 482 passing pytest tests.",
      category: "Agentic AI · Open Source",
    },
    {
      name: "GenAI Systems Lab",
      url: "https://github.com/pypi-ahmad/genai-systems-lab",
      description:
        "Shared execution and evaluation platform for 20 AI systems across GenAI pipelines, LangGraph state machines, and CrewAI teams — with live streaming, BYOK model access, session memory, and benchmark leaderboards.",
      category: "AI Platform",
    },
    {
      name: "Multi-Agent AI Studio",
      url: "https://github.com/pypi-ahmad/multi-agent-ai-studio",
      description:
        "Production-grade, privacy-first local agentic AI studio with LangGraph supervisor orchestration, Ollama-first model routing, Qdrant retrieval, and real end-to-end verification artifacts.",
      category: "Agentic AI Platform",
    },
    {
      name: "Agentic Document Extraction",
      url: "https://github.com/pypi-ahmad/Agentic-Document-Extraction",
      description:
        "Document intelligence workflow using a 4-stage LangGraph pipeline with confidence-aware extraction, schema validation, human review handoffs, and MCP server integration.",
      category: "Document AI · Agentic Workflow",
    },
    {
      name: "Domain-Adapted Embedding Alignment",
      url: "https://github.com/pypi-ahmad/domain-adapted-embedding-alignment",
      description:
        "Adapter-based embedding training and retrieval benchmarking pipeline for medical, legal, and cybersecurity domains, with auditable sparse/dense/hybrid and RAG/GraphRAG evaluations.",
      category: "Retrieval · Fine-Tuning",
    },
    {
      name: "Local AI Software Engineer",
      url: "https://github.com/pypi-ahmad/local-ai-software-engineer",
      description:
        "Local-first AI engineering platform for repository indexing, semantic and symbol search, architecture summarization, review/test generation, and governed terminal execution.",
      category: "Agentic AI · Developer Tools",
    },
    {
      name: "Local Video Intelligence Platform",
      url: "https://github.com/pypi-ahmad/local-video-intelligence-platform",
      description:
        "Multimodal video pipeline combining OCR, transcripts, timeline extraction, retrieval, RAG chat, and report generation on a local-first FastAPI + Next.js stack.",
      category: "Multimodal AI · Video Systems",
    },
    {
      name: "Local Research Assistant",
      url: "https://github.com/pypi-ahmad/local-research-assistant",
      description:
        "NotebookLM-style local research workspace with multimodal ingestion (PDF/image/website/GitHub/YouTube), hybrid retrieval, citation-grounded chat, and graph-backed study workflows, validated through real end-to-end run artifacts.",
      category: "RAG Systems · Research Intelligence",
    },
    {
      name: "Repository-Specific SQL & Cypher Query Generator",
      url: "https://github.com/pypi-ahmad/Repository-Specific-SQL-Cypher-Query-Generator",
      description:
        "Schema-aware Text-to-SQL and Text-to-Cypher system with deterministic SQL-to-Cypher labeling, QLoRA training, and execution-aware evaluation across baseline and fine-tuned runs with published artifacts.",
      category: "LLM Systems · Fine-Tuning & Evaluation",
    },
    {
      name: "Cybersecurity Threat Intelligence GraphRAG",
      url: "https://github.com/pypi-ahmad/Cybersecurity-Threat-Intelligence-GraphRAG",
      description:
        "Threat-intelligence assistant over MITRE ATT&CK STIX data implementing GraphRAG, agentic routing, hybrid retrieval, and multimodal OCR/vision paths with section-level retrieval and latency metrics.",
      category: "GraphRAG · Cybersecurity",
    },
  ],
};
