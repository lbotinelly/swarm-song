import {test} from 'node:test';
import assert from 'node:assert/strict';
import {attachItem,pickAt,type ItemPose} from './item-actions.ts';
const from:ItemPose={x:40,y:100,angle:0,scale:1},to:ItemPose={x:240,y:100,angle:10,scale:.8};
const cue={start:1000,duration:700,from,to,height:60};
test('item rests, arcs, catches exactly and follows the live mount',()=>{
 assert.deepEqual(pickAt(999,cue),{phase:'resting',pose:from});
 assert.equal(pickAt(1350,cue).pose.y,40);
 assert.deepEqual(pickAt(1700,cue),{phase:'held',pose:to});
 assert.deepEqual(pickAt(2000,{...cue,to:{...to,x:400}}).pose,{...to,x:400});
 const times=[0,1000,1350,1699,1700,3000],forward=new Map(times.map(ms=>[ms,pickAt(ms,cue)]));
 for(const ms of times.reverse())assert.deepEqual(pickAt(ms,cue),forward.get(ms));
 assert.throws(()=>pickAt(0,{...cue,duration:0}));
 const mirrored={...cue,to:{...to,flip:true}};
 assert.ok(Math.abs(pickAt(1699,mirrored).pose.facing!+1)<.00002);
 assert.equal(pickAt(1350,mirrored).pose.facing,0);
});
test('mirroring transforms every attachment offset and local rotation',()=>{
 const host={x:100,y:200,angle:90,scale:2,flip:true};
 const p=attachItem(host,{x:10,y:-20,angle:15,scale:.5});
 assert.ok(Math.abs(p.x-140)<1e-8);assert.ok(Math.abs(p.y-180)<1e-8);
 assert.equal(p.angle,75);assert.equal(p.scale,1);assert.equal(p.flip,true);
 // Goggles/head and mug/paw use the same transform; double mirroring cancels.
 assert.equal(attachItem(host,{x:0,y:-100,angle:0,scale:1,flip:true}).flip,false);
});
