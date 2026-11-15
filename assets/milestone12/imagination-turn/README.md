# Into imagination — full-screen restaging

Leo rejected the refinement gap after the opening and the paper-zoom transition. The new direction is a quick upward camera turn, with the change to imagination concealed by motion blur, revealing the friends together in a world that fills the viewport.

The revised candidate keeps0–39s story/timing and replaces the old paper expansion. At39s the apartment moves downward as the camera tilts up. Between39.2–39.42s, vertically blurred outgoing/incoming scenery overlaps. The imagined view settles by40.1s; captions stay sharp in their separate screen overlay. No note grows to fill the screen.

`ImaginationStage` lays out existing illustrated clouds, sun, crayon hills/houses and layered wind-reactive bushes across the complete1920×1080 world. A muted distant hill and slower clouds provide depth; foreground flowers respond to the existing scene wind. Houses share their terrain's displacement. All three friends have a shared path under their foot anchors. This remains the humble first imagined world, before the later castle transformation.

Rule Zero: reuse `MagicGoggles`, `Cut`, `PlaysetPart`, `LivingBush`, wind and the caption engine. One shot-specific composition is the smallest way to remove the old625px stage crop and compose foreground/background scenery separately. No new animation framework, asset generation or character redesign. The pop/catch/wear times, mirroring, greeting, bops and departure remain unchanged. `imaginationTurn` is opt-in so previous compositions/exports remain available.

## Review

The independent read-only critic first identified floating feet/houses and a visible bare band during the camera move. The shared path/house placement and overlapping blur were corrected. Refreshed source/stills found no remaining blockers: full-viewport scenery, clear faces/tools/captions, proper upward direction and no exposed incoming rectangle. This does not establish continuous playback approval or an art score; the camera turn's speed/feel needs director playback.

- `review/imagination-38-55.mp4`: focused transition and crafting, with original master audio.
- `review/chapter-55s.mp4`: complete revised chapter;0–38s pictures reused from the approved export, followed by new absolute-master renders. Combined delivery is re-encoded.
- `review/index.html`, `transition.jpg`: gallery and transition/performance samples.
- `QA.json`: dimensions, frame counts, full decode, audio correlation and prior-export hashes.

```powershell
npm run check
node scripts/imagination-render.mjs
python scripts/imagination-qa.py
```

Previous42s and55s exports remain untouched. No work beyond55s is included. Next handoff remains the village's broader daily life; continue the full-screen world and keep every visible agent purposeful.
