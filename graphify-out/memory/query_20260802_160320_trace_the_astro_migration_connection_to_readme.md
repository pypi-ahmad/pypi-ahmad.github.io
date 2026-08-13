---
type: "query"
date: "2026-08-02T16:03:20.515508+00:00"
question: "Trace the Astro migration connection to README"
contributor: "graphify"
outcome: "useful"
source_nodes: ["Astro Migration Roadmap (Execution Tracker)", "SPA-011 Updated README GitHub Pages canonical host", "Ahmad Mujtaba Portfolio README", "Canonical Host Decision (GitHub Pages)", "Astro Scaffold Plan (apps/portfolio-astro/)"]
---

# Q: Trace the Astro migration connection to README

## Answer

Expanded via graph vocabulary: [astro, migration, roadmap, readme, github, hosting, canonical, scaffold]. The roadmap is an execution tracker with 15 SPA remediation items plus Astro scaffold, content collections, canonical-host, and CSS Modules decisions. Its strongest direct README bridge is SPA-011, which records updating README to the GitHub Pages canonical host. Other paths reach README through CI gates, modal behavior, and static metadata limitations; those middle concept links are inferred, while roadmap task references and README references are extracted. Migration is therefore staged: harden the current React SPA, preserve documented public behavior, then move toward Astro.

## Outcome

- Signal: useful

## Source Nodes

- Astro Migration Roadmap (Execution Tracker)
- SPA-011 Updated README GitHub Pages canonical host
- Ahmad Mujtaba Portfolio README
- Canonical Host Decision (GitHub Pages)
- Astro Scaffold Plan (apps/portfolio-astro/)