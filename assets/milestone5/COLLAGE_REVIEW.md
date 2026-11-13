# Flat collage direction study

The user approved the collage baseline (“I LOVE IT”). Preserve this flat, lovingly assembled language as animation is added.

## Fan power-down preview

Human art-direction approval received for `review/collage-power-down.mp4`: flat collage staging, gentle fan motion, and gradual coast to rest as the homes darken. Preserve this behavior and visual language. Approval covers this preview; the demonstration timestamps are not locked music-video cues.

`review/collage-power-down.mp4`: 8 seconds, 1920 × 1080, 30 fps, silent. Two paper fans turn at 12 and 9 degrees/second. At 3000 ms the apartment lighting begins fading; it reaches its dark state at 4500 ms. Fans coast smoothly from 3000–7000 ms and hold still for the final second. These are isolated review timings, not locked song cues. The whole fan cutout rotates as a little paper pinwheel; blades and corrugated rim are still one native asset.

Angles use the analytic integral of a smooth deceleration curve, evaluated from absolute frame time, so seeking does not restart the spin. No CSS animation, simulation or new dependency. TypeScript and all 14 tests pass, including decreasing speed, settled angles, and reverse frame seeking.

```powershell
npx remotion render scripts/paper-stage.tsx PaperCollage assets/milestone5/review/collage-power-down.mp4 --codec=h264 --crf=18 --concurrency=4
```

User direction: keep the new assets, but assemble a genuinely 2D scene with the slightly sloppy placement and loving care of a child making a paper world. This supersedes the miniature architectural perspective of the earlier M5 study.

Review image: `review/collage-v2.png` (1920 × 1080). This is a static proposal for evaluating the assets together, not an approved finished film frame. Earlier construction tests remain preserved.

All placement uses flat x/y coordinates, ordinary draw order and small in-plane rotations. No perspective, room-box camera, random placement or new dependencies. Fans, lamps, curtains, quilt and railings reuse the six native M5 masters through the existing transparent derivatives. Cardstock is reused for meaningful cut-paper backing, furniture, books, tape and GPU connectors. Approved character images remain unchanged. Labels and writing are not baked into assets; the little notes are intentionally blank.

The top home has three books and a table; the middle has two books and a bed; the courier has a pinned note and a wider curtain. Tape spans paper joins. Railings overlap the character stickers. Shadows are shallow paper-on-paper contact cues. Small placement differences are authored, not randomized each frame.

Reproduce from repository root:

```powershell
npx remotion still scripts/paper-stage.tsx PaperCollage assets/milestone5/review/collage-v2.png --frame=0
npm run check
```

TypeScript and all 13 existing/timeline tests passed on the initial collage implementation. No new image generation or paid service was used for this study. See `prompts.json` and `manifest.json` for the reused asset provenance.

Independent read-only critic, reviewing v1 under the new direction: “This feels more charming and intentional under the new flat-collage direction.” They found the arrangement readable rather than messy, and the cream/teal/ochre palette cohesive with the bunnies. The more sculptural fans can read as special folded-paper pieces glued onto the board. Suggestions were to clear lamps from ears, vary resident placement, and group the loose scraps purposefully. These were addressed in v2. No numerical pass is claimed for this new direction study.
