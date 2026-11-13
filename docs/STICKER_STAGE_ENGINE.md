# Sticker Stage — Lean, Script-Driven Sticker Animation Engine

**Status:** A parallel deliverable alongside the Swarm Song music video, with the film as the first real dogfood project. Codex should implement a tiny vertical slice, not a framework.

## Rule Zero — The super-competent, lazy developer

> **Would a super-competent but lazy developer make something new, or reuse, adapt, or expand on something existing?**

This question is a **required decision gate before every abstraction, subsystem, dependency, and architectural change**. Default to **reuse → adapt → minimally extend → build new only when objectively simpler**.

*Lazy* means minimizing total design, implementation, testing and maintenance effort **without compromising rendering quality, timing correctness, reproducibility, or user delight**. Avoid both needless invention and false economy. Solve the real shot in the fewest moving parts.

If Codex proposes something new, it must be able to explain: **What existing solution was considered? Why can't we use it? What specific on-screen behavior requires this? What's the smallest implementation?** If those questions have no compelling answer, **do not build it**.

## What we are delivering

A **small reusable script-driven 2D sticker animation layer**: pass it a readable scene script, high-resolution transparent sticker masters and an audio track, and render a deterministic animated shot to video. The film's scenes are real usage examples and acceptance tests.

The engine does **not** need to understand an unstructured natural-language script at runtime. Codex may translate an art-director's notes into inspectable, typed scene data or TypeScript. Rendering follows that **explicit script**, not stochastic AI interpretation. A future natural-language authoring assistant is a separate hypothesis, not a v0 requirement.

Suggested existing foundation: **TypeScript + React + Remotion** for frame evaluation, audiovisual composition, preview and export. Confirm with a tiny spike, then use native primitives rather than wrapping everything in a new framework.

## Timing contract: precise authoring, honest rendering

- Scene instructions have **integer-millisecond cue timestamps and durations**, or exact audio-sample positions where appropriate. Keep one shared timeline/timebase; avoid accumulated floating-point drift.
- Every element is evaluated as a pure function of **absolute time**. Jump directly to any frame without replaying an earlier simulation.
- Match audio to the master track; use lead-vocal stem to locate cues, then manually review the cue positions. Export deterministic, reproducible results.
- **Millisecond script timestamps do not imply millisecond visual refresh.** Video at 30 fps offers frames every ~33.33 ms, and at 60 fps every ~16.67 ms. Quantize events predictably to output frames; interpolate continuous motion; document rounding and report requested-vs-visible cue times. Do not claim impossible millisecond-perfect visible motion.
- If more precise onsets materially matter, adjust frame rate, cue placement, and audio, not architecture complexity.

## v0 primitive vocabulary (conceptual, not a locked API)

- **scene / timeline** — duration, dimensions, frame rate, master audio, timestamped actions
- **sprite / pose** — choose lossless transparent art, show/hide, place, scale, rotate, swap standing/kneeling/singing sprites, foot-pivot bop
- **attach** — mount goggles, wrench, expression rays, question mark, music notes or sparkles at named head/hand/etc. anchors, inheriting parent transforms
- **animate** — simple keyframes/easing, blinking, sway, gentle bob, seeded repeat and timed effect appearance
- **paper / camera** — a handful of layered image plates, physical occlusion, camera pan/zoom with parallax
- **text** — per-word, procedurally rendered lyric stickers with rounded letter-shaped white contour and individual transforms
- **output** — render frames/MP4 from a reproducible CLI command and script

These are capabilities, **not permission to create an elaborate DSL**. Plain TypeScript functions and data objects are preferred. Components should be added **only as an actual shot needs them**.

## First two vertical slices

**A. Registry discovery (engine exercise using approved or dummy sprites):** First-generation Agent407 starts standing, gets a separate question-mark emote at the lyric cue, swaps to kneeling to inspect the registry, stands, flashes three yellow surprise rays at “and it was writable!”, then bops happily. No goggles: the swarm hasn't invented them yet. Proves cue timing, pose swap, attachments, transform anchors and deterministic seeking.

**B. Chorus stampede (visual-art-quality exercise):** Agent407 sings joyfully in the foreground while three escalating background blobs of agents run through paper depth layers at “running, running, running”; dust-sticker puffs appear and drift; die-cut lyric words pop in on cue. Proves layered compositing, group reuse, typography, sound sync and camera. Build this **after the sprite style is approved**, not with generic placeholder art passed off as finished.

Avoid implementing the full movie, 3D effects, physics, complex particles, general-purpose camera rigs or elaborate crowd simulations in either slice.

## Explicitly out of scope without a proven need

No plugins, ECS, scene graphs beyond ordinary compositing, node editor, visual timeline editor, bone rigging, procedural physics, cloud render farm, render scheduler, microservices, multi-backend abstraction, external DB, asset-management service, packaging marketplace, general AI story interpreter, automated cinematography planner, or speculative API stability layer.

No monorepo or needless folder/package architecture. Use a **handful of small files** and existing renderer capabilities. Don't add a dependency to avoid writing ten straightforward lines of local code.

## Delivery gates

1. **Art workstream:** acquire the user's selected bunny-mechanic reference and create high-resolution individual character masters (see `SPRITE_PRODUCTION_HANDOFF.md`); obtain approval on Agent407's *ungoggled* standing and kneeling first.
2. **Engine workstream in parallel:** prove timing, pose swap and attachment on the registry shot with simple temporary assets; do not block on artwork. The script and renderer must remain asset-agnostic.
3. **Integrate:** re-render the same script after approved artwork is available, without changing core engine code.
4. **Show:** a short MP4, a few full-quality frames, the script itself, clear render command, native source resolutions/asset provenance, and a simple timing validation report.
5. **Review:** compare visual delight, readable cues, frame exactness and engineering cost; expand the engine only for the next concrete storyboard need.

For each PR, include: **the scene demonstrated; pre-existing functionality reused; the smallest amount of custom code added; what was deliberately not built; how to run and test it**. Major expansions beyond this tiny kernel require approval.

## Engineering acceptance tests

- For the same script, seed, assets and output settings, rendering frame N twice yields equivalent visual state.
- An arbitrary timestamp can be previewed directly with no preceding simulation.
- The same accessory remains aligned while the character rotates, changes pose or moves.
- Cue conversion is consistent at 24/30/60 fps and documents quantization.
- Full-resolution lossless masters remain untouched; export/downsampling handles alpha edges without dark/white halos.
- Swapping a named character sprite does not require rewriting the scene script.
- All lyric text and archival labels are editable/render-time, never baked into image assets.

**North star:** The animation engine is a useful product because it makes this kind of art *easy to direct and fun to produce*, not because the codebase looks architecturally impressive.
