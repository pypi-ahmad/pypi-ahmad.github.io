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
  return document.head.querySelector(`${selector}[data-rh="true"]`);
}

describe("Route metadata", () => {
  it("applies Home route metadata", async () => {
    renderMainAt("/home");

    await waitFor(() => {
      expect(document.title).toBe("Ahmad Mujtaba | GenAI Engineer Portfolio");
    });
    expect(
      getManagedMeta('meta[name="description"]')?.getAttribute("content")
    ).toContain("Generative AI Engineer");
    expect(
      getManagedMeta('link[rel="canonical"]')?.getAttribute("href")
    ).toBe("https://pypi-ahmad.github.io/");
  });

  it("applies Experience route metadata", async () => {
    renderMainAt("/experience");

    await waitFor(() => {
      expect(document.title).toBe("Experience | Ahmad Mujtaba");
    });
    expect(
      getManagedMeta('meta[property="og:url"]')?.getAttribute("content")
    ).toBe("https://pypi-ahmad.github.io/experience");
  });

  it("applies Projects route metadata", async () => {
    renderMainAt("/projects");

    await waitFor(() => {
      expect(document.title).toBe("Projects | Ahmad Mujtaba");
    });
    expect(
      getManagedMeta('meta[name="twitter:title"]')?.getAttribute("content")
    ).toBe("Projects | Ahmad Mujtaba");
    expect(
      getManagedMeta('link[rel="canonical"]')?.getAttribute("href")
    ).toBe("https://pypi-ahmad.github.io/projects");
  });

  it("applies Contact route metadata", async () => {
    renderMainAt("/contact");

    await waitFor(() => {
      expect(document.title).toBe("Contact | Ahmad Mujtaba");
    });
    expect(
      getManagedMeta('meta[property="og:url"]')?.getAttribute("content")
    ).toBe("https://pypi-ahmad.github.io/contact");
  });

  it("marks unknown routes as noindex with a path-specific canonical", async () => {
    renderMainAt("/missing-page");

    await waitFor(() => {
      expect(document.title).toBe("Page Not Found | Ahmad Mujtaba");
    });
    expect(
      getManagedMeta('meta[name="robots"]')?.getAttribute("content")
    ).toBe("noindex, nofollow");
    expect(
      getManagedMeta('link[rel="canonical"]')?.getAttribute("href")
    ).toBe("https://pypi-ahmad.github.io/missing-page");
  });
});
