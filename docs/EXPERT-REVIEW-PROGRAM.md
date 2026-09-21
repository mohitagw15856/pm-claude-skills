# Expert Review Program — "reviewed by a licensed professional"

The most valuable thing the library can add now isn't skill #1,175 — it's a **real lawyer, nurse, financial counselor, or social worker having read the skills where being wrong hurts someone.** This program recruits them, records their reviews, and surfaces a badge users can trust.

## What a review is

A domain expert reads a **high-stakes** skill (see [RISK-TIERS.md](RISK-TIERS.md)) end to end and confirms:
- the framework is sound and the not-advice boundary is honest;
- nothing in it would lead a person to a harmful action;
- it routes to the right kind of professional help;
- (for jurisdiction-flagged skills) the "verify locally" flags are in the right places.

They may request edits before signing off. The review is recorded in `config/human-review.json`:

```json
{ "skill": "debt-collector-scripts", "reviewer": "J. Doe", "credential": "AFC® financial counselor, US", "date": "2026-10-01", "notes": "Added statute-of-limitations caveat." }
```

`scripts/check-human-review.mjs` then counts it toward coverage; reviews expire after 12 months so the badge never goes stale.

## The badge

A reviewed skill can show **"✔ Reviewed by [credential], [month year]"** on its page and in the Playground, sourced from the registry — never hand-typed. Reviewers are credited by name/credential (or "a licensed X" if they prefer anonymity) on a Reviewers section of the README.

## Who to recruit, for which bundles

| Bundle(s) | Reviewer profile |
|---|---|
| pm-hardship, pm-banking, pm-scam-defense | Non-profit financial counselor (AFC/CFP), consumer-rights advocate |
| pm-legal, pm-decoders (lease/severance/contracts), pm-renters | Attorney or legal-aid paralegal |
| pm-caregiving, pm-aging-parents, pm-health, pm-invisible-illness | Nurse, social worker, care manager |
| pm-grief | Grief counselor / hospice social worker |
| pm-reentry | Reentry program case manager; lived experience |
| pm-newcomer | Immigration advisor, settlement-services worker |
| pm-accessibility | Disability-rights advocate |
| pm-emergency | Emergency-management professional |

## How to recruit (the honest pitch)

Reviewers volunteer or are modestly compensated (a sponsorship goal, honestly stated). The ask is small and bounded: **"Read 5 skills in your area, ~2 hours, tell us what's wrong."** Where to find them: professional associations' pro-bono lists, legal-aid clinics, non-profit credit-counseling orgs, hospice organisations, reentry non-profits — and the users of the skills themselves (a `roi-story` from a nurse is a recruiting lead).

**Template outreach:**
> I maintain an open-source library of AI "skills" — plain-language frameworks for things like [decoding a medical bill / responding to a debt collector]. They're used by tens of thousands of people, many in hard moments. I'm looking for a [credential] to read five of them (about two hours) and tell me where they're wrong or unsafe. You'd be credited, and it would make these materially safer for people who can't afford a professional. Would you be open to it?

## Guardrails

- A review **never** turns a skill into advice. The not-advice boundary stays; the review makes the *framework* sounder.
- **No invented reviews.** The registry must reflect real people who actually read the skill.
- Reviewers can decline to be named; the credential still shows.
- Reviewers for a bundle are natural **co-maintainers** for it (see `MAINTAINERS.md`).
