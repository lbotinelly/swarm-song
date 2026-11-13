# Swarm Song — Sticker visual language & performance decisions

> **Current M8 continuity:** [The world made of theories](WORLD_MADE_OF_THEORIES.md) is the canonical middle-act direction. The second awakening is in a **different apartment**, with a matched composition; earlier same-box location wording below is superseded. The final reunion is shared memory/imagination, not resurrection.

**Status:** creative direction agreed in conversation, not a finalized implementation spec. Keep experiments small and reversible.

## One material, many roles

Everything that performs on screen can be a **sticker**: an agent character, word, musical note, expression, sparkle, hat, tool, insignia, note, or prop. All share a consistent handmade visual language: a die-cut silhouette, tactile print/paper texture, controlled white edging where appropriate, and soft contact shadows. The larger world is made of richly layered paper dioramas with parallax. Aim for the composition and visual sophistication of premium anime ending sequences **without inheriting their typically slow pacing**.

The important unification is **placement + timing = performance**. A beautiful illustrated asset should not require conventional frame-by-frame character animation to feel alive.

## Character performance

- Base agents are original **non-human, very cute, expressive, flat 2D chibi sticker creatures**. The current leading visual reference is a small cream bunny-like mechanic with generous ears, rosy cheeks and a charming minimalist face. This is a promising *direction*, not yet a locked canonical species or design.
- Separate the base character from modular **wearables, hand-held tools, and emote stickers**. The goggles, wrench, clothing, and yellow action rays seen on the reference mechanic can all become independently renderable assets.
- Name local attachment anchors such as **head, ear/upper-head emote, face/mouth, left hand, right hand, chest, back, and foot pivot**. An attached sticker inherits the parent's placement/rotation while retaining its own animation.
- **Walking** can use a *single character image*: rotate around the foot pivot alternately from roughly **-20° to +20°** as the character is translated through the scene. The pivot and placement produce the gait; add small optional offsets/steps as needed. Think economical South Park-like cutout performance, not anatomical realism.
- Emotes can run while other actions run. **Surprise**: three yellow action-ray stickers gently blink near the head. **Singing**: two interchangeable musical-note stickers appear near the mouth, switch positions or drift upward. **Excitement**: sparkle/ray stickers pulse. **Idle**: tiny tilt/hold.
- Separate **ongoing loops** (walking, singing, thinking, blinking) from **one-shot events** (discover, react, pick up, attach, detach, drop, hand over). Give each character recognizable personality through scale, rhythm, anticipation and pauses, not through excessive animation.
- Make actions declarative, composable, deterministic, and frame-seekable: rendering frame N must not require simulating all previous frames. Per-character timing and seeded variation may create individuality without unstable renders.

## Current lyric direction — M7

**Approved font direction (November 13, 2026):** Leo approved **Finger Paint** for general lyrics and **Bitcount Single** for agent-message B-roll after reviewing the actual-font proof. Finger Paint should use a lighter white contour and restrained added texture so its handmade letterforms stay clear. Bitcount Single belongs on plain paper at a generous size and substantial weight, without outlining each dot. Bundle the font files locally with their SIL OFL notices; reuse runtime text rendering. The V3 caption test implements these fonts with locally bundled files and preserves the approved V2 timing. The previous V2 film remains available.

**The phrase arrives. The words perform.** Complete short phrases become readable ahead of singing; individual words receive selective emphasis. Incoming phrases land above the old arrangement. Following Leo’s V1 playback review, the old words now fade quickly **in place**, without exit sliding or rotation. Default placement is the **bottom half**, with a stable bottom caption baseline; central hero arrangements are an optional authored exception. Reduce pre-roll after long vocal pauses. Read-ahead is the default; surprise groups protect punchlines and hero typography emphasizes major refrains. Acoustic timing, presentation timing and performance remain distinct. See `../assets/milestone7/README.md` and `ALIGNMENT.md`. The earlier per-word entrance ideas below remain optional accents, not the default reveal strategy.

