// ─────────────────────────────────────────────────────────
// SYSTEMS — FAANG-optimized, signal-dense, recruiter-ready
// Ordered by: system complexity × enterprise impact × metrics
// ─────────────────────────────────────────────────────────

export const systems = {
  // ── FEATURED (top 4 — hero section worthy) ──────────────
  featured: [
    {
      id: "idp_insurance_pipeline",
      name: "Intelligent Document Processing Pipeline",
      tagline: "OCR + LLM extraction with canonical validation for insurance policies",
      category: "Document AI · Enterprise",
      tier: "featured",
      // CARD METRICS — numeric only, recruiter scan layer
      metrics: ["~90% → 99% accuracy", "8-step pipeline", "2-stage LLM validation"],
      description:
        "Architected an end-to-end document intelligence system that extracts structured data from scanned insurance policies using layout-aware OCR, multi-stage LLM reasoning, and canonical validation — achieving 99% accuracy in production.",
      problem_statement:
        "Insurance policy documents were scanned, image-based PDFs with complex multi-column layouts, nested tables, headers/footers, and significant scan noise. No existing OCR solution could reliably produce structured, schema-aligned output. Manual extraction was error-prone and unscalable.",
      solution_overview:
        "Designed a multi-stage pipeline: PaddleOCR with bounding-box metadata for spatial-aware text extraction → LLM-based entity and clause reasoning → schema-aligned JSON generation → second-stage LLM reconciliation against canonical policy documents. Each stage includes validation gates.",
      architecture: [
        "Scanned Policy PDF ingestion",
        "PaddleOCR → text + bounding box + layout metadata extraction",
        "Spatial grounding: region classification (header / body / table / footer)",
        "LLM Stage 1: entity extraction + implicit clause reasoning across pages",
        "Schema-aligned structured JSON generation with field-level confidence",
        "Canonical document retrieval (ground-truth policy templates)",
        "LLM Stage 2: reconciliation — diff extracted vs canonical, flag discrepancies",
        "Validation gate: confidence thresholds + human-in-the-loop escalation",
        "Final validated structured output → downstream systems"
      ],
      tech: ["Python", "PaddleOCR", "GPT-5.1", "Gemini-3-Pro-Preview", "Pydantic"],
      key_features: [
        "Layout-aware OCR with spatial metadata preservation",
        "Cross-page clause-level reasoning via LLM",
        "Two-stage LLM pipeline: extraction → validation",
        "Schema enforcement via Pydantic models",
        "Canonical comparison loop for trustworthiness",
        "Field-level confidence scoring"
      ],
      implementation_details:
        "Extracted OCR output enriched with bounding-box coordinates to preserve document layout semantics. Built region classifier to separate headers, body text, tables, and footers before LLM processing. First LLM stage performs entity extraction with implicit reasoning across distributed clauses. Output normalized into strict Pydantic schemas. Second LLM stage compares extraction against canonical policy templates, flagging discrepancies and reconciling ambiguous fields. Confidence thresholds gate final output quality.",
      challenges_solutions: [
        {
          challenge: "Noisy scans with degraded text quality",
          solution:
            "OCR parameter tuning + layout-grounded region classification before LLM"
        },
        {
          challenge: "Clauses split across multiple pages",
          solution:
            "Cross-page context window with LLM-based implicit reasoning"
        },
        {
          challenge: "No trust baseline for raw LLM outputs",
          solution:
            "Canonical validation layer — compare extraction against known-good documents"
        },
        {
          challenge: "Schema drift across policy versions",
          solution:
            "Pydantic-enforced schemas with version-aware field mapping"
        }
      ],
      impact: [
        "Extraction accuracy improved from ~90% to ~99%",
        "Eliminated silent extraction errors via 2-stage validation",
        "Deployed as enterprise-ready pipeline for US insurance workflows",
        "Reduced manual QA time by ~70%"
      ]
    },
    {
      id: "cua_rag_agent",
      name: "Computer-Using Agent with RAG",
      tagline: "RAG-grounded procedural planning for reliable UI automation",
      category: "Agentic AI · Automation",
      tier: "featured",
      metrics: ["38% → 80% success rate", "SOP-grounded planning", "Dockerized on AWS"],
      description:
        "Designed a retrieval-augmented planning layer that transforms ambiguous user intent into deterministic, step-by-step execution plans grounded in SOP documentation — doubling the task success rate of Computer-Using Agents.",
      problem_statement:
        "Direct prompt-to-action CUA execution achieved only ~38% task success rate. Root causes: ambiguous user instructions, no procedural knowledge, no application-specific context. The agent lacked a mechanism to decompose intent into deterministic execution steps.",
      solution_overview:
        "Designed a RAG-backed planning layer between user intent and CUA execution. SOP documents indexed in Milvus provide procedural grounding. An LLM planner decomposes intent into structured step sequences. CUA executes deterministic steps with state observation feedback loops.",
      architecture: [
        "User prompt ingestion + intent classification",
        "RAG retrieval: Milvus vector search over indexed SOP documentation",
        "Context assembly: relevant procedures + application knowledge",
        "LLM Planner: intent decomposition → ordered step-by-step execution plan",
        "Plan validation: structural checks (completeness, ordering, dependencies)",
        "CUA Agent: step-by-step UI interaction execution",
        "State observation layer: screenshot → action verification",
        "Feedback loop: execution result → next step or retry",
        "Execution telemetry + success/failure logging"
      ],
      tech: ["Python", "OpenAI CUA", "Milvus", "AWS", "Docker", "FastAPI"],
      key_features: [
        "SOP-grounded retrieval-augmented planning",
        "Intent → deterministic step decomposition",
        "State-observation feedback loop per execution step",
        "Plan validation gate before execution",
        "Dockerized reproducible deployment on AWS",
        "Real-time execution demo interface"
      ],
      implementation_details:
        "Indexed internal SOP and application documentation in Milvus using chunk-level embeddings with metadata (section, procedure_id). Built LLM planner that assembles retrieved context into structured execution plans with explicit step ordering and dependency tracking. CUA executes each step, captures UI state via screenshots, and feeds observations back for verification. Plan validation layer checks for structural completeness before execution begins. System containerized in Docker and deployed on AWS with FastAPI serving layer.",
      challenges_solutions: [
        {
          challenge: "Ambiguous user prompts producing unreliable actions",
          solution:
            "RAG grounding: retrieve relevant SOPs to disambiguate intent before planning"
        },
        {
          challenge: "Single-shot execution failure on complex multi-step workflows",
          solution:
            "Step decomposition with state-observation feedback loop per action"
        },
        {
          challenge: "Environment drift between dev and production",
          solution:
            "Docker-based reproducible deployment with pinned dependencies"
        },
        {
          challenge: "No execution visibility or debugging capability",
          solution:
            "Telemetry layer logging each step's input, action, and outcome"
        }
      ],
      impact: [
        "Task success rate improved from ~38% to ~80% (+110% improvement)",
        "Eliminated execution ambiguity for enterprise workflows",
        "Enabled reliable UI automation for complex multi-step procedures",
        "Deployed containerized system on AWS for production demos"
      ]
    },
    {
      id: "autonomous_research_agent",
      name: "Autonomous Research Agent",
      tagline:
        "Multi-agent system with critic-refiner loops and evaluation-driven synthesis",
      category: "Agentic AI · Multi-Agent Systems",
      tier: "featured",
      metrics: [
        "3–5x faster research",
        "5-agent orchestration",
        "Iterative refinement loops"
      ],
      description:
        "Built a multi-agent research system using LangGraph that orchestrates planning, parallel retrieval, synthesis, critique, and iterative refinement — producing grounded, citation-backed reports with measurable quality scoring.",
      problem_statement:
        "Single-pass LLM research produces hallucinated, incomplete outputs with no quality guarantees — no query decomposition, no grounding verification, no iterative improvement mechanism.",
      solution_overview:
        "Designed a 5-agent LangGraph state machine: Planner decomposes queries → Retriever executes parallel search (web + vector store + cache) → Synthesizer drafts structured output → Critic evaluates on factuality, completeness, clarity → Refiner iteratively improves based on scores. Loop continues until quality thresholds are met.",
      architecture: [
        "User research query ingestion",
        "Planner Agent: query decomposition into sub-questions",
        "Tool Router: select retrieval source (web search / FAISS / cache)",
        "Parallel Retrieval: concurrent execution across sources",
        "Document aggregation + deduplication + relevance scoring",
        "Synthesizer Agent: structured draft generation with citations",
        "Critic Agent: multi-metric evaluation (factuality, completeness, clarity)",
        "Decision gate: pass threshold → output / fail → Refiner loop",
        "Refiner Agent: targeted improvement based on Critic feedback",
        "Final structured report with citation links and confidence metadata"
      ],
      tech: [
        "Python",
        "LangGraph",
        "LangChain",
        "Gemini",
        "FastAPI",
        "Streamlit",
        "FAISS"
      ],
      key_features: [
        "5-agent orchestration via LangGraph state machine",
        "Parallel multi-source retrieval with tool routing",
        "Quality-gated critic-refiner feedback loop",
        "Multi-metric evaluation: factuality, completeness, clarity",
        "Citation enforcement in all synthesized outputs",
        "Configurable quality thresholds and max iterations"
      ],
      implementation_details:
        "Built LangGraph state machine with explicit node transitions: plan → retrieve → synthesize → evaluate → refine. Implemented tool routing logic to select between cached results, FAISS vector store, and live web search based on query characteristics. Critic agent scores outputs on three dimensions (0–10 each). If combined score falls below configurable threshold, Refiner agent receives targeted feedback and revisits specific sections. Max iteration bounds prevent infinite loops. All outputs include source citations.",
      challenges_solutions: [
        {
          challenge: "LLM hallucinations in research outputs",
          solution:
            "Grounded retrieval + mandatory citation enforcement on every claim"
        },
        {
          challenge: "Incomplete coverage of complex topics",
          solution:
            "Planner decomposes into sub-questions → parallel retrieval covers all facets"
        },
        {
          challenge:
            "No quality guarantees from single-pass generation",
          solution:
            "Critic-refiner loop with numeric evaluation and threshold gating"
        },
        {
          challenge: "Redundant or low-relevance retrieved documents",
          solution: "Relevance scoring + deduplication before synthesis"
        }
      ],
      impact: [
        "3–5x faster research workflows vs. manual process",
        "Measurably reduced hallucinations via grounding + citation enforcement",
        "Quality-scored outputs with auditable evaluation metrics",
        "Configurable for different research depth requirements"
      ]
    },
    {
      id: "clinical_decision_support",
      name: "Clinical Decision Support System",
      tagline:
        "Privacy-first medical record intelligence with hybrid local-cloud AI",
      category: "Healthcare AI · Privacy-Critical",
      tier: "featured",
      metrics: [
        "Local-first AI execution",
        "4-module pipeline",
        "Multi-model adapter"
      ],
      description:
        "Architected a privacy-preserving clinical AI system that digitizes unstructured medical records, extracts structured data with clinical reasoning over longitudinal patient history, and validates insurance eligibility — with local-first LLM execution.",
      problem_statement:
        "Medical records exist as unstructured scans and PDFs. Extracting clinical insights, maintaining patient history, and validating insurance eligibility requires AI processing — but healthcare data demands strict privacy. Cloud-only LLM solutions are non-compliant for many use cases.",
      solution_overview:
        "Built a modular, local-first system: OCR extracts text from medical documents → structured JSON extraction via LLM → patient history retrieval and comparison (SQLite) → clinical reasoning engine (rule-based + LLM hybrid) → insurance validation module. Unified AI adapter enables seamless switching between local (Ollama) and cloud (OpenAI/Gemini/Anthropic) models based on compliance requirements.",
      architecture: [
        "Medical document input (scans, PDFs, images)",
        "OCR processing (DeepSeek-OCR / Vision Models)",
        "LLM-based structured JSON extraction with Pydantic validation",
        "Patient history retrieval from SQLite store",
        "Historical comparison: current vs. prior records",
        "Clinical reasoning engine: rule-based checks + LLM analysis",
        "Insurance eligibility validation module",
        "Unified AI adapter: local (Ollama) ↔ cloud (OpenAI/Gemini/Anthropic)",
        "Structured insights, alerts, and recommendation output"
      ],
      tech: [
        "Python",
        "FastAPI",
        "Streamlit",
        "SQLite",
        "Ollama",
        "Pydantic",
        "OpenAI / Gemini / Anthropic"
      ],
      key_features: [
        "Privacy-first architecture: local LLM execution by default",
        "Unified multi-model AI adapter (swap local ↔ cloud with one config)",
        "Clinical reasoning with longitudinal patient history",
        "Insurance eligibility validation engine",
        "Pydantic-enforced structured extraction schemas",
        "Modular backend: each component independently deployable"
      ],
      implementation_details:
        "Built four decoupled backend modules (OCR, Structuring, Reasoning, Insurance Validation) served via FastAPI. OCR outputs passed through LLM extraction with strict Pydantic schema enforcement. SQLite stores patient history for longitudinal comparison. Clinical reasoning combines deterministic rule-based checks with LLM analysis for nuanced cases. Unified AI adapter abstracts model selection — local Ollama for privacy-sensitive workflows, cloud APIs when permitted. Streamlit frontend for clinician interaction.",
      challenges_solutions: [
        {
          challenge: "Healthcare data privacy requirements",
          solution:
            "Local-first architecture: Ollama execution keeps data on-premise by default"
        },
        {
          challenge: "Unstructured medical document variance",
          solution:
            "Vision OCR + LLM extraction with Pydantic schema enforcement"
        },
        {
          challenge: "Complex clinical reasoning beyond rule-based logic",
          solution:
            "Hybrid engine: deterministic rules for known patterns + LLM for nuanced analysis"
        },
        {
          challenge: "Need flexibility between local and cloud models",
          solution:
            "Unified adapter pattern: single interface, configurable model backend"
        }
      ],
      impact: [
        "Enabled structured digitization of unstructured medical records",
        "Maintained full data privacy with local-first AI execution",
        "Improved clinical decision support with longitudinal patient context",
        "Reduced insurance validation overhead with automated eligibility checks"
      ]
    }
  ],

  // ── SUPPORTING SYSTEMS (still valuable, lower priority) ──
  supporting: [
    {
      id: "text_to_sql_agent",
      name: "NL-to-SQL Data Analyst Agent",
      tagline:
        "Secure agentic SQL generation with retry loops and query safety gates",
      category: "Agentic AI · Data Systems",
      tier: "supporting",
      metrics: [
        "End-to-end NL → SQL",
        "Security validation gate",
        "Auto-retry on failure"
      ],
      description:
        "Built an agentic system that converts natural language queries into validated SQL, executes them with safety guards, and returns summarized insights — with automatic error-correction retry loops.",
      problem_statement:
        "Non-technical stakeholders need database insights but lack SQL expertise. Raw LLM-generated SQL is unreliable (syntax errors, unsafe operations) and requires validation before execution.",
      solution_overview:
        "Implemented a LangGraph-based workflow: schema-aware SQL generation → security validation (block destructive queries) → execution → error feedback loop (retry with LLM correction) → result summarization. Each stage has explicit validation gates.",
      architecture: [
        "Natural language query input",
        "Dynamic schema retrieval and injection into context",
        "LLM-based SQL generation with schema awareness",
        "Security validation gate: block DROP, DELETE, ALTER operations",
        "SQL execution against target database",
        "Error detection → feedback loop → LLM self-correction retry",
        "Result summarization into human-readable insights",
        "Execution trace logging for auditability"
      ],
      tech: [
        "Python",
        "LangGraph",
        "LangChain",
        "SQLite",
        "Streamlit",
        "OpenAI / Gemini / Ollama"
      ],
      key_features: [
        "Schema-aware SQL generation via dynamic context injection",
        "Security gate blocking destructive SQL operations",
        "Self-correcting retry loop with error feedback",
        "Real-time execution tracing for transparency",
        "Multi-model support (cloud and local LLMs)"
      ],
      implementation_details:
        "LangGraph workflow with explicit nodes for schema retrieval, generation, validation, execution, and summarization. Schema dynamically injected into LLM context for each query. Security layer pattern-matches against destructive SQL operations. On execution failure, error message fed back into LLM for corrected generation (max 3 retries). All execution steps logged for audit trail.",
      challenges_solutions: [
        {
          challenge: "Incorrect SQL generation from LLM",
          solution:
            "Error feedback retry loop — execution errors fed back for self-correction"
        },
        {
          challenge: "Risk of destructive database operations",
          solution:
            "Pre-execution security gate filtering DROP/DELETE/ALTER patterns"
        },
        {
          challenge:
            "LLM lacking schema context producing irrelevant queries",
          solution:
            "Dynamic schema injection: table structures + relationships in every prompt"
        }
      ],
      impact: [
        "Enabled non-technical users to query databases safely",
        "Improved query accuracy via iterative self-correction",
        "Zero destructive operations via security validation gate"
      ]
    }
  ],

  // ── COMBINED accessor for backward compatibility ────────
  get data() {
    return [...this.featured, ...this.supporting];
  }
};

