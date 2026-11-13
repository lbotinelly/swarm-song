# Milestone 7 — The song is the timeline

**Current: V5 percussion and cue additions.** [Play V5](review-v5/index.html), or read [the evidence and reproduction notes](PERCUSSION_REVIEW.md). The V4 cue map and caption timing are preserved.

**Preserved V4 musical-cue listening study.** [Watch with the interactive cue map](music-review/index.html). The full master accompanies cue labels and the existing solo agent performing selected swells, accents and releases. Approved lyric timing is unchanged. See [MUSIC_REVIEW.md](MUSIC_REVIEW.md) for evidence, limitations and reproduction. This is a listening-review candidate, not an approved emotional score.

**Preserved V3 typography test.** [Play the full test](review-v3/index.html): bundled Finger Paint Regular lyrics with a lighter 9 px white contour and restrained texture; Bitcount Single weight 550 on the existing blue agent-name outro. No new B-roll scenes. All approved V2 timing and text remain unchanged; only glyph metrics changed. V2 is preserved, with its exact timeline in `timeline-v2.json`. Font provenance and OFL notices are in `public/fonts/`. Rendering waits for both local fonts before capturing frames.

Reproduce V3 (no aligner rerun needed):
```powershell
python scripts/build-lyrics.py
npm run check
node scripts/song-render.mjs --stills --full
python scripts/song-qa.py
```
V3 validation: 24 tests pass; encoded output is 1920x1080, 30 fps, 7,884 frames and 262.8 seconds. Repeated-frame hashes match, and five sampled audio windows remain aligned with the unchanged master. Static encoded frames and the Bitcount outro were visually inspected; continuous playback awaits Leo’s review.

Current render commands output to `review-v3/`; QA writes `qa-report-v3.json`. Python/Pillow measures the bundled Finger Paint file, so V3 does not require a system Comic Sans installation.

**Preserved V2 playback refinements.** [Play V2](review-v2/index.html): bottom-half captions, a 150 ms stationary fade, and closer entrances after long vocal gaps. [Changes and reproduction](PLAYBACK_FEEDBACK.md). The V1 description and review below are retained as history; V1 media is unchanged. V2 output and its QA remain preserved.

## Preserved V1 production record

The first complete lyric-film V1 uses the unchanged 262.8-second master recording, 57 phrase groups and 311 editorial word occurrences. New scenery, cast, registry flights and credits are paused. The village design is human-approved; this milestone does not revise it.

## Watch and compare

Open [the gallery](review/index.html) or [the full film](review/swarm-song-v1.mp4). The gallery also contains twelve eight-second comparisons: verse, registry, chorus and goodbye, each in word-only, read-ahead and paper-slap treatments. They use identical audio windows. Paper-slap is the preferred direction, not a playback-validated winner.

## Reproduce

Use the existing Node/Remotion dependencies, FFmpeg, Python/Pillow/NumPy and the locally installed **Comic Sans MS Bold** font. Font files are not redistributed. This Windows system font is used for glyph metrics and browser rendering; install a properly licensed equivalent setup to reproduce on another host. No model downloads, paid calls or new project dependencies were added.

```powershell
npm ci
# Existing offline model/environment; original exploratory windows remain preserved.
& F:/Tools/venvs/qwen-aligner/Scripts/python.exe scripts/align-song.py
& F:/Tools/venvs/qwen-aligner/Scripts/python.exe scripts/align-song.py assets/milestone7/focused-windows.json
python scripts/build-lyrics.py
python scripts/song-stem-check.py
npm run check
npm run song:review
npm run song:render
python scripts/song-qa.py
```

Aligner skips evidence files already present. To experiment, version a new window/evidence file; do not overwrite reviewed corrections. Full Whisper evidence was produced with the existing `output/audio/whisper-bin/Release/whisper-cli.exe`, `E:/Models/whisper/ggml-large-v3-turbo-q5_0.bin`, `-l en -t 6 -ojf -np` on the entire master converted to mono 16 kHz. See `evidence/whisper-master.json`. Raw token times are retained, including unreliable instrumental-spanning estimates.

## Data and smallest implementation

- `timeline.json`: complete master-clock section, phrase and word candidates, source-line identities, uncertainty, presentation timing and emphasis.
- `reviewed-corrections.json`: separately protected registry phrase cues. Automated alignment never writes this file. They approve the scene phrase cue, **not individual word boundaries**.
- `alignment-windows.json`, `focused-windows.json`, `evidence/`: reproducible local analysis inputs and raw results.
- `timing-issues.json`: unresolved tokens and editorial/ASR disagreements.
- `src/lyrics.ts`: pure time evaluation, six authored layout regions, one village study placement and explicit scene protected-rectangle checks. Scene renders fail visibly if a configured protected region conflicts; choose an authored placement rather than shrinking text automatically.
- `src/Song.tsx`: SVG glyph-outline `WordSticker` and paper-stage composition. Word position is computed once from fixed font metrics, independent of time. Pivots remain at bottom-center. New phrases draw above old ones; old arrangements slide/fade out over 420 ms. Most words settle; selected words lift briefly.
- `scripts/song-render.mjs`: existing Remotion bundling/rendering pattern, plus FFmpeg audio muxing. No editor, service, physics or animation framework.

Acoustic timestamps are untouched by the 600 ms read-ahead choice. Entrances settle within 220 ms, leaving approximately 380 ms of full-phrase reading time before the first candidate onset. Surprise phrases enter at the candidate/approved cue instead. Hero phrases use larger glyphs and selective emphasis. A word-only diagnostic intentionally removes read-ahead. Read-ahead B uses a simple dissolve; C adds placement and slide-away replacement.

The film has a warm paper stage, quiet lavender goodbye, a two-second black interval at 142–144 s, a matched typographic awakening, larger choruses and a restrained blue-name outro placeholder. These are V1 editorial choices; no finished ledger or credit scene is claimed. Runtime words remain separate from artwork. Existing paper stock and approved bunny sprites are reused unchanged.

## Limits that matter

Read [alignment and uncertainty](ALIGNMENT.md), [independent review](REVIEW.md), and the generated QA report. Full editorial coverage is verified; perfect acoustic transcription is **not**. Repeated/backing vocals and the bit-rot passages still require listening. No human approval is inferred from passing tests. The MP4 uses AAC for normal player compatibility; the source soundtrack is not cut, stretched, normalized or remixed. AAC is lossy, so decoded samples are not claimed identical to the WAV.

Final independent visual gate: **8.53/10**. Musical/readability gate: **unverified**, with no overall audiovisual pass claimed. Twenty-one tests pass. Timing currently contains 72 unresolved words; see the individual flags rather than interpreting full editorial coverage as perfect acoustic alignment.

Encoded-output QA passed: **1920×1080, 30 fps, 7,884 frames, 262.800 seconds**, stereo 48 kHz AAC. Five master-relative signal checks correlate above 0.99987 with no lag correction. All twelve comparison clips are eight seconds with audio. The same-frame PNG hashes match; the master and six approved character masters retain their hashes. See `qa-report.json` for evidence and limitations.
