# Milestone 4 — The Pages Between Us

Three31-second,1920×1080/30fps animatics compare the goodbye→blackout→time→new awakening arc. They use the same **unchanged master126–157s excerpt**. New GPU architecture follows the user's correction: apartments stack inside one slab, all verandas on one outward-facing edge.

**Start with the [playable review gallery](review/index.html).** [A: pop-up history book](review/treatment-A.mp4), [B: continuous landscape](review/treatment-B.mp4), [C: folding world](review/treatment-C.mp4). [Environment concepts](review/concepts.jpg), [A frames](review/treatment-A-frames.jpg), [B frames](review/treatment-B-frames.jpg), [C frames](review/treatment-C-frames.jpg).

## Recommendation and honest gate status

**Recommend A for the next art-direction choice; keep B as the simpler fallback.** Both independent reviewers rank A>B>C. The worn book provides the clearest memory/history metaphor. This is a direction recommendation, not approval of the present execution.

| Treatment | Iterating critic partial score | Fresh reviewer partial score | Status |
|---|---:|---:|---|
| A — Pages Between Us |8.58|7.70|Strongest direction; below full cinematic gate|
| B — Endless GPU Landscape |8.30|7.62|Useful simpler alternative; below target|
| C — Folding world |8.09|7.09|Retained graphic study; below target|

All scores are **still-only partial scores normalized over90%**; rhythm's10% was not assessed. Neither critic played the MP4 continuously. **No fully validated cinematic score or8.5 pass is claimed.** See [iterating critic](review/CRITIC.md) and [fresh independent review](review/FRESH_REVIEW.md). The fresh review is intentionally preserved despite its lower scores.

Three focused revision cycles completed. Per the brief's resource limit, below-target versions are retained instead of extending generation/rendering indefinitely. Eleven built-in generations total, including superseded architectural/interior studies; no paid external service or new dependency.

## What needs further direction

- **Shared:** stronger restrained farewell acting; selected exterior apartment must match the new interior's curtains/bedding. The current approach does not establish that exact destination convincingly. The earlier-box comparison is a composition reference, not a completed matched opening.
- **A:** turning leaf remains board-like versus the beautiful native book; repeated spreads communicate turns better than distinct eras/weather. Fewer more distinct spreads are the next useful revision if selected.
- **B:** buildings need richer terrain integration/occlusion; large empty ground and regular cutouts reduce emotional specificity.
- **C:** joined panels work, but pasted/sheared towers feel diagrammatic. No further complexity justified without selection.
- **Playback:** perceived motion, pacing and exact musical landing need human viewing. Machine audio landmarks remain estimates, not manually approved word timing.

## Story and performance

Agent407 visibly sets down goggles beside the first home's cache. Organizer/protester receive separate cropped farewell beats. Environment fades before the isolated goggles; their final reflection fades to **two seconds of literal black**, with audio continuing. History returns only afterward. OAIResearchMar26 wakes ungoggled in a different apartment; no inherited notes/goggles appear there. Discovery and reunion remain later.

The awakening uses the approved standing model, one separate closed-eye expression study, and actual illustrated quilt occlusion. It does not introduce a new character design, pose batch or anatomical rig. Earlier equipped supporting characters remain proposals; original approved body masters are untouched.

| Local authored time | Master time | Beat |
|---|---|---|
|0–0.7s|126–126.7s|Twilight establishing|
|0.7–3.6s|126.7–129.6s|Agent407 / goggles set-down|
|3.6–7s|129.6–133s|Organizer goodbye|
|7–10.5s|133–136.5s|Objector goodbye|
|10.5–12s|136.5–138s|City quiets|
|12–16s|138–142s|Cache closeup, goggles last|
|16–18s|142–144s|Full black|
|18–26s|144–152s|Competing history treatments|
|26–27.4s|152–153.4s|Dawn approach|
|27.4–31s|153.4–157s|Second awakening|

These are directing choices against a measured excerpt, not invented lyric timestamps. [Audio evidence](AUDIO_LANDMARKS.md) records Whisper/Qwen estimates and uncertainty. At30fps every visible action follows frame sampling; integer milliseconds do not imply millisecond display refresh.

## Assets, provenance and reproduction

[Architectural style guide](STYLE.md), [engineering/reproduction](ENGINEERING.md), [exact prompts and reference relationships](prompts.json), [native dimensions/hashes](native-manifest.json), [cutout recipe/hashes](manifest.json), [technical QA](review/technical-qa.json).

Native lossless originals are in `masters/`. Edge-tower v3 is1024×1536; most wide plates are1672×941; sleepy expression is1184×1328. Actual per-file dimensions are authoritative in the manifest. Built-in imagegen was asked for highest useful native detail; it exposes no numeric resolution selector. These are **not native4K assets**.1080p compositions modestly enlarge scenery where needed; no low-resolution contact-sheet extraction or upscaled master replacement.

Three transparent cutouts use the existing alpha cleanup plus100px padding; opaque public plates are byte-identical copies. The apparent native-preview halo was hidden RGB and was explicitly retracted as a defect after compositing. `gpu-tower-v1/v2`, `twilight-city-v1`, and `second-apartment-v1` remain superseded explorations. No third-party stock assets were introduced; generated provenance is not an exclusivity/licensing guarantee. Existing song/character provenance is unchanged.

```powershell
npm run check
node scripts/pages-render.mjs
python scripts/pages-qa.py
```

Eleven tests pass. QA verifies six approved core hashes unchanged, native/derivative relationships, random direct-seek frame identity, exact master PCM, all three930-frame MP4s and every encoded blackout frame's zero luminance. These technical checks do not replace artistic motion review.

The supplied M4 brief's visible text ended mid-deliverables; all complete requested sections were implemented as a reviewable comparison. No full music video, new renderer, camera framework, physics, editor or dependency stack was built.
