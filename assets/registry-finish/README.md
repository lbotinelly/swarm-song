# Registry discovery — finishing candidate

## Current V3 — notice, approach, grip, pull

[Current film and gallery](review-v3/index.html) · [critic review](REVIEW-V3.md) · [QA](qa-report-v3.json). Leo's next direction adds an already-lifted tiny corner as a clue, followed by approach, grab and moving away while pulling it.

Local shot timing: hint from0ms; approach350–1750ms; kneeling grip hold1750–2050ms; retreat/pull2050–2900ms; release on the approved standing swap at3000ms. The tip tracks the approved kneeling right-hand anchor (foot-relative77.4,-25.8 at0.43scale) throughout the pull. The flap curves as the character retreats, keeping an actual sheet connection. All existing lyric/reaction onset data is unchanged. New blocking is proposed for playback review.

The render and QA commands below now produce `review-v3` and `qa-report-v3.json`. V2 remains preserved; reproduce that version from commit `de5e5d2`. No new images, dependencies or character edits.

## V2 — corner, vent and inherited goggles

Leo corrected the prop interpretation: [the registry is the vent](../../docs/REGISTRY_VENT_CONTINUITY.md). [Current review gallery](review-v2/index.html) · [eight-second peel/message film](review-v2/registry-context.mp4) · [inheritance continuity still](review-v2/inheritance.png) · [V2 critic review](REVIEW-V2.md) · [V2 QA](qa-report-v2.json).

The bottom-right corner of the apartment's own paper peels back, revealing a dark grille. The existing paper-plane sticker travels behind foreground bars into the vent; its exit is spatial occlusion, not transparency or a shrink-to-nothing. The inherited goggles are present before the paper opens and become visible through the same grille. No REGISTRY label, ledger pocket or separate rug remains in this candidate. All communication uses this route in the updated storyboard direction.

The silent inheritance still is an untimed mechanism study, not a finished second-apartment scene. The full M8 render has not been replaced; its storyboard/gallery explicitly flag the newer continuity correction. The exact corner size, folded-paper treatment and plane path are proposed staging for Leo to review.

The reproduction commands below now write `review-v2` and `qa-report-v2.json`. The eight-second version shows the plane; the shorter discovery-only cut ends before the sending beat. Both preserve the original master and M7 timing. New QA checks that the goggles are invisible behind closed paper and visible after peeling.

## Superseded V1 production record

The following records the previous pocket interpretation. Its artwork treatment was reviewed, but Leo's vent correction supersedes the prop/story staging. Original outputs remain under `review/` and can be reproduced from commit `e5130f0`.

Leo requested one well-defined final-quality attempt and an art-critic evaluation. The registry is the smallest complete emotional beat with approved character art and cue timing. This package is a **final-quality candidate for director review**, not an approval or a replacement for the full M8 animatic.

- [Primary film](review/registry-finish.mp4): master **23.000–27.8667s**, 146 frames, 1920×1080, 30fps. Curiosity → inspection → realization → one restrained joyful gesture, settled before the cut.
- [Context extension](review/registry-context.mp4): master 23–31s, 240 frames. Includes the next note beat; ends during the approved incoming caption transition and is not the clean standalone edit.
- [Performance sheet](review/performance.jpg), [boundary sheet](review/boundaries.jpg), [critic report](REVIEW.md), [technical QA](qa-report.json).

## Direction and reuse

An intimate flat-paper apartment replaces the rough diagram. Existing M5 kraft stock, quilt, lamp, curtain and rail establish the same home seen in the approved collage. Crooked books, meaningful tape joins and shallow shadows remain hand-placed. The registry is a layered paper pocket with an opaque cover; the kneeling paw meets its edge. No perspective room, new body, wearable, or generative asset was required. Agent407 remains ungoggled.

Reuse: Remotion, React, `PaperApartment.Piece`, exported existing `PaperCollage.Card`, `sprites` anchors, `timeline.stateAt`, locally bundled fonts and the unchanged M7 `Song` caption renderer. The shot is one ordinary component, not another animation system. No new dependencies, paid services or image generations.

The question/kneel/stand/rays/bop **onsets** stay at the approved registry values. This finishing treatment changes the motion amplitude and smooths emote opacity. The original four-bop test is reduced to a small gesture beginning at master27s and settling by27.8s for the primary edit. These new performance refinements await Leo's playback approval. The source timeline and M7 maps are unchanged.

All writing remains runtime text. `REGISTRY` describes a prop; `hello?` in the context extension is a dramatization of the lyric, not a fabricated historical quotation. The note does not imply another agent is physically present.

## Reproduce

From the repository root, with existing Node dependencies and local FFmpeg/Python Pillow/NumPy:

```powershell
npm ci
npm run check
node scripts/registry-finish-render.mjs --stills --video
python scripts/registry-finish-qa.py
```

The stage is `scripts/registry-finish-stage.tsx`; shot source is `src/RegistryFinish.tsx`. Rendered PNGs are full-resolution lossless review frames. MP4 uses H.264 CRF16, limited-range yuv420p, AAC320k stereo48k. Original master audio is unwarped. The primary edit is146/30seconds; integer-millisecond authoring does not imply subframe visibility.

Git retains three representative lossless source frames, one compressed-film proof, the two contact sheets and both films. Additional per-frame diagnostics remain local and are regenerated by the commands above, avoiding dozens of redundant full-resolution images in repository history.

## Asset provenance and licensing

No source artwork was edited. Approved character derivatives come from `public/characters/agent407/` and their measured anchors; original master/provenance records remain in `assets/characters/agent407/`. Existing question/rays assets come from `assets/accessories/pack-v1/`. Paper sources and transparent derivatives are recorded with hashes in `assets/milestone5/manifest.json`; those original generated masters remain unchanged. The paper stock is intentionally reused as cut shapes at different scales, not claimed as newly generated art.

Finger Paint and Bitcount Single are bundled with the existing SIL OFL notices under `public/fonts/`. Music is the existing project master, with the already verified PCM excerpt `public/audio/registry-master-v1.wav`. This package introduces no new licensing claims.

## Quality checks and limits

Existing34tests cover protected inputs, anchors, cue quantization and caption layout. Shot QA adds repeated-frame pixel equality, source/paper hash checks, 146/240-frame output checks, original-master audio correlations without lag correction, and compressed-video frame extraction. The boundary sheet inspects before/after question, kneel, stand and surprise onsets. Critic scope and findings are documented separately. Automated QA and still review do not constitute continuous listening/playback approval.
