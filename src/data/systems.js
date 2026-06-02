/**
 * Systems Architecture Data
 *
 * Detailed case-study data for enterprise AI systems.
 * Each entry includes problem/solution framing, architecture flow,
 * tech stack, implementation details, challenges, and impact metrics.
 *
 * Rendering:
 *  - SystemCard.jsx      — Card with expandable modal for deep-dives
 *  - SystemDiagram.jsx   — Step-by-step architecture flow visualization
 *  - SystemShowcase.jsx  — Featured system on the home page
 *  - Projects page       — Full list of all systems
 *
 * Structure:
 *  featured[]   — Top-tier systems (shown prominently)
 *  supporting[] — Secondary systems (still valuable)
 *  get data()   — Combined accessor for backward compatibility
 */

// ─────────────────────────────────────────────────────────
// SYSTEMS — FAANG-optimized, signal-dense, recruiter-ready
// Ordered by: system complexity × enterprise impact × metrics
// ─────────────────────────────────────────────────────────

export const systems = {
  // ── FEATURED (top 4 — hero section worthy) ──────────────
  featured: [
    {
      id: "prior_auth_fax_pipeline",
      name: "Prior-Authorization Fax Extraction Pipeline",
      tagline: "4-pass confidence-aware extraction for scanned healthcare intake faxes",
      category: "Healthcare AI · Enterprise",
      tier: "featured",
      // CARD METRICS — numeric only, recruiter scan layer
      metrics: ["80-81% → 90%+ accuracy", "117 extraction fields", "4-pass fallback design"],
      description:
        "Architected a production-grade extraction pipeline for scanned prior-authorization intake faxes that combines analyzer-driven extraction, targeted field retries, raw OCR markdown fallback, and multimodal PDF-to-LLM extraction — improving accuracy from ~80-81% to 90%+ on noisy real-world documents.",
      problem_statement:
        "Prior-authorization intake faxes arrived as low-quality scans with layout drift, checkbox-heavy sections, inconsistent formatting, and mixed field types. The baseline pipeline processed 100+ documents per run and 117 extraction fields, but quality plateaued around 80-81%, which was not reliable enough for downstream healthcare operations.",
      solution_overview:
        "Diagnosed the failure boundary instead of guessing: compared the analyzer-driven path against two focused POCs — raw Azure Content Understanding markdown sent directly to the LLM, and direct PDF-as-image multimodal extraction. Productionized the findings into a 4-pass, confidence-aware pipeline with field-level retries, multimodal fallbacks, token control, and selective routing for vision-heavy fields.",
      architecture: [
        "Scanned prior-authorization fax ingestion",
        "Pass 1: Azure Content Understanding OCR + analyzer extraction",
        "Field scoring: identify missing or low-confidence fields (<0.78)",
        "Pass 2: retry only failed or low-confidence fields with analyzer-aligned prompts",
        "Pass 3: raw OCR markdown → LLM extraction with reused field guidance",
        "Field gating: only critical fields continue into deeper fallback passes",
        "Pass 4: PDF as base64 image → multimodal LLM extraction for remaining failures",
        "Special routing: checkbox-heavy fields sent directly to visual fallback path",
        "Confidence-aware merge: keep only improved values, retain max-confidence result across passes",
        "Structured output → downstream healthcare workflow systems"
      ],
      tech: ["Azure Content Understanding", "Python", "Azure Databricks", "GPT-4.1 / GPT-5-series", "Multimodal LLMs"],
      key_features: [
        "4-pass confidence-aware extraction pipeline",
        "Targeted retries only for missing or low-confidence fields",
        "Dual fallback strategy: raw OCR markdown and direct PDF vision input",
        "117 fields grouped into 7 batches to stay within model context limits",
        "Token-capping logic to reduce overflow and hallucination risk",
        "Field-level merge rules that preserve the highest-confidence result"
      ],
      implementation_details:
        "Built field-level retry orchestration that groups 117 fields into 7 extraction batches, caps tokens per request, and tracks confidence across all passes. Pass 2 reruns only fields missing or below 0.78 confidence. Pass 3 reuses analyzer prompt context but bypasses analyzer extraction by sending raw Azure Content Understanding markdown directly to the LLM. Pass 4 sends the PDF as base64 image input for multimodal extraction, especially for checkbox-heavy fields that benefited from direct visual interpretation. Merge logic never overwrites a value unless a later pass improves confidence; otherwise the highest-confidence result across all passes is retained.",
      challenges_solutions: [
        {
          challenge: "Quality plateau at ~80-81% with analyzer-only extraction",
          solution:
            "Ran paired POCs to isolate whether failures came from OCR, analyzer prompts, or model interpretation before redesigning the pipeline."
        },
        {
          challenge: "117 fields exceeded safe context budgets",
          solution:
            "Grouped fields into 7 batches and added token-capping logic to keep prompts bounded and reduce hallucinations."
        },
        {
          challenge: "Blind retries increased cost without reliable gains",
          solution:
            "Retried only fields that were missing or below 0.78 confidence, focusing cost where it mattered."
        },
        {
          challenge: "Checkbox and vision-heavy fields underperformed in text-only paths",
          solution:
            "Routed those fields to the multimodal PDF fallback path and applied confidence-aware update rules."
        }
      ],
      impact: [
        "Improved extraction accuracy from ~80-81% to 90%+ on scanned intake faxes",
        "Made 100+ document runs stable enough for downstream healthcare workflows",
        "Reduced regression risk with confidence-aware overwrite protection",
        "Converted experiment-driven learnings into a production fallback architecture"
      ]
    },
    {
      id: "agentic_rag_layer",
      name: "Milvus-Backed Agentic RAG Layer",
      tagline: "Retrieval-grounded orchestration for multi-agent reasoning workflows",
      category: "Agentic AI · Retrieval Systems",
      tier: "featured",
      metrics: ["38% → 80% task completion", "Milvus-backed retrieval", "Multi-agent reasoning"],
      description:
        "Engineered a retrieval-backed context layer for multi-agent reasoning workflows that improved task completion from 38% to 80% by strengthening retrieval quality, context assembly, and orchestration around the model.",
      problem_statement:
        "Baseline agent workflows underperformed because reasoning happened on thin context, relevant SOP knowledge was not reliably retrieved, and orchestration quality varied significantly across tasks. Task completion remained around 38%.",
      solution_overview:
        "Inserted a Milvus-backed RAG layer between task intake and agent execution. Retrieved SOP and domain context is assembled into structured prompts for planner and worker agents, while validation checks ensure the orchestration layer produces actionable, grounded context before execution proceeds.",
      architecture: [
        "Task intake + intent analysis",
        "Milvus vector search over indexed SOPs and domain documents",
        "Context assembly with relevance filtering and prompt packing",
        "Planner or orchestrator builds structured multi-agent task context",
        "Specialist agents execute reasoning or action steps",
        "Validation and feedback loop checks task completeness and correctness",
        "Execution telemetry + outcome logging"
      ],
      tech: ["Python", "Milvus", "FastAPI", "LLMs", "RAG Evaluation"],
      key_features: [
        "Milvus-backed retrieval over SOP and domain knowledge",
        "Context assembly tuned for planner and worker agents",
        "Validation gate before downstream agent execution",
        "Telemetry for task-level evaluation and failure diagnosis",
        "Grounded orchestration instead of model-only reasoning",
        "Reusable RAG layer for multi-agent workflows"
      ],
      implementation_details:
        "Indexed SOP and domain documentation in Milvus with chunk-level metadata, then built retrieval and context-assembly layers that separated relevant procedures from noisy background context. Planner and worker agents received structured, relevance-filtered context rather than raw retrieval dumps. Evaluation telemetry tracked completion, failure modes, and retrieval quality so orchestration changes could be measured instead of guessed.",
      challenges_solutions: [
        {
          challenge: "Agents reasoned on insufficient domain context",
          solution:
            "Indexed SOPs in Milvus and retrieved only the most relevant procedural context before orchestration."
        },
        {
          challenge: "Raw retrieval could still overload or distract agents",
          solution:
            "Added context assembly and prompt-packing logic so each agent received only the relevant subset of retrieved knowledge."
        },
        {
          challenge: "Task quality was hard to improve without reliable evaluation",
          solution:
            "Tracked completion and failure patterns at the workflow level to tie orchestration changes back to measurable outcomes."
        },
        {
          challenge: "Planner outputs could still be structurally weak",
          solution:
            "Introduced validation checks before downstream agent execution so invalid plans were caught earlier."
        }
      ],
      impact: [
        "Task completion improved from 38% to 80%",
        "Strengthened multi-agent reliability through grounded context assembly",
        "Made orchestration decisions measurable through retrieval and outcome telemetry",
        "Reduced dependence on model capability alone for complex workflow completion"
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
      id: "health_policy_extraction",
      name: "Health-Policy Entity Extraction System",
      tagline: "Structured policy extraction with model migration, prompt tuning, and canonical validation",
      category: "Document AI · Enterprise",
      tier: "supporting",
      metrics: ["90% → 99% accuracy", "Canonical comparison", "Structured output contracts"],
      description:
        "Improved health-policy entity extraction from 90% to 99% by treating model choice, prompt design, structured-output behavior, and evaluation logic as one engineering problem rather than isolated tuning tasks.",
      problem_statement:
        "Policy documents required consistent field-level extraction across document variants and layouts. The baseline GPT-based flow achieved roughly 90% accuracy, but remaining field inconsistency and output-contract drift still created operational review overhead.",
      solution_overview:
        "Migrated workloads across GPT- and Gemini-based systems, refined prompts through repeated iterations, enforced structured-output contracts, and used canonical-comparison logic to validate whether changes improved real field-level accuracy.",
      architecture: [
        "Policy document ingestion and text normalization",
        "Prompt assembly with field definitions, examples, and output contract",
        "Model routing across GPT and Gemini candidates",
        "Structured JSON generation under explicit schema expectations",
        "Canonical comparison against expected policy representations",
        "Evaluation loop: diagnose failures, refine prompts, rerun validation",
        "Validated entity output for downstream healthcare workflows"
      ],
      tech: ["Python", "Gemini", "GPT", "Pydantic", "Evaluation Harness"],
      key_features: [
        "Model migration across GPT and Gemini systems",
        "Prompt refinement driven by field-level evaluation",
        "Structured-output enforcement with schema validation",
        "Canonical-comparison logic for deterministic scoring",
        "Field normalization across policy variants"
      ],
      implementation_details:
        "Built an evaluation-driven extraction workflow where prompt design, model routing, and structured output contracts were tuned together. Candidate GPT and Gemini configurations were benchmarked against the same validation set, outputs were normalized into a strict schema, and canonical-comparison logic measured real extraction quality beyond surface string similarity.",
      challenges_solutions: [
        {
          challenge: "Baseline accuracy plateaued near 90%",
          solution:
            "Benchmarked GPT and Gemini variants instead of assuming one model family would dominate the workload."
        },
        {
          challenge: "Field formatting and contract drift reduced trust",
          solution:
            "Enforced structured-output behavior with schema-aligned JSON contracts and normalization logic."
        },
        {
          challenge: "Prompt changes could help some fields while regressing others",
          solution:
            "Ran repeated canonical-comparison evaluations before promoting prompt or model changes."
        }
      ],
      impact: [
        "Improved health-policy entity extraction from 90% to 99%",
        "Raised field-level precision and consistency across policy documents",
        "Made model migration decisions evidence-based through repeatable evaluation",
        "Reduced output-contract drift in downstream healthcare workflows"
      ]
    },
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
    },
    {
      id: "computer_using_agent",
      name: "Computer-Using Agent",
      tagline: "Native CU protocols from Gemini, Claude, and OpenAI in a sandboxed desktop",
      category: "Agentic AI · Open Source",
      tier: "supporting",
      metrics: ["Gemini + Claude + OpenAI", "Native CU Protocols", "Live Desktop Streaming"],
      description:
        "Built a sandboxed agent platform where vision-language models autonomously operate a full Linux desktop inside Docker using native Computer Use protocols — structured action dispatch, real-time streaming, and explicit safety confirmation gates.",
      problem_statement:
        "Computer Use protocols from Gemini, Claude, and OpenAI each define different tool schemas, coordinate systems, and screenshot handling. No unified local environment existed to run, observe, and compare these providers in a safe sandbox.",
      solution_overview:
        "Designed a three-process architecture: React frontend for session management and live desktop streaming, FastAPI backend for orchestration and provider routing, and a Dockerized Ubuntu desktop with XFCE where all agent actions execute. The engine normalizes each provider's native CU protocol into a shared perceive–think–act loop.",
      architecture: [
        "User task input via React workbench UI",
        "FastAPI backend: provider/model validation + session lifecycle",
        "Docker container start (Ubuntu 24.04 + XFCE + Xvfb)",
        "Screenshot capture via agent service HTTP API",
        "Screenshot + task sent to selected LLM provider",
        "Native CU tool response: structured action (click, type, scroll, etc.)",
        "Action execution inside sandbox via xdotool",
        "New screenshot captured → loop or terminate",
        "WebSocket broadcast: screenshots, logs, step records to UI"
      ],
      tech: ["Python", "FastAPI", "React 19", "Docker", "Vite"],
      key_features: [
        "Multi-provider native Computer Use: Gemini, Claude, OpenAI",
        "Sandboxed Docker desktop with resource limits and no-new-privileges",
        "Real-time desktop streaming via WebSocket + interactive noVNC",
        "Safety confirmation gates surfaced to UI for explicit user approval",
        "Context pruning to prevent unbounded token growth",
        "Hermetic test suite — no running container or network required"
      ],
      implementation_details:
        "Engine dispatches to provider-specific adapters: google-genai for Gemini (normalized 0–999 coordinates), anthropic SDK with beta endpoint for Claude (pixel coordinates with screenshot resizing), and OpenAI Responses API for GPT-5.4 (previous_response_id continuation). All providers map to 15 shared desktop actions executed via xdotool inside the container. Rate limiting, concurrent session caps, and model allowlist enforced at the API layer.",
      challenges_solutions: [
        {
          challenge: "Three providers with incompatible coordinate systems",
          solution: "Engine-level denormalization: Gemini 0–999 grid mapped to pixels; Claude and OpenAI use native pixel values"
        },
        {
          challenge: "Unbounded context growth from screenshot history",
          solution: "Automatic pruning: old screenshots replaced with text placeholders after N turns"
        },
        {
          challenge: "Sensitive actions executed without user consent",
          solution: "Safety confirmation flow: engine pauses, UI prompts user, 60s timeout defaults to deny"
        }
      ],
      impact: [
        "Unified three native CU protocols behind a single execution engine",
        "Provided a safe, observable sandbox for CUA research and development",
        "Open-source: github.com/pypi-ahmad/computer-use"
      ]
    },
    {
      id: "cua_workbench",
      name: "CUA Workbench",
      tagline: "Browser, accessibility, and pixel-level agent automation from one workbench",
      category: "Agentic AI · Open Source",
      tier: "supporting",
      metrics: ["3 Execution Engines", "Playwright MCP", "Explicit Engine Routing"],
      description:
        "Built a multi-engine observability workbench for computer-using agents with three execution paths — Playwright MCP for browser-semantic automation, platform accessibility APIs for desktop control, and native Computer Use — each selected per session with no silent fallback.",
      problem_statement:
        "Browser automation, desktop accessibility, and pixel-level Computer Use are fundamentally different execution paradigms. No single tool let developers compare them side-by-side in the same sandbox with the same observability surface.",
      solution_overview:
        "Designed an engine-router architecture: the user selects an engine per session, and the backend routes all actions through that engine without silent substitution. Three engines share a unified action schema but maintain isolated execution paths. A React workbench streams screenshots, logs, and step history in real time.",
      architecture: [
        "User selects engine, provider, model, and execution target in UI",
        "FastAPI backend validates request against engine + model allowlists",
        "Docker container started with XFCE + Playwright MCP + AT-SPI",
        "Engine router dispatches to selected engine for full session",
        "Playwright MCP: browser-semantic actions via MCP tool calls",
        "Omni Accessibility: platform accessibility API actions (AT-SPI / UIA / JXA)",
        "Computer Use: native CU protocol via Gemini or Claude",
        "Action normalization through unified schema",
        "WebSocket broadcast: screenshots, logs, step records to UI"
      ],
      tech: ["Python", "FastAPI", "React 19", "Playwright", "Docker"],
      key_features: [
        "Three isolated automation engines selectable per session",
        "Playwright MCP for browser-semantic control via accessibility snapshots",
        "Cross-platform accessibility: Linux AT-SPI, Windows UIA, macOS JXA",
        "Explicit engine routing with no silent fallback or auto-switching",
        "Unified action schema normalized across all engines",
        "Optional WebRTC streaming alongside noVNC"
      ],
      implementation_details:
        "Engine router is intentionally simple: user-selected engine used for full session. Playwright MCP engine communicates with in-container MCP server on port 8931 for browser-semantic actions. Accessibility engine queries AT-SPI registry for desktop-semantic control. Computer Use engine delegates to provider-specific native CU adapters. All engines normalize output through a shared action schema validated per-engine. Backend enforces strict allowlists for engines and models at the API layer.",
      challenges_solutions: [
        {
          challenge: "Three engines with different action models and capabilities",
          solution: "Unified action schema with per-engine validation — normalized format, engine-specific constraints"
        },
        {
          challenge: "Risk of silent engine substitution masking failures",
          solution: "Explicit routing: selected engine is the only engine used, no fallback"
        },
        {
          challenge: "AT-SPI, UIA, and JXA have incompatible APIs",
          solution: "Provider abstraction layer: common interface with platform-specific implementations"
        }
      ],
      impact: [
        "Enabled side-by-side comparison of three agent automation paradigms",
        "Demonstrated that explicit engine selection outperforms silent fallback",
        "Open-source: github.com/pypi-ahmad/cua-workbench"
      ]
    }
  ],

  // ── COMBINED accessor for backward compatibility ────────
  get data() {
    return [...this.featured, ...this.supporting];
  }
};

