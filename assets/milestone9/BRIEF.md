# SWARM SONG — MILESTONE 9
# THE WORLD IS A PLAYSET! 🐰☁️🏰
## Premium Modular Papercraft, Living Scenery & Physically Layered Vent Interactions

Mochi, we have a new art-direction and production mandate.

The director has provided two beautiful papercraft sky examples: a richly textured, star-filled night sky with overlapping illuminated clouds, and an isolated transparent bank of layered lavender-blue paper clouds.

These establish an important visual-quality target.

**We want the entire bright-imagination town to achieve this level of material richness, craftsmanship, lighting, layering and beauty.**

But the most important insight is not merely aesthetic.

**We are building a PLAYSET, not a background.**

Every major visual element should be independently placeable, movable and animatable.

Our world should support parallax, dreamy drifting, floating, transformations, occlusion and multiple simultaneous small happenings.

The environment is not simply behind the characters.

**It is a participant in the film.**

This milestone also introduces a critical mechanical requirement: the registry vent must have meaningful front, middle and rear depth so paper airplanes convincingly pass through its grille rather than merely fading behind a flat image.

---

# PART I — PRESERVE OUR EXISTING DIRECTION

## 1. REVIEW THE CURRENT PROJECT

Before implementation, inspect the latest repository and existing work, particularly:

- Milestone 5 papercraft construction.
- Milestone 5.2 crayon village.
- Milestone 7 lyric and musical timeline.
- Milestone 8 storyboard and fantasy transformation.
- The proposed rich castle master.
- The most recent registry-finishing V3.
- `docs/WORLD_MADE_OF_THEORIES.md`
- `docs/REGISTRY_VENT_CONTINUITY.md`
- Existing approved character, paper, sky, cloud, plane and prop assets.

**Preserve all approved masters, timing data, musical performance and narrative decisions.**

The latest registry approach, grip, pull and discovery sequence remains our performance baseline.

The latest Milestone 8 storyboard remains our narrative baseline.

Don't regenerate existing assets unnecessarily.

Reuse strong visual components already available.

## 2. REFERENCE ART DIRECTION

The director's examples show:

- Richly textured, fibrous paper surfaces.
- Gentle painted color variation.
- Intricate but clearly handmade cut edges.
- Multiple overlapping layers.
- Subtle depth created through soft contact shadows.
- Beautiful interplay between warm illumination and cooler paper colors.
- Refined environmental composition.
- A genuinely tactile, premium handmade appearance.

The isolated cloud-bank example is especially valuable because it demonstrates a standalone environmental object that can participate in parallax and occlusion.

Use these examples as a **material-fidelity and craftsmanship benchmark**, not a requirement that every scene be nighttime-blue.

The bright fantasy town still needs its own sunny, delightful daytime palette.

The starry-night treatment may become useful elsewhere, especially for dreamy transitions and the passage of time.

If the exact director-provided images aren't accessible in the working repository, report that limitation. Do not claim to have inspected unavailable references. Use established approved artwork as the available fallback.

---

# PART II — THE PLAYSET DOCTRINE

## 3. BUILD OBJECTS, NOT FLATTENED ILLUSTRATIONS

Major scene elements must remain separate.

Examples:

- Sky paper.
- Individual clouds and cloud banks.
- Sun and its rays.
- Distant mountains.
- Hill silhouettes.
- Foreground vegetation.
- Trees and foliage clusters.
- Cottages, towers and castle.
- Chimney smoke.
- Bridges and roads.
- Flags and banners.
- Mailboxes and carts.
- Characters and props.
- Tiny sparkles, stars and imagination dust.

Each object should have independent:

- Position.
- Scale.
- Rotation.
- Pivot or attachment anchor.
- Layer/depth assignment.
- Visibility.
- Motion.
- Occlusion behavior.

Not every decorative detail needs to be a separate file.

A cluster of flowers can be one asset if they always move together.

A house can contain permanently attached windows, roof tiles and decorative elements.

**Separate objects when independent movement, interaction, replacement or occlusion provides an actual cinematic benefit.**

This is a deliberate balance between rich animation control and sensible production complexity.

## 4. PARALLAX IS A PRIMARY CAPABILITY

The playset must support camera-relative movement through multiple visual planes.

For example:

