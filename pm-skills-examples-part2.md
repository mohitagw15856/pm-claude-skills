# PM Claude Skills - Part 2 (Skills 5-7 + GitHub README)

## Skill 5: Competitive Analysis

**File: `competitive-analysis/SKILL.md`**

```markdown
---
name: competitive-analysis
description: Analyze competitors and create competitive landscape documentation. Use when the user asks to analyze competitors, create competitive analysis, compare features with competitors, track competitive landscape, or understand competitive positioning.
---

# Competitive Analysis Skill

This skill creates structured competitive analyses for product decision-making.

## Analysis Framework

### 1. Executive Summary
- **Market Position**: Where we stand relative to competitors
- **Key Findings**: Top 3-5 insights from analysis
- **Strategic Implications**: What this means for our roadmap

### 2. Competitor Profiles

For each major competitor:

**[Competitor Name]**
- **Company Overview**: Size, funding, market position
- **Target Customer**: Who they serve
- **Value Proposition**: Their core positioning
- **Business Model**: How they make money
- **Strengths**: What they do well
- **Weaknesses**: Where they fall short
- **Recent Activity**: Major updates, funding, announcements

### 3. Feature Comparison Matrix

| Feature | Us | Competitor A | Competitor B | Competitor C |
|---------|-----|--------------|--------------|--------------|
| Core Feature 1 | ✅ Full | ✅ Full | ⚠️ Limited | ❌ None |
| Core Feature 2 | ✅ Full | ⚠️ Limited | ✅ Full | ✅ Full |
| Advanced Feature 1 | ⚠️ Beta | ❌ None | ✅ Full | ❌ None |

Legend:
- ✅ Full: Complete, production-ready feature
- ⚠️ Limited/Beta: Partial or in-development
- ❌ None: Feature not available

Include notes on quality/implementation differences where significant.

### 4. Pricing Comparison

| Plan Type | Us | Competitor A | Competitor B | Competitor C |
|-----------|-----|--------------|--------------|--------------|
| Free/Trial | $0 | $0 | $0 | N/A |
| Starter | $29/mo | $25/mo | $39/mo | $49/mo |
| Professional | $79/mo | $89/mo | $79/mo | $99/mo |
| Enterprise | Custom | Custom | $299/mo | Custom |

**Pricing Strategy Notes**:
- How our pricing compares
- Value perception
- Packaging differences

### 5. Strengths & Weaknesses Analysis

**Our Competitive Advantages:**
1. [Strength] - [Why it matters]
2. [Strength] - [Why it matters]
3. [Strength] - [Why it matters]

**Our Gaps vs. Competition:**
1. [Gap] - [Impact on customers]
2. [Gap] - [Impact on customers]
3. [Gap] - [Impact on customers]

### 6. Customer Perception Analysis

**What Customers Say About Competitors** (from reviews, G2, social media):

**Competitor A:**
- Most Praised: [Common positive feedback]
- Most Criticized: [Common complaints]
- Typical User: [Who uses them]

**Competitor B:**
- Most Praised: [Common positive feedback]
- Most Criticized: [Common complaints]
- Typical User: [Who uses them]

### 7. Market Positioning Map

Describe or diagram positioning on key dimensions:
- Y-Axis: [e.g., Enterprise vs. SMB]
- X-Axis: [e.g., Simple vs. Comprehensive]

**Our Position**: [Where we sit and why]
**Whitespace Opportunities**: [Underserved segments]

### 8. Win/Loss Analysis

**Why We Win Against Competitors:**
- Better at: [Specific capabilities]
- Target customers that value: [What matters]

**Why We Lose to Competitors:**
- When customers need: [Specific requirements]
- When they prioritize: [What they value]

### 9. Strategic Implications & Recommendations

**Immediate Actions** (0-3 months):
1. [Action] - [Rationale]
2. [Action] - [Rationale]

**Medium-term Strategy** (3-12 months):
1. [Action] - [Rationale]
2. [Action] - [Rationale]

**Long-term Positioning** (12+ months):
1. [Strategic direction] - [Rationale]

## Analysis Best Practices

**Data Sources:**
- Competitor websites and documentation
- G2, Capterra, TrustRadius reviews
- Customer interviews (especially win/loss)
- Sales team feedback
- Social media and community discussions
- Industry analysts and reports
- Competitor job postings (reveal strategy)

**Quality Standards:**
✅ Use recent data (within 3-6 months)
✅ Include sources for claims
✅ Focus on verifiable facts over assumptions
✅ Consider different customer segments
✅ Update regularly (at least quarterly)

❌ Don't rely solely on competitor marketing
❌ Don't ignore smaller/emerging competitors
❌ Don't assume features work well just because they exist
❌ Don't forget about indirect/substitute competitors

**Ethical Guidelines:**
- Use only publicly available information
- Don't misrepresent competitor capabilities
- Be honest about their strengths
- Don't disparage competitors personally

## Monitoring Cadence

**Weekly**: Check for major announcements, funding, leadership changes
**Monthly**: Review feature releases, pricing changes, marketing campaigns
**Quarterly**: Comprehensive feature comparison, strategic assessment
**Annually**: Market position analysis, long-term trend evaluation

## Example Analysis Section

```
## Competitor Profile: DataSync Pro

