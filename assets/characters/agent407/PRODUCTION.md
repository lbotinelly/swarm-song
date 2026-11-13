# Agent407 — production derivatives v1

Approved masters remain in `concepts/`, unchanged and verified against `core-quality-report.json` SHA-256 hashes. `public/characters/agent407/` contains six lossless 1400 × 1500 RGBA derivatives. The kneeling derivative v1 is sourced from the **approved kneeling-v2 master**; it is a production version, not a reversion to the superseded kneeling concept.

## Minimal cleanup

`scripts/prepare-sprites.py` uses existing Pillow, not regeneration or upscaling:

- Source alpha 0–16 becomes 0, removing documented near-transparent noise.
- Source alpha 250–255 becomes 255, removing unintended slight interior translucency.
- Intermediate alpha stays unchanged to retain the soft antialiased edge.
- RGB is preserved exactly wherever output alpha is nonzero; hidden RGB is zeroed to discard the latent black/glow matte.
- Original image pixels are copied onto a common canvas without scaling. Most poses receive offset (108, 86); cheer receives (109, 84) because its native dimensions differ slightly.

`production-v1.json` records source/output hashes, dimensions, offsets and silhouette bounds. The script asserts that each visible silhouette has at least 6% canvas clearance on every side, all surviving RGB values are unchanged, and source hashes remain intact. `production-review-v1.png` shows every cleaned pose on both cream and navy; the attached-prop sheet provides an additional compositing review. Changes are technical alpha/padding edits, not new character designs.

Anchors for head, mouth, screen-left hand, screen-right hand and foot pivot are measured in `src/sprites.ts`. They include the padding translation. The head point is a forehead attachment location; emotes use an explicit offset from it. Children inherit the same foot-origin transform as the image. Do not renormalize poses independently to their bounding boxes: that would alter apparent scale and break continuity.

```powershell
python scripts/prepare-sprites.py
npx remotion still scripts/accessory-review.tsx ProductionReview assets/characters/agent407/production-review-v1.png --frame=0
```

Pillow is required for preparation. Contact sheets are preview artifacts, never the sprite source. The appearance of these derivatives is ready for integration review; the approved source design remains the authority.
