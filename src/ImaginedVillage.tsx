import {AbsoluteFill,Img,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import type {CSSProperties} from 'react';
import {PaperCollage} from './PaperCollage';
import {Piece} from './PaperApartment';
import {agent407} from './sprites';
import {villageAssets} from './village-assets';
import {villageState} from './village';
import {ease} from './pages-between';
const abs:CSSProperties={position:'absolute'};
function Cut({id,x=0,y=0,w,angle=0,style={}}:{id:keyof typeof villageAssets;x?:number;y?:number;w:number;angle?:number;style?:CSSProperties}) {
 const a=villageAssets[id],[l,t,r,b]=a.box,scale=w/(r-l);
 return <div style={{...abs,left:x,top:y,width:w,height:(b-t)*scale,transform:`rotate(${angle}deg)`,filter:'drop-shadow(2px 4px 1px #554b3430)',...style}}>
  <Img src={staticFile(a.src)} style={{...abs,left:-l*scale,top:-t*scale,width:a.size[0]*scale,height:a.size[1]*scale}}/>
 </div>;
}
function Actor({role,x,y,angle=0,pose='standing'}:{role:'agent'|'organizer'|'courier';x:number;y:number;angle?:number;pose?:keyof typeof agent407}) {
 const a=agent407[pose],scale=.18;
 return <div style={{...abs,left:x,top:y,transform:`rotate(${angle}deg)`,filter:'drop-shadow(1px 3px 1px #524b3535)'}}>
  {role==='agent'?<Img src={staticFile(a.src)} style={{...abs,width:a.width*scale,left:-a.anchors.footPivot[0]*scale,top:-a.anchors.footPivot[1]*scale}}/>:
   <Img src={staticFile(`nightshift/stickers/${role==='organizer'?'phaseone':'courier'}-wardrobe-v1.png`)} style={{...abs,width:1417*.23,left:-675*.23,top:-1210*.23}}/>}
 </div>;
}
export function ImaginedVillage({hero=false,hideCloud=false,hideSun=false,hideSmoke=false}:{hero?:boolean;hideCloud?:boolean;hideSun?:boolean;hideSmoke?:boolean}) {
 const frame=useCurrentFrame(),{fps}=useVideoConfig(),ms=hero?11800:frame*1000/fps,s=villageState(ms);
 const active=ms>=2800;
 return <AbsoluteFill style={{background:'#eee5d3',overflow:'hidden'}}>
  {active&&<div style={{...abs,inset:0,transform:`translateX(${1920*(1-s.backing)}px)`}}>
   <Piece part="wall" x={-30} y={-20} w={1980} h={1140}/>
   {/* A few authored crayon-like strokes on the backing; never animated noise. */}
   <svg width="1920" height="1080" style={{...abs,inset:0}}><defs><filter id="crayon"><feTurbulence baseFrequency=".12" numOctaves="2" seed="7" result="grain"/><feComposite in="SourceGraphic" in2="grain" operator="in"/></filter></defs>
    <g fill="none" strokeLinecap="round" filter="url(#crayon)"><path d="M 550 170 l 130 -13 -20 22 220 -18 -80 26 290 -10 M 1220 80 l 110 8 -25 17 270 -11" stroke="#79b9ce" strokeWidth="17" opacity=".45"/>
    <path d="M 150 827 Q 390 760 570 850 T 1080 880 Q 1310 840 1680 940" pathLength="1" strokeDasharray="1" strokeDashoffset={1-s.line} stroke="#d29b64" strokeWidth="15"/>
    <path d="M 175 700 l 95 -42 -60 55 150 -61 M 1605 720 l 94 -55 -65 70 116 -61" stroke="#79a563" strokeWidth="10"/></g>
   </svg>
   {ms>=4400&&!hideSun&&<Cut id="sun-v2" x={1080+s.farX} y={140+520*(1-s.sun)} w={270} angle={-9}/>}
   <div style={{...abs,left:s.farX-1700*(1-s.hillA),top:0}}><Cut id="hill-a-v1" x={70} y={430} w={1770}/></div>
   {/* A single silk/tissue-paper sheet: translucent, moving rigidly between planes. */}
   <div style={{...abs,left:s.farX+14,top:0,opacity:.16,width:1920,height:1080,transform:'rotate(-2deg)',filter:'brightness(1.5) saturate(.3)',maskImage:'radial-gradient(ellipse 760px 170px at 1000px 625px,#000 45%,transparent 95%)'}}><Piece part="wall" x={170} y={480} w={1600} h={265}/></div>
   {!hideCloud&&<Cut id="cloud-v1" x={1060-s.cloudX+s.midX} y={270} w={330} angle={-3}/>}
   {ms>=4800&&<div style={{...abs,left:s.midX,top:700*(1-s.houseA)}}>
    {/* This rectangular hidden channel ends at the real chimney lip. The long
        strip is fed through it, and the house occludes everything below. */}
    {!hideSmoke&&<div style={{...abs,left:1435,top:285,width:150,height:240,overflow:'hidden'}}><Cut id="smoke-v1" x={0} y={240-s.smokeRise} w={100}/></div>}
    <Cut id="house-a-v1" x={1240} y={520} w={330} angle={0}/>
   </div>}
   {ms>=5500&&<div style={{...abs,left:s.midX-600*(1-s.houseB),top:400*(1-s.houseB)}}><Cut id="house-b-v1" x={390} y={480} w={310} angle={-3}/></div>}
   {/* The imagined copies enter on their own paper track; physical residents
       remain in the inset. No character travels out of an apartment. */}
   {ms>=7200&&<div style={{...abs,left:s.nearX,top:0}}>
    <Actor role="agent" x={820} y={925+320*(1-s.agentEnter)+s.greet} pose={ms<10100?'singing':'cheer'} angle={ms>=10100?-3:1}/>
    <Actor role="organizer" x={1025} y={925+320*(1-s.organizerEnter)+s.greet*.5} angle={-3+3*ease(ms,10500,11500)}/>
    {ms>=7800&&<Actor role="courier" x={s.courierX} y={925+s.courierHop} angle={ms<9600?-5:3-3*ease(ms,9600,10200)}/>}
    {/* A shared note travels from courier to organizer after the greeting. */}
    {ms>=8000&&<Img src={staticFile('accessories/envelope-v1.png')} style={{...abs,left:s.courierX-48+(1070-s.courierX)*s.share,top:838-28*Math.sin(s.share*Math.PI),width:68,transform:`rotate(${-8+13*s.share}deg)`}}/>}
   </div>}
   <div style={{...abs,left:s.nearX,top:600*(1-s.hillB)}}><Cut id="hill-b-v1" x={-40} y={805} w={2000}/></div>
  </div>}
  {/* Retain the separate physical homes as an inset inside the imagination. */}
  <div style={{...abs,left:45*s.inset,top:55*s.inset,width:1920,height:1080,transformOrigin:'0 0',transform:`scale(${1-.82*s.inset})`,boxShadow:s.inset?'0 5px 10px #51493630':undefined}}>
   <PaperCollage awake calling/>
   {[{start:400,x:1240,y:475},{start:1200,x:1280,y:210},{start:2000,x:1210,y:760}].map((n,i)=>{
    const p=ease(ms,n.start,n.start+950);return ms>=n.start&&ms<n.start+1800?<Img key={i} src={staticFile(`accessories/music-note-${i%2?'b':'a'}-v1.png`)} style={{...abs,left:n.x+30*p,top:n.y-45*p,width:78,transform:`rotate(${-8+14*p}deg)`,opacity:1-ease(ms,n.start+1300,n.start+1800)}}/>:null;
   })}
  </div>
  {ms>4800&&<div style={{...abs,left:55,top:255,fontFamily:'Georgia,serif',fontStyle:'italic',fontSize:15,color:'#786b58'}}>Separate rooms. A shared imagination.</div>}
 </AbsoluteFill>;
}