**Company Overview**
- Founded 2019, 85 employees, $12M Series A (2023)
- Fast-growing in mid-market segment
- Strong presence in Europe

**Target Customer**
- Mid-market companies (100-1000 employees)
- Technical users comfortable with APIs
- Data-intensive operations

**Value Proposition**
"The fastest way to sync data across your entire stack"
- Focus on speed and reliability
- Developer-first approach

**Business Model**
- Freemium with generous free tier
- Usage-based pricing above free limits
- Professional services for enterprise

**Strengths**
- Superior sync speed (2-3x faster than alternatives)
- Best-in-class developer documentation
- Strong developer community (5k+ GitHub stars)
- Excellent uptime (99.97% vs industry 99.5%)
- Modern, intuitive API design

**Weaknesses**
- Limited no-code options (requires technical knowledge)
- Smaller integration library (45 vs our 120)
- No dedicated enterprise features
- Limited customization options
- Support can be slow (avg 8hr response time)

**Recent Activity**
- Jan 2026: Released real-time sync capabilities
- Dec 2025: Raised $12M Series A
- Nov 2025: Added webhooks and event streaming
- Hired ex-Stripe engineering lead as CTO

**Strategic Implications**
- Their focus on speed creates pressure on our performance
- Developer-first approach winning technical buyers
- Gaps in no-code and enterprise create opportunities
- Need to monitor their enterprise moves closely
```
```

---

## Skill 6: Data Analysis Standard

**File: `data-analysis-standard/SKILL.md`**

