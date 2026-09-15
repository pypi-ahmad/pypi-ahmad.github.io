import assert from "node:assert/strict";
import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://127.0.0.1:4173";
const output = await mkdtemp(join(tmpdir(), "portfolio-typography-"));
const browser = await chromium.launch();
const report = [];
const routes = ["home", "education", "experience", "fde", "skills", "projects", "contact", "not-found", "github",
  ...["projects", "activity", "impact", "arcade", "animations"].map(tab => `github?tab=${tab}`),
  ...["minesweeper", "breakout", "galaga", "bomberman", "pacman", "puzzle"].map(game => `github?tab=arcade&game=${game}`)];

// CSS text checks deliberately exclude image/canvas pixels and hidden accessible descriptions.
function inspect() {
  const issues = [], headings = [], measures = [], nativeControls = [];
  let checked = 0;
  const visible = node => node.checkVisibility({ opacityProperty: true, visibilityProperty: true }) &&
    !node.closest("svg, canvas, [role='img']") && getComputedStyle(node).clipPath !== "inset(50%)";
  const label = node => `${node.tagName.toLowerCase()}${node.id ? `#${node.id}` : `.${String(node.className || node.parentElement.className).trim().replaceAll(" ", ".")}`}`;
  const lineRects = node => {
    const range = document.createRange();
    range.selectNodeContents(node);
    return [...range.getClientRects()].filter(rect => rect.width > 1 && rect.height > 1);
  };
  for (const node of document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,li,small,span,summary,a,button,dt,dd,label,input,select,textarea")) {
    if (!visible(node)) continue;
    const text = node.textContent.trim();
    const editable = node.matches("textarea,select,input:not([type='checkbox']):not([type='radio']):not([type='range'])");
    if (!text && !editable) continue;
    checked++;
    const css = getComputedStyle(node), size = parseFloat(css.fontSize);
    const leading = parseFloat(css.lineHeight) / size;
    const lines = new Set(lineRects(node).map(rect => Math.round(rect.top))).size;
    const location = { selector: label(node), text: text.slice(0, 100) };
    const numeric = /^[\d\s,.+%:/–—-]+$/.test(text);
    const decorative = node.closest("[aria-hidden='true']");
    const containsBlocks = node.querySelector("p,div,ul,ol,dl,h1,h2,h3,h4,h5,h6,section,article");
    if (!containsBlocks && !decorative && !numeric && lines >= 3 && leading < 1.399)
      issues.push({ ...location, issue: "Multi-line leading below 1.4", leading, lines });
    if (!decorative && text.length > 2 && size < 11.99)
      issues.push({ ...location, issue: "Text below 12px", size });
    if (!decorative && size < 18 && parseInt(css.fontWeight) < 400)
      issues.push({ ...location, issue: "Thin reading text", size, weight: css.fontWeight });
    if (editable && size < 16) issues.push({ ...location, issue: "Editable control below 16px", size });
    if (editable) nativeControls.push({ selector: label(node), size, value: node.value,
      recovery: node.matches("select") ? "Full options in native popup" : "Editable text scrolls with caret" });
    if (node.matches("p,li") && !decorative && css.userSelect === "none")
      issues.push({ ...location, issue: "Prose cannot be selected" });
    if (!editable && ((["hidden", "clip"].includes(css.overflowX) && node.scrollWidth > node.clientWidth + 2) ||
        (["hidden", "clip"].includes(css.overflowY) && node.scrollHeight > node.clientHeight + 2)))
      issues.push({ ...location, issue: "Text clipped by its container" });
    if (node.matches("main h1,main h2,main h3,main h4,main h5,main h6"))
      headings.push({ ...location, level: Number(node.tagName[1]), size, weight: css.fontWeight, leading, lines });
  }
  const parents = [];
  for (const heading of headings) {
    while (parents.length && parents.at(-1).level >= heading.level) parents.pop();
    if (parents.length && heading.size > parents.at(-1).size + 0.1)
      issues.push({ ...heading, issue: "Child heading larger than parent", parent: parents.at(-1) });
    parents.push(heading);
  }
  const widths = new Map();
  for (const node of document.querySelectorAll(".case-disclosure__content p,.case-disclosure__content section > ul,.fde-section-intro,.gh p")) {
    if (!visible(node)) continue;
    const css = getComputedStyle(node);
    if (!widths.has(css.font)) {
      const probe = document.createElement("span");
      Object.assign(probe.style, { position: "absolute", visibility: "hidden", font: css.font, width: "65ch", display: "block" });
      document.body.append(probe);
      widths.set(css.font, probe.getBoundingClientRect().width);
      probe.remove();
    }
    const width = node.getBoundingClientRect().width;
    measures.push({ selector: label(node), width, cap: widths.get(css.font) });
    if (width > widths.get(css.font) + 2) issues.push({ selector: label(node), issue: "Reading measure exceeds 65ch", width });
    if (node.matches(".case-disclosure__content p,.gh-source-notes") && css.textWrapStyle !== "auto")
      issues.push({ selector: label(node), issue: "Long-form text still uses decorative wrapping", wrap: css.textWrap });
  }
  const weekdays = [...document.querySelectorAll(".gh-heatmap-weekdays span")].map(node => lineRects(node)[0]);
  weekdays.forEach((rect, index) => {
    if (index && rect.top < weekdays[index - 1].bottom)
      issues.push({ issue: "Calendar weekday labels overlap" });
  });
  return { checked, headings, measures, nativeControls, issues };
}

