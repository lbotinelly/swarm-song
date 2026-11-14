# C — street canyon and opening playset

Director-authorized focused 0–20s proof, 1920×1080, 30fps, canonical song-master audio. Open `review/canyon-opening-20s.mp4` or `review/index.html`. Existing M10 and M11 films are preserved; this is not full-film integration or director approval.

The selected C reference supplies the dark indigo / terracotta cardboard, copper circuits, corrugated balconies and warm windows. Four bounded image generations supply two independent neighboring buildings, one eight-storey facade, and a distant skyline/street plate. The hero prompt requested nine floors; the actual output has eight, within Leo's approved 8–10 range. No invented ninth floor.

Foreground, middle buildings and distant plate have separate deterministic transforms. The hero scales from an establishing view to three visible floors; the fifth floor from the top is Agent407's. That floor's windows receive a warm emphasis before the reveal. One rigid facade slides left during 9.9–11.9s while fixed uprights and floor strips retain the exterior material around the rooms. The city stays behind the cutaway. The lower neighbor dims further as the first caption appears directly over the world.

The room background is a reproducible still of the approved RegistryFinish room, reused with live residents, the approved sleeping pose/cushion and existing wake performance. Hero lighting is warm; neighboring residents breathe with different phases. Characters remain flat stickers without goggles. Room plates are scaled to measured floor divisions. Title choreography and lyric timing are unchanged.

## Reproduce

```
npm run check
node scripts/canyon-render.mjs --room --stills --video
python scripts/canyon-qa.py
```

`src/CanyonOpening.tsx` contains only shot-specific transforms and layout. No new animation framework. `Opening.tsx` only exports the existing Resident for reuse. The static room cache avoids re-rendering the complete room construction eight times per frame.

## Provenance

Built-in Codex image-generation tool, using `city-directions-v1/C-street-canyon.png` as art-direction reference. Exact prompts are in `prompts.json`; unmodified native RGBA outputs are in `masters/`, copied unchanged into `public/milestone11/canyon/`. `manifest.json` records sizes, measured alpha bounds and SHA-256. Alpha comes from generation; no opaque background extraction or hand-painted substitute artwork. No external stock assets or new fonts. Existing character, paper, font and song provenance remains in the earlier milestone packages. Generated artwork is project-produced; no third-party stock license is asserted. The soundtrack retains its existing project rights status.

## Review boundary

The independent critic inspected frames/source, not continuous synchronized playback. Grounding, textured cutaway framing, pre-reveal floor emphasis and lower-neighbor distraction were addressed. The room remains intentionally shallower and paler than the exterior; textured shared frame and amber lighting connect them. The two neighboring building designs are reused at several depths, and distant skyline is one plate. A later full-film adoption must reconcile this new full-screen framing with subsequent registry staging; this proof stops at 20s and does not claim that join is solved.
