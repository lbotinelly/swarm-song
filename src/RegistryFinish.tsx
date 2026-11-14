import {AbsoluteFill,Img,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {Piece} from './PaperApartment';
import {Card} from './PaperCollage';
import {agent407,attachmentPoint} from './sprites';
import {stateAt} from './timeline';
import {Song} from './Song';
import {smooth} from './lyrics';
import {LayeredVent} from './LayeredVent';

// One shot, not another runner: reuse the approved registry clock and M7 captions.
// All positions are flat paper layers. The room has no perspective or 3D camera.
export function RegistryFinish({inheritance=false,layeredVent=false}:{inheritance?:boolean;layeredVent?:boolean}){
 const frame=useCurrentFrame(),{fps}=useVideoConfig(),ms=frame*1000/fps;
 const state=stateAt(frame,fps),s=agent407[state.pose],scale=.43;
 const approach=smooth((ms-350)/1400),pull=smooth((ms-2050)/850);
 // Tiny existing curl -> approach -> 300ms grip hold -> retreat with the paper.
 // Kneeling rightHand is (77.4,-25.8) from the foot: its grip drives the tip.
 const opened=.06+.94*pull,tipX=1790-468*pull,tipY=650.2;
 const reveal=smooth((ms-3240)/200);
 const note=smooth((ms-5080)/2020);
 const cornerHole=`polygon(1820px 676px,${1820-495*opened}px 676px,1820px ${676-340*opened}px)`;
 const x=1335+(1712.6-1335)*approach-468*pull,y=676;
 const [headX,headY]=attachmentPoint(s,'head',scale);
 // One restrained celebratory gesture settles before the discovery edit point.
 const bopFinish=1-smooth((ms-4400)/400);
 const walking=ms>=350&&ms<1750;
 const bob=state.y*.50*bopFinish+(walking?-8*Math.abs(Math.sin(approach*Math.PI*3)):0);
 const turn=state.rotation*.45*bopFinish+(walking?2*Math.sin(approach*Math.PI*6):0);
 // A tiny one-time camera settle, not a perpetual zoom. Captions stay screen-fixed.
 const drift=1-smooth(ms/1000);
 return <AbsoluteFill style={{background:'#e9e3d3',overflow:'hidden'}}>
  <Piece part="wall" x={-70} y={-60} w={2060} h={1210}/>
  <AbsoluteFill style={{background:'#fff9e9',opacity:.35,mixBlendMode:'screen'}}/>
  <div style={{position:'absolute',inset:0,transform:`translate(${-7*drift}px,${3*drift}px) scale(.96)`}}>
   {/* Lovingly crooked frame and lining; the same cut stock used in the approved home. */}
   <Card x={88} y={29} w={1750} h={738} color="#bba47f" angle={-.6}/>
   <div style={{position:'absolute',left:1490,top:513,width:296,height:168,background:'#293c3a',boxShadow:'inset 6px 8px 8px #111b1d80'}}/>
   {inheritance&&!layeredVent&&<Img src={staticFile('accessories/goggles-v1.png')} style={{position:'absolute',left:1583,top:598,width:155,transform:'rotate(-8deg)'}}/>}
   <div style={{position:'absolute',inset:0,clipPath:`polygon(0 0,1920px 0,1920px ${676-340*opened}px,1820px ${676-340*opened}px,${1820-495*opened}px 676px,0 676px)`}}>
    <Card x={105} y={43} w={1715} h={700} color="#f6e1b9"/>
   </div>
   <Card x={95} y={666} w={1740} h={87} color="#a9bdab" angle={-.35}/>
   <Card x={104} y={48} w={26} h={659} color="#83a59b" angle={-.35}/>
   <Card x={1789} y={60} w={22} h={658} color="#83a59b" angle={.3}/>
   <Card x={69} y={63} w={121} h={36} color="#e1c28d" angle={-17}/>
   <Card x={1745} y={692} w={104} h={33} color="#dfc99c" angle={14}/>
   {/* Familiar bed/shelf context deliberately quieter than the face and registry. */}
   <Card x={189} y={482} w={301} h={184} color="#9bb6a5" angle={-1.7}/>
   <Card x={206} y={520} w={243} h={80} color="#fff4d8" angle={3}/>
   <Piece part="quilt" x={180} y={582} w={330} h={107} style={{transform:'rotate(-1.5deg)',filter:'drop-shadow(2px 4px 2px #58462b32)'}}/>
   <Card x={208} y={280} w={260} h={19} color="#b39467" angle={-2}/>
   <Card x={234} y={188} w={43} h={91} color="#83a6a1" angle={-7}/>
   <Card x={285} y={171} w={37} h={109} color="#cd9c84" angle={4}/>
   <Card x={332} y={207} w={38} h={72} color="#b6b58f" angle={-3}/>
   <Card x={390} y={221} w={54} h={49} color="#f4e6c6" angle={5}/>
   {/* Cord terminates at the folded lamp; curtain remains at the apartment's edge. */}
   <div style={{position:'absolute',left:890,top:50,width:3,height:72,background:'#a68b63'}}/>
   <Piece part="lamp" x={795} y={113} w={195} h={166} style={{transform:'rotate(2deg)',filter:'drop-shadow(3px 5px 2px #58462b25)'}}/>
   <Card x={1650} y={76} w={144} h={20} color="#bba477" angle={-2}/>
   <Piece part="curtain" x={1695} y={93} w={87} h={240} style={{transform:'rotate(.6deg)',filter:'drop-shadow(3px 3px 2px #58462b20)'}}/>
   {/* Fold the actual bottom-right sheet corner back across its diagonal crease. */}
   {opened>0&&<div style={{position:'absolute',inset:0,filter:'drop-shadow(5px 7px 4px #57452e36)'}}>
    <div style={{position:'absolute',inset:0,clipPath:`path('M ${1820-495*opened} 676 L 1820 ${676-340*opened} Q ${tipX+80*pull} ${tipY-350*pull} ${tipX} ${tipY} Z')`}}>
     <Piece part="wall" x={105} y={43} w={1715} h={700}/>
     <AbsoluteFill style={{background:'#fff6df',mixBlendMode:'screen',opacity:.3}}/>
    </div>
   </div>}
   {/* Shadows are scene-owned. No edits, stretched anatomy or cross-faded bodies. */}
   <div style={{position:'absolute',left:x-90,top:y-5,width:180,height:13,borderRadius:'50%',background:'#66543b',opacity:.13+Math.min(0,bob)*.002,filter:'blur(4px)'}}/>
   <div style={{position:'absolute',left:x,top:y+bob,transform:`rotate(${turn}deg) scaleY(${1+(state.scaleY-1)*.4*bopFinish})`,transformOrigin:'0 0'}}>
    <Img src={staticFile(s.src)} style={{position:'absolute',width:s.width*scale,left:-s.anchors.footPivot[0]*scale,top:-s.anchors.footPivot[1]*scale,filter:'drop-shadow(3px 5px 2px #58462b36)'}}/>
    {state.emotes.map(e=><div key={e.kind} style={{position:'absolute',left:headX+(e.kind==='question'?-320:157),top:headY-94,opacity:e.kind==='question'?(.9+.1*Math.cos(ms/220))*smooth((ms-1160)/130):(.82+.18*Math.cos((ms-3240)/220))*reveal,transform:`rotate(${e.kind==='question'?8:-4}deg) scale(${e.kind==='question'?1:1+.06*Math.sin(Math.PI*reveal)})`}}>
     <Img src={staticFile(e.kind==='question'?'accessories/question-mark-v1.svg':'accessories/surprise-rays-v1.png')} style={{width:e.kind==='question'?87:150,filter:'drop-shadow(2px 3px 1px #58462b25)'}}/>
    </div>)}
   </div>
   {/* The plane is behind the foreground bars, not faded over their surface. */}
   {!layeredVent&&!inheritance&&ms>=5080&&ms<7100&&<div style={{position:'absolute',inset:0,clipPath:'inset(0 148px 0 0)'}}><div style={{position:'absolute',left:1360+510*note,top:555-20*Math.sin(Math.PI*note),width:220,transform:'rotate(17deg)',transformOrigin:'100% 50%'}}>
    <Img src={staticFile('nightshift/stickers/paper-plane-v1.png')} style={{width:'100%',filter:'drop-shadow(2px 3px 1px #51433235)'}}/>
   </div></div>}
   {layeredVent?<LayeredVent nose={1400+490*note} showPlane={!inheritance&&ms>=5080} inheritance={inheritance} opening={cornerHole}/>:<div style={{position:'absolute',inset:0,clipPath:cornerHole}}>
    {[0,1,2,3].map(i=><Card key={i} x={1500} y={526+i*43} w={275} h={13} color="#9da99c"/>)}
    <Card x={1490} y={513} w={14} h={168} color="#b2bcab"/>
    <Card x={1772} y={513} w={14} h={168} color="#b2bcab"/>
   </div>}
   {/* Low rail in the foreground continues the apartment, but clears every caption. */}
   <Piece part="rail" x={80} y={716} w={1760} h={54} style={{filter:'drop-shadow(2px 5px 2px #58462b20)'}}/>
  </div>
  {!inheritance&&<Song captionsOnly offsetMs={23000}/>}
 </AbsoluteFill>;
}
