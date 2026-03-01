/**
 * Phase 7 — Frontend Stress Test Script
 *
 * Uses Playwright + Chrome DevTools Protocol to:
 *  1. Measure baseline Core Web Vitals (LCP, CLS, FID/INP)
 *  2. Simulate Slow 3G network conditions
 *  3. Stress-test rapid navigation across all routes
 *  4. Detect layout shifts, jank, broken UI, and freezing
 *  5. Analyze large resource loads and re-render overhead
 *
 * Run: node stress-test.mjs
 * Requires: vite preview running on http://localhost:4173
 */
import { chromium } from "playwright";

const BASE = "http://localhost:4173";
const ROUTES = ["/", "/home", "/experience", "/education", "/contact", "/projects", "/skills"];

// ── Slow 3G Network Profile ──
const SLOW_3G = {
  offline: false,
  downloadThroughput: (500 * 1024) / 8,   // 500 Kbps
  uploadThroughput: (500 * 1024) / 8,
  latency: 400,                            // 400ms RTT
};

// ── Fast 3G Network Profile ──
const FAST_3G = {
  offline: false,
  downloadThroughput: (1.6 * 1024 * 1024) / 8,  // 1.6 Mbps
  uploadThroughput: (750 * 1024) / 8,
  latency: 150,
};

const results = {
  baseline: {},
  slow3g: {},
  fast3g: {},
  rapidNavigation: {},
  layoutShifts: {},
  brokenUI: {},
  reRenders: {},
  resourceAnalysis: {},
};

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ═══════════════════════════════════════════════════════════
// 1. BASELINE PERFORMANCE (No Throttling)
// ═══════════════════════════════════════════════════════════
async function measureBaseline(page) {
  console.log("\n═══ 1. BASELINE PERFORMANCE (No Throttling) ═══");

  await page.goto(BASE, { waitUntil: "networkidle" });
  await sleep(2000); // Let animations settle

  const metrics = await page.evaluate(() => {
    const nav = performance.getEntriesByType("navigation")[0];
    const resources = performance.getEntriesByType("resource");
    const paint = performance.getEntriesByType("paint");

    const totalTransfer = resources.reduce((s, r) => s + (r.transferSize || 0), 0);

    // Get LCP from PerformanceObserver entries
    const lcpEntries = performance.getEntriesByType("largest-contentful-paint");

    return {
      timing: {
        ttfb: Math.round(nav.responseStart - nav.requestStart),
        fcp: paint.find(p => p.name === "first-contentful-paint")?.startTime?.toFixed(1) || "N/A",
        domContentLoaded: Math.round(nav.domContentLoadedEventEnd - nav.startTime),
        domComplete: Math.round(nav.domComplete - nav.startTime),
        loadComplete: Math.round(nav.loadEventEnd - nav.startTime),
        domInteractive: Math.round(nav.domInteractive - nav.startTime),
      },
      htmlSize: {
        transferKB: Math.round(nav.transferSize / 1024),
        decodedKB: Math.round(nav.decodedBodySize / 1024),
      },
      resources: {
        total: resources.length,
        totalTransferKB: Math.round(totalTransfer / 1024),
        scripts: resources.filter(r => r.initiatorType === "script").length,
        stylesheets: resources.filter(r => r.name.endsWith(".css")).length,
        fonts: resources.filter(r => r.name.match(/\.(woff2?|ttf|eot|otf)$/)).length,
        images: resources.filter(r => r.name.match(/\.(png|jpg|jpeg|gif|svg|webp|ico)$/i)).length,
      },
      top10Resources: resources
        .sort((a, b) => (b.transferSize || 0) - (a.transferSize || 0))
        .slice(0, 10)
        .map(r => ({
          name: r.name.split("/").pop().substring(0, 40),
          type: r.initiatorType,
          transferKB: Math.round((r.transferSize || 0) / 1024),
          durationMs: Math.round(r.duration),
        })),
      domNodeCount: document.querySelectorAll("*").length,
    };
  });

  results.baseline = metrics;
  console.log("  TTFB:", metrics.timing.ttfb, "ms");
  console.log("  FCP:", metrics.timing.fcp, "ms");
  console.log("  DOM Content Loaded:", metrics.timing.domContentLoaded, "ms");
  console.log("  Load Complete:", metrics.timing.loadComplete, "ms");
  console.log("  DOM Nodes:", metrics.domNodeCount);
  console.log("  Resources:", metrics.resources.total, `(${metrics.resources.totalTransferKB} KB)`);
  console.log("  Fonts loaded:", metrics.resources.fonts);
  console.log("  Top 5 largest resources:");
  metrics.top10Resources.slice(0, 5).forEach(r => {
    console.log(`    ${r.transferKB} KB | ${r.durationMs}ms | ${r.name}`);
  });
}

