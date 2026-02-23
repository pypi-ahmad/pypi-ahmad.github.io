/**
 * Skills Data
 *
 * Two exports drive two different views:
 *
 *  skillsPageData  — Full skills grid on /skills page (SkillsPage.jsx).
 *                     Contains 6 categorized sections with Iconify icon IDs.
 *
 *  skills          — Compact 3-category display on the home page (SkillSection.jsx).
 *                     Each entry has a `fileName` mapping to an SVG illustration component.
 *
 * Icon format: "simple-icons:<name>" — rendered at runtime by the Iconify CDN script.
 */

// ─────────────────────────────────────────────────────────
// SKILLS — grouped by engineering domain, signal-dense
// ─────────────────────────────────────────────────────────

// Skills page data (consumed by SkillsPage.jsx)
export const skillsPageData = {
  title: "Technical Skills",
  subtitle:
    "Systems-level engineering across the AI stack — from LLM orchestration to production infrastructure.",
  skills: [
    {
      title: "GenAI / LLM Systems",
      softwareSkills: [
        { skillName: "Python", fontAwesomeClassname: "simple-icons:python", style: { color: "#3776AB" }, link: "https://www.python.org/" },
        { skillName: "OpenAI", fontAwesomeClassname: "simple-icons:openai", style: { color: "#74AA9C" }, link: "https://openai.com/" },
        { skillName: "LangChain", fontAwesomeClassname: "simple-icons:langchain", style: { color: "#1C3C3C" }, link: "https://www.langchain.com/" },
        { skillName: "LangGraph", fontAwesomeClassname: "simple-icons:langchain", style: { color: "#1C3C3C" }, link: "https://langchain-ai.github.io/langgraph/" },
        { skillName: "HuggingFace", fontAwesomeClassname: "simple-icons:huggingface", style: { color: "#FFD21E" }, link: "https://huggingface.co/" },
        { skillName: "Google Gemini", fontAwesomeClassname: "simple-icons:googlegemini", style: { color: "#4285F4" }, link: "https://deepmind.google/technologies/gemini/" },
        { skillName: "FastAPI", fontAwesomeClassname: "simple-icons:fastapi", style: { color: "#009688" }, link: "https://fastapi.tiangolo.com/" },
        { skillName: "Pydantic", fontAwesomeClassname: "simple-icons:pydantic", style: { color: "#E92063" }, link: "https://docs.pydantic.dev/" },
        { skillName: "Streamlit", fontAwesomeClassname: "simple-icons:streamlit", style: { color: "#FF4B4B" }, link: "https://streamlit.io/" },
        { skillName: "Model Context Protocol (MCP)", fontAwesomeClassname: "simple-icons:openai", style: { color: "#412991" }, link: "https://modelcontextprotocol.io/" },
      ],
      skills: [
        "⚡ Designing multi-stage LLM pipelines with structured outputs, validation gates, and retry loops",
        "⚡ Implementing Model Context Protocol (MCP) for tool-integrated LLM systems",
        "⚡ Optimizing token usage and latency via structured prompts, context pruning, and compression",
        "⚡ Building Vision-Language pipelines for document and UI understanding (OCR + reasoning)",
      ],
    },
    {
      title: "Agentic AI & RAG Systems",
      softwareSkills: [
        { skillName: "LangGraph", fontAwesomeClassname: "simple-icons:langchain", style: { color: "#1C3C3C" }, link: "https://langchain-ai.github.io/langgraph/" },
        { skillName: "Milvus", fontAwesomeClassname: "simple-icons:milvus", style: { color: "#00A1EA" }, link: "https://milvus.io/" },
        { skillName: "FAISS", fontAwesomeClassname: "simple-icons:meta", style: { color: "#0467DF" }, link: "https://github.com/facebookresearch/faiss" },
        { skillName: "Playwright", fontAwesomeClassname: "simple-icons:playwright", style: { color: "#2EAD33" }, link: "https://playwright.dev/" },
        { skillName: "HuggingFace", fontAwesomeClassname: "simple-icons:huggingface", style: { color: "#FFD21E" }, link: "https://huggingface.co/" },
        { skillName: "CrewAI", fontAwesomeClassname: "simple-icons:openai", style: { color: "#FF6B6B" }, link: "https://www.crewai.com/" },
        { skillName: "Model Context Protocol (MCP)", fontAwesomeClassname: "simple-icons:openai", style: { color: "#412991" }, link: "https://modelcontextprotocol.io/" },
      ],
      skills: [
        "⚡ Designing SOP-grounded RAG pipelines for procedural task execution",
        "⚡ Building planner-executor agent architectures with step decomposition",
        "⚡ Implementing state observation and feedback loops for reliable agent execution",
        "⚡ Optimizing agent reliability via structured planning instead of raw prompting",
      ],
    },
    {
      title: "AI / ML Foundations",
      softwareSkills: [
        { skillName: "TensorFlow", fontAwesomeClassname: "simple-icons:tensorflow", style: { color: "#FF6F00" }, link: "https://www.tensorflow.org/" },
        { skillName: "PyTorch", fontAwesomeClassname: "simple-icons:pytorch", style: { color: "#EE4C2C" }, link: "https://pytorch.org/" },
        { skillName: "Scikit-Learn", fontAwesomeClassname: "simple-icons:scikitlearn", style: { color: "#F7931E" }, link: "https://scikit-learn.org/" },
        { skillName: "HuggingFace Transformers", fontAwesomeClassname: "simple-icons:huggingface", style: { color: "#FFD21E" }, link: "https://huggingface.co/docs/transformers" },
        { skillName: "PaddleOCR", fontAwesomeClassname: "simple-icons:opencv", style: { color: "#5C3EE8" }, link: "https://github.com/PaddlePaddle/PaddleOCR" },
        { skillName: "Pandas", fontAwesomeClassname: "simple-icons:pandas", style: { color: "#6366F1" }, link: "https://pandas.pydata.org/" },
        { skillName: "NumPy", fontAwesomeClassname: "simple-icons:numpy", style: { color: "#4DABCF" }, link: "https://numpy.org/" },
        { skillName: "OpenCV", fontAwesomeClassname: "simple-icons:opencv", style: { color: "#5C3EE8" }, link: "https://opencv.org/" },
        { skillName: "Jupyter", fontAwesomeClassname: "simple-icons:jupyter", style: { color: "#F37626" }, link: "https://jupyter.org/" },
      ],
    },
    {
      title: "Data Engineering & Cloud",
      softwareSkills: [
        { skillName: "AWS", fontAwesomeClassname: "simple-icons:amazonaws", style: { color: "#FF9900" }, link: "https://aws.amazon.com/" },
        { skillName: "Databricks", fontAwesomeClassname: "simple-icons:databricks", style: { color: "#FF3621" }, link: "https://www.databricks.com/" },
        { skillName: "Apache Spark", fontAwesomeClassname: "simple-icons:apachespark", style: { color: "#E25A1C" }, link: "https://spark.apache.org/" },
        { skillName: "PySpark", fontAwesomeClassname: "simple-icons:apachespark", style: { color: "#E25A1C" }, link: "https://spark.apache.org/docs/latest/api/python/" },
        { skillName: "Delta Lake", fontAwesomeClassname: "simple-icons:databricks", style: { color: "#FF3621" }, link: "https://delta.io/" },
        { skillName: "Docker", fontAwesomeClassname: "simple-icons:docker", style: { color: "#2496ED" }, link: "https://www.docker.com/" },
        { skillName: "PostgreSQL", fontAwesomeClassname: "simple-icons:postgresql", style: { color: "#4169E1" }, link: "https://www.postgresql.org/" },
        { skillName: "MongoDB", fontAwesomeClassname: "simple-icons:mongodb", style: { color: "#47A248" }, link: "https://www.mongodb.com/" },
        { skillName: "Redis", fontAwesomeClassname: "simple-icons:redis", style: { color: "#DC382D" }, link: "https://redis.io/" },
        { skillName: "Azure Cognitive Services", fontAwesomeClassname: "simple-icons:microsoftazure", style: { color: "#0078D4" }, link: "https://azure.microsoft.com/en-us/products/cognitive-services/" },
        { skillName: "Azure Key Vault", fontAwesomeClassname: "simple-icons:microsoftazure", style: { color: "#0078D4" }, link: "https://azure.microsoft.com/en-us/products/key-vault/" },
        { skillName: "Azure Document Intelligence", fontAwesomeClassname: "simple-icons:microsoftazure", style: { color: "#0078D4" }, link: "https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/" },
      ],
      skills: [
        "⚡ Implementing Medallion Architecture (Silver/Gold layers) in Databricks pipelines",
        "⚡ Building healthcare data ingestion pipelines for structured + unstructured sources",
        "⚡ Handling large-scale joins, schema reconciliation, and data quality validation",
      ],
    },
    {
      title: "Backend & Infrastructure",
      softwareSkills: [
        { skillName: "FastAPI", fontAwesomeClassname: "simple-icons:fastapi", style: { color: "#009688" }, link: "https://fastapi.tiangolo.com/" },
        { skillName: "Flask", fontAwesomeClassname: "simple-icons:flask", style: { color: "#61DAFB" }, link: "https://flask.palletsprojects.com/" },
        { skillName: "REST APIs", fontAwesomeClassname: "simple-icons:fastapi", style: { color: "#009688" }, link: "https://restfulapi.net/" },
        { skillName: "Git", fontAwesomeClassname: "simple-icons:git", style: { color: "#F05032" }, link: "https://git-scm.com/" },
        { skillName: "GitHub Actions", fontAwesomeClassname: "simple-icons:githubactions", style: { color: "#2088FF" }, link: "https://github.com/features/actions" },
        { skillName: "Linux", fontAwesomeClassname: "simple-icons:linux", style: { color: "#FCC624" }, link: "https://www.kernel.org/" },
        { skillName: "Selenium", fontAwesomeClassname: "simple-icons:selenium", style: { color: "#43B02A" }, link: "https://www.selenium.dev/" },
        { skillName: "Playwright", fontAwesomeClassname: "simple-icons:playwright", style: { color: "#2EAD33" }, link: "https://playwright.dev/" },
        { skillName: "SQL Server", fontAwesomeClassname: "simple-icons:microsoftsqlserver", style: { color: "#CC2927" }, link: "https://www.microsoft.com/sql-server" },
      ],
    },
    {
      title: "Systems & Engineering",
      softwareSkills: [],
      skills: [
        "⚡ Designing end-to-end AI systems with reasoning, validation, and execution layers",
        "⚡ Building production-grade pipelines with feedback loops and error handling",
        "⚡ Applying system design principles to agentic AI and automation workflows",
        "⚡ Translating ambiguous user intent into deterministic execution plans",
        "⚡ Designing LLM-powered systems using prompt engineering, structured outputs, and tool integration",
        "⚡ Building conversational AI systems using AWS Lex and Azure OpenAI services",
        "⚡ Implementing serverless architectures using AWS Lambda and cloud-native services",
        "⚡ Ensuring reliability via monitoring, logging, and observability (CloudWatch, Azure monitoring)",
        "⚡ Version control and CI/CD practices using Git and GitLab for production pipelines",
        "⚡ Designing human-in-the-loop systems with observability and real-time execution feedback",
        "⚡ Optimizing LLM systems for cost, latency, and token efficiency",
        "⚡ Building hybrid AI systems combining rule-based logic with LLM reasoning",
        "⚡ Engineering validation-first architectures where outputs are verified before use",
      ],
    },
  ],
};