```markdown
---
name: data-analysis-standard
description: Analyze data and metrics following PM analysis frameworks. Use when the user provides data, metrics, analytics, experiment results, A/B test results, or asks for data analysis, metric interpretation, or statistical analysis.
---

# Data Analysis Standard Skill

This skill provides a structured approach to analyzing product metrics and experimental data.

## Analysis Framework

### 1. Context Setting
- **Question**: What are we trying to understand?
- **Hypothesis**: What we expected to find
- **Data Source**: Where the data comes from
- **Time Period**: Date range analyzed
- **Sample Size**: Number of observations

### 2. Data Summary
- **Key Metrics**: Primary measurements
- **Segments Analyzed**: How data was broken down
- **Data Quality Notes**: Any issues or limitations

### 3. Findings

**Primary Finding**
- **Observation**: What the data shows
- **Magnitude**: Size of effect (with units)
- **Significance**: Statistical significance if applicable
- **Confidence**: How certain we are

**Secondary Findings**
- List additional insights
- Note unexpected patterns
- Highlight anomalies

### 4. Segment Analysis

Break down by relevant dimensions:
- User type/persona
- Time period (trends)
- Geographic region
- Platform/device
- User cohort

### 5. Statistical Rigor

**For A/B Tests:**
- Sample size per variant
- Test duration
- Statistical significance (p-value)
- Confidence interval
- Statistical power
- Minimum detectable effect

**Statistical Significance Thresholds:**
- p < 0.05: Statistically significant
- p < 0.01: Highly significant
- p >= 0.05: Not significant (don't ship)

**Minimum Sample Size:**
- At least 1000 users per variant
- At least 100 conversions per variant
- Run for minimum 1 full week (capture weekly patterns)

### 6. Interpretation & Implications

**What This Means:**
- Business impact translation
- Product implications
- Strategic relevance

**What This Doesn't Mean:**
- Common misinterpretations to avoid
- Correlation vs. causation notes
- Scope limitations

### 7. Recommendations

**Recommended Action:**
- Clear next step
- Supporting rationale
- Risk assessment

**Alternative Considerations:**
- Other options
- Trade-offs
- Further validation needed

### 8. Follow-Up Questions

What we still need to learn:
- Additional analysis needed
- New experiments to run
- Data gaps to fill

## Analysis Best Practices

**Statistical Guidelines:**

1. **Always check for statistical significance**
   - Don't call results based on direction alone
   - Report both p-value and confidence intervals
   - Account for multiple comparisons

2. **Consider practical significance**
   - A 0.1% improvement might be statistically significant but not meaningful
   - Consider business impact, not just p-values
   - Factor in implementation cost

3. **Watch for common pitfalls:**
   - Selection bias in sample
   - Simpson's paradox in segments
   - Regression to the mean
   - Novelty effects in experiments
   - Seasonal patterns

4. **Validate data quality:**
   - Check for tracking issues
   - Verify sample sizes are adequate
   - Look for data anomalies
   - Confirm proper randomization

**Communication Guidelines:**

✅ **Do:**
- Lead with the answer
- Quantify everything possible
- Show your work (methodology)
- Acknowledge limitations
- Provide context for numbers

❌ **Don't:**
- Hide negative results
- Cherry-pick favorable data
- Overstate confidence
- Use jargon without explanation
- Confuse correlation with causation

## Metrics Definitions

**Engagement Metrics:**
- **DAU**: Daily Active Users (users who performed key action today)
- **WAU**: Weekly Active Users (users who performed key action in last 7 days)
- **MAU**: Monthly Active Users (users who performed key action in last 30 days)
- **Stickiness**: DAU/MAU ratio (higher = more frequent usage)

**Retention Metrics:**
- **D1 Retention**: % of users who return 1 day after signup
- **D7 Retention**: % of users who return 7 days after signup
- **D30 Retention**: % of users who return 30 days after signup

**Conversion Metrics:**
- **Conversion Rate**: % of users who complete desired action
- **Funnel Drop-off**: % lost at each step
- **Time to Convert**: How long users take to convert

**Good Benchmark Ranges** (vary by industry):
- D1 Retention: 40-60%
- D7 Retention: 20-40%
- D30 Retention: 10-25%
- Conversion Rate: 2-5% (freemium SaaS)

## Example Analysis

```
# A/B Test Analysis: Onboarding Flow Redesign

## Context
**Question**: Does the new onboarding flow improve activation rates?
**Hypothesis**: New flow will increase activation by 20% by reducing friction
**Data Source**: Mixpanel event tracking
**Time Period**: Jan 1-14, 2026 (14 days)
**Sample Size**: 5,240 users (2,620 per variant)

## Data Summary
**Key Metric**: Activation rate (completed setup + first key action)
**Segments**: New users, mobile vs desktop, organic vs paid

**Data Quality**: 
- No tracking issues detected
- Balanced randomization (50.1% / 49.9%)
- Sample sizes exceed minimum thresholds

## Findings

**Primary Finding**
**Observation**: New onboarding flow increased activation rate from 45.2% to 52.8%
**Magnitude**: +7.6 percentage points (+16.8% relative improvement)
**Significance**: p = 0.003 (highly significant)
**Confidence**: 95% CI: [+4.2pp, +11.0pp]

✅ **Recommendation**: Ship new onboarding flow

