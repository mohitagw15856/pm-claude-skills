# Vendor requests, integrations & sponsorship — the policy

This library is **vendor-neutral**. It gets a steady stream of requests to add a specific company's product — as a provider, an integration, a "partner" skill, or a revenue-share arrangement. This page is the standing answer so each one doesn't get re-litigated.

## The rule in one line

**A skill may mention or offer a tool. It may never require one, forbid the alternatives, or profit from routing users to it.** Visibility is available only as clearly-disclosed, paid placement.

## What we accept

- **Neutral skills** that describe a workflow and work with whatever tool the user already has (naming several options is fine).
- **Open-source, optional dependencies** that are honestly disclosed, degrade gracefully if absent, and impose no license obligation on this repo (e.g. an MIT CLI the user installs separately). These are reviewed case-by-case and, if accepted, recorded in `config/vendor-neutrality-allow.json`.
- **Community listings** in `COMMUNITY-SKILLS.md` for skill repos maintained elsewhere.

## What we decline

- **Provider integrations** into the skills themselves (we're a markdown library, not an app with a provider layer).
- **Skills that mandate a named commercial product** — "do not use the platform APIs directly", "X is the execution layer", "instead of using X". A CI check (`scripts/check-vendor-neutrality.mjs`) now flags these automatically.
- **Revenue-share / affiliate / partner-program arrangements**, however well disclosed. They turn the library into an affiliate that profits when users spend with one vendor — a conflict with users' interests.
- **Undisclosed or back-door insertion** of a vendor after a sponsorship conversation fell through.

## What we offer instead

Clearly-disclosed **logo + link sponsorship** in the README Support section: placement only, never product integration or endorsement, and independent of any revenue share. I keep full editorial independence and may decline any sponsor whose product conflicts with users' interests. Contact is in the README.

## The canned reply (copy-paste)

> Thanks for the proposal. This library is deliberately vendor-neutral: we don't add skills or integrations that require a specific commercial product, and we don't enter revenue-share arrangements. A *neutral* version of this workflow — working with whatever tool the user already has — would be welcome. If [Vendor] would like visibility with the project's audience, we offer clearly-disclosed logo/link sponsorship (see the README Support section) — placement only, no integration or endorsement. Closing this, and thanks for the respectful approach.

## Decision log

| Ref | Vendor | Ask | Outcome |
|---|---|---|---|
| PR #242 | Atlas Cloud | Image provider in `thumbnail-creator` after a sponsorship talk fell through | Declined — vendor embed |
| Issue #248 | OrcaRouter | "Optional provider" + 5% revenue share | Declined — revenue share + no provider layer |
| PR #249 | BulkPublish | Skill mandating BulkPublish, forbidding direct APIs | Declined — mandated product (the CI check now catches this) |
| PR #257 | YYLO Ledger | Planning skill built on an MIT CLI | Reviewed — safe, MIT-clean; asked for a tool-agnostic version |

Add a row for each new request so the pattern stays visible.
