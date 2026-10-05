---
name: office-hours-design
description: "Replace ad-hoc interruptions with office hours that actually get used — the slot design (cadence, length, format), the routing rules that tell people what goes there vs. what shouldn't wait, and the empty-hours and overflow failure modes handled in advance. Use when asked set up office hours, I'm interrupted constantly but want to stay accessible, my office hours sit empty, or design expert time for the team. Produces the slot design, the routing card, the facilitation format, and the tuning rules."
---

# Office Hours Design Skill

Office hours are a trade: the expert's interruptions get batched into scheduled availability, and everyone else gets *guaranteed access* instead of guilty pinging. The trade fails in two ways — hours nobody attends (usually a routing failure: people don't know what belongs there, or the barrier to showing up beats the barrier to pinging) and hours that overflow into triage. Both are design problems: the slot fits the actual demand pattern, the routing card tells people exactly what goes where (and what should *never* wait for Thursday), and the format makes showing up cheaper than interrupting.

## What This Skill Produces

- **The slot design** — cadence, length, and format (drop-in vs. bookable segments) matched to demand
- **The routing card** — goes-to-office-hours / ask-in-channel / never-waits — the three-way sort, postable
- **The session format** — the queue mechanics, the timebox-per-person, and the everyone-learns option (public answers)
- **The tuning rules** — the empty-hours and overflow diagnoses, and the adjustments each triggers

## Required Inputs

Ask for these if not provided:
- **The interruption pattern** — what people currently come for, how often, how urgent-really; the design fits the demand that exists, and a week's tally beats impressions
- **The expert's goals** — protecting maker time? Scaling their knowledge? Both change the format (protection wants strict routing; scaling wants public answers and recorded sessions)
- **The audience's alternatives** — what people do when the expert is unavailable (block? guess? ship wrong?) — the never-waits line is drawn by the cost of blocking
- **The platform** — bookable calendar slots, a drop-in call link, a channel thread — the mechanics use real tools

## Framework: The Design Rules

1. **Fit the slot to the demand tally:** count a normal week's interruptions — volume and shape pick the design (a dozen small questions → twice-weekly 45-minute drop-ins; four deep consults → bookable 25-minute segments with a topic-required field). Designing from the ideal calendar instead of the real demand is why hours sit empty while pings continue.
2. **The routing card does the enforcement:** three lines, posted where people ask — *Office hours:* design reviews, "am I on the right track," non-blocking questions. *Channel (async, ~24h):* quick factuals. *Now, always:* production down, blocked-today, anything a delay makes expensive. The never-waits line matters most — office hours that swallow emergencies teach people to bypass the whole system, correctly.
3. **Make attending cheaper than pinging:** no agenda required, camera-optional, "bring the half-formed thing" explicitly welcomed — the psychological price of showing up must undercut the guilt-ping, or economics routes around the design. The redirect script keeps it kind: "good one for Thursday's hours — grab the 2:10 slot" (with the never-waits check first).
4. **Public-by-default answers scale the expert:** questions answered in the open session (others listening, notes posted after) convert one answer into team knowledge — the [faq-builder](../faq-builder/SKILL.md) capture loop feeds directly from office-hours notes. Sensitive topics get the private segment; everything else compounds.
5. **Tune by failure mode:** empty hours → check routing awareness (do people know?), attendance friction (is booking annoying?), and slot timing (is it during everyone's crunch?) — usually fixable; genuinely low demand → shrink the slot, don't perform availability. Overflow → the demand tally was wrong: add a slot, tighten per-person timeboxes, or split audiences. Review at week 4 and week 12, then quarterly.

## Output Format

# Office Hours: [expert/team] — [cadence × length, format]

## The Slot Design
[Cadence/length/format + the demand-tally reasoning · booking mechanics on (platform)]

## The Routing Card (post this)
**Office hours:** … · **Channel (~24h):** … · **Never waits:** … 
[The redirect script, verbatim]

## Session Format
[Queue mechanics · per-person timebox · public-by-default + the private segment · notes → the FAQ loop]

## Tuning
[Week-4 and week-12 checks · the empty diagnosis tree · the overflow adjustments]

## Quality Checks

- [ ] The slot design cites a real demand tally
- [ ] The routing card's never-waits line is explicit and generous
- [ ] Attending is designed to be cheaper than interrupting
- [ ] Answers default to public with a capture route
- [ ] Tuning checkpoints are calendared with their diagnosis trees

## Anti-Patterns

- [ ] Do not design from the ideal calendar — the demand tally is the ground truth
- [ ] Do not let office hours absorb emergencies — the never-waits line protects the system's credibility
- [ ] Do not require polished questions — the half-formed thing is exactly what office hours are for
- [ ] Do not answer everything privately — private answers scale linearly; public ones compound
- [ ] Do not perform empty availability — genuinely low demand means a smaller slot, honestly held

## Example Trigger Phrases

- "Set up office hours."
- "I'm interrupted constantly but want to stay accessible."
- "My office hours sit empty."
- "Design expert time for the team."
