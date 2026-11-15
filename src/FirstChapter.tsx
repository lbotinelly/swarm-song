import type {CSSProperties,ReactNode} from 'react';
import {AbsoluteFill,Img,staticFile,useCurrentFrame} from 'remotion';
import {CanyonOpening} from './CanyonOpening';
import {RegistryFinish} from './RegistryFinish';
import {Cushion} from './Opening';
import {ReadingBoard} from './MorningResident';
import {morningAt} from './morning-routines';
import {agent407,attachmentPoint} from './sprites';
import {pickAt,attachItem,type ItemPose} from './item-actions';
import {ramp} from './story-blocking';
import {chapterAt} from './first-chapter';
import {Song} from './Song';
import {Piece} from './PaperApartment';
import {Cut} from './ImaginedVillage';
import {CraftingHandoff} from './Storyboard';
import {ImaginationStage} from './ImaginationStage';
const abs:CSSProperties={position:'absolute'};
const picture=(src:string,x:number,y:number,w:number)=><Img src={staticFile(src)} style={{...abs,left:x,top:y,width:w}}/>;
const mounted=(p:ItemPose,node:ReactNode)=><div style={{...abs,left:p.x,top:p.y,transform:`rotate(${p.angle}deg) scale(${(p.facing??(p.flip?-1:1))*p.scale},${p.scale})`,transformOrigin:'0 0'}}>{node}</div>;
function Bunny({x,y=676,pose='standing',angle=0,children}:{x:number;y?:number;pose?:keyof typeof agent407;angle?:number;children?:ReactNode}){
 const s=agent407[pose],k=.43;return <div style={{...abs,left:x,top:y,transform:`rotate(${angle}deg)`,transformOrigin:'0 0'}}>{picture(s.src,-s.anchors.footPivot[0]*k,-s.anchors.footPivot[1]*k,s.width*k)}{children}</div>;
}
function Message({reply=false,writing=1,drawing=false,timeMs=39000}:{reply?:boolean;writing?:number;drawing?:boolean;timeMs?:number}){
 return <div style={{...abs,width:360,height:150,border:'7px solid #fff9ed',borderRadius:5,boxShadow:'3px 5px 2px #58452e44',transform:'rotate(-3deg)',transformOrigin:'0 0'}}>
  <Piece part="wall" w={360} h={150}/><AbsoluteFill style={{background:'#fff9e9',opacity:.6}}/>
  {drawing?<div style={{...abs,inset:0,clipPath:`inset(0 ${100*(1-writing)}% 0 0)`}}><div style={{...abs,width:1920,height:1080,transform:'scale(.1875,.138888889)',transformOrigin:'0 0'}}><CraftingHandoff ms={timeMs}/></div></div>:null}

 </div>;
}
function TaskList({ms}:{ms:number}){
 const a=morningAt(20000,4),from=attachItem({x:a.x,y:a.y,angle:a.angle,scale:1},{x:-100,y:-235,scale:.85,angle:-4+2*Math.sin(a.t/1000)});
 const p=pickAt(ms,{start:20000,duration:700,from,to:{x:930,y:489,angle:0,scale:.7},height:35,turn:5});
 return mounted(p.pose,<ReadingBoard/>);
}
function Explore({ms}:{ms:number}){
 const a=chapterAt(ms),walking=ms>=20700&&ms<22500,bob=walking?-6*Math.abs(Math.sin(ms/180))*Math.sin(Math.PI*ramp(ms,20700,22500)):0;
 return <><Bunny x={a.x} y={676+bob} pose={walking?'walking':ms>=22500&&ms<22800?'kneeling':'standing'} angle={a.angle}/><TaskList ms={ms}/></>;
}
function Pencil({ms,x,y}:{ms:number;x:number;y:number}){return <div style={{...abs,left:x-10,top:y-25,fontFamily:'Segoe UI Emoji',fontSize:62,transform:`rotate(${8*Math.sin(ms/90)}deg) translateY(${2*Math.sin(ms/70)}px)`,transformOrigin:'50% 80%'}}>✍️</div>;}

