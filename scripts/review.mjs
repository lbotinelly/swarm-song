import {bundle} from '@remotion/bundler';
import {selectComposition,renderStill} from '@remotion/renderer';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const dir = 'output/registry';
await mkdir(dir,{recursive:true});
const serveUrl = await bundle({entryPoint:'src/index.tsx'});
const composition = await selectComposition({serveUrl,id:'RegistryDiscovery'});
for (const frame of [0,30,75,115,135,170]) {
  await renderStill({serveUrl,composition,frame,output:`${dir}/frame-${frame}.png`,imageFormat:'png'});
  console.log(`Rendered frame ${frame}`);
}
await renderStill({serveUrl,composition,frame:170,output:`${dir}/frame-170-repeat.png`,imageFormat:'png'});
const hash = async path=>createHash('sha256').update(await readFile(path)).digest('hex');
const first = await hash(`${dir}/frame-170.png`), repeat = await hash(`${dir}/frame-170-repeat.png`);
if(first!==repeat) throw new Error('Repeated frame pixels differ');
await writeFile(`${dir}/determinism.json`,JSON.stringify({frame:170,sha256:first,repeatedSha256:repeat,match:true},null,2)+'\n');
console.log('Repeated frame 170 is byte-identical:',first);
