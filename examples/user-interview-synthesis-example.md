# Example: user-interview-synthesis

## What this skill does

Synthesises interview transcripts into themed research findings: each theme with supporting quotes from multiple participants, a product implication, low-confidence signals kept separate, and recommended next steps.

## How to trigger it

### Example 1: synthesis from raw transcripts

**You say:**
> "Synthesise these 8 interview transcripts [pasted]. Research questions: why do trial users stop before inviting their team, and what would make them upgrade?"

**Claude produces (excerpt):**

### Research Synthesis: Trial Drop-off Interviews
**Participants:** 8 (5 churned trials, 3 converted)
**Research Questions:** why trials stall pre-invite; upgrade triggers

#### Theme 1: Inviting a teammate feels like a recommendation, not a step
- Summary: 6 of 8 participants treated the invite as personally vouching for the product. They wanted proof it worked before "putting my name on it", so the invite step came after the value moment, not before, while our onboarding assumes the reverse.
- Supporting quotes:
  - "If I invite my manager and it's half-baked, that's on me." (P2, churned)
  - "I wanted one finished report first. Then I'd share." (P5, converted)
  - "Inviting people to an empty workspace felt embarrassing." (P7, churned)
- Implication: move the invite prompt to after first completed artefact, not day 1.

#### Theme 2: "Upgrade" is a budget conversation they don't own
- Summary: 4 of 8 cannot expense software without a procurement step; the upgrade wall ended their evaluation rather than converting it.
- Implication: an extend-trial-for-a-business-case path would catch these rather than losing them.

#### Low-Confidence Signals (1-2 participants only)
- Two participants mentioned a competitor's Slack integration unprompted; worth one question in the next round, not a roadmap item.

#### Recommended Next Steps
1. Reorder onboarding: artefact first, invite second; A/B test against current flow.
2. Interview 5 more participants in procurement-gated companies to size theme 2.

### Example 2: pressure-testing a hoped-for conclusion

**You say:**
> "My head of product thinks these interviews prove we need AI features. Do they?"

**Claude produces (excerpt):**

**What the transcripts support:** 2 of 8 participants mentioned AI, one prompted by the interviewer's question (P3's mention follows "would AI help here?", which contaminates it). That is a low-confidence signal, not a theme.

**What they actually show:** the dominant pattern (6 of 8) is the invite-timing problem, which no participant called "AI" and no roadmap item currently addresses. If the deck says "users want AI", it is reporting the question, not the answer.

## Tips for best results

- Paste full transcripts, not your notes; quotes are selected from what participants said, not what you remembered.
- State the research questions; themes are judged against them, not against the roadmap.
- Keep churned and converted participants labelled; the contrast between them is often the finding.

## Related skills

- `user-research-synthesis` for mixed sources (surveys, tickets, feedback) beyond interviews
- `discovery-interview-guide` to design the next round of interviews the synthesis recommends
