import test from 'node:test';
import assert from 'node:assert/strict';
import {pages,pagesState,flyoverTower} from './pages-between.ts';
test('all rates preserve a two-second blackout with no early scene arrival',()=>{
 for(const fps of [24,30,60]) {
  const start=Math.ceil(pages.cues.black*fps/1000),end=Math.ceil(pages.cues.history*fps/1000);
  assert.equal(end-start,2*fps);
  assert.equal(pagesState(start-1,fps).shot,'goggles');
  for(let f=start;f<end;f++)assert.equal(pagesState(f,fps).shot,'black');
  assert.equal(pagesState(end,fps).shot,'history');
  assert.equal(pagesState(Math.ceil(pages.cues.apartment*fps/1000)-1,fps).shot,'dawn');
 }
});
test('camera, page and daylight states reproduce under reverse/random frame seeking',()=>{
 for(const fps of [24,30,60]) {
  const n=31*fps,forward=Array.from({length:n},(_,f)=>pagesState(f,fps));
  for(let f=n-1;f>=0;f-=7)assert.deepEqual(pagesState(f,fps),forward[f]);
  for(const f of [0,1,n-1,Math.floor(n*.63),Math.floor(n*.81)]) {
   const s=pagesState(f,fps);assert.ok(s.night>=0&&s.night<=1);
   s.turns.forEach(p=>assert.ok(p>=0&&p<=1));
   for(let i=0;i<5;i++)Object.values(flyoverTower(s.ms,i)).forEach(v=>assert.ok(Number.isFinite(v)));
  }
 }
});
test('history contains completed page turns and both day and night before awakening',()=>{
 const states=Array.from({length:240},(_,f)=>pagesState(540+f,30));
 assert.ok(Math.max(...states.map(s=>s.night))>.99);
 assert.ok(Math.min(...states.map(s=>s.night))<.01);
 assert.deepEqual(pagesState(779,30).turns,[1,1,1,1]);
 assert.ok(states.every(s=>s.shot==='history'));
 assert.equal(pagesState(929,30).shot,'awakening');
});
