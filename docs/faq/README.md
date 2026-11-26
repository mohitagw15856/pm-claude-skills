# Frequently asked questions

English · [简体中文](zh-CN.md) · [繁體中文](zh-TW.md) · [日本語](ja.md) · [한국어](ko.md) · [Español](es.md) · [Português](pt-BR.md)

## What is a skill, and how is it different from just asking the model?

A skill is a plain Markdown file, `SKILL.md`, that teaches an AI assistant to do one professional task to a senior professional's standard. Ask the model directly and you get an answer from memory, with a different structure and depth every time. With a skill loaded, the model follows a written procedure: it asks for the inputs it is missing, produces a fixed structure, and checks its own work against a list. Numbers come with their working. The skill does not replace the model. It gives the model a method.

## Is it free? Can I use it at work?

Yes. The library is MIT licensed. You can use it commercially, change it, and put it inside your company's tools. The only cost is whatever your model provider charges for the tokens you send.

## Does anything get uploaded?

No. After installation, skills are Markdown files on your computer. There is no runtime, no account and no telemetry by default. Your conversations go only to the AI tool and model you chose, under their privacy policies. In the online playground, your API key stays in your browser and requests go straight to the provider. The command line `run` subcommand has an optional usage counter that sends only the skill name, and only if you set `PM_SKILLS_TELEMETRY=1`.

## Which tools does it work with?

Claude Code, Claude Desktop and Cowork, Claude.ai, Cursor, Codex, Windsurf, Cline, Zed, Gemini CLI, Trae, CodeBuddy and any tool that reads Markdown rules or speaks MCP. `npx pm-claude-skills add --agent <tool>` writes the files where each tool expects them. Skills trigger on their descriptions, so they are not all loaded into every conversation.

## How do I install it?

- **Any tool:** `npx pm-claude-skills add` and follow the prompts.
- **Claude Code:** open `/plugin`, search for pm-skills in the official directory, and install the bundles you want.
- **Python:** `pip install pm-skills`.
- **MCP:** add `npx -y -p pm-claude-skills@latest pm-claude-skills-mcp` to your MCP configuration.
- **Nothing to install:** the [playground](https://mohitagw15856.github.io/pm-claude-skills/) runs any skill in your browser.

## I do not write code. Can I still use this?

Yes. Open the [playground](https://mohitagw15856.github.io/pm-claude-skills/), pick a skill and say what you need in plain words. Claude.ai users can upload a skill as a ZIP from the Add-to-Claude buttons. Desktop apps that support MCP, such as Claude Desktop, can add the MCP server from a settings screen with no terminal.

## The skill does not trigger. What now?

Be explicit: name the task the way the skill's description does, for example "Write a PRD for..." rather than "help me with this". Check it is installed with `npx pm-claude-skills doctor`. If it still does not fire, [open a bug report](https://github.com/mohitagw15856/pm-claude-skills/issues/new?template=bug-report.yml) with the exact phrase you used.

## How do I update?

Run the install command again. `npx pm-claude-skills doctor` lists what is installed and what is stale. In Claude Code, open `/plugin` and update the pm-claude-skills marketplace. Python users run `pip install -U pm-skills`. If you forked the repository, the bundled `sync-fork.yml` workflow fast-forwards your `main` every week; see [fork-sync.md](../fork-sync.md).

## Can I trust the legal, tax and HR answers?

Treat them as preparation, not advice. These skills show their working, list the figures you must verify, and name the body you should consult: a tribunal, a tax authority, a lawyer. Rules differ by place and change often. A weekly watcher flags changes to the official sources behind the regulated skills, but the latest local rule always wins.

## Can I use it inside my company, with private skills?

Yes. The Org Edition runs as a container, `docker run -p 8080:8080 ghcr.io/mohitagw15856/pm-skills`, and you mount your private skills alongside the public ones. Keep private skills in their own folder or repository so your copy of this library stays updatable.

## Is it usable from mainland China?

Yes, without a VPN. Install through the npmmirror registry, clone from the Gitee mirror, and try skills online at the ModelScope studio. Details are in [docs/CHINA.md](../CHINA.md) and the [简体中文 README](../../README.zh-CN.md).

## How do I request a skill, report a bug or contribute?

Use the issue forms: [skill request](https://github.com/mohitagw15856/pm-claude-skills/issues/new?template=skill-request.yml), [bug report](https://github.com/mohitagw15856/pm-claude-skills/issues/new?template=bug-report.yml), or [question](https://github.com/mohitagw15856/pm-claude-skills/issues/new?template=question-feedback.yml). To add a skill, read [CONTRIBUTING.md](../../CONTRIBUTING.md) and open a pull request. Requests with the most 👍 get built first.
