import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {layoutWords,wordMotion,type Phrase} from './lyrics.ts';
import {paperPopAt,buildingPops} from './paper-pop.ts';
const board=JSON.parse(fs.readFileSync('assets/milestone8/storyboard.json','utf8'));
test('M10 covers every master frame exactly once and preserves all 52 shot IDs',()=>{
 assert.equal(board.shots.length,52);
 for(let f=0;f<7884;f++)assert.equal(board.shots.filter((s:any)=>f*1000/30>=s.startMs&&f*1000/30<s.endMs).length,1);
 assert.equal(board.shots.at(-1).endMs,262800);
});
test('M10 preserves protected timings, audio, premium masters and historical videos',()=>{
 const inputs=JSON.parse(fs.readFileSync('assets/milestone10/preserved-inputs.json','utf8'));
 for(const [p,h] of Object.entries(inputs))assert.equal(createHash('sha256').update(fs.readFileSync(p)).digest('hex'),h,p);
});
test('film caption motion leaves the upper 560px action region clear',()=>{
 const phrases=JSON.parse(fs.readFileSync('assets/milestone7/timeline.json','utf8')).phrases as Phrase[];
 for(const p of phrases)for(const word of layoutWords(p,'lower-center'))for(let t=p.presentation.startMs;t<p.presentation.endMs+150;t+=33.333){
  const motion=wordMotion(p,word.word,t,'slap');
  // Conservative 35px outline/rotation allowance and actual caption container transform.
  const top=1080+.92*(word.y+motion.y-35-1080);
  assert(top>560,`${p.id}: ${top}`);
 }
});
test('film brisk cover preserves swap occlusion but releases large bubbles sooner',()=>{
 const box=buildingPops[2];
 for(const at of [-50,0,40,80])assert.deepEqual(paperPopAt(box.swap+at,box.swap,box).map(({x,y,r,opacity})=>({x,y,r,opacity})),paperPopAt(box.swap+at,box.swap,box,undefined,true).map(({x,y,r,opacity})=>({x,y,r,opacity})));
 const usual=paperPopAt(box.swap+400,box.swap,box),brisk=paperPopAt(box.swap+400,box.swap,box,undefined,true);
 assert(brisk.reduce((s,b)=>s+b.r*b.r*b.opacity,0)<usual.reduce((s,b)=>s+b.r*b.r*b.opacity,0));
});