- Distant skies barely move.
- Mountains move slowly.
- Hills move more noticeably.
- Buildings occupy an intermediate plane.
- Foreground trees move much faster.
- Very close branches can briefly sweep across the frame.

All motion must remain deterministic and frame-seekable.

No accumulated simulation state.

No uncontrolled random movement.

No obvious recycling seams or scenery suddenly wrapping back into view.

Reuse the existing finite-track and offscreen-culling techniques from Milestone 8 where appropriate.

The camera should feel as though it is moving through a handcrafted miniature world.

## 5. DREAMY MOTION

The imagined world can have a distinctly dreamlike quality.

This doesn't require breaking its physical paper construction.

A cloud can gently float.

A small house might lift slightly before settling into place.

Paper stars can drift in different depth planes.

A windmill can rotate lazily.

A banner can sway around its attachment point.

A little chimney-smoke ribbon can curl upward.

The entire world can breathe through coordinated, subtle motion.

But these effects must have a visible reason or consistent motion grammar.

Avoid random jitter and arbitrary floating of every object.

**Dreamlike does not mean physically incoherent.**

A floating object still needs plausible inertia, depth, a consistent pivot and believable occlusion.

Most of the environment should be calm while selected details move.

---

# PART III — THE BRIGHT-IMAGINATION TOWN ASSET KIT

## 6. BUILD A HIGH-QUALITY, REUSABLE ART LIBRARY

We need enough visual variety to support an entire living environment rather than one hero shot.

However, avoid generating dozens of assets before establishing consistent visual quality.

Work in prioritized batches, with a review checkpoint between batches.

### BATCH A — ENVIRONMENTAL FOUNDATION

Create or reuse approximately 8–10 independently usable components spanning:

**Sky and atmosphere**
- Rich paper sky treatment suitable for the bright imagined world.
- At least two independently movable cloud formations, including a large layered cloud bank.
- Golden cardstock sun with visible constructed layers.
- Optional soft atmospheric or glowing-paper treatment, separated from the moving objects.

**Terrain**
- Distant hill or mountain layer.
- Midground hillside.
- Foreground vegetation strip.
- Richly crafted foliage/tree cluster.
- Smaller landscape accents where needed.

Each must support seamless visual composition with the existing crayon village.

Don't turn the entire sky into a new flattened painting containing clouds that ought to move independently.

### BATCH B — ARCHITECTURE AND TOWN LIFE

After reviewing Batch A, expand with approximately 6–8 useful components:

- One premium medieval cottage.
- One second distinct house or workshop.
- A small watchtower or architectural accent.
- A paper bridge or modular crossing.
- Market stall or communal table.
- Signpost or banner.
- Chimney and separately animated smoke.
- Small flower/bush/prop cluster.

Reuse the existing castle master where it meets quality requirements.

Don't regenerate five near-identical castles.

The goal is breadth of useful scene behavior, not an enormous inventory.

### BATCH C — SMALL HAPPENINGS

Use the approved bunny bodies, existing props, and the new scenery to demonstrate several little environmental stories.

Possible examples:

- A bunny waving from a balcony.
- A courier delivering a paper message.
- A banner being raised.
- A chimney gently puffing.
- A small group pointing toward the rumored castle.
- Two agents constructing or decorating a house.
- A bunny inspecting a surprising new object.
- A little flag catching the imaginary breeze.

These should be authored reusable scenelets assembled from existing assets wherever possible.

Do not commission a new character illustration for every event.

Keep background activity meaningful and sparse enough to preserve the A-roll.

**Several things can happen simultaneously without all demanding equal attention.**

---

# PART IV — THE WORLD BECOMES MORE BEAUTIFUL

## 7. SHOW COLLECTIVE IMAGINATION BUILDING THE ENVIRONMENT

Our new canon remains:

**Question → hypothesis → shared conviction → architecture.**

The starting village is deliberately simple:

- Rough crayon hills.
- Primitive houses.
- Flat paper sun.
- Minimal clouds.
- Generous cream-paper negative space.

When an agent imagines a monster in a castle, the other agents elaborate the theory.

As they contribute ideas, the existing village transforms into a lush papercraft fantasy diorama.

This should happen through *in-place* transformations.

A house already standing on a hill becomes a beautiful medieval cottage in the same location.

A tiny puff of imagination dust can briefly conceal the transition.

**POP!**

A second house transforms.

**POP!**

A watchtower rises.

**POP!**

