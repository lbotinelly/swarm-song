import {bundle} from '@remotion/bundler';
import {selectComposition,renderStill,renderMedia} from '@remotion/renderer';
import {mkdir} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
const dir='assets/registry-finish/review-v2';
await mkdir(dir,{recursive:true});await mkdir('output/registry-finish',{recursive:true});
const serveUrl=await bundle({entryPoint:'scripts/registry-finish-stage.tsx'});
const composition=await selectComposition({serveUrl,id:'RegistryFinish'});
if(process.argv.includes('--stills')){
 for(const frame of [0,34,35,52,53,66,80,89,90,97,98,108,120,126,132,138,145,164,180,190,195,210,225,239]){
  await renderStill({serveUrl,composition,frame,output:`${dir}/frame-${String(frame).padStart(3,'0')}.png`});
  console.log(`still ${frame}`);
 }
 await renderStill({serveUrl,composition,frame:108,output:`${dir}/repeat-108.png`});
 const inheritance=await selectComposition({serveUrl,id:'VentInheritance'});
 await renderStill({serveUrl,composition:inheritance,frame:108,output:`${dir}/inheritance.png`});
 await renderStill({serveUrl,composition:inheritance,frame:0,output:`${dir}/inheritance-hidden.png`});
}
if(process.argv.includes('--video')){
 await renderMedia({serveUrl,composition,codec:'h264',crf:14,concurrency:4,outputLocation:'output/registry-finish/silent.mp4',onProgress:({progress})=>{if(Math.round(progress*100)%20===0)process.stdout.write('.');}});
 for(const [name,duration] of [['registry-context',8],['registry-finish',146/30]]){
  execFileSync('ffmpeg',['-v','error','-y','-i','output/registry-finish/silent.mp4','-i','public/audio/registry-master-v1.wav','-t',String(duration),'-map','0:v','-map','1:a','-vf','scale=in_range=full:out_range=limited,format=yuv420p','-c:v','libx264','-preset','slow','-crf','16','-color_range','tv','-c:a','aac','-b:a','320k','-movflags','+faststart',`${dir}/${name}.mp4`]);
 }
 console.log('\nVideo complete');
}
