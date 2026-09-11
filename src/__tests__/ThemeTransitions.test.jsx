import React from "react";
import { act, fireEvent, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { renderWithProviders } from "../test/testUtils";
import { useThemeController } from "../themeController";

afterEach(() => vi.restoreAllMocks());

function RapidThemeToggle() {
  const { toggleMode } = useThemeController();
  return (
    <button
      onClick={() => {
        // A batched round trip can leave the mode unchanged while cleanup is still needed.
        toggleMode();
        toggleMode();
      }}
    >
      Toggle twice
    </button>
  );
}

it("restores transitions even when rapid toggles leave the mode unchanged", () => {
  const frames = new Map();
  let nextId = 0;
  vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
    frames.set(++nextId, callback);
    return nextId;
  });
  vi.spyOn(window, "cancelAnimationFrame").mockImplementation((id) =>
    frames.delete(id),
  );
  const { unmount } = renderWithProviders(<RapidThemeToggle />);
  const overrides = () =>
    [...document.head.querySelectorAll("style")].filter(
      (style) =>
        style.textContent ===
        "*,*::before,*::after{transition:none !important}",
    );
  fireEvent.click(screen.getByRole("button", { name: "Toggle twice" }));
  expect(localStorage.getItem("theme")).toBe("dark");
  expect(overrides()).toHaveLength(1);
  for (let frame = 0; frame < 2; frame++) {
    // Snapshot before invoking: callbacks scheduled here belong to the next frame.
    const callbacks = [...frames.values()];
    frames.clear();
    act(() => callbacks.forEach((callback) => callback(0)));
  }
  expect(overrides()).toHaveLength(0);
  fireEvent.click(screen.getByRole("button", { name: "Toggle twice" }));
  unmount();
  expect(overrides()).toHaveLength(0);
  expect(frames.size).toBe(0);
});
