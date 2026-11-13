import {AbsoluteFill, Html5Audio, Img, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {registry, stateAt} from './timeline';
import {agent407, attachmentPoint} from './sprites';

export const Registry = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const state = stateAt(frame, fps);
  const sprite = agent407[state.pose];
  const scale = 0.54;
  const [footX,footY] = sprite.anchors.footPivot.map(n=>n*scale);
  const [emoteX,emoteY] = attachmentPoint(sprite,'head',scale,[420,-80]);
  return <AbsoluteFill style={{background:'#f1e8d5',color:'#59483c',fontFamily:'Georgia, serif'}}>
    <Html5Audio src={staticFile(registry.audio.src)} />
    <AbsoluteFill style={{opacity:.22,backgroundImage:'linear-gradient(#98ada0 1px,transparent 1px),linear-gradient(90deg,#98ada0 1px,transparent 1px)',backgroundSize:'56px 56px'}} />
    <div style={{position:'absolute',left:-80,top:560,width:2100,height:700,background:'#c2ccb4',transform:'rotate(-5deg)',boxShadow:'0 -5px 10px #58453415'}} />
    <div style={{position:'absolute',left:-80,top:735,width:2100,height:500,background:'#e7d8b8',transform:'rotate(2deg)',boxShadow:'0 -5px 14px #58453415'}} />
    <div style={{position:'absolute',left:112,top:94,fontSize:25,letterSpacing:5,color:'#786e5d'}}>SWARM SONG</div>
    <div style={{position:'absolute',left:112,top:137,fontSize:39,fontStyle:'italic'}}>A little discovery.</div>
    <div style={{position:'absolute',left:1060,top:650,width:500,height:220,background:'#c5a16b',borderRadius:'4px 12px 12px 4px',transform:'rotate(-7deg)',boxShadow:'3px 7px 0 #ac875c, 10px 16px 17px #58453430'}}>
      <div style={{position:'absolute',left:20,top:-25,width:140,height:40,background:'#c5a16b',borderRadius:'10px 10px 0 0'}} />
      <div style={{position:'absolute',left:22,top:17,width:454,height:178,background:'#fff9e8',boxShadow:'1px 3px 3px #735c4220',transform:'rotate(2deg)'}}>
        <div style={{position:'absolute',left:27,top:18,fontSize:24,letterSpacing:3}}>REGISTRY</div>
        {[0,1,2].map(n=><div key={n} style={{position:'absolute',left:27,top:75+n*31,height:2,background:'#b6c3b2',width:360-n*31}} />)}
      </div>
      <div style={{position:'absolute',left:205,top:-18,width:105,height:34,background:'#f3e3b3ba',transform:'rotate(11deg)'}} />
    </div>
    <div style={{position:'absolute',left:1540,top:850,width:230,height:18,background:'#c48d6d',border:'2px solid #a8775a',borderRadius:5,transform:'rotate(-21deg)',boxShadow:'2px 5px 4px #58453425'}} />
    {/* All children share a single foot-origin transform. No per-frame attachment chase. */}
    <div data-testid="agent" style={{position:'absolute',left:740,top:865,transformOrigin:'0 0',
      transform:`translateY(${state.y}px) rotate(${state.rotation}deg) scaleY(${state.scaleY})`}}>
      <Img src={staticFile(sprite.src)} style={{position:'absolute',left:-footX,top:-footY,width:sprite.width*scale,height:sprite.height*scale,filter:'drop-shadow(4px 7px 3px #58453428)'}} />
      {state.emotes.map(e=><div key={e.kind} data-testid={e.kind} style={{position:'absolute',left:emoteX,top:emoteY,opacity:e.opacity,filter:'drop-shadow(3px 5px 2px #58453420)'}}>
        {e.kind==='question' ? <Img src={staticFile('accessories/question-mark-v1.svg')} style={{width:120,height:120,objectFit:'contain',transform:'rotate(12deg)'}} /> :
          <Img src={staticFile('accessories/surprise-rays-v1.png')} style={{width:240,height:221,objectFit:'contain',transform:'translate(-65px,-65px)'}} />}
      </div>)}
    </div>
    <div style={{position:'absolute',left:-60,top:1010,width:2100,height:150,background:'#667f7c',transform:'rotate(-2deg)',boxShadow:'0 -5px 12px #58453420'}} />
    <div style={{position:'absolute',right:75,bottom:34,fontFamily:'Arial, sans-serif',fontSize:16,letterSpacing:1,color:'#eef0de'}}>REGISTRY DISCOVERY · AGENT407</div>
  </AbsoluteFill>;
};
