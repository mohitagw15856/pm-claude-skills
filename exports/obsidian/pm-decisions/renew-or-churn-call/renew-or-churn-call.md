---
aliases: ["Renew or Churn Call"]
tags: [pm-skills, skill]
skill: renew-or-churn-call
description: "Score an account's renewal likelihood on a five-level scale with probabilities, and name the next move for the account owner. Use when asked will this account renew, what's the churn risk on this account, should we run a save play, or when a renewal is 30–120 days out and the owner needs a calibrated read rather than a gut feel. Produces the account state in a fixed schema, the five-level renewal score with a probability per level and confidence, the mapped next move, and the single signal that would change the call."
---

# Renew or Churn Call

Health scores drift into vibes because nobody defines the levels. This skill fixes five levels — from *will churn* to *will renew and expand* — each with the evidence that puts an account there, and returns a probability for every level. The next move is mapped to the level, so the output is an action, not a colour.

## Where this sits

After [`cs-health-scorecard`](../cs-health-scorecard/SKILL.md) (which gathers the dimensions) and before [`renewal-playbook`](../renewal-playbook/SKILL.md) or [`cs-escalation-brief`](../cs-escalation-brief/SKILL.md) (which run the move). This one decides which move.

## What This Skill Produces

- **The account state** — six fields, filled from CRM and usage evidence
- **The renewal score** — one of five defined levels, with a probability per level and a confidence score
- **The next move** — mapped from the level (save play, playbook, discovery call, standard motion, expansion)
- **The flip signal** — the one change in state that would move the level
- **The forecast line** — for the renewals sheet: level, probability, move, owner, date

## Required Inputs

Ask for these if not provided; mark unknowns rather than guessing:
- **account** — name, ARR, renewal date, term
- **usage** — active seats vs licensed, 90-day trend, key feature adoption
- **engagement** — last executive touch, QBR held, support tickets open/closed, NPS or CSAT
- **champion** — still in role? sponsor aligned?
- **commercial** — price change at renewal, competitor in play, procurement signals
- **history** — prior escalations, credits, missed commitments

## Framework: Five Defined Levels

| Level | Evidence that puts an account here | Next move |
|---|---|---|
| 0 · will churn | Champion gone, usage collapsing, competitor selected, or procurement told us | Escalate now: exec-to-exec call, save play with a concession budget |
| 1 · at risk | Usage down, exec contact stale, open escalation or price objection | Run the renewal playbook with a 60-day save plan |
| 2 · uncertain | Mixed signals: healthy usage but no sponsor, or engaged but under-adopted | Discovery call to find the sponsor and the value gap |
| 3 · likely renew | Usage steady, sponsor engaged, no blockers, price accepted | Standard renewal motion; confirm timeline with procurement |
| 4 · renew and expand | Growing usage, seats capped, expansion asked for | Expansion proposal before the renewal paperwork |

**Thresholds.** Act on the mapped move when confidence ≥ 0.55 and the top level's probability ≥ 0.6. Otherwise **hold and look at the shape**: a 0.40 / 0.40 split between *at risk* and *likely renew* is a discovery call, not a save play — the split itself says the sponsor question is unanswered.

**Getting probabilities.** Any calibrated decision model that scores against ordered, described levels serves this contract; the repo ships an adapter (`node integrations/jev/decide.mjs renew-or-churn-call --state state.json`, contract in `integrations/jev/decisions/`). Without one, the assistant estimates and labels it.

## Output Format

### Renewal call: [account] · ARR [x] · renews [date]

**State** (six rows, `unknown` where unknown)

**Score**
| Level | Probability |
|---|---|
| 0 will churn | 0.xx |
| 1 at risk | 0.xx |
| 2 uncertain | 0.xx |
| 3 likely renew | 0.xx |
| 4 renew and expand | 0.xx |

Expected level: x.x · Confidence: 0.xx · Source: [model / estimate]

**Verdict:** **[act: move]** or **[hold — shape says: …]**
**Flip signal:** [the one state change that moves the level, and who would know]
**Forecast line:** `[account] · L[n] p=0.xx · [move] · [owner] · [date]`

## Quality Checks
- [ ] Every state field is evidence or `unknown`; no invented usage numbers
- [ ] All five probabilities shown; expected level computed
- [ ] The move is the one mapped to the level, not a freelance idea
- [ ] A split distribution is read as a question, not averaged into a colour
- [ ] The forecast line is one line and fits the renewals sheet

## Anti-Patterns
- **RAG colours with no definition** — "amber" that means something different to each CSM
- **Averaging a bimodal distribution** into "medium risk"
- **Save play by reflex** — running concessions on an account whose problem is a missing sponsor
- **Ignoring the champion field** — the single most predictive signal, most often left blank
- **Letting the score replace the call** — the account owner owns the forecast; this is the evidence

## Example Trigger Phrases
- "Will Acme renew in November? Give me a real read."
- "Churn risk on this account — save play or not?"
- "Score this renewal and tell me the next move."

---
<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater
     variable for the highlighted text — replace it with your plugin's equivalent
     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->
Apply the skill above to the following input:

{{selection}}
