---
name: delay-claim-letter
description: "Draft a construction delay notice or delay claim letter with contract clause citation, cause classification, and critical-path impact narrative. Use when asked to write a delay notice, put the owner or GC on notice of delay, draft a time extension request, respond to weather or owner-caused delay, or paper a delay for a claim. Produces a notice/claim letter with the excusable-compensable classification, critical-path impact narrative, quantum placeholder, reservation of rights, and a records-preservation list."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/delay-claim-letter.html
metadata:
  {
    "openclaw": { "emoji": "🏗" }
  }
---

# Delay Claim Letter Skill

Delay claims are won and lost on two things: whether notice went out inside the contractual window, and whether the delay can be tied to the critical path with contemporaneous records. This skill drafts the letter that does both — notice-clause citation up front, cause classified on the excusable/compensable matrix, impact told against the schedule rather than the calendar, and quantum reserved rather than guessed. It also tells the team what records to start preserving *today*.

## What This Skill Produces

- A **delay notice or claim letter** ready for letterhead and counsel review
- **Cause classification** on the excusable/compensable matrix, driving what's requested (time, money, or both)
- **Critical-path impact narrative** — affected activities, dates, and knock-on logic
- **Quantum placeholder** with reservation of rights (never a premature number)
- A **records-preservation checklist** for the project team

## Required Inputs

Ask for what's missing; from a thin brief, draft with gaps marked `[confirm]` and state that the notice clause citation must be verified before sending:

- **The delay event** — what happened, when it started, whether it's ongoing
- **Contract notice provisions** — clause number, days allowed, required form/recipient (the single most important input)
- **Who caused it / what class of event** — owner action, design issue, weather, third party, force majeure
- **Schedule facts** — affected activities, whether they're on the critical path, current data date and completion forecast
- **Recipient and contractual relationship** (owner, GC, CM) and any notices already given

## Classification Framework

Classify the cause before writing a word of the letter — it determines what you're entitled to ask for:

| Cause | Excusable? | Compensable? | You request |
|---|---|---|---|
| Owner-directed changes, late drawings/decisions, denied access, owner-furnished items late | Yes | **Yes** | Time **and** cost |
| Differing site conditions (where the clause grants it) | Yes | Usually yes | Time and cost |
| Abnormal weather (beyond baseline), force majeure, strikes, pandemics | Yes | **No** (typically) | Time only |
| Contractor-caused (own crews, subs, suppliers, means & methods) | No | No | Nothing — mitigate, don't notice |
| **Concurrent delay** (owner and contractor causes overlap) | Often time, not money | Contested | Time; expect a fight on cost |

If causes are concurrent or unclear, say so honestly in the analysis (not the letter), classify conservatively, and reserve rights broadly. Misclassifying a weather delay as compensable costs credibility on every later claim.

**Critical-path discipline.** A delay only extends the completion date if it consumes float and hits the critical path. The narrative must name the impacted activities, their float status, and the logic to completion — "we lost 10 days on Level 3 rough-in" means nothing without showing rough-in drives the milestone. If a schedule fragnet/TIA will follow, say the detailed analysis is forthcoming.

**Quantum.** In a notice, never commit to a number. State that time and cost impacts are being quantified, give an order-of-magnitude only if the contract requires it (labelled preliminary), and reserve rights to supplement — including for disruption, acceleration, and extended general conditions.

## Output Format

### [Letterhead] — Re: Notice of Delay — [Project, Contract No.]

**1. Notice statement** — "Pursuant to §[x] of the Contract, [Contractor] hereby provides notice…" with the event and discovery date. Sent inside the window, or addressing timeliness head-on if not.
**2. Description of the delay event** — facts, dates, documents (RFI/ASI/correspondence numbers). No adjectives, no blame theatrics.
**3. Impact on the critical path** — affected activities, current vs. forecast dates, ongoing/complete status.
**4. Classification & relief requested** — excusable/compensable position; time extension of [X days / to be determined] and cost reimbursement where compensable.
**5. Mitigation** — steps being taken to reduce impact (this is both an obligation and credibility).
**6. Reservation of rights** — to supplement quantum, claim cumulative impact and acceleration, and rely on the ongoing schedule analysis.
**7. Records note (internal, attached separately)** — preserve daily reports, schedule updates and native files, photos, manpower counts, correspondence, cost codes for the affected work.
Include the line: *"This draft is not legal advice — route through your contracts counsel before sending."*

## Quality Checks

- [ ] Notice clause cited by number, with the deadline math shown (event date + allowed days)
- [ ] Cause classified on the matrix, and the relief requested matches the classification
- [ ] Impact narrative names critical-path activities and dates — not just elapsed calendar days
- [ ] No committed quantum in a notice; reservation of rights covers supplementation, disruption, and acceleration
- [ ] Tone is factual and professional — the letter will be Exhibit A someday
- [ ] Records-preservation list issued to the team alongside the letter, and the counsel-routing line is present

## Anti-Patterns

- [ ] Do not wait for full impact analysis before noticing — notice preserves rights; quantify later
- [ ] Do not request money for a time-only (excusable, non-compensable) event — it burns credibility
- [ ] Do not narrate delay against the calendar — tie it to critical-path activities or expect denial
- [ ] Do not put a hard number in a notice letter — you'll be held to your worst early guess
- [ ] Do not editorialise about the owner's competence — facts, clause, impact, relief, reservation; nothing else

## Example Trigger Phrases

- "Write a delay notice."
- "Put the owner or GC on notice of delay."
- "Draft a time extension request."
- "Respond to weather."
- "Paper a delay for a claim."
