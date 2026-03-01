/**
 * App — Smoke Test
 *
 * Verifies the root <App /> component renders without throwing
 * using React Testing Library.
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";

describe("App — Root Component", () => {
  it("renders without crashing", () => {
    const { unmount } = render(<App />);
    // The app should render the logo text from the Header
    expect(screen.getByText("ahmad.m()")).toBeInTheDocument();
    unmount();
  });

  it("renders the hero title on the home page", () => {
    const { unmount } = render(<App />);
    expect(screen.getByRole("heading", { level: 1, name: "Hello." })).toBeInTheDocument();
    unmount();
  });
});
