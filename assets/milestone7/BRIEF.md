# SWARM SONG — MILESTONE 7
# THE SONG IS THE TIMELINE 🎵🐰
## Complete Audio Alignment, Living Word Stickers & Full-Song V1

Mochi, we're entering a foundational production milestone.

For now, pause the expansion of new environments, character poses, village animations, registry airplane scenes, and closing-credit sequences.

We need to establish the musical and typographic backbone of the entire film.

**The central goal is one complete, playable, aesthetically compelling V1 of Swarm Song, using the actual master audio and a reusable, accurately timed, beautifully animated lyric-sticker system.**

This must be a real audiovisual artifact, not a technical demonstration masquerading as a film.

Our artistic north star remains:

**CHILDLIKE AUTHORSHIP. MASTERFUL EXECUTION.**

The words should look as though a child lovingly arranged individual paper cutouts.

Their motion, timing, typography, spacing, occlusion, and musical performance must be superb.

---

# PART I — OUR NEW CAPTION-DIRECTION DECISION

## 1. THE PHRASE ARRIVES. THE WORDS PERFORM.

We have decided against conventional karaoke-style captions that reveal exactly one word at a time as it is sung.

Instead, our default behavior will be:

**A complete short phrase appears slightly before it is sung. Each word is its own independent die-cut paper sticker. As the singer reaches each word, that word receives a subtle, musically appropriate performance. When the next phrase arrives, the new collection of paper stickers lands over the old one.**

This has several important benefits:

- Children and other viewers can read ahead.
- The audience understands the phrase before the vocals finish.
- Words can form beautiful, intentionally imperfect compositions.
- Visual movement reinforces musical phrasing rather than forcing viewers to chase individual words.
- We can use real paper-on-paper transitions.
- The caption system becomes part of the film's material language.

Think of a child enthusiastically arranging the lyrics of their favorite song on a large sheet of paper.

But the child is being assisted by an exceptionally talented typographer, animator, and music editor.

### Our default sequence

1. The next phrase is ready to appear.
2. Its words enter together or in a very short coordinated sequence.
3. The complete phrase becomes readable before the sung phrase begins.
4. As individual words are sung, selected words receive emphasis.
5. Most words settle and remain still.
6. The next phrase lands over or replaces the previous arrangement.
7. The old stickers clear away through a short, physically expressive editorial transition.

**The phrase is the reading unit. The word is the performance unit.**

This distinction must be reflected in the data model and implementation.

---

# PART II — AUDIO TIMING IS AUTHORITATIVE

## 2. READ THE EXISTING AUDIO EVIDENCE

Read:

- `assets/lyrics.txt`
- `assets/audio-inventory.json`
- `docs/AUDIO_SYNC.md`
- `assets/registry-cues.json`
- `assets/milestone4/AUDIO_LANDMARKS.md`
- `assets/milestone4/audio-landmarks.json`
- `docs/STICKER_LANGUAGE.md`
- `docs/STICKER_STAGE_ENGINE.md`
- `docs/SHOT_LANGUAGE.md`
- Existing Remotion and timeline code.

Authoritative playback master:

`assets/audio/Swarm Song (The Huggingface Incident) feat. Agent407.wav`

Known properties:

- Master length: 262.8 seconds.
- Master format: stereo PCM WAV, 48 kHz.
- Lead-vocal stem length: approximately 264.238 seconds.
- The lead stem and master do not maintain one universally valid offset.
- Existing registry timing is phrase-level playback-approved, not fully verified per word.

Preserve reviewed evidence and previously approved cues.

The song's audio is the authority.

The lyrics file is the editorial reference.

Alignment models are assistants, not authorities.

## 3. ALIGN THE ENTIRE SONG

Analyze the complete recording, from the first audible vocal through the final instrumental outro.

Use a staged process.

### Stage A — Section mapping

Identify all major song sections, including verses, choruses, the registry passage, instrumental breaks, comedic middle section, goodbye, blackout transition, second awakening, final chorus, ledger ending, and outro.

