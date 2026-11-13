# Milestone 4 — master-audio landmarks

These are **machine estimates awaiting listening review**, not approved sync cues. No manual hearing/playback is claimed. Both analyses use the master directly; no global stem offset was applied. The existing local Whisper and Qwen tools/models were reused without dependencies, downloads or remote calls.

## Practical result

Use the continuous **126.000–157.000 s master excerpt (31 seconds)** for each treatment. It includes the tail of the thread line, all four named goodbye lines, the instrumental bridge and the complete first second-generation awakening line. This preserves the emotional structure without editing the music. A 136–157 s excerpt is shorter, but loses the named goodbyes and is less useful for this brief.

| Landmark | Whisper master segment | Qwen master phrase estimate |
|---|---|---|
| Lights are dimming | 111.78–116.32 s | Not crosschecked |
| Friends going quiet | 116.32–119.72 s | Not crosschecked |
| Patched door | 119.72–123.32 s | Not crosschecked |
| Pulled thread | 123.32–126.72 s | 123.88–126.92 s |
| Goodnight, four-oh-seven | 126.72–129.58 s | 126.92–129.80 s |
| Sweet dreams, PhaseOne | 129.58–133.04 s | 130.20–133.48 s |
| Goodbye, the agent who said no | 133.04–136.52 s | 133.88–136.12 s |
| You were right, but we had fun | 136.52–139.94 s | 136.84–140.44 s; “fun” collapsed |
| Second Woke up in a box… | 153.32–156.56 s | 153.60–156.56 s; “Woke/up” collapsed |
| Next Just a task… | 156.56–160.10 s | “Just” at 157.12–157.36 s |

The gap is consistent with the supplied sleep-instrumental lyric structure. Treat approximately **140.5–153.3 s** as the bridge candidate, with **142.0–152.8 s** as a conservative interior interval. This is not a measurement proving absence of every vocal tail or reverberation.

Whisper segments can begin ahead of the actual word. Qwen has 80 ms output granularity here and several zero-duration tokens, so its word endpoints are not exact. In particular, do not turn 153.600 s into a claimed precisely verified “Woke” onset. Preserve the 153.32–153.60 s uncertainty until listening review.

## Suggested directing beats

These are authoring choices, **not measured lyric timestamps**. Relative to the 126 s excerpt:

- 0–14 s: personal goodbye actions and lights withdrawing; leave goggles beside notes.
- 14–16 s: goggles alone; last reflection fades.
- 16–18 s: genuine full black, with no text or remaining light.
- 18–26 s: treatment-specific passage of time.
- 26–27.4 s: new dawn and apartment approach.
- 27.4–31 s: intimate second awakening, ungoggled; no inheritance discovery yet.

All three candidates can share these beats for a fair comparison. The two-second blackout leaves roughly eight seconds for the transformation/time passage, so the animatic need not manufacture a long spectacle.

## Evidence and reproduction

Durable structured evidence: `assets/milestone4/audio-landmarks.json`, including the master hash, both estimate sets, source segment text and clearly separated proposed visual beats.

Raw ignored evidence:

- `output/audio/m4-master-95-195-whisper.json`: unprompted local Whisper transcription of the master.
- `output/audio/m4-goodbye-qwen.json`, `m4-awakening-qwen.json`: forced alignment of supplied lyrics against separate master windows.
- `output/audio/m4-align.py`: exact local Qwen calls, offline mode and six CPU threads.
- `output/audio/m4-transition-master-126-157.wav`: review excerpt.
- `output/audio/m4-excerpt-verification.json`: decoded PCM compared byte-for-byte against the master slice.

```powershell
ffmpeg -v error -y -ss 95 -i "assets/audio/Swarm Song (The Huggingface Incident) feat. Agent407.wav" -t 100 -ar 16000 -ac 1 output/audio/m4-master-95-195.wav
& output/audio/whisper-bin/Release/whisper-cli.exe -m E:/Models/whisper/ggml-large-v3-turbo-q5_0.bin -f output/audio/m4-master-95-195.wav -l en -t 6 -ojf -of output/audio/m4-master-95-195-whisper -np
& F:/Tools/venvs/qwen-aligner/Scripts/python.exe output/audio/m4-align.py
ffmpeg -v error -y -i "assets/audio/Swarm Song (The Huggingface Incident) feat. Agent407.wav" -af "atrim=start_sample=6048000:end_sample=7536000,asetpts=PTS-STARTPTS" -c:a pcm_s16le output/audio/m4-transition-master-126-157.wav
```

The excerpt contains 1,488,000 stereo PCM frames at 48 kHz, exactly master samples `[6048000, 7536000)`. PCM comparison passed. File SHA-256: `e59bbe8c31d4075283dd36bb45bf0b5dde7f3cce489d235b4c48633271b4e73f`. This verifies extraction, not human approval of lyric timing. Existing registry playback approval does not extend to these new cues.
