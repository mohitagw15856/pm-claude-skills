# Example: competitor-teardown

## What this skill does

Produces a one-off structured teardown of a rival or market: positioning map, feature comparison, messaging gaps and strategic recommendations, lighter than a full landscape document.

## How to trigger it

### Example 1: tearing down one rival

**You say:**
> "Teardown of [Competitor X] for our invoicing product. Their homepage says 'Invoices that pay themselves'. We're stronger on multi-currency; they're stronger on their mobile app."

**Claude produces (excerpt):**

### 1. Competitive Landscape Overview

[Competitor X] anchors the convenience end of the market: automated chasing and a polished mobile app, aimed at sole traders. The white space sits with international small firms, where multi-currency and tax handling decide the purchase and X is thin.

### 2. Positioning Map

Axes: **ease of first invoice** (x) vs **international depth** (y).
- [X]: high ease, low depth. Rationale: 60-second first invoice, two currencies.
- [Your product]: moderate ease, high depth. Implication: lead with "built for cross-border", concede the speed story rather than fight it.

### 3. Feature Comparison Table

| Feature | [Yours] | [X] |
|---|---|---|
| Multi-currency invoicing | ✅ | 🟡 Partial (2 currencies) |
| Automatic payment chasing | 🟡 Partial | ✅ |
| Native mobile app | ❌ | ✅ |

### 4. Messaging Analysis

**[X]:** "Invoices that pay themselves" claims outcome, not features. Gap: nothing about international clients anywhere above the fold, which is exactly the claim you can own.

### Example 2: a SWOT when that is all you need

**You say:**
> "Quick SWOT of [Competitor X] before my 2pm."

**Claude produces (excerpt):**

**Strengths:** mobile app rated 4.7; automated chasing; brand recall with sole traders.
**Weaknesses:** two currencies; no approval workflows; support is email-only past 6pm.
**Opportunities (for you):** their enterprise reviews cite admin controls; your roles feature answers it.
**Threats:** their announced [feature] would neutralise your chasing gap if it ships this quarter.

## Tips for best results

- Paste their actual homepage headline and pricing; messaging analysis from memory invents things.
- Say which two axes matter in your deals; the map is only as useful as its axes.
- Mark unverified cells honestly; this document travels to sales.

## Related skills

- `competitive-analysis` for the full landscape with win/loss and pricing matrices
- `product-positioning-doc` to act on the white space the teardown reveals
