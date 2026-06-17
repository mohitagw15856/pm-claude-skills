---
trigger: model_decision
description: "Audit an existing social media presence across all active platforms. Use when asked to review social media performance, analyse a brand's social presence, benchmark against competitors, or identify what's working and what isn't. Produces a scored audit with platform-by-platform analysis, content performance review, competitive benchmarking, and a prioritised action plan."
---

# Social Media Audit Skill

This skill produces a comprehensive social media audit covering profile completeness, content performance, audience engagement, posting consistency, competitive position, and a prioritised improvement plan. Output is ready for a social media manager, marketing lead, or agency to act on immediately.

## Required Inputs

Ask the user for these if not provided:
- **Brand / handle name** — which account(s) to audit
- **Active platforms** — which social channels to include (LinkedIn, Instagram, X/Twitter, TikTok, YouTube, Facebook, etc.)
- **Audit timeframe** — what period to review (e.g. last 90 days, last 6 months)
- **Business goal** — what social media should be achieving (brand awareness / lead gen / community / sales)
- **Competitor handles** — 2–3 competitors or benchmark accounts for comparison
- **Available metrics** — follower count, average engagement rate, post frequency, reach, impressions (if the user has them)

## Output Structure

---

# Social Media Audit: [Brand Name]

**Audit period:** [e.g. Feb–Apr 2026]
**Platforms audited:** [List]
**Audited by:** [Name / role]
**Date:** [Date]
**Overall health score:** [X / 100]

---

## 1. Audit Summary — Health Score

Score each dimension out of 10. Weighted total = overall health score out of 100.

| Dimension | Weight | Score (/10) | Weighted Score | Assessment |
|---|---|---|---|---|
| Profile completeness & branding | 10% | [X] | [X] | [1-sentence note] |
| Content quality & consistency | 25% | [X] | [X] | [1-sentence note] |
| Audience engagement | 20% | [X] | [X] | [1-sentence note] |
| Follower growth | 15% | [X] | [X] | [1-sentence note] |
| Platform strategy fit | 15% | [X] | [X] | [1-sentence note] |
| Competitive position | 15% | [X] | [X] | [1-sentence note] |
| **Total** | 100% | — | **[X/100]** | [Overall verdict] |

**Overall verdict:** 🟢 Strong (80–100) / 🟡 Developing (60–79) / 🔴 Needs work (<60)

---

## 2. Platform-by-Platform Analysis

Repeat this section for each active platform:

### [Platform Name] — Score: [X/10]

**Profile health:**
- Bio / description: [Clear and keyword-rich / generic / missing]
- Profile photo / banner: [Professional / outdated / mismatched]
- Link in bio / CTA: [Present and current / missing]
- Pinned content: [Exists and strategic / outdated / none]
- Contact info / location: [Complete / incomplete]

**Audience:**
- Followers: [X]
- Follower growth (audit period): [+X% / -X% / flat]
- Follower quality: [Relevant audience / mixed / unclear]

**Content performance:**

| Metric | Your account | Benchmark / competitor | Gap |
|---|---|---|---|
| Posts per week | [X] | [X] | [+/- X] |
| Average engagement rate | [X%] | [X%] | [+/- X%] |
| Average reach per post | [X] | [X] | [+/- X] |
| Top format by engagement | [e.g. carousel] | [e.g. video] | [Match / mismatch] |

**Content audit — what you posted:**

| Content type | % of posts | Avg engagement | Verdict |
|---|---|---|---|
| Educational / how-to | [X%] | [X%] | [Keep / scale / drop] |
| Product / promotional | [X%] | [X%] | [Keep / scale / drop] |
| Behind-the-scenes | [X%] | [X%] | [Keep / scale / drop] |
| Social proof / testimonials | [X%] | [X%] | [Keep / scale / drop] |
| Engagement bait / conversation starters | [X%] | [X%] | [Keep / scale / drop] |

**Top 3 performing posts:**
1. [Post description + why it worked]
2. [Post description + why it worked]
3. [Post description + why it worked]

**Bottom 3 performing posts:**
1. [Post description + why it underperformed]
2. [Post description + why it underperformed]
3. [Post description + why it underperformed]

**Posting patterns:**
- Best performing days: [e.g. Tue, Thu]
- Best performing times: [e.g. 08:00–10:00]
- Actual posting pattern: [e.g. sporadic / daily / consistent]
- Consistency score: [Consistent / irregular / sporadic]

