# Quicker 动作：PM Skills 技能查找

[Quicker](https://getquicker.net/) 是 Windows 上常用的快捷面板。这里提供一个 PowerShell 脚本，Quicker 动作调用它：对选中的文字（或输入的一句话）找到最合适的技能，把提示词复制到剪贴板，再粘贴到通义、Kimi、豆包、DeepSeek 等任意 AI 助手。

> **状态：** 脚本按 PowerShell 5.1 的语法编写，评分方式和仓库里的 Python 工具一致。本仓库的开发环境没有 Windows 和 PowerShell，所以这个脚本**没有实际运行过**。第一次用请先在 PowerShell 窗口里手动试一遍下面的命令，有问题欢迎提 issue。

## 一、先在 PowerShell 里试

```powershell
# 下载脚本（Gitee 镜像）
iwr https://gitee.com/mohitagw/pm-claude-skills/raw/main/integrations/quicker/pm-find.ps1 -OutFile $env:USERPROFILE\pm-find.ps1

# 查找
powershell -ExecutionPolicy Bypass -File $env:USERPROFILE\pm-find.ps1 -Query "帮我写周报"

# 复制第一条的提示词
powershell -ExecutionPolicy Bypass -File $env:USERPROFILE\pm-find.ps1 -Query "帮我写周报" -Copy
```

脚本第一次运行会从 Gitee 下载技能索引（约 0.8 MB），缓存在 `%LOCALAPPDATA%\pm-skills`，七天更新一次。你输入的内容只在本机比对，不会上传。

## 二、在 Quicker 里新建动作

1. 新建动作，类型选"组合动作"。
2. 第一步：**获取选中的文本**，输出到变量 `text`。（想改成手动输入，就换成"用户输入"步骤。）
3. 第二步：**运行脚本 / 运行程序**：
   - 程序：`powershell`
   - 参数：`-ExecutionPolicy Bypass -File "%USERPROFILE%\pm-find.ps1" -Query "{text}" -Copy`
   - 勾选"隐藏窗口"和"等待结束"。
4. 第三步（可选）：**显示提示**，内容"提示词已复制"。
5. 保存，把动作拖到面板上。

想先看候选再选，去掉 `-Copy`，把脚本输出显示在"文本窗口"步骤里；要复制第二条，用 `-Pick 2 -Copy`。

## 参数

| 参数 | 作用 |
|---|---|
| `-Query` | 要做的事，中英文都可以 |
| `-Limit` | 列出几条，默认 5，最多 20 |
| `-Copy` | 复制提示词，不列出结果 |
| `-Pick` | 配合 `-Copy`，复制第几条，默认 1 |
| `-Refresh` | 重新下载索引 |

## For maintainers (English)

`pm-find.ps1` is saved as UTF-8 with a byte order mark and CRLF line endings, because Windows PowerShell 5.1 reads a script without a BOM in the system code page and would garble the Chinese prompt text. It reads `data/skills-index.min.json` through the Gitee mirror, with GitHub as the fallback, and only replaces its cache when the download parses. It has not been run on Windows from this repository.
