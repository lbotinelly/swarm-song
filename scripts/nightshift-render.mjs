// Reuse the registry's bundle/renderStill workflow for this bounded art study.
import {bundle} from '@remotion/bundler';
import {selectComposition,renderStill,renderMedia} from '@remotion/renderer';
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const dir='assets/nightshift/review';
const serveUrl=await bundle({entryPoint:'scripts/nightshift-stage.tsx'});
const composition=await selectComposition({serveUrl,id:'NightSky'});
for(const frame of [0,45,90,125,150,179]) {
 await renderStill({serveUrl,composition,frame,output:`${dir}/sky-${frame}.png`,imageFormat:'png'});
 console.log('Sky frame',frame);
}
await renderStill({serveUrl,composition,frame:90,output:`${dir}/sky-90-repeat.png`,imageFormat:'png'});
const hash=async path=>createHash('sha256').update(await readFile(path)).digest('hex');
const first=await hash(`${dir}/sky-90.png`),repeat=await hash(`${dir}/sky-90-repeat.png`);
if(first!==repeat) throw Error('Random seek render differs');
await writeFile(`${dir}/determinism.json`,JSON.stringify({frame:90,first,repeat,match:true,order:[0,45,90,125,150,179,90]},null,2)+'\n');
for(const [id,file] of [['CivilizationStudy','civilization-staging'],['DustWarmStudy','dust-warm-staging'],['BoxStudy','box-staging'],['BoxDarkStudy','box-dark']]) {
 const study=await selectComposition({serveUrl,id});
 await renderStill({serveUrl,composition:study,output:`${dir}/${file}.png`,imageFormat:'png'});
 console.log(id);
}
if(!process.argv.includes('--stills-only')) await renderMedia({serveUrl,composition,codec:'h264',crf:16,outputLocation:`${dir}/parallax.mp4`});
