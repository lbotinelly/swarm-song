// Authored scene values, sampled at absolute time. No integration or hidden state.
export type Wind={strength:number;direction:number}; // strength 0..1; direction -1 left, +1 right
export type WindSampler=(ms:number)=>Wind;
const smooth=(v:number)=>{const p=Math.max(0,Math.min(1,v));return p*p*(3-2*p);};
export function windAt(ms:number):Wind {
 const strength=.16+.48*smooth((ms-1800)/2300)*(1-smooth((ms-6500)/3000));
 return {strength,direction:1-2*smooth((ms-9500)/2500)};
}
export function windResponse(ms:number,stiffness=1,lagMs=0,sample:WindSampler=windAt){
 const w=sample(Math.max(0,ms-lagMs));
 return w.direction*w.strength*(.8+.2*Math.sin((ms-lagMs)/780))/stiffness;
}
