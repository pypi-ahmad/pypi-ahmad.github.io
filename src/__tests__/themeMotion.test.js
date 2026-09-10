import { afterEach, describe, expect, it, vi } from "vitest";
import { revealMotion } from "../themeMotion";
import { settings } from "../data/settings";

afterEach(() => vi.restoreAllMocks());

describe("portfolio motion policy", () => {
  it("reveals once with a short desktop entrance", () => {
    expect(revealMotion()).toMatchObject({
      "data-motion": "reveal",
      initial: { opacity: 0, y: 14 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: "some" },
      transition: { duration: 0.4, delay: 0 },
    });
  });

  it("caps desktop stagger at 180ms", () => {
    expect(revealMotion(1).transition.delay).toBe(0.06);
    expect(revealMotion(10).transition.delay).toBe(0.18);
    expect(revealMotion(-1).transition.delay).toBe(0);
  });

  it("runs hero entrances on mount instead of waiting for intersection", () => {
    const entrance = revealMotion(1, true);
    expect(entrance.animate).toEqual({ opacity: 1, y: 0 });
    expect(entrance).not.toHaveProperty("whileInView");
  });

  it("uses opacity-only entrances on mobile without stagger", () => {
    vi.spyOn(window, "matchMedia").mockImplementation(query => ({
      matches: query === "(max-width: 768px)",
    }));
    expect(revealMotion(3)).toMatchObject({
      initial: { opacity: 0, y: 0 },
      transition: { duration: 0.25, delay: 0 },
    });
  });

  it("starts visible with no delay under reduced motion", () => {
    vi.spyOn(window, "matchMedia").mockImplementation(query => ({
      matches: query === "(prefers-reduced-motion: reduce)",
    }));
    expect(revealMotion(3)).toMatchObject({
      initial: false,
      transition: { duration: 0, delay: 0 },
    });
  });

  it("keeps the native browser cursor by default", () => {
    expect(settings.useCustomCursor).toBe(false);
  });
});
