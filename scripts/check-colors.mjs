import assert from "node:assert/strict";
import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://127.0.0.1:4173";
const output = await mkdtemp(join(tmpdir(), "portfolio-colors-"));
const report = [];
const browser = await chromium.launch();
const routes = ["home", "education", "experience", "fde", "skills", "projects", "contact", "not-found", "github",
  ...["projects", "activity", "impact", "arcade", "animations"].map(tab => `github?tab=${tab}`),
  ...["minesweeper", "breakout", "galaga", "bomberman", "pacman", "puzzle"].map(game => `github?tab=arcade&game=${game}`)];

// Runs in the browser: composite each painted ancestor and group opacity in order.
function measure({ selector, headerBackdrop = null }) {
  const root = document.querySelector(selector);
  if (!root) throw new Error(`Missing color target: ${selector}`);
  const parse = value => {
    const rgb = value.match(/^rgba?\(([^)]+)\)$/);
    if (rgb) { const values = rgb[1].match(/[\d.]+/g).map(Number); return [...values.slice(0, 3), values[3] ?? 1]; }
    const srgb = value.match(/^color\(srgb ([^)]+)\)$/);
    if (srgb) { const values = srgb[1].match(/[\d.]+/g).map(Number); return [...values.slice(0, 3).map(value => value * 255), values[3] ?? 1]; }
    throw new Error(`Unsupported computed color: ${value}`);
  };
  const over = (front, back) => {
    const alpha = front[3] + back[3] * (1 - front[3]);
    return alpha ? [...front.slice(0, 3).map((value, index) =>
      (value * front[3] + back[index] * back[3] * (1 - front[3])) / alpha), alpha] : [0, 0, 0, 0];
  };
  const luminance = rgb => rgb.slice(0, 3).map(value => value / 255)
    .map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4)
    .reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);
  const ratio = (a, b) => (Math.max(luminance(a), luminance(b)) + 0.05) / (Math.min(luminance(a), luminance(b)) + 0.05);
  const render = (node, color = null) => {
    let pixel = color ? parse(color) : [0, 0, 0, 0];
    for (let parent = node; parent; parent = parent.parentElement) {
      const style = getComputedStyle(parent);
      if ((style.backgroundImage !== "none" && pixel[3] < 1) || style.filter !== "none" ||
        (style.backdropFilter !== "none" && !headerBackdrop)) throw new Error("Image, filter or backdrop requires pixel sampling");
      pixel = over(pixel, parse(style.backgroundColor));
      pixel[3] *= Number(style.opacity);
      if (headerBackdrop && parent.tagName === "HEADER") return over(pixel, [...headerBackdrop, 1]);
    }
    return over(pixel, [255, 255, 255, 1]);
  };
  const pairs = [], unverified = [], seen = new Set();
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode.parentElement;
    if (!walker.currentNode.textContent.trim() || seen.has(node) || node.closest("svg, script, style, option") ||
      !node.checkVisibility({ opacityProperty: true, visibilityProperty: true })) continue;
    seen.add(node);
    const css = getComputedStyle(node);
    // Screen-reader-only text has no painted glyphs until its focus style reveals it.
    if (css.clipPath === "inset(50%)") continue;
    const label = `${node.tagName.toLowerCase()}${node.id ? `#${node.id}` : `.${String(node.className).trim().replaceAll(" ", ".")}`}`;
    if (node.closest("[role='img']")) {
      unverified.push({ selector: label, reason: "Image/emoji colors are not represented by the CSS text foreground" });
      continue;
    }
    try {
      const foreground = render(node, css.color), background = render(node);
      const large = parseFloat(css.fontSize) >= 24 || (parseFloat(css.fontSize) >= 18.5 && parseInt(css.fontWeight) >= 700);
      const disabled = Boolean(node.closest(":disabled, [aria-disabled='true']"));
      const decorative = Boolean(node.closest("[aria-hidden='true']"));
      pairs.push({ selector: label, text: node.textContent.trim().slice(0, 90), foreground, background,
        ratio: ratio(foreground, background), threshold: disabled || decorative ? null : large ? 3 : 4.5,
        ...(disabled ? { exemption: "Inactive control" } : decorative ? { exemption: "Decorative glyph; measured, not an essential indicator" } : {}) });
    } catch (error) { unverified.push({ selector: label, reason: error.message }); }
  }
  // Only boundaries needed to identify these controls are gated, not decorative card borders.
  for (const node of [root, ...root.querySelectorAll("button, input, select, a, summary")]) {
    if (!node.checkVisibility({ opacityProperty: true, visibilityProperty: true }) || node.matches(":disabled")) continue;
    const css = getComputedStyle(node);
    const boundary = node.matches(".change-theme-btn, .menu-icon, .gh-filter-grid input[type='search'], .gh-filter-grid select");
    const focused = node.matches(":focus-visible") && parseFloat(css.outlineWidth) > 0 && css.outlineStyle !== "none";
    if (!boundary && !focused) continue;
    try {
      const background = render(boundary ? node : node.parentElement);
      const foreground = render(boundary ? node : node.parentElement, boundary ? css.borderTopColor : css.outlineColor);
      pairs.push({ selector: node.className || node.tagName, kind: boundary ? "control boundary" : "focus indicator",
        foreground, background, ratio: ratio(foreground, background), threshold: 3 });
    } catch (error) { unverified.push({ selector: node.className, reason: error.message }); }
  }
  return { pairs, unverified };
}

