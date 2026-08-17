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
    "Applied AI engineering across Document AI, RAG, evaluation, agentic systems, and production data workflows.",
  sections: [
    {
      title: "Work",
      experiences: [
        {
          title: "AI and Data Science Engineer",
          company: "Deloitte US-India",
          companyUrl: "https://www2.deloitte.com/",
          logoPath: "deloitte_logo.svg",
          duration: "July 2025 – Present",
          location: "Gurugram, India",
          descriptions: [
            "Contributed Milvus retrieval, reranking, and failure-aware routing to a computer-use system whose task completion increased from 38% to 80% across the same 200-task internal evaluation.",
            "Replaced raw DOM observations with accessibility-tree snapshots and compressed observations; prompt-token consumption fell by approximately 40% in an internal evaluation.",
            "Implemented multi-pass extraction, confidence-aware retries, and routing for a document pipeline whose structured-extraction accuracy increased from 80–81% to above 90% on the same internal benchmark.",
            "Iterated prompts, implemented canonical comparison, and expanded evaluation for a policy-entity workflow whose accuracy increased from 90% to 99% on the same internal benchmark.",
            "Built and evaluated healthcare Document AI, retrieval, multimodal extraction, and human-review workflows with typed outputs, deterministic safeguards, and traceable operational states.",
            "These are team and system results from confidential employer evaluations. Client names, source data, task definitions, prompts, schemas, scoring details, and proprietary code are omitted; related public projects do not reproduce these measurements.",
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
