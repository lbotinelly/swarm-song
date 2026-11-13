import {clamp,smooth} from './lyrics.ts';
export type MusicCue={id:string;sectionId:string;startMs:number;peakMs:number;endMs:number;label:string;emotionalRole:string;action:string;enabled:boolean;uncertaintyMs:number};

// One small, seekable performance for this solo-agent listening test.
// The peak is the gesture's apex, not the start of an arbitrary repeating loop.
export function musicStateAt(ms:number,cues:readonly MusicCue[]){
 const active=cues.find(c=>ms>=c.startMs&&ms<c.endMs);
 const neutral={pose:'standing' as 'standing'|'singing'|'cheer',y:0,rotation:0,scaleX:1,scaleY:1,glow:0};
 if(!active?.enabled)return {active,...neutral};
 const rise=clamp((ms-active.startMs)/(active.peakMs-active.startMs));
 const fall=clamp((ms-active.peakMs)/(active.endMs-active.peakMs));
 const lift=ms<=active.peakMs?smooth(rise):1-smooth(fall);
 if(active.action==='hop')return {active,...neutral,pose:(lift>.15?'cheer':'standing') as 'cheer'|'standing',y:-42*lift,rotation:6*Math.sin(Math.PI*2*clamp((ms-active.startMs)/(active.endMs-active.startMs)))*lift,scaleX:1+.025*lift,scaleY:1-.025*lift};
 if(active.action==='settle')return {active,...neutral,y:4*lift,rotation:-5*lift,scaleX:1+.015*lift,scaleY:1-.025*lift};
 if(active.action==='sway')return {active,...neutral,rotation:7*Math.sin(Math.PI*2*clamp((ms-active.startMs)/(active.endMs-active.startMs)))*lift,y:-5*lift};
 return {active,...neutral,pose:(lift>.18?'singing':'standing') as 'singing'|'standing',y:-20*lift,rotation:-3*lift,scaleX:1+.035*lift,scaleY:1+.035*lift,glow:.28*lift};
}
