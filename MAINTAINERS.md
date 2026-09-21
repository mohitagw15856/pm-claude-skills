# Maintainers & the co-maintainer program

The library is past the point where one person can review everything well. This is the program for bringing in trusted co-maintainers who own the bundles they know — raising review throughput, credibility, and the bus factor.

## Current maintainers

| Role | Who | Owns |
|---|---|---|
| Maintainer | [@mohitagw15856](https://github.com/mohitagw15856) | Everything; spec, tooling, releases, sponsorship |

## The co-maintainer role

A co-maintainer **owns one or more bundles**: they review PRs touching those skills (via `.github/CODEOWNERS`), triage skill requests in their area, and keep their bundles current. They don't need commit rights to `scripts/`, the spec, or releases — those stay with the maintainer.

**What they get:** listed here and in the README, review authority in their area, and a say in what gets built there.
**What they commit to:** a review within ~a week on PRs in their bundles, and honesty about when they can't.

## Who we're looking for (in priority order)

1. **Domain-expert reviewers for high-stakes bundles** — a lawyer for the legal decoders, a consumer-finance counselor for `pm-hardship`, a nurse/social worker for `pm-caregiving` and `pm-grief`, an immigration advisor for `pm-newcomer`. These double as the expert-verification program (`docs/EXPERT-REVIEW-PROGRAM.md`).
2. **Practitioners for the profession bundles** — a working PM for `pm-essentials`, an engineer for `pm-engineering`, etc.
3. **A localisation lead** for `skills-i18n/`.

## How to become one

Contribute first. Two or three merged, quality PRs (or reviews) in a bundle is the signal. Then open a Discussion titled *"Co-maintainer: <bundle>"* saying what you'd own and why. The maintainer adds you to `CODEOWNERS` for that bundle and to the table above.

## Principles all maintainers hold to

- **Vendor-neutral** — see `docs/vendor-requests.md`. No mandated products, no revenue share.
- **Not advice** — high-stakes skills route to real professionals; we never let a skill pretend to be a lawyer, doctor, or financial advisor.
- **Quality over count** — `skillcheck`, `skill-audit`, and the eval ratchet stay green; a skill that can't pass doesn't merge.
- **Users' interests first** — we decline anything (sponsor, integration, skill) that would work against the people using the library.

## Stepping back

Life happens. A co-maintainer can step back any time by saying so in a Discussion; their bundles revert to the maintainer, no drama.
