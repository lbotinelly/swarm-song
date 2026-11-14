# Milestone 9 — The world is a playset

[Playable review gallery](review/index.html) · [Art bible](ART_BIBLE.md) · [Independent review](REVIEW.md) · [QA](qa-report.json) · [Asset inventory](asset-library.json).

Eight new native masters support the priority kit: cloud bank, sun, trees, garden strip, cottage, workshop, vegetation-only bush variant and flower. Existing sky stock, tissue, hills, cloud, castle, smoke, bodies and props complete the playset. The original garden strip Leo liked is preserved. The layered variant makes five flowers independently responsive to scene wind while the vegetation remains planted. It is an edited variant, not a claim of exact pixel decomposition.

## Focused proofs

- **Latest revised crafting candidate:** [Magic tools: pop, catch, wear](review/goggle-magic.mp4). Three friends use the existing watercolor wrench; small paper-smoke bursts produce complete goggles, which arc to their waiting paws, hold briefly, then settle on their foreheads by44.9s. The13s excerpt retains master42–55s and protected captions. Leo rejected the earlier lens/strap assembly; `goggle-craft.mp4` remains archived for comparison. This is a new performance candidate using the existing rough scene staging.

- Hero still and 12s living town, actual master55–67s: differential parallax, cloud drift, balcony greeting, delivery, banner raising and smoke.
- Eight-second transformation, actual master83–91s: three in-place building changes followed by terrain, trees and sky. Preserves the humble cottage and original hill geography. Captions reuse M7 unchanged.
- Fourteen-second silent bush study: vegetation, five attached flowers and front-leaf occlusion respond to the same wind field used by town smoke/banner. Includes a breeze reversal.
- Nine-second silent vent close-up: director-revised vertical grille, constant-scale original plane through near, channel and deeper layers, fully hidden at the terminal bend, then nose-first return through the same masks. The tall openings preserve wing clearance.
- Eight-second registry candidate, actual master23–31s: original V3 approach, grip, paw-attached pull, reaction and caption performance; only the vent candidate is selected by an optional prop. Previous clips and default source behavior remain preserved.
- Caption-composition stills, inherited-goggles continuity still and edge-inspection contact sheets.
- Latest director correction: a13s collective goggle-crafting excerpt (master42–55s), plus continuity frames across the first generation, the ungoggled second awakening and final memory chorus. All first-generation town/crowd/costumed appearances now retain goggles after the crafting scene. The explicit Agent407 inheritance set-down remains. Source staging and canon are corrected; historical full-film and study clips are preserved rather than silently overwritten.

The source pasted brief ends mid-sentence at “These two”; no missing closing text was inferred. The exact night-sky image arrived later in the chat and is preserved under reference/. The separate isolated lavender cloud reference remains unavailable.

## Reproduce

From repository root with existing Node, Python/Pillow/NumPy and FFmpeg:

```powershell
python scripts/prepare-accessories.py --pack milestone9
npm run check
node --test src/playset-wind.test.ts
node scripts/playset-render.mjs --stills --video
python scripts/playset-qa.py
```

Use `--only=vent`, `--only=wind`, `--only=registry`, `--only=blossom` or `--only=living-town` for bounded iterations. `--only=bush-layers --stills` produces the assembly view. New shots are registered in scripts/playset-stage.tsx; the full film is not rerendered or replaced. Run QA after rendering finishes to avoid Windows readers holding image files while the renderer writes them.

`node scripts/playset-render.mjs --only=goggle-magic --stills --video` reproduces the revised tool trick. It writes a separate version and preserves the rejected assembly clip.

Native sources remain in masters/, production padded copies in public/milestone9/. The existing preparation script was minimally extended with one package choice. No dependency, model download, paid API fallback or new animation framework. Eight built-in imagegen calls, individual prompts recorded in this package; no claim of exposed model-version selection. Generated artwork is project-specific synthetic material. User reference/music rights are not recharacterized; fonts retain their existing OFL notices.

## Review boundaries and remaining needs

The critic's material checkpoint allowed the small architecture batch. Subsequent composition/physical checks caught and corrected plane clearance, smoke contact, hidden primitive cottage and unclear thought setup. Scores and remaining limitations are in REVIEW.md. Technical checks and sampled frames do not constitute Leo's continuous audiovisual approval.

Future production needs, deliberately not generated now: dedicated bridge/crossing, market stall, separate watchtower, additional flower colors, night-sky modular kit and the newly directed GPU-city circuit lighting. The current kit proves independent assembly and interaction before expanding inventory. No S16 duration or audio decision is made here.
