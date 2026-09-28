---
name: playwright-cli-pointer
description: "Point to Microsoft's playwright-cli and its skill, and explain when to use it. Use when asked how to install playwright-cli, how to verify a page in a real browser at mobile and desktop widths, or what handles the verification stage of the design pipeline. Produces the install commands, the Node prerequisite, a screenshot routine for both widths, an optional interface guidelines audit step, and credit to the author with a link. Contains no upstream skill content."
version: 1.0.0
---

# Playwright CLI (pointer)

This is a pointer, not a copy. It tells you when Microsoft's `playwright-cli` is the right tool, how to install it from the source, and who to credit. The tool and its skill live upstream and are not reproduced here.

## What This Skill Produces

- **A recommendation**: whether the upstream tool fits the task in front of you
- **The install commands** and the prerequisite
- **A verification routine**: mobile and desktop widths, a screenshot per step, fix and re-check
- **An optional audit step** using Vercel's web-design-guidelines skill
- **Attribution**: author, licence and link

## Required Inputs

Ask for these if not provided:
- **The address of the page**, usually a local dev server
- **The main flow to walk through**, step by step
- **Where screenshots should be saved**

## Framework: When to Use It

Use it when:
- A page has been built and critiqued and now needs to be seen rendered
- You need screenshots at more than one width as evidence
- You want the assistant to drive a real browser from the command line

Look elsewhere when:
- Nothing is built yet. Start at stage 1 of the pipeline.
- You want a design opinion and not a rendering check. Use `impeccable-pointer`.
- You already have a working browser tool in the session. Use that, and keep the routine below.

## Install

Prerequisite: Node.js 18 or newer.

```bash
npm install -g @playwright/cli@latest
playwright-cli install --skills
```

Confirm the install:

```bash
playwright-cli --help
```

## Verification Routine

1. Open the page at a mobile width, 390 by 844. Take a screenshot.
2. Walk the main flow. Take a screenshot at each step.
3. Resize to a desktop width, 1440 by 900. Repeat steps 1 and 2.
4. Read the screenshots. List what is wrong: overflow, wrapping, cramped tap targets, broken hierarchy.
5. Fix, then take every screenshot again. Stop when a full pass finds nothing.

Name files so passes can be compared, for example `pricing-mobile-step2-pass1.png`. The upstream README documents the `open`, `resize` and `screenshot` commands used here.

## Optional: Interface Guidelines Audit

After the screenshots pass, you can run Vercel's `web-design-guidelines` skill as a final audit of the code against interface best practice, covering areas such as accessibility, focus states and forms.

```bash
npx skills add vercel-labs/agent-skills --skill web-design-guidelines
```

It is optional and it comes last. It reviews code, so it complements the browser check and does not replace it.

## Output Format

### Pointer: playwright-cli
1. **Fit**: use it or not, in one sentence, with the reason
2. **Prerequisite**: Node version present
3. **Install**: the two commands
4. **Routine**: widths, steps, file naming
5. **Optional audit**: offered, accepted or declined
6. **Credit**: author, licence, link

## Credit

- **Project**: playwright-cli
- **Author**: Microsoft
- **Licence**: Apache 2.0
- **Link**: https://github.com/microsoft/playwright-cli
- **Optional audit**: web-design-guidelines by Vercel, https://github.com/vercel-labs/agent-skills. The README states MIT; the repository has no separate licence file, so check before redistributing.
- **Checked**: 2026-09-28

## Quality Checks
- [ ] Both install commands were given exactly as written above
- [ ] Screenshots were taken at both a mobile and a desktop width
- [ ] Screenshots were taken again after every fix
- [ ] The authors were credited with links
- [ ] No upstream skill text was reproduced
- [ ] The audit step was presented as optional

## Anti-Patterns
- **Checking one width only.** Most layout failures appear at the width you did not open.
- **Fixing without re-checking.** A fix at desktop width often breaks mobile.
- **Reporting "verified" from the code alone.** No screenshot, no verification.
- **Running the audit in place of the browser check.** They test different things.

## Example Trigger Phrases
- "How do I install playwright-cli with its skill?"
- "Check this page in a real browser at mobile and desktop widths."
- "What handles the verification stage of the design pipeline?"
- "Screenshot every step of the signup flow and fix what is broken."

---

Part of the pm-design-taste bundle in the library at https://github.com/mohitagw15856/pm-claude-skills.
