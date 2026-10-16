# Jurisdiction overlays

A skill says how to do the work; an overlay says what is different **where you are**: the laws, deadlines, agencies and forms of one country or state. The playground asks "Where are you?" and, when a skill has an overlay for that place, adds it to the skill when it runs, and says so on screen.

```
overlays/<skill-name>/<code>.md     code: ISO country (GB, IN) or country-region (US-CA, GB-SCT)
```

Each file has frontmatter and one section:

```markdown
---
skill: security-deposit-recovery
place: England
code: GB-ENG
status: draft            # draft (needs a local reviewer) | reviewed
checked: 2026-10-16      # when the facts were last checked against the sources
maintainers: []          # GitHub handles of local reviewers
sources:
  - https://www.gov.uk/tenancy-deposit-protection
---

## In England
- Facts that change the advice here, each traceable to a source above.
```

**Rules:**
- **Every fact needs a source.** `node scripts/build-overlays.mjs --check`, part of `npm run check`, rejects an overlay with no sources.
- **Keep it to what differs.** The base skill already covers the method.
- **Reviews.** Overlays start as `draft`. Someone who lives and works there checks them, adds themselves to `maintainers` and sets `status: reviewed`.
- **Expiry.** Facts older than a year are flagged as stale.

Adding your country is one of the most useful contributions available: copy an existing overlay and change the place, facts and sources.
