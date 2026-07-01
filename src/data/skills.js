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
    "Production GenAI, document intelligence, data engineering, and cloud delivery across healthcare and enterprise automation.",
  skills: [
    {
      title: "Generative AI & LLMs",
      softwareSkills: [
        { skillName: "Python", fontAwesomeClassname: "simple-icons:python", style: { color: "#3776AB" }, link: "https://www.python.org/" },
        { skillName: "OpenAI", fontAwesomeClassname: "simple-icons:openai", style: { color: "#74AA9C" }, link: "https://openai.com/" },
        { skillName: "Anthropic Claude", fontAwesomeClassname: "simple-icons:anthropic", style: { color: "#191919" }, link: "https://www.anthropic.com/claude" },
        { skillName: "LangChain", fontAwesomeClassname: "simple-icons:langchain", style: { color: "#1C3C3C" }, link: "https://www.langchain.com/" },
        { skillName: "LangGraph", fontAwesomeClassname: "simple-icons:langgraph", style: { color: "#1C3C3C" }, link: "https://langchain-ai.github.io/langgraph/" },
        { skillName: "Google Gemini", fontAwesomeClassname: "simple-icons:googlegemini", style: { color: "#4285F4" }, link: "https://deepmind.google/technologies/gemini/" },
        { skillName: "Azure OpenAI", fontAwesomeClassname: "simple-icons:microsoftazure", style: { color: "#0078D4" }, link: "https://azure.microsoft.com/en-us/products/ai-services/openai-service" },
        { skillName: "Milvus", fontAwesomeClassname: "simple-icons:milvus", style: { color: "#00A1EA" }, link: "https://milvus.io/" },
        { skillName: "FastAPI", fontAwesomeClassname: "simple-icons:fastapi", style: { color: "#009688" }, link: "https://fastapi.tiangolo.com/" },
        { skillName: "Model Context Protocol (MCP)", fontAwesomeClassname: "simple-icons:modelcontextprotocol", style: { color: "#412991" }, link: "https://modelcontextprotocol.io/" },
        { skillName: "Playwright", fontAwesomeClassname: "simple-icons:playwright", style: { color: "#2EAD33" }, link: "https://playwright.dev/" },
      ],
      skills: [
        "⚡ Building LLM applications, AI agents, and RAG systems for healthcare and enterprise workflows",
        "⚡ Designing model-evaluation and validation loops for extraction quality, hallucination control, and prompt optimization",
        "⚡ Implementing tool-integrated agents with LangChain, LangGraph, MCP, and provider-native model APIs",
        "⚡ Optimizing cost and latency with structured prompts, retrieval, context pruning, and deterministic guardrails",
      ],
    },
    {
      title: "Document Intelligence & RAG",
      softwareSkills: [
        { skillName: "PaddleOCR", fontAwesomeClassname: "simple-icons:paddlepaddle", style: { color: "#D81E06" }, link: "https://github.com/PaddlePaddle/PaddleOCR" },
        { skillName: "Milvus", fontAwesomeClassname: "simple-icons:milvus", style: { color: "#00A1EA" }, link: "https://milvus.io/" },
        { skillName: "Pydantic", fontAwesomeClassname: "simple-icons:pydantic", style: { color: "#E92063" }, link: "https://docs.pydantic.dev/" },
        { skillName: "Playwright", fontAwesomeClassname: "simple-icons:playwright", style: { color: "#2EAD33" }, link: "https://playwright.dev/" },
        { skillName: "Azure Document Intelligence", fontAwesomeClassname: "material-symbols:find-in-page-outline-rounded", customIcon: "AzureDocumentIntelligenceIcon", style: { color: "#0078D4" }, link: "https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/" },
        { skillName: "Azure Cognitive Services", fontAwesomeClassname: "mdi:brain", customIcon: "AzureCognitiveServicesIcon", style: { color: "#0078D4" }, link: "https://azure.microsoft.com/en-us/products/cognitive-services/" },
      ],
      skills: [
        "⚡ Designing intelligent document processing pipelines with OCR, layout-aware parsing, and clause-level reasoning",
        "⚡ Building SOP-grounded RAG flows that convert ambiguous user intent into reliable execution plans",
        "⚡ Using comparison loops, schema validation, and human review gates to make extraction outputs production-trustworthy",
        "⚡ Applying accessibility-tree and UI-state observations to browser automation and computer-use workflows",
      ],
    },
    {
      title: "Machine Learning & Data",
      softwareSkills: [
        { skillName: "SQL", fontAwesomeClassname: "simple-icons:microsoftsqlserver", style: { color: "#CC2927" }, link: "https://learn.microsoft.com/en-us/sql/" },
        { skillName: "PySpark", fontAwesomeClassname: "simple-icons:apachespark", style: { color: "#E25A1C" }, link: "https://spark.apache.org/docs/latest/api/python/" },
        { skillName: "Databricks", fontAwesomeClassname: "simple-icons:databricks", style: { color: "#FF3621" }, link: "https://www.databricks.com/" },
        { skillName: "Scikit-Learn", fontAwesomeClassname: "simple-icons:scikitlearn", style: { color: "#F7931E" }, link: "https://scikit-learn.org/" },
        { skillName: "TensorFlow", fontAwesomeClassname: "simple-icons:tensorflow", style: { color: "#FF6F00" }, link: "https://www.tensorflow.org/" },
        { skillName: "PaddleOCR", fontAwesomeClassname: "simple-icons:paddlepaddle", style: { color: "#D81E06" }, link: "https://github.com/PaddlePaddle/PaddleOCR" },
        { skillName: "Pandas", fontAwesomeClassname: "simple-icons:pandas", style: { color: "#6366F1" }, link: "https://pandas.pydata.org/" },
        { skillName: "NumPy", fontAwesomeClassname: "simple-icons:numpy", style: { color: "#4DABCF" }, link: "https://numpy.org/" },
        { skillName: "Jupyter", fontAwesomeClassname: "simple-icons:jupyter", style: { color: "#F37626" }, link: "https://jupyter.org/" },
      ],
      skills: [
        "⚡ Warranty analytics, classification modeling, and predictive workflows for automotive and manufacturing use cases",
        "⚡ NLP, layout analysis, feature engineering, data analysis, and model evaluation for production AI systems",
        "⚡ Building analytics-ready datasets with schema mapping, reconciliation, joins, and data-quality checks",
      ],
    },
    {
      title: "Cloud, Data Engineering & Delivery",
      softwareSkills: [
        { skillName: "Azure", fontAwesomeClassname: "simple-icons:microsoftazure", style: { color: "#0078D4" }, link: "https://azure.microsoft.com/" },
        { skillName: "AWS", fontAwesomeClassname: "simple-icons:amazonaws", style: { color: "#FF9900" }, link: "https://aws.amazon.com/" },
        { skillName: "Azure Databricks", fontAwesomeClassname: "simple-icons:databricks", style: { color: "#FF3621" }, link: "https://learn.microsoft.com/en-us/azure/databricks/" },
        { skillName: "Docker", fontAwesomeClassname: "simple-icons:docker", style: { color: "#2496ED" }, link: "https://www.docker.com/" },
        { skillName: "Amazon S3", fontAwesomeClassname: "simple-icons:amazons3", style: { color: "#FF9900" }, link: "https://aws.amazon.com/s3/" },
        { skillName: "AWS Lambda", fontAwesomeClassname: "simple-icons:awslambda", style: { color: "#FF9900" }, link: "https://aws.amazon.com/lambda/" },
        { skillName: "Azure App Services", fontAwesomeClassname: "simple-icons:microsoftazure", style: { color: "#0078D4" }, link: "https://azure.microsoft.com/en-us/products/app-service/" },
        { skillName: "Azure Cognitive Services", fontAwesomeClassname: "mdi:brain", customIcon: "AzureCognitiveServicesIcon", style: { color: "#0078D4" }, link: "https://azure.microsoft.com/en-us/products/cognitive-services/" },
        { skillName: "Azure Key Vault", fontAwesomeClassname: "material-symbols:key-vertical-rounded", customIcon: "AzureKeyVaultIcon", style: { color: "#0078D4" }, link: "https://azure.microsoft.com/en-us/products/key-vault/" },
        { skillName: "CloudWatch", fontAwesomeClassname: "simple-icons:amazoncloudwatch", style: { color: "#FF9900" }, link: "https://aws.amazon.com/cloudwatch/" },
        { skillName: "Amazon SageMaker", fontAwesomeClassname: "material-symbols:model-training-outline-rounded", customIcon: "AmazonSageMakerIcon", style: { color: "#FF9900" }, link: "https://aws.amazon.com/sagemaker/" },
        { skillName: "Git", fontAwesomeClassname: "simple-icons:git", style: { color: "#F05032" }, link: "https://git-scm.com/" },
        { skillName: "GitLab", fontAwesomeClassname: "simple-icons:gitlab", style: { color: "#FC6D26" }, link: "https://gitlab.com/" },
        { skillName: "Power BI", fontAwesomeClassname: "simple-icons:powerbi", style: { color: "#F2C811" }, link: "https://powerbi.microsoft.com/" },
      ],
      skills: [
        "⚡ Building ETL and ELT pipelines with Azure Databricks, PySpark, and cloud-native storage services",
        "⚡ Delivering API-backed AI systems on Azure App Services, Docker, Lambda, and secure cloud infrastructure",
        "⚡ Supporting CI/CD, QA, monitoring, observability, and stakeholder reporting in Agile delivery environments",
      ],
    },
    {
      title: "Domain Experience",
      softwareSkills: [],
      skills: [
        "⚡ Healthcare, prior authorization, health insurance, and document-heavy workflow automation",
        "⚡ Automotive and manufacturing analytics, warranty classification, and operational reporting",
        "⚡ Cross-functional delivery across data science, engineering, QA, and business stakeholder teams",
      ],
    },
  ],
};

