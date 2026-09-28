# 🧠 Professional Brain — 5-minute Quickstart

> **Don't overthink it.** The "brain" is just a **folder of markdown notes** your skills read
> before they answer and write to after. No database, no accounts, nothing to run. The phases
> in [BRAIN.md](BRAIN.md) are the *architecture* — this is all you actually need to start.

## The whole idea in one sentence
Skills normally start cold and forget everything. Give them a `brain/` folder and they remember
your product, decisions, and who's who — and get a little better every time you use them.

---

## Part A — Use it with just files (no MCP needed)

### Step 1 · Create the brain (30 seconds)
Copy the ready-made, pre-filled template into your project:
```bash
cp -r templates/brain ./brain
```
*(Or just tell Claude: "set up a professional brain" — the `professional-brain` skill runs `init` for you.)*

You now have:
```
brain/
  context.md     ← start here: your product, metrics, voice
  knowledge/  decisions/  hypotheses/  stakeholders/  entities/  source/
```

### Step 2 · Seed it (2 minutes)
Open **`brain/context.md`** and replace the example with *your* product, key metrics, and voice.
That's the only required edit — everything else fills in as you work.

### Step 3 · Run a brain-aware skill
Run any of the brain-aware skills (`prd-template`, `okr-builder`, `churn-analysis`,
`meeting-notes`, `sprint-planning`, …). It will: **read** the brain → produce the artifact
grounded in what's known → **propose** what to remember (you approve, it appends).

### 👀 Worked example — a PRD that remembers
> **You:** "Run prd-template for an in-app referral feature."

1. It **reads** `brain/context.md` + `brain/knowledge/strategy.md` and writes the PRD using your
   real metrics and direction — no re-explaining.
2. At the end it **proposes**:
   > *Record to the brain? decision: "Referrals target activated B2B users" `[hunch]`; new entity: `feature-referrals`.*
3. You say **yes**. Preview, then commit:
   ```bash
   # See what the brain already knows (read):
   python3 skills/professional-brain/scripts/brain_query.py ./brain "referral"

   # Preview a write (changes nothing):
   python3 skills/professional-brain/scripts/brain_write.py ./brain decisions \
     "Referrals target activated B2B users" --tag hunch --body "From the referral PRD kickoff"

   # Happy? add --commit:
   python3 skills/professional-brain/scripts/brain_write.py ./brain decisions \
     "Referrals target activated B2B users" --tag hunch --body "..." --commit
   ```

Next time you run *any* skill, that decision is part of the context. That's the whole loop.

> **Provenance tags** mark how sure you are: `[data]` (measured) › `[interview]` › `[external]` ›
> `[verbal]` › `[hunch]` (a guess). Skills won't treat a `[hunch]` like settled fact.

---

## Part B — Connect MCPs (optional, makes it hands-free)

You **don't need MCP** — the brain is just files. But MCP lets Claude read/write the brain and
even *act* without you running scripts. Add only what you want:

| You want… | Add this MCP | Command |
|---|---|---|
| Claude to read/write the `brain/` files itself | **filesystem** | `claude mcp add filesystem -- npx -y @modelcontextprotocol/server-filesystem .` |
| The skills + brain available in every session | **pm-skills** | `claude mcp add pm-skills -- npx -y -p pm-claude-skills pm-claude-skills-mcp` |
| `action-runner` to actually open tickets / post | **GitHub** | `claude mcp add github -- npx -y @modelcontextprotocol/server-github` (set a token) |
| …or 500+ apps (Jira, Slack, Notion, Linear) | **Composio** | see [connectors/composio.md](connectors/composio.md) |

### 👀 Worked example — the full hands-free loop
One-time setup:
```bash
claude mcp add pm-skills   -- npx -y -p pm-claude-skills pm-claude-skills-mcp
claude mcp add filesystem  -- npx -y @modelcontextprotocol/server-filesystem .
claude mcp add github      -- npx -y @modelcontextprotocol/server-github      # for actions
```
Then, in one sentence:
> **You:** "Recall what we know about churn, run `churn-analysis`, record the finding, and open a GitHub issue for the top intervention in `acme/app`."

Claude will: read `brain/` (filesystem) → run the skill (pm-skills) → propose a write-back →
on your yes, append it → propose the GitHub issue as a **dry-run** → you approve → it files the
issue (github) → records that it did, with provenance. **Nothing happens without your yes.**

---

## Keep-it-simple FAQ
- **Do I need all those folders?** No. Start with `context.md`; the rest grow as you go.
- **Is anything automatic or risky?** No. Every write is dry-run + your approval. Actions are
  dry-run, risk-rated (🟢/🟡/🔴), and approved one by one. Nothing acts silently.
- **Where's my data?** Local markdown in `brain/`. Grep it, edit it, commit it to git, or open
  the folder as an [Obsidian](https://obsidian.md) vault.
- **Which skills use the brain?** Look for a "Reads from / Writes to the Brain" section in the
  skill (prd-template, meeting-notes, okr-builder, churn-analysis, executive-update,
  roadmap-narrative, competitive-analysis, cs-health-scorecard, sprint-planning, rice-prioritisation).
- **Can I add it to my own skill?** Yes — copy that section as the pattern; details in
  [`professional-brain`](skills/professional-brain/SKILL.md).

That's everything. Start with Part A (a folder + one file) and add MCPs later only if you want them.
