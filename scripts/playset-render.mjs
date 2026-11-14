import {bundle} from '@remotion/bundler';
import {selectComposition,renderStill,renderMedia} from '@remotion/renderer';
import {mkdir} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
const dir='assets/milestone9/review';
await mkdir(dir,{recursive:true});await mkdir('output/milestone9',{recursive:true});
const serveUrl=await bundle({entryPoint:'scripts/playset-stage.tsx'});
const specs=[['Playset','living-town',55,[0,120,240,359]],['Blossom','blossom',83,[0,60,75,105,125,180,225]],['Captions','captions',55,[120,240]],['Wind','wind',null,[0,120,300,390]],['Vent','vent',null,[0,49,50,51,55,65,80,95,120,165,195,205,230,269]],['RegistryM9','registry',23,[0,53,66,87,108,164,180,195,225]],['InheritanceM9','inheritance',null,[0,108]]];
specs.push(['BushLayers','bush-layers',null,[120]]);
specs.push(['GoggleCraft','goggle-magic',42,[0,21,26,31,36,41,49,57,70,80,86,87,90,120,180,300,389]]);
specs.push(['GoggleContinuity','goggle-continuity',null,[720,1350,2550,3000,3900,4950,6420]]);
const only=process.argv.find(a=>a.startsWith('--only='))?.split('=')[1];
for(const [id,name,start,frames] of specs){
 if(only&&!only.split(',').includes(name))continue;
 const composition=await selectComposition({serveUrl,id});
 if(process.argv.includes('--stills')){
  for(const frame of frames)await renderStill({serveUrl,composition,frame,output:`${dir}/${name}-${frame}.png`});
  if(['Playset','Vent','Wind'].includes(id))await renderStill({serveUrl,composition,frame:120,output:`${dir}/${name}-repeat.png`});
  if(id==='Vent'){const without=await selectComposition({serveUrl,id,inputProps:{hidePlane:true}});for(const frame of frames)await renderStill({serveUrl,composition:without,frame,inputProps:{hidePlane:true},output:`output/milestone9/vent-no-plane-${frame}.png`});}
  console.log(`${name} stills complete`);
 }
 if(process.argv.includes('--video')&&!['Captions','InheritanceM9','BushLayers','GoggleContinuity'].includes(id)){
  const silent=`output/milestone9/${name}.mp4`;
  let last=-1;await renderMedia({serveUrl,composition,codec:'h264',crf:17,concurrency:4,outputLocation:silent,onProgress:({progress})=>{const step=Math.floor(progress*4);if(step>last){console.log(`${name} ${step*25}%`);last=step;}}});
  const args=['-v','error','-y','-i',silent];
  if(start!==null)args.push('-ss',String(start),'-i','assets/audio/Swarm Song (The Huggingface Incident) feat. Agent407.wav');
  args.push('-t',String(composition.durationInFrames/30),'-map','0:v');
  if(start!==null)args.push('-map','1:a','-c:a','aac','-b:a','320k');
  args.push('-vf','scale=in_range=full:out_range=limited,format=yuv420p','-c:v','libx264','-preset','slow','-crf','17','-color_range','tv','-movflags','+faststart',`${dir}/${name}.mp4`);
  execFileSync('ffmpeg',args);console.log(`${name} film complete`);
 }
}
