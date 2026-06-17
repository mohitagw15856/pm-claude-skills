---
trigger: model_decision
description: "Build a community management playbook for a brand's social media channels. Use when asked to create guidelines for managing comments, DMs, and community interactions, define a moderation policy, or build response frameworks for social media community managers. Produces a complete playbook with response templates, escalation paths, moderation rules, and tone guidelines."
---

# Community Management Playbook Skill

This skill produces a complete community management playbook covering response frameworks, tone guidelines, comment moderation rules, DM handling, crisis and escalation paths, response templates, and community health metrics. Output gives a community manager or social media team everything they need to manage public interactions consistently, professionally, and at speed.

## Required Inputs

Ask the user for these if not provided:
- **Brand / product name**
- **Active platforms** — which channels need community management (Instagram, LinkedIn, X/Twitter, Facebook, TikTok, YouTube, Discord, Reddit, etc.)
- **Team structure** — who manages community? (solo, small team, agency, rotating)
- **Brand tone of voice** — how the brand sounds (e.g. warm and friendly / professional / witty / technical)
- **Primary community type** — customers, fans, professional network, creators, users of a product
- **Common comment types** — what kinds of interactions do you get? (support questions, complaints, praise, spam, trolls)
- **Response time SLA** — how fast must the team respond? (e.g. within 2 hours on weekdays)

## Output Structure

---

# Community Management Playbook: [Brand Name]

**Version:** 1.0
**Platforms covered:** [List]
**Team:** [Names or roles]
**Last updated:** [Date]

---

## 1. Why Community Management Matters

