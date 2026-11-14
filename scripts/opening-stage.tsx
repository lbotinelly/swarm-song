import {Composition,registerRoot} from 'remotion';
import {Opening} from '../src/Opening';
registerRoot(()=> <>{(['complete','city','title'] as const).map(mode=><Composition key={mode} id={`Opening-${mode}`} component={Opening} defaultProps={{mode}} durationInFrames={mode==='complete'?600:390} fps={30} width={1920} height={1080}/>)}</>);