// ═══════════════════════════════════════════════════════════
// 2. CORE WEB VITALS (LCP, CLS, long tasks for FID proxy)
// ═══════════════════════════════════════════════════════════
async function measureCoreWebVitals(page) {
  console.log("\n═══ 2. CORE WEB VITALS ═══");

  // Use addInitScript so observers are installed before page JS runs
  await page.addInitScript(() => {
    window.__cwv = { lcp: 0, cls: 0, clsEntries: [], longTasks: [], lcpElement: "unknown", lcpSize: 0 };

    try {
      new PerformanceObserver(list => {
        const entries = list.getEntries();
        if (entries.length) {
          window.__cwv.lcp = entries[entries.length - 1].startTime;
          window.__cwv.lcpElement = entries[entries.length - 1].element?.tagName || "unknown";
          window.__cwv.lcpSize = entries[entries.length - 1].size || 0;
        }
      }).observe({ type: "largest-contentful-paint", buffered: true });
    } catch(e) {}

    try {
      new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            window.__cwv.cls += entry.value;
            window.__cwv.clsEntries.push({
              value: entry.value.toFixed(4),
              sources: entry.sources?.map(s => s.node?.tagName || "unknown") || [],
            });
          }
        }
      }).observe({ type: "layout-shift", buffered: true });
    } catch(e) {}

    try {
      new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          window.__cwv.longTasks.push({
            duration: Math.round(entry.duration),
            startTime: Math.round(entry.startTime),
          });
        }
      }).observe({ type: "longtask", buffered: true });
    } catch(e) {}
  });

  // Navigate to home
  await page.goto(BASE, { waitUntil: "networkidle" });
  await sleep(3000); // Let animations and layout settle

  const cwv = await page.evaluate(() => {
    const data = window.__cwv || { lcp: 0, cls: 0, clsEntries: [], longTasks: [], lcpElement: "unknown", lcpSize: 0 };
    return {
      lcp: Math.round(data.lcp),
      lcpElement: data.lcpElement,
      lcpSize: data.lcpSize,
      cls: parseFloat(data.cls.toFixed(4)),
      clsEntries: data.clsEntries.slice(0, 10),
      longTaskCount: data.longTasks.length,
      longTasks: data.longTasks.slice(0, 10),
      totalBlockingTime: data.longTasks.reduce((s, t) => s + Math.max(0, t.duration - 50), 0),
    };
  });

  results.coreWebVitals = cwv;
  const lcpRating = cwv.lcp <= 2500 ? "GOOD" : cwv.lcp <= 4000 ? "NEEDS IMPROVEMENT" : "POOR";
  const clsRating = cwv.cls <= 0.1 ? "GOOD" : cwv.cls <= 0.25 ? "NEEDS IMPROVEMENT" : "POOR";
  const tbtRating = cwv.totalBlockingTime <= 200 ? "GOOD" : cwv.totalBlockingTime <= 600 ? "NEEDS IMPROVEMENT" : "POOR";

  console.log(`  LCP: ${cwv.lcp}ms [${lcpRating}] (element: ${cwv.lcpElement})`);
  console.log(`  CLS: ${cwv.cls} [${clsRating}]`);
  if (cwv.clsEntries.length > 0) {
    console.log(`  CLS Sources (${cwv.clsEntries.length} shifts):`);
    cwv.clsEntries.forEach(e => console.log(`    shift=${e.value} sources=[${e.sources}]`));
  }
  console.log(`  Long Tasks: ${cwv.longTaskCount}`);
  console.log(`  Total Blocking Time: ${cwv.totalBlockingTime}ms [${tbtRating}]`);
  if (cwv.longTasks.length > 0) {
    cwv.longTasks.forEach(t => console.log(`    @${t.startTime}ms duration=${t.duration}ms`));
  }
}

