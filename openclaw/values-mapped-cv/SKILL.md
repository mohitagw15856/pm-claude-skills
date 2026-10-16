---
name: values-mapped-cv
description: "Map a person's achievements to a target company's published values or leadership principles, so the CV leads with the evidence that company says it rewards. Use when asked to align my CV with Amazon's leadership principles, match my experience to this company's values, or which of my achievements fit this company's culture. Produces a value-by-value evidence map with strength ratings, the reordered achievement list for the CV, and the values with no evidence yet. Uses only the company's public pages, cited with a date."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/values-mapped-cv.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Values-Mapped CV

Many companies publish what they reward: leadership principles, values, a culture page. Screeners and interviewers are often trained on exactly that list. This skill maps the person's real achievements to it, so the CV leads with the right evidence. It never turns values into adjectives.

Part of the pm-cv bundle. Used by `company-tailored-cv`.

## What This Skill Produces

- **The values list**, quoted from the company's public page, with the link and the date checked
- **An evidence map**: each value, the achievements that show it, and how strongly
- **The achievement order** for the CV, chosen by this map and the job ad together
- **Gaps**: values with no evidence, and whether that matters for this role

## Required Inputs

Ask for these if not provided:
- **The company**, and the page where its values are published, or permission to look them up
- **The person's achievements**: a `career-inventory` file or a CV
- **The job ad**, because the role's must-haves still come first

## Framework

1. **Find the published list.** Use the company's own careers or about pages. If there is none, say so and stop: do not invent values from news articles or reviews.
2. **Quote it exactly** and record the date. Values change.
3. **Map.** For each achievement, which values does it show? Rate each link:
   - **Direct**: the achievement is a clear example a stranger would recognise
   - **Supporting**: it shows the value in part
   - **Stretch**: only with explanation. Do not use on the CV; keep for interview
4. **Choose.** Lead each recent role with the achievement that answers both a job-ad must-have and a value directly.
5. **Write.** The CV shows the value through the result. The value's name does not appear as a self-description.

## Output Format

### Values map: [company], [role]
**Source**: [link], checked [date]

**1. Evidence map** | Value (quoted) | Achievement | Strength | Use on CV? |

**2. Achievement order for the CV**, per role, with the reason for the first bullet

**3. Values without evidence** | Value | Matters for this role? | What would show it |

**4. Interview prompts**: the stretch links, as stories to prepare

## Quality Checks
- [ ] The values are quoted from the company's own page, with link and date
- [ ] Every mapped achievement came from the person
- [ ] No value appears on the CV as an adjective about the person
- [ ] Job-ad must-haves still lead where they conflict with values

## Anti-Patterns
- **Inventing values** from reviews, news or memory.
- **Adjective CVs.** "Customer-obsessed, bias for action" proves nothing and reads as copied.
- **Forcing every value.** Three strong links beat twelve weak ones.
- **Ignoring the job.** Values decide the order, not the content. The role's requirements come first.

## Example Trigger Phrases
- "Align my CV with Amazon's leadership principles."
- "Which of my achievements fit Atlassian's values?"
- "Map my experience to this company's culture page."
- "按照这家公司的价值观调整我的简历。"
