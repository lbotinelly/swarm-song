import {paperPopAt,type PopRegion} from './paper-pop';
import type {WindSampler} from './playset-wind';
export function PaperPop({ms,swap,wind,brisk=false,...box}:PopRegion&{ms:number;swap:number;wind?:WindSampler;brisk?:boolean}){
 const circles=paperPopAt(ms,swap,box,wind,brisk);if(!circles.length)return null;
 return <svg width="1920" height="1080" style={{position:'absolute',inset:0,overflow:'visible',pointerEvents:'none'}}>
  <g style={{filter:'drop-shadow(1px 2px 1px #796c4e20)'}}>
   {circles.map(c=><circle key={c.id} cx={c.x} cy={c.y} r={c.r} opacity={c.opacity} fill="#fffdf7" stroke="#e9e3d633" strokeWidth="1"/>)}
  </g>
 </svg>;
}
