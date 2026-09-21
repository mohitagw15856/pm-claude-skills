# Trust · Depth · Reach · Governance — the third 20

Breadth is solved (1,174 skills, 131 bundles). This wave is about what matters *at* that scale: **trust** where being wrong hurts, **depth** where "neutral" isn't enough, **reach** to people who don't use GitHub, and **governance** for a repo that now gets steady external PRs. Everything is additive; nothing touches an existing skill.

Legend: ✅ built · 🟡 built as mechanism/asset, needs a human step · 🧑 human-only (asset ready) · ♻️ already existed — kept the repo's version

## A. Trust & depth
| # | Move | Status | What landed |
|---|---|---|---|
| 1 | Expert-verified badge program | 🟡 | `config/human-review.json` registry (starts empty on purpose) + `docs/EXPERT-REVIEW-PROGRAM.md` (who to recruit per bundle, the pitch, the badge). Recruiting is the human step. |
| 2 | Jurisdiction variants | ✅ | `docs/JURISDICTION-VARIANTS.md` (overlay convention `variants/<skill>/<code>.md`) + real **US** and **UK** overlays for `security-deposit-recovery`. Priority list of the next 9 skills inside. |
| 3 | Structured risk tier per skill | ✅ | `config/risk-tiers.json` + `scripts/check-risk-tiers.mjs` → `data/risk-tiers.json`. **143 high-stakes · 185 consequential · 846 informational.** Validates names; fails on typos. |
| 4 | Last-human-reviewed + SLA | ✅ | `scripts/check-human-review.mjs` — coverage of high-stakes skills (**0/143 today, honestly**), 12-month expiry, `--strict` for CI once real. `docs/RISK-TIERS.md`. |

## B. Reach non-technical people
| # | Move | Status | What landed |
|---|---|---|---|
| 5 | Packs as GPT Store GPTs / Gemini Gems | 🧑 | `integrations/custom-gpt/packs/` — publish guide + 4 ready-to-paste pack configs (New Parent, Just Laid Off, Money in Crisis, Losing Someone) with hard not-advice boundaries. |
| 6 | Live public WhatsApp/Telegram bot | 🧑 | `docs/PUBLIC-BOT-RUNBOOK.md` — architecture, menus-from-packs, crisis routing, no-PII, launch checklist. |
| 7 | Browser extension: contextual discovery | ✅ | The extension already exists; added `extension/context-rules.json` (10 page→skill rules, validated) + `CONTEXTUAL-DISCOVERY.md` (wiring, privacy: all local, never on auth/banking). |
| 8 | Printable one-pager PDFs | ✅ | `scripts/build-print-pdf.mjs` (own markdown→HTML, Playwright→PDF, no deps) + `print/` PDFs for the grief checklist, go-bag, money triage. |
| 9 | i18n: Hindi, Portuguese, Arabic | 🟡 | `skills-i18n/{hi,pt,ar}/README.md` — scaffolds with the pack index drafted in each language + contributor guide. Marked *needs native review*; skill bodies deliberately not machine-translated (see #1). |
| 10 | Plain-language output style | ✅ | `output-styles/plain-language.md` (+ README row). |

## C. Journeys, not just skills
| # | Move | Status | What landed |
|---|---|---|---|
| 11 | Skill chains as runnable journeys | ✅ | `journeys/*.json` ×5 (laid-off, money-in-crisis, losing-someone, new-parent, hands-free-caregiver — **24 steps, every skill verified to exist**) + `JOURNEYS.md` + `scripts/journey-to-session.mjs` (`--check`, render, `--all`). |
| 12 | Run a pack as one session | ✅ | `journeys/SESSION-MODE.md` — the contract, state, UX rules, minimal Playground wiring. The session plan the script emits is what the UI consumes. |
| 13 | Example output as a field in every skill | 🟡 | `scripts/check-example-coverage.mjs` (**2/1174 today**) + `docs/EXAMPLE-OUTPUT-FIELD.md` (the field, the incremental rollout, `--min` ratchet). Back-filling is the human/contributor step. |

## D. Governance
| # | Move | Status | What landed |
|---|---|---|---|
| 14 | CI rule catching vendor-mandating skills | ✅ | `scripts/check-vendor-neutrality.mjs` — catches all three tells from PR #249, **0 false positives across 1,174 skills** (self-tested). `config/vendor-neutrality-allow.json` for reviewed exceptions. |
| 15 | Public vendor/sponsorship policy | ✅ | `docs/vendor-requests.md` — the rule, accept/decline lists, canned reply, decision log (#242/#248/#249/#257). |
| 16 | Co-maintainers + CODEOWNERS | 🟡 | `.github/CODEOWNERS` (default + per-bundle pattern) + `MAINTAINERS.md` (the program, who to recruit). Recruiting is the human step. |
| 17 | Public roadmap from the gap-miner | ✅ | `scripts/gaps-to-roadmap.mjs` → `ROADMAP-REQUESTS.md` (demand-ranked, covered-vs-open, ready issue bodies) — the demand-driven companion to the hand-written `ROADMAP.md`, which is untouched. Miner's current 10 asks are all covered; open rows appear as it finds gaps. |

## E. Product depth
| # | Move | Status | What landed |
|---|---|---|---|
| 18 | Offline / air-gapped bundle | ✅ | `scripts/build-offline-bundle.mjs` → `dist/pm-skills-offline-<v>.tar.gz` (27.9 MB; `tar` via arg array, no shell) + `OFFLINE-README.md` (local-model how-to). `dist/` gitignored. |
| 19 | Deprecation & retirement policy | ♻️ | **Already existed and is better than what I'd have added** — `docs/DEPRECATION.md` uses `deprecated:`/`supersededBy:` frontmatter. I drafted a config-registry version, saw the conflict, and removed mine. No change. |
| 20 | Hands-free voice pack | ✅ | `output-styles/hands-free-voice.md` (+ README row) + the `hands-free-caregiver` journey (`"voice": true`). |

## Wire into CI (one line each, when ready)
```
node scripts/check-vendor-neutrality.mjs      # hard gate now — 0 FPs
node scripts/check-risk-tiers.mjs             # hard gate now — validates names
node scripts/journey-to-session.mjs --check   # hard gate now — skills exist
node scripts/check-human-review.mjs           # report only until coverage is real, then --strict
node scripts/check-example-coverage.mjs       # report only; ratchet with --min later
```

## The three human steps that unlock the rest
1. **Recruit 3–5 expert reviewers** (`docs/EXPERT-REVIEW-PROGRAM.md`) — turns the 0/143 into a badge no competitor has.
2. **Publish two packs to the GPT Store** (`integrations/custom-gpt/packs/`) — the fastest route to non-technical reach.
3. **Turn on the vendor-neutrality gate in CI** — ends the recurring drain impartially.
