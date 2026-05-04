/**
 * Experience Data
 *
 * Professional work history rendered by ExperienceAccordion.jsx.
 * Each section (e.g. "Work") contains an array of experience entries
 * with descriptions displayed as bullet lists.
 *
 * Logo SVGs are resolved from public/images/.
 */
export const experience = {
  title: "Experience",
  subtitle: "Systems Built · Impact Delivered",
  description:
    "Building production GenAI systems across healthcare, prior authorization, document intelligence, and workflow automation for Deloitte US-India and Cognizant delivery teams.",
  sections: [
    {
      title: "Work",
      experiences: [
        {
          title: "GenAI Engineer",
          company: "Deloitte US-India",
          companyUrl: "https://www2.deloitte.com/",
          logoPath: "deloitte_logo.svg",
          duration: "July 2025 – Present",
          location: "Gurugram, India",
          descriptions: [
            "Designed and delivered an intelligent document processing pipeline for unstructured health insurance policy documents supporting prior authorization workflows using PaddleOCR, layout-aware parsing, and LLM reasoning over policy clauses.",
            "Improved health-policy entity extraction accuracy from ~90% with a GPT-5.1 baseline to 99% on internal evaluations by moving to Gemini-3-Pro and adding a canonical-comparison validation loop.",
            "Contributed to a prior-authorization automation solution on Azure Databricks using Azure Content Understanding with GPT-4.1, then led the migration to GPT-5.2 to improve extraction accuracy and reduce hallucinations.",
            "Delivered an OpenAI Computer-Using Agent for a healthcare client to automate manual web workflows, deployed in Docker on AWS with a streamed human-in-the-loop interface for reviewer oversight, execution monitoring, and QA.",
            "Raised task completion on SOP-driven benchmark workflows from 38% to ~80% by adding a Milvus-backed RAG layer that grounded the agent in retrieved standard operating procedures.",
            "Built a Playwright-based MCP automation tool that used accessibility-tree snapshots instead of raw DOM context, reducing prompt-token usage by ~40% in internal testing.",
            "Built Databricks ETL pipelines in PySpark and Python for schema mapping, key reconciliation, and multi-table joins that supported downstream healthcare analytics and reporting.",
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
            "Developed warranty-claim classification models on Azure Databricks for an automotive client, improving recall and reducing manual review effort.",
            "Built a B2B conversational assistant using AWS Lex and Azure OpenAI to parse unstructured product orders and trigger reordering workflows through AWS Lambda.",
            "Improved reliability of Python services on Azure App Services by resolving timeout bottlenecks and shifting backend tasks to AWS Lambda and Amazon S3.",
            "Created Power BI dashboards to track model performance and business KPIs for cross-functional stakeholders.",
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
            "Supported object-detection model development using CNN-based approaches, including code optimization and error analysis.",
            "Implemented regression and classification models on varied datasets and contributed to feature-engineering experiments that improved baseline performance.",
          ],
          color: "#fc1f20",
        }
      ],
    },
  ],
};
