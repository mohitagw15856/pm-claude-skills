# Example: go-to-market

## What this skill does

Produces a GTM pack for a product or feature: a Moore-format positioning statement, messaging pillars with proof points, feature-to-benefit mapping and role-specific use cases.

## How to trigger it

### Example 1: a GTM pack for a new feature

**You say:**
> "GTM pack for our new audit-log feature. Product is a form builder for healthcare clinics; buyers are practice managers; the alternative is exporting logs manually; proof: logs are immutable, searchable, 7-year retention."

**Claude produces (excerpt):**

### 1. Positioning Statement

> For **practice managers at healthcare clinics** who **must prove who accessed patient form data and when**, **[Product] Audit Log** is a **compliance record-keeping feature** that **turns every access event into a searchable, immutable record**. Unlike **manual log exports**, our product **keeps seven years of history one search away, with nothing to remember to export**.

Tagline: "Every access, on the record."

### 2. Messaging Pillars

**Always inspection-ready**
One sentence: when the auditor asks, the answer is a search, not a scramble.
Proof points: 7-year retention; immutable entries; export-to-PDF for inspectors *(assumed format, confirm)*.
Copy example: "Your next audit is a search box, not a week of exports."

**Nothing to remember**
Proof points: automatic capture on every access; no scheduled export to forget.

### 4. Role-specific use cases
- **Practice manager:** answers a records request in minutes, with timestamps.
- **Clinic owner:** demonstrates compliance posture during insurance review.

### Example 2: positioning only, three options

**You say:**
> "Just positioning statements, three variants, for a budgeting app for freelancers with irregular income. Competitor frame: spreadsheets."

**Claude produces (excerpt):**

1. For **freelancers with lumpy income** who **cannot budget on a monthly salary template**, **[App]** is a **cash-flow budgeting app** that **plans around the gaps, not around paydays**. Unlike **spreadsheets**, it **moves next month's plan automatically when an invoice lands late**.
2. [variant leading with the tax-setaside problem]
3. [variant leading with feast-and-famine smoothing]

**Recommendation:** variant 1; it names the structural difference (no salary rhythm) rather than a feature, and the "invoice lands late" moment is the strongest recognisable pain.

## Tips for best results

- Name the real alternative; "no solution" positioning reads as no market.
- Supply two or three proof points; anything inferred gets marked *(assumed)*, so check those first.
- Say who the buyer is as a role; use cases are written per role, not per persona poster.

## Related skills

- `product-positioning-doc` for the deeper strategic positioning document behind the pack
- `product-launch-checklist` to run the launch the pack feeds
