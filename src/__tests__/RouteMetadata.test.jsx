import React from "react";
import { render, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Main from "../containers/Main";
import { ThemeControllerProvider } from "../themeController";
import { darkTheme } from "../theme";

function renderMainAt(pathname) {
  window.history.pushState({}, "", pathname);
  return render(
    <ThemeControllerProvider
      initialThemeSelection={{ family: "default", mode: "dark" }}
    >
      <Main theme={darkTheme} />
    </ThemeControllerProvider>
  );
}

function getManagedMeta(selector) {
  return (
    document.head.querySelector(selector) || document.querySelector(selector)
  );
}

function waitForTitle(title) {
  return waitFor(() => {
    expect(document.title).toBe(title);
  }, { timeout: 10000 });
}

describe("Route metadata", () => {
  it("applies Home route metadata", async () => {
    renderMainAt("/home");

    await waitForTitle("Ahmad Mujtaba | Applied AI Engineer");
    expect(
      getManagedMeta('meta[name="description"]')?.getAttribute("content")
    ).toContain("Applied AI Engineer");
    expect(
      getManagedMeta('link[rel="canonical"]')?.getAttribute("href")
    ).toBe("https://pypi-ahmad.github.io/");
  });

  it("applies Experience route metadata", async () => {
    renderMainAt("/experience");

    await waitForTitle("Experience | Ahmad Mujtaba");
    expect(
      getManagedMeta('meta[property="og:url"]')?.getAttribute("content")
    ).toBe("https://pypi-ahmad.github.io/experience");
  });

  it("applies Projects route metadata", async () => {
    renderMainAt("/projects");

    await waitForTitle("Projects | Ahmad Mujtaba");
    expect(
      getManagedMeta('meta[name="twitter:title"]')?.getAttribute("content")
    ).toBe("Projects | Ahmad Mujtaba");
    expect(
      getManagedMeta('link[rel="canonical"]')?.getAttribute("href")
    ).toBe("https://pypi-ahmad.github.io/projects");
  });

  it("applies Contact route metadata", async () => {
    renderMainAt("/contact");

    await waitForTitle("Contact | Ahmad Mujtaba");
    expect(
      getManagedMeta('meta[property="og:url"]')?.getAttribute("content")
    ).toBe("https://pypi-ahmad.github.io/contact");
  });

  it("marks /theme as noindex", async () => {
    renderMainAt("/theme");

    await waitForTitle("Theme Gallery | Ahmad Mujtaba");
    expect(
      getManagedMeta('meta[name="robots"]')?.getAttribute("content")
    ).toBe("noindex, nofollow");
    expect(
      getManagedMeta('link[rel="canonical"]')?.getAttribute("href")
    ).toBe("https://pypi-ahmad.github.io/theme");
  });

  it("marks unknown routes as noindex with a path-specific canonical", async () => {
    renderMainAt("/missing-page");

    await waitForTitle("Page Not Found | Ahmad Mujtaba");
    expect(
      getManagedMeta('meta[name="robots"]')?.getAttribute("content")
    ).toBe("noindex, nofollow");
    expect(
      getManagedMeta('link[rel="canonical"]')?.getAttribute("href")
    ).toBe("https://pypi-ahmad.github.io/missing-page");
  });
});
