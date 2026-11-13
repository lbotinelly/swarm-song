import test from 'node:test';
import assert from 'node:assert/strict';
import {nightSkyState} from './night-sky.ts';
test('sky direct and reverse seeking matches sequential state at 24/30/60fps',()=>{
 for(const fps of [24,30,60]) {
  const states=Array.from({length:fps*6},(_,f)=>nightSkyState(f,fps));
  for(let f=states.length-1;f>=0;f-=7) assert.deepEqual(nightSkyState(f,fps),states[f]);
  assert.deepEqual(nightSkyState(fps*3,fps),nightSkyState(90,30));
 }
});
test('camera has differential plane motion, finite values and overscan throughout shot',()=>{
 for(let f=0;f<180;f++) {
  const s=nightSkyState(f,30);
  for(const value of Object.values(s)) assert.ok(Number.isFinite(value));
  assert.ok(s.backgroundY<=0 && s.backgroundY+2100*941/1672>=1080);
 }
 const first=nightSkyState(0,30),last=nightSkyState(179,30);
 assert.ok(last.cloudY-first.cloudY > 3*(last.backgroundY-first.backgroundY));
 assert.ok(last.planeX>first.planeX && last.planeY<first.planeY);
});
