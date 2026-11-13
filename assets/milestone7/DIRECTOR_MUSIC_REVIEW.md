# V6 — musical direction from Leo's listening notes

[Full video and updated cue map](review-v6/index.html). Original audio, lyric timing, V4 measurements and V5 additions are unchanged. `music-director-corrections.json` holds the new editorial decisions separately; `musical-cues-v6.json` is the combined review map.

| Note | Implementation |
|---|---|
| Drums begin around0:14 | Percussion enabled from14,000ms; the first existing matched hit is14,491ms. Earlier intro hits are suppressed in this pass. No invented regular beat grid. |
| Piano roll and quiet anticipation around0:25 | Hold the bop from24.4–27.2s; lean into anticipation, then switch to the existing surprised pose at25.6s. This is an approximate director cue, not a newly measured exact onset. The previous registry composition is untouched. |
| Two early peaks occur two-thirds through their swells | Leo explicitly clarified two-thirds, not2–3seconds. Keep starts39,994/46,566ms and multiply each2s rise by1.5. New performance peaks42,994/49,566ms; each settles over1.5s. Original measured peaks41,994/48,566ms stay in the baseline evidence. |
| Another brass flourish before the answer | New flourish73.8–76.6s, apex74.817s. Brass stem contains a distinct rise around75.25s; locally bounded matching suggests roughly−433ms. Wide mixed windows were ambiguous. Evidence in `evidence/brass-followup-match.json`; gesture remains approximate. |
| Around1:32: similar pause, no piano roll | Hold bopping90.7–94.6s; a small hesitant lean becomes a restrained head shake around92.3s. No piano label here. |
|3:30 is the big chorus swell | An ensemble gesture rises206.5–210s and settles through213.5s: larger lift, warmer glow and a cheer pose. The210s apex follows the director's approximate musical landmark, not a single-stem energy maximum. |

The source cue maps are not overwritten. Director cards are identified separately in the test; acoustic confidence is not upgraded by editorial approval. Existing held candidates remain held. Approved poses and foot anchors are reused, with no new generated artwork or dependencies.

## Reproduce

```powershell
python scripts/percussion-cues.py --director
npm run check
node scripts/song-render.mjs --director --stills --full
python scripts/song-qa.py --director
```

The gallery regenerates seven short master excerpts for the five new director moments and two revised swells. Previous versions retain their render switches. Tests cover source preservation, unambiguous non-overlapping cue cards, exact1.5x rise duration, pause gating and seekable poses. Caption timing remains identical. Final playback still requires Leo's review.

Validation: 28 tests pass. V6 retains1920x1080/30fps,7,884frames,262.8s, unchanged master/artwork hashes, matching repeat-frame hashes and five aligned audio windows. All32 cue excerpts and15 spectral-pattern excerpts passed stereo/duration checks. Revised sampled poses were visually inspected; musical playback approval remains pending. See `qa-report-v6.json`.
