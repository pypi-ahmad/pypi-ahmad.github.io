import React from "react";
import { screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { renderWithProviders, darkTheme } from "../test/testUtils";
import { socialMediaLinks } from "../portfolio";
import Contact from "../pages/contact/ContactComponent";
import { buildContactItems } from "../components/socialMedia/ContactLinksList";
import { resolveTheme } from "../theme";

// Restore the shared module object after each fixture so blank-channel tests cannot contaminate others.
const original = { ...socialMediaLinks };
afterEach(() => Object.assign(socialMediaLinks, original));

describe("Contact availability", () => {
  it("normalizes whitespace and omits unavailable channels", () => {
    expect(buildContactItems({ gmail: " \t ", github: " https://github.com/example \n" }))
      .toEqual([expect.objectContaining({ key: "github", href: "https://github.com/example" })]);
  });

  it.each(["light", "dark"].flatMap(mode =>
    ["blue", "pink", "pink-indigo"].map(accent => [mode, accent])
  ))("offers a themed way home when all channels are blank: %s/%s", (mode, accent) => {
    Object.keys(socialMediaLinks).forEach(key => { socialMediaLinks[key] = " \t "; });
    const theme = resolveTheme(mode, accent);
    renderWithProviders(<Contact theme={theme} />, { theme: mode, accent });
    expect(screen.getByText("Contact links are currently unavailable.")).toBeVisible();
    expect(screen.getByRole("link", { name: "Return home" })).toHaveAttribute("href", "/home");
    expect(screen.getByRole("link", { name: "Return home" })).toHaveStyle({ color: theme.accentSolid });
    expect(screen.queryByText("Choose a channel")).not.toBeInTheDocument();
    expect(document.querySelector('a[href^="mailto:"]')).toBeNull();
  });

  it("keeps available channels without an unavailable email action", () => {
    socialMediaLinks.gmail = "\n ";
    renderWithProviders(<Contact theme={darkTheme} />);
    expect(screen.getByText("Choose a channel")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "GitHub", exact: true })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Email me" })).not.toBeInTheDocument();
  });
});
