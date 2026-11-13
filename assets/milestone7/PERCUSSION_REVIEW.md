# V5 — percussion and missing moments

[Play with the combined map](review-v5/index.html). The complete master, approved lyrics, and all existing musical cue values are preserved. V4 playback feedback is recorded in `music-playback-feedback.json`; its cue map remains unchanged.

## What changed

Five additional locally checked candidate crests fill selected gaps: early string lift at32.085s, keyboard at98.268s, percussion detail at119.726s, keyboard at175.712s and196.681s. These are proposals for listening, not a claim that every missing moment has been identified. They live in `musical-cue-additions.json`; the original22 cues are untouched, including the four held matches.

`percussion-cues.json` adds283 selected accents. The existing drum/percussion stems nominate transients using10ms RMS,30ms smoothing and50ms positive energy rise. A local threshold and300ms minimum spacing prevent following every tiny hit. Each accepted accent is independently matched against the master in a280ms waveform window near interpolated **local** lag evidence. Correlation must exceed0.3; weak or search-edge matches are omitted. No assumed68BPM grid, global stem offset, audio stretching, new dependency or model. The80ms uncertainty is a practical candidate allowance, not a calibrated confidence interval.

Bops last260ms and lift at most11px, with restrained foot-pivot tilt/squash. Their response apex follows the onset by130ms; this is an authored reactive gesture, not an acoustic onset correction. Bigger gestures reduce the bop amplitude to20%; the111–153s goodbye/bridge region reduces it to30%. A small percussion indicator flashes independently of this attenuation. No new pose or character art. The existing blackout still covers the entire scene.

## Reproduce

```powershell
python scripts/music-cues.py --additions
python scripts/percussion-cues.py
npm run check
node scripts/song-render.mjs --percussion --stills --full
python scripts/song-qa.py --percussion
```

The baseline analysis command now refuses to overwrite the reviewed V4 map. New cue proposals are generated separately. `--music-cues` still renders V4; the default still renders V3. All source assets and previous video versions remain available.

27 tests verify timing preservation, non-overlapping new cues, cue bounds, direct/reverse seeking, no early percussion activation and restrained motion. New percussion timing and additional moments await listening review. User-specific missing-moment examples, if supplied, can guide the next targeted pass.

Encoded QA passed: 1920x1080, 30fps, 7,884 frames, 262.8s; master and approved artwork hashes unchanged; five sampled audio windows remain aligned; repeated still hashes match. All27 cue excerpts validated. Sampled encoded imagery inspected; new musical/percussion listening approval remains pending. See `qa-report-v5.json`.
