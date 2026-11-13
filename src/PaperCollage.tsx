import {AbsoluteFill,Img,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {Piece} from './PaperApartment';
import {agent407} from './sprites';
import {fanPower} from './paper-fans';

// One deliberately hand-placed review board. All placement is flat x/y + rotation.
// Stock is reused as cut paper, never as a painted room or a perspective surface.
function Card({x,y,w,h,color,angle=0}:{x:number;y:number;w:number;h:number;color:string;angle?:number}) {
 return <div style={{position:'absolute',left:x,top:y,width:w,height:h,transform:`rotate(${angle}deg)`,filter:'drop-shadow(2px 3px 1px #53463030)'}}>
  <div style={{position:'absolute',inset:0,overflow:'hidden',clipPath:'polygon(0.5% 1%,98.8% 0,100% 98%,1% 100%)'}}>
   <Piece part="wall" w={w} h={h}/><div style={{position:'absolute',inset:0,background:color,mixBlendMode:'multiply'}}/>
  </div>
 </div>;
}
function Bunny({x,y,role,angle=0,singing=false}:{x:number;y:number;role:'agent'|'organizer'|'courier';angle?:number;singing?:boolean}) {
 const s=singing?agent407.singing:agent407.standing,scale=.18;
 return <div style={{position:'absolute',left:x,top:y,transform:`rotate(${angle}deg)`,filter:'drop-shadow(1px 3px 1px #62544335)'}}>
  {role==='agent'?<Img src={staticFile(s.src)} style={{position:'absolute',width:s.width*scale,left:-s.anchors.footPivot[0]*scale,top:-s.anchors.footPivot[1]*scale}}/>:
  <Img src={staticFile(`nightshift/stickers/${role==='organizer'?'phaseone':'courier'}-wardrobe-v1.png`)} style={{position:'absolute',width:1417*.23,left:-675*.23,top:-1210*.23}}/>}
 </div>;
}
function Home({x,y,role,angle,darkness,calling=false}:{x:number;y:number;role:'agent'|'organizer'|'courier';angle:number;darkness:number;calling?:boolean}) {
 const agent=role==='agent',courier=role==='courier';
 return <div style={{position:'absolute',left:x,top:y,width:490,height:250,transform:`rotate(${angle}deg)`}}>
  <Card x={-9} y={-9} w={510} h={266} color="#c3a77d" angle={.6}/>
  <Card x={0} y={0} w={490} h={250} color={agent?'#f5dfac':courier?'#d5e4c5':'#edd4b2'}/>
  {/* Tape bridges adjoining paper edges, not decorative floating marks. */}
  <Card x={-19} y={9} w={57} h={20} color="#e2c993" angle={-19}/>
  <Card x={461} y={220} w={46} h={17} color="#d6bc8d" angle={21}/>
  {agent?<>
   <Card x={36} y={116} w={139} h={114} color="#a7bfaa" angle={-2}/>
   <Card x={48} y={139} w={103} h={40} color="#fff3df" angle={5}/>
   <Piece part="quilt" x={30} y={173} w={155} h={56} style={{transform:'rotate(-2deg)',filter:'drop-shadow(1px 2px 1px #70543235)'}}/>
  </>:<>
   <Card x={43} y={175} w={14} h={57} color="#b7a17c" angle={-3}/>
   <Card x={171} y={175} w={13} h={57} color="#b7a17c" angle={4}/>
   <Card x={30} y={165} w={170} h={21} color="#abc2b1" angle={courier?3:-2}/>
   <Card x={57} y={142} w={60} h={24} color="#fff4db" angle={courier?-9:5}/>
  </>}
  {!courier&&<>
   <Card x={47} y={73} w={124} h={10} color="#b79768" angle={-2}/>
   <Card x={58} y={33} w={23} h={42} color="#91b0a9" angle={-8}/>
   <Card x={86} y={25} w={20} h={50} color="#d29d82" angle={4}/>
   {!agent&&<Card x={111} y={36} w={24} h={38} color="#b2ad81" angle={-3}/>}
  </>}
  {courier&&<><Card x={68} y={40} w={58} h={66} color="#fff4df" angle={-7}/><Card x={82} y={35} w={28} h={12} color="#d3b985" angle={4}/></>}
  <div style={{position:'absolute',left:courier?190:205,top:-3,width:2,height:33,background:'#ac8c5e',transform:'rotate(-3deg)'}}/>
  <Piece part="lamp" x={courier?155:170} y={18} w={70} h={61} style={{transform:`rotate(${courier?-5:3}deg)`,filter:'drop-shadow(2px 3px 1px #70543225)'}}/>
  <Card x={407} y={4} w={80} h={10} color="#b69d75" angle={-3}/>
  <Piece part="curtain" x={courier?425:444} y={15} w={courier?58:34} h={216} style={{transform:`rotate(${agent?2:-1}deg)`}}/>
  <Bunny role={role} x={courier?270:agent?310:340} y={239} angle={courier?-4:agent?1:3} singing={agent&&calling}/>
  <Piece part="rail" x={-6} y={205} w={501} h={53} style={{transform:`rotate(${agent?-1:1}deg)`,filter:'drop-shadow(1px 3px 1px #62544335)'}}/>
  <div style={{position:'absolute',inset:'-2px -1px -6px',background:'#273e54',opacity:darkness*.62,mixBlendMode:'multiply',clipPath:'polygon(0 0,99% 1%,100% 99%,0 100%)'}}/>
 </div>;
}
export function PaperCollage({awake=false,calling=false}:{awake?:boolean;calling?:boolean}) {
 const frame=useCurrentFrame(),{fps}=useVideoConfig();
 const {angleTop,angleBottom,darkness}=awake?{angleTop:-8+frame/fps*12,angleBottom:13+frame/fps*9,darkness:0}:fanPower(frame*1000/fps);
 return <AbsoluteFill style={{background:'#e9e3d3',overflow:'hidden'}}>
  {/* A sheet on the worktable; modest misalignment belongs to individual pieces. */}
  <Card x={130} y={62} w={1660} h={947} color="#bfcfc8" angle={-.6}/>
  <Card x={225} y={892} w={1460} h={53} color="#aab695" angle={1}/>
  <Card x={440} y={103} w={902} h={802} color="#cab48a" angle={-.7}/>
  {[0,1,2,3].map((n)=><Card key={n} x={405+n*22} y={125+n%2*7} w={21} h={736} color={n%2?'#a9b1a1':'#d7c49f'} angle={n%2?-.7:.7}/>)}
  <Card x={473} y={115} w={350} h={770} color="#77a39a" angle={-1.5}/>
  <Piece part="fan" x={494} y={193} w={303} h={303} style={{transform:`rotate(${angleTop}deg)`,filter:'drop-shadow(3px 4px 1px #53463045)'}}/>
  <Piece part="fan" x={503} y={550} w={288} h={288} style={{transform:`rotate(${angleBottom}deg)`,filter:'drop-shadow(3px 4px 1px #53463045)'}}/>
  <Card x={475} y={126} w={71} h={22} color="#e1c48e" angle={-14}/>
  <Card x={757} y={855} w={62} h={19} color="#dec18d" angle={13}/>
  {[0,1,2,3,4,5,6,7].map(n=><Card key={n} x={500+n*39} y={870+n%3*3} w={23} h={46} color="#d7b66c" angle={n%2?2:-3}/>)}
  <Home darkness={darkness} x={833} y={112} role="organizer" angle={1.3}/>
  <Home darkness={darkness} calling={calling} x={825} y={381} role="agent" angle={-1.4}/>
  <Home darkness={darkness} x={839} y={648} role="courier" angle={.7}/>
  {/* A few leftover cut-paper scraps make this a child's assembled scene. */}
  <Card x={1470} y={820} w={57} h={31} color="#d6b273" angle={-17}/>
  <Card x={1525} y={857} w={26} h={54} color="#8caaa4" angle={23}/>
  <Card x={1479} y={879} w={48} h={24} color="#d59d83" angle={8}/>
 </AbsoluteFill>;
}
