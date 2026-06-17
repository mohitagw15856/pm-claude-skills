---
trigger: model_decision
description: "Plan and write a paid social advertising campaign. Use when asked to build a paid social campaign, create Meta/LinkedIn/TikTok/X ad copy, define a social ad strategy, or plan an advertising funnel across social platforms. Produces a complete campaign plan with audience targeting, ad set structure, copy for each ad format, budget allocation, and measurement framework."
---

# Social Ad Campaign Skill

This skill produces a complete paid social advertising campaign plan covering campaign objective, audience targeting, funnel structure, ad set architecture, ad copy and creative briefs for each format, budget allocation, bidding strategy, and a measurement framework. Output is ready for a media buyer, performance marketer, or social team to execute.

## Required Inputs

Ask the user for these if not provided:
- **Brand / product name**
- **Campaign objective** — what are you trying to achieve? (traffic / leads / conversions / brand awareness / app installs / video views / event promotion)
- **Platform(s)** — Meta (Facebook/Instagram), LinkedIn, TikTok, X/Twitter, Pinterest, Snapchat
- **Target audience** — who are you trying to reach? (demographics, interests, job titles, behaviours, lookalikes)
- **Budget** — total campaign budget and timeframe (e.g. £5,000 over 4 weeks)
- **Offer / landing page** — what is the ad driving to? (free trial, product page, lead form, event sign-up)
- **Key message** — the single most important thing the ad must communicate

## Output Structure

---

# Paid Social Campaign Plan: [Brand] — [Campaign Name]

**Campaign objective:** [e.g. Lead generation — 200 qualified leads in 30 days]
**Platform(s):** [e.g. Meta (Instagram + Facebook), LinkedIn]
**Budget:** [£/$/€ X total over X weeks]
**Campaign period:** [Start date → End date]
**Owner:** [Media buyer / performance marketer / agency]
**Date:** [Date]

---

## 1. Campaign Strategy Overview

**Why paid social for this objective:**
[2–3 sentences justifying the platform and format choice for this specific goal and audience. E.g. "LinkedIn is the right channel for this B2B SaaS campaign — we can target by job title, company size, and seniority, ensuring budget reaches decision-makers, not browsers."]

**Funnel structure:**

| Stage | Objective | Audience | Budget allocation |
|---|---|---|---|
| **Top of funnel (TOFU)** | Awareness / reach | Cold audience — interest/behaviour targeting | [X%] |
| **Middle of funnel (MOFU)** | Consideration / engagement | Warm audience — video viewers, page engagers, website visitors | [X%] |
| **Bottom of funnel (BOFU)** | Conversion / lead | Hot audience — retargeting, custom audiences, lookalikes | [X%] |

---

## 2. Audience Targeting

### Audience 1: [Cold — Primary Target]

**Platform:** [Meta / LinkedIn / TikTok]
**Audience size target:** [e.g. 500K–2M — broad enough to learn, narrow enough to be relevant]

| Targeting dimension | Settings |
|---|---|
| Location | [Country / region / city] |
| Age | [e.g. 28–45] |
| Gender | [All / specify if relevant] |
| Interests / behaviours | [e.g. SaaS tools, productivity apps, small business owners] |
| Job titles (LinkedIn) | [e.g. Head of Marketing, Marketing Director, CMO] |
| Company size (LinkedIn) | [e.g. 50–500 employees] |
| Industry (LinkedIn) | [e.g. Technology, Financial Services, Healthcare] |
| Exclude | [e.g. Existing customers — upload suppression list] |

### Audience 2: [Warm — Engagement Retargeting]

**Platform:** [Meta]
**Source:** People who engaged with content / visited website in last 30 days

| Signal | Action |
|---|---|
| Watched 50%+ of a video ad | Retarget with a case study or testimonial ad |
| Visited product page but didn't convert | Retarget with a direct offer / free trial CTA |
| Engaged with Instagram / Facebook page | Retarget with social proof ad |

