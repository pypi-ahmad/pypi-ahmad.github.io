import assert from "node:assert/strict";
import { chromium } from "playwright";

const bases = ["http://localhost:3000", "http://127.0.0.1:4173"];
const routes = ["home", "education", "experience", "skills", "projects", "contact"];
const browser = await chromium.launch();
const styles = new Map();
let checks = 0;

async function snapshot(page, route) {
  // Font loading must settle before comparing computed geometry across development and production CSS.
  await page.locator(route === "home" ? ".greeting-text" : `.${route}-hero h1`).waitFor();
  await page.evaluate(() => document.fonts.ready);
  return page.evaluate(() => {
    const selectors = ["main h1", ".greeting-text-p, [class$='-intro']", ".project-card__category", ".project-card__name"];
    return selectors.map(selector => {
      const node = document.querySelector(selector);
      if (!node) return null;
      const css = getComputedStyle(node);
      return Object.fromEntries(["fontSize", "lineHeight", "letterSpacing", "maxWidth", "color", "backgroundColor", "backgroundImage", "textAlign"].map(key => [key, css[key]]));
    });
  });
}

try {
  for (const base of bases) {
    const page = await browser.newPage({ reducedMotion: "reduce" });
    await page.addInitScript(() => {
      localStorage.setItem("theme", "dark");
    });
    for (const width of [320, 390, 768, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      for (const route of routes) {
        await page.goto(`${base}/${route}`);
        const direct = await snapshot(page, route);
        const key = `${width}/${route}`;
        const expectedSize = Math.max(40, Math.min(width * 0.06, route === "home" ? 84 : 76));
        assert.ok(Math.abs(parseFloat(direct[0].fontSize) - expectedSize) < 0.01, `${key}: heading scale`);
        const leading = 1.4;
        assert.ok(Math.abs(parseFloat(direct[0].lineHeight) - expectedSize * leading) < 0.01, `${key}: heading leading`);
        if (direct[2]) {
          assert.equal(direct[2].fontSize, "12px", `${key}: category size`);
          assert.equal(direct[2].backgroundImage, "none", `${key}: neutral category`);
        }
        if (styles.has(key)) assert.deepEqual(direct, styles.get(key), `Dev/build parity: ${key}`);
        else styles.set(key, direct);
        for (const direction of ["ltr", "rtl"]) {
          for (const size of ["100%", "200%"] ) {
            await page.evaluate(({ direction, size }) => {
              document.documentElement.dir = direction;
              document.documentElement.style.fontSize = size;
            }, { direction, size });
            assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${base} ${key} ${direction} ${size}: overflow`);
            assert.ok(await page.locator(".project-card").evaluateAll(cards => cards.every(card => card.scrollWidth <= card.clientWidth + 1)), `${key}: card clipping`);
            checks++;
          }
        }
      }
    }
    // All route styles must also agree after lazy CSS has accumulated.
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${base}/home`);
    for (const route of [...routes.slice(1), "home"]) {
      await page.getByRole("button", { name: "Toggle navigation menu" }).click();
      await page.locator(`.menu a[href='/${route}']`).last().click();
      const client = await snapshot(page, route);
      assert.deepEqual(client, styles.get(`1440/${route}`), `Client navigation parity: ${base}/${route}`);
      await page.waitForFunction(() => document.activeElement?.tagName === "MAIN" && scrollY === 0);
    }
    const contact = page.locator("main a[href='/contact']").last();
    await contact.scrollIntoViewIfNeeded();
    await contact.focus();
    const homeY = await page.evaluate(() => scrollY);
    assert.ok(homeY > 0);
    await page.keyboard.press("Enter");
    await page.locator(".contact-hero h1").waitFor();
    await page.waitForFunction(() => scrollY === 0 && document.activeElement?.tagName === "MAIN");
    await page.goBack();
    await page.locator(".greeting-text").waitFor();
    await page.waitForFunction(y => Math.abs(scrollY - y) < 2, homeY);
    await page.close();
  }
  console.log(`Passed dev/build and client-route style parity, ${checks} responsive/text/direction checks, route focus and native Back restoration.`);
} finally {
  await browser.close();
}
