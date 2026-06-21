# Figma Component Audit Skill

Produces a structured audit of a Figma component library — identifying inconsistencies, naming problems, coverage gaps, and prioritised recommendations.

## Required Inputs

- **Component list or description** (paste component names or describe what exists)
- **Product type** (mobile app / web app / desktop / multi-platform)
- **Design system maturity** (new / growing / mature / legacy)
- **Primary concern** (optional)

## Output Structure

### 1. Audit Summary

| Dimension | Status | Score |
|---|---|---|
| Naming consistency | Red/Amber/Green | /10 |
| Component coverage | | /10 |
| Variant completeness | | /10 |
| Documentation | | /10 |
| Overall health | | /10 |

**Verdict:** What is the state of this library and the single most important thing to fix?

### 2. Naming Issues

For each problem:
**Issue: [Problem type]**
- What is happening: [Specific examples]
- Why it matters: [Impact on designers and developers]
- Fix: [Exact naming convention to adopt]
- Examples: Before / After

Naming convention to enforce:
- Components: PascalCase (NavigationBar)
- Variants: Lowercase with slashes (size/large, state/hover)
- Pages: All caps (COMPONENTS, FOUNDATIONS)

### 3. Coverage Gaps

| Missing Component | Priority | Why Needed |
|---|---|---|
| [Component] | High/Medium/Low | [Use case] |

### 4. Variant Completeness Check

| Component | Default | Hover | Active | Disabled | Error | Missing |
|---|---|---|---|---|---|---|
| [Button] | Yes | Yes | No | Yes | No | Active, Error |

### 5. Prioritised Fix Plan

| # | Fix | Effort | Impact | Do First? |
|---|---|---|---|---|
| 1 | [Fix] | Low/Med/High | High | Yes |

## Quality Checks
- [ ] Naming recommendations have before/after examples
- [ ] Coverage gaps are relevant to the product type
- [ ] Fix plan is ordered by impact-to-effort ratio
- [ ] Variant completeness covers all interactive states

## Anti-Patterns

- [ ] Do not flag naming issues without providing a specific, consistent naming convention to adopt
- [ ] Do not audit only visual consistency — also check for missing interactive states and accessibility compliance
- [ ] Do not list all issues at equal priority — group by impact (Critical / Major / Minor) so the fix plan is actionable
- [ ] Do not omit variant completeness — every interactive component must cover all required states
- [ ] Do not leave coverage gaps without recommending specific missing components to add

## Example Trigger Phrases
- "Audit my Figma component library"
- "Review our design system for consistency issues"
- "What components are we missing in our Figma library?"
- "Our component naming is a mess — help me fix it"
- "Do a health check on our Figma components"