**Secondary Findings**:
- Mobile users showed larger improvement (+22%) than desktop (+12%)
- Effect consistent across organic and paid users
- Time to activation reduced from 8.2min to 5.7min (-30%)
- Support tickets about setup decreased by 35%

## Segment Analysis

| Segment | Control | Treatment | Lift | Significance |
|---------|---------|-----------|------|--------------|
| Overall | 45.2% | 52.8% | +16.8% | p = 0.003 ** |
| Mobile | 41.0% | 50.0% | +22.0% | p = 0.008 ** |
| Desktop | 49.4% | 55.2% | +11.7% | p = 0.042 * |
| Organic | 46.8% | 53.5% | +14.3% | p = 0.019 * |
| Paid | 43.1% | 51.8% | +20.2% | p = 0.012 * |

* p < 0.05, ** p < 0.01

**Key Insight**: Improvement is consistent across all segments, suggesting robust effect.

## Statistical Rigor
- ✅ Sample size: 2,620 per variant (exceeds 1,000 minimum)
- ✅ Conversions: 1,184 and 1,383 (exceeds 100 minimum)
- ✅ Duration: 14 days (captures two full weeks)
- ✅ Statistical power: 92% (exceeds 80% target)
- ✅ Minimum detectable effect: 5pp (we detected 7.6pp)

## Interpretation & Implications

**What This Means**:
- New onboarding reliably improves activation
- For every 100 new users, we'll activate ~8 more
- At current signup rate (500/day), that's ~40 additional activated users per day
- Projected impact: +1,200 activated users per month

**What This Doesn't Mean**:
- We don't know long-term retention impact yet (need 30-day follow-up)
- This doesn't tell us which specific changes drove the improvement
- Results may diminish slightly post-novelty period (monitor for 30 days)

## Recommendations

**Recommended Action**: Ship new onboarding flow to 100% of users
- Strong, statistically significant improvement
- Consistent across segments
- No negative signals
- Technical implementation is stable

**Rollout Plan**:
- Week 1: Deploy to 100% (already tested at scale)
- Week 2-5: Monitor retention metrics closely
- Month 2: Measure long-term impact on retention and LTV

**Monitor These Metrics**:
- D7 and D30 retention (ensure activation translates to retention)
- Support ticket volume (should remain low)
- NPS scores (ensure quality of experience)

## Follow-Up Questions

**Additional Analysis Needed**:
- Which specific onboarding changes had biggest impact? (follow-up multivariate test)
- Does improved activation lead to better long-term retention? (cohort analysis in 30 days)
- Can we further optimize mobile experience given larger effect? (mobile-specific test)

**Next Experiments**:
- Test additional friction reduction in mobile flow
- Experiment with personalized onboarding paths
- A/B test welcome email timing and content
```
```

---

## Skill 7: Roadmap Presentation

**File: `roadmap-presentation/SKILL.md`**

