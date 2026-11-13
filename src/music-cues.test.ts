import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {musicStateAt,type MusicCue} from './music-cues.ts';
import {frameAt} from './timeline.ts';
const data=JSON.parse(readFileSync('assets/milestone7/musical-cues.json','utf8'));
const cues=data.cues as MusicCue[];
test('musical map uses the unchanged lyric/master clock and bounded candidate intervals',()=>{
 assert.equal(data.lyricTimelineSha256,createHash('sha256').update(readFileSync('assets/milestone7/timeline.json')).digest('hex'));
 assert.equal(new Set(cues.map(c=>c.id)).size,cues.length);
 for(const c of cues){for(const n of [c.startMs,c.peakMs,c.endMs])assert.ok(Number.isSafeInteger(n));assert.ok(c.startMs>=0&&c.startMs<c.peakMs&&c.peakMs<c.endMs&&c.endMs<=262800);}
 for(let i=1;i<cues.length;i++)assert.ok(cues[i].startMs>=cues[i-1].endMs,'One legible cue card at a time');
});
test('musical gestures seek deterministically and respect cue bounds at 24/30/60fps',()=>{
 for(const c of cues)for(const fps of [24,30,60]){
  const first=frameAt(c.startMs,fps);assert.notEqual(musicStateAt((first-1)*1000/fps,cues).active?.id,c.id);
  for(const ms of [first*1000/fps,c.peakMs,c.endMs-1,c.endMs]){
   const state=musicStateAt(ms,cues);musicStateAt(260000,cues);assert.deepEqual(musicStateAt(ms,cues),state);
   assert.ok(Number.isFinite(state.y)&&Math.abs(state.y)<=42);assert.ok(Math.abs(state.rotation)<=7);
   assert.ok(state.scaleX>=1&&state.scaleX<=1.035&&state.scaleY>=.975&&state.scaleY<=1.035);
  }
  const end=musicStateAt(c.endMs,[c]);assert.equal(end.y,0);assert.equal(end.rotation,0);assert.equal(end.scaleX,1);
  if(!c.enabled){const held=musicStateAt(c.peakMs,[c]);assert.equal(held.pose,'standing');assert.equal(held.y,0);assert.equal(held.rotation,0);}
 }
});
