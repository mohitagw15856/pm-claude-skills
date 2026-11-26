# Partner programme: organisations that check skills

[Expert reviews](EXPERT-REVIEW-PROGRAM.md) are individual professionals reading one skill. **Partner checks** are the organisation-level version: an advice service, legal-aid clinic, union, charity, public service or professional body that already helps people with what a skill covers, and has had someone read it for the people it serves.

What a partner gets, free:

- **A badge on each skill they checked:** "🤝 Checked by <organisation>, <month year>", linking to their page.
- **A page to send people to:** `partners.html?p=<id>` lists their checked skills, and each one runs free in the browser. It suits a waiting room poster, an email footer, or a "while you wait for your appointment" link.
- **Edits first.** Anything they find wrong is fixed before the check is listed.

What a partner gives: a person in the right role reads each skill end to end (about 20 minutes a skill) and confirms it is sound for their area, routes to proper help, and doesn't overpromise.

## How it works

1. The organisation opens a **[partner verification issue](https://github.com/mohitagw15856/pm-claude-skills/issues/new?template=partner-verification.yml)** listing the skills they checked and the role of whoever checked each.
2. A maintainer **confirms it really is the organisation**, by an email from its domain or a mention on its own website. No confirmation, no listing.
3. Requested edits are made and merged.
4. The maintainer adds the partner to [`config/partners.json`](../config/partners.json). `scripts/check-partners.mjs` checks it in `npm run check`: the skill exists, the date isn't in the future, the issue is linked, and the kind and website are valid.
5. At deploy, only checks less than 12 months old are published (`web/partners.json`); older ones drop off until renewed.

```json
{
  "id": "riverside-advice",
  "name": "Riverside Advice Centre",
  "kind": "advice-service",
  "url": "https://riverside.example.org",
  "region": "England and Wales",
  "issue": "https://github.com/mohitagw15856/pm-claude-skills/issues/123",
  "verified": [
    { "skill": "security-deposit-recovery", "date": "2026-10-16", "checked_by": "a housing caseworker" }
  ]
}
```

## Rules

- **Never list an organisation that did not take part.** Not as an example, a placeholder or a hope.
- A check is **not advice or a guarantee**. Skills keep their not-advice lines.
- Partners can withdraw at any time, and are removed the same day.
- No payment either way. A partner check can't be bought, and paid listings live separately in [expert skills](EXPERT-SKILLS.md).

## Who to approach first

Organisations that see the people these skills are for: Citizens Advice branches and law centres, tenants' unions, welfare-rights and debt-advice charities, refugee and settlement services, disability advocacy groups, disaster-recovery coalitions, trade unions. The [human review queue](HUMAN-REVIEW-QUEUE.md) lists the skills where a check matters most.