### Audience 3: [Hot — Conversion Retargeting]

**Platform:** [Meta / LinkedIn]
**Source:** Website visitors (last 7 days), abandoned cart, form started but not completed

**Retargeting message:** More direct. Address the specific action they took. Time-sensitive CTA.

### Audience 4: [Lookalike]

**Source:** [Existing customers / email list / best-converting website visitors]
**Lookalike similarity:** [1%–3% (tight match) / 3%–10% (broader reach)]
**Platform:** Meta

---

## 3. Campaign Structure

### Meta Campaign Architecture

```
Campaign: [Campaign Name] — [Objective: Lead Generation / Traffic / Conversions]
│
├── Ad Set 1: TOFU — Cold Interests
│   ├── Ad 1A: [Video ad — hook format]
│   ├── Ad 1B: [Static image — benefit-led headline]
│   └── Ad 1C: [Carousel — feature/use case showcase]
│
├── Ad Set 2: MOFU — Warm Retargeting (30-day engagers)
│   ├── Ad 2A: [Social proof / testimonial]
│   └── Ad 2B: [Case study / before & after]
│
└── Ad Set 3: BOFU — Hot Retargeting (7-day website visitors)
    ├── Ad 3A: [Direct offer — free trial / discount / demo]
    └── Ad 3B: [Objection handling — FAQ / reassurance]
```

### LinkedIn Campaign Architecture

```
Campaign Group: [Campaign Name]
│
├── Campaign 1: [Job Title Targeting — Awareness]
│   ├── Single Image Ad: [Thought leadership hook]
│   └── Video Ad: [Problem/solution story]
│
├── Campaign 2: [Company Size + Industry — Consideration]
│   ├── Single Image Ad: [Case study / proof point]
│   └── Lead Gen Form: [Gated asset / webinar / demo]
│
└── Campaign 3: [Retargeting — Conversion]
    └── Sponsored Message / Lead Gen Form: [Direct CTA with personalisation]
```

---

## 4. Ad Copy

### Format 1: Video Ad (15–30 seconds) — TOFU

**Hook (first 3 seconds — must stop the scroll):**
> "[Pattern interrupt question or statement — e.g. 'Are you still doing [painful thing] manually?']"

**Core message (seconds 4–20):**
> "[Agitate the problem → introduce the solution → show the specific outcome]"

**CTA (final 5 seconds):**
> "[Clear, single action — e.g. 'Try free for 14 days — link in bio' / 'Get your demo today']"

**Visual direction:**
- [e.g. Founder talking to camera in natural setting — authentic, not polished ad]
- [e.g. Screen recording showing the product in use — show the outcome, not the feature]
- [e.g. Customer testimonial — real person, real result, first-person story]

**Caption copy:**
> [Headline — max 40 chars]
> [Body copy — 1–3 sentences max]
> [CTA button label: e.g. "Learn More" / "Sign Up" / "Get Started"]

---

### Format 2: Static Image Ad — TOFU/MOFU

**Ad variant A — Benefit-led headline:**

| Element | Copy |
|---|---|
| **Headline** | "[Single-sentence benefit statement — e.g. 'Cut reporting time by 80% with [Product]']" |
| **Body copy** | "[Problem → solution in 2 sentences. Proof point if available.]" |
| **CTA** | "Start free trial" / "Book a demo" / "Get 20% off" |
| **Image** | [Product UI / result visual / human context shot — no stock photos of people in suits] |

**Ad variant B — Social proof headline:**

| Element | Copy |
|---|---|
| **Headline** | "['[Result] in [timeframe]' — real customer result, or '500+ teams use [Product] to...']" |
| **Body copy** | "[Expand on the proof. 1–2 sentences. Add a second proof point if available.]" |
| **CTA** | "See how it works" / "Try it free" |
| **Image** | [Customer photo + quote overlay / logo wall / before/after data visual] |

**Ad variant C — Curiosity/question headline:**

