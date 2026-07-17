# Worked Example — Opposing Counsel

## The brief

Halden Studio (a 6-person design agency) is about to sign a $180k/year retainer MSA with Corvex, a mid-market fintech. Founder pastes the contract: "Corvex's legal sent this. Read it like their lawyer will when things go wrong. We care most about getting paid and keeping our portfolio rights."

## The output

# Adversarial Reading: Corvex MSA — acting for Corvex

> Simulation — a plausible adversarial reading, not a prediction or legal/financial advice.

## Attack Memo

| # | Clause / gap | The exploit | Leverage |
|---|---|---|---|
| 1 | §4.2 "payment within 60 days of *accepted* invoice" + §4.3 acceptance "at Client's reasonable discretion" | We slow-walk acceptance indefinitely; 60 days never starts. Your cash-flow becomes our negotiation tool. | 🔴 |
| 2 | §11 IP: "all work product, including preliminary materials, is work made for hire" — no portfolio carve-out | Your case-study page is infringement the day we sour. We send the takedown mid-dispute for pressure. | 🔴 |
| 3 | §9 Termination for convenience (Client only), 10 days' notice, "payment for accepted work only" | Pair with #1: terminate, accept nothing in flight, owe nothing for six weeks of WIP. | 🔴 |
| 4 | §13 Indemnity: agency indemnifies "any claim arising from the Services" — uncapped, one-way | Any third-party font/stock claim, even Corvex-introduced assets, lands on you, above your insurance. | 🟡 |
| 5 | Silence: no interest on late payment, no dispute-escalation clause | Nothing punishes slow pay; our first forum is your patience. | 🟡 |
| 6 | §16 "Client may set off disputed amounts against any invoice" | One contested deliverable freezes ALL invoices, not just the disputed one. | 🟡 |

## The Letter They Would Send

> **Re: MSA §4.3 / §9 — Notice of Non-Acceptance and Termination**
>
> Dear Ms. Halden,
>
> Pursuant to §4.3, Corvex declines acceptance of deliverables D-7 through D-11 as inconsistent with the Statement of Work's quality expectations. Per §4.2, no payment obligation has accrued.
>
> Corvex further exercises §9, terminating for convenience effective ten (10) days from this notice. Per §9.2, compensation is due only for accepted work; none is outstanding.
>
> We additionally note materials from the engagement displayed at halden.studio/work/corvex. Per §11, such materials are Corvex property; remove them within five (5) business days.
>
> Corvex reserves all rights, including under §13 and §16. Direct correspondence to the undersigned.

## Debrief — out of character

| Fix | Kills attack # | New language to propose | Priority |
|---|---|---|---|
| Deemed acceptance | 1, 3 | "Deliverables are deemed accepted 10 business days after delivery absent written, specific deficiencies." | 1 |
| Portfolio carve-out | 2 | "Agency may display final, publicly-released work in its portfolio, excluding Confidential Information; attribution per Client's brand guidelines." | 2 |
| Kill-fee on convenience termination | 3 | "On §9 termination, Client pays for all WIP plus 20% of remaining SOW value." | 3 |
| Cap + mutualize indemnity | 4 | "Each party's indemnity capped at fees paid in the prior 12 months; excludes claims from the other party's materials." | 4 |
| Set-off scope + interest | 5, 6 | "Set-off limited to the disputed deliverable's value; undisputed invoices bear 1.5%/mo after 30 days." | 5 |

The single change that most reduces exposure: **deemed acceptance** — attacks 1 and 3 both run through the acceptance loophole; close it and the letter above mostly can't be written.

*Route the fixes through your contracts counsel before sending anything — laws and enforceability vary by jurisdiction.*

## Why it's shaped this way

- **Every attack cites a real clause or a real silence** — #5 attacks what's *missing*, per the framework's first pass.
- **Attacks compound** (#1 + #3 = free termination) — reading clauses in isolation is the mistake the skill exists to prevent.
- **The letter is procedurally polite and genuinely frightening** — plausibility is the pedagogy; cartoon aggression teaches nothing.
- **The debrief maps each fix to the attacks it kills**, ranked, with the single-best-change paragraph the skill requires.
- **The user's stated priorities (getting paid, portfolio) drive the leverage ratings** — the same MSA read for an IP-first client would rank differently.
