import React from "react";
import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders, darkTheme } from "../test/testUtils";
import Home from "../pages/home/HomeComponent";
import Experience from "../pages/experience/Experience";
import { careerProgression, careerStages } from "../data/experience";

describe("Career progression", () => {
  it("uses the confirmed project periods and three distinct stages", () => {
    expect(careerStages.map(({ period, title }) => [period, title])).toEqual([
      ["Sep 2022 – Dec 2024", "ML, NLP & data science"],
      ["Jan – May 2025", "Conversational AI"],
      ["Jul 2025 – Present", "GenAI & agentic AI"],
    ]);
  });

  it.each([["Home", Home], ["Experience", Experience]])("renders the same accessible progression on %s", (_, Page) => {
    renderWithProviders(<Page theme={darkTheme} />);
    const section = screen.getByRole("region", { name: careerProgression.title });
    const scope = within(section);
    expect(scope.getByText(careerProgression.introduction)).toBeInTheDocument();
    expect(scope.getAllByRole("listitem")).toHaveLength(3);
    for (const stage of careerStages) {
      expect(scope.getByRole("heading", { name: stage.title, level: 3 })).toBeInTheDocument();
      expect(scope.getByText(stage.period)).toBeInTheDocument();
      expect(scope.getByText(stage.description)).toBeInTheDocument();
    }
    expect(screen.queryByText("How my work developed")).not.toBeInTheDocument();
  });

  it("places Home architecture after both work sections and metrics", () => {
    const { container } = renderWithProviders(<Home theme={darkTheme} />);
    expect(container.querySelector(".metrics-section").nextElementSibling).toBe(container.querySelector("#architecture"));
    expect(container.querySelector("#architecture").nextElementSibling).toBe(
      screen.getByRole("region", { name: careerProgression.title })
    );
  });

  it("places Experience progression after the unchanged roles", () => {
    renderWithProviders(<Experience theme={darkTheme} />);
    const section = screen.getByRole("region", { name: careerProgression.title });
    expect(within(section.previousElementSibling).getByRole("heading", { name: "Roles" })).toBeInTheDocument();
    expect(screen.getByText("Machine Learning Engineer Intern")).toBeInTheDocument();
  });
});
