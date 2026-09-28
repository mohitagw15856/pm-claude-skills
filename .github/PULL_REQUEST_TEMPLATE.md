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

## Before you start

<!-- Three gates. A PR that skips them is usually closed, however good the skill is. -->

- [ ] **Searched first.** I looked through open and closed PRs, open issues and [SKILLS.md](../SKILLS.md) for the same or a similar skill, and linked what I found below
- [ ] **Checked the roadmap.** This does not duplicate work already planned in [ROADMAP.md](../ROADMAP.md). For a large change I opened an issue or discussion first
- [ ] **Declared dependencies.** I have listed below every product, service or package this skill needs, and my relationship to each one

**Related PRs and issues I found:**

<!-- Links, or "none found". -->

**Products, services or packages this skill depends on, and my relationship to them:**

<!-- "None" is the best answer. If the skill names a tool, it must be one option
     among alternatives, and the skill must still produce something useful
     without it. Say plainly if you wrote, work for or are paid by the product.
     That is not a reason for rejection. Hiding it is. -->

---

## New skill checklist

<!-- If you're adding a new skill, tick all of these before requesting review.
     If this isn't a new skill PR, delete this section. -->

**Skill file**
- [ ] Skill is in the master folder, `skills/[skill-name]/SKILL.md`, and wired into its bundle with `npm run new-bundle` or `npm run new-skill`
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
- [ ] Skill does not require one named product. `node scripts/check-vendor-neutrality.mjs` passes

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
