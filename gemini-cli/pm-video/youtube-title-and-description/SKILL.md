---
name: youtube-title-and-description
description: "Write the publishing metadata for a finished video: title options, the description with its first two lines doing the work, chapter timestamps, tags and a pinned comment. Use when asked to write a YouTube title, write the description for this video, add chapters, what tags should I use, or fill in the upload form for this video. Produces three to five title options with the reason for each, a complete description, chapters built from the transcript or outline supplied, a tag list, and a pinned comment."
---

# YouTube Title and Description Skill

A video that took a week to make is often published with metadata written in two minutes. The title and thumbnail decide whether anyone clicks, the first two lines of the description decide what shows in search, and chapters decide whether a viewer can find the part they came for. This skill writes that layer for a video that already exists. To write the video itself, use `youtube-script-writer`.

> **Not quite this?** Use `youtube-script-writer` to write the script, `thumbnail-creator` for the thumbnail image, and `hook-writer` when you only need an opening line.

## What This Skill Produces

- **Title options**, each under about 60 characters so it is not cut off, with the angle it takes
- **A description**: two lines that state what the viewer gets, then links, then detail
- **Chapters** with timestamps, starting at 00:00
- **Tags**: a short list that mixes the specific topic with the broader category
- **A pinned comment** that gives the viewer one next step

## Required Inputs

Ask for these if not provided:
- **The video**: a transcript, an outline with rough timings, or a description of each section
- **Who it is for** and what they should be able to do afterwards
- **Links to include**: product, sources, related videos, social
- **Anything that must be disclosed**: sponsorship, affiliate links, AI-generated voice or visuals

Chapters need real timings. If only an outline without times is supplied, write the chapter titles and mark each timestamp as `[time]` for the user to fill in. Never invent a timestamp, a view count, a statistic or a claim the video does not make.

## Framework: Earn the Click Honestly

1. **Find the promise.** State in one sentence what the viewer has at the end that they did not have at the start. Every title option must be a way of saying that sentence.
2. **Write titles from different angles**, not five rewordings: the outcome, the question the viewer is asking, the surprising claim (only if the video supports it), the "how", and the plain descriptive one for search.
3. **Put the searchable words first.** A title cut off on a phone should still make sense.
4. **Make the title and thumbnail a pair.** They should not repeat each other; one sets up, the other completes.
5. **Write the description top-down.** Lines one and two repeat the promise in natural language with the main term. Then the links. Then a fuller summary, chapters and credits.
6. **Build chapters from sections, not sentences.** Each chapter title says what the viewer learns there. The first must be at 00:00 and there should be at least three.
7. **Disclose.** Sponsorship, affiliate links and AI-generated material are stated plainly in the description.
8. **Check for clickbait.** If a viewer would feel misled thirty seconds in, rewrite the title.

## Output Format

# Publishing Pack: [working title]

**The promise:** [one sentence]

## Titles
| # | Title | Characters | Angle |
|---|-------|-----------:|-------|

**Recommended:** [number] because [reason]. **Thumbnail text to pair with it:** [three or four words]

## Description
```
[Two lines carrying the promise]

[Links]

[Summary paragraph]

Chapters
00:00 [title]
[time] [title]

[Disclosures and credits]
```

## Tags
[comma-separated list]

## Pinned Comment
> [one question or one next step]

## Not Supplied
[Timestamps or links left as placeholders]

## Quality Checks

- [ ] Every title is a version of the stated promise and is delivered by the video
- [ ] Chapter timestamps came from the user's material; missing ones are marked, not guessed
- [ ] The first two description lines make sense on their own
- [ ] Disclosures are present where sponsorship, affiliate links or AI-generated material apply
- [ ] No invented statistic or result appears anywhere

## Anti-Patterns

- [ ] Do not write five titles that differ by one word
- [ ] Do not promise in the title what the video does not show
- [ ] Do not stuff the description or tags with unrelated popular terms
- [ ] Do not invent timestamps
- [ ] Do not hide a sponsorship

## Example Trigger Phrases

- "Write the title and description for this video."
- "Add chapters to this transcript."
- "What tags should I use?"
- "Fill in the YouTube upload form for me."

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/youtube-title-and-description.html

<!-- pm-claude-skills v84.1.0 | skill: youtube-title-and-description | source: skills/youtube-title-and-description/SKILL.md | sha256: 3286d5a1ded71b4534d123ebe6ef6d4d8d6fc8e140262c2597e3656e80763fed | licence: MIT
     verify: this hash is published at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json -->
