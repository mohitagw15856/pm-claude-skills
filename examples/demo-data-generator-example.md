# Example: demo-data-generator

## What this skill does

Designs realistic, internally consistent fake data for a no-signup demo, writes a seeded generator, and checks that no real personal data is included.

## How to trigger it

### Example 1: an invoicing app

**You say:**
> "Generate demo data for my invoicing app so visitors can click around without signing up. Tables: clients, invoices, invoice_lines, payments. UK, pounds."

**Claude produces (excerpt):**

| Entity | Count | Relationships | Consistency rules |
|---|---|---|---|
| clients | 18 | none | `createdAt` between Jan and Jun 2026 |
| invoices | 64 | client | issued after client created; due 30 days after issue |
| invoice_lines | 151 | invoice | invoice total = sum of lines, including VAT at 20% |
| payments | 49 | invoice | paid on or after issue; never more than the invoice total |

**The story:** Ashdown Studio, a five-person design studio, three months into using the app.
Most clients pay on time; Fairbank Ltd is 23 days overdue on a £4,320 invoice, which gives the
dashboard's "Overdue" card something to show. One client has paid in two instalments.

```
$ node scripts/generate-demo-data.mjs --seed 7
seed 7: 18 clients, 64 invoices, 151 lines, 49 payments -> seed/ (all checks passed)
```

No-real-data checklist: emails at `example.com`, phones from 07700 900000 to 900999, company
names checked against Companies House search (no exact match in the design sector), no
production export used.

---

### Example 2: catching an inconsistency

**You say:**
> "Here's my old seed script, why do the charts look wrong?"

**Claude produces (excerpt):**

```
Consistency check failed: 11 of 40 orders are dated before their customer's signup.
Your script picks order dates from the whole year and customers' signup dates
independently. Fix: generate the customer first, then draw order dates after signup.
Revenue per month also double-counted refunds; totals are now computed from lines.
```

## Tips for best results

- Describe the story you want the demo to tell; it decides which edge cases appear.
- Keep the seed in the repo and regenerate in CI so screenshots stay identical.
- Ask for skewed distributions (a few power users) if the demo should look lived-in.

## Related skills

- `importer-scaffolder`: when the data comes from a real export instead of being invented.
- `self-host-packager`: ship the demo data as an optional seed in the Docker setup.
