/** Skills-page content, ordered for hiring-manager scanning. */
export const skillsPageData = {
  eyebrow: "Technical capability",
  title: "Skills, with context.",
  subtitle:
    "LLM architectures, multimodal document intelligence, and event-driven cloud systems. Professional delivery is separated from personal projects and current learning.",
  lifecycle: ["Data", "Retrieval", "Model", "Agent", "State", "API", "Deployment", "Evaluation", "Observability", "Iteration"],
  capabilities: [
    {
      title: "LLM architectures & agentic workflows",
      description:
        "Context engineering and prompt hardening for structured LLM workflows. Separate agentic systems use tools, planning, approval gates, memory, retries, and explicit failure handling.",
    },
    {
      title: "Retrieval & knowledge systems",
      description:
        "Hybrid retrieval, reranking, graph traversal, citations, and local-first memory for grounded answers.",
    },
    {
      title: "Multimodal document intelligence",
      description:
        "Layout-aware extraction from scanned and handwritten faxes using Azure Content Understanding and Azure OpenAI. Grouped fields, confidence-aware retries, schema validation, and human review support structured outputs.",
    },
    {
      title: "Evaluation & production ML",
      description:
        "Random Forest retraining, XGBoost comparison, recall-led evaluation, and drift dashboards in professional work. Prompt regression checks and internal benchmarks complement personal experiments in LLM-as-judge comparison and LoRA/QLoRA adaptation.",
    },
    {
      title: "Event-driven cloud & backend systems",
      description:
        "Python and FastAPI services with separate downstream processing in Azure Blob Storage and Functions. Personal projects extend this work with schema-first contracts, local/cloud model routing, reproducible environments, and deployment controls.",
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
      title: "Professional delivery",
      description: "Tools used in employer projects. The linked stories explain my contributions, team results, and the scope of that experience.",
      examples: [
        { tools: ["Azure OpenAI", "Azure Content Understanding", "Azure Databricks"], context: "Grouped LLM extraction over CU Markdown, with confidence-aware four-pass extraction and validation. The revised pipeline went live in September 2026.", label: "Prior-authorization processing", href: "/experience#prior-authorization" },
        { tools: ["LangGraph", "Streamlit"], context: "Specialist document checks, evidence review, and investigator-facing reporting.", label: "Healthcare integrity workflows", href: "/experience#healthcare-integrity" },
        { tools: ["Milvus", "Playwright", "Model Context Protocol"], context: "Retrieval, reranking, and browser observations for multi-agent reasoning.", label: "Computer-use workflow", href: "/experience#computer-use" },
        { tools: ["Python", "FastAPI", "Azure App Service", "Azure Blob Storage", "Azure Functions", "Azure CLU", "Random Forest", "XGBoost", "Power BI"], context: "Improved an existing warranty system through Random Forest retraining, XGBoost comparison, LUIS-to-CLU migration, and dashboards. CLU calls remained in FastAPI; separate data processing moved through Blob Storage to Functions.", label: "Warranty processing", href: "/experience#warranty-processing" },
        { tools: ["AWS"], context: "AWS Lex, Lambda, and S3 in the separate FMCG conversational B2B reordering engagement.", label: "Cognizant experience", href: "/experience" },
      ],
    },
    {
      title: "Personal projects",
      description: "I’ve used these tools in public projects and experiments, including provider integrations and local applications. This is separate from my professional production work.",
      examples: [
        { tools: ["LangChain", "Anthropic Claude", "Google Gemini", "Ollama", "Pydantic", "SQLite", "PostgreSQL"], context: "Provider integrations, typed configuration, and database access in a natural-language SQL agent.", label: "NL2SQL implementation", href: "https://github.com/pypi-ahmad/natural-language-to-sql-agent" },
        { tools: ["PyTorch", "Transformers", "PEFT"], context: "Local model training, adapter loading, and base-versus-adapter comparison.", label: "LoRA Fine-tune Studio", href: "/projects#lora-fine-tune-studio" },
        { tools: ["Chroma"], context: "Persistent concept embeddings and similarity retrieval in a public knowledge-system implementation.", label: "Chroma implementation", href: "https://github.com/pypi-ahmad/google-okf-implementation" },
        { tools: ["ArcadeDB"], context: "A knowledge graph for document retrieval and cross-document question answering.", label: "Document Intelligence Agent", href: "https://github.com/pypi-ahmad/document-intelligence-agent" },
        { tools: ["Docker", "GitHub Actions"], context: "Container packaging and automated quality checks for the video workspace.", label: "Video Summarizer", href: "/projects#video-summarizer" },
      ],
    },
  ],
  learningIntroduction: "I’m exploring these areas as I learn forward-deployed engineering. Some build on tools I already use, but the topics listed here are learning interests, not production expertise.",
  learning: [
    { title: "Agentic AI and orchestration", topics: ["LangGraph + MCP", "AutoGen", "CrewAI", "Multi-agent systems"] },
    { title: "Reasoning models and post-training", topics: ["Test-time compute scaling", "GRPO (Group Relative Policy Optimization)", "DPO (Direct Preference Optimization)"] },
    { title: "Evaluation and AI governance", topics: ["LLM-as-a-Judge", "DeepEval", "NeMo Guardrails", "Red-teaming", "Precision-recall curves"] },
    { title: "Edge AI and high-throughput inference", topics: ["vLLM", "SGLang", "Ollama", "FP4/FP8 quantization", "AWQ"] },
    { title: "Agentic RAG and GraphRAG", topics: ["Neo4j", "LlamaIndex Workflows", "Vector databases", "Hybrid search"] },
    { title: "Multimodal and vision-language AI", topics: ["Vision-language models (VLMs)", "Document AI", "Audio-to-audio"] },
    { title: "Cloud events & observability", topics: ["Azure Event Grid", "Application Insights"] },
  ],
};
