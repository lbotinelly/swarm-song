# Bottom captions with a soft gradient

Leo approved the full-width treatment as “Much better,” noting that it permits rich scenery while keeping captions legible. Preserve this contrast approach for later scene revisions.

Leo approved the morning-focus camera and requested bottom captions. His latest refinement replaces apartment darkening with a transparent black gradient behind the lyrics whenever they are present. The apartment retains its approved lighting and activity.

This candidate centers the existing word stickers at the bottom (0.78 scale, bottom-center origin). A full-width screen-space black gradient is transparent through the upper 58%, reaches 65% opacity at 78% height, and 90% opacity at the bottom. Its overall opacity follows the existing word opacity, including the 100ms entrance and 150ms exit. Overlapping phrases share one gradient; no captions means no gradient. The protagonist, city, approved 14-second push-in and lyric timing remain unchanged.

No new art or animation framework. Native asset provenance is in `../morning-routines/`. Prior approved movies are preserved; QA checks 49 protected input hashes. Existing 50 tests pass. Review samples include the start and end of the push-in; motion remains for director playback.

Per Leo's follow-up, this is now part of the existing caption engine (`src/Song.tsx`), exposed as `bottomGradient` and `captionScale`. The opening only selects the treatment; it no longer imports lyric data or implements its own opacity calculations. Render the caption engine above the world at full viewport size, and let its internal word layer handle scaling. Other existing scenes retain their previous default behavior until revised.

Reproduce:

```
npm run check
node scripts/canyon-render.mjs --captions --stills --video
python scripts/canyon-qa.py --captions
```

The gradient and words live in a top-level isolated viewport overlay above every building. Only the words are scaled. Rendered-pixel QA measures matching attenuation at both screen edges and both side-building columns, and confirms a caption-free frame exactly matches the approved lighting. Independent static review found no caption/lead overlap or readability blocker; full-width verification was performed after the final layering refinement.
