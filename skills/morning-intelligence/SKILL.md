---
name: morning-intelligence
description: "Interviews you across 15 questions to capture your role, topics, sources, exclusions, and format preferences, then writes a master prompt you can paste into a scheduled task or Claude Code Routine. Use when you want to set up a personalised daily news brief, build a reusable morning news prompt, or create an automated intelligence briefing. Produces a confirmed summary of your preferences, a ready-to-paste master prompt, and setup instructions for both Cowork Scheduled Tasks and Claude Code Routines."
---

# Morning Intelligence Skill

Write the prompt that writes your briefing. A 15-question interview extracts your exact context — role, topics, sources, exclusions, format, recency — then produces a single master prompt you can paste into a scheduled task or Claude Code Routine and never touch again.

> **Pro tip:** Run this interview with Opus for the best output. Opus asks sharper follow-up questions and writes a tighter master prompt.

> **Credit:** Originally created by Ashwin Francis (Cash&Cache) — adapted and extended for this library.

---

## Required Inputs

No inputs required upfront. The skill runs the interview first.

If the user has already provided context (e.g. pasted a role description or topic list), absorb it and skip those questions in the interview — don't ask for information already given.

---

## How the Interview Works

Run questions **one at a time** (or in small groups of 2–3 where they're closely related). Don't dump all 15 at once. Wait for each answer before proceeding. Ask natural follow-ups where the answer is vague.

### Interview Questions

**Block 1 — Who you are and how you read**

1. What is your role, and what lens do you read news through? (e.g. "Head of Product at a B2B SaaS — I read for competitive moves, AI tooling, and enterprise buying signals.")
2. What are the 3–5 topics you always want covered? Be specific — "AI" is too broad; "AI applied to enterprise software" is better.
3. What are 2–3 topics you actively want filtered out — things that waste your time every morning?

**Block 2 — Sources and signals**

4. Which publications, newsletters, or outlets do you trust most? (Examples: The Information, TLDR, Benedict Evans, Stratechery, FT, specific subreddits)
5. Are there any Twitter/X accounts, Substack writers, or niche sources that are must-reads for you specifically?
6. Is there any geography that matters — are you focused on a specific country, region, or market?

**Block 3 — Story type and recency**

7. What mix of story types do you want? Rank or weight these: breaking news / in-depth analysis / opinion / data & research / product launches & announcements.
8. How fresh does the content need to be? Only today's news? Last 24 hours? Last 48 hours? Or are you okay with "last few days" if a story is important enough?

**Block 4 — Format and time**

9. How do you want the brief formatted? Options: bullet list by topic / short narrative paragraphs / a digest with headlines + 1-line summaries / a table / mixed.
10. What's your reading time budget in the morning? 5 minutes (tight digest) / 10 minutes (fuller brief) / 15 minutes (comprehensive).

**Block 5 — This week specifically**

11. Is there anything you're tracking this week in particular — a specific company, deal, product launch, regulatory development, or ongoing story?

**Block 6 — Follow-up clarification (questions 12–15)**

Based on the answers above, ask 4 targeted follow-up questions to sharpen ambiguities. Examples of what to probe:

- If a topic is still broad: "You said [topic] — do you want the technical angle, the business/market angle, or both?"
- If sources are vague: "When you say [publication], do you want everything from them or only specific sections/writers?"
- If format is unclear: "You want bullets — should each topic have its own section with 3–5 bullets, or one flat list of all stories?"
- If recency conflicts with format: "You want only today's news but a comprehensive 15-minute brief — on slow news days, should I go deeper on one story or pull from the last 48 hours to fill it out?"
- If exclusions are vague: "You said no [topic] — does that include adjacent topics like [related thing], or strictly [topic]?"

Use your judgement on which 4 are most worth asking given the actual answers.

---

## Output Structure

After the interview is complete, produce three things in order:

### 1. Summary of What You Told Me

A brief summary of the interview, clustered into thematic pillars. This lets the user verify the master prompt will be accurate before it's written.

```
WHAT I HEARD
────────────
Role lens:     [1 sentence]
Core topics:   [Pillar 1] · [Pillar 2] · [Pillar 3]
Exclusions:    [Topic A], [Topic B]
Sources:       [List]
Story mix:     [e.g. 60% analysis, 30% news, 10% data]
Recency:       [e.g. Last 24 hours, today only for breaking]
Format:        [e.g. Bullets by topic, ~10 min read]
This week:     [Specific tracking items]
```

Confirm: "Does this look right? I'll write the master prompt based on this."

---

### 2. The Master Prompt

Formatted and ready to paste. Start with a markdown code block so the user can copy it cleanly.

````
```
MORNING INTELLIGENCE BRIEF — MASTER PROMPT
==========================================

You are an intelligence analyst briefing [ROLE] at the start of their day.

TASK
Generate a personalised morning news brief covering the following.

TOPICS TO COVER
1. [Topic / Pillar 1] — focus on [angle]
2. [Topic / Pillar 2] — focus on [angle]
3. [Topic / Pillar 3] — focus on [angle]
[add pillars as needed]

NEVER INCLUDE
- [Excluded topic 1]
- [Excluded topic 2]
- [Excluded topic 3]

PREFERRED SOURCES (prioritise these)
[Source 1], [Source 2], [Source 3], [Source 4]

STORY TYPE MIX
[e.g. Prioritise analysis and data-driven pieces. Include breaking news only if significant. Skip opinion unless it's from [specific writer].]

RECENCY
[e.g. Cover only the last 24 hours. For ongoing stories I'm tracking, include relevant developments from the last 48 hours.]

CURRENTLY TRACKING THIS WEEK
[Specific story / company / topic the user flagged]

FORMAT
[e.g. Organise by topic. Under each topic: 2–4 bullet points. Each bullet: headline + 1–2 sentence summary + source name. End with a "What to watch today" section: 2–3 sentences on what matters most today.]

LENGTH
Target a [5/10/15]-minute read.

TONE
Analyst voice. No fluff. Lead with the signal, not the noise. If something is uncertain or based on incomplete reporting, flag it as such.
```
````

---

### 3. Setup Guide

A short section below the master prompt:

```
HOW TO USE THIS PROMPT
──────────────────────

OPTION A — Cowork Scheduled Tasks (Claude Pro/Max)
  Requires: Desktop app open at scheduled time
  1. Open Claude desktop → Cowork → Scheduled Tasks
  2. Create a new task, set your time (e.g. 7:00 AM)
  3. Paste the master prompt as the task content
  4. Save. It will run every morning when your desktop app is open.

OPTION B — Claude Code Routines (runs in the cloud)
  Requires: Claude Code with Routines access
  Advantage: Runs without your laptop being on
  1. In your project root, create or open .claude/routines.json
  2. Add a new routine with a cron schedule (e.g. "0 7 * * *" for 7 AM daily)
  3. Set the prompt field to the master prompt above
  4. Commit and push — Claude Code will run it on schedule.

UPDATING YOUR BRIEF
  When your focus shifts, re-run this skill. The interview takes 5–10 minutes
  and produces a new master prompt to replace the old one.
```

---

## Quality Checks

- [ ] Every interview question was asked — none skipped unless the user already provided the answer
- [ ] The "What I Heard" summary was shown and confirmed before writing the master prompt
- [ ] The master prompt uses specific topic angles, not vague category names (not "AI" — "AI applied to enterprise software")
- [ ] Exclusions are explicitly stated in the master prompt with a NEVER INCLUDE section
- [ ] Sources are listed in order of preference, not as a flat unordered list
- [ ] Story type mix is written as a directive, not just a list
- [ ] Recency instruction handles the edge case of slow news days
- [ ] Format instruction is precise enough that a different AI could follow it correctly
- [ ] The master prompt is inside a code block so it copies cleanly
- [ ] Both setup options (Cowork and Claude Code Routines) are included

## Anti-Patterns

- [ ] Do not skip the interview and write a generic master prompt — a brief that is not tailored to the user's specific role and topics will be ignored after the first day
- [ ] Do not proceed to write the master prompt without confirming the "What I Heard" summary — errors in the summary will silently propagate into a prompt that produces the wrong briefing every morning
- [ ] Do not use broad topic labels in the master prompt (e.g. "AI", "tech news") — every topic must have a specific angle or focus to produce signal-to-noise ratio worth reading
- [ ] Do not omit the NEVER INCLUDE section — without explicit exclusions, the briefing will fill with noise that the user said they wanted filtered out
- [ ] Do not ask all 15 questions at once — the interview must run one question or small group at a time to produce specific, considered answers

---

## Example Trigger Phrases

- "Set up my morning intelligence brief"
- "Build me a morning news prompt"
- "Interview me for a morning briefing skill"
- "I want to start every day with a personalised news digest"
- "Help me set up a daily AI news brief"
- "Create a scheduled morning news prompt for me"
- "Build me a prompt for my daily briefing routine"
