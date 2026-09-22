import React from "react";
import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { renderWithProviders, darkTheme, lightTheme } from "../test/testUtils";
import ContactLinksList from "../components/socialMedia/ContactLinksList";

describe("ContactLinksList Component", () => {
  it("renders all 8 configured contact channels in the requested order", () => {
    renderWithProviders(<ContactLinksList theme={darkTheme} />);

    expect(screen.getAllByRole("link").map(link => link.getAttribute("aria-label"))).toEqual([
      "Email",
      "LinkedIn",
      "GitHub",
      "Signal",
      "Telegram",
      "X (Twitter)",
      "Instagram",
      "Facebook",
    ]);

    for (const link of screen.getAllByRole("link")) {
      expect(link.querySelector(".contact-links-label").textContent).toBe(
        link.getAttribute("aria-label")
      );
    }

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
    expect(screen.getByRole("link", { name: "Signal" })).toHaveAttribute(
      "href",
      "https://signal.me/#eu/5hQ4yUft1AR5QQvBc-XjFL2mdhUpH25OcYuUAqBZt_7G0DcNFLFCALWX2s4wUi-e"
    );
    expect(screen.getByRole("link", { name: "Telegram" })).toHaveAttribute(
      "href",
      "https://t.me/dataintuitionist"
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

  it("renders custom icons from /contacts-icons/ for all 7 icon platforms", () => {
    const { container } = renderWithProviders(<ContactLinksList theme={darkTheme} />);

    const images = container.querySelectorAll(".contact-links-icon-img");
    const srcList = Array.from(images).map(img => img.getAttribute("src"));

    expect(srcList).toContain("/contacts-icons/github.png");
    expect(srcList).toContain("/contacts-icons/linkedin.png");
    expect(srcList).toContain("/contacts-icons/twitter.png");
    expect(srcList).toContain("/contacts-icons/signal.png");
    expect(srcList).toContain("/contacts-icons/telegram.png");
    expect(srcList).toContain("/contacts-icons/instagram.png");
    expect(srcList).toContain("/contacts-icons/facebook.png");
  });

  it("applies the invert filter class only to GitHub in dark mode", () => {
    const { container } = renderWithProviders(<ContactLinksList theme={darkTheme} />);

    const invertedImages = container.querySelectorAll(
      ".contact-links-icon-img--invert"
    );
    const invertedSrcs = Array.from(invertedImages).map(img =>
      img.getAttribute("src")
    );

    expect(invertedSrcs).toContain("/contacts-icons/github.png");
    expect(invertedSrcs).toHaveLength(1);
    expect(invertedSrcs).not.toContain("/contacts-icons/signal.png");
    expect(invertedSrcs).not.toContain("/contacts-icons/linkedin.png");
  });

  it("does not apply invert filter in light mode", () => {
    const { container } = renderWithProviders(<ContactLinksList theme={lightTheme} />);

    const invertedImages = container.querySelectorAll(
      ".contact-links-icon-img--invert"
    );
    expect(invertedImages.length).toBe(0);
  });

  it("renders all configured contact descriptions", () => {
    renderWithProviders(<ContactLinksList theme={darkTheme} />);

    const descriptions = [
      "Send me an email",
      "Connect with me on LinkedIn",
      "GenAI engineering work and open-source repositories.",
      "Connect with me on Signal",
      "Connect with me on Telegram",
      "Connect with me on X",
      "Connect with me on instagram",
      "Connect with me on Facebook",
    ];

    for (const description of descriptions) {
      expect(screen.getByText(description)).toBeInTheDocument();
    }
  });

  it("renders Signal with the standard social-media card structure", () => {
    renderWithProviders(<ContactLinksList theme={darkTheme} />);

    const signal = screen.getByRole("link", { name: "Signal" });
    expect(signal.querySelector(".contact-links-icon-img")).toHaveAttribute(
      "src",
      "/contacts-icons/signal.png"
    );
    expect(signal.querySelector(".contact-links-label")).toHaveTextContent("Signal");
    expect(signal.querySelector(".contact-links-desc")).toHaveTextContent(
      "Connect with me on Signal"
    );
  });

  it("keeps the email destination while hiding the address from visible text", () => {
    renderWithProviders(<ContactLinksList theme={darkTheme} />);

    const email = screen.getByRole("link", { name: "Email" });
    expect(email).toHaveAttribute("href", "mailto:ahmad.iiitk@gmail.com");
    expect(email).toHaveTextContent("Send me an email");
    expect(email).not.toHaveTextContent("ahmad.iiitk@gmail.com");
  });
});