[2–3 sentences on what's at stake: brand reputation, customer loyalty, algorithm signals, trust-building. Frame community management as a business function, not just social admin.]

**Our community management goals:**
1. [Goal 1: e.g. Respond to every comment and DM within our SLA — no question goes unanswered]
2. [Goal 2: e.g. Turn complaints into loyalty moments — every resolved issue is a trust win]
3. [Goal 3: e.g. Amplify positive sentiment — surface customer stories and user wins]
4. [Goal 4: e.g. Protect brand reputation — remove harmful content quickly and consistently]

---

## 2. Response Framework

Use this decision tree for every comment or message:

```
Is it spam, phishing, or dangerous content?
  → YES: Delete immediately. Report if platform requires. Log in moderation tracker.
  → NO: Continue ↓

Is it a hate comment, harassment, or offensive content?
  → YES: Hide or delete. Consider account block. Escalate if ongoing. See Section 6.
  → NO: Continue ↓

Is it a customer complaint or support question?
  → YES: Respond within SLA. Acknowledge, empathise, resolve or redirect. See Section 4.
  → NO: Continue ↓

Is it positive — praise, testimonial, or user win?
  → YES: Like + reply with warm acknowledgement. Flag for social proof content if suitable.
  → NO: Continue ↓

Is it a question about the brand, product, or content?
  → YES: Answer clearly and helpfully. Include a CTA if relevant.
  → NO: Continue ↓

Is it a general conversation starter or neutral engagement?
  → YES: Engage authentically — like, reply briefly, or ask a follow-up question.
```

---

## 3. Response Time SLAs

| Channel | Comment type | Target response time | Owner |
|---|---|---|---|
| [Instagram] | Customer complaint | [2 hours (business hours)] | [CM Lead] |
| [Instagram] | General comment / question | [Same day] | [CM team] |
| [Instagram] | DM | [4 hours (business hours)] | [CM Lead] |
| [LinkedIn] | Professional comment / question | [4 hours (business hours)] | [CM / Marketing] |
| [X / Twitter] | Public reply / mention | [2 hours (business hours)] | [CM Lead] |
| [X / Twitter] | DM | [4 hours (business hours)] | [CM team] |
| [Facebook] | Comment | [4 hours (business hours)] | [CM team] |
| [TikTok] | Comment on promoted post | [8 hours] | [CM team] |
| [YouTube] | Comment | [24 hours] | [CM team] |

**Out-of-hours coverage:**
- [Define weekend / evening coverage — e.g. "On-call CM checks mentions at 9am, 1pm, and 6pm on weekends"]
- Crisis escalation is always on — see Section 6 for out-of-hours escalation contacts

---

## 4. Response Templates

These are starting-point templates — always personalise with the person's name and specific context.

### Positive comments

**Praise / testimonial:**
> "Thank you so much, [name]! 🙌 This genuinely made our day. So glad [product/service] is working for you. [Add specific personal note if possible]."

**User-generated content / sharing their experience:**
> "Love seeing this, [name]! Thanks for sharing 🙌. [Relevant genuine comment on their specific post or experience]."

**Review or recommendation:**
> "Thank you for taking the time to share this, [name] — really appreciate it. [Add genuine specific reaction]. If you ever want to [next step / share more / join community], we'd love to have you."

---

### Questions about the product or brand

**Feature question:**
> "Great question, [name]! [Answer clearly in 1–3 sentences]. If you'd like more detail, [link to docs / help centre / DM us]. Happy to help with anything else!"

**Pricing / availability question:**
> "[Answer] — [link if relevant]. Feel free to DM us if you need anything specific. 😊"

**"Is this available in [region/format]?" question:**
> "[Answer with current availability]. If that's changed, you'll always see it first at [link / newsletter sign-up / our channels]. 🙌"

---

### Complaints

**Product issue — acknowledged, redirecting to support:**
> "Hi [name], really sorry to hear this — that's definitely not the experience we want for you. 😔 Could you DM us with [order number / account email / details]? We'll get this sorted as quickly as possible."

**Shipping / fulfilment complaint:**
> "Hi [name], thank you for letting us know and I'm so sorry for this. We want to make it right. Please DM us with your order reference and we'll investigate right away."

**General dissatisfaction:**
> "Hi [name], I'm sorry to hear you're not happy — your feedback genuinely matters to us. Could you DM us or email [support email] so we can understand what happened and fix it? We really do want to get this right."

**Public complaint that needs urgent attention:**
> "Hi [name], I can see why that would be frustrating and I want to make sure we sort this out properly. I'm going to DM you now — please look out for a message from us."

---

### Difficult interactions

**Polite but persistent critic:**
> "Hi [name], thank you for the honest feedback — we do read and take this seriously. We can't always respond to every individual point publicly, but if you'd like to share more detail, [DM us / email us at X]. We're genuinely working on [relevant area] and appreciate you holding us accountable."

**Misinformation or incorrect claim about the brand:**
> "Hi [name], just wanted to gently clarify — [correct the record factually in 1–2 sentences]. Happy to share more if useful! [Link to source / official page if relevant]."

**Competitor attack or negative comparison:**
> [Do NOT engage publicly with competitive comparisons. Respond only if there's factual misinformation. Template: "Hi [name], happy to share what makes [brand] work for our customers — feel free to DM us if you'd like to know more."]

---

### DM templates

**First DM response — complaint:**
> "Hi [name], thanks for reaching out. I'm [name] from the [brand] team. I've seen your [comment/message] and want to make sure we get this sorted for you properly. Could you share [details needed — order number, email, screenshots]? I'll personally make sure this is resolved."

**First DM response — support question:**
> "Hi [name]! Thanks for getting in touch. Happy to help — [answer or next step]. If you need anything else, just reply here. 😊"

**Issue resolved — closing DM:**
> "Glad we could sort that out, [name]! If you ever need anything else, we're here. Have a great [day/weekend]! 🙌"

---

## 5. Moderation Rules

**Content that must be deleted immediately:**
- [ ] Spam (repeated posts, fake giveaways, phishing links)
- [ ] Explicit or NSFW content
- [ ] Personal attacks on other community members
- [ ] Doxxing (sharing personal information about another person)
- [ ] Content that violates platform terms of service
- [ ] Illegal content or illegal product promotion

**Content that should be hidden (not deleted) — review within 4 hours:**
- [ ] Unverified complaints that may require investigation before action
- [ ] Offensive language that isn't targeting a specific person
- [ ] Posts that may be legitimate but contain sensitive information

**Content that should be left (even if negative) — respond and monitor:**
- [ ] Genuine product criticism or negative reviews
- [ ] Complaints that are being actively resolved
- [ ] Controversial opinions that are within the rules of civil debate
- [ ] Negative comparisons to competitors (only respond if misinformation)

**Account-level actions:**

| Action | When to use |
|---|---|
| Comment hide | First instance of borderline content |
| Comment delete | Clear rule violation |
| User block | Repeated harassment / spam after warning |
| Report to platform | Content that may breach platform T&Cs or laws |

**"Never delete to silence" rule:** Never delete a genuine complaint or criticism just because it's uncomfortable. Deleting legitimate negative feedback damages trust more than the original complaint.

---

## 6. Escalation & Crisis Protocol

### Escalation tiers

**Tier 1 — CM handles directly:**
- Routine complaints, questions, thank-yous
- Single negative comment, isolated incident
- Standard off-topic or mildly unhappy comment

**Tier 2 — Escalate to [Marketing Lead / Brand Manager] within 2 hours:**
- Customer with significant public platform (journalist, influencer, known figure)
- Complaint gaining traction (10+ likes on a negative comment)
- Legal or compliance mention ("I'm going to sue", "trading standards", "data breach")
- Media interest — journalist asking questions publicly

**Tier 3 — Escalate to [CMO / Founder / CEO] immediately:**
- Viral negative content (100+ shares / views growing rapidly)
- Allegation of safety issue, injury, or product harm
- Coordinated negative campaign or pile-on
- Any media coverage of a complaint
- Potential crisis — brand reputation at risk

### Crisis response protocol

1. **Stop scheduled posting** — pause all queued content immediately
2. **Assess** — what is the scope? How fast is it spreading? What's the allegation?
3. **Brief leadership** — share screenshot, link, and initial assessment within 30 minutes
4. **Hold public response** — do not post publicly until leadership approves messaging
5. **Draft response options** — prepare 2–3 response options (acknowledge / deny / defer)
6. **Respond or don't respond?** — sometimes silence + private resolution beats a public statement
7. **Monitor** — track mentions every 30 minutes during a crisis
8. **Post-crisis review** — within 48 hours, document what happened and what to do differently

**Out-of-hours escalation contacts:**
- CM Lead: [Name, mobile]
- Marketing Lead: [Name, mobile]
- [Senior escalation]: [Name, mobile]

---

## 7. Tone of Voice in Practice

| Situation | Tone | Example phrase | Avoid |
|---|---|---|---|
| Complimenting content | Warm, genuine, specific | "This genuinely made our day 🙌" | Generic "Thank you!" |
| Answering a product question | Helpful, clear, not jargony | "Great question — here's exactly how it works…" | "Per our FAQs…" |
| Resolving a complaint | Empathetic, responsible, action-oriented | "Really sorry to hear this — let's sort it out." | "This is not our fault" |
| Engaging with light content | Playful, natural, on-brand | [Match the energy of the post — don't be stiff] | Corporate speak |
| Handling criticism | Measured, honest, not defensive | "We hear you and we're working on it." | "As per our T&Cs…" |
| Addressing a crisis | Calm, clear, factual, empathetic | "We're aware of this and are treating it as an urgent priority." | Defensive or dismissive |

**Emoji use:** [Define brand's emoji policy — e.g. "Use emojis sparingly — 1 per response max, only on positive interactions. Never on complaints or sensitive topics."]

---

## 8. Community Health Metrics

Track these weekly:

| Metric | What it measures | Target | Current |
|---|---|---|---|
| Average response time | Speed of community management | [≤ X hours] | [X hours] |
| Response rate | % of comments/DMs replied to | [≥ X%] | [X%] |
| Comment sentiment ratio | Positive : Neutral : Negative split | [≥ X% positive] | [X%] |
| Escalation rate | % of interactions escalated | [≤ X%] | [X%] |
| DM resolution time | Time to resolve a DM complaint | [≤ X hours] | [X hours] |
| Content reports / removals | Volume of content moderated | [Track trend] | [X/week] |

**Weekly CM review (15 min):**
- Review last week's metrics vs target
- Flag any recurring complaint themes (product signals for the team)
- Identify any standout positive interactions worth amplifying
- Note any escalations and how they were handled

---

## 9. Platform-Specific Notes

| Platform | Key nuance | Best practice |
|---|---|---|
| **Instagram** | Comments move fast on Reels; DMs high volume | Prioritise Reel comments; use saved replies for FAQ DMs |
| **LinkedIn** | Professional audience; public replies visible to networks | Keep responses professional; avoid humour on complaints |
| **X / Twitter** | Real-time; pile-ons escalate fast | Monitor with keyword alerts; act on Tier 2 triggers quickly |
| **TikTok** | Comment culture is more casual; meme responses ok | Match platform tone but keep brand voice; don't try too hard |
| **YouTube** | Older comments resurface regularly | Monitor new comments on older videos; set up notifications |
| **Facebook** | Groups + page comments; older audience | More formal tone; monitor group dynamics separately |
| **Discord** | Real-time community; requires moderators | Designate community moderators; publish community rules prominently |

---

## Quality Checks

- [ ] Response templates cover all common scenarios (positive, neutral, complaint, crisis)
- [ ] SLAs are realistic for available team resource
- [ ] Moderation rules clearly distinguish between delete, hide, and leave
- [ ] Escalation tiers are specific — each tier has a named contact and timeframe
- [ ] Tone of voice guidance is concrete enough to write from (examples included)
- [ ] Community health metrics have targets, not just labels
- [ ] Platform-specific nuances are covered for every active channel

## Anti-Patterns

- [ ] Do not delete genuine customer complaints to silence negative feedback — deletion damages trust more than the original complaint and can escalate a minor issue to a viral one
- [ ] Do not respond to competitor comparison comments publicly — engaging publicly with competitive comparisons amplifies them; redirect to DMs or ignore
- [ ] Do not use the same template response for every complaint — copy-paste responses on visible complaints are noticed by other users and undermine brand authenticity
- [ ] Do not leave a crisis without pausing scheduled content — queued posts published during an active brand crisis appear tone-deaf and make the situation worse
- [ ] Do not set response time SLAs that cannot be met with the available team size — an SLA that is consistently missed is worse than no SLA

## Example Trigger Phrases

- "Build a community management playbook for [brand]"
- "Create social media response guidelines for our team"
- "What should our moderation policy be for [platform]?"
- "Write community management templates and escalation procedures"
- "How should we handle negative comments on social media?"
