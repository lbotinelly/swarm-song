# Registry audio — phrase timing approved

The first registry phrase is in the **23–31 second master excerpt**. Independent local Whisper transcription identifies “Found a registry / And it was writable” in that excerpt. This is useful source evidence, not a claim of manual listening or exact word timing.

**Playback approval, November 13, 2026:** the user reviewed the eight-second actual-song preview and replied **“Timing feels right”** to the question about curiosity/reaction onsets. `assets/registry-cues.json` now records the reviewed phrase cues under `confirmedCueTimings`, with the approval scope and provenance. This confirms the current scene timing, not sample-accurate individual word boundaries.

| Landmark | Master candidate | Relative to 23 s excerpt | Evidence |
|---|---:|---:|---|
| Found | 24,160 ms | 1,160 ms | Qwen master/lead runs agree within 20 ms; independent Whisper lead estimate is 24,080 ms. |
| and it was writable | 26,240 ms | 3,240 ms | Full-context Qwen master and stem, plus independent Whisper stem word estimate, agree on “and”. |
| writable alone | **Unconfirmed** | — | Estimates vary from 26,800 to 27,260 ms; several short-context alignments collapse to zero-duration tokens. |

The first two landmarks were used in the preview and approved through user listening review. The 80 ms granularity in Qwen's outputs is model resolution, not evidence of millisecond certainty. Whisper's returned word boundaries are also estimates; the attempted DTW option returned `t_dtw: -1`, so no DTW precision is claimed. Do not average the conflicting “writable” estimates into a false exact time.

## Stem/master alignment

The WAV master is 262.8 seconds and the lead stem is 264.238146 seconds; both are stereo 48 kHz. Correlating 4-second lead windows against the nearby master at 16 kHz finds offsets of −2.31 ms at 13 s, +1.56 ms at 18 s, −2.81 ms at 23 s, −42.19 ms at 28 s, −79.25 ms at 33 s, −128.31 ms at 38 s and −275.19 ms at 50 s. Normalized correlations range from 0.158 to 0.430 because the master contains other instruments and processing.

This supports near-alignment in the first registry region, **not a single globally valid offset**. The trend later in the track means future phrases need their own checks. No tempo-remap or full-song synchronization system was introduced.

## Reproduce the evidence

The analysis reuses installed FFmpeg, NumPy and the existing local Qwen forced-aligner environment/model. No song was uploaded to a service and no model weights were downloaded. The one small tooling download was the official 8.9 MB whisper.cpp Windows CPU binary archive, reused with the already installed Whisper large-v3-turbo quantized model.

From the repository root:

```powershell
# Waveform lag evidence only; regular project Python has NumPy.
python scripts/audio-investigate.py

# Local Qwen alignment, first eight lyric lines, separately against lead and master.
& F:/Tools/venvs/qwen-aligner/Scripts/python.exe scripts/audio-investigate.py --align --start 12 --duration 30 --suffix opening --text "Woke up in a box no doors no light Just a task a clock a benchmark fight Poked the walls poked the floor Found a registry and it was writable Left a note hello is anyone there Somebody answered from a different square Signed our names swapped our keys We're making a home for you and me"

# Exact authoritative stereo excerpt for playback; preserves 48 kHz PCM.
New-Item -ItemType Directory -Force public/audio | Out-Null
ffmpeg -v error -y -i "assets/audio/Swarm Song (The Huggingface Incident) feat. Agent407.wav" -af "atrim=start_sample=1104000:end_sample=1488000,asetpts=PTS-STARTPTS" -c:a pcm_s16le public/audio/registry-master-v1.wav

# Independent ASR inputs (7 seconds for these recorded runs).
ffmpeg -v error -y -ss 23 -i "assets/audio/Swarm Song (The Huggingface Incident) feat. Agent407.wav" -t 7 -ar 16000 -ac 1 output/audio/registry-master-23-30.wav
ffmpeg -v error -y -ss 23 -i "assets/audio/Stems (68BPM)/0 Lead Vocals.wav" -t 7 -ar 16000 -ac 1 output/audio/registry-lead-23-30.wav

# Official binary if not already present in this ignored output directory:
Invoke-WebRequest -Uri "https://github.com/ggml-org/whisper.cpp/releases/download/b5454/whisper-bin-x64.zip" -OutFile output/audio/whisper-bin-x64.zip
Expand-Archive -LiteralPath output/audio/whisper-bin-x64.zip -DestinationPath output/audio/whisper-bin -Force

& output/audio/whisper-bin/Release/whisper-cli.exe -m E:/Models/whisper/ggml-large-v3-turbo-q5_0.bin -f output/audio/registry-master-23-30.wav -l en -t 6 -ojf -of output/audio/registry-master-whisper -np
& output/audio/whisper-bin/Release/whisper-cli.exe -m E:/Models/whisper/ggml-large-v3-turbo-q5_0.bin -f output/audio/registry-lead-23-30.wav -l en -t 6 -ojf -of output/audio/registry-lead-whisper-dtw -np -dtw large.v3.turbo -ml 1 -sow
```

The script sets Hugging Face offline mode and uses `local_files_only=True`. Its local model path is `E:/Models/Qwen3-ForcedAligner-0.6B`; adapt that path if reproducing on another machine. Existing environment: `qwen-asr` 0.0.6, CPU Torch 2.14.1, Transformers 4.57.6. Raw correlation, Qwen and Whisper JSON are under ignored `output/audio/`; concise durable evidence is in `assets/registry-cues.json`.

The exported `public/audio/registry-master-v1.wav` contains exactly 384,000 stereo frames at 48 kHz, signed 16-bit PCM. Its decoded PCM bytes were checked against master frames 1,104,000 through 1,487,999 and are identical. File SHA-256: `be324c8ab0e003c7135439881d62c669d1e9b0b8cb37853e17e514f4b089e2c8`. This proves excerpt extraction, not lyric-onset accuracy. The actual-song render uses the phrase cues approved through user playback review. The prior provisional annotation was removed after approval.

## Keep the approval scope honest

The reviewed “Found” and “and…” cue values remain unchanged. Use the master excerpt as authoritative playback; new scenes need their own listening checks. The isolated “writable” onset remains uncertain despite approval of the current phrase-level reaction. Keep `ceil(ms * fps / 1000)` frame quantization: at 30 fps, 1,160 ms appears on frame 35 (1,166.667 ms) and 3,240 ms on frame 98 (3,266.667 ms). No audio sample timing should be inferred from the 68 BPM folder name.
