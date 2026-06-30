---
trigger: model_decision
description: "Generate structured-data (Schema.org / JSON-LD) markup to win rich results in search. Use when asked about schema markup, structured data, rich snippets, JSON-LD, or making a page eligible for stars/FAQ/breadcrumb results. Produces valid JSON-LD for the right schema type, the rich-result it targets, required vs. recommended fields, and validation/guideline notes."
---

# Schema Markup Skill

Structured data tells search engines exactly what a page is — a product, a recipe, an FAQ, an event — making
it eligible for rich results (star ratings, FAQ drop-downs, breadcrumbs) that win clicks. This skill produces
valid **JSON-LD** for the right Schema.org type, with the fields Google actually requires, and flags the
guideline traps that get markup ignored or penalised.

## Required Inputs

Ask for these only if they aren't already provided:

- **The page & its content** — what the page is (product, article, FAQ, local business, event, recipe, how-to…).
- **The rich result you want** — e.g. review stars, FAQ accordion, breadcrumbs, sitelinks, event listing.
- **The data** — the actual values (name, price, rating, dates, Q&As) — markup must match visible content.

## Output Format

### Schema markup: [type] for [page]

**Target rich result** — which Google rich result this enables, and the eligibility note (e.g. review snippets need real, visible reviews).

**Schema type** — the correct Schema.org type (and any nesting, e.g. `Product` → `AggregateRating` + `Offer`).

**JSON-LD** — ready to paste in a `<script type="application/ld+json">` block:
```json
{
  "@context": "https://schema.org",
  "@type": "...",
  "...": "..."
}
```
Use the real provided values; mark any placeholders clearly.

**Required vs. recommended fields** — what Google *requires* for the rich result vs. nice-to-have, so nothing essential is missing.

**Validation & guidelines** — test in Google's Rich Results Test + Schema validator; the key rules: markup must reflect **visible** page content, no fake/marked-up-but-hidden data, no review spam (no self-serving aggregate ratings without real reviews). Note anything that would disqualify it.

## Quality Checks

- [ ] The schema type matches the page content and the intended rich result
- [ ] The JSON-LD is valid (proper @context/@type, correct nesting) and uses real values
- [ ] All Google-required fields for that rich result are present
- [ ] Markup reflects content actually visible on the page — no hidden or fabricated data
- [ ] Validation steps and the relevant structured-data guidelines are noted

## Anti-Patterns

- [ ] Do not mark up content that isn't visible on the page — Google treats that as spam
- [ ] Do not fabricate ratings/reviews or self-apply AggregateRating without real reviews
- [ ] Do not omit required fields — the rich result simply won't trigger
- [ ] Do not use the wrong type (e.g. Product for an article) — it won't validate
- [ ] Do not ship without validating in the Rich Results Test

## Based On

Schema.org structured data + Google's structured-data guidelines for rich results (JSON-LD, required fields, content-match rules).
