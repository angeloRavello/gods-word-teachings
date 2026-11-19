# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

This folder holds PowerPoint presentations (.pptx) used to teach the Word of God to the user's grandmother, an elderly reader, with the ultimate goal of presenting the Gospel so she can be saved. It is not a software project: there is no build, lint, or test step. The deliverable is always a `.pptx` file (use the `anthropic-skills:pptx` skill to generate it).

All slide content is in **Spanish**.

## Build

- One generator script per lesson: `scripts/build-NN-<slug>.js`. Output goes to `decks/NN-<slug>.pptx`.
- `npm install` once, then `node scripts/build-NN-<slug>.js`.
- `scripts/lib/deck.js` holds the shared palette and slide templates (title, versionsIntro, partDivider, passage, point, compare, statement, gospelStep, prayer, closing, save). New lessons only supply content and call these. Lesson 01 predates the lib and is standalone.
- `passage()` auto-splits verses into slides by estimated wrapped lines, balances them so no slide is left with one verse, and never mixes non-contiguous segments (e.g. Job 9:12 and 9:32) on one slide. Verse labels may be ranges like `"8-11"` (TLA merges verses).
- Scripture lives inside each script as verbatim arrays per version; `**text**` marks words rendered bold red. Strip BibleGateway artifacts: footnote letters, NBLA `*` (historical present), italics underscores, `¶`, and the `\-»` escape (keep just `»`).
- Fetch Scripture one passage per URL; multi-reference BibleGateway pages get truncated.
- If several passages are studied (e.g. Job 9 → 38 → 42), repeat "passage in 4 versions → key points" per passage, then bridge to the Gospel.
- Slide text and speaker notes use neutral Spanish with "tú" (no voseo).
- Visual QA on this machine: no LibreOffice; export PNGs through PowerPoint COM (`$p = (New-Object -ComObject PowerPoint.Application).Presentations.Open(path,$true,$false,$false); $p.Export(dir,'PNG',1280,720)`).
- Passage slides use 36 pt; long blocks (e.g. NBLA Marcos 2:6-9) overflow, so split verses into more slides rather than shrinking the font.

## Deck structure (default for every lesson)

1. **Title slide** — topic and main passage reference.
2. **Full passage reading, in four versions, in this order:**
   1. NTV (Nueva Traducción Viviente)
   2. TLA (Traducción en Lenguaje Actual)
   3. RVR1960 (Reina-Valera 1960)
   4. NBLA (Nueva Biblia de las Américas)

   Use the complete passage, not excerpts. Split across as many slides as needed to keep the font large; label each slide with version + reference (e.g. "Marcos 2:1-12 — NTV (1/3)").
3. **Key points** — each point on its own slide, with the supporting verse(s) quoted and referenced.
4. **Bridge to the Gospel** — connect the lesson to salvation (sin, grace, faith in Jesus, repentance) using the points already made.
5. **Gospel presentation / invitation** — clear, simple, with supporting verses.

## Accessibility / visual rules (reader is elderly)

- Large type is the top priority: body text ≥ 28 pt, headings ≥ 40 pt. Prefer fewer words per slide over smaller text.
- High contrast (dark text on light background or vice versa); avoid thin or decorative fonts — use a plain sans-serif.
- Emphasize key phrases visually: bold, color highlight, bullets. One idea per slide.
- Images are optional; use them only if they support the message and never at the expense of text size.

## Bible text accuracy

- Never reproduce verse text from memory. Fetch the exact text of each version from a reliable source (e.g. biblegateway.com, which carries NTV, TLA, RVR1960 and NBLA) and copy it verbatim.
- Always cite version and reference on every slide that quotes Scripture.

## Lessons

Every teaching point must be backed by a quoted verse on the slide (user requirement: "todo debe tener sustento bíblico"). Verse refs used only in speaker notes must also be verbatim.

- **Lesson 9:** Daniel 2:20-22 + 1 Timoteo 2:1-6 — God controls everything, including politics; earthly things pass; don't worry, pray for the nation and authorities. Gospel bridge via 1 Timoteo 2:5 (one Mediator).
- Decks 03-08 form the series **«Conociendo a Dios»** (Trinity → salvation → eternal life): 03 Trinidad (Mateo 3:13-17), 04 Padre (Lucas 15:11-24), 05 Hijo (Juan 1:1-14), 06 Espíritu Santo (Juan 14:15-27), 07 Salvación (Juan 3:1-17, full 6-step Gospel + prayer), 08 Vida eterna (Juan 11:17-27, final invitation). Decks 03-06 end with a short Gospel bridge (1-2 steps) instead of the full Gospel to avoid repetition.
- **Lesson 2:** Job 9:1-12, 9:32-35, 38:1-18, 42:1-6 — don't question God; Job 9:33 "mediator" bridges to 1 Timoteo 2:5.
- **Lesson 1:** the paralytic brought by his friends to Jesus (Marcos 2:1-12; parallels Lucas 5:17-26, Mateo 9:1-8). Emphasis: Jesus first forgives sins, then heals — **salvation matters more than physical health**. Use this as the bridge to the Gospel message.
