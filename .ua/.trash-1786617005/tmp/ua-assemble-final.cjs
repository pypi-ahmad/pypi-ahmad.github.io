#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const projectRoot = process.argv[2];
const uaDir = path.join(projectRoot, ".ua");
const intermediate = path.join(uaDir, "intermediate");
const graphPath = path.join(intermediate, "assembled-graph.json");
const fragment = JSON.parse(fs.readFileSync(graphPath, "utf8"));
const scan = JSON.parse(fs.readFileSync(path.join(intermediate, "scan-result.json"), "utf8"));
const rawLayers = JSON.parse(fs.readFileSync(path.join(intermediate, "layers.json"), "utf8"));
const rawTour = JSON.parse(fs.readFileSync(path.join(intermediate, "tour.json"), "utf8"));
const nodeIds = new Set(fragment.nodes.map((node) => node.id));
const prefixes = /^(file|config|document|service|pipeline|table|schema|resource|endpoint):/;

const normalizeId = (value) => {
  const id = typeof value === "object" && value ? value.id : value;
  if (typeof id !== "string") return null;
  return prefixes.test(id) ? id : `file:${id}`;
};

const layerInput = Array.isArray(rawLayers) ? rawLayers : rawLayers.layers || [];
const layers = layerInput.map((layer) => {
  const sourceIds = layer.nodeIds || layer.nodes || [];
  const nodeIdsForLayer = sourceIds.map(normalizeId).filter((id) => id && nodeIds.has(id));
  const generatedId = `layer:${String(layer.name || "unnamed")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;
  return {
    id: layer.id || generatedId,
    name: layer.name || "Unnamed Layer",
    description: layer.description || "No description available",
    nodeIds: nodeIdsForLayer,
  };
});

const tourInput = Array.isArray(rawTour) ? rawTour : rawTour.steps || [];
const tour = tourInput
  .map((step, index) => {
    const sourceIds = step.nodeIds || step.nodesToInspect || [];
    const normalized = {
      order: Number.isInteger(step.order) ? step.order : index + 1,
      title: step.title || `Step ${index + 1}`,
      description: step.description || step.whyItMatters || "No description available",
      nodeIds: sourceIds.map(normalizeId).filter((id) => id && nodeIds.has(id)),
    };
    if (typeof step.languageLesson === "string") normalized.languageLesson = step.languageLesson;
    return normalized;
  })
  .sort((a, b) => a.order - b.order)
  .map((step, index) => ({ ...step, order: index + 1 }));

const graph = {
  version: "1.0.0",
  project: {
    name: scan.name,
    languages: scan.languages,
    frameworks: scan.frameworks,
    description: scan.description,
    analyzedAt: new Date().toISOString(),
    gitCommitHash: process.argv[3],
  },
  nodes: fragment.nodes,
  edges: fragment.edges,
  layers,
  tour,
};

fs.writeFileSync(graphPath, JSON.stringify(graph, null, 2));
console.log(`Assembled ${graph.nodes.length} nodes, ${graph.edges.length} edges, ${layers.length} layers, ${tour.length} tour steps.`);
