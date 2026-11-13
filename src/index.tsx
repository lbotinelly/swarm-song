import {Composition, registerRoot} from 'remotion';
import {Registry} from './Registry';
import {frameAt, registry} from './timeline';
registerRoot(() => <Composition id="RegistryDiscovery" component={Registry} durationInFrames={frameAt(registry.durationMs,30)} fps={30} width={1920} height={1080} />);