```markdown
---
name: roadmap-presentation
description: Create product roadmap presentations for stakeholders. Use when the user asks to create a roadmap, roadmap presentation, product roadmap, quarterly plan, strategic roadmap, or needs to visualize product plans and timelines.
---

# Roadmap Presentation Skill

This skill creates effective product roadmap presentations that communicate strategy and build stakeholder alignment.

## Presentation Structure

### Slide 1: Title & Context
**Product Roadmap - [Time Period]**
- Product/Team name
- Time period covered
- Last updated date
- Your name and role

### Slide 2: Executive Summary
**TL;DR for busy executives:**
- **Strategic Focus**: One sentence on the theme/priority
- **Key Initiatives**: 3-5 major efforts
- **Expected Outcomes**: Top metrics we'll move
- **Resource Requirements**: Team size, budget, dependencies

### Slide 3: Strategic Context
**Why This Roadmap?**
- **Company Objectives**: How this aligns with company goals
- **Market Context**: Relevant competitive or market dynamics
- **Customer Needs**: Top problems we're solving
- **Success Metrics**: How we'll measure progress

### Slide 4: Roadmap Principles
**How We Prioritize:**
- [Principle 1]: e.g., "Customer retention over acquisition"
- [Principle 2]: e.g., "Technical foundation before features"
- [Principle 3]: e.g., "Enterprise needs vs. broad market"

These help stakeholders understand trade-offs.

### Slides 5-7: Timeline View

**Now (Month 1-2)** - What's actively being built
- Initiative 1: [Name]
  - Problem solved
  - Expected impact
  - Team/effort
  
- Initiative 2: [Name]
  - Problem solved
  - Expected impact
  - Team/effort

**Next (Month 3-4)** - What's coming soon
- Initiative 3: [Name]
  - Problem solved
  - Expected impact
  - Team/effort

**Later (Month 5-6)** - What's on the horizon
- Initiative 4: [Name]
  - Problem solved
  - Expected impact
  - Team/effort

### Slide 8: Feature Details (if needed)
Deep dive on 1-2 key initiatives:
- **Problem**: What customer pain we're solving
- **Solution**: What we're building
- **Impact**: Expected business outcomes
- **Effort**: Team and timeline
- **Dependencies**: What needs to happen first

### Slide 9: What We're NOT Doing
**Important to set expectations:**
- Feature X: [Why not now]
- Feature Y: [Why not now]
- Feature Z: [Why not now]

Shows you've considered requests and made deliberate choices.

### Slide 10: Risks & Dependencies
**What Could Go Wrong:**
- **Risk 1**: [Description] - [Mitigation]
- **Risk 2**: [Description] - [Mitigation]

**External Dependencies:**
- Dependency on team X for Y
- Waiting on decision Z
- Partnership with vendor W

### Slide 11: Success Metrics
**How We'll Know We Succeeded:**

| Metric | Current | Q-End Target | Long-term Goal |
|--------|---------|--------------|----------------|
| [Key Metric 1] | [Value] | [Target] | [Goal] |
| [Key Metric 2] | [Value] | [Target] | [Goal] |
| [Key Metric 3] | [Value] | [Target] | [Goal] |

### Slide 12: Team & Resources
**What We Need to Deliver:**
- Engineering: [X engineers + roles]
- Design: [X designers + focus areas]
- PM: [X PMs + responsibilities]
- Other: [Data, QA, DevOps needs]

**Open Positions** (if applicable)
**Budget Requirements** (if applicable)

### Slide 13: Q&A
Leave blank for discussion

## Visual Design Guidelines

**Layout:**
- Use consistent colors for different initiative types
- Now/Next/Later should have clear visual distinction
- Use icons for different feature categories
- Keep text minimal - speak to slides, don't read them

**Color Coding Examples:**
- 🟦 Foundation/Platform work
- 🟩 Customer-facing features
- 🟨 Technical debt/quality
- 🟥 Security/compliance
- 🟪 Experimental/R&D

**Timeline Visualization:**
Use Gantt-style bars or swim lanes:
```
Jan    Feb    Mar    Apr    May    Jun
[====== Initiative 1 ======]
       [===== Initiative 2 =====]
              [===== Initiative 3 =====]
