import type {CSSProperties} from 'react';
import {AbsoluteFill,Img,staticFile,useCurrentFrame} from 'remotion';
import {OpeningTitle,Resident} from './Opening';
import {RegistryFinish} from './RegistryFinish';
import {Song} from './Song';
import {ramp} from './story-blocking';
const abs:CSSProperties={position:'absolute'};
const mix=(a:number,b:number,t:number)=>a+(b-a)*t;
const art=(name:string,style:CSSProperties)=> <Img src={staticFile(`milestone11/canyon/${name}.png`)} style={{...abs,...style}}/>;
// Static capture of the approved room; actors stay live and independent.
export function CanyonRoomPlate(){return <RegistryFinish layeredVent captions={false} performance={{ms:8000,opened:.06,actor:<></>,frontActor:true}}/>;}
// One authored SH001–003 camera move, measured against this facade's eight floors.
export function canyonCamera(ms:number){const enter=ramp(ms,8500,12900);return {
 x:mix(1100,520,enter),y:mix(60,-1980,enter),scale:mix(.42,1.9,enter),enter,
 reveal:ramp(ms,9900,11900),travel:ramp(ms,1500,10000),
};}
function Room({ms,index}:{ms:number;index:number}){
 const hero=index===4;
 return <div style={{...abs,left:96,top:335+index*213.3,width:536,height:213.3,overflow:'hidden',background:'#c3a36c'}}>
  <div style={{...abs,left:-110*.3153,top:-40*.2922,width:1920,height:1080,transform:'scale(.3153,.2922)',transformOrigin:'0 0'}}>
   {art('room',{left:0,top:0,width:1920})}
   <div style={{...abs,left:38.4,top:21.6,transform:'scale(.96)',transformOrigin:'0 0'}}><Resident ms={ms} neighbor={hero?0:index+1}/></div>
  </div>
  <AbsoluteFill style={{background:hero?'#dfa452':'#172339',opacity:hero?.12:.72+(index===5?.17*ramp(ms,12900,14000):0)}}/>
  <div style={{...abs,left:0,right:0,bottom:0,height:9,background:'#766247',boxShadow:'0 -3px 4px #2a182e66'}}/>
 </div>;
}
export function CanyonOpening(){
 const ms=useCurrentFrame()*1000/30,c=canyonCamera(ms);
 return <AbsoluteFill style={{background:'#080f26',overflow:'hidden'}}>
  {art('backdrop',{left:-80-35*c.travel,top:-40,width:2100,transform:`scale(${1+.035*c.travel})`})}
  {/* Independent cards at three depths; the city remains around the cutaway. */}
  {[
   ['left',380,230,330,.2],['right',730,230,350,.25],['right',1470,180,380,.32],
   ['right',-20,130,690,.65],['left',1510,80,650,.8],
  ].map(([name,x,y,w,depth],i)=>art(String(name),{left:Number(x)-(Number(x)<960?1:-1)*c.travel*Number(depth)*150-c.enter*(Number(x)<960?200:-180),top:Number(y)-c.travel*30,width:Number(w)*(1+c.travel*Number(depth)*.15),filter:`brightness(${.7+i*.06-.23*c.enter})`,zIndex:i+1}))}
  <div style={{...abs,left:c.x,top:c.y,width:726,height:2167,transform:`scale(${c.scale})`,transformOrigin:'0 0',zIndex:7}}>
   <div style={{...abs,left:76,top:308,width:574,height:1750,background:'#23333e',boxShadow:'12px 12px 12px #050a1a88'}}/>
   {Array.from({length:8},(_,index)=><Room key={index} ms={ms} index={index}/>)}
   {/* Retain the illustrated uprights and floor edges when the cover opens. */}
   {[[44,308,78,1750],[602,308,88,1750],...[335,548,761,974,1187,1400,1613,1826,2039].map(y=>[110,y-10,502,20])].map(([x,y,w,h],i)=><div key={i} style={{...abs,left:x,top:y,width:w,height:h,overflow:'hidden'}}>{art('hero',{left:-x,top:-y,width:726})}</div>)}
   {/* One intact, rigid GPU shroud slides aside. Rooms never move with it. */}
   <div style={{...abs,left:-800*c.reveal,top:-25*Math.sin(Math.PI*c.reveal),width:726,height:2167,filter:'drop-shadow(8px 12px 7px #05091c66)'}}>
    {art('hero',{left:0,top:0,width:726})}
    {[166,425].map(x=><div key={x} style={{...abs,left:x,top:1212,width:133,height:125,background:'radial-gradient(ellipse,#ffe7a0bb,transparent 75%)',boxShadow:'0 0 20px #ffc36a66',mixBlendMode:'screen',opacity:.6*ramp(ms,7200,9000)}}/>)}
   </div>
  </div>
  {art('left',{left:-550-420*c.travel-700*c.enter,top:-350,width:1120,zIndex:8,filter:'brightness(.65)'})}
  {art('right',{left:1590+350*c.travel+600*c.enter,top:-380,width:1100,zIndex:8,filter:'brightness(.7)'})}
  <AbsoluteFill style={{zIndex:9,background:'linear-gradient(90deg,#03091b80,transparent 52%),linear-gradient(0deg,#03091b70,transparent 28%)',pointerEvents:'none'}}/>
  <div style={{...abs,inset:0,zIndex:10}}><OpeningTitle ms={ms}/></div>
  <div style={{...abs,inset:0,zIndex:11,transform:'scale(.92)'}}><Song captionsOnly layoutOverride="lower-center"/></div>
  <AbsoluteFill style={{zIndex:20,background:'#000',opacity:1-ramp(ms,1500,3000)}}/>
 </AbsoluteFill>;
}
