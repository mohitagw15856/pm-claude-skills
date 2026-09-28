# Third-party projects

The pm-design-taste bundle points to the projects below. It does not copy, bundle or redistribute any of their files. Each pointer skill gives the install command from the project's own documentation, so you always install from the source and receive the author's updates.

All credit for these projects belongs to their authors.

Last checked: 2026-09-28

| Project | Author | Licence | Link | Pipeline stage | Pointer skill |
|---|---|---|---|---|---|
| frontend-design | Anthropic | Apache 2.0 (the skill's own `LICENSE.txt`) | https://github.com/anthropics/skills/tree/main/skills/frontend-design | 1. Direction | `frontend-design-pointer` |
| UI UX Pro Max | nextlevelbuilder | MIT | https://github.com/nextlevelbuilder/ui-ux-pro-max-skill | 2. System | `ui-ux-pro-max-pointer` |
| emil-design-eng | Emil Kowalski | MIT | https://github.com/emilkowalski/skills | 3. Motion | `emil-design-eng-pointer` |
| Impeccable | Paul Bakaus | Apache 2.0 | https://github.com/pbakaus/impeccable | 4. Critique | `impeccable-pointer` |
| playwright-cli | Microsoft | Apache 2.0 | https://github.com/microsoft/playwright-cli | 5. Verification | `playwright-cli-pointer` |
| web-design-guidelines (optional audit) | Vercel | MIT, as stated in the README | https://github.com/vercel-labs/agent-skills | 5. Verification, optional | mentioned in `playwright-cli-pointer` |

## Notes on the licence check

- **anthropics/skills** has no single licence at the repository root. Licences are set per skill. The `frontend-design` folder carries its own `LICENSE.txt` with the Apache 2.0 text. Other skills in that repository, such as the document skills, are source-available and not open source.
- **emilkowalski/skills** was previously named `emilkowalski/skill`. The old address redirects to the new one.
- **Impeccable** states upstream that it started from Anthropic's frontend-design skill.
- **vercel-labs/agent-skills** states MIT in its README but has no separate licence file, and the GitHub licence field is empty. Treat the README as the statement of intent and check again before redistributing anything from it.

## Install commands, as documented upstream

| Project | Command |
|---|---|
| frontend-design | `npx skills add https://github.com/anthropics/skills --skill frontend-design` |
| UI UX Pro Max | `/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill` then `/plugin install ui-ux-pro-max@ui-ux-pro-max-skill` (needs Python 3) |
| emil-design-eng | `npx skills@latest add emilkowalski/skills` |
| Impeccable | `npx impeccable install` then `/impeccable init` |
| playwright-cli | `npm install -g @playwright/cli@latest` then `playwright-cli install --skills` (needs Node.js 18 or newer) |
| web-design-guidelines | `npx skills add vercel-labs/agent-skills --skill web-design-guidelines` |

## What is original here

`ui-design-pipeline` is an original skill written for this library and released under the library's MIT licence. The five pointer skills are also original text: they describe when to use each project and how to install it, and contain no upstream skill content.

## Corrections

If you are an author of one of these projects and something here is wrong or out of date, please open an issue at https://github.com/mohitagw15856/pm-claude-skills.
