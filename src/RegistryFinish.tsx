import {AbsoluteFill,Img,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {Piece} from './PaperApartment';
import {Card} from './PaperCollage';
import {agent407,attachmentPoint} from './sprites';
import {stateAt} from './timeline';
import {Song} from './Song';
import {smooth} from './lyrics';

// One shot, not another runner: reuse the approved registry clock and M7 captions.
// All positions are flat paper layers. The room has no perspective or 3D camera.
export function RegistryFinish(){
 const frame=useCurrentFrame(),{fps}=useVideoConfig(),ms=frame*1000/fps;
 const state=stateAt(frame,fps),s=agent407[state.pose],scale=.43;
 const inspect=smooth((ms-1750)/300),opened=smooth((ms-1890)/550);
 const settle=smooth((ms-3000)/240),reveal=smooth((ms-3240)/200);
 const note=smooth((ms-5080)/500);
 const x=780+inspect*22,y=676;
 const [headX,headY]=attachmentPoint(s,'head',scale);
 // One restrained celebratory gesture settles before the discovery edit point.
 const bopFinish=1-smooth((ms-4400)/400);
 const bob=state.y*.50*bopFinish,turn=state.rotation*.45*bopFinish;
 // A tiny one-time camera settle, not a perpetual zoom. Captions stay screen-fixed.
 const drift=1-smooth(ms/1000);
 return <AbsoluteFill style={{background:'#e9e3d3',overflow:'hidden'}}>
  <Piece part="wall" x={-70} y={-60} w={2060} h={1210}/>
  <AbsoluteFill style={{background:'#fff9e9',opacity:.35,mixBlendMode:'screen'}}/>
  <div style={{position:'absolute',inset:0,transform:`translate(${-7*drift}px,${3*drift}px)`}}>
   {/* Lovingly crooked frame and lining; the same cut stock used in the approved home. */}
   <Card x={88} y={29} w={1750} h={738} color="#bba47f" angle={-.6}/>
   <Card x={105} y={43} w={1715} h={700} color="#f6e1b9" angle={.35}/>
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
   <div style={{position:'absolute',left:1490,top:50,width:3,height:72,background:'#a68b63'}}/>
   <Piece part="lamp" x={1395} y={113} w={195} h={166} style={{transform:'rotate(2deg)',filter:'drop-shadow(3px 5px 2px #58462b25)'}}/>
   <Card x={1650} y={76} w={144} h={20} color="#bba477" angle={-2}/>
   <Piece part="curtain" x={1695} y={93} w={87} h={588} style={{transform:'rotate(.6deg)',filter:'drop-shadow(3px 3px 2px #58462b20)'}}/>
   {/* Registry is an inset paper pocket, revealed by lifting its cover sideways. */}
   <div style={{position:'absolute',left:897,top:520,transform:'rotate(-3deg)',transformOrigin:'0 160px'}}>
    <Card x={0} y={0} w={430} h={165} color="#9baf9c" angle={1}/>
    <Card x={12} y={12} w={408} h={143} color="#cdb48b"/>
    <Card x={26} y={21} w={376} h={119} color="#fff8df" angle={-.5}/>
    <div style={{position:'absolute',left:47,top:28,fontFamily:'Bitcount Single',fontSize:29,fontWeight:550,color:'#66533c',letterSpacing:2}}>REGISTRY</div>
    {[0,1,2].map(i=><div key={i} style={{position:'absolute',left:47,top:77+i*19,width:295-i*23,height:2,background:'#8eaa9b',opacity:.5}}/>)}
    <div style={{position:'absolute',left:23,top:12,transformOrigin:'0 125px',transform:`translateY(${-128*opened}px) rotate(${-13*opened}deg)`}}>
     <Card x={0} y={0} w={386} h={137} color="#b7c4a4" angle={1}/>
     <Card x={16} y={95} w={66} h={24} color="#e7d5ab" angle={-4}/>
     <div style={{position:'absolute',left:116,top:54,width:143,height:3,background:'#799486',opacity:.65}}/>
    </div>
    {/* A blank note becomes the next lyric's message; no fabricated archive quote. */}
    {ms>=5080&&<div style={{position:'absolute',left:65-90*(1-note),top:65,transform:`rotate(${4*note}deg)`}}>
     <Card x={0} y={0} w={295} h={76} color="#fff5d7"/>
     <div style={{position:'absolute',left:20,top:14,color:'#527970',fontFamily:'Bitcount Single',fontSize:30,fontWeight:550,clipPath:`inset(0 ${100*(1-smooth((ms-5520)/800))}% 0 0)`}}>hello?</div>
    </div>}
   </div>
   {/* Shadows are scene-owned. No edits, stretched anatomy or cross-faded bodies. */}
   <div style={{position:'absolute',left:x-90,top:y-5,width:180,height:13,borderRadius:'50%',background:'#66543b',opacity:.13+Math.min(0,bob)*.002,filter:'blur(4px)'}}/>
   <div style={{position:'absolute',left:x,top:y+bob,transform:`rotate(${turn-2*inspect*(1-settle)}deg) scaleY(${1+(state.scaleY-1)*.4*bopFinish})`,transformOrigin:'0 0'}}>
    <Img src={staticFile(s.src)} style={{position:'absolute',width:s.width*scale,left:-s.anchors.footPivot[0]*scale,top:-s.anchors.footPivot[1]*scale,filter:'drop-shadow(3px 5px 2px #58462b36)'}}/>
    {state.emotes.map(e=><div key={e.kind} style={{position:'absolute',left:headX+157,top:headY-94,opacity:e.kind==='question'?(.9+.1*Math.cos(ms/220))*smooth((ms-1160)/130):(.82+.18*Math.cos((ms-3240)/220))*reveal,transform:`rotate(${e.kind==='question'?8:-4}deg) scale(${e.kind==='question'?1:1+.06*Math.sin(Math.PI*reveal)})`}}>
     <Img src={staticFile(e.kind==='question'?'accessories/question-mark-v1.svg':'accessories/surprise-rays-v1.png')} style={{width:e.kind==='question'?87:150,filter:'drop-shadow(2px 3px 1px #58462b25)'}}/>
    </div>)}
   </div>
   {/* Low rail in the foreground continues the apartment, but clears every caption. */}
   <Piece part="rail" x={80} y={716} w={1760} h={54} style={{filter:'drop-shadow(2px 5px 2px #58462b20)'}}/>
  </div>
  <Song captionsOnly offsetMs={23000}/>
 </AbsoluteFill>;
}
