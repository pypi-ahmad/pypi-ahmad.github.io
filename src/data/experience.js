/**
 * Experience Data
 *
 * Professional work history rendered by ExperienceAccordion.jsx.
 * Each section (e.g. "Work") contains an array of experience entries
 * with descriptions displayed as bullet lists.
 *
 * Logo SVGs are resolved from src/assests/images/.
 */
export const experience = {
  title: "Experience",
  subtitle: "Systems Built · Impact Delivered",
  description:
    "Designing and deploying production-grade GenAI systems at Deloitte US-India Offices — document intelligence, agentic automation, and data engineering at enterprise scale.",
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
            "Built a high-precision Intelligent Document Processing (IDP) system for scanned insurance policies — transforming noisy, multi-page, layout-heavy PDFs into structured, schema-aligned outputs using OCR + LLM reasoning.",
            "Improved extraction accuracy from ~90% to ~99% by redesigning the pipeline into a 2-stage architecture: initial LLM extraction followed by canonical document comparison and reconciliation — eliminating silent errors and making outputs enterprise-trustworthy.",
            "Engineered layout-aware document understanding by combining PaddleOCR (with bounding boxes) and LLM-based reasoning — enabling reliable extraction across multi-column formats, tables, and cross-page clauses.",
            "Designed a RAG-grounded Computer-Using Agent (CUA) system to automate business workflows — introducing a planning layer that converts ambiguous user prompts into structured, step-by-step execution plans using SOP retrieval (Milvus).",
            "Increased automation success rate from ~38% to ~80% by shifting from direct prompting to retrieval-grounded procedural planning — significantly improving reliability of UI-based task execution.",
            "Deployed the agent system on AWS with Docker, building a reproducible execution environment and a live demo interface for end-to-end workflow visibility.",
            "Optimized LLM-driven UI automation by integrating Model Context Protocol (MCP) with Playwright — replacing raw DOM parsing with accessibility (AX) tree representations, reducing token usage by ~40% while improving element detection accuracy.",
            "Built Databricks-based data ingestion and consolidation pipelines using PySpark and Pandas — merging multi-source datasets via schema normalization, key-based joins, and transformation logic into analytics-ready tables.",
            "Developing healthcare document intelligence systems on Azure — processing medical fax documents using OCR + layout-aware parsing (Azure Document Intelligence) to extract structured clinical and insurance data and automate downstream workflows.",
            "Established a validation-first engineering approach — treating LLM outputs as untrusted signals and enforcing correctness via structured schemas (Pydantic), comparison loops, and feedback-driven iteration.",
            "Building healthcare document intelligence pipelines for medical fax parsing using Azure Document Intelligence — extracting structured clinical and insurance data from noisy scanned inputs.",
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
