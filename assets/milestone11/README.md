# M11 — Once upon a GPU

Focused opening candidate, original master clock. Previous M10 films remain untouched.

Open `review-v1/index.html` for four soundtrack-equipped review versions:

- `opening.mp4`: exact 0–13s, 390 frames, main candidate.
- `continuity-20s.mp4`: 0–20s, 600 frames, shared opening into awakening.
- `city.mp4`: 0–13s camera study without title.
- `title.mp4`: 0–13s isolated title choreography.

All are 1920×1080, 30fps. Director continuous playback approval remains pending.

## Verified delivery

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
