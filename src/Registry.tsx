import {AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {stateAt} from './timeline';
import {testSprites} from './sprites';

export const Registry = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const state = stateAt(frame, fps);
  const sprite = testSprites[state.pose];
  const width = 450, height = 540;
  const footX = sprite.foot[0] * width, footY = sprite.foot[1] * height;
  return <AbsoluteFill style={{background: '#eee5d2', color: '#453c38', fontFamily: 'Arial, sans-serif'}}>
    <AbsoluteFill style={{opacity: .35, backgroundImage:'linear-gradient(#96a99f 1px,transparent 1px),linear-gradient(90deg,#96a99f 1px,transparent 1px)', backgroundSize: '52px 52px'}} />
    <div style={{position:'absolute',left:116,top:100,fontSize:23,letterSpacing:6}}>SWARM SONG / STICKER STAGE</div>
    <div style={{position:'absolute',left:112,top:152,fontSize:64,fontWeight:700}}>A little discovery.</div>
    <div style={{position:'absolute',left:116,top:242,fontSize:25}}>REGISTRY REHEARSAL · TEMPORARY TEST ART · NO AUDIO SYNC</div>
    <div style={{position:'absolute',left:-50,top:780,width:2050,height:600,background:'#a8beb2',transform:'rotate(-3deg)',boxShadow:'0 -6px 18px #55493325'}} />
    <div style={{position:'absolute',left:1110,top:490,width:525,height:310,background:'#d9b987',transform:'rotate(4deg)',boxShadow:'8px 12px 0 #a2835e, 12px 22px 25px #453c3825'}}>
      <div style={{margin:32,padding:25,height:195,background:'#fff9e8',border:'2px solid #c6b58e'}}>
        <div style={{fontSize:30,fontWeight:700}}>REGISTRY</div>
        {[0,1,2].map(n=><div key={n} style={{height:2,background:'#b7c1b6',marginTop:26,width:320-n*35}} />)}
      </div>
    </div>
    <div style={{position:'absolute',left:795-footX,top:830-footY, width,height,
      transformOrigin:`${footX}px ${footY}px`,transform:`translateY(${state.y}px) rotate(${state.rotation}deg) scaleY(${state.scaleY})`}}>
      <Img src={staticFile(sprite.src)} style={{width,height,filter:'drop-shadow(5px 9px 3px #58453425)'}} />
      {state.emotes.map(e=><div key={e.kind} style={{position:'absolute',left:sprite.head[0]*width,top:sprite.head[1]*height-70,opacity:e.opacity,filter:'drop-shadow(3px 5px 2px #58453425)'}}>
        {e.kind === 'question' ? <div style={{fontSize:94,lineHeight:1,fontWeight:900,color:'#718f95',WebkitTextStroke:'9px white',paintOrder:'stroke fill'}}>?</div> :
          <svg width="132" height="100" viewBox="0 0 132 100"><g stroke="white" strokeWidth="12" strokeLinejoin="round" fill="#efbd54"><path d="M18 64 L12 15 L29 14 L32 61Z"/><path d="M47 65 L64 14 L81 22 L61 71Z"/><path d="M73 80 L112 51 L124 67 L83 91Z"/></g></svg>}
      </div>)}
    </div>
    <div style={{position:'absolute',left:118,bottom:77,fontSize:24}}>Agent407 · ungoggled / {state.pose}</div>
    <div style={{position:'absolute',right:118,bottom:77,fontSize:22,fontVariantNumeric:'tabular-nums'}}>{String(frame).padStart(3,'0')} f · {(frame/fps).toFixed(3)} s · {fps} fps</div>
  </AbsoluteFill>;
};
