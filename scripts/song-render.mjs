import {bundle} from '@remotion/bundler';
import {selectComposition,renderStill,renderMedia} from '@remotion/renderer';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
const args=process.argv.slice(2);
const version=args.includes('--percussion')?'v5':args.includes('--music-cues')?'v4':'v3';
const inputProps={musicCues:version!=='v3',rhythmCues:version==='v5'};
const dir=`assets/milestone7/review-${version}`;await mkdir(dir,{recursive:true});await mkdir('output/milestone7',{recursive:true});
const serveUrl=await bundle({entryPoint:'scripts/song-stage.tsx'});
const full=await selectComposition({serveUrl,id:'SwarmSong',inputProps});
const master='assets/audio/Swarm Song (The Huggingface Incident) feat. Agent407.wav';
if(args.includes('--stills')){
 for(const ms of [...(inputProps.musicCues?[9000,42000,71900,126700,136600,153500,228900,260300]:[]),3000,14000,18500,24400,26500,45000,55000,64000,92500,102500,128500,134800,154500,179500,198500,208500,232000,244500,248000,253000]){
 await renderStill({serveUrl,composition:full,frame:Math.ceil(ms*30/1000),output:`${dir}/song-${ms}.png`});console.log('still',ms);}
 for(const [scene,offsetMs,layoutOverride] of [['gpu',24160,'lower-center'],['village',54580,'lower-center']]){
 const props={scene,offsetMs,layoutOverride};
 await renderStill({serveUrl,composition:{...full,props},inputProps:props,frame:12,output:`${dir}/composition-${scene}.png`});}
 await renderStill({serveUrl,composition:full,frame:1650,output:`${dir}/song-55000-repeat.png`});
}
if(args.includes('--comparisons')){
 for(const [name,start] of [['verse',12500],['registry',23000],['chorus',53500],['goodbye',126000]])for(const strategy of ['word','read','slap']){
 const props={offsetMs:start,strategy,scene:'paper',layoutOverride:''};
 const comp={...full,durationInFrames:240,props};const silent=`output/milestone7/${name}-${strategy}.mp4`;
 await renderMedia({serveUrl,composition:comp,inputProps:props,codec:'h264',crf:20,concurrency:4,outputLocation:silent});
 execFileSync('ffmpeg',['-v','error','-y','-i',silent,'-ss',String(start/1000),'-i',master,'-t','8','-map','0:v','-map','1:a','-c:v','copy','-c:a','aac','-b:a','320k','-movflags','+faststart',`${dir}/${name}-${strategy}.mp4`]);console.log('comparison',name,strategy);
 }
}
if(args.includes('--full')){
 let lastProgress=-1;
 await renderMedia({serveUrl,composition:full,codec:'h264',crf:20,concurrency:6,outputLocation:'output/milestone7/full-silent.mp4',onProgress:({progress})=>{const step=Math.floor(progress*10);if(step!==lastProgress){lastProgress=step;console.log(`Full song ${step*10}%`);}}});
 execFileSync('ffmpeg',['-v','error','-y','-i','output/milestone7/full-silent.mp4','-i',master,'-map','0:v','-map','1:a','-c:v','copy','-c:a','aac','-b:a','320k','-t','262.8','-movflags','+faststart',`${dir}/swarm-song-${version}.mp4`]);console.log('Full song complete');
}