function Correspondent({ms,recipient=false}:{ms:number;recipient?:boolean}){
 const start=recipient?31200:28000,t=ms-start;
 const writing=recipient?t>=1800&&t<2600:t<900;
 const folding=recipient?t>=2600&&t<3000:t>=900&&t<1600;
 const send=recipient?t>=3000:t>=1600;
 const x=recipient?1244.6+70*(1-ramp(t,0,600)):1244.6;
 const pose=writing?'kneeling':recipient&&t>=350&&t<700?'surprised':'standing';
 const angle=writing?1.8*Math.sin(t/150):recipient&&t<1800?-3*Math.sin(t/400):send?-3*Math.sin(Math.PI*ramp(t,recipient?3000:1600,recipient?3600:2200)):0;
 const show=recipient?t>=800&&t<2900:t<1500;
 const fold=ramp(t,recipient?2600:900,recipient?2900:1500);
 const catchOpen=recipient?ramp(t,800,1100):1;
 const readPose=recipient&&!writing&&!folding;
 const paperX=readPose?1365+(1320-1365)*catchOpen:1300-20*fold;
 const paperY=readPose?557+(478-557)*catchOpen:578-33*fold;
 const paperScale=readPose?.24+.51*catchOpen:.65-.25*fold;
 return <>
  <Bunny x={x} pose={pose} angle={angle}/>
  {show&&mounted({x:paperX,y:paperY,angle:0,scale:paperScale},<div style={{transform:`scaleX(${1-.4*fold}) rotate(${fold*26}deg)`,transformOrigin:'50% 70%'}}><Message reply={recipient&&t>=1800} writing={writing?ramp(t,recipient?1800:100,recipient?2500:800):1}/></div>)}
  {writing&&<Pencil ms={ms} x={1315+5*Math.sin(ms/80)} y={565}/>}
  {folding&&show&&<div style={{...abs,left:1330,top:555,width:260,height:100,transform:`scaleX(${1-fold})`,transformOrigin:'100% 50%',background:'#fff8e7',clipPath:'polygon(0 0,100% 25%,55% 100%)'}}/>}
  {!recipient&&ms>=30900&&<div style={{...abs,left:1250,top:275,display:'flex',gap:12}}>{[0,1,2].map(i=><span key={i} style={{width:10,height:10,borderRadius:'50%',background:'#637f77',opacity:.3+.5*ramp(ms,30900+i*90,31000+i*90)}}/>)}</div>}
 </>;
}
function HeroInterior({ms}:{ms:number}){
 const a=chapterAt(ms),discover=ms>=23000&&ms<28000;
 const answered=ms>=35200;
 const actor=ms<23000?<Explore ms={ms}/>:discover?<></>:answered?<>
  <Bunny x={1244.6} pose={ms<36000?'surprised':ms>=36700&&ms<37300?'cheer':ms>=37300?'kneeling':'standing'} angle={ms>=36700?2*Math.sin(ms/700):0}/>
  {ms>=36000&&mounted({x:ms>=37300?1310:1365-55*ramp(ms,36000,36300),y:ms>=37300?578:557-82*ramp(ms,36000,36300)+103*ramp(ms,36500,36700),angle:-3*ramp(ms,36000,36300),scale:ms>=37300?.65:.24+.56*ramp(ms,36000,36300)-.15*ramp(ms,36500,36700)},<Message timeMs={ms} reply drawing={ms>=37300} writing={ramp(ms,37300,38600)}/>)}
  {ms>=37300&&ms<39000&&<Pencil ms={ms} x={1315+5*Math.sin(ms/80)} y={565}/>}</>:<Correspondent ms={ms}/>;
 const plane=ms>=29500&&ms<31200?{nose:a.outgoing,outbound:false}:ms>=35200&&ms<36000?{nose:a.answer,outbound:true}:undefined;
 return <RegistryFinish layeredVent captions={false} performance={{planeInFront:true,steadyRoom:true,ms:discover?ms-23000:8000,opened:a.opened,actor,frontActor:!discover,plane,setDressing:<><Cushion/>{ms>=23000&&<TaskList ms={ms}/>}</>}}/>;
}
function RecipientRoom({ms}:{ms:number}){
 const a=chapterAt(ms);
 // The incoming message interrupts a real activity: reading the morning news.
 const news=pickAt(ms,{start:31550,duration:300,from:{x:1170,y:475,angle:-4,scale:.65},to:{x:1020,y:489,angle:0,scale:.7},height:30,turn:4});
 return <RegistryFinish layeredVent captions={false} performance={{planeInFront:true,ms:8000,opened:1,second:true,frontActor:true,actor:ms>=37000?<><Bunny x={1244.6} pose="kneeling" angle={1.5*Math.sin(ms/180)}/>{mounted({x:1310,y:578,angle:0,scale:.65},<Message drawing writing={ramp(ms,37000,38900)}/>)}<Pencil ms={ms} x={1315+5*Math.sin(ms/80)} y={565}/></>:<Correspondent ms={ms} recipient/>,plane:ms<32000?{nose:a.incoming,outbound:true}:ms>=34100&&ms<35200?{nose:a.reply,outbound:false}:undefined,overlay:mounted(news.pose,<ReadingBoard news/>),setDressing:<>{picture('milestone11/morning/coffee-empty.png',220,420,260)}{picture('milestone11/morning/mug.png',335,550,95)}</>}}/>;
}
export function FirstChapter({aRollOnly=false,imaginationTurn=false}:{aRollOnly?:boolean;imaginationTurn?:boolean}){
 const ms=useCurrentFrame()*1000/30,a=chapterAt(ms),recipient=ms>=31200&&ms<35200;
 const lift=ramp(ms,39000,39360),land=ramp(ms,39360,40100);
 const motionBlur=imaginationTurn?(ms>=39360?80*(1-land):80*lift):0;
 return <AbsoluteFill style={{background:'#eee4ce',overflow:'hidden'}}>
  {imaginationTurn&&ms>=39000&&ms<40100&&<AbsoluteFill style={{background:'linear-gradient(#91bccd,#e8e8ce)'}}/>}
  <svg width="0" height="0"><defs><filter id="imagination-up-blur" x="-20%" y="-40%" width="140%" height="180%"><feGaussianBlur stdDeviation={`1 ${motionBlur}`}/></filter></defs></svg>
  <AbsoluteFill style={{transform:imaginationTurn?`translateY(${400*lift}px)`:undefined,opacity:imaginationTurn?1-ramp(ms,39220,39420):1,filter:motionBlur>.1?'url(#imagination-up-blur)':undefined}}>
  {!(imaginationTurn&&ms>=39420)&&<>
  {recipient?<AbsoluteFill style={{background:'#152335'}}><div style={{...abs,inset:0,transform:'translate(-180px,25px) scale(1.05)',transformOrigin:'0 0'}}><RecipientRoom ms={ms}/></div></AbsoluteFill>:<CanyonOpening dense active focus bottomCaptions captions={false} aRollOnly={aRollOnly} revealHeroEdge={ms>=20000} heroInterior={ms>=20000?<HeroInterior ms={ms}/>:undefined} heroForeground={ms>=23000&&ms<28000?<RegistryFinish actorOnly captions={false} performance={{ms:ms-23000,steadyRoom:true}}/>:undefined}/>}
  {ms>=37000&&ms<39000&&<div style={{...abs,left:30,top:40,width:1920,height:1080,transform:'scale(.23)',transformOrigin:'0 0',border:'12px solid #fff5df',boxShadow:'6px 8px 2px #18293d66'}}><RecipientRoom ms={ms}/></div>}
  {!imaginationTurn&&ms>=39000&&<div style={{...abs,left:1243*(1-a.unfolding),top:522*(1-a.unfolding),width:194+1726*a.unfolding,height:80+1000*a.unfolding,transform:`rotate(${-6*(1-a.unfolding)}deg)`,transformOrigin:'0 0',overflow:'hidden',boxShadow:a.unfolding<1?'5px 8px 4px #47382c55':undefined}}>
   <div style={{...abs,width:1920,height:1080,transform:`scale(${(194+1726*a.unfolding)/1920},${(80+1000*a.unfolding)/1080})`,transformOrigin:'0 0'}}><CraftingHandoff ms={ms}/></div>
  </div>}
  </>}
  </AbsoluteFill>
  {imaginationTurn&&ms>=39200&&<AbsoluteFill style={{opacity:ramp(ms,39200,39420),transform:`translateY(${-50*(1-land)}px) scale(${1+.12*(1-land)})`,filter:motionBlur>.1?'url(#imagination-up-blur)':undefined}}><ImaginationStage ms={ms}/></AbsoluteFill>}
  <AbsoluteFill style={{zIndex:30,isolation:'isolate',pointerEvents:'none'}}><Song captionsOnly layoutOverride="lower-center" bottomGradient captionScale={.78}/></AbsoluteFill>
 </AbsoluteFill>;
}
