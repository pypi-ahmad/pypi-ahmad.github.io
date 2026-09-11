import React from "react";
import { act, cleanup, screen } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Splash from "../pages/splash/Splash";
import { renderWithProviders } from "../test/testUtils";

function renderSplash() {
  return renderWithProviders(
    <Routes>
      <Route path="/splash" element={<Splash />} />
      <Route path="/home" element={<h1>Home destination</h1>} />
    </Routes>,
    { initialEntries: ["/splash"] }
  );
}

// Freeze only the fallback clock; immediate-load assertions must pass without advancing it.
beforeEach(() => vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] }));
afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("Splash readiness", () => {
  it("redirects immediately when the document is already loaded", () => {
    vi.spyOn(document, "readyState", "get").mockReturnValue("complete");
    renderSplash();
    expect(screen.getByRole("heading", { name: "Home destination" })).toBeInTheDocument();
  });

  it("redirects on load without advancing timers and cancels the fallback", () => {
    vi.spyOn(document, "readyState", "get").mockReturnValue("loading");
    renderSplash();
    expect(screen.getByRole("status", { name: "Loading portfolio" })).toBeInTheDocument();
    act(() => window.dispatchEvent(new Event("load")));
    expect(screen.getByRole("heading", { name: "Home destination" })).toBeInTheDocument();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("retains the three-second fallback when load never arrives", () => {
    vi.spyOn(document, "readyState", "get").mockReturnValue("loading");
    renderSplash();
    act(() => vi.advanceTimersByTime(2999));
    expect(screen.getByRole("status", { name: "Loading portfolio" })).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1));
    expect(screen.getByRole("heading", { name: "Home destination" })).toBeInTheDocument();
  });

  it("removes the load listener and fallback on unmount", () => {
    vi.spyOn(document, "readyState", "get").mockReturnValue("loading");
    const removeListener = vi.spyOn(window, "removeEventListener");
    const { unmount } = renderSplash();
    unmount();
    expect(vi.getTimerCount()).toBe(0);
    expect(removeListener).toHaveBeenCalledWith("load", expect.any(Function));
    act(() => window.dispatchEvent(new Event("load")));
    expect(vi.getTimerCount()).toBe(0);
  });
});
