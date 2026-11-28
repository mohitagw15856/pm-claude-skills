---
aliases: ["Podcast Show Notes"]
tags: [pm-skills, skill]
skill: podcast-show-notes
description: "Turn a podcast episode transcript into show notes: a summary that makes someone want to listen, timestamped chapters, the guest's details, links mentioned, and quotes pulled exactly. Use when asked to write show notes, summarise this episode, pull timestamps from this transcript, write the episode description, or get quotes for social from this interview. Produces an episode title and one-paragraph summary, chapters with timestamps, a links and resources list, three to five verbatim quotes with speaker and time, and a short version for podcast apps."
---

# Podcast Show Notes Skill

Show notes do two jobs: they persuade someone deciding whether to press play, and they help a listener who wants to find the part about one topic again. Most notes are a transcript paragraph and a list of links, which does neither. This skill works from the transcript to produce notes that sell the episode honestly and make it navigable. It quotes people exactly, because a misquoted guest is a problem the host has to fix. To plan an episode before recording, there is a Chinese-language outline skill, `xiaoyuzhou-podcast-outline`.

## What This Skill Produces

- **A title and summary** that say who this is for and what they will take away
- **Chapters** with timestamps and titles that describe the content
- **Guest details**: name, role and where to find them, as stated in the episode or supplied
- **Links and resources** mentioned, listed in order of appearance
- **Verbatim quotes** with speaker and timestamp, ready for social posts
- **A short version** for apps that show only a few lines

## Required Inputs

Ask for these if not provided:
- **The transcript**, ideally with timestamps and speaker labels
- **The show's name, audience and usual tone**
- **The guest's correct name, title and links**: transcripts misspell names
- **Sponsors** for the episode and any required disclosure wording

Work only from the transcript. If it has no timestamps, write the chapter titles in order and mark the times as `[time]`. If a name, book title or company is unclear in the transcript, flag it for checking and do not guess the spelling.

## Framework: Sell It, Then Map It

1. **Find the three best moments.** A claim that surprises, a story, and a practical takeaway. The summary is built from these.
2. **Write the summary for a stranger.** Who is speaking, why they are worth hearing on this topic, and what the listener will know afterwards. Three or four sentences.
3. **Cut chapters where the topic changes**, not at fixed intervals. Title each by what is discussed, in the listener's words.
4. **List what was mentioned.** Books, tools, studies, people, previous episodes. Give the name as said; add a link only when the user supplies it or it is stated in the episode.
5. **Pull quotes exactly.** Copy the words as spoken, trim only at natural boundaries, and mark any cut with an ellipsis. Remove filler words only if the show's style allows, and say that you did.
6. **Write the short version last.** Two sentences and the three chapter highlights.
7. **Flag the sensitive.** Anything a guest might want to check before publication: figures, claims about other people, unreleased plans.

## Output Format

# Show Notes: [episode title]

**Short version (for apps):** [two sentences]

## Summary
[Three or four sentences]

## Chapters
| Time | Topic |
|------|-------|

## Guest
[Name · role · links, as supplied]

## Mentioned in This Episode
- [Item, in order of appearance]

## Quotes
> "[exact words]" ([speaker], [time])

## Sponsors
[As supplied, with disclosure wording]

## Check Before Publishing
[Unclear names, unverified figures, claims about third parties]

## Quality Checks

- [ ] Every quote is verbatim, attributed and timestamped
- [ ] Timestamps come from the transcript; missing ones are marked
- [ ] Names and titles were confirmed or flagged
- [ ] The summary tells a stranger why to listen, without overclaiming
- [ ] Links are only those supplied or stated in the episode
- [ ] Sponsor disclosure is included where a sponsor is named

## Anti-Patterns

- [ ] Do not paraphrase inside quotation marks
- [ ] Do not invent links, book titles or the spelling of a name
- [ ] Do not write chapters every five minutes regardless of content
- [ ] Do not summarise by listing topics; say what the listener gains
- [ ] Do not publish a guest's unverified figure without flagging it

## Example Trigger Phrases

- "Write show notes for this episode."
- "Pull timestamps and chapters from this transcript."
- "Give me five quotes from this interview for social."
- "Write the episode description for the podcast apps."

Run this skill in your browser: https://mohitagw15856.github.io/pm-claude-skills/skill/podcast-show-notes.html

---
<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater
     variable for the highlighted text; replace it with your plugin's equivalent
     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->
Apply the skill above to the following input:

{{selection}}

<!-- pm-claude-skills v84.1.0 | skill: podcast-show-notes | source: skills/podcast-show-notes/SKILL.md | sha256: fb67eceb4dea9ab31034834c34006d836a8fc28ab6150010dc8d12a2a30b0863 | licence: MIT
     verify: this hash is published at https://mohitagw15856.github.io/pm-claude-skills/.well-known/agent-skills.json -->