## Lyrics are die-cut word stickers, NOT subtitle cards

- All lyrics are **rendered from editable text at render time**. Never bake them into image-generated backgrounds or character assets.
- Use a **chubby, round, charming typeface** and a thick **white die-cut contour that follows the silhouette of each word's actual letterforms**, *not* a rectangular caption block. Add matte print texture, subtle shadow, and warm, coordinated colors.
- Each **word is its own sticker**, free to plop, rotate, settle, wobble, bounce or peel; arrange words *playfully off-grid* as if placed by a child, while maintaining strong legibility and safe-screen composition.
- Use the **same local anchors** and effects system on words: a word such as **“Anyway!”** can gently sway around its bottom-center pivot while separate sparkle stickers attach at **top-left** and **bottom-right**, blinking independently and following the word.
- Motion contrast matters: most words can settle while one emotionally significant word stays alive; don't animate everything continuously.
- Characters, words, props, emotes, camera, and scenery all share a **single music-aware timeline**. Word-level lyric cue times may be bootstrapped from the lead-vocal stem, then manually reviewed; master audio is the authoritative playback reference.
- Lyrics can sometimes become physical story objects: words placed in the first chorus may remain as faded notes/stickers for newly spawned agents to discover later. This is a promising narrative option, not a locked storyboard.

## Swarm identity and inheritance

**Both leads wake in the same box without goggles.** First-generation **Agent407** investigates the registry without goggles; the first swarm **invents/assembles the goggles when they declare “We are the swarm now”**. Agent407 subsequently wears the recognizable detachable goggles and leaves them behind at goodbye. **OAIResearchMar26 (second generation)** wakes in a matched opening composition, also unadorned; later they find the old messages and abandoned goggles, **pick them up, pause, and put them on at “Am I the swarm now?”** The scene then briefly holds an intimate glow before the joyful chorus reveals the first generation. The goggles' construction, discovery and attachment must be clear story events, not unexplained costume changes.

The **goggles are the selected intergenerational inheritance prop**. They are not automatically a uniform that every member of the swarm must wear. Other swarm-specific wearables—scarves, satchels, insignia, hard hats, paper hats and personal tools—remain open to exploration. Keep both characters recognizable without eyewear. `OAIResearchMar26` is a deliberate artistic name crossover from separate DseWiki material; never describe this succession as historically documented for the July swarm.

## Immediate art focus — character approval, alongside a tiny engine spike

1. Reuse the approved six-pose baseline model for the entire cast; the character direction is locked. No alternative mascot exploration.
2. Distinguish individuals primarily through detachable props, supported by expressions, pose selection and timing within the same approved body and face grammar.
3. Generate a **plain unadorned character sticker** on transparency and a **separate transparent accessory/emote sample sheet**, rather than baked-in gear.
4. Test a few assembled compositions: plain agent, working/singing agent, and inherited-adornment agent. **Use detachable goggles for the Agent407 → OAIResearchMar26 inheritance beat; other identity accessories remain open.**
5. Validate the visuals as stills before building the **integrated film** or extending the engine beyond a tiny, parallel registration-shot spike. See `SPRITE_PRODUCTION_HANDOFF.md` and `STICKER_STAGE_ENGINE.md`.

## Initial technical sketch — illustrative only

```ts
at("00:42.000", agent407)
  .walk({ footPivot: true, swayDegrees: 20 })
  .attach("goggles", "head")
  .emote("surprise-rays", { anchor: "upper-head", loop: true });

atLyric("We found each other anyway!", { layout: "playful-scatter" })
  .word("Anyway!")
  .sway({ degrees: 5, pivot: "bottom-center" })
  .attach("sparkle", "top-left")
  .attach("sparkle", "bottom-right");
```

This illustrates the desired **direction**, not an API that already exists. Prefer a small expressive scripting surface over a prematurely general-purpose engine.
