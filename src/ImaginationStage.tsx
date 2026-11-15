import {AbsoluteFill} from 'remotion';
import {Piece} from './PaperApartment';
import {Cut} from './ImaginedVillage';
import {LivingBush,PlaysetPart} from './Playset';
import {MagicGoggles} from './Storyboard';

// SH010/011: the same three performances, staged in a world beyond the frame.
// Depth belongs to scenery, never to independently sliding buildings/feet.
export function ImaginationStage({ms}:{ms:number}){
 const drift=12*Math.sin((ms-40000)/11000),breeze=ms-39000;
 return <AbsoluteFill style={{background:'#cdded9',overflow:'hidden'}}>
  <Piece part="wall" x={-40} y={-30} w={2000} h={1140}/>
  <AbsoluteFill style={{background:'linear-gradient(#8ebacbda 0%,#e5e6c9a0 48%,#fff0c500 77%)'}}/>
  <PlaysetPart id="layered-sun" x={1320-drift*.2} y={235} w={190}/>
  <PlaysetPart id="cloud-bank" x={-160+drift*.4} y={210} w={670}/>
  <PlaysetPart id="cloud-bank" x={1530+drift*.5} y={300} w={570}/>
  <PlaysetPart id="cloud-bank" x={630+drift*.2} y={145} w={320}/>
  <Cut id="hill-a-v1" x={-250-drift*.3} y={330} w={2450} style={{filter:'saturate(.55)',opacity:.7}}/>
  <div style={{position:'absolute',inset:'440px 0 0',background:'linear-gradient(#d6e1ce00,#b7c797 45%,#8fa772)'}}/>
  <Cut id="hill-a-v1" x={-550-drift*.55} y={490} w={2350}/>
  <Cut id="hill-b-v1" x={700-drift*.55} y={475} w={1950}/>
  <div style={{position:'absolute',inset:0,transform:`translateX(${-drift*.55}px)`}}>
   <Cut id="house-b-v1" x={150} y={485} w={210} angle={-3}/>
   <Cut id="house-a-v1" x={1535} y={510} w={220} angle={3}/>
   <Cut id="house-a-v1" x={1190} y={560} w={130} angle={-2}/>
  </div>
  <svg width="1920" height="1080" style={{position:'absolute',inset:0}}><path d="M-120 805 Q300 660 600 720 H2100 V1200 H-120Z" fill="#d7d5a6"/><path d="M-120 805 Q300 660 600 720 H2100" fill="none" stroke="#f7edce" strokeWidth="65"/></svg>
  <div style={{position:'absolute',inset:0,opacity:.17,mixBlendMode:'multiply',pointerEvents:'none'}}><Piece part="wall" w={1920} h={1080}/></div>
  <div style={{position:'absolute',left:-180,top:65,transform:'scale(1.12)',transformOrigin:'0 0'}}>
   {[[830,355],[1150,300],[1440,280]].map(([x,w],index)=><MagicGoggles key={index} ms={ms} x={x} w={w} index={index} flip={index>0}/>)}
  </div>
  <LivingBush x={-220-drift} y={1100} w={850} ms={breeze}/>
  <LivingBush x={1450-drift} y={1110} w={780} ms={breeze}/>
 </AbsoluteFill>;
}
