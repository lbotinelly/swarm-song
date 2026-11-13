import test from 'node:test';
import assert from 'node:assert/strict';
import {agent407,attachmentPoint} from './sprites.ts';

test('all approved poses have in-canvas anchors and identical production pixel density',()=>{
  assert.equal(Object.keys(agent407).length,6);
  for(const sprite of Object.values(agent407)) {
    assert.equal(sprite.width,1400); assert.equal(sprite.height,1500);
    for(const [x,y] of Object.values(sprite.anchors)) {
      assert.ok(x>=0 && x<sprite.width && y>=0 && y<sprite.height);
    }
    assert.deepEqual(attachmentPoint(sprite,'footPivot',0.54),[0,0]);
  }
});
test('attachment points remain in the body coordinate system across pose changes',()=>{
  const standing=attachmentPoint(agent407.standing,'mouth',1);
  const kneeling=attachmentPoint(agent407.kneeling,'mouth',1);
  assert.deepEqual(standing,[45,-562]);
  assert.deepEqual(kneeling,[125,-315]);
  // Rotation inheritance is visually reviewed on rendered frames: image and
  // emote are siblings under the same CSS foot-origin transform, not a new rig.
  assert.deepEqual(attachmentPoint(agent407.standing,'mouth',0.5),[22.5,-281]);
});
