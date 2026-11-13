# M4 — Rule Zero and reproduction

Actual shots requiring code: shared goodbye/last goggles/blackout/waking, A's four turning leaves, B's five perspective lanes, C's three folding panels. Reused Remotion image/audio components, CSS transforms, the existing master trim workflow, sprite foot anchors, alpha/padding recipe, renderer bundling and hash checks. Plain scene-specific TS functions are cheaper than a camera or book framework. No dependency, renderer, physics, editor or procedural-city platform added.

Source: `src/pages-between.ts` contains integer-millisecond authored cues and direct-seek functions. `src/PagesBetween.tsx` contains the three finite scene treatments. `scripts/pages-stage.tsx` registers 1920×1080,30fps,930-frame compositions. Source timestamps are directing choices against the exact 126–157s master excerpt; see AUDIO_LANDMARKS.md for machine-estimate uncertainty. No global stem alignment is used.

```powershell
ffmpeg -y -i "assets/audio/Swarm Song (The Huggingface Incident) feat. Agent407.wav" -ss 126 -t 31 -c:a pcm_s16le public/milestone4/transition-master.wav
python scripts/prepare-accessories.py --pack milestone4
npm run check
node scripts/pages-render.mjs --stills-only
node scripts/pages-render.mjs --video-only
python scripts/pages-qa.py
```

`--only=A` (or B/C) limits rendering to one treatment. Omit `--stills-only`/`--video-only` to render both. Run the complete still set once before the QA script. FFmpeg/ffprobe and existing Python/Pillow are used for evidence, not new dependencies. Public scenery copies are byte-identical native PNGs; only three cutouts use the existing documented alpha cleanup and100px padding, no resizing.

Frame time is `frame*1000/fps`. A cue becomes visible at the first sampled frame at/after its millisecond time. At30fps,27400ms is frame822 exactly;19300ms is frame579. Arbitrary times remain quantized, not millisecond-refresh promises. The full black interval is frames480–539 inclusive:60frames/two seconds. Black is a literal black composition with audio continuing, no surviving graphic layer.

These are economical 2.5D animatics: illustrated towers retain baked perspective while CSS transforms provide page/fold studies. A's book and B's ground are separate illustrated layers. C's flattening is a visual staging approximation, not a physically unfolding model. The match frame uses the earlier box study as a composition reference; the final opening film has not been produced or locked.

C uses three edge-connected affine matrices after full CSS3D nesting produced plane-sorting artifacts. This is a bounded shot correction, not a new rendering system. One transient Windows file-write failure during draft replacement was resolved by rerunning that treatment; final renders and QA completed.
