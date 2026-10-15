import React from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MotionConfig } from "framer-motion";
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import StudyResourcesPage from "../pages/studyResources/StudyResourcesPage";
import Main from "../containers/Main";
import { studyResourcesPageData } from "../data/studyResources";
import { ThemeControllerProvider } from "../themeController";
import { renderWithProviders, darkTheme } from "../test/testUtils";

describe("Study resources page", () => {
  it("lists the four exams with their Udemy and Topmate links", () => {
    renderWithProviders(<StudyResourcesPage theme={darkTheme} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(studyResourcesPageData.title);
    expect(screen.getAllByRole("article")).toHaveLength(4);
    for (const exam of studyResourcesPageData.exams) {
      const card = within(screen.getByRole("article", { name: exam.name }));
      expect(card.getByText(exam.code)).toBeInTheDocument();
      expect(card.getByText(exam.audience)).toBeInTheDocument();
      expect(card.getAllByRole("term").map(term => term.textContent)).toEqual([
        "Practice tests", "Questions per test", "Total questions", "Study guide",
      ]);
      expect(card.getAllByRole("definition").map(value => value.textContent)).toEqual([
        String(studyResourcesPageData.testsPerExam), String(exam.questionsPerTest),
        String(studyResourcesPageData.testsPerExam * exam.questionsPerTest), `${exam.guidePages} pages`,
      ]);
      const udemy = card.getByRole("link", { name: `Practice tests on Udemy for ${exam.code}` });
      const topmate = card.getByRole("link", { name: `Guide + PDFs on Topmate for ${exam.code}` });
      expect(udemy).toHaveAttribute("href", exam.udemyUrl);
      expect(topmate).toHaveAttribute("href", exam.topmateUrl);
      for (const link of [udemy, topmate]) {
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
      }
    }
  });

  it("helps visitors choose an exam and compare the two formats", () => {
    renderWithProviders(<StudyResourcesPage theme={darkTheme} />);
    expect(screen.getAllByRole("article").map(card => within(card).getByRole("heading").textContent)).toEqual([
      "Claude Certified Associate - Foundations", "Claude Certified Developer - Foundations",
      "Claude Certified Architect - Foundations", "Claude Certified Architect - Professional",
    ]);
    for (const [name, id] of [["Choose your exam", "exam-options"], ["Compare formats", "study-formats"]]) {
      expect(screen.getByRole("link", { name, exact: true })).toHaveAttribute("href", `#${id}`);
      expect(document.getElementById(id)).toHaveAttribute("aria-labelledby");
    }
    const formats = within(screen.getByRole("region", { name: "Choose your format" }));
    expect(formats.getByRole("heading", { name: "Practice on Udemy" })).toBeInTheDocument();
    expect(formats.getByRole("heading", { name: "Download from Topmate" })).toBeInTheDocument();
    expect(formats.getByText("An explanation for every question")).toBeInTheDocument();
    expect(formats.getByText("Five practice-test PDFs with answer keys")).toBeInTheDocument();
    expect(formats.getByText(/Both formats contain the same practice questions/)).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Created by Ahmad Mujtaba" })).toHaveTextContent("I hold all four Claude credentials");
    expect(screen.queryByRole("heading", { name: "How the material is built" })).not.toBeInTheDocument();
  });

  it("derives the totals from the exam data", () => {
    renderWithProviders(<StudyResourcesPage theme={darkTheme} />);
    const totals = within(screen.getByRole("list", { name: "Totals across the four exams" }));
    expect(totals.getByText("20 practice tests")).toBeInTheDocument();
    expect(totals.getByText("1,180 questions")).toBeInTheDocument();
    expect(totals.getByText("611 guide pages")).toBeInTheDocument();
  });

  it("states independence, AI assistance, and the practice-target caveat", () => {
    renderWithProviders(<StudyResourcesPage theme={darkTheme} />);
    expect(screen.getByText(/used AI to help prepare these questions, directing the work and reviewing the results/)).toBeInTheDocument();
    expect(screen.getByText(/not affiliated with or endorsed by Anthropic/)).toBeInTheDocument();
    expect(screen.getByText(/practice target/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "See the credentials" })).toHaveAttribute("href", "/education");
    expect(screen.getByRole("link", { name: "Contact me" })).toHaveAttribute("href", "/contact");
  });

  it("registers the route in static hosting output and the sitemap", () => {
    const manifest = JSON.parse(readFileSync("package.json", "utf8"));
    expect(manifest.scripts.build).toContain("'study-resources'");
    expect(readFileSync("public/sitemap.xml", "utf8")).toContain("<loc>https://pypi-ahmad.github.io/study-resources</loc>");
  });

  it("resolves /study-resources with metadata and its navigation item", async () => {
    window.history.replaceState({}, "", "/study-resources");
    render(
      <ThemeControllerProvider initialThemeMode="dark">
        <MotionConfig reducedMotion="always">
          <Main theme={darkTheme} />
        </MotionConfig>
      </ThemeControllerProvider>
    );
    expect(await screen.findByRole("heading", { level: 1, name: studyResourcesPageData.title }, { timeout: 10000 })).toBeInTheDocument();
    await waitFor(() => expect(document.title).toBe("Claude certification exam prep | Ahmad Mujtaba"), { timeout: 10000 });
    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe("https://pypi-ahmad.github.io/study-resources");
    await userEvent.setup().click(screen.getByRole("button", { name: "Toggle navigation menu" }));
    expect(screen.getByRole("link", { name: "Exam prep", exact: true })).toHaveAttribute("aria-current", "page");
  });
});
