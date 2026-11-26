# RFC-0003: Paid community packs with author revenue share

- **Status:** accepted for single skills (2026-10-16): the schema, CI checks, listing page and expert guide shipped (docs/EXPERT-SKILLS.md). Paid packs and the revenue share wait on the pilot.
- **Affects:** schema | process | distribution

## Summary

Let community authors publish **paid packs** — curated bundles of their own skills —
through the existing registry, with the author keeping the majority of revenue. The
registry stays sha-pinned and structurally validated; payment gates *delivery*, never
*listing*. This turns the registry's contributors into stakeholders, which is the only
way the community library outgrows what one maintainer can author.

## Motivation

The registry ([community/](../../community/README.md)) gives authors distribution but no
income; the project's own monetization (sponsors, subscriptions) doesn't flow to them.
Meanwhile the highest-value vertical packs (say, a practicing attorney's contract
playbooks) won't be published free. Every comparable ecosystem (VS Code was the
counterexample until it wasn't; npm, Raycast, GPT Store) converged on paid third-party
listings once free supply plateaued.

## The change

**Registry schema** — a paid entry extends the existing shape:

```json
{
  "name": "yourhandle/contract-playbooks-pro",
  "kind": "pack",
  "description": "…",
  "repo": "https://github.com/yourhandle/contract-playbooks",
  "paid": {
    "price": "19.00",
    "currency": "USD",
    "checkout": "https://polar.sh/yourhandle/contract-playbooks",
    "preview": "skills/contract-redline-basic/SKILL.md"
  },
  "sha256": "…"
}
```

- The repo may be **private**; what CI validates for paid entries is the `preview`
  skill (public, free, SkillSpec-conformant) plus the pack manifest — the paid content
  itself is validated at first delivery by checksum.
- `checkout` must be a Polar or GitHub Sponsors listing (both handle VAT/merchant-of-
  record duties; this project never touches card data or holds funds).
- Delivery: on purchase, Polar grants the buyer access to the author's private repo
  (Polar's GitHub-repo benefit) — the pm-skills CLI then installs with the buyer's own
  git credentials: `npx pm-claude-skills add yourhandle/contract-playbooks-pro`.

**Revenue split:** author 85% / project 15% (via Polar's revenue-share on the listing),
the project share funding registry CI, security re-scans, and the free tier. The split
is a listing default, not a lock-in — authors can list elsewhere simultaneously.

**Trust rules (unchanged in spirit):**

- Paid entries carry `community: true` *and* `paid: true` in every API/UI surface.
- The security-pattern scan runs on the preview at PR time and on the full pack at
  first delivery; a failed scan delists the pack until fixed.
- Refund policy is Polar's standard one; the registry README links it.
- No paid entry may shadow a curated skill's name.

## What breaks

Nothing for free entries — `paid` is additive and optional. Consumers of
`/v1/community` see new fields; clients that ignore unknown keys are unaffected.

## Adoption path

1. Comment window on this RFC.
2. One pilot pack from a hand-picked author (private repo + Polar checkout, manual
   wiring) to shake out delivery before any schema merge.
3. Schema + registry-check CI update; docs in `community/README.md`.
4. Open listings.

## Owner actions

Create the Polar organization, set the revenue-share terms there, and recruit the
pilot author. None of the code in this repo needs to change until step 3.
