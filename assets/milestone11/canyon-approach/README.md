# A — elevated approach to the facing apartment

Focused 0–20s candidate on the canonical master clock, 1080p / 30fps. Director selected `density-references-v1/A-enclosed-canyon.png`, then refined the approach to a drone-like view at mid-building altitude: only buildings, no visible ground. Advance toward the central facing apartment, then open its shroud. The earlier C proof remains unchanged under `canyon-proof/review/`.

Open `review/canyon-opening-20s.mp4` or `review/index.html`. This is a candidate for director playback, not full-film adoption.

## Composition and motion

Three new illustrative assets: two connected side rows with varied terracotta/sage/indigo/plum buildings and physically attached sidewalks/copper circuit edges; one dense blue-hazed rear city plate with no sky or horizon. Exact prompts, native images and SHA-256 manifest accompany the proof. Native images are copied unchanged into `public/milestone11/canyon-approach/`.

Each side row is a rigid card. One shared forward-travel value drives depth-dependent perspective scales around (960,470). Near rows expand outward faster; the facing building remains centered and grows toward its selected floor. The native assets retain their attached foundations, but all foundations and pavement are below the viewport in this elevated staging. The broad lane is not rendered. Facing neighbors share the hero transform; the distant blue-hazed city moves more slowly. The frame is filled by architecture, without a horizon or exposed ground.

The original eight-storey facade, fifth-floor protagonist, static room plate, live sleeping/waking performance, title and caption clock are reused. The shroud still slides as one piece. Blue-hazed neighboring architecture remains around the full-screen interior.

This is economical 2.5D staging: the illustrated rows contain their own baked perspective and the distant city is one plate. Playback should assess the sense of forward travel, side-row passage and the accelerated arrival. No numerical still-review score stands in for that judgment.

## Reproduce

```
npm run check
node scripts/canyon-render.mjs --approach --stills --video
python scripts/canyon-qa.py --approach
```

The old `Canyon` composition remains the default; the `Approach` composition enables the new layout. No new dependency, animation framework or character master. The room cache can be rebuilt with `--room` if needed.

## Provenance

Generated with the built-in Codex image-generation tool, using approved density reference A as material/composition authority. `prompts.json` records the exact instructions. No extracted opaque backgrounds or external stock. Existing room, sprite, font and soundtrack rights/provenance remain those of the prior milestone packages. This production does not assert a new license for the existing soundtrack.