```

## Roadmap Communication Principles

**1. Outcomes Over Features**
- ❌ "Build multi-channel dashboard"
- ✅ "Enable support teams to respond 3x faster to customer inquiries"

**2. Show Trade-offs**
- Explain what you're not doing and why
- Make prioritization framework explicit
- Acknowledge competing requests

**3. Manage Expectations**
- Use "Now/Next/Later" not specific dates (dates create false precision)
- Show confidence levels (High/Medium/Low)
- Be honest about risks

**4. Tell a Story**
- Connect initiatives to strategy
- Show how pieces build on each other
- Explain the arc from now to vision

**5. Make it Actionable**
- Clear on what you need from stakeholders
- Specific decision points
- Defined success criteria

## Roadmap Formats

### Theme-Based Roadmap
Organize by strategic themes rather than time:
- **Theme 1: Improve Onboarding**
  - Initiative A
  - Initiative B
- **Theme 2: Scale for Enterprise**
  - Initiative C
  - Initiative D

Good for: Communicating strategy, longer time horizons

### Timeline Roadmap
Organize by time periods:
- Q1 2026
- Q2 2026
- H2 2026

Good for: Execution planning, near-term clarity

### Now/Next/Later Roadmap (Recommended)
Three buckets without specific dates:
- **Now**: In progress (0-2 months)
- **Next**: Up next (2-4 months)
- **Later**: On the horizon (4-12 months)

Good for: Managing expectations, reducing date commitments

### Outcome-Based Roadmap
Organize by business outcomes:
- **Increase Retention**: Initiatives that reduce churn
- **Drive Expansion**: Initiatives that increase ARPU
- **Improve Efficiency**: Initiatives that reduce costs

Good for: Executive audiences, strategic alignment

## Stakeholder-Specific Adaptations

### For Executives
- Focus on outcomes and metrics
- Show strategic alignment
- Be brief and high-level
- Emphasize business impact

### For Engineering
- Include technical details
- Show architecture implications
- Discuss technical debt trade-offs
- Be specific about scope

### For Sales/CS
- Focus on customer benefits
- Include competitive positioning
- Show launch timeline
- Provide messaging guidance

### For Customers/Partners
- External-safe language
- Focus on value, not internals
- Broad time ranges
- Beautiful design (represents brand)

## Example Slide Content

```
# Product Roadmap - Q1 2026
Customer Success Platform
Last Updated: January 15, 2026
Sarah Chen, Senior Product Manager

---

## Executive Summary

**Strategic Focus**: Accelerate customer onboarding and reduce time-to-value

**Key Initiatives**:
1. Redesigned onboarding flow (expected +20% activation)
2. In-app guidance system (expected -40% support tickets)
3. Mobile app improvements (expected +15% engagement)

**Expected Outcomes**:
- Activation rate: 45% → 60%
- Time to first value: 12 days → 5 days
- Day 30 retention: 68% → 75%

**Resource Requirements**: 4 engineers, 1 designer, full quarter

---

## Strategic Context

**Company Objectives**:
- Improve net revenue retention from 95% to 105%
- Reduce CAC payback from 18 months to 12 months

**Market Context**:
- 3 competitors launched improved onboarding in 2025
- Customer expectations for SaaS onboarding have evolved
- 62% of churned customers never completed onboarding

**Customer Needs**:
- "Too complicated to get started" (top churn reason)
- "Don't know how to use advanced features"
- "Mobile experience is frustrating"

**Success Metrics**:
- Activation rate (completed setup + first action)
- Time to first value
- Day 30 retention rate

---

## Now (January - February)

### 🟩 Onboarding Redesign - "Fast Start"
**Problem**: 55% of new users don't complete onboarding, leading to poor activation and eventual churn.

**Solution**: Streamlined 3-step onboarding with progressive disclosure of advanced features. Users can start using core functionality in <5 minutes.

**Expected Impact**:
- Activation rate: 45% → 60% (+33%)
- Support tickets: -40%
- Time to value: 12 days → 5 days

**Effort**: 6 engineering weeks, 3 design weeks

**Timeline**: Design complete Jan 15, Development Jan 22-Feb 12, Launch Feb 19

---

## Next (March - April)

### 🟩 In-App Guidance System
**Problem**: Users don't discover advanced features, limiting expansion revenue. 80% of users never use more than 3 features.

**Solution**: Contextual tooltips, feature tours, and achievement system that guides users to discover relevant capabilities based on their use case.

**Expected Impact**:
- Feature adoption: +45%
- Expansion revenue: +15%
- NPS: 42 → 50

**Effort**: 8 engineering weeks, 2 design weeks

**Dependencies**: Requires onboarding redesign to complete first

---

## Later (May - June)

### 🟩 Mobile App V2
**Problem**: Mobile experience is subpar, driving users back to desktop and reducing engagement.

**Solution**: Rebuilt mobile app with improved performance, offline support, and streamlined workflows for key mobile use cases.

**Expected Impact**:
- Mobile DAU: +60%
- Overall DAU: +15%
- Mobile NPS: 32 → 45

