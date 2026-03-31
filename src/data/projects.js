/**
 * Projects Data
 *
 * `projectsHeader`  — Title and description for the /projects page header.
 * `projects.data`   — Array of open-source project cards.
 *
 * Each project: { name, url, description, category }
 */
export const projectsHeader = {
  title: "Projects",
  description:
    "My methodologies include Reasoning-Driven IDP, Agentic Workflows, and Enterprise RAG systems.",
};

export const projects = {
  data: [
    {
      name: "pypi-ahmad.github.io",
      url: "https://github.com/pypi-ahmad/pypi-ahmad.github.io",
      description:
        "Portfolio website built with React, Vite, and Framer Motion featuring dynamic theming, lazy-loaded routes, and a premium design system.",
      category: "Frontend",
    },
    {
      name: "Agentic RAG Pipeline",
      url: "https://github.com/pypi-ahmad",
      description:
        "End-to-end retrieval-augmented generation pipeline with multi-agent orchestration, vector search, and LLM-powered reasoning.",
      category: "AI / ML",
    },
    {
      name: "Enterprise IDP Engine",
      url: "https://github.com/pypi-ahmad",
      description:
        "Intelligent document processing system using OCR, NLP, and reasoning-driven extraction for enterprise workflows.",
      category: "AI / ML",
    },
  ],
};
