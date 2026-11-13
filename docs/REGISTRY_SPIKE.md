# Registry discovery — engine review

This is an **8-second, silent timing rehearsal**, using disposable vector test art. It is not the approved Agent407 design or the integrated film milestone. The performance is standing → question mark → kneeling → standing → surprise rays → joyful bop. The question mark deliberately remains attached through the kneeling swap; the rays remain attached through the bop. No goggles appear.

## Rule Zero decision

The actual shot needs two pose images, attached emotes and timestamped action windows. Reuse Remotion's frame clock, React/CSS parent transforms, image loading, Studio, headless Chromium and H.264 export. A plain TypeScript cue array is simpler than a DSL or animation library. The only custom evaluator selects the current pose and evaluates the two emote windows and one bop window from an absolute frame. No simulation, stateful playback, rig, scene graph, plugin system, renderer, editor or service was added. Parallax, lyric-word stickers and audio synchronization belong to later shot requirements.

## Reproduce

Use Node 24+ (tested with Node 26.12.1), npm, and a supported Chromium host. Dependencies are pinned in `package-lock.json`. The first render downloads Remotion's Chrome Headless Shell if it is absent; subsequent renders reuse it. No cloud rendering or paid generation service is involved.

```powershell
npm ci
npm run check
npm run timing
npm run render
npm run review
npm run studio
```

`output/registry/registry.mp4` is 1920×1080, 30 fps, H.264, 240 frames, without audio. `review` writes six full-resolution PNGs and renders frame 170 again to compare SHA-256 hashes. `timing` writes `output/registry/timing.json` for 24, 30 and 60 fps. Generated outputs and installed dependencies are ignored by Git.

Optional six-frame contact sheet (requires FFmpeg):

```powershell
ffmpeg -i output/registry/registry.mp4 -vf "select='eq(n,0)+eq(n,30)+eq(n,75)+eq(n,115)+eq(n,135)+eq(n,170)',scale=640:360,tile=3x2" -frames:v 1 -update 1 output/registry/contact-sheet.png
```

To seek directly without replaying earlier frames:

```powershell
npx remotion still src/index.tsx RegistryDiscovery output/registry/custom-frame.png --frame=170
```

For an arbitrary authored timestamp, use `frameAt(milliseconds, fps)` and pass that frame. At 30 fps, 1807 ms previews at frame 55 (1833.333 ms).

## Direct the shot

- `src/timeline.ts`: readable cue data, integer-millisecond authoring, deterministic evaluation.
- `src/sprites.ts`: image paths and normalized anchors relative to each complete transparent canvas. Add approved sprites under `public/` and update this mapping and measured anchors; leave the scene cues unchanged. Keep original lossless masters separately and untouched.
- `src/Registry.tsx`: shot composition and ordinary transform nesting. The foot pivot stays at the same stage position when poses change. Each emote uses the current pose's head anchor and inherits its parent's translation, rotation and squash.
- `src/index.tsx`: 1920×1080 / 30 fps output composition.

All readable words, the question mark and status labels are runtime text. The surprise rays are a runtime SVG. There are no lyrics or historical quotes in this rehearsal. The paper registry label is a scene prop label, not an archival claim.

## Honest timing

Events become visible on `ceil(ms * fps / 1000)`, the first output frame at or after the authored cue. Start/end windows are half-open. The maximum onset delay is less than one output frame. Motion evaluates elapsed frame time from the visible onset; it does not use wall-clock time or accumulated deltas. Integer output rates 24/30/60 are checked; fractional rates are not supported by this tiny helper.

| Action | Requested ms | 30 fps frame | Visible ms |
|---|---:|---:|---:|
| Standing | 0 | 0 | 0 |
| Question | 703 | 22 | 733.333 |
| Kneeling | 1807 | 55 | 1833.333 |
| Standing | 3601 | 109 | 3633.333 |
| Surprise | 4109 | 124 | 4133.333 |
| Bop | 4703 | 142 | 4733.333 |

These are deliberately off-frame rehearsal cues to exercise quantization. They are **not measured song cues**. The actual master WAV is 262.8 seconds, 48 kHz, stereo PCM; the source lyrics and twelve stems are available. Before a music-synchronized shot, locate the registry phrase against the lead-vocal stem and manually verify it against the master. The `Stems (68BPM)` folder name alone does not establish phrase timing.

## Verification and provenance

`npm run check` type-checks and runs Node's built-in test runner: onset rounding at 24/30/60 fps, pose and emote boundary behavior, emote overlap across pose swaps, direct/reverse seeking, and invalid millisecond inputs. `npm run review` independently renders frame 170 twice and fails if PNG bytes differ. This is a same-machine/toolchain reproducibility check, not a cross-platform font-rasterization guarantee.

The six review frames were visually inspected at standing, questioning, kneeling, anticipation, surprise and bop stages. Confirm the question mark moves with the pose and the rays move with the bop when reviewing the MP4. The temporary SVGs are original, code-authored test fixtures (500×600 vector canvases); they contain no external artwork and are not production sprite masters. Runtime typography uses the local Arial fallback stack, so exact rasterization can vary on another host. Dependency licensing remains with the respective packages; Remotion's license is included in its installed package. This spike adds no license grant for the song, the user's reference, or production art.

Before expanding: review the two character masters separately, approve the minimal engine behavior, measure song cues, then substitute approved images. The film's full choreography and cast remain out of scope.
