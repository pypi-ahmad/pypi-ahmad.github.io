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
  nickname: "ahmad / GenAI Engineer",
  fullName: "Ahmad Mujtaba",
  // HERO — 1-line positioning
  subTitle:
    "I design and build production-grade AI systems — agentic workflows, document intelligence pipelines, and RAG architectures — engineered for reliability, validation, and measurable enterprise impact.",
  // HERO — 3 signal bullets (rendered by Greeting component)
  heroBullets: [
    "Built enterprise IDP pipeline achieving 99% extraction accuracy across complex insurance documents",
    "Designed RAG-grounded Computer-Using Agent, improving task automation success rate from 38% to 80%",
    "Architected multi-agent research system with critic-refiner loops and quality-scored evaluation — 3–5x faster research workflows",
    "Built MCP-based UI automation system with AX Tree parsing — reducing token cost by ~40% while improving action accuracy",
  ],
  // PHILOSOPHY — engineering mindset signal
  philosophy:
    "LLMs are powerful but unreliable components. Every system I build treats model outputs as unverified signals — wrapped in validation layers, evaluation loops, and structured guardrails to deliver trustworthy results at enterprise scale.",
  resumeLink: "Resume.pdf",
  coverLetterLink: "Cover.pdf",
  mail: "mailto:ahmad.iiitk@gmail.com",
};

export { greeting };

