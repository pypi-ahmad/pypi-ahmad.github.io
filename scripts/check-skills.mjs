import assert from "node:assert/strict";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { chromium } from "playwright";
import axe from "axe-core";

const base = "http://127.0.0.1:4173";
const output = await mkdtemp(join(tmpdir(), "portfolio-skills-"));
const browser = await chromium.launch();
try {
  for (const width of [320, 375, 900, 1440]) {
    for (const colorScheme of ["light", "dark"]) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, colorScheme, reducedMotion: "reduce" });
      await page.addInitScript(mode => localStorage.setItem("theme", mode), colorScheme);
      const errors = [];
      page.on("pageerror", error => errors.push(error.message));
      await page.goto(`${base}/skills`);
      await page.getByRole("heading", { level: 1, name: "Skills, with context." }).waitFor();
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator(".toolkit-group .skill-tags li").count(), 32);
      assert.equal(await page.locator(".skills-learning-card").count(), 7);
      for (const dir of ["ltr", "rtl"]) {
        for (const size of ["100%", "200%"]) {
          await page.evaluate(({ dir, size }) => {
            document.documentElement.dir = dir;
            document.documentElement.style.fontSize = size;
          }, { dir, size });
          const overflow = await page.evaluate(() => {
            const failures = [];
            const walker = document.createTreeWalker(document.querySelector("main"), NodeFilter.SHOW_TEXT);
            while (walker.nextNode()) {
              if (!walker.currentNode.textContent.trim()) continue;
              const range = document.createRange();
              range.selectNodeContents(walker.currentNode);
              for (const rect of range.getClientRects()) {
                if (rect.width && (rect.left < -1 || rect.right > innerWidth + 1)) failures.push(walker.currentNode.textContent);
              }
            }
            for (const node of document.querySelectorAll(".skill-tags li, .toolkit-group, .skills-learning-card")) {
              if (node.scrollWidth > node.clientWidth + 1) failures.push(node.textContent);
            }
            return failures;
          });
          assert.deepEqual(overflow, [], `${width}/${colorScheme}/${dir}/${size}: text fits`);
        }
      }
      await page.evaluate(() => { document.documentElement.dir = "ltr"; document.documentElement.style.fontSize = "100%"; });
      await page.addScriptTag({ content: axe.source });
      const accessibility = await page.evaluate(() => window.axe.run("main"));
      assert.deepEqual(accessibility.violations, [], `${width}/${colorScheme}: accessibility`);
      // Existing hero and CTA gradients require separate contrast review; all other checks must resolve.
      const gradientTargets = [".skills-eyebrow", "#skills-title", ".skills-intro", ".skills-cta-actions > a[href$=\"projects\"][data-discover=\"true\"]"];
      assert.ok(accessibility.incomplete.every(item => item.id === "color-contrast" && item.nodes.every(node =>
        node.target.length === 1 && gradientTargets.includes(node.target[0]) && node.failureSummary.includes("background gradient")
      )), JSON.stringify(accessibility.incomplete));
      if (width === 320 || width === 1440) {
        for (const [name, selector] of [["toolkit", ".toolkit-grid"], ["learning", ".skills-learning-grid"]]) {
          await page.locator(selector).evaluate(node => node.scrollIntoView({ block: "start" }));
          await page.screenshot({ path: join(output, `${name}-${width}-${colorScheme}.png`) });
        }
      }
      if (width === 1440 && colorScheme === "light") {
        const destinations = await page.locator(".skills-evidence-link[href^='/']").evaluateAll(nodes => nodes.map(node => node.getAttribute("href")));
        for (const href of destinations) {
          const link = page.locator(`.skills-evidence-link[href='${href}']`);
          await link.focus();
          assert.ok(await link.evaluate(node => document.activeElement === node && getComputedStyle(node).outlineStyle !== "none"));
          await page.keyboard.press("Enter");
          await page.waitForURL(`${base}${href}`);
          if (href.includes("#")) await page.waitForFunction(id => document.activeElement?.id === id, href.split("#")[1]);
          await page.goBack();
          await page.locator(".toolkit-grid").waitFor();
        }
      }
      assert.deepEqual(errors, []);
      await page.close();
      console.log(`PASS Skills: ${width}/${colorScheme}, LTR/RTL, 100%/200%, accessibility.`);
    }
  }
  console.log(`Screenshots: ${output}`);
} finally {
  await browser.close();
}
