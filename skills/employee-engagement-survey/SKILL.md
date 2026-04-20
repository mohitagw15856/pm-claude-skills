---
name: employee-engagement-survey
description: "Design an employee engagement survey and analyse results. Use when asked to create an employee survey, engagement questionnaire, pulse survey, or eNPS survey. Also use when asked to analyse survey results. Produces a complete survey with questions, rating scales, and an analysis framework."
---

# Employee Engagement Survey Skill

Designs complete employee engagement surveys and provides a framework for analysing and acting on results.

## Mode Detection
- User provides survey results -> Analysis mode
- User wants to create a survey -> Design mode

---

## Design Mode

### Required Inputs
- Survey type (annual / quarterly pulse / post-onboarding / exit / specific topic)
- Company size and stage
- Key areas of concern (optional)
- Anonymity approach
- Length target (short: 5-10 / standard: 15-25 / comprehensive: 30+)

### Opening Statement (always include)
"This survey is anonymous. Your responses help us understand what is working and what to improve. Results will be shared with [who] and we will communicate actions taken by [date]."

### Core Questions

**Overall Engagement**
1. On a scale of 0-10, how likely are you to recommend [Company] as a great place to work? (eNPS)
2. I feel proud to work at [Company]. [1-5]
3. I intend to still be working here in 12 months. [1-5]

**Role and Clarity**
4. I understand how my work contributes to company goals. [1-5]
5. I have the tools and resources I need to do my job. [1-5]
6. My workload is manageable. [1-5]

**Manager and Team**
7. My manager gives useful feedback. [1-5]
8. My manager cares about my development. [1-5]
9. I feel part of a team that works well together. [1-5]

**Culture and Belonging**
10. I feel I can be myself at work. [1-5]
11. People treat each other with respect. [1-5]
12. [Company] lives by its stated values. [1-5]

**Growth and Recognition**
13. I have opportunities to grow and develop. [1-5]
14. My contributions are recognised. [1-5]
15. I have had a meaningful career conversation in the last 6 months. [Yes/No]

**Open questions (always include)**
- What is one thing [Company] should start doing?
- What is one thing [Company] should stop doing?
- Anything else to share?

---

## Analysis Mode

### Analysis Output

**1. Headline Scores**
| Metric | Score | Benchmark | Trend |
|---|---|---|---|
| eNPS | [-100 to +100] | Industry avg | vs last survey |

eNPS: Below 0 = Concerning / 0-30 = Good / 30-70 = Great / 70+ = Excellent

**2. Strengths** — Top scoring areas with evidence.

**3. Improvement Areas** — 3 lowest scoring areas with verbatim comment themes.

**4. Action Planning Template**
| Improvement area | Action | Owner | Timeline | Measure |
|---|---|---|---|---|

**5. Communication Template** — Draft message to share results with employees.

## Quality Checks

- [ ] Survey includes anonymity statement at the start
- [ ] eNPS question (0-10 recommend scale) is included in all survey types
- [ ] Open-ended questions are included (not just Likert scales)
- [ ] Analysis includes a specific action planning template (not just observations)
- [ ] Results communication template commits to sharing back with employees by a specific date

## Example Trigger Phrases
- "Create an employee engagement survey for our team"
- "Design a pulse survey for [topic]"
- "Analyse these engagement survey results: [paste]"
