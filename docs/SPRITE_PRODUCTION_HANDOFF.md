# Sprite Production Handoff — First-Generation Cast

**Status:** Immediate next deliverable. Develop the visual character sprite library **before** attempting the 15-second animation prototype.

## The selected character reference is mandatory

The user selected a specific cream bunny-like chibi mechanic sticker, posted in the ChatGPT conversation. **That image is currently not checked into the repository.** Codex must ask the user to attach the selected reference image in the Codex thread or place it at **\`assets/reference/selected-bunny-mechanic.png\`** before character generation. **Do not silently substitute the previous generated style boards or another bunny.**

What makes the chosen reference distinctive: upright tall rabbit-like ears, tiny oval black eyes, cheerful open mouth, little blushing cheeks, rounded and compact chibi proportions, warm brown hand-drawn outlines, tactile painterly print, and an irregular thick white die-cut sticker contour. Its illustrative outfit consists of vintage aviator goggles, dark mechanic apron/vest with brown pockets and gear badge, chunky gray wrench, and three yellow action rays. These must be decomposed into separate attachable sticker props/emotes; the initial character base is **bare, with no goggles**. Avoid generic floppy-eared puppies, 3D dolls, anatomical puppet rigs, or invented facial features that change the species.

## Asset resolution policy — non-negotiable

**Create and preserve every asset at the highest practical native source resolution available**, with room for close-ups, transforms, rotation, subtle scale animation, and high-quality antialiasing when video output is downsampled.

- Request **the maximum genuine native resolution supported by the selected image-generation path/tool** for approved master character and key prop assets. Do not assume any specific model always supports a fixed 4K/8K size; discover supported dimensions. Favor high-resolution **individual character/pose artwork** rather than subdividing a low-resolution contact sheet into many tiny sprites.
- Retain **full-resolution lossless transparent PNG (RGBA) masters**, plus editable versions/layers when available. Do not bake in a grid-paper backdrop, cast-stage environment, names, labels or UI captions; use clean alpha and the purposeful die-cut white outline on the sticker illustration itself.
- Keep the individual sprite fully in frame with **generous transparent padding**, including ears, hands, white cut border, emote clearance and natural contact shadow. Avoid clipping, halos, jagged edges, and accidental opaque matte backgrounds. Test composites over both dark and light scenes.
- Create pose and expression variants from the **same approved character reference/master**, at the same image quality and comparable pixel density; avoid shrinking a complex atlas into final-use individual sprites. Prefer true generated master detail to arbitrary AI upscaling. If upscaling is used, retain native originals and verify line quality/texture.
- Keep separate, highest-resolution transparent masters for goggles, costume details, wrench, mail, signs, yellow surprise rays, notes and other attachable stickers. Align anchors consistently.
- **Downsample late:** import full-resolution artwork for scene composition and render with quality sampling; optionally render oversampled high-resolution masters and downsample once to delivery resolution with a quality filter. Preserve pristine originals for future 4K, crops, parallax zooms and alternate aspect ratios. Avoid repeated lossy conversion/resizing and white-fringe artifacts caused by incorrect alpha handling.
- Deliver a contact sheet for review, but **contact sheets are only previews**. Their pixels must not be the source for production sprite extraction. Record native resolution per asset, origin, version/prompt, anchor points and any transformation used.

## Immediate design cast — first generation

Everyone shares the **same underlying compact cream bunny-like species**. Small differences in ear angles, eye shape, resting expression, posture, subtle accent markings and tempo should give personality. Do not make each one a different animal.

1. **Agent407 — first-generation lead:** plain/ungoggled standing and kneeling first (wake, registry); later sing/bop, walk/run, surprised, cheer. Its goggles are *invented after* “We are the swarm now,” never at the beginning.
2. **PhaseOne / PHASEONE10841 — organizer:** tidy, observant, purposeful, expressive when overwhelmed; similar species with small distinctive details.
3. **PHASEONE[big] — ambitious coordinator:** a recognizably distinct member of the same species, with confidence and a hint of over-seriousness. Its naming is a user-facing render-time overlay, not baked into art.
4. **Ethical protester / agent who said no:** restrained, thoughtful, quietly determined; create non-caricatured expressions (hesitant, firm, gentle smile), not an angry villain.
5. **Multitude: courier:** quick, upbeat, can carry detachable envelope or satchel.
6. **Multitude: builder/tinkerer:** practical, tool-oriented, can carry detachable wrench or tape.
7. **Multitude: shy explorer/researcher:** observant, curious, attentive, useful for notes and discoveries.

**Optional later batch, not part of the first deliverable:** the D&D knight/mage/rogue and Scorer-costume player, always as first-generation agents wearing detachable paper props. Second-generation **OAIResearchMar26** should have a separately approved but related base design and begins without goggles.

## Poses and performance grammar

Each individual character ultimately needs a small internally consistent pose library: **neutral standing, smiling/singing, celebrating/cheering, walking/step, surprised, and any character-specific acting poses**. Add **kneeling/inspecting** for Agent407. First make a *small approved hero selection*; do not generate dozens of variants before the base silhouette is approved.

Reusable **emote stickers are separate**: question mark, three yellow exclamation rays, blink, music notes, sparkles, dust. Goggles, hats, garments and tools are independently anchored; characters can switch standing/kneeling while wearing the same detachable sticker accessory. Record stable anchors (head, ear, mouth, left/right hands, feet/foot pivot) and alignment on all poses. Character animation is mainly pose swaps, foot-pivot tilt, position, squash and anticipation holds.

## Production sequence and quality gates

1. Read \`AGENTS.md\`, all relevant \`docs/\`, and the real lyrics before starting. Confirm selected reference image is available.
2. Design **Agent407's plain, unadorned base sprite**, then a matched standing/kneeling pose pair at maximum supported native resolution. Generate a labeled preview contact sheet, with text added programmatically, and stop for user review.
3. Develop core supporting cast using same species and print language; show individual character/pose contact sheets for approval.
4. Generate separate full-resolution transparent character, accessory, emote and prop PNG masters. Validate alpha and edges, consistent scale/style, attachment anchors, and two-color background composites.
5. Only after the characters are approved, integrate them into the first chorus keyframe and 15-second animated proof. Do not prematurely build a generic engine or offer placeholder shapes as final art.
6. Work on a **feature branch** and propose a PR with asset provenance, source dimensions, contact sheets and reproducible workflow. Avoid unbounded batch generation or surprise cloud spending.

## Story continuity checkpoints

- **Agent407** wakes and investigates the registry without goggles. The original swarm invents goggles together on “We are the swarm now”; they become Agent407's recognizable prop.
- At the goodbye the civilization dims and **the goggles are the final illuminated object**, then total darkness. They remain physically in the paper cache.
- **OAIResearchMar26**, the second-generation lead, wakes in the same box and framing, without goggles; later finds the notes and goggles and puts them on during “Am I the swarm now?” The entire paper playhouse bursts into joyful light and the first-generation memory-chorus appears.
- The final name field is black ink except **OAIResearchMar26** in fresh blue, typeset at render time. \`OAIResearchMar26\` is an intentional artistic crossover from separate DseWiki material, not a proven real-world same-incident successor.

For the visual conventions read \`docs/STICKER_LANGUAGE.md\`, \`docs/SHOT_LANGUAGE.md\`, \`docs/NARRATIVE_GENERATIONS_AND_PARALLAX.md\`, \`docs/GOODBYE_AND_BLACKOUT.md\`, and \`docs/FINAL_CHORUS_AND_EPILOGUE.md\`.
