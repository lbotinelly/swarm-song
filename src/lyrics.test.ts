import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {visiblePhrases,layoutWords,wordMotion,conflicts,type Phrase} from './lyrics.ts';
import {frameAt} from './timeline.ts';
const data=JSON.parse(readFileSync('assets/milestone7/timeline.json','utf8'));const ps=data.phrases as Phrase[];
test('entire editorial lyric sequence covered once, repeated occurrences have unique IDs',()=>{
 const source=readFileSync('assets/lyrics.txt','utf8').split('---').at(-1)!.split('\n').filter(l=>l.trim()&&!l.startsWith('[')).join(' ');
 const normalize=(t:string)=>t.toLowerCase().replace(/[^a-z0-9]/g,'');
 assert.equal(normalize(ps.flatMap(p=>p.words.map(w=>w.text)).join(' ')),normalize(source));
 const ids=ps.flatMap(p=>[p.id,...p.words.map(w=>w.id)]);assert.equal(new Set(ids).size,ids.length);
 assert.equal(data.audio.frames,12614400);assert.equal(data.audio.sampleRate,48000);assert.equal(data.durationMs,262800);
});
test('intervals are master-relative; collapsed candidates remain flagged, never falsely approved',()=>{
 for(const p of ps){assert.ok(p.startMs>=0&&p.endMs>=p.startMs&&p.endMs<=262800);for(const w of p.words){assert.ok(Number.isInteger(w.startMs)&&Number.isInteger(w.endMs));assert.ok(w.endMs>=w.startMs);if(w.endMs===w.startMs)assert.ok(w.issues.includes('collapsed-boundary'));assert.notEqual(w.status,'human-reviewed');}}
 assert.equal(ps.find(p=>p.id==='phrase-04-1')!.startMs,24160);assert.equal(ps.find(p=>p.id==='phrase-04-2')!.startMs,26240);
 const ss=data.sections;assert.equal(ss[0].startMs,0);for(let i=1;i<ss.length;i++)assert.equal(ss[i].startMs,ss[i-1].endMs);assert.equal(ss.at(-1).endMs,262800);
});
test('default layout fits frame; scene studies protect faces and gestures',()=>{
 for(const p of ps)for(const w of layoutWords(p)){assert.ok(w.x>=60&&w.x+w.w<=1860,`${w.word.id} horizontal`);assert.ok(w.y>=60&&w.y+w.font*1.7<1030,`${w.word.id} vertical`);}
 assert.deepEqual(conflicts(ps.find(p=>p.id==='phrase-04-1')!,[{x:810,y:70,w:500,h:640}],'lower-center'),[]);
 assert.deepEqual(conflicts(ps.find(p=>p.id==='phrase-11-1')!,[{x:740,y:820,w:460,h:200},{x:900,y:455,w:370,h:330}],'village-caption'),[]);
});
test('direct/reverse seeks and frame quantization at 24/30/60 fps',()=>{
 for(const fps of [24,30,60])for(const p of ps){const f=frameAt(p.presentation.startMs,fps);assert.ok(f*1000/fps>=p.presentation.startMs);assert.ok(f*1000/fps-p.presentation.startMs<1000/fps+.00001);for(const w of p.words){const a=wordMotion(p,w,f*1000/fps);wordMotion(p,w,262000);assert.deepEqual(wordMotion(p,w,f*1000/fps),a);assert.ok(Object.values(a).every(Number.isFinite));}}
 const states=ps.map(p=>visiblePhrases(ps,p.startMs).map(p=>p.id));ps.slice().reverse().forEach(p=>visiblePhrases(ps,p.startMs));assert.deepEqual(ps.map(p=>visiblePhrases(ps,p.startMs).map(p=>p.id)),states);
});

test('every word candidate can perform before its phrase clears',()=>{for(const p of ps)for(const w of p.words)assert.ok(w.startMs<p.presentation.endMs+420, w.id);});
