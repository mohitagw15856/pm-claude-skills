# Example: feature-prioritisation

## What this skill does

Applies the right prioritisation framework (RICE, MoSCoW, Kano, ICE or Opportunity Scoring) to a real backlog and returns a scored ranking, the recommended build order and the assumptions behind the scores.

## How to trigger it

### Example 1: ranking a quarter's candidates with RICE

**You say:**
> "Prioritise with RICE: 1) SSO (enterprise asks, ~40 accounts, 3 person-months), 2) dark mode (constant requests, 1 month), 3) CSV import (support says it blocks onboarding, ~300 users/quarter, 1.5 months), 4) AI summaries (exec pet idea, unknown demand, 2 months)."

**Claude produces (excerpt):**

| Feature | Reach | Impact | Confidence | Effort | RICE | Rank |
|---|---|---|---|---|---|---|
| CSV import | 300 | 2 | 80% | 1.5 | 320 | 1 |
| SSO | 40 accts (~premium-weighted 200) | 3 | 80% | 3 | 160 | 2 |
| Dark mode | 900 | 0.5 | 100% | 1 | 450* | see note |
| AI summaries | unknown | 1 | 50% | 2 | not scorable | 4 |

*Dark mode's raw score ranks first, but Impact 0.5 reflects comfort, not the retention goal; flagged so the number does not outrank the goal.

**Recommended order:** CSV import → SSO → dark mode. **AI summaries:** returns to the list once demand has evidence; a 2-week fake-door test would supply the Reach number.

**Assumptions made:** SSO reach weighted by account size; CSV impact tied to onboarding completion, your stated goal metric.

### Example 2: a stakeholder alignment meeting

**You say:**
> "Same backlog, but tomorrow is an alignment meeting with sales and support leads. RICE will start a spreadsheet fight. What do I use?"

**Claude produces (excerpt):**

**Framework: MoSCoW** (alignment beats precision in a room).

- **Must have:** CSV import (onboarding blocker, support data)
- **Should have:** SSO (revenue-gated, not usage-gated)
- **Could have:** dark mode (cheap, visible goodwill)
- **Won't have (this quarter):** AI summaries, pending the demand test

**Meeting mechanic:** each lead places items silently first, then argue only the cells that differ; record the final grid with one sentence of rationale per disputed item.

## Tips for best results

- Bring real numbers for reach and effort, even rough ones; the skill labels what it had to assume.
- Name the goal metric; impact scores are meaningless without the thing being impacted.
- Say who sees the output; the framework changes between a spreadsheet and a room.

## Related skills

- `rice-prioritisation` when you want the full RICE treatment on one scored list
- `okr-builder` to set the goal the prioritisation should serve
