import {AbsoluteFill,Img,staticFile,useCurrentFrame} from 'remotion';
import type {CSSProperties,ReactNode} from 'react';
import {agent407} from './sprites';
import {ease} from './pages-between';
import {paperState} from './paper-set';

// Six native components, measured after the existing 100px-padding preparation.
const parts={
 wall:{file:'kraft-wall-v1',size:[1648,1286],box:[176,167,1471,1083]},
 curtain:{file:'blue-curtain-v1',size:[1224,1736],box:[168,205,1057,1531]},
 lamp:{file:'folded-lamp-v1',size:[1736,1224],box:[387,171,1307,1028]},
 rail:{file:'veranda-front-v1',size:[2372,924],box:[159,236,2218,692]},
 quilt:{file:'ochre-quilt-v1',size:[1974,1087],box:[160,199,1813,887]},
 fan:{file:'paper-fan-v1',size:[1454,1454],box:[114,110,1332,1333]},
} as const;
const preserve:CSSProperties={position:'absolute',transformStyle:'preserve-3d'};
export function Piece({part,x=0,y=0,z=0,w,h,style={}}:{part:keyof typeof parts;x?:number;y?:number;z?:number;w:number;h:number;style?:CSSProperties}) {
 const p=parts[part],[l,t,r,b]=p.box;
 return <div style={{position:'absolute',left:x,top:y,width:w,height:h,transform:`translateZ(${z}px)`,...style}}>
  <Img src={staticFile(`milestone5/${p.file}.png`)} style={{position:'absolute',left:-l*w/(r-l),top:-t*h/(b-t),width:p.size[0]*w/(r-l),height:p.size[1]*h/(b-t)}}/>
 </div>;
}
function Panel({x=0,y=0,z=0,w,h,turn='',tint,children}:{x?:number;y?:number;z?:number;w:number;h:number;turn?:string;tint?:string;children?:ReactNode}) {
 return <div style={{...preserve,left:x,top:y,width:w,height:h,background:'#ceb58c',border:'1px solid #af916a',boxSizing:'border-box',overflow:'hidden',transformOrigin:'0 0',transform:`translateZ(${z}px) ${turn}`}}>
  <Piece part="wall" w={w} h={h}/>
  {tint&&<div style={{position:'absolute',inset:1,background:tint,mixBlendMode:'multiply'}}/>}
  {children}
 </div>;
}
function Strip({x,y,z,w,h,tint='#d6ba84',angle=0}:{x:number;y:number;z:number;w:number;h:number;tint?:string;angle?:number}) {
 return <div style={{...preserve,left:x,top:y,width:w,height:h,overflow:'hidden',background:'#dbc49b',transform:`translateZ(${z}px) rotate(${angle}deg)`}}>
  <Piece part="wall" w={w} h={h}/><div style={{position:'absolute',inset:0,background:tint,mixBlendMode:'multiply',borderBottom:'2px solid #8b7457'}}/>
 </div>;
}
function Resident({x=270,z=-28,role='agent'}:{x?:number;z?:number;role?:'agent'|'organizer'|'courier'}) {
 const sprite=agent407.standing,scale=.16;
 return <div style={{...preserve,left:x,top:320,transform:`translateZ(${z}px)`}}>
  {role==='agent'?<Img src={staticFile(sprite.src)} style={{position:'absolute',width:sprite.width*scale,left:-sprite.anchors.footPivot[0]*scale,top:-sprite.anchors.footPivot[1]*scale}}/>:
  <Img src={staticFile(`nightshift/stickers/${role==='organizer'?'phaseone':'courier'}-wardrobe-v1.png`)} style={{position:'absolute',width:1417*.21,left:-675*.21,top:-1210*.21}}/>}
 </div>;
}
export function PaperRoom({ms=0,role='agent',showResident=true}:{ms?:number;role?:'agent'|'organizer'|'courier';showResident?:boolean}) {
 const {retreat,close,light}=paperState(ms);
 const homeX=role==='organizer'?305:role==='courier'?240:270;
 const decorX=role==='organizer'?25:role==='courier'?55:0;
 return <div style={{...preserve,width:480,height:320}}>
  <Panel z={-180} w={480} h={320} tint={role==='organizer'?'#f3e3c5':role==='courier'?'#e5e9d0':'#f6ead4'}>
   <div style={{position:'absolute',inset:0,background:`radial-gradient(ellipse at 65% 30%,rgba(255,208,124,${.45*light}),transparent 70%),linear-gradient(#392d2699,transparent 34%),linear-gradient(90deg,#392d2640,transparent 12%,transparent 82%,#392d2660),linear-gradient(0deg,#3b3a3055,transparent 13%)`}}/>
  </Panel>
  <Panel y={320} z={-180} w={480} h={205} turn="rotateX(90deg)" tint="#a4b7a6">
   <div style={{position:'absolute',left:homeX-29+110*retreat,top:145-85*retreat,width:58,height:16,background:'#302f27bb',borderRadius:'50%',filter:'blur(1.5px)'}}/>
   <div style={{position:'absolute',left:165,top:10,width:270,height:170,background:`radial-gradient(ellipse,rgba(255,218,151,${.36*light}),transparent 70%)`}}/>
  </Panel>
  <Panel z={-180} w={180} h={320} turn="rotateY(-90deg)" tint="#b1c4bd"/>
  <Panel x={480} z={-180} w={180} h={320} turn="rotateY(-90deg)" tint="#bdcdc3"/>
  <Strip x={0} y={0} z={-178} w={7} h={320} tint="#a2b6ab"/>
  <Strip x={473} y={0} z={-178} w={7} h={320} tint="#a2b6ab"/>
  <Strip x={14} y={22} z={-177} w={46} h={13} tint="#dbc9a3" angle={-13}/>
  {/* A folded bed: separate headboard, mattress plane, front fascia and pillow. */}
  {role==='agent'?<>
  <Panel x={35} y={182} z={-149} w={155} h={120} tint="#99b5aa"/>
  <div style={{position:'absolute',left:32,top:319,width:164,height:125,background:'#3e382555',transformOrigin:'0 0',transform:'translateZ(-151px) rotateX(90deg)',filter:'blur(3px)'}}/>
  <Panel x={35} y={268} z={-150} w={155} h={115} turn="rotateX(90deg)" tint="#dfbc72"/>
  <Panel x={35} y={268} z={-35} w={155} h={49} tint="#d5ac69"/>
  <Panel x={56} y={246} z={-145} w={110} h={52} turn="rotateX(65deg)" tint="#fff8e6"/>
  <div style={{...preserve,left:29,top:267,transformOrigin:'0 0',transform:'translateZ(-105px) rotateX(90deg)'}}><Piece part="quilt" w={168} h={75}/></div>
  <Piece part="quilt" x={29} y={259} z={-31} w={168} h={58}/>
  </>:<>
   <Panel x={35} y={224} z={-145} w={165} h={100} turn="rotateX(90deg)" tint="#aac1b1"/>
   <Strip x={40} y={225} z={-45} w={12} h={95} tint="#bca880"/>
   <Strip x={181} y={225} z={-45} w={12} h={95} tint="#bca880"/>
   <Panel x={65} y={221} z={-110} w={65} h={45} turn="rotateX(90deg)" tint="#fff7e3"/>
  </>}
  <div style={{...preserve,left:decorX,top:role==='courier'?18:0}}>
  {/* One shelf with individually folded blank books and a tiny note. */}
  <Panel x={38} y={105} z={-179} w={150} h={45} turn="rotateX(90deg)" tint="#c7a777"/>
  <Strip x={38} y={105} z={-134} w={150} h={5} tint="#b39568"/>
  <Strip x={49} y={109} z={-171} w={10} h={22} tint="#c7b18c" angle={-10}/>
  <Strip x={169} y={109} z={-171} w={10} h={22} tint="#c7b18c" angle={8}/>
  <Strip x={43} y={67} z={-156} w={20} h={39} tint="#8aa9a0" angle={-6}/>
  <Strip x={68} y={60} z={-154} w={21} h={46} tint="#d09a7e" angle={4}/>
  <Strip x={94} y={65} z={-155} w={18} h={41} tint="#bdb58d"/>
  <Piece part="wall" x={215} y={103} z={-178} w={39} h={52} style={{transform:'translateZ(-178px) rotate(5deg)'}}/>
  <Strip x={224} y={99} z={-176} w={20} h={8} tint="#e0c897" angle={-7}/>
  </div>
  {/* Shade, cord and illumination are separate. No glow baked into the master. */}
  <div style={{position:'absolute',left:334,top:0,width:2,height:44,background:'#9c8057',transform:'translateZ(-90px)'}}/>
  <Piece part="lamp" x={295} y={40} z={-90} w={80} h={74}/>
  <div style={{position:'absolute',left:310,top:99,width:48,height:8,borderRadius:'50%',background:'#ffe6a8',boxShadow:'0 0 14px #ffd484',opacity:light,transform:'translateZ(-88px)'}}/>
  {showResident&&<Resident x={homeX+110*retreat} z={-28-85*retreat} role={role}/>}
  <Strip x={277} y={22} z={-3} w={202} h={8} tint="#b49d77"/>
  <Piece part="curtain" x={280+164*(1-close)} y={30} z={-2} w={36+164*close} h={279}/>
  {/* These are actual foreground cardstock rails, in front of the resident plane. */}
  <Piece part="rail" x={0} y={267} z={26} w={480} h={74}/>
  <Strip x={0} y={0} z={27} w={12} h={341} tint="#c6ad86"/>
  <Strip x={468} y={0} z={27} w={12} h={341} tint="#c6ad86"/>
  <Panel z={-180} w={480} h={205} turn="rotateX(90deg)" tint="#e0d2b5"/>
 </div>;
}

