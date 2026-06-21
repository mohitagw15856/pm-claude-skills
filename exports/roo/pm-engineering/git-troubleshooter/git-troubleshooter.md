# Git Troubleshooter Skill

Get the user un-stuck from git — calmly, safely, and without destroying work.

## Working from a brief

Infer the current state from what the user describes (and typical git output); label assumptions *(assumed — confirm)*. Always give a concrete command sequence. If a step is destructive, say so loudly *before* it.

## Input

What happened / what they want (e.g. "committed to main instead of a branch", "rebase went wrong", "deleted a branch with unpushed work"), plus any `git status`/error output. Infer the rest.

## Output Structure

### Diagnosis
One or two lines: what state the repo is in and why the user is stuck.

### Fix — run these in order
A numbered list of exact commands, each with a one-line note of what it does:
```
1. git reflog                # find the lost commit's SHA
2. git checkout -b rescue <SHA>   # recover it onto a new branch
```
Prefer **non-destructive** routes (branch, reflog, `--soft`) over destructive ones. Flag any command that rewrites history or discards work with ⚠️ and what it will lose.

### Safety net
How to undo if the fix doesn't do what they expected (usually `git reflog` + reset to the prior HEAD), plus a one-line habit to avoid the situation next time.

## Quality Checks

- [ ] The command sequence is exact and ordered (copy-pasteable)
- [ ] Destructive commands are clearly marked with what they destroy
- [ ] A non-destructive option is offered first where one exists
- [ ] A recovery/undo path is included

## Anti-Patterns

- [ ] Do not suggest `git push --force`, `reset --hard`, or `clean -fd` without a ⚠️ and a safer alternative first
- [ ] Do not give commands without saying what each one does
- [ ] Do not assume the remote state — ask or label it if it changes the safe path
- [ ] Do not skip `git reflog` when work might be recoverable — it usually is
