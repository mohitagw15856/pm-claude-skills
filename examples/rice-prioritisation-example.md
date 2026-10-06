# Example: rice-prioritisation

## What this skill does

Scores and ranks product initiatives with RICE (Reach × Impact × Confidence ÷ Effort): a ranked table with sources named per estimate, quick wins and moonshots flagged, surprising ranks interrogated, and a recommended sequence with data gaps.

## How to trigger it

### Example 1: ranking a quarter's backlog

**You say:**
> "RICE-rank these for Q1: in-app search (analytics say 8k MAU would touch it, eng says 2 months), bulk edit (asked by 15 enterprise accounts, 1 month), dark mode (loud on social, no usage data, 0.5 months), SSO (blocks 4 deals worth £180k ARR, 1.5 months), export API (300 requests in feedback tool, 1 month)."

**Claude produces (excerpt):**

### RICE Prioritisation: Q1 Backlog

| Initiative | Reach | Impact | Confidence | Effort | RICE Score | Notes |
|---|---|---|---|---|---|---|
| SSO | 4 accounts (but £180k ARR) | 3 (massive: deal-blocking) | 90% (named deals) | 1.5 | 7.2 | reach understates; see below |
| Bulk edit | 15 accounts (~900 users) | 2 | 80% (direct asks) | 1 | 14.4 | quick win |
| In-app search | 8,000 MAU | 1 | 70% (analytics, impact assumed) | 2 | 28.0 | surprising #1; interrogated below |
| Export API | ~300 requesters | 1.5 | 60% (feedback counts inflate) | 1 | 2.7 | |
| Dark mode | unknown | 0.5 | 50% (no data; default applied) | 0.5 | n/a; scored only if reach measured | data gap |

#### The surprising rank, interrogated
Search tops the raw table on reach alone, but its impact score is the least evidenced (nobody has shown users fail without it). Either run the 2-day log analysis of zero-result navigation sessions, or down-weight confidence to 50%, which drops it below bulk edit. The table is the start of the argument, not the verdict.

#### Recommended Sequence
1. **Bulk edit** (quick win, highest evidenced score), 2. **SSO** (RICE understates revenue-blocking items; £180k is the real number), 3. **Search**, conditional on the log analysis.

#### Data Gaps to Address
Dark mode reach (one survey question), search failure evidence (session logs), export API's true demand (deduplicate the 300 requests by account).

### Example 2: defending the ranking in planning

**You say:**
> "Sales is angry SSO isn't #1. Engineering says search should be because it's 'obviously core'. Arbitrate."

**Claude produces (excerpt):**

**Both objections name real RICE weaknesses, so use them:** Sales is right that RICE's reach counts users, not pounds; re-scored with ARR-weighted reach, SSO is #1 and the table says so transparently. Engineering's "obviously core" is an impact claim at 100% confidence with no source; invite them to supply the evidence the confidence column is waiting for. The framework's job is exactly this: turning "obviously" into a number someone has to defend.

## Tips for best results

- Give sources with each input (analytics, named deals, feedback counts); confidence scores are built from them.
- Let effort come from engineering, not the PM; it is the denominator, so optimism there corrupts everything.
- Challenge the top rank before accepting it; an inflated estimate rises, and interrogating it is part of the method.

## Related skills

- `rice-impact-matrix` for the fuller matrix treatment with sensitivity on the scores
- `feature-prioritisation` when RICE's single score is too blunt for the trade-offs in play
