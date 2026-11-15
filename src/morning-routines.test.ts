import {test} from 'node:test';
import assert from 'node:assert/strict';
import {morningAt,wakeTimes} from './morning-routines.ts';
test('every apartment wakes independently and has purposeful activity through the excerpt',()=>{
 assert.equal(new Set(wakeTimes).size,8);
 for(let index=0;index<8;index++)for(let ms=wakeTimes[index];ms<=20000;ms+=100){
  const a=morningAt(ms,index);assert.notEqual(a.action,'sleep');assert.ok(Number.isFinite(a.x)&&Number.isFinite(a.y));
 }
 assert.equal(morningAt(19000,3).action,'read');
 assert.equal(morningAt(19000,4).action,'read');
 assert.equal(morningAt(19000,5).action,'sweep');
});
test('hero yawn and stretch have readable holds before pickup and reading',()=>{
 for(const [ms,action] of [[13000,'rise'],[14000,'yawn'],[15200,'stretch'],[16500,'walk'],[17500,'pickup'],[18500,'read']] as const)assert.equal(morningAt(ms,4).action,action);
});
test('room traversal stays continuous across all action boundaries',()=>{
 for(let i=0;i<8;i++)for(let ms=8001;ms<=20000;ms++){
  const a=morningAt(ms,i),b=morningAt(ms-1,i);
  assert.ok(Math.abs(a.x-b.x)<2,`floor ${i} jumps horizontally at ${ms}`);
  assert.ok(Math.abs(a.y-b.y)<8,`floor ${i} jumps vertically at ${ms}`);
 }
});
test('coffee is returned to the station before the empty-paw walk to the broom',()=>{
 assert.equal(morningAt(15600,5).action,'setdown');
 assert.ok(morningAt(15799,5).x<451);
 assert.equal(morningAt(15800,5).action,'walk');
 assert.equal(morningAt(15800,5).x,450);
 assert.ok(Math.abs(morningAt(15800,5).y-morningAt(15799,5).y)<.01);
 assert.ok(Math.abs(morningAt(15800,5).angle-morningAt(15799,5).angle)<.01);
});
