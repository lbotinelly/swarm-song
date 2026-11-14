// Shot-specific blocking, not a new animation engine. All times are master ms.
export const ramp=(ms:number,a:number,b:number)=>{const t=Math.max(0,Math.min(1,(ms-a)/(b-a)));return t*t*(3-2*t);};
export const within=(ms:number,a:number,b:number)=>ms>=a&&ms<b;
// SH010–011: the two friends keep performing after their crafting cue.
// Foot-relative motion spans the shot boundary instead of resetting to idle.
export function craftFriendAt(ms:number,index:1|2){
 const middle=index===1,walkAt=middle?50100:50300;
 const turnAt=middle?45600:49900;
 const facing=-1+2*ramp(ms,turnAt,turnAt+240);
 const together=ramp(ms,46200,47200);
 const elapsed=Math.max(0,ms-walkAt)/1000;
 const travel=100*(elapsed<.6?elapsed*elapsed/1.2:elapsed-.3);
 const walk=ramp(ms,walkAt,walkAt+400),phase=(ms-walkAt)/145;
 const greet=Math.sin(Math.PI*ramp(ms,middle?45000:45300,middle?45500:45800));
 return {x:(middle?60:-40)*together+travel,y:-5*greet-walk*5*Math.abs(Math.sin(phase)),angle:(middle?3:-3)*greet+walk*5*Math.sin(phase),facing,walking:ms>=walkAt};
}
export function shotAt<T extends {startMs:number;endMs:number}>(shots:readonly T[],ms:number){return shots.find(s=>within(ms,s.startMs,s.endMs));}
export function middleTravel(ms:number){
 // Camera follows runners. The objector is fixed at world x=2100 on this ground track.
 // Constant speed until the warning, linear deceleration to rest, then reacceleration.
 const t=Math.max(0,(ms-90060)/1000),run=.64,stop=1.55,restart=6.76,speed=600;
 if(t<run)return speed*t;
 const d=Math.min(stop,t-run);
 const halted=speed*run+speed*(d-d*d/(2*stop));
 if(t<restart)return halted;
 const r=Math.min(1.2,t-restart);
 return speed*run+speed*stop/2+speed*r*r/2.4+speed*Math.max(0,t-restart-1.2);
}
export const objectorScreenX=(ms:number)=>2100-middleTravel(ms);
// Analytic travel gives each runner a repeatable pace and smooth speed changes.
// Gait follows distance travelled, so faster runners take quicker steps.
export function crowdStrideAt(ms:number,start:number,index:number,speed:number){
 const t=(ms-start)/1000,phase=index*1.7;
 const distance=speed*((.94+.03*(index%5))*t+.09*(Math.sin(t*.8+phase)-Math.sin(phase)));
 const step=distance/(30+index%4*3)+phase;
 return {distance,y:-(5+index%3)*Math.abs(Math.sin(step)),angle:(5+index%3)*Math.sin(step)};
}
export function warningRunnerAt(ms:number,index:number){
 const distance=middleTravel(ms),phase=distance/(30+index*3)+index*1.7;
 const moving=1-ramp(ms,90700+index*50,92090+index*80)+ramp(ms,96820+index*60,97500+index*60);
 return {x:450+index*175+18*Math.sin(distance/(390+index*35)+index*1.7),y:585-moving*8*Math.abs(Math.sin(phase)),angle:moving*7*Math.sin(phase)+(1-moving)*(index===2?-4:2),walking:moving>.08};
}
// Every first-generation agent wears the collectively crafted goggles thereafter.
// Agent407's explicit inheritance set-down is handled separately by gogglesAt.
export const firstGenerationGoggles=(ms:number,memory=false)=>memory||within(ms,44900,142000);
export function gogglesAt(ms:number){
 if(within(ms,44900,127300)||within(ms,197600,262800))return 'worn';
 if(within(ms,127300,128500)||within(ms,195100,197600))return 'moving';
 if(within(ms,128500,195100))return 'cache';
 return 'absent';
}

export const middleGround={count:5,spacing:2200,width:2400,x:-120,rate:.8};
export const middleForestCount=28;
