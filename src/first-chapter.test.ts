import {test} from 'node:test';
import assert from 'node:assert/strict';
import {chapterAt,chapterCuts} from './first-chapter.ts';
import {agent407,attachmentPoint} from './sprites.ts';
test('all 1260 master frames have finite deterministic chapter blocking',()=>{
 const forward=Array.from({length:1260},(_,f)=>chapterAt(f*1000/30));
 for(let f=1259;f>=0;f--){assert.deepEqual(chapterAt(f*1000/30),forward[f]);for(const v of Object.values(forward[f]))if(typeof v==='number')assert.ok(Number.isFinite(v));}
 assert.equal(chapterCuts.at(-1),42000);
});
test('task is placed before investigation reaches the original V3 start',()=>{
 assert.equal(chapterAt(20000).board,0);assert.equal(chapterAt(20700).board,1);
 assert.equal(chapterAt(23000).x,1335);assert.equal(chapterAt(23000).y,676);
 assert.equal(chapterAt(22999).opened,.06);
});
test('V3 grip and retreat retain exact paw to paper-tip contact',()=>{
 const [hx,hy]=attachmentPoint(agent407.kneeling,'rightHand',.43);
 for(let ms=24750;ms<=25900;ms+=10){const a=chapterAt(ms),pull=(a.opened-.06)/.94;assert.ok(Math.abs(a.x+hx-(1790-468*pull))<.001);assert.ok(Math.abs(a.y+hy-650.2)<.001);}
});
test('messages clear the physical terminal before the reverse-room cut',()=>{
 assert.equal(chapterAt(29600).outgoing,1400);assert.equal(chapterAt(30900).outgoing,1890);
 assert.equal(chapterAt(31200).incoming,1890);assert.equal(chapterAt(32000).incoming,1360);
 assert.equal(chapterAt(35000).reply,1890);assert.equal(chapterAt(35200).answer,1890);
 assert.equal(chapterAt(36000).answer,1360);assert.equal(chapterAt(41000).unfolding,1);
});
