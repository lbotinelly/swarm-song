// Continue the approved chapter with its existing scene, at absolute master frames.
import {bundle} from '@remotion/bundler';
import {selectComposition,renderStill,renderMedia} from '@remotion/renderer';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
const dir='assets/milestone12/crafting/review',scratch='output/milestone12/crafting';
await mkdir(dir,{recursive:true});await mkdir(scratch,{recursive:true});
const approved='assets/milestone12/review/first-chapter-42s.mp4';
const sha=b=>createHash('sha256').update(b).digest('hex');
const original=sha(await readFile(approved));
const serveUrl=await bundle({entryPoint:'scripts/chapter-stage.tsx'});
const composition=await selectComposition({serveUrl,id:'Chapter55'});
const joinOnly=process.argv.includes('--join-only');
const frames=joinOnly?[1259]:[1259,1260,1271,1290,1299,1320,1338,1347,1394,1395,1425,1470,1500,1530,1590,1649];
for(const frame of frames){await renderStill({serveUrl,composition,frame,output:`${dir}/${frame}.png`});console.log(`Still ${frame}`);}
if(joinOnly)process.exit(0);
let last=-1;
await renderMedia({serveUrl,composition,codec:'h264',crf:18,concurrency:8,frameRange:[1260,1649],outputLocation:`${scratch}/silent.mp4`,onProgress:({progress})=>{const n=Math.floor(progress*10);if(n!==last){last=n;console.log(`Crafting ${n*10}%`);}}});
const master='assets/audio/Swarm Song (The Huggingface Incident) feat. Agent407.wav';
const ff=(...args)=>execFileSync('ffmpeg',['-v','error','-y',...args]);
const video=['-c:v','libx264','-crf','18','-preset','fast','-pix_fmt','yuv420p','-color_range','tv'];
const audio=['-c:a','aac','-b:a','320k','-movflags','+faststart'];
ff('-i',`${scratch}/silent.mp4`,'-ss','42','-i',master,'-t','13','-map','0:v','-map','1:a','-vf','scale=in_range=full:out_range=limited,format=yuv420p',...video,...audio,`${dir}/crafting-42-55.mp4`);
// Concatenate pictures only; encode one uninterrupted original-master soundtrack.
ff('-i',approved,'-i',`${dir}/crafting-42-55.mp4`,'-i',master,'-filter_complex','[0:v]setpts=PTS-STARTPTS[v0];[1:v]setpts=PTS-STARTPTS[v1];[v0][v1]concat=n=2:v=1:a=0[v]','-map','[v]','-map','2:a','-t','55',...video,...audio,`${dir}/chapter-55s.mp4`);
ff('-ss','39','-i',`${dir}/chapter-55s.mp4`,'-ss','39','-i',master,'-t','16','-map','0:v','-map','1:a',...video,...audio,`${dir}/handoff-39-55.mp4`);
if(sha(await readFile(approved))!==original)throw new Error('Approved chapter changed');
await writeFile('assets/milestone12/crafting/preserved-chapter.json',JSON.stringify({path:approved,sha256:original},null,2));
console.log('Rendered 55-second chapter and two focused cuts; approved 42-second export preserved.');
