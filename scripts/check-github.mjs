import assert from "node:assert/strict";
import { readFile, mkdtemp, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { chromium } from "playwright";
import axe from "axe-core";

const base = process.env.GITHUB_CHECK_BASE_URL || "http://127.0.0.1:4173";
const snapshot = await readFile(
  new URL("../public/data/github.json", import.meta.url),
  "utf8",
);
const data = JSON.parse(snapshot);
const output = await mkdtemp(join(tmpdir(), "portfolio-github-"));
const browser = await chromium.launch({ headless: true });
const results = [];
const errors = [];
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  await context.route(
    "**/raw.githubusercontent.com/**/dashboard.json",
    (route) =>
      route.fulfill({ contentType: "application/json", body: snapshot }),
  );
  const page = await context.newPage();
  page.on("pageerror", (error) => errors.push(error.message));
  const requests = [];
  page.on("request", (request) => requests.push(request.url()));
  await page.goto(`${base}/home`);
  await page.getByRole("heading", { level: 1 }).waitFor();
  assert.ok(
    !requests.some((url) =>
      /\/(Arcade|snake|pacman|breakout|galaga|bomberman|puzzle|minesweeper)-/.test(
        url,
      ),
    ),
    "Homepage does not download games",
  );
  await page.locator("#github-overview").scrollIntoViewIfNeeded();
  await page.getByRole("link", { name: /View GitHub dashboard/ }).click();
  await page
    .getByRole("heading", { name: "At a glance", exact: true })
    .waitFor();
  assert.equal(
    await page.title(),
    "GitHub Statistics & Contribution Arcade | Ahmad Mujtaba",
  );
  assert.equal(
    await page.locator('link[rel="canonical"]').getAttribute("href"),
    "https://pypi-ahmad.github.io/github",
  );
  assert.ok(
    !requests.some((url) =>
      /\/(Arcade|snake|pacman|breakout|galaga|bomberman|puzzle|minesweeper)-/.test(
        url,
      ),
    ),
    "Dashboard does not start the arcade automatically",
  );

  for (const mode of ["dark", "light"]) {
    await page.evaluate((mode) => localStorage.setItem("theme", mode), mode);
    await page.reload();
    await page
      .getByRole("heading", { name: "At a glance", exact: true })
      .waitFor();
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const size of ["100%", "200%"]) {
        await page.evaluate(
          (size) => (document.documentElement.style.fontSize = size),
          size,
        );
        assert.ok(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
          `${mode}/${width}/${size}: no page overflow`,
        );
      }
      await page.evaluate(
        () => (document.documentElement.style.fontSize = "100%"),
      );
      const contrast = await page.evaluate(() => {
        const rgb = (value) => (value.match(/[0-9.]+/g) || []).map(Number);
        const blend = (front, back) =>
          front
            .slice(0, 3)
            .map(
              (v, i) => v * (front[3] ?? 1) + back[i] * (1 - (front[3] ?? 1)),
            );
        const luminance = (c) =>
          c
            .map((v) => v / 255)
            .map((v) =>
              v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4,
            )
            .reduce((n, v, i) => n + v * [0.2126, 0.7152, 0.0722][i], 0);
        return [
          ...document.querySelectorAll(
            ".gh-repository-card a, .gh-repository-card .gh-hint, .gh-filter-grid select, .gh-filter-grid input[type=search], .gh-view-nav a[aria-current]",
          ),
        ]
          .filter((el) => el.getClientRects().length)
          .map((el) => {
            const layers = [];
            for (let p = el; p; p = p.parentElement)
              layers.unshift(getComputedStyle(p));
            if (
              layers.some(
                (css) =>
                  css.backgroundImage !== "none" || Number(css.opacity) !== 1,
              )
            )
              return { selector: el.tagName, verified: false };
            let background = [255, 255, 255];
            for (const css of layers)
              background = blend(rgb(css.backgroundColor), background);
            const css = getComputedStyle(el),
              foreground = blend(rgb(css.color), background);
            const a = luminance(foreground),
              b = luminance(background);
            const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
            const size = parseFloat(css.fontSize),
              weight = parseFloat(css.fontWeight);
            return {
              selector: el.tagName + "." + el.className,
              foreground,
              background,
              ratio,
              threshold:
                size >= 24 || (size >= 18.5 && weight >= 700) ? 3 : 4.5,
              verified: true,
            };
          });
      });
      for (const pair of contrast)
        if (pair.verified)
          assert.ok(
            pair.ratio >= pair.threshold,
            `Contrast ${JSON.stringify(pair)}`,
          );
      results.push({ contrast });
      const audit = await page.evaluate(async (source) => {
        (0, eval)(source);
        return window.axe.run(document.querySelector("main"), {
          runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
        });
      }, axe.source);
      assert.deepEqual(
        audit.violations.map((item) => ({
          id: item.id,
          nodes: item.nodes.map((node) => node.target),
        })),
        [],
        `Accessibility ${mode}/${width}`,
      );
      results.push({
        mode,
        width,
        axeViolations: audit.violations.length,
        axeIncomplete: audit.incomplete.map((item) => item.id),
      });
      if (width === 390 || width === 1440)
        await page.screenshot({
          path: join(output, `dashboard-${mode}-${width}.png`),
          fullPage: true,
        });
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.getByRole("link", { name: "Activity", exact: true }).click();
  const year = data.years[0];
  await page.getByLabel("Contribution year").selectOption(String(year.year));
  const firstDay = year.days[0];
  await page
    .getByRole("button", {
      name: `${firstDay.date}: ${firstDay.count.toLocaleString("en-US")} ${firstDay.count === 1 ? "contribution" : "contributions"}`,
      exact: true,
    })
    .click();
  await page.getByRole("button", { name: "3D view", exact: true }).click();
  assert.ok(
    await page
      .getByRole("img", {
        name: new RegExp(`Isometric contribution history for ${year.year}`),
      })
      .isVisible(),
  );
  assert.ok(
    (await page.locator(".gh-day-detail").innerText()).includes(firstDay.date),
  );
  await page
    .getByLabel("Contribution year")
    .selectOption(String(data.years.at(-1).year));
  await page.getByRole("link", { name: "Arcade", exact: true }).click();
  const arcade = page.locator(".gh-arcade");
  for (const name of [
    "Snake",
    "Pac-Man",
    "Breakout",
    "Galaga",
    "Bomberman",
    "Puzzle Bobble",
    "Minesweeper",
  ]) {
    await arcade.getByRole("button", { name, exact: true }).click();
    await arcade.getByText("Ready", { exact: true }).waitFor();
    await arcade.getByRole("button", { name: "Play", exact: true }).click();
    await arcade.getByText("Playing", { exact: true }).waitFor();
    if (name === "Minesweeper") {
      const cell = arcade.locator('[data-cell="0"]');
      await cell.focus();
      await page.keyboard.press("f");
      assert.ok((await cell.getAttribute("aria-label")).includes("Flagged"));
      await page.keyboard.press("f");
      await page.keyboard.press("Enter");
      assert.ok(
        (await cell.getAttribute("aria-label")).includes("adjacent mines"),
      );
    } else {
      await page.keyboard.down("ArrowRight");
      if (["Galaga", "Bomberman", "Puzzle Bobble"].includes(name))
        await page.keyboard.down("Space");
      await page.waitForTimeout(240);
      await page.keyboard.up("ArrowRight");
      await page.keyboard.up("Space");
    }
    await page.keyboard.press("Escape");
    await arcade
      .getByText("Paused — resume when ready", { exact: true })
      .waitFor();
    await arcade.getByRole("button", { name: "Resume", exact: true }).click();
    await arcade.getByRole("button", { name: "Pause", exact: true }).click();
    await arcade.getByRole("button", { name: "Restart", exact: true }).click();
    await arcade.getByRole("button", { name: "Pause", exact: true }).click();
    results.push({ game: name, keyboard: "passed", lifecycle: "passed" });
  }
  await page.screenshot({ path: join(output, "arcade.png"), fullPage: false });
  await arcade.getByRole("button", { name: "Snake", exact: true }).click();
  await arcade.getByText("Ready", { exact: true }).waitFor();
  await arcade.getByRole("button", { name: "Play", exact: true }).click();
  await arcade
    .getByText("Game over — restart to try again", { exact: true })
    .waitFor();
  await page.getByText("Unlocked — Finish a game", { exact: true }).waitFor();
  const savedRuns = await page.evaluate(
    () => JSON.parse(localStorage.getItem("github-arcade-progress:v1")).runs,
  );
  assert.ok(
    savedRuns.length >= 1 && savedRuns[0].game === "snake",
    "A real completed engine run reaches persistent history",
  );
  // Touch uses the same real engine and controls, in an emulated touch browser.
  const touchContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
    reducedMotion: "reduce",
  });
  await touchContext.route(
    "**/raw.githubusercontent.com/**/dashboard.json",
    (route) =>
      route.fulfill({ contentType: "application/json", body: snapshot }),
  );
  const touch = await touchContext.newPage();
  touch.on("pageerror", (error) => errors.push(error.message));
  await touch.goto(`${base}/github?tab=arcade`);
  for (const name of [
    "Snake",
    "Pac-Man",
    "Breakout",
    "Galaga",
    "Bomberman",
    "Puzzle Bobble",
    "Minesweeper",
  ]) {
    const root = touch.locator(".gh-arcade");
    await root.getByRole("button", { name, exact: true }).tap();
    await root.getByText("Ready", { exact: true }).waitFor();
    await root.getByRole("button", { name: "Play", exact: true }).tap();
    if (name === "Minesweeper") {
      await root.getByRole("button", { name: "Flag", exact: true }).tap();
      await root.locator('[data-cell="0"]').tap();
      assert.ok(
        (
          await root.locator('[data-cell="0"]').getAttribute("aria-label")
        ).includes("Flagged"),
      );
    } else {
      await root.getByRole("button", { name: "Move right", exact: true }).tap();
    }
    await root.getByRole("button", { name: "Pause", exact: true }).tap();
    results.push({ game: name, touch: "passed" });
  }
  await touchContext.close();
  const offlineContext = await browser.newContext();
  await offlineContext.route(
    "**/raw.githubusercontent.com/**/dashboard.json",
    (route) => route.abort(),
  );
  const offline = await offlineContext.newPage();
  await offline.goto(`${base}/github`);
  await offline.getByText(/Saved snapshot/).waitFor();
  assert.ok(
    await offline
      .getByRole("heading", { name: "At a glance", exact: true })
      .isVisible(),
  );
  results.push({ savedSnapshotRecovery: "passed" });
  await offlineContext.close();

  // Exercise the five focused views and their URL-backed controls.
  for (const mode of ["dark", "light"]) {
    await page.evaluate((mode) => localStorage.setItem("theme", mode), mode);
    for (const [tab, heading] of [
      ["overview", "At a glance"],
      ["projects", "Project explorer"],
      ["activity", "Year in review"],
      ["impact", "Open-source impact"],
      ["arcade", "Contribution arcade"],
    ]) {
      await page.goto(`${base}/github?tab=${tab}`);
      await page.getByRole("heading", { name: heading, exact: true }).waitFor();
      if (tab === "arcade")
        await page.getByText("Ready", { exact: true }).waitFor();
      await page.evaluate(() => document.fonts.ready);
      for (const width of [320, 390, 768, 1440]) {
        await page.setViewportSize({ width, height: 1000 });
        for (const dir of ["ltr", "rtl"])
          for (const size of ["100%", "200%"]) {
            await page.evaluate(
              ({ dir, size }) => {
                document.documentElement.dir = dir;
                document.documentElement.style.fontSize = size;
              },
              { dir, size },
            );
            assert.ok(
              await page.evaluate(
                () => document.documentElement.scrollWidth <= innerWidth,
              ),
              `${tab}/${mode}/${width}/${dir}/${size}`,
            );
          }
        await page.evaluate(() => {
          document.documentElement.dir = "ltr";
          document.documentElement.style.fontSize = "100%";
        });
      }
      const contrast = await page.evaluate(() => {
        const rgb = (value) => (value.match(/[0-9.]+/g) || []).map(Number);
        const blend = (front, back) =>
          front
            .slice(0, 3)
            .map(
              (v, i) => v * (front[3] ?? 1) + back[i] * (1 - (front[3] ?? 1)),
            );
        const luminance = (c) =>
          c
            .map((v) => v / 255)
            .map((v) =>
              v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4,
            )
            .reduce((n, v, i) => n + v * [0.2126, 0.7152, 0.0722][i], 0);
        return [
          ...document.querySelectorAll(
            ".gh-repository-card a, .gh-repository-card .gh-hint, .gh-filter-grid select, .gh-filter-grid input[type=search], .gh-view-nav a[aria-current]",
          ),
        ]
          .filter((el) => el.getClientRects().length)
          .map((el) => {
            const layers = [];
            for (let p = el; p; p = p.parentElement)
              layers.unshift(getComputedStyle(p));
            if (
              layers.some(
                (css) =>
                  css.backgroundImage !== "none" || Number(css.opacity) !== 1,
              )
            )
              return { selector: el.tagName, verified: false };
            let background = [255, 255, 255];
            for (const css of layers)
              background = blend(rgb(css.backgroundColor), background);
            const css = getComputedStyle(el),
              foreground = blend(rgb(css.color), background);
            const a = luminance(foreground),
              b = luminance(background);
            const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
            const size = parseFloat(css.fontSize),
              weight = parseFloat(css.fontWeight);
            return {
              selector: el.tagName + "." + el.className,
              foreground,
              background,
              ratio,
              threshold:
                size >= 24 || (size >= 18.5 && weight >= 700) ? 3 : 4.5,
              verified: true,
            };
          });
      });
      for (const pair of contrast)
        if (pair.verified)
          assert.ok(
            pair.ratio >= pair.threshold,
            `Contrast ${JSON.stringify(pair)}`,
          );
      results.push({ contrast });
      const audit = await page.evaluate(async (source) => {
        (0, eval)(source);
        return window.axe.run(document.querySelector("main"), {
          runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
        });
      }, axe.source);
      assert.deepEqual(
        audit.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => n.target),
        })),
        [],
        `Focused view accessibility: ${tab}/${mode}`,
      );
      results.push({
        tab,
        mode,
        layouts: 16,
        axeViolations: 0,
        axeIncomplete: audit.incomplete.map((v) => v.id),
      });
      await page.screenshot({
        path: join(output, `view-${tab}-${mode}.png`),
        fullPage: true,
      });
      await page.setViewportSize({ width: 390, height: 1000 });
      await page.screenshot({
        path: join(output, `view-${tab}-${mode}-mobile.png`),
        fullPage: true,
      });
    }
  }
  await page.goto(`${base}/github?tab=projects`);
  const search = page.getByLabel("Search repositories");
  await search.fill("grounded-docparse");
  assert.equal(await page.locator(".gh-repository-card").count(), 1);
  await page.reload();
  assert.equal(
    await page.getByLabel("Search repositories").inputValue(),
    "grounded-docparse",
  );
  await page.getByRole("link", { name: "Impact", exact: true }).click();
  await page.goBack();
  assert.equal(
    await page.getByLabel("Search repositories").inputValue(),
    "grounded-docparse",
  );
  await search.fill("nothing-matches-this-query");
  await page.getByText(/No repositories match/).waitFor();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await page.getByRole("button", { name: "Next page" }).click();
  await page.getByText(/Page 2 of/).waitFor();
  await page.getByRole("button", { name: "Copy view link" }).click();
  await page.getByText(/View link copied|Copy the view link below/).waitFor();
  await page.goto(`${base}/github?tab=arcade&mode=daily&challenge=2026-09-14`);
  await page
    .getByRole("heading", { name: "Daily challenge · 2026-09-14 UTC" })
    .waitFor();
  await page.getByText("Ready", { exact: true }).waitFor();
  assert.equal(await page.locator(".gh-game-picker button").count(), 1);
  await page
    .locator(".gh-arcade")
    .getByRole("button", { name: "Play", exact: true })
    .click();
  await page.keyboard.press("Escape");
  await page.getByText("Paused — resume when ready", { exact: true }).waitFor();
  await page
    .getByRole("button", { name: "Clear arcade progress", exact: true })
    .click();
  await page.getByRole("button", { name: "Cancel", exact: true }).click();
  await page
    .getByRole("button", { name: "Clear arcade progress", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Clear all arcade progress", exact: true })
    .click();
  await page.getByText("Arcade progress cleared on this browser.").waitFor();
  results.push({
    focusedViews: "passed",
    urlRestoration: "passed",
    dailyChallenge: "passed",
    clearProgress: "passed",
  });
  if (process.argv.includes("--repository-break")) {
    await page.goto("http://127.0.0.1:3000/dev/repository-card-break.html");
    await page
      .getByRole("heading", { name: "Repository card scenarios", exact: true })
      .waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({
      path: join(output, "repository-break.png"),
      fullPage: true,
    });
  }

  assert.deepEqual(errors, [], "No runtime exceptions");
  // The optional break report is one load in this already-running browser.
  if (process.argv.includes("--break-report")) {
    await page.goto(
      "http://127.0.0.1:3000/dev/contribution-calendar-break.html",
    );
    await page
      .getByRole("heading", {
        name: "Contribution calendar scenarios",
        exact: true,
      })
      .waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page.locator(".gh-day").first().waitFor({ state: "visible" });
    assert.ok(
      await page.locator("main").evaluate((node) => node.scrollHeight > 1000),
      "Stress fixtures rendered",
    );
    await page.screenshot({
      path: join(output, "calendar-break.png"),
      fullPage: true,
    });
  }
  await writeFile(
    join(output, "report.json"),
    JSON.stringify(results, null, 2),
  );
  console.log(
    `PASS: GitHub dashboard, calendar, all seven games, keyboard/touch, saved-data recovery. Reports: ${output}`,
  );
} finally {
  await browser.close();
}
