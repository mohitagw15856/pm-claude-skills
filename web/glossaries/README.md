# Glossary packs

A glossary makes any model use the **official terms** of a language and place, so the output says what a local office would say. "Fianza" is right for a tenancy deposit in Spain; in Mexico it's "depósito en garantía". When someone picks an output language in the playground and a glossary exists for it, its terms are added to the prompt.

**Add or improve one.** Native speakers welcome, no coding needed:

1. Copy `es.json` to `<code>.json` (ISO 639-1, for example `cy` for Welsh or `mi` for Māori).
2. Set `language` to the name used in the playground's language list (for example "Welsh"), and list the `regions` you cover.
3. Each term has `en` plus one field per region. Put alternatives in brackets.
4. Leave `status: draft` until another speaker checks it, then set `reviewed` and add yourselves to `maintainers`.

`node scripts/check-glossaries.mjs`, part of `npm run check`, validates the format. Keep entries to terms people actually meet in official letters, forms and offices.
