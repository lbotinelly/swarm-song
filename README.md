# Swarm Song — Chibi Sticker Cinema

A music-video production project built around expressive **die-cut chibi sticker characters** inhabiting **layered-paper dioramas**, with the compositional sophistication of premium anime ending sequences and playful, music-driven pacing.

## Milestone 3 — supporting cast fitting review

The [three supporting identity kits](assets/accessories/supporting-v1/README.md) now have separate native prop masters and a fitted contact sheet: PhaseOne, Ethical Protester and Courier. Goggles follow each pose's forehead tilt; the satchel has rear/front strap layering and standing/walking fits. The new cast kits await art-direction approval before chorus production. Reproduction commands and light/dark review sheets are linked in the kit notes.

Agent407's six poses and shared cast baseline are approved. The [mini style spec](docs/AGENT407_MINI_STYLE_SPEC.md) and [design lock](docs/CHARACTER_DESIGN_LOCK.md) are the authority for future work. Original masters remain unchanged; [production derivatives](assets/characters/agent407/PRODUCTION.md) remove alpha noise and add consistent padding without resampling artwork.

The [first detachable pack](assets/accessories/pack-v1/README.md) contains goggles, editable question-mark typography, three surprise rays, two separate music notes and a wrench. The accessory contact sheet, six-pose placement sheet and registry integration were explicitly approved on November 13, 2026. Milestone 3 begins with three supporting identity kits, reviewed before the chorus proof.

The [registry demonstration](docs/REGISTRY_SPIKE.md) now uses the approved standing/kneeling artwork and attached emotes, with an eight-second excerpt of the real master. **Phrase timing is user-approved through playback review**, with the measured evidence and remaining individual-word uncertainty in [audio sync notes](docs/AUDIO_SYNC.md). The registry remains ungoggled. Local render output: `output/registry-v2/registry.mp4`.

```powershell
npm ci
python scripts/prepare-sprites.py
python scripts/prepare-accessories.py
npm run check
npm run timing
npm run render
npm run review
```

Preparation requires Python/Pillow; existing generated derivatives are checked in, so rendering does not need Python. Contact-sheet reproduction is documented beside the art. Work continues directly on **main**, as authorized by the user; no additional branch/PR coordination is required.

The earlier planning sections below preserve the project's creative history. References to missing artwork or proposed engine work are superseded by this status. Master audio and lyrics remain unchanged. Master duration is 262.8 seconds; stems are 264.238146 seconds, all stereo at 48 kHz. The 68 BPM folder name is not a timing source.

**Shared cast baseline:** all main and supporting characters reuse the approved six-pose model. Individual detachable props make them unique; expressions and timing add personality without redesigning the body.

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
2. Read `AGENTS.md`, `docs/SPRITE_PRODUCTION_HANDOFF.md`, `docs/STICKER_STAGE_ENGINE.md`, and the linked narrative/style documents. **Apply Rule Zero before creating code.**
3. Attach the user's **selected bunny-mechanic image** in Codex or commit it as `assets/reference/selected-bunny-mechanic.png` (it is not currently in the repo). Work in a feature branch.
4. Run two small workstreams: **(a)** Agent407 ungoggled standing/kneeling high-resolution sprite masters and a preview sheet for approval; **(b)** registry-scene millisecond-cue script runner using temporary assets and proven Remotion capabilities.
5. Review art, reproducible render/timing tests, and what was *not* built. Only after approval integrate approved sprites into an animated prototype; propose a PR before broader film production.

## Guiding Constraint

**Delight is the deliverable.** Prefer an ingenious, richly directed fifteen seconds over a technically elaborate but generic animation engine.
