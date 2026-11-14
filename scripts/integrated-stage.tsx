import {Composition,registerRoot} from 'remotion';
import {Storyboard} from '../src/Storyboard';
const Film=()=> <Storyboard integrated/>;
registerRoot(()=> <Composition id="IntegratedFilm" component={Film} durationInFrames={7884} fps={30} width={1920} height={1080}/>);
