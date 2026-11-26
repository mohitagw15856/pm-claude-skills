# Worked Example — A/B Test Planner

A gold-standard run of this skill: a low-traffic fintech experiment where the maths forces a real trade-off between the effect the team wants to detect and the test they can actually run.

## The brief

Marlow — a fictional consumer fintech app for freelancers — sees only 32% of new sign-ups link a bank account within 24 hours, and unlinked users churn at 3× the rate of linked ones. PM Renata Diaz wants to move the bank-linking prompt from screen 6 of onboarding to screen 2, right after account creation. Growth lead Callum Reid also wants to rewrite the prompt copy "while we're in there." Marlow gets ~620 eligible new sign-ups per day. Leadership originally asked to detect "any lift of 5% or more." Data scientist Ines Wolf is worried the change will scare people off before they finish onboarding at all.

## The output

### A/B Test Plan — Early Bank-Link Prompt — July 14, 2026

**Hypothesis:**
> We believe that moving the bank-link prompt from onboarding screen 6 to screen 2 will cause 24-hour bank-link rate to increase by 10% relative (32% → 35.2%) for new freelancer sign-ups, because session recordings show 44% of users never reach screen 6, and linked-account intent is highest immediately after account creation.

**Variants:**
- Control (A): Current flow — bank-link prompt on screen 6, after profile, tax setup, and notification screens.
- Treatment (B): Bank-link prompt on screen 2, immediately after account creation. **Prompt copy, visuals, and skip option are identical to control.** Callum's copy rewrite is explicitly excluded — it becomes the next test if this one ships.

**Primary Metric:** 24-hour bank-link rate — % of new sign-ups with ≥1 successfully linked bank account within 24h of account creation.
**Guardrail Metrics:**
1. Onboarding completion rate (currently 71%) — the risk Ines flagged: asking for bank credentials early may cause abandonment.
2. Bank-link error rate **per attempt** (currently 8.1%) — measured per attempt, not per user. Note the ambiguity: Treatment will mechanically generate more link *attempts*, so errors-per-user will rise even if the flow is healthy. Per-attempt is the honest denominator; the team agreed this in writing before launch so it can't be re-litigated after results land.

**Target Segment:** 100% of new sign-ups on iOS and Android, 50/50 split.
**Traffic Split:** 50/50, no ramp — the change is behind a flag and reversible in minutes.

**Sample Size Required:** ~3,500 users per variant (~7,000 total) — baseline 32%, MDE 10% relative, 95% confidence, 80% power. *These are estimates; confirm with a proper calculator before launch.*
**Estimated Duration:** 2 weeks. Raw sample maths says ~11 days (7,000 ÷ 620/day), extended to 14 full days to cover two weekly cycles — freelancer sign-up behaviour differs sharply midweek vs weekend.
**Significance Threshold:** 95% confidence, 80% power

**The trade-off leadership needs to sign off:** the requested 5% relative MDE requires ~13,500 users per variant — 27,000 total, ~6.5 weeks at current traffic. That breaches the 4-week maximum (novelty effects distort results beyond it). We are therefore powering for a 10% relative lift. **Consequence: a true lift between +5% and +10% will likely read as inconclusive, and we will not ship on it.** If leadership can't accept that, the alternative is a 6-week holdout design, not a longer A/B test.

**Exclusions:**
- Existing users re-onboarding after reinstall (already have link history)
- Sign-ups from partner-bank referral links (~7% of traffic — arrive pre-linked, would dilute both arms)
- Users enrolled in the concurrent pricing-page test (segment isolation)

**Rollback Trigger:** Stop immediately if onboarding completion drops below 66% (–5pts absolute) on any full day after day 2, or bank-link error rate per attempt exceeds 10.5% sustained over 24h. Monitoring guardrails for harm is not "peeking" — no one reads the primary metric until day 14.

**Results Interpretation Guide:**
- ✅ Ship if: 24h link rate shows ≥10% relative lift at 95% confidence AND onboarding completion is within 2pts of control AND per-attempt error rate is stable
- 🔄 Iterate if: Link rate lifts but onboarding completion drops 2–5pts — the prompt works but the placement is too abrupt; test a softer screen-2 variant (e.g. "link now or remind me later")
- ❌ Reject if: No lift, or completion drops >5pts — restore control, and Callum's copy test inherits the traffic
- ⚠️ Inconclusive: Do not ship. Do not call it a win. Log the observed effect and decide whether a follow-up is worth 2 more weeks of traffic.

## Why it's shaped this way

- **Callum's copy rewrite is explicitly cut from the treatment** — the anti-pattern bans testing multiple independent changes in one variant ("you won't know which change caused the result"); the plan names the exclusion and turns it into the follow-up test rather than silently dropping it.
- **The hypothesis is directional and evidenced**, filling every slot of the template (change, metric, magnitude, segment, rationale) — the skill bans "let's just see what happens," so the 44%-never-reach-screen-6 finding is cited as the *because*.
- **The MDE trade-off is surfaced as a leadership decision, not buried in the maths** — duration guidance caps tests at 4 weeks and the 5% MDE demanded 6.5, so the plan states plainly what a 10% MDE means: real lifts between 5–10% will read inconclusive and won't ship.
- **Sample size is computed from the actual baseline (32%) and MDE, not pulled from the lookup table**, and carries the skill's mandated warning to confirm with a precise calculator — per the quality check "calculated from actual MDE and baseline (not guessed)."
- **Duration is stretched from 11 days to 14** even though the sample fills sooner — the skill's 2-full-weeks minimum exists to capture weekly seasonality, which matters doubly for freelancers.
- **The error-rate guardrail names its own ambiguity** (per attempt vs per user) and resolves it in writing before launch — a guardrail whose denominator is negotiable after results arrive protects nothing.
- **The rollback trigger has concrete thresholds and is distinguished from peeking** — the guidelines ban reading results early because of p-hacking, but guardrail harm-monitoring with pre-set thresholds is exactly what the "Rollback Trigger" line is for.
- **Inconclusive gets its own outcome with a cost attached** — the interpretation guide's "do not call it a win" rule is enforced by pre-committing what an inconclusive result does (a deliberate decision about 2 more weeks of traffic, not a quiet ship).
