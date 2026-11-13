# First detachable pack — approved

Approved November 13, 2026, together with the six-pose placement sheet and registry visual integration: user response **“Yes, all approved! Proceed.”**

Scope: goggles, curiosity question, three yellow rays, two independently animatable music notes, and wrench. No supporting cast or additional accessories were produced.

`contact-sheet.png` compares each asset on cream and navy. `placement-sheet.png` uses the actual six production poses and the same anchor mapping as the scene. The goggled standing pose is explicitly a **later-story attachment test**, not registry continuity; the registry MP4 has no goggles.

## Sources and preservation

Five illustrative masters were generated individually through built-in Codex imagegen, with `transparent_background=true`. The original mechanic image supplied the goggles, wrench and rays design; the approved standing master supplied print/style consistency. Actual native dimensions and SHA-256 hashes are in `manifest.json`; exact prompts are in `prompts.json`. No API model/size selector is exposed by this path. Highest useful native detail was requested; no source was enlarged or extracted from a contact sheet.

| Master | Original built-in output | Native pixels |
|---|---|---|
| Goggles | `exec-898bf1c4-1456-469f-85a9-bdb483f8acf1.png` | 1774 × 887 |
| Rays | `exec-ded8a5a6-26c4-4d83-bda6-498752be9fcd.png` | 1316 × 1195 |
| Wrench | `exec-f96955a0-0b77-4bd3-b384-dde6da5d3cad.png` | 1314 × 1197 |
| Note A | `exec-215edb65-cac5-4426-9d41-956526e1b5e9.png` | 1312 × 1199 |
| Note B | `exec-757b5f22-dce4-4734-b3e2-072fe4d8242b.png` | 1271 × 1238 |

Unmodified RGBA sources live in `masters/`. Render derivatives live under `public/accessories/`, with low-alpha speckle cleanup and 100 pixels of extra padding on each edge, without RGB recoloring or resampling. The precise alpha recipe is recorded in the manifest. Visual light/dark review found clean, legible contours at intended display scale.

The question is **editable SVG typography**, not a generated text image: `public/accessories/question-mark-v1.svg`. A seeded SVG paper-grain filter, rounded local Comic Sans MS bold glyph, and warm-white glyph contour match the sticker treatment. The scene rasterizes that source at render time. `question-mark-preview.png` is a separate 1024 × 1024 RGBA review export. Font fallback is Arial/sans-serif; another host without Comic Sans MS may render a different glyph. No font binary is redistributed. The two musical notes are independently generated illustrative emotes rather than lyric text.

The supplied reference's external provenance/license was not provided; no stock-image or font license grant is implied. This pass uses no external stock art. Retain source/prompt records with downstream exports.

## Reproduce

```powershell
python scripts/prepare-accessories.py
npx remotion still scripts/accessory-review.tsx AccessoryPack assets/accessories/pack-v1/contact-sheet.png --frame=0
npx remotion still scripts/accessory-review.tsx AccessoryPlacement assets/accessories/pack-v1/placement-sheet.png --frame=0
npx remotion still scripts/accessory-review.tsx QuestionPreview assets/accessories/pack-v1/question-mark-preview.png --frame=0 --image-format=png --transparent
```

Use Python with Pillow, the existing npm dependencies and local Remotion Chromium. These commands do not generate new art or contact a paid image service.
