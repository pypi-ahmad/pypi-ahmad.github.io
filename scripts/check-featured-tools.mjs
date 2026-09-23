import assert from "node:assert/strict";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { chromium } from "playwright";
import axe from "axe-core";

const base = process.env.PORTFOLIO_URL || "http://127.0.0.1:4173";
const output = await mkdtemp(join(tmpdir(), "portfolio-featured-tools-"));
const browser = await chromium.launch();
try {
  for (const width of [320, 390, 1440]) for (const theme of ["light", "dark"]) {
    const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: "reduce", permissions: ["clipboard-read", "clipboard-write"] });
    const page = await context.newPage();
    await page.addInitScript(mode => localStorage.setItem("theme", mode), theme);
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto(`${base}/home`);
    const section = page.locator("#featured-tools");
    await section.waitFor();
    assert.equal(await section.locator("article").count(), 2);
    assert.equal(await page.locator("#selected-work .project-card").count(), 5);
    for (const name of ["GroundMark", "DocLayout"]) {
      const feature = section.getByRole("article", { name, exact: true });
      await feature.scrollIntoViewIfNeeded();
      for (const button of await feature.getByRole("button").all()) {
        await button.focus();
        await page.keyboard.press("Enter");
        const expected = await button.locator("..").locator("..").locator("code").textContent();
        const copied = await page.evaluate(() => navigator.clipboard.readText());
        assert.equal(copied.replace(/\r\n/g, "\n"), expected);
      }
      const diagram = feature.locator("iframe");
      await diagram.scrollIntoViewIfNeeded();
      await diagram.contentFrame().locator("#btn-theme").waitFor();
      const popupWait = page.waitForEvent("popup");
      await feature.getByRole("link", { name: "Open System architecture in a new tab" }).click();
      const popup = await popupWait;
      await popup.waitForLoadState();
      assert.equal(popup.url(), new URL(await diagram.getAttribute("src"), base).href);
      await popup.close();
      await feature.screenshot({ path: join(output, `${name}-${width}-${theme}.png`) });
    }
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await page.addScriptTag({ content: axe.source });
    assert.deepEqual(await page.evaluate(async () => (await window.axe.run("#featured-tools")).violations), []);
    await page.evaluate(() => Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: async () => { throw new Error("denied"); } } }));
    await section.getByRole("button").first().click();
    assert.ok(await section.getByText("Copy unavailable. Select and copy the command below.").isVisible());
    for (const name of ["GroundMark", "DocLayout"]) {
      await page.getByRole("link", { name: `Read ${name} case study`, exact: true }).click();
      await page.waitForFunction(id => document.activeElement?.id === id, name.toLowerCase());
      await page.goBack();
      await section.waitFor();
    }
    assert.deepEqual(errors, []);
    await context.close();
    console.log(`${width}px ${theme}: layout, clipboard, diagrams, navigation and accessibility passed`);
  }
  console.log(`Screenshots: ${output}`);
} finally {
  await browser.close();
}
