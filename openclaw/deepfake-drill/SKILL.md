---
name: deepfake-drill
description: "Run a tabletop drill of a voice-clone or deepfake fraud attempt — the 'CEO needs this wire today' call — against your actual approval process, before a real attacker does, then debrief the tells and fix the process gap. Use when someone asks to train the team on deepfake fraud, test wire-transfer controls, run a social-engineering tabletop, or 'could we get CEO-frauded?'. Produces a drill scenario pack, a facilitator script, a tells checklist, and the process fixes the drill exposed. Defensive training only."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/deepfake-drill.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Deepfake Drill Skill

The finance teams that lose seven figures to a cloned voice all describe the
same call afterwards: it sounded exactly like him, he knew the deal names, he
was stressed, it was 4:55pm on a Friday. Voice cloning needs seconds of audio
now; the defense isn't detecting the fake — assume you can't — it's a process
that holds even when the voice is perfect. This skill drills that process as a
tabletop exercise: realistic pressure, your actual approval chain, and a
debrief that fixes the gap the drill finds. It trains defenders; it does not
help attackers — no cloning instructions, no evasion tips, ever.

## What This Skill Produces

- A **drill scenario pack** tailored to your org: the pretext, the pressure
  timeline, the escalating asks — written for a *facilitator to read aloud*,
  not for realism tooling
- A **facilitator script** with decision points, expected-control checkpoints,
  and legitimate-looking curveballs ("the CFO is genuinely on a plane")
- A **tells checklist** the team keeps afterwards: process tells (urgency +
  secrecy + channel-switch + authority), not audio tells
- A **gap report template**: which control held, which was bypassed and how,
  the fix, the re-drill date

## Required Inputs

Ask for (if not already provided):
- The process being drilled: who can request payments/changes, who approves,
  above what thresholds, through which channels
- The realistic attacker's knowledge: what's public about your execs, deals,
  vendors (assume LinkedIn + your press page)
- Who's being drilled and whether it's announced or unannounced (recommend
  announced-window: "a drill will happen this month" — trains without the
  trust damage of full ambush)
- Any real near-misses to build from

## Process

1. **Design the scenario around YOUR weakest legitimate path.** The drill
   pretexts that work are the ones your process half-allows: the acquisition
   that's "still confidential", the vendor bank-detail change, the exec
   travelling. Pick one, build the pretext from information a real attacker
   could gather publicly.
2. **Script the pressure, not the technology.** The facilitator plays the
   caller using the three levers every real case uses — urgency (deadline in
   minutes), secrecy (tell no one, deal sensitivity), authority (the voice/name
   at the top) — plus the channel-switch ("can't do email, I'm boarding").
   The script says *what the caller says*; it never explains how to clone a
   voice, and redirect any such request.
3. **Let the process fail safely.** Facilitator notes for each decision point:
   what the control should catch, what to say if the participant bypasses it,
   when to escalate the pressure once. No individual shaming — the drill
   grades the process, and the debrief says so out loud.
4. **Debrief on tells and controls.** The checklist that stays: any payment or
   detail-change request combining urgency + secrecy + channel-switch gets
   out-of-band verification on a *known* number, no exceptions for rank — the
   callback rule is the whole defense. Score which controls held.
5. **Fix and re-drill.** Every gap gets an owner, a fix, and a date; the
   re-drill uses a different pretext. Recommend an annual cadence and folding
   the callback rule into onboarding.

## Output Format

```
## Drill scenario: [pretext name]
[Setup, what the attacker plausibly knows, the ask sequence, timing]

## Facilitator script
[Read-aloud beats · decision points with expected control · escalation and
curveball notes · hard stop conditions]

## The tells checklist (keep this)
[Process tells + the callback rule, one page]

## Gap report
| Control | Held / bypassed | How | Fix | Owner | Re-drill date |

## Aftercare
[The no-blame debrief framing + the announcement for the wider team]
```

## Quality Checks

- [ ] The scenario is built from the org's own process and public information —
      generic scripts don't find real gaps
- [ ] Zero content that teaches attack technique: no cloning tools, methods, or
      detection-evasion — pressure is scripted as dialogue only
- [ ] The debrief framing is process-blame, not person-blame, explicitly
- [ ] The callback rule appears verbatim in the tells checklist with the
      "no exceptions for rank" clause
- [ ] Every gap in the report has an owner and a re-drill date

## Anti-Patterns

- [ ] Do not produce actual cloned audio, cloning instructions, or tool
      recommendations for impersonation — decline that direction plainly, even
      "for realism"; the drill works as read-aloud tabletop
- [ ] Do not run fully unannounced ambush drills on individuals — announced
      windows train; ambushes traumatize and get the program cancelled
- [ ] Do not let the drill conclude "train people to hear fakes" — the
      defense is the callback rule, because the fakes are already good enough
- [ ] Do not skip finance-adjacent paths: payroll detail changes and vendor
      bank updates are the same attack in cheaper clothes

## Related

[[scam-message-decoder]] for the text/email versions; [[oncall-runbook]]
patterns for the verification procedure; [[incident-postmortem]] if drilling
because a real attempt already happened.

## Example Trigger Phrases

- "Train the team on deepfake fraud."
- "Test wire-transfer controls."
- "Run a social-engineering tabletop."
- "Could we get CEO-frauded?"
