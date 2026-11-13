# Agent407 — first pose review

Two **unapproved concept masters**, generated individually from the user's selected reference using the built-in Codex imagegen tool. Standing was generated first; kneeling uses standing plus the original reference for identity continuity. No additional cast or pose inventory has been generated. No goggles, clothes, tools or emotes are baked into either base.

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