async function record(page, label, selector = "main", headerBackdrop = null) {
  const result = await page.evaluate(measure, { selector, headerBackdrop });
  assert.ok(result.pairs.length, `${label}: no rendered pairs measured`);
  const failures = result.pairs.filter(pair => pair.threshold !== null && pair.ratio < pair.threshold);
  report.push({ label, ...result, failures });
  assert.deepEqual(failures, [], `${label}: contrast failures`);
}

try {
  for (const mode of ["light", "dark"]) {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    await context.addInitScript(mode => localStorage.setItem("theme", mode), mode);
    const page = await context.newPage();
    for (const route of routes) {
      await page.goto(`${base}/${route}`);
      await page.locator("main h1").waitFor();
      if (route.includes("tab=arcade")) await page.getByText("Ready", { exact: true }).waitFor();
      else if (route.startsWith("github")) await page.locator("main h2").first().waitFor();
      for (const width of [390, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        await record(page, `${mode}/${route}/${width}/rest`);
        if (route === "home") await record(page, `${mode}/footer/${width}`, ".footer-div");
        const details = page.locator("details[data-case-study-for]");
        if (await details.count()) {
          await details.evaluateAll(nodes => nodes.forEach(node => { node.open = true; }));
          await record(page, `${mode}/${route}/${width}/expanded`);
          await details.evaluateAll(nodes => nodes.forEach(node => { node.open = false; }));
        }
      }
    }

    // Press tests prevent navigation, so an external credential URL is never opened.
    await page.goto(`${base}/education`);
    await page.evaluate(() => document.addEventListener("click", event => event.preventDefault(), true));
    const cdp = await context.newCDPSession(page);
    for (const preference of ["normal", "reduced", "contrast", "forced"]) {
      await cdp.send("Emulation.setEmulatedMedia", { features: [
        { name: "prefers-reduced-motion", value: preference === "reduced" ? "reduce" : "no-preference" },
        { name: "prefers-contrast", value: preference === "contrast" ? "more" : "no-preference" },
        { name: "forced-colors", value: preference === "forced" ? "active" : "none" },
      ] });
      for (const selector of [".degree-card__link", ".cert-card__actions a"]) {
        const target = page.locator(selector).first();
        await target.scrollIntoViewIfNeeded();
        await target.hover();
        await page.waitForTimeout(350);
        await record(page, `${mode}/${preference}/${selector}/hover`, selector);
        await page.mouse.down();
        await page.waitForTimeout(180);
        await record(page, `${mode}/${preference}/${selector}/pressed`, selector);
        await page.mouse.move(0, 0);
        await page.mouse.up();
        await page.waitForTimeout(180);
        await page.keyboard.press("Tab");
        await target.focus();
        await record(page, `${mode}/${preference}/${selector}/focus`, selector);
      }
    }

    await cdp.send("Emulation.setEmulatedMedia", { features: [] });
    await page.goto(`${base}/home`);
    await page.locator("header").waitFor();
    await cdp.send("Emulation.setEmulatedMedia", { features: [
      { name: "prefers-reduced-motion", value: "reduce" },
      { name: "prefers-reduced-transparency", value: "no-preference" },
      { name: "prefers-contrast", value: "no-preference" },
      { name: "forced-colors", value: "none" },
    ] });
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.waitForFunction(() => document.querySelector("header").classList.contains("header--wide") === matchMedia("(min-width: 80rem)").matches);
      const toggle = page.getByRole("button", { name: "Toggle navigation menu" });
      if (await toggle.isVisible()) await toggle.click();
      for (const backdrop of [[0, 0, 0], [255, 255, 255]])
        await record(page, `${mode}/header/${width}/backdrop-${backdrop[0]}`, "header", backdrop);
      if (await toggle.isVisible()) await page.keyboard.press("Escape");
      await page.keyboard.press("Tab");
      await page.locator(".skip-link").focus();
      assert.ok(await page.locator(".skip-link").evaluate(node => node.matches(":focus-visible")));
      for (const backdrop of [[0, 0, 0], [255, 255, 255]])
        await record(page, `${mode}/skip-link/${width}/backdrop-${backdrop[0]}`, ".skip-link", backdrop);
      await page.locator(".skip-link").blur();
    }

    const loading = await context.newPage();
    const gate = Promise.withResolvers();
    for (const pattern of ["**/data/github.json", "**/raw.githubusercontent.com/**/dashboard.json"])
      await loading.route(pattern, async route => { await gate.promise; await route.abort(); });
    await loading.goto(`${base}/github`);
    await loading.getByText("Loading GitHub activity…", { exact: true }).waitFor();
    await record(loading, `${mode}/github/loading`);
    gate.resolve();
    await loading.getByText("Unable to load GitHub data. Retry loading it or view my GitHub profile.", { exact: true }).waitFor();
    await record(loading, `${mode}/github/error`);
    await loading.close();
    const empty = await context.newPage();
    await empty.goto(`${base}/github?tab=projects&q=no-repository-matches-this-color-test`);
    await empty.getByText("No repositories match these filters.", { exact: false }).waitFor();
    await record(empty, `${mode}/github/empty`);
    await empty.close();

    const recovery = await context.newPage();
    await recovery.route(/ContactComponent[^/]*\.(?:jsx|js)(?:\?|$)/, route => route.abort());
    await recovery.goto(`${base}/home`);
    await recovery.locator("main h1").waitFor();
    const menu = recovery.getByRole("button", { name: "Toggle navigation menu" });
    if (await menu.isVisible()) await menu.click();
    await recovery.locator(".menu a[href='/contact']").click();
    await recovery.getByRole("heading", { name: "Unable to display this page" }).waitFor();
    await record(recovery, `${mode}/route-error`);
    await recovery.close();
    await context.close();
    console.log(`Checked ${mode}: all pages/tabs/games, expanded stories, pressed links, preferences, header composition and data recovery.`);
  }
} finally {
  await writeFile(join(output, "report.json"), JSON.stringify(report, null, 2));
  await browser.close();
}
const pairs = report.flatMap(result => result.pairs);
const unverified = report.flatMap(result => result.unverified);
console.log(`PASS: ${report.length} color scenarios; ${pairs.length} measured pairs. Report: ${output}`);
console.log(`Not verified by this checker: ${unverified.length} artwork/filter-dependent elements; image artwork and canvas graphics require separate visual checks.`);
