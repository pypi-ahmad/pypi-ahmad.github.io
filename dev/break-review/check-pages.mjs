import assert from "node:assert/strict";
import { mkdtemp, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { chromium } from "playwright";
import axe from "axe-core";

// Page-review supplement only. Never visit or instrument the isolated Break reports.
const output = await mkdtemp(join(tmpdir(), "portfolio-break-pages-"));
const browser = await chromium.launch();
const results = [];
try {
  for (const theme of ["light", "dark"]) {
    const page = await browser.newPage({ reducedMotion: "reduce" });
    await page.addInitScript(theme => localStorage.setItem("theme", theme), theme);
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("http://127.0.0.1:4173/not-a-route");
      await page.getByRole("heading", { name: "Page not found" }).waitFor();
      await page.evaluate(() => document.fonts.ready);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      await page.addScriptTag({ content: axe.source });
      const scan = await page.evaluate(() => window.axe.run({ runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] } }));
      results.push({ route: "not-a-route", theme, width, violations: scan.violations, incomplete: scan.incomplete.map(item => item.id) });
      assert.deepEqual(scan.violations, []);
      if ([390, 1440].includes(width)) await page.screenshot({ path: join(output, `not-found-${theme}-${width}.png`), fullPage: true });
      const recovery = page.getByRole("link", { name: "Return home" });
      await recovery.focus();
      await page.keyboard.press("Enter");
      await page.waitForURL("**/home");
      await page.goto("http://127.0.0.1:4173/splash");
      await page.waitForURL("**/home");
      await page.locator("main h1").waitFor();
      results.push({ route: "splash", theme, width, result: "Redirected to Home; transient loader not visually inspected" });
    }
    await page.close();
  }
  console.log(`PASS: ${results.length} not-found/recovery and splash scenarios. Artifacts: ${output}`);
} finally {
  await writeFile(join(output, "report.json"), JSON.stringify(results, null, 2));
  await browser.close();
}
