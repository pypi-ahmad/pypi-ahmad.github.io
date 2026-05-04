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
    "Recent open-source work spans provider-native computer use, shared AI platforms, and the portfolio experience itself.",
};

export const projects = {
  data: [
    {
      name: "CUA — Computer Using Agent",
      url: "https://github.com/pypi-ahmad/computer-use",
      description:
        "Multi-provider Computer Use workbench built with React and FastAPI, running all desktop actions inside an isolated Docker Ubuntu/XFCE sandbox with provider-native search planning, safety confirmations, live WebSocket streaming, and 482 passing pytest tests.",
      category: "Agentic AI · Open Source",
    },
    {
      name: "GenAI Systems Lab",
      url: "https://github.com/pypi-ahmad/genai-systems-lab",
      description:
        "Shared execution and evaluation platform for 20 AI systems across GenAI pipelines, LangGraph state machines, and CrewAI teams — with live streaming, BYOK model access, session memory, and benchmark leaderboards.",
      category: "AI Platform",
    },
    {
      name: "pypi-ahmad.github.io",
      url: "https://github.com/pypi-ahmad/pypi-ahmad.github.io",
      description:
        "Portfolio website built with React, Vite, and Framer Motion, organized around data-driven case studies, themed UI surfaces, and component-level render tests.",
      category: "Frontend",
    },
  ],
};
