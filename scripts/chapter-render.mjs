import {bundle} from '@remotion/bundler';
import {selectComposition,renderStill,renderMedia} from '@remotion/renderer';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
const args=process.argv.slice(2),dir='assets/milestone12/review';
await mkdir(dir,{recursive:true});await mkdir('output/milestone12',{recursive:true});
const serveUrl=await bundle({entryPoint:'scripts/chapter-stage.tsx'});
const composition=await selectComposition({serveUrl,id:'Chapter'});
const times=[22966,27966,29466,29500,29566,31166,31966,32000,34066,34100,35166,35966,36000,38966,40900,0,10800,14000,19000,19966,20000,20700,22000,23000,23333,24750,25050,25500,25900,26800,28000,28600,29200,29600,30200,31000,31200,31700,32200,33000,33700,34400,35000,35200,35800,36200,37800,39000,40000,41000,41966];
if(args.includes('--stills'))for(const ms of times){await renderStill({serveUrl,composition,frame:Math.round(ms*.03),output:`${dir}/${ms}.png`});console.log(`Still ${ms}`);}
const master='assets/audio/Swarm Song (The Huggingface Incident) feat. Agent407.wav';
function mux(silent,out,start=0,duration=42){execFileSync('ffmpeg',['-v','error','-y','-ss',String(start),'-i',silent,'-ss',String(start),'-i',master,'-t',String(duration),'-map','0:v','-map','1:a','-vf','scale=in_range=full:out_range=limited,format=yuv420p','-c:v','libx264','-crf','18','-preset','fast','-color_range','tv','-c:a','aac','-b:a','320k','-movflags','+faststart',out]);}
if(args.includes('--video')){
 let last=-1;await renderMedia({serveUrl,composition,codec:'h264',crf:18,concurrency:8,outputLocation:'output/milestone12/silent.mp4',onProgress:({progress})=>{const n=Math.floor(progress*10);if(n!==last){last=n;console.log(`Chapter ${n*10}%`);}}});
 mux('output/milestone12/silent.mp4',`${dir}/first-chapter-42s.mp4`);
 mux('output/milestone12/silent.mp4',`${dir}/continuity-18-36.mp4`,18,18);
 mux('output/milestone12/silent.mp4',`${dir}/connection-28-42.mp4`,28,14);
}
if(args.includes('--comparison')){
 const comp=await selectComposition({serveUrl,id:'ARoll'});let last=-1;
 await renderMedia({serveUrl,composition:comp,codec:'h264',crf:18,concurrency:8,outputLocation:'output/milestone12/aroll-silent.mp4',onProgress:({progress})=>{const n=Math.floor(progress*10);if(n!==last){last=n;console.log(`A-roll ${n*10}%`);}}});
 mux('output/milestone12/aroll-silent.mp4',`${dir}/aroll-only-42s.mp4`);
}

if(args.includes('--verify-seeks')){
 const hashes={};
 for(const ms of [40000,25500,20000]){
  const out=`output/milestone12/seek-${ms}.png`;await renderStill({serveUrl,composition,frame:Math.round(ms*.03),output:out});
  const sha=b=>createHash('sha256').update(b).digest('hex');
  const actual=sha(await readFile(out)),expected=sha(await readFile(`${dir}/${ms}.png`));
  const pixels=JSON.parse(execFileSync('python',['-c',`from PIL import Image
import numpy as np,json,sys
a=np.array(Image.open(sys.argv[1])).astype(int);b=np.array(Image.open(sys.argv[2])).astype(int)
d=abs(a-b);print(json.dumps({'changedPixels':int(np.any(d,axis=2).sum()),'maxChannelDifference':int(d.max()),'meanChannelDifference':float(d.mean())}))`,out,`${dir}/${ms}.png`],{encoding:'utf8'}));
  // Chromium can round a small resampled texture differently between render batches.
  // Bound this explicitly; timing/pose state remains exact in the frame tests.
  if(pixels.maxChannelDifference>3||pixels.changedPixels>2073)throw new Error(`Direct seek differs at ${ms}: ${JSON.stringify(pixels)}`);
  hashes[ms]={actual,expected,exact:actual===expected,...pixels};
 }
 await writeFile('assets/milestone12/seek-qa.json',JSON.stringify(hashes,null,2));console.log('Reverse/direct render seeks pass bounded pixel comparison');
}
