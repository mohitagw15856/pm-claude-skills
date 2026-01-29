---
name: stakeholder-update
description: Create executive stakeholder updates following proven communication frameworks. Use when the user needs to create a status update, progress report, executive summary, or communication for leadership, stakeholders, or executives.
---

# Stakeholder Update Skill

This skill creates effective status updates for executives and stakeholders following the BLUF (Bottom Line Up Front) principle.

## Update Structure

### 1. BLUF (Bottom Line Up Front)
Start with the most important information:
- **Status**: 🟢 On track / 🟡 At risk / 🔴 Blocked / ✅ Complete
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
- Engineering allocated resources to billing integration fix

## Key Metrics
| Metric | Current | Target | Trend | Status |
|--------|---------|--------|-------|--------|
| Onboarding Completion | 45% | 60% | → | 🟡 |
| Time to First Value | 4.2 min | 3.0 min | ↓ | 🟢 |
| Setup Support Tickets | 45/week | <30/week | ↓ | 🟢 |
| User Activation Rate | 52% | 65% | → | 🟡 |

## Risks & Blockers

**HIGH: Billing System Integration Delay**
- **Impact**: Prevents users from completing onboarding flow; delays launch by 1-2 weeks
- **Root Cause**: API deprecation by payment processor, requires code rewrite
- **Mitigation**: Engineering team reallocated resources, fix ETA Feb 3
- **Decision Needed**: Launch onboarding without payment integration or wait for fix? (See below)

**MEDIUM: Mobile Testing Coverage**
- **Impact**: Some edge cases on older Android devices not tested
- **Mitigation**: Partnering with QA to expand test matrix; running beta with internal users on diverse devices

## Upcoming Milestones

**Next 30 Days:**
- Resolve billing integration (Feb 3)
- Launch onboarding redesign (Feb 5 or Feb 12 depending on decision)
- Begin measuring impact on conversion (Feb 12)

**Next 90 Days:**
- Iterate based on production data (March)
- Extend to mobile app (April)
- Launch advanced features (May)

## Decision Needed

**Should we launch onboarding separately from billing integration?**

**Option A: Launch Now (Recommended)**
- Pros: Get 35% completion rate improvement to users immediately, gather production data, maintain momentum
- Cons: Users need to complete payment in old flow, slightly disjointed experience
- Timeline: Launch Feb 5

**Option B: Wait for Billing Fix**
- Pros: Fully integrated experience from day one, no technical debt
- Cons: Delays benefits by 2 weeks, Q1 metric targets at risk, team momentum lost
- Timeline: Launch Feb 12

**Recommendation**: Option A. The onboarding improvements are valuable independently, and the old payment flow works fine. Waiting risks missing Q1 targets and delays validated improvements from reaching users.

**Timeline**: Need decision by Jan 22 for Feb 5 launch.

---

**Questions?** Reply to this email or ping me on Slack.
```

## Frequency Guidance

**Daily standups**: 
- Ultra-brief (3 bullets)
- What shipped yesterday
- What's shipping today
- Blockers

**Weekly updates**:
- Use full template above
- Focus on progress and risks
- Keep to 1 page

**Monthly reviews**:
- Deeper metrics analysis
- Strategic reflections
- Quarterly goal progress
- Longer format (2-3 pages) acceptable

**Quarterly business reviews**:
- Comprehensive analysis
- Trends over time
- Strategic recommendations
- Presentation format

## Adaptation by Audience

### For C-Suite
- Lead with business impact
- Connect to company OKRs
- Focus on strategy and outcomes
- Minimize technical details

### For Product/Engineering Leadership
- Include technical context
- Show sprint/milestone progress
- Discuss architecture implications
- Reference technical debt

### For Cross-Functional Teams
- Balance technical and business context
- Highlight dependencies
- Call out collaboration needs
- Make asks explicit

### For Board/Investors
- Focus on metrics and traction
- Competitive positioning
- Market opportunities
- Financial implications
