# A gentle focus on Agent407

Leo approved the morning-routines preview and requested a gentle zoom beginning around 14s, giving the protagonist's apartment more of the upper screen. His refinement asks for room around it: background buildings and parts of busy neighboring apartments remain visible.

This separate 0–20s candidate reuses all approved morning artwork, performances, captions and master timing. One optical camera transform eases from 14–19.5s to 1.25× and 55px upward, pivoting around (960,470). Final room bounds are approximately x390–1525, y187–641 at 1920×1080. Side buildings remain visible; the upper resident's feet and a glimpse of the lower resident's ears remain in frame. Leo explicitly said these small signs of life are enough; complete neighboring actions need not stay visible. Captions stay in screen space. No new art or camera framework.

The approved morning-routines movie and earlier approach remain unchanged. The new camera is opt-in via `focus`, composition `MorningFocus`. For future longer integration, hold this endpoint past 20s rather than resetting at the proof boundary.

Reproduce:

```
npm run check
node scripts/canyon-render.mjs --focus --stills --video
python scripts/canyon-qa.py --focus
```

Asset provenance and native hashes remain in `../morning-routines/`. QA checks the previous approved morning movie as well as the 47 previously protected inputs. Frame/source review does not establish continuous playback approval.

Independent framing review found the lead, task list, ears and ellipsis clear, with captions avoiding the protagonist and substantial city margins retained. It noted that neighboring actions become cropped; Leo explicitly confirmed that feet/ear glimpses are sufficient. The final 1.4× frame was inspected after that clarification. Five samples through 14s match the approved morning preview pixel-for-pixel. All 50 existing checks pass.
