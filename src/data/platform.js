/**
 * Agentic AI Platform Data
 *
 * 20 production-grade AI systems across three agent paradigms:
 * GenAI applications, LangGraph state-machine agents, and CrewAI collaborative agent systems.
 *
 * Each system follows the same schema as systems.js entries so SystemCard
 * can render them with full deep-dive modals.
 *
 * Source: F:\Github\pypi-ahmad.github.io\New Projects
 */

export const platformHeader = {
  title: "Agentic AI Platform",
  subtitle:
    "20 production-grade AI systems built across three agent paradigms — GenAI, LangGraph, and CrewAI — sharing a unified platform layer for API delivery, UI access, evaluation, logging, and model access.",
  repoUrl: "https://github.com/pypi-ahmad/genai-systems-lab",
};

export const platformInfrastructure = {
  description:
    "Each project is independently runnable while sharing a common platform layer for execution, evaluation, and operational concerns. The shared layer provides an LLM wrapper built on Gemini, evaluation and benchmarking infrastructure, caching support, structured logging with request tracing, and reusable schemas.",
  architecture: [
    "UI (Streamlit) — operator interface for project selection, input, and result inspection",
    "FastAPI Backend — routing, input validation, structured logging, timing, error normalization",
    "Project Modules — standardized run(input) → dict interface for all 20 systems",
    "Shared Platform Layer — LLM access, evaluation, caching, configuration",
  ],
  tech: [
    "Python",
    "FastAPI",
    "Streamlit",
    "Gemini",
    "LangGraph",
    "CrewAI",
    "DuckDB",
    "Playwright",
    "Docker",
    "Pydantic",
  ],
  features: [
    "Centralized LLM wrapper with retry logic, timeout handling, and fallback behavior",
    "Evaluation framework measuring success rate, latency, retries, and per-case results",
    "Deterministic prompt-keyed caching for LLM responses and embeddings",
    "Structured logging with request IDs, project context, and latency tracking",
    "Dynamic project discovery and execution via shared runner",
  ],
};

