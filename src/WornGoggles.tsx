import {Img,staticFile} from 'remotion';
import {agent407,attachmentPoint} from './sprites';
// Reuse the existing storyboard head fit for the now-universal first-generation prop.
export function WornGoggles({pose,scale}:{pose:keyof typeof agent407;scale:number}){
 const s=agent407[pose],[x,y]=attachmentPoint(s,'head',scale),w=s.width*scale*.45;
 return <Img src={staticFile('accessories/goggles-v1.png')} style={{position:'absolute',left:x-w/2,top:y+s.width*scale*.036-w*.275,width:w,transform:`rotate(${s.mountDegrees.head}deg)`}}/>;
}
