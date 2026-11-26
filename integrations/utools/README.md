# uTools 插件：PM Skills 技能查找

[uTools](https://u.tools/) 是国内常用的桌面启动器，相当于 Raycast 和 Alfred。这个插件在 uTools 里输入一句话，离线找到合适的技能，回车把提示词复制到剪贴板。

- 呼出 uTools，输入 `pm`、`技能` 或 `找技能` 进入插件，再输入你要做的事，比如"帮我写周报"。
- 也可以先选中一段文字，呼出超级面板，点"用 PM Skills 找技能"。
- 回车：复制提示词。有中文译文的技能会带上完整的技能说明，其他技能带上简介和 Gitee 上的完整说明链接。
- 全程不联网，输入的内容不离开本机。

> **状态：** 插件按 uTools 的列表模式（`mode: "list"`）接口编写，三个回调在 Node 里有自动化测试（`node tests/utools-test.mjs`）。还没有在 uTools 客户端里实际加载过，也没有上架插件市场。

## 安装（开发者模式）

```bash
git clone https://gitee.com/mohitagw/pm-claude-skills.git
cd pm-claude-skills
npm install --registry=https://registry.npmmirror.com   # 只为生成数据，没有运行时依赖
node web/build-skills.mjs
node scripts/build-miniprogram.mjs --out integrations/utools/data --with-router
```

然后在 uTools 里安装"uTools 开发者工具"，新建项目，选择 `integrations/utools/plugin.json`，点"运行"。

`integrations/utools/data/` 是生成的，不提交到仓库。技能更新后重新运行上面最后一条命令。

## For maintainers (English)

`preload.js` exports one list-mode feature, `pm_find`. It requires `./data/router.js`, `./data/index.js` and `./data/bodies.js`, which `scripts/build-miniprogram.mjs --out integrations/utools/data --with-router` writes; the router is the same file the Mini Program uses. Publishing to the uTools plugin market needs a uTools developer account and is an owner step.
