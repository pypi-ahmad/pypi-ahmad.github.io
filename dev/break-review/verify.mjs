import assert from "node:assert/strict";
import { createServer } from "vite";
import React from "react";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";

// Validate fixture rendering without a browser or visual assertions. This does not replace the user's look.
const server = await createServer({ server: { middlewareMode: true, open: false } });
try {
  const { ThemeControllerProvider } = await server.ssrLoadModule("/src/themeController.jsx");
  const { Instance } = await server.ssrLoadModule("/dev/break-review/suite.jsx");
  const { reports } = await server.ssrLoadModule("/dev/break-review/suite-fixtures.js");
  let count = 0;
  for (const [kind, report] of Object.entries(reports)) {
    assert.ok(report.scope && report.omitted && report.scenarios.length);
    assert.equal(new Set(report.scenarios.map(s => s.label)).size, report.scenarios.length);
    for (const [scenario, entry] of report.scenarios.entries()) {
      for (const mode of ["light", "dark"]) {
        const html = renderToString(React.createElement(ThemeControllerProvider, { initialThemeMode: mode },
          React.createElement(MemoryRouter, null, React.createElement(Instance, { kind, props: entry.props, scenario }))));
        assert.equal(typeof html, "string");
        const emptyExpected = (kind === "contact" && entry.props.items.length === 0) ||
          (kind === "status" && Boolean(entry.props.data)) || (kind === "pagination" && entry.props.pages < 2);
        if (!emptyExpected) assert.ok(html.length > 0, `${kind}/${entry.label}: expected markup`);
      }
      count++;
    }
  }
  console.log(`PASS: ${Object.keys(reports).length} component reports, ${count} scenarios render on the server in both themes. Visual inspection remains pending.`);
} finally {
  await server.close();
}
