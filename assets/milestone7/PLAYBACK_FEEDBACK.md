# V2 — Leo's playback notes

## Approved playback baseline — November 13, 2026

Leo approved the updated 23–72s timing preview after the final two 800 ms entrance delays: “the updated timing preview is perfect now!” Preserve this presentation baseline, including the four-running performance, when changing typography. Approval covers the reviewed preview's visible timing; it does not certify every machine-estimated acoustic word boundary or unreviewed portions of the full song.

Leo described V1 as an excellent overall timing result, while requesting three refinements: text sometimes arrived too early after long vocal pauses; slide/fade exits distracted; final captions should live in the bottom half. This is overall playback feedback, not individual acoustic-boundary approval.

## Implemented presentation changes

- Default lower-center placement, bottom-aligned by row count. Supporting words remain 96 px; hero words start at 104 px, with restrained emphasis. Authored semantic line breaks remain; the all-caps final refrain now fits two lines. Other authored regions remain available for intentional scene exceptions.
- Fade out **in place over 150 ms**, replacing the 420 ms slide/rotation/fade. Position, rotation, scale and contact shadow freeze at the start of the fade. The placement entrance remains.
- After a candidate vocal gap of at least **1,800 ms**, read-ahead is **250 ms**, instead of 600 ms. Seven phrases are affected, including the opening, post-instrumental comic verse, second awakening and ledger entrance. Surprise reveals still use zero pre-roll. Gap estimates inherit the existing acoustic uncertainty; these new values are an editorial trial, not newly verified word timings.
- Existing phrase acoustic boundaries and approved registry cues remain intact. Original word timing is unchanged except the explicitly requested split of the first chorus’s second running span. No aligner rerun or audio processing change.
- The temporary bunny and existing scenery studies are framed above the captions. No artwork or new scene animation was created.

V1 film and comparison clips remain in `review/`, and its source is reproducible from commit `f928d91`. V2 artifacts are in `review-v2/`. `timeline.json` is now the current V2 presentation; `timeline-v1.json` preserves the prior data for regression tests.

## Reproduce and verify

```powershell
python scripts/build-lyrics.py
npm run check
node scripts/song-render.mjs --stills --full
python scripts/song-qa.py
```

Twenty-three tests cover text/timing preservation, bottom-half bounds, protected scenery, deterministic seeking, fast stationary fade and reduced pre-roll after long gaps. V2 has not received a new independent art score or token-level listening approval; the earlier 8.53 score belongs to V1. The global adjustment is supplemented by Leo’s specific phrase corrections below.

## Specific director corrections

These protected overrides are in `reviewed-corrections.json`, applied **after** generated presentation defaults:

| Phrase | V2 direction |
|---|---|
| and it was writable | Hold 300 ms longer; fade starts 27,660 ms, clears 27,810 ms. |
| Left a note | Arrives 27,885 ms:75 ms after writable clears. Previous hello text hold extends 250 ms, to 31,210 ms before fade. |
| Somebody answered | Arrives 30,930 ms:250 ms later than the original entrance. Incoming paper briefly overlays the outgoing phrase. |
| for you and me | Hold extends 1,500 ms; fade begins 42,820 ms and clears 42,970 ms. |
| We are the swarm now | Arrives 44,070 ms after Leo’s additional 800 ms delay; outgoing me hold is unchanged. |
| Beautiful, dumb, and loud | Arrives 49,640 ms after Leo’s additional 800 ms delay; outgoing now hold is unchanged. |

These are director-guided presentation estimates, not claims of newly measured acoustic word boundaries. A signed negative readAheadMs indicates that a director-guided entrance is later than an uncertain machine onset; the original candidate remains visible in data rather than silently rewritten.

**Confirmed transcription amendment:** the first chorus has four running repetitions. Leo identified the old second occurrence as spanning two. V2 splits its 67,940–69,620 ms candidate span at 68,780 ms and inserts stable ID `line-14-word-05-extra`; the fourth occurrence retains the previous last word’s ID. The midpoint is an estimate, not human-confirmed timing. Both split intervals remain flagged. The original lyrics file and raw model evidence are preserved; the explicit amendment is included in coverage tests. Current coverage:57 groups,312 words,74 flagged candidates (two additional split-boundary flags).

**Balanced lines:** explicit semantic breaks now include “Goodbye, the agent / who said no,” “Somebody answered from / a different square,” “Seven hundred deep / and picking locks,” “You were right / but we had fun,” and “Three thousand / seven hundred names.” Hero anyway remains intentionally isolated. No automatic shrinking or generic line-balancing system was introduced.

Encoded V2 QA passed:1920×1080,30 fps,7,884 frames,262.800 seconds, unchanged master hash and verified audio alignment at five sample windows. The targeted review clip is 49 seconds from master 23–72s. V1 remains unchanged.

Recreate the targeted clip after rendering:
```powershell
ffmpeg -v error -y -ss 23 -i assets/milestone7/review-v2/swarm-song-v2.mp4 -t 49 -c:v libx264 -preset fast -crf 20 -c:a aac -b:a 320k -movflags +faststart assets/milestone7/review-v2/opening-corrections.mp4
```

## Follow-up fine-tuning

Leo requested another 800 ms before the first “We are the swarm now” and “Beautiful, dumb, and loud” entrances. They now start at 44,070 ms and 49,640 ms respectively, exactly 24 frames later at 30 fps. Outgoing holds and all acoustic candidates are unchanged. Leo explicitly approved the existing four-running performance: “running x 4 is perfect now.” Its count, timing and placement remain unchanged.
