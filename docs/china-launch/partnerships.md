# Partnerships with Chinese AI apps: the kit

What PM Skills can offer Kimi, Doubao, Qwen, DeepSeek, Zhipu Qingyan, Tencent Yuanbao and Baidu Wenxin, and everything needed to propose it. A partnership needs the other side's agreement and, for most of these apps, a mainland phone number or business account. So this file prepares the pitch, the integration and the ask; the owner, or a partner with a Chinese account, makes contact.

## What we offer

- **50 China-specific skills** written for local work and life: weekly reports (周报), promotion defences (晋升答辩), severance calculations (经济补偿金), labour-contract checks, civil-service and campus-recruitment preparation, Xiaohongshu and WeChat articles. There are also **74 Chinese translations** of the general skills, all MIT-licensed.
- **A measured quality bar.** SkillBench has a Chinese task set (`skillbench/tasks-zh.json`) that scores a model on each task with and without the skill. An app can show its users a measured "with skills" result, not just a claim.
- **Three ways in, none of which needs our servers:**
  1. **Agent templates (智能体).** Each skill is a ready system prompt for Coze/扣子, Tencent Yuanqi and Baidu Wenxin agents. See [integrations/coze-yuanqi](../../integrations/coze-yuanqi/README.md).
  2. **MCP.** The MCP server is already listed on ModelScope, and the same server works in Bailian (百炼), Dify, FastGPT and MaxKB.
  3. **The files themselves.** The library mirrors to Gitee, so an app can vendor the SKILL.md files into its own "skills" or "agents" gallery and credit the source.

## The ask, per app

| App | Their surface | The concrete proposal | Self-serve first step (no partnership needed) |
|---|---|---|---|
| Kimi (Moonshot) | Kimi+ agents | Feature 5 workplace agents (周报, 晋升答辩, 补偿金, PRD 评审, 简历) in Kimi+ | Publish the agents; ask for featuring once there is usage |
| Doubao (ByteDance) | Doubao agents, built on Coze/扣子 | A "职场技能" collection in the Coze store | Publish to the Coze store (needs a mainland phone number) |
| Qwen app / Bailian (Alibaba) | Bailian MCP market, Qwen app agents | List the MCP server in the Bailian market; skills as Qwen agents | Submit to the Bailian MCP market (Alibaba Cloud account) |
| DeepSeek | Open platform; an integrations list on GitHub | Already submitted to awesome-deepseek-integration (#754) | Done; follow up on the PR |
| Zhipu Qingyan (智谱清言) | Agent centre (智能体中心) | Feature the exam and job-hunting agents for the autumn and spring hiring seasons | Publish to the agent centre |
| Tencent Yuanbao (元宝) | Tencent Yuanqi agents | Workplace agents inside WeChat and Yuanbao | Publish on Yuanqi (see integrations/coze-yuanqi) |
| Baidu Wenxin (文心) | Wenxin agent platform | Exam-preparation agents (国考, 考研) for the exam calendar | Publish on the agent platform |

The self-serve step comes first everywhere. A featured slot is far easier to ask for once an agent has real users, and the app can see the numbers.

## The pitch (Chinese, ready to send)

> 您好，我是开源项目 PM Skills（https://github.com/mohitagw15856/pm-claude-skills ，MIT 协议）的维护者。项目有一千两百多个"专业技能"文件，每个文件写明一件职场工作该怎么做；其中 50 个专为国内场景编写（周报、晋升答辩、经济补偿金估算、劳动合同解读、国考与校招准备、小红书与公众号写作），另有 74 个通用技能的中文译本。
>
> 我们做了中文评测集，对比同一模型在"有技能"和"无技能"时的表现，结果公开。希望和贵平台合作：把其中几个职场技能做成官方推荐的智能体，或把技能库作为 MCP 服务上架。所有内容可免费商用，只需注明出处；接入不依赖我们的服务器（可直接从 Gitee 镜像获取文件）。
>
> 如方便，我可以先在贵平台发布几个智能体，再根据使用数据和您沟通推荐位。期待回复。

## The pitch (English)

> PM Skills is an MIT-licensed library of 1,285 professional skills. Fifty are written specifically for Chinese work and life (weekly reports, promotion defences, severance estimates, labour contracts, exam and campus-hiring preparation, Xiaohongshu and WeChat writing), and 74 more are translated. A public Chinese benchmark shows the same model with and without each skill. We'd like to (a) offer a handful as featured agents on your platform, or (b) list the library as an MCP service. Commercial use is free with attribution, and nothing depends on our servers: the files mirror to Gitee. We can publish the agents ourselves first and come back with usage numbers.

## Before contacting anyone

- Publish the self-serve agents and record their links and usage here.
- Re-run the Chinese SkillBench and add the numbers to the pitch. The October run on the `skillbench-zh-results` branch returned no scores (provider errors), so there is no measured number to quote yet.
- Find each app's current business-development or developer-relations contact on its official site. Don't guess addresses.
