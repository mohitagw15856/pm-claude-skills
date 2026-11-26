# 🖱 PM Skills in the right-click menu

Right-click any file on your computer (a tenancy agreement, a loan offer, a hospital bill, a long report), choose **Run a PM Skill**, pick the skill, and the answer opens a few seconds later. It's saved next to the file as `<file>.<skill>.md`.

Works in macOS Finder, Windows Explorer and Linux file managers (Nautilus, Nemo, Caja, Dolphin).

## Free, or your own key: never the library's credit

Skills run on **your** machine's CLI (`npx pm-claude-skills run`) with one of these:

- **A free local model.** Install [Ollama](https://ollama.com) and run `ollama pull qwen2.5:3b`. Nothing leaves your computer. This is the default in the settings file.
- **Your own Anthropic key**, for stronger answers: `ANTHROPIC_API_KEY=sk-ant-...` in the settings file.

Settings live in `~/.config/pm-skills/right-click.env` (on Windows, `%USERPROFILE%\.config\pm-skills\right-click.env`). The installer creates it.

## Install

**macOS and Linux** (needs Node 18+):

```bash
git clone https://github.com/mohitagw15856/pm-claude-skills && bash pm-claude-skills/integrations/right-click/install.sh
```

On Linux that's it. On macOS, the installer prints one last step: a one-minute Automator Quick Action that calls the script. macOS doesn't let a script add Finder menu items by itself.

**Windows** (needs Node 18+), in PowerShell:

```powershell
git clone https://github.com/mohitagw15856/pm-claude-skills
powershell -ExecutionPolicy Bypass -File pm-claude-skills\integrations\right-click\install-windows.ps1
```

It adds a per-user menu entry (no admin rights needed). On Windows 11 it's under **Show more options**. To remove it, run the same command with `-Uninstall`, or `bash install.sh --uninstall` on macOS and Linux.

## Which files

| File | Works |
|---|---|
| Text, Markdown, CSV, JSON, email (`.eml`), HTML | Always |
| Word (`.docx`) | Always on macOS and Windows; on Linux with `pandoc` |
| `.doc`, `.rtf`, `.pages` | macOS; Linux with `pandoc` |
| PDF | With `pdftotext` (macOS: `brew install poppler`; Linux: `poppler-utils`) |
| Scanned images | Not yet: copy the text out first |

Long files are cut at 60,000 characters (set `PM_SKILLS_MAX_CHARS` to change it).

## The picker

It offers the skills people most often want on a document: `summarize-anything`, `explain-simply`, `lease-decoder`, `loan-decoder`, `medical-bill-decoder`, `benefits-decoder`, `insurance-policy-decoder`, `tos-decoder`, `scam-message-decoder`, `pay-stub-decoder`, `clause-explainer` and `executive-summary`, plus **Another skill…** for any of the library's 1,000+. Set `PM_SKILL=<name>` in the settings to skip the picker.

## Privacy

The file's text goes only to the model you chose: your local Ollama, or Anthropic with your key. Nothing goes to this project. The answer is written next to your file, and nothing else is kept. Answers are not professional advice.

The macOS and Linux scripts are tested (file names with spaces, no overwriting, unreadable files, invalid skill names). The Windows script follows the same steps; if anything misbehaves, [open an issue](https://github.com/mohitagw15856/pm-claude-skills/issues).
