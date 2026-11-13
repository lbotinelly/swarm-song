import {Composition,registerRoot} from 'remotion';
import {Song} from '../src/Song';
registerRoot(()=><>
 <Composition id="SwarmSong" component={Song} durationInFrames={7884} fps={30} width={1920} height={1080}/>
 <Composition id="LyricStudy" component={Song} durationInFrames={360} fps={30} width={1920} height={1080} defaultProps={{offsetMs:12500,strategy:'slap',scene:'paper',layoutOverride:''}}/>
</>);
