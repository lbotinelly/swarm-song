/** Seekable sticker pickup: one item, a resting position, and a live attachment. */
export type ItemPose={x:number;y:number;angle:number;scale:number;flip?:boolean;facing?:number};
// Host is a fully oriented actor (boolean flip), not an item midway through a turn.
export function attachItem(host:ItemPose,local:ItemPose):ItemPose{
 const facing=host.flip?-1:1,rad=host.angle*Math.PI/180;
 const x=local.x*host.scale*facing,y=local.y*host.scale;
 return {x:host.x+x*Math.cos(rad)-y*Math.sin(rad),y:host.y+x*Math.sin(rad)+y*Math.cos(rad),angle:host.angle+local.angle*facing,scale:host.scale*local.scale,flip:!!host.flip!==!!local.flip};
}
export function pickAt(ms:number,{start,duration,from,to,height=70,turn=12}:{start:number;duration:number;from:ItemPose;to:ItemPose;height?:number;turn?:number}){
 if(duration<=0)throw new Error('Pickup duration must be positive');
 if(ms<start)return {phase:'resting' as const,pose:from};
 if(ms>=start+duration)return {phase:'held' as const,pose:to};
 const t=(ms-start)/duration,p=t*t*(3-2*t),arc=Math.sin(Math.PI*p);
 const facingFrom=from.facing??(from.flip?-1:1),facingTo=to.facing??(to.flip?-1:1);
 return {phase:'flight' as const,pose:{x:from.x+(to.x-from.x)*p,y:from.y+(to.y-from.y)*p-height*arc,angle:from.angle+(to.angle-from.angle)*p+turn*arc,scale:from.scale+(to.scale-from.scale)*p,facing:facingFrom+(facingTo-facingFrom)*p}};
}