export const platformCategories = [
  // ──────────────────────────────────────────────────────────
  // GENAI SYSTEMS (10)
  // ──────────────────────────────────────────────────────────
  {
    name: "GenAI Systems",
    description:
      "Generative AI applications combining LLM reasoning with deterministic pipelines for document processing, code assistance, research, and automation.",
    systems: [
      {
        id: "genai_browser_agent",
        name: "Autonomous Browser Agent",
        tagline:
          "AI-powered browser automation for goal-driven web navigation",
        category: "GenAI · Automation",
        tier: "featured",
        metrics: [
          "Goal-driven automation",
          "Playwright-backed execution",
          "Run memory across steps",
        ],
        description:
          "An AI-powered browser automation agent that observes a web page, plans the next action, executes browser interactions, and loops until the task is complete or the step budget is exhausted. Focuses on goal-driven navigation rather than test scripting.",
        problem_statement:
          "Browser automation typically requires explicit test scripts. Goal-driven navigation — where an agent reasons about page state and decides next actions — needs a structured observe-plan-act loop with execution memory to avoid blind repetition.",
        solution_overview:
          "Separates page observation, action planning, browser control, and run memory so the observe-plan-act loop remains explicit and debuggable. The agent repeatedly gathers page state, decides on the next browser action, executes it through Playwright, records the result, and continues until completion or stop condition.",
        architecture: [
          "Goal ingestion",
          "Perception: text and optional vision-based page observation",
          "Planner: structured browser action selection from current state",
          "Action Executor: Playwright-backed browser interaction",
          "Browser State Update",
          "Run Memory: record result to avoid repetition",
          "Next Step or completion check",
        ],
        tech: ["Python", "Playwright", "LLM Reasoning", "Vision Models"],
        key_features: [
          "Goal-driven browser automation with structured action selection",
          "Playwright-backed execution for reliable page interaction",
          "Run memory to avoid blind repetition across steps",
          "Optional screenshot-based page observation path",
        ],
        implementation_details:
          "Perception module builds text and optional vision-based page observations. Planner chooses the next structured browser action from the current state. Actions module executes supported browser actions such as open, click, and type. Browser module owns the Playwright browser lifecycle and page interactions. Agent module runs the full step loop and stores execution history.",
        challenges_solutions: [
          {
            challenge: "Agents repeating failed actions without learning",
            solution:
              "Run memory stores execution history to avoid blind repetition across steps",
          },
          {
            challenge: "Unreliable page interaction without structured control",
            solution:
              "Playwright-backed execution with explicit action types (open, click, type)",
          },
        ],
        impact: [
          "Goal-driven browser automation with structured action loops",
          "Reliable page interaction via Playwright execution",
          "Evaluation: task completion accuracy, step count, per-action latency, failure rate",
        ],
      },
      {
        id: "genai_clinical_assistant",
        name: "Clinical Decision Support System",
        tagline:
          "Structured clinical reasoning pipeline combining extraction, retrieval, and LLM reasoning",
        category: "GenAI · Healthcare",
        tier: "featured",
        metrics: [
          "6-stage pipeline",
          "Knowledge-base grounding",
          "Deterministic confidence scoring",
        ],
        description:
          "A clinical reasoning pipeline that extracts patient details, retrieves relevant conditions from a knowledge base, applies LLM reasoning, assigns deterministic confidence scores, and formats a clinical summary. Intended as a structured decision-support prototype, not a diagnostic system.",
        problem_statement:
          "Clinical decision support requires structured extraction from free-text patient descriptions, grounded retrieval of candidate conditions, and transparent confidence scoring — combining LLM reasoning with deterministic logic for review-oriented workflows.",
        solution_overview:
          "Takes patient input, converts it into structured symptoms and demographics, retrieves candidate conditions from a local clinical knowledge base, evaluates them with a reasoning model, assigns deterministic confidence labels, and returns a formatted report.",
        architecture: [
          "Patient Input ingestion",
          "Extractor: symptoms and demographics from free text",
          "Retriever: candidate conditions from clinical knowledge base",
          "Reasoner: LLM-based condition-level reasoning",
          "Risk Evaluator: deterministic confidence scores and labels",
          "Formatter: structured clinical summary for review",
        ],
        tech: [
          "Python",
          "Knowledge Base Retriever",
          "LLM Reasoning",
          "Deterministic Scoring",
        ],
        key_features: [
          "Structured patient information extraction from free-text descriptions",
          "Knowledge-base-grounded condition retrieval",
          "LLM reasoning combined with deterministic confidence scoring",
          "Formatted output designed for review-oriented workflows",
        ],
        implementation_details:
          "Extractor module extracts symptoms and explicit patient details from free text. Retriever ranks candidate conditions from the local clinical knowledge base. Reasoner generates condition-level reasoning from patient context and retrieved candidates. Risk evaluator assigns deterministic confidence scores and labels. Formatter produces the final clinical summary for review.",
        challenges_solutions: [
          {
            challenge:
              "Trust gap between LLM reasoning and clinical decision-making",
            solution:
              "Deterministic confidence scoring layered on top of LLM reasoning for transparency",
          },
          {
            challenge:
              "Ungrounded condition suggestions from pure LLM generation",
            solution:
              "Knowledge-base-grounded retrieval before reasoning step",
          },
        ],
        impact: [
          "Structured decision-support with transparent confidence scoring",
          "Evaluation: diagnostic relevance, retrieval quality, confidence calibration, latency, failure rate",
        ],
      },
      {
        id: "genai_code_copilot",
        name: "Codebase Copilot",
        tagline:
          "Repository-aware code assistant with retrieval-grounded answers",
        category: "GenAI · Developer Tools",
        tier: "supporting",
        metrics: [
          "Repository-aware indexing",
          "Embedding-backed retrieval",
          "Citation-grounded answers",
        ],
        description:
          "A repository-aware code assistant that indexes local source files, builds retrieval-friendly code chunks, finds relevant context by query, and generates grounded answers about the codebase. Emphasizes traceability over generic code explanations.",
        problem_statement:
          "Generic code assistants lack awareness of the specific codebase. Developers need answers grounded in their actual source files with traceable citations, not generic explanations.",
        solution_overview:
          "Scans a codebase and chunks it into indexed documents, embeds and matches a developer question against those chunks, and assembles retrieved evidence into prompt context for the answering model.",
        architecture: [
          "Codebase Path ingestion",
          "Scanner: supported source file discovery and loading",
          "Chunker: retrieval-friendly code chunks",
          "Embedder: vector embedding generation",
          "Vector Store: in-memory indexed storage",
          "Retriever: most relevant chunk matching",
          "Context Builder: prompt-ready context assembly",
          "QA Agent: grounded answer generation from code evidence",
        ],
        tech: [
          "Python",
          "File Parsing",
          "Embeddings",
          "In-Memory Vector Store",
          "LLM QA",
        ],
        key_features: [
          "Repository scanning and chunking for supported source file types",
          "Embedding-backed retrieval over indexed code context",
          "Grounded answers that stay tied to retrieved source snippets",
          "Simple CLI workflow for local codebase question answering",
        ],
        implementation_details:
          "File parser scans supported source files and loads their contents. Indexer chunks code, generates embeddings, and manages the in-memory vector store. Retriever finds the most relevant code chunks for a developer query. Context builder formats retrieved chunks into prompt-ready context. QA agent answers questions using only the retrieved code evidence.",
        challenges_solutions: [
          {
            challenge: "Generic answers not tied to the actual codebase",
            solution:
              "Retrieval-grounded QA — answers generated only from indexed source evidence",
          },
          {
            challenge: "Large codebases with noisy retrieval results",
            solution:
              "Code-aware chunking and embedding for higher retrieval precision",
          },
        ],
        impact: [
          "Traceable code assistance grounded in actual repository content",
          "Evaluation: answer relevance, retrieval precision, citation usefulness, latency, failure rate",
        ],
      },
      {
        id: "genai_doc_intelligence",
        name: "Document Intelligence",
        tagline:
          "Lightweight local document processing with QA and structured extraction",
        category: "GenAI · Document AI",
        tier: "supporting",
        metrics: [
          "Local document ingestion",
          "Citation-backed QA",
          "Structured extraction",
        ],
        description:
          "A document processing pipeline that ingests text documents, chunks and embeds them, retrieves grounded context, answers questions with source references, and extracts structured information from individual files. Built for lightweight local document QA and extraction workflows.",
        problem_statement:
          "Document question-answering and structured extraction require grounded retrieval from ingested content — not hallucinated answers — with citation traceability and support for both QA and extraction workflows.",
        solution_overview:
          "Documents are loaded into a vector store through ingestion and chunking, then a user query retrieves the most relevant chunks for answer generation, or a specific file is passed to the extractor for structured field extraction.",
        architecture: [
          "Document ingestion (markdown and text files)",
          "Chunker: retrieval-friendly document splits",
          "Embedder: vector embedding generation",
          "Vector Store: indexed chunk storage",
          "Retriever: semantic and reranked chunk retrieval",
          "QA Engine: grounded answer generation with citations",
          "Extractor: key points, clauses, and risks as structured JSON",
        ],
        tech: [
          "Python",
          "Markdown/Text Ingestion",
          "Chunking",
          "Embeddings",
          "Vector Search",
          "LLM QA",
        ],
        key_features: [
          "Local ingestion for markdown and text document collections",
          "Vector-store-backed retrieval for grounded question answering",
          "Citation attachment for answer traceability",
          "Structured extraction path for clauses, key points, and risks",
        ],
        implementation_details:
          "Ingest module loads markdown and text files with source metadata. Chunker splits documents into retrieval-friendly chunks. Retriever runs semantic and reranked chunk retrieval from the vector store. QA engine generates grounded answers from retrieved chunks. Extractor extracts key points, clauses, and risks as structured JSON.",
        challenges_solutions: [
          {
            challenge: "Hallucinated answers with no grounding in source documents",
            solution:
              "Vector-store retrieval with citation attachment for every answer",
          },
          {
            challenge: "Need for both QA and structured extraction from same pipeline",
            solution:
              "Separate QA engine and extractor paths sharing the same ingested vector store",
          },
        ],
        impact: [
          "Grounded document QA with citation traceability",
          "Evaluation: answer accuracy, citation correctness, extraction completeness, latency, failure rate",
        ],
      },
      {
        id: "genai_financial_analyst",
        name: "Financial Analyst Agent",
        tagline:
          "AI-powered analysis transforming CSV data into metrics and stakeholder reports",
        category: "GenAI · Finance",
        tier: "supporting",
        metrics: [
          "Deterministic KPI computation",
          "LLM trend interpretation",
          "Executive report generation",
        ],
        description:
          "An AI-powered financial analysis pipeline that transforms CSV data into metrics, trend analysis, optional forecasts, and a structured report. Combines deterministic metric computation with LLM-backed interpretation and reporting.",
        problem_statement:
          "Financial analysis requires accurate metric computation that cannot be delegated to LLMs, combined with interpretive trend analysis and stakeholder-ready reporting that benefits from LLM reasoning.",
        solution_overview:
          "Loads a financial dataset, computes core metrics deterministically, optionally forecasts future periods, analyzes trends and anomalies using LLM reasoning, and formats the output into a concise stakeholder-ready report.",
        architecture: [
          "CSV Data ingestion and cleaning",
          "Metrics Engine: KPIs (revenue, margin, growth rates)",
          "Forecaster: optional forward-looking metric forecasts",
          "Analyzer: LLM-backed trend and anomaly interpretation",
          "Reporter: executive-style financial report formatting",
        ],
        tech: [
          "Python",
          "pandas",
          "Numeric Computation",
          "Forecasting",
          "LLM Interpretation",
        ],
        key_features: [
          "Deterministic KPI computation from structured CSV inputs",
          "Optional forecasting for forward-looking analysis",
          "LLM-assisted trend and anomaly interpretation grounded in metrics",
          "Report generation optimized for stakeholder summaries",
        ],
        implementation_details:
          "Data loader loads and cleans CSV financial data. Metrics module computes KPIs such as revenue, margin, and growth rates. Forecaster produces optional forward-looking metric forecasts. Analyzer interprets trends and anomalies using LLM reasoning. Reporter formats a concise executive-style financial report.",
        challenges_solutions: [
          {
            challenge: "LLMs cannot be trusted for numeric computation",
            solution:
              "Deterministic metric computation separated from LLM interpretation layer",
          },
          {
            challenge: "Raw metrics without context are not actionable",
            solution:
              "LLM-backed trend interpretation grounded in computed metrics",
          },
        ],
        impact: [
          "Accurate financial analysis with deterministic computation + LLM interpretation",
          "Evaluation: metric accuracy, analysis relevance, forecast quality, latency, failure rate",
        ],
      },
      {
        id: "genai_interviewer",
        name: "AI Interviewer",
        tagline:
          "Adaptive technical interview system with difficulty adjustment",
        category: "GenAI · HR Tech",
        tier: "supporting",
        metrics: [
          "Adaptive difficulty",
          "Structured evaluation rubrics",
          "Session state tracking",
        ],
        description:
          "An adaptive technical interview system that generates questions, evaluates answers, adjusts difficulty over time, and returns structured feedback. Built for iterative interview loops rather than single-prompt assessment.",
        problem_statement:
          "Technical interviews require adaptive difficulty based on candidate performance, structured evaluation with explicit rubrics, and session tracking across multiple turns — not single-shot assessment.",
        solution_overview:
          "Starts from a topic, generates a question at the current difficulty, evaluates the candidate response, updates session state, adjusts difficulty based on performance, and repeats until the interview is complete.",
        architecture: [
          "Topic ingestion",
          "Question Generator: topic-aware questions at requested difficulty",
          "Candidate Answer evaluation",
          "Evaluator: topic-specific rubric scoring",
          "Difficulty Manager: adjusts difficulty from recent performance",
          "Feedback generation tailored to response",
          "Session Tracking: questions, answers, scores, and summary state",
        ],
        tech: [
          "Python",
          "LLM Question/Evaluation Generation",
          "Session State Management",
        ],
        key_features: [
          "Adaptive interview loop with difficulty changes over time",
          "Structured answer evaluation with explicit strengths and gaps",
          "Session state tracking across multiple interview turns",
          "Feedback generation tailored to the candidate response",
        ],
        implementation_details:
          "Question generator produces topic-aware questions at the requested difficulty. Evaluator scores candidate answers with topic-specific rubrics. Difficulty manager adjusts question difficulty from recent performance. Session module tracks questions, answers, scores, and interview summary state. Interviewer runs the interactive interview loop and feedback cycle.",
        challenges_solutions: [
          {
            challenge: "Static difficulty producing uninformative assessments",
            solution:
              "Adaptive difficulty adjustment based on rolling performance evaluation",
          },
          {
            challenge: "Unstructured feedback without actionable insights",
            solution:
              "Rubric-based evaluation with explicit strengths and gap identification",
          },
        ],
        impact: [
          "Adaptive interview system with structured evaluation and feedback",
          "Evaluation: question quality, evaluation consistency, difficulty calibration, latency, failure rate",
        ],
      },
      {
        id: "genai_knowledge_os",
        name: "Personal Knowledge OS",
        tagline:
          "Modular knowledge system for personal notes with cross-document synthesis",
        category: "GenAI · Knowledge Management",
        tier: "supporting",
        metrics: [
          "Hybrid retrieval",
          "Cross-document insights",
          "Persistent memory layer",
        ],
        description:
          "A modular knowledge system that ingests local notes, stores vectorized chunks, retrieves relevant context, summarizes content, and generates cross-document insights with optional memory persistence. Designed for personal knowledge workflows rather than enterprise search infrastructure.",
        problem_statement:
          "Personal knowledge workflows need more than simple search — they require hybrid retrieval, cross-document synthesis to find non-obvious connections, and persistent memory for reusable insights.",
        solution_overview:
          "Documents are ingested into a vector store, user questions retrieve the most relevant chunks via hybrid semantic and keyword retrieval, summarization condenses the result, and an insight layer generates higher-level cross-document observations stored in memory.",
        architecture: [
          "Document ingestion from local directories",
          "Chunker: retrieval-friendly document splits",
          "Embedder: vector embedding generation",
          "Vector Store: persistent indexed storage",
          "Retriever: hybrid semantic and keyword retrieval",
          "Summarizer: concise summary from retrieved context",
          "Insight Engine: cross-document pattern generation",
          "Memory: persistent storage for reusable insights",
        ],
        tech: [
          "Python",
          "Markdown Ingestion",
          "Hybrid Search",
          "Embeddings",
          "LLM Summarization",
        ],
        key_features: [
          "Local note ingestion with persistent vector storage",
          "Hybrid retrieval combining semantic and keyword signals",
          "Cross-document insight generation for non-obvious connections",
          "Persistent memory layer for reusable synthesized knowledge",
        ],
        implementation_details:
          "Ingest module loads markdown and text notes from local directories. Retriever performs hybrid semantic and keyword retrieval from the vector store. Summarizer produces concise summaries from retrieved context. Insight engine generates cross-document insights and patterns. Memory module persists useful insights for later retrieval.",
        challenges_solutions: [
          {
            challenge: "Pure semantic search missing keyword-specific matches",
            solution:
              "Hybrid retrieval combining semantic and keyword signals",
          },
          {
            challenge: "Losing synthesized insights across sessions",
            solution:
              "Persistent memory layer storing cross-document insights for reuse",
          },
        ],
        impact: [
          "Personal knowledge OS with hybrid retrieval and cross-document synthesis",
          "Evaluation: retrieval relevance, summary quality, insight novelty, latency, failure rate",
        ],
      },
      {
        id: "genai_nl2sql_agent",
        name: "NL2SQL Agent",
        tagline:
          "Natural-language-to-SQL workflow with safety validation and DuckDB execution",
        category: "GenAI · Data Systems",
        tier: "featured",
        metrics: [
          "Schema-grounded SQL generation",
          "Read-only safety validation",
          "DuckDB execution",
        ],
        description:
          "A natural-language-to-SQL workflow that translates user questions into safe DuckDB queries, validates the generated SQL, executes it, and summarizes the result. Focuses on safe read-only analytics over a known schema.",
        problem_statement:
          "Non-technical users need database insights but lack SQL expertise. LLM-generated SQL is unreliable without schema grounding and safety validation — raw queries risk syntax errors, unsafe operations, and incorrect results.",
        solution_overview:
          "A user question is grounded against the live schema, converted into SQL, validated for safety and shape, executed against DuckDB, and summarized into a concise answer from the returned rows.",
        architecture: [
          "Natural Language Query ingestion",
          "Schema Loader: DuckDB schema description and sample database",
          "SQL Generator: DuckDB-compatible read-only SQL from user request",
          "Validator: rejects unsafe or malformed SQL before execution",
          "DuckDB Executor: runs validated SQL",
          "Result Summarizer: concise natural-language answer from rows",
        ],
        tech: ["Python", "DuckDB", "LLM SQL Generation", "Safety Validation"],
        key_features: [
          "Schema-grounded SQL generation from natural language questions",
          "Read-only validation to block mutating SQL statements",
          "DuckDB-backed execution with structured results",
          "Natural-language result summary generated from returned rows only",
        ],
        implementation_details:
          "Schema module builds the DuckDB schema description and sample in-memory database. SQL generator produces DuckDB-compatible read-only SQL from the user request. Validator rejects unsafe or malformed SQL before execution. Executor runs validated SQL against DuckDB. Agent orchestrates retries, execution, and result summarization.",
        challenges_solutions: [
          {
            challenge: "LLM-generated SQL without schema context producing irrelevant queries",
            solution:
              "Schema-grounded generation with live schema description injected into context",
          },
          {
            challenge: "Risk of destructive database operations from LLM output",
            solution:
              "Read-only validation blocking mutating SQL statements before execution",
          },
        ],
        impact: [
          "Safe NL-to-SQL analytics with schema grounding and safety validation",
          "Evaluation: SQL correctness, execution success rate, result accuracy, latency, failure rate",
        ],
      },
      {
        id: "genai_research_system",
        name: "Multi-Agent Research System",
        tagline:
          "LangGraph research workflow with revision loops and quality gates",
        category: "GenAI · Multi-Agent Systems",
        tier: "featured",
        metrics: [
          "8-node LangGraph workflow",
          "Critic-refiner revision loops",
          "Multi-format output",
        ],
        description:
          "A LangGraph-based research workflow that decomposes a query into tasks, gathers findings, critiques the draft, rewrites when needed, and produces multi-format outputs with quality metrics. Flagship project for graph-based iterative reasoning.",
        problem_statement:
          "Single-pass LLM research produces hallucinated, incomplete outputs with no quality guarantees — no query decomposition, no grounding verification, no iterative improvement mechanism.",
        solution_overview:
          "Plans a research agenda, generates findings for each task, critiques the output, loops through revisions when necessary, writes the final report, and optionally formats it for additional channels such as blog posts or social content.",
        architecture: [
          "Research Query ingestion",
          "Planner: query decomposition into research tasks",
          "Researcher: findings generation per task",
          "Critic: quality evaluation of draft output",
          "Writer: structured report generation",
          "Editor: editorial refinement",
          "Originality Check: verification of original content",
          "Formatter: multi-format output (report, blog, social)",
        ],
        tech: [
          "Python",
          "LangGraph",
          "FastAPI",
          "Quality Metrics",
          "Multi-Node Instrumentation",
        ],
        key_features: [
          "LangGraph workflow with explicit revision and quality gates",
          "Per-node instrumentation and execution trace reporting",
          "Originality and editorial checks before final output formatting",
          "Multi-format output generation alongside structured evaluation metrics",
        ],
        implementation_details:
          "Graph module builds the LangGraph workflow and conditional routing logic. Nodes directory contains planner, researcher, critic, writer, editor, and formatter nodes. Service module runs the workflow and returns structured outputs with metrics. Metrics module computes quality, originality, and format coverage metrics. API module exposes a dedicated FastAPI service for research runs.",
        challenges_solutions: [
          {
            challenge: "Single-pass LLM research producing incomplete outputs",
            solution:
              "Critic-refiner revision loops with quality gates before final output",
          },
          {
            challenge: "No quality guarantees on generated research",
            solution:
              "Multi-metric evaluation (quality score, originality score, format coverage) with structured trace",
          },
        ],
        impact: [
          "Graph-based iterative research with revision loops and quality gates",
          "Evaluation: quality score, originality score, format coverage, failure rate, per-node latency",
        ],
      },
      {
        id: "genai_ui_builder",
        name: "Generative UI Builder",
        tagline:
          "Prompt-to-React workflow with schema validation and repair loops",
        category: "GenAI · Developer Tools",
        tier: "supporting",
        metrics: [
          "JSON intermediate format",
          "Schema-based validation",
          "Bounded repair loop",
        ],
        description:
          "A prompt-to-UI workflow that converts natural-language descriptions into structured UI specs, validates them, generates React code, and optionally repairs invalid outputs. Focuses on deterministic code generation from a constrained intermediate format.",
        problem_statement:
          "Direct LLM-to-code generation produces unpredictable outputs. A constrained intermediate format with schema validation and bounded repair loops enables more deterministic and inspectable UI generation.",
        solution_overview:
          "A user prompt is converted into a JSON UI specification, validated against allowed component types and structure, React files are generated, and a lightweight fix loop can repair missing or invalid output shapes.",
        architecture: [
          "Natural-language Prompt ingestion",
          "Spec Generator: structured JSON UI specification",
          "Validator: schema check against allowed components",
          "Code Generator: React component file generation",
          "Fix Loop: bounded repair for invalid or incomplete code",
          "Preview: lightweight browser preview of generated output",
        ],
        tech: [
          "Python",
          "JSON Intermediate Format",
          "React Code Generation",
          "Schema Validation",
        ],
        key_features: [
          "Structured JSON intermediate representation for predictable generation",
          "Schema-based validation before code output is accepted",
          "React file generation with optional preview workflow",
          "Bounded repair loop for malformed or incomplete code output",
        ],
        implementation_details:
          "Spec generator creates the structured UI spec from a natural-language prompt. Validator checks the generated spec against the allowed schema. Code generator converts validated specs into React component files. Fixer repairs invalid generated code with a bounded retry loop. Preview module serves a lightweight browser preview for generated UI output.",
        challenges_solutions: [
          {
            challenge: "Unpredictable LLM-generated code with no structure guarantees",
            solution:
              "JSON intermediate representation validated against schema before code generation",
          },
          {
            challenge: "Malformed code output from generation step",
            solution:
              "Bounded repair loop with retry limit to fix invalid outputs",
          },
        ],
        impact: [
          "Deterministic UI generation via schema-constrained intermediate format",
          "Evaluation: spec validity rate, code generation success, component coverage, latency, failure rate",
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────────
  // LANGGRAPH AGENTS (6)
  // ──────────────────────────────────────────────────────────
  {
    name: "LangGraph Agents",
    description:
      "State-machine agents with explicit state transitions, conditional routing, deterministic + LLM hybrid execution, retry loops with evaluator gates, and checkpoint recovery.",
    systems: [
      {
        id: "lg_data_agent",
        name: "Data Analysis Agent",
        tagline:
          "LangGraph workflow planning and executing data operations with evaluator-gated retries",
        category: "LangGraph · Data Analysis",
        tier: "featured",
        metrics: [
          "Evaluator-gated retry loop",
          "Deterministic execution",
          "Visualization support",
        ],
        description:
          "A LangGraph data analysis workflow that plans tabular operations, executes them deterministically, interprets the results, and loops through an evaluator until the analysis is sufficient. Aimed at structured data reasoning with controlled retries.",
        problem_statement:
          "Data analysis workflows need a structured plan-execute-evaluate loop where execution is deterministic, interpretation is LLM-backed, and quality is gated by an evaluator that can trigger retries.",
        solution_overview:
          "Generates an analysis plan, executes the plan over a dataset deterministically, interprets the result with LLM reasoning, evaluates quality, and re-enters the loop when the analysis is incomplete or incorrect.",
        architecture: [
          "Query + Data ingestion",
          "Planner: structured analysis plan generation",
          "Executor: deterministic tabular operations",
          "Analyzer: LLM-backed result interpretation",
          "Evaluator: quality gate with retry routing",
          "Output or retry loop re-entry",
        ],
        tech: [
          "Python",
          "LangGraph",
          "pandas",
          "DuckDB",
          "Chart Generation",
        ],
        key_features: [
          "LangGraph retry loop gated by an evaluator node",
          "Deterministic execution path for planned analysis steps",
          "LLM-backed interpretation layered on top of computed results",
          "Visualization support for analytical outputs",
        ],
        implementation_details:
          "Graph module defines the LangGraph workflow and evaluator loop. State module defines the workflow state passed between nodes. Nodes directory contains planner, executor, analyzer, and evaluator nodes. Data loader handles tabular dataset loading. Chart module generates charts and visualization artifacts when needed.",
        challenges_solutions: [
          {
            challenge: "Incomplete analysis without quality feedback",
            solution:
              "Evaluator-gated retry loop with explicit routing back to planner on failure",
          },
          {
            challenge: "LLM unreliable for numeric computation",
            solution:
              "Deterministic execution for tabular operations, LLM only for interpretation",
          },
        ],
        impact: [
          "Structured data analysis with evaluator-gated quality control",
          "Evaluation: analysis accuracy, code execution success rate, iteration count, latency, failure rate",
        ],
      },
      {
        id: "langgraph_data_analyst",
        name: "LangGraph Data Analyst",
        tagline:
          "Natural-language data analysis over CSV/Excel with sandboxed Python execution",
        category: "LangGraph · Data Analysis",
        tier: "featured",
        metrics: [
          "Sandboxed Python execution",
          "Validation-driven retries",
          "Structured Markdown reports",
        ],
        description:
          "A LangGraph-based data analysis agent that turns natural-language questions over CSV or Excel files into structured Markdown reports. Plans an analysis strategy, generates and executes Python-based dataframe operations in a sandbox, validates the result, and returns findings, anomalies, and recommendations through a FastAPI endpoint.",
        problem_statement:
          "Turning natural-language questions into correct data analysis requires planning, sandboxed code execution, validation with retry recovery, and structured report generation — not single-shot LLM answers.",
        solution_overview:
          "Receives a dataset path and a natural-language question, builds an analysis plan, generates and executes Python code in a sandboxed subprocess, validates the output through bounded retries, and produces a structured Markdown report with findings, anomalies, and recommendations.",
        architecture: [
          "Dataset + Query ingestion",
          "Planner: structured analysis plan from user question",
          "Executor: generates and runs analysis code against dataset",
          "Validator: checks result and triggers bounded retries",
          "Reporter: structured Markdown report with findings, anomalies, recommendations",
        ],
        tech: [
          "Python",
          "LangGraph",
          "pandas",
          "Subprocess Sandbox",
          "FastAPI",
        ],
        key_features: [
          "Natural-language data analysis over CSV and Excel files",
          "LangGraph orchestration with planner, executor, validator, and reporter stages",
          "Sandboxed Python execution for dataframe operations and chart generation",
          "Validation-driven retry loop to recover from failed or incomplete analyses",
          "FastAPI interface for programmatic use",
        ],
        implementation_details:
          "Planner agent produces a structured analysis plan from the user question. Executor agent generates and runs analysis code against the dataset. Validator agent checks whether the execution result answers the question and triggers bounded retries. Reporter agent writes the final report with findings, anomalies, and recommendations. Workflow module wires the LangGraph state machine and retry loop. Python executor runs generated code in a subprocess sandbox. Dataframe tools load and profile CSV or Excel inputs.",
        challenges_solutions: [
          {
            challenge: "Generated code failing or producing incorrect results",
            solution:
              "Validation-driven retry loop with bounded retries to recover from failures",
          },
          {
            challenge: "Unsafe code execution from LLM-generated analysis scripts",
            solution:
              "Subprocess sandbox with isolation for dataframe operations",
          },
        ],
        impact: [
          "Natural-language data analysis with sandboxed execution and structured reports",
          "Evaluation: execution success rate, report completeness, retry behavior, result correctness, latency, failure rate",
        ],
      },
      {
        id: "lg_debugging_agent",
        name: "Debugging Agent",
        tagline:
          "LangGraph workflow for iterative bug fixing with test validation",
        category: "LangGraph · Developer Tools",
        tier: "featured",
        metrics: [
          "Fix-test-evaluate loop",
          "Sandbox validation",
          "Budget-controlled retries",
        ],
        description:
          "A LangGraph debugging workflow that analyzes faulty code, proposes a fix, runs tests, and loops through evaluation until the issue is resolved or the retry budget is exhausted. Focuses on graph-controlled iterative debugging.",
        problem_statement:
          "Debugging requires iterative cycles of analysis, fix generation, and validation — not single-shot code suggestions. The fix-test loop needs explicit budget control to prevent infinite retries.",
        solution_overview:
          "Inspects the bug report or failing code, generates a candidate fix, runs validation or tests, and uses an evaluator node to decide whether another repair cycle is required.",
        architecture: [
          "Bug Report ingestion",
          "Analyzer: bug context and root cause analysis",
          "Fixer: LLM-generated candidate fix",
          "Tester: validation in controlled sandbox environment",
          "Evaluator: retry decision based on test results and budget",
          "Resolved Output or retry loop re-entry",
        ],
        tech: [
          "Python",
          "LangGraph",
          "Code Sandbox",
          "Test Execution",
          "Diff Generation",
        ],
        key_features: [
          "Graph-controlled fix-test-evaluate loop",
          "Explicit evaluator-based retry decisions",
          "Separation between bug analysis and validation execution",
          "Structured workflow suited to debugging automation experiments",
        ],
        implementation_details:
          "Graph module builds the LangGraph loop for iterative debugging. State module stores bug context, proposed fixes, and evaluation state. Nodes directory contains analyzer, fixer, tester, and evaluator nodes. Sandbox module runs tests or validation in a controlled environment. The evaluator sets is_resolved and iteration on state; a routing function inspects those values and either sends execution back to the fixer node or terminates the graph.",
        challenges_solutions: [
          {
            challenge: "Single-shot fixes failing on complex bugs",
            solution:
              "Iterative fix-test-evaluate loop with graph-controlled retry routing",
          },
          {
            challenge: "Uncontrolled retries producing infinite loops",
            solution:
              "Explicit iteration counter and budget-controlled termination in evaluator node",
          },
        ],
        impact: [
          "Graph-controlled iterative debugging with test validation",
          "Evaluation: bug resolution rate, retry count, test pass rate, latency, failure rate",
        ],
      },
      {
        id: "lg_support_agent",
        name: "Support Agent",
        tagline:
          "LangGraph support routing with retrieval-augmented responses and escalation logic",
        category: "LangGraph · Customer Support",
        tier: "supporting",
        metrics: [
          "Retrieval-augmented responses",
          "Confidence-based escalation",
          "Graph-based routing",
        ],
        description:
          "A LangGraph support workflow that classifies inbound requests, retrieves relevant context, generates a response, and decides whether the request should be escalated. Focuses on controlled support routing rather than generic chat assistance.",
        problem_statement:
          "Support automation needs structured request classification, retrieval-grounded responses, and explicit escalation paths for low-confidence cases — not generic chat that forces answers regardless of confidence.",
        solution_overview:
          "A support request is classified, enriched with retrieved context, answered by a responder node, and checked by an evaluator that can escalate low-confidence cases instead of forcing an answer.",
        architecture: [
          "Support Request ingestion",
          "Classifier: request type and priority classification",
          "Retriever: relevant context from support knowledge base",
          "Responder: retrieval-augmented response generation",
          "Evaluator: confidence check and escalation routing",
          "Resolved Response or Escalation",
        ],
        tech: [
          "Python",
          "LangGraph",
          "Knowledge Base Retrieval",
          "Confidence Routing",
        ],
        key_features: [
          "Graph-based support handling with explicit escalation paths",
          "Retrieval-augmented response generation for grounded answers",
          "Evaluator gate to avoid low-confidence responses",
          "Useful for support automation and workflow routing experiments",
        ],
        implementation_details:
          "Graph module defines the support workflow and escalation routing. State module tracks request details, retrieved context, and confidence state. Nodes directory contains classifier, retriever, responder, and evaluator nodes. Knowledge base module provides the support content used for retrieval.",
        challenges_solutions: [
          {
            challenge: "Forcing answers when confidence is low",
            solution:
              "Evaluator gate with confidence threshold routing to escalation path",
          },
          {
            challenge: "Generic responses without grounding in support documentation",
            solution:
              "Retrieval-augmented response generation from indexed knowledge base",
          },
        ],
        impact: [
          "Controlled support routing with retrieval grounding and escalation logic",
          "Evaluation: response relevance, escalation accuracy, resolution rate, latency, failure rate",
        ],
      },
      {
        id: "lg_workflow_agent",
        name: "Workflow Agent",
        tagline:
          "LangGraph workflow runner with checkpoints and continue-from-step capability",
        category: "LangGraph · Workflow Automation",
        tier: "supporting",
        metrics: [
          "Checkpoint-aware execution",
          "Step-level validation",
          "Resume from interruption",
        ],
        description:
          "A LangGraph workflow runner that plans a multi-step task, executes it with checkpoints, validates intermediate progress, and supports controlled continuation across steps. Focuses on durable stateful execution rather than a single-pass response.",
        problem_statement:
          "Multi-step workflows need durable execution with intermediate validation, checkpoint persistence, and recovery support — not single-pass responses that must be reran from scratch on failure.",
        solution_overview:
          "A task request is converted into steps, executed through a graph, validated at each stage, checkpointed for recovery, and resumed or completed depending on the state of execution.",
        architecture: [
          "Task Request ingestion",
          "Planner: task decomposition into ordered steps",
          "Executor: step-by-step execution with state tracking",
          "Validator: intermediate progress validation",
          "Checkpoint: state persistence and recovery",
          "Next Step or Resume from interruption",
          "Final Output",
        ],
        tech: [
          "Python",
          "LangGraph",
          "Checkpoint/Persistence",
          "State Recovery",
        ],
        key_features: [
          "Checkpoint-aware LangGraph execution for multi-step tasks",
          "Validation between steps instead of a single final check",
          "Resume support for interrupted or staged workflow runs",
          "Clear separation between planning, execution, and state persistence",
        ],
        implementation_details:
          "Graph module defines the state machine and checkpoint-aware routing. State module stores workflow steps, progress, and recovery data. Nodes directory contains planner, executor, validator, and checkpoint nodes. Checkpoint module handles persistence and resume support for workflow state.",
        challenges_solutions: [
          {
            challenge: "Long-running tasks failing and requiring full restart",
            solution:
              "Checkpoint persistence after each step with resume support from last checkpoint",
          },
          {
            challenge: "Errors detected only at final output",
            solution:
              "Step-level validation between execution stages",
          },
        ],
        impact: [
          "Durable multi-step workflow execution with checkpoint recovery",
          "Evaluation: step completion rate, checkpoint recovery success, latency, failure rate",
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────────
  // CREWAI SYSTEMS (5)
  // ──────────────────────────────────────────────────────────
  {
    name: "CrewAI Systems",
    description:
      "Role-based collaborative agent teams with sequential task handoffs, cumulative context passing, and composable multi-crew patterns.",
    systems: [
      {
        id: "crew_content_pipeline",
        name: "Content Pipeline",
        tagline:
          "CrewAI content production workflow with research-to-SEO optimization pipeline",
        category: "CrewAI · Content",
        tier: "supporting",
        metrics: [
          "4-stage content workflow",
          "Sequential context handoffs",
          "SEO optimization",
        ],
        description:
          "A CrewAI content production workflow that moves a topic through research, drafting, editing, and SEO optimization. Designed for structured marketing content generation with clear stage-by-stage handoffs between specialized agents.",
        problem_statement:
          "Content production requires research, writing, editorial review, and SEO optimization — sequential stages that benefit from specialized agent roles with context preservation across handoffs.",
        solution_overview:
          "Starts from a content brief, gathers source material via researcher agent, drafts the article via writer agent, refines via editor agent, and applies SEO-focused improvements via SEO specialist before returning the final asset.",
        architecture: [
          "Topic ingestion",
          "Researcher: source material gathering",
          "Writer: article drafting",
          "Editor: copy refinement",
          "SEO Specialist: search optimization",
          "Final Content output",
        ],
        tech: ["Python", "CrewAI", "Sequential Process"],
        key_features: [
          "Four-stage content workflow with explicit role separation",
          "Sequential handoffs that preserve context between agents",
          "Editorial and SEO review before final output",
          "Structured pipeline suitable for repeatable content generation",
        ],
        implementation_details:
          "Agents module defines the researcher, writer, editor, and SEO specialist roles. Tasks module defines the ordered task chain and expected outputs for each stage. Crew module assembles the sequential CrewAI pipeline.",
        challenges_solutions: [
          {
            challenge: "Context loss between content production stages",
            solution:
              "Sequential CrewAI handoffs preserving cumulative context across agents",
          },
        ],
        impact: [
          "Structured content production with role-based collaboration",
          "Evaluation: content quality, SEO alignment, stage completion, latency, failure rate",
        ],
      },
      {
        id: "crew_hiring_system",
        name: "Hiring Decision Crew",
        tagline:
          "CrewAI hiring evaluation with multi-perspective assessment and bias review",
        category: "CrewAI · HR Tech",
        tier: "featured",
        metrics: [
          "5-stage evaluation pipeline",
          "Bias audit stage",
          "Composable crews",
        ],
        description:
          "A CrewAI hiring workflow that evaluates candidates through screening, technical assessment, behavioral assessment, decision synthesis, and bias review. Intended for structured, multi-perspective hiring analysis.",
        problem_statement:
          "Hiring decisions require multi-perspective assessment with explicit bias review — screening, technical evaluation, behavioral evaluation, synthesis, and audit stages with traceable handoffs.",
        solution_overview:
          "A candidate profile moves through successive evaluators, each adding a focused assessment before a hiring manager synthesizes the final recommendation and a bias auditor checks for review quality risks.",
        architecture: [
          "Resume / Candidate Profile ingestion",
          "Screener: initial candidate screening",
          "Technical Interviewer: technical skill assessment",
          "Behavioral Interviewer: behavioral evaluation",
          "Hiring Manager: decision synthesis and recommendation",
          "Bias Auditor: review quality risk check",
          "Final Decision output",
        ],
        tech: [
          "Python",
          "CrewAI",
          "Structured Role-Based Evaluation",
        ],
        key_features: [
          "Five-stage candidate review pipeline with explicit role boundaries",
          "Separate technical and behavioral evaluation paths",
          "Bias audit stage before final recommendation output",
          "Structured handoffs that make the review process easier to trace",
        ],
        implementation_details:
          "Agents module defines the screening, interview, decision, and bias-audit agents. Tasks module defines the ordered hiring evaluation tasks and schemas. Crew module builds the CrewAI workflow used for candidate review. Supports composable crews: a single-candidate evaluation runs a 5-agent sequential pipeline, and a separate comparison crew synthesizes rankings across multiple candidates.",
        challenges_solutions: [
          {
            challenge: "Implicit bias in single-perspective evaluation",
            solution:
              "Multi-perspective assessment with explicit bias audit stage before recommendation",
          },
          {
            challenge: "Opaque decision-making process",
            solution:
              "Structured handoffs with per-stage outputs for full traceability",
          },
        ],
        impact: [
          "Multi-perspective hiring evaluation with bias audit and composable crews",
          "Evaluation: screening quality, evaluation consistency, bias detection rate, latency, failure rate",
        ],
      },
      {
        id: "crew_investment_analyst",
        name: "Investment Analyst Crew",
        tagline:
          "CrewAI investment research with multi-perspective analysis including red-team challenge",
        category: "CrewAI · Finance",
        tier: "featured",
        metrics: [
          "6-agent analysis pipeline",
          "Red-team adversarial review",
          "Structured investment memo",
        ],
        description:
          "A CrewAI investment research workflow that evaluates opportunities through market analysis, financial reasoning, risk review, strategic positioning, and adversarial challenge. Built for structured investment memos rather than open-ended chat responses.",
        problem_statement:
          "Investment analysis requires multi-perspective evaluation including adversarial challenge — market, financial, risk, strategic, and red-team perspectives must all contribute to a final memo with both upside and downside reasoning.",
        solution_overview:
          "Starts from an investment target, builds the business and market case, pressure-tests the opportunity through risk analysis, and finishes with a recommendation shaped by both supportive and skeptical perspectives.",
        architecture: [
          "Investment Opportunity ingestion",
          "Market Analyst: business and market context",
          "Financial Analyst: financial reasoning and metrics",
          "Risk Analyst: risk review and assessment",
          "Strategist: strategic positioning",
          "Red Team Reviewer: adversarial challenge",
          "Investment Memo output",
        ],
        tech: [
          "Python",
          "CrewAI",
          "Sequential Analysis Pipeline",
        ],
        key_features: [
          "Multi-perspective investment analysis with staged reasoning",
          "Dedicated risk and red-team review before recommendation output",
          "Sequential context handoff across specialist agents",
          "Structured memo generation for repeatable opportunity evaluation",
        ],
        implementation_details:
          "Agents module defines market, finance, risk, strategy, and adversarial reviewer agents. Tasks module defines the staged analysis tasks and expected memo structure. Crew module assembles the sequential investment evaluation crew. Uses a linear CrewAI process where each specialist adds a new layer of analysis, allowing the final recommendation to reflect both upside and downside reasoning.",
        challenges_solutions: [
          {
            challenge: "One-sided investment analysis without adversarial perspective",
            solution:
              "Red-team reviewer agent that pressure-tests the recommendation",
          },
          {
            challenge: "Fragmented analysis without cumulative context",
            solution:
              "Sequential context handoff so each agent reasons on all prior outputs",
          },
        ],
        impact: [
          "Multi-perspective investment analysis with adversarial red-team review",
          "Evaluation: investment thesis quality, risk coverage, recommendation consistency, latency, failure rate",
        ],
      },
      {
        id: "crew_product_launch",
        name: "Product Launch Crew",
        tagline:
          "CrewAI launch planning coordinating research, positioning, messaging, and execution",
        category: "CrewAI · Product",
        tier: "supporting",
        metrics: [
          "5-stage launch planning",
          "Integrated go-to-market plan",
          "Role-based coordination",
        ],
        description:
          "A CrewAI launch-planning workflow that coordinates research, positioning, messaging, channel planning, and launch execution recommendations. The goal is a cohesive go-to-market plan rather than isolated marketing artifacts.",
        problem_statement:
          "Product launches need coordinated planning across research, positioning, messaging, channels, and execution — producing a cohesive plan rather than isolated artifacts from disconnected stages.",
        solution_overview:
          "A product brief moves through market understanding, positioning, campaign planning, and launch sequencing so the final output combines strategy, messaging, and execution steps in one plan.",
        architecture: [
          "Product Brief ingestion",
          "Market Research: market understanding and context",
          "Positioning: product positioning strategy",
          "Messaging: campaign messaging development",
          "Channel Plan: channel strategy and selection",
          "Launch Plan: integrated go-to-market execution plan",
        ],
        tech: ["Python", "CrewAI", "Sequential Launch Planning"],
        key_features: [
          "Sequential launch-planning workflow with clear role ownership",
          "Combines positioning, messaging, and channel planning",
          "Produces a single integrated go-to-market recommendation",
          "Designed for repeatable planning from a compact product brief",
        ],
        implementation_details:
          "Agents module defines the launch strategy, research, messaging, and campaign agents. Tasks module defines the staged launch-planning tasks and deliverables. Crew module builds the product launch crew and execution order.",
        challenges_solutions: [
          {
            challenge: "Disconnected marketing artifacts without cohesive strategy",
            solution:
              "Sequential workflow producing an integrated plan from research through execution",
          },
        ],
        impact: [
          "Cohesive go-to-market planning with role-based coordination",
          "Evaluation: plan completeness, messaging quality, launch coherence, latency, failure rate",
        ],
      },
      {
        id: "crew_startup_simulator",
        name: "Startup Simulator",
        tagline:
          "CrewAI multi-phase startup simulation modeling cross-functional decision-making",
        category: "CrewAI · Simulation",
        tier: "featured",
        metrics: [
          "Multi-phase pipeline",
          "Cross-functional peer review",
          "4 role perspectives",
        ],
        description:
          "A CrewAI startup simulation that asks multiple functional leaders to propose, select, and refine a business idea before reviewing the resulting product, architecture, and execution plan. Designed to model cross-functional startup decision-making.",
        problem_statement:
          "Startup planning benefits from multiple functional perspectives — product, engineering, leadership — proposing independently, synthesizing a direction, and reviewing each other's outputs for cross-functional coherence.",
        solution_overview:
          "Begins with independent proposals from product, engineering, and leadership perspectives, selects a direction via CEO synthesis, then expands that decision into product, architecture, execution, and peer-review outputs.",
        architecture: [
          "Idea Prompt ingestion",
          "PM / CTO / Engineer: independent proposals",
          "CEO: direction selection and synthesis",
          "Product Spec generation",
          "Architecture planning",
          "Execution Plan generation",
          "Cross-functional Peer Reviews",
        ],
        tech: [
          "Python",
          "CrewAI",
          "Phased Multi-Stage Pipeline",
        ],
        key_features: [
          "Independent proposal generation from multiple startup roles",
          "Decision synthesis before downstream planning begins",
          "Cross-functional peer review of generated artifacts",
          "Useful for comparing how different role perspectives shape execution",
        ],
        implementation_details:
          "Agents module defines the CEO, product, engineering, and technical leadership roles. Tasks module defines the proposal, selection, planning, and review tasks across four phases: independent proposals, CEO selection, feedforward pipeline, and cross-functional peer review. Crew module builds the full multi-phase startup simulation crew. The PM reviews the CEO's selection; the CTO reviews the PM's spec; the Engineer reviews the CTO's architecture; the CEO reviews the Engineer's execution plan.",
        challenges_solutions: [
          {
            challenge: "Single-perspective planning missing critical tradeoffs",
            solution:
              "Multi-role proposals followed by cross-functional peer review",
          },
          {
            challenge: "Linear planning without synthesis checkpoint",
            solution:
              "CEO selection phase synthesizes direction before downstream planning",
          },
        ],
        impact: [
          "Cross-functional startup simulation with multi-phase peer review",
          "Evaluation: proposal quality, decision coherence, review coverage, latency, failure rate",
        ],
      },
    ],
  },
];
