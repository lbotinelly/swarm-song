# Night Shift — proposed wardrobe and paper worlds

Completed November13,2026. **Proposals only; no new canonical design approval is implied.** Ten built-in image-generation outputs, no paid external API calls, no new dependencies, no full film or pose-library expansion. Original approved character/equipment/prop masters remain unchanged.

## Start the review

- [Visual review gallery](review/index.html): wardrobe, video, three worlds, before/after comparisons.
- [Wardrobe sheet](review/wardrobe-v1.png): PhaseOne's tidy teal waistcoat, Protester's warm scarf, Courier's small messenger cap; cream/navy and120px crowd checks.
- [Six-second parallax MP4](review/parallax.mp4):1920×1080,30fps,H.264; silent visual-development test, **not song-synchronized**.
- [Independent critic and revision reports](review/CRITIC.md), [fresh independent final review](review/FRESH_REVIEW.md), [technical QA](review/technical-qa.json).

## Results

Both independent critics passed all three wardrobe designs, the plane/dust/cloud assets, and the three world concepts above8.5 with no blocking visual defect in their stated study scope. Fresh reviewer scores: wardrobes8.74–8.94; support assets8.69–8.89; worlds8.91–9.13. Revised staging8.75/8.86; sampled sky sequence8.93. These scores are opinions against the fixed rubric, not human approval.

**Below target:** optional `review/box-dark.png` lighting diagnostic scored8.23 and8.24. The cool-gray character and broad wall lighting still lack a coherent shared source. It is intentionally excluded from review-ready final art. Earlier skyv1 had an unwanted baked plane/trail and failed despite8.76; v2 fixes it. Before staging/ending frames also failed contact/occlusion checks and remain labeled `*-before.png`.

Critic-driven fixes: corrected portrait clipping; removed baked sky plane/trail; placed courier on the path; strengthened sole-contact shadows; finished airplane flight fully behind cloud. The dark-box grade improved from7.94 but is honestly retained as unresolved. No candidate exceeded three review/revision cycles; no generations were spent merely chasing points.

## Assets and provenance

- `stickers/masters/`: untouched native lossless RGBA wardrobe×3, paper-plane, dust-puff, foreground cloud-bank. Actual dimensions and hashes in `stickers/manifest.json`.
- `worlds/`: box-v1, civilization-v1, token-sky-v1 and targeted editv2. All1672×941 native, approximately16:9. Originals remain intact, and render copies are byte-identical. The1080p study uses modest display enlargement/overscan; these are **not native4K plates**.
- `public/nightshift/stickers/`: existing alpha-cleanup recipe plus100px transparent padding on each side; no source resizing, no extraction from sheets. Production alpha validated on cream/navy. The cloud's source bottom/right edges intentionally extend to canvas; keep them offscreen as scenery.
- `prompts.json`: exact prompts, input paths and generation ledger. Used built-in Codex image generation with highest useful native detail requested; tool exposes no numeric resolution selector. No third-party stock asset used; provenance is not an exclusivity/licensing claim.
- Earlier equipment-only designs in `assets/characters/equipped-v1/` remain available for wardrobe before/after comparison. Standalone envelope, clipboard, sign, satchel, notes and other approved props are reused; no duplicate clothing combinatorics were generated.

## What is proven, and what remains

The six-second sky uses an opaque distant plate, an independent airplane, and one coherent transparent foreground cloud bank. Ordinary CSS transforms create differential motion; actual cloud alpha hides the plane. The authored flight times are350–5350ms inside a6000ms study, evaluated at each output frame. At30fps350ms first changes visibly at frame11/366.67ms;5350ms settles at frame161/5366.67ms. This follows honest frame sampling, not millisecond-perfect display.

Stills show the village with singer and two background scales, a lit box with ungoggled Agent407, and dust at about60px on warm ground. No goggles were introduced. No readable labels were baked into art. No song timing, lyric wording, additional story beats or costumes are locked by this study.

The critics inspected actual native/derivative images, intended-size sheets and representative1080p frames. **Neither played the MP4.** Frame progression, finite transforms, actual alpha occlusion, clean ending and deterministic seeking were checked; human playback review of motion/pacing is still needed. No claim of final film approval.

## Reproduce

Requires existing Node/npm, Python/Pillow and ffprobe. No added dependencies.

```powershell
npm ci
python scripts/prepare-accessories.py --pack nightshift
npx remotion still scripts/nightshift-review.tsx NightWardrobe assets/nightshift/review/wardrobe-v1.png
npx remotion still scripts/nightshift-review.tsx NightEffects assets/nightshift/review/effects.png
node scripts/nightshift-render.mjs
npm run check
python scripts/nightshift-qa.py
```

`node scripts/nightshift-render.mjs --stills-only` reproduces the selected frames/staging without encoding video. Re-rendering frame90 after179 produces the same SHA256. The six existing tests and two new concrete parallax tests pass, including24/30/60fps seek equivalence and background overscan. All six new derivatives were regenerated byte-identically. Six approved baseline master hashes verified unchanged; previous equipment/accessory assets have no diff.

Rule Zero: reused Remotion/React image rendering, registry bundle/renderStill/hash verification, existing alpha/padding preparation, approved bodies and existing props. Added only two static review entry points, one short shot component/pure time function, a render script adapted from the registry, and an asset-integrity check. No animation framework, wardrobe system, physics, editor or dependency stack.

Next: human choice of these wardrobe/world directions and playback review; then a tightly scoped chorus performance using approved poses, timed master audio and restrained background action. Resolve dark-scene lighting separately before the matched awakening/goodbye sequence.
