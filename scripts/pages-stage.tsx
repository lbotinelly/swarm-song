import {Composition,registerRoot} from 'remotion';
import {PagesBetween,Awakening} from '../src/PagesBetween';
registerRoot(()=><>
 {(['A','B','C'] as const).map(treatment=><Composition key={treatment} id={`Pages${treatment}`} component={PagesBetween} defaultProps={{treatment}} width={1920} height={1080} fps={30} durationInFrames={930}/>)}
 <Composition id="FirstAwakeningMatch" component={Awakening} defaultProps={{ms:31000,first:true}} width={1920} height={1080} fps={30} durationInFrames={1}/>
</>);
