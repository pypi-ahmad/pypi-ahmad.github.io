/**
 * Vitest Setup File
 *
 * Loaded before every test file. Registers extended DOM matchers
 * and provides global mocks for browser APIs not available in jsdom.
 */
import "@testing-library/jest-dom";

// ── Mock IntersectionObserver (used by framer-motion whileInView) ────
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

// ── Mock matchMedia (used by App.jsx for pointer:fine check) ─────────
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
