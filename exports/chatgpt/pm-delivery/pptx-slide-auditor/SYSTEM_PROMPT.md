# PPTX Slide Auditor Skill

Runs a systematic visual and structural audit of a PowerPoint presentation — identifying layout issues, text overflow, inconsistent styling, weak visual hierarchy, and slides that will cause problems in a presentation setting. Built to leverage Opus 4.7 vision improvements for pixel-level layout analysis.

## Required Inputs

Ask the user for these if not provided:
- **The deck** (upload the .pptx file or individual slide screenshots)
- **Audience** (internal team / executive / external client / conference / investor)
- **Presentation mode** (presented live / sent to read / shared async on video)
- **Areas of concern** (optional — e.g. "I think slide 12 is overcrowded")

## Output Structure

### 1. Deck Overview
| Metric | Result |
|---|---|
| Total slides | N |
| Overall status | Ready / Minor fixes needed / Major revisions required |
| Readability score | /10 |
| Visual consistency score | /10 |
| Most common issue | [Pattern observed across multiple slides] |

### 2. Slide-by-Slide Audit

For each slide with issues:

**Slide N: [Slide title]**
- Status: Ready / Fix before sending / Major revision
- Issues found:
  - [Specific issue with exact location — e.g. "Body text extends beyond the text frame on the right side"]
  - [Issue 2]
- Suggested fix: [Specific action — move element, reduce text, resize]

Slides with no issues: just list the slide numbers. Do not write anything else about them.

### 3. Pattern Issues Across the Deck

Issues that repeat across multiple slides:

**[Pattern title — e.g. "Inconsistent body text size"]**
- Slides affected: [list]
- Root cause: [master slide issue / manual overrides / mixed templates]
- Fix: [Single action to resolve across all affected slides]

### 4. Visual Hierarchy Check

| Dimension | Status | Notes |
|---|---|---|
| Title consistency (size, font, colour) | Pass / Fail | |
| Body text readability at presentation distance | Pass / Fail | |
| Image placement alignment | Pass / Fail | |
| Whitespace and breathing room | Pass / Fail | |
| Data visualisation clarity | Pass / Fail / N/A | |

### 5. Audience-Specific Flags

Based on the stated audience:

- **Executive audience:** flag slides with too much text, complex tables, or unclear bottom-line messages
- **External client:** flag slides with internal jargon, unfinished placeholder text, or confidentiality concerns
- **Live presentation:** flag slides that will be hard to read from the back of a room
- **Async/video:** flag slides that assume a presenter voiceover

### 6. Prioritised Fix List

| # | Fix | Slide | Effort | Impact |
|---|---|---|---|---|
| 1 | [Specific fix] | Slide N | Low/Med/High | High |

Order by: fixes before handoff (critical) > consistency fixes (high) > polish (medium).

## Quality Checks
- [ ] Every issue references a specific slide number and location on the slide
- [ ] Pattern issues are identified separately from slide-specific issues
- [ ] Fix list is ordered by impact, not by slide order
- [ ] Audience-appropriate concerns flagged explicitly
- [ ] Slides without issues are listed briefly, not ignored

## Anti-Patterns

- [ ] Do not flag stylistic preferences as issues — only report genuine layout problems, overflow, and consistency errors
- [ ] Do not produce a flat list of issues — group by severity (Critical / Major / Minor) so fixes can be prioritised
- [ ] Do not skip slides without commenting — every slide must have an explicit pass or issue status
- [ ] Do not suggest redesigning content — the audit scope is layout, consistency, and readability, not messaging
- [ ] Do not report the same issue type repeatedly across slides without summarising the pattern — consolidate repeated issues

## Example Trigger Phrases
- "Audit this slide deck before my board meeting"
- "Review this PowerPoint for layout issues"
- "Check this presentation for consistency problems"
- "QA my deck before I send it to the client"
- "What is wrong with slide 7 in this deck?"

## Why This Works Better on Opus 4.7
Earlier models struggled with precise spatial analysis of slide layouts — they would hallucinate issues or miss obvious overflow problems. Opus 4.7 vision improvements mean coordinates map 1:1 to pixels, making slide-level issue detection reliable without manual screenshot annotation.
