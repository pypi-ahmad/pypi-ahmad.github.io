import fs from 'node:fs';
const [inputPath, outputPath] = process.argv.slice(2);
try {
  const input = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  const nodes = input.fileNodes || [];
  const nodeById = new Map(nodes.map(n => [n.id, n]));
  const firstGroup = p => {
    const s = (p || '').replace(/^\.\//, '');
    if (!s.includes('/')) return 'root';
    const [top, second] = s.split('/');
    return top === 'src' && second ? `src/${second}` : top;
  };
  const groups = {};
  const types = {};
  for (const n of nodes) {
    const g = firstGroup(n.filePath); (groups[g] ||= []).push(n.id);
    (types[n.type] ||= []).push(n.id);
  }
  const groupOf = id => firstGroup(nodeById.get(id)?.filePath);
  const fanIn = Object.fromEntries(nodes.map(n => [n.id, 0]));
  const fanOut = Object.fromEntries(nodes.map(n => [n.id, 0]));
  const inter = new Map(), groupImports = {}, density = {};
  for (const g of Object.keys(groups)) density[g] = {internalEdges: 0, totalEdges: 0, density: 0};
  for (const e of input.importEdges || []) {
    fanOut[e.source] = (fanOut[e.source] || 0) + 1;
    fanIn[e.target] = (fanIn[e.target] || 0) + 1;
    const a = groupOf(e.source), b = groupOf(e.target); if (!a || !b) continue;
    const key = `${a}\u0000${b}`; inter.set(key, (inter.get(key) || 0) + 1);
    density[a].totalEdges++; density[b].totalEdges++;
    if (a === b) density[a].internalEdges++;
  }
  for (const d of Object.values(density)) d.density = d.totalEdges ? d.internalEdges / d.totalEdges : 0;
  const cross = new Map();
  for (const e of input.allEdges || []) {
    const a = nodeById.get(e.source)?.type, b = nodeById.get(e.target)?.type;
    if (!a || !b) continue; const key = `${a}\u0000${b}\u0000${e.type}`;
    cross.set(key, (cross.get(key) || 0) + 1);
  }
  const label = g => {
    if (/__tests__|test/.test(g)) return 'test'; if (/components|containers|pages/.test(g)) return 'ui';
    if (/data/.test(g)) return 'data'; if (/public/.test(g)) return 'assets';
    if (/\.github/.test(g)) return 'ci-cd'; if (/docs|tasks/.test(g)) return 'documentation';
    if (/graphify-out|\.ua/.test(g)) return 'generated-artifacts'; if (g === 'root') return 'config';
    return 'other';
  };
  const paths = nodes.map(n => n.filePath || '');
  const infra = paths.filter(p => /(^|\/)(Dockerfile|docker-compose|\.github\/workflows|.*\.tf$|.*\.ya?ml$)/i.test(p));
  const docs = Object.keys(groups).filter(g => groups[g].some(id => nodeById.get(id).type === 'document'));
  const dirs = Object.keys(groups);
  const result = {
    scriptCompleted: true, directoryGroups: groups, nodeTypeGroups: types,
    crossCategoryEdges: [...cross].map(([k,count]) => { const [fromType,toType,edgeType] = k.split('\u0000'); return {fromType,toType,edgeType,count}; }),
    interGroupImports: [...inter].map(([k,count]) => {const [from,to]=k.split('\u0000'); return {from,to,count};}),
    intraGroupDensity: density, patternMatches: Object.fromEntries(dirs.map(g=>[g,label(g)])),
    deploymentTopology: {hasDockerfile: paths.some(p=>/Dockerfile/i.test(p)), hasCompose: paths.some(p=>/docker-compose/i.test(p)), hasK8s:false, hasTerraform:paths.some(p=>/\.tf$/.test(p)), hasCI:paths.some(p=>p.startsWith('.github/workflows/')), infraFiles:infra},
    dataPipeline: {schemaFiles:[], migrationFiles:[], dataModelFiles: paths.filter(p=>p.startsWith('src/data/')), apiHandlerFiles:[]},
    docCoverage: {groupsWithDocs:docs.length,totalGroups:dirs.length,coverageRatio:dirs.length ? docs.length / dirs.length : 0,undocumentedGroups:dirs.filter(g=>!docs.includes(g))},
    dependencyDirection: [...inter].filter(([k])=>{const [a,b]=k.split('\u0000'); return a!==b;}).map(([k,count])=>{const [dependent,dependsOn]=k.split('\u0000'); return {dependent,dependsOn,count};}),
    fileStats: {totalFileNodes:nodes.length,filesPerGroup:Object.fromEntries(dirs.map(g=>[g,groups[g].length])),nodeTypeCounts:Object.fromEntries(Object.entries(types).map(([k,v])=>[k,v.length]))},
    fileFanIn:fanIn,fileFanOut:fanOut
  };
  fs.writeFileSync(outputPath, JSON.stringify(result,null,2));
} catch (err) { console.error(err.stack || err.message); process.exit(1); }
