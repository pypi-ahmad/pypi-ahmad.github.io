const fs = require("fs");

const [inputPath, outputPath] = process.argv.slice(2);
if (!inputPath || !outputPath) {
  console.error("Usage: node ua-arch-analyze.js <input> <output>");
  process.exit(1);
}

try {
  const input = JSON.parse(fs.readFileSync(inputPath, "utf8"));
  const nodes = input.fileNodes || [];
  const ids = new Set(nodes.map((node) => node.id));
  const pathParts = nodes.map((node) => (node.filePath || "").split("/").filter(Boolean));
  let prefix = [];
  for (let index = 0; ; index += 1) {
    const candidate = pathParts[0]?.[index];
    if (!candidate || !pathParts.every((parts) => parts[index] === candidate)) break;
    prefix.push(candidate);
  }
  const groupFor = (node) => {
    const parts = (node.filePath || "").split("/").filter(Boolean);
    return parts[prefix.length] || "(root)";
  };
  const directoryGroups = {};
  const nodeTypeGroups = {};
  const idToGroup = new Map();
  for (const node of nodes) {
    const group = groupFor(node);
    (directoryGroups[group] ||= []).push(node.id);
    (nodeTypeGroups[node.type] ||= []).push(node.id);
    idToGroup.set(node.id, group);
  }
  const adjacency = new Map(nodes.map((node) => [node.id, { in: 0, out: 0 }]));
  const groupImports = new Map();
  const intra = new Map(Object.keys(directoryGroups).map((group) => [group, { internalEdges: 0, totalEdges: 0 }]));
  for (const edge of input.importEdges || []) {
    if (!ids.has(edge.source) || !ids.has(edge.target)) continue;
    adjacency.get(edge.source).out += 1;
    adjacency.get(edge.target).in += 1;
    const from = idToGroup.get(edge.source), to = idToGroup.get(edge.target);
    const key = `${from}\u0000${to}`;
    groupImports.set(key, (groupImports.get(key) || 0) + 1);
    intra.get(from).totalEdges += 1;
    intra.get(to).totalEdges += 1;
    if (from === to) intra.get(from).internalEdges += 1;
  }
  const cross = new Map();
  for (const edge of input.allEdges || []) {
    const source = nodes.find((node) => node.id === edge.source);
    const target = nodes.find((node) => node.id === edge.target);
    if (!source || !target) continue;
    const key = `${source.type}\u0000${target.type}\u0000${edge.type}`;
    cross.set(key, (cross.get(key) || 0) + 1);
  }
  const pattern = (group) => {
    const lower = group.toLowerCase();
    if (["components", "pages", "views", "ui", "layouts", "screens", "containers"].includes(lower)) return "ui";
    if (["__tests__", "test", "tests", "spec", "specs"].includes(lower)) return "test";
    if (["data", "models", "db", "persistence", "repository", "entities"].includes(lower)) return "data";
    if (["docs", "documentation", "wiki"].includes(lower)) return "documentation";
    if ([".github", ".gitlab", ".circleci"].includes(lower)) return "ci-cd";
    if (["config", "constants", "env", "settings"].includes(lower)) return "config";
    if (["assets", "static", "public"].includes(lower)) return "assets";
    return "other";
  };
  const topologyPaths = nodes.map((node) => node.filePath || "");
  const output = {
    scriptCompleted: true,
    directoryGroups,
    nodeTypeGroups,
    crossCategoryEdges: [...cross.entries()].map(([key, count]) => { const [fromType, toType, edgeType] = key.split("\u0000"); return { fromType, toType, edgeType, count }; }),
    interGroupImports: [...groupImports.entries()].map(([key, count]) => { const [from, to] = key.split("\u0000"); return { from, to, count }; }),
    intraGroupDensity: Object.fromEntries([...intra.entries()].map(([group, value]) => [group, { ...value, density: value.totalEdges ? value.internalEdges / value.totalEdges : 0 }])),
    patternMatches: Object.fromEntries(Object.keys(directoryGroups).map((group) => [group, pattern(group)])),
    deploymentTopology: { hasDockerfile: topologyPaths.some((path) => /(^|\/)Dockerfile/.test(path)), hasCompose: topologyPaths.some((path) => /docker-compose/.test(path)), hasK8s: topologyPaths.some((path) => /(^|\/)(k8s|kubernetes|helm)\//.test(path)), hasTerraform: topologyPaths.some((path) => /\.tf(vars)?$/.test(path)), hasCI: topologyPaths.some((path) => path.startsWith(".github/workflows/")), infraFiles: topologyPaths.filter((path) => /Dockerfile|docker-compose|\.github\/workflows|\.tf/.test(path)) },
    dataPipeline: { schemaFiles: topologyPaths.filter((path) => /\.(graphql|gql|proto|sql)$/.test(path)), migrationFiles: topologyPaths.filter((path) => /migration/i.test(path)), dataModelFiles: topologyPaths.filter((path) => /(^|\/)src\/data\//.test(path)), apiHandlerFiles: [] },
    docCoverage: { groupsWithDocs: Object.keys(directoryGroups).filter((group) => directoryGroups[group].some((id) => nodes.find((node) => node.id === id)?.type === "document")).length, totalGroups: Object.keys(directoryGroups).length, coverageRatio: 0, undocumentedGroups: [] },
    dependencyDirection: [...groupImports.entries()].filter(([key, count]) => { const [from, to] = key.split("\u0000"); return count > (groupImports.get(`${to}\u0000${from}`) || 0); }).map(([key]) => { const [dependent, dependsOn] = key.split("\u0000"); return { dependent, dependsOn }; }),
    fileStats: { totalFileNodes: nodes.length, filesPerGroup: Object.fromEntries(Object.entries(directoryGroups).map(([group, values]) => [group, values.length])), nodeTypeCounts: Object.fromEntries(Object.entries(nodeTypeGroups).map(([type, values]) => [type, values.length])) },
    fileFanIn: Object.fromEntries([...adjacency.entries()].map(([id, value]) => [id, value.in])),
    fileFanOut: Object.fromEntries([...adjacency.entries()].map(([id, value]) => [id, value.out]))
  };
  output.docCoverage.coverageRatio = output.docCoverage.totalGroups ? output.docCoverage.groupsWithDocs / output.docCoverage.totalGroups : 0;
  output.docCoverage.undocumentedGroups = Object.keys(directoryGroups).filter((group) => !directoryGroups[group].some((id) => nodes.find((node) => node.id === id)?.type === "document"));
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
} catch (error) {
  console.error(error.stack || error.message);
  process.exit(1);
}
