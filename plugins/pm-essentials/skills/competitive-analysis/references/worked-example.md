# Worked Example — Competitive Analysis

A gold-standard run of this skill: a three-competitor landscape for an API observability startup, with every claim sourced or flagged, and win/loss split by segment instead of averaged into mush.

## The brief

Tracelight — a fictional 60-person, $8M ARR API observability platform for mid-market engineering teams — has lost 4 of its last 10 enterprise deals to incumbent **Spanline**, while PLG upstart **Peekstack** undercuts it at the low end and open-source **OpenGauge** keeps appearing in security-conscious evaluations. PM Priya Raman is preparing the analysis for the product team and sales enablement ahead of Q3 planning. Available sources: competitor public docs and pricing pages, ~120 G2 reviews, 14 win/loss call notes, and 2 churned-customer exit interviews.

## The output

```markdown
# Competitive Landscape: Tracelight — Q3 2026
**Audience**: Product team + sales enablement · **Focus**: full landscape
**Sources**: competitor public docs/pricing pages [docs], G2 reviews n≈120 [G2], 14 win/loss calls [W/L], 2 churn exit interviews [churn]. Unverified claims are tagged [assumption].

## 1. Executive Summary

- **Market Position**: Tracelight owns the "fast time-to-value for mid-market API teams" position. We are not credibly enterprise yet, and we are no longer the cheapest option.
- **Key Findings**:
  1. 5 of our 6 enterprise losses cite missing SCIM/audit logs before any product capability [W/L] — we lose in procurement, not in the demo.
  2. Peekstack wins on sticker price but G2 reviews show overage-bill anger (11 of ~40 reviews mention surprise bills) [G2] — their weakness is pricing trust, not features.
  3. Our schema-change alerts are the single most cited win reason (7 of 8 mid-market wins) [W/L]; no competitor has an equivalent in production [docs].
  4. OpenGauge is not a revenue competitor but sets the price ceiling for security-conscious buyers who can staff self-hosting [W/L, 3 evals].
- **Strategic Implications**: Close the enterprise procurement gap (SCIM, audit logs) before adding breadth; attack Peekstack on billing predictability, not price; deepen the schema-alerts moat while it's uncontested.

## 2. Competitor Profiles

### Spanline (enterprise incumbent)
- **Company Overview**: ~1,200 employees, public, est. $340M ARR across observability suite [docs, investor materials].
- **Target Customer**: 500+ engineer orgs, platform teams, regulated industries.
- **Value Proposition**: "One platform for all telemetry" — consolidation play.
- **Strengths**: procurement-ready (SSO/SCIM, audit, SOC 2 + ISO), unlimited retention tiers, entrenched vendor relationships.
- **Weaknesses**: setup measured in weeks not hours (G2: "took a quarter to get value" recurs, 9 mentions) [G2]; API-specific workflows are a bolt-on — schema tracking absent [docs].
- **Recent Activity**: acquired a session-replay startup in April 2026; pricing repackaged into credits [docs] — early G2 reviews call the credit model confusing (4 mentions) [G2].

### Peekstack (PLG upstart)
- **Company Overview**: ~80 employees, Series B, ARR unknown [assumption: $10–20M based on headcount].
- **Target Customer**: startups and small teams, bottoms-up adoption.
- **Value Proposition**: "Observability in five minutes, free to start."
- **Strengths**: genuinely fast onboarding, generous free tier, strong developer brand.
- **Weaknesses**: usage-based pricing produces surprise bills (11 of ~40 G2 reviews) [G2]; no RBAC beyond two roles [docs]; single-region US hosting only [docs].
- **Recent Activity**: launched AI incident summaries in May 2026 [docs] — demoware or durable is unknown [assumption].

### OpenGauge (open-source)
- **Company Overview**: OSS project + ~25-person commercial steward selling support.
- **Target Customer**: security-conscious orgs with platform staffing to self-host.
- **Value Proposition**: full data control, no per-seat cost.
- **Strengths**: self-hosted (data never leaves the buyer's VPC); free forever at the core.
- **Weaknesses**: total cost shifts to internal ops headcount; UI depth well behind commercial tools [3 eval notes, W/L].
- **Recent Activity**: v3 shipped OTel-native ingest in June 2026 [docs].

## 3. Feature Comparison Matrix

| Feature | Tracelight | Spanline | Peekstack | OpenGauge |
|---------|-----------|----------|-----------|-----------|
| OTel-native ingest | ✅ Full | ✅ Full | ✅ Full | ✅ Full (v3+) |
| API schema-change alerts | ✅ Full | ❌ None [docs] | ⚠️ Limited — detects breaking changes only, no diff history [docs] | ❌ None |
| SLO / error-budget tracking | ✅ Full | ✅ Full — deeper: multi-window burn rates | ⚠️ Beta [docs] | ⚠️ Via plugin, community-maintained |
| PII redaction at ingest | ⚠️ Regex rules only | ✅ Full — ML-assisted detection | ❌ None [docs] | ✅ Full (self-hosted, moot) |
| SSO/SCIM + audit logs | ⚠️ SSO yes, SCIM/audit missing | ✅ Full | ❌ SSO on top tier only | ⚠️ Via reverse proxy, DIY |
| Self-hosted option | ❌ None | ⚠️ Private-cloud tier, enterprise only | ❌ None | ✅ Full — its entire premise |

Legend: ✅ Full (production-ready) · ⚠️ Limited/Beta · ❌ None
Quality note: "OTel-native" is table stakes on paper but implementations differ — Spanline samples aggressively at default settings (2 churn interviews cited missing traces) [churn]; treat checkmark parity here as misleading in sales conversations.

## 4. Pricing Comparison

| Plan | Tracelight | Spanline | Peekstack |
|------|-----------|----------|-----------|
| Free/Trial | 14-day trial | Demo-gated, no self-serve | Free tier: 1M spans/mo |
| Pro | $65/user/mo | Credits model, opaque; entry ≈ $2K/mo [assumption: from 2 W/L calls] | $0 base + usage; typical team lands $300–900/mo, high variance [G2] |
| Enterprise | $95/user/mo + platform fee | Custom; six figures typical [W/L] | Custom (new, unproven) |

OpenGauge: $0 licence; commercial support from $30K/yr [docs]; real cost is ~1 platform engineer to run it [assumption, consistent with 3 eval notes].

## 5. Market Positioning Map

- **Y-Axis**: Enterprise-ready ←→ Small-team
- **X-Axis**: Time-to-value ←→ Depth/breadth

Spanline: enterprise + depth. Peekstack: small-team + time-to-value. OpenGauge: off-map on hosting control, weak on time-to-value. Tracelight: mid-market + time-to-value, drifting toward depth.

**Whitespace Opportunities**: mid-market teams (50–500 engineers) needing compliance-grade controls (SCIM, audit, EU hosting) without an enterprise contract or self-hosting burden. Nobody serves this today; it is also exactly where our lost enterprise-ish deals cluster [W/L].

## 6. Win/Loss Analysis

**Mid-market (50–500 eng) — we win 7 of 9 competitive deals [W/L]:**
- Better at: schema-change alerts (cited in 7 of 8 wins — "the feature the eng lead demos to their own team"), setup under a day.
- Customers who value: fast adoption without platform-team involvement.

**Enterprise (500+ eng) — we lose 4 of 6 [W/L]:**
- When customers need: SCIM provisioning, audit logs, EU data residency — cited in 5 of 6 losses *before* feature comparison even started.
- Their advantage (Spanline): procurement machinery and compliance paperwork, not product.

**Low end — we lose quietly to Peekstack's free tier [assumption: inferred from trial-abandonment reasons, not directly tracked]:**
- Counter-signal: their G2 overage complaints [G2] suggest a boomerang segment worth nurturing, not fighting for on price.

## 7. Strategic Recommendations

**Immediate Actions (0–3 months):**
1. Ship SCIM + audit logs — removes the stated blocker in 5 of 6 enterprise losses; cheapest revenue we can unlock [W/L].
2. Publish a billing-predictability comparison page and a cost calculator — attacks Peekstack's documented weakness (surprise bills) without a price war [G2].
3. Arm sales with the sampling-quality talk track vs. Spanline — turns the matrix's misleading ✅-parity row into a demo moment [churn].

**Medium-term (3–12 months):**
1. EU-hosted region — appears in 3 of 6 enterprise losses and all 3 OpenGauge evaluations [W/L]; pairs with SCIM to open the whitespace segment.
2. Deepen schema-alerts moat (diff history, consumer-impact mapping) — our only unique ✅ and top win reason; extend the lead before Peekstack's limited version matures [docs, W/L].
3. **Explicitly not recommended**: matching Peekstack's free tier — their model's trust problem is our best marketing, and a free tier cannibalises our Pro seat pricing [G2].

**Assumption register**: Peekstack ARR band; Spanline entry pricing; OpenGauge ops cost; low-end loss inference. Re-verify each before board use.
```

