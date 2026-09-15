import assert from "node:assert/strict";
import { mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { chromium } from "playwright";
import axe from "axe-core";

const base = "http://127.0.0.1:4173";
const output = await mkdtemp(join(tmpdir(), "portfolio-fde-"));
assert.equal(await readFile("build/fde/index.html", "utf8"), await readFile("build/index.html", "utf8"));
const browser = await chromium.launch();
try {
  for (const colorScheme of ["light", "dark"]) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, colorScheme, reducedMotion: "reduce" });
    await page.addInitScript(mode => localStorage.setItem("theme", mode), colorScheme);
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    const response = await page.goto(`${base}/fde`);
    assert.equal(response.status(), 200);
    await page.locator(".fde-grid").waitFor();
    await page.reload();
    await page.locator(".fde-grid").waitFor();
    assert.equal(await page.title(), "FDE learning journey | Ahmad Mujtaba");
    assert.equal(await page.locator("link[rel='canonical']").getAttribute("href"), "https://pypi-ahmad.github.io/fde");
    assert.equal(await page.locator(".fde-card").count(), 9);
    assert.equal(await page.locator(".fde-learning-list li").count(), 6);
    assert.equal(await page.getByRole("link", { name: "FDE", exact: true }).getAttribute("aria-current"), "page");
    const labels = await page.locator(".menu a").allTextContents();
    assert.deepEqual(labels, ["Home", "Experience", "Projects", "Skills", "FDE", "Education and certifications", "GitHub", "Contact"]);
    await page.evaluate(() => document.fonts.ready);
    for (const width of [320, 375, 900, 1280, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      await page.addScriptTag({ content: axe.source });
      const audit = await page.evaluate(() => window.axe.run("main"));
      assert.deepEqual(audit.violations, []);
      assert.deepEqual(audit.incomplete, []);
      if (width === 320 || width === 1440) await page.screenshot({ path: join(output, `fde-${width}-${colorScheme}.png`), fullPage: true });
    }
    await page.setViewportSize({ width: 1440, height: 900 });
    const hrefs = await page.locator(".fde-evidence-links a").evaluateAll(nodes => [...new Set(nodes.map(node => node.getAttribute("href")))]);
    for (const href of hrefs) {
      const link = page.locator(`.fde-evidence-links a[href='${href}']`).first();
      await link.focus();
      assert.ok(await link.evaluate(node => node === document.activeElement && getComputedStyle(node).outlineStyle !== "none"));
      await page.keyboard.press("Enter");
      await page.waitForFunction(id => document.activeElement?.id === id, href.split("#")[1]);
      await page.goBack();
      await page.locator(".fde-grid").waitFor();
    }
    await page.getByRole("link", { name: "Explore my skills and learning" }).click();
    await page.locator(".skills-learning-grid").waitFor();
    assert.equal(await page.locator(".toolkit-group .skill-tags li").count(), 24);
    await page.goBack();
    await page.getByRole("link", { name: "Contact me", exact: true }).click();
    await page.waitForURL(`${base}/contact`);
    await page.locator("main h1").waitFor();
    await page.setViewportSize({ width: 320, height: 900 });
    await page.getByRole("button", { name: "Toggle navigation menu" }).click();
    await page.getByRole("link", { name: "FDE", exact: true }).click();
    await page.locator(".fde-grid").waitFor();
    assert.equal(await page.getByRole("button", { name: "Toggle navigation menu" }).getAttribute("aria-expanded"), "false");
    assert.deepEqual(errors, []);
    await page.close();
    console.log(`PASS FDE ${colorScheme}: direct entry, refresh, metadata, accessibility, evidence links, Back, mobile navigation, and Skills preservation.`);
  }
  console.log(`Screenshots: ${output}`);
} finally {
  await browser.close();
}
