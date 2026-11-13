# Agent407 — controlled core-pose review

The user **accepted the base design direction**, requested no design drift, and flagged kneeling-v1's longer legs. Standing-v1 remains the identity/proportion reference. The controlled six-pose expansion is now available for pose-specific review; it is not yet final production approval. All illustrations were generated individually with built-in Codex imagegen. No goggles, clothes, tools or emotes are baked into the bodies.

See [the mini style spec](../../../../docs/AGENT407_MINI_STYLE_SPEC.md) and [design lock / next stages](../../../../docs/CHARACTER_DESIGN_LOCK.md).

## Current core set

`core-contact-sheet-v1.jpg` shows the same source-to-preview scale on light and dark backgrounds: standing-v1, kneeling-v2, singing-v1, surprised-v1, cheer-v1 and walking-v1. Standing is reused unchanged. Kneeling-v2 shortens the folded legs; kneeling-v1 remains for comparison. The new set is separate transparent native PNGs, not extracted from a sheet. Five are 1184 × 1328; cheer-v1 is 1182 × 1331. Exact prompts are in `core-prompts.json`; per-file alpha metadata and hashes are in `core-quality-report.json`.

Rebuild current review with `python scripts/art-review.py --core`. The same script without the flag rebuilds the original two-pose review. Pillow is required. Review composites do not modify the masters.

Visual inspection: faces, ear silhouettes, warm outlines and tiny limbs remain consistent at review size. Singing uses a wider open mouth; surprise uses a small round mouth; cheer uses closed curved eyes. The kneeling lower body is more compact than v1. Walking is a small step, not a full walk cycle.

Export exceptions: the new 6% padding target was requested but most returned sources retain only about 4% vertical clearance. The visible silhouettes are not clipped. Most masters peak at alpha 254; cheer peaks at 255. Faint low-alpha background speckles remain in native outputs. Do not call these final production-clean exports. Preserve them; any approved cleanup/padding derivative must be versioned separately.

New source outputs, in generation order:

| Master | Built-in source filename |
|---|---|
| kneeling-v2 | `exec-6e129c5b-64a0-40a9-b45d-9b4708c00f8b.png` |
| singing-v1 | `exec-104008e0-2bed-44f0-91f5-e5c65c4ff0b3.png` |
| surprised-v1 | `exec-de536517-19bb-49a5-8638-db4c84b86c5a.png` |
| cheer-v1 | `exec-7d85f6d4-501e-4f93-b359-54243c1497e2.png` |
| walking-v1 | `exec-ec2be283-dca3-4d5c-8899-40862657f357.png` |

Kneeling-v2 references kneeling-v1 and standing-v1; all other new poses reference standing-v1 directly. No supporting characters or detachable accessory masters have been generated in this core-set pass.

## Original two-pose artifacts

- `standing-v1.png`: original native 1184 × 1328 RGBA PNG.
- `kneeling-v1.png`: original native 1184 × 1328 RGBA PNG.
- `contact-sheet-v1.jpg`: programmatically labeled light/dark review composites, never a sprite source.
- `prompts.json`: exact generation prompts.
- `quality-report.json`: dimensions, alpha bounds/extrema and original-file SHA-256 hashes.

The tool exposes a transparency switch but **no size, quality or model selector**. Highest useful native detail was requested in each prompt; these dimensions are the actual returned outputs, not a claim of selectable maximum resolution. No enlargement, extraction, alpha correction or lossy conversion was applied to the PNGs. The original output alpha peaks at 254 rather than 255; preserve and review this slight translucency before production approval. Dark/light composites are visually clean at review scale. The hidden RGB outside alpha includes a glow: viewers that discard alpha will display it incorrectly.

Reference: `assets/reference/selected-bunny-mechanic.png`, copied byte-for-byte from the user attachment. Original source/rights were not specified by the user; no third-party license is asserted. New outputs were generated for this project, with no separate stock assets. Generated source filenames: `exec-6e0bff94-941d-49c4-b162-d132ae198809.png` (standing), `exec-48477b5c-23a2-4fa9-aa62-21ff287553cb.png` (kneeling). Built-in outputs remain under the session's Codex generated-images directory as well as here.

Rebuild the contact sheet and alpha report from the repository root using Python with Pillow installed:

```powershell
python scripts/art-review.py
```

The review shows both images at comparable scale. Final ground/head/hand anchors should be measured after approval; the engine's temporary sprite anchors are not production measurements. Review the reference likeness, plain-body proportions, kneeling readability, matching face/ears and white cut edge before approving more sprites or film integration.

Alpha QA also detects faint background speckles (including alpha 1 pixels at the standing canvas edge). The report records both strict nonzero bounds and silhouette bounds above alpha 16. This is not a clipped silhouette, but cleanup of the near-transparent background should be reviewed before production use; no threshold has been destructively applied to the masters.
