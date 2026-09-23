import assert from "node:assert/strict";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { chromium } from "playwright";
import axe from "axe-core";

const base = "http://127.0.0.1:4173";
const output = await mkdtemp(join(tmpdir(), "portfolio-case-studies-"));
const browser = await chromium.launch();
async function checkCareer(page, label) {
  const section = page.locator(".career-section");
  assert.equal(await section.count(), 1);
  assert.deepEqual(await section.locator("li > p:first-child").allTextContents(), [
    "Sep 2022 – Dec 2024", "Jan – May 2025", "Jul 2025 – Present",
  ]);
  await page.evaluate(() => document.fonts.ready);
  await page.addScriptTag({ content: axe.source });
  const result = await page.evaluate(async () => window.axe.run(".career-section"));
  assert.deepEqual(result.violations, [], `${label}: career accessibility`);
  assert.equal(result.incomplete.length, 0);
  for (const size of ["100%", "200%"]) {
    await page.evaluate(size => { document.documentElement.style.fontSize = size; }, size);
    assert.ok(await section.locator("li").evaluateAll(nodes => nodes.every(node => {
      const bounds = node.getBoundingClientRect();
      return bounds.left >= 0 && bounds.right <= innerWidth && node.scrollWidth <= node.clientWidth;
    })), `${label}: career text fits at ${size}`);
  }
  await page.evaluate(() => { document.documentElement.style.fontSize = "100%"; });
  await section.evaluate(node => node.scrollIntoView({ block: "start" }));
  await page.screenshot({ path: join(output, `career-${label}.png`) });
}
try {
  for (const width of [320, 375, 1440]) {
    for (const colorScheme of ["light", "dark"]) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, colorScheme, reducedMotion: "reduce" });
      await page.addInitScript(mode => localStorage.setItem("theme", mode), colorScheme);
      const errors = [];
      page.on("pageerror", error => errors.push(error.message));
      await page.goto(`${base}/home`);
      await page.locator(".career-section").waitFor();
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator(".metrics-strip li").count(), 4);
      assert.equal(await page.locator("#professional-work article").count(), 3);
      await page.addScriptTag({ content: axe.source });
      const professionalAxe = await page.evaluate(async () => window.axe.run({ include: [".metrics-section", "#professional-work"] }));
      assert.deepEqual(professionalAxe.violations, []);
      assert.equal(professionalAxe.incomplete.length, 0);
      for (const size of ["100%", "200%"]) {
        await page.evaluate(size => { document.documentElement.style.fontSize = size; }, size);
        assert.ok(await page.locator(".metrics-strip a, #professional-work article").evaluateAll(nodes => nodes.every(node => {
          const box = node.getBoundingClientRect();
          return box.left >= 0 && box.right <= innerWidth && node.scrollWidth <= node.clientWidth;
        })), "Professional evidence fits enlarged text");
      }
      await page.evaluate(() => { document.documentElement.style.fontSize = "100%"; });
      await page.locator(".metrics-section").evaluate(node => node.scrollIntoView({ block: "start" }));
      await page.screenshot({ path: join(output, `professional-${width}-${colorScheme}.png`) });
      for (const source of [".metrics-strip", "#professional-work"]) {
        const destinations = await page.locator(`${source} a[href*='#']`).evaluateAll(nodes => nodes.map(node => node.getAttribute("href")));
        for (const href of destinations) {
          await page.locator(`${source} a[href='${href}']`).first().click();
          await page.waitForFunction(id => document.activeElement?.id === id, href.split("#")[1]);
          await page.goBack();
          await page.locator(source).waitFor();
        }
      }
      const architecture = page.locator("#architecture");
      assert.equal(await architecture.locator("article").count(), 3);
      await page.evaluate(() => document.fonts.ready);
      await architecture.evaluate(node => node.scrollIntoView({ block: "start" }));
      await page.addScriptTag({ content: axe.source });
      const architectureAxe = await page.evaluate(async () => window.axe.run("#architecture"));
      assert.deepEqual(architectureAxe.violations, []);
      assert.equal(architectureAxe.incomplete.length, 0, JSON.stringify(architectureAxe.incomplete.map(item => ({ id: item.id, nodes: item.nodes.map(node => node.failureSummary) }))));
      for (const size of ["100%", "200%"]) {
        await page.evaluate(size => { document.documentElement.style.fontSize = size; }, size);
        assert.ok(await architecture.locator(".architecture-node").evaluateAll(nodes => nodes.every(node => {
          const bounds = node.getBoundingClientRect();
          return bounds.left >= 0 && bounds.right <= innerWidth && node.scrollWidth <= node.clientWidth;
        })), "Architecture nodes fit at enlarged text sizes");
      }
      await page.evaluate(() => { document.documentElement.style.fontSize = "100%"; });
      await architecture.evaluate(node => node.scrollIntoView({ block: "start" }));
      await page.screenshot({ path: join(output, `architecture-${width}-${colorScheme}.png`), fullPage: false });
      for (const id of ["prior-authorization", "computer-use", "warranty-processing"]) {
        await page.locator(`#architecture a[href='/experience#${id}']`).click();
        await page.waitForFunction(id => document.activeElement?.id === id, id);
        assert.ok((await page.locator(`#${id}`).boundingBox()).y >= 70);
        await page.goBack();
        await architecture.waitFor();
        assert.ok(await page.evaluate(() => scrollY > 0));
        await page.goForward();
        await page.locator(`#${id}`).waitFor();
        assert.ok(await page.locator(`details[data-case-study-for='${id}']`).evaluate(node => node.open), "Forward reveals the target story");
        await page.goto(`${base}/experience#${id}`);
        await page.waitForFunction(id => document.activeElement?.id === id, id);
        await page.goto(`${base}/home`);
        await architecture.waitFor();
      }
      await checkCareer(page, `home-${width}-${colorScheme}`);
      const cards = page.locator('#selected-work a[aria-label$="case study"]');
      await cards.first().waitFor();
      assert.equal(await cards.count(), 5);
      assert.equal(await page.locator('#featured-tools a[aria-label$="case study"]').count(), 2);
      await cards.first().scrollIntoViewIfNeeded();
      await page.screenshot({ path: join(output, `home-${width}-${colorScheme}.png`) });
      await cards.first().click();
      await page.waitForFunction(() => document.activeElement?.id === "document-ai-engineering-lab");
      assert.equal(await page.locator(".case-study").count(), 7);
      const heading = page.locator("#document-ai-engineering-lab");
      assert.ok((await heading.boundingBox()).y >= 70, "Anchor clears header");
      await page.screenshot({ path: join(output, `projects-${width}-${colorScheme}.png`) });
      await page.goBack();
      await cards.first().waitFor();
      assert.ok(await page.evaluate(() => scrollY > 0), "Back preserves Home scroll");
      await page.goForward();
      await heading.waitFor();
      assert.ok(await page.locator("details[data-case-study-for='document-ai-engineering-lab']").evaluate(node => node.open));
      await page.goto(`${base}/projects#hinglish-turn-detection`);
      await page.waitForFunction(() => document.activeElement?.id === "hinglish-turn-detection");
      await page.goto(`${base}/experience`);
      await page.locator(".experience-card").first().waitFor();
      await checkCareer(page, `experience-${width}-${colorScheme}`);
      const groups = page.locator(".experience-project-group");
      assert.equal(await groups.count(), 4);
      await page.evaluate(() => document.fonts.ready);
      await page.addScriptTag({ content: axe.source });
      const accessibility = await page.evaluate(async () => window.axe.run(".experience-project-group"));
      assert.deepEqual(accessibility.violations, [], "Project-group accessibility");
      assert.equal(accessibility.incomplete.length, 0, "Project-group checks complete");
      for (const fontSize of ["100%", "200%"]) {
        await page.evaluate(size => { document.documentElement.style.fontSize = size; }, fontSize);
        assert.ok(await groups.evaluateAll(nodes => nodes.every(node => {
          const rect = node.getBoundingClientRect();
          return rect.left >= 0 && rect.right <= innerWidth && node.scrollWidth <= node.clientWidth;
        })), "Project groups fit at normal and enlarged text sizes");
      }
      await page.evaluate(() => { document.documentElement.style.fontSize = "100%"; });
      await groups.first().evaluate(node => node.scrollIntoView({ block: "start" }));
      await page.screenshot({ path: join(output, `experience-${width}-${colorScheme}.png`) });
      await groups.nth(1).evaluate(node => node.scrollIntoView({ block: "start" }));
      await page.screenshot({ path: join(output, `integrity-${width}-${colorScheme}.png`) });
      assert.deepEqual(errors, []);
      await page.close();
    }
  }
  console.log(`Case-study navigation and screenshots passed: ${output}`);
} finally {
  await browser.close();
}
