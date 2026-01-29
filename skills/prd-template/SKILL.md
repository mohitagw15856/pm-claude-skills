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

## Context & Background

**Why Now**: Customer satisfaction has declined 15% over the past 6 months, primarily due to slow response times. Our top competitor launched a unified support dashboard last quarter, and we're hearing about it in sales calls. Support team turnover is at 45% annually, with "tool complexity" cited as a top frustration.

**Strategic Alignment**: This aligns with our Q1 company objective to "Improve customer retention by 10%" and our support team's OKR to "Reduce average handle time by 25%."

**User Research Summary**: We conducted interviews with 12 support agents and observed 20 hours of support sessions. Key findings:
- Agents spend 35% of their time finding context from previous interactions
- 65% of escalations are due to lack of conversation history
- Agents rated tool-switching as their #1 daily frustration (9.2/10 pain)
- Current NPS for support experience is -12

## User Stories & Use Cases

**US1: Unified Inbox**
As a support agent, I want to see all customer inquiries in one place so that I don't miss urgent requests and can prioritize effectively.

Acceptance Criteria:
- Inbox shows inquiries from email, chat, and social media
- Inquiries are sorted by priority (urgent, high, normal, low)
- Agent can filter by channel, customer, or status
- Real-time updates when new inquiries arrive

**US2: Cross-Channel Context**
As a support agent, I want to see the full conversation history regardless of channel so that I can provide consistent, informed responses without asking customers to repeat themselves.

Acceptance Criteria:
- Timeline view shows all interactions chronologically
- Each interaction displays channel, timestamp, and content
- Customer profile shows demographics and account information
- Previous issues and resolutions are accessible

[Continue with 5-7 total user stories...]
```
