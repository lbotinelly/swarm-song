# Engineering and provenance

## Rule Zero

The real shot requires paper pieces arriving, a chimney feed, cloud occlusion and three bunnies greeting. Existing Remotion/React, absolute frame time, CSS translation/rotation, the approved GPU composition, sprite anchors and the transparent preparation script already provide these. One shot component and one small pure cue function are sufficient. No renderer, physics engine, village generator, scene editor, rig, deformation system, particle system or dependency was added.

`src/ImaginedVillage.tsx` stages the actual objects. `src/village.ts` evaluates millisecond cues directly. `src/village-assets.ts` contains measured prepared-image dimensions and alpha bounds. Bounds position full native PNGs; they are not contact-sheet extractions. Native dimensions and hashes are recorded in `manifest.json`.

## New and reused artwork

Eight built-in Codex image-generation calls produced **seven selected independent parts**: hill A, hill B, house A, house B, sun-v2, smoke, cloud. Sun-v1 is retained as rejected because its top ray touched the canvas boundary. All generation prompts are in `prompts.json`; no model-version control or specific unexposed model is claimed. No API-key service, third-party download, purchased asset or new dependency was used.

Untouched lossless native PNGs are in `masters/`. Separate production derivatives are in `public/milestone5-2/`. The existing preparation recipe sets alpha ≤16 to zero, ≥250 to 255, preserves intermediate alpha, zeroes hidden RGB, and adds 100 pixels on all sides. It does not resize or enlarge masters. Alpha cleanup is disclosed; native files remain intact.

Reused: approved Agent407 standing/singing/cheer sprites and measured foot anchors; Night Shift PhaseOne and Courier wardrobe derivatives; envelope and music-note assets; M5 paper stock, fans, room props and collage code. The old Night Shift cloud bank was evaluated but rejected for this scene because its rectangular scenic edge did not suit an independent cloud. One new cloud was generated instead.

Generated artwork is project-specific synthetic material. No third-party stock-art license was introduced; original reference and existing project asset provenance remain applicable. This is provenance documentation, not a legal conclusion about generated-art ownership.

## Verification

- TypeScript plus 16 tests cover the existing engine and new direct/reverse frame seeking, finite state, ordered assembly cues, differential parallax, courier settling and the smoke stem remaining behind the lip.
- `scripts/village-qa.py` checks all eight native/derivative hashes, production padding and hidden RGB, plus the six approved character native hashes.
- Frame 354 is rendered twice directly. Current comparison is pixel-identical; the report records both hashes. The harness allows the already documented narrow Chromium antialiasing tolerance (max 5/255, mean below .002) if the renderer differs across processes.
- Actual rendered removal probes verify that removing the sun changes no pixels in an opaque cloud-covered ROI, while removing the cloud exposes the sun there.
- Removing smoke affects thousands of pixels above the chimney and zero pixels below its lip. Source geometry keeps the long stem in the hidden channel throughout its rise.
- The complete MP4 is 1920 × 1080, 30 fps, 420 frames / 14 seconds. No audio stream is intentional.

See `review/qa.json` for measured results. Technical checks do not establish emotional pacing or independently verified continuous playback; the critic reports keep that distinction explicit.
