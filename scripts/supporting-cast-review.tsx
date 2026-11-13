// Art-direction fitting study: ordinary transforms, the approved body library,
// and per-pose placements. No animation rig or new character artwork.
import {AbsoluteFill, Composition, Img, registerRoot, staticFile} from 'remotion';
import {agent407} from '../src/sprites';

type Pose = keyof typeof agent407;
type Role = 'organizer'|'protester'|'courier';
const dimensions = {clipboard:[1373,1541],placard:[1512,1399],satchel:[1512,1399],envelope:[1736,1224]} as const;

function Character({role,pose}:{role:Role;pose:Pose}) {
  const sprite=agent407[pose];
  const prop=(name:keyof typeof dimensions,x:number,y:number,scale:number,angle:number,pivot:[number,number],clipPath?:string)=>{
    const [w,h]=dimensions[name];
    return <Img src={staticFile(`accessories/${name}-v1.png`)} style={{position:'absolute',left:x-w*scale*pivot[0],top:y-h*scale*pivot[1],width:w*scale,height:h*scale,transformOrigin:`${pivot[0]*100}% ${pivot[1]*100}%`,transform:`rotate(${angle}deg)`,clipPath}}/>;
  };
  const hand=sprite.anchors.leftHand;
  const walking=pose==='walking';
  // Satchel upper strap rests at shoulder; bag rests at opposite hip.
  const satchel=(front:boolean)=>prop('satchel',walking?790:760,1085,.45,walking?-42:-35,[.5,.5],front?'polygon(34% 0,100% 0,100% 100%,0 100%,0 59%,43% 59%,34% 26%)':undefined);
  return <div style={{position:'absolute',width:1400,height:1500}}>
    {role==='courier'&&satchel(false)}
    {role==='organizer'&&prop('clipboard',hand[0],hand[1],.27,pose==='surprised'?-38:-16,[.78,.64])}
    {role==='protester'&&prop('placard',hand[0],hand[1],.44,-64,[.50,.82])}
    {role==='courier'&&prop('envelope',hand[0],hand[1],.25,-18,[.74,.52])}
    <Img src={staticFile(sprite.src)} style={{position:'absolute',width:1400,height:1500}}/>
    {role==='courier'&&satchel(true)}
  </div>;
}

const roles:Role[]=['organizer','protester','courier'];
const labels=['PhaseOne / the organizer','The Ethical Protester','The Courier'];
const notes=['Careful holds; brief overwhelmed reactions','Quiet resolve; sympathetic, restrained timing','Quick hops; shoulder strap and hip bag'];
const Sheet=()=> <AbsoluteFill style={{background:'#eae1d0',fontFamily:'Arial, sans-serif',color:'#59483c'}}>
  <div style={{position:'absolute',left:45,top:30,fontSize:32}}>SWARM SONG / supporting cast / prop-fit review</div>
  <div style={{position:'absolute',left:45,top:75,fontSize:20}}>Approved shared bodies · detachable props · blank paperwork/sign pending story text</div>
  {roles.flatMap((role,col)=>[0,1].map(row=>{
    const pose:Pose=row===0?'standing':role==='organizer'?'surprised':role==='protester'?'standing':'walking';
    return <div key={role+row} style={{position:'absolute',left:30+col*590,top:125+row*710,width:560,height:680,borderRadius:18,background:row?'#243b49':'#fbf3e4',color:row?'#fbf3e4':'#59483c'}}>
      <div style={{position:'absolute',left:30,top:15,width:504,height:540,transform:'scale(.36)',transformOrigin:'top left'}}><Character role={role} pose={pose}/></div>
      <div style={{position:'absolute',left:20,top:565,fontSize:25}}>{labels[col]}</div>
      <div style={{position:'absolute',left:20,top:604,fontSize:17}}>{row?`${pose} / dark-background fit check`:notes[col]}</div>
    </div>;
  }))}
</AbsoluteFill>;
const Props=()=> <AbsoluteFill style={{background:'#eae1d0',fontFamily:'Arial, sans-serif',color:'#59483c'}}>
  <div style={{position:'absolute',left:40,top:30,fontSize:30}}>SWARM SONG / separate supporting props / light + dark alpha review</div>
  {(Object.keys(dimensions) as (keyof typeof dimensions)[]).map((name,i)=><div key={name} style={{position:'absolute',left:30+i%2*790,top:100+Math.floor(i/2)*610}}>
    {['#fbf3e4','#243b49'].map((background,j)=><div key={background} style={{position:'absolute',left:j*375,width:375,height:510,background}}><Img src={staticFile(`accessories/${name}-v1.png`)} style={{width:375,height:500,objectFit:'contain'}}/></div>)}
    <div style={{position:'absolute',top:530,width:750,fontSize:25}}>{name} / separate transparent master</div>
  </div>)}
</AbsoluteFill>;
// Display at approximately equal cheek width, never equal file width: the sign
// extends the canvas without making its bearer a smaller species.
const equipped = [
  {name:'Approved clean baseline',src:'characters/agent407/standing-v1.png',w:1400,h:1500,scale:.39,x:693,y:1363},
  {name:'PhaseOne / integrated grip',src:'characters/equipped-v1/phaseone-standing-v1.png',w:1412,h:1498,scale:.435,x:700,y:1284},
  {name:'Protester / centered pole v2',src:'characters/equipped-v1/protester-standing-v2.png',w:1508,h:1402,scale:.50,x:640,y:1151},
  {name:'Courier / worn satchel',src:'characters/equipped-v1/courier-standing-v1.png',w:1412,h:1498,scale:.435,x:700,y:1287},
];
const Equipped=()=> <AbsoluteFill style={{background:'#eae1d0',fontFamily:'Arial, sans-serif',color:'#59483c'}}>
  <div style={{position:'absolute',left:35,top:25,fontSize:30}}>SWARM SONG / integrated equipped sprites / first review</div>
  <div style={{position:'absolute',left:35,top:68,fontSize:20}}>Same baseline proportions · natural grip and strap contact · separate clean masters retained</div>
  {equipped.flatMap((a,col)=>[0,1].map(row=><div key={a.name+row} style={{position:'absolute',left:20+col*540,top:115+row*610,width:520,height:590,borderRadius:16,background:row?'#243b49':'#fbf3e4',color:row?'#fbf3e4':'#59483c'}}>
    <Img src={staticFile(a.src)} style={{position:'absolute',left:(col===2?220:260)-a.x*a.scale,top:510-a.y*a.scale,width:a.w*a.scale,height:a.h*a.scale}}/>
    <div style={{position:'absolute',left:18,top:545,fontSize:22}}>{a.name}</div>
  </div>))}
</AbsoluteFill>;
registerRoot(()=> <>
  <Composition id="EquippedCast" component={Equipped} width={2180} height={1350} fps={30} durationInFrames={1}/>
  <Composition id="SupportingCast" component={Sheet} width={1800} height={1580} fps={30} durationInFrames={1}/>
  <Composition id="SupportingProps" component={Props} width={1600} height={1320} fps={30} durationInFrames={1}/>
</>);
