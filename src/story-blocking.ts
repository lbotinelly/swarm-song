// Shot-specific blocking, not a new animation engine. All times are master ms.
export const ramp=(ms:number,a:number,b:number)=>{const t=Math.max(0,Math.min(1,(ms-a)/(b-a)));return t*t*(3-2*t);};
export const within=(ms:number,a:number,b:number)=>ms>=a&&ms<b;
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
