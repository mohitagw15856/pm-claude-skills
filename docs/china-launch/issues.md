# GitHub issue drafts

Two issues for the repository itself. Post them once the Chinese packs and translations are released.

---

## Issue 1: Usage survey

**Title:** 📮 中文用户调查：你在用什么工具、遇到了什么问题？ / Survey for Chinese-speaking users

**Body:**

你好！如果你在中国大陆、香港、台湾或其他地方用中文使用 PM Skills，想请你花两分钟回答几个问题，直接回复这个 Issue 即可。

1. **你在用哪个工具？** Claude Code、Trae、Qoder、通义灵码、CodeBuddy、Cursor、其他？
2. **你怎么安装的？** npm、npm 国内镜像、Gitee、直接下载？安装时遇到过网络问题吗？
3. **你最常用哪些技能？** 哪个最有用，哪个不好用？
4. **哪些技能在国内的实际场景里不准确？** 例如劳动合同、个税、社保相关的内容。
5. **你希望增加哪些技能？**
6. **Playground 能打开吗？** 用的是哪个模型？

不方便公开回复的，也可以只点一个 👍，让我们知道有多少人在用。

谢谢！

*In English: if you use PM Skills in Chinese, please reply with your tool, how you installed it, which skills help, which are wrong for local practice, and what you would like added.*

---

## Issue 2: Call for a Chinese reviewer

**Title:** 🙋 招募中文审校：劳动法、个税、社保技能需要懂行的人看一遍 / Looking for reviewers for the China skills

**Body:**

我们新增了几组面向中国用户的技能，其中 **pm-china-life** 涉及法律和税务：

- `cn-labour-contract-decoder` 劳动合同解读
- `cn-severance-calculator` 经济补偿金估算
- `cn-iit-reconciliation` 个税年度汇算
- `cn-social-insurance-explainer` 五险一金
- `cn-gaokao-planner` 高考志愿

这些技能已经写了免责声明，并要求用户核实地方性的数据，但仍然需要真正的从业者审一遍。项目的规则是：高风险技能应当有一位具名的专业人士审阅，审阅记录在 `config/human-review.json` 中，有效期 12 个月。我们不会在没有真实审阅的情况下添加记录。

**如果你是**劳动法律师、HR、税务从业者，或者熟悉高考志愿填报，欢迎：

- 在这个 Issue 下指出不准确的地方，或
- 直接提 PR 修改对应的 `skills/<名称>/SKILL.md`

我们也欢迎审校 `skills-i18n/zh/` 和 `skills-i18n/zh-TW/` 中的翻译。

*In English: the five pm-china-life skills cover labour law, tax, social insurance and university applications. They need review by a practitioner before they can carry a human-review record. Corrections by comment or pull request are very welcome.*
