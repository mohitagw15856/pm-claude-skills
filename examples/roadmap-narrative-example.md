# Example: roadmap-narrative

## What this skill does

Turns a prioritised initiative list into a strategic roadmap story for non-technical stakeholders: strategic context, themed arcs with rationale and metrics, an executive summary, and what is deliberately not on the roadmap.

## How to trigger it

### Example 1: an exec-shareable roadmap story

**You say:**
> "Roadmap narrative for H1. Items: SSO, onboarding templates, mobile approvals, audit log, usage analytics. Company goal: win mid-market, NRR to 110%. Audience: the board update."

**Claude produces (excerpt):**

### Product Roadmap: H1
**Strategic Context:** Mid-market buyers now evaluate us in security reviews we used to be excluded from. H1 removes the two reasons we lose those reviews, then deepens the reasons customers expand. Everything below serves one line: win mid-market and lift NRR to 110%.

#### Theme 1: Pass the security review
- Strategic rationale: SSO and the audit log are the two most-cited blockers in lost mid-market deals (9 of 14 last quarter)
- Initiatives: SSO, audit log
- Primary metric: mid-market win rate
- Dependencies: identity-provider certification ([month])

#### Theme 2: Expand inside the account
- Rationale: accounts using approvals on mobile renew at [X]% higher
- Initiatives: mobile approvals, usage analytics

**What's Not on the Roadmap (and Why):**
- AI assistant features: demand is loud but unqualified in our segment; one discovery spike in Q2 instead of a build
- Self-host option: two asks, both pre-revenue; revisit if a qualified deal requires it

**Executive Summary (shareable):** In H1 we remove the two blockers that cost us 9 of 14 mid-market losses, then deepen expansion in the accounts we win. We are deliberately not building AI features yet; demand exists but not in our buying segment.

### Example 2: translating for a sceptical CFO

**You say:**
> "The CFO asks why two quarters of engineering goes to 'security plumbing'. Give me the finance-facing version of theme 1."

**Claude produces (excerpt):**

**Theme 1, CFO framing:** last quarter, [£X] of qualified mid-market pipeline reached security review; we converted [Y]%. The two missing items are cited in 64% of those losses. At current pipeline, closing half of that gap pays back the two quarters of build inside [N] months. This is not plumbing; it is the tollgate on revenue we already generate demand for.

**One honest caveat to include:** the win-rate claim rests on loss-reason notes, not a controlled test; we will report actual review pass-rate quarterly so the bet stays accountable.

## Tips for best results

- Give the company goal in one line; themes are built to ladder to it.
- Include what you rejected; the "not on the roadmap" section earns the most trust.
- Name the audience; a board narrative and a team narrative emphasise different risks.

## Related skills

- `rice-impact-matrix` to produce the prioritised list this narrative explains
- `stakeholder-update` for the recurring progress reports between roadmap moments