## Why it's shaped this way

- **Every claim carries a source tag or an [assumption] flag** — the top anti-pattern forbids presenting "competitor feature claims as facts without citing a source"; the assumption register at the bottom exists so a reader can tell which four claims would embarrass us in a board deck.
- **The matrix annotates quality, not just presence** — the quality checks require noting "quality differences, not just feature presence"; the OTel row is deliberately called out as misleading checkmark-parity, because that row is where a naive battlecard would lose a deal.
- **Win/loss is split by segment** — the anti-patterns warn that "the same product may win against Competitor A in the enterprise segment and lose in SMB"; averaging our 7-of-9 mid-market record with our 4-of-6 enterprise losses would produce a comfortable, useless "we mostly win."
- **Weaknesses are stated at full strength** — per the anti-pattern against softening negatives "to avoid internal discomfort": we lose in procurement before the demo starts, and we are no longer the cheapest — both sentences sting and both drive the recommendations.
- **The analysis covers pricing, GTM motion, and recent moves, not just features** — the anti-patterns ban an analysis "that only covers features"; Spanline's credit-model confusion and Peekstack's overage anger are pricing-trust signals no feature matrix would surface.
- **One recommendation is an explicit non-action** — matching Peekstack's free tier is named and rejected with a rationale, because "specific actions, not generic advice" cuts both ways: deciding what not to do is a strategic recommendation.
- **Every recommendation traces to a numbered finding** — SCIM ships first because it's cited in 5 of 6 losses, not because enterprise features are generically good; that traceability is what makes the doc decision-grade rather than a landscape tour.
