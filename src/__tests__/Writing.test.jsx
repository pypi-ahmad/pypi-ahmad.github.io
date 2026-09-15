import { describe, expect, it, vi } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import { homeMetrics, homePageData } from "../data/homePage";
import { experience } from "../data/experience";
import { contactPageData } from "../data/contact";
import ProjectsView from "../components/github/ProjectsView";
import ContributionCalendar from "../components/github/ContributionCalendar";
import { ReleaseTimeline } from "../components/github/ActivityView";
import ImpactView from "../components/github/ImpactView";
import { discoveryFixture } from "../test/discoveryFixture";
import { renderWithProviders } from "../test/testUtils";

describe("Approved writing contracts", () => {
  it("retains extraction and classification results without unconfirmed methodology", () => {
    const prior = experience.sections[0].experiences[0].projectGroups.find(group => group.id === "prior-authorization");
    const extraction = prior.outcomes.find(outcome => outcome.label === "Structured-extraction accuracy");
    expect(extraction.metric).toBe("80–81% to 92%+");
    expect(extraction.context).toContain("Improved extraction accuracy from 80–81% to 92%+");
    expect(extraction.context).toContain("recurring 100-file runs");
    expect(prior.outcomes[0].metric).toBe("95%+");
    expect(prior.outcomes[0].context).toContain("500-file");
    const copy = JSON.stringify([prior, homePageData, homeMetrics]);
    expect(copy).not.toMatch(/correct individual fields|unchanged documents|unchanged.*scoring|86%|94%/i);
    expect(homeMetrics[0]).toMatchObject({ label: "Extraction accuracy", href: "/experience#prior-authorization" });
    expect(contactPageData.contactSection.emailLabel).toBe("Email me");
  });

  it.each([0, 1, 2])("uses complete repository-count messages for %i results", count => {
    const data = discoveryFixture();
    data.repositories = data.repositories.slice(0, count).map(repo => ({ ...repo, archived: false, fork: false }));
    renderWithProviders(<ProjectsView data={data} params={new URLSearchParams()} update={vi.fn()} />);
    expect(screen.getByRole("status")).toHaveTextContent(count === 1 ? "1 repository found." : `${count} repositories found.`);
  });

  it("names an unmatched query and keeps filter recovery connected", () => {
    const update = vi.fn();
    renderWithProviders(<ProjectsView data={discoveryFixture()} params={new URLSearchParams({ q: "missing-query" })} update={update} />);
    expect(screen.getByRole("status")).toHaveTextContent("0 repositories found for “missing-query”.");
    fireEvent.click(screen.getByRole("button", { name: "Clear filters" }));
    expect(update).toHaveBeenCalledWith(expect.objectContaining({ q: null, page: null }));
  });

  it.each([0, 1, 2])("pluralizes the calendar total for %i contributions", total => {
    const { container } = renderWithProviders(<ContributionCalendar year={{ year: 2026, total, days: [{ date: "2026-01-01", count: total, level: total ? 1 : 0 }] }} />);
    expect(container.querySelector(".gh-toolbar p")).toHaveTextContent(total === 1 ? "1 contribution in 2026" : `${total} contributions in 2026`);
  });

  it("names repository destinations in release and pull-request links", () => {
    const data = discoveryFixture();
    const { unmount } = renderWithProviders(<ReleaseTimeline data={data} year={data.years[0]} params={new URLSearchParams({ releaseYear: "all" })} update={vi.fn()} />);
    const release = data.releases[0];
    expect(screen.getByRole("link", { name: `Read release notes: ${release.repository} ${release.tag}` })).toHaveAttribute("href", release.url);
    unmount();
    data.externalPullRequests = [{ repository: "example/project", number: 12, url: "https://github.com/example/project/pull/12", title: "Fix extraction", description: "Improve validation", mergedAt: "2024-02-01T00:00:00Z" }];
    renderWithProviders(<ImpactView data={data} params={new URLSearchParams()} update={vi.fn()} />);
    const pr = data.externalPullRequests[0];
    expect(screen.getByRole("link", { name: `Read pull request ${pr.repository}#${pr.number}` })).toHaveAttribute("href", pr.url);
  });
});
