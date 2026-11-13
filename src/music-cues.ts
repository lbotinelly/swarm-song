import {clamp,smooth} from './lyrics.ts';
export type MusicCue={id:string;sectionId:string;startMs:number;peakMs:number;endMs:number;label:string;emotionalRole:string;action:string;enabled:boolean;uncertaintyMs:number};
export type PercussionAccent={atMs:number;strength:number};
export type MusicDirection={overrides:Record<string,{peakMs:number;endMs:number}>;newCues:MusicCue[];percussion:{startMs:number;rests:{startMs:number;endMs:number}[]}};
export function applyMusicDirection(cues:readonly MusicCue[],direction:MusicDirection){
 return [...cues.map(c=>({...c,...direction.overrides[c.id]})),...direction.newCues].sort((a,b)=>a.startMs-b.startMs);
}
export function percussionAllowedAt(ms:number,direction:MusicDirection){
 return ms>=direction.percussion.startMs&&!direction.percussion.rests.some(r=>ms>=r.startMs&&ms<r.endMs);
}

export function percussionStateAt(ms:number,accents:readonly PercussionAccent[],majorGesture=false){
 let index=accents.length-1;
 while(index>=0&&accents[index].atMs>ms)index--;
 const hit=accents[index];const age=hit?ms-hit.atMs:Infinity;
 if(age>=260)return {y:0,rotation:0,scaleY:1,pulse:0};
 const pulse=Math.sin(Math.PI*age/260)**2;
 const quiet=ms>=111000&&ms<153000;
 const amount=(.4+.6*hit.strength)*(majorGesture?.2:1)*(quiet?.3:1);
 return {y:-11*pulse*amount,rotation:(index%2?1:-1)*2.5*pulse*amount,scaleY:1-.018*pulse*amount,pulse};
}

// One small, seekable performance for this solo-agent listening test.
// The peak is the gesture's apex, not the start of an arbitrary repeating loop.
export function musicStateAt(ms:number,cues:readonly MusicCue[]){
 const active=cues.find(c=>ms>=c.startMs&&ms<c.endMs);
 const neutral={pose:'standing' as 'standing'|'singing'|'cheer'|'surprised',y:0,rotation:0,scaleX:1,scaleY:1,glow:0};
 if(!active?.enabled)return {active,...neutral};
 const rise=clamp((ms-active.startMs)/(active.peakMs-active.startMs));
 const fall=clamp((ms-active.peakMs)/(active.endMs-active.peakMs));
 const lift=ms<=active.peakMs?smooth(rise):1-smooth(fall);
 if(active.action==='rhythm')return {active,...neutral};
 if(active.action==='surprise'){
  const after=ms>=active.peakMs;
  return {active,...neutral,pose:(after&&fall<.7?'surprised':'standing') as 'surprised'|'standing',y:after?-12*Math.sin(Math.PI*fall):3*rise,rotation:after?0:-5*smooth(rise),scaleY:after?1:1-.02*rise};
 }
 if(active.action==='hesitate')return {active,...neutral,rotation:ms<active.peakMs?-6*smooth(rise):-6*(1-smooth(fall))*Math.cos(fall*Math.PI*3)};
 if(active.action==='grand-swell')return {active,...neutral,pose:(lift>.65?'cheer':lift>.18?'singing':'standing') as 'cheer'|'singing'|'standing',y:-48*lift,rotation:-4*lift,scaleX:1+.08*lift,scaleY:1+.08*lift,glow:.48*lift};
 if(active.action==='hop')return {active,...neutral,pose:(lift>.15?'cheer':'standing') as 'cheer'|'standing',y:-42*lift,rotation:6*Math.sin(Math.PI*2*clamp((ms-active.startMs)/(active.endMs-active.startMs)))*lift,scaleX:1+.025*lift,scaleY:1-.025*lift};
 if(active.action==='settle')return {active,...neutral,y:4*lift,rotation:-5*lift,scaleX:1+.015*lift,scaleY:1-.025*lift};
 if(active.action==='sway')return {active,...neutral,rotation:7*Math.sin(Math.PI*2*clamp((ms-active.startMs)/(active.endMs-active.startMs)))*lift,y:-5*lift};
 return {active,...neutral,pose:(lift>.18?'singing':'standing') as 'singing'|'standing',y:-20*lift,rotation:-3*lift,scaleX:1+.035*lift,scaleY:1+.035*lift,glow:.28*lift};
}
