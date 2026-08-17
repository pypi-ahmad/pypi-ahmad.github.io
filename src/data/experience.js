/**
 * Experience Data
 *
 * Professional work history rendered as a chronological role timeline.
 * Each section (e.g. "Work") contains an array of experience entries
 * with descriptions displayed as bullet lists.
 *
 * Logo SVGs are resolved from public/images/.
 */
export const experience = {
  eyebrow: "Professional experience",
  title: "Building and evaluating applied AI systems.",
  description:
    "Applied AI engineering across healthcare document processing, retrieval, evaluation, agentic analysis, and production data workflows.",
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
          systemContext: [
            "Enterprise healthcare document-processing workflows using Azure Databricks and Azure Content Understanding for intake, classification, structured extraction, validation, routing, and operational recovery.",
            "Document-integrity analysis prototypes using LangGraph and Streamlit to coordinate specialist checks, evidence aggregation, review, and reporting.",
            "Healthcare claims and referral analytics prototypes combining deterministic detectors, agentic orchestration, human approval, and investigator-facing reporting.",
          ],
          contributions: [
            "Contributed Milvus retrieval, reranking, and failure-aware routing to a computer-use workflow.",
            "Replaced raw DOM observations with accessibility-tree snapshots and compressed observations for more efficient browser-agent context.",
            "Implemented multi-pass extraction, confidence-aware retries, and routing for structured document processing.",
            "Iterated prompts, implemented canonical comparison, and expanded evaluation for policy-entity extraction.",
            "Contributed to document-processing workflows spanning typed extraction, validation, confidence handling, failure recovery, and traceable status transitions.",
            "Contributed to LangGraph and Streamlit prototypes for document integrity and claims/referral analytics, including approval gates, evidence review, and report generation.",
          ],
          outcomes: [
            {
              metric: "38% to 80%",
              label: "Browser task completion",
              context: "Across the same 200-task internal evaluation.",
            },
            {
              metric: "~40% lower",
              label: "Browser-agent prompt-token use",
              context: "Measured in an internal evaluation.",
            },
            {
              metric: "80–81% to above 90%",
              label: "Structured-extraction accuracy",
              context: "On the same internal benchmark.",
            },
            {
              metric: "90% to 99%",
              label: "Policy-entity extraction accuracy",
              context: "On the same internal benchmark.",
            },
          ],
          disclosureNote:
            "These are team and system results from internal employer evaluations. Client names, internal project names, source data, task definitions, prompts, schemas, thresholds, scoring details, and proprietary code are omitted; related public projects do not reproduce these measurements.",
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
