export type Word = {id:string;text:string;startMs:number;endMs:number;widthEm:number;status:string;issues:string[];emphasis:boolean};
export type Phrase = {id:string;sectionId:string;text:string;startMs:number;endMs:number;words:Word[];mode:'read-ahead'|'surprise'|'hero';layout:string;lineBreakAfter?:number[];presentation:{startMs:number;endMs:number};status:string};
export type Rect={x:number;y:number;w:number;h:number};
export const regions:Record<string,Rect>={
 'village-caption':{x:170,y:20,w:1580,h:430},
 'lower-center':{x:140,y:610,w:1640,h:410},'lower-left':{x:110,y:650,w:1080,h:320},'lower-right':{x:730,y:650,w:1080,h:320},
 'upper-left':{x:110,y:100,w:1080,h:320},'upper-right':{x:730,y:100,w:1080,h:320},hero:{x:170,y:320,w:1580,h:430},
};
export const EXIT_MS=150;
export const clamp=(x:number)=>Math.max(0,Math.min(1,x));
export const smooth=(x:number)=>{const t=clamp(x);return t*t*(3-2*t);};
export function visiblePhrases(phrases:Phrase[],ms:number){return phrases.filter(p=>ms>=p.presentation.startMs&&ms<p.presentation.endMs+EXIT_MS);}
export function layoutWords(p:Phrase,preset=p.layout){
 const r=regions[preset]??regions.hero;
 const lower=preset.startsWith('lower-');
 const font=lower?(p.mode==='hero'?104:96):preset==='village-caption'?116:p.mode==='hero'?132:100;
 const gap=26;
 const rows: {word:Word;w:number;font:number}[][]=[[]];let width=0;
 for(const [wi,word] of p.words.entries()){const f=font*(p.mode==='hero'&&word===p.words.at(-1)?1.3:1);const w=word.widthEm*f+24;
  if((width+w>r.w||p.lineBreakAfter?.includes(wi))&&rows.at(-1)!.length){rows.push([]);width=0;}
  rows.at(-1)!.push({word,w,font:f});width+=w+gap;
 }
 const step=lower?140:165;
 const top=lower?1020-(rows.length-1)*step-Math.max(...rows.at(-1)!.map(w=>w.font))*1.7:r.y;
 return rows.flatMap((row,ri)=>{let x=r.x+(r.w-row.reduce((s,w)=>s+w.w,0)-gap*(row.length-1))/2;
 return row.map((v,i)=>{const item={...v,x,y:top+ri*step+(i%3===1?-6:0),angle:[-2.5,1.8,-1,2.4,-1.7,1][i%6]};x+=v.w+gap;return item;});});
}
export function intersects(a:Rect,b:Rect){return a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;}
export function conflicts(p:Phrase,protectedRegions:Rect[],preset=p.layout){return layoutWords(p,preset).filter(w=>protectedRegions.some(r=>intersects({x:w.x-15,y:w.y-15,w:w.w+30,h:w.font*1.6+30},r))).map(w=>w.word.id);}
export function wordMotion(p:Phrase,w:Word,ms:number,strategy='slap'){
 const motionMs=Math.min(ms,p.presentation.endMs);
 const entrance=p.presentation.startMs;const age=motionMs-entrance;
 const incoming=smooth(age/220),out=smooth((ms-p.presentation.endMs)/EXIT_MS);
 const emphasis=w.emphasis?Math.sin(Math.PI*clamp((motionMs-w.startMs)/Math.max(280,Math.min(700,w.endMs-w.startMs)))):0;
 return {opacity:strategy==='word'?(ms>=w.startMs&&ms<Math.max(w.endMs,w.startMs+120)?1:0):smooth(age/100)*(1-out),
 y:(strategy==='slap'?(1-incoming)*(p.sectionId==='goodbye'?-15:-65):0)-emphasis*12,
 x:0,scale:1+(strategy==='slap'?.035*Math.sin(Math.PI*incoming):0)+emphasis*.035,
 turn:strategy==='slap'?(1-incoming)*-3:0,shadow:3+(1-incoming)*12+emphasis*3};
}

// Authored composition contracts, not an automatic collision solver.
export const sceneContracts:Record<string,{preset:string;protectedRegions:Rect[]}>= {
 gpu:{preset:'lower-center',protectedRegions:[{x:810,y:70,w:500,h:640}]},
 village:{preset:'lower-center',protectedRegions:[{x:760,y:370,w:440,h:210},{x:900,y:65,w:370,h:330}]},
};
