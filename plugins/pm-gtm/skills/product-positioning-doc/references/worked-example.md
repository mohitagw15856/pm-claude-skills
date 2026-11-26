# Worked Example — Product Positioning Doc Skill

## The brief

Clausebridge is a four-year-old legal-tech company ($6.2M ARR, 84 customers) selling contract review software to in-house legal teams at 200–2,000-employee companies — teams of one to eight lawyers drowning in NDAs, MSAs, and DPAs. The product encodes the team's own negotiation playbook, clears routine contracts automatically, and routes only true deviations to a lawyer. Positioning work was triggered by a Series B close and a sagging win rate: the website says "CLM companion," sales says "contract AI," and the CEO has said "your AI legal team" on two conference stages. Lost-deal interviews (14 in Q2 2026) show buyers either lumping Clausebridge in with CLM suites it can't out-checklist, or recoiling from replaces-your-lawyer framing. The newly hired PMM owns the doc; the CEO is attached to the big framing.

## The output

---

# Positioning Document: Clausebridge

**Version:** 1.0
**Owner:** Renata Okonkwo (PMM)
**Date:** 2026-07-10
**Status:** Draft — pending sign-off
**Approved by:** [Requires sign-off from CEO, VP Product, VP Marketing, VP Sales before any external use — the category decision in §2 supersedes prior stage language once approved]

---

## 1. Background & Context

Clausebridge closed its Series B in May 2026 and is scaling the sales team from 4 to 11 reps, but win rate fell from 31% to 22% over the last three quarters. Lost-deal analysis shows the problem is not product: it is that prospects cannot place us. We are evaluated against CLM suites on repository and e-signature checklists we deliberately don't build, or dismissed as an "AI lawyer" experiment that legal buyers don't trust. This document exists to pick one frame and arm every team with it before the new reps ramp.

**Positioning objective:** Move from being perceived as either a CLM also-ran or an AI novelty to being the default choice in contract review automation for small in-house legal teams.

---

## 2. Market Category

**What category does this product compete in?**

**Category:** Contract review automation

**Why this category, not "AI legal assistant" or "CLM"?**
The "AI legal team" framing has genuine long-term appeal and has tested well on stage as a *vision* statement — we recommend keeping it in keynote and fundraising language, where it belongs. As a *buying* category today it works against us: 12 of 14 lost-deal interviews surfaced trust objections to anything resembling replaces-your-lawyer claims, several GCs raised professional-responsibility concerns, and no budget line exists for it. CLM is the opposite problem — a mature category owned by suite vendors, where we would be scored on repository, workflow, and e-signature checklists we have chosen not to build. Contract review automation is the frame in which our strongest capability is the whole point of the category.

**Category maturity:**
- [ ] New category (we are creating it — high education burden, high upside if it works)
- [x] Growing category (fast-growing segment — compete on differentiation)
- [ ] Mature category (well-understood — must disrupt with clear superiority or narrower niche)

---

## 3. Target Customer

**Be precise. Vague targeting produces vague positioning.**

| Dimension | Description |
|---|---|
| **Primary buyer / decision-maker** | General Counsel or first legal hire at 200–2,000-employee companies |
| **Primary user** | Commercial counsel and legal ops (where they exist); sales ops as requesters |
| **Company profile** | B2B tech, logistics, and commerce companies; high inbound contract volume (40+ third-party-paper contracts/month); no dedicated legal ops function |
| **Business context** | Legal headcount growth is frozen or capped while sales headcount grows 30–50%/year; outside counsel overflow spend is under CFO scrutiny |
| **Trigger event** | Contract turnaround (>5 business days) has just been escalated by the CRO or named in a board meeting as a sales-cycle blocker |

**Who this is NOT for:**
Law firms; enterprises with 20+ lawyer teams and an entrenched CLM suite (their problem is workflow, not triage); regulated industries requiring on-prem deployment (not on the 12-month roadmap). Reps who chase these deals lose four months to security review and churn risk — the "not for" list is a qualification tool, not a modesty exercise.

---

## 4. Competitive Alternatives

What do buyers use today when they don't have Clausebridge?

