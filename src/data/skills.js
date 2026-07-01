/**
 * Skills Data
 *
 * Two exports drive two different views:
 *
 *  skillsPageData  — Full skills grid on /skills page (SkillsPage.jsx).
 *                     Contains 6 categorized sections with icon IDs.
 *
 *  skills          — Compact 3-category display on the home page (SkillSection.jsx).
 *                     Each entry has a `fileName` mapping to an SVG illustration component.
 *
 * Icon format: registry icon IDs for standard entries, with optional
 * `customIcon` keys for curated fallback SVG components.
 */

// ─────────────────────────────────────────────────────────
// SKILLS — grouped by engineering domain, signal-dense
// ─────────────────────────────────────────────────────────

// Skills page data (consumed by SkillsPage.jsx)
export const skillsPageData = {
  title: "Technical Skills",
  subtitle:
    "Modern AI engineering across agentic systems, retrieval, document intelligence, fine-tuning, and cloud-native delivery for healthcare and enterprise workflows.",
  skills: [
    {
      title: "GenAI & Agent Engineering",
      softwareSkills: [
        {
          skillName: "Python",
          fontAwesomeClassname: "simple-icons:python",
          style: { color: "#3776AB" },
          link: "https://www.python.org/",
        },
        {
          skillName: "OpenAI",
          fontAwesomeClassname: "simple-icons:openai",
          style: { color: "#74AA9C" },
          link: "https://openai.com/",
        },
        {
          skillName: "Anthropic Claude",
          fontAwesomeClassname: "simple-icons:anthropic",
          style: { color: "#191919" },
          link: "https://www.anthropic.com/claude",
        },
        {
          skillName: "Google Gemini",
          fontAwesomeClassname: "simple-icons:googlegemini",
          style: { color: "#4285F4" },
          link: "https://deepmind.google/technologies/gemini/",
        },
        {
          skillName: "Azure OpenAI",
          fontAwesomeClassname: "simple-icons:microsoftazure",
          style: { color: "#0078D4" },
          link: "https://azure.microsoft.com/en-us/products/ai-services/openai-service",
        },
        {
          skillName: "LangChain",
          fontAwesomeClassname: "simple-icons:langchain",
          style: { color: "#1C3C3C" },
          link: "https://www.langchain.com/",
        },
        {
          skillName: "LangGraph",
          fontAwesomeClassname: "simple-icons:langgraph",
          style: { color: "#1C3C3C" },
          link: "https://langchain-ai.github.io/langgraph/",
        },
        {
          skillName: "Model Context Protocol (MCP)",
          fontAwesomeClassname: "simple-icons:modelcontextprotocol",
          style: { color: "#412991" },
          link: "https://modelcontextprotocol.io/",
        },
        {
          skillName: "Pydantic",
          fontAwesomeClassname: "simple-icons:pydantic",
          style: { color: "#E92063" },
          link: "https://docs.pydantic.dev/",
        },
        {
          skillName: "FastAPI",
          fontAwesomeClassname: "simple-icons:fastapi",
          style: { color: "#009688" },
          link: "https://fastapi.tiangolo.com/",
        },
      ],
      skills: [
        "⚡ Building production LLM applications and agentic systems across OpenAI GPT-5/GPT-4 series, Gemini 2.5/3 series, Claude Opus/Sonnet, Azure OpenAI, and Azure AI Foundry",
        "⚡ Implementing prompt engineering, structured outputs, and function/tool-calling patterns with schema-first contracts",
        "⚡ Designing evaluation pipelines for hallucination reduction, reliability checks, and prompt/regression validation",
        "⚡ Optimizing token cost and latency with context pruning, deterministic guardrails, async tool execution, and reusable agent workflows",
        "⚡ Operating CLI-first agentic coding flows (Claude Code, Codex, OpenCode) with spec-driven execution and verification loops",
      ],
    },
    {
      title: "RAG, Retrieval & Orchestration",
      softwareSkills: [
        {
          skillName: "LangChain",
          fontAwesomeClassname: "simple-icons:langchain",
          style: { color: "#1C3C3C" },
          link: "https://www.langchain.com/",
        },
        {
          skillName: "LangGraph",
          fontAwesomeClassname: "simple-icons:langgraph",
          style: { color: "#1C3C3C" },
          link: "https://langchain-ai.github.io/langgraph/",
        },
        {
          skillName: "Milvus",
          fontAwesomeClassname: "simple-icons:milvus",
          style: { color: "#00A1EA" },
          link: "https://milvus.io/",
        },
        {
          skillName: "Model Context Protocol (MCP)",
          fontAwesomeClassname: "simple-icons:modelcontextprotocol",
          style: { color: "#412991" },
          link: "https://modelcontextprotocol.io/",
        },
        {
          skillName: "Playwright",
          fontAwesomeClassname: "simple-icons:playwright",
          style: { color: "#2EAD33" },
          link: "https://playwright.dev/",
        },
        {
          skillName: "SQL",
          fontAwesomeClassname: "simple-icons:microsoftsqlserver",
          style: { color: "#CC2927" },
          link: "https://learn.microsoft.com/en-us/sql/",
        },
        {
          skillName: "Python",
          fontAwesomeClassname: "simple-icons:python",
          style: { color: "#3776AB" },
          link: "https://www.python.org/",
        },
      ],
      skills: [
        "⚡ Building retrieval-grounded systems with Milvus, FAISS, ChromaDB, and DuckDB-backed analytics paths",
        "⚡ Designing hybrid search (BM25 + dense), reranking, and context assembly pipelines for higher task completion",
        "⚡ Orchestrating multi-agent workflows with LangGraph state machines, LangChain tooling, and MCP-based tool integration",
        "⚡ Implementing Playwright MCP and controlled tool-use layers for browser/task automation with explicit safety gates",
        "⚡ Supporting local inference routes with Ollama, GGUF, and quantization-aware deployment choices",
      ],
    },
    {
      title: "Document Intelligence & Multimodal Systems",
      softwareSkills: [
        {
          skillName: "PaddleOCR",
          fontAwesomeClassname: "simple-icons:paddlepaddle",
          style: { color: "#D81E06" },
          link: "https://github.com/PaddlePaddle/PaddleOCR",
        },
        {
          skillName: "Azure Document Intelligence",
          fontAwesomeClassname: "material-symbols:find-in-page-outline-rounded",
          customIcon: "AzureDocumentIntelligenceIcon",
          style: { color: "#0078D4" },
          link: "https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/",
        },
        {
          skillName: "Azure Cognitive Services",
          fontAwesomeClassname: "mdi:brain",
          customIcon: "AzureCognitiveServicesIcon",
          style: { color: "#0078D4" },
          link: "https://azure.microsoft.com/en-us/products/cognitive-services/",
        },
        {
          skillName: "Playwright",
          fontAwesomeClassname: "simple-icons:playwright",
          style: { color: "#2EAD33" },
          link: "https://playwright.dev/",
        },
        {
          skillName: "Pydantic",
          fontAwesomeClassname: "simple-icons:pydantic",
          style: { color: "#E92063" },
          link: "https://docs.pydantic.dev/",
        },
        {
          skillName: "Python",
          fontAwesomeClassname: "simple-icons:python",
          style: { color: "#3776AB" },
          link: "https://www.python.org/",
        },
      ],
      skills: [
        "⚡ Designing layout-aware document pipelines with Azure Content Understanding, Azure Document Intelligence, PaddleOCR, PaddleOCR-VL-1.5, DeepSeek-OCR, and GLM-OCR",
        "⚡ Building multimodal extraction and table-understanding workflows for scanned PDFs, forms, and policy-heavy document sets",
        "⚡ Applying schema validation, confidence-aware retries, and human review gates for production-trustworthy outputs",
        "⚡ Using accessibility-tree and UI-state observations for grounded browser/computer-use automation in document workflows",
      ],
    },
    {
      title: "Data, ML & Fine-Tuning",
      softwareSkills: [
        {
          skillName: "SQL",
          fontAwesomeClassname: "simple-icons:microsoftsqlserver",
          style: { color: "#CC2927" },
          link: "https://learn.microsoft.com/en-us/sql/",
        },
        {
          skillName: "PySpark",
          fontAwesomeClassname: "simple-icons:apachespark",
          style: { color: "#E25A1C" },
          link: "https://spark.apache.org/docs/latest/api/python/",
        },
        {
          skillName: "Databricks",
          fontAwesomeClassname: "simple-icons:databricks",
          style: { color: "#FF3621" },
          link: "https://www.databricks.com/",
        },
        {
          skillName: "Scikit-Learn",
          fontAwesomeClassname: "simple-icons:scikitlearn",
          style: { color: "#F7931E" },
          link: "https://scikit-learn.org/",
        },
        {
          skillName: "TensorFlow",
          fontAwesomeClassname: "simple-icons:tensorflow",
          style: { color: "#FF6F00" },
          link: "https://www.tensorflow.org/",
        },
        {
          skillName: "Pandas",
          fontAwesomeClassname: "simple-icons:pandas",
          style: { color: "#6366F1" },
          link: "https://pandas.pydata.org/",
        },
        {
          skillName: "NumPy",
          fontAwesomeClassname: "simple-icons:numpy",
          style: { color: "#4DABCF" },
          link: "https://numpy.org/",
        },
        {
          skillName: "Jupyter",
          fontAwesomeClassname: "simple-icons:jupyter",
          style: { color: "#F37626" },
          link: "https://jupyter.org/",
        },
      ],
      skills: [
        "⚡ Building ML and analytics workflows with Spark MLlib, scikit-learn, XGBoost, LightGBM, Random Forest, and deep-learning stacks",
        "⚡ Fine-tuning and adapter workflows with PyTorch, Transformers, LoRA/QLoRA, PEFT, and bitsandbytes for domain adaptation",
        "⚡ Engineering ETL and medallion-style data pipelines with robust validation, feature engineering, and reconciliation",
        "⚡ Delivering fraud detection and risk-scoring systems with measurable evaluation discipline (Precision@K, PR-AUC, monitoring, and validation loops)",
      ],
    },
    {
      title: "Backend, Cloud & Delivery",
      softwareSkills: [
        {
          skillName: "FastAPI",
          fontAwesomeClassname: "simple-icons:fastapi",
          style: { color: "#009688" },
          link: "https://fastapi.tiangolo.com/",
        },
        {
          skillName: "Azure",
          fontAwesomeClassname: "simple-icons:microsoftazure",
          style: { color: "#0078D4" },
          link: "https://azure.microsoft.com/",
        },
        {
          skillName: "AWS",
          fontAwesomeClassname: "simple-icons:amazonaws",
          style: { color: "#FF9900" },
          link: "https://aws.amazon.com/",
        },
        {
          skillName: "Azure Databricks",
          fontAwesomeClassname: "simple-icons:databricks",
          style: { color: "#FF3621" },
          link: "https://learn.microsoft.com/en-us/azure/databricks/",
        },
        {
          skillName: "Docker",
          fontAwesomeClassname: "simple-icons:docker",
          style: { color: "#2496ED" },
          link: "https://www.docker.com/",
        },
        {
          skillName: "Amazon S3",
          fontAwesomeClassname: "simple-icons:amazons3",
          style: { color: "#FF9900" },
          link: "https://aws.amazon.com/s3/",
        },
        {
          skillName: "AWS Lambda",
          fontAwesomeClassname: "simple-icons:awslambda",
          style: { color: "#FF9900" },
          link: "https://aws.amazon.com/lambda/",
        },
        {
          skillName: "CloudWatch",
          fontAwesomeClassname: "simple-icons:amazoncloudwatch",
          style: { color: "#FF9900" },
          link: "https://aws.amazon.com/cloudwatch/",
        },
        {
          skillName: "Azure Key Vault",
          fontAwesomeClassname: "material-symbols:key-vertical-rounded",
          customIcon: "AzureKeyVaultIcon",
          style: { color: "#0078D4" },
          link: "https://azure.microsoft.com/en-us/products/key-vault/",
        },
        {
          skillName: "Git",
          fontAwesomeClassname: "simple-icons:git",
          style: { color: "#F05032" },
          link: "https://git-scm.com/",
        },
        {
          skillName: "GitLab",
          fontAwesomeClassname: "simple-icons:gitlab",
          style: { color: "#FC6D26" },
          link: "https://gitlab.com/",
        },
        {
          skillName: "Power BI",
          fontAwesomeClassname: "simple-icons:powerbi",
          style: { color: "#F2C811" },
          link: "https://powerbi.microsoft.com/",
        },
      ],
      skills: [
        "⚡ Building backend services with Python, REST APIs, async services, and microservice-friendly contracts",
        "⚡ Delivering production AI systems on Azure (Databricks, App Services, Blob, Key Vault, ML Studio) and AWS (Lambda, S3, SageMaker, CloudWatch, Lex)",
        "⚡ Operating CI/CD with GitHub Actions and GitLab pipelines plus QA, monitoring, and stakeholder-facing reporting",
        "⚡ Hardening delivery with secure configuration, observability hooks, and deployment-ready container patterns",
      ],
    },
    {
      title: "Domain Experience",
      softwareSkills: [],
      skills: [
        "⚡ Healthcare prior authorization, health-insurance operations, and document-heavy workflow automation",
        "⚡ Fraud and risk analytics across referral, claims, and policy-validation workflows",
        "⚡ Automotive and manufacturing analytics, warranty classification, and operational KPI reporting",
        "⚡ Cross-functional delivery with data science, engineering, QA, and business stakeholders in enterprise programs",
      ],
    },
  ],
};

