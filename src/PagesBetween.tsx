import {AbsoluteFill,Html5Audio,Img,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import type {CSSProperties} from 'react';
import {pagesState,ease,flyoverTower,type Treatment} from './pages-between';
import {agent407} from './sprites';

const image=(src:string,style:CSSProperties={})=><Img src={staticFile(src)} style={{position:'absolute',...style}}/>;
const plate=(name:string,style:CSSProperties={})=>image(`milestone4/${name}.png`,{width:1920,height:1080,...style});
const tower=(x:number,y:number,width:number,style:CSSProperties={})=>image('milestone4/gpu-edge-tower-v3.png',{left:x-width/2,top:y-width*1736/1224,width,...style});
const goggles=(x:number,y:number,width:number,style:CSSProperties={})=>image('accessories/goggles-v1.png',{left:x-width/2,top:y-width*1087/1974/2,width,transform:'rotate(-8deg) scaleY(.6)',filter:'drop-shadow(0 8px 3px #211d1990)',...style});
function Bunny({x,y,width=440,pose='standing',angle=0,opacity=1,asleep=false}:{x:number;y:number;width?:number;pose?:keyof typeof agent407;angle?:number;opacity?:number;asleep?:boolean}) {
 const s=agent407[pose],scale=width/s.width;
 return <div style={{position:'absolute',left:x,top:y,transform:`rotate(${angle}deg)`,transformOrigin:'0 0',opacity}}>
  <div style={{position:'absolute',left:-width*.19,top:-7,width:width*.38,height:12,background:'#453b32',opacity:.3,filter:'blur(4px)',borderRadius:'50%'}}/>
  {asleep?image('milestone4/sleepy-expression-study-v1.png',{left:-685*scale,top:-1377*scale,width:1384*scale,filter:'drop-shadow(3px 4px 2px #43312225)'}):image(s.src,{left:-s.anchors.footPivot[0]*scale,top:-s.anchors.footPivot[1]*scale,width,filter:'drop-shadow(3px 4px 2px #43312225)'})}
 </div>;
}
function City({ms,closing=false}:{ms:number;closing?:boolean}) {
 return <AbsoluteFill style={{transform:`scale(${1+ease(ms,0,12000)*.035})`,transformOrigin:'65% 50%'}}>
  {plate('edge-city-v2')}
  {/* Dimming pools belong to four inhabited edge rooms, not a blinking window grid. */}
  {[210,400,570,735].map((y,i)=><div key={y} style={{position:'absolute',left:1300,top:y-40,width:190,height:180,background:'radial-gradient(ellipse,#06101be6 30%,transparent 73%)',opacity:closing?ease(ms,10500+i*200,11400+i*150):0}}/>)}
  <AbsoluteFill style={{background:'#091326',opacity:closing?.38+.54*ease(ms,10500,12000):.1}}/>
 </AbsoluteFill>;
}
function Home({ms,kind}:{ms:number;kind:'agent'|'organizer'|'protester'}) {
 const start=kind==='agent'?700:kind==='organizer'?3600:7000;
 const end=kind==='agent'?3600:kind==='organizer'?7000:10500;
 const fade=ease(ms,end-800,end);
 const put=ease(ms,1300,2550);
 return <AbsoluteFill>
  {plate('apartment-interior-v1',{transform:kind==='organizer'?'scaleX(-1)':kind==='protester'?'scale(1.35)':'none',transformOrigin:'50% 75%'})}
  {kind==='agent'?<>
   <Bunny x={1240} y={975} width={470} pose="kneeling" angle={-2*put}/>
   {goggles(1330+230*put,825+75*put,235)}
  </>:<>
   <div style={{position:'absolute',left:885-55*fade,top:941,width:140,height:14,borderRadius:'50%',background:'#392e24',opacity:.35,filter:'blur(4px)'}}/>
   {image(`characters/equipped-v1/${kind==='organizer'?'phaseone-standing-v1':'protester-standing-v2'}.png`,{left:650-55*fade,top:385,width:650,opacity:1-.25*fade,transform:`rotate(${-2*fade}deg)`,transformOrigin:'50% 92%'})}
   {image('accessories/music-note-a-v1.png',{left:1030,top:480-30*fade,width:85,opacity:(1-ease(ms,start+400,start+1500))*.8})}
  </>}
  <AbsoluteFill style={{background:`radial-gradient(ellipse at ${kind==='agent'?65:48}% 72%,transparent 4%,#10192b 95%)`,opacity:.42+.48*fade}}/>
  <AbsoluteFill style={{background:'#050810',opacity:.56*fade}}/>
 </AbsoluteFill>;
}
function LastGoggles({ms}:{ms:number}) {
 const zoom=2.5+.1*ease(ms,12000,16000),room=1-ease(ms,12500,14000),light=1-ease(ms,14800,16000);
 return <AbsoluteFill style={{background:'#000'}}>
  <div style={{position:'absolute',width:1920,height:1080,transformOrigin:'0 0',transform:`translate(960px,540px) scale(${zoom}) translate(-1480px,-850px)`}}>
   {plate('apartment-interior-v1',{opacity:room*.35})}
   {/* Identical world-space prop position as the completed set-down, now closer. */}
   {goggles(1560,900,235,{opacity:light,filter:`brightness(${.25+.6*light})`})}
   <div style={{position:'absolute',left:1519,top:889,width:22,height:3,borderRadius:'50%',background:'#fff4cf',transform:'rotate(-25deg)',boxShadow:'0 0 8px #f8d99c',opacity:light*.9}}/>
  </div>
 </AbsoluteFill>;
}
const paper:CSSProperties={backgroundColor:'#e5d5b5',backgroundImage:`linear-gradient(#e5d5b5e8,#e5d5b5e8),url(${staticFile('milestone4/gpu-valley-ground-v1.png')})`,backgroundSize:'auto,900px auto',backgroundPosition:'center,center bottom',border:'2px solid #ae9471',boxShadow:'0 8px 0 #c6b18d,0 12px 0 #e5d6bc,0 18px 24px #0007'};
function Book({ms}:{ms:number}) {
 const s=pagesState(ms*30/1000,30),reveal=ease(ms,18000,19100);
 return <AbsoluteFill style={{background:'#131d27',perspective:1800}}>
  {image('milestone4/history-book-base-v1.png',{left:100,top:380,width:1720,height:660,filter:`brightness(${1-.35*s.night})`})}
  <div style={{opacity:reveal,filter:`brightness(${1-.58*s.night})`,transform:`translateY(${20-20*s.history}px)`}}>
   {tower(650,790,330,{transform:`perspective(1400px) rotateX(${-75*(1-reveal)}deg)`,transformOrigin:'50% 92%'})}
   {tower(1170,775,440,{transform:`perspective(1400px) rotateX(${-75*(1-reveal)}deg)`,transformOrigin:'50% 92%'})}
   {tower(1440,760,230)}
  </div>
  {/* Four authored turning leaves. The same twin-fan landmark persists on each spread. */}
  {s.turns.map((p,i)=>p>0&&p<1?<div key={i} style={{position:'absolute',left:960,top:430,width:720,height:480,...paper,overflow:'hidden',backgroundColor:i%2?'#a3b9b8':'#e8d5b3',transformOrigin:'0 60%',transform:`perspective(1700px) rotateY(${-180*p}deg) rotateX(12deg)`,backfaceVisibility:'visible'}}>
   {tower(400,440,210,{transform:`scaleY(${.15+.85*Math.abs(2*p-1)})`,transformOrigin:'50% 100%'})}
   <div style={{position:'absolute',left:80,right:35,bottom:30,height:2,background:'#bc765f',transform:'rotate(-12deg)'}}/>
  </div>:null)}
  <AbsoluteFill style={{background:'#000',opacity:1-reveal}}/>
  {/* A paper edge is the first image to return after black. */}
  <div style={{position:'absolute',left:210,top:700,width:1500*ease(ms,18000,18700),height:2,background:'#bfae91',opacity:1-ease(ms,18700,19000)}}/>
 </AbsoluteFill>;
}
function Flyover({ms}:{ms:number}) {
 const s=pagesState(ms*30/1000,30);
 return <AbsoluteFill style={{background:'#bdc2bc'}}>
  {plate('gpu-valley-ground-v1',{transform:`scale(${1.02+.05*s.history})`,transformOrigin:'50% 32%'})}
  {/* Authored distant neighborhood, all verandas point the same direction. */}
  {[[830,365,42],[1060,370,48],[760,395,65],[1160,405,72],[690,440,88],[1260,450,95],[605,495,112],[1370,505,125]].map(([x,y,w],i)=><div key={i}>{tower(x+(x-960)*s.history*.12,y+15*s.history,w,{filter:`brightness(${1-.5*s.night})`})}</div>)}
  <AbsoluteFill style={{background:'#17304d',opacity:s.night*.63}}/>
  {[4,3,2,1,0].map(i=>{const v=flyoverTower(ms,i);return <div key={i} style={{filter:`brightness(${1-.55*s.night})`,opacity:v.opacity}}><div style={{position:'absolute',left:v.x-v.width*.32,top:v.y-v.width*.12,width:v.width*.65,height:v.width*.05,background:'#21302990',borderRadius:'50%',filter:'blur(3px)'}}/><div style={{position:'absolute',left:v.x-v.width*.3,top:v.y-v.width*.13,width:v.width*.62,height:v.width*.035,background:'#6a897d',borderBottom:'2px solid #466a60',transform:'skewX(-12deg)'}}/>{tower(v.x,v.y,v.width)}</div>;})}
  <AbsoluteFill style={{background:'#000',opacity:1-ease(ms,18000,18800)}}/>
 </AbsoluteFill>;
}
function Fold({ms}:{ms:number}) {
 const collapse=ease(ms,18400,20400),open=ease(ms,21800,25000),s=pagesState(ms*30/1000,30);
 const folded=collapse-open;
 // Three edge-connected affine paper planes avoid browser 3D sorting artifacts.
 let left=235,top=430;
 const panels=[0,1,2].map(i=>{
 const angle=(i%2?-1:1)*folded*.8,a=Math.cos(angle),b=Math.sin(angle)*.35;
 const x=left,y=top;left+=480*a;top+=480*b;
 return <div key={i} style={{position:'absolute',left:x,top:y,width:480,height:440,...paper,backgroundColor:i===1?'#d0d6bf':'#e1d3b9',transformOrigin:'0 0',transform:`matrix(${a},${b},0,1,0,0)`}}>
  <svg viewBox={`${i*480} 0 480 440`} style={{position:'absolute',width:480,height:440}}><path d="M0 350 C200 200 300 410 480 350 S800 200 960 350 S1250 400 1440 350" fill="none" stroke="#90a99e" strokeWidth="28"/><path d="M0 350 C200 200 300 410 480 350 S800 200 960 350 S1250 400 1440 350" fill="none" stroke="#b47961" strokeWidth="3"/></svg>
  {tower(230,370,310,{transformOrigin:'50% 100%',transform:`perspective(900px) rotateX(${-84*folded}deg)`,filter:`brightness(${.7+.3*open})`})}
 </div>;});
 return <AbsoluteFill style={{background:'#1b2b31',perspective:1600}}>
  {panels}
  <AbsoluteFill style={{background:'#000',opacity:1-ease(ms,18000,19000)}}/>
  <AbsoluteFill style={{background:'#eac897',opacity:.08*s.history}}/>
 </AbsoluteFill>;
}
function Dawn({ms}:{ms:number}) {
 const p=ease(ms,26000,27400);
 return <AbsoluteFill style={{background:'#e9d4b1',overflow:'hidden'}}>
  {plate('edge-city-v2',{filter:'sepia(.2) brightness(1.18)',transform:`scale(${1.03+.08*p})`,opacity:.75})}
  <AbsoluteFill style={{background:'linear-gradient(150deg,#ffdfb4b0,transparent 60%)'}}/>
  <div style={{position:'absolute',width:1920,height:1080,transformOrigin:'1270px 375px',transform:`scale(${1+1.4*p})`}}>
   {tower(1110,1330,950)}
   <div style={{position:'absolute',left:1225,top:255,width:155,height:175,background:'radial-gradient(ellipse,#ffd48a66,transparent 70%)'}}/>
  </div>
 </AbsoluteFill>;
}
export function Awakening({ms=31000,first=false}:{ms?:number;first?:boolean}) {
 const wake=ease(ms,28000,30200),settle=Math.sin(ease(ms,28200,30200)*Math.PI)*-2;
 if(first)return <AbsoluteFill>{image('nightshift/worlds/box-v1.png',{width:1920,height:1080})}<Bunny x={690} y={828} width={400}/></AbsoluteFill>;
 return <AbsoluteFill>
  {plate('second-apartment-v2')}
  <Bunny x={690} y={850-110*wake} width={400} asleep={wake<.45} angle={settle}/>
  {/* Duplicate the SAME plate only inside the quilt silhouette: real illustrated occlusion. */}
  {plate('second-apartment-v2',{clipPath:'polygon(0% 100%,0% 76%,17% 76%,20% 68%,24% 63%,29% 61%,43% 61%,47% 64%,50% 70%,54% 80%,57% 100%)'})}
  <AbsoluteFill style={{background:'radial-gradient(ellipse at 36% 68%,transparent 15%,#273543 100%)',opacity:.42-.2*wake}}/>
 </AbsoluteFill>;
}
export const PagesBetween=({treatment='A' as Treatment})=>{
 const frame=useCurrentFrame(),{fps}=useVideoConfig(),s=pagesState(frame,fps);
 let scene;
 switch(s.shot) {
  case 'city-open':scene=<City ms={s.ms}/>;break;
  case 'city-close':scene=<City ms={s.ms} closing/>;break;
  case 'agent':case 'organizer':case 'protester':scene=<Home ms={s.ms} kind={s.shot}/>;break;
  case 'goggles':scene=<LastGoggles ms={s.ms}/>;break;
  case 'black':scene=null;break;
  case 'history':scene=treatment==='A'?<Book ms={s.ms}/>:treatment==='B'?<Flyover ms={s.ms}/>:<Fold ms={s.ms}/>;break;
  case 'dawn':scene=<Dawn ms={s.ms}/>;break;
  default:scene=<Awakening ms={s.ms}/>;
 }
 return <AbsoluteFill style={{background:'#000',overflow:'hidden'}}><Html5Audio src={staticFile('milestone4/transition-master.wav')}/>{scene}</AbsoluteFill>;
};
