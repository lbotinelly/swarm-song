import {mkdirSync,writeFileSync} from 'node:fs';
import {frameAt,registry} from '../src/timeline.ts';
const rows = [24,30,60].flatMap(fps=>registry.cues.flatMap(cue=>[
  {fps,action:cue.action,edge:'start',requestedMs:cue.atMs},
  ...(cue.action !== 'pose' ? [{fps,action:cue.action,edge:'end (exclusive)',requestedMs:cue.atMs+cue.durationMs}] : []),
]).map(row=>({...row,frame:frameAt(row.requestedMs,fps),visibleMs:frameAt(row.requestedMs,fps)*1000/fps,delayMs:frameAt(row.requestedMs,fps)*1000/fps-row.requestedMs})));
mkdirSync('output/registry',{recursive:true});
writeFileSync('output/registry/timing.json',JSON.stringify(rows,null,2)+'\n');
console.table(rows);
