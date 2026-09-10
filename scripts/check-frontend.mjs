import assert from "node:assert/strict";
import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { chromium } from "playwright";
import axe from "axe-core";

// Check both Vite modes: --base-url http://localhost:3000 or the preview default.
const baseIndex = process.argv.indexOf("--base-url");
if (baseIndex >= 0 && !process.argv[baseIndex + 1]) {
  throw new Error("--base-url requires a URL");
}
const base = new URL(baseIndex < 0 ? "http://127.0.0.1:4173" : process.argv[baseIndex + 1]);
const routes = ["home", "contact", "skills", "experience", "education", "projects"];
const browser = await chromium.launch({ headless: true });
const output = await mkdtemp(join(tmpdir(), "portfolio-frontend-"));
const findings = [];

async function assertMenuBounds(page, direction, label) {
  await page.waitForFunction(() => {
    const panel = document.querySelector(".menu--open");
    return panel && getComputedStyle(panel).opacity === "1" && getComputedStyle(panel).transform === "none";
  });
  const bounds = await page.locator(".menu--open").evaluate(panel => {
    const rect = panel.getBoundingClientRect();
    const header = panel.closest("header").getBoundingClientRect();
    return {
      left: rect.left, right: rect.right, bottom: rect.bottom,
      headerLeft: header.left, headerRight: header.right,
      width: document.documentElement.clientWidth, height: innerHeight,
      scrollWidth: panel.scrollWidth, clientWidth: panel.clientWidth,
    };
  });
  assert.ok(bounds.left >= 0 && bounds.right <= bounds.width + 1 && bounds.bottom <= bounds.height + 1, `${label}: panel stays in viewport: ${JSON.stringify(bounds)}`);
  const edgeDifference = direction === "rtl" ? bounds.left - bounds.headerLeft : bounds.headerRight - bounds.right;
  assert.ok(Math.abs(edgeDifference) <= 2, `${label}: panel aligns with header edge`);
  assert.ok(bounds.scrollWidth <= bounds.clientWidth + 1, `${label}: panel content does not clip horizontally`);
}

async function inspectMenuLayout() {
  const page = await browser.newPage({ reducedMotion: "reduce" });
  for (const width of [320, 390, 768, 1440, 1536, 1920]) {
    await page.setViewportSize({ width, height: 735 });
    await page.goto(new URL("/education", base).href);
    const trigger = page.getByRole("button", { name: "Toggle navigation menu" });
    for (const direction of ["ltr", "rtl"]) {
      for (const textSize of ["100%", "200%"]) {
        await page.evaluate(({ direction, textSize }) => {
          document.documentElement.dir = direction;
          document.documentElement.style.fontSize = textSize;
        }, { direction, textSize });
        await trigger.click();
        const label = `${base.origin}, ${width}px, ${direction}, ${textSize} text`;
        await assertMenuBounds(page, direction, label);
        for (const control of await page.locator(".menu--open a, .menu--open button").all()) {
          await control.scrollIntoViewIfNeeded();
          await control.focus();
          assert.ok(await control.evaluate(node => {
            const rect = node.getBoundingClientRect();
            return node === document.activeElement && node.contains(document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2));
          }), `${label}: every control can receive focus and pointer input`);
        }
        await page.keyboard.press("Escape");
        assert.ok(await trigger.evaluate(node => node === document.activeElement), `${label}: Escape restores focus`);
      }
    }
  }
  await page.close();
  console.log("Checked 24 navigation layouts, header alignment and control reachability.");
}

try {
  await inspectMenuLayout();
  for (const mode of ["dark", "light"]) {
    for (const accent of ["blue", "pink", "pink-indigo"]) {
      const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
      await context.addInitScript(({ mode, accent }) => {
        localStorage.setItem("theme", mode);
        localStorage.setItem("accent", accent);
      }, { mode, accent });
      const page = await context.newPage();
      for (const route of routes) {
        await page.goto(new URL(`/${route}`, base).href);
        await page.locator("main h1").waitFor();
        await page.evaluate(() => document.fonts.ready);
        await page.addScriptTag({ content: axe.source });
        const violations = await page.evaluate(async () => (await window.axe.run({ runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] } })).violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) })));
        findings.push({ route, mode, accent, violations });
        if (accent === "blue" && ["home", "contact"].includes(route)) {
          await page.screenshot({ path: join(output, `${route}-${mode}.png`), fullPage: true });
        }
        await page.getByRole("button", { name: "Toggle navigation menu" }).click();
        await assertMenuBounds(page, "ltr", `${route}, ${mode}/${accent}`);
        await page.keyboard.press("Escape");
      }
      await page.getByRole("button", { name: "Toggle navigation menu" }).click();
      const menuViolations = await page.evaluate(async () => (await window.axe.run("header", { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] } })).violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) })));
      findings.push({ route: "open-header", mode, accent, violations: menuViolations });
      await context.close();
      console.log(`Checked ${mode}/${accent}.`);
    }
  }
  const page = await browser.newPage({ viewport: { width: 320, height: 640 } });
  await page.goto(new URL("/contact", base).href);
  const trigger = page.getByRole("button", { name: "Toggle navigation menu" });
  // Click as soon as mounted: the header must not sit behind the hero entrance.
  await trigger.click();
  const contact = page.getByRole("link", { name: "Contact", exact: true });
  await contact.click();
  for (const dir of ["ltr", "rtl"]) {
    await page.evaluate(dir => { document.documentElement.dir = dir; document.documentElement.style.fontSize = "200%"; }, dir);
    await trigger.click();
    assert.equal(await trigger.getAttribute("aria-expanded"), "true");
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `No overflow at 320px, 200% text, ${dir}`);
    const panel = page.locator(".menu--open");
    const rect = await panel.boundingBox();
    assert.ok(rect.x >= 0 && rect.x + rect.width <= 321 && rect.y + rect.height <= 640, `Menu bounds, ${dir}`);
    await page.keyboard.press("Escape");
    assert.ok(await trigger.evaluate(el => el === document.activeElement));
  }
  await page.evaluate(() => { document.documentElement.style.fontSize = ""; document.documentElement.dir = "ltr"; });
  await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  await trigger.click();
  await page.waitForFunction(() => getComputedStyle(document.querySelector(".menu--open")).opacity === "1");
  assert.equal(await page.locator(".navicon").evaluate(el => getComputedStyle(el, "::before").backgroundColor), await trigger.evaluate(el => getComputedStyle(el).color), "Forced colors use system text color for the navigation icon");
  await page.screenshot({ path: join(output, "header-forced-colors-320.png") });
  await page.keyboard.press("Escape");
  await page.emulateMedia({ forcedColors: "none" });
  await page.screenshot({ path: join(output, "contact-mobile.png"), fullPage: true });
  for (let i = 0; i < 6; i++) await trigger.click({ delay: 10 });
  assert.equal(await trigger.getAttribute("aria-expanded"), "false");
  assert.equal(await page.locator(".menu").getAttribute("inert"), "");
  assert.deepEqual(findings.filter(f => f.violations.length), [], "Rendered accessibility checks");
  console.log("PASS: 42 accessibility scans, early/rapid menu, Escape, 200% text, RTL, forced colors.");
} finally {
  await writeFile(join(output, "report.json"), JSON.stringify(findings, null, 2));
  console.log(`Report: ${output}`);
  await browser.close();
}
