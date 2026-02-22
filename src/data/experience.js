export const experience = {
  title: "Experience",
  subtitle: "Systems Built · Impact Delivered",
  description:
    "Designing and deploying production-grade GenAI systems in US Healthcare & Insurance — document intelligence, agentic automation, and data engineering at enterprise scale.",
  headerImagePath: "experience.svg",
  sections: [
    {
      title: "Work",
      experiences: [
        {
          title: "GenAI Engineer",
          company: "Deloitte",
          companyUrl: "https://www2.deloitte.com/",
          logoPath: "deloitte_logo.svg",
          duration: "July 2025 – Present",
          location: "Gurugram, India",
          descriptions: [
            "Architected an Intelligent Document Processing pipeline for insurance policies — 2-stage OCR + LLM extraction with canonical validation, improving accuracy from ~90% to ~99% across complex multi-column, table-heavy scanned documents.",
            "Designed a RAG-grounded Computer-Using Agent with SOP-based procedural planning, improving UI automation task success rate from ~38% to ~80% for enterprise workflows.",
            "Built scalable data ingestion pipelines on Databricks using PySpark — unified fragmented multi-source datasets into consolidated analytics-ready tables with schema normalization.",
            "Implemented validation frameworks treating LLM outputs as unverified signals — canonical comparison loops, confidence thresholds, and Pydantic schema enforcement for production trustworthiness.",
            "Deployed containerized agentic systems on AWS with Docker — FastAPI serving layer, execution telemetry, and reproducible deployment pipelines."
          ],
          color: "#000000",
        },
        {
          title: "Associate Data Scientist",
          company: "Cognizant Technology Solutions",
          companyUrl: "https://www.cognizant.com/",
          logoPath: "cognizant_logo.svg",
          duration: "Sep 2022 - May 2025",
          location: "Noida, India",
          descriptions: [
            "Built warranty analytics prediction system using Random Forest models on Azure Databricks — reduced defect detection lag for manufacturing client.",
            "Developed enterprise conversational AI systems using AWS Lex + Azure OpenAI with intent routing and context management.",
            "Designed KPI tracking dashboards in Power BI providing real-time operational visibility for cross-functional stakeholders.",
            "Led cross-team CI/CD deployments using GitLab and Azure pipelines — standardized release workflows across engineering teams.",
          ],
          color: "#0033a0",
        },
        {
          title: "Machine Learning Engineer Intern",
          company: "AiEnsured",
          companyUrl: "https://aiensured.com/",
          logoPath: "aiensured_logo.svg",
          duration: "Jul 2021 - Aug 2021",
          location: "Remote, India",
          descriptions: [
            "Built computer vision models for manufacturing defect detection using YOLOv5 — optimized inference latency for edge deployment.",
          ],
          color: "#fc1f20",
        }
      ],
    },
  ],
};
