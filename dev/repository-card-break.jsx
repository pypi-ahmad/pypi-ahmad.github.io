import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Header from "../src/components/header/Header";
import RepositoryCard from "../src/components/github/RepositoryCard";
import { ThemeControllerProvider } from "../src/themeController";
import { GlobalStyles } from "../src/global";
import "../src/index.css";
import "../src/components/github/github.css";
const repository = {
  name: "document-intelligence-agent",
  fullName: "pypi-ahmad/document-intelligence-agent",
  url: "https://github.com/pypi-ahmad/document-intelligence-agent",
  description:
    "A local document intelligence project with source-linked answers.",
  language: "Python",
  topics: ["ai", "documents"],
  stars: 12,
  pushedAt: "2026-09-14T00:00:00Z",
  archived: false,
  fork: false,
};
const scenarios = [
  { label: "Typical public repository · 320px", width: 320 },
  {
    label: "Missing description, language, push date, and topics",
    width: 320,
    patch: {
      description: "",
      language: "",
      pushedAt: null,
      topics: [],
      stars: 0,
    },
  },
  {
    label: "One-word description and one topic",
    width: 390,
    patch: { description: "Parser", topics: ["parser"] },
  },
  {
    label: "Long description and 100-character repository name",
    width: 320,
    patch: {
      name: "a".repeat(100),
      description: "Reviewable document intelligence. ".repeat(10),
    },
  },
  {
    label: "Twenty topics and a large star count",
    width: 640,
    patch: {
      topics: Array.from(
        { length: 20 },
        (_, i) => `document-intelligence-topic-${i}`,
      ),
      stars: 1234567,
    },
  },
  {
    label: "Emoji and tall-script description",
    width: 320,
    patch: {
      description:
        "🔎 Source-linked answers. Ångström, tiếng Việt, दस्तावेज़ विश्लेषण — readable evidence.",
    },
  },
  {
    label: "Mixed-direction description",
    width: 320,
    patch: {
      description:
        "تحليل المستندات باستخدام Python مع روابط للمصادر وإجابات قابلة للمراجعة.",
    },
  },
  {
    label: "Featured archived fork",
    width: 390,
    featured: true,
    patch: { archived: true, fork: true },
  },
  { label: "Very wide container", width: 1120 },
];
function Report() {
  return (
    <ThemeControllerProvider>
      <MotionConfig reducedMotion="user">
        <GlobalStyles />
        <MemoryRouter>
          <Header />
          <main
            id="main-content"
            className="gh"
            style={{ paddingBlock: "2rem" }}
          >
            <h1>Repository card scenarios</h1>
            <p>
              Visual pass: no layout breaks observed in the rendered cases in
              Chromium, dark mode, at a 1440px viewport. Topic disclosures were
              closed in this pass; their expanded contents remain yours to try.
              This card accepts public repository metadata and renders a linked
              project summary in the Projects view.
            </p>
            <p>
              Kept: variable text length and scripts, topic quantity, status
              badges, and container widths. Dropped: loading/error/disabled
              states, which belong to the explorer rather than this card;
              impossible repository-name scripts and topic counts above GitHub’s
              limit.
            </p>
            <p>
              Open the topic disclosures and tab through links. Use the site
              theme control or your browser’s zoom and reduced-motion settings.
            </p>
            {scenarios.map(({ label, width, patch, featured }) => (
              <section
                key={label}
                style={{ width, maxWidth: "100%", marginBlock: "3rem" }}
              >
                <h2>{label}</h2>
                <RepositoryCard
                  repository={{ ...repository, ...patch }}
                  featured={featured}
                />
              </section>
            ))}
            <section
              style={{ width: 640, maxWidth: "100%", marginBlock: "3rem" }}
            >
              <h2>Squeezed beside another grid item</h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr) minmax(0, 2fr)",
                  gap: "1rem",
                }}
              >
                <p>Adjacent content</p>
                <RepositoryCard repository={repository} />
              </div>
            </section>
          </main>
        </MemoryRouter>
      </MotionConfig>
    </ThemeControllerProvider>
  );
}
if (import.meta.env.DEV)
  createRoot(document.getElementById("root")).render(<Report />);
