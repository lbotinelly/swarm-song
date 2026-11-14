import {AbsoluteFill,Img,staticFile,useCurrentFrame} from 'remotion';
import {Card} from './PaperCollage';
import {Piece} from './PaperApartment';
import {smooth} from './lyrics';
// Authored oblique channel: each x boundary is a physical plane, never a timed z swap.
export const ventPlanes={near:1548,deep:1640,end:1766,y:570};
export function ventNose(ms:number){
 const u=ms<=4500?smooth((ms-350)/3600):1-smooth((ms-5050)/3600);
 return 1400+490*u;
}
export function LayeredVent({nose=1400,showPlane=true,inheritance=false,opening='inset(0)',hidePlane=false,outbound=false,goggles}:{nose?:number;showPlane?:boolean;inheritance?:boolean;opening?:string;hidePlane?:boolean;outbound?:boolean;goggles?:{x:number;y:number;w:number;turn?:number}}){
 const {near,deep,end,y}=ventPlanes;
 const plane=(lo:number,hi:number)=>showPlane&&!hidePlane&&<div style={{position:'absolute',inset:0,clipPath:`polygon(${lo}px 0,${hi}px 0,${hi}px 1080px,${lo}px 1080px)`}}><Img src={staticFile('nightshift/stickers/paper-plane-v1.png')} style={{position:'absolute',left:0,top:0,width:1736,height:1224,transform:`translate(${nose}px,${y}px) scaleX(${outbound?-1:1}) rotate(28deg) scale(.075) translate(-1385px,-260px)`,transformOrigin:'0 0'}}/></div>;
 return <>
  <div style={{position:'absolute',inset:0,clipPath:opening}}>
   <div style={{position:'absolute',left:1490,top:513,width:296,height:168,background:'#263936',boxShadow:'inset 7px 9px 10px #101b1b'}}/>
   {/* Deep plane is visible only before the opaque terminal turn of the channel. */}
   {plane(deep,end)}
   <Card x={end} y={513} w={20} h={168} color="#536a5e"/>
   {[deep,1734].map(x=><Card key={x} x={x} y={528} w={12} h={138} color="#718876"/>)}
   {(inheritance||goggles)&&<Img src={staticFile('accessories/goggles-v1.png')} style={{position:'absolute',left:goggles?.x??1583,top:goggles?.y??617,width:goggles?.w??145,transform:`rotate(${goggles?.turn??-8}deg)`}}/>}
   {plane(near,deep)}
   {/* Director revision: tall vertical openings, with folded right-hand returns. */}
   {[near,1652,1756].map(x=><div key={x} style={{position:'absolute',left:x+12,top:525,width:22,height:141,background:'#718672',clipPath:'polygon(0 0,100% 9%,100% 92%,0 100%)',boxShadow:'inset 4px 0 3px #3d503a'}}/>)}
   {[near,1652,1756].map(x=><Card key={x} x={x} y={520} w={13} h={151} color="#bdc8af"/>)}
   <Card x={1490} y={513} w={290} h={12} color="#b3c0a8"/>
   <Card x={1490} y={666} w={290} h={15} color="#b3c0a8"/>
   <Card x={1772} y={513} w={14} h={168} color="#b7c3ac"/>
  </div>
  {/* Outside portion remains in front of the room and near structure. */}
  {plane(-500,near)}
 </>;
}
export function VentStudy({hidePlane=false}:{hidePlane?:boolean}){
 const ms=useCurrentFrame()*1000/30;
 return <AbsoluteFill style={{background:'#e9e3d3'}}><Piece part="wall" w={1920} h={1080}/>
  <div style={{position:'absolute',left:0,top:0,width:1920,height:1080,transform:'translate(-4600px,-1460px) scale(3.5)',transformOrigin:'0 0'}}><Card x={1482} y={503} w={315} h={190} color="#d6c3a1"/><LayeredVent nose={ventNose(ms)} hidePlane={hidePlane} outbound={ms>=4500}/></div>
  <div style={{position:'absolute',left:70,top:70,fontFamily:'Georgia',fontSize:34,color:'#5c513f'}}>Registry passage · {ms<4500?'entry':'reverse emergence'}</div>
 </AbsoluteFill>;
}