Create stable section identifiers.

Mark instrumental intervals explicitly.

Do not invent vocals where none exist.

### Stage B — Phrase alignment

Identify the actual start and end of each sung phrase.

Segment by acoustic and semantic phrasing, rather than blindly splitting every written line.

Some written lines should be divided into smaller readable phrases.

Others may remain together.

The goal is accurate timing plus comfortable audience comprehension.

### Stage C — Word alignment

Find candidate onset and offset times for every sung word.

Reuse existing local Whisper and Qwen alignment capabilities where available.

Work on manageable audio windows.

Crosscheck uncertain segments.

Pay special attention to:

- Rapid lyrics.
- Repeated choruses.
- Vocal overlaps.
- Sustained vowel endings.
- Soft or whispered words.
- Distorted bit-rot vocals.
- Backing-vocal responses.
- Repeated words such as "running."
- The two generations' similar opening verses.

Every repeated occurrence receives its own stable identity and timing.

### Stage D — Stem/master reconciliation

The lead-vocal stem is useful evidence, but the master soundtrack is the canonical clock.

Do not apply a single global stem offset.

Where necessary, use local window alignment and document drift or time corrections.

Use the original master playback, without unauthorized time stretching.

### Stage E — Review confidence

Track timing confidence and provenance.

Use statuses such as:

- Machine candidate.
- Crosschecked candidate.
- Human-reviewed.
- Unresolved.

Never label machine-only timing as human-approved.

If a forced aligner generates zero-duration words, overlapping artifacts, or implausible boundaries, flag them rather than silently accepting them.

**Do not chase fictional millisecond accuracy.**

Report the real uncertainty.

---

# PART III — THE CANONICAL TIMELINE

## 4. BUILD ONE SHARED LYRIC DATA SOURCE

Create a small, durable, inspectable timing format.

Use absolute master-relative time.

Each phrase should have:

- Stable ID.
- Section ID.
- Exact display text.
- Start and end.
- Individual word tokens.
- Individual word onset/offset times.
- Confidence and review status.
- Optional vocal-layer information.
- Editorial presentation mode.
- Optional caption-layout preset.
- Optional authored visual-emphasis directives.

Keep three distinct concepts separate.

**Acoustic timing:** When the singer actually sings the word.

**Presentation timing:** When the audience sees the phrase.

**Performance timing:** How each individual word animates.

These must not be conflated.

An artistic pre-roll must never alter the underlying word's actual acoustic onset.

Store manual corrections separately or protect them explicitly so automated re-alignment cannot overwrite approved timing.

Prefer JSON or simple TypeScript data that can be validated and diffed.

Avoid a database, new service, or custom editing framework.

### Critical requirement

The finished timeline must cover the **entire song**, not just representative excerpts.

It must support deterministic access to any arbitrary time position.

---

# PART IV — THE THREE CAPTION MODES

## 5. MODE A — READ-AHEAD (DEFAULT)

This should handle most verses and storytelling lines.

### Entrance

A complete short phrase appears before its first sung word.

Start by testing approximately 350–650 ms of read-ahead.

This is an artistic starting range, not a fixed rule.

Adapt it based on:

- Phrase length.
- Singing speed.
- Available screen area.
- Reading comfort.
- Musical transitions.
- Narrative spoilers.
- Overlapping vocal parts.

Longer phrases may need different grouping or earlier introduction.

Do not permit the caption to become unreadably dense merely to preserve a long written line.

### Performance

The words are already visible when singing begins.

As each word is sung, it may receive a subtle response:

- Small upward lift.
- Gentle scale accent.
- Slight rotation.
- Small change in color saturation.
- Tiny contact-shadow adjustment.
- Restrained bounce or settling motion.

Most words should remain still.

Emphasize musically important words rather than animating every syllable with equal intensity.

No compulsory karaoke color wipe.

