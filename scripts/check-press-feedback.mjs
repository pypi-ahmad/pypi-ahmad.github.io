import assert from "node:assert/strict";
import { chromium } from "playwright";
import { resolveTheme } from "../src/theme.js";

const browser = await chromium.launch();
const targets = [
  ["projects", ".project-card"],
  ["contact", ".contact-links-anchor"],
  ["education", ".degree-card__link"],
  ["education", ".cert-card__actions a"],
];
let checks = 0;
let primaryChecks = 0;
let minimumContrast = Infinity;

async function assertFilledState(target, label) {
  // Sample rendered backgrounds because token-only contrast checks omit gradients and ancestor compositing.
  const evidence = await target.evaluate(node => {
    const css = getComputedStyle(node);
    const rect = node.getBoundingClientRect();
    const range = document.createRange();
    range.selectNodeContents(node);
    const textRects = [...range.getClientRects()].map(r => ({ x: r.x - rect.x, y: r.y - rect.y, width: r.width, height: r.height }));
    const ancestors = [];
    for (let parent = node; parent; parent = parent.parentElement) {
      const style = getComputedStyle(parent);
      ancestors.push({ opacity: Number(style.opacity), filter: style.filter });
    }
    return { color: css.color, textRects, ancestors };
  });
  assert.ok(evidence.ancestors.every(style => style.opacity === 1 && style.filter === "none"), `${label}: opaque/unfiltered composition`);
  // Hide glyphs only in the test capture, preserving the actual gradient and composited surface.
  const originalStyle = await target.getAttribute("style");
  let capture;
  try {
    await target.evaluate(node => node.style.setProperty("-webkit-text-fill-color", "transparent", "important"));
    capture = await target.screenshot({ animations: "allow" });
  } finally {
    await target.evaluate((node, style) => style === null ? node.removeAttribute("style") : node.setAttribute("style", style), originalStyle);
  }
  const contrast = await target.page().evaluate(async ({ image, color, textRects }) => {
    const bitmap = await createImageBitmap(await (await fetch(`data:image/png;base64,${image}`)).blob());
    const canvas = document.createElement("canvas");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(bitmap, 0, 0);
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const luminance = rgb => rgb.map(value => value / 255).map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4)
      .reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);
    const foreground = luminance(color.match(/[\d.]+/g).slice(0, 3).map(Number));
    let minimum = Infinity;
    for (const rect of textRects) {
      for (let y = Math.max(0, Math.ceil(rect.y)); y < Math.min(canvas.height, Math.floor(rect.y + rect.height)); y++) {
        for (let x = Math.max(0, Math.ceil(rect.x)); x < Math.min(canvas.width, Math.floor(rect.x + rect.width)); x++) {
          const offset = (y * canvas.width + x) * 4;
          const background = luminance([...pixels.slice(offset, offset + 3)]);
          minimum = Math.min(minimum, (Math.max(foreground, background) + 0.05) / (Math.min(foreground, background) + 0.05));
        }
      }
    }
    bitmap.close();
    return minimum;
  }, { image: capture.toString("base64"), ...evidence });
  assert.ok(Number.isFinite(contrast) && contrast >= 4.5, `${label}: rendered contrast ${contrast}`);
  minimumContrast = Math.min(minimumContrast, contrast);
}

