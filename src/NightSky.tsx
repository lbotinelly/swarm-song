import {AbsoluteFill,Img,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {nightSkyState} from './night-sky';
export const NightSky=()=>{
 const frame=useCurrentFrame(),{fps}=useVideoConfig(),s=nightSkyState(frame,fps);
 const cloudScale=2100/1672;
 return <AbsoluteFill style={{background:'#1a2347',overflow:'hidden'}}>
  <Img src={staticFile('nightshift/worlds/token-sky-v2.png')} style={{position:'absolute',left:-85,top:s.backgroundY,width:2100,height:2100*941/1672}}/>
  <Img src={staticFile('nightshift/stickers/paper-plane-v1.png')} style={{position:'absolute',left:s.planeX-s.planeWidth/2,top:s.planeY-s.planeWidth*1224/1736/2,width:s.planeWidth,transform:`rotate(${s.planeAngle}deg)`}}/>
  {/* Foreground alpha genuinely occludes the plane; no timed opacity trick. */}
  <Img src={staticFile('nightshift/stickers/cloud-bank-v1.png')} style={{position:'absolute',left:s.cloudX-100*cloudScale,top:s.cloudY-100*cloudScale,width:1872*cloudScale,height:1141*cloudScale}}/>
 </AbsoluteFill>;
};
