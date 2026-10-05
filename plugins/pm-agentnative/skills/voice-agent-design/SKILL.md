---
name: voice-agent-design
description: "Design a voice AI agent for phone or in-app conversations — call flows, interruption handling, escalation to humans, and the metrics that catch a bad voice experience. Use when asked to design a voice agent, automate a phone line, spec an IVR replacement, or review why callers hate an existing voice bot. Produces a voice agent spec: persona and disclosure policy, conversation architecture, barge-in and repair behaviour, human-handoff rules, and a launch scorecard."
---

# Voice Agent Design Skill

Voice is the least forgiving agent surface: no screen to fall back on, dead air reads as failure within two seconds, and the caller is often already annoyed. This skill designs voice agents around the medium's real constraints — turn-taking, interruption, repair — instead of shipping a chatbot with a text-to-speech voice.

## What This Skill Produces

- A **scope decision**: which call intents the agent owns end-to-end, which it triages, which go straight to humans
- A **conversation architecture**: openings, turn design, confirmation strategy, repair loops
- **Barge-in, silence, and error behaviour** — the mechanics that decide whether it feels alive or infuriating
- **Human-handoff rules** with context transfer, and a **launch scorecard**

## Required Inputs

Ask for (if not already provided):
- **The line and its traffic**: what people call about (top intents with rough volumes), current handle times
- **What the agent may actually do** — which systems it can read/write, what it can promise
- **The escalation reality**: human hours, queue lengths, what happens after-hours
- **Compliance context**: recording consent, disclosure requirements, regulated statements in this domain

## Design Method

1. **Scope by intent, ruthlessly.** From the intent list, the agent *owns* only intents that are (a) high-volume, (b) completable with its actual system access, and (c) low-stakes-if-wrong. It *triages* everything it can identify but not complete. It *immediately passes* anything emotional, legal, or high-value — a furious caller is a human's job on the first turn, not after three failed bot turns.
2. **Disclose and set the frame in the first five seconds.** The agent says it's an AI (increasingly required by law; always required by trust), what it can do, and how to reach a human ("say 'agent' anytime"). Hiding the escape hatch inflates containment metrics and rage in equal measure.
3. **Design turns for ears, not eyes.** One question per turn · ≤2 sentences before yielding · numbers and options in threes at most ("I can do A, B, or C — which one?") · never read a paragraph. Anything long ("your options are…") gets offered as SMS/email instead of spoken.
4. **Engineer the mechanics that make it feel alive:**
   - **Barge-in on**: the caller can interrupt any utterance; the agent stops mid-sentence and processes.
   - **Latency masked**: acknowledge within ~1s ("let me check that…") whenever a lookup exceeds it; dead air past 2s is where trust dies.
   - **Confirmation proportional to stakes**: implicit for low stakes ("okay, Tuesday…"), explicit read-back for money, addresses, and anything irreversible.
   - **Repair, not repeat**: on a misunderstanding, *change strategy* — rephrase, offer options, or fall to keypad — never re-ask the same question the same way twice.
5. **Make the handoff a feature.** Triggers: caller asks (always, instantly) · two failed repairs on one slot · negative-emotion cues · any regulated topic. The transfer carries a **whisper summary** (who, what they want, what's been tried, account pulled up) — the caller never repeats themselves; that single property beats every other quality bar in perceived experience.
6. **Score what callers feel, not what dashboards flatter.** Containment alone is gameable (trap callers and containment "improves"). The scorecard pairs it with: task success as the *caller* defines it (post-call yes/no), escapes-requested rate, repair rate, silent-transfer rate, and hang-ups mid-flow. Set launch gates on the pairs.

## Output Format

### Voice Agent Spec: [line/product]

**Intent scope**
| Intent | Volume | Own / Triage / Pass | Why |
|---|---|---|---|

**Opening script:** [verbatim — disclosure, capability, escape hatch]

**Conversation architecture:** [turn rules · confirmation strategy by stakes · the repair ladder (rephrase → options → keypad → human)]

**Mechanics:** [barge-in behaviour · latency masking thresholds · silence handling]

**Handoff:** [triggers · whisper-summary fields · after-hours behaviour]

**Compliance:** [disclosure line · recording consent flow · statements the agent must never make]

**Launch scorecard**
| Metric | Gate | Why paired |
|---|---|---|
| Containment + caller-scored success | | containment alone is gameable |
| Escape-request rate | | measures trapped callers |
| Repair rate / hang-ups mid-flow | | frustration signals |

## Quality Checks

- [ ] Every owned intent is completable with the agent's *actual* system access — no "owns refunds" without refund API access
- [ ] The opening discloses AI status and the escape hatch, verbatim in the spec
- [ ] No designed utterance exceeds two sentences before yielding
- [ ] The repair ladder changes strategy at each rung — no repeat-louder step
- [ ] Handoff carries the whisper summary; "please hold while I transfer you" to a cold human fails the spec
- [ ] The scorecard pairs containment with caller-scored success

## Anti-Patterns

- [ ] Do not port the chatbot script to voice — text tolerates paragraphs and menus; ears don't
- [ ] Do not hide the human escape hatch to protect containment metrics — callers find the exit anyway, angrier
- [ ] Do not let the agent bluff on regulated topics (medical, legal, financial advice) — pass or read the approved statement
- [ ] Do not re-ask a failed question unchanged — the caller heard you; the strategy failed, not their ears
- [ ] Do not launch without the mid-flow hang-up metric — it's where voice agents quietly hemorrhage trust

## Example Trigger Phrases

- "Design a voice agent."
- "Automate a phone line."
- "Spec an IVR replacement."
- "Review why callers hate an existing voice bot."
