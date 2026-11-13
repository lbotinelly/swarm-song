import {bundle} from '@remotion/bundler';
import {selectComposition,renderStill,renderMedia} from '@remotion/renderer';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const dir='assets/milestone4/review';
await mkdir(dir,{recursive:true});
const serveUrl=await bundle({entryPoint:'scripts/pages-stage.tsx'});
const only=process.argv.find(a=>a.startsWith('--only='))?.split('=')[1];
const shared=[0,60,90,150,240,345,375,435,465,480,510,539,540,555,800,830,855,929];
const history=[570,595,610,635,655,680,700,725,750,775];
for(const id of only?[only]:['A','B','C']) {
 const composition=await selectComposition({serveUrl,id:`Pages${id}`});
 if(!process.argv.includes('--video-only')) {
  for(const frame of [...(id==='A'?shared:[]),...history]) {
   await renderStill({serveUrl,composition,frame,output:`${dir}/${id}-${frame}.png`,imageFormat:'png'});
  }
  console.log(`${id}: stills done`);
 }
 if(!process.argv.includes('--stills-only')) {
  await renderMedia({serveUrl,composition,codec:'h264',crf:18,concurrency:4,outputLocation:`${dir}/treatment-${id}.mp4`});
  console.log(`${id}: MP4 done`);
 }
}
if(!process.argv.includes('--video-only')) {
 const composition=await selectComposition({serveUrl,id:'PagesA'});
 await renderStill({serveUrl,composition,frame:655,output:`${dir}/A-655-repeat.png`,imageFormat:'png'});
 const hash=async p=>createHash('sha256').update(await readFile(p)).digest('hex');
 const a=await hash(`${dir}/A-655.png`),b=await hash(`${dir}/A-655-repeat.png`);
 if(a!==b)throw Error('Direct seek mismatch');
 await writeFile(`${dir}/determinism.json`,JSON.stringify({frame:655,sha256:a,repeatSha256:b,match:true},null,2)+'\n');
 const match=await selectComposition({serveUrl,id:'FirstAwakeningMatch'});
 await renderStill({serveUrl,composition:match,output:`${dir}/first-awakening-match.png`,imageFormat:'png'});
}
