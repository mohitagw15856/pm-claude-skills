---
name: "Plan the localization of a product/content for a new market "
description: "Plan the localization of a product/content for a new market — beyond translating the words. Use when asked to localize a product, plan market entry localization, prepare a localization brief, or figure out what to adapt for a new region. Produces a brief — target locales, what to translate vs. adapt vs. rebuild (UI, content, formats, imagery, payments, legal), priorities, and the risks/cultural pitfalls."
---

# Localization Brief Skill

Localization is not translation — it's making a product *feel native* in a market, which touches formats,
imagery, payment methods, legal norms, and cultural expectations far beyond the strings. This skill plans
it: what to translate, what to adapt, what to rebuild for the locale, in priority order, with the cultural
and regulatory pitfalls that sink naïve "just translate the UI" launches.

## Required Inputs

Ask for these only if they aren't already provided:

- **The product/content** and the **target locale(s)** (language + region — fr-FR vs fr-CA matters).
- **What it is** — SaaS UI, marketing site, app, docs, campaign — sets what needs adapting.
- **Goal & depth** — testing a market (light) vs. full local presence (deep).
- **Known constraints** — budget, what's already internationalized (i18n-ready or not).

## Output Format

### Localization Brief: [product] → [locale(s)]

**1. Scope per locale** — language + region, and the depth (translate-only vs. full localization).

**2. Translate / Adapt / Rebuild** — the core matrix; what each element needs:

| Area | Action | Notes |
|---|---|---|
| UI strings | translate | register, length expansion (DE ~+30%) |
| Dates/numbers/currency | adapt | formats, separators, currency + display |
| Imagery / examples | adapt | culturally appropriate people, scenarios, names |
| Payments | rebuild | local methods (e.g. Alipay/WeChat in CN, iDEAL in NL) |
| Legal / privacy | adapt | local consent, terms, data residency |
| Content / SEO | adapt | local keywords, not translated ones |
| Tone / formality | adapt | formality norms, humour that travels |

**3. Priorities** — what to do first for the goal (often: UI + payments + legal for a real launch; UI + a landing page for a market test). Sequence by impact.

**4. Cultural & regulatory pitfalls** — the specific traps for this market: colour/symbol connotations, name/address/phone formats, RTL if relevant, regulated claims, censorship/hosting requirements. The stuff that embarrasses or blocks a launch.

**5. Process & QA** — who translates (native + in-market review), how strings are managed (don't hard-code), and pseudo-localization / in-context QA before launch.

## Quality Checks

- [ ] Distinguishes translate vs. adapt vs. rebuild per element — not "translate everything"
- [ ] Covers formats, imagery, payments, legal, and SEO — not just UI strings
- [ ] Region (not just language) is specified where it changes things
- [ ] Priorities are sequenced to the goal (market test vs. full launch)
- [ ] Names the specific cultural/regulatory pitfalls for this market
- [ ] Includes native + in-market review in the QA plan

## Anti-Patterns

- [ ] Do not equate localization with translation — payments, legal, formats, and imagery decide whether it feels native
- [ ] Do not ignore region — fr-FR ≠ fr-CA, es-ES ≠ es-MX; the variant changes copy, formats, and norms
- [ ] Do not localize SEO by translating keywords — research how locals actually search
- [ ] Do not skip local payment methods — the best-localized UI converts nothing if they can't pay how they pay
- [ ] Do not launch without in-market native review — machine/relay translation misses the embarrassing stuff

## Based On

Localization / internationalization practice — the translate/adapt/rebuild model, locale formats, market-specific payments & legal, in-country QA.
