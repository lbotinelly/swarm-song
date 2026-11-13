import {Img,staticFile} from 'remotion';
import {agent407} from './sprites';
import {musicStateAt,type MusicCue} from './music-cues';
import cueData from '../assets/milestone7/musical-cues.json';

export function MusicCueStudy({ms}:{ms:number}){
 const state=musicStateAt(ms,cueData.cues as MusicCue[]),cue=state.active;
 const sprite=agent407[state.pose],scale=320/sprite.width;
 const next=cueData.cues.find(c=>c.startMs>ms);
 return <>
  <div style={{position:'absolute',left:105,top:84,fontFamily:'Bitcount Single',fontWeight:550,fontSize:25,color:'#456b70'}}>MUSICAL CUES · LISTENING STUDY</div>
  <div style={{position:'absolute',left:173,top:435,width:280,height:65,borderRadius:'50%',background:'#e8ba65',filter:'blur(25px)',opacity:state.glow}}/>
  <div style={{position:'absolute',left:315,top:500,transformOrigin:'0 0',transform:`translateY(${state.y}px) rotate(${state.rotation}deg) scale(${state.scaleX},${state.scaleY})`}}>
   <Img src={staticFile(sprite.src)} style={{position:'absolute',width:320,left:-sprite.anchors.footPivot[0]*scale,top:-sprite.anchors.footPivot[1]*scale,filter:'drop-shadow(2px 5px 2px #58453428)'}}/>
  </div>
  <div style={{position:'absolute',left:670,top:175,width:1080,minHeight:235,padding:'25px 32px',boxSizing:'border-box',background:'#fff9e9ed',boxShadow:'3px 6px 0 #c7b68b60',transform:'rotate(-.45deg)',color:'#355f64'}}>
   <div style={{fontFamily:'Bitcount Single',fontWeight:550,fontSize:24,color:'#82745d'}}>{(ms/1000).toFixed(2)}s · {cue?'CUE CANDIDATE':'LISTENING BETWEEN CUES'}</div>
   <div style={{fontFamily:'Finger Paint',fontSize:38,marginTop:12}}>{cue?.label??'Let the music breathe'}</div>
   <div style={{fontFamily:'Finger Paint',fontSize:23,marginTop:12}}>{cue?`${cue.emotionalRole} · ${cue.enabled?cue.action:'listen first — gesture held'}`:next?`Next: ${next.label} · ${(next.peakMs/1000).toFixed(2)}s`:'A little space after the last note'}</div>
   {cue&&<>
    <div style={{fontFamily:'Bitcount Single',fontWeight:550,fontSize:22,marginTop:16}}>PEAK {(cue.peakMs/1000).toFixed(3)}s · ESTIMATE ±{cue.uncertaintyMs}ms</div>
    <div style={{height:5,background:'#dacba9',marginTop:16,position:'relative'}}>
     <div style={{width:`${100*(ms-cue.startMs)/(cue.endMs-cue.startMs)}%`,height:5,background:ms>=cue.peakMs?'#bd704d':'#498e8a'}}/>
     <div style={{position:'absolute',left:`${100*(cue.peakMs-cue.startMs)/(cue.endMs-cue.startMs)}%`,top:-6,width:3,height:17,background:'#bd704d'}}/>
    </div>
   </>}
  </div>
 </>;
}