| Element | Copy |
|---|---|
| **Headline** | "['[Common misconception or challenging question]' — e.g. 'What if [painful process] took 10 minutes, not 2 hours?']" |
| **Body copy** | "[Answer the question → introduce product → specific outcome]" |
| **CTA** | "Find out how" |

---

### Format 3: Carousel Ad — Features / Use Cases

**Headline (shown above carousel):** "[Problem-first statement or benefit hook]"

| Card # | Headline | Description | Image |
|---|---|---|---|
| Card 1 (hook) | "[Compelling hook — why this matters]" | "[1-sentence setup]" | [Eye-catching visual / stat] |
| Card 2 | "[Use case / feature 1]" | "[Specific outcome this delivers]" | [Product UI or illustration] |
| Card 3 | "[Use case / feature 2]" | "[Specific outcome this delivers]" | [Product UI or illustration] |
| Card 4 | "[Use case / feature 3]" | "[Specific outcome this delivers]" | [Product UI or illustration] |
| Card 5 (CTA card) | "[Strong CTA headline]" | "[Reinforce the offer / urgency]" | [CTA-focused visual / button] |

---

### Format 4: Lead Gen Form Ad (LinkedIn / Meta)

**Intro text (shown before form):**
> "[1–2 sentences on what they'll get and why it's worth 60 seconds of their time]"

**Form headline:** "[Value-led headline — e.g. 'Get your free [asset] / Book your 20-min demo']"

**Form fields (keep to minimum — each extra field reduces conversion):**
- First name
- Work email
- [One qualifying question — e.g. "Company size" / "Current tool used" / "Biggest challenge"]

**Privacy notice:** [Standard GDPR / CCPA compliance text — "By submitting, you agree to our Privacy Policy and may be contacted by [Brand] about relevant products and services."]

**Thank you message:**
> "[What happens next — e.g. 'Thanks! You'll receive [asset] in your inbox within 5 minutes. Our team will be in touch within 1 business day.']"

---

### Format 5: Retargeting Ad — BOFU

**For website visitors (7 days) — direct offer:**
> Headline: "[Specific nudge — e.g. 'Still thinking about [Product]? Here's 20% off to make the decision easier.']"
> Body: "[Reinforce the primary benefit. Add urgency if genuine — e.g. 'Offer ends [date]'.]"
> CTA: "Claim offer" / "Start free trial" / "Book demo"

**For video viewers (50%+) — social proof bridge:**
> Headline: "[Continue the story — e.g. 'See what [50/100/500] teams achieved with [Product]']"
> Body: "[Customer result quote or specific outcome. Bridge from awareness to consideration.]"
> CTA: "Read the case study" / "See how it works"

---

## 5. Budget Allocation

**Total budget:** [£/$/€ X over X weeks]

| Ad Set | Stage | Budget | % of total | Expected CPM | Expected CPC | Expected conversions |
|---|---|---|---|---|---|---|
| Ad Set 1 — Cold interests | TOFU | [£X/week] | [X%] | [£X] | [£X] | [X leads / clicks] |
| Ad Set 2 — Warm retargeting | MOFU | [£X/week] | [X%] | [£X] | [£X] | [X] |
| Ad Set 3 — Hot retargeting | BOFU | [£X/week] | [X%] | [£X] | [£X] | [X] |
| **Total** | — | [£X/week] | 100% | — | — | [X total] |

**Bidding strategy:**
- TOFU: [Lowest cost / Maximum reach — optimise for video views or link clicks]
- MOFU: [Lowest cost — optimise for landing page views or lead form opens]
- BOFU: [Cost cap / Target cost — optimise for conversions or lead form submits]

**Budget reallocation rule:** After [7] days, pause ad sets with CPL > [£X]. Reallocate budget to best-performing ad sets. Review weekly.

---

## 6. Measurement Framework

**Primary KPI (tied to campaign objective):**

