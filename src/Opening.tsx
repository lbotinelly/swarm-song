import type {CSSProperties} from 'react';
import {AbsoluteFill,Img,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {Card} from './PaperCollage';
import {Piece} from './PaperApartment';
import {RegistryFinish} from './RegistryFinish';
import {Song} from './Song';
import {agent407} from './sprites';
import {ramp} from './story-blocking';
const abs:CSSProperties={position:'absolute'};
const mix=(a:number,b:number,t:number)=>a+(b-a)*t;
const image=(src:string,x:number,y:number,w:number,style:CSSProperties={})=><Img src={staticFile(src)} style={{...abs,left:x,top:y,width:w,...style}}/>;

// SH001–003: authored transforms of existing paper stock and one room master.
// No camera engine: the room's final transform is exactly the M10 FilmRoom transform.
export function openingCamera(ms:number){
 const district=ramp(ms,3000,9500),enter=ramp(ms,10500,12900);
 return {x:mix(mix(1130,1000,district),173,enter),y:mix(mix(330,310,district),0,enter),
  scale:mix(mix(.185,.25,district),.82,enter),angle:mix(-22,0,ramp(ms,9300,10800)),
  cutaway:ramp(ms,9600,10500),enter};
}
export function Cushion(){return image('milestone11/cushion-v2.png',1038,375,650);}
function Resident({ms,neighbor=0}:{ms:number;neighbor?:number}){
 const wake=neighbor===0?ramp(ms,13000,14400):0;
 const breathe=Math.sin(ms/850+neighbor*1.7)*.006*(1-wake);
 const stand=ms>=13900&&neighbor===0;
 const s=ms<14800?agent407.walking:agent407.standing,k=.43;
 const step=ramp(ms,13900,14800);
 return <>
  <Cushion/>
  {!stand?<div style={{...abs,left:1315,top:560,transform:`rotate(${-3*ramp(ms,13200,13850)*(neighbor===0?1:0)}deg) scaleY(${1+breathe})`,transformOrigin:'0 0'}}>
   {image('milestone11/sleeping-v1.png',-850*.43,-1098*.43,1736*.43)}
  </div>:<div style={{...abs,left:1315+20*step,top:560+116*step-30*Math.sin(Math.PI*step),transform:`rotate(${-4*(1-step)}deg)`,transformOrigin:'0 0'}}>
   {image(s.src,-s.anchors.footPivot[0]*k,-s.anchors.footPivot[1]*k,s.width*k)}
  </div>}
 </>;
}
function Apartment({ms,neighbor=0}:{ms:number;neighbor?:number}){
 return <div style={{...abs,width:1920,height:1080}}>
  <RegistryFinish layeredVent captions={false} performance={{ms:8000,opened:.06,frontActor:true,second:neighbor>0,actor:<Resident ms={ms} neighbor={neighbor}/>}}/>
  <AbsoluteFill style={{background:'#101a30',opacity:neighbor?.52:.16*(1-ramp(ms,11000,14000))}}/>
 </div>;
}
// Five hand-placed residential blocks, repeated paper pieces, independent light cues.
function Block({x,y,w,h,color,index,ms}:{x:number;y:number;w:number;h:number;color:string;index:number;ms:number}){
 const glow=ramp(ms,1550+index*150,2400+index*140);
 return <div style={{...abs,left:x,top:y,width:w,height:h,filter:`brightness(${.45+.55*ramp(ms,1550+index*90,3000)}) drop-shadow(18px 25px 8px #02091675)`}}>
  <div style={{...abs,left:w,top:-38,width:95,height:h+38,clipPath:`polygon(0 38px,100% 0,100% ${h}px,0 100%)`}}><Card x={0} y={0} w={95} h={h+38} color={index%2?'#465b61':'#3e555b'}/>
   <div style={{...abs,inset:0,background:'linear-gradient(110deg,#07162355,transparent 40%,#07162370)'}}/>
   {[0,1,2,3].map(i=><div key={i} style={{...abs,left:12+i*19,top:38-i*7,width:3,height:h-30,background:'#bac0a733',transform:'rotate(.4deg)'}}/>)}
   <svg width="95" height={h+38} style={{...abs,inset:0}}><path d={`M12 ${h-20} L12 ${h*.7} 65 ${h*.7-22} 65 ${h*.35}`} stroke="#ad987a" strokeWidth="3" fill="none" opacity=".7"/></svg>
  </div>
  <div style={{...abs,left:0,top:-38,width:w,height:38,transform:'skewX(-68deg)',transformOrigin:'0 100%'}}><Card x={0} y={0} w={w} h={38} color="#82908a"/></div>
  <Card x={0} y={0} w={w} h={h} color={color}/>
  <Card x={9} y={12} w={w*.39} h={h-24} color="#355963"/>
  {[.22,.68].map((v,i)=><Piece key={v} part="fan" x={w*.045} y={h*v-w*.15} w={w*.3} h={w*.3} style={{transform:`rotate(${ms*.0008*(i?-1:1)}deg)`,filter:'brightness(.75)'}}/>)}
  {[0,1,2,3,4,5].map(i=><div key={i} style={{...abs,left:w*(.5+(i%2)*.23),top:22+Math.floor(i/2)*(h-40)/3+(i+index)%2*4,width:w*(i===index%6?.18:.14),height:(h-65)/(index%2?3.6:3),background:(i+index)%4===0?'#526876':(i+index)%3===0?'#e8b18a':'#f6ca77',opacity:(i+index)%4===0?1:glow*(.65+(i+index)%3*.13),boxShadow:'0 0 16px #f3bf7022',border:'4px solid #827960',transform:`rotate(${i%2?1.4:-.8}deg)`}}>
   {(i+index)%3===1&&<div style={{...abs,left:0,top:'57%',height:3,width:'100%',background:'#a49470'}}/>}
  </div>)}
  <Card x={-6} y={18} w={11} h={h-32} color="#b7a88c" angle={-.7}/>
  <Card x={w*.34} y={-8} w={w*.27} h={17} color="#c8bd9b" angle={-9+index*2}/>
  <div style={{...abs,left:w*.17,top:h-18,width:6,height:5,background:index%2?'#ce9c76':'#a9c2a3',opacity:.55+.2*Math.sin(ms/1700+index),boxShadow:'0 0 5px #efcf8c'}}/>
  {[0,1,2,3,4].map(i=><Card key={i} x={25+i*(w-50)/5} y={h-3} w={12} h={22} color="#c8a465"/>)}
 </div>;
}
function City({ms}:{ms:number}){
 const c=openingCamera(ms),fade=1-ramp(ms,10400,12400);
 return <>
  <AbsoluteFill style={{background:'#0d172c'}}/>
  <div style={{...abs,inset:0,opacity:.23*fade}}><Piece part="wall" w={1920} h={1080}/><AbsoluteFill style={{background:'#14233d',mixBlendMode:'multiply'}}/></div>
  {fade>0&&<div style={{...abs,inset:0,opacity:fade,transform:`translate(${-80*ramp(ms,3000,10500)}px,${30*ramp(ms,3000,10500)}px) scale(${1+.13*ramp(ms,3000,10500)})`,transformOrigin:'70% 50%'}}>
   <svg width="1920" height="1080" style={{...abs,inset:0}}>
    {['M-80 760 L520 450 1030 715 1850 285','M90 1060 L740 720 1340 1030 2000 680','M-70 400 L220 540 520 385 1080 665 1710 325 2000 470','M370 880 L370 760 1040 420 1490 650 1900 440'].map((d,i)=><g key={d}>
     <path d={d} fill="none" stroke="#8c6a55" strokeWidth="19" strokeLinejoin="round"/>
     <path d={d} fill="none" stroke="#d8a46b" strokeWidth="5" pathLength="1" strokeDasharray="1" strokeDashoffset={1-ramp(ms,1650+i*160,3200+i*100)} opacity=".7"/>
    </g>)}
    {[[220,540],[520,450],[740,720],[1040,420],[1490,650],[1340,1030],[1710,325]].map(([x,y],i)=><g key={x} opacity={ramp(ms,1850+i*150,2400+i*150)}><circle cx={x} cy={y} r="15" fill="#d7a66c"/><circle cx={x} cy={y} r="6" fill="#ffe6aa"/></g>)}
   </svg>
   <div style={{opacity:.48}}>
    <Block x={80} y={60} w={100} h={145} color="#60787e" index={1} ms={ms}/>
    <Block x={1100} y={40} w={120} h={170} color="#60787e" index={2} ms={ms}/>
    <Block x={1430} y={5} w={100} h={120} color="#72877e" index={0} ms={ms}/>
    <Block x={1720} y={120} w={120} h={185} color="#827d87" index={3} ms={ms}/>
   </div>
   <Block x={310} y={110} w={210} h={260} color="#60787e" index={0} ms={ms}/>
   <Block x={720} y={80} w={190} h={230} color="#8c8275" index={1} ms={ms}/>
   <Block x={40} y={400} w={230} h={340} color="#64837e" index={2} ms={ms}/>
   <Block x={640} y={430} w={270} h={350} color="#827d87" index={3} ms={ms}/>
   <Block x={1530} y={590} w={230} h={320} color="#7c8d88" index={4} ms={ms}/>
  </div>}
  <AbsoluteFill style={{background:'#eee4ce',opacity:ramp(ms,11700,12900)}}/>
  <div style={{...abs,left:c.x,top:c.y,width:1920,height:1080,transform:`scale(${c.scale}) perspective(6000px) rotateY(${c.angle}deg)`,transformOrigin:'0 0',opacity:ramp(ms,1800,2900)}}>
   {ms<12800&&<div style={{...abs,left:-560,top:-740,width:570,height:2260,opacity:1-ramp(ms,11600,12800)}}>
    <Card x={0} y={0} w={570} h={2260} color="#7da29c"/>
    {[120,900,1660].map((y,i)=><Piece key={y} part="fan" x={40} y={y} w={460} h={460} style={{transform:`rotate(${ms*.001*(i===1?-1:1)}deg)`}}/>)}
    <Card x={-45} y={22} w={40} h={2200} color="#b6a17a"/>
   </div>}
   {(ms>=12700?[0]:[-1,1,0]).map(n=><div key={n} style={{...abs,left:0,top:n*760,width:1920,height:n===0?760+320*ramp(ms,11700,12700):760,overflow:'hidden',opacity:n===0?1:1-ramp(ms,11700,12700)}}>
    {ms>=9600&&<Apartment ms={ms} neighbor={n}/>}
    {ms<10500&&<div style={{...abs,left:-2000*c.cutaway,top:0,width:1920,height:760,opacity:1-ramp(ms,10300,10500)}}>
     <Card x={0} y={0} w={1920} h={760} color="#607e80"/>
     {[0,1,2].map(i=><div key={i} style={{...abs,left:180+i*560,top:140,width:390,height:420,background:'#f4c985',border:'30px solid #455e66',boxShadow:'0 0 40px #edbf6844',opacity:.55+.35*ramp(ms,1900+n*200+i*100,3000+n*100+i*100)}}><div style={{...abs,left:170,top:0,width:15,height:420,background:'#8b8770'}}/></div>)}
     <Card x={1780} y={25} w={105} h={710} color="#d9b27f"/>
    </div>}
   </div>)}
  </div>
 </>;
}
function Strike({d,p}:{d:string;p:number}){return <path d={d} fill="none" stroke="#e5a786" strokeWidth="7" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1-p}/>;}
export function OpeningTitle({ms}:{ms:number}){
 const enter=ramp(ms,3500,4700),leave=ramp(ms,9350,10450),slap=ramp(ms,8100,8450);
 if(ms<3500||ms>=10450)return null;
 return <div style={{...abs,left:mix(-1000,65,enter)-1100*leave,top:255,width:850,height:580,transform:`rotate(${-1.7+1.2*leave}deg)`,filter:'drop-shadow(12px 18px 4px #0007)'}}>
  <Card x={0} y={0} w={850} h={580} color="#171b27"/>
  <Card x={55} y={-13} w={130} h={42} color="#b6b5a1" angle={-12}/>
  <svg width="850" height="580" style={{...abs,inset:0,overflow:'visible'}}>
   <text x="63" y="173" fill="#fff1c9" fontFamily="Finger Paint" fontSize="102">Swarm Song</text>
   <g fill="#eee3cc" fontFamily="Bitcount Single" fontSize="38" fontWeight="550">
    <text x="64" y="315">The</text><text x="160" y="315">Hugging Face</text><text x="535" y="315">Incident</text>
   </g>
   <Strike d="M155 303 Q230 290 315 306 T514 299 M173 312 L494 293" p={ramp(ms,6000,6350)}/>
   <clipPath id="write-openai"><rect x="165" y="333" width={350*ramp(ms,6300,6600)} height="80"/></clipPath>
   <text x="204" y="388" fontFamily="Finger Paint" fontSize="53" fill="#a9d5ce" transform="rotate(-3 204 388)" clipPath="url(#write-openai)">OpenAI</text>
   <Strike d="M194 366 Q300 382 433 366 M202 387 L444 361" p={ramp(ms,7450,7730)}/>
   <Strike d="M535 301 L766 310 M548 317 Q660 292 765 300" p={ramp(ms,7720,7950)}/>
  </svg>
  {ms>=8100&&<div style={{...abs,left:45,top:250-110*(1-slap),width:765,height:200,opacity:ramp(ms,8100,8200),transform:`rotate(${mix(-10,2,slap)+1.8*Math.sin(Math.PI*ramp(ms,8450,8750))}deg) scale(${1+.14*(1-slap)})`,transformOrigin:'50% 50%',filter:'drop-shadow(4px 7px 1px #0005)'}}>
   <Card x={0} y={0} w={765} h={200} color="#fff5d9"/>
   <div style={{...abs,left:30,top:53,fontFamily:'Finger Paint',fontSize:63,whiteSpace:'nowrap'}}><span style={{color:'#a94f40'}}>The </span><span style={{color:'#287d82'}}>Swarm </span><span style={{color:'#79558b'}}>Party</span></div>
  </div>}
 </div>;
}
export function Opening({mode='complete'}:{mode?:'complete'|'city'|'title'}){
 const ms=useCurrentFrame()*1000/useVideoConfig().fps;
 if(ms<1500)return <AbsoluteFill style={{background:'#000'}}><Song captionsOnly/></AbsoluteFill>;
 return <AbsoluteFill style={{background:'#000',overflow:'hidden'}}>
  {mode!=='title'?<City ms={ms}/>:<AbsoluteFill style={{background:'#142037'}}/>}
  {mode!=='city'&&<OpeningTitle ms={ms}/>}
  <div style={{...abs,inset:0,transform:'scale(.92)',transformOrigin:'50% 100%'}}><Song captionsOnly layoutOverride="lower-center"/></div>
  <AbsoluteFill style={{background:'#000',opacity:1-ramp(ms,1500,3000)}}/>
 </AbsoluteFill>;
}
