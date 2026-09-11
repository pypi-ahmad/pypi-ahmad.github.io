import assert from "node:assert/strict";
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3000";
// Run against either Vite mode; each geometry assertion targets a specific regression, not a full audit.
const browser = await chromium.launch();
let checks = 0;
try {
  const textPage = await browser.newPage({ viewport: { width: 390, height: 900 }, reducedMotion: "reduce" });
  for (const [route, selector] of [
    ["projects", ".project-card__category"],
    ["experience", ".experience-outcomes span"],
  ]) {
    await textPage.goto(`${base}/${route}`);
    await textPage.locator(selector).first().waitFor();
    await textPage.evaluate(() => { document.documentElement.style.fontSize = "200%"; });
    assert.ok(await textPage.locator(selector).evaluateAll(nodes => nodes.every(node => {
      const css = getComputedStyle(node);
      return parseFloat(css.lineHeight) / parseFloat(css.fontSize) >= 1.399;
    })), `${route}: compact multiline text has comfortable leading`);
  }
  await textPage.close();
  console.log("PASS: enlarged project categories and Experience labels use at least 1.4 leading.");
  const gridPage = await browser.newPage({ reducedMotion: "reduce" });
  for (const [route, selector, width] of [
    ["contact", ".contact-links-item", 769],
    ["skills", ".capability-card", 901],
  ]) {
    await gridPage.goto(`${base}/${route}`);
    await gridPage.locator(selector).first().waitFor();
    for (const dir of ["ltr", "rtl"]) {
      await gridPage.setViewportSize({ width, height: 900 });
      await gridPage.evaluate(direction => {
        document.documentElement.dir = direction;
        document.documentElement.style.fontSize = "200%";
      }, dir);
      const cards = await gridPage.locator(selector).evaluateAll(nodes => nodes.map(node => {
        const rect = node.getBoundingClientRect();
        return { top: rect.top, width: rect.width };
      }));
      assert.ok(cards[1].top > cards[0].top, `${route}/${dir}: enlarged text gets one column`);
      assert.ok(cards[0].width >= width - 100, `${route}/${dir}: card uses available width`);
    }
    await gridPage.setViewportSize({ width: 1440, height: 900 });
    await gridPage.evaluate(() => { document.documentElement.style.fontSize = "100%"; });
    const tops = await gridPage.locator(selector).evaluateAll(nodes => nodes.map(node => node.getBoundingClientRect().top));
    assert.equal(tops[0], tops[2], `${route}: three desktop cards share the first row`);
    assert.ok(tops[3] > tops[2], `${route}: remaining cards wrap`);
  }
  await gridPage.close();
  console.log("PASS: enlarged Contact/Skills grids in LTR/RTL; three-column desktop layouts retained.");
  for (const width of [320, 390, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    for (const route of ["home", "contact", "education", "experience", "skills", "projects", "not-found"]) {
      await page.goto(`${base}/${route}`);
      await page.locator("main h1").waitFor();
      await page.keyboard.press("Tab");
      const skip = page.getByRole("link", { name: "Skip to content" });
      assert.ok(await skip.evaluate(node => node === document.activeElement));
      assert.ok(await skip.evaluate(node => {
        const rect = node.getBoundingClientRect();
        const css = getComputedStyle(node);
        return css.clipPath === "none" && css.outlineStyle !== "none" && css.transitionDuration === "0s"
          && rect.left >= 0 && rect.right <= innerWidth && rect.top >= 0;
      }));
      await page.keyboard.press("Enter");
      await page.keyboard.press("Tab");
      assert.ok(await page.evaluate(() => document.querySelector("main").contains(document.activeElement)));
      checks++;
    }
    await page.goto(`${base}/contact`);
    await page.locator(".contact-links-anchor").first().waitFor();
    assert.ok(await page.locator(".contact-links-anchor").evaluateAll(nodes => nodes.every(node => {
      const icon = node.querySelector(".contact-links-icon").getBoundingClientRect();
      const text = node.querySelector(".contact-links-content").getBoundingClientRect();
      return Math.abs(icon.top - text.top) <= 3;
    })));
    await page.goto(`${base}/home`);
    await page.locator(".outcome-card strong").first().waitFor();
    for (const size of ["100%", "200%"] ) {
      await page.evaluate(value => { document.documentElement.style.fontSize = value; }, size);
      assert.ok(await page.locator(".outcome-card strong").evaluateAll(nodes => nodes.every(node => {
        const css = getComputedStyle(node);
        return parseFloat(css.lineHeight) / parseFloat(css.fontSize) >= 1.399;
      })));
    }
    await page.close();
  }
  console.log(`PASS: ${checks} keyboard skip flows; Contact alignment and metric leading at three widths.`);
} finally {
  await browser.close();
}