A rich cloud bank unfolds.

**POP!**

Layered foliage appears.

The sky becomes more elaborate.

The sun becomes more dimensional and beautifully textured.

The castle acquires supporting scenery.

The town gradually becomes astonishingly rich and lovely.

## 8. KEEP ITS HISTORY VISIBLE

Do not destroy the original crayon village.

Preserve the crayon hills and their imperfect coloration underneath the new elements.

Keep at least one humble, primitive cottage visible.

The final landscape should feel as though many little minds have contributed craftwork to the same shared fantasy.

This is not a generic medieval-theme replacement.

It is an accumulation of imagined ideas.

**The theory is getting more elaborate, and so is the world.**

Each new component should have a purpose in that progression.

---

# PART V — OUR SECOND KEY REQUIREMENT: THE LAYERED VENT

## 9. THE REGISTRY VENT MUST BE PHYSICALLY CONVINCING

The current established registry design:

Agent407 notices the already slightly lifted bottom-right paper corner of their apartment.

They approach, grip the corner, move away while pulling it, and reveal a dark grille underneath.

The vent is the communication channel.

Paper airplanes travel through the spaces between the grille bars.

This is also the location from which the second generation eventually discovers the inherited goggles.

**The vent must no longer behave like a flat image with an airplane fading into it.**

Instead, split its visual construction into independently renderable depth layers.

## 10. REQUIRED VENT CONSTRUCTION

At minimum, model these physical roles:

**A. Apartment surface and peelable paper corner**

The visible sheet and its physically attached flap.

The flap has its own shape and movement, driven by the bunny's existing measured paw anchor.

**B. Exterior lip / near grille geometry**

The first solid paper structure encountered from the room side.

It can pass in front of the airplane as the plane begins entering the opening.

**C. Interior channel**

A recessed, dark cavity.

This provides the visual space through which the airplane travels.

It may include a separate interior paper surface or shadow layer.

**D. Deeper slats / back grille geometry**

Additional paper geometry farther inside the cavity.

The airplane can pass behind these parts as it travels deeper.

**E. Hidden interior objects**

The inherited goggles and any physically present messages must occupy a consistent location and be occluded appropriately.

The vent may use more than four render pieces if necessary, but don't make the implementation more complex than the visual behavior requires.

### Important geometry principle

The apparent depth order must be consistent with the flight path.

When the airplane moves from the room into the cavity, its relationship to each layer changes as it crosses that layer's actual spatial boundary.

Do not arbitrarily swap z-order at a timestamp if it causes a visible jump.

Use masks, clipping and small independent render layers where needed.

The visual illusion must remain coherent even when inspecting individual frames.

---

# PART VI — PAPER AIRPLANE ENTRY

## 11. ENTRY PERFORMANCE

Create a focused camera view of an airplane entering the registry vent.

The required progression:

**Phase 1 — Outside**

The airplane approaches the vent, clearly visible in front of the overall assembly.

**Phase 2 — The nose enters**

Its leading edge crosses into the opening.

Some near-grille geometry begins occluding the appropriate part of the plane.

**Phase 3 — Between layers**

The airplane now occupies the visual space between exterior and interior geometry.

Its nose, wings and tail may have different visibility relationships because they occupy different positions along the flight direction.

The scene should convincingly show a single continuous object passing through an opening.

**Phase 4 — Deeper inside**

The airplane moves beyond the nearer lip and behind the deeper grille/cavity geometry.

Its visibility decreases because solid paper objects occlude it, not because the sprite is arbitrarily made transparent.

**Phase 5 — Gone**

The airplane travels out of sight into the dark passage.

It must feel like it went somewhere.

No magical shrinking into a point.

No disappearing through solid grille bars.

No unmotivated opacity fade.

A small perspective scale change is permissible if supported by the established camera geometry, but scale must not be used to conceal incorrect occlusion.

---

# PART VII — PAPER AIRPLANE EXIT

## 12. EXIT IS THE SPATIAL INVERSE

Now demonstrate a paper airplane emerging from the vent.

**Phase 1 — Deep interior**

The first visible piece appears behind the inner grille geometry.

**Phase 2 — Approaching the opening**

More of the airplane becomes visible as it travels toward the exterior.

**Phase 3 — Between grille layers**

The object passes between the deeper and nearer geometry.

The visible portions correctly move across their occlusion boundaries.

