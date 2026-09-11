/**
 * Vitest Setup File
 *
 * Loaded before every test file. Registers extended DOM matchers
 * and provides global mocks for browser APIs not available in jsdom.
 */
import "@testing-library/jest-dom/vitest";

// No intersections are synthesized: component tests inspect structure, not scroll-triggered visibility.
class IntersectionObserverMock {
  constructor(callback) {
    this.callback = callback;
    this.entries = [];
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.IntersectionObserver = IntersectionObserverMock;

// Default to a fine pointer; tests for viewport or motion preferences override this matcher explicitly.
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: query === "(pointer: fine)",
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// ── Mock scrollTo (used by navigation transitions) ───────────────────
window.scrollTo = vi.fn();

// ── Mock ResizeObserver (used by some layout components) ─────────────
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver = ResizeObserverMock;
