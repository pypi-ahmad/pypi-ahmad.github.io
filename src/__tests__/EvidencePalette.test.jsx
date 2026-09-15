import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Metric } from "../components/github/GitHubSummary";
import { MetricsStrip } from "../components/ProfessionalWork/ProfessionalWork";
import { homeMetrics } from "../data/homePage";
import { lightTheme, darkTheme } from "../theme";
import { renderWithProviders } from "../test/testUtils";

describe("Evidence palette", () => {
  it.each([0, 42, null])("preserves the meaning of the GitHub count %s", value => {
    const { container } = renderWithProviders(<dl><Metric label="Stars" value={value} note="Public repositories I own" /></dl>);
    const metric = container.querySelector(".gh-metric");
    if (value === null) expect(metric).not.toHaveAttribute("data-evidence");
    else expect(metric).toHaveAttribute("data-evidence", "true");
    expect(screen.getByText(value === null ? "Unavailable" : String(value))).toBeInTheDocument();
    expect(screen.getByText("Public repositories I own")).toBeInTheDocument();
  });

  it.each([lightTheme, darkTheme])("keeps $name result links distinct from numeric emphasis", theme => {
    const { container } = renderWithProviders(<MetricsStrip theme={theme} />);
    expect(container.querySelector(".metrics-strip")).toHaveStyle({ background: theme.evidenceSurface, borderColor: theme.evidenceBorder });
    for (const metric of homeMetrics) {
      const link = screen.getByRole("link", { name: `${metric.label}: ${metric.value}. Read the project story.` });
      expect(link).toHaveAttribute("href", metric.href);
      expect(link.querySelector("strong")).toHaveStyle({ color: theme.evidenceText });
      expect(link.querySelector(".metric-label")).toHaveStyle({ color: theme.accentSolid });
      expect(link).toHaveTextContent(metric.context);
    }
    expect(screen.getByText(/Reported team and system results from internal employer evaluations/)).toBeInTheDocument();
  });
});
