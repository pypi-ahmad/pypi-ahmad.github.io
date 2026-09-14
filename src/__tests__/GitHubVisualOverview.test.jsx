import { describe, expect, it } from "vitest";
import { screen, within } from "@testing-library/react";
import { axe } from "jest-axe";
import { renderWithProviders } from "../test/testUtils";
import { githubFixture } from "../test/githubFixture";
import GitHubVisualOverview, {
  contributionRanges,
  languageShares,
  rollingContributionWindow,
} from "../components/github/GitHubVisualOverview";

describe("Live GitHub visual overview", () => {
  it("calculates language share against all repository bytes", () => {
    expect(
      languageShares([
        { name: "Python", bytes: 300 },
        { name: "JavaScript", bytes: 100 },
      ]).map(({ name, percent }) => [name, percent]),
    ).toEqual([
      ["Python", 75],
      ["JavaScript", 25],
    ]);
    expect(languageShares([])).toEqual([]);
  });

  it("calculates all-time, current and longest contribution ranges", () => {
    const years = [
      {
        year: 2024,
        days: [
          { date: "2024-01-01", count: 1, level: 1 },
          { date: "2024-01-02", count: 1, level: 1 },
          { date: "2024-01-03", count: 0, level: 0 },
          { date: "2024-01-04", count: 2, level: 2 },
          { date: "2024-01-05", count: 1, level: 1 },
          { date: "2024-01-06", count: 3, level: 3 },
          { date: "2024-01-07", count: 0, level: 0 },
        ],
      },
    ];
    expect(contributionRanges(years, "2024-01-07")).toEqual({
      allTime: 8,
      coverageStart: "2024-01-01",
      coverageEnd: "2024-01-07",
      currentStart: "2024-01-04",
      currentEnd: "2024-01-06",
      longest: 3,
      longestStart: "2024-01-04",
      longestEnd: "2024-01-06",
    });
  });

  it("builds an inclusive rolling year across leap and calendar years", () => {
    const years = [
      {
        year: 2023,
        days: [{ date: "2023-03-03", count: 1, level: 1 }],
      },
      {
        year: 2024,
        days: [
          { date: "2024-02-29", count: 2, level: 2 },
          { date: "2024-03-01", count: 3, level: 3 },
        ],
      },
    ];
    const window = rollingContributionWindow(years, "2024-03-01");
    expect(window.start).toBe("2023-03-03");
    expect(window.end).toBe("2024-03-01");
    expect(window.days).toHaveLength(365);
    expect(window.days.find((day) => day.date === "2024-02-29")?.count).toBe(2);
    expect(window.total).toBe(6);
    expect(window.complete).toBe(false);
    expect(window.cells).toHaveLength(window.weeks * 7);
  });

  it("renders factual metrics, a responsive grid and exact daily counts", async () => {
    const data = githubFixture();
    const { container } = renderWithProviders(
      <GitHubVisualOverview data={data} />,
    );
    expect(
      screen.getByRole("heading", { name: "GitHub statistics snapshot" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Most used languages")).toBeInTheDocument();
    expect(
      screen.getByLabelText("8 active original public repositories"),
    ).toBeInTheDocument();
    expect(screen.getByText("75%")).toBeInTheDocument();
    expect(screen.getByText("25%")).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: "Rolling contribution calendar" }),
    ).toHaveAttribute("tabindex", "0");
    expect(
      screen.getByRole("link", { name: "Explore contribution history" }),
    ).toHaveAttribute("href", "/github?tab=activity");
    const details = screen
      .getByText("View exact rolling daily counts")
      .closest("details");
    expect(within(details).getByText("2024-02-29")).toBeInTheDocument();
    expect(
      within(details).getAllByText("Not available").length,
    ).toBeGreaterThan(0);
    expect((await axe(container)).violations).toEqual([]);
  });
});
