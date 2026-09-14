import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Header from "../src/components/header/Header";
import ContributionCalendar from "../src/components/github/ContributionCalendar";
import { ThemeControllerProvider } from "../src/themeController";
import { GlobalStyles } from "../src/global";
import "../src/index.css";
import "../src/components/github/github.css";

function fixture(length, count) {
  const days = Array.from({ length }, (_, index) => ({
    date: new Date(Date.UTC(2024, 0, index + 1)).toISOString().slice(0, 10),
    count: count(index),
    level: Math.min(4, count(index)),
  }));
  return {
    year: 2024,
    days,
    total: days.reduce((total, day) => total + day.count, 0),
  };
}
const scenarios = [
  {
    label: "Full leap year, dense activity · wide container",
    width: 1120,
    year: fixture(366, (i) => (i % 5) + 4),
  },
  {
    label: "Sparse partial year · 320px container",
    width: 320,
    year: fixture(60, (i) => (i % 17 ? 0 : 1)),
  },
  {
    label: "One contribution date · 320px container",
    width: 320,
    year: fixture(1, () => 1200),
  },
  { label: "No contribution dates", width: 640, year: fixture(0, () => 0) },
  {
    label: "Dates present, zero contributions",
    width: 390,
    year: fixture(31, () => 0),
  },
  { label: "Loading history", width: 320, status: "loading" },
  { label: "Unavailable history with recovery", width: 320, status: "error" },
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
            <h1>Contribution calendar scenarios</h1>
            <p>
              Visual pass: no layout breaks observed in the scenarios below in
              Chromium, dark mode, at a 1440px viewport. The real calendar
              accepts dated contribution counts and renders a selectable history
              view for the GitHub page.
            </p>
            <p>
              Scenarios cover production quantities, density, container widths,
              and loading/error states. Arbitrary text and 10× year lengths are
              excluded because this component accepts fixed date labels and at
              most one calendar year.
            </p>
            <p>
              Use the site menu to change theme. Try keyboard navigation, zoom,
              and reduced motion through your browser settings.
            </p>
            {scenarios.map(({ label, width, ...props }) => (
              <section
                key={label}
                style={{ width, maxWidth: "100%", marginBlock: "3rem" }}
              >
                <h2>{label}</h2>
                <ContributionCalendar
                  {...props}
                  onRetry={() => window.location.reload()}
                />
              </section>
            ))}
            <section
              style={{ maxWidth: "100%", width: 640, marginBlock: "3rem" }}
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
                <ContributionCalendar year={fixture(31, (i) => i % 3)} />
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
