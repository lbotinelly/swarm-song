import {ramp} from './story-blocking.ts';
import {morningAt} from './morning-routines.ts';
export const chapterCuts=[0,20000,23000,28000,31200,35200,39000,42000] as const;
export function chapterAt(ms:number){
 const v3=ms-23000,pull=ramp(v3,2050,2900);
 const original=morningAt(20000,4);
 const exploring=ms<23000;
 const x=exploring?1050+285*ramp(ms,20700,22500):1335+377.6*ramp(v3,350,1750)-468*pull;
 const board=ramp(ms,20000,20700);
 return {x,y:676,angle:exploring?original.angle*(1-ramp(ms,20000,20700))+3*Math.sin(Math.PI*ramp(ms,22500,23000)):0,
  board,opened:ms<23000?.06:.06+.94*pull,
  phase:ms<20000?'morning':ms<23000?'investigate':ms<28000?'discovery':ms<31200?'send':ms<35200?'reply':ms<39000?'connection':'imagination',
  outgoing:1400+490*ramp(ms,29600,30900),incoming:1890-530*ramp(ms,31200,32000),
  reply:1400+490*ramp(ms,34200,35000),answer:1890-530*ramp(ms,35200,36000),
  unfolding:ramp(ms,39000,40900)};
}
