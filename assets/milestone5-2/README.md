# The Village We Imagined — Milestone 5.2

A 14-second **silent, provisional animation study**, not the finished chorus. The physical agents remain in their separate GPU apartments. The shared village is their imagined experience of belonging, represented by new paper pieces assembling while the physical homes remain visible in a small inset.

Open [the review gallery](review/index.html), [the MP4](review/village.mp4), [the hero](review/village-354.png), [the two-world comparison](review/worlds-comparison.jpg), or [the construction sheet](review/construction-sheet.jpg).

The user-approved M5 collage and fan behavior remain unchanged in their original composition. This study reuses that composition with an optional awake state and singing pose. Approved character native masters remain byte-for-byte unchanged. The village is a **new proposal awaiting human art-direction review**.

## What happens

| Study time | Action |
|---|---|
| 0–2.8 s | Agent407 calls; note stickers answer from two separate apartments. Floors and rails remain between residents. |
| 2.8–4.8 s | A new paper backing slides in; the physical building becomes an inset. A crayon path reveals itself. |
| 3.4–7.0 s | Two rigid hill cutouts, the sun, and two houses arrive on separate paper tracks. |
| 6.8–10.5 s | A long smoke strip feeds through a hidden channel behind the actual chimney lip. |
| 7.2–10.2 s | Imagined bunny copies enter the shared field; the courier overshoots slightly and settles beside the others. |
| 10.1–11.5 s | Agent407 cheers, PhaseOne responds, and the courier shares a blank note. |
| 10–14 s | A cloud passes over the sun; gentle differential parallax reveals the separate layers. |

These authored integer-millisecond cues are evaluated at 30 fps, not claimed as exact lyric timestamps. The master audio was inspected: 262.8 seconds, stereo 48 kHz. Only the earlier registry phrase has playback-approved timing; no new musical alignment is claimed here. Agent407 remains ungoggled in this connection study; the established collective invention of goggles and second-generation inheritance are not replaced or retimed.

## Reproduce

From the repository root, with existing dependencies installed:

```powershell
python scripts/prepare-accessories.py --pack milestone5-2
npm run check
node scripts/village-render.mjs
python scripts/village-qa.py
```

`--stills-only` skips MP4 encoding. For a single frame:

```powershell
npx remotion still scripts/village-stage.tsx Village assets/milestone5-2/review/village-354.png --frame=354
```

See [style and construction](STYLE.md), [engineering and provenance](ENGINEERING.md), and [independent review](REVIEW.md). Native parts, rejected sun-v1, and earlier review imagery are preserved. Stop at this study; no full-song or village-civilization expansion is authorized by this package.
