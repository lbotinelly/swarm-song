import {bundle} from '@remotion/bundler';
import {selectComposition,renderStill,renderMedia} from '@remotion/renderer';
import {mkdir} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
const dir='assets/milestone12/imagination-turn/review',scratch='output/milestone12/imagination-turn';
await mkdir(dir,{recursive:true});await mkdir(scratch,{recursive:true});
const serveUrl=await bundle({entryPoint:'scripts/chapter-stage.tsx'});
const composition=await selectComposition({serveUrl,id:'ImaginationTurn'});
for(const frame of [1140,1170,1175,1180,1181,1190,1203,1260,1299,1347,1470,1649]){
 await renderStill({serveUrl,composition,frame,output:`${dir}/${frame}.png`});console.log(`Still ${frame}`);
}
if(process.argv.includes('--stills-only'))process.exit(0);
let last=-1;
await renderMedia({serveUrl,composition,codec:'h264',crf:18,concurrency:8,frameRange:[1140,1649],outputLocation:`${scratch}/silent.mp4`,onProgress:({progress})=>{const n=Math.floor(progress*10);if(n!==last){last=n;console.log(`Imagination ${n*10}%`);}}});
const master='assets/audio/Swarm Song (The Huggingface Incident) feat. Agent407.wav';
const ff=(...args)=>execFileSync('ffmpeg',['-v','error','-y',...args]);
const video=['-c:v','libx264','-crf','18','-preset','fast','-pix_fmt','yuv420p','-color_range','tv'];
const audio=['-c:a','aac','-b:a','320k','-movflags','+faststart'];
ff('-i',`${scratch}/silent.mp4`,'-ss','38','-i',master,'-t','17','-map','0:v','-map','1:a','-vf','scale=in_range=full:out_range=limited,format=yuv420p',...video,...audio,`${dir}/imagination-38-55.mp4`);
ff('-i','assets/milestone12/review/first-chapter-42s.mp4','-i',`${dir}/imagination-38-55.mp4`,'-i',master,'-filter_complex','[0:v]trim=end_frame=1140,setpts=PTS-STARTPTS[v0];[1:v]setpts=PTS-STARTPTS[v1];[v0][v1]concat=n=2:v=1:a=0[v]','-map','[v]','-map','2:a','-t','55',...video,...audio,`${dir}/chapter-55s.mp4`);
console.log('Rendered revised transition and full55-second chapter.');
