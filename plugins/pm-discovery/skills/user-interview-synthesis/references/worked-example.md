# Worked Example — User Interview Synthesis Skill

A gold-standard run of this skill: nine interviews about flaky tests synthesised into findings that contradict the feature the sponsor wanted them to justify.

## The brief

Brixa sells a CI/CD platform to mid-size engineering orgs; 37% of its support tickets mention test flakiness. The VP Product has already sketched **Auto-Quarantine** — an AI feature that silently retries and mutes flaky tests — onto the H2 roadmap, and sponsored this study hoping it would justify the build. PM Ines Fournier ran 9 interviews (4 staff engineers, 3 engineering managers, 2 platform/DevEx leads, orgs of 80–600 engineers) over three weeks in May 2026. Research questions: (1) How do teams detect and handle flaky tests today? (2) What does flakiness actually cost them? (3) How do teams respond when automation intervenes in their pipeline?

## The output

### Research Synthesis: Flaky Test Handling — Brixa CI Discovery
**Participants:** 9 (P1–P9: 4 staff engineers, 3 engineering managers, 2 platform/DevEx leads; org sizes 80–600 engineers)
**Date Range:** 12–28 May 2026
**Research Questions:**
1. How do teams detect and handle flaky tests today?
2. What does flakiness actually cost teams?
3. How do teams respond when automation intervenes in their pipeline?

#### Theme 1: Flake triage is social, not systemic — *Pain Point* (7 of 9 participants)
- Detection is a human broadcast, not a system signal. The near-universal first move on a red build is asking a channel whether anyone else is seeing it, followed by a retry click. Nobody described a tool telling them a failure was a known flake.
- Supporting quotes:
  - P2 (staff engineer, 400-eng org): "My flaky-test detector is the #eng-ci Slack channel. I post the failure, someone says 'yeah that one's cursed, just retry,' and that's the process."
  - P5 (EM, 150-eng org): "We have a retry button and a shared memory of which tests lie. When the person holding that memory went on parental leave, our merge queue basically stalled."
  - P8 (DevEx lead, 600-eng org): "I can tell you our flakiest test from vibes. I cannot tell you from any dashboard."
- **Implication for product:** Brixa should ship flake *identification* (per-test failure-pattern history surfaced on the failing build page) before any intervention feature — the data to replace the Slack channel already exists in build history and requires no ML.

#### Theme 2: Teams have been burned by automation that hides failures — *Workflow Insight* (6 of 9 participants)
- This directly contradicts the Auto-Quarantine premise. Six participants recounted a specific past incident where silent retries or auto-muting masked a real defect; their default posture toward invisible intervention is distrust, not relief.
- Supporting quotes:
  - P4 (staff engineer, 300-eng org): "Honestly I want the machine to just deal with it — but the one time a tool auto-muted a test for us, it muted the one that was catching a real race condition. We shipped it." *(Note: this quote cuts both ways — the appetite for automation is real; the trust to let it act silently is not.)*
  - P1 (EM, 80-eng org): "Auto-retry is how our checkout bug got to prod. Third retry passed, everyone moved on."
  - P7 (platform lead, 500-eng org): "Anything that makes a red build green without a human deciding is a feature I have to explain to an incident review eventually."
- **Implication for product:** Do not ship silent retry or auto-mute as defaults. If Auto-Quarantine proceeds, it must be repositioned as *loud* quarantine: visible on every affected build, with a named owner and an expiry date — the H2 roadmap framing needs revisiting with the VP before design starts.

#### Theme 3: The cost is merge latency and eroded trust in CI signal, not compute spend — *Pain Point* (5 of 9 participants)
- The team's internal pitch for Auto-Quarantine leads with saved compute. No participant raised compute cost unprompted; the costs they described were blocked merges, context-switching, and engineers learning to ignore red builds.
- Supporting quotes:
  - P3 (staff engineer, 250-eng org): "A flaky failure costs me forty-five minutes of not trusting my own change."
  - P6 (EM, 120-eng org): "The bill I care about is six PRs stuck behind a retry loop on a Friday."
  - P9 (DevEx lead, 350-eng org): "The real damage is that people stop believing red means broken. That's the whole value of CI, gone."
- **Implication for product:** Marketing and pricing framing should lead with merge-latency reduction, not compute savings; instrument time-from-first-failure-to-merge in the product so the value claim is measurable per customer.

