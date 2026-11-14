# Objector and palms-up equipped poses

Two user-requested assets generated with the built-in Codex image tool. No API fallback or new base-character design. [Review sheet](contact-sheet.jpg), [exact prompts and references](prompts.json), [native/derivative manifest](manifest.json), [measured QA](qa-report.json).

**Director selection:** retain the original v1 goggle variants. Leo explicitly accepts handmade differences because agents craft their own pairs. Two smaller-goggle v2 edits were generated before that clarification and remain unused alternatives; their [targeted edit prompt](goggle-fit-prompt.json) is saved. Four built-in image calls total, producing two selected assets and two alternatives. The shrug is staged at300 scene-width units, close to the stopped runners'290, rather than the earlier350-unit emphasis.

- `masters/objector-placard-v1.png`: identity-preserving edit of the earlier equipped protester, using the clean approved standing body and goggles as references. Naturally illustrated pole grip, center-connected blank plaque, integrated forehead goggles. Native1309×1202 RGBA.
- `masters/palms-up-v1.png`: approved standing-body edit with both short arms bent outward and both mitten paws facing up, an amiable shrug and integrated forehead goggles. Native1122×1402 RGBA.

Native outputs are untouched. `public/characters/ensemble-v1/` contains separately padded production derivatives using the established alpha cleanup (≤16 transparent,≥250 opaque, hidden RGB zero),100px margin and no resampling. Generated contour/texture variation is disclosed; these are equipped copies, not pixel-exact body replacements. No text or external stock is baked into either master. Existing clean approved masters remain preserved.

## Integration and measured placement

`src/EnsembleActors.tsx` uses ordinary sprites with measured foot pivots, matching the previous standing sprite's on-screen height. Prepared coordinates: objector foot648,1182; shrug foot658,1365. The blank plaque's runtime text center is972,691, with a290×145 safe rectangle rotated7degrees. These are authored fit measurements, not anatomical claims.

The objector is mirrored as one complete group so they face the incoming crowd. Plaque geometry mirrors with the drawing, while a local counter-flip keeps SERVER,× and! readable. The warnings retain their existing90.7/91.4/92.0s cues. The passing shrug uses the existing path and body tilt. Goggles are already integrated in both assets because this scene occurs after invention. The old vector arms, pole and plaque are removed from this scene's source.

The eight-second master90–98s [updated warning proof](../../milestone9/review/crowd-individuality.mp4) is a candidate integration. [Previous rough-prop version](../../milestone9/review/crowd-individuality-v1.mp4) stays available. No complete film has been overwritten.

## Reproduce

```powershell
python scripts/prepare-accessories.py --pack ensemble-v1
python scripts/ensemble-assets-qa.py
npm run check
node scripts/playset-render.mjs --only=crowd-individuality --stills --video
python scripts/playset-qa.py
```

This is a two-asset batch for the actual warning/Anyway shots. Existing image, transform and runtime-text components are reused; no rig, dependency or generalized character system was added. Still/asset review does not establish human audiovisual approval.
