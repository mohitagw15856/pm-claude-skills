---
name: stakeholder-influence-mapper
description: "Map stakeholders for a product decision and produce a tailored influence strategy with talking points. Use when asked to get alignment, build consensus, get buy-in from engineering or finance or legal, navigate organisational resistance, or plan stakeholder conversations for a major initiative. Produces a stakeholder map, recommended conversation sequence, and tailored talking points per stakeholder."
---

# Stakeholder Influence Mapper Skill

Turn a product initiative into a structured influence plan — who needs to be aligned, in what order, and exactly what to say to each person in their language.

## Required Inputs

Ask the user for these if not provided:
- **Initiative description** (what you want to do and why)
- **List of key stakeholders** (name, role, relationship to initiative)
- **Timeline pressure** (when do you need a decision?)
- **Any known objections or political context** (what you're already aware of)

## Process
1. Build stakeholder map with: role, primary concern, decision authority (blocker / influencer / informed), current stance (supportive / neutral / resistant / unknown)
2. Identify the critical path of conversations — who must be won before others
3. For each stakeholder, lead with their concern, not your ask
4. Prepare one likely objection per stakeholder and a prepared response
5. Flag any stakeholders who should NOT be approached until others are aligned
6. **Validate** — Confirm every "blocker" stakeholder has a specific tactic (not just "have a conversation"), and that the sequence accounts for political dependencies

## Output Structure

### Stakeholder Map: [Initiative Name]

| Stakeholder | Role | Primary Concern | Authority | Current Stance |
|-------------|------|-----------------|-----------|----------------|
| [name] | [role] | [concern] | [type] | [stance] |

### Recommended Conversation Sequence
1. **[Name first]** — because [reason they unlock others]
2. **[Name second]** — once [first] is aligned
[continue...]

### Talking Points by Stakeholder

#### [Stakeholder Name]
**Lead with:** [Their concern, not your feature]
**Your ask:** [One specific thing you need from them]
**Likely objection:** [What they'll push back on]
**Prepared response:** [How to address it without being defensive]
**What success looks like:** [What alignment from them looks like]

## Notes
- Never send the same message to all stakeholders — calibrate every time
- Engineering leads want technical feasibility acknowledged first
- Finance stakeholders want ROI framing before anything else
- Legal/compliance stakeholders want risk mitigation addressed upfront

## Quality Checks

- [ ] Every blocker has a specific tactic (not just "have a chat")
- [ ] Conversation sequence accounts for political dependencies
- [ ] Each stakeholder's talking points lead with their concern, not your agenda
- [ ] At least one "do not approach until X is aligned" flag is considered
- [ ] The ask from each stakeholder is a single, specific thing (not a vague "support")