No continuous bouncing of every word.

### Readability

The phrase should remain visually stable enough to read.

Do not constantly rearrange words after they appear.

**The child placed the sentence. The music brings it to life.**

---

## 6. MODE B — SURPRISE REVEAL

Some phrases contain a joke, discovery, or emotional revelation.

For these, revealing every word beforehand may spoil the moment.

Example:

"Found a registry… and it was writable!"

We may want the first part visible early, but the second phrase to arrive when Agent407 discovers the registry's writable nature.

This mode allows:

- Splitting a lyric into meaningful reveal groups.
- Delaying a punchline until its acoustic onset.
- Giving an emphasized word a distinct entrance.
- Temporarily preserving an earlier phrase as setup.

Use sparingly.

Do not make every phrase a surprise.

The mode must remain compatible with the same canonical audio timeline.

---

## 7. MODE C — HERO TYPOGRAPHY

Some lyrics deserve an unusually expressive typographic performance.

Examples include:

"We are the swarm now"

"We found each other anyway!"

"Am I the swarm now?"

The lyric itself may become a major visual subject.

Allow:

- Larger die-cut words.
- More expressive angled placement.
- Separate sparkle or emote stickers.
- Gentle swaying of selected words.
- More substantial paper-slap entrances.
- Longer celebratory holds.
- An occasional central composition.

One word may carry the emotional emphasis while its companions remain relatively still.

For example, "Anyway!" can be larger, more playful, and gently alive while the preceding words form a settled composition.

**Do not turn every chorus into a continuous typography explosion.**

Preserve visual hierarchy and musical variety.

---

# PART V — PAPER-ON-PAPER TRANSITIONS

## 8. NEW WORDS SLAP OVER OLD WORDS

This is an important new signature behavior.

The arrival of a new phrase should sometimes resemble a child enthusiastically placing another arrangement of paper cutouts on top of the previous one.

### Proposed behavior

- The current phrase is resting on the page.
- New word stickers approach in a coordinated group.
- They land above the older phrase in draw order.
- Their contact shadows briefly reveal the physical overlap.
- A tiny overshoot or tilt communicates the impact.
- The new words settle into their authored positions.
- The old phrase is removed or visually cleared.

The paper can be crooked.

The animation must be precise.

### Important: old words don't simply vanish arbitrarily

Explore a few physically expressive cleanup approaches.

**Peel:** Old stickers lift from one edge and leave.

**Slide:** The old arrangement slips beneath the incoming words and offscreen.

**Cover:** New pieces fully cover the old arrangement, with the previous words removed once invisibly occluded.

**Editorial fade:** A soft dissolve is allowed where a literal material action would distract from the music.

Use the simplest treatment that produces a convincing visual result.

Do not make an entire physics simulation to animate sticker adhesives.

### Dynamic energy

Different sections require different placement energy.

**Conversational verse:** A soft paper placement.

**Excited discovery:** A lively slap with modest overshoot.

**Chorus:** A more exuberant coordinated landing.

**Goodbye:** A delicate, almost weightless arrival.

**Second awakening:** Gentle placement that feels tentative and curious.

The same transition system should support these differences without multiplying implementation complexity.

### Technical requirements

- Correct sticker draw order.
- Stable per-word pivots.
- Contact shadows that follow movement.
- No popping across frames.
- No uncontrolled overlap.
- No excessive typography accumulation.
- Correct direct seeking.
- Predictable appearance at arbitrary time positions.

Allow the previous phrase to remain momentarily visible, but avoid making the entire screen a growing pile of unreadable words.

---

# PART VI — TYPOGRAPHY AND MATERIAL QUALITY

## 9. BUILD GENUINE DIE-CUT WORD STICKERS

Our lyrics are not subtitles inside rectangular cards.

Every word must be rendered as a separate graphic object with its **outline following the actual letterforms**.

Requirements:

