// ─────────────────────────────────────────────────────────
// SKILLS — grouped by engineering domain, signal-dense
// ─────────────────────────────────────────────────────────

// Skills page data (consumed by SkillsPage.jsx)
export const skillsPageData = {
  title: "Technical Skills",
  subtitle: "Systems-level engineering across the AI stack — from LLM orchestration to production infrastructure.",
  skills: [
    {
      title: "GenAI / LLM Systems",
      skills: [
        "Agentic Workflows (RAG, Planning, Feedback Loops)",
        "Multi-Stage LLM Pipelines & Structured Output",
        "Document Intelligence (OCR + LLM Reasoning)",
        "LangChain · LangGraph · CrewAI",
        "Prompt Engineering & Chain-of-Thought",
        "Pydantic Schema Enforcement",
      ],
    },
    {
      title: "AI / ML Foundations",
      skills: [
        "NLP & Computer Vision",
        "Model Evaluation & Selection",
        "LLM Evaluation (Factuality, Completeness)",
        "TensorFlow · PyTorch · Scikit-Learn",
        "Fine-Tuning & Transfer Learning",
      ],
    },
    {
      title: "Data Engineering & Cloud",
      skills: [
        "ETL Pipelines (Databricks, PySpark)",
        "Vector Databases (Milvus, FAISS)",
        "AWS (EC2, S3, Lambda)",
        "Docker & Containerized Deployment",
        "Schema Normalization & Data Quality",
      ],
    },
    {
      title: "Backend & Infrastructure",
      skills: [
        "FastAPI · Flask",
        "REST API Design",
        "PostgreSQL · MongoDB · SQL Server",
        "Git · CI/CD Pipelines",
        "Selenium · Playwright (Browser Automation)",
      ],
    },
  ],
};

// Skills section data (consumed by Skills containers)
export const skills = {
  data: [
    {
      title: "GenAI / LLM Systems",
      fileName: "FullStackImg",
      skills: [
        "⚡ Designing agentic workflows with RAG retrieval, planning layers, and feedback loops",
        "⚡ Building multi-stage LLM pipelines with validation gates and structured output enforcement",
        "⚡ Architecting document intelligence systems combining OCR + LLM reasoning + canonical validation",
      ],
      softwareSkills: [
        {
          skillName: "Python",
          fontAwesomeClassname: "simple-icons:python",
          style: { color: "#3776AB" },
        },
        {
          skillName: "OpenAI",
          fontAwesomeClassname: "simple-icons:openai",
          style: { color: "#412991" },
        },
        {
          skillName: "LangChain",
          fontAwesomeClassname: "simple-icons:langchain",
          style: { color: "#1C3C3C" },
        },
        {
          skillName: "LangGraph",
          fontAwesomeClassname: "simple-icons:langchain",
          style: { color: "#1C3C3C" },
        },
        {
          skillName: "FastAPI",
          fontAwesomeClassname: "simple-icons:fastapi",
          style: { color: "#009688" },
        },
        {
          skillName: "Pydantic",
          fontAwesomeClassname: "simple-icons:pydantic",
          style: { color: "#E92063" },
        },
      ],
    },
    {
      title: "Data Engineering & Cloud",
      fileName: "CloudInfraImg",
      skills: [
        "⚡ Building scalable ETL pipelines with Databricks, PySpark, and schema normalization",
        "⚡ Deploying containerized AI systems on AWS with Docker and FastAPI",
        "⚡ Implementing vector database solutions (Milvus, FAISS) for semantic retrieval",
      ],
      softwareSkills: [
        {
          skillName: "AWS",
          fontAwesomeClassname: "simple-icons:amazonaws",
          style: { color: "#FF9900" },
        },
        {
          skillName: "Databricks",
          fontAwesomeClassname: "simple-icons:databricks",
          style: { color: "#FF3621" },
        },
        {
          skillName: "PySpark",
          fontAwesomeClassname: "simple-icons:apachespark",
          style: { color: "#E25A1C" },
        },
        {
          skillName: "Docker",
          fontAwesomeClassname: "simple-icons:docker",
          style: { color: "#2496ED" },
        },
        {
          skillName: "Milvus",
          fontAwesomeClassname: "simple-icons:milvus",
          style: { color: "#00A1EA" },
        },
        {
          skillName: "SQL",
          fontAwesomeClassname: "simple-icons:postgresql",
          style: { color: "#336791" },
        },
      ],
    },
    {
      title: "AI / ML Foundations",
      fileName: "DataScienceImg",
      skills: [
        "⚡ NLP, Computer Vision, and OCR systems for enterprise document processing",
        "⚡ Model evaluation, selection, and performance optimization for production workloads",
        "⚡ LLM evaluation frameworks: factuality, completeness, and output quality scoring",
      ],
      softwareSkills: [
        {
          skillName: "TensorFlow",
          fontAwesomeClassname: "logos-tensorflow",
          style: { backgroundColor: "transparent" },
        },
        {
          skillName: "PyTorch",
          fontAwesomeClassname: "logos-pytorch",
          style: { backgroundColor: "transparent" },
        },
        {
          skillName: "Scikit-Learn",
          fontAwesomeClassname: "simple-icons:scikitlearn",
          style: { color: "#F7931E" },
        },
        {
          skillName: "Pandas",
          fontAwesomeClassname: "simple-icons:pandas",
          style: { color: "#150458" },
        },
      ],
    },
  ],
};
