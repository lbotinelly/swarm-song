import {test} from 'node:test';
import assert from 'node:assert/strict';
import {paperPopAt,buildingPops} from './paper-pop.ts';

test('opaque bubble cover contains every old/new building region through the swap',()=>{
 for(const box of buildingPops)for(const offset of [-50,0,40,80]){
  const bubbles=paperPopAt(box.swap+offset,box.swap,box);
  for(let x=box.x;x<=box.x+box.w;x+=4)for(let y=box.y;y<=box.y+box.h;y+=4)
   assert(bubbles.some(b=>b.opacity===1&&Math.hypot(x-b.x,y-b.y)<=b.r),`uncovered ${x},${y} at ${box.swap+offset}`);
 }
});
test('small bubbles leave faster, the center clears, and direct seeking is stable',()=>{
 const box=buildingPops[0],start=paperPopAt(box.swap,box.swap,box),later=paperPopAt(box.swap+320,box.swap,box);
 const small=start.reduce((a,b)=>a.r<b.r?a:b),large=start.reduce((a,b)=>a.r>b.r?a:b);
 assert(small.speed>large.speed);
 assert(Math.hypot(later[small.id].x-small.x,later[small.id].y-small.y)>Math.hypot(later[large.id].x-large.x,later[large.id].y-large.y));
 assert(later.some(b=>b.opacity<.5));assert(later.some(b=>b.opacity>.9));
 const times=[box.swap-180,box.swap,box.swap+100,box.swap+320,box.swap+600];
 assert.deepEqual(times.map(t=>paperPopAt(t,box.swap,box)),[...times].reverse().map(t=>paperPopAt(t,box.swap,box)).reverse());
 assert.deepEqual(paperPopAt(box.swap+1300,box.swap,box),[]);
});
test('bubble drag and lifetimes differ; optional scene wind carries smaller bubbles more',()=>{
 const box=buildingPops[0],at=box.swap+300;
 const calm=paperPopAt(at,box.swap,box);
 const right=paperPopAt(at,box.swap,box,()=>({strength:1,direction:1}));
 const left=paperPopAt(at,box.swap,box,()=>({strength:1,direction:-1}));
 assert.equal(new Set(calm.map(p=>p.lifetime)).size,calm.length);
 assert.equal(new Set(calm.map(p=>p.drag)).size,calm.length);
 for(let i=0;i<calm.length;i++)assert(left[i].x<calm[i].x&&calm[i].x<right[i].x);
 assert.deepEqual(calm,paperPopAt(at,box.swap,box,()=>({strength:0,direction:1})));
 const small=calm.reduce((a,b)=>a.speed>b.speed?a:b),large=calm.reduce((a,b)=>a.speed<b.speed?a:b);
 assert(right.find(p=>p.id===small.id)!.x-small.x>right.find(p=>p.id===large.id)!.x-large.x);
 // Launch velocity drops with time, independently of the late upward drift.
 for(const p of calm)assert(p.launchSpeed*Math.exp(-p.drag*.6)<p.launchSpeed*Math.exp(-p.drag*.1)*.25);
});