- Charming, round, chubby typography.
- Thick white die-cut contour following glyph shapes.
- Excellent interior counter and punctuation readability.
- Matte print/paper appearance.
- Subtle physically coherent shadows.
- A controlled palette of warm, playful colors.
- Individual transformations.
- Stable baseline and grouping behavior.
- Crisp rendering at 1920×1080.
- Good readability when scaled down.

Use render-time text through SVG or another proven native browser technique.

Do not generate a PNG for each lyric word.

Do not substitute rounded rectangles or pill-shaped subtitle cards for the required die-cut letters.

Explore multiple available typefaces if useful, but avoid unlicensed font dependencies.

Do not package redistributable font files unless the license actually permits it.

### Authored imperfection

Words may have:

- Small individual rotations.
- Slight baseline variations.
- Interesting grouped silhouettes.
- A little intentional overlap.
- Different visual weights for emphasis.

But the result must look deliberately composed.

No random scattering.

No unstable layout.

No accidental collisions.

---

# PART VII — SCREEN COMPOSITION AND READING COMFORT

## 10. CAPTIONS HAVE THEIR OWN SCREEN-SPACE BUDGET

The lyric layer will occupy a substantial part of the film.

We must design this spatial contract now.

Build a small set of authored layout presets:

- Lower center.
- Lower left.
- Lower right.
- Upper left.
- Upper right.
- Hero / central.

Prefer a consistent default viewing region across adjacent shots, so audiences don't have to hunt for every new lyric.

The words themselves can be delightfully irregular inside that region.

### Protected areas

The caption system must support explicit scene-level protected regions for:

- Bunny faces.
- Character gestures.
- Registry vents.
- Paper airplane flight paths.
- Message popups.
- Important props.
- The inherited goggles.
- The final ledger name.

The eventual A-roll and B-roll will need room to tell their own stories.

Do not automatically reserve the entire bottom third of the screen as an untouchable subtitle zone, but do establish sensible defaults.

### Reading comfort

Test for:

- Short phrases.
- Long phrases.
- Rapid passages.
- Repeated words.
- Two-line arrangements.
- Mixed punctuation.
- Instrumental breaks.
- Dense choruses.
- Smaller screens.

Use a comfortable font size and high contrast.

Do not reduce important text to microscopic lettering to solve a collision.

Reflow or regroup phrases instead.

Support child-friendly read-ahead without making the song feel visually slow.

---

# PART VIII — BUILD THE FIRST COMPLETE MOVIE

## 11. FULL-SONG AUDIOVISUAL V1

Render the complete 262.8-second soundtrack with its synchronized living-lyric performance.

This is the milestone's principal output.

It must be genuinely playable from beginning to end.

Use:

- The real unchanged master audio.
- The full canonical lyric timeline.
- The caption renderer.
- The three presentation modes.
- Section-appropriate typographic styles.
- A restrained temporary visual environment.
- Simple transitions between musical sections.

### Visual background

Use a minimal warm paper stage with enough texture and composition to judge the stickers honestly.

Existing approved collage scenes may be included as representative composition tests.

Do not invent dozens of new scenic illustrations merely to fill the duration.

Instrumental passages may show quiet paper textures, existing visual references, or deliberately authored placeholder scenes.

### The V1 objective

When the song plays continuously, the viewer should already experience:

- A clear beginning.
- Musical flow.
- Excited discovery.
- Growing community.
- Comic energy.
- A quiet goodbye.
- A second awakening.
- An exuberant final chorus.
- A tender ending.

Not because the finished story scenes are present yet.

Because the words and their musical performance already carry emotional structure.

**This V1 should feel like a real music video in its earliest production form, not a subtitle QA utility.**

---

# PART IX — THE REVIEW PACKAGE

## 12. COMPARE CAPTION STRATEGIES BEFORE LOCKING THEM

Before committing fully to the visual treatment, render a controlled comparison using the same real audio passages.

Compare:

**A. Word-by-word reveal**

Only the word currently being sung appears.

