import type {agent407} from './sprites.ts';
export type Pose = keyof typeof agent407;
export type Cue =
  | {atMs: number; action: 'pose'; pose: Pose}
  | {atMs: number; durationMs: number; action: 'emote'; emote: 'question' | 'surprise'}
  | {atMs: number; durationMs: number; action: 'bop'};

// Current phrase cues approved after human playback review: "Timing feels right".
// This approves the performance timing, not exact individual-word boundaries.
// See docs/AUDIO_SYNC.md. No goggles in this scene.
export const registry = {
  durationMs: 8000,
  syncStatus: 'phrase-approved' as const,
  audio: {src:'audio/registry-master-v1.wav',masterStartMs:23000},
  cues: [
    {atMs: 0, action: 'pose', pose: 'standing'},
    {atMs: 1160, durationMs: 1840, action: 'emote', emote: 'question'},
    {atMs: 1750, action: 'pose', pose: 'kneeling'},
    {atMs: 3000, action: 'pose', pose: 'standing'},
    // Rays on crosschecked "and", NOT a claim of precise "writable" onset.
    {atMs: 3240, durationMs: 3000, action: 'emote', emote: 'surprise'},
    {atMs: 4000, durationMs: 2400, action: 'bop'},
  ] satisfies Cue[],
};

// First frame at or after the authored timestamp. Half-open action intervals.
export function frameAt(ms: number, fps: number): number {
  if (!Number.isSafeInteger(ms) || ms < 0 || !Number.isInteger(fps) || fps < 1)
    throw new Error('Expected nonnegative integer milliseconds and positive integer fps');
  return Math.ceil(ms * fps / 1000);
}

export function stateAt(frame: number, fps: number, cues: readonly Cue[] = registry.cues) {
  let pose: Pose = 'standing';
  let rotation = 0, y = 0, scaleY = 1;
  const emotes: {kind: 'question' | 'surprise'; opacity: number}[] = [];
  for (const cue of cues) {
    const start = frameAt(cue.atMs, fps);
    if (frame < start) continue;
    if (cue.action === 'pose') {pose = cue.pose; continue;}
    if (frame >= frameAt(cue.atMs + cue.durationMs, fps)) continue;
    const elapsedMs = (frame - start) * 1000 / fps;
    if (cue.action === 'emote') {
      emotes.push({kind: cue.emote, opacity: Math.floor(elapsedMs / 240) % 2 ? 0.5 : 1});
    } else {
      // Four discrete, authored joyful bops, with neutral transforms at the ends.
      const phase = elapsedMs / cue.durationMs * Math.PI * 8;
      const envelope = Math.sin(Math.PI * elapsedMs / cue.durationMs);
      rotation = Math.sin(phase) * 8 * envelope;
      y = -Math.abs(Math.sin(phase)) * 23 * envelope;
      scaleY = 1 - Math.abs(Math.sin(phase)) * 0.045 * envelope;
    }
  }
  return {pose, rotation, y, scaleY, emotes};
}
