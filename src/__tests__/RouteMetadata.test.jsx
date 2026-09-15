import React from "react";
import { render, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Main from "../containers/Main";
import { ThemeControllerProvider } from "../themeController";
import { darkTheme } from "../theme";

function renderMainAt(pathname) {
  // Main owns a BrowserRouter, so seed its URL before mounting rather than nesting routers.
  window.history.pushState({}, "", pathname);
  return render(
    <ThemeControllerProvider
      initialThemeMode="dark"
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
  // Lazy route loading and head updates may complete after the initial render.
  return waitFor(() => {
    expect(document.title).toBe(title);
  }, { timeout: 10000 });
}

describe("Route metadata", () => {
  it("applies FDE learning metadata without implying an employment title", async () => {
    renderMainAt("/fde");
    await waitForTitle("FDE learning journey | Ahmad Mujtaba");
    expect(getManagedMeta('link[rel="canonical"]')?.getAttribute("href")).toBe("https://pypi-ahmad.github.io/fde");
    expect(getManagedMeta('meta[name="description"]')?.getAttribute("content")).toContain("to learn forward-deployed AI engineering");
  });
  it("replaces the static shell canonical when a route mounts", async () => {
    const fallback = document.createElement("link");
    fallback.rel = "canonical";
    fallback.href = "https://pypi-ahmad.github.io/";
    fallback.dataset.portfolioFallback = "true";
    document.head.append(fallback);
    renderMainAt("/projects");
    await waitForTitle("AI engineering projects | Ahmad Mujtaba");
    expect(fallback.isConnected).toBe(false);
    expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
  });

  it("applies Home route metadata", async () => {
    renderMainAt("/home");

    await waitForTitle("Ahmad Mujtaba | Production AI Engineer");
    expect(
      getManagedMeta('meta[name="description"]')?.getAttribute("content")
    ).toContain("Production AI Engineer");
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

  it("applies Education route metadata", async () => {
    renderMainAt("/education");

    await waitForTitle("Education & certifications | Ahmad Mujtaba");
    expect(
      getManagedMeta('meta[name="description"]')?.getAttribute("content")
    ).toContain("generative AI");
    expect(
      getManagedMeta('link[rel="canonical"]')?.getAttribute("href")
    ).toBe("https://pypi-ahmad.github.io/education");
  });

  it("applies Projects route metadata", async () => {
    renderMainAt("/projects");

    await waitForTitle("AI engineering projects | Ahmad Mujtaba");
    expect(
      getManagedMeta('meta[name="twitter:title"]')?.getAttribute("content")
    ).toBe("AI engineering projects | Ahmad Mujtaba");
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

  it("treats removed /theme route as not found", async () => {
    renderMainAt("/theme");

    await waitForTitle("Page not found | Ahmad Mujtaba");
    expect(
      getManagedMeta('meta[name="robots"]')?.getAttribute("content")
    ).toBe("noindex, nofollow");
    expect(
      getManagedMeta('link[rel="canonical"]')?.getAttribute("href")
    ).toBe("https://pypi-ahmad.github.io/theme");
  });

  it("marks unknown routes as noindex with a path-specific canonical", async () => {
    renderMainAt("/missing-page");

    await waitForTitle("Page not found | Ahmad Mujtaba");
    expect(
      getManagedMeta('meta[name="robots"]')?.getAttribute("content")
    ).toBe("noindex, nofollow");
    expect(
      getManagedMeta('link[rel="canonical"]')?.getAttribute("href")
    ).toBe("https://pypi-ahmad.github.io/missing-page");
  });
});
