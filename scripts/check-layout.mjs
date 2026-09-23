import assert from "node:assert/strict";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { chromium } from "playwright";
import axe from "axe-core";

const base = "http://127.0.0.1:4173";
const output = await mkdtemp(join(tmpdir(), "portfolio-layout-"));
const browser = await chromium.launch();
try {
  for (const theme of ["light", "dark"]) {
    const page = await browser.newPage({ reducedMotion: "reduce" });
    await page.addInitScript(theme => localStorage.setItem("theme", theme), theme);
    for (const route of ["experience", "projects"]) {
      await page.goto(`${base}/${route}`);
      const disclosures = page.locator("details[data-case-study-for]");
      await disclosures.first().waitFor();
      assert.equal(await disclosures.count(), route === "projects" ? 7 : 5);
      assert.equal(await page.locator("details[data-case-study-for][open]").count(), 0);
      const first = disclosures.first();
      await first.locator("summary").focus();
      await page.keyboard.press("Enter");
      assert.ok(await first.evaluate(node => node.open));
      await page.keyboard.press("Space");
      assert.ok(!(await first.evaluate(node => node.open)));
      await disclosures.evaluateAll(nodes => nodes.forEach(node => { node.open = true; }));
      for (const width of [320, 390, 768, 1024, 1440, 1920]) {
        await page.setViewportSize({ width, height: 900 });
        for (const dir of ["ltr", "rtl"]) for (const size of ["100%", "200%"]) {
          await page.evaluate(({ dir, size }) => {
            document.documentElement.dir = dir;
            document.documentElement.style.fontSize = size;
          }, { dir, size });
          assert.ok(await disclosures.evaluateAll(nodes => nodes.every(node => {
            const box = node.getBoundingClientRect();
            return box.left >= 0 && box.right <= innerWidth && node.scrollWidth <= node.clientWidth + 1;
          })), `${route}/${theme}/${width}/${dir}/${size}: expanded details fit`);
          assert.ok(await disclosures.locator("summary").evaluateAll(nodes => nodes.every(node => node.getBoundingClientRect().height >= 44)));
        }
      }
      await page.evaluate(() => { document.documentElement.dir = "ltr"; document.documentElement.style.fontSize = "100%"; });
      await page.addScriptTag({ content: axe.source });
      const result = await page.evaluate(() => window.axe.run("main"));
      assert.deepEqual(result.violations, [], `${route}/${theme}: expanded accessibility`);
      await disclosures.evaluateAll(nodes => nodes.forEach((node, index) => { node.open = index === 1; }));
      await page.pdf({ path: join(output, `${route}-${theme}.pdf`), tagged: true });
      assert.deepEqual(await disclosures.evaluateAll(nodes => nodes.map(node => node.open)), Array.from({ length: route === "projects" ? 7 : 5 }, (_, index) => index === 1));
      for (const width of [390, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
        await page.screenshot({ path: join(output, `${route}-${theme}-${width}.png`), fullPage: true });
      }
      const ids = await disclosures.evaluateAll(nodes => nodes.map(node => node.dataset.caseStudyFor));
      for (const id of ids) {
        await page.goto(`${base}/${route}#${id}`);
        await page.waitForFunction(id => document.activeElement?.id === id, id);
        assert.ok(await page.locator(`details[data-case-study-for="${id}"]`).evaluate(node => node.open));
        await page.reload();
        await page.waitForFunction(id => document.activeElement?.id === id, id);
        assert.ok(await page.locator(`details[data-case-study-for="${id}"]`).evaluate(node => node.open));
      }
    }
    for (const route of ["home", "skills", "fde", "education", "contact", "github"]) {
      await page.goto(`${base}/${route}`);
      await page.locator("main h1").waitFor();
      for (const width of [390, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        await page.screenshot({ path: join(output, `${route}-${theme}-${width}.png`), fullPage: true });
      }
    }
    await page.close();
  }
  console.log(`PASS: expanded layout, keyboard, accessibility, direct links, refresh and print restoration. Artifacts: ${output}`);
} finally { await browser.close(); }
