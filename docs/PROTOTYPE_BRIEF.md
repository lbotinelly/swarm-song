# 15-second proof-of-concept

> **Sequence update:** This is a later milestone. The immediate phase is static **character-design and detachable accessory/emote exploration** (see [Sticker visual language](STICKER_LANGUAGE.md)). Do not rush into building the animated proof before approving the base agent style. The song's master track and stems are now in `assets/audio/`; use them rather than generic placeholder audio when the animation phase begins.

**Story continuity:** Early scenes feature **first-generation Agent407**, wearing detachable goggles; late rediscovery features **second-generation OAIResearchMar26** discovering and putting on those abandoned goggles at “Am I the swarm now?”. Keep them visually distinct without accessories (see `NARRATIVE_GENERATIONS_AND_PARALLAX.md`).

**Purpose:** Validate that Codex, GPT Image assets and economical code-driven animation can produce a delightful, cinematic music-video moment, not just a technical demo.

**Format:** 16:9 landscape; render 1920×1080 if practical; 24 or 30 fps. Use temporary original music or silent preview until actual track is supplied; don't invent exact sync markers.

## Proposed shot treatment (editable)
- **0–4 s:** A beautifully arranged graph-paper expanse; a tiny, original chibi sticker peels itself up, anticipates, and looks across a layered landscape.
- **4–9 s:** Camera drifts or dollies through paper hills and handwritten-looking *render-time* graphics. A second distinct sticker character emerges, reacts, and interacts.
- **9–13 s:** A surprise: a folded or lifted paper layer reveals a much larger, impossibly detailed miniature civilization, with strong parallax and light/shadow separation.
- **13–15 s:** A memorable composed tableau, held just long enough to read, suitable for a contact-sheet still.

These beats are a starting exploration, not locked storyboards.

## Asset deliverables
1. One approved palette / visual reference sheet.
2. Two original chibi character sheets and a modest pose/expression inventory.
3. Transparent die-cut sticker PNGs with consistent print edge and alpha.
4. Multi-plane backgrounds, foreground paper objects, shadows and reusable textures.
5. Contact sheet labeling asset IDs; provenance and prompt/version manifest.
6. Code project with a one-command preview and MP4 render plus a few review stills.

## Implementation guidance
Consider a Remotion timeline with reusable Sticker, PaperLayer, DioramaCamera, and PaperTransition abstractions. Use frame-based deterministic animation and explicit timing. Keep generative illustration assets distinct from code-generated captions. Any large asset-generation run should be intentionally scoped and reviewed.

## Quality gates
- Visual consistency between shots and character appearances.
- No baked-in text; no invented documentary facts.
- Credible paper depth and character cutout edges.
- A playful, musical rhythm and at least one real visual surprise.
- Reproducible rendered output and easy creative iteration.

## Unknowns to resolve from real source materials
Song/audio file, actual duration and structural beats; verified real-world incident source material; approved character identity and recurring cast; specific typography and credit wording; release aspect ratios.
