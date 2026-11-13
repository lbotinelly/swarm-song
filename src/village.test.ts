import {test} from 'node:test';
import assert from 'node:assert/strict';
import {villageState} from './village.ts';
test('village cues seek directly at 24/30/60fps without accumulating state',()=>{
 for(const fps of [24,30,60]) {
  const frames=Array.from({length:14*fps},(_,f)=>villageState(f*1000/fps));
  for(let f=frames.length-1;f>=0;f-=7)assert.deepEqual(villageState(f*1000/fps),frames[f]);
  frames.forEach(s=>Object.values(s).forEach(v=>assert.ok(Number.isFinite(v))));
 }
});
test('paper tracks settle before smoke and characters; parallax separates layers',()=>{
 assert.equal(villageState(6300).houseA,1);assert.equal(villageState(6300).smokeRise,0);
 assert.equal(villageState(6800).smokeRise,0);assert.equal(villageState(10500).smokeRise,180);
 assert.ok(villageState(12000).nearX<villageState(12000).midX);
 assert.ok(villageState(12000).midX<villageState(12000).farX);
 assert.equal(villageState(10200).courierX,1225);assert.equal(villageState(10200).courierHop,0);
 assert.equal(villageState(11500).share,1);
 // 100px-wide smoke strip has a 321px stem/curl extent. Even at maximum
 // feed its bottom remains beyond the chimney channel's 240px lower lip.
 assert.ok(240-villageState(14000).smokeRise+321>240);
});
