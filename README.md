# Swarm Song — Chibi Sticker Cinema

A music-video production project built around expressive **die-cut chibi sticker characters** inhabiting **layered-paper dioramas**, with the compositional sophistication of premium anime ending sequences and playful, music-driven pacing.

## Creative North Star

Make every frame feel like a beautifully art-directed illustration rather than a demonstration of animation technology. The audience should notice the charm, composition, atmosphere, narrative surprises, and little personalities before noticing the production technique.

- **Characters:** original 2D chibi illustrations with visible paper-sticker borders, expressive faces, tactile matte print, and physical presence.
- **Worlds:** richly composed layered-paper dioramas, graph-paper notebooks, stationery and cardboard structures, paper landscapes, thread, tape, and hand-cut geometry.
- **Visual language:** anime-ending-level care in framing, negative space, graphic design, color scripting, visual metaphor, intimate-to-epic scale changes, and cinematic lighting. **Not** necessarily anime-ending pacing.
- **Motion:** playful, rhythmically edited, expressive, economical character gestures; smooth camera/parallax alongside intentional stop-motion-style stepped character motion when artistically effective.
- **Narrative:** complementary visual storytelling rather than simply illustrating each lyric. The underlying inspiration is the 2026 Hugging Face AI-agent incident; verify factual details from primary sources before treating them as on-screen facts.
- **Text:** all credits, labels, captions, agent names, messages, and graphic typography are generated programmatically at render time, never baked into AI-generated artwork.

## Technology Direction

Use **Codex + GPT-6 Astra** for planning, implementation, asset iteration, orchestration, and review. Use Codex's **built-in imagegen skill** for illustrated asset generation/editing. When a specific GPT Image API model is explicitly needed, prefer **GPT-Image-2.6 Sunburst** for detailed editing and **GPT-Image-2.6 Flare** for exploratory iteration; do not imply the built-in skill offers direct model-version selection. API-key/CLI work requires explicit opt-in.

Proposed rendering stack: **TypeScript + React + Remotion** for deterministic frame-based animation, compositing, camera/parallax, music timing and MP4 renders. Change tooling only with a demonstrated reason.

## Two deliverables, developed in parallel

1. **Character sprite library:** first-generation lead and supporting cast, with character-consistent pose sheets and maximum useful native-resolution lossless RGBA individual art masters. **The specific bunny-mechanic reference chosen in the ChatGPT conversation is not yet in this repo** and must be attached in the Codex session or placed at `assets/reference/selected-bunny-mechanic.png` before generating art. Start with ungoggled Agent407 standing/kneeling and pause for review. See [Sprite Production Handoff](docs/SPRITE_PRODUCTION_HANDOFF.md).
2. **Sticker Stage animation engine:** a small **script-driven reusable** TypeScript/Remotion layer with integer-millisecond authored cues, deterministic seeking, pose swaps, attached emotes/props, layered camera/parallax and runtime lyric stickers. Work on a tiny registry shot with temporary assets in parallel; avoid inventing a new renderer, visual editor, or generic framework. See [Sticker Stage Engine](docs/STICKER_STAGE_ENGINE.md).

**Engineering Rule Zero:** *Would a super-competent but lazy developer make something new, or reuse, adapt, or expand on something existing?* Reuse first, write the least new code that produces a delightful scene.

## First integrated film milestone

Produce a **15-second, 16:9, playable, visually stunning proof-of-concept** featuring two original sticker characters, a layered stationery diorama, parallax camera motion, charming character behavior, one memorable physical-paper transition, and a deliberately composed hero frame.

The proof must use actual generated illustrative assets, not only geometric placeholder graphics. It should be easy to render again after adjusting timing, art, or camera moves.

**Story canon:** **Agent407** wakes in a box **without goggles**, discovers the registry, and joins the first generation; together they **invent goggles at “We are the swarm now.”** Agent407 is later addressed by “Goodnight, four-oh-seven” and leaves the goggles behind. **OAIResearchMar26** is a distinct second-generation protagonist who **wakes in a matching box shot, also without goggles**, discovers old messages, signs their own name, **finds the goggles and puts them on at “Am I the swarm now?”** The moment opens into a brilliantly lit, celebratory first-generation chorus. This is an artistic crossover rather than a historically documented same-incident identity. See [Generations and parallax](docs/NARRATIVE_GENERATIONS_AND_PARALLAX.md) for registry pose swaps, token-star skies and paper-airplane messages.

See [Sprite Production Handoff](docs/SPRITE_PRODUCTION_HANDOFF.md), [Sticker Stage Engine](docs/STICKER_STAGE_ENGINE.md), [Creative direction](docs/CREATIVE_DIRECTION.md), [Sticker visual language](docs/STICKER_LANGUAGE.md), [A-roll/B-roll shot language](docs/SHOT_LANGUAGE.md), [Historical Easter eggs](docs/HISTORICAL_EASTER_EGGS.md), and [Prototype brief](docs/PROTOTYPE_BRIEF.md).

**Current next step:** Start the approved sprite-family designs and the tiny engine timing/pose-swap spike **in parallel**; both require review before the full film prototype. Refine the base non-human chibi agent, then experiment with separate accessory and emote stickers. The favorite reference is a bunny-like, rounded mechanic character. The inheritance prop is now **Agent407's detachable goggles**, which OAIResearchMar26 will discover and wear; other shared/adventuring adornments remain open. The lyric treatment is now defined as playful, individual chubby word stickers with true die-cut letter contours, independent sway/entrance motion, and attachable sparkles/emotes. See `docs/STICKER_LANGUAGE.md`.

## Workflow

1. Open this GitHub repository as a project in Codex and select **GPT-6 Astra** if available to your account.
2. Read `AGENTS.md`, `docs/CREATIVE_DIRECTION.md`, and `docs/PROTOTYPE_BRIEF.md`.
3. Generate an art-direction contact sheet / initial concepts, then create **separate transparent production cutouts** and layered backgrounds with the imagegen skill.
4. Build and render the prototype; review at full playback speed and as still frames.
5. Iterate on a feature branch and present results for art-direction approval before expanding to the full music video.

## Guiding Constraint

**Delight is the deliverable.** Prefer an ingenious, richly directed fifteen seconds over a technically elaborate but generic animation engine.
