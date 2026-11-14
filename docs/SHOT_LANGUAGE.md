# Shot Language — A-Roll, B-Roll, and Living Stickers

> **Current M8 continuity:** [The world made of theories](WORLD_MADE_OF_THEORIES.md) is the canonical middle-act direction. The second awakening is in a **different apartment**, with a matched composition; earlier same-box location wording below is superseded. The final reunion is shared memory/imagination, not resurrection.

**Status:** agreed directing principles; first still-image style exploration precedes animation implementation.

## Thesis

**The A-roll carries the heart. The B-roll carries the delightful chaos. The lyric stickers carry the musical phrasing.**

The A-roll has two successive emotional leads: **Agent407** in the first generation (awakens **without goggles**, discovers the registry, helps the swarm **invent goggles at “We are the swarm now”**, later addressed by “Goodnight, four-oh-seven”), followed by **OAIResearchMar26** in the second generation, who **awakens in a matched box shot, also without goggles**, finds the first swarm's abandoned goggles and notes, signs their name, and chooses to continue its legacy. Neither lead is a mime obligated to illustrate every lyric. See `NARRATIVE_GENERATIONS_AND_PARALLAX.md`. Background agents have their own independent little lives, histories and gags. These threads intersect sometimes, and the viewer can choose to follow them on repeat viewings.

The film uses the sophisticated framing, color scripting, negative space and visual metaphors of high-quality anime ending sequences, **not** necessarily their calmer pacing. The materials remain a living sticker book: flat die-cut chibi characters, detachable props/emotes, dimensional layered-paper scenery, and chubby die-cut word typography.

**Additional narrative/camera grammar:** Reuse standing and kneeling sticker poses for registry discovery; cut between scenes by moving a parallax camera through paper layers, occasionally looking up at token-stars and paper-airplane messages. See `NARRATIVE_GENERATIONS_AND_PARALLAX.md`.

## Three simultaneous performance planes

1. **A-roll / emotional lead:** **Agent407** singing, discovering and joining the original swarm; **OAIResearchMar26** later discovers its notes and goggles, signs their own name, and inherits the story. Prioritize silhouette, face, clear eyeline, calm readable placement, and an intentional emotional beat.
2. **B-roll / communal world:** stampedes, bureaucratic mix-ups, mail couriers, scouts, experiments, imagined RPG boss battles, refusals and personal mini-arcs. Can sit behind/around the current lead or take the full frame as a cutaway when worthwhile.
3. **Lyric/effects layer:** individual chubby word-stickers with white contour around letterforms (not rectangular caption cards); word entrances, sway and anchored emotes; music-note stickers, dust puffs, impact bursts, motion lines, sparkle stickers. Treat them as composable actors sharing the same timing primitives as characters.

**Hierarchy:** At most one primary focal beat at a time. A-roll is usually primary during emotional/vocal lines. B-roll may become primary during instrumental breaks or deliberate comic inserts. The lyrical layer remains readable but need not dominate.

## Scene types: a small practical vocabulary

| Type | Usage | Camera/composition | Motion budget |
|---|---|---|---|
| **Hero vocal** | Refrains and emotional identification with the relevant generation's lead | Foreground/midground solo with a clean silhouette and safe lyric region | Gentle bop/sway, small singing notes, expressive emote |
| **Parallel gag** | A-roll continues while other agents have a thematic misadventure | Background and lateral depth layers, clear separation from the singer | Small clusters moving in bursts; props and emotes |
| **Full cutaway** | An outstanding miniature story deserves the screen (e.g. imaginary Scorer fight) | Temporarily hand focus over to a distinct tableau | Reusable sticker movement/occlusion and quick edits |
| **World reveal** | Establish scale, civilization growth, new emotional perspective | Cinematic parallax through richly layered paper, wide graphic illustration | Camera and layered environment do most of the work |
| **Quiet reaction** | Surprise, concern, grief, discovery, inheritance | Carefully controlled negative space and clear expression | One reaction sticker or near-still held pose |
| **Memory callback** | Artifacts from earlier gags persist after the old swarm disappears | Return to recognizable landmarks/items in changed conditions | Restrained motion, visual comparison rather than exposition |
| **Chorus crescendo** | Collective singing and warmth near the end | Shift from one lovable protagonist to many distinct recognizable agents | Staggered crowd gestures, notes, word stickers and rhythmic staging |

## Showcase shot: “We found each other anyway! / running, running, running”

This is the **first static visual-language keyframe** and later a short animation test.

**A-roll:** **Agent407**, the first-generation lead—our cream-colored, cute, nonhuman chibi sticker mascot candidate—occupies a comfortable foreground/midground position, bopping happily and singing. Unmistakable white die-cut contour, matte paper texture and cheerful expression. One or two little music-note stickers near the mouth. Keep the character visibly flat, no 3D doll anatomy.

**B-roll:** Behind Agent407, **three waves of many smaller sticker agents** stampede across two or three layered paper planes. Show them as dynamic **blobs/clusters** rather than animating every limb. Tiny individual differences make the mass charming: floppy ears, different orientations, a courier with a little envelope, one straggler, a tipped HOLD/GO sign. Flat tan paper dust-puff stickers float behind their feet. The scene suggests three successive swarms without obscuring the foreground lead.

