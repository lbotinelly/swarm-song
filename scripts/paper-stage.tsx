import {Composition,registerRoot} from 'remotion';
import {MaterialTest,PaperSet} from '../src/PaperApartment';
import {PaperCollage} from '../src/PaperCollage';
registerRoot(()=><>
 <Composition id="PaperCollage" component={PaperCollage} width={1920} height={1080} fps={30} durationInFrames={240}/>
 <Composition id="PaperMaterial" component={MaterialTest} width={1920} height={1080} fps={30} durationInFrames={270}/>
 <Composition id="PaperSet" component={PaperSet} width={1920} height={1080} fps={30} durationInFrames={360}/>
 <Composition id="PaperExploded" component={PaperSet} defaultProps={{still:true,exploded:true}} width={1920} height={1080} fps={30} durationInFrames={1}/>
</>);