| Alternative | Who uses it | Why buyers choose it | What they sacrifice |
|---|---|---|---|
| **Status quo — senior counsel reads everything** | Most of our ICP today | Zero procurement effort; trust in own judgment | GC time consumed by NDAs; 6.5-day median turnaround; burnout and attrition risk |
| **Outside counsel overflow** | Teams past breaking point | Quality assurance, liability comfort | $350–$600 per routine contract; no playbook consistency across firms |
| **VaultCLM's AI review add-on** (suite incumbent) | Companies already on the suite | One vendor, one invoice; procurement path exists | Generic risk flags not tied to the team's own positions; add-on priced per seat across sales |
| **General-purpose AI chat + copy-paste** | Solo GCs, cost-pressed teams | Free-ish, instantly available | No playbook memory, no audit trail, confidentiality exposure; every review starts from zero |
| **Build in-house on an LLM API** | Companies with strong data teams | Custom to their paper | 9–12 month timeline; legal team becomes a product owner it never wanted to be |

**Key insight:** Every alternative either applies *generic* judgment at scale (suite AI, chat) or *your* judgment without scale (GC, outside counsel). Positioning must own the intersection: your playbook, applied to every contract, with lawyers touching only what deviates.

---

## 5. Unique Differentiated Attributes

| Attribute | What it is | What it enables (outcome) | Why competitors can't match it |
|---|---|---|---|
| **Playbook-native review** | Encodes the team's own fallback positions per clause type, not a generic risk model | Reviews reflect how *this* team negotiates; new counsel inherit institutional judgment on day one | Suite add-ons train for breadth across all customers; chat tools have no persistent positions |
| **Deviation-only routing** | Contracts matching playbook positions clear automatically; only non-standard clauses reach a human | 71% of routine contracts close with zero lawyer touches (Ferrowave, 500-person industrial IoT customer) | Requires the playbook layer to exist; flag-everything models push *more* work to lawyers, not less |
| **Accepted-fallback audit trail** | Every clause decision — auto-cleared or human-approved — is logged against the playbook version | GC can defend any past position to auditors, acquirers, or the board in minutes | Suites log workflow steps, not negotiation rationale; chat tools log nothing |

**The core differentiation thesis:**
Clausebridge is the only product where the unit of automation is *the team's own negotiation judgment*, not a generic risk score — which is why it removes lawyer work instead of re-routing it.

---

## 6. Value Proof Points

| Claim | Proof point | Source |
|---|---|---|
| Fast turnaround | Median NDA turnaround fell from 6.5 days to 9 hours | Aggregate telemetry across 84 customers, Q2 2026 |
| Lawyers only touch deviations | 71% of routine contracts closed with zero lawyer touches | Ferrowave case study (published, approved 2026-04) |
| Cuts overflow spend | Outside counsel overflow spend down 38% in first contract year | Kestrel Freight case study (published, approved 2026-02) |
| Users like it | 4.7/5 across 61 G2 reviews; ease-of-setup most-cited theme | G2, pulled 2026-07-01 |

**Proof gaps:** We have no defensible data yet on *negotiation outcomes* (e.g. concession rates vs. manual review) — do not let sales claim "better deals" until the Q4 outcomes study lands. We also lack a named customer in logistics, our fastest-growing segment; treat as a customer-marketing priority, not a positioning claim.

---

## 7. Positioning Statement

> **For** GCs and first legal hires at 200–2,000-person companies
> **who** have just had contract turnaround escalated as a sales-cycle blocker,
> **Clausebridge** is a **contract review automation platform**
> **that** clears routine contracts against your own playbook in minutes and routes only true deviations to a lawyer.
> **Unlike** CLM suites' generic AI risk flags or ad-hoc AI chat,
> **Clausebridge** encodes *your* negotiation positions and keeps an audit trail of every accepted fallback.

The single claim this product is accountable to: **only deviations reach a lawyer.** Every message below must survive tracing back to it.

---

## 8. Messaging Hierarchy

### Tagline (5–8 words)

Options to test:
1. "Your playbook, applied to every contract"
2. "Contract review that keeps deals moving"
3. "Lawyers for the exceptions, not the routine"

### Value Proposition (1–2 sentences)

> Clausebridge reviews every inbound contract against your own playbook and clears the routine ones automatically — so your lawyers only see the 20% that genuinely needs them. Median NDA turnaround across our customers: 9 hours, down from 6.5 days.

### Full Description (3–5 sentences)