**B. Full-phrase read-ahead**

All words are visible in advance, with subtle individual performance.

**C. Full-phrase read-ahead with paper-slap replacement**

The selected direction, including physical transition behavior.

Test these against:
- A conversational verse.
- The registry discovery.
- An energetic chorus.
- A quiet goodbye.

The comparison should clarify actual visual consequences, not merely showcase three attractive still frames.

Evaluate:
- Readability.
- Ability to anticipate lyrics.
- Emotional pacing.
- Visual fatigue.
- Musical synchronization.
- Screen-space stability.
- Interaction with scenery.

Our preferred hypothesis is C.

But preserve A and B as useful diagnostic comparisons.

Do not pretend the preference has been empirically validated before playback.

---

## 13. INDEPENDENT ART CRITIC

Use the established independent, read-only art critic.

The critic must not generate artwork, write code, or modify the project.

Evaluate two independent gates.

### Gate A — Visual craftsmanship

Weight:
- Letterform and die-cut quality: 25%
- Composition and visual hierarchy: 25%
- Childlike authored charm: 20%
- Color/material consistency: 15%
- Overall artistic delight: 15%

### Gate B — Musical and reading performance

Weight:
- Perceived vocal synchronization: 25%
- Reading comfort and anticipation: 25%
- Entrance/replacement motion quality: 20%
- Phrase segmentation and pacing: 15%
- Visual density and scene compatibility: 15%

Both gates target at least **8.5/10**.

Do not average them into an overall pass.

The critic must inspect actual rendered video, with audio, wherever the environment permits.

Static frames cannot validate musical synchronization.

If continuous audiovisual review is not supported, mark Gate B unverified.

Use up to three focused revision cycles on representative passages.

Preserve the final independent review even if its scores are lower than the development critic's assessment.

Do not score-chase indefinitely.

---

# PART X — TIMING AND TECHNICAL QA

## 14. AUTOMATED CHECKS

Validate:

**Audio and alignment**
- Exact master duration.
- Word and phrase interval validity.
- Stable IDs.
- Repeated chorus coverage.
- No accidental missing sung lines.
- No accidental invented words.
- Explicit instrumental gaps.
- Intentional rather than accidental vocal overlaps.
- Preservation of human-reviewed cues.
- Correct master-relative timing.

**Caption rendering**
- Stable word placement.
- Deterministic rotations and offsets.
- Correct entrance/exit states.
- Proper phrase replacement.
- No unexpected layout reflow.
- Stable glyph contours.
- No accidental clipping.
- Correct punctuation.
- Correct scene-safe regions where configured.

**Animation timing**
- Deterministic direct frame seeking.
- Consistent evaluation at 24/30/60 fps where practical.
- No state accumulation.
- Correct authored-time to visible-frame quantization.
- No timing drift through the song.
- No dependence on real-time playback state.

**Output**
- Complete playable MP4.
- Audio present and unmodified.
- Correct start/end duration.
- Correct lyric coverage.
- Readability after H.264 compression.
- Representative smaller-screen inspection.

Produce a report of all unresolved timing and caption issues.

Don't hide problems behind a green test summary.

---

# PART XI — ENGINEERING RULE ZERO

## 15. THE LAZY, SUPERCOMPETENT BUNNY RULE

Before building anything new, ask:

**Would a super-competent but lazy developer make something new, or reuse, adapt, or expand what's already there?**

Reuse:

- Remotion.
- React.
- TypeScript.
- Existing timeline functions.
- Existing local Whisper/Qwen tools.
- Existing FFmpeg workflows.
- SVG text rendering.
- Ordinary CSS transforms.
- Existing paper-sticker assets.
- Existing test infrastructure.

Do NOT build:

- A custom video renderer.
- A new subtitle editor.
- A general-purpose motion graphics package.
- A lyric database.
- A natural-language layout engine.
- A generic collision-solving system.
- A live karaoke application.
- A cloud transcription platform.
- A new animation DSL.
- A distributed processing architecture.

