import assert from "node:assert/strict";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { chromium } from "playwright";
import { resolveTheme } from "../src/theme.js";

const base = "http://127.0.0.1:4173";
const output = await mkdtemp(join(tmpdir(), "portfolio-design-"));
const browser = await chromium.launch();
const routes = ["home", "education", "experience", "fde", "skills", "projects", "contact",
  "github", ...["projects", "activity", "impact", "arcade", "animations"].map(tab => "github?tab=" + tab), "not-found"];
async function assertRoleColors(page, mode) {
  const failures = await page.evaluate(theme => {
    const normalize = value => {
      const probe = document.createElement("span");
      probe.style.color = value;
      return probe.style.color;
    };
    const failures = [];
    for (const selector of ["html", "main", ".gh", ".menu"]) {
      const node = document.querySelector(selector);
      if (!node) continue;
      for (const [pseudo, expected] of [
        ["::-webkit-scrollbar-track", theme.scrollbarTrack],
        ["::-webkit-scrollbar-thumb", theme.scrollbarThumb],
      ]) {
        const actual = getComputedStyle(node, pseudo).backgroundColor;
        // Chromium can expose the viewport thumb's hover style through this pseudo query.
        const valid = [normalize(expected)];
        if (pseudo === "::-webkit-scrollbar-thumb") valid.push(normalize(theme.scrollbarThumbHover));
        if (!valid.includes(actual)) failures.push(selector + pseudo + ": " + actual);
      }
      if (getComputedStyle(node).getPropertyValue("--scrollbar-thumb-hover").trim() !== theme.scrollbarThumbHover) failures.push(selector + " hover token");
    }
    const labels = ".hero-eyebrow,.education-eyebrow,.education-section-label,.experience-eyebrow,.contact-eyebrow,.projects-eyebrow,.skills-eyebrow,.fde-eyebrow,.fde-context,.architecture-eyebrow,.career-section__label,.professional-eyebrow,.degree-card__duration,.cert-card__issuer";
    for (const node of document.querySelectorAll(labels)) {
      if (getComputedStyle(node).color !== normalize(theme.secondaryText)) failures.push(node.className);
    }
    for (const node of document.querySelectorAll(".metrics-strip a strong,.professional-link,.fde-evidence-links a,.cert-card__actions a,.degree-card__link")) {
      if (getComputedStyle(node).color !== normalize(theme.accentSolid)) failures.push(node.className + " interactive accent");
    }
    return failures;
  }, resolveTheme(mode));
  assert.deepEqual(failures, [], mode + ": scrollbar and label roles");
}

