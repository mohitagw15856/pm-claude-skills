---
name: pricing-strategy
description: "Structure pricing strategy decisions, packaging options, and tier design for SaaS and digital products. Use when reviewing or setting pricing, designing pricing tiers, evaluating freemium vs paid, or preparing a pricing change. Produces a pricing strategy recommendation with model rationale, tier structure, competitive positioning, and rollout plan."
---

# Pricing Strategy Skill

Build pricing that reflects value delivered — not cost to build. Structure every pricing decision with customer segmentation, value metric identification, competitive context, and a packaging recommendation.

## Pricing Foundations

Three questions to answer before any pricing decision:
1. **Who is our buyer?** (Role, company size, willingness to pay)
2. **What value do we deliver?** (Quantifiable outcome — time saved, revenue generated, risk reduced)
3. **What is our pricing model?** (Per seat, usage-based, flat, hybrid)

---

## Pricing Models

| Model | Best For | Risk |
|---|---|---|
| **Per Seat** | Collaboration tools, team software | Disincentivises adoption as team grows |
| **Usage-Based** | APIs, infrastructure, consumption tools | Revenue unpredictability for both sides |
| **Flat Rate** | Simple tools, early-stage | Leaves money on table from power users |
| **Tiered** | Products with clear user segments | Feature gatekeeping frustrates users |
| **Freemium** | Viral/PLG products with low marginal cost | Conversion to paid is hard to engineer |
| **Value-Based** | Enterprise, outcomes-driven products | Requires strong ROI story |

---

## Freemium Decision Framework

Use freemium when:
- ✅ Marginal cost per free user is near zero
- ✅ Product is inherently viral (network effects or sharing)
- ✅ Free tier creates genuine value (not just a demo)
- ✅ Clear upgrade trigger exists (feature, volume, or team size)
- ✅ Conversion benchmark is realistic (2–5% free-to-paid is typical)

Avoid freemium when:
- ❌ Support cost per free user is high
- ❌ No natural upgrade trigger in the product
- ❌ Core value requires features you'd need to gate

---

## Packaging / Tiering Framework

Recommended 3-tier structure for SaaS:

| Tier | Target | Price Signal | Key Features | Lock-in Mechanism |
|---|---|---|---|---|
| **Free / Starter** | Individual, early discovery | $0 | Core value, usage-limited | Invite colleagues, export limit |
| **Pro / Growth** | SMB, growing teams | $[X]/seat/mo | Full features, higher limits | Team collaboration, integrations |
| **Business / Enterprise** | Mid-market, enterprise | $[X]/seat/mo or custom | Admin, SSO, SLAs, dedicated support | Security, compliance, volume |

Tier design rules:
- Each tier should be genuinely sufficient for its target segment
- The upgrade trigger should be felt naturally — not manufactured
- Price jumps of 3–5x between tiers are normal and defensible

---

## Competitive Pricing Context

| Competitor | Model | Price | Key Differentiator |
|---|---|---|---|
| [Name] | [Model] | [Price] | [What they lead with] |

Positioning options:
- **Premium:** Price 20–40% above market. Justify with enterprise features, support, or brand.
- **Parity:** Match the market leader. Win on product or distribution.
- **Value:** Price below market. Win on volume. Dangerous without strong unit economics.

---

## Output Format

### Pricing Strategy Recommendation — [Product] — [Date]

**Current State:** [What pricing exists today, if any]
**Problem to Solve:** [Why pricing is being reviewed]

**Recommended Pricing Model:** [Model name + rationale]

**Value Metric:** [The single unit that scales with customer value — e.g., "active users", "API calls", "documents processed"]

**Proposed Tiers:**

[Table using 3-tier structure above]

**Free-to-Paid Upgrade Trigger:** [Specific moment or threshold that creates natural upgrade pressure]

**Competitive Position:** [Premium / Parity / Value + reasoning]

**Pricing Change Rollout (if applicable):**
- Grandfathering: [Yes / No — recommendation and rationale]
- Communication plan: [How to tell customers + timing]
- Rollback plan: [Under what conditions you'd revert]

**Risks:**
- [Risk] → Mitigation: [Action]

**Metrics to Monitor Post-Change:**
- Conversion rate (free to paid)
- Churn rate by tier
- Average revenue per user (ARPU)
- Expansion revenue

---

## Required Inputs

Ask the user for these if not provided:
- **Product or service** being priced
- **Current pricing** (if any — and why it's being reviewed)
- **Target customer segments** (size, role, willingness to pay)
- **Key competitors and their pricing** (if known)
- **Business model** (SaaS / Marketplace / Usage-based / Other)
- **Primary goal** (grow adoption / increase ARPU / reduce churn / new market entry)

## Quality Checks

- [ ] Value metric is defined (the unit that scales with customer value)
- [ ] Free-to-paid upgrade trigger is specific (not "when they need more")
- [ ] Competitive positioning is chosen and justified (premium / parity / value)
- [ ] Pricing change rollout plan includes grandfathering decision
- [ ] Counter-metrics are defined to catch perverse incentives
- [ ] Risks have specific mitigations (not just listed)

## Guidelines

- Never price based on cost — price based on value delivered to the customer
- Always A/B test price changes where possible; use geographic holdouts if A/B isn't feasible
- Recommend annual pricing with 15–20% discount — improves cash flow and reduces churn
- If enterprise pricing is "contact us", recommend adding a price floor to qualify inbound