// Skills section data (consumed by Skills containers on home page)
export const skills = {
  data: [
    {
      title: "GenAI / LLM Systems",
      fileName: "FullStackImg",
      skills: [
        "⚡ Designing agentic workflows with RAG retrieval, planning layers, and feedback loops",
        "⚡ Building multi-stage LLM pipelines with validation gates and structured JSON output enforcement",
        "⚡ Architecting document intelligence systems (OCR + LLM reasoning + canonical validation)",
        "⚡ Implementing Retrieval-Augmented Generation (RAG) with vector databases (Milvus, FAISS)",
        "⚡ Developing LLM evaluation pipelines (factuality, completeness, consistency scoring)",
        "⚡ OCR and document layout understanding for scanned and fax-based medical documents",
        "⚡ Layout-aware parsing using bounding boxes, spatial reasoning, and multi-page context handling",
        "⚡ Structured output validation and schema enforcement in LLM systems",
      ],
      softwareSkills: [
        { skillName: "Python", fontAwesomeClassname: "simple-icons:python", style: { color: "#3776AB" }, link: "https://www.python.org/" },
        { skillName: "OpenAI", fontAwesomeClassname: "simple-icons:openai", style: { color: "#74AA9C" }, link: "https://openai.com/" },
        { skillName: "LangChain", fontAwesomeClassname: "simple-icons:langchain", style: { color: "#1C3C3C" }, link: "https://www.langchain.com/" },
        { skillName: "LangGraph", fontAwesomeClassname: "simple-icons:langchain", style: { color: "#1C3C3C" }, link: "https://langchain-ai.github.io/langgraph/" },
        { skillName: "HuggingFace", fontAwesomeClassname: "simple-icons:huggingface", style: { color: "#FFD21E" }, link: "https://huggingface.co/" },
        { skillName: "Google Gemini", fontAwesomeClassname: "simple-icons:googlegemini", style: { color: "#4285F4" }, link: "https://deepmind.google/technologies/gemini/" },
        { skillName: "Pydantic", fontAwesomeClassname: "simple-icons:pydantic", style: { color: "#E92063" }, link: "https://docs.pydantic.dev/" },
        { skillName: "Streamlit", fontAwesomeClassname: "simple-icons:streamlit", style: { color: "#FF4B4B" }, link: "https://streamlit.io/" },
      ],
    },
    {
      title: "Data Engineering & Cloud",
      fileName: "CloudInfraImg",
      skills: [
        "⚡ Building scalable ETL pipelines using Databricks, PySpark, and Delta Lake",
        "⚡ Designing schema mapping, normalization, and multi-source data consolidation workflows",
        "⚡ Deploying containerized AI systems on AWS using Docker and FastAPI",
        "⚡ Implementing vector search infrastructure for semantic retrieval systems",
        "⚡ Working with Azure Databricks for distributed data processing and large-scale analytics",
        "⚡ Managing cloud resources including storage, compute, and monitoring using AWS & Azure services",
        "⚡ Building data pipelines integrating batch and near real-time ingestion workflows",
        "⚡ Processing medical fax documents using OCR + layout-aware parsing for healthcare workflows",
        "⚡ Building document intelligence pipelines using Azure Document Intelligence and custom OCR models",
      ],
      softwareSkills: [
        { skillName: "AWS", fontAwesomeClassname: "simple-icons:amazonaws", style: { color: "#FF9900" }, link: "https://aws.amazon.com/" },
        { skillName: "Databricks", fontAwesomeClassname: "simple-icons:databricks", style: { color: "#FF3621" }, link: "https://www.databricks.com/" },
        { skillName: "PySpark", fontAwesomeClassname: "simple-icons:apachespark", style: { color: "#E25A1C" }, link: "https://spark.apache.org/docs/latest/api/python/" },
        { skillName: "Delta Lake", fontAwesomeClassname: "simple-icons:databricks", style: { color: "#FF3621" }, link: "https://delta.io/" },
        { skillName: "Docker", fontAwesomeClassname: "simple-icons:docker", style: { color: "#2496ED" }, link: "https://www.docker.com/" },
        { skillName: "MongoDB", fontAwesomeClassname: "simple-icons:mongodb", style: { color: "#47A248" }, link: "https://www.mongodb.com/" },
        { skillName: "Azure", fontAwesomeClassname: "simple-icons:microsoftazure", style: { color: "#0078D4" }, link: "https://azure.microsoft.com/" },
        { skillName: "Azure Databricks", fontAwesomeClassname: "simple-icons:databricks", style: { color: "#FF3621" }, link: "https://learn.microsoft.com/en-us/azure/databricks/" },
        { skillName: "Amazon S3", fontAwesomeClassname: "simple-icons:amazonaws", style: { color: "#FF9900" }, link: "https://aws.amazon.com/s3/" },
        { skillName: "AWS Lambda", fontAwesomeClassname: "simple-icons:amazonaws", style: { color: "#FF9900" }, link: "https://aws.amazon.com/lambda/" },
        { skillName: "Azure Machine Learning", fontAwesomeClassname: "simple-icons:microsoftazure", style: { color: "#0078D4" }, link: "https://azure.microsoft.com/en-in/products/machine-learning/" },
        { skillName: "Azure Blob Storage", fontAwesomeClassname: "simple-icons:microsoftazure", style: { color: "#0078D4" }, link: "https://azure.microsoft.com/en-us/products/storage/blobs/" },
        { skillName: "AWS CloudWatch", fontAwesomeClassname: "simple-icons:amazonaws", style: { color: "#FF9900" }, link: "https://aws.amazon.com/cloudwatch/" },
        { skillName: "Amazon SageMaker", fontAwesomeClassname: "simple-icons:amazonaws", style: { color: "#FF9900" }, link: "https://aws.amazon.com/sagemaker/" },
        { skillName: "Azure Cognitive Services", fontAwesomeClassname: "simple-icons:microsoftazure", style: { color: "#0078D4" }, link: "https://azure.microsoft.com/en-us/products/cognitive-services/" },
        { skillName: "Azure Key Vault", fontAwesomeClassname: "simple-icons:microsoftazure", style: { color: "#0078D4" }, link: "https://azure.microsoft.com/en-us/products/key-vault/" },
        { skillName: "Azure Document Intelligence", fontAwesomeClassname: "simple-icons:microsoftazure", style: { color: "#0078D4" }, link: "https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/" },
      ],
    },
    {
      title: "AI / ML Foundations",
      fileName: "DataScienceImg",
      skills: [
        "⚡ NLP, Computer Vision, and OCR pipelines for enterprise document processing",
        "⚡ Model selection, benchmarking, and optimization for production workloads",
        "⚡ Supervised & unsupervised learning: classification, regression, clustering, and ensemble methods",
        "⚡ Deep learning architectures including CNNs, RNNs, and LSTMs for sequence and vision tasks",
        "⚡ Feature engineering, model evaluation, and performance tuning for production ML systems",
        "⚡ Transfer learning and fine-tuning for domain-specific AI applications",
      ],
      softwareSkills: [
        { skillName: "TensorFlow", fontAwesomeClassname: "simple-icons:tensorflow", style: { color: "#FF6F00" }, link: "https://www.tensorflow.org/" },
        { skillName: "PyTorch", fontAwesomeClassname: "simple-icons:pytorch", style: { color: "#EE4C2C" }, link: "https://pytorch.org/" },
        { skillName: "Scikit-Learn", fontAwesomeClassname: "simple-icons:scikitlearn", style: { color: "#F7931E" }, link: "https://scikit-learn.org/" },
        { skillName: "HuggingFace", fontAwesomeClassname: "simple-icons:huggingface", style: { color: "#FFD21E" }, link: "https://huggingface.co/" },
        { skillName: "PaddleOCR", fontAwesomeClassname: "simple-icons:opencv", style: { color: "#5C3EE8" }, link: "https://github.com/PaddlePaddle/PaddleOCR" },
        { skillName: "Pandas", fontAwesomeClassname: "simple-icons:pandas", style: { color: "#6366F1" }, link: "https://pandas.pydata.org/" },
        { skillName: "NumPy", fontAwesomeClassname: "simple-icons:numpy", style: { color: "#4DABCF" }, link: "https://numpy.org/" },
        { skillName: "Jupyter", fontAwesomeClassname: "simple-icons:jupyter", style: { color: "#F37626" }, link: "https://jupyter.org/" },
        { skillName: "XGBoost", fontAwesomeClassname: "simple-icons:xgboost", style: { color: "#EC4E20" }, link: "https://xgboost.readthedocs.io/" },
        { skillName: "NLTK", fontAwesomeClassname: "simple-icons:python", style: { color: "#3776AB" }, link: "https://www.nltk.org/" },
        { skillName: "Matplotlib", fontAwesomeClassname: "simple-icons:plotly", style: { color: "#3F4F75" }, link: "https://matplotlib.org/" },
        { skillName: "Seaborn", fontAwesomeClassname: "simple-icons:python", style: { color: "#4C72B0" }, link: "https://seaborn.pydata.org/" },
      ],
    },
  ],
};
