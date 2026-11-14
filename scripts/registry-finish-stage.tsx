import {Composition,registerRoot} from 'remotion';
import {RegistryFinish} from '../src/RegistryFinish';
registerRoot(()=><><Composition id="RegistryFinish" component={RegistryFinish} durationInFrames={240} fps={30} width={1920} height={1080}/><Composition id="VentInheritance" component={RegistryFinish} defaultProps={{inheritance:true}} durationInFrames={240} fps={30} width={1920} height={1080}/></>);
