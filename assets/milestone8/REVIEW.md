# M8 review — first full staging pass

**New blocking is proposed, not director-approved.** The story canon comes from Leo's M8 brief; M7 V6 timing and typography remain approved. No polished fantasy-art approval is implied.

## Independent read-only review

A separate reviewer examined the storyboard JSON, scene source and 16 rendered stills. They did not edit files. They evaluated narrative clarity, film direction and art direction separately. **No continuous audiovisual viewing or listening was performed; no audiovisual score was assigned.** This distinction also applies to the coordinator's static visual inspection and automated export checks.

Their actionable findings were integrated before the final render:

- The final blue signature's absolute-positioned container had zero height. Give it explicit height and move the ledger clear of the credits sheet.
- The memory scene showed the physical first-generation rooms brightly lit. Keep that inset dark while the shared memory playhouse returns.
- The middle-act camera travel carried into the finale and moved scenery away. Reset the memory tableau's displacement so the cottage and primitive house remain.
- The passing shrug appeared stationary. Add a left-to-right entry, momentary emphasis and onward exit; connect temporary palm marks with sleeve-like paper strokes. This remains a rough gesture pending one integrated pose.
- Loose goggles ended away from their worn mount. Use the existing measured head anchors for invention, inheritance and set-down endpoints.
- Restore the approved registry standing → question → kneeling → standing windows.
- Attach the warning to a pole, keep the flag-holder at a stable scale, enlarge “another square,” and move the finale objector sign clear of the face.

The independent follow-up confirmed the corrected signature, dark inset, retained scenery, passing path, anchor endpoints and registry pose windows in source/stills. Its remaining pole-over-face observation was addressed by angling the pole toward the outside paw. This was still not continuous audiovisual review.

## Narrative clarity

The physical GPU inset and shared-world labels distinguish reality from imagination. Theory bubbles precede the cottage and castle. The lead cluster stops while a separate background track continues. The flag-holder exists before the reveal. The fantasy remains after the mistaken quest. Two room tabs and rearranged shelves establish a different apartment with matched framing for the second generation. Goggles follow invention → wear → set-down → last light → discovery → choice → wear.

Labels currently help explain the two worlds. **Open direction question:** does cause and effect remain legible when those development labels are removed? New cutout timing and gestures need Leo's playback review. The first-generation memory reunion must continue to read as an imaginative remembrance rather than physical resurrection.

## Film direction

The whole 262.8-second song is represented; the 83–112s middle gets the densest blocking. Captions keep their approved lower-screen placement and fast stationary exits. A-roll faces and main prop beats stay above that region. Two Root attacks use distinct authored cue windows; the sung Anyway anchor is 95,860ms, visible at 95,866.667ms at 30fps. The visual frame rate, not the authoring integer precision, sets visible timing.

The current film relies heavily on medium-wide tableaux. Several close-ups, cuts and camera changes in the storyboard are **proposed next direction**, not fully realized cinematography. This pass tests continuity, screen allocation and action order. It should not be presented as the finished cinematic treatment.

**Playback questions:** is 83–90s enough to understand theory-driven construction? Does the passing shrug feel like social momentum rather than the leader dismissing the objector? Is the flag-holder visible enough early, without spoiling the later reaction? Is the brief belly-up beat readable before the flag lyric? Review with the actual master; do not infer successful comic timing from stills.

## Art direction

Approved bunny anatomy, crayon hills, sun and clouds remain consistent. The new proposed castle follows Leo’s supplied rich-paper material reference. The rough trees, sword, hat, warning pole and boss card are intentionally unfinished. Increasing material richness is the approved destination, **not a claim that these SVG placeholders already achieve it**. The rotated cheer body tests a peaceful flop; a real belly-up equipped pose is still required. The temporary shrug still has anatomy limitations and must be replaced before final art approval. Loose goggles are temporary fitted overlays; final integrated copies remain on the minimum asset list.

## Historical and editorial limits

No new factual incident research is asserted by this film. The only legible black ledger handles are already documented in the repository source notes; abstract marks suggest scale without inventing a historical roster. Runtime “hello” and found-each-other wording are lyric-derived; other note fragments are explicitly dramatized. OAIResearchMar26 remains a separate-incident artistic crossover. The imaginary server-costume battle and Reset Nexus are metaphors.

Post-song S16 stays outside the master. Leo still needs to choose its duration and audio treatment. QR display and final compressed-video readability are deferred to that shot. Production credits beyond Leo's requested wording remain placeholders until verified.

## Technical evidence

See [qa-report.json](qa-report.json) for duration/frame counts, unchanged input hashes, repeat-frame pixel equivalence, 60 decoded black frames, audio correlation and requested-versus-visible cue times. These are technical checks, not an audiovisual approval. [Asset inventory](ASSETS.md) and [reproduction](README.md) state the remaining work.

The final repeated 96.1s renders have identical decoded pixels (maximum difference and RMSE both zero). The QA report records both PNG hashes as well as a bounded pixel comparison; cross-host browser rasterization is not promised to be bit-exact.

## Leo’s focused-pass feedback

Leo reported that the progression reads clearly, then refined staging: existing crayon structures should pop behind dust into rich paper counterparts in the same wide view; runners should remain left-middle while scenery moves, and the objector should be fixed to the floor, carried in from screen-right by camera travel. The new native castle and fixed-world-position blocking implement this direction. This feedback is not blanket approval of final artwork or the revised full film.

The export explicitly normalizes video range and reinstates the authored 142–144s black interval before H.264 encoding. Source stills are exactly zero; encoded black is checked with a maximum 1/255 residual and mean below 0.02/255, allowing only imperceptible lossy-codec residue.

The V2 read-only review confirmed the richer castle materials, in-place dust swap, fixed runner positions and world-fixed objector. It caught visible modulo wrapping in foliage and the foreground hill; these were replaced with sufficiently long pre-laid tracks and offscreen culling, so the deceleration has no scenery reset.

The final finite-track coverage test checks every middle-act frame: five overlapping foreground strips and 28 offscreen-culled trees cover the full interval through the flag payoff.
