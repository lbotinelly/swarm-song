# Milestone 10 - The little world comes alive

[Full-film integrated V2 and review gallery](review-v2/index.html) · [52-shot ledger](INTEGRATION.md) · [Ensemble intentions](ENSEMBLE.md) · [Independent findings](REVIEW.md) · [Technical QA](qa-report.json) · [Director brief](BRIEF.md).

The new cut is262.8 seconds,1920x1080, 30fps: 7,884 frames on the unchanged song master. It integrates source compositions, not encoded proof movies. All 52 M8 shot IDs and intervals remain; the V3 approach begins at23s inside SH004 and continues across discovery/reaction/first-message cuts.

## Delivered review experiences

- [Full continuous cut](review-v2/full.mp4), the primary artifact.
- [Middle act](review-v2/middle.mp4), master83-112s.
- Separately labeled goggles excerpts: [invention42-55s](review-v2/goggles-invention.mp4), [goodbye/set-down/blackout120.2-153s](review-v2/goodbye-blackout.mp4), [awakening and inheritance153-208s](review-v2/awakening-inheritance.mp4), [imagined reunion208-240s](review-v2/reunion.mp4). These excerpts retain their original content/audio; they are not presented as consecutive events.
-52 key-shot images, five whole-film contact sheets, key-beat PNGs, decoded-film samples and navigable playback links.

## Integrated direction

The physical room reuses RegistryFinish's paper construction and V3 approach/grip/pull. Messages cross the vertical LayeredVent at constant sprite scale. A differently arranged receiving room reads and replies. The second awakening uses that room arrangement and different lining; the inherited goggles already exist behind the paper when it is peeled. Pickup and wearing remain separate actions, ending at 197.6s. The patch persists, and the last illuminated goggles retain bar occlusion and their resting location through the camera move.142-144s is true black.

The early village retains simple buildings and sparse sky, with M9 errands and chores. Questioning/answering agents precede the cumulative83-90s premium transformation. Large cover circles release faster in this film-specific version; small circles retain independent speed, drag, lifetime and wind response. The liked M9 proof remains unchanged. Premium scenery persists behind the sympathetic objector, illustrated shrug and raid. The flag-holder receives an authored look/flag/look sequence and closer composition. The final playhouse brings back meaningful roles rather than relighting the physical GPU apartments.

M7 V6 music/caption inputs remain byte-identical. The film uses one master-clock caption layer with the existing lower-center typography, uniformly scaled to92% around the bottom edge to clear the upper action region. No debug shot/cue labels appear in the film. The ledger's blue name remains equal in scale to its named neighbors, with credits on the left.

## Honest limits

This is an integrated review cut, not a claim of final-quality completion. Boss costume, swords, wizard hat and flag are still inexpensive provisional modular props. The flop uses the existing cheer sprite turned sideways rather than a newly generated belly-up pose. Some scenes retain a mounted-panel edge and economical pose swaps. No new illustrative batch, model download or dependency was introduced. All new shot motion awaits Leo's continuous playback judgment; independent source/still scores are kept separate from audiovisual approval.

Names and message fragments are artistic story roles and dramatizations. This is not an archival roster or a factual claim of succession between incidents. No new attributed historical quotation or fabricated list of 3,700 names was added. Source boundaries remain in `docs/HISTORICAL_EASTER_EGGS.md` and the shot ledger. S16, AND YOU, QR and post-song audio remain excluded.

## Reproduce

```powershell
npm run check
node scripts/integrated-render.mjs --stills --full
node scripts/integrated-render.mjs --extract-middle
python scripts/integrated-gallery.py
python scripts/integrated-qa.py
```

`--middle` renders just the middle for iteration; final delivery extracts the exact interval from the complete final render and muxes the original master window. `--beats` refreshes key PNGs; `--select=SH001,SH002` bounds a still refresh while `--full` always renders the entire film. Outputs are versioned under `assets/milestone10/review-v2/`; intermediates stay in ignored `output/milestone10/`.

Rule Zero: actual52-shot integration uses Storyboard, Playset, RegistryFinish, LayeredVent, existing body/prop anchors, Song, Remotion and FFmpeg. Optional shot-specific props keep prior proof defaults. No behavior engine, new renderer or cinematic DSL. `preserved-inputs.json` protects prior videos, M7 timing/audio and M9 native masters; existing tests protect the approved bodies. Validation scope and measured results are in QA/review reports.
