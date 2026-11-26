# Worked Example — Job Story Mapper Skill

A gold-standard run of this skill: a maintenance-request job map whose highest-scoring job story is one the current roadmap honestly cannot serve.

## The brief

Rentcove is a proptech platform for self-managing landlords with 2–20 units — 11,000 landlord accounts, mostly solo operators with day jobs. The head of product wants a "vendor marketplace" on the roadmap and asked PM Theo Marsh to back it with JTBD work. Source material: 6 discovery interviews with landlords plus a taxonomy of 214 maintenance-related support tickets from the last two quarters. Scope: the maintenance-request feature area only. User type: the self-managing landlord (not the tenant, not the tradesperson).

## The output

### Job Story Map — Rentcove Maintenance Requests — June 2026

**Core Job Statement:**
> When something in a rental unit breaks, a self-managing landlord wants to get it fixed quickly at a fair price without becoming the full-time middleman, so they can protect both the tenant relationship and the asset without maintenance eating their evenings.

---

**Job Map:**

| Step | Sub-Job | Current Solution | Pain Points | Underserved? |
|---|---|---|---|---|
| Define | Understand what's actually broken from the tenant's report | Tenant texts + blurry photos; back-and-forth questions | Can't judge severity remotely; fears both over- and under-reacting | H |
| Locate | Find a competent tradesperson | Google, local Facebook landlord groups, "a guy I've used before" | No trusted shortlist; the good ones don't answer | H |
| Prepare | Get quotes and arrange access | Phone tag brokering times between tenant and trade | Landlord is the human switchboard; jobs stall for days | H |
| Confirm | Approve the cost | Gut feel; sometimes asks the Facebook group | No benchmark — every approval carries "am I being ripped off?" doubt | M |
| Execute | Work gets done | Trade attends; landlord usually not present | Little visibility that work happened as described | M |
| Monitor | Verify quality | Texts tenant "all good?" | Tenant politeness masks shoddy work until it recurs | M |
| Modify | Get bad work redone | Awkward call-backs; rarely pursued | Low leverage over a one-off trade; usually just pays someone else | M |
| Conclude | Pay, keep records for tax | Bank transfer; receipts scattered across email and photos | January scramble to reconstruct deductible expenses | M |

---

**Job Stories (prioritised by underservice):**

**Job Story 1 — The 11pm ceiling leak**
> When a tenant texts me at 11pm that water is coming through the ceiling, I want someone competent to make the stop-the-damage call for me, so I can limit the damage without gambling on a panicked guess I'm not qualified to make.

Functional dimension: Triage severity and dispatch an emergency trade at unsociable hours
Emotional dimension: Relief from carrying sole liability alone in the dark; permission to stop rereading the message
Social dimension: Appear to the tenant like a professional operation, not an overwhelmed amateur landlord

Current workaround: Calls the one plumber they know; if unreachable, talks the tenant through shutting off the water main and waits until morning
Pain intensity: High
Frequency: 2–4 times a year per landlord — rare, but these are the nights that make people sell the property or hire an agent
Product opportunity: The landlord can hand the judgment call to someone accountable within minutes of the message arriving. **Honest flag: the motivation here is transferring judgment and liability — that is a 24/7 triage *service* (or an insurer/call-centre partnership), not a software feature. Rentcove's current self-serve tooling strategy cannot serve this story; it goes to leadership as a strategy question, not into a sprint.**

**Job Story 2 — The vague boiler noise**
> When a tenant reports "the boiler is making a weird noise," I want to work out whether it's urgent without driving over, so I can dispatch the right trade once instead of paying for two visits or ignoring something dangerous.

Functional dimension: Remote severity triage — structured symptoms, guided photos/video from the tenant
Emotional dimension: Confidence they're neither dismissing a hazard nor being played for an unnecessary call-out
Social dimension: Seen by the tenant as responsive and on top of it, even from 40 miles away

Current workaround: Free-text back-and-forth with the tenant, requests a video, searches the symptoms online
Pain intensity: High
Frequency: Roughly monthly per landlord (the largest single cluster in the ticket taxonomy: 61 of 214 tickets)
Product opportunity: The landlord can turn a vague tenant message into a dispatchable, severity-rated job description without a site visit

