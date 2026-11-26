# Worked Example — Customer Health Scorecard

A gold-standard run of this skill: an account whose usage dashboard glows green scored honestly at Amber, because the person who made the usage happen just resigned.

## The brief

Kestrel Security — a fictional attack-surface-management vendor — has Harborstone Bank as a $240K ARR enterprise account renewing 30 November 2026 (139 days out). The usage dashboard is the best in the CSM's book: DAU/MAU 34%, six power users, mean-time-to-triage down from 26 hours to 9. But Tomás Rivera, Director of Security Operations and the champion who drove every rollout, resigned on 30 June with no named successor, the CISO sponsor has gone quiet, the last QBR was in February, and procurement has just asked to "see renewal options." CSM Amara Osei needs a scorecard for the July risk review.

## The output

---

# Customer Health Scorecard: Harborstone Bank

**CSM:** Amara Osei | **Tier:** Enterprise
**ARR:** $240,000 | **Renewal date:** 30 Nov 2026 | **Days to renewal:** 139
**Overall health:** Amber — 66/100
**Last updated:** 14 Jul 2026

---

## Health Score Summary

| Dimension | Score (1–5) | Weight | Weighted Score | Trend |
|---|---|---|---|---|
| Product Adoption | 4 | 30% | 24 | → |
| Engagement | 2 | 20% | 8 | ↓ |
| Outcomes | 4 | 20% | 16 | ↑ |
| Support Health | 3 | 15% | 9 | → |
| Commercial | 3 | 15% | 9 | ↓ |
| **Total** | — | 100% | **66/100** | |

---

## Dimension Detail

### Product Adoption — 4/5
- **DAU/MAU ratio:** 34% (benchmark: >25% = healthy)
- **Key features adopted:** External asset discovery, alert triage workflows, ServiceNow and Splunk integrations
- **Features not adopted:** Cloud-configuration monitoring module (licensed since January, 0 scans run)
- **Power users identified:** Yes — 6, but 4 of the 6 report into the departing champion's team
- **Assessment:** Usage is deep and habitual on the core platform. Withheld from 5/5 because the paid cloud-config module is shelfware and the power-user base is concentrated in one team now losing its leader.

### Engagement — 2/5
- **Last QBR:** 12 Feb 2026 — well received; agreed cloud-config rollout by Q2 (did not happen)
- **Next QBR:** Overdue — nothing scheduled since the champion's resignation
- **Executive sponsor:** Passive — CISO (Dana Whitcombe) has not replied to two touches since May
- **Champion:** Tomás Rivera, Director of SecOps — **resigned 30 June, last day 25 July**; successor not named; strength of remaining relationships: weak
- **Assessment:** Every relationship thread runs through a person who leaves in eleven days. This dimension, not usage, is what the renewal will turn on.

### Outcomes — 4/5
- **Customer's stated goals:** (1) Cut mean-time-to-triage on external exposures; (2) full external asset inventory ahead of the 2026 regulator audit
- **Progress against goals:** On track — MTTT down from 26h to 9h since onboarding; asset inventory at 94% coverage
- **Evidence of value:** Rivera's own February QBR slide credited the platform with the MTTT reduction — but that evidence leaves with him; no ROI artefact exists that the CISO or CFO has signed off
- **Assessment:** Real, measured value — currently documented nowhere the buying committee will look.

### Support Health — 3/5
- **Open tickets:** 7 (P1: 0, P2: 2, P3: 5)
- **CSAT / NPS:** CSAT 7.8 (benchmark: >8 = healthy)
- **Unresolved escalations:** No — May's scan false-positive escalation resolved with tuning
- **Ticket trend (last 90 days):** Stable
- **Assessment:** Serviceable, not great. CSAT sits just under benchmark, dragged by false-positive noise on scans; both open P2s relate to the same tuning theme.