// ═══════════════════════════════════════════════════════════
// 3. SLOW 3G SIMULATION
// ═══════════════════════════════════════════════════════════
async function measureSlow3G(context, page) {
  console.log("\n═══ 3. SLOW 3G NETWORK SIMULATION ═══");

  const cdp = await context.newCDPSession(page);
  await cdp.send("Network.emulateNetworkConditions", SLOW_3G);

  const start = Date.now();
  await page.goto(BASE, { waitUntil: "domcontentloaded", timeout: 60000 });
  const dcl = Date.now() - start;

  await page.waitForLoadState("networkidle").catch(() => {});
  const full = Date.now() - start;

  const slow3gMetrics = await page.evaluate(() => {
    const resources = performance.getEntriesByType("resource");
    const slowResources = resources
      .filter(r => r.duration > 1000)
      .sort((a, b) => b.duration - a.duration)
      .slice(0, 10)
      .map(r => ({
        name: r.name.split("/").pop().substring(0, 40),
        durationMs: Math.round(r.duration),
        transferKB: Math.round((r.transferSize || 0) / 1024),
      }));

    return {
      domNodes: document.querySelectorAll("*").length,
      slowResources,
      totalResources: resources.length,
    };
  });

  results.slow3g = {
    domContentLoaded: dcl,
    fullLoad: full,
    ...slow3gMetrics,
  };

  console.log(`  DOM Content Loaded: ${dcl}ms`);
  console.log(`  Full Load: ${full}ms`);
  console.log(`  Slow resources (>1s):`);
  slow3gMetrics.slowResources.forEach(r => {
    console.log(`    ${r.durationMs}ms | ${r.transferKB}KB | ${r.name}`);
  });

  // Reset network
  await cdp.send("Network.emulateNetworkConditions", {
    offline: false, downloadThroughput: -1, uploadThroughput: -1, latency: 0,
  });
  await cdp.detach();
}

// ═══════════════════════════════════════════════════════════
// 4. FAST 3G SIMULATION
// ═══════════════════════════════════════════════════════════
async function measureFast3G(context, page) {
  console.log("\n═══ 4. FAST 3G NETWORK SIMULATION ═══");

  const cdp = await context.newCDPSession(page);
  await cdp.send("Network.emulateNetworkConditions", FAST_3G);

  const start = Date.now();
  await page.goto(BASE, { waitUntil: "domcontentloaded", timeout: 60000 });
  const dcl = Date.now() - start;

  await page.waitForLoadState("networkidle").catch(() => {});
  const full = Date.now() - start;

  results.fast3g = { domContentLoaded: dcl, fullLoad: full };
  console.log(`  DOM Content Loaded: ${dcl}ms`);
  console.log(`  Full Load: ${full}ms`);

  await cdp.send("Network.emulateNetworkConditions", {
    offline: false, downloadThroughput: -1, uploadThroughput: -1, latency: 0,
  });
  await cdp.detach();
}