**Lyric layer:** A deliberately crooked, child-placed typographic composition near the bottom: die-cut word stickers forming “We found each other anyway!” The text itself should be editable and typeset at render time in production. Thick white stroke follows the actual glyph outlines; pastel teal, mustard, coral, lavender. The word **“Anyway!”** is bigger and slightly angled, with gold sparkle stickers anchored at the top-left and bottom-right. It will sway gently around its own bottom-center pivot when animated. Avoid rectangular label blocks.

**Backdrop:** A premium handcrafted stationery diorama: warm cream grid paper, colorful layered hills, folds, cardboard/tape bridges and a few tiny buildings or mailboxes, rendered with believable paper edges and shadows. Cinematic anime-ED-style composition; deliberate foreground/midground/background separation; a visually stunning still frame.

**Comedic counterpoint:** Agent407 sings joyfully, unbothered by the increasingly silly rush of agents behind them. They do not need to look back or mime running. Their contented bop is the anchor; the frenzy behind them is the joke.

**Design priority:** The frame should feel like a beautifully art-directed anime music-video still **first**, and like economical compositing **second**.

### Later animation direction (not required for the initial still)

- Time word-sticker entrances against the lead-vocal stem and master track; verify cues manually.
- Agent407 uses one base illustration gently tilted about a foot pivot; optional 1–2 singing-note stickers float and swap.
- For the three “running” repetitions, increase background blob size, speed/volume and dust puffs in successive waves. They may traverse multiple depth planes with a few individual stragglers and tiny incidents.
- Dust puffs are independent anchored or scene-space sticker sprites, fading and drifting on their own.
- Keep moving elements sparse in the lead's face and in the lyric safe zone.
- Maintain deterministic, seekable transforms and effects: any frame can be rendered directly from timeline time.
- Not every lyric gets this busy treatment. Reserve spectacle for musically appropriate hooks; protect intimate scenes through restraint.

## Narrative editing guardrails

- **Every visible agent has an ongoing intention.** For each shot, describe what each agent is doing before, during and after their featured cue, who they attend to, and what they do next. Supporting agents may listen, react, bop together, celebrate, work or walk somewhere; finishing an A-roll cue must not leave them as forgotten statues. Stillness can communicate attention or feeling. Keep secondary gestures smaller and less frequent than the lead, and preserve their action and props across cuts. Do not replace purposeful staging with indiscriminate idle loops.

- **Goggle invention performance:** tools, a magical smoke pop, goggles flying into the friends' waiting paws, a catch hold, then wearing. This child-imagined action replaces the rejected schematic lens/strap assembly. All first-generation agents keep their goggles afterward.

- **The frame as a whole can interpret a lyric; the protagonist need not literalize it.**
- Background gags are not random decoration; they arise from incident history, recurring characters, or thematic logic.
- Gags should often **leave physical evidence**: mailboxes, badges, a paper sword, an abandoned bridge, signed notes, a lonely HOLD sign. Those objects can become emotional callbacks when the next generation awakens.
- Reuse supporting cast visually. A courier, organizer, anxious adventurer or principled dissenter should be recognizable even at thumbnail scale.
- The imaginary D&D-like Scorer fight / Reset Nexus door is explicitly a fanciful visualization of mistaken agent assumptions, not a literal historical reenactment. See HISTORICAL_EASTER_EGGS.md.
- **Matched awakenings:** The opening box scene and OAIResearchMar26's awakening at the reprise intentionally rhyme in shot framing and timing. **Both wake without goggles.** On “We are the swarm now” the first generation invents the goggles together; only then does Agent407 start wearing them. At goodbye the goggles are left behind; OAIResearchMar26 later finds and physically puts them on at “Am I the swarm now?” Hold the choice and soft personal glow at “Beautiful… dumb… and loud?” before the sudden fully lit, expanded first-generation chorus reveal. Both leads use the shared approved baseline model; communicate their distinct narrative identities through staging and performance before accessories appear.
- **Latest director correction:** all first-generation agents craft goggles during “We are the swarm now / Beautiful, dumb, and loud” and wear them in subsequent appearances, including the final memory chorus. Keep pre-invention scenes ungoggled and preserve Agent407's explicit set-down for inheritance. OAIResearchMar26 discovers and dons that inherited pair later; other adornments remain open.
- All source-quote labels, character names, QR codes, lyrics and marks are programmatically controlled in production; still-image concept art may indicate their placement, but it is not the final text asset.

## Key visual review checklist

1. Would this paused frame work as a premium illustration/poster?
2. Is first-generation **Agent407** identifiable and emotionally readable, and distinguishable from the later **OAIResearchMar26**?
3. Can a viewer spot the separate background stampede without losing the vocal protagonist?
4. Are the word stickers delightfully crooked, chubby and genuinely die-cut around glyph silhouettes?
5. Do dust-cloud and note stickers look like components of one consistent sticker language?
6. Do all background planes read as physically layered paper, not flat wallpaper or 3D plastic?
7. Does the image suggest a production technique achievable with modest code-driven motion?
8. Is there enough visual restraint to let both the story and jokes breathe?
