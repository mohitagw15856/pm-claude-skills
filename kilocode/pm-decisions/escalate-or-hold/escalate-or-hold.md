# Escalate or Hold

Most escalation mistakes are timing mistakes: too late because nobody wanted to be the one who paged, or too early because the reporter shouted. This skill fixes the shape of the decision — six state fields, three defined options, a probability for each — so the call is made on impact and trend rather than on volume.

## Where this sits

Before [`cs-escalation-brief`](../cs-escalation-brief/SKILL.md) (which writes the brief once you *have* decided to escalate) and alongside [`escalation-tree`](../escalation-tree/SKILL.md) (which says *to whom*). This one says *whether, and when*.

## What This Skill Produces

- **The issue state** — six fields, filled from evidence
- **The decision** — `escalate` / `hold` / `close` with probabilities and confidence
- **Act or hold** — thresholds applied, verdict stated
- **The re-check time** — when holding, a hard time (hours, not days) and what would trigger escalation before it
- **The reporter line** — one sentence to send the person who raised it

## Required Inputs

Ask for these if not provided:
- **issue** — what happened, when first reported, current status
- **impact** — customers or revenue affected, SLA state, any regulatory or safety angle
- **owner** — who has it, their capacity, when they last updated
- **trend** — worse, stable, or improving, with the evidence
- **prior_escalations** — escalated before? what happened
- **asks** — what the reporter is asking for

## Framework: A Typed Decision

| Option | It applies when |
|---|---|
| `escalate` | Impact is growing, or a commitment / SLA / safety line is crossed, and the current owner cannot fix it in time — bring in the next level now |
| `hold` | Impact is bounded, the owner has a credible plan and a next update time — hold and re-check at that time |
| `close` | Resolved, a duplicate, or impact was misjudged — close with a note to the reporter |

**Thresholds.** Act when confidence ≥ 0.6 and the winning option's probability ≥ 0.7. When `escalate` and `hold` are close, **hold with a hard re-check time** and tell the reporter the time — a close call resolved by a clock beats a close call resolved by a mood.

**Trend beats severity.** A bounded sev-2 that is getting worse is closer to escalation than a static sev-1 with a tested fix landing in an hour.

**Getting probabilities.** Any calibrated decision model that returns a probability per defined option serves this contract; the repo ships an adapter (`node integrations/jev/decide.mjs escalate-or-hold --state state.json`, contract in `integrations/jev/decisions/`). Without one, the assistant estimates and labels the estimate.

## Output Format

### Escalate or hold: [issue] · first reported [time]

**State**
| Field | Value |
|---|---|
| impact | … |
| owner | … |
| trend | … |
| prior_escalations | … |
| asks | … |

**Decision**
| Option | Probability |
|---|---|
| escalate | 0.xx |
| hold | 0.xx |
| close | 0.xx |

Confidence: 0.xx · Source: [model / estimate]

**Verdict:** **[act: option]** or **[hold — re-check at HH:MM; escalate before that if: …]**
**Reporter line:** "[one sentence: what is happening and when they will hear next]"

## Quality Checks
- [ ] Trend is stated with evidence, not assumed from severity
- [ ] All three probabilities shown; the verdict cites the thresholds
- [ ] A hold has a re-check time in hours and a named early trigger
- [ ] The reporter gets one sentence with a time in it
- [ ] Safety or regulatory angles, if present, are stated explicitly and force `escalate`

## Anti-Patterns
- **Escalating the loudest reporter** rather than the largest impact
- **Holding without a clock** — "let's see how it goes" is not a hold, it is a drift
- **Closing to reduce the queue** when impact was never verified
- **Re-litigating the options** — inventing "soft escalate" to avoid paging someone
- **Skipping the reporter line** — silence is how holds turn into escalations from above

## Example Trigger Phrases
- "Should I escalate this or wait for the owner's fix?"
- "Is this a page-someone situation?"
- "Third ticket on this today — hold or escalate?"
