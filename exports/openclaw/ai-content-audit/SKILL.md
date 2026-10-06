---
name: ai-content-audit
description: "Audit a content library, docs site, or blog for AI-generated filler that's eroding trust and search performance — and triage what to fix, rewrite, or delete. Use when asked to find slop in a content library, audit AI-written content quality, explain why content engagement or rankings dropped after scaling with AI, or set a quality bar for AI-assisted publishing. Produces an audited inventory with per-piece verdicts, the detection signals used, a triage plan, and a publishing quality gate that prevents recurrence. For a single article's AI-citability use aeo-optimizer; for the strategy itself use content-calendar or seo-content-brief."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/ai-content-audit.html
metadata:
  {
    "openclaw": { "emoji": "🤖" }
  }
---

# AI Content Audit Skill

Teams that scaled content with AI are discovering the bill: libraries full of fluent, structurally identical, information-free pieces that readers bounce off, search engines quietly demote, and — worst — that erode the trust the *good* content earned. This skill audits the library for slop with named signals, triages it, and installs the gate that stops the refill.

## What This Skill Produces

- An **audited inventory** with per-piece verdicts: keep / enrich / rewrite / delete-and-redirect
- The **detection signals** found, quoted — so verdicts are checkable, not vibes
- A **triage plan** sequenced by traffic and trust impact
- A **publishing quality gate** for AI-assisted content going forward

## Required Inputs

Ask for (if not already provided):
- **The corpus** — pieces or URLs to audit (or a sample; state the sampling), with publish dates
- **Performance data if available** — traffic, engagement, rankings over time (the audit works without it, but verdicts get sharper)
- **What the content is *for*** — SEO, docs, thought leadership, support deflection (the quality bar differs)
- **Production context** — when AI-assisted publishing started, at what volume (the before/after seam is diagnostic gold)

## Detection Method

Slop isn't "AI wrote it" — it's *content with nothing inside*. Audit each piece for the signals, quoting instances:

1. **Information density** — the core test: delete every sentence that any competitor could have written, and measure what's left. Slop survives at <20%. Look for: zero proprietary data, zero named examples, zero opinions with an owner, zero specifics a reader could act on.
2. **Structural monoculture** — the same skeleton repeating across pieces (intro-restating-the-title → 5 H2s → "in conclusion"); listicles whose items are definitions, not judgments; FAQ sections answering questions nobody asked.
3. **Hedged voicelessness** — "it's important to note", "in today's fast-paced world", both-sides-ism on questions the brand should have a stance on; the absence of anything a lawyer would ever have flagged.
4. **Fluency without grounding** — claims with no source, stats with no year, "studies show" with no study; internally contradictory sections (the tell of stitched generations).
5. **Reader evidence, where data exists** — engagement collapse relative to the library's pre-AI baseline, rising pogo-sticking, ranking decay cohort-matched to the AI-volume era. Correlate verdicts with the seam from the production context.

**Verdicts:** **Keep** (dense, differentiated — AI-assisted or not; the audit is provenance-blind on keepers) · **Enrich** (sound skeleton, hollow middle — inject data, examples, stance) · **Rewrite** (topic worth owning, execution beyond saving) · **Delete & redirect** (nothing inside, no traffic worth saving — thin pages drag the domain).

## The Quality Gate (prevention)

For AI-assisted publishing going forward, every piece passes before shipping:
- **The density test** — a named reviewer deletes the anywhere-sentences; ≥50% must survive
- **One of three** must be present: proprietary data/experience · a named example with specifics · a defensible stance someone could disagree with
- **Claims carry sources**; stats carry years
- **The read-aloud test** — one paragraph aloud; if it sounds like nobody, it ships under nobody's name and that's the problem
The gate is a checklist with an owner, not a sentiment.

## Output Format

### AI Content Audit: [property] — [n] pieces ([sampling noted])

**Headline:** [keep/enrich/rewrite/delete counts + the one-line diagnosis]

**The seam:** [what changed at the AI-volume transition, if data allows — cohort chart described]

| Piece | Traffic | Signals found (quoted) | Verdict |
|---|---|---|---|

**Triage plan:** [sequence: high-traffic enrichables first → deletions batched with redirects → rewrites scheduled; owner + dates]

**The quality gate:** [the checklist above, adapted to this org, with its named owner]

## Quality Checks

- [ ] Every non-keep verdict quotes at least one concrete signal from the piece
- [ ] The audit is provenance-blind on keepers — good AI-assisted content is not penalised for its origin
- [ ] Deletions come with redirect targets, not just removal
- [ ] The triage is sequenced by traffic × trust impact, not by ease
- [ ] The gate has an owner and a pass bar, not aspirations

## Anti-Patterns

- [ ] Do not use "AI-detector" scores as evidence — they misfire both ways; the signals are about emptiness, not origin
- [ ] Do not delete by publish-date cohort — some AI-era pieces are good and some human classics are slop
- [ ] Do not enrich everything — a piece with no reason to exist gets deleted, not decorated
- [ ] Do not install the gate without an owner — a checklist nobody signs is the slop pipeline with extra steps
- [ ] Do not frame the report as anti-AI — the finding is a *quality* failure that AI made cheap to commit at scale

## Example Trigger Phrases

- "Find slop in a content library."
- "Audit AI-written content quality."
- "Explain why content engagement."
- "Set a quality bar for AI-assisted publishing."
