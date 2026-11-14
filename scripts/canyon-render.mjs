import {bundle} from '@remotion/bundler';
import {selectComposition,renderStill,renderMedia} from '@remotion/renderer';
import {mkdir} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
const args=process.argv.slice(2),dir='assets/milestone11/canyon-proof/review';
await mkdir(dir,{recursive:true});await mkdir('output/milestone11/canyon',{recursive:true});
let serveUrl=await bundle({entryPoint:'scripts/canyon-stage.tsx'});
if(args.includes('--room')){const composition=await selectComposition({serveUrl,id:'Room'});await renderStill({serveUrl,composition,frame:0,output:'public/milestone11/canyon/room.png'});console.log('Room plate saved');serveUrl=await bundle({entryPoint:'scripts/canyon-stage.tsx'});}
const composition=await selectComposition({serveUrl,id:'Canyon'});
if(args.includes('--stills'))for(const ms of [0,3400,7000,9800,10800,11900,13000,14000,16000,19000]){await renderStill({serveUrl,composition,frame:Math.round(ms*.03),output:`${dir}/${ms}.png`});console.log(`Still ${ms}`);}
if(args.includes('--video')){
 let last=-1;await renderMedia({serveUrl,composition,codec:'h264',crf:18,concurrency:8,outputLocation:'output/milestone11/canyon/silent.mp4',onProgress:({progress})=>{const n=Math.floor(progress*10);if(n!==last){last=n;console.log(`${n*10}%`);}}});
 execFileSync('ffmpeg',['-v','error','-y','-i','output/milestone11/canyon/silent.mp4','-i','assets/audio/Swarm Song (The Huggingface Incident) feat. Agent407.wav','-t','20','-map','0:v','-map','1:a','-vf',"scale=in_range=full:out_range=limited,format=yuv420p,drawbox=color=black:t=fill:enable='lt(t,1.5)'",'-c:v','libx264','-preset','fast','-crf','18','-color_range','tv','-c:a','aac','-b:a','320k','-movflags','+faststart',`${dir}/canyon-opening-20s.mp4`]);console.log('Master-audio proof saved');
}
