# The 7-day Duet challenge

Get ready for a proactive agent in a week, fifteen minutes a day. Every step works in the ordinary Claude app today, so the challenge pays off whether or not an invite ever lands; when it does, you start on day one with a setup that will not embarrass you. Each day uses one skill from [pm-duet](../../plugins/pm-duet/) or the wider library.

Install first (30 seconds):

```bash
npx pm-claude-skills add --bundle pm-duet
```

| Day | Do this | Skill | Done when |
|---|---|---|---|
| 1 | Tidy your assistant's memory: ask it what it believes about you, correct what is stale, add the three facts an agent acting for you must know | [prepare-for-duet](../../skills/prepare-for-duet/SKILL.md) | the audit scores your memory area clean |
| 2 | Write your interrupt rules: what may break your focus, what waits, quiet hours | [interrupt-rules](../../skills/interrupt-rules/SKILL.md) | a ruleset exists where the default is silence |
| 3 | Design your morning brief: sources, the 8-line template, what never qualifies | [morning-brief-designer](../../skills/morning-brief-designer/SKILL.md) | you would read every line of the worst-case brief |
| 4 | Run a send-approval check on a real outgoing email before you send it yourself | [send-approval-check](../../skills/send-approval-check/SKILL.md) | you caught at least one thing the card surfaced |
| 5 | Close one day honestly: an end-of-day report where nothing says "done" | [end-of-day-report](../../skills/end-of-day-report/SKILL.md) | every shipped line names its verification |
| 6 | Put the status vocabulary into one live document or tracker you share | [status vocabulary](status-vocabulary.md) | a teammate can tell drafted from shipped at a glance |
| 7 | Roll up your week and pick the one change for next week | [weekly-rollup](../../skills/weekly-rollup/SKILL.md) | the rollup names the recurring blocker and one change |

**Finished?** Post what day surprised you as a [Show and Tell](https://github.com/mohitagw15856/pm-claude-skills/issues/new?template=show-and-tell.yml); if you have Duet access, file a [Tested on Duet](https://github.com/mohitagw15856/pm-claude-skills/issues/new?template=tested-on-duet.yml) report instead and get credited by name.

TODO (maintainer): pin this as a GitHub Discussion and link the discussion here once Discussions are enabled.
