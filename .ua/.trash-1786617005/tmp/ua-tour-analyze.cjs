const fs = require("fs");

const [inputPath, outputPath] = process.argv.slice(2);
if (!inputPath || !outputPath) {
  console.error("Usage: node ua-tour-analyze.cjs <input> <output>");
  process.exit(1);
}

try {
  const graph = JSON.parse(fs.readFileSync(inputPath, "utf8"));
  const nodes = Array.isArray(graph.nodes) ? graph.nodes : [];
  const edges = Array.isArray(graph.edges) ? graph.edges : [];
  const layers = Array.isArray(graph.layers) ? graph.layers : [];
  const byId = new Map(nodes.map((node) => [node.id, node]));
  const inbound = new Map(nodes.map((node) => [node.id, 0]));
  const outbound = new Map(nodes.map((node) => [node.id, 0]));
  const traversalEdges = new Map(nodes.map((node) => [node.id, []]));

  for (const edge of edges) {
    if (!byId.has(edge.source) || !byId.has(edge.target)) continue;
    inbound.set(edge.target, (inbound.get(edge.target) || 0) + 1);
    outbound.set(edge.source, (outbound.get(edge.source) || 0) + 1);
    if (edge.type === "imports" || edge.type === "calls") traversalEdges.get(edge.source).push(edge.target);
  }

  const rank = (counts, key) => nodes.map((node) => ({ id: node.id, [key]: counts.get(node.id) || 0, name: node.name })).sort((a, b) => b[key] - a[key] || a.id.localeCompare(b.id)).slice(0, 20);
  const fanInRanking = rank(inbound, "fanIn");
  const fanOutRanking = rank(outbound, "fanOut");
  const fanOutValues = nodes.map((node) => outbound.get(node.id) || 0).sort((a, b) => a - b);
  const fanInValues = nodes.map((node) => inbound.get(node.id) || 0).sort((a, b) => a - b);
  const highOut = fanOutValues[Math.max(0, Math.ceil(fanOutValues.length * 0.9) - 1)] || 0;
  const lowIn = fanInValues[Math.max(0, Math.ceil(fanInValues.length * 0.25) - 1)] || 0;
  const entryNames = new Set(["index.ts", "index.js", "main.ts", "main.js", "app.ts", "app.js", "server.ts", "server.js", "mod.rs", "main.go", "main.py", "main.rs", "manage.py", "app.py", "wsgi.py", "asgi.py", "run.py", "__main__.py", "Application.java", "Main.java", "Program.cs", "config.ru", "index.php", "App.swift", "Application.kt", "main.cpp", "main.c"]);
  const entryPointCandidates = nodes.map((node) => {
    const path = node.filePath || "";
    const depth = path ? path.split("/").length : 99;
    let score = 0;
    if (node.type === "file") {
      if (entryNames.has(node.name)) score += 3;
      if (depth <= 2) score += 1;
      if ((outbound.get(node.id) || 0) >= highOut) score += 1;
      if ((inbound.get(node.id) || 0) <= lowIn) score += 1;
    }
    if (node.type === "document") {
      if (path === "README.md") score += 5;
      else if (path && depth === 1 && path.endsWith(".md")) score += 2;
    }
    return { id: node.id, score, name: node.name, summary: node.summary };
  }).filter((node) => node.score > 0).sort((a, b) => b.score - a.score || a.id.localeCompare(b.id)).slice(0, 5);

  const start = entryPointCandidates.find((candidate) => byId.get(candidate.id)?.type === "file");
  const order = [], depthMap = {}, byDepth = {};
  if (start) {
    const queue = [[start.id, 0]];
    depthMap[start.id] = 0;
    for (let i = 0; i < queue.length; i += 1) {
      const [id, depth] = queue[i];
      order.push(id);
      (byDepth[depth] ||= []).push(id);
      for (const target of traversalEdges.get(id) || []) {
        if (depthMap[target] !== undefined) continue;
        depthMap[target] = depth + 1;
        queue.push([target, depth + 1]);
      }
    }
  }

  const inventory = { documentation: [], infrastructure: [], data: [], config: [] };
  for (const node of nodes) {
    const item = { id: node.id, name: node.name, type: node.type, summary: node.summary };
    if (node.type === "document") inventory.documentation.push(item);
    if (["service", "pipeline", "resource"].includes(node.type)) inventory.infrastructure.push(item);
    if (["table", "schema", "endpoint"].includes(node.type)) inventory.data.push(item);
    if (node.type === "config") inventory.config.push(item);
  }

  const pairEdges = new Map();
  for (const edge of edges) {
    if (!["imports", "calls"].includes(edge.type)) continue;
    const key = `${edge.source}\u0000${edge.target}`;
    pairEdges.set(key, (pairEdges.get(key) || 0) + 1);
  }
  const clusters = [], seenPairs = new Set();
  for (const [key, count] of pairEdges) {
    const [source, target] = key.split("\u0000");
    const reverse = `${target}\u0000${source}`;
    if (!pairEdges.has(reverse) || seenPairs.has(reverse) || !byId.has(source) || !byId.has(target)) continue;
    seenPairs.add(key);
    const members = new Set([source, target]);
    for (const node of nodes) {
      const links = [...members].filter((member) => pairEdges.has(`${node.id}\u0000${member}`) || pairEdges.has(`${member}\u0000${node.id}`));
      if (links.length >= 2 && members.size < 5) members.add(node.id);
    }
    clusters.push({ nodes: [...members], edgeCount: count + (pairEdges.get(reverse) || 0) });
  }
  clusters.sort((a, b) => b.edgeCount - a.edgeCount).splice(10);
  const nodeSummaryIndex = Object.fromEntries(nodes.map((node) => [node.id, { name: node.name, type: node.type, summary: node.summary }]));
  fs.writeFileSync(outputPath, JSON.stringify({ scriptCompleted: true, entryPointCandidates, fanInRanking, fanOutRanking, bfsTraversal: { startNode: start?.id || null, order, depthMap, byDepth }, nonCodeFiles: inventory, clusters, layers: { count: layers.length, list: layers.map(({ id, name, description }) => ({ id, name, description })) }, nodeSummaryIndex, totalNodes: nodes.length, totalEdges: edges.length }, null, 2));
} catch (error) {
  console.error(error.stack || error.message);
  process.exit(1);
}