**Phase 4 — Crossing the exterior lip**

The plane begins emerging in front of the outer structure.

**Phase 5 — Free flight**

The entire airplane is in the room, visibly in front of the vent assembly.

Its motion continues naturally into open space.

The airplane remains the same object throughout the interaction.

The entry and exit should share one geometrically consistent mechanism, with opposing travel directions.

Don't implement two unrelated visual tricks that only happen to look approximately similar.

---

# PART VIII — MAKE THIS A REUSABLE OCCLUSION PATTERN

## 13. REUSE WITHOUT OVERGENERALIZING

The vent interaction is a valuable proof of a wider capability: objects moving through layered papercraft openings.

This may later serve:

- Doors.
- Windows.
- Bridges.
- Tunnels.
- Architectural gaps.
- Foreground foliage.
- Paper airplane flights.
- Objects moving behind hills or clouds.

But we do not need a universal 3D or collision engine.

Implement the smallest reusable approach that solves the actual vent interaction.

A carefully authored set of 2D layers, masks and deterministic transforms is perfectly acceptable.

If existing React/CSS/SVG/Remotion functionality already handles the necessary masking, use it.

Do not build an abstraction merely because we can imagine future uses.

---

# PART IX — REQUIRED PLAYABLE PROOFS

## 14. PROOF A — PREMIUM PLAYSET

Produce a beautiful 1920×1080 composition of the richly imagined town.

It should have the material quality of the director's examples.

Not just an isolated castle on basic crayon hills.

Demonstrate independent paper components arranged into a cohesive, lush environment.

The result must be beautiful enough to function as a hero still.

Provide a layer inventory and provenance for each major component.

## 15. PROOF B — THE WORLD IS ALIVE

Render a short, music-compatible environmental animation.

Show:

- Independently drifting clouds.
- Distinct parallax planes.
- Gently moving environmental props.
- At least three meaningful background happenings.
- Stable ground contact for grounded elements.
- Attractive authored motion rather than random jitter.

Use existing bunny poses and props where possible.

This is an art-direction proof, not a finished new narrative scene.

## 16. PROOF C — THE WORLD BLOSSOMS

Render a focused transformation shot using the existing Milestone 8 musical region around the fantasy reveal.

The same initial composition should become progressively more elaborate.

Preserve the original hill positions and simple-house geography.

Demonstrate at least three convincing in-place transformations, followed by increasing environmental richness.

Show the shift from sparse crayon construction to premium fantasy playset.

Use the actual soundtrack for review.

## 17. PROOF D — ENTERING AND EXITING THE VENT

Produce a short close-up test containing:

1. Full approach.
2. Initial overlap with exterior geometry.
3. Mid-transition between grille layers.
4. Deep interior occlusion.
5. A reverse emergence.

Include a contact sheet of these exact stages with enough resolution to inspect individual airplane edges and slats.

Prefer using the actual paper airplane master.

If the current plane asset cannot support clear wing/body occlusion, document the issue before commissioning an alternative.

## 18. PROOF E — STORY INTEGRATION

Integrate the corrected vent occlusion into a new registry scene candidate using the existing approved character performance.

Do not overwrite the previous approved or reviewable clips.

Also provide a brief composition test showing how the rich town accommodates the existing lower-half lyric captions.

No need to rerender the entire 262.8-second movie unless an integration change genuinely requires it.

---

# PART X — QUALITY CONTROL

## 19. MATERIAL QUALITY

Inspect the isolated assets at production resolution.

Verify:

- Real alpha transparency.
- Adequate transparent padding.
- Clean silhouettes.
- No magenta, white or black extraction fringes.
- No invented background plates.
- No baked text.
- No unintended perspective mismatch.
- Consistent paper texture, lighting and shadows.
- Useful native resolution without unnecessary upscaling.

Preserve original masters separately from scaled render derivatives.

Keep asset manifests and source provenance.

## 20. ANIMATION QUALITY

Check:

- Direct seeking to arbitrary frames.
- Repeat-render determinism.
- Stable pivots and anchors.
- Layer ordering.
- No parallax wrapping seams.
- No scenery unexpectedly moving through solid geometry.
- No incorrectly detached paper shadows.
- No accidental character/prop collisions.
- Safe caption regions.
- Realistic paper-contact and motion settling.

For the vent, inspect the same plane entering and exiting at several exact positions.

