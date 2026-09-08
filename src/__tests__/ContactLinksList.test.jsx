import React from "react";
import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { renderWithProviders, darkTheme, lightTheme } from "../test/testUtils";
import ContactLinksList from "../components/socialMedia/ContactLinksList";

describe("ContactLinksList Component", () => {
  it("renders all 9 configured contact channels", () => {
    renderWithProviders(<ContactLinksList theme={darkTheme} />);

    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/pypi-ahmad"
    );
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/ahmad-mle/"
    );
    expect(screen.getByRole("link", { name: "X (Twitter)" })).toHaveAttribute(
      "href",
      "https://x.com/pypi_ahmad"
    );
    expect(screen.getByRole("link", { name: "Email" })).toHaveAttribute(
      "href",
      "mailto:ahmad.iiitk@gmail.com"
    );
    expect(screen.getByRole("link", { name: "WhatsApp" })).toHaveAttribute(
      "href",
      "https://wa.me/pypi_ahmad"
    );
    expect(screen.getByRole("link", { name: "Telegram" })).toHaveAttribute(
      "href",
      "https://t.me/dataintuitionist"
    );
    expect(screen.getByRole("link", { name: "Portfolio" })).toHaveAttribute(
      "href",
      "https://pypi-ahmad.github.io/"
    );
    expect(screen.getByRole("link", { name: "Instagram" })).toHaveAttribute(
      "href",
      "https://www.instagram.com/dataintuitionist/"
    );
    expect(screen.getByRole("link", { name: "Facebook" })).toHaveAttribute(
      "href",
      "https://www.facebook.com/dataintuitionist/"
    );
  });

  it("renders custom icons from /contacts-icons/ for all 8 icon platforms", () => {
    const { container } = renderWithProviders(<ContactLinksList theme={darkTheme} />);

    const images = container.querySelectorAll(".contact-links-icon-img");
    const srcList = Array.from(images).map(img => img.getAttribute("src"));

    expect(srcList).toContain("/contacts-icons/github.png");
    expect(srcList).toContain("/contacts-icons/linkedin.png");
    expect(srcList).toContain("/contacts-icons/twitter.png");
    expect(srcList).toContain("/contacts-icons/whatsapp.png");
    expect(srcList).toContain("/contacts-icons/telegram.png");
    expect(srcList).toContain("/contacts-icons/portfolio.png");
    expect(srcList).toContain("/contacts-icons/instagram.png");
    expect(srcList).toContain("/contacts-icons/facebook.png");
  });

  it("applies invert filter class to github and portfolio in dark mode", () => {
    const { container } = renderWithProviders(<ContactLinksList theme={darkTheme} />);

    const invertedImages = container.querySelectorAll(
      ".contact-links-icon-img--invert"
    );
    const invertedSrcs = Array.from(invertedImages).map(img =>
      img.getAttribute("src")
    );

    expect(invertedSrcs).toContain("/contacts-icons/github.png");
    expect(invertedSrcs).toContain("/contacts-icons/portfolio.png");
    expect(invertedSrcs).not.toContain("/contacts-icons/whatsapp.png");
    expect(invertedSrcs).not.toContain("/contacts-icons/linkedin.png");
  });

  it("does not apply invert filter in light mode", () => {
    const { container } = renderWithProviders(<ContactLinksList theme={lightTheme} />);

    const invertedImages = container.querySelectorAll(
      ".contact-links-icon-img--invert"
    );
    expect(invertedImages.length).toBe(0);
  });

  it("renders Twitter bio in the card description", () => {
    renderWithProviders(<ContactLinksList theme={darkTheme} />);

    expect(
      screen.getByText(
        "AI Engineer | Data Scientist | GenAI • Agentic AI • ML • LLMs | @Deloitte USI"
      )
    ).toBeInTheDocument();
  });
});
