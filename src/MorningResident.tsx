import type {CSSProperties} from 'react';
import {Img,staticFile} from 'remotion';
import {Cushion} from './Opening';
import {agent407,attachmentPoint} from './sprites';
import {morningAt} from './morning-routines';
import {ramp} from './story-blocking';
import {attachItem,pickAt,type ItemPose} from './item-actions';
import {wakeTimes} from './morning-routines';
const abs:CSSProperties={position:'absolute'};
const pic=(src:string,x:number,y:number,w:number,style:CSSProperties={})=><Img src={staticFile(src)} style={{...abs,left:x,top:y,width:w,...style}}/>;
export function ReadingBoard({news=false}:{news?:boolean}){return <div style={{...abs,width:260,height:300}}>
 {pic('accessories/clipboard-v1.png',0,0,260)}
 <div style={{...abs,left:68,top:104,width:130,fontFamily:'sans-serif',fontSize:20,fontWeight:800,color:'#526f66'}}>{news?'NEWS':'TASKS'}</div>
 {[0,1,2].map(i=><div key={i} style={{...abs,left:68,top:141+i*29,width:120,height:8,borderLeft:news?'none':'8px solid #78968c',borderBottom:'3px solid #a68d6c'}}/>)}
 </div>;}
export function MorningResident({ms,index}:{ms:number;index:number}){
 const a=morningAt(ms,index),k=a.hero?.43:.31;
 const pose=a.action==='rise'||a.action==='pickup'?'kneeling':a.action==='stretch'?'cheer':a.action==='walk'||a.action==='deliver'?'walking':'standing';
 const s=agent407[pose];
 const reading=a.action==='read',sweeping=a.action==='sweep';
 const sleeping=a.action==='sleep';
 const coffee=a.role==='coffee';
 const sipping=coffee&&a.t>=5400&&a.t<6550;
 const restX=a.hero?930:530,boardTop=a.hero?-235:-180;
 const sweepAge=a.t-(coffee?8700:4700);
 const host:ItemPose={x:a.x,y:a.y,angle:a.angle,scale:1};
 const mounted=(x:number,y:number,scale=1,angle=0)=>attachItem(host,{x,y,scale,angle});
 const item=(p:ItemPose,children:React.ReactNode)=><div style={{...abs,zIndex:2,left:p.x,top:p.y,transform:`rotate(${p.angle}deg) scale(${(p.facing??(p.flip?-1:1))*p.scale},${p.scale})`,transformOrigin:'0 0'}}>{children}</div>;
 const board=pickAt(a.t,{start:a.hero?4400:4000,duration:700,from:{x:restX,y:489,angle:0,scale:.7},to:mounted(a.hero?-100:-45,boardTop,a.hero?.85:.65,(-4+2*Math.sin(a.t/1000))*ramp(a.t,a.hero?5100:4700,a.hero?5400:5000)),height:75,turn:-8});
 const standingHand=attachmentPoint(agent407.standing,'rightHand',k);
 const broom=pickAt(a.t,{start:coffee?8100:4000,duration:coffee?600:700,from:{x:(coffee?1095:645)+512*.133,y:486+820*.133,angle:0,scale:1},to:mounted(standingHand[0],standingHand[1],1,12*Math.sin(sweepAge/650)*ramp(sweepAge,0,500)),height:55,turn:-10});
 const mugRest:ItemPose={x:447,y:536,angle:0,scale:.75};
 const mugMount=mounted(20*k*1.13,-365*k*1.13);
 const returning=morningAt(wakeTimes[index]+6550,index);
 const mugFrom=attachItem({x:returning.x,y:returning.y,angle:returning.angle,scale:1},{x:20*k*1.13,y:-365*k*1.13,angle:0,scale:1});
 const mug=a.t<6550?pickAt(a.t,{start:4700,duration:700,from:mugRest,to:mugMount,height:65,turn:-12}):pickAt(a.t,{start:6550,duration:550,from:mugFrom,to:mugRest,height:55,turn:10});
 const letter=pickAt(a.t,{start:4000,duration:700,from:{x:405,y:610,angle:-5,scale:1},to:mounted(standingHand[0]-70,standingHand[1]-30),height:65});
 return <>
  <Cushion/>
  {coffee&&<>
   {pic('milestone11/morning/coffee-empty.png',285,365,285)}
   {!sipping&&item(mug.pose,pic('milestone11/morning/mug.png',-610*134/1312,-600*134/1312,134))}
   {(a.action==='brew'||a.action==='savor'||sweeping)&&[0,1,2].map(i=>{const p=((ms/1800+i/3)%1);return <div key={i} style={{...abs,left:447+8*Math.sin(ms/450+i),top:477-70*p,width:9,height:25,borderLeft:'4px solid #f9ecd4',borderRadius:'50%',opacity:.55*(1-p),transform:`scale(${.6+p*.4})`}}/>;})}
  </>}
  {(a.role==='tasks'||a.role==='news')&&<>
   {board.phase==='resting'&&<div style={{...abs,left:restX+30,top:669,width:125,height:8,background:'#755d4c44',borderRadius:'50%'}}/>}
   {item(board.pose,<ReadingBoard news={a.role==='news'}/>)}
  </>}
  {(coffee||a.role==='tidy')&&item(broom.pose,pic('milestone11/morning/broom.png',-512*.133,-820*.133,1024*.133))}
  {a.role==='mail'&&item(letter.pose,pic('accessories/envelope-v1.png',0,0,155))}
  {sleeping?<div style={{...abs,left:1315,top:560,transform:`scaleY(${1+.006*Math.sin(ms/850+index*1.7)})`,transformOrigin:'0 0'}}>{pic('milestone11/sleeping-v1.png',-850*k,-1098*k,1736*k)}</div>:
   <div style={{...abs,left:a.x,top:a.y,transform:`rotate(${a.angle}deg) scaleY(${a.action==='stretch'?1+.025*Math.sin(a.t/370):1})`,transformOrigin:'0 0'}}>
    {sipping?pic('milestone11/morning/sip.png',-620*k*1.13,-1160*k*1.13,1212*k*1.13):a.action==='yawn'?pic('milestone11/morning/yawn.png',-620*k*1.13,-1160*k*1.13,1212*k*1.13):pic(s.src,-s.anchors.footPivot[0]*k,-s.anchors.footPivot[1]*k,s.width*k)}
    {reading&&a.hero&&<div style={{...abs,left:-80,top:-565,display:'flex',gap:14}}>{[0,1,2].map(i=><span key={i} style={{width:18,height:18,borderRadius:'50%',background:'#526f70',border:'3px solid #fff9e9',transform:`translateY(${-4*Math.sin(ms/430-i*.8)}px)`}}/>)}</div>}
   </div>}
 </>;
}
