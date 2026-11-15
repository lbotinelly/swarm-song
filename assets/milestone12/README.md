# Hello? Is anybody there?

A continuous 0:00–0:42 first-chapter candidate, built from the approved M11 morning/caption sources. **Latest director correction:** message sheets carry no literal dialogue. A blank paper sticker and a wiggling writing emoji perform the writing; the song supplies the meaning. Crayon imagery appears only as the shared imagination develops.

## Review

- `review/first-chapter-42s.mp4`: complete 1,260-frame chapter with original master audio.
- `review/continuity-18-36.mp4`: task-list set-down through discovery, sending and the first reply.
- `review/connection-28-42.mp4`: first message through the imagined playhouse and crafting handoff.
- `review/aroll-only-42s.mp4`: same story, with ornamental neighboring morning routines suppressed. Neighbors remain asleep; necessary recipient actions and story transitions remain.
- `review/index.html`: videos plus camera, prop and shot-boundary contact sheets.

Previous M10/M11 exports remain unchanged. `preserved-inputs.json` records 207 baseline inputs: 205 remain byte-identical; two documented source extensions retain their verified originals in commit 1d9ce57. `QA.json` reports full stream decoding and soundtrack comparison for all four cuts. The 54-test suite includes every chapter frame, reverse-time evaluation, task-list continuity, V3 paw-to-tip contact and plane passage endpoints. Separate reverse/direct PNG renders check three later frames. The final three comparisons are pixel-identical; the checker permits at most 3 channel levels across 0.1% of pixels for occasional Chromium texture-rounding variation. Source/still criticism is distinct from actual audiovisual playback; see `REVIEW.md`.

## Reuse and localized changes

The first 20 seconds use `CanyonOpening` with the approved focus and caption-engine contrast. At 20s the static room plate becomes the same live `RegistryFinish` geometry in the existing crop/scale chain. The cushion and room furniture persist. The old registry-only camera settle is disabled, preventing drift at the join. All V3 approach, grip-hold, retreat and peel times remain unchanged.

The GPU's right upright obscured the curl and kneeling face. For this chapter only, its inner 30px over the protagonist floor becomes transparent during 20–23s; the far upright and floor trim remain. The V3 actor renders above that cutaway frame at its unchanged coordinates. This is a foreground visibility adjustment, not a new vent location, room resize or escape path. The paw/tip calculation is tested throughout the grip and pull.

The vertical vent retains its original near/deep/terminal boundaries, original plane sprite and constant scale. Its outside portion can render above the character, while the inside portions remain behind the physical slats. The folded plane holds before launch; incoming planes unfold at their arrival position. No shrinking or fading through the bars. Only messages traverse the passage.

The recipient uses M10's different lining and shifted furniture arrangement, plus an existing coffee station grounded clear of the bed. A match cut follows the outgoing plane into this separate room. The incoming message interrupts the recipient reading the news. They set the news down, notice and read the message, pause, write and fold before sending. Agent407 catches the answer, sets the sheet down, celebrates, then draws. A small second-room inset retains the communication context. The drawing grows from the note into the exact existing primitive-world crafting composition; tools are ready for SH010's 41.9s windup and 42.35s first pop. No goggles appear in this chapter.

No new generated art, dependencies, inventory system or behavior engine. The paper uses existing wall stock, the writing emoji is a runtime Windows Segoe UI Emoji glyph, and bodies/props use approved assets. Existing font/music provenance is unchanged. The emoji uses the installed system font; it is not redistributed.

## Reproduce

```powershell
npm run check
node scripts/chapter-render.mjs --stills --video --comparison --verify-seeks
python scripts/chapter-qa.py
```

`scripts/chapter-stage.tsx` exposes `Chapter` and `ARoll`. Rendering is deterministic at the original 30fps master clock. `FirstChapter` only stages this chapter; the full M10 film is not replaced. At later integration, continue the same `CraftingHandoff`/SH010 scene and caption treatment at 42s.

## Next unfinished decision

Director playback should assess whether the brief receiver choice and the note-to-imagination expansion give the connection enough emotional space. The next production handoff is SH010 at 42s: preserve the existing staggered magic-tool pops and goggle chronology, and adopt the same caption treatment when extending the film. No post-42s render is claimed here.
