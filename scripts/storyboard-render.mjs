// Adapted from song-render.mjs. One composition, exact master, no cloud services.
import {bundle} from '@remotion/bundler';
import {selectComposition,renderStill,renderMedia} from '@remotion/renderer';
import {mkdir,readFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
const args=process.argv.slice(2),dir='assets/milestone8/review-v2';
await mkdir(dir,{recursive:true});await mkdir('output/milestone8',{recursive:true});
const board=JSON.parse(await readFile('assets/milestone8/storyboard.json','utf8'));
if(args.includes('--extract-middle')){
 // Exact decoded video window, plus the original master window (not AAC re-encoding).
 execFileSync('ffmpeg',['-v','error','-y','-ss','83','-i','output/milestone8/full-silent.mp4','-ss','83','-i',board.master,'-t','29','-map','0:v','-map','1:a','-c:v','libx264','-preset','fast','-crf','20','-c:a','aac','-b:a','320k','-movflags','+faststart',`${dir}/middle.mp4`]);
 console.log('Extracted focused master interval');process.exit(0);
}
const serveUrl=await bundle({entryPoint:'scripts/storyboard-stage.tsx'});
const composition=await selectComposition({serveUrl,id:'Storyboard'});
const special=[84900,86400,86650,87700,89900,90300,91100,91200,91800,92400,95600,96100,105300,107200,108100,110300,141500,143000,197000,210000,259000];
if(args.includes('--stills')){
 for(const shot of board.shots){const frame=Math.ceil((shot.startMs+(shot.endMs-shot.startMs)*.6)*.03);await renderStill({serveUrl,composition,frame,output:`${dir}/${shot.id}.jpg`,imageFormat:'jpeg',jpegQuality:90});console.log(shot.id);}
 for(const ms of special)await renderStill({serveUrl,composition,frame:Math.ceil(ms*.03),output:`${dir}/beat-${ms}.png`});
 await renderStill({serveUrl,composition,frame:2883,output:`${dir}/repeat-96100.png`});
}
if(args.includes('--middle')||args.includes('--full')){
 const middle=!args.includes('--full'),name=middle?'middle':'full';let last=-1;
 await renderMedia({serveUrl,composition,codec:'h264',crf:21,concurrency:6,frameRange:middle?[2490,3359]:undefined,outputLocation:`output/milestone8/${name}-silent.mp4`,onProgress:({progress})=>{const n=Math.floor(progress*10);if(n!==last){last=n;console.log(`${name} ${n*10}%`);}}});
 execFileSync('ffmpeg',['-v','error','-y','-i',`output/milestone8/${name}-silent.mp4`,...(middle?['-ss','83']:[]),'-i',board.master,'-t',middle?'29':'262.8','-map','0:v','-map','1:a',...(middle?['-c:v','copy']:['-vf',"scale=in_range=full:out_range=limited,format=yuv420p,drawbox=x=0:y=0:w=iw:h=ih:color=black:t=fill:enable='gte(t,142)*lt(t,144)'",'-c:v','libx264','-preset','fast','-crf','21','-pix_fmt','yuv420p','-color_range','tv','-force_key_frames','142,144']),'-c:a','aac','-b:a','320k','-movflags','+faststart',`${dir}/${name}.mp4`]);
}
