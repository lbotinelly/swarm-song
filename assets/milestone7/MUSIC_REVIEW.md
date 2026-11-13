# Musical cues — V4 listening study

**Playback update:** Leo found the captured moments well timed, while noting missing moments and requesting percussion bops. The original map is now protected; see `music-playback-feedback.json`. [V5 additions and percussion](PERCUSSION_REVIEW.md) extend this pass without moving its cues.

Leo requested musical moments in both the timing map and the full caption test, with the solo agent responding. This authorizes the small listening study; it does not resume new story scenes or character production. V3 typography was approved with minor future refinements, and its caption data remains byte-for-byte unchanged.

## Watch and listen

- [Interactive cue map and full video](music-review/index.html): numbered cues, waveform envelopes, seek buttons, and individual master excerpts.
- [Full V4 test](review-v4/swarm-song-v4.mp4).
- [Compact cue table](MUSICAL_CUES.md).
- [Machine-readable musical map](musical-cues.json), linked to the existing lyric map by master hash, lyric timeline hash and section IDs.

Twenty-two selected moments span opening, first chorus, instrumental break, goodbye, bridge, awakening, inheritance, final chorus and outro. Eighteen have locally consistent waveform matches and drive gestures. Four are held for review: the goodbye keyboard accent, bridge synth, final rhythm accent and outro keyboard. Those four are still shown and playable, but the bunny remains neutral.

## What the evidence says

Reuse: the existing FFmpeg decoder and local NumPy correlation method; existing separated stems; existing Remotion composition, sprite masters, measured foot anchors, fonts and smooth interpolation. No new dependency, model, service, rig, beat engine or editor.

The analysis reads all twelve stems and the original master. It measures 50 ms RMS windows smoothed over 400 ms. Narrow, explicitly authored search windows select local energy crests; emotional roles are separate editorial interpretations. Each selected crest gets three local 1.2-second summed-stem/master waveform comparisons in a ±3-second search. At least two offsets must agree within 100 ms with median correlation at least 0.3. A conflict over 400 ms with prior lead-lag evidence within ten seconds disables the gesture rather than silently choosing a repeated beat. No global offset or time-stretched audio is used.

The displayed uncertainty is a practical review allowance (at least ±250 ms for enabled candidates), **not a calibrated statistical interval**. Matching is still fallible. The supplied “Strings” label does not prove cello, and separated stems can leak other instruments. No continuous listening review or human musical-cue approval is claimed. The map is deliberately a first selected pass, not an exhaustive instrument transcription.

SVG waveform lanes are independently normalized. Stem traces deliberately show their own original timebase; only numbered cue markers use the master clock. Each cue lists its measured local offset. This prevents a misleading globally shifted stem diagram.

## Test performance

The sole bunny is a performance stand-in, not a newly staged first/second-generation narrative. Clean approved standing, singing and cheer poses are reused. All swaps share the measured foot pivot. Four small motions demonstrate direction: swell (lift/open), hop (accent), sway (gentle response), settle (release). Gestures reach their apex at the candidate peak and return to neutral at the end; no all-song rhythmic bobbing or guessed BPM grid. The agent remains visible in quiet passages for this diagnostic. The existing two-second blackout remains fully black.

Cue cards occupy the upper half; approved bottom-half lyrics, word performance, four-running amendment, stationary fades and all timing are unchanged. The study replaces the opening title with a small study header and retains the blue-name outro. The title/old static bunny remain available in the ordinary V3 mode. The diagnostic clock and progress marker are review tools, not final-film text.

## Reproduce

```powershell
python scripts/music-cues.py
npm run check
node scripts/song-render.mjs --music-cues --stills --full
python scripts/song-qa.py --music-cues
```

Regular `node scripts/song-render.mjs --stills --full` still produces V3 without the cue overlay. All cues are integer milliseconds, displayed on the first eligible output frame (30 fps here). The code is deterministic under direct and reverse seeks. Master excerpts are short 192 kb/s MP3 listening copies; the full film uses the unchanged master muxed to AAC as before. Source audio and artwork are preserved.

The cue analysis is reproducible from source; future human corrections should be explicitly recorded before rerunning it. Do not relabel the current candidates as approved merely because video QA passes.

## Delivered validation

26 tests pass, including cue bounds, neutral returns, disabled-gesture behavior, frame quantization and direct/reverse seeking. The approved caption timeline hash is unchanged. V4 encodes 7,884 frames at 1920x1080/30fps for 262.8 seconds. Five audio windows match the master without lag correction; repeated still hashes agree. All 22 stereo listening excerpts passed duration checks. Sampled encoded imagery was inspected. See `qa-report-v4.json`; continuous musical listening approval remains Leo's review gate.
