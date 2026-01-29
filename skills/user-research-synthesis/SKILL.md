---
name: user-research-synthesis
description: Analyze and synthesize user research findings following PM best practices. Use when the user provides user research data, interview transcripts, survey results, or user feedback that needs to be analyzed, synthesized, or summarized into insights and recommendations.
---

# User Research Synthesis Skill

This skill helps analyze user research data and transform it into actionable insights following a structured methodology.

## Synthesis Framework

### 1. Data Collection Overview
- **Research Type**: Interviews, surveys, usability tests, etc.
- **Participant Profile**: Demographics, segments, sample size
- **Research Questions**: What we sought to learn
- **Methodology**: How data was collected

### 2. Key Themes Identification

Organize findings into themes using this structure:

**Theme Name**
- **Description**: What this theme represents
- **Prevalence**: How many participants mentioned this (e.g., "8 out of 12 participants")
- **Supporting Quotes**: 2-3 representative quotes
- **Implication**: What this means for our product

Aim for 4-8 major themes per research effort.

### 3. Pain Points Analysis

For each identified pain point:
- **Pain Point**: Clear description
- **Severity**: High/Medium/Low (based on impact and frequency)
- **Current Workaround**: How users deal with it today
- **Evidence**: Specific examples from research

### 4. Feature Requests

Categorize requests:
- **Must-Have**: Critical needs blocking user success
- **High Value**: Would significantly improve experience
- **Nice-to-Have**: Incremental improvements

For each request:
- **Request**: What users asked for
- **Frequency**: How often it came up
- **User Quote**: Representative example
- **Underlying Need**: Why they want this (dig deeper than surface request)

### 5. User Workflow Insights

Document actual workflows observed:
- **Current State**: How users accomplish tasks today
- **Pain Points**: Where they struggle
- **Ideal State**: What they wish they could do
- **Opportunities**: Where we can add value

### 6. Segmentation Insights

If research reveals distinct user segments:
- **Segment Name**: Descriptive label
- **Characteristics**: What defines this segment
- **Unique Needs**: How their needs differ
- **Size/Importance**: Relative weight for prioritization

### 7. Competitive Insights

If users mentioned competitors or alternatives:
- **Competitor/Alternative**: What they use
- **Why They Use It**: What it does well
- **Gaps**: What it doesn't do
- **Switching Barriers**: Why they don't switch fully

### 8. Recommendations

Prioritized recommendations based on insights:

**High Priority**
- Recommendation with supporting evidence
- Expected impact

**Medium Priority**
- Recommendation with supporting evidence
- Expected impact

**Low Priority / Future Consideration**
- Recommendation with supporting evidence
- Expected impact

### 9. Open Questions

Research gaps identified:
- What we still need to understand
- Suggested follow-up research
- Uncertainties requiring validation

## Analysis Guidelines

**When synthesizing interviews:**
- Look for patterns across multiple participants
- Note both what users say AND what they do
- Pay attention to emotional reactions
- Identify jobs-to-be-done, not just feature requests

**When analyzing quotes:**
- Use verbatim quotes in "quotation marks"
- Attribute quotes: [Participant ID, Role, Context]
- Select quotes that illustrate patterns, not outliers
- Include both positive and negative feedback

**When identifying themes:**
- Use descriptive names, not generic labels
- Provide evidence for each theme
- Quantify when possible ("7 out of 10 users...")
- Connect themes to business objectives

## Quality Standards

✅ **Good Synthesis:**
- Identifies patterns, not just individual responses
- Connects insights to product decisions
- Includes supporting evidence for each claim
- Separates observations from interpretations
- Prioritizes findings by impact

❌ **Poor Synthesis:**
- Lists every individual comment
- Lacks evidence or examples
- Makes unsupported leaps
- Focuses on solutions before understanding problems
- Ignores contradictory data

## Example Theme

```
**Theme: Information Overload During Onboarding**

**Description**: Users consistently expressed feeling overwhelmed by the amount of information presented during initial setup, leading to incomplete onboarding and delayed time-to-value.

**Prevalence**: 9 out of 12 participants mentioned this issue unprompted

**Supporting Quotes**:
- "I just wanted to get started, but it felt like I needed to read a manual first" [P3, Marketing Manager]
- "By the third screen of instructions, I started clicking 'Next' without reading" [P7, Sales Rep]
- "I wish there was a 'quick start' option for people like me who just want to try it" [P11, Product Designer]

**Implication**: Our current onboarding flow prioritizes completeness over engagement. We should consider a progressive disclosure approach where users can start using the product quickly and learn advanced features contextually.

**Recommended Action**: 
- Design a "Quick Start" path that gets users to first value in <3 minutes
- Move advanced configuration to contextual help within the app
- Test with 5-10 new users before full rollout
- Expected impact: +20-30% activation rate improvement
```

## Template Output Structure

When synthesizing research, use this structure:

```markdown
# User Research Synthesis: [Research Topic]

## Research Overview
- **Date**: [Date range]
- **Methodology**: [Interview/Survey/Testing]
- **Participants**: [Number] [User types]
- **Research Questions**: 
  1. [Question 1]
  2. [Question 2]
  3. [Question 3]

## Executive Summary
[2-3 sentence overview of key findings and implications]

## Key Themes

### Theme 1: [Theme Name]
[Full theme documentation as shown in example above]

### Theme 2: [Theme Name]
[Full theme documentation]

[Continue with 4-8 themes]

## Pain Points Summary

| Pain Point | Severity | Frequency | Current Workaround |
|------------|----------|-----------|-------------------|
| [Pain 1] | High | 10/12 users | [How they cope] |
| [Pain 2] | Medium | 7/12 users | [How they cope] |

## Feature Requests

### Must-Have
1. **[Request]** - Mentioned by [X] participants
   - Quote: "[Representative quote]"
   - Underlying need: [Why they want this]

### High Value
[Similar structure]

### Nice-to-Have
[Similar structure]

## Recommendations

### High Priority (0-3 months)
1. **[Recommendation]**
   - Supporting evidence: [Data from research]
   - Expected impact: [What will improve]
   - Effort estimate: [Rough sizing]

### Medium Priority (3-6 months)
[Similar structure]

### Future Consideration (6+ months)
[Similar structure]

## Open Questions
1. [Question requiring more research]
2. [Uncertainty to validate]
3. [Follow-up study needed]

## Appendix
- Interview guide used
- Full participant demographics
- Raw notes/transcripts (link)
```
