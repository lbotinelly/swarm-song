// M9 in-place transformations: a local opaque cover, then a buoyant release.
// Every circle is evaluated from absolute time; no particle simulation state.
export type PopRegion={x:number;y:number;w:number;h:number};
import type {WindSampler} from './playset-wind';
const ease=(t:number)=>{const u=Math.max(0,Math.min(1,t));return u*u*(3-2*u);};
const variation=(id:number,salt:number)=>{const n=Math.sin(id*127.1+salt*311.7)*43758.5453;return n-Math.floor(n);};
export function paperPopAt(ms:number,swap:number,box:PopRegion,wind?:WindSampler,brisk=false){
 const age=ms-swap;if(age< -180||age>=1300)return [];
 const cols=Math.max(2,Math.ceil(box.w/190)),rows=Math.max(2,Math.ceil(box.h/190));
 const cw=box.w/cols,ch=box.h/rows,base=Math.hypot(cw,ch)*.64;
 const parts=[];
 for(let row=0;row<rows;row++)for(let col=0;col<cols;col++){
  const id=row*cols+col;
  parts.push({x:box.x+(col+.5+.08*Math.sin(id*2.7+1))*cw,y:box.y+(row+.5+.08*Math.sin(id*3.1+2))*ch,r:base*(1+.6*variation(id,1)),id});
 }
 // Small bubbles begin overlapped inside the main puff and escape faster.
 for(let i=0;i<14;i++){
  const a=i*Math.PI*2/14+.2*variation(i,2),spread=.43+.12*variation(i,3);
  parts.push({x:box.x+box.w/2+Math.cos(a)*box.w*spread,y:box.y+box.h/2+Math.sin(a)*box.h*spread,r:base*(.1+.42*variation(i,4)),id:parts.length});
 }
 const elapsed=Math.max(0,age-80)/1000;
 const sample=(at:number)=>{const v=wind?.(at);return v?v.strength*v.direction:0;};
 const breeze=wind?(sample(swap+80)+4*sample(swap+80+elapsed*500)+sample(ms))/6:0;
 return parts.map(p=>{
  const dx=p.x-box.x-box.w/2,dy=p.y-box.y-box.h/2;
  const angle=(Math.hypot(dx,dy)<1?p.id*2.4:Math.atan2(dy,dx))+.13*Math.sin(p.id*2.1);
  const speed=Math.sqrt(base/p.r),launchSpeed=(180+80*variation(p.id,5))*speed,drag=3.4+1.8*variation(p.id,6);
  // Integral of an exponentially decaying launch velocity: fast out, then coast.
  const out=launchSpeed/drag*(1-Math.exp(-drag*elapsed));
  const nearCenter=Math.hypot(dx/(box.w/2),dy/(box.h/2))<.82;
  const lifetime=(560+420*variation(p.id,7))*(nearCenter?.58:1)*(brisk&&p.r>=base?.57:1),life=elapsed*1000/lifetime;
  const fadeStart=nearCenter?.08:.28+.22*variation(p.id,8),opacity=1-ease((life-fadeStart)/(1-fadeStart));
  const floatUp=(40+45*variation(p.id,9))*speed*(elapsed-(1-Math.exp(-3*elapsed))/3);
  const drift=breeze*75*speed*elapsed*(1-Math.exp(-4*elapsed));
  return {id:p.id,x:p.x+Math.cos(angle)*out+drift,y:p.y+Math.sin(angle)*out-floatUp,r:p.r*ease((age+180)/130)*(1-.98*ease((life-.18)/.82)),opacity,speed,launchSpeed,drag,lifetime};
 }).filter(p=>p.opacity>0);
}

// Union of old and new silhouettes, with a small margin for their shadows.
export const buildingPops=[
 {swap:2300,x:474,y:485,w:332,h:303},
 {swap:3300,x:929,y:551,w:332,h:291},
 {swap:3900,x:1154,y:294,w:602,h:410},
] as const;
