---
name: "Build a translation/terminology glossary so a product's key "
description: "Build a translation/terminology glossary so a product's key terms render consistently everywhere. Use when asked to create a glossary, a termbase, a do-not-translate list, or to keep terminology consistent across translators/locales. Produces a glossary — each source term with its approved translation per locale, part of speech, definition/context, and do-not-translate flags — ready for a CAT tool or style guide."
---

# Glossary Builder Skill

Inconsistent terminology is the most visible localization failure — when "dashboard" is translated three
ways across one product, it looks amateur and confuses users. A glossary (termbase) fixes the key terms
*once*, so every translator and every locale uses the approved rendering. This skill builds it: extract
the terms that matter, define them in context, and set the approved translation (or do-not-translate flag).

## Required Inputs

Ask for these only if they aren't already provided:

- **The source material / domain** — product UI, docs, or a term list; and the field (so definitions are right).
- **Target locale(s)** — which languages need approved translations.
- **Existing decisions** — any brand terms, product names, or prior translations to lock in.
- **Do-not-translate candidates** — brand/product names, trademarks, code/API terms.

## Output Format

### Glossary: [product/domain]

A termbase table — one row per term:

| Source term | Part of speech | Definition / context | Do-not-translate? | [Locale 1] | [Locale 2] |
|---|---|---|---|---|---|
| Dashboard | noun | the main metrics screen | no | 仪表板 | Tableau de bord |
| Acme Cloud | proper noun | product name | **yes (keep verbatim)** | Acme Cloud | Acme Cloud |
| sync (verb) | verb | to reconcile data both ways | no | 同步 | synchroniser |

**Guidance included:**
- **Definitions/context** — so a translator knows *which* meaning (e.g. "ticket" = support case, not event admission), preventing the classic wrong-sense error.
- **Do-not-translate list** — brand/product names, trademarks, code identifiers, UI elements that must stay in English.
- **Part of speech / forms** — flag terms where the form matters (verb vs. noun "filter").
- **Consistency notes** — preferred vs. avoided synonyms in the source itself ("use 'sign in', not 'log in'").

**Output note:** structured for import into a CAT tool (Trados/memoQ/Crowdin) or to sit in the localization style guide. Mark any translation that needs native review as *(draft — confirm)*.

## Quality Checks

- [ ] Each term has a definition/context so translators pick the right sense
- [ ] Do-not-translate terms (brand, product, code) are clearly flagged
- [ ] An approved translation is given per target locale (or marked draft for review)
- [ ] Part of speech / ambiguous forms are disambiguated
- [ ] Source-side consistency (preferred synonyms) is noted
- [ ] Structured for a CAT tool / style-guide import

## Anti-Patterns

- [ ] Do not list terms without context — "ticket" or "filter" with no definition guarantees wrong-sense translations
- [ ] Do not omit the do-not-translate flags — that's how brand/product names get mangled across locales
- [ ] Do not present machine translations as approved — mark them draft for native review
- [ ] Do not ignore source consistency — if the source mixes "sign in/log in," the glossary should pick one
- [ ] Do not forget part of speech — a term that's both noun and verb often needs two entries

## Based On

Terminology-management practice — termbases, do-not-translate lists, context definitions, CAT-tool glossary structure.
