/**
 * Greeting / Hero Section Data
 *
 * Populates the home-page hero (Greeting.jsx).
 * Includes personal info, positioning statement, hero bullets,
 * engineering philosophy, and downloadable document links.
 */
const greeting = {
  title: "Hello.",
  title2: "Ahmad",
  logoName: "ahmad.m()",
  nickname: "ahmad / Generative AI Engineer",
  fullName: "Ahmad Mujtaba",
  // HERO — 1-line positioning
  subTitle:
    "I'm a Generative AI Engineer with 3+ years building LLM, agentic, and document intelligence systems for healthcare workflows on Azure, AWS, and Databricks.",
  // HERO — 3 signal bullets (rendered by Greeting component)
  heroBullets: [
    "Improved scanned prior-authorization fax extraction from ~80-81% to 90%+ with a 4-pass, confidence-aware pipeline",
    "Improved health-policy entity extraction from 90% to 99% through model migration, prompt refinement, and canonical validation",
    "Raised Milvus-backed multi-agent task completion from 38% to 80% by strengthening retrieval and orchestration",
    "Reduced browser-agent prompt-token usage by ~40% with Playwright MCP, accessibility-tree snapshots, and JPEG-compressed observations",
  ],
  // PHILOSOPHY — engineering mindset signal
  philosophy:
    "LLMs are useful but never self-validating. I treat model outputs as untrusted signals, then add retrieval, schema checks, comparison loops, confidence logic, and human oversight until the system is reliable enough for real workflows.",
  resumeLink: "Resume.pdf",
  coverLetterLink: "Cover.pdf",
  mail: "mailto:ahmad.iiitk@gmail.com",
};

export { greeting };