async function inspectPrimaryActions(base) {
  const primaryTargets = [
    ["home", ".hero-actions .button:not(.button-secondary)"],
    ["home", "#selected-work .motion-action"],
    ["home", "[aria-labelledby='method-title'] .motion-action"],
    ["projects", ".projects-github-link"], ["education", ".education-projects-link"],
    ["skills", ".skills-cta-actions a:first-child"], ["contact", ".contact-action--primary"],
    ["not-a-route", ".not-found-link"],
  ];
  for (const mode of ["light", "dark"]) {
    for (const accent of ["blue", "pink", "pink-indigo"]) {
      for (const width of [390, 1440]) {
        const page = await browser.newPage({ viewport: { width, height: 900 } });
        await page.addInitScript(({ mode, accent }) => {
          localStorage.setItem("theme", mode);
          localStorage.setItem("accent", accent);
          document.addEventListener("click", event => event.preventDefault(), true);
        }, { mode, accent });
        for (const [route, selector] of primaryTargets) {
          await page.goto(`${base}/${route}`);
          const target = page.locator(selector);
          await target.scrollIntoViewIfNeeded();
          await page.evaluate(() => document.fonts.ready);
          await page.waitForTimeout(700);
          const label = `${base}/${route} ${mode}/${accent}/${width}`;
          await assertFilledState(target, `${label}: rest`);
          await target.hover();
          await page.waitForTimeout(180);
          const hovering = await state(target);
          await assertFilledState(target, `${label}: hover`);
          await page.mouse.down();
          await page.waitForFunction(node => Math.abs(new DOMMatrixReadOnly(getComputedStyle(node).transform).a - 0.96) < 0.000001, await target.elementHandle());
          assert.equal((await state(target)).scale, 0.96, `${label}: press scale`);
          await assertFilledState(target, `${label}: press`);
          await page.mouse.up();
          await page.waitForTimeout(180);
          assert.deepEqual(await state(target), hovering, `${label}: release`);
          await assertFilledState(target, `${label}: release`);
          await page.mouse.down();
          await page.waitForTimeout(30);
          await page.mouse.move(0, 0);
          await page.mouse.up();
          await page.waitForTimeout(180);
          assert.equal((await state(target)).scale, 1);
          await assertFilledState(target, `${label}: cancel`);
          await page.keyboard.press("Tab");
          await target.focus();
          assert.ok(await target.evaluate(node => node.matches(":focus-visible")));
          await assertFilledState(target, `${label}: keyboard focus`);
          await page.emulateMedia({ reducedMotion: "reduce" });
          await target.blur();
          await target.hover();
          await page.mouse.down();
          await page.waitForTimeout(120);
          assert.equal((await state(target)).scale, 1);
          assert.equal((await state(target)).opacity, 1);
          await page.mouse.up();
          await page.emulateMedia({ reducedMotion: "no-preference" });
          primaryChecks++;
        }
        await page.goto(`${base}/home`);
        await page.locator(".accent-swatch").first().waitFor({ state: "attached" });
        const theme = resolveTheme(mode, accent);
        assert.deepEqual(await page.locator("body").evaluate(node => ["--separator", "--shadow-color"].map(key => getComputedStyle(node).getPropertyValue(key).trim())), [theme.separatorColor, theme.shadowColor]);
        for (const preset of ["blue", "pink", "pink-indigo"]) {
          const matches = await page.locator(`.accent-swatch--${preset}`).evaluate((node, gradient) => {
            const expected = document.createElement("div");
            expected.style.backgroundImage = gradient;
            document.body.append(expected);
            const matches = getComputedStyle(node).backgroundImage === getComputedStyle(expected).backgroundImage;
            expected.remove();
            return matches;
          }, resolveTheme(mode, preset).accentGradient);
          assert.ok(matches, `Swatch ${mode}/${preset}`);
        }
        await page.close();
      }
      console.log(`Primary actions checked: ${base} ${mode}/${accent}.`);
    }
  }
}

async function state(target) {
  return target.evaluate(node => {
    const css = getComputedStyle(node);
    const matrix = new DOMMatrixReadOnly(css.transform);
    return { scale: matrix.a, opacity: Number(css.opacity), duration: css.transitionDuration, y: matrix.f };
  });
}

