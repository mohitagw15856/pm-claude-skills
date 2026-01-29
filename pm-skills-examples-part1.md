# PM Claude Skills - Example Skills Package

This document outlines the 7 Skills referenced in your Medium article that you can create and share.

## Skill 1: PRD Template

**File: `prd-template/SKILL.md`**

```markdown
---
name: prd-template
description: Product Requirements Document creation following proven PM template structure. Use when the user asks to create, write, draft, or help with a PRD, product requirements document, product spec, feature specification, or product documentation for a new feature or product.
---

# PRD Template Skill

This skill helps create professional Product Requirements Documents following industry best practices.

## Template Structure

Every PRD should include these sections in order:

### 1. Overview
- **Problem Statement**: What problem are we solving? (2-3 sentences)
- **Proposed Solution**: High-level description of what we're building (2-3 sentences)
- **Success Metrics**: How we'll measure success (3-5 key metrics)

### 2. Context & Background
- **Why Now**: Why is this the right time?
- **Strategic Alignment**: How does this align with company objectives?
- **User Research Summary**: Key insights from research (if applicable)

### 3. User Stories & Use Cases
Format: "As a [user type], I want to [action] so that [benefit]"
- Include 3-7 primary user stories
- Add acceptance criteria for each

### 4. Requirements
**Functional Requirements:**
- Must-have features (P0)
- Should-have features (P1)
- Nice-to-have features (P2)

**Non-Functional Requirements:**
- Performance expectations
- Security considerations
- Accessibility requirements

### 5. Design & User Experience
- Link to design mocks or wireframes
- Key user flows
- Edge cases and error states

### 6. Technical Considerations
- Architecture implications
- Dependencies on other systems
- Technical risks and mitigations

### 7. Implementation Plan
- **Phase 1 (MVP)**: What goes in first version
- **Phase 2**: What comes next
- **Phase 3**: Future enhancements

### 8. Open Questions
- Decisions that still need to be made
- Stakeholders to consult
- Research needed

### 9. Appendix
- Research links
- Related documents
- Competitive analysis

## Writing Guidelines

**Tone**: Clear, concise, actionable
**Audience**: Engineers, designers, stakeholders
**Length**: Aim for 3-6 pages for features, 8-12 for products

**Best Practices:**
- Use concrete examples over abstractions
- Include "why" not just "what"
- Make requirements testable
- Link to supporting materials
- Update as decisions are made

## What Makes a Good PRD

✅ **Do:**
- Write from the user's perspective
- Include specific success metrics
- Address edge cases
- Link to research and data
- Make trade-offs explicit

❌ **Don't:**
- Write implementation details (that's tech spec)
- Assume everyone has context
- Leave requirements ambiguous
- Skip the "why"
- Forget about accessibility

## Example PRD Opening

```
# PRD: Multi-Channel Customer Support Dashboard

## Overview

**Problem Statement**: Support teams are currently managing customer inquiries across email, chat, and social media using three separate tools, leading to delayed responses, duplicated work, and inconsistent customer experiences. On average, support agents waste 2.3 hours per day switching between tools and manually tracking conversation history.

**Proposed Solution**: Build a unified dashboard that aggregates customer inquiries from all channels into a single interface, maintains conversation history across channels, and provides intelligent routing based on agent expertise and availability.

**Success Metrics**:
- Reduce average response time from 4 hours to 1 hour
- Decrease tool-switching time by 80% (from 2.3 to <0.5 hours)
- Improve customer satisfaction score from 3.8 to 4.5 (out of 5)
- Increase support agent productivity by 35%
```
```

---

## Skill 2: User Research Synthesis

**File: `user-research-synthesis/SKILL.md`**

```markdown
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
```
```

---

## Skill 3: Stakeholder Update

**File: `stakeholder-update/SKILL.md`**

```markdown
---
name: stakeholder-update
description: Create executive stakeholder updates following proven communication frameworks. Use when the user needs to create a status update, progress report, executive summary, or communication for leadership, stakeholders, or executives.
---

# Stakeholder Update Skill

This skill creates effective status updates for executives and stakeholders following the BLUF (Bottom Line Up Front) principle.

## Update Structure

### 1. BLUF (Bottom Line Up Front)
Start with the most important information:
- **Status**: On track / At risk / Blocked / Complete
- **Key Takeaway**: One sentence summary of current state
- **Action Needed**: What you need from stakeholders (if anything)

### 2. Progress Summary
Brief overview of accomplishments:
- What shipped this period
- Milestones achieved
- Key metrics movement

Keep to 3-5 bullet points maximum.

### 3. Metrics Dashboard

**Key Metrics**
| Metric | Current | Target | Trend | Status |
|--------|---------|--------|-------|--------|
| [Metric name] | [Value] | [Target] | ↑/→/↓ | 🟢/🟡/🔴 |

Include 3-5 most important metrics only.

### 4. Risks & Blockers

