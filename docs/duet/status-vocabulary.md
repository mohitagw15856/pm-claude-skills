# Status vocabulary

One shared set of state words for skills whose output an agent may deliver unattended. Each word has one meaning; a skill that imports this vocabulary uses these words for state and no others, so a morning brief can never drift into comfortable vagueness. Import it with one line in the skill body:

> Status words follow docs/duet/status-vocabulary.md.

## The words

| Status | Means, exactly | It is wrong to use when |
|---|---|---|
| **drafted** | The artefact exists in full and nobody has reviewed it | anything has been sent anywhere |
| **ready for review** | Drafted, plus the named reviewer and the one question the review must answer | you do not know who reviews it |
| **approved** | A named person said yes to this exact version, and when | the yes was to an earlier version, or implied |
| **shipped** | The outward action happened and was verified (the send shows in sent mail, the post is live, the merge is in main) | the action was attempted but not confirmed, or only scheduled |
| **blocked** | Cannot proceed, and the line names the blocker and who can unblock it | "waiting" would be honest; blocked means stuck, not slow |
| **waiting on someone else** | The next action belongs to a named person, with the date it was handed to them | the next action is actually yours |

## The rules that make it work

1. **"Done" is banned.** Every terminal state is either *shipped* (verified) or *approved* (a person said yes). A brief may never report done, complete, handled or sorted; those words hide the difference between drafted and shipped, which is the difference that burns people.
2. **Verified means checked, not intended.** *Shipped* requires the skill (or the agent) to have looked at the evidence of the action, not merely to have issued it.
3. **Every blocked and waiting line carries a name and a date.** "Blocked on legal" is not a status; "blocked: contract clause 4, needs [name], raised Tuesday" is.
4. **State changes are events, not adjectives.** A brief reports "X moved from drafted to approved (by [name], 09:40)", never just "X is approved", so a reader can audit the claim.
5. **Unknown is a status.** When the agent could not verify, the honest word is "unverified since [time]", not the last known state repeated.

## Why this is the biggest lever

A proactive agent's failure mode is not wrong drafts; drafts get read. It is a calm, fluent brief that says *done* about something that is *drafted*, read by someone walking into a meeting. Six words with hard meanings prevent more damage than any amount of prompt polish.
