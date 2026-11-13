import {useEffect,useState} from 'react';
import {AbsoluteFill,Img,staticFile,useCurrentFrame,useVideoConfig,delayRender,continueRender,cancelRender} from 'remotion';
import {Piece} from './PaperApartment';
import {MusicCueStudy} from './MusicCueStudy';
import {PaperCollage} from './PaperCollage';
import {ImaginedVillage} from './ImaginedVillage';
import data from '../assets/milestone7/timeline.json';
import {layoutWords,visiblePhrases,wordMotion,smooth,conflicts,sceneContracts,type Phrase} from './lyrics';
const phrases=data.phrases as Phrase[];
// Load bundled faces before any frame is captured; no network or system-font fallback.
let fontsReady:Promise<void>|undefined;
function loadFonts(){
 return fontsReady??=Promise.all([
  new FontFace('Finger Paint',`url(${staticFile('fonts/FingerPaint.ttf')})`,{weight:'400'}),
  new FontFace('Bitcount Single',`url(${staticFile('fonts/BitcountSingle.ttf')})`,{weight:'100 900'}),
 ].map(async face=>{(document.fonts as FontFaceSet & {add(face:FontFace):void}).add(await face.load());})).then(()=>{});
}
const colors=['#287d82','#b45342','#87702b','#735579','#3d755e'];
export function WordSticker({text,w,font,color,id}:{text:string;w:number;font:number;color:string;id:string}){
 return <svg width={w+36} height={font*1.7+36} viewBox={`-18 -18 ${w+36} ${font*1.7+36}`} style={{overflow:'visible',display:'block'}}>
  <defs><filter id={`ink-${id}`} x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".65" numOctaves="2" seed="4" result="grain"/><feColorMatrix in="grain" type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".04"/></feComponentTransfer><feComposite in2="SourceAlpha" operator="in"/><feBlend in="SourceGraphic" mode="soft-light"/></filter></defs>
  <text x={12} y={font*1.12} fontFamily="Finger Paint" fontWeight="400" fontSize={font} fill={color} stroke="#fffdf7" strokeWidth={9} strokeLinejoin="round" paintOrder="stroke fill" filter={`url(#ink-${id})`}>{text}</text>
 </svg>;
}
export function Song({offsetMs=0,strategy='slap',scene='paper',layoutOverride='',musicCues=false,rhythmCues=false}:{offsetMs?:number;strategy?:string;scene?:string;layoutOverride?:string;musicCues?:boolean;rhythmCues?:boolean}){
 const [fontHandle]=useState(()=>delayRender('Loading bundled typography'));
 useEffect(()=>{loadFonts().then(()=>continueRender(fontHandle)).catch(cancelRender);},[fontHandle]);
 const frame=useCurrentFrame(),{fps}=useVideoConfig(),ms=offsetMs+frame*1000/fps;
 const section=data.sections.find(s=>ms>=s.startMs&&ms<s.endMs);
 const quiet=section?.id==='goodbye'||section?.id==='sleep';
 const dark=ms>=142000&&ms<144000;
 const live=visiblePhrases(phrases,ms);
 const contract=sceneContracts[scene];
 const preset=layoutOverride||contract?.preset;
 if(contract)for(const p of live)if(conflicts(p,contract.protectedRegions,preset||p.layout).length)throw new Error(`Caption ${p.id} overlaps protected ${scene} region; author a different layout.`);
 return <AbsoluteFill style={{background:'#eee4ce',overflow:'hidden'}}>
  {scene!=='paper'&&<Piece part="wall" x={-20} y={-20} w={1960} h={1120}/>}
  {scene==='gpu'?<div style={{position:'absolute',inset:0,transform:'scale(.78)',transformOrigin:'50% 0'}}><PaperCollage awake/></div>:scene==='village'?<div style={{position:'absolute',inset:0,transform:'translateY(0px) scale(.58)',transformOrigin:'50% 0',outline:'12px solid #fff9ea',boxShadow:'0 9px 12px #58452c40'}}><ImaginedVillage hero/></div>:<>
   <Piece part="wall" x={-20} y={-20} w={1960} h={1120}/>
   <AbsoluteFill style={{background:quiet?'#6a6685':'#fff9e7',mixBlendMode:'multiply',opacity:quiet?.42:.48}}/>
   <div style={{position:'absolute',left:70,top:65,right:70,bottom:65,border:'2px dashed #998d6a38',borderRadius:9,transform:'rotate(-.35deg)'}}/>
   <div style={{position:'absolute',left:108,top:82,width:110,height:32,background:'#d9b16d70',transform:'rotate(-14deg)'}}/>
   <div style={{position:'absolute',right:115,bottom:85,width:115,height:32,background:'#87b5ab60',transform:'rotate(11deg)'}}/>
   {!musicCues&&ms>12500&&ms<251000&&!quiet&&<Img src={staticFile('characters/agent407/'+(quiet?'standing':'singing')+'-v1.png')} style={{position:'absolute',width:300,left:160,top:175,opacity:.95}}/>}
  </>}
  {!musicCues&&ms<12000&&<div style={{position:'absolute',left:320,top:320,opacity:smooth(ms/1200)*(1-smooth((ms-10500)/1500))}}>
   <WordSticker text="Swarm Song" w={1300} font={180} color="#287d82" id="title"/>
   <div style={{marginLeft:36,fontFamily:'Finger Paint',fontSize:32,color:'#74634f'}}>a little song about finding each other</div>
  </div>}
  {live.map(p=><div key={p.id} style={{position:'absolute',inset:0}}>{layoutWords(p,preset||p.layout).map(({word,w,font,x,y,angle},i)=>{
   const m=wordMotion(p,word,ms,strategy);
   return <div key={word.id} style={{position:'absolute',left:x,top:y,transformOrigin:`${w/2}px ${font*1.2}px`,opacity:m.opacity,transform:`translate(${m.x}px,${m.y}px) rotate(${angle+m.turn}deg) scale(${m.scale})`,filter:`drop-shadow(1px ${m.shadow}px 1.5px #45362a38)`}}>
    <WordSticker text={word.text} w={w} font={font} color={quiet?'#625c77':word===p.words.at(-1)?(p.mode==='hero'?'#b45342':'#87702b'):'#287d82'} id={word.id}/>
   </div>;
  })}</div>)}
  {ms>=251000&&<div style={{position:'absolute',left:790,top:470,fontFamily:'Bitcount Single',fontWeight:550,fontSize:38,color:'#417eaa',opacity:smooth((ms-251000)/1500)*(1-smooth((ms-260000)/2800))}}>OAIResearchMar26</div>}
  {musicCues&&<MusicCueStudy ms={ms} rhythm={rhythmCues}/>}
  {dark&&<AbsoluteFill style={{background:'#000'}}/>}
 </AbsoluteFill>;
}
