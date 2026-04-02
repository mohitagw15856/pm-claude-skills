---
name: content-calendar
description: "Generate a structured content calendar for any brand, product, or creator. Use when asked for a content plan, editorial calendar, social media schedule, or weekly/monthly content strategy. Produces a calendar with topics, formats, channels, and copy hooks."
---

# Content Calendar Skill

This skill generates a structured content calendar from brand inputs. It produces ready-to-use calendar entries with topics, formats, channels, and opening hooks — usable for social media, blogs, newsletters, or multi-channel campaigns.

## Required Inputs

Ask the user for these if not provided:
- **Brand or product name**
- **Target audience** (who are you trying to reach?)
- **Primary content goal** (awareness / lead gen / retention / thought leadership)
- **Channels** (e.g. LinkedIn, Instagram, newsletter, blog, X/Twitter)
- **Cadence** (daily / 3x per week / weekly / monthly)
- **Timeframe** (e.g. 4 weeks, Q2)
- **Brand pillars or themes** (optional — if not provided, derive 3 from the product description)

## Output Structure

### 1. Content Pillars (if not provided)

Derive 3–4 content pillars from the brand/product description. Each pillar = a recurring theme that anchors multiple posts. Label each one clearly (e.g. "Pillar 1: Industry Education", "Pillar 2: Product Stories").

### 2. Calendar Table

Produce a weekly table for each week requested. Format:

| Date | Pillar | Topic | Format | Channel | Opening Hook |
|---|---|---|---|---|---|
| Mon 7 Apr | Education | [Topic title] | Carousel / Article / Short video / Thread | LinkedIn | [First sentence or headline of the post] |

Rules:
- Rotate through all pillars across the week — don't stack the same pillar on consecutive days
- Match format to channel norms (e.g. carousels for Instagram, long-form for LinkedIn, threads for X)
- Opening hooks must be specific and scroll-stopping — no generic openers like "Did you know..."
- Flag 1–2 posts per week as "High Priority" — these are the cornerstone pieces worth boosting or repurposing

### 3. Repurposing Map

For each "High Priority" post, add one repurposing suggestion — e.g. "Turn this LinkedIn article into a newsletter section" or "Clip this video for an Instagram Reel."

## Quality Checks

- [ ] Every week has balanced pillar distribution
- [ ] No two consecutive posts have the same format on the same channel
- [ ] Opening hooks are specific (no generic openers)
- [ ] Formats match platform norms
- [ ] Repurposing map covers all High Priority posts

## Example Trigger Phrases

- "Build me a 4-week content calendar for [brand]"
- "Create a social media plan for [product launch]"
- "Give me a monthly editorial calendar for my newsletter"
- "Plan my LinkedIn content for the next month"
