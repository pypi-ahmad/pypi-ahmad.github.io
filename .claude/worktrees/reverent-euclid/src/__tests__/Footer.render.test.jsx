/**
 * Footer — UI Rendering Tests
 *
 * Verifies the Footer component renders attribution text and emoji.
 *
 * Source: src/components/footer/Footer.jsx
 */
import React from "react";
import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Footer from "../components/footer/Footer";
import { renderWithProviders, darkTheme, lightTheme } from "../test/testUtils";

describe("Footer — UI Rendering", () => {
  it("renders 'Made with ❤️ by Ahmad' text", () => {
    renderWithProviders(<Footer theme={darkTheme} />);
    const footer = screen.getByText(/Made with/);
    expect(footer).toBeInTheDocument();
    expect(screen.getByText(/Ahmad/)).toBeInTheDocument();
  });

  it("renders the heart emoji with proper aria-label", () => {
    renderWithProviders(<Footer theme={darkTheme} />);
    const heartEmoji = screen.getByRole("img", { name: "love" });
    expect(heartEmoji).toBeInTheDocument();
    expect(heartEmoji.textContent).toBe("❤️");
  });

  it("applies secondaryText color from theme", () => {
    renderWithProviders(<Footer theme={darkTheme} />);
    const footerText = screen.getByText(/Made with/);
    expect(footerText).toHaveStyle({ color: darkTheme.secondaryText });
  });

  it("applies light theme color when theme is light", () => {
    renderWithProviders(<Footer theme={lightTheme} />, { theme: "light" });
    const footerText = screen.getByText(/Made with/);
    expect(footerText).toHaveStyle({ color: lightTheme.secondaryText });
  });
});
