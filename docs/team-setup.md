# Team Setup: an interest check

PM Skills is free and MIT-licensed. That does not change. This page describes something I am considering offering beside it, and asks whether your team would want it.

**[Register interest with this short form](https://docs.google.com/forms/d/e/1FAIpQLSclCgn6Qkro5lZEh_hTPgjIB-h_bVC00V0qbPsFKn6zzgoWvw/viewform)**. It takes about a minute.

## Who it is for

Product teams of three or more people who already use an AI assistant at work, or are about to, and want everyone working from the same setup.

## What it would include

- **Shared company context.** One file that tells the assistant about your product, customers, terminology and standards, so every person on the team gets answers grounded in the same facts.
- **Tailored skills.** The skills your team uses most, adjusted to your templates, your review process and the way your documents are written.
- **A guided setup session.** A working session with your team to install everything, run the skills on real work and agree how to keep them up to date.

## What shared context changes

An illustration, not a customer result. The same request, to the same assistant, for an invented company that makes rota software for care homes.

**Request:** "Write a stakeholder update on the shift-swap feature."

| Without shared context | With the team's context file |
|---|---|
| Calls the feature "shift exchange" and the users "employees" | Uses the team's own terms: "shift swap", "carers" and "home managers" |
| Reports "good progress" with no measure | Reports against the team's defined metric, and says the figure was not supplied when it was not |
| Writes five paragraphs in a generic format | Follows the team's update template: decision needed, one risk, one ask |
| Suggests emailing all users | Knows that changes affecting rotas need a notice period, because the context file says so |

The difference is not a cleverer assistant. It is one file that everyone on the team shares, kept current by a named owner.

## Try the free version first

Everything needed to do this yourself is in the library:

```bash
npx pm-claude-skills team init --name "Your team"
```

That writes a team skill list, a context file to fill in and an onboarding checklist. The [`team-context-interview`](../skills/team-context-interview/SKILL.md) skill interviews you to fill in the context, and [`team-ai-rollout-plan`](../skills/team-ai-rollout-plan/SKILL.md) plans the first month. The done-for-you offer is for teams that would rather have this set up with them.

## What it is not

- It is not a paywall. Every skill in this repository stays free and open source.
- It does not change the repository. Nothing here will be held back or moved behind a login.
- It is not a commitment on your side. Filling in the form does not sign you up for anything.

## Status

This is an interest check only. It runs for four weeks, until 25 December 2026. Nothing is for sale yet, and whether it goes ahead depends on how many teams say it would be useful.

## What happens with your answers

The form asks for your team size, a work email, your company name, which assistants you use and what you would most want set up. I read the answers myself. You will not be added to a mailing list, and I will only write to you about this.

**[Register interest](https://docs.google.com/forms/d/e/1FAIpQLSclCgn6Qkro5lZEh_hTPgjIB-h_bVC00V0qbPsFKn6zzgoWvw/viewform)**
