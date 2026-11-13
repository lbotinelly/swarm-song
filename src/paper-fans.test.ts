import {test} from 'node:test';
import assert from 'node:assert/strict';
import {fanPower} from './paper-fans.ts';
test('fans coast monotonically to rest after lights fade, without seek history',()=>{
 const frames=Array.from({length:241},(_,f)=>fanPower(f*1000/30));
 for(let f=240;f>=0;f--)assert.deepEqual(fanPower(f*1000/30),frames[f]);
 assert.equal(fanPower(3000).darkness,0);assert.equal(fanPower(4500).darkness,1);
 let previousStep=Infinity;
 for(let f=91;f<=210;f++) {
  const step=frames[f].angleTop-frames[f-1].angleTop;
  assert.ok(step>=0&&step<=previousStep+1e-10);previousStep=step;
 }
 assert.deepEqual(fanPower(7000),fanPower(8000));
 assert.equal(fanPower(7000).angleTop,52);
});