try {
  for (const theme of ["light", "dark"]) {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    await context.addInitScript(mode => localStorage.setItem("theme", mode), theme);
    const page = await context.newPage();
    const errors = [];
    const fonts = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("request", request => { if (request.resourceType() === "font") fonts.push(request.url()); });
    for (const route of routes) {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(base + "/" + route);
      await page.locator("main h1").waitFor();
      if (route === "home") {
        await page.locator("#github-overview").scrollIntoViewIfNeeded();
        await page.locator(".gh-preview").waitFor();
      }
      await page.waitForLoadState("networkidle");
      assert.ok(await page.locator("main").innerText());
      await assertRoleColors(page, theme);
      if (route === "home") {
        await page.getByRole("button", { name: /Switch to .* mode/ }).click();
        await assertRoleColors(page, theme === "light" ? "dark" : "light");
        await page.getByRole("button", { name: /Switch to .* mode/ }).click();
        await assertRoleColors(page, theme);
      }
      assert.ok(await page.evaluate(() => getComputedStyle(document.body).fontFamily.startsWith("system-ui")));
      for (const width of [1440, 390]) {
        await page.setViewportSize({ width, height: 900 });
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
        await page.screenshot({ path: join(output, route.replace("?", "-").replace("=", "-") + "-" + theme + "-" + width + ".png"), fullPage: true });
      }
    }
    assert.deepEqual(fonts, [], "No font downloads");
    assert.deepEqual(errors, [], "No page errors");
    for (const width of [320, 768, 1280, 1440, 1920]) {
      for (const size of ["100%", "200%"]) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(base + "/fde");
        await page.locator(".fde-grid").waitFor();
        await page.evaluate(value => { document.documentElement.style.fontSize = value; }, size);
        await page.waitForFunction(() => Math.abs(
          parseFloat(document.documentElement.style.getPropertyValue("--header-height")) -
          document.querySelector("header").getBoundingClientRect().height) < 1);
        await page.evaluate(() => window.scrollTo({ top: 700, behavior: "instant" }));
        const sticky = await page.locator("header").evaluate(node => ({
          top: node.getBoundingClientRect().top, expected: parseFloat(getComputedStyle(node).top),
          position: getComputedStyle(node).position,
        }));
        assert.equal(sticky.position, "sticky");
        assert.ok(Math.abs(sticky.top - sticky.expected) < 1, "Header stays at its sticky offset");
        const href = await page.locator(".fde-evidence-links a").first().getAttribute("href");
        // Exercise actual router navigation, then direct entry and refresh.
        await page.locator(".fde-evidence-links a").first().click();
        await page.waitForFunction(id => document.activeElement?.id === id, href.split("#")[1]);
        const clearance = () => page.evaluate(id => ({
          target: document.getElementById(id).getBoundingClientRect().top,
          header: document.querySelector("header").getBoundingClientRect().bottom,
        }), href.split("#")[1]);
        let bounds = await clearance();
        assert.ok(bounds.target >= bounds.header, "Router fragment clears header");
        await page.goto(base + href);
        await page.waitForFunction(id => document.activeElement?.id === id, href.split("#")[1]);
        bounds = await clearance();
        assert.ok(bounds.target >= bounds.header, "Direct fragment clears header");
        await page.reload();
        await page.waitForFunction(id => document.activeElement?.id === id, href.split("#")[1]);
        bounds = await clearance();
        assert.ok(bounds.target >= bounds.header, "Refreshed fragment clears header");
      }
    }
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto(base + "/fde");
    await page.locator(".fde-grid").waitFor();
    await page.evaluate(() => { document.documentElement.style.fontSize = "200%"; });
    await page.getByRole("button", { name: "Toggle navigation menu" }).click();
    await page.getByRole("link", { name: "Contact", exact: true }).scrollIntoViewIfNeeded();
    const menu = await page.locator(".menu").boundingBox();
    assert.ok(menu.y + menu.height <= 568, "Expanded-text menu fits short viewport");
    await page.keyboard.press("Escape");
    const cdp = await context.newCDPSession(page);
    await cdp.send("Emulation.setEmulatedMedia", { features: [
      { name: "prefers-reduced-transparency", value: "no-preference" },
      { name: "prefers-contrast", value: "no-preference" },
      { name: "forced-colors", value: "none" },
    ] });
    assert.equal(await page.locator("header").evaluate(node => getComputedStyle(node).backdropFilter), "blur(12px)", "Transparency explicitly enabled");
    for (const [name, value] of [["prefers-reduced-transparency", "reduce"], ["prefers-contrast", "more"], ["forced-colors", "active"]]) {
      await cdp.send("Emulation.setEmulatedMedia", { features: [{ name, value }] });
      const styles = await page.locator("header").evaluate(node => {
        const css = getComputedStyle(node);
        return { blur: css.backdropFilter, color: css.backgroundColor };
      });
      assert.equal(styles.blur, "none", name + ": solid fallback");
      assert.ok(!styles.color.startsWith("rgba"), name + ": opaque background");
    }
    await page.emulateMedia({ forcedColors: "active" });
    assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement, "::-webkit-scrollbar").width), "auto", "Forced colors restores native scrollbar sizing");
    await context.close();
    console.log("PASS " + theme + ": all routes, no font downloads, sticky header, scaled text, fragments, short menu, color roles, theme switching, and material preferences.");
  }
  console.log("Screenshots: " + output);
} finally {
  await browser.close();
}
