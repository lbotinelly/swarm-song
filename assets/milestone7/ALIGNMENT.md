# Audio alignment and uncertainty

The authoritative WAV remains 262.8 seconds, 48 kHz stereo signed 16-bit PCM, 12,614,400 frames. Its SHA-256 is recorded in `timeline.json` and checked by QA. No master samples were edited. Source lyrics and the existing registry evidence remain unchanged.

## Method and review states

1. Reused local Whisper large-v3-turbo on the entire master, unprompted, for section and phrase evidence. The tool spans the intro and sleep instrumental with early first-word estimates and repeats text in the outro; those outputs are not treated as truth.
2. Reused local Qwen3 ForcedAligner on eight manageable master windows with supplied editorial lyrics. Initial poorly bounded windows are preserved as `*-initial.json` and excluded from final selection.
3. Re-ran eleven difficult phrases in tighter master windows. Differences over 240 ms are flagged. Agreement within 160 ms can receive **crosschecked-candidate**, meaning cross-context model agreement, not independent human verification. Large disagreements remain unresolved rather than averaged.
4. Retained the approved 24,160 and 26,240 ms registry phrase cues separately. Their human-review scope remains phrase choreography only. All individual word timings remain candidates or unresolved.
5. Evaluated local stem/master waveform lag at fifteen positions across the song. Estimates move from approximately -2 ms at 13 s to -1,902 ms at 229 s, with weak-to-moderate correlations. These are diagnostic lag evidence, not verified vocal onset corrections. No universal offset or time stretch is applied; every canonical word candidate comes from master audio directly.

All 53 written lyric lines are represented, split into 57 phrase groups. Each of the 311 word occurrences has a stable source-line/token ID; repeated choruses are distinct. Acoustic onset/offset, artistic presentation interval and word performance are separate fields/functions. Section boundaries cover 0–262,800 ms continuously, with explicit intro, instrumental, sleep and outro intervals. The absence of every reverb/backing tail is not established by those classifications.

## Unresolved listening priorities

- `timing-issues.json` lists each collapsed, context-sensitive, boundary-edge or long/sustained token. A zero-duration acoustic candidate remains zero and is visibly flagged in data; a minimum performance duration does not pretend to repair it.
- First swarm declaration and elongated Beautiful/dumb/loud: models distribute vowels and consonants inconsistently.
- First chorus: Whisper hears four running occurrences versus three in the editorial lyrics. V1 preserves the supplied three. Do not silently invent a fourth occurrence or declare it absent.
- Comic Oh well / anyway, Root on one repetitions and rapid Kubernetes line: aligner word boundaries need listening.
- Bit-rot goodbye: Whisper duplicates Goodnight and My friends in the full run. Existing M4 evidence disagrees; V1 retains the supplied lyric structure.
- Awakening Woke onset: focused result 153,580 ms is a candidate within the prior 153,320–153,600 range, not new human approval.
- Final chorus, repeated refrains and parenthetical running: voice layers, exact repetition boundaries and sustained endings remain uncertain. The parenthetical response is a separate backing-candidate group; true simultaneous overlap is not established.
- Outro: Whisper repeats the names line after the editorial final line. It could be backing material or ASR hallucination; V1 adds no unsupported words. Human listening must resolve this before a claim of complete *acoustic* coverage.
- Writable: preserved historical onset disagreement 26,800–27,260 ms; the approved phrase reaction does not resolve it.

## Timing honesty

Authored integer milliseconds are evaluated from the absolute Remotion frame clock. Visibility is at the first frame at/after an authored onset (`ceil(ms*fps/1000)`); a 30 fps frame lasts 33.333 ms. Qwen's usual 80 ms resolution is not acoustic precision. Direct/reverse seeking and 24/30/60 fps quantization are tested. No wall-clock state, random layout or accumulating simulation is used.

A complete playable V1 is the listening-review vehicle. Passing interval/coverage tests does not certify vocal sync, instrumental silence or the preferred caption strategy. New human corrections should be added to the protected correction file with evidence and scope; never relabel the machine candidates wholesale.

## Current candidate counts

311 words: 215 machine candidates, 24 cross-context candidates, 72 unresolved. Flags overlap: 47 collapsed boundaries, 30 context-onset disagreements, 9 long/sustained durations and the preserved writable disagreement. Long duration alone is not proof of an error. Six late candidates originally outlived their caption window; V1 now keeps each arrangement through its final candidate onset before clearing. This is a presentation correction, not a change to acoustic evidence.

Protected corrections support phrase onsets and a separate `words` map. A word correction must supply explicit human-reviewed status, source, approval and valid master-relative start/end. Original machine timing remains stored alongside it. The map is currently empty.
