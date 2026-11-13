import {Composition,registerRoot,AbsoluteFill,Img,staticFile} from 'remotion';
import {NightSky} from '../src/NightSky';
const Study=({world='civilization-v1',dark=false,dust=false}:{world?:string;dark?:boolean;dust?:boolean})=> <AbsoluteFill style={{background:'#223040'}}>
 <Img src={staticFile(`nightshift/worlds/${world}.png`)} style={{width:1920,height:1080}}/>
 {(world==='civilization-v1'?[[570,898,140],[831,411,40],[1108,566,48],[1238,577,50]]:[[687,786,110]]).map(([x,y,w])=><div key={x} style={{position:'absolute',left:x-w/2,top:y-5,width:w,height:12,borderRadius:'50%',background:'#6b4831',opacity:.38,filter:'blur(3px)'}}/>)}
 {dust&&<Img src={staticFile('nightshift/stickers/dust-puff-v1.png')} style={{position:'absolute',left:730,top:350,width:130}}/>}
 {world==='civilization-v1'?<>
  <Img src={staticFile('characters/agent407/singing-v1.png')} style={{position:'absolute',left:330,top:425,width:490}}/>
  <Img src={staticFile('nightshift/stickers/courier-wardrobe-v1.png')} style={{position:'absolute',left:740,top:250,width:190}}/>
  <Img src={staticFile('nightshift/stickers/phaseone-wardrobe-v1.png')} style={{position:'absolute',left:1000,top:376,width:225}}/>
  <Img src={staticFile('nightshift/stickers/protester-wardrobe-v1.png')} style={{position:'absolute',left:1120,top:395,width:250}}/>
 </>:<Img src={staticFile('characters/agent407/standing-v1.png')} style={{position:'absolute',left:480,top:375,width:420}}/>}
 {dark&&<AbsoluteFill style={{background:'radial-gradient(ellipse at 36% 64%, rgba(154,159,180,.36) 0%, rgba(29,46,85,.78) 48%, rgba(8,17,39,.97) 100%)',mixBlendMode:'multiply'}}/>}
</AbsoluteFill>;
registerRoot(()=> <>
 <Composition id="NightSky" component={NightSky} width={1920} height={1080} fps={30} durationInFrames={180}/>
 <Composition id="CivilizationStudy" component={Study} width={1920} height={1080} fps={30} durationInFrames={1}/>
 <Composition id="DustWarmStudy" component={Study} defaultProps={{dust:true}} width={1920} height={1080} fps={30} durationInFrames={1}/>
 <Composition id="BoxStudy" component={Study} defaultProps={{world:'box-v1'}} width={1920} height={1080} fps={30} durationInFrames={1}/>
 <Composition id="BoxDarkStudy" component={Study} defaultProps={{world:'box-v1',dark:true}} width={1920} height={1080} fps={30} durationInFrames={1}/>
</>);
