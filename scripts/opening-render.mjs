import {bundle} from '@remotion/bundler';
import {selectComposition,renderStill,renderMedia} from '@remotion/renderer';
import {mkdir} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
const args=process.argv.slice(2),dir='assets/milestone11/review-v2';
await mkdir(dir,{recursive:true});await mkdir('output/milestone11/v2',{recursive:true});
const serveUrl=await bundle({entryPoint:'scripts/opening-stage.tsx'});
const selected=args.find(a=>a.startsWith('--mode='))?.slice(7);
for(const mode of ['complete','city','title'].filter(m=>!selected||selected===m)){
 const composition=await selectComposition({serveUrl,id:`Opening-${mode}`});
 if(args.includes('--repeat'))await renderStill({serveUrl,composition,frame:210,output:`${dir}/${mode}-repeat-7000.png`});
 const times=args.find(a=>a.startsWith('--times='))?.slice(8).split(',').map(Number)??[0,2300,3400,5200,6200,7000,7850,8700,9800,10500,11200,12000,12966,13000,13700,14000,14800,16000,19000];
 if(args.includes('--stills'))for(const ms of times.filter(t=>t<composition.durationInFrames/30*1000)){
  for(let attempt=0;;attempt++){try{await renderStill({serveUrl,composition,frame:Math.round(ms*.03),output:`${dir}/${mode}-${ms}.png`});break;}catch(e){if(attempt===2)throw e;await new Promise(r=>setTimeout(r,600));}}
  console.log(`${mode} ${ms}`);
 }
 if(args.includes('--video')){
  let last=-1;
  await renderMedia({serveUrl,composition,codec:'h264',crf:18,concurrency:12,outputLocation:`output/milestone11/v2/${mode}-silent.mp4`,onProgress:({progress})=>{const n=Math.floor(progress*10);if(n!==last){last=n;console.log(`${mode} ${n*10}%`);}}});
  const master='assets/audio/Swarm Song (The Huggingface Incident) feat. Agent407.wav';
  for(const [name,duration] of mode==='complete'?[['opening',13],['continuity-20s',20]]:[[mode,13]])execFileSync('ffmpeg',['-v','error','-y','-i',`output/milestone11/v2/${mode}-silent.mp4`,'-i',master,'-t',String(duration),'-map','0:v','-map','1:a','-vf',"scale=in_range=full:out_range=limited,format=yuv420p,drawbox=color=black:t=fill:enable='lt(t,1.5)'",'-c:v','libx264','-preset','fast','-crf','18','-color_range','tv','-c:a','aac','-b:a','320k','-movflags','+faststart',`${dir}/${name}.mp4`]);
 }
}