**Platform verdict:** [2–3 sentences on what's working, what isn't, and the #1 change to make]

---

## 3. Competitive Benchmarking

Compare against 2–3 competitors or aspirational accounts:

| Metric | [Your brand] | [Competitor 1] | [Competitor 2] | [Competitor 3] |
|---|---|---|---|---|
| LinkedIn followers | | | | |
| LinkedIn eng. rate | | | | |
| Instagram followers | | | | |
| Instagram eng. rate | | | | |
| Post frequency (all platforms) | | | | |
| Content formats used | | | | |
| Top content theme | | | | |

**Competitive gaps:**
- **Where you're ahead:** [Specific metrics or tactics where you outperform]
- **Where you're behind:** [Specific gaps — follower count, engagement, content variety]
- **Opportunities they're missing:** [Whitespace you could own]

**What competitors are doing well that you should steal (ethically):**
1. [Tactic / format / approach]
2. [Tactic / format / approach]
3. [Tactic / format / approach]

---

## 4. Content Strategy Assessment

**Are you posting the right mix?**

| Principle | Met? | Evidence | Recommendation |
|---|---|---|---|
| 80/20 rule: audience value vs self-promotion | [Yes/No] | [X% promotional posts] | [...] |
| Consistent content pillars | [Yes/No] | [Pillars identified or not] | [...] |
| Format variety (not just text posts) | [Yes/No] | [Format breakdown] | [...] |
| Regular engagement with audience | [Yes/No] | [Reply rate, comment engagement] | [...] |
| SEO / discoverability in profiles and posts | [Yes/No] | [Keywords, hashtags used] | [...] |

**Content gaps identified:**
- [Gap 1: e.g. No video content despite video outperforming text on Instagram]
- [Gap 2: e.g. No customer stories or social proof]
- [Gap 3: e.g. Hashtag strategy missing — no discoverability beyond existing followers]

---

## 5. Audience Insights

**Follower quality assessment:**
- Do followers match the target audience? [Yes / Partially / No]
- Signs of inorganic growth? [e.g. high follower count, very low engagement = possible bought followers]
- Most engaged audience segments: [e.g. industry, role, geography if visible from analytics]

**Engagement quality:**
- Comment sentiment: [Positive / Mixed / Negative / Sparse]
- Are comments substantive or just emoji reactions? [Substantive / Surface-level]
- Are you responding to comments? [Always / Sometimes / Rarely / Never]
- DMs / direct inquiries from social: [High / Low / None tracked]

---

## 6. Prioritised Action Plan

Ranked by impact × effort:

### 🔴 Do immediately (this week)

| Action | Platform | Why | Expected impact |
|---|---|---|---|
| [e.g. Update LinkedIn bio with clear value prop and keywords] | LinkedIn | Profile discovery | Higher profile views |
| [e.g. Pin best-performing post to top of profile] | Instagram | First impression | Higher follow rate |
| [e.g. Add link in bio with UTM tracking] | All | Traffic attribution | Measurable ROI |

### 🟡 Do this month

| Action | Platform | Why | Expected impact |
|---|---|---|---|
| [e.g. Launch a weekly educational carousel series] | LinkedIn | Fills content gap, high engagement format | +X% engagement rate |
| [e.g. Start responding to all comments within 24h] | All | Signals algorithm engagement | Improved reach |
| [e.g. Test video format 2x per week] | Instagram / TikTok | Underutilised high-reach format | Follower growth |

### 🟢 Do this quarter

| Action | Platform | Why | Expected impact |
|---|---|---|---|
| [e.g. Define 3–5 content pillars and build a monthly calendar] | All | Strategic consistency | Compound growth |
| [e.g. Run a hashtag audit — identify 15–20 relevant tags per platform] | Instagram / LinkedIn | Discoverability | Organic reach |
| [e.g. Source 3 customer stories for social proof content] | All | Social proof pillar | Trust + conversion |

---

## 7. 30-Day Quick Win Plan

The fastest way to improve the score by 10+ points:

| Week | Priority action | Platform | Owner | Success metric |
|---|---|---|---|---|
| 1 | [e.g. Fix all profile gaps — bio, photo, CTA, pinned post] | All | [Name] | 100% profile completeness |
| 2 | [e.g. Post 3x educational carousel / video this week] | LinkedIn / IG | [Name] | ≥X% engagement rate |
| 3 | [e.g. Engage actively — comment on 10 accounts per day] | LinkedIn / IG | [Name] | +X new followers |
| 4 | [e.g. Review analytics and double down on best format] | All | [Name] | Identify top performing format |

---

## Quality Checks

- [ ] Every platform scored against objective criteria, not guesswork
- [ ] Competitive benchmarks use real data, not assumptions
- [ ] Content audit covers actual post types posted, not idealised mix
- [ ] Recommendations are specific and actionable — not "post more content"
- [ ] Action plan is sequenced by impact × effort, not just effort
- [ ] 30-day plan has named owners and measurable success metrics

## Example Trigger Phrases

- "Audit our social media presence"
- "Review our Instagram and LinkedIn performance"
- "How are we doing on social compared to competitors?"
- "What's working and what isn't on our social channels?"
- "Give me a social media health check for [brand]"

## Anti-Patterns

- [ ] Do not score platforms against guesswork — every score must be based on actual metrics provided or observable data
- [ ] Do not write recommendations as "post more content" or "improve engagement" — every action must be specific and measurable
- [ ] Do not use competitor benchmarks that are not based on real data — fabricated benchmarks invalidate the competitive gap analysis
- [ ] Do not audit content mix based on what should have been posted — analyse what was actually posted during the audit period
- [ ] Do not sequence the action plan by effort alone — sequence by impact × effort so the highest-value actions come first
