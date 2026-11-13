// Normalized anchors refer to the complete transparent image canvas.
// Swap image paths and measured anchors here; the scene's cue script stays intact.
export const testSprites = {
  standing: {src: 'test-assets/standing.svg', foot: [0.5, 0.94], head: [0.79, 0.23]},
  kneeling: {src: 'test-assets/kneeling.svg', foot: [0.5, 0.94], head: [0.85, 0.43]},
} as const;