// ═══════════════════════════════════════════════════════════
// 5. RAPID NAVIGATION STRESS TEST
// ═══════════════════════════════════════════════════════════
async function rapidNavigationStress(page) {
  console.log("\n═══ 5. RAPID NAVIGATION STRESS TEST ═══");

  await page.goto(BASE, { waitUntil: "networkidle" });
  await sleep(1000);

  const navTimings = [];
  const errors = [];

  // Setup error collector
  page.on("pageerror", err => errors.push(err.message));
  page.on("console", msg => {
    if (msg.type() === "error") errors.push(msg.text());
  });

  // Rapid route switching — click links fast without waiting
  for (let round = 0; round < 3; round++) {
    for (const route of ROUTES.slice(1)) {  // skip "/"
      const start = Date.now();
      try {
        await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded", timeout: 10000 });
        const elapsed = Date.now() - start;
        navTimings.push({ route, elapsed, round });
      } catch (err) {
        navTimings.push({ route, elapsed: Date.now() - start, round, error: err.message });
      }
    }
  }

  // Analyze
  const avgByRoute = {};
  for (const t of navTimings) {
    if (!avgByRoute[t.route]) avgByRoute[t.route] = [];
    avgByRoute[t.route].push(t.elapsed);
  }
  const summary = Object.entries(avgByRoute).map(([route, times]) => ({
    route,
    avg: Math.round(times.reduce((a, b) => a + b, 0) / times.length),
    min: Math.min(...times),
    max: Math.max(...times),
    p95: times.sort((a, b) => a - b)[Math.floor(times.length * 0.95)] || times[times.length - 1],
  }));

  results.rapidNavigation = {
    totalNavigations: navTimings.length,
    rounds: 3,
    errors: errors.slice(0, 20),
    errorCount: errors.length,
    routeSummary: summary,
    failedNavigations: navTimings.filter(t => t.error).length,
  };

  console.log(`  Total navigations: ${navTimings.length} (3 rounds × ${ROUTES.length - 1} routes)`);
  console.log(`  Errors during navigation: ${errors.length}`);
  console.log(`  Failed navigations: ${navTimings.filter(t => t.error).length}`);
  console.log("  Route timing summary:");
  summary.forEach(s => {
    console.log(`    ${s.route.padEnd(14)} avg=${s.avg}ms  min=${s.min}ms  max=${s.max}ms  p95=${s.p95}ms`);
  });
}

// ═══════════════════════════════════════════════════════════
// 6. LAYOUT SHIFT DETECTION PER PAGE
// ═══════════════════════════════════════════════════════════
async function layoutShiftPerPage(page) {
  console.log("\n═══ 6. LAYOUT SHIFT (CLS) PER PAGE ═══");

  results.layoutShifts = {};

  for (const route of ROUTES.slice(1)) {
    // Navigate to the route
    await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });
    
    // Install CLS observer after page loads (measures subsequent shifts from animations/scroll)
    await page.evaluate(() => {
      window.__cls = 0;
      window.__shifts = [];
      try {
        new PerformanceObserver(list => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              window.__cls += entry.value;
              window.__shifts.push({
                value: entry.value,
                sources: entry.sources?.map(s => ({
                  tag: s.node?.tagName || "?",
                  id: s.node?.id || "",
                  cls: s.node?.className?.toString()?.substring(0, 30) || "",
                })) || [],
              });
            }
          }
        }).observe({ type: "layout-shift", buffered: true });
      } catch(e) {}
    });
    await sleep(2000);

    // Scroll to bottom to trigger whileInView animations
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await sleep(1500);

    const cls = await page.evaluate(() => ({
      totalCLS: parseFloat(window.__cls.toFixed(4)),
      shiftCount: window.__shifts.length,
      topShifts: window.__shifts
        .sort((a, b) => b.value - a.value)
        .slice(0, 5)
        .map(s => ({
          value: s.value.toFixed(4),
          sources: s.sources.slice(0, 3),
        })),
    }));

    results.layoutShifts[route] = cls;
    const rating = cls.totalCLS <= 0.1 ? "GOOD" : cls.totalCLS <= 0.25 ? "WARN" : "POOR";
    console.log(`  ${route.padEnd(14)} CLS=${cls.totalCLS} [${rating}]  shifts=${cls.shiftCount}`);
    if (cls.topShifts.length > 0 && cls.totalCLS > 0.05) {
      cls.topShifts.forEach(s => {
        const src = s.sources.map(x => `${x.tag}${x.id ? "#" + x.id : ""}${x.cls ? "." + x.cls.split(" ")[0] : ""}`).join(", ");
        console.log(`    shift=${s.value} sources=[${src}]`);
      });
    }
  }
}

