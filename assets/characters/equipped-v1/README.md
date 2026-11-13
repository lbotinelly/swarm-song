# Integrated equipment — first standing review

User-approved production approach (November 13, 2026): standalone props remain their best presentation for discovery, pickup and handoff. Once worn/held, use a separate illustrated equipped copy of the baseline character, with perspective, grip and occlusion integrated. Clean masters are never replaced. This supersedes the earlier assumption that every worn prop must remain a runtime overlay.

This first review contains PhaseOne holding a clipboard, the Ethical Protester holding a blank placard, and the Courier wearing a satchel. One standing pose each, no goggles. New equipped artwork awaits visual approval before multiplying poses or beginning the chorus. The previous mechanical fitting study remains archived under `assets/accessories/supporting-v1/`.

## Files and provenance

- `masters/`: three untouched native lossless RGBA outputs from built-in Codex image generation, each an identity-preserving edit using the clean standing production sprite plus the corresponding standalone prop. These are generated edits, not pixel-identical copies of the body.
- `prompts.json`: exact prompts and reference paths. Requested highest useful native detail; no numeric resolution selector is exposed by the built-in tool.
- `manifest.json`: source/derivative hashes, actual dimensions and cleanup recipe. PhaseOne and Courier are 1212×1298 native; Protester is 1316×1195 native.
- `public/characters/equipped-v1/`: padded production derivatives; no enlargement or resampling. Existing authorized alpha cleanup removes faint noise; originals remain intact.
- `contact-sheet.png`: clean baseline beside the three equipped edits, on cream and navy, displayed at approximately equal cheek width. Never extract sprites from this sheet.

Visual QA: checked ear/face identity, short legs, compact torso, watercolor softness, paw overlap, satchel strap contact, visible feet and external white contour. Clipboard clip overlaps the lower cheek edge but leaves eyes/mouth clear. Placard is blank and outside the face. Slight generative texture/contour variation remains for art-direction review; no claim of pixel-exact body preservation. All readable sign text will be a runtime overlay. No third-party stock artwork used; generated provenance is not a legal exclusivity claim.

## Reproduce

```powershell
python scripts/prepare-accessories.py --pack equipped-v1
npx remotion still scripts/supporting-cast-review.tsx EquippedCast assets/characters/equipped-v1/contact-sheet.png
npm run check
```

Reuse: the existing alpha/padding script and Remotion review entry point. Rendering an equipped character needs only an ordinary sprite swap; no wearable rig or new dependency. New body coordinates must be measured per equipped pose before animation; do not blindly reuse the clean sprite's pixel anchors. Detachable emotes and loose props remain separate. Integrated goggles will be made only for shots after the established invention/inheritance moments.
