# Sourcing Competitive Intelligence

A teardown is only as credible as its sources. This guide ranks where competitive facts come from, what each source is good for, and how to label confidence so the reader knows fact from inference.

## Source tiers

**Tier 1 — the competitor's own words (highest confidence)**
- Pricing page, docs, changelog/release notes, API reference — capabilities they *ship*, not just claim
- Job postings — roadmap leakage: hiring "Streaming Infrastructure Lead" says more than a press release
- Earnings calls / investor letters (public cos) — where they're told to say the strategy out loud
- Status pages and rate-limit docs — honest signals of scale and architecture

**Tier 2 — verified observation**
- A trial/demo account you actually drove — the only reliable source for *quality* judgements (a ✅ in a feature table says nothing about whether it's good)
- Screenshots/recordings from real usage, docs examples, template galleries
- Public compliance artifacts (SOC 2 listings, DPAs, subprocessor lists) — enterprise-readiness ground truth

**Tier 3 — third-party signal (directional, needs corroboration)**
- Review sites (G2, Capterra) — read the 2-3 star reviews; 5s and 1s are noise. Recurring complaints = durable weaknesses
- Community chatter (Reddit, HN, Discord) — great for "what users actually hit", biased toward the annoyed
- Traffic/hiring analytics tools, app-store rank — trend, not level
- Press coverage — treat as the competitor's messaging with a byline

**Tier 4 — hearsay (flag or drop)**
- "A customer told our sales rep…", analyst rumours, unattributed roadmap claims. Usable only as *questions to verify*, labelled as such.

## Per-section sourcing

| Teardown section | Source first | Beware |
|---|---|---|
| Feature table | Docs + trial account (Tiers 1-2) | Marketing pages claim features that are beta/enterprise-only — check the plan matrix |
| Messaging analysis | Homepage, pricing page, ad copy (Tier 1) | Analyse the *current* site; positioning changes quarterly — date your capture |
| Positioning map | Pricing structure + target-customer signals | Don't infer position from your own sales narrative |
| SWOT weaknesses/threats | 2-3★ reviews, community complaints, churn stories (Tier 3, corroborated) | One angry thread ≠ pattern; look for the same complaint across sources |
| Momentum / "watch" items | Job postings, changelog cadence, funding | Announcement ≠ shipped |

## Confidence labelling

Mark every substantive claim in the teardown with one of:
- **[verified]** — Tier 1-2, checked directly, dated
- **[reported]** — Tier 3, single-source; say the source
- **[assumed]** — inference or hearsay; say what would verify it

The feature table gets the same discipline: a cell may be `✅ [verified 2026-06]` or `🟡 [reported — G2 reviews]`. Undated competitive facts rot: anything older than ~2 quarters is a to-reverify item.

## Ethics line

Use only public and legitimately-accessed information: no misrepresenting identity to obtain demos, no soliciting confidential material from a competitor's customers or ex-employees under NDA, no scraping behind auth walls against terms. Beyond ethics, tainted intel is unusable in the deck it was destined for.