// ═══════════════════════════════════════════════════════════
// 7. RE-RENDER & JANK DETECTION
// ═══════════════════════════════════════════════════════════
async function reRenderAndJank(page) {
  console.log("\n═══ 7. RE-RENDER & JANK DETECTION ═══");

  await page.goto(BASE, { waitUntil: "networkidle" });
  await sleep(1000);

  // Measure frame rate over 3 seconds
  const frameData = await page.evaluate(() => {
    return new Promise(resolve => {
      const frames = [];
      let last = performance.now();
      let count = 0;
      const measure = (now) => {
        frames.push(now - last);
        last = now;
        count++;
        if (count < 180) { // ~3s at 60fps
          requestAnimationFrame(measure);
        } else {
          const sorted = frames.sort((a, b) => a - b);
          resolve({
            totalFrames: frames.length,
            avgFrameTime: Math.round(frames.reduce((a, b) => a + b, 0) / frames.length * 100) / 100,
            minFrameTime: Math.round(sorted[0] * 100) / 100,
            maxFrameTime: Math.round(sorted[sorted.length - 1] * 100) / 100,
            p99FrameTime: Math.round(sorted[Math.floor(sorted.length * 0.99)] * 100) / 100,
            droppedFrames: frames.filter(f => f > 33.33).length, // Below 30fps
            jankFrames: frames.filter(f => f > 50).length, // Below 20fps
            severeJank: frames.filter(f => f > 100).length, // Below 10fps
            estimatedFPS: Math.round(1000 / (frames.reduce((a, b) => a + b, 0) / frames.length)),
          });
        }
      };
      requestAnimationFrame(measure);
    });
  });

  results.reRenders = {
    frameAnalysis: frameData,
  };

  console.log(`  Frames measured: ${frameData.totalFrames}`);
  console.log(`  Estimated FPS: ${frameData.estimatedFPS}`);
  console.log(`  Avg frame time: ${frameData.avgFrameTime}ms`);
  console.log(`  Max frame time: ${frameData.maxFrameTime}ms (p99: ${frameData.p99FrameTime}ms)`);
  console.log(`  Dropped frames (<30fps): ${frameData.droppedFrames}`);
  console.log(`  Jank frames (<20fps): ${frameData.jankFrames}`);
  console.log(`  Severe jank (<10fps): ${frameData.severeJank}`);

  // Theme toggle stress (rapid re-renders)
  console.log("\n  Theme Toggle Stress (10 rapid toggles):");
  const themeStress = await page.evaluate(() => {
    const btn = document.querySelector('[aria-label="Toggle Theme"]');
    if (!btn) return { error: "Toggle button not found" };
    const start = performance.now();
    for (let i = 0; i < 10; i++) btn.click();
    const elapsed = performance.now() - start;
    return {
      toggleCount: 10,
      totalMs: Math.round(elapsed),
      avgMs: Math.round(elapsed / 10 * 100) / 100,
    };
  });
  results.reRenders.themeToggleStress = themeStress;
  console.log(`    10 toggles in ${themeStress.totalMs}ms (avg ${themeStress.avgMs}ms/toggle)`);

  // Scroll stress — measure during scroll
  console.log("\n  Scroll Stress (full page scroll):");
  const scrollStress = await page.evaluate(() => {
    return new Promise(resolve => {
      const frames = [];
      let last = performance.now();
      const maxHeight = document.body.scrollHeight;
      let currentY = 0;
      const step = maxHeight / 60; // scroll in ~60 steps

      const scroll = (now) => {
        frames.push(now - last);
        last = now;
        currentY += step;
        window.scrollTo(0, currentY);
        if (currentY < maxHeight) {
          requestAnimationFrame(scroll);
        } else {
          const sorted = frames.sort((a, b) => a - b);
          resolve({
            totalFrames: frames.length,
            avgFrameTime: Math.round(frames.reduce((a, b) => a + b, 0) / frames.length * 100) / 100,
            maxFrameTime: Math.round(sorted[sorted.length - 1] * 100) / 100,
            jankFrames: frames.filter(f => f > 50).length,
            scrollHeight: maxHeight,
          });
        }
      };
      requestAnimationFrame(scroll);
    });
  });
  results.reRenders.scrollStress = scrollStress;
  console.log(`    Scrolled ${scrollStress.scrollHeight}px in ${scrollStress.totalFrames} frames`);
  console.log(`    Avg frame: ${scrollStress.avgFrameTime}ms, Max: ${scrollStress.maxFrameTime}ms`);
  console.log(`    Jank frames during scroll: ${scrollStress.jankFrames}`);
}