async function check(page, label) {
  const result = await page.evaluate(inspect);
  report.push({ label, ...result });
  assert.deepEqual(result.issues, [], `${label}: typography failures`);
}

try {
  for (const theme of ["light", "dark"]) {
    const page = await browser.newPage({ reducedMotion: "reduce" });
    await page.addInitScript(theme => localStorage.setItem("theme", theme), theme);
    for (const route of routes) {
      await page.goto(`${base}/${route}`);
      await page.locator("main h1").waitFor();
      if (route.includes("tab=arcade")) await page.getByText("Ready", { exact: true }).waitFor();
      else if (route.startsWith("github")) await page.locator("main h2").first().waitFor();
      await page.locator("details").evaluateAll(nodes => nodes.forEach(node => { node.open = true; }));
      for (const width of [320, 390, 768, 1024, 1440, 1920]) {
        await page.setViewportSize({ width, height: 900 });
        for (const size of ["100%", "200%"]) {
          await page.evaluate(size => { document.documentElement.style.fontSize = size; }, size);
          await check(page, `${theme}/${route}/${width}/${size}`);
        }
      }
      await page.evaluate(() => { document.documentElement.style.fontSize = "100%"; });
      for (const width of [390, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        if (["home", "education", "projects", "fde", "github"].includes(route))
          await page.screenshot({ path: join(output, `${theme}-${route}-${width}.png`), fullPage: true });
        const spacing = await page.addStyleTag({ content: "p,li,h1,h2,h3,h4,h5,h6,span,a,button,label,summary { line-height: 1.5 !important; letter-spacing: .12em !important; word-spacing: .16em !important; } p { margin-bottom: 2em !important; }" });
        await check(page, `${theme}/${route}/${width}/text-spacing`);
        await spacing.evaluate(node => node.remove());
      }
    }
    await page.goto(`${base}/github?tab=projects`);
    const search = page.getByRole("searchbox");
    await search.fill("no-repository-matches-this-typography-check");
    await page.getByText("No repositories match these filters.", { exact: false }).waitFor();
    await check(page, `${theme}/empty-search`);
    await search.focus();
    assert.ok(await search.evaluate(node => node.matches(":focus-visible")));
    await check(page, `${theme}/focused-search`);
    await page.goto(`${base}/projects`);
    await page.locator("details[data-case-study-for]").first().waitFor();
    await page.locator("details summary").first().focus();
    await page.keyboard.press("Enter");
    assert.ok(await page.locator("details").first().evaluate(node => node.open));
    await check(page, `${theme}/keyboard-disclosure`);
    await page.pdf({ path: join(output, `${theme}-projects.pdf`), tagged: true });
    await page.emulateMedia({ media: "print" });
    await page.locator("details[data-case-study-for]").evaluateAll(nodes => nodes.forEach(node => { node.open = true; }));
    await check(page, `${theme}/print`);
    await page.close();

    const loading = await browser.newPage({ reducedMotion: "reduce" });
    await loading.addInitScript(theme => localStorage.setItem("theme", theme), theme);
    let release;
    const pending = new Promise(resolve => { release = resolve; });
    for (const pattern of ["**/data/**", "**/raw.githubusercontent.com/**/dashboard.json"])
      await loading.route(pattern, async route => { await pending; await route.abort(); });
    await loading.goto(`${base}/github`);
    await loading.getByText("Loading GitHub activity…", { exact: true }).waitFor();
    await check(loading, `${theme}/loading`);
    release();
    await loading.getByText("Unable to load GitHub data. Retry loading it or view my GitHub profile.", { exact: true }).waitFor();
    await check(loading, `${theme}/data-error`);
    await loading.close();

    const recovery = await browser.newPage({ reducedMotion: "reduce" });
    await recovery.addInitScript(theme => localStorage.setItem("theme", theme), theme);
    await recovery.route("**/assets/ContactComponent-*.js", route => route.abort());
    await recovery.goto(`${base}/home`);
    await recovery.locator("main h1").waitFor();
    await recovery.locator(".hero-actions a[href='/contact']").click();
    await recovery.getByRole("heading", { name: "Unable to display this page" }).waitFor();
    await recovery.setViewportSize({ width: 320, height: 900 });
    await recovery.evaluate(() => { document.documentElement.style.fontSize = "200%"; });
    await check(recovery, `${theme}/route-error`);
    await recovery.close();
    console.log(`Checked ${theme}: all routes, expanded text, sizing, spacing, focus, print and recovery.`);
  }
  console.log(`PASS: ${report.length} typography scenarios. Artifacts: ${output}`);
  console.log("Not verified: embedded artwork/canvas text, native Safari/macOS rendering and physical-device input zoom.");
} finally {
  await writeFile(join(output, "report.json"), JSON.stringify(report, null, 2));
  await browser.close();
}
