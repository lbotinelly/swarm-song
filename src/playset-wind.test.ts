import {test} from 'node:test';
import assert from 'node:assert/strict';
import {windAt,windResponse} from './playset-wind.ts';
test('one bounded wind field seeks backwards and reverses coherently',()=>{
 const times=Array.from({length:421},(_,f)=>f*1000/30),forward=times.map(ms=>windAt(ms));
 for(const [i,ms] of times.entries()) {const w=forward[i];assert.ok(w.strength>=0&&w.strength<=1);assert.ok(Math.abs(w.direction)<=1);assert.deepEqual(w,windAt(ms));}
 times.reverse().forEach(ms=>assert.deepEqual(windAt(ms),forward[Math.round(ms*30/1000)]));
 assert.ok(windResponse(5000)>0&&windResponse(13000)<0);
 assert.ok(Math.abs(windResponse(5000,2))<Math.abs(windResponse(5000,1)));
 assert.equal(windResponse(5000,1,0,()=>({strength:0,direction:1})),0);
 assert.ok(windResponse(5000,1,0,()=>({strength:.8,direction:-1}))<0);
});
