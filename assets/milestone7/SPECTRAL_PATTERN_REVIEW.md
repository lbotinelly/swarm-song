# Whole-song spectral pattern search

[Audition the ranked passages](pattern-review/index.html). This scans the full262.8s master using Leo's examples as musical-pattern references, not an exhaustive list of points. The page seeks into the V6 test video and provides15 short master excerpts. Existing cue timings and performances are untouched by similarity scores.

## Reuse and method

The existing local `F:/Tools/venvs/qwen-aligner` environment already contains **Librosa1.0.0**. No package/model download, external service, new dependency or classifier was introduced. The script uses its proven spectral features rather than reimplementing them:

- Spectral contrast: peak/valley differences within seven octave frequency bands, distinguishing spectral structure from a simple volume curve.
- Spectral flux: positive changes in the spectrum over time, useful evidence of attacks and entrances.
- Spectral flatness and centroid: noise-like versus concentrated tonal texture and spectral brightness.
- RMS energy: only10% of the final ranking; spectral descriptors contribute90%.

Definitions: [Librosa spectral contrast](https://librosa.org/doc/main/api/generated/librosa.feature.spectral_contrast.html) and [onset strength / spectral flux](https://librosa.org/doc/0.11.0/generated/librosa.onset.onset_strength.html). Contrast does not identify an instrument or an emotion by itself.

Analysis uses16kHz mono derivatives,2048-sample STFT windows and320-sample hops. Master, keyboard, strings, brass and drums are analyzed separately. Features are smoothed over100ms, standardized per descriptor over the song and compared on a100ms search grid. Stem descriptors use interpolated local lag evidence for this coarse search; the source recordings are not stretched. Candidate timings remain approximate until locally aligned/listened to. Three duration ratios(0.8,1,1.2) tolerate modest phrase-length changes. Rankings combine temporal shape and spectral texture; they are **not calibrated probabilities**. Top3 separated windows per family are retained, including weak ones explicitly for audition.

## What the scan found

| Reference family | Ranked findings | Interpretation |
|---|---|---|
| Quiet pause at90.7–94.6s |24.8–27.9s ranks first | Recovers Leo's other pause example without using it as this family's template. Useful consistency check, not definitive validation. |
| Early string build at39.9–44.5s |46.9–51.5s ranks first;8.3–12.9s also appears | Recovers the next swell and opening material. The spectral comparison can support phrase shape; it does not dictate the gesture's exact apex. |
| Brass flourish at69.8–73.5s |223.7–227.4s first;76.8–80.5s second | Supports reviewing an additional late brass passage ahead of the existing228.824s cue, and recovers the known brass answer. |
| Piano-led anticipation at23.8–27.4s |131.8–135.4s and114.0–118.3s among candidates | Potential quieter keyboard-led passages, not confirmed piano rolls or automatic surprise beats. |
| Big chorus at206.5–213.5s |94.6–101.6s,52.6–59.6s,66.6–73.6s | Shows the limit: similar full-band texture can occur in a verse or instrumental. Do not label all matches as choruses. |

The early RMS-only search produced different rankings; the spectral pass is the durable candidate list in `spectral-pattern-candidates.json`. It includes separate spectral/energy scores, nearby existing cue IDs, source windows and duration ratios so the reasoning remains inspectable. Several candidates are already covered by cues; the15 windows are not15 new events.

## Why the audition layer is separate

Frequency measurements improve retrieval, but cannot reliably decide narrative intent. A reflective piano line should not automatically inherit the registry surprise, and a dense verse should not receive the final chorus gesture merely because spectra resemble each other. New pattern candidates are therefore mapped and playable against the full test; the current video uses the actual director corrections and locally checked cues. This avoids converting a ranking into invented certainty.

## Reproduce

```powershell
& F:/Tools/venvs/qwen-aligner/Scripts/python.exe scripts/find-music-patterns.py
```

Source master and artwork are unchanged. No manual listening or musical approval is inferred from computed similarity. New windows remain pending playback interpretation.
