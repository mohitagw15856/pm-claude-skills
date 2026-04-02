## What does this PR add or change?

<!-- One sentence summary -->

---

## Type of change

- [ ] New skill
- [ ] Improvement to an existing skill
- [ ] Bug fix (skill not triggering / wrong output)
- [ ] Documentation update (README, CONTRIBUTING, etc.)
- [ ] Marketplace / plugin config change
- [ ] Other: ___________

---

## New skill checklist

<!-- If you're adding a new skill, tick all of these before requesting review.
     If this isn't a new skill PR, delete this section. -->

**Skill file**
- [ ] Skill is in the correct folder: `plugins/[bundle-name]/skills/[skill-name]/SKILL.md`
- [ ] Frontmatter includes `name` and `description` fields
- [ ] `description` clearly states when Claude should activate this skill (trigger condition)
- [ ] `description` clearly states what the skill produces (output description)

**Content quality**
- [ ] Skill solves a real, recurring professional workflow (not a one-off task)
- [ ] Output structure is clearly defined with sections and format
- [ ] Required inputs are listed (what Claude should ask for if not provided)
- [ ] Quality checks section is included
- [ ] Example trigger phrases are included (at least 2)

**Safety**
- [ ] Skill contains no prompt injection attempts or instructions to override Claude's guidelines
- [ ] Skill does not instruct Claude to collect, store, or transmit personal data
- [ ] Skill does not contain hardcoded credentials, API keys, or PII

**Testing**
- [ ] I have tested this skill locally in Claude Code
- [ ] The skill triggers correctly on the example trigger phrases
- [ ] The output matches the structure defined in the SKILL.md

---

## What does this skill do?

<!-- 2-3 sentences. What workflow does it solve? Who is it for? -->

---

## Example output

<!-- Paste a real sample output from Claude when this skill was triggered, or describe what it produces.
     This is the most useful thing you can include for review. -->

---

## Which bundle does this belong in?

<!-- Which existing plugin bundle should this skill be added to?
     Or are you proposing a new bundle? -->

- [ ] pm-essentials
- [ ] pm-discovery
- [ ] pm-planning
- [ ] pm-delivery
- [ ] pm-analytics
- [ ] pm-strategy
- [ ] pm-advanced
- [ ] pm-rituals
- [ ] pm-gtm
- [ ] pm-engineering
- [ ] pm-data
- [ ] pm-people
- [ ] pm-design
- [ ] pm-business
- [ ] New bundle: ___________

---

## Related issue

<!-- If this PR addresses a skill request issue, link it here: "Closes #123" -->

---

## Anything else the reviewer should know?

<!-- Edge cases, limitations, or anything that might need discussion -->
