import assert from "node:assert/strict";
import { chromium } from "playwright";

const browser = await chromium.launch();
const contactChunk = /ContactComponent[^/]*\.(?:jsx|js)(?:\?|$)/;

async function navigateToContact(page) {
  await page.getByRole("button", { name: "Toggle navigation menu" }).click();
  await page.locator(".menu a[href='/contact']").click();
}

try {
  for (const base of ["http://localhost:3000", "http://127.0.0.1:4173"]) {
    for (const cancel of [false, true]) {
      const page = await browser.newPage({ reducedMotion: "reduce" });
      // Hold the lazy route chunk so loading and Back cancellation are exercised without changing app code.
      const gate = Promise.withResolvers();
      await page.route(contactChunk, async route => { await gate.promise; await route.continue(); });
      await page.goto(`${base}/home`);
      await page.locator("main h1").waitFor();
      await navigateToContact(page);
      await page.getByRole("main", { name: "Loading page" }).waitFor();
      await page.waitForFunction(() => document.querySelector('[role="status"]')?.textContent === "Loading page…");
      assert.equal(await page.locator(".greeting-text").isVisible(), false);
      assert.equal(await page.getByRole("status").textContent(), "Loading page…");
      if (cancel) {
        await page.goBack();
        await page.locator(".greeting-text").waitFor();
        assert.equal(await page.getByRole("status").textContent(), "");
      }
      gate.resolve();
      if (cancel) {
        await page.waitForLoadState("networkidle");
        assert.ok(page.url().endsWith("/home"));
      } else {
        await page.locator(".contact-hero h1").waitFor();
        await page.waitForFunction(() => document.activeElement?.tagName === "MAIN");
        assert.equal(await page.getByRole("status").textContent(), "");
      }
      await page.close();
    }

    const page = await browser.newPage();
    await page.route(contactChunk, route => route.abort());
    await page.goto(`${base}/home`);
    await page.locator("main h1").waitFor();
    await navigateToContact(page);
    const heading = page.getByRole("heading", { name: "Something went wrong" });
    await heading.waitFor();
    assert.ok(await heading.evaluate(node => node === document.activeElement));
    assert.equal(await page.getByRole("main", { name: "Something went wrong" }).count(), 1);
    const refresh = page.getByRole("button", { name: "Refresh" });
    const cdp = await page.context().newCDPSession(page);
    for (const scenario of ["normal", "reduced", "forced", "contrast", "transparency"]) {
      await cdp.send("Emulation.setEmulatedMedia", { features: [
        { name: "prefers-reduced-motion", value: ["reduced", "contrast", "transparency"].includes(scenario) ? "reduce" : "no-preference" },
        { name: "forced-colors", value: scenario === "forced" ? "active" : "none" },
        { name: "prefers-contrast", value: scenario === "contrast" ? "more" : "no-preference" },
        { name: "prefers-reduced-transparency", value: scenario === "transparency" ? "reduce" : "no-preference" },
      ] });
      await refresh.hover();
      await page.mouse.down();
      await page.waitForTimeout(180);
      const pressed = await refresh.evaluate(node => ({ scale: new DOMMatrixReadOnly(getComputedStyle(node).transform).a, opacity: Number(getComputedStyle(node).opacity) }));
      assert.equal(pressed.scale, scenario === "normal" ? 0.96 : 1, `${base} ${scenario}: press scale`);
      assert.equal(pressed.opacity, scenario === "reduced" ? 0.88 : 1);
      await page.mouse.move(0, 0);
      await page.mouse.up();
      await page.waitForTimeout(180);
      assert.ok(await refresh.evaluate(node => getComputedStyle(node).transform === "none" && getComputedStyle(node).opacity === "1"));
    }
    await page.emulateMedia({ reducedMotion: "no-preference", forcedColors: "none" });
    await cdp.send("Emulation.setEmulatedMedia", { features: [] });
    await cdp.send("Animation.enable");
    await cdp.send("Animation.setPlaybackRate", { playbackRate: 0.1 });
    await refresh.hover();
    await page.mouse.down();
    await page.waitForTimeout(100);
    const slowScale = await refresh.evaluate(node => new DOMMatrixReadOnly(getComputedStyle(node).transform).a);
    assert.ok(slowScale > 0.96 && slowScale < 1, "Slowed press interpolates rather than jumping");
    await page.mouse.move(0, 0);
    await page.mouse.up();
    await cdp.send("Animation.setPlaybackRate", { playbackRate: 1 });
    await page.waitForFunction(node => getComputedStyle(node).transform === "none", await refresh.elementHandle());
    await page.keyboard.press("Tab");
    await refresh.focus();
    assert.ok(await refresh.evaluate(node => node.matches(":focus-visible") && getComputedStyle(node).transitionDuration === "0s"));
    await page.unroute(contactChunk);
    await Promise.all([page.waitForNavigation(), page.keyboard.press("Enter")]);
    await page.locator(".contact-hero h1").waitFor();
    await page.close();
    console.log(`PASS: ${base}: loading completion/cancellation, error orientation, Refresh feedback and real reload recovery.`);
  }
} finally {
  await browser.close();
}
