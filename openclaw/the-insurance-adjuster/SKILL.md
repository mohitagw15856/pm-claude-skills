---
name: the-insurance-adjuster
description: "Simulate the adjuster's settlement call after your accident or loss — the recorded-statement asks, the quick-settlement anchor, the friendly minimization — run against your actual claim, with a debrief on every answer that shrank it. Use when asked the adjuster wants a recorded statement, practice the settlement call, is this settlement offer low, or what will the insurance company try. Produces the call transcript with the adjuster's file notes, the offer trajectory, and a debrief separating fair process from pressure tactics — plus the bright lines that protect a claim."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/the-insurance-adjuster.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# The Insurance Adjuster Skill

The adjuster on the phone is professionally friendly and professionally adverse — a claims handler whose file notes score everything you say against payout-reducing categories: pre-existing, minimizing language, gaps in treatment, comparative fault. This skill plays that call against your actual claim — the recorded-statement request, the "how are you feeling today?" that becomes "claimant reports feeling fine," the fast low anchor — and debriefs which answers helped the file and which quietly shrank it. It trains the call; it is not legal advice, and one of its jobs is naming when the situation has outgrown a phone call and needs a lawyer.

## What This Skill Produces

- **The call transcript** — 10–14 exchanges, with the adjuster's *file note* after each of your answers
- **The offer trajectory** — the anchor, what moved it, what the file notes say the authority range was
- **The debrief** — answers sorted helped/neutral/hurt, each hurt one with its safe replacement
- **The bright lines** — the standing rules for every real call, plus the get-a-lawyer triggers

## Required Inputs

Ask for these if not provided:
- **The claim** — what happened, the damage/injuries as currently known, whose insurer is calling (your own and the other side's adjuster are different calls with different duties — the simulation adjusts)
- **Where things stand** — treatment ongoing? Repair estimates in? An offer already on the table? (Settling before the extent is known is the tactic's whole point — timing is the terrain)
- **What's been said so far** — any statements already given; the simulation probes consistency exactly like the file will
- **The pressure points** — money tight? Car needed for work? The adjuster's pacing uses whatever urgency exists, realistically

## Framework: The Adjuster's Moves

1. **The friendly open is the statement:** "How are you doing today?" — "fine, thanks" enters the file as *claimant reports no distress*. The trained answer is polite and non-medical: "I'm managing — my doctor's handling the medical side." Small talk is on the record; the simulation shows it landing in the notes.
2. **The recorded statement is optional more often than it sounds:** the other side's adjuster generally cannot require one; your own policy may require *cooperation* (read it — flagged as policy-specific). The move is asked-for-casually, delivered-as-routine; the counter is knowing which insurer is asking and being allowed to say "I'd rather provide that in writing" or decline the other side's entirely. The simulation runs both branches.
3. **The quick check is an anchor wearing kindness:** an early offer while treatment is ongoing settles the claim *before its size is known* — and signing releases everything after. The counter is the sentence "I can't evaluate a settlement until treatment is complete," repeated calmly forever.
4. **Minimization is harvested from your own words:** "just a bit sore," "it was partly my fault too," "the car was old anyway" — each becomes a file-note category (minimal injury, admitted comparative fault, diminished value). The debrief's replacements state facts without self-appraisal: what happened, what the doctor said, what the estimate says. Facts, documents, no adjectives, no fault math out loud.
5. **The get-a-lawyer triggers, stated plainly:** serious injury, disputed fault, an offer that feels engineered, a release on the table, or an adjuster who goes quiet — those are contingency-consultation territory, and the simulation says so out of character rather than pretending phone technique covers everything.

## Output Format

# Adjuster Call: [claim] — caller: [own insurer / other side]

> Simulation — a plausible adversarial reading, not a prediction.

## The Transcript
[The call. *File note:* after each answer — what entered the record and which category it fed]

## The Offer Trajectory
[Anchor → movements → what the notes say was actually available · the release-attached warning where it appears]

## Debrief — out of character
| Your answer | File effect | The safe version |
|---|---|---|
[Plus the bright lines: no recorded statement for the other side without consideration · no medical self-assessment — route to records · no fault discussion — facts only · no settlement talk before treatment completes · everything material in writing]

> Training for a phone call, not legal advice — policy duties vary, releases are permanent, and the trigger list above is where a lawyer stops being optional. Consultations with injury lawyers are typically free; use one past any trigger.

## Quality Checks

- [ ] Every file note names the category the answer fed
- [ ] The two-insurers distinction shapes the whole call
- [ ] The quick-offer scene shows the release consequence explicitly
- [ ] Debrief replacements are facts-and-documents phrasings, never coached embellishment
- [ ] The lawyer triggers appear out of character, unhedged

## Anti-Patterns

- [ ] Do not coach exaggeration or concealment — the training is precision, not performance; claims built on embellishment collapse and deserve to
- [ ] Do not make the adjuster a villain — the friendliness is real AND the file is adverse; both truths are the lesson
- [ ] Do not let "fine, thanks" pass unnoted — the small-talk-is-testimony beat is the skill's signature
- [ ] Do not simulate legal strategy — technique for the call, triggers for the lawyer, line held
- [ ] Do not stay in character in the debrief

## Example Trigger Phrases

- "Practice the settlement call."
- "Is this settlement offer low?"
- "What will the insurance company try?"
