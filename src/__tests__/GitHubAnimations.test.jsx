import { describe, it, expect, vi } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { renderWithProviders } from "../test/testUtils";
import AnimationsView, {
  animations,
} from "../components/github/AnimationsView";
import GitHubPage from "../pages/github/GitHubPage";
import { games } from "../components/github/arcade/registry";
vi.mock("../components/github/dashboardStore", () => ({
  useDashboard: () => ({ data: null, status: "error", retry: vi.fn() }),
}));

describe("Separate contribution animations", () => {
  it("lists all seven without loading or starting an animation", async () => {
    const { container } = renderWithProviders(<AnimationsView />);
    expect(
      screen.getAllByRole("button", { name: /^Play .* animation$/ }),
    ).toHaveLength(7);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(animations.map((a) => a.name)).toEqual(games.map((g) => g.name));
    expect((await axe(container)).violations).toEqual([]);
  });
  it.each(["light", "dark"])(
    "plays and stops each original %s SVG",
    (theme) => {
      renderWithProviders(<AnimationsView />, { theme });
      for (const animation of animations) {
        fireEvent.click(
          screen.getByRole("button", {
            name: `Play ${animation.name} animation`,
          }),
        );
        const image = screen.getByRole("img");
        expect(image).toHaveAttribute(
          "src",
          `https://raw.githubusercontent.com/pypi-ahmad/pypi-ahmad/output/${animation.file}${theme === "dark" ? "-dark" : ""}.svg`,
        );
        fireEvent.load(image);
        expect(
          screen.getByText("Playing. Stop the animation at any time."),
        ).toBeInTheDocument();
        fireEvent.click(
          screen.getByRole("button", {
            name: `Stop ${animation.name} animation`,
          }),
        );
        expect(screen.queryByRole("img")).not.toBeInTheDocument();
      }
    },
  );
  it("offers a retry for an unavailable image", () => {
    renderWithProviders(<AnimationsView />);
    fireEvent.click(
      screen.getByRole("button", { name: "Play Snake animation" }),
    );
    fireEvent.error(screen.getByRole("img"));
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.getByText(/Animation unavailable/)).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole("button", { name: "Retry Snake animation" }),
    );
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
  it("opens directly even when dashboard data is unavailable", async () => {
    renderWithProviders(<GitHubPage />, {
      initialEntries: ["/github?tab=animations"],
    });
    expect(
      await screen.findByRole("heading", { name: "Contribution animations" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Animations", exact: true }),
    ).toHaveAttribute("aria-current", "page");
    expect(
      screen.getByRole("link", { name: "Arcade", exact: true }),
    ).toHaveAttribute("href", "/github?tab=arcade");
    expect(
      screen.queryByText(/GitHub data is unavailable/),
    ).not.toBeInTheDocument();
  });
});
