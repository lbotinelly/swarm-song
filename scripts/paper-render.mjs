import {bundle} from '@remotion/bundler';
import {selectComposition,renderStill,renderMedia} from '@remotion/renderer';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const dir='assets/milestone5/review';
await mkdir(dir,{recursive:true});
const serveUrl=await bundle({entryPoint:'scripts/paper-stage.tsx'});
const composition=await selectComposition({serveUrl,id:'PaperSet'});
for(const frame of [0,105,150,195,210,240,254,255,300,359]) {
 await renderStill({serveUrl,composition,frame,output:`${dir}/set-${frame}.png`,imageFormat:'png'});
 console.log(`Still ${frame}`);
}
await renderStill({serveUrl,composition,frame:105,output:`${dir}/set-105-repeat.png`,imageFormat:'png'});
const hash=async p=>createHash('sha256').update(await readFile(p)).digest('hex');
const a=await hash(`${dir}/set-105.png`),b=await hash(`${dir}/set-105-repeat.png`);
// Exact hashes are recorded; pixel tolerance is checked separately by paper-qa.py.
await writeFile(`${dir}/determinism.json`,JSON.stringify({frame:105,sha256:a,repeatSha256:b,match:a===b},null,2)+'\n');
const material=await selectComposition({serveUrl,id:'PaperMaterial'});
for(const frame of [0,195,240])for(const showResident of [true,false]) {
 await renderStill({serveUrl,composition:{...material,props:{showResident}},frame,inputProps:{showResident},output:`${dir}/occlusion-${frame}-${showResident}.png`,imageFormat:'png'});
}
const exploded=await selectComposition({serveUrl,id:'PaperExploded'});
await renderStill({serveUrl,composition:exploded,output:`${dir}/exploded.png`,imageFormat:'png'});
if(!process.argv.includes('--stills-only')) {
 await renderMedia({serveUrl,composition,codec:'h264',crf:18,concurrency:4,outputLocation:`${dir}/paper-world.mp4`});
 console.log('MP4 done');
}
