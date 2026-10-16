---
name: oversharing-audit
description: "Audit what your public online presence quietly reveals — and tighten it — before a stranger, employer, or scammer uses it. Use when asked what does my online presence reveal, audit my privacy, what can people find out about me, or clean up my social media. Produces a review of what's exposed across profiles and posts (location, routines, identifiers, security-question answers), the specific risks each creates, prioritized fixes (settings + what to remove/stop posting), and habits to prevent future leaks — without demanding you delete everything."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/oversharing-audit.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Oversharing Audit

The pieces you post look harmless one at a time — a pet's name, a gym check-in, a birthday, a boarding pass photo — but together they hand strangers your routines, your location, and the answers to your security questions. This audits what your public presence actually reveals, ranks the real risks, and tightens things up without telling you to delete your whole life.

## What This Skill Produces

- **An exposure review** — what's publicly visible across your profiles and posts (location/routines, identifiers, relationships, security-question fodder)
- **The risk per item** — why each matters (stalking, social engineering, account recovery, burglary-while-away, doxxing)
- **Prioritized fixes** — privacy settings to change, and what to remove or stop posting, highest-risk first
- **Safer-sharing habits** — how to keep posting without leaking (delays, cropping, what to never post)
- **A balance** — tightening exposure while keeping the presence you actually want

## Required Inputs

Ask for these if not provided:
- **Your presence** — which platforms/profiles are public, and roughly what you post
- **Your concern** — general privacy, a specific person, safety, job-hunting, or scam risk
- **What's visible** — profile info, location tags, photos, connections (a quick self-search helps)
- **Your goal** — lock down hard, or just cut the risky stuff and keep sharing
- **Sensitive context** — any safety threat (reprioritizes everything)

## Framework: See It As An Outsider, Then Tighten

1. **Look at yourself as a stranger.** Review public profiles and a self-search the way a scammer or stalker would — the aggregate is the risk, not any single post.
2. **Flag the high-risk leaks.** Home/work location and routines, full birth date, security-question answers (pet, school, maiden name), real-time "I'm away" posts, and identifiers in photos (documents, plates, addresses).
3. **Fix settings and content by risk.** Tighten who-can-see settings, remove or lock the riskiest posts/fields first, and prune old exposure.
4. **Build safer habits.** Post trips after you're back, avoid geotagging home, crop out identifiers, and keep security-question answers off public view.
5. **Keep it livable.** The goal is reduced risk, not a deleted account — protect what matters while keeping the presence you want.

## Output Format

### Oversharing audit: [platforms] · concern: [x]

**What's exposed (as an outsider sees it)**
- [item] → risk: [stalking / social-engineering / recovery answers / away-from-home / doxxing].

**Fix first (high risk):** [settings to change · posts/fields to remove or lock].
**Then:** [medium-risk cleanup].
**Safer habits:** [post trips after · no home geotag · crop identifiers · keep security answers private].
**Keep:** [what's fine to leave].

## Quality Checks
- [ ] Reviews the aggregate picture, not just single posts
- [ ] Flags security-question fodder and real-time location/away posts
- [ ] Prioritizes fixes by real-world risk
- [ ] Includes both settings changes and content to remove/stop
- [ ] Gives safer-sharing habits for the future
- [ ] Doesn't demand deleting everything; keeps it balanced

## Anti-Patterns
- **Judging posts in isolation** and missing the aggregate risk.
- **"Just delete everything"** — unrealistic and unnecessary.
- **Ignoring security-question leaks** (pet, school, birthday).
- **Overlooking real-time location / away-from-home posts.**
- **Settings-only** advice with no content or habit changes.

## Example Trigger Phrases
- "What can people find out about me from my social media?"
- "Audit my online presence for privacy risks."
- "Clean up what I'm oversharing online."
- "Does my Instagram give away where I live?"
- "I'm job-hunting — what should I lock down or remove?"
