# Registry discovery — engine review

Milestone 2 replaces the temporary body illustrations with the **approved Agent407 standing-v1 and kneeling-v2 artwork**, using separate cleaned/padded derivatives. The performance is standing → question mark → kneeling → standing → surprise rays → joyful bop. The question mark deliberately remains attached through the kneeling swap; the rays remain attached through the bop. No goggles appear. The actual master excerpt (23–31 seconds) accompanies **user-approved phrase timing**, not sample-accurate individual-word synchronization. See [audio evidence](AUDIO_SYNC.md).

## Rule Zero decision

The actual shot needs two pose images, attached emotes, timestamped action windows and the song excerpt. Reuse Remotion's frame clock, React/CSS parent transforms, image loading, native `Html5Audio`, Studio, headless Chromium and H.264 export. A plain TypeScript cue array is simpler than a DSL or animation library. The only custom evaluator selects the current pose and evaluates the two emote windows and one bop window from an absolute frame. No simulation, stateful playback, rig, scene graph, plugin system, renderer, editor or service was added. Parallax and lyric-word stickers belong to later shot requirements.

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

`output/registry-v2/registry.mp4` is 1920×1080, 30 fps, H.264, 240 frames, with the actual song excerpt. `review` writes six full-resolution PNGs and renders frame 170 again to compare SHA-256 hashes. `timing` writes `output/registry-v2/timing.json` for 24, 30 and 60 fps. The prior `output/registry/` rehearsal is preserved. Generated outputs and installed dependencies are ignored by Git.

Optional six-frame contact sheet (requires FFmpeg):

```powershell
ffmpeg -i output/registry-v2/registry.mp4 -vf "select='eq(n,0)+eq(n,40)+eq(n,65)+eq(n,92)+eq(n,104)+eq(n,170)',scale=640:360,tile=3x2" -frames:v 1 -update 1 output/registry-v2/contact-sheet.png
```

To seek directly without replaying earlier frames:

```powershell
npx remotion still src/index.tsx RegistryDiscovery output/registry-v2/custom-frame.png --frame=170
```

For an arbitrary authored timestamp, use `frameAt(milliseconds, fps)` and pass that frame. At 30 fps, 1750 ms previews at frame 53 (1766.667 ms).

## Direct the shot

- `src/timeline.ts`: readable cue data, integer-millisecond authoring, deterministic evaluation.
- `src/sprites.ts`: image paths and pixel anchors for all six approved poses. Anchors are measured on native masters, then translated by production padding; they are relative to the complete 1400×1500 transparent canvas. `head` is the forehead mount; `mouth`, `leftHand`, `rightHand` and `footPivot` support ordinary attachments. Hand names mean screen-left/right in the original drawing. `attachmentPoint` subtracts the current foot pivot and applies the same uniform display scale as the body. Production metadata is in `assets/characters/agent407/production-v1.json`; masters remain untouched.
- `src/Registry.tsx`: shot composition and ordinary transform nesting. The foot pivot stays at the same stage position when poses change. Each emote uses the current pose's head anchor and inherits its parent's translation, rotation and squash.
- `src/index.tsx`: 1920×1080 / 30 fps output composition.

All readable words and status labels are runtime text. The question mark is editable SVG text, rasterized by the browser at render time from `public/accessories/question-mark-v1.svg`; it is not generatively baked lettering. The surprise rays are a separate transparent sprite under `public/accessories/`, under accessory art review. There are no lyrics or historical quotes in this rehearsal. The paper registry label is a scene prop label, not an archival claim.

## Honest timing

Events become visible on `ceil(ms * fps / 1000)`, the first output frame at or after the authored cue. Start/end windows are half-open. The maximum onset delay is less than one output frame. Motion evaluates elapsed frame time from the visible onset; it does not use wall-clock time or accumulated deltas. Integer output rates 24/30/60 are checked; fractional rates are not supported by this tiny helper.

| Action | Requested ms | 30 fps frame | Visible ms |
|---|---:|---:|---:|
| Standing | 0 | 0 | 0 |
| Question | 1160 | 35 | 1166.667 |
| Kneeling | 1750 | 53 | 1766.667 |
| Standing | 3000 | 90 | 3000 |
| Surprise | 3240 | 98 | 3266.667 |
| Bop | 4000 | 120 | 4000 |

The timeline records `syncStatus: 'phrase-approved'`. Question timing uses machine-crosschecked “Found” around master 24.14–24.16 s; surprise rays use “and” at 26.24 s, **not a claim of precise “writable” onset**. Word estimates for “writable” disagree (26.80–27.26 s). The user approved the current phrase timing after watching/listening to the actual-song preview on November 13, 2026; that approval does not resolve an isolated word boundary. Kneeling, the anticipation stand and the bop are directing choices between those phrase anchors. The actual master WAV is 262.8 seconds, 48 kHz, stereo PCM; stem alignment evidence and uncertainty are recorded separately in `AUDIO_SYNC.md`. The `Stems (68BPM)` folder name alone does not establish phrase timing. Bop begins from its neutral transform on its scheduled start frame; visible displacement appears on subsequent frames.

## Verification and provenance

`npm run check` type-checks and runs Node's built-in test runner: onset rounding at 24/30/60 fps, pose and emote boundary behavior, emote overlap across pose swaps, direct/reverse seeking, invalid millisecond inputs, in-canvas anchors, shared pixel density, and foot-relative attachment positioning across pose changes. `npm run review` independently renders frame 170 twice and fails if PNG bytes differ. This is a same-machine/toolchain reproducibility check, not a cross-platform font-rasterization guarantee.

Inspect the six review frames at standing, questioning, kneeling, anticipation, surprise and bop stages. Confirm the question mark moves with the pose and the rays move with the bop when reviewing the MP4. Body image width and height are both scaled by 0.54, without stretching or normalizing each pose to its bounding box. Runtime typography uses local Georgia/Arial fallback stacks, so exact rasterization can vary on another host. Dependency licensing remains with the respective packages; Remotion's license is included in its installed package. This spike adds no license grant for the song, the user's reference, or production art.

Before expanding: review the detachable accessory pack and the production integration. The film's full choreography and supporting cast remain out of scope.
