import assert from "node:assert/strict";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { chromium } from "playwright";

const base = "http://127.0.0.1:4173";
const output = await mkdtemp(join(tmpdir(), "portfolio-ui-polish-"));
const browser = await chromium.launch();
const routes = ["home", "projects", "experience", "education", "skills", "fde", "contact", "github"];
let checks = 0;
async function staticPress(page, target) {
  await target.scrollIntoViewIfNeeded();
  const rect = await target.boundingBox();
  await page.mouse.move(rect.x + rect.width / 2, rect.y + rect.height / 2);
  await page.mouse.down();
  try {
    await page.waitForTimeout(180);
    assert.equal(await target.evaluate(node => new DOMMatrixReadOnly(getComputedStyle(node).transform).a), 1);
    assert.ok(await target.evaluate(node => getComputedStyle(node).transitionDuration.split(",").every(v => parseFloat(v) <= 0.15)));
    checks++;
  } finally {
    await page.mouse.move(0, 0);
    await page.mouse.up();
  }
}
try {
  for (const mode of ["light", "dark"]) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
    await page.addInitScript(mode => localStorage.setItem("theme", mode), mode);
    for (const route of routes) {
      await page.goto(`${base}/${route}`);
      await page.locator("main h1").waitFor();
      assert.equal(await page.locator("main h1").evaluate(node => getComputedStyle(node).opacity), "1");
      const surface = page.locator(".greet-main, .projects-hero, .experience-hero, .education-hero, .skills-hero, .fde-hero, .contact-hero, .gh-hero").first();
      assert.notEqual(await surface.evaluate(node => getComputedStyle(node).boxShadow), "none");
      await page.emulateMedia({ forcedColors: "active" });
      assert.equal(await surface.evaluate(node => getComputedStyle(node).boxShadow), "none");
      assert.notEqual(await surface.evaluate(node => getComputedStyle(node).borderTopStyle), "none");
      await page.emulateMedia({ forcedColors: "none", media: "print" });
      assert.equal(await surface.evaluate(node => getComputedStyle(node).boxShadow), "none");
      await page.emulateMedia({ media: "screen" });
      checks++;
    }
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto(`${base}/github?tab=arcade`);
    await page.locator(".gh-game-picker button").first().waitFor();
    for (const game of await page.locator(".gh-game-picker button").all()) {
      await game.click();
      await page.locator(".gh-game-stage").waitFor();
      await staticPress(page, game);
      for (const control of await page.locator(".gh-dpad button:disabled").all()) await staticPress(page, control);
      for (const cell of await page.locator('.gh-mine[aria-disabled="true"]').all()) {
        assert.equal(await cell.evaluate(node => getComputedStyle(node).opacity), "1");
      }
      const inactiveCell = page.locator('.gh-mine[aria-disabled="true"]').first();
      if (await inactiveCell.count()) await staticPress(page, inactiveCell);
      if (await page.locator(".gh-game-stage canvas").count()) {
        assert.ok(await page.locator(".gh-game-stage").evaluate(node => {
          const outer = getComputedStyle(node), inner = getComputedStyle(node.querySelector("canvas"));
          return parseFloat(outer.borderRadius) === parseFloat(inner.borderRadius) + parseFloat(outer.paddingTop);
        }));
      }
    }
    await page.screenshot({ path: join(output, `arcade-${mode}.png`) });
    await page.close();
  }
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(`${base}/home`);
  const toggle = page.locator(".change-theme-btn");
  await toggle.waitFor();
  assert.equal(await page.locator(".theme-icon > span").count(), 1);
  for (let i = 0; i < 5; i++) await toggle.click({ delay: 15 });
  await page.waitForTimeout(700);
  assert.equal(await page.locator(".theme-icon > span").count(), 1);
  assert.equal(await page.locator(".theme-icon > span").evaluate(node => getComputedStyle(node).opacity), "1");
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Animation.enable");
  await cdp.send("Animation.setPlaybackRate", { playbackRate: 0.1 });
  const menu = page.locator(".menu-icon");
  await menu.click();
  await page.waitForTimeout(350);
  await page.screenshot({ path: join(output, "menu-10-percent.png") });
  await menu.click();
  await page.waitForTimeout(1800);
  assert.equal(await menu.getAttribute("aria-expanded"), "false");
  await cdp.send("Animation.setPlaybackRate", { playbackRate: 1 });
  await page.close();
  console.log(`PASS: ${checks} surface/static-control checks, all arcade selectors, rapid theme reversal and slowed CSS menu reversal. Artifacts: ${output}`);
  console.log("Not verified: physical devices, native Safari, and 10%-speed JavaScript spring playback.");
} finally {
  await browser.close();
}