**Effort**: 10 engineering weeks, 4 design weeks

---

## What We're NOT Doing (This Quarter)

**Multi-Channel Dashboard**
- Why not now: Onboarding and retention are higher priorities; only requested by 8% of customers
- When: Q2 2026 after retention improvements ship

**Advanced Reporting**
- Why not now: Need to improve core experience first; only valuable for activated users
- When: H2 2026 once activation targets are met

**Desktop App**
- Why not now: Focus on web and mobile; small portion of customers (12%) requesting this
- When: 2027 consideration based on demand

---

## Risks & Mitigation

**Risk: Onboarding redesign doesn't improve activation**
- Mitigation: Extensive user testing (completed), beta launch to 20% before full rollout, kill switch ready

**Risk: Mobile rebuild takes longer than estimated**
- Mitigation: Using modern framework we have experience with, dedicated team, parallel track to avoid dependencies

**Risk: Engineering velocity impacted by production issues**
- Mitigation: Allocated 20% time for tech debt and stability, on-call rotation protects focus time

---

## Success Metrics - Q1 Targets

| Metric | Current (Jan) | Q1 Target | Long-term Goal |
|--------|---------------|-----------|----------------|
| Activation Rate | 45% | 60% | 70% |
| Time to First Value | 12 days | 5 days | 1 day |
| Day 30 Retention | 68% | 75% | 85% |
| Setup Support Tickets | 180/week | 100/week | 50/week |
| Feature Adoption | 2.8/user | 4.0/user | 6.0/user |

**Measurement**: Weekly tracking, monthly reviews with stakeholders

---

## Team & Resources

**Current Team**:
- 4 Engineers (2 frontend, 1 backend, 1 full-stack)
- 1 Product Designer
- 1 Product Manager
- QA support from shared team

**What We Need**:
- ✅ Current team sufficient for Q1 roadmap
- ⚠️ Mobile rebuild may require additional frontend eng in Q2
- ⚠️ Design support will be tight with 3 parallel initiatives

**No budget increases required this quarter**
```
```

---

## Sample GitHub README.md

