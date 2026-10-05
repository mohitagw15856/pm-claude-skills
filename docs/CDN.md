# Fetching skills through a CDN

Every published version of the npm package is mirrored by jsDelivr, which is often reachable where GitHub's raw files and API are blocked or slow (mainland China included). Use it to fetch a single skill, the skill index, or a whole folder, with no GitHub involved.

## One skill

```text
https://cdn.jsdelivr.net/npm/pm-claude-skills@<version>/skills/<skill>/SKILL.md
```

For example, version 81.2.0 of the lease decoder:

```bash
curl -fsSL https://cdn.jsdelivr.net/npm/pm-claude-skills@81.2.0/skills/lease-decoder/SKILL.md -o SKILL.md
```

Leave the version out (`pm-claude-skills/skills/...`) for the latest release; pin it in anything you depend on. `fastly.jsdelivr.net` serves the same files if `cdn.jsdelivr.net` is slow where you are.

## The index

`https://cdn.jsdelivr.net/npm/pm-claude-skills@<version>/web/skills-index.json` lists every skill with its bundle and description, so a tool can search first and fetch one file after.

## A small example

```js
const v = '81.2.0';
const base = `https://cdn.jsdelivr.net/npm/pm-claude-skills@${v}`;
const { skills } = await (await fetch(`${base}/web/skills-index.json`)).json();
const pick = skills.find((s) => s.name === 'cn-weekly-report');
const text = await (await fetch(`${base}/skills/${pick.name}/SKILL.md`)).text();
```

## Translations

The npm package does not ship `skills-i18n/`. The Chinese and other translations are on Gitee, which is reachable in mainland China:

```text
https://gitee.com/mohitagw/pm-claude-skills/raw/main/skills-i18n/zh/<skill>/SKILL.md
```

## Installing skills from other repos

`npx pm-claude-skills install <owner/repo>` normally reads from GitHub. Add `--cdn` (or set `PM_SKILLS_CDN=jsdelivr`) to read the repo through jsDelivr instead:

```bash
npx pm-claude-skills install someone/their-skills --cdn
```

jsDelivr serves GitHub repos up to 50 MB and caches branches for up to 12 hours, so pin a tag (`someone/their-skills@v1.2.0`) when freshness matters. This library is larger than 50 MB, which is why its own files are fetched through the npm route above.

## 中文说明

npm 包的每个版本都会被 jsDelivr 自动镜像。在 GitHub 打不开或很慢的网络里（包括中国大陆），可以用它下载单个技能或技能索引：

```bash
curl -fsSL https://cdn.jsdelivr.net/npm/pm-claude-skills@81.2.0/skills/cn-weekly-report/SKILL.md -o SKILL.md
```

- 去掉版本号会拿到最新版本；正式使用时建议固定版本号。
- `cdn.jsdelivr.net` 慢的时候可以换成 `fastly.jsdelivr.net`。
- 中文译文不在 npm 包里，请从 Gitee 下载：`https://gitee.com/mohitagw/pm-claude-skills/raw/main/skills-i18n/zh/<技能名>/SKILL.md`。
- 从别人的 GitHub 仓库安装技能时加上 `--cdn`，就会通过 jsDelivr 读取，不访问 GitHub（仓库需小于 50 MB）。

安装整个技能库更简单的方法仍然是 npm 镜像：`npx --registry=https://registry.npmmirror.com pm-claude-skills add --agent trae`。
