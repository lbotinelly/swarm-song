import {ramp} from './story-blocking.ts';
// Shot-specific blocking for the eight apartments; master milliseconds throughout.
export const morningRoles=['news','coffee','mail','news','tasks','coffee','tidy','mail'] as const;
export const wakeTimes=[8100,8900,9300,9400,12800,8700,9800,8500] as const;
export type MorningAction='sleep'|'rise'|'yawn'|'stretch'|'walk'|'pickup'|'read'|'brew'|'savor'|'setdown'|'sweep'|'deliver';
export function morningAt(ms:number,index:number){
 const role=morningRoles[index],start=wakeTimes[index],t=ms-start,hero=index===4;
 let action:MorningAction='sleep',x=1315,y=560;
 const rise=600,yawn=hero?1800:1500,stretch=hero?3100:2600,arrive=hero?4400:4000;
 const destination=role==='coffee'?620:role==='mail'?480:hero?1050:650;
 if(t>=0)action='rise';if(t>=rise)action='yawn';if(t>=yawn)action='stretch';
 if(t>=stretch){action='walk';const travel=ramp(t,stretch,arrive);x=1315+(destination-1315)*travel;y=560+116*travel;}
 if(t>=arrive){
  if(role==='coffee'){
   action=t<arrive+2100?'brew':t<arrive+2550?'savor':t<arrive+3100?'setdown':t<arrive+4100?'walk':t<arrive+4700?'pickup':'sweep';
   if(t>=arrive+2550)x=620-170*ramp(t,arrive+2550,arrive+3100);
   if(t>=arrive+3100)x=450+650*ramp(t,arrive+3100,arrive+4100);
   if(action==='sweep')x=1100-180*ramp(t,arrive+4700,arrive+9000)+24*Math.sin((t-arrive-4700)/800);
  }else if(role==='tidy'){action=t<arrive+700?'pickup':'sweep';x=650+120*Math.sin((t-arrive)/1700);}
  else if(role==='mail'){action=t<arrive+700?'pickup':t<arrive+5200?'deliver':'read';x=480+800*ramp(t,arrive+700,arrive+5200);}
  else action=t<arrive+700?'pickup':'read';
 }
 const moving=action==='walk'||action==='deliver',phase=t/(hero?175:190+index*13);
 const walkStart=t<arrive?stretch:role==='coffee'?arrive+3100:arrive+700;
 const walkEnd=t<arrive?arrive:role==='coffee'?arrive+4100:arrive+5200;
 const gait=ramp(t,walkStart,walkStart+180)*(1-ramp(t,walkEnd-180,walkEnd));
 const angle=action==='yawn'?-3*Math.sin(Math.PI*ramp(t,rise,yawn)):action==='stretch'?5*Math.sin(Math.PI*ramp(t,yawn,stretch)):action==='read'?2.2*Math.sin(t/820+index):action==='sweep'?3*Math.sin(t/750):action==='setdown'?-6*Math.sin(Math.PI*ramp(t,arrive+2550,arrive+3100)):action==='brew'?-4*Math.sin(t/480):moving?2*Math.sin(phase)*gait:.7*Math.sin(t/900+index);
 const bop=moving?-7*Math.abs(Math.sin(phase))*gait:0;
 return {role,action,x,y:y+bop,angle,phase,t,hero,pickup:ramp(t,arrive,arrive+700)};
}
