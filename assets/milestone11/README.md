# M11 — Once upon a GPU

Focused opening candidate, original master clock. Previous M10 films remain untouched.

**Performance pass:** `morning-routines/README.md` adds purposeful routines to all eight apartments while preserving the approved elevated camera. New acting/caption placement remains a candidate; `canyon-approach/review/` is the director-approved visual baseline.

**Latest:** density reference A was selected for a forward approach toward the central apartment, then refined to mid-building altitude with no ground visible. See `canyon-approach/README.md` and its separately rendered 20s review video. The earlier C proof is preserved.

**Current candidate:** Leo selected C and authorized the full-screen street-canyon / sliding-shroud proof. See `canyon-proof/README.md` and `canyon-proof/review/canyon-opening-20s.mp4`. The V2 city below was rejected as underwhelming; its score is historical, not approval.

Open `review-v2/index.html` for four soundtrack-equipped review versions. V1 remains intact under `review-v1/` (source at commit `017cef2`).

- `opening.mp4`: exact 0–13s, 390 frames, main candidate.
- `continuity-20s.mp4`: 0–20s, 600 frames, shared opening into awakening.
- `city.mp4`: 0–13s camera study without title.
- `title.mp4`: 0–13s isolated title choreography.

All are 1920×1080, 30fps. Director continuous playback approval remains pending.

## V2 refinement

Supporting buildings now mix broad twin-fan low-rises, narrow single-fan towers and the original slabs. Different depths and side construction keep the district varied while preserving the destination building and exact camera/title timing. No new artwork or dependency.

Agent407 now briefly kneels on waking before stepping down, then makes a restrained curious lean while taking in the room. The 13-second joining frame is unchanged. Independent craft review reaches 8.5/10 on stills; the new waking motion remains pending director playback. See `REVIEW-V2.md`.

## Verified delivery

V2 verification is in `qa-report-v2.json`: all four exports pass 1080p/30fps and exact 390/600-frame checks; 45 opening frames decode to pure black RGB; audio correlation exceeds 0.99997 without shifting; the 7s repeated seek is byte-identical; all 45 protected inputs, including the four V1 movies, are unchanged. All 44 existing tests pass. The 13s room/camera geometry remains unchanged; cross-version still comparison has 0.01866/255 RMSE from tiny raster differences, not byte identity. The adjacent V2 frames across 13s average 0.00731/255 channel difference.

`npm run check`: TypeScript and all 44 existing tests pass. `qa-report.json` records all four decoded exports, exact 390/600 frame counts, original-master audio correlation above 0.99997 without lag correction, 45 pure-black RGB frames, byte-identical repeated direct seek at 7s, clean alpha bounds, untouched native masters and 41 protected input hashes. The 13s boundary's mean channel change is 0.00761/255, from continuing breath/light rather than a camera cut.

An initial grayscale-only black test reported 2/255 edge values. Full decoded RGB was pure zero; the check now converts to display RGB before reducing, avoiding YUV/gray scaler rounding. All four exports pass exact zero RGB for the opening 45 frames.

## Reproduction

```powershell
python scripts/prepare-accessories.py --pack milestone11
npm run check
node scripts/opening-render.mjs --stills --video --repeat
python scripts/opening-qa.py
```

`src/Opening.tsx` contains the authored shot; `scripts/opening-stage.tsx` registers the three study compositions. `opening-render.mjs` bundles locally, renders silent picture, then muxes the unchanged original master from sample zero. No added sound effect, retiming, dependency or full-film render.

Current commands write V2 outputs and `qa-report-v2.json`; the V1 report and exports are preserved. `preserved-inputs-v2.json` additionally protects all four V1 videos.

## Assets and provenance

Built-in Codex image_gen, reference-guided; native outputs preserved in `masters/`:

- `sleeping-v1.png`: approved standing bunny is anatomical/material authority; no goggles or other props.
- `cushion-v2.png`: consumed flat watercolor sticker, regenerated after Leo rejected v1's realistic upholstery. Brown outline, white cut border and simple flower marks match the bunny.
- `cushion-v1.png`: rejected study retained only for provenance, never consumed by the shot.

Exact prompts: `prompts.json`, `cushion-revision-prompt.json`. Existing approved quilt supplied the initial material reference; approved bunny supplied final sticker language. Generated project assets are not third-party stock; no additional stock license was introduced. Existing project asset provenance continues to apply.

`manifest.json` records native/production SHA256, dimensions, alpha bounds and the existing preparation recipe: alpha cleanup plus 100px padding, no resampling; untouched native masters remain authoritative. Production copies live in `public/milestone11/`.

## Editorial scope

See `../../docs/OPENING_A_ROLL.md` and `REVIEW.md`. The primary movie title remains **Swarm Song**. The subtitle correction playfully links distinct incidents; it does not claim one historical event or rename the project. **The Swarm Party** is the final imaginative subtitle.

No M7 lyric/cue edits. No M8 shot-boundary changes. No changes to the later registry sequence. Candidate delivery is deliberately separate from the preserved full film.
