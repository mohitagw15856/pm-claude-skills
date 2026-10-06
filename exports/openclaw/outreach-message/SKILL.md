---
name: outreach-message
description: "Write cold outreach and networking messages that actually get replies. Use when asked to write a cold message to a recruiter/hiring manager, a LinkedIn connection note, a referral request, or a networking/coffee-chat ask during a job search. Produces short, specific, reply-worthy messages — tuned to the recipient and the ask — with a clear subject and a low-friction call to action."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/outreach-message.html
metadata:
  {
    "openclaw": { "emoji": "🔎" }
  }
---

# Outreach Message Skill

Cold outreach fails when it's long, generic, and all about the sender. The ones that get replies are
short, specific to the recipient, and ask for one easy thing. This skill writes that — a message tuned
to *who* you're contacting and *what* you want (a referral, a chat, a recruiter intro), with a hook
that proves you didn't blast it to 200 people.

## Required Inputs

Ask for these only if they aren't already provided:

- **Who you're messaging** — name, role, and your relationship (cold, 2nd-degree, alum, met-once).
- **The ask** — referral, intro, coffee chat / advice, recruiter follow-up, or reconnect.
- **The context** — the role/company you're targeting, and a genuine, specific reason you're reaching out to *them*.
- **Your background** — one or two lines of relevant credibility.
- **Channel** — LinkedIn connection note (≤300 chars), LinkedIn DM, or email.

## Output Format

### Outreach: [ask] → [recipient]

Produce the message(s) tuned to the channel:

- **Subject line** (for email) — specific and human, not "Quick question" or "Networking."
- **The message** — short (LinkedIn DM ≈4–6 sentences; connection note ≤300 chars):
  - **Hook** — the specific, genuine reason you're contacting *them* (their work, a shared connection, something real). Not "I came across your profile."
  - **Who you are** — one credibility line.
  - **The ask** — one clear, low-friction request ("15 minutes?", "would you be open to referring me?", "any advice on X?").
  - **Easy out** — make "no" graceful; it raises reply rates.
- **A short follow-up** — one polite nudge to send if there's no reply in ~5–7 days.

Offer 2 variants when tone is unclear (warmer vs. more direct), and a **note** on what makes it work.

## Quality Checks

- [ ] Opens with a specific, genuine reason for contacting *this* person — not a template hook
- [ ] Short and skimmable; respects the channel's length norms
- [ ] Exactly one clear, low-friction ask
- [ ] Gives the recipient an easy, graceful way to decline
- [ ] Sounds like a person, with a credibility line — not a résumé dump
- [ ] Includes a polite follow-up for no-reply

## Anti-Patterns

- [ ] Do not write a long message — every extra sentence lowers the reply rate
- [ ] Do not make it about you — lead with why *them*, then a tight credibility line
- [ ] Do not use a generic hook ("I came across your profile") — it signals a mass blast
- [ ] Do not stack multiple asks — one easy request, or none will be answered
- [ ] Do not be pushy in the follow-up — one graceful nudge, then stop

## Based On

Cold-outreach / networking practice — specificity, brevity, a single low-friction ask, and graceful follow-up.

## Example Trigger Phrases

- "Write a cold message to a recruiter."
- "Write a LinkedIn connection note."
- "Ask for a referral."
- "Ask for a coffee chat during my job search."
