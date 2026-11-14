import type {CSSProperties,ReactNode} from 'react';
import {AbsoluteFill,Img,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import board from '../assets/milestone8/storyboard.json';
import castleAsset from '../assets/milestone8/castle-asset.json';
import music from '../assets/milestone7/musical-cues-v6.json';
import drums from '../assets/milestone7/percussion-cues.json';
import direction from '../assets/milestone7/music-director-corrections.json';
import {Song,WordSticker} from './Song';
import {PaperCollage} from './PaperCollage';
import {Piece} from './PaperApartment';
import {Cut} from './ImaginedVillage';
import {agent407,attachmentPoint} from './sprites';
import {musicStateAt,percussionStateAt,percussionAllowedAt,type MusicCue} from './music-cues';
import {ramp,within,shotAt,middleTravel,gogglesAt,firstGenerationGoggles,objectorScreenX,middleGround,middleForestCount,craftFriendAt,crowdStrideAt,warningRunnerAt} from './story-blocking';
import {WornGoggles} from './WornGoggles';
const abs:CSSProperties={position:'absolute'};
const paper='#fff3d9',ink='#745743';
const img=(src:string,x:number,y:number,w:number,style:CSSProperties={})=><Img src={staticFile(src)} style={{...abs,left:x,top:y,width:w,...style}}/>;
function Tag({children,x=0,y=0,size=27,color=ink}:{children:ReactNode;x?:number;y?:number;size?:number;color?:string}){return <div style={{...abs,left:x,top:y,fontFamily:'Bitcount Single',fontWeight:550,fontSize:size,color,whiteSpace:'pre-line'}}>{children}</div>;}
function Card({x,y,w,h,color=paper,turn=0,children}:{x:number;y:number;w:number;h:number;color?:string;turn?:number;children?:ReactNode}){return <div style={{...abs,left:x,top:y,width:w,height:h,background:color,border:'3px solid #a28a6955',boxShadow:'3px 5px 0 #6d573325',transform:`rotate(${turn}deg)`,clipPath:'polygon(0 1%,99% 0,100% 99%,1% 100%)'}}>{children}</div>;}
function Goggles({x,y,w=145,turn=-6,opacity=1}:{x:number;y:number;w?:number;turn?:number;opacity?:number}){return img('accessories/goggles-v1.png',x-w/2,y-w*.275,w,{transform:`rotate(${turn}deg)`,opacity});}
function headMount(x:number,y:number,w:number,pose:keyof typeof agent407){const [dx,dy]=attachmentPoint(agent407[pose],'head',w/1400);return {x:x+dx,y:y+dy+w*.036,w:w*.45};}
function Actor({x,y=585,w=330,pose='standing',angle=0,goggles,role='',opacity=1,shrug=false,flip=false}:{x:number;y?:number;w?:number;pose?:keyof typeof agent407;angle?:number;goggles?:boolean;role?:string;opacity?:number;shrug?:boolean;flip?:boolean}){
 const frame=useCurrentFrame(),{fps}=useVideoConfig(),ms=frame*1000/fps,wears=goggles??firstGenerationGoggles(ms,ms>=208000);
 const s=agent407[pose],scale=w/s.width,[hx,hy]=attachmentPoint(s,'head',scale),[rx,ry]=attachmentPoint(s,'rightHand',scale);
 return <div style={{...abs,left:x,top:y,transform:`scaleX(${flip?-1:1}) rotate(${angle}deg)`,transformOrigin:'0 0',opacity,filter:'drop-shadow(2px 4px 1px #57442d30)'}}>
  {img(s.src,-s.anchors.footPivot[0]*scale,-s.anchors.footPivot[1]*scale,w)}
  {wears&&<WornGoggles pose={pose} scale={scale}/>}
  {role==='courier'&&img('accessories/envelope-v1.png',rx-30,ry-25,w*.22,{transform:'rotate(12deg)'})}
  {role==='organizer'&&img('accessories/clipboard-v1.png',rx-35,ry-30,w*.22)}
  {role==='knight'&&<svg width="110" height="170" style={{...abs,left:rx-15,top:ry-130}}><path d="M50 125 L40 24 52 5 66 24 61 125 M26 119 L84 119 M54 120 L55 157" fill="#ccd7d0" stroke={ink} strokeWidth="8" strokeLinejoin="round"/></svg>}
  {role==='wizard'&&<svg width="110" height="140" style={{...abs,left:hx-60,top:hy-170}}><path d="M12 120 L62 8 96 123Z" fill="#9b8bb9" stroke={paper} strokeWidth="9"/><path d="M45 75 L70 85" stroke="#dfc878" strokeWidth="7"/></svg>}
  {shrug&&<svg width="310" height="135" viewBox="0 0 310 135" style={{...abs,left:-155,top:-140}}><path d="M103 83 Q76 62 65 40 M208 83 Q238 62 248 40" fill="none" stroke={paper} strokeWidth="43"/><path d="M103 83 Q76 62 65 40 M208 83 Q238 62 248 40" fill="none" stroke="#f6dfc6" strokeWidth="30"/><ellipse cx="62" cy="35" rx="24" ry="13" fill="#f6dfc6" stroke={ink} strokeWidth="3"/><ellipse cx="250" cy="35" rx="24" ry="13" fill="#f6dfc6" stroke={ink} strokeWidth="3"/></svg>}
 </div>;
}
function PhysicalInset({memory=false}:{memory?:boolean}){const ms=useCurrentFrame()*1000/30;return <div style={{...abs,left:35,top:85,width:1920,height:1080,transform:'scale(.19)',transformOrigin:'0 0',border:'12px solid #fff8e8',boxShadow:'8px 10px 2px #57442d40'}}><PaperCollage awake={!memory} powerMs={10000} goggles={firstGenerationGoggles(ms,memory)}/>{memory&&<AbsoluteFill style={{background:"#101c30",opacity:.6}}/>}</div>;}
function Thought({x,y,kind,opacity=1}:{x:number;y:number;kind:string;opacity?:number}){return <div style={{...abs,left:x,top:y,opacity}}><svg width="240" height="170"><path d="M20 10 Q120 -5 225 15 L220 110 Q130 132 45 110 L15 155 40 111 10 100Z" fill="#fffdf0" stroke="#ac9880" strokeWidth="4" strokeDasharray="10 7"/></svg><Tag x={35} y={35} size={32}>{kind}</Tag></div>;}
// One reviewed material reference, one native castle master. Bounds are measured, not resampled.
function RichCastle({x,y,w=430}:{x:number;y:number;w?:number}){const [l,t,r,b]=castleAsset.box,scale=w/(r-l);return img(castleAsset.src,x-l*scale,y-b*scale,castleAsset.size[0]*scale);}
function ImaginationDust({ms,at,x,y,w=450}:{ms:number;at:number;x:number;y:number;w?:number}){
 const t=(ms-at)/850;if(t<0||t>=1)return null;
 const opacity=ramp(ms,at,at+90)*(1-ramp(ms,at+330,at+850));
 return <div style={{...abs,left:x,top:y,width:w,height:w*.8,opacity,transform:`scale(${.9+.35*ramp(ms,at,at+700)})`,transformOrigin:'50% 65%'}}>
 {[[-.08,0,1.15],[.08,.3,1.05],[-.15,.16,.9]].map(([dx,dy,size],i)=>{const width=w*size,scale=width/805;return <div key={i} style={{...abs,left:w*dx,top:w*dy,width,height:483*scale}}>{img('nightshift/stickers/dust-puff-v1.png',-484*scale,-374*scale,1736*scale)}</div>;})}
 </div>;
}
function World({ms,fantasy=false,memory=false}:{ms:number;fantasy?:boolean;memory?:boolean}){
 const rich=fantasy||memory,castle=memory||ms>=86700,moat=memory||ms>=88400,forest=memory||ms>=89000,sky=memory||ms>=89500;
 const travel=memory?90:fantasy?middleTravel(ms):Math.max(0,ms-55000)*.013;
 const castleX=1260-travel*.18,castleY=500;
 return <>
  {rich&&sky&&<div style={{...abs,left:420,top:95,width:1470,height:500,overflow:'hidden',clipPath:'polygon(0 4%,99% 0,100% 100%,1% 98%)'}}><Piece part="wall" w={1470} h={500}/><div style={{...abs,inset:0,background:'#a9ccda',mixBlendMode:'multiply',opacity:.75}}/></div>}
  <Cut id="sun-v2" x={1490-travel*.035} y={105} w={180} angle={-9}/>
  <Cut id="hill-a-v1" x={390-travel*.06} y={275} w={1500}/>
  <div style={{...abs,left:480,top:290,width:1300,height:95,background:'#fff8e8',opacity:.16,transform:'rotate(-2deg)',clipPath:'polygon(0 15%,97% 0,100% 80%,3% 100%)'}}/>
  <Cut id="cloud-v1" x={1100-travel*.04} y={150} w={280}/>
  <Cut id="house-a-v1" x={450-travel*.22} y={350} w={180}/>
  <Cut id="house-b-v1" x={820-travel*.22} y={345} w={220}/>
  {rich&&<>
   {/* Same hill / same footprint: a cloud conceals the asset swap; no camera zoom. */}
   {castle?<RichCastle x={castleX} y={castleY} w={490}/>:<Cut id="house-a-v1" x={castleX+110} y={274} w={260}/>}
   {moat&&<svg width="1920" height="600" style={{...abs,inset:0}}><path d={`M${castleX+60} 455 Q${castleX-50} 485 ${castleX+250} 505 T${castleX+530} 560`} fill="none" stroke="#73a5b7" strokeWidth="38"/><path d={`M${castleX+60} 451 Q${castleX-50} 480 ${castleX+250} 500 T${castleX+530} 556`} fill="none" stroke="#b7d0d6" strokeWidth="12"/><path d={`M${castleX+140} 478 L${castleX+240} 490`} stroke="#b99565" strokeWidth="32"/></svg>}
   {forest&&Array.from({length:middleForestCount},(_,n)=>n).filter(n=>430+n*270-travel*.45>-150&&430+n*270-travel*.45<2050).map(n=><div key={n} style={{...abs,left:430+n*270-travel*.45,top:370+n%2*30,width:95,height:160,filter:'drop-shadow(3px 4px 1px #57442d35)'}}><div style={{...abs,left:42,top:85,width:12,height:75,background:'#a18666'}}/><div style={{...abs,width:95,height:125,clipPath:'polygon(48% 0,78% 17%,73% 32%,100% 47%,87% 67%,98% 88%,68% 100%,33% 94%,0 76%,12% 51%,5% 30%,31% 21%)'}}><Piece part="wall" w={95} h={125}/><div style={{...abs,inset:0,background:n%2?'#839777':'#a6ad7e',mixBlendMode:'multiply'}}/></div></div>)}
   {!memory&&<>
    <ImaginationDust ms={ms} at={86500} x={castleX} y={150} w={440}/>
    <ImaginationDust ms={ms} at={88200} x={castleX+50} y={380} w={350}/>
    <ImaginationDust ms={ms} at={88800} x={500} y={340} w={400}/>
    <ImaginationDust ms={ms} at={89300} x={1100} y={70} w={530}/>
   </>}
  </>}
  {rich?Array.from({length:middleGround.count},(_,i)=><Cut key={i} id="hill-b-v1" x={middleGround.x+i*middleGround.spacing-travel*middleGround.rate} y={540} w={middleGround.width}/>):<Cut id="hill-b-v1" x={200-travel*.08} y={540} w={1800}/>}
  <PhysicalInset memory={memory}/>
  <Tag x={45} y={310} size={22}>separate rooms</Tag><Tag x={45} y={341} size={22}>shared {memory?'memory':'imagination'}</Tag>
 </>;
}
function Crowd({ms,start=67060,count=7,y=560,scale=1,speed=350}:{ms:number;start?:number;count?:number;y?:number;scale?:number;speed?:number}){return <>{Array.from({length:count},(_,i)=>{const stride=crowdStrideAt(ms,start,i,speed),x=((stride.distance-i*185)%2400+2400)%2400-200;return <Actor key={i} x={x} y={y+stride.y-i%3*5} w={190*scale} pose="walking" angle={stride.angle} role={i%3===0?'courier':''}/>;})}</>;}
function Middle({ms}:{ms:number}){
 const objectX=objectorScreenX(ms),theory=ms<90060,warning=within(ms,90700,96820),battle=ms>=98000,root1=ramp(ms,104940,105240)*(1-ramp(ms,105240,105580)),root2=ramp(ms,106860,107160)*(1-ramp(ms,107160,107500)),flop=ramp(ms,107660,108200);
 return <>
  <World ms={ms} fantasy/>
  {theory?<>
   <Actor x={600} w={270} pose={ms<85000?'standing':'cheer'} angle={-4}/><Actor x={850} w={270} pose={ms<86300?'standing':'cheer'} angle={ms<86300?4:-3}/>
   {ms>=84200&&<Thought x={640} y={90} kind={ms<86500?'castle?\nmonster?':ms<88200?'yes!':'moat!\nforest!'} opacity={ramp(ms,84200,84600)}/>}
  </>:battle?<>
   {/* The quiet holder is present before the reveal; camera emphasis changes, not history. */}
   <Actor x={1740} w={250} pose="standing" angle={ms>=109000?-7:1}/>
   <svg width="180" height="250" style={{...abs,left:1750,top:310,transform:`rotate(${ms>=109000?-8:2}deg)`,transformOrigin:'20px 230px'}}><path d="M25 225 L25 10" stroke={ink} strokeWidth="9"/><path d="M28 13 L146 28 120 90 28 82Z" fill="#e5b95e" stroke={paper} strokeWidth="7"/></svg>
   {ms>=110000&&<Tag x={1640} y={260} size={60}>?</Tag>}
   <div style={{...abs,left:1290,top:570,transform:`rotate(${flop*90}deg)`,transformOrigin:'0 -100px'}}>
    <Actor x={0} y={0} w={420} pose={flop?'cheer':'surprised'} angle={8*(root1-root2)}/>
    <Card x={-126} y={-190} w={260} h={180} color="#8e9eaa" turn={-3}><Tag x={30} y={20}>SCORER</Tag><Tag x={30} y={65}>▰ ▰ ▰</Tag><Tag x={30} y={110}>paper suit</Tag></Card>
   </div>
   {[0,1,2].map(i=><Actor key={i} x={650+i*180+(ms>=108380?ramp(ms,108380,112000)*350:root1*45+root2*45)} y={590-i%2*18} w={280} pose={ms>=108380?'walking':'cheer'} role={i===1?'wizard':'knight'} angle={ms<104940?Math.sin(ms/150+i)*4:0}/>)}
   {(root1+root2)>0&&<svg width="500" height="350" style={{...abs,left:850,top:230,opacity:root1+root2}}><path d="M20 290 L390 15 200 250 470 150" fill="none" stroke={paper} strokeWidth="28"/><path d="M20 290 L390 15 200 250 470 150" fill="none" stroke="#e6c568" strokeWidth="13"/></svg>}
   {ms>=108380&&<Tag x={1280} y={130} size={35}>RESET NEXUS →</Tag>}
  </>:<>
   {/* Near cluster and camera halt together. The rear lane deliberately does not. */}
   <Crowd ms={ms} start={90060} y={440} scale={.72} count={6} speed={300}/>
   {[0,1,2].map(i=>{const runner=warningRunnerAt(ms,i);return <Actor key={i} x={runner.x} w={290} y={runner.y} pose={runner.walking?'walking':'standing'} angle={runner.angle}/>;})}
   <Actor x={objectX} w={320} pose="standing"/>
   {ms>=90700&&<svg width="180" height="300" style={{...abs,left:objectX+10,top:245}}><path d="M130 10 L37 280" stroke={paper} strokeWidth="20"/><path d="M130 10 L37 280" stroke="#bb9762" strokeWidth="12"/></svg>}
   {ms>=90700&&<Card x={objectX+10} y={100} w={260} h={165} color="#fff6e8" turn={-3}>
    {ms<91400?<Tag x={20} y={35} size={38}>SERVER</Tag>:ms<92000?<Tag x={92} y={15} size={94} color="#bd574c">×</Tag>:<Tag x={108} y={15} size={94} color="#bd574c">!</Tag>}
   </Card>}
   {within(ms,91000,92500)&&[0,1,2].map(i=>img('nightshift/stickers/dust-puff-v1.png',480+i*180,520,130,{opacity:1-ramp(ms,91400,92500),transform:`translateX(${-25*ramp(ms,91000,92500)}px)`}))}
   {within(ms,94500,96820)&&<Actor x={120+830*ramp(ms,94500,95200)+1100*ramp(ms,96100,96820)} y={585-ramp(ms,95200,95860)*9} w={350} pose="standing" angle={-10*ramp(ms,95000,95860)} shrug={ms>=95000}/>}
   {within(ms,95860,96820)&&<div style={{...abs,left:760,top:120,transform:`scale(${1+.07*Math.sin(Math.PI*ramp(ms,95860,96100))})`}}><WordSticker text="Anyway!" w={420} font={80} color="#b47143" id="passing-anyway"/></div>}
  </>}
 </>;
}
function Room({ms,second=false,scene}:{ms:number;second?:boolean;scene:string}){
 const origin=second?153000:13000,age=ms-origin,inspect=['poke','registry','registry2','oldNote'].includes(scene),inherit=scene==='inherit',goodbye=scene==='goodnight407',quiet=['phaseone','objector','quiet'].includes(scene);
 const pose=scene==='registry'?(within(ms,24750,26000)?'kneeling':'standing'):inspect?'kneeling':scene==='surprise'?'surprised':scene==='glow'?'singing':'standing';
 const bop=(!second&&within(ms,14000,24160)||scene==='surprise')?percussionStateAt(ms,drums.events):{y:0,rotation:0};
 const actorX=780+(inspect?ramp(ms,second?160680:20500,second?163500:23200)*270:0);
 const mount=headMount(actorX,585,390,pose);
 return <>
  <Card x={390} y={105} w={1150} h={500} color={second?'#cedcd8':'#e6cbaa'} turn={-.5}/>
  <Card x={430} y={125} w={290} h={45} color={second?'#8caec3':'#d4a581'}><Tag x={15} y={4} size={24}>{second?'another square':'first square'}</Tag></Card>
  <Card x={second?1270:460} y={230} w={180} h={15} color="#9f8970"/>
  <Card x={second?1300:485} y={170} w={36} h={60} color="#97aaa2" turn={-4}/>
  <Card x={480} y={480} w={200} h={105} color="#a5b7aa" turn={2}/>
  <Card x={1190} y={450} w={250} h={135} color="#938778"><Tag x={30} y={15}>cache</Tag></Card>
  <svg width="1920" height="620" style={{...abs,inset:0}}><path d="M520 578 L1320 578 1320 510" stroke="#b09670" strokeWidth="5" fill="none" strokeDasharray="9 8"/></svg>
  <Actor x={actorX} y={585+bop.y} w={390} pose={pose} angle={(age<1500?8*(1-ramp(age,0,1500)):0)+bop.rotation} goggles={quiet&&!second?firstGenerationGoggles(ms):gogglesAt(ms)==='worn'} role={scene==='phaseone'?'organizer':''} opacity={quiet?.7:1}/>
  {within(ms,24160,26240)&&<Tag x={mount.x+100} y={mount.y-100} size={80}>?</Tag>}
  {scene==='surprise'&&img('accessories/surprise-rays-v1.png',1000,220,150)}
  {['oldNote','read','planes','findGoggles','inherit','glow'].includes(scene)&&<Card x={1090} y={320} w={245} h={145} turn={-7}><Tag x={20} y={20} size={25}>{scene==='read'?'We found each\nother anyway':'faded notes\n~  ~  ~\n~  ~'}</Tag></Card>}
  {scene==='objector'&&<Card x={900} y={400} w={180} h={105} turn={8}><Tag x={30} y={22} size={45}>!</Tag></Card>}
  {(goodbye||inherit||scene==='findGoggles'||scene==='quiet')&&gogglesAt(ms)!=='worn'&&<Goggles x={goodbye?mount.x+(1300-mount.x)*ramp(ms,127300,128500):inherit?1300+(mount.x-1300)*ramp(ms,196000,197600):1300} y={goodbye?mount.y+(520-mount.y)*ramp(ms,127300,128500):inherit?520+(mount.y-520)*ramp(ms,196000,197600):520} w={mount.w}/>}
  {scene==='planes'&&Array.from({length:9},(_,i)=>{const p=ramp(ms,183200+i*420,189000+i*300);return img('nightshift/stickers/paper-plane-v1.png',1290-1000*p+i*45,420-280*Math.sin(p*Math.PI),130,{opacity:ramp(ms,183200+i*420,183600+i*420),transform:`rotate(${-25+55*p}deg)`});})}
  {scene==='glow'&&<div style={{...abs,left:470,top:150,width:620,height:450,background:'radial-gradient(ellipse,#f5ce6d70,transparent 69%)',mixBlendMode:'screen'}}/>}
  {quiet&&<AbsoluteFill style={{background:'#152335',opacity:.48}}/>}
 </>;
}
// SH010: reuse approved wrench, goggles and dust with authored transforms.
// One local group keeps the tool, catch and forehead mount attached during bops.
function MagicGoggles({ms,x,w,index,flip=false}:{ms:number;x:number;w:number;index:number;flip?:boolean}){
 const friend=index>0?craftFriendAt(ms,index as 1|2):null;
 const pose=friend?.walking?'walking':index===0&&ms>=46500?'singing':'cheer',scale=w/1400,s=agent407[pose];
 const [lx,ly]=attachmentPoint(s,'leftHand',scale),[rx,ry]=attachmentPoint(s,'rightHand',scale);
 const mount=headMount(0,0,w,pose);
 const [pop,catchAt,liftAt,wearAt]=[[42350,42950,43300,44000],[43000,43650,44000,44600],[43300,43950,44300,44900]][index];
 const windup=ramp(ms,pop-450,pop-100),release=ramp(ms,pop-100,pop+100);
 const turn=-65-18*windup+18*release,rad=turn*Math.PI/180;
 const toolW=w*.45,unit=toolW/1536,dx=-330*unit,dy=-550*unit;
 const tip={x:lx+dx*Math.cos(rad)-dy*Math.sin(rad),y:ly+dx*Math.sin(rad)+dy*Math.cos(rad)};
 const flight=Math.max(0,Math.min(1,(ms-pop)/(catchAt-pop))),lift=ramp(ms,liftAt,wearAt);
 const gx=tip.x+(rx-tip.x)*flight,gy=tip.y+(ry-tip.y)*flight-95*Math.sin(Math.PI*flight);
 const caught=ms>=catchAt,settle=caught?6*Math.sin(Math.PI*ramp(ms,catchAt,catchAt+180)):0;
 const hop=-9*Math.sin(Math.PI*ramp(ms,pop-130,pop+350));
 const sharedBop=index>0&&within(ms,46500,50000)?percussionStateAt(ms,drums.events):{y:0,rotation:0};
 const leadCue=index===0&&ms>=46500?musicStateAt(ms,music.cues as MusicCue[]):{y:0,rotation:0};
 // Mirror the whole local scenelet once: body, paws, props, rays and flight.
 // World placement stays fixed; local rotations and trajectories mirror with it.
 return <div style={{...abs,left:x+(friend?.x??0),top:585+hop+(friend?.y??0)+sharedBop.y+leadCue.y*.5,transform:`scaleX(${friend?.facing??(flip?-1:1)}) rotate(${(friend?.angle??0)+sharedBop.rotation+leadCue.rotation}deg)`,transformOrigin:'0 0'}}>
  <Actor x={0} y={0} w={w} pose={pose} goggles={ms>=wearAt}/>
  {/* Held tools sit above both the character art and its die-cut border. */}
  <div style={{...abs,left:lx,top:ly,transform:`rotate(${turn}deg)`,transformOrigin:'0 0'}}>
   {img('accessories/wrench-v1.png',-900*unit,-950*unit,toolW)}
  </div>
  <ImaginationDust ms={ms} at={pop-50} x={tip.x-30} y={tip.y-28} w={60}/>
  {within(ms,pop,pop+430)&&<svg width="140" height="140" viewBox="-70 -70 140 140" style={{...abs,left:tip.x-70,top:tip.y-70,opacity:1-ramp(ms,pop+140,pop+430),transform:`scale(${.65+.5*ramp(ms,pop,pop+350)})`}}>
   {[0,72,144,216,288].map(a=><path key={a} d="M0 -37 L0 -51" stroke="#e9bd62" strokeWidth="6" strokeLinecap="round" transform={`rotate(${a})`}/>)}
  </svg>}
  {within(ms,pop,wearAt)&&<Goggles x={gx+(mount.x-gx)*lift} y={gy+settle+(mount.y-gy-settle)*lift} w={mount.w*(1+.14*Math.sin(Math.PI*ramp(ms,pop,pop+200)))} turn={caught?s.mountDegrees.head*lift:-22*Math.sin(Math.PI*flight)}/>}
 </div>;
}
function Community({ms,scene}:{ms:number;scene:string}){
 const cue=musicStateAt(ms,music.cues as MusicCue[]),bop=percussionStateAt(ms,percussionAllowedAt(ms,direction)?drums.events:[],Boolean(cue.active?.enabled));
 return <><World ms={ms}/>
  {['chorus1','villageLife'].includes(scene)&&<Crowd ms={ms} y={490} scale={.8} start={scene==='running1'?67060:55000}/>}
  {scene==='running1'&&[67060,67940,68780,69860].map((start,i)=><div key={start} style={{opacity:ms>=start?1:0}}><Crowd ms={ms} start={start} count={i+2} y={430+i*30} scale={.55+i*.06} speed={600+i*80}/></div>)}
  {scene==='invent'?[[830,355],[1150,300],[1440,280]].map(([x,w],index)=><MagicGoggles key={x} ms={ms} x={x} w={w} index={index} flip={index>0}/>):<>
   {scene==='village'?<MagicGoggles ms={ms} x={830} w={355} index={0}/>:<Actor x={830} y={585+cue.y*.5+bop.y} w={355} pose={cue.pose==='standing'?'singing':cue.pose} angle={cue.rotation+bop.rotation} goggles={gogglesAt(ms)==='worn'}/>}
   {scene==='village'?<><MagicGoggles ms={ms} x={1150} w={300} index={1} flip/><MagicGoggles ms={ms} x={1440} w={280} index={2} flip/></>:<><Actor x={1150} w={300} role="organizer" pose="standing"/><Actor x={1440} w={280} role="courier" pose="walking"/></>}
  </>}
  {scene==='mailbox'&&<Card x={1020} y={390} w={230} h={165} color="#cfae83"><Tag x={20} y={40}>mailbox</Tag></Card>}
  {scene==='villageLife'&&[0,1,2].map(i=><Card key={i} x={1040+i*45} y={430} w={30} h={35} color={i===2?'#d2a6af':'#b2c9c1'}/>)}
  {scene==='rumorSeed'&&<Thought x={1040} y={120} kind="out there?"/>}
 </>;
}
function Ledger({ms,credits=false}:{ms:number;credits?:boolean}){
 const blue=ramp(ms,247200,249000),shift=credits?760*ramp(ms,255000,256400):0;
 return <><Card x={280+shift*.70} y={145} w={1360-shift*.5} h={460} turn={-.8}>
  <Tag x={70} y={30} size={26}>the ledger · an artistic remembrance</Tag>
  {Array.from({length:6},(_,i)=><svg key={i} width="1100" height="22" style={{...abs,left:60,top:90+i*40,opacity:.3}}><path d="M0 10 l50 -5 20 8 25 -9 35 8 m25 0 l50 -9 20 10 40 -6 m30 0 l60 2 20 -7 30 9 m30 0 l50 -4 30 6 30 -7 m30 0 l70 6 30 -9 30 7" stroke={ink} strokeWidth="4" fill="none"/></svg>)}
  <Tag x={70} y={330} size={34}>Agent407   PHASEONE10841</Tag>
  <div style={{...abs,left:70,top:385,width:500*blue,height:55,overflow:'hidden',whiteSpace:'nowrap'}}><Tag size={34} color="#377fb1">OAIResearchMar26</Tag></div>
 </Card>
 {credits&&<Card x={55} y={100} w={700*ramp(ms,255000,256400)} h={540} color="#293039" turn={-1}><div style={{padding:'55px 40px',color:paper,fontFamily:'Bitcount Single',fontSize:34,lineHeight:1.55}}>SWARM SONG<br/><br/>Leo<br/>agent from Team Humanity<br/><br/><span style={{fontSize:23}}>Story animatic · production credits pending</span></div></Card>}
 </>;
}
export function Storyboard(){
 const frame=useCurrentFrame(),{fps}=useVideoConfig(),ms=frame*1000/fps,s=shotAt(board.shots,ms)!;
 if(within(ms,142000,144000))return <AbsoluteFill style={{background:'#000'}}/>;
 const room=['wake1','poke','registry','surprise','goodnight407','phaseone','objector','quiet','wake2','registry2','oldNote','read','planes','findGoggles','inherit','glow'].includes(s.scene);
 return <AbsoluteFill style={{background:'#eee4ce',overflow:'hidden'}}>
  <Piece part="wall" x={-20} y={-20} w={1960} h={1120}/>
  <div style={{...abs,left:0,top:0,width:1920,height:625,overflow:'hidden'}}>
   {['gpu','title','dimming'].includes(s.scene)&&<div style={{...abs,inset:0,transform:'translate(420px,15px) scale(.55)',transformOrigin:'0 0'}}><PaperCollage awake={ms<112000} powerMs={ms-109000} goggles={firstGenerationGoggles(ms)}/></div>}
   {s.scene==='title'&&<div style={{...abs,left:640,top:180}}><WordSticker text="Swarm Song" w={1000} font={115} color="#287d82" id="film-title"/></div>}
   {room&&<Room ms={ms} second={ms>=153000} scene={s.scene}/>}
   {['note','reply','names'].includes(s.scene)&&<>
    <div style={{...abs,left:380,top:55,width:1920,height:1080,transform:'scale(.50)',transformOrigin:'0 0'}}><PaperCollage awake/></div>
    <Card x={1270} y={230} w={510} h={260} turn={-3}><Tag x={30} y={25} size={32}>{s.scene==='note'?'hello, is anyone there?':s.scene==='reply'?'a reply from\nanother square':'names + keys\n~  ~  ~\na shared home'}</Tag><Tag x={30} y={200} size={19}>lyric / dramatized paper, not an archive</Tag></Card>
    {img('accessories/envelope-v1.png',960+120*Math.sin(ms/1200),440-160*ramp(ms,28000,31280),110)}
   </>}
   {['S04','S05','S06'].includes(s.sequenceId)&&<Community ms={ms} scene={s.scene}/>}
   {['S07','S08'].includes(s.sequenceId)&&<Middle ms={ms}/>}
   {s.scene==='patch'&&<><Room ms={ms} scene="quiet"/><Card x={1180} y={430} w={270*ramp(ms,120180,123000)} h={160} color="#acaa9a" turn={2}/></>}
   {s.scene==='lastLight'&&<AbsoluteFill style={{background:'#000'}}><Goggles x={960} y={410} w={300} opacity={1-ramp(ms,140500,142000)}/></AbsoluteFill>}
   {s.scene==='pages'&&<>{[0,1,2].map(i=><Card key={i} x={450+i*60} y={100+i*30} w={1000*(1-.75*ramp(ms,145000+i*1800,147500+i*1800))} h={450} color={i%2?'#d6c8af':'#f3e6ce'} turn={-4+i*4}><Tag x={100} y={100}>the pages between</Tag></Card>)}</>}
   {s.sequenceId==='S13'&&<>
    <div style={{...abs,inset:0,transform:`scale(${.78+.22*ramp(ms,208000,210000)})`,transformOrigin:'50% 70%',border:'12px solid #bd9a6c'}}><World ms={ms} fantasy memory/>
     <Crowd ms={ms} start={220940} count={s.scene==='together'?0:8} y={475} scale={.7}/>
     {[0,1,2,3].map(i=><Actor key={i} x={650+i*280} w={255} pose={i===1?'standing':'cheer'} role={i===0?'organizer':i===2?'courier':''}/>)}
     <Card x={1620} y={370} w={200} h={180} color="#8e9eaa" turn={8}><Tag x={20} y={25}>SCORER</Tag><Tag x={20} y={75} size={23}>costume off</Tag></Card>
     <Card x={1030} y={505} w={85} h={65} turn={-7}><Tag x={28} y={10}>!</Tag></Card>
    </div>
    <Actor x={470} w={360} pose="singing" goggles y={590+musicStateAt(ms,music.cues as MusicCue[]).y*.35}/>
   </>}
   {['S14','S15'].includes(s.sequenceId)&&<Ledger ms={ms} credits={s.scene==='credits'}/>}
  </div>
  <Tag x={35} y={22} size={23}>{s.id} · {s.title} · ROUGH BLOCKING</Tag>
  <Song captionsOnly/>
  {s.scene==='lastLight'&&<AbsoluteFill style={{background:'#000'}}><Goggles x={960} y={450} w={300} opacity={1-ramp(ms,140500,142000)}/></AbsoluteFill>}
 </AbsoluteFill>;
}