**Job Story 3 — The £480 quote and no yardstick**
> When a quote comes in at £480 and I have nothing to compare it to, I want to know what this job usually costs nearby, so I can approve it fast without the nagging feeling I'm being taken for a ride.

Functional dimension: Price benchmarking for common jobs by region
Emotional dimension: Not feeling naive; ending the second-guessing after they've paid
Social dimension: Look savvy when a co-owner, partner, or accountant asks why the repair cost what it did

Current workaround: Posts the quote in a landlord Facebook group and waits a day for strangers' opinions — delaying the job to buy confidence
Pain intensity: Medium
Frequency: Every non-trivial job, ~6 times a year
Product opportunity: The landlord can approve a fair quote the same day it arrives

**Job Story 4 — The January paper chase**
> When my accountant asks for the year's maintenance records in January, I want every job's invoice, photos, and outcome already in one place, so I can claim every deduction without a weekend of inbox archaeology.

Functional dimension: Automatic per-job record keeping (invoice, photos, dates, amounts)
Emotional dimension: Removal of a dreaded annual chore
Social dimension: Look competent in front of the accountant instead of apologising for a shoebox

Current workaround: Email search plus phone camera roll; Rentcove already stores invoices for jobs raised in-platform
Pain intensity: Medium (but sharply seasonal)
Frequency: Once a year
Product opportunity: Tax-time evidence assembles itself as a by-product of handling jobs in Rentcove

---

**Opportunity Scoring:**

| Job Story | Importance (1–10) | Satisfaction (1–10) | Opportunity = I + max(I−S, 0) | Above the >10 line? |
|---|---|---|---|---|
| 1. The 11pm ceiling leak | 9 | 2 | 16 | Yes — but see prioritisation note |
| 2. The vague boiler noise | 8 | 3 | 13 | Yes |
| 3. The £480 quote | 7 | 4 | 10 | No — exactly 10, watchlist |
| 4. The January paper chase | 6 | 6 | 6 | No — adequately served |

**Prioritisation note:** Opportunity score ranks underservice, not build order. Story 1 scores highest and is the least buildable — it needs a service operation or partnership Rentcove doesn't have, so it's escalated as a strategic question rather than queued. Story 2 is the recommendation for the next discovery track: highest buildable score, largest ticket cluster, and it strengthens Story 3 later (structured job data is the raw material for price benchmarks). The vendor-marketplace idea the sponsor arrived with maps to the *Locate* step — real pain, but the interviews show landlords stall earlier, at *Define*: a marketplace of trades is worth little if the landlord still can't describe the job.

## Why it's shaped this way

- **Every situation is a moment, not a role** — "a tenant texts me at 11pm," "a quote comes in at £480" — because the anti-patterns ban situations defined as broadly as "as a user who wants to manage their work," and the skill's own framing insists "the situation is the most important part."
- **All three dimensions are populated per story and do distinct work** — the social dimension (amateur vs professional operation) recurs across stories and is arguably Rentcove's most defensible angle, exactly as the anti-pattern warns: "mapping only functional jobs misses the most defensible differentiation opportunities."
- **Story 1 scores 16 and is still not queued for build** — the anti-pattern says "do not conflate opportunity scoring with priority — a high opportunity score still requires feasibility and strategic fit assessment"; the honest flag inside the story and the prioritisation note carry that assessment instead of quietly dropping the story.
- **Every story names its current workaround, and the workarounds carry information** — the Facebook-group post shows landlords will *delay a job by a day* to buy price confidence, which prices Story 3's value; the anti-pattern is explicit that "the workaround reveals what the job is worth to the customer."
- **The opportunity arithmetic is shown and applied without rounding favours** — Story 3 lands at exactly 10 and stays below the "> 10" prioritisation line from the Output Format, on the watchlist rather than promoted because the team likes it.
- **Product opportunities are written as customer outcomes, not features** — "approve a fair quote the same day," not "build a pricing database" — per the quality check that the opportunity must be "distinct from 'build the feature.'"
- **The full 8-step job map is kept even where pain is moderate** — the map is what localises the sponsor's marketplace idea to the *Locate* step and shows the job actually falls down one step earlier at *Define*, which is the whole argument of the prioritisation note.
- **Frequencies come from the source material, not vibes** — Story 2's "largest single cluster: 61 of 214 tickets" ties the map back to the ticket taxonomy, per the Required Inputs insistence on source material over memory.
