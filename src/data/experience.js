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
            "Redesigned a scanned prior-authorization intake fax extraction system into a 4-pass, confidence-aware pipeline that processed 100+ healthcare documents per run, handled 117 fields, and improved extraction accuracy from ~80-81% to 90%+.",
            "Used paired proof-of-concepts to isolate failure sources across Azure Content Understanding OCR, analyzer prompts, and multimodal extraction by comparing raw OCR markdown ingestion against direct PDF-as-image LLM extraction.",
            "Productionized targeted retries for low-confidence fields (<0.78), grouped 117 fields into 7 batches for context control, added token-capping and confidence-aware merge logic, and routed checkbox-heavy fields through vision fallback paths.",
            "Improved health-policy entity extraction accuracy from 90% to 99% through model migration across GPT and Gemini systems, prompt refinement, structured-output contracts, and canonical-comparison evaluation.",
            "Benchmarked DeepSeek-OCR, GLM-OCR, PaddleOCR-VL-1.5, and cloud OCR stacks for privacy-sensitive healthcare document scenarios to expand on-prem and lower-lock-in design options.",
            "Engineered a Milvus-backed RAG layer for multi-agent reasoning workflows that improved task completion from 38% to 80% by strengthening retrieval quality, orchestration, and evaluation discipline.",
            "Reduced browser-agent prompt-token usage by ~40% with a Playwright MCP-based tool design that replaced DOM-heavy context with accessibility-tree snapshots and JPEG-compressed observations.",
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
