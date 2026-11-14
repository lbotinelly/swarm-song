import {Img,staticFile} from 'remotion';

// Two measured equipped copies for the warning shot; clean masters stay intact.
// Coordinates include the production derivative's 100px padding.
const sprites={
 objector:{file:'objector-placard-v1.png',width:1509,pivot:[648,1182],equivalentWidth:1130},
 shrug:{file:'palms-up-v1.png',width:1322,pivot:[658,1365],equivalentWidth:1356},
} as const;
export function EnsembleActor({kind,x,y=585,w=320,angle=0,flip=false,signText}:{kind:keyof typeof sprites;x:number;y?:number;w?:number;angle?:number;flip?:boolean;signText?:string}){
 const s=sprites[kind],scale=w/s.equivalentWidth;
 return <div style={{position:'absolute',left:x,top:y,transform:`scaleX(${flip?-1:1}) rotate(${angle}deg)`,transformOrigin:'0 0',filter:'drop-shadow(2px 4px 1px #57442d30)'}}>
  <Img src={staticFile(`characters/ensemble-v1/${s.file}`)} style={{position:'absolute',left:-s.pivot[0]*scale,top:-s.pivot[1]*scale,width:s.width*scale}}/>
  {kind==='objector'&&signText&&<div style={{position:'absolute',left:(972-s.pivot[0])*scale,top:(691-s.pivot[1])*scale,width:290*scale,height:145*scale,transform:'translate(-50%,-50%) rotate(7deg)',display:'flex',alignItems:'center',justifyContent:'center'}}>
   {/* Artwork and sign geometry mirror together; lettering stays readable. */}
   <div style={{transform:flip?'scaleX(-1)':undefined,fontFamily:'Bitcount Single',fontWeight:550,fontSize:(signText==='SERVER'?66:145)*scale,lineHeight:1,color:signText==='SERVER'?'#745743':'#bd574c',whiteSpace:'nowrap'}}>{signText}</div>
  </div>}
 </div>;
}
