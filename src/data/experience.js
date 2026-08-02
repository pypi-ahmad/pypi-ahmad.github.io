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
    "Building production-grade AI systems across healthcare workflows, document intelligence, multimodal extraction, and agentic retrieval for Deloitte US-India and Cognizant delivery teams.",
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
            "Engineered an AI-assisted prior-authorization document workflow spanning intake, classification, extraction, validation, and traceable operational outcomes on a managed data platform.",
            "Strengthened production reliability with confidence-aware validation, bounded retries, explicit exception routing, audit-state persistence, and reconciliation for incomplete transactions.",
            "Built a multi-stage document-risk triage prototype combining file-integrity checks, visual review, metadata analysis, semantic consistency checks, and session-scoped duplicate detection for evidence-backed reviewer decisions.",
            "Developed a human-in-the-loop claims investigation prototype that used graph analytics to surface referral loops and concentration patterns while keeping sensitive actions behind approval gates.",
            "Prototyped an out-of-network claims analytics dashboard using synthetic or demo-enriched data to explore pricing, specialty, and billing-pattern signals for investigator triage—not adjudication or proof of fraud.",
            "Improved health-policy entity extraction through model evaluation, prompt refinement, structured-output contracts, and canonical-comparison testing.",
            "Evaluated open and cloud OCR stacks for privacy-sensitive healthcare document processing, informing on-premises and lower-lock-in architecture options.",
            "Engineered retrieval-augmented grounding for multi-agent workflows, improving task completion through stronger retrieval, orchestration, and evaluation.",
            "Reduced browser-agent context overhead by replacing DOM-heavy prompts with accessibility-tree snapshots and compressed visual observations.",
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