// ═══════════════════════════════════════════════════════════
// 8. BROKEN UI DETECTION
// ═══════════════════════════════════════════════════════════
async function brokenUIDetection(page) {
  console.log("\n═══ 8. BROKEN UI DETECTION ═══");

  const brokenUI = {};

  for (const route of ROUTES.slice(1)) {
    await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });
    await sleep(1000);

    const pageIssues = await page.evaluate(() => {
      const issues = [];

      // Broken images
      const imgs = document.querySelectorAll("img");
      imgs.forEach(img => {
        if (!img.complete || img.naturalWidth === 0) {
          issues.push({
            type: "broken-image",
            src: img.src?.substring(0, 80) || "no-src",
            alt: img.alt || "no-alt",
          });
        }
      });

      // Empty links
      const links = document.querySelectorAll("a");
      links.forEach(a => {
        if (!a.href || a.href === "javascript:void(0)" || a.href.endsWith("#")) {
          issues.push({ type: "empty-link", text: a.textContent?.trim()?.substring(0, 40) || "empty", href: a.href });
        }
      });

      // Overflow detection
      const body = document.body;
      if (body.scrollWidth > window.innerWidth) {
        issues.push({
          type: "horizontal-overflow",
          scrollWidth: body.scrollWidth,
          viewportWidth: window.innerWidth,
          overflow: body.scrollWidth - window.innerWidth,
        });
      }

      // Elements with 0 dimensions that should be visible
      const zeroSize = [];
      document.querySelectorAll("div, section, main, article, aside, header, footer, nav").forEach(el => {
        const rect = el.getBoundingClientRect();
        const style = window.getComputedStyle(el);
        if (rect.width === 0 && rect.height === 0 && style.display !== "none" && style.visibility !== "hidden") {
          zeroSize.push({
            tag: el.tagName,
            id: el.id || "",
            class: el.className?.toString()?.substring(0, 30) || "",
          });
        }
      });
      if (zeroSize.length > 0) issues.push({ type: "zero-size-elements", count: zeroSize.length, elements: zeroSize.slice(0, 5) });

      // Check for text overflow / truncation
      const textOverflow = [];
      document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, a, li").forEach(el => {
        if (el.scrollWidth > el.clientWidth + 2) {
          textOverflow.push({
            tag: el.tagName,
            text: el.textContent?.substring(0, 40) || "",
            scrollWidth: el.scrollWidth,
            clientWidth: el.clientWidth,
          });
        }
      });
      if (textOverflow.length > 0) issues.push({ type: "text-overflow", count: textOverflow.length, elements: textOverflow.slice(0, 5) });

      // Console error count from DOM
      return {
        issues,
        totalDOMNodes: document.querySelectorAll("*").length,
        visibleText: document.body.innerText?.length || 0,
      };
    });

    brokenUI[route] = pageIssues;
    const issueCount = pageIssues.issues.length;
    console.log(`  ${route.padEnd(14)} DOM=${pageIssues.totalDOMNodes}  issues=${issueCount}`);
    pageIssues.issues.forEach(i => {
      console.log(`    [${i.type}] ${JSON.stringify(i).substring(0, 100)}`);
    });
  }

  results.brokenUI = brokenUI;
}

