# Every visible agent has a purpose

## Captions over rich scenes

Leo approved bottom captions backed by a transparent black gradient spanning the full viewport, above all scenery including side buildings. Apply this treatment when revising other scenes: keep environmental lighting and background performances intact, and fade the contrast layer with visible lyrics. Scale or position the words independently from the full-width gradient. Check each composition for readability and clear faces; the gradient is not a guarantee for arbitrary text colors or placements. The approved opening example is `assets/milestone11/morning-captions/`.

The existing `Song` caption renderer owns this capability: `<Song captionsOnly layoutOverride="lower-center" bottomGradient captionScale={.78}/>` mounted in an untransformed full-viewport overlay above the scene. `bottomGradient` follows actual word visibility and the selected animation strategy; `captionScale` affects words only. Defaults preserve existing scene renders. Reuse this renderer for future shots instead of duplicating lyric timing or gradient layers in scene code.

Leo's mandate: every agent has something to do, including background residents and members of a group. Do not leave supporting characters in unattended standing/idle states after their featured beat. This applies across the film, not just the opening.

Author a continuous action for each visible character: waking, reading, preparing coffee, cleaning, carrying a message, reacting to someone, travelling to a destination. Rest, a thoughtful pause and sleep can be deliberate actions; a generic bob alone does not replace purpose. Stagger starts and holds. Keep actions natural and cute, with readable anticipation, handling and follow-through. Shared anatomy does not imply synchronized timing.

For the opening, the elevated city approach was explicitly approved (PERFECT). Preserve the camera and the city framing. The new performance candidate gives the protagonist a wake, yawn, stretch, task-list pickup and ellipsis reading beat; the upper neighbor checks news, the lower prepares coffee then sweeps. All eight rooms have explicit routines. See `assets/milestone11/morning-routines/README.md`.

The opening implementation does not retroactively claim that all existing full-film shots have been reworked. Apply this mandate whenever those shots are revised, and retain a per-character action ledger in each new proof.

## Everything is a game item

Props remain visible at their authored resting positions until collected. A pickup gently launches the same sticker through an arc into the agent's attachment point; after catching it, the item follows the agent, including facing and rotation. Returning an item reverses that ownership visibly. Do not spawn a held prop while leaving a duplicate in the world. An equipped pose may replace the loose sticker at the catch, with matching placement.

`src/item-actions.ts` provides `pickAt` (rest/flight/held) and `attachItem` (scaled, rotated, mirrored mounts). The morning mug, task list, news, broom and letter use it. This is deterministic master-time interpolation, with item-specific height, duration and turn; there is no inventory system or simulation clock. A changed facing turns continuously through an edge-on sticker during flight; the renderer uses the returned signed `facing` scale. A goggle pickup can target a hand and then a head mount using the same functions. Existing approved goggle choreography is preserved, not silently migrated.

Rule Zero: the concrete shots are the morning mug/table handoff and task-list pickup. Existing `MagicGoggles`, `attachmentPoint` and ramp-based blocking already establish arcing flight and local mounts. A small pure interpolation helper replaces repeated ad hoc paths; no framework is introduced. Tests cover rest/catch endpoints and mirrored mounts; rendered review checks actual sprite contact and visibility.
