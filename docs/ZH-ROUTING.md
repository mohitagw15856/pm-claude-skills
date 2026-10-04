# Chinese routing: how often a Chinese request finds the right skill

Measured 2026-10-04 on [200 real-world Chinese requests](../evals/zh-routing.json), phrased the way people ask rather than copied from the skills' own trigger lines, across 81 skills. Regenerate with `node scripts/zh-routing-eval.mjs`.

| Router | Used by | Top-1 | Top-3 |
|---|---|---|---|
| `find` | `npx pm-claude-skills find` | 86% | 95% |
| keyword rank | MCP server, hooks, decision layer fallback | 85% | 94% |
| router model | [ModelScope pm-skills-router](https://www.modelscope.ai/models/mohitagw15856/pm-skills-router), Dify plugin | 86% | 92% |

Top-1 is the right skill first; top-3 is the right skill among the first three, which is what a person choosing from a short list sees.

**History.** The first measurement (2026-10-04, before Traditional Chinese descriptions and the short Chinese descriptions in [`data/zh-aliases.json`](../data/zh-aliases.json) were added for common untranslated skills) was: `find` 84% / 91%, keyword rank 83% / 91%, router model 83% / 89%. Those descriptions were written as plain descriptions of each skill, not from these test prompts, but they were added after seeing the misses, so treat the gain as optimistic until a fresh set of prompts confirms it.

## Where `find` misses (28)

| Request | Expected | `find` chose | Router chose |
|---|---|---|---|
| 每周五都要写工作汇报，怎么写才不像流水账 | `cn-weekly-report` | `dingtalk-work-log` | `dingtalk-work-log` |
| 下周六机房停电，要在企微群里通知全员 | `wecom-announcement` | `cn-hukou-points` | `wecom-announcement` |
| 拿到美团 L7 的 offer，我现在是字节 2-1，这算平跳吗 | `cn-level-mapper` | `offer-comparison` | `offer-letter` |
| 帮我把这次双十一活动的复盘写出来 | `cn-fupan` | `incident-postmortem` | `cn-fupan` |
| 给兄弟单位发个函，商请借调两名同事 | `cn-official-document` | `cn-civil-exam-interview` | `cn-civil-exam-interview` |
| 春招还有机会进大厂吗，简历怎么改 | `cn-campus-recruitment` | `cn-tech-interview-drill` | `cn-campus-recruitment` |
| 拿到国网和一家互联网公司的 offer 不知道选哪个 | `cn-soe-interview` | `offer-comparison` | `offer-letter` |
| 公司裁员说给 N+1，我干了五年八个月，算算对不对 | `cn-severance-calculator` | `chuhai-market-entry` | `cn-severance-calculator` |
| 跨境店铺的商品详情页文案要地道一点 | `cross-border-listing` | `crossborder-platform-playbook` | `cross-border-listing` |
| 简历怎么写才能过机器筛选 | `resume` | `cn-campus-recruitment` | `cn-campus-recruitment` |
| 面试前怎么准备常见问题 | `interview-prep` | `cn-civil-exam-interview` | `cn-soe-interview` |
| 谈薪的时候 HR 压价怎么办，陪我练一下 | `salary-negotiation` | `claim-denial-decoder` | `cn-social-insurance-explainer` |
| 员工福利手册看不懂，补充医疗和年金是什么 | `benefits-decoder` | `cn-social-insurance-explainer` | `cn-social-insurance-explainer` |
| 技术方案文档要写哪些部分 | `technical-spec-template` | `feishu-doc-writer` | `feishu-doc-writer` |
| 访谈了十个用户，帮我总结发现 | `user-research-synthesis` | `user-interview-synthesis` | `cn-year-end-review` |
| 线上事故复盘报告，不追责 | `incident-postmortem` | `cn-fupan` | `cn-fupan` |
| 给自己写一份绩效自评 | `self-review` | `cn-year-end-review` | `self-review` |
| 租房合同里有些条款看不懂，帮我看看有没有坑 | `lease-decoder` | `cn-labour-contract-decoder` | `cn-labour-contract-decoder` |
| App 的用户协议里有没有霸王条款 | `tos-decoder` | `college-app-parent-guide` | `cn-campus-recruitment` |
| 台灣特休沒休完，公司要給錢嗎 | `tw-labour-standards` | `okr-builder` | `tw-labour-standards` |
| 钉钉周报的本周工作总结怎么写 | `dingtalk-work-log` | `cn-weekly-report` | `cn-weekly-report` |
| 字节一面会考哪些八股 | `cn-tech-interview-drill` | `cn-level-mapper` | `cn-tech-interview-drill` |
| 出海做品牌先选哪个国家 | `chuhai-market-entry` | `crossborder-platform-playbook` | `crossborder-platform-playbook` |
| 给投资人写的工作汇报摘要 | `executive-summary` | `investor-update` | `investor-update` |
| 年度绩效考核的自评和他评 | `performance-review` | `cn-year-end-review` | `cn-year-end-review` |
| 通知和通告有什么区别，我该用哪个 | `cn-official-document` | `claim-denial-decoder` | `wecom-announcement` |
| Go 后端面试 GMP 调度怎么讲 | `cn-tech-interview-drill` | `cn-civil-exam-interview` | `cn-civil-exam-interview` |
| 等保和数据出境都要做吗，先做哪个 | `cn-mlps-checklist` | `cn-data-export-assessment` | `cn-data-export-assessment` |

These misses are the to-do list: each points at a skill whose Chinese description or translation should carry that phrasing.
