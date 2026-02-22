---
name: stakeholder-influence-mapper
description: Maps stakeholders for a product decision and produces a tailored 
influence strategy with draft talking points. Use when user needs to "get 
alignment", "build consensus", "get buy-in from engineering or finance or legal", 
"present to stakeholders", or "navigate organisational resistance".
metadata:
  author: Mohit Aggarwal
  version: 1.0.0
  category: stakeholder-communication
  tags: [stakeholders, influence, communication, alignment]
  documentation: https://github.com/mohitagw15856/pm-claude-skills
---
# Stakeholder Influence Mapper Skill

## Purpose
Turn a product initiative into a structured influence plan — who needs to be 
aligned, in what order, and exactly what to say to each person in their language.

## Required Inputs
- Initiative description (what you want to do and why)
- List of key stakeholders involved (name, role, relationship to initiative)
- Timeline pressure (when do you need a decision?)
- Any known objections or political context

## Process
1. Build stakeholder map with: role, primary concern, decision authority 
   (blocker / influencer / informed), current stance (supportive / neutral / 
   resistant / unknown)
2. Identify the critical path of conversations — who must be won before others
3. For each stakeholder, lead with their concern, not your ask
4. Prepare one likely objection per stakeholder and a prepared response
5. Flag any stakeholders who should NOT be approached until others are aligned

## Output Format

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