**High Priority Issues:**
- **Issue**: Brief description
- **Impact**: What's at stake
- **Mitigation**: What you're doing about it
- **Help Needed**: What stakeholders can do (if applicable)

Only include issues that matter at executive level.

### 5. Upcoming Milestones

**Next 30 Days:**
- Milestone (expected date)
- Milestone (expected date)

**Next 90 Days:**
- Major milestone (month)
- Major milestone (month)

### 6. Decisions Needed (if applicable)
- **Decision**: Clear description
- **Options**: 2-3 options with pros/cons
- **Recommendation**: What you recommend and why
- **Timeline**: When decision is needed

## Writing Guidelines

**Tone**: Professional, concise, action-oriented
**Length**: Keep under 1 page (or 2 minutes reading time)
**Frequency**: Weekly for active projects, bi-weekly for maintenance

**Executive Communication Principles:**

1. **Lead with conclusions, not process**
   - ❌ "We ran 5 experiments this week and analyzed the data..."
   - ✅ "Conversion rate increased 15% from optimization work"

2. **Focus on impact, not activities**
   - ❌ "Held 12 customer interviews"
   - ✅ "Identified #1 barrier to adoption (complexity of setup)"

3. **Make problems visible early**
   - Don't sugarcoat risks
   - Propose solutions, not just problems
   - Be specific about help needed

4. **Use data to tell story**
   - Quantify whenever possible
   - Show trends, not just snapshots
   - Connect metrics to business outcomes

5. **Make it scannable**
   - Use headers and bullet points
   - Bold key information
   - Use visual indicators (🟢🟡🔴, ↑→↓)

## Status Guidelines

**🟢 On Track**: Meeting all targets, no significant risks
**🟡 At Risk**: Potential issues that could impact delivery
**🔴 Blocked**: Critical issues preventing progress, needs intervention

## Example Update

```
# Product Update: Customer Onboarding Redesign
**Week of Jan 20, 2026**

## BLUF
**Status**: 🟡 At Risk  
**Key Takeaway**: New onboarding flow is performing well in tests (+35% completion), but launch delayed one week due to integration issues with billing system.  
**Action Needed**: Decision needed on whether to launch onboarding separately or wait for billing integration fix.

## Progress Summary
- Completed user testing with 24 participants (94% positive feedback)
- Implemented first-time user experience improvements
- Resolved 12 of 15 bugs identified in QA

## Key Metrics
| Metric | Current | Target | Trend | Status |
|--------|---------|--------|-------|--------|
| Onboarding Completion | 45% | 60% | → | 🟡 |
| Time to First Value | 4.2 min | 3.0 min | ↓ | 🟢 |
| Support Tickets (Setup) | 45/week | <30/week | ↓ | 🟢 |

## Risks & Blockers
**HIGH: Billing System Integration Delay**
- **Impact**: Prevents users from completing onboarding flow
- **Root Cause**: API deprecation by payment processor, requires code rewrite
- **Mitigation**: Engineering team reallocated resources, fix ETA Feb 3
- **Decision Needed**: Launch onboarding without payment integration or wait for fix?

## Upcoming Milestones
**Next 30 Days:**
- Resolve billing integration (Feb 3)
- Launch onboarding redesign (Feb 5)
- Begin measuring impact on conversion (Feb 12)

**Next 90 Days:**
- Iterate based on production data (March)
- Extend to mobile app (April)

## Decision Needed
**Should we launch onboarding separately from billing integration?**

**Option A: Launch Now (Recommended)**
- Pros: Get 35% completion rate improvement to users immediately, gather production data, maintain momentum
- Cons: Users need to complete payment in old flow, slightly disjointed experience

**Option B: Wait for Billing Fix**
- Pros: Fully integrated experience from day one
- Cons: Delays benefits by 2 weeks, Q1 metric targets at risk

**Recommendation**: Option A. The onboarding improvements are valuable independently, and the old payment flow works fine. Waiting risks missing Q1 targets.

**Timeline**: Need decision by Jan 22 for Feb 5 launch.
```
```

---

## Skill 4: Meeting Notes Template

**File: `meeting-notes/SKILL.md`**

```markdown
---
name: meeting-notes
description: Structure and format meeting notes following PM best practices. Use when the user needs to create, format, or organize meeting notes, capture action items from meetings, or document discussions and decisions.
---

# Meeting Notes Skill

This skill structures meeting notes to maximize value and ensure follow-through.

## Standard Meeting Notes Template

### Meeting Header
**Meeting**: [Meeting Title]  
**Date**: [Date]  
**Attendees**: [Names/Roles]  
**Note Taker**: [Name]  
**Duration**: [Actual duration]

### Agenda
- [ ] Topic 1
- [ ] Topic 2
- [ ] Topic 3

*(Check off items as discussed)*

### Decisions Made
Clear documentation of decisions:

