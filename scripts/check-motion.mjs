import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { gzipSync } from "node:zlib";
import { chromium } from "playwright";

// Run against `npm run preview -- --host 127.0.0.1 --strictPort`.
// --baseline captures the unchanged site; --compare <report.json> checks it.
const baseIndex = process.argv.indexOf("--base-url");
if (baseIndex >= 0 && !process.argv[baseIndex + 1]) throw new Error("--base-url requires a URL");
const base = baseIndex < 0 ? "http://127.0.0.1:4173" : process.argv[baseIndex + 1].replace(/\/$/, "");
const baseline = process.argv.includes("--baseline");
const interactionsOnly = process.argv.includes("--interactions-only");
const compareIndex = process.argv.indexOf("--compare");
const previous = compareIndex < 0 ? null : JSON.parse(await readFile(process.argv[compareIndex + 1], "utf8"));
const output = await mkdtemp(join(tmpdir(), "portfolio-motion-"));
const routes = ["/", "/experience", "/education", "/projects", "/skills", "/contact"];
const report = { mode: baseline ? "baseline" : "verification", measurements: {}, content: {}, screenshots: [], checks: [] };
const browser = await chromium.launch({ headless: true });

async function measure(width) {
  // These are controlled Chromium lab samples, not field Core Web Vitals or physical-device measurements.
  const context = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
  if (width === 390) {
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    await cdp.send("Network.emulateNetworkConditions", {
      offline: false, latency: 150,
      downloadThroughput: 1.6 * 1024 * 1024 / 8, uploadThroughput: 750 * 1024 / 8,
    });
  }
  await page.addInitScript(() => {
    window.motionMetrics = { lcp: 0, cls: 0, longTasks: [] };
    new PerformanceObserver(list => {
      for (const item of list.getEntries()) window.motionMetrics.lcp = item.startTime;
    }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver(list => {
      for (const item of list.getEntries()) if (!item.hadRecentInput) window.motionMetrics.cls += item.value;
    }).observe({ type: "layout-shift", buffered: true });
    new PerformanceObserver(list => {
      for (const item of list.getEntries()) window.motionMetrics.longTasks.push({ start: item.startTime, duration: item.duration });
    }).observe({ type: "longtask", buffered: true });
  });
  await page.goto(base);
  await page.getByRole("heading", { level: 1 }).waitFor();
  await page.waitForTimeout(4500);
  const result = await page.evaluate(() => ({
    ...window.motionMetrics,
    js: performance.getEntriesByType("resource").filter(r => r.name.endsWith(".js")).map(r => new URL(r.name).pathname),
  }));
  result.gzipJs = 0;
  for (const path of new Set(result.js)) result.gzipJs += gzipSync(await readFile(join("build", path))).length;
  await context.close();
  return result;
}

async function inspectRoutes(width, reducedMotion) {
  const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion, hasTouch: width <= 768 });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  for (const route of routes) {
    await page.goto(base + route);
    await page.getByRole("heading", { level: 1 }).waitFor();
    if (!baseline) {
      assert.equal(await page.locator("main h1").count(), 1, `${route}: one main heading`);
      assert.equal(await page.locator("main h1").evaluate(node => node.closest("[data-motion]")), null, `${route}: heading outside entrance animation`);
      assert.ok(await page.locator("[data-motion]").count() > 0, `${route}: motion targets exist`);
      if (route === "/" && (width <= 768 || reducedMotion === "reduce")) {
        assert.equal(await page.locator(".hero-atmosphere").evaluate(node => getComputedStyle(node, "::before").animationName), "none", "mobile/reduced hero is static");
      }
      if (reducedMotion === "reduce") {
        assert.ok(await page.locator("[data-motion]").evaluateAll(nodes => nodes.every(node => {
          const style = getComputedStyle(node);
          return style.opacity === "1" && style.transform === "none";
        })), `${route}: reduced motion content immediately visible`);
      }
    }
    // Visit every reveal, including long education/experience lists.
    for (const target of await page.locator("[data-motion]").all()) {
      await target.scrollIntoViewIfNeeded();
      if (!baseline) {
        await page.waitForFunction(element => getComputedStyle(element).opacity === "1", await target.elementHandle());
        if (width <= 768) assert.equal(await target.evaluate(node => getComputedStyle(node).transform), "none");
      }
    }
    const content = await page.locator("main").evaluate(main => ({
      text: main.innerText.replace(/\s+/g, " ").trim(),
      links: [...main.querySelectorAll("a")].map(a => ({ text: a.textContent.trim(), href: a.getAttribute("href") })),
    }));
    report.content[route] = content;
    if (previous) assert.deepEqual(content, previous.content[route], `${route}: content and links preserved`);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${route}: no horizontal overflow at ${width}`);
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForTimeout(600);
    if (!baseline) {
      assert.ok(await page.locator("[data-motion]").evaluateAll(nodes => nodes.every(node => getComputedStyle(node).opacity === "1")), `${route}: reveals do not replay on return scroll`);
      assert.notEqual(await page.locator("body").evaluate(node => getComputedStyle(node).cursor), "none", "native cursor remains available");
    }
    const screenshot = join(output, `${route.slice(1) || "home"}-${width}-${reducedMotion}.png`);
    await page.screenshot({ path: screenshot });
    report.screenshots.push(screenshot);
    console.log(`Checked ${route}: ${width}px / ${reducedMotion}.`);
  }
  assert.deepEqual(errors, [], "no browser errors");
  await context.close();
  report.checks.push(`Routes, content, links and layout: ${width}px / ${reducedMotion}`);
}

async function inspectInteractions() {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto(base);
  await page.locator(".hero-atmosphere").waitFor({ state: "attached" });
  assert.equal(await page.locator(".hero-atmosphere").evaluate(node => getComputedStyle(node, "::before").animationIterationCount), "1", "hero plays once");
  await page.waitForFunction(() => document.getAnimations().every(animation => animation.playState !== "running"));
  assert.ok(await page.locator(".hero-atmosphere").evaluate(node => ["::before", "::after"].every(pseudo => {
    const transform = getComputedStyle(node, pseudo).transform;
    return transform === "none" || new DOMMatrixReadOnly(transform).isIdentity;
  })), "hero settles without displacement");
  await page.evaluate(() => {
    window.idleLongTasks = [];
    new PerformanceObserver(list => window.idleLongTasks.push(...list.getEntries().map(task => task.duration)))
      .observe({ type: "longtask" });
  });
  await page.waitForTimeout(1000);
  report.idleLongTasks = await page.evaluate(() => window.idleLongTasks);
  assert.deepEqual(report.idleLongTasks, [], "no repeated animation work after settling");

  // Keyboard traversal must expose offscreen content before an entrance ends.
  const focusableCount = await page.locator("a:visible, button:visible").count();
  for (let tab = 0; tab < focusableCount; tab++) {
    await page.keyboard.press("Tab");
    assert.ok(await page.evaluate(() => {
      const focused = document.activeElement;
      const style = getComputedStyle(focused);
      if (!focused.matches("a, button")) return false;
      for (let parent = focused; parent; parent = parent.parentElement) {
        if (getComputedStyle(parent).opacity === "0") return false;
      }
      return style.outlineStyle !== "none" && parseFloat(style.outlineWidth) >= 2;
    }), `keyboard focus ${tab + 1} is visible immediately`);
  }
  await page.goto(base + "/education");
  await page.locator("main h1").waitFor();
  await page.emulateMedia({ media: "print" });
  assert.ok(await page.locator("[data-motion]").evaluateAll(nodes => nodes.every(node => {
    const style = getComputedStyle(node);
    return style.opacity === "1" && style.transform === "none";
  })), "print includes offscreen content without scrolling");
  await page.emulateMedia({ media: "screen" });
  await page.setViewportSize({ width: 320, height: 200 });
  await page.reload();
  await page.locator("main h1").waitFor();
  for (const group of await page.locator(".certification-group").all()) {
    await group.scrollIntoViewIfNeeded();
    await page.waitForFunction(node => getComputedStyle(node).opacity === "1", await group.elementHandle());
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  report.checks.push("Unscrolled printing and very short viewport reveals");
  await page.goto(base);
  await page.getByRole("link", { name: "View selected work", exact: true }).click();
  await page.waitForFunction(() => location.hash === "#selected-work" && Math.abs(document.getElementById("selected-work").getBoundingClientRect().top) < 100);
  await page.getByRole("link", { name: "See all projects", exact: true }).click();
  await page.waitForURL("**/projects");
  await page.getByRole("heading", { name: "Recent projects", exact: true }).waitFor();
  await page.goBack();
  await page.waitForURL("**/#selected-work");
  await page.getByRole("heading", { name: "Selected work", exact: true }).waitFor();
  await page.goForward();
  await page.waitForURL("**/projects");
  await page.locator("main h1").waitFor();
  report.checks.push("Hero settles, keyboard focus, anchor, navigation and history");

  // Switch preference after mounting: CSS must override Framer's cached preference.
  await page.goto(base);
  await page.locator("main h1").waitFor();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForFunction(() => [...document.querySelectorAll("[data-motion]")].every(node => {
    const style = getComputedStyle(node);
    return style.opacity === "1" && style.transform === "none";
  }));
  assert.equal(await page.locator(".hero-atmosphere").evaluate(node => getComputedStyle(node, "::before").animationName), "none");

  const accents = [
    ["pink", "Use crimson and pink accent"],
    ["blue", "Use indigo and navy accent"],
    ["pink-indigo", "Use dark pink and indigo accent"],
  ];
  for (const mode of ["dark", "light"]) {
    const menu = page.getByRole("button", { name: "Toggle navigation menu" });
    if (await menu.getAttribute("aria-expanded") === "false") await menu.click();
    if (await page.evaluate(() => localStorage.getItem("theme")) !== mode) {
      await page.getByRole("button", { name: /Switch to (light|dark) mode/, exact: true }).click();
      await menu.click();
    }
    await page.keyboard.press("Tab");
    await page.getByRole("button", { name: /Switch to (light|dark) mode/, exact: true }).focus();
    assert.ok(await page.getByRole("button", { name: /Switch to (light|dark) mode/, exact: true }).evaluate(node => {
      const style = getComputedStyle(node);
      return style.outlineStyle !== "none" && parseFloat(style.outlineWidth) >= 2;
    }), "theme toggle has a visible keyboard focus ring");
    assert.equal(await page.locator(".navicon").evaluate(node => getComputedStyle(node, "::before").transitionDuration), "0s", "reduced menu icon switches without animation");
    for (const [accent, label] of accents) {
      await page.getByRole("button", { name: label, exact: true }).click();
      await page.waitForFunction(expected => localStorage.getItem("accent") === expected, accent);
      assert.equal(await page.locator("#root").evaluate(node => getComputedStyle(node).opacity), "1", "reduced theme switching does not fade");
      assert.equal(await page.locator("#root").evaluate(node => getComputedStyle(node).transitionDuration), "0s");
      await menu.click();
      await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
      const screenshot = join(output, `theme-${mode}-${accent}.png`);
      await page.screenshot({ path: screenshot });
      report.screenshots.push(screenshot);
      await menu.click();
    }
  }
  await page.reload();
  await page.locator("main h1").waitFor();
  assert.deepEqual(await page.evaluate(() => [localStorage.getItem("theme"), localStorage.getItem("accent")]), ["light", "pink-indigo"], "theme choice persists");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.getByRole("button", { name: "Toggle navigation menu" }).click();
  await page.getByRole("link", { name: "Contact", exact: true }).click();
  await page.waitForURL("**/contact");
  const contact = page.locator(".contact-links-anchor").first();
  await contact.hover();
  await page.waitForTimeout(250);
  assert.ok(await contact.evaluate(node => {
    const transform = getComputedStyle(node).transform;
    return transform !== "none" && new DOMMatrixReadOnly(transform).m42 >= -3 && new DOMMatrixReadOnly(transform).m42 < 0;
  }), "fine-pointer hover lift stays within 3px");
  await page.emulateMedia({ reducedMotion: "reduce" });
  assert.equal(await contact.evaluate(node => getComputedStyle(node).transform), "none", "live reduced motion cancels hover lift");
  await page.mouse.move(0, 0);
  await page.keyboard.press("Tab");
  await contact.focus();
  assert.equal(await contact.evaluate(node => getComputedStyle(node).transform), "none", "reduced-motion keyboard focus never translates the contact link");
  report.checks.push("Live reduced-motion switch, six themes, persistence and pointer hover");

  await page.goto(base + "/missing-motion-check");
  await page.getByRole("heading", { name: "Page not found", exact: true }).waitFor();
  await page.getByRole("link", { name: "Return home", exact: true }).click();
  await page.waitForURL("**/home");
  await page.locator("main h1").waitFor();
  await page.goto(base + "/splash");
  await page.getByRole("status", { name: "Loading portfolio" }).waitFor();
  assert.ok(await page.locator(".ball").evaluateAll(nodes => nodes.every(node => getComputedStyle(node).animationName === "none")), "splash has no looping movement");
  await page.waitForURL("**/home");
  await page.locator("main h1").waitFor();
  assert.deepEqual(errors, [], "interactions produce no browser errors");
  report.checks.push("Not-found recovery and splash redirect");
  await context.close();
}

try {
  if (!interactionsOnly) {
    for (const width of [1440, 390]) {
      report.measurements[width] = [];
      for (let run = 0; run < 3; run++) report.measurements[width].push(await measure(width));
      console.log(`Measured three cold loads at ${width}px.`);
    }
    await inspectRoutes(1440, "no-preference");
    if (!baseline) {
      await inspectRoutes(390, "no-preference");
      await inspectRoutes(320, "reduce");
      await inspectRoutes(1440, "reduce");
    }
  }
  if (!baseline) await inspectInteractions();
  if (previous && !interactionsOnly) {
    for (const width of [1440, 390]) {
      const before = previous.measurements[width];
      const after = report.measurements[width];
      const medianLcp = runs => [...runs].sort((a, b) => a.lcp - b.lcp)[1].lcp;
      const comparison = {
        beforeLcp: medianLcp(before),
        afterLcp: medianLcp(after),
        gzipJsGrowth: Math.max(...after.map(r => r.gzipJs)) - Math.max(...before.map(r => r.gzipJs)),
        beforeCls: Math.max(...before.map(r => r.cls)),
        afterCls: Math.max(...after.map(r => r.cls)),
      };
      report.comparison ??= {};
      report.comparison[width] = comparison;
      assert.ok(comparison.gzipJsGrowth <= 5 * 1024, "initial JS growth <=5 KiB gzip");
      assert.ok(comparison.afterCls <= comparison.beforeCls + 0.01, "load CLS increase <=0.01");
      assert.ok(comparison.afterLcp <= Math.max(comparison.beforeLcp * 1.2, comparison.beforeLcp + 150), "no material median LCP regression");
    }
  }
  report.passed = true;
} catch (error) {
  report.passed = false;
  report.error = error.stack;
  process.exitCode = 1;
  console.error(error.message);
} finally {
  await browser.close();
  const path = join(output, "report.json");
  await writeFile(path, JSON.stringify(report, null, 2));
  console.log(`Report: ${path}`);
}