// ═══════════════════════════════════════════════════════════
// 9. LARGE IMAGE / RESOURCE ANALYSIS
// ═══════════════════════════════════════════════════════════
async function resourceAnalysis(page) {
  console.log("\n═══ 9. RESOURCE & IMAGE ANALYSIS ═══");

  await page.goto(BASE, { waitUntil: "networkidle" });

  const analysis = await page.evaluate(() => {
    const resources = performance.getEntriesByType("resource");

    // Font analysis
    const fonts = resources.filter(r => r.name.match(/\.(woff2?|ttf|eot|otf)$/));
    const totalFontKB = Math.round(fonts.reduce((s, f) => s + (f.transferSize || 0), 0) / 1024);

    // Script analysis
    const scripts = resources.filter(r => r.initiatorType === "script" || r.name.endsWith(".js"));
    const totalScriptKB = Math.round(scripts.reduce((s, f) => s + (f.transferSize || 0), 0) / 1024);

    // CSS analysis
    const css = resources.filter(r => r.name.endsWith(".css"));
    const totalCssKB = Math.round(css.reduce((s, f) => s + (f.transferSize || 0), 0) / 1024);

    // SVG analysis (inline)
    const inlineSVGs = document.querySelectorAll("svg");
    const svgData = Array.from(inlineSVGs).map(svg => ({
      width: svg.getAttribute("width") || svg.getBoundingClientRect().width || "auto",
      height: svg.getAttribute("height") || svg.getBoundingClientRect().height || "auto",
      elements: svg.querySelectorAll("*").length,
    }));
    const totalSVGElements = svgData.reduce((s, d) => s + d.elements, 0);

    // Image analysis
    const imgs = document.querySelectorAll("img");
    const imgData = Array.from(imgs).map(img => ({
      src: img.src?.split("/").pop()?.substring(0, 40) || "inline",
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      displayWidth: img.width,
      displayHeight: img.height,
      hasAlt: !!img.alt,
      loading: img.loading || "eager",
    }));

    return {
      fonts: { count: fonts.length, totalKB: totalFontKB, details: fonts.map(f => ({ name: f.name.split("/").pop(), kb: Math.round((f.transferSize || 0) / 1024), duration: Math.round(f.duration) })) },
      scripts: { count: scripts.length, totalKB: totalScriptKB },
      css: { count: css.length, totalKB: totalCssKB },
      inlineSVGs: { count: inlineSVGs.length, totalChildElements: totalSVGElements, largest: svgData.sort((a, b) => b.elements - a.elements).slice(0, 5) },
      images: { count: imgs.length, details: imgData },
      totalResourceKB: Math.round(resources.reduce((s, r) => s + (r.transferSize || 0), 0) / 1024),
    };
  });

  results.resourceAnalysis = analysis;
  console.log(`  Total resources: ${analysis.totalResourceKB} KB`);
  console.log(`  JS bundles: ${analysis.scripts.count} files, ${analysis.scripts.totalKB} KB`);
  console.log(`  CSS: ${analysis.css.count} files, ${analysis.css.totalKB} KB`);
  console.log(`  Fonts: ${analysis.fonts.count} files, ${analysis.fonts.totalKB} KB`);
  if (analysis.fonts.details.length > 0) {
    console.log("  Font details:");
    analysis.fonts.details.forEach(f => console.log(`    ${f.kb}KB | ${f.duration}ms | ${f.name}`));
  }
  console.log(`  Inline SVGs: ${analysis.inlineSVGs.count} (${analysis.inlineSVGs.totalChildElements} child elements)`);
  console.log(`  Images: ${analysis.images.count}`);
  analysis.images.details.forEach(img => {
    const oversized = img.naturalWidth > 0 && img.displayWidth > 0 && img.naturalWidth > img.displayWidth * 2 ? " [OVERSIZED]" : "";
    const noLazy = img.loading === "eager" ? " [NO-LAZY]" : "";
    console.log(`    ${img.src || "inline"} ${img.naturalWidth}x${img.naturalHeight} → ${img.displayWidth}x${img.displayHeight}${oversized}${noLazy} alt=${img.hasAlt}`);
  });
}