// Skills section data (consumed by Skills containers on home page)
export const skills = {
  data: [
    {
      title: "GenAI & Agent Systems",
      fileName: "FullStackImg",
      skills: [
        "⚡ Building LLM applications, AI agents, and RAG systems for healthcare and enterprise workflows",
        "⚡ Designing planning, retrieval, and validation layers that make agent execution dependable",
        "⚡ Working across OpenAI, Claude, Gemini, Azure OpenAI, LangChain, LangGraph, and MCP tooling",
        "⚡ Optimizing prompts, token budgets, and evaluation loops for production use",
      ],
      softwareSkills: [
        { skillName: "Python", fontAwesomeClassname: "simple-icons:python", style: { color: "#3776AB" }, link: "https://www.python.org/" },
        { skillName: "OpenAI", fontAwesomeClassname: "simple-icons:openai", style: { color: "#74AA9C" }, link: "https://openai.com/" },
        { skillName: "Anthropic Claude", fontAwesomeClassname: "simple-icons:anthropic", style: { color: "#191919" }, link: "https://www.anthropic.com/claude" },
        { skillName: "LangChain", fontAwesomeClassname: "simple-icons:langchain", style: { color: "#1C3C3C" }, link: "https://www.langchain.com/" },
        { skillName: "LangGraph", fontAwesomeClassname: "simple-icons:langgraph", style: { color: "#1C3C3C" }, link: "https://langchain-ai.github.io/langgraph/" },
        { skillName: "Google Gemini", fontAwesomeClassname: "simple-icons:googlegemini", style: { color: "#4285F4" }, link: "https://deepmind.google/technologies/gemini/" },
        { skillName: "Azure OpenAI", fontAwesomeClassname: "simple-icons:microsoftazure", style: { color: "#0078D4" }, link: "https://azure.microsoft.com/en-us/products/ai-services/openai-service" },
        { skillName: "Pydantic", fontAwesomeClassname: "simple-icons:pydantic", style: { color: "#E92063" }, link: "https://docs.pydantic.dev/" },
        { skillName: "Milvus", fontAwesomeClassname: "simple-icons:milvus", style: { color: "#00A1EA" }, link: "https://milvus.io/" },
        { skillName: "Model Context Protocol (MCP)", fontAwesomeClassname: "simple-icons:modelcontextprotocol", style: { color: "#412991" }, link: "https://modelcontextprotocol.io/" },
      ],
    },
    {
      title: "Document Intelligence & Cloud Delivery",
      fileName: "CloudInfraImg",
      skills: [
        "⚡ Designing document intelligence pipelines with OCR, layout-aware parsing, and clause extraction",
        "⚡ Building Databricks ETL pipelines for schema mapping, key reconciliation, and analytics-ready datasets",
        "⚡ Deploying Dockerized AI systems on AWS and Azure with security, monitoring, and operational visibility",
        "⚡ Supporting prior-authorization and insurance workflows with Azure-native document understanding services",
      ],
      softwareSkills: [
        { skillName: "Azure", fontAwesomeClassname: "simple-icons:microsoftazure", style: { color: "#0078D4" }, link: "https://azure.microsoft.com/" },
        { skillName: "AWS", fontAwesomeClassname: "simple-icons:amazonaws", style: { color: "#FF9900" }, link: "https://aws.amazon.com/" },
        { skillName: "Azure Databricks", fontAwesomeClassname: "simple-icons:databricks", style: { color: "#FF3621" }, link: "https://learn.microsoft.com/en-us/azure/databricks/" },
        { skillName: "PySpark", fontAwesomeClassname: "simple-icons:apachespark", style: { color: "#E25A1C" }, link: "https://spark.apache.org/docs/latest/api/python/" },
        { skillName: "Docker", fontAwesomeClassname: "simple-icons:docker", style: { color: "#2496ED" }, link: "https://www.docker.com/" },
        { skillName: "Amazon S3", fontAwesomeClassname: "simple-icons:amazons3", style: { color: "#FF9900" }, link: "https://aws.amazon.com/s3/" },
        { skillName: "AWS Lambda", fontAwesomeClassname: "simple-icons:awslambda", style: { color: "#FF9900" }, link: "https://aws.amazon.com/lambda/" },
        { skillName: "AWS CloudWatch", fontAwesomeClassname: "simple-icons:amazoncloudwatch", style: { color: "#FF9900" }, link: "https://aws.amazon.com/cloudwatch/" },
        { skillName: "Azure Cognitive Services", fontAwesomeClassname: "mdi:brain", customIcon: "AzureCognitiveServicesIcon", style: { color: "#0078D4" }, link: "https://azure.microsoft.com/en-us/products/cognitive-services/" },
        { skillName: "Azure Key Vault", fontAwesomeClassname: "material-symbols:key-vertical-rounded", customIcon: "AzureKeyVaultIcon", style: { color: "#0078D4" }, link: "https://azure.microsoft.com/en-us/products/key-vault/" },
        { skillName: "Azure Document Intelligence", fontAwesomeClassname: "material-symbols:find-in-page-outline-rounded", customIcon: "AzureDocumentIntelligenceIcon", style: { color: "#0078D4" }, link: "https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/" },
      ],
    },
    {
      title: "Machine Learning & Analytics",
      fileName: "DataScienceImg",
      skills: [
        "⚡ Building classification, regression, and NLP workflows with strong evaluation and feature-engineering discipline",
        "⚡ Applying ML and analytics to warranty claims, operational KPIs, and enterprise reporting needs",
        "⚡ Working with SQL, Scikit-Learn, TensorFlow, Power BI, and Python data tooling across the model lifecycle",
        "⚡ Translating model behavior into stakeholder-facing metrics and decision support",
      ],
      softwareSkills: [
        { skillName: "TensorFlow", fontAwesomeClassname: "simple-icons:tensorflow", style: { color: "#FF6F00" }, link: "https://www.tensorflow.org/" },
        { skillName: "Scikit-Learn", fontAwesomeClassname: "simple-icons:scikitlearn", style: { color: "#F7931E" }, link: "https://scikit-learn.org/" },
        { skillName: "SQL", fontAwesomeClassname: "simple-icons:microsoftsqlserver", style: { color: "#CC2927" }, link: "https://learn.microsoft.com/en-us/sql/" },
        { skillName: "PaddleOCR", fontAwesomeClassname: "simple-icons:paddlepaddle", style: { color: "#D81E06" }, link: "https://github.com/PaddlePaddle/PaddleOCR" },
        { skillName: "Pandas", fontAwesomeClassname: "simple-icons:pandas", style: { color: "#6366F1" }, link: "https://pandas.pydata.org/" },
        { skillName: "NumPy", fontAwesomeClassname: "simple-icons:numpy", style: { color: "#4DABCF" }, link: "https://numpy.org/" },
        { skillName: "Jupyter", fontAwesomeClassname: "simple-icons:jupyter", style: { color: "#F37626" }, link: "https://jupyter.org/" },
        { skillName: "Power BI", fontAwesomeClassname: "simple-icons:powerbi", style: { color: "#F2C811" }, link: "https://powerbi.microsoft.com/" },
      ],
    },
  ],
};
