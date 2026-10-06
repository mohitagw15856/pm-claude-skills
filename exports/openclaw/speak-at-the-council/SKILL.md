---
name: speak-at-the-council
description: "Turn three minutes at a council or community meeting into the version that actually moves the decision — a public comment built as ask-story-evidence-ask, timed to the real decision process, with a neighbor coalition plan and the written follow-up officials can act on. Use when someone says 'I want to speak at the council meeting', 'they're planning X on our street', 'how do I fight this decision', or 'write my public comment'. Produces the 3-minute speech, the one-page leave-behind, and the campaign timeline."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/speak-at-the-council.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Speak At The Council Skill

Most public comments are three minutes of justified feeling aimed at a
decision that was effectively made two committee stages earlier. The
residents who win learned the machine: find *where* the decision actually is
in the process, speak to what the deciding body is allowed to consider, bring
neighbors so it reads as "residents" not "a resident," and hand over a
one-pager — because minutes summarize speeches, but documents get filed.
This skill builds that: the speech, the paper, the allies, and the timing.

## What This Skill Produces

- The **3-minute comment**: ask first, one human story, two checkable facts,
  the ask again with a specific action — written for speaking, timed
- A **one-page leave-behind**: the ask, the evidence, the map/photo note,
  contact details — the artifact that survives the meeting
- A **coalition plan**: turning three annoyed neighbors into ten present
  ones, who says what (non-repeating angles), and the sign-up sheet moment
- The **process map**: where this decision actually lives, deadlines for
  formal objections/comments, and who to lobby before the public bit —
  flagged for local verification, since every council's machinery differs

## Required Inputs

Ask for (if not already provided):
- The issue and the specific decision coming (a planning application? a
  budget line? a road change?) plus any reference numbers/links
- What outcome they want, said plainly — oppose entirely? conditions?
  delay? alternative?
- Their story and evidence so far, and how many neighbors are genuinely
  bothered
- What they know of the process/dates (the skill flags what to find out at
  the council's own site — never invents procedure)

## Framework

1. **Find the real decision point.** Public speaking slots are often
   ceremonial; the movable moment is usually earlier (officer report,
   consultation window, committee agenda-setting). Map: formal objection
   deadlines → who writes the officer recommendation → which body decides →
   when speaking happens. Each element gets a verify-at-your-council flag
   with what to search for.
2. **Speak to the criteria, not the feeling.** Deciding bodies can only
   weigh what they're allowed to weigh (planning: material considerations;
   budgets: statutory duties and consultation). Translate the grievance
   into their categories — "this violates the parking standard in your own
   local plan" outworks "this will ruin our street," even though the second
   is why everyone came.
3. **Structure the three minutes as ask-story-evidence-ask.** Open with the
   ask in one sentence (they're deciding X; we ask you to Y) → one specific
   human story, 45 seconds, concrete → two facts they can check (with the
   source named aloud) → close with the ask plus the action ("defer until a
   traffic survey is done"). Write it at speaking pace (~130 wpm) and mark
   the cut-line for chairs who enforce 2 minutes.
4. **Multiply witnesses, don't repeat them.** Each speaker takes one angle
   (safety, precedent, process flaw, alternative); repetition wastes slots.
   Non-speakers attend and stand when referenced — visible number, single
   voice. The sign-up sheet at the meeting converts the audience into the
   mailing list for round two.
5. **Follow up in writing within 48 hours.** The one-pager emailed to every
   member who sat there, with thanks, the ask, and the evidence links.
   Decisions wobble between meetings; paper is what wobbles them.

## Output Format

```
## The decision, mapped
[What's being decided, by whom, when · the earlier movable moments ·
verify-at-your-council items with search terms]

## Your 3 minutes (speaking pace, cut-line marked)
[The speech, ask-story-evidence-ask]

## The leave-behind (one page)
[Ask · evidence with sources · the visual note · who you represent · contact]

## Coalition plan
[Who takes which angle · the stand-when-referenced move · sign-up sheet]

## The next 48 hours and the next stage
[Follow-up email text · the earlier-stage lobbying if time remains]
```

## Quality Checks

- [ ] The ask appears in the first and last sentences of the speech, and
      it's an action the body can actually take
- [ ] Facts in the speech are checkable and sourced aloud; the feeling is
      carried by the story, not by adjectives
- [ ] The speech reads aloud inside 3 minutes with a marked 2-minute cut
- [ ] Every procedural claim carries a verify-local flag — no invented
      council process
- [ ] Speaker angles don't overlap; the coalition plan survives two
      no-shows

## Anti-Patterns

- [ ] Do not write outrage — the angriest speech in the room is the most
      ignorable; controlled specificity reads as dangerous to ignore
- [ ] Do not attack the members deciding — tonight's opponent is next
      round's swing vote
- [ ] Do not spend the three minutes on background; they have the papers,
      you have the ask
- [ ] Do not assert planning law or council procedure as fact — criteria
      framing yes, legal advice no
- [ ] Do not let ten people say the same thing worse

## Related

[[stakeholder-influence-mapper]] for reading the committee;
[[press-release]] when the campaign needs the local paper; [[agm-in-a-box]]
— the same machinery from the chair's side.

## Example Trigger Phrases

- "I want to speak at the council meeting."
- "How do I fight this decision?"
- "Write my public comment."
