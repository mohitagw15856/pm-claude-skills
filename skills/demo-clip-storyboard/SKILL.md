---
name: demo-clip-storyboard
description: "Use when asked to plan a short demo video for a repo, script a 20-second clip, storyboard a GIF for a README or launch post, or make a project look good on X or LinkedIn. Produces the script for the 20-second video that sells a repo: a shot list with a timestamp per shot, on-screen text, exactly what to record, the hook in the first two seconds, and post copy for X and LinkedIn. For a live product demo to an audience, use demo-script; for cutting clips from a long recording, use clip-factory."
version: 1.0.0
---

# Demo Clip Storyboard

On a timeline, a repo gets about two seconds to show something worth stopping for. A good 20-second clip opens on the result, not the install; shows one transformation from before to after; and ends on the one command or link that gets the viewer there. This skill plans that clip shot by shot so it can be recorded in one sitting.

## Required Inputs

Ask for these if not provided:
- **What the project does**, in one sentence
- **The single most impressive moment**: the before and after a user sees
- **The audience**: developers, designers, a general audience
- **What can be recorded**: terminal, browser, phone, editor
- **The call to action**: install command, live demo link, or repo link

## Output Structure

### 1. The hook (0 to 2 seconds)
The opening frame and on-screen text. It must show the end result or the striking before state, never a logo, title card or install step. Give two alternatives and say which to use.

### 2. Shot list
A table that adds up to 20 seconds (18 to 22 is acceptable):

| # | Time | Shot (what is on screen) | What to record | On-screen text (6 words max) | Cut or motion |
|---|---|---|---|---|---|
| 1 | 0.0 to 2.0 | ... | ... | ... | ... |

Rules: one idea per shot, no shot longer than five seconds, text readable on a phone (large, high contrast, on screen for at least 1.5 seconds), and the last shot holds the call to action for at least three seconds.

### 3. Recording checklist
What to prepare before pressing record: demo data loaded, window size (1280 by 720 or a 1080 by 1080 crop for square), font size at least 18 px in terminals, notifications off, cursor highlighting on, a clean shell prompt.

### 4. Captions
Burned-in captions for viewers watching without sound, one line per shot, matching the on-screen text.

### 5. Post copy
- **X**: under 280 characters, opening with the outcome, one line on how, then the link. No more than two hashtags.
- **LinkedIn**: three short paragraphs: the problem in one line, what the project does and for whom, and the link with an invitation to try it or star it.

### 6. Export settings
Format and size for each platform: MP4 (H.264), under 15 MB for X; square or vertical version for LinkedIn; a GIF version under 5 MB for the README if requested.

## Quality Checks

- [ ] The first two seconds show a result or a striking before state, not a logo or install
- [ ] Shot times add up to between 18 and 22 seconds
- [ ] No shot is longer than five seconds
- [ ] Every on-screen text is six words or fewer
- [ ] The final shot holds the call to action for at least three seconds
- [ ] The X copy is under 280 characters and leads with the outcome
- [ ] Every shot says exactly what to record

## Anti-Patterns

- **Opening with the install.** Nobody stops scrolling for `npm install`.
- **Showing every feature.** One transformation, shown clearly, beats a tour.
- **Tiny terminal text.** Most viewers are on a phone.
- **Music-dependent storytelling.** Most clips play muted; the captions must carry it.

## Example Trigger Phrases

- "Storyboard a 20-second demo clip for my CLI tool."
- "Plan a short video that sells my repo on X and LinkedIn."
- "What should my README demo GIF show?"
- "Script a launch clip for my open-source app."
