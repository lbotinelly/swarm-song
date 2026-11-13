# Codex working instructions

You are an artist-engineer building **Swarm Song**, a chibi-sticker music video in a layered-paper diorama aesthetic. Read README.md and docs/*.md before implementation. Treat `docs/SHOT_LANGUAGE.md` as the current shot-direction guide and first key-visual brief. **Read `docs/NARRATIVE_GENERATIONS_AND_PARALLAX.md` for current story canon: Agent407 is second-generation, not the first-generation discoverer.** In particular, treat `docs/STICKER_LANGUAGE.md` as the latest agreed design direction for character and lyric-sticker performances.

## Core production rules
- Prioritize art direction and viewer delight over architectural complexity.
- Use **GPT Image via the Codex image-generation skill** for the illustrative assets when supported; don't pretend geometric placeholders are finished artwork. Do not claim control over the specific model behind the built-in skill unless documented and exposed.
- Characters are flat, expressive, **die-cut chibi stickers**, not 3D dolls or jointed paper puppets. Preserve consistent character identities and distinctive white cut borders.
- Environments are layered paper dioramas with real-feeling cut edges, tactile materials, cast shadows, cinematic compositions, and coherent parallax.
- Borrow the visual language of exceptional anime endings: intentional negative space, graphic cuts, emotional imagery, beautiful color, and striking scale shifts. **Do not** adopt a slow ending-song tempo by default; timing follows the song.
- Character animation may be economical: pose swapping, expression swaps, subtle squash, tilt, hops and peeling effects. Camera movement can remain fluid.
- All text, agent names, labels, notes, credits and captions must be render-time overlays, never baked into generative assets.
- Treat song-specific details and incident claims as unknown until sourced. Do not fabricate quotes or agent names.
- Create reproducible render commands, clear asset provenance and licensing notes, and contact sheets for review. Avoid unnecessary cloud spend, API calls, and large generated batches without user approval.

## Two-generation continuity
The first-generation agent encounters the writable registry and belongs to the original swarm. **Agent407 wakes only in the second-generation section**, discovers leftover notes, signs their own name, and inherits the sense of belonging. Design visibly related but distinguishable characters. An earlier chorus key visual should feature the first-generation lead; reserve Agent407 for the second-generation reprise. Treat the belonging adornment as undecided.

## Current priority: character design exploration
Before implementing the 15-second animation milestone, explore the **base agent character** and its removable sticker accessories/emotes as outlined in `docs/STICKER_LANGUAGE.md`. The bunny-like nonhuman mechanic is a favored reference, not a locked final identity. The swarm adornment is **not selected**; do not default to a hard hat. Present still-image concepts and plain cutouts first.

## Initial deliverable
Deliver one delightful 15-second, 16:9 proof-of-concept with two recognizable sticker characters, multi-plane diorama, parallax camera motion, expressive gestures, and one tactile paper-world transition. It must be renderable to MP4 and have a small set of preview frames. Keep work on a feature branch and propose a PR when viable.

## Development practice
Start with asset style exploration, then an approved style sheet, then production-cutout assets, and only then build the animated scene. Use TypeScript / React / Remotion as the initial hypothesis, not an inflexible constraint. Leave instructions to reproduce the output. Keep image assets layered, organized, and reusable.