| KPI | Target | Why |
|---|---|---|
| [Cost per lead (CPL)] | [≤ £/$/€ X] | [Primary success metric — every pound spent measured against leads generated] |
| [Conversion rate (ad → lead form)] | [≥ X%] | [Quality of targeting and ad relevance] |
| [Total leads] | [≥ X in X weeks] | [Volume target] |

**Secondary metrics (optimisation signals):**

| Metric | Target | Action if off-target |
|---|---|---|
| CTR (click-through rate) | [≥ X%] | [Test new headlines / hook variations] |
| CPM (cost per 1K impressions) | [≤ £/$/€ X] | [Broaden audience / test new placements] |
| Video completion rate (if video) | [≥ X%] | [Test shorter video / stronger hook] |
| Lead form completion rate | [≥ X%] | [Reduce form fields / test form intro copy] |
| Lead-to-opportunity rate (post-campaign) | [≥ X%] | [Review lead quality — tighten audience targeting] |

**Reporting cadence:**
- Daily: Check spend, CTR, and CPL — pause clearly underperforming ads
- Weekly: Full performance review + budget reallocation decision
- Campaign end: Final report with learnings for next campaign

**Attribution model:** [Last-click / 7-day click + 1-day view / data-driven (if volume sufficient)]

**Tracking setup checklist:**
- [ ] Pixel / conversion API installed and verified on landing page
- [ ] Conversion event firing correctly (lead form submit / purchase / sign-up)
- [ ] UTM parameters set on all ad destination URLs
- [ ] Lead form CRM integration tested
- [ ] Lookalike audiences seeded from customer list upload

---

## 7. A/B Testing Plan

Run structured tests — change one variable at a time:

| Test # | Variable | Control | Variant | Success metric | Min budget to run |
|---|---|---|---|---|---|
| 1 | Hook / headline | [Current headline] | [Challenger headline] | CTR | [£X / 500 impressions] |
| 2 | Creative format | Static image | Video | CPL | [£X / 1,000 impressions] |
| 3 | CTA | "Learn More" | "Start free trial" | Conversion rate | [£X / 200 clicks] |
| 4 | Audience | Interest-based | Lookalike 1% | CPL | [Equal budget split] |

**Testing rules:**
- Run each test for minimum [7] days or [1,000 impressions] — whichever comes first
- Change one variable at a time — never two in the same test
- Document results and apply winning variant to all future campaigns

---

## Quality Checks

- [ ] Campaign objective is single and measurable — not "awareness and leads"
- [ ] Full-funnel structure: TOFU, MOFU, and BOFU ad sets are separate
- [ ] Each ad has a specific hook, benefit, and CTA — not generic copy
- [ ] Ad copy has been tested against the "1-second scroll stop" rule — does the hook compel a pause?
- [ ] Budget allocation reflects funnel logic — BOFU gets proportionally more per lead
- [ ] Tracking setup checklist completed before campaign goes live
- [ ] A/B test plan is in place — one variable per test, minimum budget defined
- [ ] Retargeting suppression is set — existing customers excluded from acquisition campaigns

## Example Trigger Phrases

- "Plan a paid social campaign for [product launch]"
- "Build Meta ad copy for our lead generation campaign"
- "Create a LinkedIn ad campaign for [B2B SaaS product]"
- "Write TikTok ad copy for [consumer brand]"
- "Structure a paid social funnel for [offer]"

## Anti-Patterns

- [ ] Do not combine multiple campaign objectives in one campaign — pick one measurable goal or the algorithm cannot optimise correctly
- [ ] Do not skip retargeting suppression — existing customers receiving acquisition ads wastes budget and damages brand perception
- [ ] Do not launch without completing the tracking setup checklist — campaigns without verified pixel firing cannot be optimised or attributed
- [ ] Do not run A/B tests changing more than one variable at a time — multi-variable tests produce uninterpretable results
- [ ] Do not allocate equal budget across TOFU, MOFU, and BOFU — BOFU audiences convert at higher rates and deserve proportionally more budget per conversion
