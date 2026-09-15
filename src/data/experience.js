/**
 * Experience Data
 *
 * Professional work history rendered as a chronological role timeline.
 * Roles use either description bullets or featured context, contributions,
 * outcomes and disclosure fields. Keep team results distinct from personal work.
 *
 * Logo SVGs are resolved from public/images/.
 */
export const warrantyOutcome = {
  metric: "79% to 88%",
  label: "Warranty-classifier recall",
  context: "Cognizant warranty workflow; reported internal classifier evaluation.",
};

export const careerStages = [
  { title: "ML, NLP & data science", period: "Sep 2022 – Dec 2024", description: "At Cognizant, I worked on warranty-claim classification and NLP processing: retraining and tuning Random Forest, comparing XGBoost, migrating LUIS to Azure CLU, and building analytics and drift dashboards." },
  { title: "Conversational AI", period: "Jan – May 2025", description: "At Cognizant, I built a conversational B2B reordering workflow for an FMCG engagement using AWS Lex, Azure OpenAI, AWS Lambda, and Amazon S3." },
  { title: "GenAI & agentic AI", period: "Jul 2025 – Present", description: "At Deloitte, I build document-processing pipelines, retrieval systems, and agentic workflows. My work spans grouped extraction, confidence-aware validation, Milvus retrieval, browser-agent context, and healthcare integrity analytics." },
];

export const careerProgression = {
  label: "Career progression",
  title: "Data science → Conversational AI → GenAI & agentic AI",
  introduction: "I started with production machine learning and NLP, then moved into conversational systems, document AI, and agentic workflows. Evaluation and operational reliability have remained part of that work throughout.",
};

