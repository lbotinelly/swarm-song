import test from 'node:test';
import assert from 'node:assert/strict';
import {frameAt, registry, stateAt} from './timeline.ts';

test('cues never start early, with less than one frame of delay at 24/30/60 fps', () => {
  for (const fps of [24,30,60]) for (const cue of registry.cues) {
    const f = frameAt(cue.atMs,fps);
    assert.ok(f*1000/fps >= cue.atMs);
    assert.ok(f*1000/fps-cue.atMs < 1000/fps);
  }
});
test('pose swaps and emote half-open boundaries, including overlap across pose swap', () => {
  for (const fps of [24,30,60]) {
    const kneel = frameAt(1750,fps);
    assert.equal(stateAt(kneel-1,fps).pose,'standing');
    assert.equal(stateAt(kneel,fps).pose,'kneeling');
    assert.equal(stateAt(kneel,fps).emotes[0].kind,'question');
    assert.equal(stateAt(frameAt(3000,fps),fps).emotes.length,0);
    assert.equal(stateAt(frameAt(3000,fps),fps).pose,'standing');
    assert.equal(stateAt(frameAt(3240,fps)-1,fps).emotes.length,0);
    assert.equal(stateAt(frameAt(3240,fps),fps).emotes[0].kind,'surprise');
  }
});
test('direct reverse/random seeking matches forward evaluation', () => {
  const baseline = Array.from({length:240},(_,f)=>stateAt(f,30));
  for (const f of [239,0,201,57,170,100,29,170,0]) assert.deepEqual(stateAt(f,30),baseline[f]);
  assert.notEqual(stateAt(170,30).rotation,0);
  assert.equal(stateAt(230,30).rotation,0);
});
test('reject fractional or invalid authoring times', () => {
  for (const value of [-1,0.5,NaN,Infinity]) assert.throws(()=>frameAt(value,30));
});
