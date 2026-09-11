import React, { lazy, Suspense } from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Link, MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import RouteNavigation from "../components/RouteNavigation";

function Controls() {
  const navigate = useNavigate();
  return <>
    <Link to="/next">Next</Link>
    <Link to="/next" replace>Replace</Link>
    <Link to="/next#anchor">Fragment page</Link>
    <Link to="#anchor">Same-page fragment</Link>
    <button onClick={() => navigate(-1)}>Back</button>
  </>;
}

function setup(next = <main>Next page</main>) {
  return render(<MemoryRouter initialEntries={["/home"]}>
    <Controls />
    <Suspense fallback={<p>Loading</p>}>
      <RouteNavigation />
      <Routes>
        <Route path="/home" element={<main>Home page</main>} />
        <Route path="/next" element={next} />
      </Routes>
    </Suspense>
  </MemoryRouter>);
}

describe("Route navigation", () => {
  beforeEach(() => vi.clearAllMocks());

  it("preserves initial entry and hash-only navigation", async () => {
    setup();
    expect(screen.getByRole("main")).not.toHaveFocus();
    expect(window.scrollTo).not.toHaveBeenCalled();
    await userEvent.click(screen.getByText("Same-page fragment"));
    expect(screen.getByRole("main")).not.toHaveFocus();
    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it.each(["Next", "Replace"])("focuses and resets scroll on %s", async label => {
    setup();
    await userEvent.click(screen.getByText(label, { selector: "a" }));
    expect(screen.getByRole("main")).toHaveFocus();
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: "instant" });
  });

  it("does not reset fragment or POP scroll", async () => {
    setup();
    await userEvent.click(screen.getByText("Fragment page"));
    expect(screen.getByRole("main")).toHaveFocus();
    expect(window.scrollTo).not.toHaveBeenCalled();
    await userEvent.click(screen.getByText("Back"));
    expect(screen.getByRole("main")).toHaveTextContent("Home page");
    expect(screen.getByRole("main")).toHaveFocus();
    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it("waits for the lazy destination before moving focus", async () => {
    // Hold the import promise open to test the loading boundary without a timing race.
    let resolvePage;
    const page = new Promise(resolve => { resolvePage = resolve; });
    const Destination = lazy(() => page);
    setup(<Destination />);
    await userEvent.click(screen.getByText("Next", { selector: "a" }));
    expect(window.scrollTo).not.toHaveBeenCalled();
    await act(async () => resolvePage({ default: () => <main>Loaded destination</main> }));
    expect(screen.getByRole("main")).toHaveTextContent("Loaded destination");
    expect(screen.getByRole("main")).toHaveFocus();
    expect(window.scrollTo).toHaveBeenCalledTimes(1);
  });
});
