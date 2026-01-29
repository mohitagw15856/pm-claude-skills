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
- Decisions or conclusions reached

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
- Capture specific commitments, not general discussion
- Note dissenting opinions on important decisions
- Ask for clarity on vague commitments ("I'll look into it" → "I'll analyze the data and share findings by Friday")

**After the meeting:**
- Send notes within 2 hours while fresh
- Tag action item owners (@mention them)
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

Template additions:
- **Recent Wins**: What's going well
- **Challenges**: What's not going well
- **Career Discussion**: Development topics
- **Feedback**: For both parties

### Sprint Planning
Focus on:
- Story acceptance criteria
- Sizing/estimation decisions
- Dependency identification
- Sprint commitment

Template additions:
- **Sprint Goal**: What we're committing to
- **Story Points**: Capacity and estimates
- **Dependencies**: External blockers
- **Definition of Done**: Acceptance criteria

### Product Reviews
Focus on:
- Design decisions
- User feedback discussed
- Changes requested
- Launch readiness assessment

Template additions:
- **Design Decisions**: What was approved/rejected
- **User Feedback**: Key insights discussed
- **Open Design Questions**: What needs iteration
- **Launch Criteria**: Remaining requirements

### Stakeholder Sync
Focus on:
- Status updates delivered
- Concerns raised
- Approvals given
- Escalation needs

Template additions:
- **Status Overview**: High-level progress
- **Approvals Obtained**: Sign-offs received
- **Escalations**: Issues raised to stakeholders
- **Next Sync**: When and what to cover

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

**Decision**: Run mobile beta with 100 users before full launch
**Context**: Need to validate improvements on diverse devices
**Owner**: Jennifer (Design) to coordinate with QA
**Deadline**: February 10

## Action Items
- [ ] **Update Q1 roadmap deck with new prioritization** - @Tom - Due: Jan 22
- [ ] **Schedule alignment meeting with support team about dashboard delay** - @Tom - Due: Jan 24
- [ ] **Create tech debt prioritization rubric** - @Mike - Due: Jan 27
- [ ] **Run user testing on mobile designs** - @Jennifer - Due: Feb 3
- [ ] **Document decision rationale for executives** - @Sarah - Due: Jan 23
- [ ] **Identify 100 beta users for mobile** - @Tom - Due: Feb 1

## Discussion Notes

**Q1 Feature Prioritization**
- Customer retention is #1 company priority this quarter
- Mobile app NPS score is 6.2 (vs 8.1 for web)
- Mobile accounts for 65% of daily active users
- Multi-channel dashboard would take 8 engineering weeks
- Mobile improvements estimated at 6 engineering weeks with higher ROI
- Sales has 3 enterprise deals waiting on dashboard feature

**Resource Constraints**
- Currently 4 engineers available (down from 6 last quarter due to attrition)
- Design team can support both initiatives but at reduced capacity
- QA team needs 2 weeks for thorough testing on mobile
- One engineer on loan to security team through February

**Risk Discussion**
- Delaying dashboard may impact enterprise sales (3 deals waiting)
- Sarah noted: "We can position mobile improvements as foundation for enterprise features"
- Mike raised concern about mobile tech stack stability - addressed through tech debt allocation
- Need to communicate clearly with Sales about timeline change

**Mobile Implementation Plan**
- Week 1-2: Design refinements based on user feedback
- Week 3-4: Engineering implementation
- Week 5: Internal testing
- Week 6: Beta with 100 users
- Week 7: Full rollout

## Open Questions
- **Question**: What's the impact on enterprise pipeline if we delay dashboard?  
  **Owner**: Sarah will check with Sales leadership  
  **By When**: January 23

- **Question**: Can we do a limited beta of dashboard for enterprise customers?  
  **Owner**: Tom will explore MVP scope with Mike  
  **By When**: January 25

- **Question**: What's our plan if mobile improvements don't hit target metrics?
  **Owner**: Tom will create contingency plan
  **By When**: January 27

## Next Steps
1. Tom to send updated roadmap to leadership by EOD Wednesday (Jan 22)
2. Team to begin sprint planning for mobile improvements next Monday (Jan 27)
3. Follow-up meeting on Feb 1 to review progress and validate prioritization
4. Sarah to present decision rationale to executive team on Jan 24

---

**Next Meeting**: February 1, 2026 - Progress Check-in
**Notes Sent**: January 20, 2026 5:30 PM
```

## Notes Distribution

**Subject Line Format**: "[Meeting Type] Notes - [Date] - [Key Topic]"

Example: "Product Roadmap Review Notes - Jan 20 - Q1 Prioritization"

**Recipients**:
- All attendees
- Anyone mentioned in action items
- Anyone who requested notes

**Follow-Up**:
- Send reminder 3 days before action item due dates
- Weekly summary of all open action items
- Mark action items as complete and share updates