try {
  for (const base of ["http://localhost:3000", "http://127.0.0.1:4173"]) {
    if (!process.argv.includes("--cards-only")) await inspectPrimaryActions(base);
    const scenarios = [
      ...[320, 390, 768, 1440].map(width => ({ width })),
      ...["dark", "light"].flatMap(theme => ["blue", "pink", "pink-indigo"].flatMap(accent =>
        [390, 1440].map(width => ({ theme, accent, width }))
      )),
      { reducedMotion: "reduce" }, { forcedColors: "active" }, { print: true }, { coarse: true, width: 390 },
    ];
    for (const scenario of scenarios) {
      const page = await browser.newPage({
        viewport: { width: scenario.width ?? 1440, height: 900 },
        reducedMotion: scenario.reducedMotion ?? "no-preference",
        forcedColors: scenario.forcedColors ?? "none",
        hasTouch: scenario.coarse ?? false,
      });
      await page.addInitScript(({ theme, accent }) => {
        localStorage.setItem("theme", theme ?? "dark");
        localStorage.setItem("accent", accent ?? "blue");
        // Exercise press/release without opening external URLs or mail clients.
        document.addEventListener("click", event => event.preventDefault(), true);
      }, scenario);
      if (scenario.print) await page.emulateMedia({ media: "print" });
      for (const [route, selector] of targets) {
        await page.goto(`${base}/${route}`);
        const target = page.locator(selector).first();
        await target.scrollIntoViewIfNeeded();
        await page.waitForTimeout(600);
        if (selector === ".contact-links-anchor" && !scenario.forcedColors && !scenario.print) {
          await target.evaluate(node => node.style.setProperty("--focus-shadow", "#010203"));
        }
        await target.hover();
        await page.waitForTimeout(350);
        const cardText = selector === ".project-card" ? target.locator(".project-card__desc")
          : selector === ".contact-links-anchor" ? target.locator(".contact-links-desc") : null;
        if (cardText && !scenario.forcedColors && !scenario.print) {
          await assertFilledState(cardText, `${base} ${selector}: hover description`);
          if (selector === ".contact-links-anchor") {
            assert.ok(await target.evaluate(node => {
              const probe = document.createElement("span");
              probe.style.color = "var(--accent-hover)";
              node.append(probe);
              const matches = getComputedStyle(node).backgroundColor === getComputedStyle(probe).color;
              probe.remove();
              return matches;
            }), "Contact hover uses its role token independently of the focus shadow");
          }
        }
        const resting = await state(target);
        for (let repeat = 0; repeat < 2; repeat++) {
          await page.mouse.down();
          await page.waitForTimeout(120);
          const pressed = await state(target);
          const staticFeedback = scenario.print || scenario.forcedColors;
          assert.equal(pressed.scale, staticFeedback || scenario.reducedMotion ? 1 : 0.96, `${base} ${selector}: scale ${JSON.stringify(scenario)}`);
          assert.equal(pressed.opacity, staticFeedback || cardText ? 1 : 0.88, `${selector}: opacity`);
          if (cardText && !staticFeedback) {
            await assertFilledState(cardText, `${base} ${selector}: pressed description`);
          }
          await page.mouse.up();
          await page.waitForTimeout(120);
          assert.deepEqual(await state(target), resting, `${selector}: release restores hover/rest`);
        }
        // Interrupt before completion; cancellation must restore without a replay.
        await page.mouse.down();
        await page.waitForTimeout(30);
        await page.mouse.move(0, 0);
        await page.mouse.up();
        await page.waitForTimeout(120);
        assert.equal((await state(target)).opacity, 1);
        assert.equal((await state(target)).scale, 1);
        await page.keyboard.press("Tab");
        await target.focus();
        assert.equal(await target.evaluate(node => node.matches(":focus-visible")), true);
        await page.keyboard.down("Enter");
        assert.equal((await state(target)).scale, 1);
        assert.equal((await state(target)).opacity, 1);
        assert.equal((await state(target)).duration, "0s");
        await page.keyboard.up("Enter");
        checks++;
      }
      await page.close();
    }
  }
  console.log(`PASS: ${checks} link scenarios in dev/build; press, release, cancellation, keyboard, themes, widths, reduced motion, forced colors and print.`);
  console.log(`Minimum sampled label/description contrast: ${minimumContrast.toFixed(2)}:1.`);
  if (primaryChecks) console.log(`PASS: ${primaryChecks} primary-action scenarios. Header tokens and swatch gradients match the registry.`);
  console.log("Coarse-pointer checks use mouse input in a touch-enabled context; real-device touch feel remains unverified.");
} finally {
  await browser.close();
}