> Clausebridge is the contract review automation platform for small in-house legal teams. Unlike CLM suites that flag generic risks or AI chat tools that start every review from zero, Clausebridge encodes your team's own negotiation positions, clears contracts that match them, and routes only true deviations to a lawyer — with an audit trail of every accepted fallback. 84 legal teams use Clausebridge to keep deals moving without growing headcount. Median time from upload to first-pass review: 4 minutes.

---

## 9. Persona-Specific Messaging

| Persona | Their primary concern | Lead message | Proof point to use |
|---|---|---|---|
| **GC / Head of Legal** | Team capacity, professional defensibility | "Your judgment, applied at scale — with a record you can defend" | Accepted-fallback audit trail; 4.7/5 G2 |
| **CRO / VP Sales** | Deal velocity | "Contracts stop being the slowest part of your pipeline" | 6.5 days → 9 hours median NDA turnaround |
| **CFO** | Outside counsel spend, headcount requests | "Absorb 40% more contract volume without a hire" | Kestrel Freight: overflow spend −38% |
| **Commercial counsel (user)** | Fear of being automated out; drudgery | "Spend your week on the 20% that actually needs a lawyer" | 71% zero-touch routine contracts (Ferrowave) |

---

## 10. Messaging Do's and Don'ts

**Do say:**
- "Only deviations reach a lawyer" — the accountable claim, in the buyer's language
- "Your playbook / your positions / your fallbacks" — possessive framing is the differentiator
- Sourced numbers: 9 hours, 71%, −38% (each traces to §6)

**Don't say:**
- "AI lawyer," "replaces legal review," "your AI legal team" — trust-killer in 12 of 14 lost deals; vision-stage language only, never product marketing
- "CLM" in any self-description — it invites the checklist we lose
- "Better negotiation outcomes" — proof gap until the Q4 study (§6)
- "Cutting-edge AI" — every alternative says it; it differentiates nothing

---

## 11. Distribution Plan

| Team | What they need | Format | Owner | When |
|---|---|---|---|---|
| Marketing | Tagline test plan, new homepage hero, category page | This doc + messaging playbook | Renata Okonkwo | 2026-07-24 |
| Sales | Competitive one-pagers (VaultCLM, status quo, chat), objection guide for "why not the suite?" | One-pager + deck | Sales enablement (D. Brack) | 2026-07-31 |
| Product | Category definition + "not for" list as roadmap guardrails | Shared doc + roadmap review | Renata + VP Product | 2026-08-07 |
| Leadership | Full narrative incl. §2 vision-vs-category split, for stage and investor use | This doc + CEO talk-track memo | Renata + CEO | 2026-07-21 |

---

## Why it's shaped this way

- **The category section does the political work in the open.** The CEO's "AI legal team" framing isn't attacked — it's promoted to *vision language* and given a home (keynotes, fundraising) while the buying category is decided on lost-deal evidence. This resolves the "mix category design with category entry" anti-pattern without requiring anyone to lose face, and the distribution plan's CEO talk-track memo makes the handshake operational.
- **The positioning statement is accountable to exactly one claim** — "only deviations reach a lawyer" — and §8–§9 visibly trace back to it, per the Quality Check that the product carries one primary differentiated claim, not a bundle.
- **Competitive alternatives include the status quo, outside counsel, chat, and build-in-house** — not just VaultCLM — because the Quality Checks require the status quo and most of the ICP today buys *nothing*. The key insight line ("generic judgment at scale vs. your judgment without scale") is what makes the differentiation thesis non-generic.
- **Every proof point cites a source with a date**, and the Proof Gaps paragraph explicitly bans sales from the "better deals" claim until the Q4 study — per the anti-pattern against proof points that are claims without evidence. A positioning doc that hides its weakest claim gets discovered in a demo.
- **Each persona gets a different headline in the buyer's vocabulary** — including the commercial counsel's fear of being automated out, which is the deal-killer nobody puts in slides. Same-headline-for-everyone is a named anti-pattern; the user persona row is where positioning docs usually go dishonest.
- **The "not for" section names the deals reps actually chase and lose** (suite-entrenched enterprises, on-prem regulated) and frames exclusion as qualification, per the Quality Check — vague targeting was the original disease here.
- **Attributes are written as outcomes with a "why competitors can't match it" column** ("new counsel inherit institutional judgment on day one"), not feature names — the Quality Check demands outcomes, and the third column is what keeps the doc from describing any competitor.
