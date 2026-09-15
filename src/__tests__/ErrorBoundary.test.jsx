import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import ErrorBoundary from "../components/ErrorBoundary";

function BrokenPage() { throw new Error("Test route failure"); }

it("focuses the named error heading and leaves Refresh reachable", async () => {
  // React reports this intentional render failure; restore logging even if an assertion fails.
  const error = vi.spyOn(console, "error").mockImplementation(() => {});
  try {
    render(<ErrorBoundary><BrokenPage /></ErrorBoundary>);
    expect(screen.getByRole("main", { name: "Unable to display this page" })).toHaveAccessibleDescription(
      "Refresh the page to try again."
    );
    expect(screen.getByRole("heading", { name: "Unable to display this page" })).toHaveFocus();
    await userEvent.setup().tab();
    expect(screen.getByRole("button", { name: "Refresh page" })).toHaveFocus();
  } finally {
    error.mockRestore();
  }
});

it("preserves healthy children", () => {
  render(<ErrorBoundary><p>Healthy route</p></ErrorBoundary>);
  expect(screen.getByText("Healthy route")).toBeVisible();
});
