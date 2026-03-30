/**
 * App — Smoke Test
 *
 * Verifies the root <App /> component renders without throwing
 * using React Testing Library.
 */
import React from "react";
import { render, screen, cleanup, act } from "@testing-library/react";
import { describe, it, expect, afterEach, beforeEach } from "vitest";
import App from "./App";

beforeEach(() => {
  // Reset URL so BrowserRouter matches "/" correctly after other test files
  window.history.pushState({}, "", "/");
});

afterEach(cleanup);

describe("App — Root Component", () => {
  it("renders without crashing", async () => {
    await act(async () => {
      render(<App />);
    });
    // The app should render the logo text from the Header (lazy-loaded)
    expect(await screen.findByText("ahmad.m()", {}, { timeout: 10000 })).toBeInTheDocument();
  });

  it("renders the hero title on the home page", async () => {
    await act(async () => {
      render(<App />);
    });
    expect(await screen.findByRole("heading", { level: 1, name: "Hello." }, { timeout: 10000 })).toBeInTheDocument();
  });
});