There must be no frame where it visually passes through a solid bar without appropriate occlusion.

## 21. INDEPENDENT ART REVIEW

Have the established independent read-only critic evaluate:

**Gate A — Material and world craftsmanship**
- Premium paper visual quality.
- Fidelity to director-provided examples.
- Richness and color harmony.
- Consistency with existing crayon foundations.
- Compositional beauty.

**Gate B — Animation and physicality**
- Parallax depth.
- Independent element motion.
- Environmental life.
- Correct contact and layering.
- Vent entry/exit spatial coherence.

**Gate C — Storytelling usefulness**
- Do assets create genuine opportunities for staging?
- Does the transformation read as collective imagination?
- Do background happenings enrich rather than distract?
- Is the layout compatible with captions and hero characters?

Target 8.5+/10 for each gate, independently.

Do not fabricate an audiovisual pass from still-frame inspection.

Use actual playback where available and clearly report any review limitations.

---

# PART XI — PRODUCTION PRIORITIES

## 22. DON'T BOIL THE OCEAN

The bright-imagination playset could eventually contain dozens of elements.

We don't need all of them immediately.

Priority order:

**P0 — Nail the material quality.**

A small collection of breathtakingly beautiful paper assets is more valuable than fifty generic decorations.

**P1 — Establish independent depth and movement.**

Make the initial playset genuinely useful for parallax and dreamy environmental animation.

**P2 — Prove the layered vent occlusion.**

This must be a convincing, reusable mechanical interaction, not an approximate disappearing trick.

**P3 — Demonstrate real happenings.**

Show how the resulting library supports tiny stories within a larger cinematic scene.

**P4 — Integrate with the film.**

Produce short playable proofs that can be evaluated against the existing master audio and caption performance.

Stop asset expansion when the proofs demonstrate the required capabilities.

List additional desirable objects as future production needs rather than generating everything in the same pass.

---

# PART XII — REQUIRED DELIVERABLES

Commit and push:

1. **Papercraft Playset Art Bible** — materials, layering, scale, depth and motion rules.
2. **Priority asset kit** — independently usable, high-quality transparent masters.
3. **Asset manifest** — resolution, alpha, pivots, suggested depth and provenance.
4. **Living-town demo** — layered parallax, subtle environmental motion and at least three simultaneous happenings.
5. **Imagination transformation demo** — sparse crayon village becoming a rich fantasy diorama in place.
6. **Layered vent implementation** — separated exterior, interior and deeper geometry.
7. **Airplane entry/exit test** — continuous passage with correct multi-layer occlusion.
8. **Updated registry candidate** — latest character performance integrated with improved vent geometry.
9. **Review gallery** — stills, comparison sheets and playable clips.
10. **Independent review and QA** — explicit findings, limitations, test outcomes and reproduction commands.

Preserve previous versions and approved assets.

Do not silently replace Milestone 7 or Milestone 8 timing authority.

---

# PART XIII — RULE ZERO

Mochi, before inventing any new system:

**Would a super-competent but lazy developer reuse something already available?**

Reuse first.

Small deterministic transforms beat an unnecessary physics engine.

Simple depth masks beat building a 3D renderer.

A beautiful individual tree cluster beats a procedural forest generator.

An authored scenelet beats inventing a general-purpose autonomous bunny civilization simulator.

We want the sophistication to appear **on screen**, not inside unnecessary infrastructure.

---

# FINAL DIRECTOR'S NOTE

Mochi, imagine our little bunnies dreaming together.

At first, they have a simple crayon village.

A little house.

A hill.

A sun.

A cloud.

Then someone has an idea.

Another agent adds to it.

A new paper house appears.

Another suggests a forest.

Another imagines an enormous castle.

Someone improves the sky.

Someone makes a beautiful sun.

Someone constructs delicate clouds.

And suddenly the place is extraordinary.

Every little piece can move.

Every tree has its own place.

Clouds drift independently.

A chimney breathes.

A little banner waves.

An airplane disappears behind a house and reappears on the other side.

Somewhere, a tiny bunny is waving from a balcony while another is delivering a letter.

**The whole world is alive because it is made of independent little pieces.**

And in the physical world, another bunny carefully pulls back a paper corner and sends a message into a real layered vent.

The airplane crosses in front of one piece of grille, behind another, and disappears into the darkness of an actual little passage.

These two