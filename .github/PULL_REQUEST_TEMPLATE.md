## What does this PR add or change? | 这个 PR 添加或修改了什么？

<!-- One sentence summary. | 一句话概括。 -->

---

## Type of change | 变更类型

- [ ] New skill | 新技能
- [ ] Improvement to an existing skill | 改进现有技能
- [ ] Bug fix (skill not triggering / wrong output) | 修复 Bug（技能不触发 / 输出错误）
- [ ] Documentation update (README, CONTRIBUTING, translations) | 文档更新（README、CONTRIBUTING、翻译）
- [ ] Marketplace / plugin config change | 插件市场 / 配置变更
- [ ] CI, scripts or website | CI、脚本或网站
- [ ] Other | 其他: ___________

---

## Before you start | 开始之前

<!-- Three gates. A PR that skips them is usually closed, however good the skill is.
     三道门。跳过它们的 PR 通常会被关闭，无论技能本身多好。 -->

- [ ] **Searched first.** I looked through open and closed PRs, open issues and [SKILLS.md](../SKILLS.md) for the same or a similar skill, and linked what I found below
      **先搜索。** 我查过已开和已关闭的 PR、Issue 和 [SKILLS.md](../SKILLS.md)，确认没有相同或相近的技能，并在下方附上链接
- [ ] **Checked the roadmap.** This does not duplicate work already planned in [ROADMAP.md](../ROADMAP.md). For a large change I opened an issue or discussion first
      **看过路线图。** 不与 [ROADMAP.md](../ROADMAP.md) 中已规划的工作重复。大改动已先开 Issue 或 Discussion
- [ ] **Declared dependencies.** I have listed below every product, service or package this skill needs, and my relationship to each one
      **声明依赖。** 我在下方列出了这个技能依赖的每个产品、服务或包，以及我与它们的关系

**Related PRs and issues I found | 找到的相关 PR 和 Issue：**

<!-- Links, or "none found". | 链接，或写"没有找到"。 -->

**Products, services or packages this skill depends on, and my relationship to them | 依赖的产品/服务/包，以及我与它们的关系：**

<!-- "None" is the best answer. If the skill names a tool, it must be one option among alternatives,
     and the skill must still produce something useful without it. Say plainly if you wrote, work for
     or are paid by the product. That is not a reason for rejection. Hiding it is.
     "无"是最好的答案。如果技能提到某个工具，它必须只是多个选项之一，没有它技能也要能产出有用的结果。
     如果你是该产品的作者、员工或受其付费，请直说。这不是拒绝的理由，隐瞒才是。 -->

---

## New skill checklist | 新技能检查清单

<!-- If you're adding a new skill, tick all of these before requesting review. Otherwise delete this section.
     新增技能请在提交审核前全部勾选。不是新技能 PR 请删除本节。 -->

**Skill file | 技能文件**
- [ ] Skill is in `skills/[skill-name]/SKILL.md` and wired into its bundle with `npm run new-bundle` or `npm run new-skill` | 技能位于 `skills/[skill-name]/SKILL.md`，并用 `npm run new-bundle` 或 `npm run new-skill` 接入了技能包
- [ ] Frontmatter includes `name` and `description` | Frontmatter 包含 `name` 和 `description`
- [ ] `description` states when Claude should activate this skill (trigger condition) | `description` 说明了触发条件
- [ ] `description` states what the skill produces (output description) | `description` 说明了产出内容

**Content quality | 内容质量**
- [ ] Solves a real, recurring professional workflow, not a one-off task | 解决真实、反复出现的专业工作流，而不是一次性任务
- [ ] Output structure is clearly defined with sections and format | 输出结构清晰，有分节和格式
- [ ] Required inputs are listed (what Claude should ask for if not provided) | 列出了必需输入（缺少时 Claude 应追问什么）
- [ ] Quality checks section is included | 包含质量自查一节
- [ ] At least two example trigger phrases | 至少两条示例触发语

**Safety | 安全**
- [ ] No prompt injection or instructions to override Claude's guidelines | 不含提示注入或绕过 Claude 准则的指令
- [ ] Does not instruct Claude to collect, store or transmit personal data | 不要求 Claude 收集、存储或传输个人数据
- [ ] No hardcoded credentials, API keys or PII | 不含硬编码的凭据、API Key 或个人信息
- [ ] Does not require one named product; `node scripts/check-vendor-neutrality.mjs` passes | 不依赖单一指定产品；`node scripts/check-vendor-neutrality.mjs` 通过

**Testing | 测试**
- [ ] Tested locally in Claude Code | 已在 Claude Code 本地测试
- [ ] Triggers correctly on the example trigger phrases | 示例触发语能正确触发
- [ ] Output matches the structure defined in SKILL.md | 输出符合 SKILL.md 定义的结构

---

## What does this skill do? | 这个技能做什么？

<!-- 2-3 sentences. What workflow does it solve? Who is it for? | 两三句话：解决什么工作流？给谁用？ -->

---

## Example output | 示例输出

<!-- Paste a real sample output, or describe what it produces. This is the most useful thing for review.
     贴一段真实输出，或描述产出。这是审核时最有用的信息。 -->

---

## Which bundle does this belong in? | 属于哪个技能包？

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
- [ ] pm-china-work / pm-china-life / pm-china-exams
- [ ] New bundle | 新技能包: ___________

---

## Related issue | 相关 Issue

<!-- "Closes #123" -->

---

## Anything else the reviewer should know? | 还有什么要告诉审核者的？

<!-- Edge cases, limitations, or anything that might need discussion. | 边界情况、局限，或需要讨论的地方。 -->
