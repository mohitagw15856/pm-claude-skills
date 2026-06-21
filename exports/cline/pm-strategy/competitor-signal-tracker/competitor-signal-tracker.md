# Competitor Signal Tracker Skill

Turn scattered competitor information into structured strategic intelligence — not just "what they did" but "what it means for us."

## Required Inputs

Ask the user for these if not provided:
- **Competitor name(s)** and the signals/updates to analyse
- **Your product's current roadmap or strategic priorities** (to assess relevance)
- **Time period** the signals cover (this week, this month, etc.)

## Signal Categories to Track
- **Product signals:** New features, removals, UX changes, beta programmes
- **Pricing signals:** Changes to tiers, free limits, enterprise terms
- **Hiring signals:** Job postings that reveal strategic bets (e.g., hiring ML engineers = AI investment)
- **Partnership signals:** Integrations, acquisitions, ecosystem moves
- **Messaging signals:** Changes in positioning, target audience, value proposition

## Process
1. For each competitor update provided, categorise the signal type
2. Assess: Is this reactive (responding to market) or proactive (setting direction)?
3. Rate strategic threat level: High / Medium / Low / Watch
4. Connect to your roadmap: does this accelerate, validate, or challenge any of your bets?
5. Recommend a response: Accelerate existing initiative / Deprioritise / Monitor / Investigate further
6. **Validate** — Confirm every High threat has a specific recommended response with an owner. "Monitor" is not an acceptable response for High-rated threats.

## Output Structure

### Competitive Intelligence Report — [Date]

#### [Competitor Name]
**Signal:** [What they did]
**Signal Type:** [Product / Pricing / Hiring / Partnership / Messaging]
**Reactive or Proactive:** [assessment]
**Threat Level:** [High / Medium / Low / Watch]
**Implication for Us:** [Specific connection to our roadmap or strategy]
**Recommended Response:** [Action + owner + timeline]

#### Strategic Summary
[2-3 sentences on the overall competitive landscape shift this period]

## Anti-Patterns

- [ ] Do not rate a signal as High threat without explaining the specific roadmap item or customer segment it threatens — unjustified threat ratings lose credibility over time
- [ ] Do not treat a hiring signal as definitive proof of a strategic bet — hiring signals require corroboration from product, messaging, or pricing signals before acting on them
- [ ] Do not conflate a competitor's announcement with a competitor's shipped capability — press releases and blog posts often describe aspirations, not production features
- [ ] Do not recommend "accelerate existing initiative" for every High signal — sometimes the right response is to differentiate harder in an adjacent area rather than race the competitor directly

## Quality Checks

- [ ] Every signal is categorised (not just described)
- [ ] Threat level is justified — not assigned arbitrarily
- [ ] High-threat signals have specific recommended responses (not "monitor")
- [ ] Implications connect to specific roadmap items or strategic bets
- [ ] Strategic summary gives a landscape-level view, not just a list of individual signals
