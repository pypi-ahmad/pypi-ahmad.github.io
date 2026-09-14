import { beforeEach, afterEach, describe, it, expect, vi } from "vitest";
import {
  act,
  fireEvent,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { axe } from "jest-axe";
import { renderWithProviders, darkTheme } from "../test/testUtils";
import { githubFixture } from "../test/githubFixture";
import GitHubPage from "../pages/github/GitHubPage";
import GitHubPreview from "../components/github/GitHubPreview";
import LazyGitHubPreview from "../components/github/LazyGitHubPreview";
import ContributionCalendar from "../components/github/ContributionCalendar";
import AdvancedDashboard from "../components/github/AdvancedDashboard";
import { DataStatus, number } from "../components/github/GitHubSummary";
import Arcade, { readBest } from "../components/github/arcade/Arcade";
import { games } from "../components/github/arcade/registry";
import { useDashboard } from "../components/github/dashboardStore";
vi.mock("../components/github/dashboardStore", () => ({
  useDashboard: vi.fn(),
}));

let data, frames;
beforeEach(() => {
  data = githubFixture();
  frames = [];
  localStorage.clear();
  useDashboard.mockReturnValue({ data, status: "current", retry: vi.fn() });
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
    () =>
      new Proxy(
        {},
        {
          get: (_target, key) => (key === "canvas" ? {} : vi.fn()),
          set: () => true,
        },
      ),
  );
  vi.spyOn(window, "requestAnimationFrame").mockImplementation((fn) => {
    frames.push(fn);
    return frames.length;
  });
  vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});
});
afterEach(() => vi.restoreAllMocks());

