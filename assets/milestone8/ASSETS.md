# Asset inventory and smallest next art batch

The initial blocking reused existing art. Following Leo’s material-reference correction, built-in imagegen produced one proposed castle and one revision (two native outputs, first superseded). No new dependencies, model downloads or external paid services were introduced. Exact prompts are in art-prompts.json. The rough geometric pieces are blocking aids, not approved final illustrations. Existing native masters are preserved; this pass uses production PNG derivatives directly, never contact-sheet cutouts.

| ID | Existing source / reuse | M8 treatment and status |
|---|---|---|
| approved-body | `public/characters/agent407/`, six 1400×1500 derivatives; `src/sprites.ts` measured anchors | Approved shared model. All agents reuse it. Pose/pivot swaps, no joint rig. |
| gpu-collage | `src/PaperCollage.tsx`, M5 paper parts | Approved flat construction and fan coast. Optional absolute power-down time added; original default behavior preserved. |
| village-cutouts | `public/milestone5-2/`, bounds in `src/village-assets.ts` | Approved crayon village design, clouds, sun, hills, houses. Existing `Cut` placement reused. |
| goggles | `public/accessories/goggles-v1.png` | Approved loose prop. Temporary head-anchor overlay in rough film; final equipped pose copies still needed. Invention, set-down and pickup paths are explicit. |
| cache-cutout | Runtime card, lip, patch, thread | Rough layout for hidden channel. No new illustrated room required to evaluate blocking. |
| mail / emotes | Existing envelope, clipboard, question/rays, plane and dust | Original accessories reused. Night Shift plane/dust are proposed material studies, not newly approved art. |
| rich-castle-v2 | `masters/castle-v2.png`, copied losslessly to `public/milestone8/`; 1536×1024 RGBA | New proposed hero castle follows Leo’s paper-village reference. Native alpha retained; bounds measured for a stable ground footprint. No upscaling or contact-sheet extraction. |
| fantasy-cutouts | Existing crayon village, layered paper sky/foliage, runtime moat and bridge; existing dust cutout | Dust clouds conceal in-place swaps. Remaining terrain and props are rough blocking; no claim of completed lush-world art. |
| rpg-props | Runtime cardboard sword, wizard hat, flag | Temporary overlays; final shields/staff and natural grip need fitting. |
| shrug | Approved standing body with temporary palm cutouts and tilt | Blocking only. Needs one integrated, proportions-checked palms-up / shoulders-raised pose. No anatomical redesign. |
| boss-costume | Approved bunny inside runtime server-card costume | Rough visible costume; peaceful rotated cheer silhouette is not a final belly-up pose. Needs standing costume and belly-up equipped copy, plus removed costume. |
| runtime-ledger | Finger Paint / Bitcount Single, abstract ink strokes; Agent407 and PHASEONE10841 | Two handles already documented in project historical notes; unreadable marks are not fabricated names. OAIResearchMar26 is explicitly artistic crossover. Expanded historical ledger needs source verification. |
| bundled-fonts | `public/fonts/`, existing OFL files | Approved local typography; no Google Fonts network fetch. |
| equipped supporting cast | `public/characters/equipped-v1/`, existing PhaseOne/courier/protester | Available fitting studies; rough film reuses clean bodies to avoid treating unresolved equipped pose approval as final. Natural equipped variants should replace rough overlays after shot approval. |

## Minimum additional finished art, after blocking approval

Planning estimate: **13 additional individual assets**, assuming approval of the new castle master, not authorization to generate them now:

- One integrated shrug pose.
- Three boss pieces: worn standing costume, worn peaceful belly-up pose, removed suit.
- Two environment pieces: folded cottage and forest strip. The new proposed castle is already available. Existing sun/cloud/hills remain reusable; bridge can stay assembled from cardstock strips.
- Three modular RPG props: sword/shield pair as separate assets, wizard hat (staff can be a paper strip for the minimum set).
- Four integrated goggled copies: standing, singing, cheer, kneeling. The same shared body can serve both generations; no new species variants.

Count assumes current flag, mailbox, cache, paper planes, folded pages and ledger can be assembled from existing assets and runtime paper. A separate held flag pose or naturally fitted adventurer copies would add assets if required by close-ups. Do not mass-produce before the focused and full animatics receive direction.

Artwork provenance and licensing remain in each original package. The OFL fonts are locally bundled. This inventory makes no new license or exclusivity claim for user-provided music/reference art.
