import {Composition,registerRoot} from 'remotion';
import {ImaginedVillage} from '../src/ImaginedVillage';
registerRoot(()=><>
 <Composition id="Village" component={ImaginedVillage} width={1920} height={1080} fps={30} durationInFrames={420}/>
 <Composition id="VillageHero" component={ImaginedVillage} defaultProps={{hero:true}} width={1920} height={1080} fps={30} durationInFrames={1}/>
</>);
