# Customer Health Scorecard Skill

Produce a structured, data-driven health scorecard for a customer account — giving the CSM and leadership a clear view of renewal risk, expansion potential, and the actions needed to move the account in the right direction.

## Required Inputs

Ask for these if not already provided:
- **Account name** and tier (enterprise / mid-market / SMB)
- **Contract value** (ARR) and **renewal date**
- **Product usage data** — logins, DAU/MAU ratio, key feature adoption
- **Support data** — open tickets, CSAT or NPS score, recent escalations
- **Engagement data** — last QBR date, executive sponsor status, champion name
- **Commercial data** — payment history, expansion conversations, seats used vs. licensed
- **Any known risks or recent changes** at the account

## Scoring Framework

Score each dimension 1–5. Weight as shown. Calculate weighted total out of 100.

| Dimension | Weight | What to Score |
|---|---|---|
| **Product Adoption** | 30% | DAU/MAU ratio, breadth of features used, power users identified |
| **Engagement** | 20% | QBR cadence, executive sponsor active, champion strength |
| **Outcomes** | 20% | Customer hitting their stated goals / success metrics |
| **Support Health** | 15% | Ticket volume trend, unresolved escalations, CSAT |
| **Commercial** | 15% | On-time payments, seats utilised, expansion signals |

**Score → RAG conversion:**
- 80–100: Green (healthy, renew likely)
- 60–79: Amber (at risk, needs attention)
- 0–59: Red (high churn risk, escalate)

## Programmatic Helper

This skill ships with a stdlib-only Python script that applies the weights above and converts the weighted total to a RAG status — so the headline score is computed identically every time and weights always sum to 100%.

```bash
# Five scores 1-5 in order: adoption engagement outcomes support commercial
python3 scripts/health_score.py --scores 4 3 4 2 5 --account "Acme Corp"

# Or from JSON (lets you override the default weights per account/segment)
python3 scripts/health_score.py --input account.json
```

It returns the per-dimension weighted points, the **total out of 100**, and the **RAG band** (Green ≥80, Amber 60–79, Red <60) with a one-line next step. Run it to set the headline number, then write the dimension detail and actions below around it. Add `--json` for downstream tooling.

## Output Format

---

# Customer Health Scorecard: [Account Name]

**CSM:** [Name] | **Tier:** [Enterprise / Mid-Market / SMB]
**ARR:** £/$/€[X] | **Renewal date:** [Date] | **Days to renewal:** [N]
**Overall health:** [Green / Amber / Red] — [Score]/100
**Last updated:** [Date]

---

## Health Score Summary

| Dimension | Score (1–5) | Weight | Weighted Score | Trend |
|---|---|---|---|---|
| Product Adoption | [1–5] | 30% | [X] | ↑ / → / ↓ |
| Engagement | [1–5] | 20% | [X] | ↑ / → / ↓ |
| Outcomes | [1–5] | 20% | [X] | ↑ / → / ↓ |
| Support Health | [1–5] | 15% | [X] | ↑ / → / ↓ |
| Commercial | [1–5] | 15% | [X] | ↑ / → / ↓ |
| **Total** | — | 100% | **[X]/100** | |

---

## Dimension Detail

### Product Adoption — [Score]/5
- **DAU/MAU ratio:** [X]% (benchmark: >25% = healthy)
- **Key features adopted:** [List features in use]
- **Features not adopted:** [List unused high-value features]
- **Power users identified:** [Yes / No — how many]
- **Assessment:** [1–2 sentences on adoption health]

### Engagement — [Score]/5
- **Last QBR:** [Date] — [Outcome summary]
- **Next QBR:** [Scheduled / Overdue]
- **Executive sponsor:** [Active / Passive / Vacant]
- **Champion:** [Name, role, strength: strong / moderate / weak]
- **Assessment:** [1–2 sentences]

### Outcomes — [Score]/5
- **Customer's stated goals:** [List 2–3 goals from onboarding or last QBR]
- **Progress against goals:** [On track / Partial / Off track]
- **Evidence of value:** [Metric or quote that demonstrates ROI]
- **Assessment:** [1–2 sentences]

### Support Health — [Score]/5
- **Open tickets:** [N] (priority breakdown: P1: X, P2: X, P3: X)
- **CSAT / NPS:** [Score] (benchmark: >8 CSAT / >30 NPS = healthy)
- **Unresolved escalations:** [Yes / No — details if yes]
- **Ticket trend (last 90 days):** Increasing / Stable / Decreasing
- **Assessment:** [1–2 sentences]

### Commercial — [Score]/5
- **Seats licensed:** [N] | **Seats active:** [N] ([X]% utilisation)
- **Payment history:** [On time / Late — details]
- **Expansion signals:** [Yes — describe / No]
- **Downgrade or cancellation signals:** [Yes — describe / No]
- **Assessment:** [1–2 sentences]

---

## Top Risks

| Risk | Severity | Mitigation |
|---|---|---|
| [Risk description] | High / Medium / Low | [Specific action to mitigate] |

---

## Recommended Actions

**Immediate (this week):**
1. [Action — owner — deadline]

**This month:**
1. [Action — owner — deadline]

**Before renewal:**
1. [Action — owner — deadline]

---

## Renewal Forecast

| Scenario | Probability | ARR at risk |
|---|---|---|
| Full renewal at current ARR | [X]% | £/$/€0 |
| Renewal with contraction | [X]% | £/$/€[X] |
| Churn | [X]% | £/$/€[full ARR] |

**Recommended renewal play:** [Expand / Hold / Save / Manage out]

---

## Quality Checks

- [ ] Score is based on data, not gut feel — each dimension has evidence
- [ ] Risks are specific (not "low engagement" — something like "executive sponsor left in March, no replacement identified")
- [ ] Actions have owners and deadlines
- [ ] Renewal probability is calibrated against pipeline reality
- [ ] Trend arrows reflect direction of change vs. last scorecard, not just current state

## Anti-Patterns

- [ ] Do not score health dimensions on gut feel — every score needs specific supporting evidence
- [ ] Do not give a Green status to accounts with unresolved P1 issues or missed milestones
- [ ] Do not list risks vaguely — "low engagement" without specifics is not actionable
- [ ] Do not leave recommended actions without named owners and deadlines
- [ ] Do not conflate product usage frequency with product value delivery
