const fs = require('fs');
const path = require('path');
const ua = '.ua';
const batches = JSON.parse(fs.readFileSync(`${ua}/intermediate/batches.json`, 'utf8')).batches;
const typeFor = f => f.fileCategory === 'config' ? 'config' : f.fileCategory === 'docs' ? 'document' : 'file';
const prefixFor = t => t === 'config' ? 'config' : t === 'document' ? 'document' : 'file';
const complexity = r => (r.nonEmptyLines || r.totalLines || 0) > 200 ? 'complex' : (r.nonEmptyLines || r.totalLines || 0) >= 50 ? 'moderate' : 'simple';
const cap = s => s.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
for (const idx of [1,2,3,4,5]) {
  const batch = batches.find(x => x.batchIndex === idx);
  const extracted = JSON.parse(fs.readFileSync(`${ua}/tmp/ua-file-extract-results-${idx}.json`, 'utf8'));
  const resultMap = new Map(extracted.results.map(r => [r.path, r]));
  const nodes = [], edges = [];
  for (const f of batch.files) {
    const r = resultMap.get(f.path) || { path: f.path, totalLines: f.sizeLines, nonEmptyLines: f.sizeLines, functions: [], classes: [], exports: [] };
    const fileType = typeFor(f), fileId = `${prefixFor(fileType)}:${f.path}`;
    const basename = path.basename(f.path);
    const isTest = /(?:\.test|\.spec)\.[jt]sx?$/.test(f.path);
    const isComponent = /\.jsx$/.test(f.path) && !isTest;
    const tags = isTest ? ['test','react','verification'] : isComponent ? ['react','component','ui'] : f.path.includes('theme') ? ['theme','utility','styling'] : ['javascript','application','supporting-code'];
    nodes.push({ id: fileId, type: fileType, name: basename, filePath: f.path,
      summary: isTest ? `Test suite validating ${cap(basename)} behavior in the React portfolio.` : `Implements ${cap(basename)} for the React portfolio application.`,
      tags, complexity: complexity(r) });
    for (const target of batch.batchImportData[f.path] || []) edges.push({source:fileId,target:`file:${target}`,type:'imports',direction:'forward',weight:0.7});
    for (const fn of r.functions || []) {
      const exported = (r.exports || []).some(e => e.name === fn.name);
      if (exported || (fn.endLine - fn.startLine + 1) >= 10) {
        const id = `function:${f.path}:${fn.name}`;
        nodes.push({id,type:'function',name:fn.name,filePath:f.path,summary:`Provides the ${fn.name} routine used by ${basename}.`,tags:isTest?['test','helper','react']:['function','react','component'],complexity: complexity({nonEmptyLines:fn.endLine-fn.startLine+1})});
        edges.push({source:fileId,target:id,type:'contains',direction:'forward',weight:1.0});
        if (exported) edges.push({source:fileId,target:id,type:'exports',direction:'forward',weight:0.8});
      }
    }
    for (const cls of r.classes || []) {
      const exported = (r.exports || []).some(e => e.name === cls.name);
      if (exported || (cls.methods || []).length >= 2 || (cls.endLine - cls.startLine + 1) >= 20) {
        const id = `class:${f.path}:${cls.name}`;
        nodes.push({id,type:'class',name:cls.name,filePath:f.path,summary:`Defines the ${cls.name} component or class in ${basename}.`,tags:['class','react','component'],complexity:complexity({nonEmptyLines:cls.endLine-cls.startLine+1})});
        edges.push({source:fileId,target:id,type:'contains',direction:'forward',weight:1.0});
        if (exported) edges.push({source:fileId,target:id,type:'exports',direction:'forward',weight:0.8});
      }
    }
    if (isTest) for (const target of batch.batchImportData[f.path] || []) edges.push({source:`file:${target}`,target:fileId,type:'tested_by',direction:'forward',weight:0.5});
  }
  fs.writeFileSync(`${ua}/intermediate/batch-${idx}.json`, JSON.stringify({nodes,edges},null,2));
}
