---
name: legal-brief
description: "Draft a structured legal brief, case summary, or legal argument outline. Use when asked to write a legal brief, case note, legal memo, argument outline, or position paper. Produces a structured document using IRAC format (Issue, Rule, Application, Conclusion)."
---

# Legal Brief Skill

This skill drafts structured legal briefs and memos using IRAC format — the standard structure for legal writing.

## Required Inputs
- **Brief type** (legal memo / case summary / argument outline / position paper / letter before action)
- **Legal issue or question**
- **Jurisdiction** (England & Wales / US / EU / Other)
- **Relevant facts**
- **Relevant law or cases** (if known — otherwise flagged as [RESEARCH NEEDED])
- **Audience** (internal memo / court submission / client letter)

## Output Structure

### Header
- **To:** [Recipient]
- **From:** [Author]
- **Date:** [Date]
- **Re:** [Matter reference]
- **Confidential:** Subject to legal professional privilege

### Issue(s)
One sentence per legal question:
- Issue 1: Whether X constitutes Y under [law]

### Brief Answer
One sentence per issue — conclusion upfront before analysis.

### Facts
Concise relevant facts only. Flag disputed facts.

### Law (Rule)
- Relevant statute, regulation, or case law
- How the rule has been interpreted in key cases
- Flag [RESEARCH NEEDED] where law is not provided

### Application
- Arguments in favour
- Counter-arguments and responses
- Areas of uncertainty flagged explicitly

### Conclusion
- Clear answer to each issue
- Overall recommendation
- Suggested next steps

### Caveats
What this memo does not cover. What additional research would change the analysis.

---

WARNING: This draft requires review by a qualified legal professional. It does not constitute legal advice.

## Quality Checks

- [ ] Issue is stated as a specific legal question (not a general topic)
- [ ] Brief answer appears before the analysis (conclusion upfront)
- [ ] Disputed facts are explicitly flagged
- [ ] Areas of legal uncertainty are noted (not hidden in confident language)
- [ ] Caveats section lists what would change the analysis
- [ ] Disclaimer is included

## Example Trigger Phrases
- "Draft a legal memo on [issue]"
- "Write a legal brief arguing [position]"
- "Summarise the legal position on [topic]"
- "Write a letter before action for [situation]"
