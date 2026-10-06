---
name: subcontractor-scorecard
description: "Score a subcontractor's performance across schedule reliability, quality, safety, paperwork, and change-order behaviour with weighted anchors. Use when asked to evaluate a sub, build a subcontractor scorecard, decide whether to rebid or rehire a trade, review sub performance for prequalification, or justify removing a sub from the bid list. Produces a weighted scorecard with per-dimension anchored ratings, evidence notes, and an award/retention recommendation."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/subcontractor-scorecard.html
metadata:
  {
    "openclaw": { "emoji": "🏗" }
  }
---

# Subcontractor Scorecard Skill

Every GC has a mental list of subs they'd hire again and subs they'd rather eat the higher bid to avoid. This skill turns that instinct into a defensible record: five weighted dimensions, anchored 1–5 scales so two reviewers score alike, evidence per rating, and a recommendation you can put in front of a preconstruction meeting — or a sub's principal — without it reading as a grudge.

## What This Skill Produces

- A **weighted scorecard** across five dimensions with a 0–100 composite score
- **Anchored 1–5 ratings** per dimension with the evidence behind each
- A **recommendation tier**: preferred / approved / conditional / do-not-rebid
- **Feedback points** suitable for a performance conversation with the sub
- Optional **side-by-side comparison** when scoring multiple subs in a trade

## Required Inputs

Ask for what's missing; from partial data, score what's evidenced and mark unscored dimensions `[insufficient data]` rather than guessing:

- **Sub and trade**, projects covered by the evaluation, contract values
- **Schedule facts** — milestones hit/missed, manpower vs. commitments, recovery behaviour
- **Quality facts** — punch item counts vs. trade norms, rework/back-charges, inspection failures, submittal quality
- **Safety facts** — recordables/near-misses on your sites, EMR if known, toolbox/permit compliance
- **Paperwork facts** — timeliness of lien waivers, certified payroll, insurance certs, closeout docs
- **Change-order behaviour** — pricing reasonableness, claims posture, T&M ticket discipline

## Scoring Framework

Score each dimension 1–5 against the anchors, then weight:

| Dimension | Weight | 1 (fails) | 3 (solid) | 5 (excellent) |
|---|---|---|---|---|
| **Schedule reliability** | 30% | Chronic slips, ghost crews, drives the critical path late | Hits most dates; slips flagged early with recovery plan | Hits dates, staffs to plan, accelerates when asked without drama |
| **Quality / rework** | 25% | Repeated failed inspections, punch counts far above trade norm, back-charged rework | Normal punch volume, closes items promptly, rare rework | First-time-quality culture; punch list light and closed fast |
| **Safety** | 20% | Recordable(s) from ignored controls; fights the safety program | Compliant; participates in briefings; near-misses reported | Brings hazards to you first; crews self-police; clean record |
| **Paperwork discipline** | 10% | Chases required for waivers/certs; closeout drags months | Mostly on time with reminders | Billing, waivers, and closeout docs arrive right, first time |
| **Change-order behaviour** | 15% | Weaponises COs — lowball bid, then claims on every RFI | Prices changes fairly with backup; negotiates in good faith | Flags cost issues before they're changes; transparent pricing |

**Composite** = Σ(rating × weight) × 20, giving 0–100. Map to a recommendation:

- **85–100 Preferred** — invite to negotiate, consider for design-assist
- **70–84 Approved** — keep on the bid list
- **55–69 Conditional** — rebid with specific conditions (named super, weekly look-ahead, tighter retainage)
- **<55 Do-not-rebid** — document why; a low bid from this sub isn't a low cost

Safety scores of 1–2 cap the overall recommendation at **Conditional** regardless of composite — a sub who hurts people isn't "preferred" at any price.

## Output Format

### Subcontractor Scorecard: [Sub] — [Trade] — [Period/projects]

**1. Composite score & recommendation tier** — with the one-paragraph justification.
**2. Dimension table** — | Dimension | Weight | Rating (1–5) | Evidence | 
**3. Trend note** — improving, stable, or declining vs. prior projects, if history given.
**4. Conditions / feedback points** — specific, evidence-backed items for the sub conversation.
**5. Data gaps** — dimensions scored on thin evidence, flagged `[insufficient data]`.

## Quality Checks

- [ ] Every rating cites specific evidence (project, event, count) — no vibes-only scores
- [ ] Weights sum to 100% and the composite math is shown
- [ ] Safety cap rule applied if safety scored 1–2
- [ ] Recommendation tier follows from the score — or the override is stated and justified
- [ ] Feedback points are usable in a face-to-face with the sub's principal without escalating

## Anti-Patterns

- [ ] Do not let one bad final month erase a good project — score the whole evaluation period
- [ ] Do not score paperwork as highly as schedule — the weights exist because the failure modes aren't equal
- [ ] Do not average away a safety failure inside the composite — apply the cap rule
- [ ] Do not write "poor attitude" as evidence — describe the behaviour and its project impact
- [ ] Do not score dimensions you have no data for — mark `[insufficient data]` and say what record-keeping would fix it

## Example Trigger Phrases

- "Evaluate a sub."
- "Build a subcontractor scorecard."
- "Decide whether to rebid."
- "Rehire a trade."
- "Review sub performance for prequalification."
