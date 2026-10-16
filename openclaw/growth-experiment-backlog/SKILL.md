---
name: growth-experiment-backlog
description: "Build and prioritise a growth experiment backlog. Use when asked to plan growth experiments, prioritise growth ideas, set up a test backlog, or run a growth process/sprint. Produces a prioritised backlog — each experiment as a hypothesis with the metric it moves, an ICE/PXL score, the minimum test design, and a definition of done; plus the cadence to run it."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/growth-experiment-backlog.html
metadata:
  {
    "openclaw": { "emoji": "📈" }
  }
---

# Growth Experiment Backlog Skill

Growth is a rate of learning, not a list of ideas. This skill turns a pile of "we should try…" into a
prioritised backlog of falsifiable experiments — each tied to a metric, scored for impact and effort,
and shaped as the smallest test that could prove it — so the team ships learning every week, not opinions.

## Required Inputs

Ask for these only if they aren't already provided:

- **The metric to move** — the one growth metric this cycle (activation, conversion, retention, referral).
- **The funnel stage / leak** — where the opportunity is (pair with [`marketing-funnel-plan`](../marketing-funnel-plan/SKILL.md)).
- **Raw ideas** — any experiment ideas already on the table.
- **Constraints** — eng/design bandwidth and traffic volume (which caps how many tests can reach significance).

## Output Format

### Growth Backlog: [metric this cycle]

**1. Focus** — the one metric and the funnel stage, with the current baseline. A backlog without a focus metric is just a wish list.

**2. Backlog table** — every idea as a hypothesis, scored and sortable:

| # | Hypothesis ("If we ___, then [metric] will ___ because ___") | Stage | Impact | Confidence | Ease | ICE | Status |
|---|---|---|---|---|---|---|---|

(Use ICE (1–10 each) or PXL for less gameable scoring. Sort by score; the top few are this cycle's tests.)

**3. Test designs (top 3)** — for each top experiment: the exact change, the **primary metric + guardrail metrics**, the variant(s), the sample size/duration to detect the expected effect, and the **definition of done** (ship / iterate / kill).

**4. Cadence** — the weekly rhythm: pick → build → run → read → decide → document the learning back into the backlog (winners and losers both teach).

## Quality Checks

- [ ] Every item is a falsifiable hypothesis with the metric it moves and a "because" — not a vague idea
- [ ] Scoring (ICE/PXL) is applied consistently so the backlog is sortable, not cherry-picked
- [ ] Top experiments specify sample size/duration to actually detect the expected effect
- [ ] Each test has guardrail metrics so a "win" can't quietly harm something else
- [ ] There's a cadence that captures the learning from losers, not just winners

## Anti-Patterns

- [ ] Do not run experiments without a hypothesis and a target metric — that's just shipping changes and hoping
- [ ] Do not call a test before it reaches the planned sample size — peeking and stopping early manufactures fake wins
- [ ] Do not chase many tiny tests when traffic is low — you'll never reach significance; pick fewer, bigger bets
- [ ] Do not ignore guardrail metrics — a conversion win that tanks refunds or retention is a loss
- [ ] Do not discard losing experiments silently — the learning is the asset; record why it failed

## Based On

Growth-process practice — ICE/PXL prioritisation, hypothesis-driven experiments, and the build–measure–learn cadence.

## Example Trigger Phrases

- "Plan growth experiments."
- "Prioritise growth ideas."
- "Set up a test backlog."
- "Run a growth process/sprint."
