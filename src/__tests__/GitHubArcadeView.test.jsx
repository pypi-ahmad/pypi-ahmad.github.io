import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, screen } from "@testing-library/react";
import { useSearchParams } from "react-router-dom";
import { renderWithProviders } from "../test/testUtils";
import { discoveryFixture } from "../test/discoveryFixture";
import ArcadeView from "../components/github/arcade/ArcadeView";
import {
  dailyChallenge,
  PROGRESS_KEY,
} from "../components/github/arcade/progress";
let lastProps;
vi.mock("../components/github/arcade/Arcade", () => ({
  default: (props) => {
    lastProps = props;
    return (
      <div>
        <p>Engine: {props.selectedGame}</p>
        <button
          onClick={() =>
            props.onComplete({
              id: "completed",
              game: props.selectedGame,
              ...props.runContext,
              score: 10,
              outcome: "won",
              finishedAt: new Date().toISOString(),
            })
          }
        >
          Finish test run
        </button>
      </div>
    );
  },
}));
function Harness() {
  const [params, setParams] = useSearchParams();
  const data = discoveryFixture();
  return (
    <ArcadeView
      data={data}
      year={data.years[1]}
      params={params}
      update={(changes) =>
        setParams((previous) => {
          const next = new URLSearchParams(previous);
          for (const [key, value] of Object.entries(changes))
            value === null ? next.delete(key) : next.set(key, value);
          return next;
        })
      }
    />
  );
}
beforeEach(() => {
  localStorage.clear();
});
afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});
describe("Daily challenge and progress UI", () => {
  it("keeps the challenge frozen across UTC rollover until explicitly replaced", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-09-14T23:59:50Z"));
    renderWithProviders(<Harness />, {
      initialEntries: ["/github?tab=arcade&mode=daily"],
    });
    expect(lastProps.year.challengeSeed).toBe(
      dailyChallenge("2026-09-14").seed,
    );
    act(() => vi.advanceTimersByTime(30000));
    expect(lastProps.runContext.challenge).toBe("2026-09-14");
    fireEvent.click(
      screen.getByRole("button", { name: "Play today’s challenge" }),
    );
    expect(lastProps.runContext.challenge).toBe("2026-09-15");
    expect(lastProps.lockedGame).toBe(true);
  });
  it("records completed daily runs once and confirms destructive clearing", () => {
    renderWithProviders(<Harness />, {
      initialEntries: ["/github?mode=daily&challenge=2026-09-01"],
    });
    fireEvent.click(screen.getByRole("button", { name: "Finish test run" }));
    fireEvent.click(screen.getByRole("button", { name: "Finish test run" }));
    expect(JSON.parse(localStorage.getItem(PROGRESS_KEY)).runs).toHaveLength(1);
    expect(
      screen.getByText("Unlocked — Win a daily challenge"),
    ).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole("button", { name: "Clear arcade progress" }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(localStorage.getItem(PROGRESS_KEY)).not.toBeNull();
    fireEvent.click(
      screen.getByRole("button", { name: "Clear arcade progress" }),
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Clear all arcade progress" }),
    );
    expect(localStorage.getItem(PROGRESS_KEY)).toBeNull();
    expect(screen.getByText(/No completed runs yet/)).toBeInTheDocument();
  });
  it("keeps free-play data and game selection, switches modes, and reports blocked clearing", () => {
    renderWithProviders(<Harness />, {
      initialEntries: ["/github?game=minesweeper"],
    });
    expect(lastProps.selectedGame).toBe("minesweeper");
    expect(lastProps.year.year).toBe(2024);
    fireEvent.change(screen.getByLabelText("Play mode"), {
      target: { value: "daily" },
    });
    expect(lastProps.lockedGame).toBe(true);
    localStorage.setItem("github-arcade:test", "1");
    vi.spyOn(Storage.prototype, "removeItem").mockImplementation(() => {
      throw new Error("denied");
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Clear arcade progress" }),
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Clear all arcade progress" }),
    );
    expect(
      screen.getByText(/Unable to clear saved progress/),
    ).toBeInTheDocument();
  });
});