export function PaperBuilding({ms=0,explode=0}:{ms?:number;explode?:number}) {
 return <div style={{...preserve,width:930,height:1054}}>
  {/* GPU face and its three edge fins are separate from the inhabited edge. */}
  {[0,1,2].map(i=><Panel key={i} x={-475-i*16} y={-18+(i%3)*2} z={-240-explode*.4} w={180} h={1040} turn="rotateY(-90deg)" tint="#b7b4a0"/>)}
  <Panel x={-450-explode} z={-180} w={450} h={1025} tint="#a3b6ab"/>
  <Panel x={-450-explode} z={38+explode} w={450} h={1025} tint="#6d9d99"/>
  <Panel x={-450-explode} z={-180} w={450} h={220} turn="rotateX(90deg)" tint="#c3c5ae"/>
  {[115,575].map((y,i)=><Piece key={y} part="fan" x={-405-explode} y={y} z={70+explode*2} w={350} h={350} style={{transform:`translateZ(${70+explode*2}px) rotate(${i?12:-5}deg)`,filter:'drop-shadow(3px 5px 2px #304d4b66)'}}/>)}
  <Strip x={-417-explode} y={35} z={42+explode} w={65} h={20} tint="#e8d1a2" angle={-12}/>
  <Strip x={-96-explode} y={960} z={42+explode} w={70} h={18} tint="#e8d1a2" angle={7}/>
  {Array.from({length:12},(_,i)=><Strip key={i} x={-405+i*30-explode} y={1000} z={44+explode} w={21} h={50} tint="#d2ad69"/>)}
  {(['organizer','agent','courier'] as const).map((role,i)=><div key={role} style={{...preserve,top:i*(342+explode*.4),left:explode*.5,transform:`translateZ(${explode*.3}px)`}}><PaperRoom role={role} ms={role==='agent'?ms:0}/></div>)}
  {/* A thick platform supports the module; front corrugation is a physical edge. */}
  <Panel x={-500} y={1054+explode*.3} z={-280} w={1040} h={520} turn="rotateX(90deg)" tint="#9fb4a4"><div style={{position:'absolute',left:45,top:70,width:945,height:260,background:'#344e3b55',filter:'blur(7px)'}}/></Panel>
  <Panel x={-500} y={1054+explode*.3} z={240} w={1040} h={14} tint="#c7ad83"/>
 </div>;
}
export function PaperSet({still=false,exploded=false}:{still?:boolean;exploded?:boolean}) {
 const frame=useCurrentFrame(),ms=still?0:frame*1000/30,p=paperState(ms).camera,inside=paperState(ms).inside,approach=paperState(ms).approach;
 return <AbsoluteFill style={{background:'radial-gradient(ellipse at 55% 35%,#f5e5cd,#b8c8c6 80%)',perspective:1900,perspectiveOrigin:'50% 45%',overflow:'hidden'}}>
  {inside?<div style={{...preserve,left:520,top:-450,width:480,height:1025,transform:'scale(1.9) rotateX(-7deg) rotateY(-9deg)',transformOrigin:'0 0'}}><PaperBuilding ms={ms}/></div>:
  <div style={{...preserve,left:930,top:25,width:480,height:1025,transform:`translateX(${-35*p-70*approach}px) scale(${exploded?.53:.70+.1*approach}) rotateX(-5deg) rotateY(${-17+7*p}deg)`,transformOrigin:'0 510px'}}><PaperBuilding ms={ms} explode={exploded?140:0}/></div>}
 </AbsoluteFill>;
}
export function MaterialTest({showResident=true}:{showResident?:boolean}) {
 const frame=useCurrentFrame(),ms=frame*1000/30,p=ease(ms,0,3500);
 return <AbsoluteFill style={{background:'radial-gradient(ellipse at 45% 35%,#eadcc5,#b7c3be 75%)',perspective:1700,perspectiveOrigin:'50% 45%',overflow:'hidden'}}>
  <div style={{...preserve,left:720,top:310,width:480,height:320,transform:`translateX(${-25*p}px) scale(1.8) rotateX(-10deg) rotateY(${-18+8*p}deg)`,transformOrigin:'240px 160px'}}>
   <Panel x={-100} y={342} z={-280} w={680} h={490} turn="rotateX(90deg)" tint="#9aafa2"><div style={{position:'absolute',left:95,top:95,width:500,height:230,background:'#334b3e44',filter:'blur(8px)'}}/></Panel>
   <PaperRoom ms={ms} showResident={showResident}/>
  </div>
 </AbsoluteFill>;
}