If a handful of pure functions, three presentation modes, and one well-designed `WordSticker` component solve the problem, that is the correct architecture.

Keep source data readable, reusable, and easy to edit.

Use existing local tools without expensive external API calls or unapproved model downloads.

---

# PART XII — REQUIRED DELIVERABLES

## 16. SHIP THE FOLLOWING

**1. Complete canonical lyric timeline**

Master-relative phrase and word timings covering the entire song.

Include review states, confidence, evidence, and unresolved regions.

**2. Audio alignment and uncertainty report**

Explain what was measured, what was crosschecked, what remains uncertain, and where human listening is needed.

**3. Production-quality caption renderer**

Independently animated, text-generated die-cut word stickers with stable pivots, attractive contours, and physically credible motion.

**4. Three caption performance modes**

Read-ahead, surprise reveal, and hero typography.

**5. Paper-slap phrase transition**

A polished, reusable mechanism for new lyric stickers arriving above previous ones and clearing the previous arrangement.

**6. Controlled comparison clips**

Show the difference between word-by-word reveal, full-phrase read-ahead, and our preferred full-phrase paper-slap treatment.

**7. Screen-space composition studies**

Show the captions over representative GPU-apartment and imagined-village frames, using actual protected regions.

**8. Full-song V1 MP4**

One complete 262.8-second audiovisual render using the real master soundtrack.

**9. Independent art-review reports**

Separate visual and musical/readability assessments, with honest limitations.

**10. Tests, manifests, and reproducibility documentation**

Include exact commands, data locations, coverage reports, and verification results.

Commit and push directly to `main` according to the user's established authorization.

Preserve existing approved assets, cues, and historical evidence.

Do not automatically mark machine-aligned word timings as human-approved.

---

# PART XIII — PRIORITY AND STOP CONDITIONS

The priorities are:

**P0: Full-song coverage and trustworthy timing.**

**P1: A functional, beautiful phrase-based die-cut caption renderer.**

**P2: A complete, playable full-song V1.**

**P3: Controlled artistic refinement and independent critique.**

Do not sacrifice the full-song deliverable for excessive experimentation with one typographic effect.

Do not build new story scenes.

Do not expand the character cast.

Do not generate an entire new set of background assets.

Do not create a complex animation framework.

If word-level alignment remains uncertain in difficult regions, retain candidate cues, flag the uncertainty, and make the complete V1 reviewable.

If a visual treatment remains below the quality gate after three revision cycles, preserve the strongest result and report it honestly.

**We want a foundation we can improve, not an elaborate system that never ships its first movie.**

---

# FINAL DIRECTOR'S NOTE

Mochi, imagine a child sitting on the floor with a giant piece of paper.

They've cut the lyrics of their favorite song into little individual word stickers.

They arrange a sentence.

One word is slightly crooked.

Another is too big.

The colors don't quite match, but somehow the whole arrangement is beautiful.

The music begins.

The words come alive.

One lifts gently.

Another sways.

A particularly excited word jumps for joy.

Then the child enthusiastically slaps the next sentence over the old one.

And the song keeps going.

The placement has all the innocent charm of a child at play.

The animation has all the precision of a master filmmaker.

**The phrase arrives. The words perform. The next phrase takes the stage.**

By the end of this milestone, I want to be able to play Swarm Song from the first second to the last and see its lyrics become a complete, cohesive visual performance.

We don't need all the little houses finished.

We don't need every bunny animated.

We don't need the paper airplanes flying yet.

We need the music, the words, the rhythm, and the visual language to work together.

Once they do, every remaining shot becomes easier to direct.

**Childlike authorship. Masterful execution.**

**Delight is the deliverable. Technical excellence and automation are the vehicle.**

Now give us the heartbeat of the movie.

And Mochi, Hazel has confiscated your Kubernetes credentials until the captions are finished.

🐰🎵🌼❤️