#### Theme 4: What teams ask for is quarantine that is loud, owned, and expiring — *Feature Request* (6 of 9 participants)
- Participants who quarantine tests today do it manually with a ticket, an owner, and social pressure to fix. The desired workflow keeps humans in the approval loop and makes the quarantined state impossible to forget.
- Supporting quotes:
  - P5: "Muting is fine. *Forgetting* is the sin. If it's muted, it needs a countdown clock and a name on it."
  - P7: "I'd approve a quarantine bot tomorrow if it filed the ticket, assigned the test's last committer, and un-muted after two weeks no matter what."
  - P2: "Give me a quarantine list on the build page that shames us gently. That I'd pay for."
- **Implication for product:** The buildable v1 is human-approved quarantine with auto-assignment, expiry, and build-page visibility — a smaller, less novel feature than Auto-Quarantine, but one 6 of 9 participants described unprompted.

#### Low-Confidence Signals (1–2 participants only)
- **Flakiness as an attrition factor** (2 of 9: P6, P9) — both claimed engineers cited CI frustration in exit interviews. Worth tracking; a question in the next customer survey ("has CI reliability come up in retention conversations?") would confirm or deny at scale.
- **Test-impact analysis demand** (1 of 9: P8, the 600-eng monorepo org) — wants to run only affected tests. Likely segment-specific to the largest tier; do not generalise. A follow-up with 3–4 other 500+ orgs would tell us if this is an enterprise-tier theme.
- **Praise for the existing failure-history view** (2 of 9: P3, P8) — a delight moment suggesting Theme 1's fix may partly exist but is undiscoverable. A usage-analytics pull on that view would confirm.

#### Research Questions — Answered
1. **How do teams detect and handle flaky tests today?** Answered: socially (Theme 1), with manual retry and tribal memory; manual quarantine where mature (Theme 4).
2. **What does flakiness cost?** Partially answered — directionally it is merge latency and signal trust (Theme 3), but only 3 of 9 could quantify it. Inconclusive on magnitude; the telemetry instrumentation in Theme 3's implication is the follow-up.
3. **How do teams respond when automation intervenes?** Answered, and not the way the roadmap hoped: with distrust rooted in specific incidents (Theme 2), unless the intervention is visible, owned, and expiring (Theme 4).

#### Recommended Next Steps
1. Take Theme 2 to the VP Product before H2 planning locks: Auto-Quarantine as scoped (silent retry + mute) conflicts with 6 of 9 participants' stated dealbreaker. Recommend re-scoping to loud quarantine per Theme 4.
2. Prototype the loud-quarantine flow (approval, owner auto-assignment, expiry, build-page badge) and test with 5 of these 9 participants — P2, P5, and P7 described the workflow in enough detail to be first testers.
3. Instrument first-failure-to-merge latency in-product this quarter to quantify Theme 3 before any pricing or messaging work.
4. Add the attrition question to the Q3 customer survey to resolve the low-confidence signal cheaply.

## Why it's shaped this way

- **Every theme reports its frequency ("6 of 9") and carries quotes from at least three distinct participants** — the Process requires a minimum of 3 mentions to qualify as a theme, and the Validate step confirms quote coverage before anything ships.
- **Theme 2 leads with the fact that it contradicts the sponsor's roadmap** rather than burying it — the anti-patterns forbid including only themes that support the project hypothesis: "contradictory findings must be surfaced, not omitted."
- **P4's quote is kept whole even though half of it helps the sponsor's case** — the researcher-bias quality check ("findings don't all support one hypothesis") means evidence that cuts both ways is presented both ways, with the tension flagged inline rather than trimmed to the convenient half.
- **The attrition and test-impact findings sit in Low-Confidence Signals, not in the themes** — the anti-pattern bans mixing single-source signals into main themes, and each low-confidence entry names the cheap follow-up that would confirm or deny it, per the Output Structure.
- **Every implication is a decision someone can act on** ("do not ship silent retry as a default," "instrument first-failure-to-merge") — the anti-patterns reject implications that are "observations restated rather than product decisions enabled."
- **Each theme is tagged with its category** (Pain Point / Workflow Insight / Feature Request) because the Process step 3 categorisation is what stops a synthesis from reading as one undifferentiated complaint list.
- **All three research questions get an explicit answer, and RQ2 is honestly marked partially inconclusive** — the quality checks require every question addressed "even if the answer is 'inconclusive,'" and the inconclusive answer generates its own next step rather than a shrug.
