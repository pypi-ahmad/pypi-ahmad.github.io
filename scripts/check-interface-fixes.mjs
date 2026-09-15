import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3000";
// Run against either Vite mode; each geometry assertion targets a specific regression, not a full audit.
const browser = await chromium.launch();
let checks = 0;
try {
  const snapshot = JSON.parse(await readFile(new URL("../public/data/github.json", import.meta.url), "utf8"));
  for (const mode of ["light", "dark"]) {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    await context.addInitScript(value => localStorage.setItem("theme", value), mode);
    await context.route("**/raw.githubusercontent.com/**/dashboard.json", route => route.fulfill({ json: snapshot }));
    const page = await context.newPage();
    await page.goto(`${base}/experience`);
    await page.locator("details[data-case-study-for]").first().waitFor();
    await page.locator("details[data-case-study-for]").evaluateAll(nodes => nodes.forEach(node => { node.open = true; }));
    for (const width of [320, 390, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      for (const dir of ["ltr", "rtl"]) for (const size of ["100%", "200%"]) {
        await page.evaluate(({ dir, size }) => {
          document.documentElement.dir = dir;
          document.documentElement.style.fontSize = size;
        }, { dir, size });
        assert.ok(await page.evaluate(() => {
          const nodes = [...document.querySelectorAll(".experience-card p, .experience-detail-group ul, .experience-description-list")];
          return nodes.length > 0 && nodes.every(node => {
            const probe = document.createElement("span");
            probe.style.cssText = "display:block;position:absolute;visibility:hidden;inline-size:65ch";
            node.append(probe);
            const cap = probe.getBoundingClientRect().width;
            probe.remove();
            const css = getComputedStyle(node);
            return Math.abs(parseFloat(css.maxInlineSize) - cap) < 1
              && node.getBoundingClientRect().width <= cap + 1;
          }) && document.documentElement.scrollWidth <= innerWidth;
        }), `${mode}/${width}/${dir}/${size}: prose is capped without overflow`);
      }
    }
    await page.evaluate(() => {
      document.documentElement.dir = "ltr";
      document.documentElement.style.fontSize = "100%";
    });
    await page.setViewportSize({ width: 1440, height: 900 });
    assert.ok(await page.evaluate(() => {
      const card = document.querySelector(".experience-card").getBoundingClientRect();
      const grid = document.querySelector(".experience-project-group .experience-outcomes > ul");
      const items = [...grid.children].map(node => node.getBoundingClientRect());
      return card.width > 1000 && grid.getBoundingClientRect().width > 1000
        && items.length === 2 && Math.abs(items[0].top - items[1].top) < 1;
    }), "Narrative cap does not narrow desktop cards or outcome grids");
    for (const game of ["snake", "minesweeper"]) {
      await page.goto(`${base}/github?tab=arcade&game=${game}`);
      await page.getByText("Ready", { exact: true }).waitFor();
      assert.equal(await page.locator(".gh-game-picker[aria-label], .gh-dpad[aria-label], .gh-segments[aria-label]").count(), 0);
      assert.equal(await page.getByRole("group", { name: /game board$/ }).count(), 1);
      if (game === "snake") assert.equal(await page.getByRole("button", { name: "Move right", exact: true }).count(), 1);
      else assert.equal(await page.getByRole("button", { name: "Flag", exact: true }).count(), 1);
    }
    await context.close();
  }
  const legacy = { ...snapshot };
  for (const field of ["repositories", "releases", "externalPullRequests", "discoveryCoverage"]) delete legacy[field];
  const legacyContext = await browser.newContext({ reducedMotion: "reduce" });
  for (const pattern of ["**/data/github.json", "**/raw.githubusercontent.com/**/dashboard.json"])
    await legacyContext.route(pattern, route => route.fulfill({ json: legacy }));
  const legacyPage = await legacyContext.newPage();
  for (const tab of ["projects", "activity", "impact"]) {
    await legacyPage.goto(`${base}/github?tab=${tab}`);
    const message = legacyPage.getByRole("status").filter({ hasText: "is not available in this snapshot" });
    await message.waitFor();
    assert.ok(!(await message.innerText()).includes("refreshing the data above"));
    assert.equal(await message.getByRole("link", { name: "View the GitHub profile", exact: true }).getAttribute("href"), "https://github.com/pypi-ahmad");
  }
  await legacyContext.close();
  console.log("PASS: Experience prose width, unchanged outcome grids, arcade labels, and three legacy-data recovery messages.");
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
    await page.locator(".metrics-strip strong").first().waitFor();
    for (const size of ["100%", "200%"] ) {
      await page.evaluate(value => { document.documentElement.style.fontSize = value; }, size);
      assert.ok(await page.locator(".metrics-strip strong").evaluateAll(nodes => nodes.every(node => {
        const css = getComputedStyle(node);
        return parseFloat(css.lineHeight) / parseFloat(css.fontSize) >= 1.299
          && node.scrollWidth <= node.clientWidth + 1
          && node.scrollHeight <= node.clientHeight + 1;
      })));
    }
    await page.close();
  }
  console.log(`PASS: ${checks} keyboard skip flows; Contact alignment and unclipped metric figures at three widths.`);
} finally {
  await browser.close();
}
