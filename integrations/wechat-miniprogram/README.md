# 微信小程序：PM Skills 技能查找

一个离线的技能查找小程序：输入一句话（"帮我写周报"），找到最合适的技能，点一下把提示词复制到剪贴板，再粘贴到通义、Kimi、豆包、DeepSeek 等任意 AI 助手。

- **离线。** 技能索引打包在小程序里，不请求任何服务器，也不收集输入内容。小程序只能访问在后台登记过的域名，而本项目没有国内备案域名，所以设计成完全不联网。
- **复制即用。** 有中文译文的技能，复制的提示词带完整的技能说明；其余技能带简介和 Gitee 上完整说明的链接。
- **和其他入口同一套查找逻辑。** `utils/router.js` 的评分方式与 `integrations/china-agent-tools/pm_skills_tool.py` 一致。

> **状态：** 代码和数据构建已完成，查找逻辑有自动化测试（`node tests/miniprogram-test.mjs`）。还**没有**在微信开发者工具里真机预览过，也没有提交审核。上线需要你自己注册小程序账号（见下文）。

## 本地预览

```bash
git clone https://gitee.com/mohitagw/pm-claude-skills.git
cd pm-claude-skills
npm install --registry=https://registry.npmmirror.com
node web/build-skills.mjs
node scripts/build-miniprogram.mjs        # 生成 miniprogram/data/index.js 和 bodies.js
```

打开微信开发者工具，导入 `integrations/wechat-miniprogram` 目录。没有 AppID 时可以先用测试号。`miniprogram/data/` 是生成的，不提交到仓库；技能更新后重新运行最后一条命令。

## 上线需要你来做

1. 在[微信公众平台](https://mp.weixin.qq.com/)注册小程序。个人主体可以注册，但服务类目有限，"工具"类里的"信息查询"一般可用；以平台当前规则为准。
2. 把 `project.config.json` 里的 `appid` 从 `touristappid` 换成你的 AppID。
3. 在开发者工具里上传，在后台提交审核。小程序不联网，所以不需要配置服务器域名。
4. 审核通过后发布。

## 包体积

主包上限 2 MB。`node scripts/build-miniprogram.mjs --check` 会计算整个 `miniprogram/` 目录加数据的大小，超过 1.9 MB 就失败。当前约 0.9 MB：全部技能的名称和简介，加上有中文译文的技能全文。

## For maintainers (English)

- `scripts/build-miniprogram.mjs` reads `web/skills-index.json` and `skills-i18n/zh/`, and writes CommonJS data modules. The same script feeds the uTools plugin with `--out integrations/utools/data --with-router`.
- `integrations/wechat-miniprogram/package.json` sets `"type": "commonjs"` so Node can load the Mini Program's `utils/router.js` in tests; the WeChat runtime ignores it.
- Not done from this repository: a preview in WeChat DevTools, registration, review. Those need a WeChat account bound to a mainland phone number.
