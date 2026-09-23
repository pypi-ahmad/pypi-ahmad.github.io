import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import CaseStudyDisclosure from "../components/CaseStudy/CaseStudyDisclosure";
import CaseStudy from "../components/CaseStudy/CaseStudy";
import { caseStudies } from "../data/caseStudies";

describe("Case-study disclosures", () => {
  it("starts collapsed, has a project-specific name, and opens independently", async () => {
    const { container } = render(<>
      <h2 id="one">First project</h2>
      <CaseStudyDisclosure headingId="one" label="Read case study">First detail</CaseStudyDisclosure>
      <h2 id="two">Second project</h2>
      <CaseStudyDisclosure headingId="two" label="Read case study">Second detail</CaseStudyDisclosure>
    </>);
    const summaries = container.querySelectorAll("summary");
    const details = container.querySelectorAll("details");
    expect(summaries[0]).toHaveAccessibleName("Read case study First project");
    expect(screen.getByText("First detail")).not.toBeVisible();
    await userEvent.click(summaries[0]);
    expect(details[0].open).toBe(true);
    expect(details[1].open).toBe(false);
    await userEvent.click(summaries[1]);
    expect([...details].every(node => node.open)).toBe(true);
    await userEvent.click(summaries[0]);
    expect(details[0].open).toBe(false);
    expect(details[1].open).toBe(true);
  });

  it("prints all details and restores each previous state, including repeated print events", () => {
    const { container, unmount } = render(<>
      <CaseStudyDisclosure label="Read case study">First detail</CaseStudyDisclosure>
      <CaseStudyDisclosure label="Read case study">Second detail</CaseStudyDisclosure>
    </>);
    const details = [...container.querySelectorAll("details")];
    details[1].open = true;
    act(() => {
      window.dispatchEvent(new Event("beforeprint"));
      window.dispatchEvent(new Event("beforeprint"));
    });
    expect(details.every(node => node.open)).toBe(true);
    act(() => window.dispatchEvent(new Event("afterprint")));
    expect(details.map(node => node.open)).toEqual([false, true]);
    unmount();
    window.dispatchEvent(new Event("beforeprint"));
    expect(details[0].open).toBe(false);
  });

  it.each(caseStudies)("retains every paragraph, decision and repository for $name", study => {
    const { container } = render(<CaseStudy study={study} />);
    for (const text of [study.description, study.problem, study.built, study.evidence, study.limitations, ...study.decisions]) {
      expect(container).toHaveTextContent(text);
    }
    for (const repository of study.repositories) {
      expect(container.querySelector(`a[href="${repository.url}"]`)).toHaveTextContent(repository.name);
      if (repository.approach) expect(container).toHaveTextContent(repository.approach);
    }
    const [overview, ...otherDiagrams] = study.diagrams || [];
    expect(container.querySelectorAll(".case-study__diagram img")).toHaveLength(overview ? 1 : 0);
    if (overview) {
      const image = screen.getByAltText(overview.alt);
      expect(image).toHaveAttribute("src", overview.src);
      expect(image).toHaveAttribute("loading", "lazy");
      expect(image.closest("a")).toHaveAttribute("href", overview.src);
      expect(image.closest("a")).toHaveAccessibleName(`Open ${study.name}: ${overview.title} at full size`);
    }
    for (const diagram of otherDiagrams) {
      const link = container.querySelector(`a[href="${diagram.src}"]`);
      expect(link).toHaveAccessibleName(diagram.title);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
      expect(screen.queryByAltText(diagram.alt)).not.toBeInTheDocument();
    }
    expect(container.querySelector("h2")).toHaveAttribute("id", study.id);
  });
});
