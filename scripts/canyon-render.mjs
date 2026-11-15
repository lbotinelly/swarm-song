import {bundle} from '@remotion/bundler';
import {selectComposition,renderStill,renderMedia} from '@remotion/renderer';
import {mkdir} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
const args=process.argv.slice(2),captions=args.includes('--captions'),focus=args.includes('--focus')||captions,morning=args.includes('--morning')||focus,dense=args.includes('--approach'),dir=`assets/milestone11/${captions?'morning-captions':focus?'morning-focus':morning?'morning-routines':dense?'canyon-approach':'canyon-proof'}/review`;
await mkdir(dir,{recursive:true});await mkdir('output/milestone11/canyon',{recursive:true});
let serveUrl=await bundle({entryPoint:'scripts/canyon-stage.tsx'});
if(args.includes('--room')){const composition=await selectComposition({serveUrl,id:'Room'});await renderStill({serveUrl,composition,frame:0,output:'public/milestone11/canyon/room.png'});console.log('Room plate saved');serveUrl=await bundle({entryPoint:'scripts/canyon-stage.tsx'});}
const composition=await selectComposition({serveUrl,id:captions?'MorningCaptions':focus?'MorningFocus':morning?'Morning':dense?'Approach':'Canyon'});
if(args.includes('--stills'))for(const ms of focus?[0,3400,7000,10800,14000,15200,16000,17400,18200,19000,19900]:morning?[0,3400,7000,9800,10800,11900,13000,13750,14000,14066,14100,15200,15233,15267,15600,15800,16000,17400,18200,19000,19900]:[0,3400,7000,9800,10800,11900,13000,14000,16000,19000]){await renderStill({serveUrl,composition,frame:Math.round(ms*.03),output:`${dir}/${ms}.png`});console.log(`Still ${ms}`);}
if(args.includes('--video')){
 let last=-1;await renderMedia({serveUrl,composition,codec:'h264',crf:18,concurrency:8,outputLocation:'output/milestone11/canyon/silent.mp4',onProgress:({progress})=>{const n=Math.floor(progress*10);if(n!==last){last=n;console.log(`${n*10}%`);}}});
 execFileSync('ffmpeg',['-v','error','-y','-i','output/milestone11/canyon/silent.mp4','-i','assets/audio/Swarm Song (The Huggingface Incident) feat. Agent407.wav','-t','20','-map','0:v','-map','1:a','-vf',"scale=in_range=full:out_range=limited,format=yuv420p,drawbox=color=black:t=fill:enable='lt(t,1.5)'",'-c:v','libx264','-preset','fast','-crf','18','-color_range','tv','-c:a','aac','-b:a','320k','-movflags','+faststart',`${dir}/canyon-opening-20s.mp4`]);console.log('Master-audio proof saved');
}