### Commercial — 3/5
- **Seats licensed:** 250 | **Seats active:** 172 (69% utilisation)
- **Payment history:** On time, all invoices
- **Expansion signals:** Cloud-config expansion discussed in February — stalled since; no active thread
- **Downgrade or cancellation signals:** Yes — procurement (R. Aldous) requested "renewal options including reduced scope" on 8 July
- **Assessment:** Clean payer, but 31% of seats idle plus an unadopted paid module hands procurement a ready-made contraction case.

---

## Top Risks

| Risk | Severity | Mitigation |
|---|---|---|
| Champion departs 25 July with no successor; CISO sponsor unresponsive since May | High | Ask Rivera for a warm handover intro this week, before his last day; request CISO meeting positioned as audit-readiness review, not a sales touch |
| Cloud-config module ($48K of the $240K) is shelfware — procurement's "reduced scope" request likely targets it | High | Run a scoped 30-day activation sprint on cloud-config with the infra team; if no adoption by 1 Sep, proactively restructure rather than let procurement cut it |
| Value evidence is anecdotal and leaves with the champion | Medium | Convert the MTTT and inventory numbers into a one-page ROI summary co-signed by the customer before 25 July |

---

## Recommended Actions

**Immediate (this week):**
1. Book handover call with Rivera; secure intros to his interim replacement and the infra lead — Amara Osei — by 18 Jul
2. Draft the MTTT/asset-inventory ROI one-pager for Rivera to validate before his last day — Amara Osei — by 22 Jul

**This month:**
1. CISO meeting framed around regulator-audit readiness (their stated goal), not renewal — Amara Osei + VP Customer Success — by 8 Aug
2. Kick off cloud-config activation sprint with named infra-team owner on the customer side — Solutions engineer (J. Park) — by 15 Aug

**Before renewal:**
1. QBR with new SecOps leader once named, anchored on the co-signed ROI page — Amara Osei — by 30 Sep
2. Renewal proposal with a pre-built right-size option (in case cloud-config sprint fails) so procurement negotiates against our structure, not theirs — AE (L. Moreau) — by 17 Oct

---

## Renewal Forecast

| Scenario | Probability | ARR at risk |
|---|---|---|
| Full renewal at current ARR | 45% | $0 |
| Renewal with contraction (drop cloud-config module) | 40% | $48,000 |
| Churn | 15% | $240,000 |

**Recommended renewal play:** Save — the account behaves like a Green on usage but the relationship layer has failed; treat it as at-risk until the sponsor thread and successor champion are rebuilt.

---

## Why it's shaped this way

- **The weighted total actually computes:** 4×30% + 2×20% + 4×20% + 3×15% + 3×15% on the 1–5 scale gives 24+8+16+9+9 = 66/100, which the Score → RAG conversion places in Amber (60–79) — the same arithmetic the `health_score.py` helper enforces, so the headline never contradicts the dimension rows.
- **Green usage does not produce a Green account** — the framework weights Adoption at only 30%, and the anti-pattern "do not conflate product usage frequency with product value delivery" is why the Engagement 2/5 (champion gone, sponsor silent) is allowed to drag a 34% DAU/MAU account to Amber.
- **Every dimension score cites evidence, not vibes** — per the quality check "score is based on data, not gut feel": Adoption loses a point to a named shelfware module and power-user concentration, not to a feeling.
- **Risks name people and dates** — the quality checks explicitly reject "low engagement" in favour of the pattern "executive sponsor left in March, no replacement identified"; here it's "Rivera departs 25 July, no successor; CISO unresponsive since May."
- **Trend arrows record direction of change, not current state** — Outcomes is ↑ (MTTT still improving) even while Engagement and Commercial are ↓; the quality check requires arrows to reflect movement vs. the last scorecard, which is what makes the contradiction visible.
- **Forecast probabilities sum to 100% and the contraction ARR matches the shelfware module** — 45+40+15 = 100, and the $48K at risk is the actual cloud-config line item, keeping the forecast "calibrated against pipeline reality" per the quality checks.
- **Actions all carry a named owner and a deadline** — including a deliberately pre-emptive one (build the right-size option ourselves), because the anti-patterns forbid leaving actions unowned and the Save play requires controlling the contraction conversation rather than reacting to it.