**Decision**: [What was decided]  
**Context**: [Why this decision]  
**Owner**: [Who's responsible for executing]  
**Deadline**: [When if applicable]  

Use this format for each decision made.

### Action Items
All action items should be:
- [ ] **[Action item]** - @Owner - Due: [Date]
- [ ] **[Action item]** - @Owner - Due: [Date]

Format:
- Clear, specific action
- Single owner (no "team" ownership)
- Concrete deadline
- Checkbox for tracking

### Discussion Notes
Key points discussed organized by topic:

**Topic 1: [Name]**
- Key point or discussion highlight
- Important context or concern raised
- Any data or information shared

**Topic 2: [Name]**
- Key discussion points

### Open Questions / Follow-Up
Questions that couldn't be answered:
- **Question**: [What we need to know]
- **Owner**: [Who will find out]
- **By When**: [Deadline]

### Next Steps
Clear summary of what happens next:
1. [Immediate next action]
2. [Follow-up meeting if needed]
3. [Any broader process to start]

## Best Practices

**During the meeting:**
- Focus on decisions and action items over dialogue
- Capture specific commitments, not generaldiscussion
- Note dissenting opinions on important decisions
- Ask for clarity on vague commitments ("I'll look into it" → "I'll analyze the data and share findings by Friday")

**After the meeting:**
- Send notes within 2 hours while fresh
- Tag action item owners
- Include links to relevant documents
- Follow up on overdue action items

**What to capture:**
✅ Decisions made
✅ Action items with owners and deadlines
✅ Key points of discussion
✅ Open questions
✅ Next steps

**What to skip:**
❌ Verbatim transcripts
❌ Off-topic tangents
❌ Preliminary discussion before decisions
❌ Redundant information

## Meeting Types & Adaptations

### 1:1 Meetings
Focus on:
- Career development discussions
- Feedback (both directions)
- Current challenges
- Action items for both parties

### Sprint Planning
Focus on:
- Story acceptance criteria
- Sizing/estimation decisions
- Dependency identification
- Sprint commitment

### Product Reviews
Focus on:
- Design decisions
- User feedback discussed
- Changes requested
- Launch readiness assessment

### Stakeholder Sync
Focus on:
- Status updates delivered
- Concerns raised
- Approvals given
- Escalation needs

## Example Meeting Notes

```
# Product Roadmap Review - Q1 2026
**Date**: January 20, 2026  
**Attendees**: Sarah (CPO), Mike (Eng Lead), Jennifer (Design), Tom (PM)  
**Note Taker**: Tom  
**Duration**: 45 minutes

## Agenda
- [x] Review Q1 planned features
- [x] Discuss resource constraints
- [x] Prioritization discussion
- [x] Timeline alignment

## Decisions Made

**Decision**: Move multi-channel dashboard to Q2, prioritize mobile app improvements for Q1  
**Context**: Customer feedback shows mobile experience is significantly impacting retention (65% of users primarily mobile). Engineering team can only tackle one major initiative this quarter.  
**Owner**: Tom (PM) to communicate to stakeholders  
**Deadline**: January 22

**Decision**: Allocate 20% of engineering time to technical debt  
**Context**: Accumulated tech debt is slowing feature development. Team velocity dropped 30% last quarter.  
**Owner**: Mike (Eng Lead) to create tech debt backlog  
**Deadline**: January 27

## Action Items
- [ ] **Update Q1 roadmap deck with new prioritization** - @Tom - Due: Jan 22
- [ ] **Schedule alignment meeting with support team** - @Tom - Due: Jan 24
- [ ] **Create tech debt prioritization rubric** - @Mike - Due: Jan 27
- [ ] **Run user testing on mobile designs** - @Jennifer - Due: Feb 3
- [ ] **Document decision rationale for executives** - @Sarah - Due: Jan 23

## Discussion Notes

**Q1 Feature Prioritization**
- Customer retention is #1 company priority this quarter
- Mobile app NPS score is 6.2 (vs 8.1 for web)
- Mobile accounts for 65% of daily active users
- Multi-channel dashboard would take 8 engineering weeks
- Mobile improvements estimated at 6 engineering weeks with higher ROI

**Resource Constraints**
- Currently 4 engineers available (down from 6 last quarter)
- Design team can support both initiatives but at reduced capacity
- QA team needs 2 weeks for thorough testing on mobile

**Risk Discussion**
- Delaying dashboard may impact enterprise sales (3 deals waiting)
- Sarah noted: "We can position mobile improvements as foundation for enterprise features"
- Mike raised concern about mobile tech stack stability - addressed through tech debt allocation

## Open Questions
- **Question**: What's the impact on enterprise pipeline if we delay dashboard?  
  **Owner**: Sarah will check with Sales  
  **By When**: January 23

- **Question**: Can we do a limited beta of dashboard for enterprise customers?  
  **Owner**: Tom will explore MVP scope  
  **By When**: January 25

## Next Steps
1. Tom to send updated roadmap to leadership by EOD Wednesday
2. Team to begin sprint planning for mobile improvements next Monday
3. Follow-up meeting on Feb 1 to review progress and validate prioritization
```
```

I'll continue with Skills 5-7 in a separate file due to length...