// Skills section data (consumed by Skills containers on home page)
export const skills = {
  data: [
    {
      title: "GenAI, Agents & RAG",
      fileName: "FullStackImg",
      skills: [
        "⚡ Building production GenAI systems across GPT-5/GPT-4, Gemini 2.5/3, Claude Opus/Sonnet, Azure OpenAI, and Azure AI Foundry",
        "⚡ Designing agentic workflows with LangGraph/LangChain, MCP-based tool use, structured outputs, and evaluation pipelines",
        "⚡ Implementing hybrid retrieval (BM25 + dense), reranking, and grounded generation with Milvus/FAISS/ChromaDB patterns",
        "⚡ Optimizing reliability, latency, and cost with hallucination controls, context pruning, and deterministic validation layers",
      ],
      softwareSkills: [
        {
          skillName: "Python",
          fontAwesomeClassname: "simple-icons:python",
          style: { color: "#3776AB" },
          link: "https://www.python.org/",
        },
        {
          skillName: "OpenAI",
          fontAwesomeClassname: "simple-icons:openai",
          style: { color: "#74AA9C" },
          link: "https://openai.com/",
        },
        {
          skillName: "Anthropic Claude",
          fontAwesomeClassname: "simple-icons:anthropic",
          style: { color: "#191919" },
          link: "https://www.anthropic.com/claude",
        },
        {
          skillName: "Google Gemini",
          fontAwesomeClassname: "simple-icons:googlegemini",
          style: { color: "#4285F4" },
          link: "https://deepmind.google/technologies/gemini/",
        },
        {
          skillName: "Azure OpenAI",
          fontAwesomeClassname: "simple-icons:microsoftazure",
          style: { color: "#0078D4" },
          link: "https://azure.microsoft.com/en-us/products/ai-services/openai-service",
        },
        {
          skillName: "LangGraph",
          fontAwesomeClassname: "simple-icons:langgraph",
          style: { color: "#1C3C3C" },
          link: "https://langchain-ai.github.io/langgraph/",
        },
        {
          skillName: "Model Context Protocol (MCP)",
          fontAwesomeClassname: "simple-icons:modelcontextprotocol",
          style: { color: "#412991" },
          link: "https://modelcontextprotocol.io/",
        },
        {
          skillName: "Milvus",
          fontAwesomeClassname: "simple-icons:milvus",
          style: { color: "#00A1EA" },
          link: "https://milvus.io/",
        },
      ],
    },
    {
      title: "Document Intelligence, Backend & Cloud",
      fileName: "CloudInfraImg",
      skills: [
        "⚡ Building multimodal document intelligence pipelines with Azure Content Understanding, Azure Document Intelligence, PaddleOCR-family models, and schema validation",
        "⚡ Shipping FastAPI-based services with async patterns, tool integrations, and automation-ready interfaces",
        "⚡ Deploying cloud-native AI workloads on Azure and AWS with secure secrets, observability, and containerized operations",
        "⚡ Supporting enterprise delivery with CI/CD, QA gates, and operational reporting",
      ],
      softwareSkills: [
        {
          skillName: "FastAPI",
          fontAwesomeClassname: "simple-icons:fastapi",
          style: { color: "#009688" },
          link: "https://fastapi.tiangolo.com/",
        },
        {
          skillName: "Playwright",
          fontAwesomeClassname: "simple-icons:playwright",
          style: { color: "#2EAD33" },
          link: "https://playwright.dev/",
        },
        {
          skillName: "Azure",
          fontAwesomeClassname: "simple-icons:microsoftazure",
          style: { color: "#0078D4" },
          link: "https://azure.microsoft.com/",
        },
        {
          skillName: "AWS",
          fontAwesomeClassname: "simple-icons:amazonaws",
          style: { color: "#FF9900" },
          link: "https://aws.amazon.com/",
        },
        {
          skillName: "Docker",
          fontAwesomeClassname: "simple-icons:docker",
          style: { color: "#2496ED" },
          link: "https://www.docker.com/",
        },
        {
          skillName: "Azure Databricks",
          fontAwesomeClassname: "simple-icons:databricks",
          style: { color: "#FF3621" },
          link: "https://learn.microsoft.com/en-us/azure/databricks/",
        },
        {
          skillName: "Amazon S3",
          fontAwesomeClassname: "simple-icons:amazons3",
          style: { color: "#FF9900" },
          link: "https://aws.amazon.com/s3/",
        },
        {
          skillName: "AWS Lambda",
          fontAwesomeClassname: "simple-icons:awslambda",
          style: { color: "#FF9900" },
          link: "https://aws.amazon.com/lambda/",
        },
        {
          skillName: "Azure Document Intelligence",
          fontAwesomeClassname: "material-symbols:find-in-page-outline-rounded",
          customIcon: "AzureDocumentIntelligenceIcon",
          style: { color: "#0078D4" },
          link: "https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/",
        },
        {
          skillName: "Azure Key Vault",
          fontAwesomeClassname: "material-symbols:key-vertical-rounded",
          customIcon: "AzureKeyVaultIcon",
          style: { color: "#0078D4" },
          link: "https://azure.microsoft.com/en-us/products/key-vault/",
        },
      ],
    },
    {
      title: "Data, ML & Fine-Tuning",
      fileName: "DataScienceImg",
      skills: [
        "⚡ Building analytics and ML workflows across Spark, scikit-learn, TensorFlow, SQL, and feature-engineering pipelines",
        "⚡ Applying PyTorch/Transformers adapter training (LoRA/QLoRA/PEFT/bitsandbytes) for domain adaptation use cases",
        "⚡ Developing fraud and risk scoring systems with reproducible evaluation, validation, and monitoring loops",
        "⚡ Translating model behavior into business-facing metrics, dashboards, and decision support",
      ],
      softwareSkills: [
        {
          skillName: "PySpark",
          fontAwesomeClassname: "simple-icons:apachespark",
          style: { color: "#E25A1C" },
          link: "https://spark.apache.org/docs/latest/api/python/",
        },
        {
          skillName: "Databricks",
          fontAwesomeClassname: "simple-icons:databricks",
          style: { color: "#FF3621" },
          link: "https://www.databricks.com/",
        },
        {
          skillName: "Scikit-Learn",
          fontAwesomeClassname: "simple-icons:scikitlearn",
          style: { color: "#F7931E" },
          link: "https://scikit-learn.org/",
        },
        {
          skillName: "TensorFlow",
          fontAwesomeClassname: "simple-icons:tensorflow",
          style: { color: "#FF6F00" },
          link: "https://www.tensorflow.org/",
        },
        {
          skillName: "SQL",
          fontAwesomeClassname: "simple-icons:microsoftsqlserver",
          style: { color: "#CC2927" },
          link: "https://learn.microsoft.com/en-us/sql/",
        },
        {
          skillName: "Pandas",
          fontAwesomeClassname: "simple-icons:pandas",
          style: { color: "#6366F1" },
          link: "https://pandas.pydata.org/",
        },
        {
          skillName: "NumPy",
          fontAwesomeClassname: "simple-icons:numpy",
          style: { color: "#4DABCF" },
          link: "https://numpy.org/",
        },
        {
          skillName: "Jupyter",
          fontAwesomeClassname: "simple-icons:jupyter",
          style: { color: "#F37626" },
          link: "https://jupyter.org/",
        },
        {
          skillName: "Power BI",
          fontAwesomeClassname: "simple-icons:powerbi",
          style: { color: "#F2C811" },
          link: "https://powerbi.microsoft.com/",
        },
      ],
    },
  ],
};
