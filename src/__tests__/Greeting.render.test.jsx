import React from "react";
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Greeting from "../containers/greeting/Greeting";
import { renderWithProviders, darkTheme } from "../test/testUtils";

describe("Home hero", () => {
  it("states the role and working focus", () => {
    renderWithProviders(<Greeting theme={darkTheme} />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Production AI Engineer specializing in multimodal document intelligence, LLM extraction architectures, agentic workflows, and LLM evaluation.",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText("AI & Data Science Engineer · Gurugram, India")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/At Deloitte, I designed extraction for 117 fields across seven related groups/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/confidence-aware four-pass extraction and validation/)
    ).toHaveTextContent(/At Cognizant, I improved an existing warranty system/);
  });

  it("renders selected work and contact actions", () => {
    renderWithProviders(<Greeting theme={darkTheme} />);

    expect(screen.getByRole("link", { name: "View professional work" })).toHaveAttribute(
      "href",
      "#professional-work"
    );
    expect(screen.getByRole("link", { name: "Contact me" })).toHaveAttribute(
      "href",
      "/contact"
    );
    expect(screen.getByRole("link", { name: "Contact me" })).not.toHaveClass("button-secondary");
    expect(screen.getByRole("link", { name: "View GitHub profile" })).toHaveAttribute("href", "https://github.com/pypi-ahmad");
    expect(screen.getByRole("link", { name: "View GitHub profile" })).toHaveClass("button-secondary");
  });

  it("does not render retired hero content", () => {
    renderWithProviders(<Greeting theme={darkTheme} />);
    expect(screen.queryByText("Hello.")).not.toBeInTheDocument();
    expect(screen.queryByText("View Cover Letter")).not.toBeInTheDocument();
    expect(
      screen.queryByText(/LLMs are useful but never self-validating/)
    ).not.toBeInTheDocument();
    expect(document.querySelector(".greeting-image-div")).not.toBeInTheDocument();
  });
});
