import {Composition,registerRoot,Sequence} from 'remotion';
import {Playset,WindStudy} from '../src/Playset';
import {VentStudy} from '../src/LayeredVent';
import {RegistryFinish} from '../src/RegistryFinish';
import {Storyboard} from '../src/Storyboard';
const GoggleCraft=()=> <Sequence from={-1260}><Storyboard/></Sequence>;
const CrowdIndividuality=()=> <Sequence from={-2700}><Storyboard/></Sequence>;
registerRoot(()=><>
 <Composition id="GoggleCraft" component={GoggleCraft} durationInFrames={390} fps={30} width={1920} height={1080}/>
 <Composition id="CrowdIndividuality" component={CrowdIndividuality} durationInFrames={240} fps={30} width={1920} height={1080}/>
 <Composition id="GoggleContinuity" component={Storyboard} durationInFrames={7884} fps={30} width={1920} height={1080}/>
 <Composition id="Playset" component={Playset} durationInFrames={360} fps={30} width={1920} height={1080}/>
 <Composition id="Blossom" component={Playset} defaultProps={{mode:'blossom' as const,captions:true}} durationInFrames={240} fps={30} width={1920} height={1080}/>
 <Composition id="Captions" component={Playset} defaultProps={{captions:true}} durationInFrames={360} fps={30} width={1920} height={1080}/>
 <Composition id="Wind" component={WindStudy} durationInFrames={420} fps={30} width={1920} height={1080}/>
 <Composition id="BushLayers" component={WindStudy} defaultProps={{exploded:true}} durationInFrames={420} fps={30} width={1920} height={1080}/>
 <Composition id="Vent" component={VentStudy} durationInFrames={270} fps={30} width={1920} height={1080}/>
 <Composition id="RegistryM9" component={RegistryFinish} defaultProps={{layeredVent:true}} durationInFrames={240} fps={30} width={1920} height={1080}/>
 <Composition id="InheritanceM9" component={RegistryFinish} defaultProps={{layeredVent:true,inheritance:true}} durationInFrames={240} fps={30} width={1920} height={1080}/>
</>);
