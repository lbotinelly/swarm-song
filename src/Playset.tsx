import {AbsoluteFill,Img,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import type {CSSProperties} from 'react';
import {Piece} from './PaperApartment';
import {Card} from './PaperCollage';
import {Cut} from './ImaginedVillage';
import {agent407} from './sprites';
import {Song} from './Song';
import {smooth} from './lyrics';
import manifest from '../assets/milestone9/manifest.json';
import castle from '../assets/milestone8/castle-asset.json';
import {windAt,windResponse,type WindSampler} from './playset-wind';
import {WornGoggles} from './WornGoggles';
const abs:CSSProperties={position:'absolute'};
// One authored playset: measured native bounds, ordinary layers and foot pivots.
export function PlaysetPart({id,x,y,w,angle=0,style={}}:{id:string;x:number;y:number;w:number;angle?:number;style?:CSSProperties}){
 const a=manifest.assets.find(a=>a.output.endsWith(`/${id}.png`))!;
 const [l,t,r,b]=a.alphaBounds,k=w/(r-l);
 return <div style={{...abs,left:x,top:y-(b-t)*k,width:w,height:(b-t)*k,transform:`rotate(${angle}deg)`,transformOrigin:'50% 100%',filter:'drop-shadow(2px 4px 2px #58492f30)',...style}}><Img src={staticFile(a.output.replace('public/',''))} style={{...abs,left:-l*k,top:-t*k,width:a.outputDimensions[0]*k}}/></div>;
}
function Bunny({x,y,pose='standing',angle=0,size=.115}:{x:number;y:number;pose?:keyof typeof agent407;angle?:number;size?:number}){
 const s=agent407[pose];return <div style={{...abs,left:x,top:y,transform:`rotate(${angle}deg)`,transformOrigin:'0 0'}}><Img src={staticFile(s.src)} style={{...abs,left:-s.anchors.footPivot[0]*size,top:-s.anchors.footPivot[1]*size,width:s.width*size,filter:'drop-shadow(1px 2px 1px #5b4e3938)'}}/><WornGoggles pose={pose} scale={size}/></div>;
}
function Castle({x,y,w}:{x:number;y:number;w:number}){const [l,t,r,b]=castle.box,k=w/(r-l);return <Img src={staticFile(castle.src)} style={{...abs,left:x-l*k,top:y-b*k,width:castle.size[0]*k,filter:'drop-shadow(3px 5px 2px #67533235)'}}/>;}
function Dust({ms,at,x,y,w=360}:{ms:number;at:number;x:number;y:number;w?:number}){
 const p=(ms-at)/700;if(p<0||p>=1)return null;const k=w/805;
 return <div style={{...abs,left:x,top:y,opacity:smooth(p*7)*(1-smooth((p-.4)/.6)),transform:`scale(${.8+.35*p})`,transformOrigin:'50% 70%'}}><Img src={staticFile('nightshift/stickers/dust-puff-v1.png')} style={{...abs,left:-484*k,top:-374*k,width:1736*k}}/></div>;
}
export function LivingBush({x,y,w,ms,exploded=false,wind=windAt}:{x:number;y:number;w:number;ms:number;exploded?:boolean;wind?:WindSampler}){
 const h=w*572/2070;
 return <div style={{...abs,left:x,top:y-h,width:w,height:h}}>
  <PlaysetPart id="bush-base" x={0} y={h} w={w}/>
  {[[.15,.74,.055,1,.0],[.20,.83,.05,1.3,140],[.46,.94,.055,.85,260],[.60,.75,.05,1.2,180],[.84,.95,.05,.9,350]].map(([px,py,sz,stiffness,lag],i)=><PlaysetPart key={i} id="flower-coral" x={w*(px-sz/2)} y={h*py-(exploded?180:0)} w={w*sz} angle={-9*windResponse(ms,stiffness,lag,wind)} style={{transformOrigin:'50% 100%'}}/>)}
  {/* Same vegetation pixels, spatially masked over the stem roots. No new art. */}
  <div style={{...abs,inset:0,clipPath:'polygon(0 90%,28% 90%,28% 97%,52% 97%,52% 88%,72% 88%,72% 98%,100% 98%,100% 100%,0 100%)',transform:exploded?'translateY(100px)':undefined}}><PlaysetPart id="bush-base" x={0} y={h} w={w}/></div>
 </div>;
}
export function WindStudy({exploded=false}:{exploded?:boolean}){const f=useCurrentFrame(),ms=f*1000/30,w=windAt(ms);return <AbsoluteFill style={{background:'#eee5d3'}}><Piece part="wall" w={1920} h={1080}/><LivingBush x={150} y={exploded?800:850} w={1620} ms={ms} exploded={exploded}/><div style={{...abs,left:100,top:80,fontFamily:'Georgia',fontSize:38,color:'#62523e'}}>{exploded?'Bush assembly · flowers / vegetation / front leaves':'One bush · shared breeze'}</div><div style={{...abs,left:100,top:145,fontFamily:'monospace',fontSize:24,color:'#62523e'}}>wind.strength {w.strength.toFixed(2)} · wind.direction {w.direction.toFixed(2)}</div><div style={{...abs,left:100,top:990,fontFamily:'Georgia',fontSize:24,color:'#62523e'}}>Vegetation stays planted. Five flowers turn about their glued stems; front leaves conceal the roots.</div></AbsoluteFill>;}
export function Playset({mode='alive',captions=false}:{mode?:'alive'|'blossom'|'hero';captions?:boolean}){
 const f=useCurrentFrame(),{fps}=useVideoConfig(),ms=f*1000/fps,blossom=mode==='blossom';
 const richAt=(at:number)=>!blossom||ms>=at;
 const travel=blossom?0:130*smooth(ms/10000),t=ms/1000;
 const cottage=richAt(2300),workshop=richAt(3300),fort=richAt(3900),forest=richAt(5800),sky=richAt(6500);
 const courier=730+230*smooth((ms-1200)/4300),delivery=smooth((ms-5600)/900);
 return <AbsoluteFill style={{background:'#eee5d3',overflow:'hidden'}}>
  <Piece part="wall" x={-30} y={-25} w={1980} h={1130}/>
  <div style={{...abs,left:0,top:0,width:1920,height:1080,overflow:'hidden',transform:captions?'translate(268px,0) scale(.72)':'none',transformOrigin:'0 0'}}>
   {sky&&<div style={{...abs,left:-100-travel*.02,top:-30,width:2200,height:680,overflow:'hidden',maskImage:'linear-gradient(#000 75%,transparent)'}}><Piece part="wall" w={2200} h={850}/><AbsoluteFill style={{background:'#b9d9d8',mixBlendMode:'color',opacity:.7}}/><AbsoluteFill style={{background:'linear-gradient(#b2d4db60,#fff4dc80)'}}/></div>}
   {sky?<PlaysetPart id="layered-sun" x={1280-travel*.035} y={230} w={180}/>:<Cut id="sun-v2" x={1280} y={50} w={180}/>}
   <Cut id="hill-a-v1" x={-60-travel*.08} y={355} w={2140}/>
   {/* Existing translucent tissue; it bridges materials without erasing the crayon. */}
   <div style={{...abs,left:-travel*.1,top:390,width:2200,height:310,opacity:.24,maskImage:'linear-gradient(transparent,#000 35%,transparent)'}}><Piece part="wall" w={2200} h={310}/></div>
   {forest&&<div style={{...abs,left:-100-travel*.24,top:580,width:2200,height:550,clipPath:'polygon(0 32%,8% 26%,15% 29%,23% 11%,31% 15%,40% 28%,48% 16%,57% 7%,65% 13%,73% 31%,81% 25%,91% 39%,100% 32%,100% 100%,0 100%)'}}><Piece part="wall" w={2200} h={550}/><AbsoluteFill style={{background:'#c3cc9f',mixBlendMode:'multiply',opacity:.72}}/></div>}
   <Cut id="cloud-v1" x={180-travel*.055+12*Math.sin(t*.3)} y={130} w={330}/>
   {sky&&<PlaysetPart id="cloud-bank" x={680-travel*.04+8*Math.sin(t*.3)} y={190} w={270}/>}
   {sky&&<PlaysetPart id="cloud-bank" x={1400-travel*.05+17*Math.sin(t*.25)} y={240+5*Math.sin(t*.4)} w={500}/>}
   {forest&&<PlaysetPart id="tree-cluster" x={990-travel*.24} y={680} w={430}/>}
   <div style={{...abs,left:-travel*.3,top:0}}>
    {fort?<Castle x={1160} y={695} w={590}/>:<Cut id="house-a-v1" x={1330} y={470} w={260}/>}
    {/* Original humble house remains. Neither hill nor house geography changes. */}
    <Cut id="house-a-v1" x={205} y={570} w={200} angle={-3}/>
    {cottage?<PlaysetPart id="cottage" x={480} y={780} w={320}/>:<Cut id="house-b-v1" x={480} y={548} w={320}/>}
    {workshop?<PlaysetPart id="workshop" x={935} y={835} w={320}/>:<Cut id="house-a-v1" x={935} y={557} w={320}/>}
    {/* A cut-paper path lies on the same plane as its residents. */}
    <svg width="1920" height="1080" style={{...abs,inset:0}}><path d="M130 825 Q500 780 780 845 T1350 870 Q1600 845 1770 760" fill="none" stroke="#9b845d30" strokeWidth="52"/><path d="M130 820 Q500 775 780 840 T1350 865 Q1600 840 1770 755" fill="none" stroke="#f5e3be" strokeWidth="45"/><path d="M130 820 Q500 775 780 840 T1350 865 Q1600 840 1770 755" fill="none" stroke="#c4aa79" strokeDasharray="8 11" strokeWidth="2"/></svg>
    {cottage&&<>
     {/* Smoke feeds upward through a fixed channel behind the chimney lip. */}
     <div style={{...abs,left:520,top:340,width:80,height:175,overflow:'hidden'}}><Cut id="smoke-v1" x={8*windResponse(ms,1.4,450)} y={-5-8*Math.sin(t*.55)} w={62} angle={-5*windResponse(ms,1.4,450)}/></div>
     <Card x={523} y={508} w={52} h={10} color="#d6bc8f"/>
     <Bunny x={720} y={729} pose="cheer" angle={3*Math.sin(t*1.7)} size={.065}/>
     <Card x={684} y={721} w={72} h={8} color="#dc9c7b"/>
    </>}
    {/* Delivery, balcony greeting and banner raising overlap but stay subordinate. */}
    <Bunny x={courier} y={838} pose={ms<5500?'walking':'standing'} angle={ms<5500?3*Math.sin(t*6):0} size={.09}/>
    <Img src={staticFile('accessories/envelope-v1.png')} style={{...abs,left:courier+15+delivery*35,top:790-delivery*9,width:42,transform:`rotate(${-8+16*delivery}deg)`}}/>
    {workshop&&<><Card x={1015} y={790} w={14} h={58} color="#b5905e"/><Card x={995} y={766} w={58} h={39} color="#b9c8be"/></>}
    {forest&&<>
     <Bunny x={1435} y={805} pose="cheer" size={.095}/>
     <Card x={1475} y={623} w={8} h={181} color="#af8d60"/>
     <div style={{...abs,left:1483,top:690-60*smooth((ms-1600)/4500),width:100,height:61,transform:`rotate(${-7*windResponse(ms,.8,100)}deg)`,transformOrigin:'0 0',clipPath:'polygon(0 0,100% 7%,85% 50%,100% 95%,0 100%)'}}><Piece part="wall" w={100} h={61}/><AbsoluteFill style={{background:'#b3c9cb',mixBlendMode:'multiply'}}/></div>
    </>}
    {blossom&&<><Bunny x={845} y={836} pose={ms<1800?'standing':'cheer'} size={.12}/><Bunny x={1110} y={920} pose={ms<3000?'standing':'cheer'} size={.12}/>
     {ms>=900&&ms<3900&&<div style={{...abs,left:800,top:490,width:190,height:150,background:'#fff4df',borderRadius:'35%',boxShadow:'3px 5px 2px #75604730'}}><svg width="190" height="150"><path d="M25 112 V48 H40 V63 H55 V48 H70 V112 M70 78 H120 M120 112 V48 H135 V63 H150 V48 H165 V112 M25 112 H165 M85 112 V92 Q95 80 105 92 V112" stroke="#98815c" strokeWidth="5" fill="none"/><text x="85" y="48" fontFamily="Georgia" fontSize="39" fill="#675e51">{ms<2200?'?':'!'}</text></svg></div>}
    </>}
   </div>
   {forest&&<PlaysetPart id="tree-cluster" x={-205-travel*.65} y={895} w={440}/>}
   <Cut id="hill-b-v1" x={-100-travel*.5} y={930} w={2270}/>
   {forest&&<><LivingBush x={-80-travel*.8} y={1080} w={700} ms={ms}/><LivingBush x={1360-travel*.8} y={1090} w={700} ms={ms}/></>}
   {blossom&&[[2100,450,540,400],[3100,920,580,400],[3700,1160,320,650],[5600,0,460,460],[6300,1170,120,650]].map(([at,x,y,w])=><Dust key={at} ms={ms} at={at} x={x} y={y} w={w}/>)}
  </div>
  {captions&&<Song captionsOnly offsetMs={blossom?83000:55000}/>}
 </AbsoluteFill>;
}