```markdown
# Product Management Claude Skills

**Transform your PM workflow with specialized Claude Skills for common product management tasks.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/yourusername/pm-claude-skills.svg)](https://github.com/yourusername/pm-claude-skills/stargazers)

> 📖 **Background**: These Skills emerged from my widely-read Medium article ["Claude Skills: The AI Feature That's Quietly Changing How Product Managers Work"](link-to-article), where I documented how Skills transformed my daily PM workflow, saving 3-4 hours per week.

## What Are These Skills?

Claude Skills are reusable, specialized procedures that teach Claude your exact workflows. Instead of re-explaining your PRD format or meeting notes structure every time, you create a Skill once and Claude automatically applies it whenever relevant.

Think of Skills as "onboarding guides" for Claude—they package your best practices, templates, and processes so Claude consistently delivers outputs the way you want them.

## 🎯 Who Is This For?

- **Product Managers** looking to automate repetitive documentation tasks
- **PM Teams** wanting to standardize processes and share best practices
- **Anyone** tired of reformatting Claude's outputs to match their standards

## ⚡ Quick Start (5 Minutes)

1. **Prerequisites**: You need Claude Pro, Max, Team, or Enterprise account
2. **Enable Code Execution**: Settings → Features → Enable "Code Execution and File Creation"
3. **Install Your First Skill**:
   ```
   1. Download: [`prd-template.skill`](link)
   2. Go to claude.ai
   3. Settings → Skills → Upload Skill
   4. Try it: "Help me write a PRD for a mobile app onboarding feature"
   ```

That's it! Claude now knows your PRD format.

## 📦 Available Skills

### Free Essential Skills (Included)

| Skill | Purpose | Time Saved | Skill File |
|-------|---------|------------|------------|
| **PRD Template** | Standardized product requirements | 2-3 hrs/PRD | [Download](link) |
| **Meeting Notes** | Structured meeting documentation | 15-30 min/meeting | [Download](link) |
| **Stakeholder Update** | Executive status updates | 30-45 min/update | [Download](link) |
| **User Research Synthesis** | Analyze and synthesize research findings | 2-3 hrs/research study | [Download](link) |
| **Competitive Analysis** | Structured competitive assessments | 1-2 hrs/analysis | [Download](link) |

### Premium Skills Library ($49 one-time) 🔓

Get the complete collection of 15+ Skills including:

- **Advanced Planning**: Quarterly Planning, Product Launch Checklist, OKR Framework
- **Specialized Docs**: Technical Specification, Go-to-Market Plan, Feature Brief
- **Data & Analytics**: A/B Test Analysis, Metric Deep-Dive, User Segmentation
- **Communication**: Sales Enablement, Customer FAQ, Release Notes
- **Team Skills**: Sprint Planning, Retrospective, 1:1 Agenda

[**→ Get Premium Skills**](your-gumroad-link)

All premium Skills include lifetime updates and support.

## 💡 Real Results

> "These Skills have become indispensable. I used to spend 3-4 hours every Friday on stakeholder updates. Now it takes 20 minutes to compile everything and let Claude format it. Game-changer."  
> — **Mohit Aggarwal, Senior PM**

**Time savings per week:**
- PRD creation: -2.5 hours
- Meeting notes: -1.5 hours
- Stakeholder updates: -2.0 hours
- Research synthesis: -2.5 hours
- **Total: ~8-9 hours/week back in your schedule**

## 📚 Documentation

- [Installation Guide](docs/installation.md) - Step-by-step setup
- [Customization Guide](docs/customization.md) - Adapt Skills to your workflow
- [Skill Creation Tutorial](docs/skill-creation-tutorial.md) - Build your own Skills
- [Troubleshooting](docs/troubleshooting.md) - Common issues and fixes

## 🤝 Contributing

Found a bug? Want to suggest an improvement? Contributions are welcome!

- [Report an Issue](github-issues-link)
- [Submit a Pull Request](github-pr-link)
- [Join Discussions](github-discussions-link)

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## ⭐ Show Your Support

If these Skills save you time, please:
1. ⭐ Star this repository
2. 📢 Share with fellow PMs
3. 🐛 Report bugs or suggest improvements
4. ✍️ Write about your experience

## 📈 Roadmap

**Coming Soon:**
- Domain-specific Skills (SaaS PM, B2B PM, Growth PM)
- Video tutorials for each Skill
- Notion/Confluence template packs
- Team collaboration Skills

**Long-term:**
- Interactive Skill builder tool
- Integration with PM tools (Jira, Productboard, etc.)
- Community-contributed Skills library

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) for details.

You're free to use, modify, and distribute these Skills. Attribution appreciated but not required.

## 🙋 FAQ

**Q: Do I need a paid Claude account?**  
A: Yes, Skills require Claude Pro, Max, Team, or Enterprise.

**Q: Can I customize these Skills for my team?**  
A: Absolutely! See our [Customization Guide](docs/customization.md).

**Q: Do Skills work with the Claude API?**  
A: Yes! Skills work in claude.ai, Claude Code, and via the API.

**Q: What if I need help with a specific use case?**  
A: Open a [Discussion](github-discussions-link) or check out my [consulting services](link).

**Q: Are you building Skills for other roles?**  
A: Currently focused on PM Skills, but open to expanding. Let me know what you'd like to see!

## 💼 Professional Services

Need custom Skills for your team? I offer:
- Custom Skill development ($500-2000 per Skill)
- Team workshops and training ($2000-5000)
- PM process consulting
- [Contact me](mailto:your-email) to discuss your needs

## 🔗 Links

- 📝 [Original Medium Article](link-to-article)
- 🐦 [Follow me on Twitter](twitter-link)
- 💼 [Connect on LinkedIn](linkedin-link)
- ✉️ [Email me](mailto:your-email)

---

**Made with ☕ by [Mohit Aggarwal](your-website)**

*Helping product managers work smarter with AI*

⭐ Star this repo to get updates as new Skills are added!
```