// ═══════════════════════════════════════════════════════════
// 10. MOBILE VIEWPORT STRESS
// ═══════════════════════════════════════════════════════════
async function mobileViewportStress(context) {
  console.log("\n═══ 10. MOBILE VIEWPORT STRESS (375x667) ═══");

  const mobilePage = await context.newPage();
  await mobilePage.setViewportSize({ width: 375, height: 667 });

  const mobileIssues = {};

  for (const route of ROUTES.slice(1)) {
    await mobilePage.goto(`${BASE}${route}`, { waitUntil: "networkidle" });
    await sleep(1000);

    const issues = await mobilePage.evaluate(() => {
      const problems = [];
      const body = document.body;

      // Horizontal overflow
      if (body.scrollWidth > window.innerWidth + 5) {
        problems.push({
          type: "mobile-overflow",
          scrollWidth: body.scrollWidth,
          viewportWidth: window.innerWidth,
          diff: body.scrollWidth - window.innerWidth,
        });
      }

      // Touch targets too small (< 44x44)
      const interactives = document.querySelectorAll("a, button, input, select, textarea, [role='button']");
      const smallTargets = [];
      interactives.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44)) {
          smallTargets.push({
            tag: el.tagName,
            text: el.textContent?.trim()?.substring(0, 30) || "",
            width: Math.round(rect.width),
            height: Math.round(rect.height),
          });
        }
      });
      if (smallTargets.length > 0) problems.push({ type: "small-touch-targets", count: smallTargets.length, samples: smallTargets.slice(0, 5) });

      // Font too small (< 12px)
      const textEls = document.querySelectorAll("p, span, li, a, td, th");
      const tinyText = [];
      textEls.forEach(el => {
        const size = parseFloat(window.getComputedStyle(el).fontSize);
        if (size < 12 && el.offsetWidth > 0) {
          tinyText.push({ tag: el.tagName, text: el.textContent?.trim()?.substring(0, 30) || "", fontSize: size });
        }
      });
      if (tinyText.length > 0) problems.push({ type: "tiny-text", count: tinyText.length, samples: tinyText.slice(0, 5) });

      return problems;
    });

    mobileIssues[route] = issues;
    console.log(`  ${route.padEnd(14)} issues=${issues.length}`);
    issues.forEach(i => {
      if (i.type === "mobile-overflow") {
        console.log(`    [OVERFLOW] scrollWidth=${i.scrollWidth} viewport=${i.viewportWidth} diff=${i.diff}px`);
      } else if (i.type === "small-touch-targets") {
        console.log(`    [TOUCH] ${i.count} targets < 44px`);
        i.samples.forEach(s => console.log(`      ${s.tag} "${s.text}" ${s.width}x${s.height}`));
      } else if (i.type === "tiny-text") {
        console.log(`    [TEXT] ${i.count} elements < 12px`);
        i.samples.forEach(s => console.log(`      ${s.tag} "${s.text}" ${s.fontSize}px`));
      }
    });
  }

  results.mobileStress = mobileIssues;
  await mobilePage.close();
}

// ═══════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════
async function main() {
  console.log("╔══════════════════════════════════════════════════╗");
  console.log("║   PHASE 7 — FRONTEND STRESS TEST               ║");
  console.log("║   Target: http://localhost:4173 (production)    ║");
  console.log("╚══════════════════════════════════════════════════╝");

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  const steps = [
    ["Baseline", () => measureBaseline(page)],
    ["Core Web Vitals", () => measureCoreWebVitals(page)],
    ["Slow 3G", () => measureSlow3G(context, page)],
    ["Fast 3G", () => measureFast3G(context, page)],
    ["Rapid Navigation", () => rapidNavigationStress(page)],
    ["Layout Shifts", () => layoutShiftPerPage(page)],
    ["Re-Render & Jank", () => reRenderAndJank(page)],
    ["Broken UI", () => brokenUIDetection(page)],
    ["Resource Analysis", () => resourceAnalysis(page)],
    ["Mobile Viewport", () => mobileViewportStress(context)],
  ];

  for (const [name, fn] of steps) {
    try {
      await fn();
    } catch (err) {
      console.error(`ERROR in ${name}:`, err.message);
      console.error(err.stack?.split("\n").slice(0, 3).join("\n"));
    }
  }

  await browser.close();

  // Final JSON dump
  console.log("\n\n═══ RAW RESULTS (JSON) ═══");
  console.log(JSON.stringify(results, null, 2));
}

main().catch(console.error);
