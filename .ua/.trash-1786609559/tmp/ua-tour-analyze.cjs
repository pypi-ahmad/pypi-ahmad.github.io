const fs = require('fs');

try {
  const [inputPath, outputPath] = process.argv.slice(2);
  if (!inputPath || !outputPath) throw new Error('Expected input and output paths');
  const graph = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  const nodes = Array.isArray(graph.nodes) ? graph.nodes : [];
  const edges = Array.isArray(graph.edges) ? graph.edges : [];
  const byId = new Map(nodes.map(n => [n.id, n]));
  const inCount = new Map(nodes.map(n => [n.id, 0]));
  const outCount = new Map(nodes.map(n => [n.id, 0]));
  const adjacency = new Map(nodes.map(n => [n.id, []]));
  for (const edge of edges) if (byId.has(edge.source) && byId.has(edge.target)) {
    outCount.set(edge.source, outCount.get(edge.source) + 1); inCount.set(edge.target, inCount.get(edge.target) + 1);
    if (edge.type === 'imports' || edge.type === 'calls') adjacency.get(edge.source).push(edge.target);
  }
  const ranked = (counts, field) => [...nodes].map(n => ({id:n.id,[field]:counts.get(n.id),name:n.name})).sort((a,b)=>b[field]-a[field]||a.id.localeCompare(b.id)).slice(0,20);
  const fanInRanking = ranked(inCount, 'fanIn'), fanOutRanking = ranked(outCount, 'fanOut');
  const outValues=[...outCount.values()].sort((a,b)=>a-b), inValues=[...inCount.values()].sort((a,b)=>a-b);
  const highOut=outValues[Math.max(0,Math.floor(outValues.length*.9)-1)]||0, lowIn=inValues[Math.min(inValues.length-1,Math.floor(inValues.length*.25))]||0;
  const fileNamePattern=/^(index|main|app|server)\.(ts|tsx|js|jsx)$|^(mod\.rs|main\.go|main\.py|main\.rs|manage\.py|app\.py|wsgi\.py|asgi\.py|run\.py|__main__\.py|Application\.java|Main\.java|Program\.cs|config\.ru|index\.php|App\.swift|Application\.kt|main\.(cpp|c))$/;
  const candidates=nodes.map(n=>{let score=0;const path=n.filePath||'';if(n.type==='file'){if(fileNamePattern.test(n.name||''))score+=3;if(path.split('/').length<=2)score+=1;if(outCount.get(n.id)>=highOut)score+=1;if(inCount.get(n.id)<=lowIn)score+=1;}else if(n.type==='document'){if(path==='README.md')score+=5;else if(/^[^/]+\.md$/i.test(path))score+=2;}return{id:n.id,score,name:n.name,summary:n.summary||''};}).filter(n=>n.score>0).sort((a,b)=>b.score-a.score||a.id.localeCompare(b.id)).slice(0,5);
  const start=candidates.find(c=>byId.get(c.id)?.type==='file')?.id||null, order=[], depthMap={}, byDepth={};
  if(start){const queue=[[start,0]];depthMap[start]=0;for(let i=0;i<queue.length;i++){const[id,depth]=queue[i];order.push(id);(byDepth[depth] ||= []).push(id);for(const next of adjacency.get(id)||[])if(!(next in depthMap)){depthMap[next]=depth+1;queue.push([next,depth+1]);}}}
  const details=n=>({id:n.id,name:n.name,type:n.type,summary:n.summary||''});
  const nonCodeFiles={documentation:nodes.filter(n=>n.type==='document').map(details),infrastructure:nodes.filter(n=>['service','pipeline','resource'].includes(n.type)).map(details),data:nodes.filter(n=>['table','schema','endpoint'].includes(n.type)).map(details),config:nodes.filter(n=>n.type==='config').map(details)};
  const pairs=new Set(edges.filter(e=>['imports','calls'].includes(e.type)&&byId.has(e.source)&&byId.has(e.target)).map(e=>`${e.source}\u0000${e.target}`)), clusters=[], used=new Set();
  for(const key of pairs){const[a,b]=key.split('\u0000'), normalized=[a,b].sort().join('\u0000');if(pairs.has(`${b}\u0000${a}`)&&!used.has(normalized)){used.add(normalized);clusters.push({nodes:[a,b],edgeCount:2});}}
  const index=Object.fromEntries(nodes.map(n=>[n.id,{name:n.name,type:n.type,summary:n.summary||''}]));
  fs.writeFileSync(outputPath,JSON.stringify({scriptCompleted:true,entryPointCandidates:candidates,fanInRanking,fanOutRanking,bfsTraversal:{startNode:start,order,depthMap,byDepth},nonCodeFiles,clusters:clusters.slice(0,10),layers:{count:(graph.layers||[]).length,list:(graph.layers||[]).map(({id,name,description})=>({id,name,description}))},nodeSummaryIndex:index,totalNodes:nodes.length,totalEdges:edges.length},null,2));
} catch(error) { console.error(error.message); process.exit(1); }
