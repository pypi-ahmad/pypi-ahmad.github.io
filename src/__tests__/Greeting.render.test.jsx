import React from "react";
import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Greeting from "../containers/greeting/Greeting";
import { renderWithProviders, darkTheme } from "../test/testUtils";

describe("Home hero", () => {
  it("states the role and working focus", () => {
    renderWithProviders(<Greeting theme={darkTheme} />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "I build applied AI systems and test whether they work.",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText("Applied AI Engineer · Gurugram, India")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/AI and Data Science Engineer at Deloitte/)
    ).toBeInTheDocument();
  });

  it("shows four qualified internal outcomes", () => {
    renderWithProviders(<Greeting theme={darkTheme} />);
    const outcomes = screen.getByRole("list");

    expect(within(outcomes).getAllByRole("listitem")).toHaveLength(4);
    expect(within(outcomes).getByText("38% to 80%")).toBeInTheDocument();
    expect(within(outcomes).getByText("~40% lower")).toBeInTheDocument();
    expect(
      within(outcomes).getByText("80% to 81%, then above 90%")
    ).toBeInTheDocument();
    expect(within(outcomes).getByText("90% to 99%")).toBeInTheDocument();
    expect(
      screen.getByText(/team and system results from confidential internal evaluations/i)
    ).toBeInTheDocument();
  });

  it("identifies Ahmad's contribution for every outcome", () => {
    renderWithProviders(<Greeting theme={darkTheme} />);
    expect(screen.getAllByText(/^I worked on/)).toHaveLength(4);
  });

  it("renders selected work and contact actions", () => {
    renderWithProviders(<Greeting theme={darkTheme} />);

    expect(screen.getByRole("link", { name: "View selected work" })).toHaveAttribute(
      "href",
      "#selected-work"
    );
    expect(screen.getByRole("link", { name: "Contact me" })).toHaveAttribute(
      "href",
      "/contact"
    );
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
