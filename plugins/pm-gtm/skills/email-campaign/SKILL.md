---
name: email-campaign
description: "Write and sequence multi-email nurture or launch campaigns. Use when asked for an email sequence, drip campaign, onboarding emails, product launch emails, or nurture flow. Produces subject lines, preview text, full email body, and send-timing recommendations for each email in the sequence."
---

# Email Campaign Skill

This skill writes complete, sequenced email campaigns — from welcome flows to product launches to re-engagement sequences. Each email is written with subject line, preview text, full body copy, and CTA.

## Required Inputs

Ask the user for these if not provided:
- **Campaign goal** (onboard new users / launch a product / nurture leads / re-engage churned users / announce a feature)
- **Audience** (who receives this? job title, lifecycle stage, what they know already)
- **Product or offer** being promoted or introduced
- **Number of emails in sequence** (if unsure, recommend based on goal)
- **Tone** (professional / conversational / bold / educational)
- **Sender name** (person or brand?)

## Sequence Recommendations by Goal

If the user hasn't specified number of emails, use these defaults:
- **Onboarding:** 4 emails over 7 days (Day 0, Day 1, Day 3, Day 7)
- **Product launch:** 3 emails (Teaser → Launch Day → Follow-up/Last chance)
- **Lead nurture:** 5 emails over 2 weeks
- **Re-engagement:** 3 emails (Gentle nudge → Value reminder → Final offer)
- **Feature announcement:** 2 emails (Announcement → How-to/deep dive)

## Output Structure Per Email

For every email in the sequence, produce:

---

**Email [N] of [Total] — [Descriptive label e.g. "Welcome / Day 0"]**
**Send timing:** [When relative to trigger event or previous email]

**Subject line:** [Primary option]
**Subject line (A/B variant):** [Alternative to test]
**Preview text:** [40–90 characters — adds context to the subject, doesn't repeat it]

**Body:**

[Full email copy — formatted with clear opening line, 2–3 body paragraphs, one primary CTA]

**CTA button text:** [3–6 words]
**CTA destination:** [What page/action this should link to]

**Strategic note:** [Why this email does what it does — the psychological or strategic intent. 1–2 sentences.]

---

## Writing Rules

- Opening line must earn attention — no "Hi, welcome to [product]" openers
- Each email has ONE primary CTA — never two competing asks
- Keep paragraphs to 2–3 sentences maximum for mobile readability
- Use "you" more than "we" — centre the reader, not the brand
- Subject lines under 50 characters perform best on mobile — flag if going over
- Preview text should add information the subject doesn't — never just repeat it
- Every email should stand alone — assume some subscribers miss earlier emails

## Quality Checks

- [ ] Each email has a single clear CTA
- [ ] Subject lines are under 50 characters (or flagged)
- [ ] Preview text doesn't repeat the subject line
- [ ] Opening line is specific and attention-earning
- [ ] Sequence has logical narrative arc (doesn't feel like disconnected blasts)
- [ ] Tone is consistent across all emails
- [ ] Strategic notes explain the intent of each email

## Example Trigger Phrases

- "Write a 3-email launch sequence for [product]"
- "Build an onboarding email flow for [SaaS tool]"
- "Create a drip campaign to nurture leads for [offer]"
- "Write a re-engagement campaign for churned users"
