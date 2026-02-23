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
        { skillName: "FastAPI", fontAwesomeClassname: "simple-icons:fastapi", style: { color: "#009688" }, link: "https://fastapi.tiangolo.com/" },
        { skillName: "Pydantic", fontAwesomeClassname: "simple-icons:pydantic", style: { color: "#E92063" }, link: "https://docs.pydantic.dev/" },
        { skillName: "Streamlit", fontAwesomeClassname: "simple-icons:streamlit", style: { color: "#FF4B4B" }, link: "https://streamlit.io/" },
      ],
    },
    {
      title: "AI / ML Foundations",
      softwareSkills: [
        { skillName: "TensorFlow", fontAwesomeClassname: "simple-icons:tensorflow", style: { color: "#FF6F00" }, link: "https://www.tensorflow.org/" },
        { skillName: "PyTorch", fontAwesomeClassname: "simple-icons:pytorch", style: { color: "#EE4C2C" }, link: "https://pytorch.org/" },
        { skillName: "Scikit-Learn", fontAwesomeClassname: "simple-icons:scikitlearn", style: { color: "#F7931E" }, link: "https://scikit-learn.org/" },
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
        { skillName: "Docker", fontAwesomeClassname: "simple-icons:docker", style: { color: "#2496ED" }, link: "https://www.docker.com/" },
        { skillName: "PostgreSQL", fontAwesomeClassname: "simple-icons:postgresql", style: { color: "#4169E1" }, link: "https://www.postgresql.org/" },
        { skillName: "MongoDB", fontAwesomeClassname: "simple-icons:mongodb", style: { color: "#47A248" }, link: "https://www.mongodb.com/" },
        { skillName: "Redis", fontAwesomeClassname: "simple-icons:redis", style: { color: "#DC382D" }, link: "https://redis.io/" },
      ],
    },
    {
      title: "Backend & Infrastructure",
      softwareSkills: [
        { skillName: "FastAPI", fontAwesomeClassname: "simple-icons:fastapi", style: { color: "#009688" }, link: "https://fastapi.tiangolo.com/" },
        { skillName: "Flask", fontAwesomeClassname: "simple-icons:flask", style: { color: "#61DAFB" }, link: "https://flask.palletsprojects.com/" },
        { skillName: "Git", fontAwesomeClassname: "simple-icons:git", style: { color: "#F05032" }, link: "https://git-scm.com/" },
        { skillName: "Linux", fontAwesomeClassname: "simple-icons:linux", style: { color: "#FCC624" }, link: "https://www.kernel.org/" },
        { skillName: "Selenium", fontAwesomeClassname: "simple-icons:selenium", style: { color: "#43B02A" }, link: "https://www.selenium.dev/" },
        { skillName: "SQL Server", fontAwesomeClassname: "simple-icons:microsoftsqlserver", style: { color: "#CC2927" }, link: "https://www.microsoft.com/sql-server" },
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
        "⚡ Building multi-stage LLM pipelines with validation gates and structured output enforcement",
        "⚡ Architecting document intelligence systems combining OCR + LLM reasoning + canonical validation",
      ],
      softwareSkills: [
        { skillName: "Python", fontAwesomeClassname: "simple-icons:python", style: { color: "#3776AB" }, link: "https://www.python.org/" },
        { skillName: "OpenAI", fontAwesomeClassname: "simple-icons:openai", style: { color: "#74AA9C" }, link: "https://openai.com/" },
        { skillName: "LangChain", fontAwesomeClassname: "simple-icons:langchain", style: { color: "#1C3C3C" }, link: "https://www.langchain.com/" },
        { skillName: "FastAPI", fontAwesomeClassname: "simple-icons:fastapi", style: { color: "#009688" }, link: "https://fastapi.tiangolo.com/" },
        { skillName: "Pydantic", fontAwesomeClassname: "simple-icons:pydantic", style: { color: "#E92063" }, link: "https://docs.pydantic.dev/" },
        { skillName: "Streamlit", fontAwesomeClassname: "simple-icons:streamlit", style: { color: "#FF4B4B" }, link: "https://streamlit.io/" },
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
        { skillName: "AWS", fontAwesomeClassname: "simple-icons:amazonaws", style: { color: "#FF9900" }, link: "https://aws.amazon.com/" },
        { skillName: "Databricks", fontAwesomeClassname: "simple-icons:databricks", style: { color: "#FF3621" }, link: "https://www.databricks.com/" },
        { skillName: "Apache Spark", fontAwesomeClassname: "simple-icons:apachespark", style: { color: "#E25A1C" }, link: "https://spark.apache.org/" },
        { skillName: "Docker", fontAwesomeClassname: "simple-icons:docker", style: { color: "#2496ED" }, link: "https://www.docker.com/" },
        { skillName: "PostgreSQL", fontAwesomeClassname: "simple-icons:postgresql", style: { color: "#4169E1" }, link: "https://www.postgresql.org/" },
        { skillName: "MongoDB", fontAwesomeClassname: "simple-icons:mongodb", style: { color: "#47A248" }, link: "https://www.mongodb.com/" },
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
        { skillName: "TensorFlow", fontAwesomeClassname: "simple-icons:tensorflow", style: { color: "#FF6F00" }, link: "https://www.tensorflow.org/" },
        { skillName: "PyTorch", fontAwesomeClassname: "simple-icons:pytorch", style: { color: "#EE4C2C" }, link: "https://pytorch.org/" },
        { skillName: "Scikit-Learn", fontAwesomeClassname: "simple-icons:scikitlearn", style: { color: "#F7931E" }, link: "https://scikit-learn.org/" },
        { skillName: "Pandas", fontAwesomeClassname: "simple-icons:pandas", style: { color: "#6366F1" }, link: "https://pandas.pydata.org/" },
        { skillName: "NumPy", fontAwesomeClassname: "simple-icons:numpy", style: { color: "#4DABCF" }, link: "https://numpy.org/" },
        { skillName: "Jupyter", fontAwesomeClassname: "simple-icons:jupyter", style: { color: "#F37626" }, link: "https://jupyter.org/" },
      ],
    },
  ],
};
