---
name: stoic-setback-debrief
description: "Recover from a professional setback — a failed launch, brutal feedback, a public mistake, a lost deal, a layoff — using the actual exercises from Marcus Aurelius' Meditations: the control sort, the evening review, and turning the obstacle into the task. Use when someone says 'today went badly', 'I blew it', 'the launch failed', 'I got torn apart in that meeting', or before replying to something that stung. Produces a structured debrief that separates what happened from the story, and ends in one next action."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/stoic-setback-debrief.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Stoic Setback Debrief Skill

Meditations was never a book — it was a working notebook of a man with an
overwhelming job talking himself back to steadiness, entry by entry. That makes it
the right tool for the bad professional day: not consolation, but a repeatable
procedure. This skill runs the notebook's actual exercises on a specific setback,
in order, and refuses to end without a next action. It is a debrief, not therapy —
and it says so when therapy is what's actually needed.

## What This Skill Produces

- A **facts vs. story split**: what verifiably happened, separated from the
  narrative currently running
- A **control sort** of every element of the situation (yours / partly yours /
  not yours), with effort reassigned accordingly
- The **obstacle-turn**: what this setback now makes possible or necessary — the
  Stoic move of converting the blocker into the task itself
- **One next action** sized for today, and a line for [[decision-journal]] if a
  real decision was surfaced

## Required Inputs

Ask for (if not already provided):
- What happened, as the user tells it (take the vent — it's data)
- What they're most worried it means (reputation, the project, the job)
- Anything irreversible already done (sent the reply? resigned? nothing yet?)
- Whether anything needs handling *tonight*, or whether this can use a day

## Framework: the notebook's exercises, applied

1. **Strip the event to what happened** (Book IV; VIII.49) — Aurelius' discipline of
   "objective judgment": describe the event as a camera would, no adjectives, no
   mind-reading. "The launch converted 0.4% against a 2% target and the VP asked for
   a plan by Friday" — not "the launch humiliated us." Write both versions; the gap
   between them is the story, and the story is optional.
2. **Sort by control** (the Stoic dichotomy, throughout; Epictetus made it explicit) —
   three columns for every element the user named: *yours* (your next reply, your
   plan, your craft), *partly yours* (the team's morale, the VP's read — influence,
   not control), *not yours* (the market, the past, other people's verdicts). The
   rule: effort moves to column one; column three gets acknowledgment, not budget.
3. **The obstacle becomes the task** (V.20) — Aurelius' working principle that what
   blocks the path *becomes* the path: the mind adapts and converts the impediment
   to its own purpose. Not silver-lining ("at least you learned!") — literally: what
   is the new task this setback has set? A failed launch sets the diagnosis task; a
   brutal review sets the evidence-gathering task; a layoff sets the search task.
4. **The evening review** (Book I is the model — he opens by listing what he learned
   from each person) — three questions, answered in writing: What did I handle well,
   even today? Where did I act against my own standard? What does tomorrow's version
   of me do differently at the same fork?
5. **Zoom out, briefly** (IV.3; VII.47 — the view from above) — one honest sentence
   on how this ranks at quarter-scale and at career-scale. Not to minimise; to size.

## Output Format

```
## What happened (camera version)
[2-3 sentences, verifiable facts only]

## The story running alongside it
[The narrative, named as narrative]

## Control sort
| Yours | Partly yours | Not yours |
→ Effort reassignment: [where tonight's/tomorrow's energy actually goes]

## The obstacle, turned
[The specific new task this setback set — one paragraph]

## Evening review
[The three questions, answered]

## One next action
[Small, concrete, today-or-tomorrow · if a real decision surfaced, the
decision-journal line to log]
```

## Quality Checks

- [ ] The camera version contains zero judgments — read it back looking for hidden
      adjectives ("disaster", "furious") and strip them
- [ ] Every worry the user named appears in exactly one control column
- [ ] The obstacle-turn names a task, not a lesson — "diagnose the funnel by
      Thursday" not "resilience is important"
- [ ] The next action is doable within 24 hours by the user alone
- [ ] References are to real passages (book/section noted); paraphrase rather than
      risk a misquote — Meditations is the most misquoted book on the internet

## Anti-Patterns

- [ ] Do not console first and sort second — run the procedure; steadiness comes
      from the sorting, not the sympathy
- [ ] Do not use the control sort to excuse what was the user's (column one gets
      *more* scrutiny, not less — that's the honest half of Stoicism)
- [ ] Do not produce "at least" sentences — the obstacle-turn is a task assignment,
      never a bright side
- [ ] Do not treat ongoing distress, burnout, or harassment as a debrief-sized
      problem — say plainly that this needs a human (manager, HR, doctor, someone
      trusted) and stop there
- [ ] Do not let the user hit send on anything written while the story version was
      driving — the reply drafted tonight gets reread through the camera version
      tomorrow

## Example Trigger Phrases

- "I blew it."
- "I got torn apart in that meeting."
- "Our launch failed and I can't stop thinking about it."
- "Help me recover from this public mistake."
