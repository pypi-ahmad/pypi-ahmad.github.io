import assert from "node:assert/strict";
import { chromium } from "playwright";

const browser = await chromium.launch();
const targets = [
  ["projects", ".project-card"],
  ["contact", ".contact-links-anchor"],
  ["education", ".degree-card__link"],
  ["education", ".cert-card__actions a"],
];
let checks = 0;

async function state(target) {
  return target.evaluate(node => {
    const css = getComputedStyle(node);
    const matrix = new DOMMatrixReadOnly(css.transform);
    return { scale: matrix.a, opacity: Number(css.opacity), duration: css.transitionDuration, y: matrix.f };
  });
}

try {
  for (const base of ["http://localhost:3000", "http://127.0.0.1:4173"]) {
    const scenarios = [
      ...[320, 390, 768, 1440].map(width => ({ width })),
      ...["dark", "light"].flatMap(theme => ["blue", "pink", "pink-indigo"].map(accent => ({ theme, accent }))),
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
        await target.hover();
        await page.waitForTimeout(120);
        const resting = await state(target);
        for (let repeat = 0; repeat < 2; repeat++) {
          await page.mouse.down();
          await page.waitForTimeout(120);
          const pressed = await state(target);
          const staticFeedback = scenario.print || scenario.forcedColors;
          assert.equal(pressed.scale, staticFeedback || scenario.reducedMotion ? 1 : 0.97, `${base} ${selector}: scale ${JSON.stringify(scenario)}`);
          assert.equal(pressed.opacity, staticFeedback ? 1 : 0.88, `${selector}: opacity`);
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
  console.log("Coarse-pointer checks use mouse input in a touch-enabled context; real-device touch feel remains unverified.");
} finally {
  await browser.close();
}
