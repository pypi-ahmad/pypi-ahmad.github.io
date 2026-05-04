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
    "I'm a Generative AI Engineer with 3+ years building LLM, agentic, and document intelligence systems for healthcare and automotive teams on Azure, AWS, and Databricks.",
  // HERO — 3 signal bullets (rendered by Greeting component)
  heroBullets: [
    "Improved health-policy entity extraction to 99% on internal evaluations using Gemini-3-Pro with a canonical validation loop",
    "Raised SOP-grounded Computer-Using Agent task completion from 38% to ~80% with Milvus-backed RAG planning",
    "Reduced prompt-token usage by ~40% in browser automation by using accessibility-tree snapshots instead of raw DOM context",
    "Delivered prior-authorization and insurance document intelligence workflows across Azure Databricks, Azure Content Understanding, and AWS-hosted agent systems",
  ],
  // PHILOSOPHY — engineering mindset signal
  philosophy:
    "LLMs are useful but never self-validating. I treat model outputs as untrusted signals, then add retrieval, schema checks, comparison loops, and human oversight until the system is reliable enough for real workflows.",
  resumeLink: "Resume.pdf",
  coverLetterLink: "Cover.pdf",
  mail: "mailto:ahmad.iiitk@gmail.com",
};

export { greeting };

