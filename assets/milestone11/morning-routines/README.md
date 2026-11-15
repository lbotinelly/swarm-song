# The apartments wake up

Focused 0–20s candidate with the approved elevated camera, city artwork and master audio. Earlier films, including the approved elevated approach, are preserved. This new acting/caption placement awaits director playback.

Open `review/canyon-opening-20s.mp4` or `review/index.html`.

## Action ledger

Floors count from the top. Every floor has a deterministic routine, even where the camera only reveals it briefly.

| Floor | Wake | Ongoing task |
|---|---:|---|
| 1 | 8.1s | Stretch, collect news and read |
| 2 | 8.9s | Prepare coffee, then sweep |
| 3 | 9.3s | Collect and carry a letter, then read it |
| 4 — upper neighbor | 9.4s | Yawn, stretch, collect news, read with small scanning tilts |
| 5 — protagonist | 12.8s | Rise, yawn, stretch, walk to task list, pick it up, read with ellipsis |
| 6 — lower neighbor | 8.7s | Yawn, stretch, walk to coffee maker, brew and sip, collect broom, sweep |
| 7 | 9.8s | Wake, stretch, collect broom and tidy |
| 8 | 8.5s | Collect and carry a letter, then read it |

Hero timing: rise 12.8–13.4, yawn 13.4–14.6, stretch 14.6–15.9, approach list 15.9–17.2, pickup 17.2–17.9, reading 17.9–20s. The lower neighbor returns its mug to the station during 15.25–15.8s before walking empty-pawed to its broom and starting to sweep at 17.4s. No idle state follows completed chores. Reading includes attentive tilts; sweeping includes coordinated body/hand-mounted broom motion and gradual traversal. No goggles in this opening.

Neighbors use the same approved anatomy at a smaller on-screen size to remain readable in the partial floors. Their sleeping and waking scales match. The reduced neighbor dimming and smaller captions over the left-hand city keep the lower-floor actions visible. The lyric timeline and word animation remain unchanged; caption placement is new in this candidate only.

## Reuse and provenance

Approved standing, kneeling, cheer (stretch), walking, sleeping and cushion assets are reused. Clipboard and envelope are existing assets. TASKS/NEWS headers, list lines and ellipsis are render-time overlays, with no invented story-task names. New imagegen assets: matched yawn pose, equipped coffee-sipping pose, watercolor coffee station and broom; exact prompts (`prompts.json` and `sip-prompt.txt`) and native SHA-256 records accompany untouched native RGBA masters and production copies. The broom alpha edit preserves its die-cut silhouette; gray RGB outside the object is fully transparent. No opaque background extraction, new framework or new dependency.

`morning-routines.ts` is shot-specific blocking. `MorningResident.tsx` reuses existing sprites and measured hand/foot anchors. Broom transformations share the body/hand hierarchy. The `Morning` composition opts into performances; `Approach` remains the approved previous rendering.

The reusable `item-actions.ts` pickup now keeps each prop in the room until launch, arcs it to a live mount, and follows the agent after catch. Boards, broom and letters use one rendered sticker throughout. The coffee station uses a new empty-tray variant plus a standalone mug: lower-neighbor mug launch 13.4s, catch 14.1s, return launch 15.25s, table landing 15.8s. At catch only, the mug becomes part of the matched equipped sipping pose; at return it becomes a standalone item again. The older station-with-cup master is retained as provenance but is unused. New native `coffee-empty` and `mug` assets and their edit/generation prompts are included. Facing-aware attachment math supports other items, including goggles, without changing the earlier approved crafting film.

## Reproduce

```
npm run check
node --test src/morning-routines.test.ts
node scripts/canyon-render.mjs --morning --stills --video
python scripts/canyon-qa.py --morning
```

Tests cover independent wake times, the hero's readable sequence, continuous room traversal and purposeful action through the excerpt. Video QA covers master audio, decode, true opening black and preserved previous inputs. Static review does not substitute for director playback of pace, pickup, stretch or sweep.
