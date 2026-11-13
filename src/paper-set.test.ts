import {test} from 'node:test';
import assert from 'node:assert/strict';
import {paperState} from './paper-set.ts';
test('paper cues seek identically at 24/30/60fps and remain bounded',()=>{
 for(const fps of [24,30,60]) {
  const sequential=Array.from({length:12*fps},(_,f)=>paperState(f*1000/fps));
  for(let f=sequential.length-1;f>=0;f--) {
   assert.deepEqual(paperState(f*1000/fps),sequential[f]);
   for(const [key,value] of Object.entries(sequential[f]))if(key!=='inside')assert.ok(Number(value)>=0&&Number(value)<=1);
  }
 }
});
test('retreat precedes curtain closure, lamp settles, and cut preserves room state',()=>{
 assert.equal(paperState(3800).retreat,0);assert.equal(paperState(5800).retreat,1);
 assert.equal(paperState(4700).close,0);assert.equal(paperState(6500).close,1);
 assert.equal(paperState(7000).light,1);assert.equal(paperState(8000).light,0);
 for(const ms of [8000,8499,8500,12000])assert.equal(paperState(ms).light,0);
 const {inside:a,...before}=paperState(8499),{inside:b,...after}=paperState(8500);
 assert.equal(a,false);assert.equal(b,true);
 for(const key of ['retreat','close','light'] as const)assert.equal(before[key],after[key]);
});
