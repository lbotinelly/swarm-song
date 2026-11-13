import {Img,staticFile} from 'remotion';
import {agent407} from './sprites';
import {musicStateAt,percussionStateAt,type MusicCue} from './music-cues';
import cueData from '../assets/milestone7/musical-cues.json';
import additions from '../assets/milestone7/musical-cue-additions.json';
import percussion from '../assets/milestone7/percussion-cues.json';
const expandedCues=[...cueData.cues,...additions.cues].sort((a,b)=>a.startMs-b.startMs);

export function MusicCueStudy({ms,rhythm=false}:{ms:number;rhythm?:boolean}){
 const cues=rhythm?expandedCues:cueData.cues;
 const state=musicStateAt(ms,cues as MusicCue[]),cue=state.active;
 const bop=percussionStateAt(ms,rhythm?percussion.events:[],Boolean(cue?.enabled));
 const sprite=agent407[state.pose],scale=320/sprite.width;
 const next=cues.find(c=>c.startMs>ms);
 return <>
  <div style={{position:'absolute',left:105,top:84,fontFamily:'Bitcount Single',fontWeight:550,fontSize:25,color:'#456b70'}}>MUSICAL CUES · LISTENING STUDY</div>
  <div style={{position:'absolute',left:173,top:435,width:280,height:65,borderRadius:'50%',background:'#e8ba65',filter:'blur(25px)',opacity:state.glow}}/>
  <div style={{position:'absolute',left:315,top:500,transformOrigin:'0 0',transform:`translateY(${state.y+bop.y}px) rotate(${state.rotation+bop.rotation}deg) scale(${state.scaleX},${state.scaleY*bop.scaleY})`}}>
   <Img src={staticFile(sprite.src)} style={{position:'absolute',width:320,left:-sprite.anchors.footPivot[0]*scale,top:-sprite.anchors.footPivot[1]*scale,filter:'drop-shadow(2px 5px 2px #58453428)'}}/>
  </div>
  {rhythm&&<div style={{position:'absolute',left:185,top:545,fontFamily:'Bitcount Single',fontWeight:550,fontSize:21,color:'#456b70'}}><span style={{display:'inline-block',width:12,height:12,borderRadius:'50%',marginRight:12,background:'#b76b49',opacity:.15+.85*bop.pulse}}/>PERCUSSION</div>}
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
