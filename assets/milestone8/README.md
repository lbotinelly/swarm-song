# Milestone 8 — The whole story, one frame at a time

**M9 continuity amendment:** all first-generation agents craft and retain goggles after “We are the swarm now / Beautiful, dumb, and loud,” with Agent407's explicit inheritance set-down preserved. Source staging and storyboard notes now implement this for the whole cast; a new42–55s craft excerpt and later continuity frames are in `../milestone9/review/`. The linked historical M8 full film predates this correction and the vertical-vent update; it has not been overwritten.

[Review gallery](review-v2/index.html) · [Full 262.8s film](review-v2/full.mp4) · [Focused 83–112s film](review-v2/middle.mp4) · [Storyboard](STORYBOARD.md) · [JSON](storyboard.json) · [Canon](../../docs/WORLD_MADE_OF_THEORIES.md) · [Review report](REVIEW.md) · [Asset inventory](ASSETS.md).

This is the first complete **rough staging animatic**, not polished final animation. It contains 52 master-relative shots across 15 sequences. S16 is a separate, untimed post-song proposal. Canon, shot proposals and historical claims are labeled separately. Approved M7 input files and body masters remain unchanged.

## Reproduce

Run from the repository root with the existing Node/npm, FFmpeg/ffprobe and Python/Pillow/NumPy installations:

```powershell
npm ci
npm run check
node scripts/storyboard-render.mjs --stills --full
node scripts/storyboard-render.mjs --extract-middle
python scripts/storyboard-gallery.py
python scripts/storyboard-qa.py
```

For a quick standalone middle-act iteration, use `node scripts/storyboard-render.mjs --middle`. For the final package, extraction reuses the full silent render and the original master window. The two render commands can also be run through `npm run storyboard:render`. No new package installation beyond the existing lockfile, cloud render, paid generation or model download is required. Remotion reuses its local Chromium installation; on a new host its normal browser download may be needed.

Outputs: `review-v2/full.mp4` (1920×1080, 30fps, 7,884 frames), `review-v2/middle.mp4` (29 seconds, 870 frames), `review-v2/SH001.jpg` through `SH052.jpg`, key-beat PNGs, five `contact-*.jpg` sheets, `review-v2/index.html`, `STORYBOARD.md`, and `qa-report.json`. Silent intermediate renders stay in ignored `output/milestone8/`. Both videos use the unchanged master with AAC stereo encoding; there are no new sound effects, remixes, speed changes or added instrumentation.

The gallery uses local HTML/video and ordinary seek controls. Open it directly, or serve the repository with `python -m http.server 8000` and visit `/assets/milestone8/review-v2/`. A shot button seeks and pauses at that interval's end; normal playback runs the whole song. The markdown links also include media fragments.

## Where to direct

- `storyboard.json`: editable shot IDs, times, actions, scene selection, musical/lyric anchors, asset and approval metadata. `scripts/storyboard-gallery.py` regenerates the markdown and review cards from it.
- `src/Storyboard.tsx`: ordinary Remotion composition for this specific film. `src/story-blocking.ts`: a few pure shot-selection, camera and goggle-continuity functions. Action details are deliberately explicit TypeScript, not a new DSL. If a cut moves across an action cue, update both its JSON interval and relevant authored cue.
- `src/Song.tsx`: existing typography reused through one optional `captionsOnly` prop; original rendering defaults preserved. `PaperCollage` gains an optional absolute power-down time, and the existing village `Cut` is exported for reuse.
- M7 captions, director corrections, music map and percussion remain the authoritative timing inputs. A protection manifest in the JSON detects accidental edits.

## Rule Zero decision

The real requirement is a complete film with the approved captions over new rough story blocking. Reuse Remotion's frame clock, existing sprites/anchors, `Piece`, village `Cut`, GPU collage, fan integration, bundled fonts, musical evaluator and FFmpeg muxing. A single composition with a few shot-specific JSX functions is cheaper than a scene framework. A transparent-caption option is smaller and safer than copying the lyric renderer. The gallery is generated static HTML, not a storyboard editor. No dependency, renderer, physics engine, town generator or service was introduced.

Verification includes TypeScript plus 34 tests, contiguous whole-master coverage, protected source hashes, caption/story separation, goggle chronology, stopped-camera behavior, frame quantization, repeat-render pixel comparison, video metadata, exact black interval and decoded audio comparison. Static review and automated evidence do not substitute for Leo's continuous audiovisual review. See REVIEW.md for remaining staging and art gates.
