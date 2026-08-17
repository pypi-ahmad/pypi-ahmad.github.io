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
  nickname: "ahmad / Applied AI Engineer",
  fullName: "Ahmad Mujtaba",
  // HERO — 1-line positioning
  subTitle:
    "I'm an Applied AI Engineer building reliable Document AI, RAG, and agentic systems, with production experience in evaluation, structured extraction, healthcare AI, and Azure deployments.",
  // HERO — 3 signal bullets (rendered by Greeting component)
  heroBullets: [
    "Browser task completion increased from 38% to 80% across the same 200-task internal evaluation; I contributed Milvus retrieval, reranking, and failure-aware routing",
    "Browser-agent prompt-token consumption fell by approximately 40% in an internal evaluation; I contributed accessibility-tree snapshots and compressed observations",
    "Structured-extraction accuracy increased from 80–81% to above 90% on the same internal benchmark; I contributed multi-pass extraction, confidence-aware retries, and routing",
    "Policy-entity extraction accuracy increased from 90% to 99% on the same internal benchmark; I contributed prompt iteration, canonical comparison, and evaluation",
  ],
  // PHILOSOPHY — engineering mindset signal
  philosophy:
    "LLMs are useful but never self-validating. I treat model outputs as untrusted signals, then add retrieval, schema checks, comparison loops, confidence logic, and human oversight until the system is reliable enough for real workflows.",
  resumeLink: "Resume.pdf",
  coverLetterLink: "Cover.pdf",
  mail: "mailto:ahmad.iiitk@gmail.com",
};

export { greeting };
