# Customization Guide

Learn how to adapt PM Claude Skills to match your company's specific processes and standards.

## Why Customize?

Every company has different:
- Document formats and templates
- Communication styles
- Approval processes
- Tools and systems
- Terminology and jargon

These Skills are designed as starting points. Customizing them ensures Claude produces outputs that match YOUR standards, not generic ones.

## What Can Be Customized

### 1. Document Structure
- Section order and naming
- Required vs. optional sections
- Level of detail

### 2. Formatting & Style
- Tone (formal vs. casual)
- Length preferences
- Visual elements (tables, bullets, etc.)

### 3. Process & Workflow
- Approval steps
- Stakeholder requirements
- Tool integrations

### 4. Terminology
- Company-specific terms
- Product names
- Team names and roles

### 5. Examples
- Your actual past documents (anonymized)
- Company-specific scenarios
- Real data formats

## How to Customize a Skill

### Step 1: Download the Skill

1. Navigate to the skill folder (e.g., `skills/prd-template`)
2. Download the `SKILL.md` file
3. Open in any text editor

### Step 2: Understand the Structure

Every `SKILL.md` has two parts:

```markdown
---
name: skill-name
description: When Claude should use this skill
---

# Skill Content

[Instructions for Claude]
```

**Frontmatter** (between `---`):
- `name`: The skill identifier (keep unchanged)
- `description`: When to trigger this skill (customize if needed)

**Body** (after `---`):
- Instructions Claude follows
- Templates and formats
- Examples

### Step 3: Make Your Changes

Edit the body to match your needs. Here are common customizations:

## Common Customizations

### Example 1: Customize PRD Template

**Change the section structure:**

Original:
```markdown
### 1. Overview
- Problem Statement
- Proposed Solution
- Success Metrics
```

Your Company's Format:
```markdown
### 1. Executive Summary
- Business Objective
- Customer Problem
- Proposed Solution
- Success Criteria (OKRs)
```

**Add company-specific requirements:**

```markdown
### Company-Specific Requirements

**Compliance:**
- GDPR compliance assessment
- Security review sign-off
- Legal approval required

**Stakeholders to Consult:**
- Engineering Lead (architecture)
- Design Director (UX)
- Security Team (if handling PII)
```

**Add your actual template:**

```markdown
## Your Company PRD Template

Use this exact structure:

# [Feature Name] - Product Requirements

## 1. Executive Summary (Max 1 page)
[Your specific requirements]

## 2. Customer Research
[Your specific requirements]

[Continue with your actual template]
```

### Example 2: Customize Stakeholder Updates

**Match your metrics:**

Original:
```markdown
| Metric | Current | Target | Trend | Status |
```

Your Company:
```markdown
| OKR | Progress | Goal | Confidence | Owner |
```

**Add your status indicators:**

```markdown
**Status Levels:**
- 🟢 On Track: >90% confidence in hitting goals
- 🟡 At Risk: 60-90% confidence, mitigation needed
- 🔴 Off Track: <60% confidence, escalation required
- ⚪ Not Started: Work hasn't begun
```

**Match your communication style:**

If your executives prefer different tone:

```markdown
## Communication Style

**Tone**: Data-driven and factual (no marketing language)
**Length**: Maximum 5 bullets per section
**Focus**: Always lead with customer impact, then business metrics
**Avoid**: Jargon, acronyms without explanation
```

### Example 3: Customize Meeting Notes

**Add your tools:**

```markdown
### Action Item Format

Use our Jira/Asana/Monday format:

- [ ] **[JIRA-123] [Action item]** - @Owner - Due: [Date] - Priority: [High/Med/Low]
```

**Add your meeting types:**

```markdown
### Sprint Retrospective Notes

**What Went Well:**
- [List items]

**What Didn't Go Well:**
- [List items]

**Action Items:**
- [Improvements to implement]

**Team Morale:** [Score 1-10]
```

### Example 4: Add Domain-Specific Context

For SaaS PM:
```markdown
## SaaS Metrics Context

When analyzing metrics, always include:
- MRR/ARR impact
- Churn rate implications
- CAC payback impact
- NRR (Net Revenue Retention) effect
```

