# Supporting cast — first fitted identity kits

Status: proposed kits awaiting art-direction review. The earlier M2 pack and registry scene were approved; this is the next gate before chorus production.

All three characters reuse the exact approved Agent407 body library. No anatomy, facial design or master image was regenerated. `contact-sheet.png` shows the organizer with a clipboard (standing and overwhelmed), the sympathetic protester with an outward-held placard, and the courier with an envelope and cross-body satchel (standing and walking). Performance intentions are deliberate holds, restrained reactions and energetic hops respectively; this static sheet does not yet demonstrate animation timing. Sign and paperwork remain blank until shot-specific runtime text is chosen.

## Fit, not just anchors

The review uses ordinary Remotion image layers in `scripts/supporting-cast-review.tsx`. Handheld props pivot at the grip and sit behind the paw. The satchel uses two instances of the same image: a rear layer and a clipped front layer, so the rear strap passes behind the body while the diagonal front strap reaches the opposite hip. Walking has its own angle/offset. These are fitted placements for the pictured poses, not an assertion that one transform fits every pose. Check shoulder contact, hip position, unobscured face, paw contact and silhouette again when adding another pose. No mesh warping or rig was needed.

The earlier goggles now use per-pose forehead tilt (`sprite.mountDegrees.head`); review all six in `../pack-v1/goggles-fit-review.png`. These remain a later-story accessory, never an opening-registry costume.

## Provenance and reproduction

Four separate built-in Codex image-generation outputs, using the approved standing master as style reference; exact prompts in `prompts.json`. Native lossless RGBA originals are retained in `masters/`. Native dimensions, hashes, derivative dimensions and alpha recipe are recorded in `manifest.json`. Highest useful native detail was requested; the built-in tool exposes no numeric resolution selector. No source enlargement, atlas extraction or body redesign. No third-party stock asset was used; generated provenance is not a legal exclusivity claim.

```powershell
python scripts/prepare-accessories.py --pack supporting-v1
npx remotion still scripts/supporting-cast-review.tsx SupportingCast assets/accessories/supporting-v1/contact-sheet.png
npx remotion still scripts/supporting-cast-review.tsx SupportingProps assets/accessories/supporting-v1/prop-sheet.png
npx remotion still scripts/accessory-review.tsx GogglesFit assets/accessories/pack-v1/goggles-fit-review.png
npm run check
```

Rule Zero: the concrete need is three prop-based identities for the first chorus. Reused approved sprites, Remotion images/transforms, existing anchors and alpha/padding preparation. Added four illustrated props, local mounting angles and two static review compositions. No new dependency, renderer, rig or crowd subsystem. Verify the light/dark sheets and grip/strap placement before multiplying variants or starting the chorus.
