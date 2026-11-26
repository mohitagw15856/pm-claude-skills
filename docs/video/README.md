# Demo videos for the most-viewed skills

Prompts for making a short demo video per skill with an AI video generator (for example the video tool inside ChatGPT), plus the title, description and tags to use when uploading. The four skills below are the ones people land on most from search.

## Read this first

- **An AI generator cannot show the real product.** It invents screens. Use it for the opening, transitions and closing card. For the part that shows a skill running, record your own screen (FocuSee, or any screen recorder), then cut it together with [`demo-video-kit`](../../skills/demo-video-kit/SKILL.md).
- **It cannot upload for you.** Download the file and upload it to YouTube yourself, with the metadata below.
- **Check every generated frame for invented text.** Generators write plausible nonsense on screens. Regenerate or crop any shot with made-up numbers, logos or product names.
- **Keep it true.** Do not show results the skill did not produce. Run the skill on the sample input in `evals/cases.json` and show that output.

## The structure for every video (45 to 60 seconds)

| Part | Length | Source | What it shows |
|---|---|---|---|
| 1. The problem | 5 s | AI generated | A person facing the blank page or the messy input |
| 2. The request | 8 s | Screen recording | Typing one sentence to the assistant |
| 3. The result | 25 s | Screen recording | The finished deliverable, scrolled slowly, three callouts |
| 4. How to get it | 10 s | Screen recording | The one-line install command |
| 5. End card | 5 s | AI generated or a still | Project name and address |

## Prompt for the generated parts (paste into the video generator)

Use it once per video, replacing the square brackets.

```
Create two short clips in the same visual style for a software explainer video.

Style: clean, modern, soft daylight, shallow depth of field, calm and professional.
Muted colour palette with one warm accent. No on-screen text, no logos, no brand
names, no readable words on any screen or paper. 16:9, 1080p, smooth slow camera
movement, no fast cuts.

Clip 1 (5 seconds): [the problem scene, for example: a product manager at a desk
late in the afternoon, looking at a laptop, a notebook full of crossed-out notes
beside it, visibly stuck]. Slow push-in. Realistic, not stock-photo cheerful.

Clip 2 (5 seconds): the same person, same desk, same light, now relaxed and
closing the laptop, the notebook closed and tidy. Slow pull-back. Leave the right
third of the frame empty and softly out of focus so a title can be added later.

Keep the person, clothing, desk and lighting identical in both clips. Do not show
any screen contents. Do not add music, captions or a voice.
```

For a vertical version, change `16:9, 1080p` to `9:16, 1080 by 1920` and ask for the subject centred.

## Prompt for the narration script (paste into ChatGPT)

```
Write a voiceover for a 50-second product demo video. Plain, calm, British English.
No hype words, no exclamation marks, no claims with numbers.

The video shows an open-source skill for AI assistants called [skill name], from the
PM Skills library. What it does: [one sentence from the skill's description].
On screen the viewer sees: someone types "[the request]", and the assistant returns
[what the output contains, three parts].

Structure, with a word limit for each part:
1. The problem (12 words)
2. The request (18 words)
3. The result, naming the three parts shown (55 words)
4. How to get it: say "It is free and open source. The install command is on screen." (16 words)
5. Close: "PM Skills. One request, one finished deliverable." (8 words)

Return the script as a table with the part, the seconds, and the line.
```

## Per-skill inputs and upload metadata

### 1. youtube-script-writer

- **Live:** https://www.youtube.com/watch?v=2ewtEaM28AU (52 seconds, published 27 November 2026, made in Descript with a recreated interface labelled as illustrative)
- **Problem scene:** a creator at a desk with a camera on a tripod behind them, staring at an empty document.
- **Request to record:** the eval case for `youtube-script-writer` in `evals/cases.json`.
- **Three callouts:** the title and thumbnail idea, the cold open, the section-by-section script.
- **Title:** Write a YouTube script that holds attention: a free AI skill
- **Description:** A free, open-source skill that turns a topic into a full YouTube script: packaging, cold open and a section-by-section outline. Works with Claude, ChatGPT, Gemini, Cursor and others. Install: npx pm-claude-skills add --skills youtube-script-writer. Source: https://github.com/mohitagw15856/pm-claude-skills
- **Tags:** youtube script, ai script writer, claude skills, agent skills, video script, content creator tools

### 2. pricing-strategy

- **Live:** https://www.youtube.com/watch?v=Q2Wbjx4Duck (published 27 November 2026, made in Descript with a recreated interface)
- **Problem scene:** a founder at a whiteboard covered in crossed-out price points.
- **Request to record:** the eval case for `pricing-strategy`.
- **Three callouts:** the value metric, the tier design, the risks and what to test.
- **Title:** Design SaaS pricing tiers with an AI skill (free, open source)
- **Description:** A free, open-source skill that structures a pricing decision: who you are pricing for, the value metric, the tiers and what to test before changing anything. It does not invent willingness-to-pay data; it tells you what to collect. Install: npx pm-claude-skills add --skills pricing-strategy. Source: https://github.com/mohitagw15856/pm-claude-skills
- **Tags:** saas pricing, pricing strategy, pricing tiers, product management, claude skills, agent skills

### 3. clip-factory

- **Problem scene:** an editor scrubbing through a long video timeline, tired.
- **Request to record:** paste a transcript excerpt and ask what is clippable.
- **Three callouts:** the ranked clip list with timestamps, why each clip works, the caption for each.
- **Title:** Find the best clips in a long video with an AI skill
- **Description:** A free, open-source skill that reads a transcript and returns a ranked clip sheet: timestamps, why each moment works and a caption. Install: npx pm-claude-skills add --skills clip-factory. Source: https://github.com/mohitagw15856/pm-claude-skills
- **Tags:** video clips, podcast clips, short form video, clipping, claude skills, agent skills

### 4. short-form-script

- **Problem scene:** someone holding a phone on a small tripod in a kitchen, unsure what to say.
- **Request to record:** the eval case for `short-form-script`.
- **Three callouts:** the hook, the beats, the on-screen text.
- **Title:** Script a Reel, Short or TikTok in one request: a free AI skill
- **Description:** A free, open-source skill that writes a short-form video script built on hook, retention and payoff, with on-screen text. Install: npx pm-claude-skills add --skills short-form-script. Source: https://github.com/mohitagw15856/pm-claude-skills
- **Tags:** reels script, youtube shorts, tiktok script, short form video, claude skills, agent skills

## Assembling the video

1. Record parts 2 to 4 as one screen recording and note the in and out times.
2. Write them as a shot list and run the helper:

```bash
python3 skills/demo-video-kit/scripts/demo_video.py plan shots.json --out build --size 1920x1080
```

3. Read `build/build.sh`, then run it from the `build` folder with ffmpeg installed.
4. Add the narration, then upload with the title, description and tags above. Add the video link to the skill's row in this file once it is live.