describe("Native dashboard and history", () => {
  it("renders all metric families, scope, selected year and 3D without a game download", async () => {
    const { container } = renderWithProviders(<GitHubPage theme={darkTheme} />);
    expect(
      screen.getByRole("heading", { level: 1, name: "GitHub statistics" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Distribution and repository traffic",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Public repository aggregates/),
    ).toBeInTheDocument();
    expect(container.querySelector("canvas")).toBeNull();
    fireEvent.click(screen.getByRole("link", { name: "Activity", exact: true }));
    await screen.findByLabelText("Contribution year", {}, { timeout: 10000 });
    fireEvent.change(screen.getByLabelText("Contribution year"), {
      target: { value: "2023" },
    });
    fireEvent.click(screen.getByRole("button", { name: "3D view" }));
    expect(
      screen.getByRole("img", {
        name: /Isometric contribution history for 2023/,
      }),
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("link", { name: "Arcade", exact: true }));
    expect(
      await screen.findByRole("button", { name: "Snake", exact: true }, { timeout: 10000 }),
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Ready", { exact: true }),
    ).toBeInTheDocument();
  });
  it("shows loading and recoverable errors without invented metrics", () => {
    const retry = vi.fn();
    useDashboard.mockReturnValue({ data: null, status: "error", retry });
    const { rerender } = renderWithProviders(<GitHubPage theme={darkTheme} />);
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(retry).toHaveBeenCalled();
    expect(screen.queryByText("Current streak")).not.toBeInTheDocument();
    rerender(<DataStatus data={null} status="loading" />);
    expect(screen.getByRole("status")).toHaveTextContent(
      "Loading GitHub activity",
    );
  });
  it("formats unavailable metrics, dates and freshness and supports refresh", () => {
    const retry = vi.fn();
    renderWithProviders(
      <DataStatus data={data} status="saved" retry={retry} />,
    );
    expect(screen.getByText(/Saved snapshot/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Check for updates" }));
    expect(retry).toHaveBeenCalled();
    expect(number(null)).toBe("Unavailable");
    expect(number(1234)).toBe("1,234");
  });
  it("keeps the compact preview linked to the full dashboard", () => {
    renderWithProviders(<GitHubPreview />);
    expect(
      screen.getByRole("link", { name: /View GitHub dashboard/ }),
    ).toHaveAttribute("href", "/github");
    expect(screen.getAllByRole("definition")).toHaveLength(4);
  });
  it("loads the preview only near the viewport and disconnects its observer", async () => {
    let callback;
    const disconnect = vi.fn();
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        constructor(fn) {
          callback = fn;
        }
        observe() {}
        disconnect() {
          disconnect();
        }
      },
    );
    const { unmount } = renderWithProviders(<LazyGitHubPreview />);
    expect(screen.queryByText("Building in the open.")).not.toBeInTheDocument();
    act(() => callback([{ isIntersecting: false }]));
    act(() => callback([{ isIntersecting: true }]));
    expect(
      await screen.findByText("Building in the open."),
    ).toBeInTheDocument();
    unmount();
    expect(disconnect).toHaveBeenCalled();
    vi.unstubAllGlobals();
  });
  it("supports calendar dates, keyboard boundaries, exact values and leap day", () => {
    renderWithProviders(<ContributionCalendar year={data.years[1]} />);
    const last = screen.getByRole("button", {
      name: "2024-02-29: 3 contributions",
    });
    last.focus();
    fireEvent.keyDown(last, { key: "ArrowLeft" });
    expect(
      screen.getByRole("button", { name: "2024-02-28: 2 contributions" }),
    ).toHaveFocus();
    fireEvent.keyDown(document.activeElement, { key: "Home" });
    expect(
      screen.getByRole("button", { name: "2024-02-01: 0 contributions" }),
    ).toHaveFocus();
    fireEvent.keyDown(document.activeElement, { key: "End" });
    expect(last).toHaveFocus();
    fireEvent.click(
      screen.getByRole("button", { name: "2024-02-02: 1 contribution" }),
    );
    expect(screen.getByRole("status")).toHaveTextContent(
      "2024-02-02: 1 contribution",
    );
    fireEvent.click(screen.getByRole("button", { name: "3D view" }));
    expect(screen.getByRole("img")).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole("button", { name: "Calendar", exact: true }),
    );
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
  it("handles missing, empty, loading and failed calendar data", () => {
    const retry = vi.fn();
    const { rerender } = renderWithProviders(
      <ContributionCalendar year={null} />,
    );
    expect(screen.getByText(/No contribution dates/)).toBeInTheDocument();
    rerender(<ContributionCalendar status="loading" />);
    expect(screen.getByRole("status")).toHaveTextContent("Loading");
    rerender(<ContributionCalendar status="error" onRetry={retry} />);
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(retry).toHaveBeenCalled();
    rerender(
      <ContributionCalendar
        year={{
          year: 2024,
          total: 0,
          days: [{ date: "2024-01-01", count: 0, level: 0 }],
        }}
      />,
    );
    expect(screen.getByText(/No contributions recorded/)).toBeInTheDocument();
  });
  it("renders empty advanced groups with coverage and passes automated semantics", async () => {
    data.reach.external_recent = [];
    data.reach.star_series = [];
    data.coding.languages = [];
    data.coding.activeRepositories = [];
    const { container } = renderWithProviders(
      <AdvancedDashboard data={data} />,
    );
    expect(
      screen.getByText("No public external repositories recorded."),
    ).toBeInTheDocument();
    expect(screen.getByText("No pushes in this period.")).toBeInTheDocument();
    expect((await axe(container)).violations).toEqual([]);
  });
});

describe("Arcade controls", () => {
  it("loads all seven games and supports play, pause, resume and restart", async () => {
    const { unmount } = renderWithProviders(
      <Arcade year={data.years[1]} snapshot={data.generatedAt} />,
    );
    for (const game of games) {
      fireEvent.click(
        screen.getByRole("button", { name: game.name, exact: true }),
      );
      await screen.findByText("Ready", { exact: true });
      fireEvent.click(
        screen.getByRole("button", { name: "Play", exact: true }),
      );
      expect(screen.getByText("Playing", { exact: true })).toBeInTheDocument();
      fireEvent.keyDown(
        screen.getByRole("group", { name: `${game.name} game board` }),
        { key: "Escape" },
      );
      expect(screen.getByText(/Paused — resume/)).toBeInTheDocument();
      fireEvent.click(screen.getByRole("button", { name: "Resume" }));
      fireEvent.click(screen.getByRole("button", { name: "Restart" }));
      fireEvent.click(
        screen.getByRole("button", { name: "Pause", exact: true }),
      );
    }
    unmount();
    expect(cancelAnimationFrame).toHaveBeenCalled();
  });
  it("runs animation frames, responds to keys, pauses on blur, and ends a Snake run", async () => {
    renderWithProviders(
      <Arcade year={data.years[1]} snapshot={data.generatedAt} />,
    );
    await screen.findByText("Ready", { exact: true });
    fireEvent.click(screen.getByRole("button", { name: "Play", exact: true }));
    const board = screen.getByRole("group", { name: "Snake game board" });
    fireEvent.keyDown(board, { key: "ArrowUp" });
    for (let i = 0; i < 36; i++) act(() => frames.at(-1)(i * 40));
    expect(screen.getByText(/Game over/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Restart" }));
    fireEvent(window, new Event("blur"));
    expect(screen.getByText(/Paused — resume/)).toBeInTheDocument();
  });
  it("keeps the running snapshot stable and resets on a different year", async () => {
    const { rerender } = renderWithProviders(
      <Arcade year={data.years[1]} snapshot={data.generatedAt} />,
    );
    await screen.findByText("Ready", { exact: true });
    fireEvent.click(screen.getByRole("button", { name: "Play", exact: true }));
    rerender(
      <Arcade year={{ ...data.years[1] }} snapshot="2024-03-02T00:00:00Z" />,
    );
    expect(screen.getByText("Playing", { exact: true })).toBeInTheDocument();
    rerender(<Arcade year={data.years[0]} snapshot={data.generatedAt} />);
    expect(
      await screen.findByText("Ready", { exact: true }),
    ).toBeInTheDocument();
  });
  it("Minesweeper supports keyboard reveal, flags and touch action selection", async () => {
    renderWithProviders(
      <Arcade year={data.years[1]} snapshot={data.generatedAt} />,
    );
    await screen.findByText("Ready", { exact: true });
    fireEvent.click(
      screen.getByRole("button", { name: "Minesweeper", exact: true }),
    );
    await screen.findByText("Ready", { exact: true });
    fireEvent.click(screen.getByRole("button", { name: "Play", exact: true }));
    const cell = screen.getByRole("button", {
      name: "Row 1, column 1: Hidden",
    });
    fireEvent.keyDown(cell, { key: "f" });
    expect(cell).toHaveAccessibleName("Row 1, column 1: Flagged");
    fireEvent.click(screen.getByRole("button", { name: "Flag", exact: true }));
    fireEvent.click(cell);
    expect(cell).toHaveAccessibleName("Row 1, column 1: Hidden");
    fireEvent.keyDown(cell, { key: "Enter" });
    expect(cell).toHaveAccessibleName(/adjacent mines/);
    fireEvent.keyDown(cell, { key: "ArrowRight" });
    expect(
      screen.getByRole("button", { name: /^Row 1, column 2:/ }),
    ).toHaveFocus();
  });
  it("recovers a failed game import and handles unavailable years or storage", async () => {
    const original = games[0].load;
    const load = vi
      .spyOn(games[0], "load")
      .mockRejectedValueOnce(new Error("offline"))
      .mockImplementation(original);
    renderWithProviders(
      <Arcade
        year={{ ...data.years[1], total: 0 }}
        snapshot={data.generatedAt}
      />,
    );
    fireEvent.click(
      await screen.findByRole("button", { name: "Try loading game again" }),
    );
    expect(
      await screen.findByText("Ready", { exact: true }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Play", exact: true }),
    ).toBeDisabled();
    load.mockRestore();
    localStorage.setItem("bad", "invalid");
    expect(readBest("bad")).toBe(0);
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(readBest("anything")).toBe(0);
  });
});
