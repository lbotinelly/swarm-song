import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {musicStateAt,percussionStateAt,applyMusicDirection,percussionAllowedAt,type MusicCue} from './music-cues.ts';
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


test('percussion preserves reviewed cues, never starts early, and stays subtle under major gestures',()=>{
 const beats=JSON.parse(readFileSync('assets/milestone7/percussion-cues.json','utf8'));
 assert.equal(beats.approvedCueMapSha256,createHash('sha256').update(readFileSync('assets/milestone7/musical-cues.json')).digest('hex'));
 const extra=JSON.parse(readFileSync('assets/milestone7/musical-cue-additions.json','utf8')).cues as MusicCue[];
 const all=[...cues,...extra].sort((a,b)=>a.startMs-b.startMs);
 for(let i=1;i<all.length;i++)assert.ok(all[i].startMs>=all[i-1].endMs,'New cues must not displace reviewed moments');
 for(const [i,e] of beats.events.entries()){
  if(i)assert.ok(e.atMs-beats.events[i-1].atMs>=300);
  assert.equal(percussionStateAt(e.atMs-1,[e]).pulse,0);
  const apex=percussionStateAt(e.atMs+130,beats.events);
  percussionStateAt(262000,beats.events);assert.deepEqual(percussionStateAt(e.atMs+130,beats.events),apex);
  assert.ok(apex.y>=-11&&apex.y<=0);assert.ok(Math.abs(apex.rotation)<=2.5);
  assert.ok(Math.abs(percussionStateAt(e.atMs+130,beats.events,true).y)<=Math.abs(apex.y)*.201);
  assert.equal(percussionStateAt(e.atMs+260,[e]).pulse,0);
 }
});


test('director revisions preserve source cues and protect anticipation rests',()=>{
 const direction=JSON.parse(readFileSync('assets/milestone7/music-director-corrections.json','utf8'));
 assert.equal(direction.baselineMapSha256,createHash('sha256').update(readFileSync('assets/milestone7/musical-cues.json')).digest('hex'));
 const extra=JSON.parse(readFileSync('assets/milestone7/musical-cue-additions.json','utf8')).cues as MusicCue[];
 const source=[...cues,...extra];const before=JSON.stringify(source);const directed=applyMusicDirection(source,direction);
 assert.equal(JSON.stringify(source),before);
 for(let i=1;i<directed.length;i++)assert.ok(directed[i].startMs>=directed[i-1].endMs,directed[i].id);
 for(const c of directed){assert.ok(c.startMs<c.peakMs&&c.peakMs<c.endMs);const state=musicStateAt(c.peakMs,directed);musicStateAt(260000,directed);assert.deepEqual(musicStateAt(c.peakMs,directed),state);assert.ok(Math.abs(state.y)<=48&&state.scaleX<=1.08);}
 for(const id of ['strings-first-bloom','strings-second-lift']){const old=source.find(c=>c.id===id)!;const revised=directed.find(c=>c.id===id)!;assert.equal(revised.peakMs-revised.startMs,1.5*(old.peakMs-old.startMs));}
 assert.equal(percussionAllowedAt(13999,direction),false);assert.equal(percussionAllowedAt(14000,direction),true);
 for(const rest of direction.percussion.rests){assert.equal(percussionAllowedAt(rest.startMs,direction),false);assert.equal(percussionAllowedAt(rest.endMs-1,direction),false);assert.equal(percussionAllowedAt(rest.endMs,direction),true);}
 assert.equal(musicStateAt(25600,directed).pose,'surprised');assert.equal(musicStateAt(210000,directed).pose,'cheer');
});
