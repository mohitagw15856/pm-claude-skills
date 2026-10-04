# V2EX 草稿

**节点：** 分享创造

**标题：** [开源] 给 AI 编程助手用的职场技能库，支持 Trae / Qoder / 通义灵码，中文请求可路由

---

做了一个开源的 Agent Skills 库，MIT 协议：https://github.com/mohitagw15856/pm-claude-skills

每个技能是一份 Markdown 文件，写清楚什么时候用、需要什么输入、按什么结构输出、交付前检查什么。AI 助手只读描述，匹配上才加载全文。

这次加了几样国内可能用得上的：

- **职场**：周报、述职 / 年终总结、晋升答辩、复盘
- **生活事务**：劳动合同解读、N / N+1 / 2N 补偿估算（附 Python 计算脚本）、个税汇算、五险一金、高考志愿
- **简历**：按目标公司定制、中英文简历、导出 ATS 友好的 Word
- **内容**：小红书、公众号、抖音、直播带货脚本，带违禁词检查

安装：

```
npx --registry=https://registry.npmmirror.com pm-claude-skills add --agent trae
```

`--agent` 还支持 qoder、lingma、codebuddy、claude、cursor 等。规则文件在安装时生成，`--bundle pm-china-work` 可以只装一部分。

中文路由原来完全不工作（中文没有空格），现在按双字切分，"我的房东扣了我的押金"能匹配到押金追回技能。

已知问题：在线 Playground 托管在 GitHub Pages，国内访问慢。本地安装后不依赖任何海外服务。

法律、税务相关的技能需要懂行的人审一遍，如果你是劳动法或个税方面的从业者，非常欢迎提 Issue 指正。
