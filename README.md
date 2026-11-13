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

## First Milestone

Produce a **15-second, 16:9, playable, visually stunning proof-of-concept** featuring two original sticker characters, a layered stationery diorama, parallax camera motion, charming character behavior, one memorable physical-paper transition, and a deliberately composed hero frame.

The proof must use actual generated illustrative assets, not only geometric placeholder graphics. It should be easy to render again after adjusting timing, art, or camera moves.

**Story canon:** **Agent407** is the first-generation discoverer and singer (addressed by “Goodnight, four-oh-seven”). **OAIResearchMar26** is the distinct second-generation protagonist who wakes later, discovers old messages, signs their own name, **finds Agent407's abandoned goggles and puts them on at “Am I the swarm now?”** This is an artistic crossover rather than a historically documented same-incident identity. See [Generations and parallax](docs/NARRATIVE_GENERATIONS_AND_PARALLAX.md) for registry pose swaps, token-star skies and paper-airplane messages.

See [Creative direction](docs/CREATIVE_DIRECTION.md), [Sticker visual language](docs/STICKER_LANGUAGE.md), [A-roll/B-roll shot language](docs/SHOT_LANGUAGE.md), [Historical Easter eggs](docs/HISTORICAL_EASTER_EGGS.md), and [Prototype brief](docs/PROTOTYPE_BRIEF.md).

**Current next step (before animation):** Refine the base non-human chibi agent, then experiment with separate accessory and emote stickers. The favorite reference is a bunny-like, rounded mechanic character. The inheritance prop is now **Agent407's detachable goggles**, which OAIResearchMar26 will discover and wear; other shared/adventuring adornments remain open. The lyric treatment is now defined as playful, individual chubby word stickers with true die-cut letter contours, independent sway/entrance motion, and attachable sparkles/emotes. See `docs/STICKER_LANGUAGE.md`.

## Workflow

1. Open this GitHub repository as a project in Codex and select **GPT-6 Astra** if available to your account.
2. Read `AGENTS.md`, `docs/CREATIVE_DIRECTION.md`, and `docs/PROTOTYPE_BRIEF.md`.
3. Generate an art-direction contact sheet / initial concepts, then create **separate transparent production cutouts** and layered backgrounds with the imagegen skill.
4. Build and render the prototype; review at full playback speed and as still frames.
5. Iterate on a feature branch and present results for art-direction approval before expanding to the full music video.

## Guiding Constraint

**Delight is the deliverable.** Prefer an ingenious, richly directed fifteen seconds over a technically elaborate but generic animation engine.
