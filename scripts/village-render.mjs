import {bundle} from '@remotion/bundler';
import {selectComposition,renderStill,renderMedia} from '@remotion/renderer';
import {mkdir} from 'node:fs/promises';
const dir='assets/milestone5-2/review';await mkdir(dir,{recursive:true});
const serveUrl=await bundle({entryPoint:'scripts/village-stage.tsx'});
const composition=await selectComposition({serveUrl,id:'Village'});
for(const frame of [0,30,60,90,120,150,180,210,240,270,300,330,354,390,419]) {
 await renderStill({serveUrl,composition,frame,output:`${dir}/village-${frame}.png`,imageFormat:'png'});
 console.log(`Still ${frame}`);
}
await renderStill({serveUrl,composition,frame:354,output:`${dir}/village-354-repeat.png`,imageFormat:'png'});
for(const props of [{hideCloud:true},{hideSun:true},{hideSmoke:true}]) {
 const name=Object.keys(props)[0];
 await renderStill({serveUrl,composition:{...composition,props},inputProps:props,frame:390,output:`${dir}/probe-${name}.png`,imageFormat:'png'});
}
if(!process.argv.includes('--stills-only')) {
 await renderMedia({serveUrl,composition,codec:'h264',crf:18,concurrency:4,outputLocation:`${dir}/village.mp4`});
 console.log('MP4 done');
}
