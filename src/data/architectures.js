export const architectures = [
  {
    id: "prior-authorization",
    title: "Prior-authorization document processing",
    subtitle: "Document classification, grouped extraction, and validation for healthcare operations.",
    systemLabel: "Azure Databricks orchestration",
    paths: [{ label: "Eligible-document path", steps: ["Fax documents", "Type and urgency classification", "Eligible authorization documents", "Azure Content Understanding Markdown", "Grouped Azure OpenAI extraction", "Validation and business rules", "Structured output or review outcome"] }],
    notes: [
      "Extraction covers 117 fields across seven related groups. Confidence-aware four-pass extraction and retries support extraction and validation; individual passes are not shown.",
      "Other document categories follow separate routing.",
      "System outputs include RPA-ready CSV/JSON and annotated PDFs; their individual generation paths are not shown.",
    ],
  },
  {
    id: "computer-use",
    title: "Computer-use and multi-agent reasoning",
    subtitle: "Retrieved knowledge and browser observations supply context for agent reasoning.",
    paths: [
      { label: "Retrieved knowledge", steps: ["Milvus retrieval", "Reranking", "Retrieved context"] },
      { label: "Browser observations", steps: ["Playwright MCP", "Accessibility-tree snapshots and compressed-vision context"] },
    ],
    convergence: "Agent reasoning",
    notes: ["Both context paths feed agent reasoning. The workflow also uses failure-aware routing, whose control flow is not shown here."],
  },
  {
    id: "warranty-processing",
    title: "Warranty classification and NLP processing",
    subtitle: "Separate standard claim scoring from NLP processing and offloaded data work.",
    systemLabel: "Incoming claims → routing",
    paths: [
      { label: "Structured claims", steps: ["Random Forest classifier", "Classification result"] },
      { label: "Complex / free-text claims", steps: ["FastAPI NLP service"], branches: [
        { label: "NLP call from FastAPI", steps: ["Azure CLU"] },
        { label: "Separate processing offload from FastAPI", steps: ["Azure Blob Storage", "Azure Functions", "Validation, transformation, and persistence"] },
      ] },
    ],
    notes: ["Azure CLU calls remain in FastAPI; only the offloaded processing moves through Blob Storage to Functions.", "Analytics and drift dashboards monitor the system. Intake acknowledgement is not processing completion."],
  },
];