For B2B PM:
```markdown
## Enterprise Sales Context

When writing features, consider:
- Enterprise security requirements
- Compliance needs (SOC2, GDPR, HIPAA)
- Multi-tenant implications
- Admin controls needed
```

## Advanced Customization

### Adding Examples from Your Company

The most powerful customization: add YOUR actual examples.

```markdown
## Example PRD from Our Company

Here's how we documented our last major feature:

[Paste anonymized version of your actual PRD]

Key elements to notice:
- How we structured the problem statement
- Level of technical detail
- How we documented success metrics
```

### Adding Your Tools & Systems

```markdown
## Our Tech Stack References

When mentioning systems, use our actual names:
- Internal tool for analytics: "DataHub"
- Our design system: "Atlas"
- Our API gateway: "Gateway Pro"

Always link to relevant docs:
- PRD templates: [internal wiki link]
- User research database: [internal link]
- Product metrics dashboard: [internal link]
```

### Adding Your Processes

```markdown
## Our Approval Process

Every PRD must be reviewed by:
1. Engineering Lead (technical feasibility)
2. Design Lead (UX implications)
3. Product Director (strategic alignment)
4. Security (if handling sensitive data)

Include sign-off section:

### Approvals
- [ ] Engineering: [Name] - [Date]
- [ ] Design: [Name] - [Date]
- [ ] Product: [Name] - [Date]
- [ ] Security: [Name] - [Date] (if applicable)
```

## Testing Your Customizations

After customizing:

1. **Package the updated Skill** (see [Installation Guide](installation.md))
2. **Remove the old version** from Claude
3. **Upload the new version**
4. **Test with real examples**

Test prompts:
- Use actual requests you'd make
- Try edge cases
- Verify outputs match your expectations

## Iteration Process

Skills improve through iteration:

1. **Use the Skill** in real work
2. **Notice issues** or improvements
3. **Update SKILL.md**
4. **Re-upload**
5. **Test again**

Keep a "changelog" in your Skill:

```markdown
## Changelog

### v1.2 (Jan 25, 2026)
- Added security review requirement
- Changed metric names to match company OKRs
- Added example from Q4 2025 project

### v1.1 (Jan 15, 2026)
- Updated to match new PRD template
- Added stakeholder approval section

### v1.0 (Jan 1, 2026)
- Initial version
```

## Best Practices

### ✅ Do:
- Start with small changes
- Test thoroughly before sharing with team
- Use real examples from your company
- Document what you changed and why
- Version your Skills

### ❌ Don't:
- Make the Skill too prescriptive (keep some flexibility)
- Include sensitive/proprietary information
- Assume one format works for all scenarios
- Over-customize before testing the default

## Sharing Customized Skills

### Within Your Team

For Team/Enterprise plans:
1. Customize and test individually
2. Share with 2-3 teammates for feedback
3. Iterate based on feedback
4. Have admin upload to organization library
5. Document any team-specific conventions

### Contributing Back

If your customization would help others:
1. Remove company-specific details
2. Generalize the improvements
3. Submit a Pull Request
4. Include explanation of why the change helps

## Templates for Common Customizations

### Add Company Values

```markdown
## Our Company Values

When writing any document, reflect these values:
- **Customer-First**: Always lead with customer impact
- **Data-Driven**: Include quantitative backing
- **Bias for Action**: Propose concrete next steps
- **Transparent**: Be honest about risks and unknowns
```

### Add Regulatory Requirements

```markdown
## Regulatory Considerations

For any feature involving [X], include:
- GDPR compliance assessment
- Data retention policy
- User consent requirements
- Right to deletion implementation
```

### Add Workflow Integrations

```markdown
## Integration with Our Tools

When creating action items:
- Format for Jira: [TEAM-###] Action
- Tag relevant Slack channels: #product, #engineering
- Link to relevant Notion pages
- Add to project board: [Board link]
```

## Need Help?

- 💬 [Ask in Discussions](https://github.com/mohitagw15856/pm-claude-skills/discussions)
- 📧 Email: mohit15856@gmail.com
- 🐛 [Report issues](https://github.com/mohitagw15856/pm-claude-skills/issues)

## Next Steps

- [Create Your Own Skills](creating-skills.md)
- [Troubleshooting Guide](troubleshooting.md)
- [Back to Installation](installation.md)
