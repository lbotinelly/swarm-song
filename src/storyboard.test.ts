import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {shotAt,middleTravel,gogglesAt,firstGenerationGoggles,objectorScreenX,middleGround,middleForestCount,craftFriendAt,crowdStrideAt,warningRunnerAt} from './story-blocking.ts';
import {layoutWords,intersects,type Phrase} from './lyrics.ts';
const board=JSON.parse(readFileSync('assets/milestone8/storyboard.json','utf8'));
const lyrics=JSON.parse(readFileSync('assets/milestone7/timeline.json','utf8'));
test('all 7884 frames have one shot, with integer contiguous master timings',()=>{
 assert.equal(board.shots[0].startMs,0);assert.equal(board.shots.at(-1).endMs,262800);
 assert.equal(new Set([...board.shots.map((s:any)=>s.id),board.postSong.id]).size,board.shots.length+1);
 for(let i=0;i<board.shots.length;i++){const s=board.shots[i];assert(Number.isInteger(s.startMs)&&Number.isInteger(s.endMs));assert(s.endMs>s.startMs);if(i)assert.equal(s.startMs,board.shots[i-1].endMs);}
 for(let f=0;f<7884;f++)assert(shotAt(board.shots,f*1000/30));
 assert.equal(board.postSong.excludedFromMaster,true);assert.equal(board.postSong.startMs,null);
});
test('approved inputs remain byte identical',()=>{for(const [path,hash] of Object.entries(board.protectedInputs))assert.equal(createHash('sha256').update(readFileSync(path)).digest('hex'),hash,path);});
test('camera and stopped group hold while passing crowd remains independently time-driven',()=>{
 assert.equal(middleTravel(92300),middleTravel(94500));assert.equal(middleTravel(94500),middleTravel(96820));
 assert(objectorScreenX(90060)>1920);assert(objectorScreenX(92300)<1400);
 for(const ms of [90060,90700,91500,92300,96820,98000])assert.equal(objectorScreenX(ms)+middleTravel(ms),2100);
 assert(middleTravel(98000)>middleTravel(96820));assert(Math.abs(middleTravel(92250)-middleTravel(92249))<.001);
});
test('goggle chronology and true blackout are explicit',()=>{
 for(const ms of [0,23000,42000,44899,153000,175000])assert.equal(firstGenerationGoggles(ms),false);
 for(const ms of [44900,55000,85000,100000,129000,140000])assert.equal(firstGenerationGoggles(ms),true);
 assert.equal(firstGenerationGoggles(214000,true),true);
 for(const ms of [13000,24000,153000,175000])assert.notEqual(gogglesAt(ms),'worn');
 assert.equal(gogglesAt(45500),'worn');assert.equal(gogglesAt(129000),'cache');assert.equal(gogglesAt(197000),'moving');assert.equal(gogglesAt(199000),'worn');
 const black=board.shots.find((s:any)=>s.scene==='black');assert.deepEqual([black.startMs,black.endMs],[142000,144000]);
});
test('craft friends continue across the cut and leave together without resetting',()=>{
 for(const i of [1,2] as const){
  const before=craftFriendAt(46499,i),after=craftFriendAt(46500,i);
  assert(Math.abs(before.x-after.x)<.2);assert(Math.abs(before.y-after.y)<.2);
  assert.equal(craftFriendAt(44900,i).facing,-1);
  assert.equal(craftFriendAt(51000,i).facing,1);
  assert.equal(craftFriendAt(48000,i).walking,false);
  assert.equal(craftFriendAt(51000,i).walking,true);
  assert(craftFriendAt(54900,i).x>craftFriendAt(51000,i).x+300);
 }
 const gap=(ms:number)=>1440+craftFriendAt(ms,2).x-1150-craftFriendAt(ms,1).x;
 assert.equal(gap(48000),190);assert(Math.abs(gap(54000)-170)<.001);
});
test('individual running stays forward, varies pace, and preserves the warning stop',()=>{
 const samples=Array.from({length:301},(_,f)=>90060+f*1000/30);
 for(let i=0;i<6;i++){
  const forward=samples.map(ms=>crowdStrideAt(ms,90060,i,300));
  const reverse=[...samples].reverse().map(ms=>crowdStrideAt(ms,90060,i,300)).reverse();
  assert.deepEqual(reverse,forward);
  for(let f=1;f<forward.length;f++)assert(forward[f].distance>forward[f-1].distance);
  const velocities=forward.slice(1).map((s,f)=>s.distance-forward[f].distance);
  assert(Math.max(...velocities)-Math.min(...velocities)>.8);
 }
 assert.notEqual(crowdStrideAt(91000,90060,0,300).y,crowdStrideAt(91000,90060,1,300).y);
 for(let i=0;i<3;i++){
  assert.deepEqual(warningRunnerAt(93000,i),warningRunnerAt(96000,i));
  assert.equal(warningRunnerAt(93000,i).walking,false);
  assert.equal(warningRunnerAt(97800,i).walking,true);
 }
 for(const ms of samples.filter(ms=>ms<98000)){
  const xs=[0,1,2].map(i=>warningRunnerAt(ms,i).x);
  assert(xs[1]-xs[0]>130&&xs[2]-xs[1]>130);
 }
 assert(crowdStrideAt(96000,90060,0,300).distance>crowdStrideAt(93000,90060,0,300).distance);
});
test('caption glyph bounds clear the upper story zone',()=>{
 for(const p of lyrics.phrases as Phrase[])for(const w of layoutWords(p))assert(!intersects({x:w.x-18,y:w.y-18,w:w.w+36,h:w.font*1.7+36},{x:0,y:0,w:1920,h:625}),p.id);
});


test('finite parallax tracks cover every middle-act frame without a wrap',()=>{
 for(let frame=2490;frame<3360;frame++){
  const ms=frame*1000/30,travel=middleTravel(ms);
  const left=middleGround.x-travel*middleGround.rate;
  const right=left+(middleGround.count-1)*middleGround.spacing+middleGround.width;
  assert(left<=0&&right>=1920,`Ground coverage at ${ms}`);
  assert(430+(middleForestCount-1)*270-travel*.45>=1920,`Forest coverage at ${ms}`);
  assert(middleGround.spacing<=middleGround.width);
 }
});