export const experience = {
  eyebrow: "Professional experience",
  title: "LLM architectures and event-driven cloud systems.",
  description:
    "At Deloitte, I built a production prior-authorization pipeline using Azure Databricks, Azure Content Understanding, and Azure OpenAI. At Cognizant, I improved an existing warranty system through Random Forest retraining, NLP migration, dashboards, and event-driven processing. These projects shaped how I handle document complexity, model evaluation, and service reliability.",
  sections: [
    {
      title: "Work",
      experiences: [
        {
          title: "AI & Data Science Engineer",
          company: "Deloitte US-India",
          companyUrl: "https://www2.deloitte.com/",
          logoPath: "deloitte_logo.svg",
          duration: "July 2025 – Present",
          location: "Gurugram, India",
          projectGroups: [
            {
              id: "prior-authorization",
              title: "Prior-authorization document processing",
              context: "Healthcare document processing with Azure Databricks, Azure Content Understanding, and Azure OpenAI, from fax intake and classification to extraction, validation, routing, and recovery. The grouped extraction revision went live in production in September 2026.",
              story: {
                problem: "A large U.S. healthcare payer needed to turn incoming fax packets into usable operational data. Handwriting, nonstandard forms, business rules, and a 117-field schema made extraction difficult. Requesting every field in one call also created context-management problems.",
                finding: "I found values in Azure Content Understanding's Markdown that its structured extraction had omitted or hallucinated. We changed the approach to use CU for Markdown generation, then extract fields through separate Azure OpenAI calls.",
                decisions: [
                  "Designed the production revision around seven calls grouping related fields, replacing one call requesting all 117 fields.",
                  "Designed confidence-aware four-pass extraction, retries, and validation, preserving explicit routing and recovery outcomes.",
                  "Migrated GPT-4.1 to GPT-5.2 and rewrote prompts for the new model, using manual review and regression tests to check changes.",
                  "Kept classification and extraction as separate stages: classify authorization type and urgency first, then extract the eligible new-authorization category. Produce RPA-ready CSV/JSON and annotated PDFs."
                ],
                lesson: "I learned to research existing solutions before choosing an approach and to inspect intermediate evidence when results fail. I weigh model quality against cost. Early manual review, context management, stronger prompt instructions, and regression tests help me check changes consistently."
              },
              outcomes: [
                {
                  metric: "95%+",
                  label: "Fax-classification accuracy",
                  context: "Across 500-file bulk batches, per internal evaluation."
                },
                {
                  metric: "80–81% to 92%+",
                  label: "Structured-extraction accuracy",
                  context: "Improved extraction accuracy from 80–81% to 92%+ in internal evaluation. Extraction was tested in recurring 100-file runs."
                }
              ]
            },
            {
              id: "healthcare-integrity",
              title: "Healthcare integrity and fraud analytics",
              context: "Three separate projects covering document integrity, out-of-network claims, and referral patterns.",
              contributions: [
                "Partnered with clinical, operational, and business stakeholders to map workflows and document PHI-aware solution designs, delivery risks, and implementation guidance."
              ],
              subprojects: [
                {
                  title: "Document integrity and fraud detection",
                  description: "Built a seven-agent LangGraph and GPT-4o Vision workflow combining visual, metadata, and semantic checks with NPI/EIN identifier validation and rule-based 0–100 scoring over collected findings. Used Streamlit for evidence review and reporting."
                },
                {
                  title: "Out-of-network claims analytics",
                  description: "Developed claims-analysis dashboards with deterministic risk signals, evidence review, and investigator-facing reporting."
                },
                {
                  title: "Referral-pattern analytics",
                  description: "Developed referral-pattern analysis with agentic orchestration, approval gates, evidence review, and report generation."
                }
              ]
            },
            {
              id: "computer-use",
              title: "Computer-use and multi-agent reasoning",
              context: "A computer-use workflow combining retrieval for multi-agent reasoning with more efficient browser observations.",
              contributions: [
                "Contributed Milvus retrieval, reranking, and failure-aware routing to a computer-use workflow.",
                "Built a Playwright MCP tool using accessibility-tree snapshots and compressed-vision context in place of raw DOM observations."
              ],
              outcomes: [
                {
                  metric: "38% to 80%",
                  label: "Browser task completion",
                  context: "Across the same 200-task internal evaluation."
                },
                {
                  metric: "~40% lower",
                  label: "Browser-agent prompt-token use",
                  context: "Measured in an internal evaluation."
                }
              ]
            },
            {
              id: "policy-entity-extraction",
              title: "Policy-entity extraction",
              context: "Structured policy-entity extraction for care-management decision support.",
              contributions: [
                "Iterated prompts, implemented canonical comparison, and expanded evaluation for policy-entity extraction."
              ],
              outcomes: [
                {
                  metric: "90% to 99%",
                  label: "Policy-entity extraction accuracy",
                  context: "On the same internal benchmark."
                }
              ]
            }
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
          story: {
            id: "warranty-processing",
            title: "Warranty decisions, NLP processing, and operational monitoring",
            problem: "An automotive warranty workflow needed to identify legitimate claims while handling changing data and live service load. Missing a legitimate claim had a higher business cost than an incorrect payment or additional review. The workflow handled 1,800–2,200 claims per weekday and approximately 1,000 per weekend day.",
            finding: "The Random Forest classifier was already in production. I retrained it with newer data and tuned hyperparameters, then compared XGBoost with the existing model. XGBoost did not outperform Random Forest, so we retained Random Forest. In the same project, the FastAPI NLP service encountered HTTP 504 timeouts under load against a 30-second SLA.",
            decisions: [
              "Prioritized recall to reduce false negatives: legitimate claims that the classifier missed. The reported 79% to 88% recall result applies to the warranty classifier, not an independently measured NLP-only subset.",
              "Kept standard tabular scoring and more demanding NLP processing as distinct paths. Migrated legacy LUIS intent and entity processing to Azure Conversational Language Understanding.",
              "Moved expensive processing out of the Azure App Service request path: intake writes payloads to Azure Blob Storage, and Azure Functions perform downstream processing. An acceptance response acknowledges intake, not completed processing.",
              "Built dashboards for analytics, model behavior, and drift so operational feedback could inform subsequent training and investigation.",
            ],
            lesson: "This work taught me to choose evaluation metrics around the business cost of each error. Async I/O alone does not remove expensive processing from a request path. Separating ingestion from downstream work and monitoring both the model and service mattered to production delivery.",
          },
          systemContext: [
            "The warranty classifier, NLP service, and analytics/drift dashboards were parts of one automotive claims project.",
            "A separate FMCG engagement involved a conversational B2B reordering workflow.",
          ],
          contributions: [
            "Retrained and tuned the existing Random Forest on Azure Databricks; compared XGBoost and retained Random Forest based on results.",
            "Built Power BI dashboards and helped decouple warranty NLP processing using Azure Functions and Blob Storage.",
            "For the separate FMCG project, built a B2B conversational workflow using AWS Lex, Azure OpenAI, AWS Lambda, and Amazon S3.",
          ],
          outcomes: [warrantyOutcome],
          disclosureNote: "These are team and system results from internal employer evaluations. The recall result and claim volumes describe the warranty workflow. Infrastructure improvements are qualitative; no acknowledgement-time, CPU, zero-timeout, or universal SLA claim is made. Client identity, records, internal endpoints, and financial rules are omitted.",
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
