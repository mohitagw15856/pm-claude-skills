# 校园资料包 · Campus kit

[返回中文说明](../../README.zh-CN.md) · [在中国使用](../CHINA.md) · [开源小课](../learn-zh/README.md) · [Gitee 镜像](https://gitee.com/mohitagw/pm-claude-skills)

在学校里介绍 PM Skills 需要的东西都在这里：一场 45 分钟的技术分享会，一场两小时的社团工作坊，按课程作业、毕业设计和实习求职整理的使用场景，校园大使计划，以及海报设计说明。全部资料为 MIT 协议，可以自由修改、在课堂和社团里使用。

| 资料 | 用途 | 准备时间 |
|---|---|---|
| [分享会幻灯片](https://mohitagw15856.github.io/pm-claude-skills/campus/talk.html)（源文件 [`web/campus/talk.html`](../../web/campus/talk.html)） | 45 分钟技术分享会，18 页，带讲者备注 | 1 小时熟悉 + 彩排一次 |
| [社团工作坊](workshop.md) | 2 小时动手：安装、用 3 个技能、写第一个技能 | 半天 |
| [使用场景](use-cases.md) | 课程作业、毕业设计、实习求职，每个场景对应真实技能 | 直接转发 |
| [校园大使计划](ambassadors.md) | 大使做什么、怎么申请 | 10 分钟 |
| [海报设计说明](poster-brief.md) | 给社团宣传部或设计同学的需求说明 | 交给设计同学 |

## 分享会怎么讲

幻灯片是一个独立的 HTML 文件，不依赖任何外部资源，断网也能放。

- **翻页**：`→`、`空格`、`PageDown` 下一页；`←`、`PageUp` 上一页；`Home` / `End` 首页和末页；手机上左右滑动
- **讲者备注**：按 `N` 或点"讲者备注"，每页备注里写了时间点和讲法
- **深色模式**：跟随系统，也可以点 ◐ 切换
- **打印或导出 PDF**：浏览器打印，每页一张
- **跳到某一页**：地址后面加 `#页码`，例如 `talk.html#9`

时间安排（共 45 分钟）：

| 时间 | 内容 | 页 |
|---|---|---|
| 0:00 到 0:08 | 为什么同一个 AI，有人用得好，有人用不好 | 1 到 3 |
| 0:08 到 0:15 | Agent Skill 是什么，为什么装 1,255 个也不拖慢对话 | 4 到 6 |
| 0:15 到 0:27 | 现场演示：周报、开题报告、校招 | 7 到 10 |
| 0:27 到 0:36 | 安装、在线试用、学术诚信 | 11 到 13 |
| 0:36 到 0:43 | 写你自己的技能，参与开源，校园大使 | 14 到 17 |
| 0:43 到 0:45 | 问答 | 18 |

讲之前：

1. 用国内网络完整跑一遍安装（`npx --registry=https://registry.npmmirror.com pm-claude-skills add --agent trae`），把三个演示提前做一遍，并录屏备用。
2. 演示用的笔记和题目不要包含真实的个人信息或未发表的研究数据。
3. 第 13 页（学术诚信）一定要讲。如果你的学校或学院有关于 AI 使用的规定，把链接加到这一页。
4. 想改内容，直接编辑 HTML。改完在仓库根目录运行 `node scripts/check-a11y.mjs --check --page web/campus/talk.html` 检查无障碍问题。

## English summary

A campus kit in Simplified Chinese for student ambassadors: a 45-minute self-contained HTML talk deck with keyboard navigation and speaker notes (`web/campus/talk.html`), a two-hour hands-on society workshop, use cases for coursework, final-year projects and job hunting that point to real skills in the library, the ambassador programme with an application issue template on GitHub and Gitee, and a poster brief. Everything is MIT-licensed and works on networks in mainland China.
