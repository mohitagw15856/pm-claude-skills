---
name: referral-request
description: "Write a short message asking someone at a target company for a referral or a conversation, sized to how well the person knows them, with an easy way to say no. Use when asked how do I ask for a referral, message someone at Google about a job, ask a former colleague to refer me, or write a LinkedIn message to an employee. Produces the message for the right channel and relationship strength, a ready-to-forward blurb the referrer can paste, and a single follow-up. For general networking, see networking-outreach."
version: 1.0.0
---

# Referral Request

A referral often beats any CV improvement, and the ask is small if it is easy to say yes to. This skill writes a short message sized to the relationship, attaches a blurb the referrer can forward without rewriting, and makes saying no painless.

Part of the pm-cv bundle. For broader networking messages, see `networking-outreach`.

## What This Skill Produces

- **The message**, for the channel (email, LinkedIn, WeChat, text) and the relationship
- **A forwardable blurb**: three lines the referrer can paste into an internal referral form
- **One follow-up**, for a week later

## Required Inputs

Ask for these if not provided:
- **Who the person is** and how well the sender knows them: close, former colleague, alumni or loose connection, or stranger
- **The role**, with the link or job ID
- **The sender's one-line fit**: why they are a strong candidate
- **The channel**

## Framework

Size the ask to the relationship:
- **Close or former colleague**: ask for the referral directly.
- **Alumni or loose connection**: ask for fifteen minutes about the team first; the referral comes after.
- **Stranger**: ask one specific question about the role or team. Do not ask for a referral in the first message.

Every message:
1. One line on the connection ("We worked together on the payments launch at Acme").
2. The role, with the link or ID.
3. One line on fit, with a fact.
4. The ask, sized as above.
5. An easy out ("No worries at all if it's not a good time").

Under 120 words. No CV attached unless it is a close contact; offer it instead.

## Output Format

### Referral request: [contact], [company], [role]
**1. Message** ([channel], [relationship])
**2. Forwardable blurb** (three lines: who, fit, link)
**3. Follow-up** (one, a week later, two lines)

## Quality Checks
- [ ] The ask matches the relationship strength
- [ ] Under 120 words
- [ ] The role link or ID is included
- [ ] The easy out is present
- [ ] The blurb can be pasted without editing

## Anti-Patterns
- **Asking a stranger for a referral** in the first message.
- **Long life stories.** The reader decides in a few seconds.
- **Attaching a CV unasked** to a loose connection.
- **More than one follow-up.**

## Example Trigger Phrases
- "Help me ask a former colleague at Stripe for a referral."
- "Write a LinkedIn message to someone on the team I'm applying to."
- "How do I ask my university alumni at Tencent for a referral?"
- "帮我写一条内推请求的微信消息。"
