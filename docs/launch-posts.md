# Launch kit — ready-to-post copy (v21.1.0)

Distribution is the biggest remaining lever for stars. Everything below is plug-and-play —
real links filled in, lead assets ready. Post **mid-week (Tue–Thu), ~8–10am US Eastern**.

> **📊 Referral tracking:** the playground links in each post carry a `?ref=<channel>` tag
> (`?ref=hn`, `?ref=x`, `?ref=reddit`, `?ref=producthunt`, `?ref=linkedin`). GoatCounter reads
> that query param even when the `Referer` header is missing (apps, email, privacy browsers) —
> so your traffic shows up named instead of in the *(unknown)* bucket. Keep the tag when you
> reuse a link, and match it to where you post.

## Assets & links (all live)
- **Repo:** https://github.com/mohitagw15856/pm-claude-skills
- **Live Playground:** https://mohitagw15856.github.io/pm-claude-skills/
- **Sample outputs:** https://mohitagw15856.github.io/pm-claude-skills/examples.html
- **Example skill page (great for sharing):** https://mohitagw15856.github.io/pm-claude-skills/skill/prd-template.html
- **Hero demo GIF:** `web/docs-assets/playground-demo.webp`
- **Compare-mode GIF (the "proof" asset):** `web/docs-assets/compare-demo.webp`

## The hooks that make this different (use these — competitors don't have them)
1. **Eval-verified** — skills are scored against held-out cases, not just counted.
2. **Compare mode** — see the same prompt with vs. without the skill, side by side.
3. **Workflow recipes** — chain skills (idea → PRD → priority → roadmap → launch).
4. **Skill Memory** — set your context once, every skill personalizes.
5. **174 skills across 18 professions**, runs in Claude Code / ChatGPT / Gemini, MIT.

---

## 🗓️ Launch-day runbook

**The day before**
- [ ] Skim each platform's self-promo rules (esp. the subreddits).
- [ ] Have the compare GIF + playground link in a notes file for fast pasting.
- [ ] Make sure you're logged into HN, PH, Reddit, X, LinkedIn.

**Launch morning (Tue–Thu, ~8:00am ET)**
1. **08:00 — Show HN** (post #1 below). Immediately add the first comment with context. Then **camp the thread for 2–3 hours** — reply to every comment, especially critical ones. Upvote velocity in the first hour decides everything. Do NOT ask for upvotes.
2. **08:15 — X thread** (post #3). Attach the compare GIF to tweet 1. Pin it.
3. **08:30 — LinkedIn** (post #5). Link in the *first comment*, not the body.
4. **09:00 — Reddit** r/ClaudeAI first (most receptive), lead with value. Space others out over the next 1–2 days, not all at once.
5. **Same day — Product Hunt** (or schedule for a dedicated PH launch day if you want a bigger PH push; PH rewards a planned launch).

**Throughout**
- Reply to everything within minutes for the first few hours.
- When someone likes it, that's your moment to say "a star really helps others find it."
- Don't cross-post the HN/Reddit links asking for votes — vote rings get you buried.

**If Show HN flops** (it's a lottery): you may resubmit once, ~1–2 weeks later, different title/angle. Reddit + PH + X are independent shots — one quiet channel doesn't sink the launch.

---

## 1. Hacker News — Show HN

**Title** (factual, no hype — HN punishes marketing speak):
> Show HN: Open-source AI skills that make Claude/ChatGPT produce real work, eval-scored

**Body:**
> I'm a PM. I kept hitting the same wall: ask any AI for a PRD, an exec update, or a launch
> plan and you get plausible-sounding filler you have to rewrite. The model doesn't know what
> "good" looks like for professional work.
>
> So I built a library of structured `SKILL.md` files — each one encodes the actual structure
> and judgement a senior professional uses for one deliverable. There are 174 now, across PM,
> engineering, design, data, legal, finance, HR, sales, marketing and more.
>
> A few things I tried to do differently:
> - **Eval-scored, not just counted.** An eval harness runs each skill against a held-out case
>   and an LLM judge rates the output; scores show up as badges. Honestly, only ~15 are scored
>   so far — the rest are reviewed but not yet auto-scored.
> - **Compare mode** in the browser playground: run the same input with and without the skill,
>   side by side, so you can judge whether it actually helps.
> - **Workflow recipes** chain skills (idea → PRD → prioritise → roadmap → launch plan).
>
> Runs natively in Claude Code, works over MCP in any client, and exports as copy-paste prompts
> for ChatGPT/Gemini. Browser playground (your own API key, no install): https://mohitagw15856.github.io/pm-claude-skills/?ref=hn
>
> MIT-licensed; skills are small and meant to be forked. Feedback welcome — especially on which
> skills are weakest, since that's what I want the evals to catch.

*First action after posting: reply to the first few comments fast.*

---

## 2. Product Hunt

**Name:** PM Skills — 174 eval-scored AI skills for every profession
**Tagline:** Turn any AI into a senior PM, engineer, or analyst
**Description:**
> 174 open-source skills that teach Claude, ChatGPT, and Gemini to produce professional-grade
> work — PRDs, exec updates, roadmaps, postmortems, contracts and more. Eval-scored, chainable
> into workflows, and runnable in the browser with no install.

**First comment (maker):**
> Hey PH 👋 I'm Mohit. I built this because AI gives you *plausible* professional docs that are
> 80% there and 100% generic. Each skill encodes how a senior pro actually structures the work —
> and you can prove it: the playground's **Compare** mode runs your input with vs. without the
> skill, side by side. Free, MIT, runs in Claude Code / ChatGPT / Gemini. Try one in 30s:
> https://mohitagw15856.github.io/pm-claude-skills/?ref=producthunt — what skill would you want next?

---

## 3. X / Twitter thread

**1/** *(attach `compare-demo.webp`)*
> Everyone says "AI writes my docs." Then you read them and rewrite everything.
>
> I built 174 open-source skills that teach Claude/ChatGPT/Gemini how senior pros actually work.
>
> Here's the same prompt WITH vs WITHOUT a skill 👇 Free. MIT.

**2/**
> Each skill is a structured SKILL.md — the real framework behind a PRD, exec update, RICE
> prioritisation, competitor teardown, incident postmortem, etc.
>
> Not a prompt. A repeatable recipe for "good."

**3/**
> And they're not just *counted* — they're **eval-scored**. An LLM judge rates each skill's
> output against held-out cases, so quality is measured, not claimed.

**4/**
> Chain them into workflows: `/ship-a-feature` runs
> idea → PRD → prioritise → roadmap → launch plan, passing context forward.
>
> 174 skills across 18 professions: PM, eng, design, data, legal, finance, HR, sales, marketing…

**5/**
> Set your company context once → every skill personalizes to your product, audience, and voice.

**6/**
> Try any of them right now — browser, your own key, no install:
> https://mohitagw15856.github.io/pm-claude-skills/?ref=x
>
> ⭐ If it's useful, star it so others find it: https://github.com/mohitagw15856/pm-claude-skills

---

## 4. Reddit (r/ClaudeAI, then r/ChatGPTCoding, r/ProductManagement)

**Title:** I open-sourced 174 *eval-scored* AI skills that make Claude/ChatGPT produce real professional work

**Body:**
> Sharing a free project. Ask AI for professional docs and you get something generic you redo.
> These are 174 structured `SKILL.md` files that encode the actual structure and judgement behind
> the work — PRDs, roadmaps, postmortems, competitor teardowns, contracts — across 18 professions.
>
> What I tried to do differently: each skill is **eval-scored** (an LLM judge rates output vs.
> held-out cases), you can **compare** with/without the skill in the browser, and you can **chain**
> skills into workflows. Runs in Claude Code, over MCP, or as ChatGPT/Gemini prompts.
>
> Playground (no install, your own key): https://mohitagw15856.github.io/pm-claude-skills/?ref=reddit
> Repo (MIT): https://github.com/mohitagw15856/pm-claude-skills
>
> What skill would you want that isn't there yet?

*Lead with value; read each sub's self-promo rules first. Don't blast all three at once.*

---

## 5. LinkedIn

> "AI writes my docs." Then you read them — and rewrite everything.
>
> I spent months encoding how senior pros *actually* do the work — PRDs, exec updates,
> prioritisation, launch plans — into 174 open-source AI skills. They're eval-scored, chainable
> into workflows, and you can compare the output with vs. without the skill to see the difference.
>
> Free, MIT, and there's a browser playground to try any of them in 30 seconds.
>
> Link in comments 👇 What would you want it to write for you?

*(Put the link in the first comment — LinkedIn suppresses posts with outbound links in the body.)*

---

## 6. Skill of the week — automated

A scheduled GitHub Action (`.github/workflows/skill-of-the-week.yml`) picks a featured skill every
Monday and composes ready-to-post X + LinkedIn copy (in the Action's job summary). Add a
`POST_WEBHOOK_URL` secret (Zapier / Make / Buffer / Slack) to auto-publish. Run locally:
`npm run skill-of-the-week`.

## 7. Ongoing distribution checklist

- [x] Per-skill SEO pages + sitemap (submit `sitemap.xml` in Google Search Console)
- [x] Repo `topics` set
- [ ] Submit to [skills.sh](https://skills.sh) and any "awesome-claude" lists
- [ ] Pin a "⭐ Star if useful" Discussion
- [ ] Ask the first 20 users directly for a star + feedback
- [ ] Repost the compare GIF monthly featuring a different skill
- [ ] One deep-dive blog post per flagship skill (SEO long tail)

---
---

# Launch wave 2 — the Brain + Integrations (v28.1.0)

> **What's new since the v21 kit above:** **206 skills / 21 professions**, **196 eval-scored (avg 4.8/5)**, a read-only **REST API**, **n8n / Lovable / Obsidian** integrations, and the **Professional Brain** — a local markdown memory the skills read and write, plus an action layer that opens the tickets. Two fresh launch stories below; pick the angle per channel. *(The v21 posts above are stale at "174 skills" — refresh those numbers before reusing them, or use the wave-2 copy here.)*

## New assets & links (all live)
- **REST API:** https://pm-skills-mcp.pm-claude-skills.workers.dev/v1/skills
- **Connectors (n8n · Lovable · Obsidian):** https://github.com/mohitagw15856/pm-claude-skills/tree/main/connectors
- **Professional Brain (architecture):** https://github.com/mohitagw15856/pm-claude-skills/blob/main/BRAIN.md
- **In-browser Brain:** https://mohitagw15856.github.io/pm-claude-skills/brain.html
- **Quickstart:** https://github.com/mohitagw15856/pm-claude-skills/blob/main/BRAIN_QUICKSTART.md
- **Install anywhere:** `npx pm-claude-skills add --agent claude` · `pip install pm-skills` · hosted MCP URL above

---

## Story A — "Skills that remember and act" (the Professional Brain)
*Best angle for Hacker News and LinkedIn — it's a systems/architecture story, not a feature dump.*

### A1. Hacker News — Show HN

**Title** (factual, contrarian, no hype):
> Show HN: A local, grep-able markdown memory for AI agents — no vector DB

**Body:**
> I maintain an open-source library of "skills" (structured `SKILL.md` files that teach Claude/
> ChatGPT to produce real professional work — PRDs, postmortems, launch plans). The recurring
> complaint was that every run starts cold: you re-paste context, and the *why* behind last
> month's decisions evaporates.
>
> So I added a memory layer, and deliberately did the un-trendy thing: **no vector database, no
> embeddings.** It's a plain `brain/` folder of markdown — `knowledge/`, `decisions/`,
> `hypotheses/`, `stakeholders/`, `entities/`, `source/`. Skills read the relevant files before
> they answer and append outcomes back after. Recall is a deterministic grep that ranks hits by a
> **provenance tag** on every fact (`[data]` / `[interview]` / `[verbal]` / `[hunch]`), so a hunch
> never gets laundered into a measured result. It's all human-readable and Obsidian-compatible —
> you can open the graph and correct it by hand.
>
> The write-back and the *action* layer are the parts I was most nervous about, so they're
> dry-run by default, append-only (decisions never overwrite — they accrete), and approval-gated
> per risky action before anything opens a ticket or posts a message.
>
> Why markdown over a vector store: I wanted memory I can diff, audit, and grep — not a black box
> I have to trust. For a single product's context it's been more useful than retrieval, and a lot
> easier to debug.
>
> Quickstart (a folder + one file): https://github.com/mohitagw15856/pm-claude-skills/blob/main/BRAIN_QUICKSTART.md
> MIT. Curious where people think deterministic markdown memory breaks down vs. embeddings.

*First action after posting: reply to the first few comments fast; the embeddings-vs-markdown debate is the thread.*

### A2. X / Twitter thread

**1/**
> AI tools forget everything between sessions. So you re-paste the same context forever, and last
> quarter's decisions lose the "why."
>
> I gave my open-source AI skills a memory. No vector DB — just markdown you can grep. 🧵

**2/**
> It's a `brain/` folder: knowledge, decisions, hypotheses, stakeholders.
> Skills read it before they answer and write outcomes back after.
>
> Every fact carries a provenance tag — `[data]`, `[interview]`, `[verbal]`, `[hunch]` — so a
> gut call never gets treated like a measured one.

**3/**
> The scary part — letting it *act* (open tickets, post updates) — is dry-run by default,
> append-only, and approval-gated per risky action.
>
> Nothing happens silently. Decisions accrete; they never overwrite.

**4/**
> Why markdown instead of embeddings? I wanted memory I can diff, audit, and fix by hand. Open
> the folder as an Obsidian vault and it's a graph of what you know.

**5/**
> It's the memory layer for 206 open-source skills (PRDs, roadmaps, postmortems…), MIT.
>
> Try the in-browser version, no install: https://mohitagw15856.github.io/pm-claude-skills/brain.html?ref=x
> ⭐ https://github.com/mohitagw15856/pm-claude-skills

### A3. LinkedIn

> Every AI tool has the same blind spot: it forgets. You re-explain your product every session,
> and the reasoning behind past decisions just disappears.
>
> So I built a memory layer for my open-source AI skills — and skipped the vector database on
> purpose. It's plain markdown: a `brain/` folder of knowledge, decisions, hypotheses, and
> stakeholders that the skills read before they answer and write back to after. Every fact is
> tagged with where it came from, so a hunch is never mistaken for data. And when a skill acts on
> its own advice — opening tickets, posting an update — it previews first and waits for your
> approval. Nothing happens silently.
>
> The point: memory you can read, diff, and correct by hand — not a black box you have to trust.
>
> Free, MIT, and there's an in-browser version to try in a minute. Link in comments 👇

*(Link in the first comment — LinkedIn suppresses posts with outbound links in the body.)*

---

## Story B — "Your AI skills, now everywhere" (Integrations + REST API)
*Best angle for X, Reddit, and Product Hunt — it's a "use it in the tools you already live in" story.*

### B1. X / Twitter thread

**1/**
> 206 open-source AI skills (PRDs, launch plans, postmortems…) just stopped being Claude-only.
>
> One read-only REST API → now they run inside n8n, power Lovable apps, and live in your Obsidian
> vault. 🧵

**2/**
> **n8n:** drop the hosted MCP connector into an AI Agent node, or `GET /v1/skills/{name}` from an
> HTTP Request node. Now any automation can turn a trigger into a structured PRD / exec update / GTM plan.

**3/**
> **Obsidian:** every skill exports as a vault note — run it as a Copilot/Text-Generator prompt on
> the note you're in. Your skills and your knowledge base, same place.

**4/**
> **Lovable:** a paste-in knowledge snippet teaches its generator to wire the skills into any app
> it builds — "add a PRD generator" just works, backed by the API.

**5/**
> It's one read-only, no-auth, CORS-open API:
> `GET https://pm-skills-mcp.pm-claude-skills.workers.dev/v1/skills`
>
> Same catalogue as the MCP connector — for any HTTP/no-code tool (Make, Zapier, Retool…).

**6/**
> 206 skills, 21 professions, 196 eval-scored (avg 4.8/5). MIT.
> Browser, your own key, no install: https://mohitagw15856.github.io/pm-claude-skills/?ref=x
> ⭐ https://github.com/mohitagw15856/pm-claude-skills

### B2. Reddit (r/ClaudeAI, then r/n8n, r/ObsidianMD, r/ProductManagement)

**Title:** I made my 206 open-source AI skills runnable in n8n, Obsidian, and Lovable via one REST API

**Body:**
> A while back I open-sourced a library of structured `SKILL.md` files that teach Claude/ChatGPT to
> produce real professional work (PRDs, roadmaps, postmortems — 206 now, 21 professions, MIT).
> The ask I kept getting was "great, but I don't live in Claude Code."
>
> So everything is now reachable through a read-only, no-auth REST API (the same catalogue the MCP
> connector serves):
> - **n8n** — MCP Client node, or an HTTP Request node hitting `/v1/skills/{name}`, feeds the skill
>   into your own AI node. Trigger → structured artifact → wherever (Slack/Notion/a ticket).
> - **Obsidian** — every skill exports as a vault note you can run as a Copilot / Text Generator prompt.
> - **Lovable** — a knowledge snippet so its app generator can wire the skills in.
>
> API: https://pm-skills-mcp.pm-claude-skills.workers.dev/v1/skills · Repo: https://github.com/mohitagw15856/pm-claude-skills
>
> What tool should it plug into next?

*Tailor the first line per subreddit (r/n8n: lead with the node; r/ObsidianMD: lead with the vault). Read each sub's self-promo rules; don't blast all at once.*

### B3. LinkedIn

> Your AI skills shouldn't be locked to one app.
>
> I open-sourced 206 professional AI skills — PRDs, launch plans, postmortems, the structure a
> senior pro actually uses. They started as Claude-only. Now a single read-only REST API puts them
> wherever you already work:
>
> → Automate them in **n8n** (a trigger becomes a finished doc)
> → Run them in your **Obsidian** vault, on the note you're editing
> → Build apps on them with **Lovable**
>
> Same skills, no install, your own model key. 206 skills, 21 professions, MIT.
>
> Link in comments 👇 Where would you want to run them?

### B4. Product Hunt

**Name:** PM Skills — 206 AI skills, now in n8n, Obsidian & Lovable
**Tagline:** One REST API puts pro-grade AI skills in the tools you already use
**Description:**
> 206 open-source skills that teach AI to produce real professional work — now reachable through a
> read-only REST API, so they run inside n8n automations, your Obsidian vault, and Lovable apps,
> not just Claude. Eval-scored, chainable, MIT.

**First comment (maker):**
> Hey PH 👋 The #1 thing people told me about my AI-skills library was "I don't live in Claude
> Code." So I added a no-auth REST API and wired up n8n, Obsidian, and Lovable — same 206 skills,
> wherever you work. There's also a new memory layer (a local markdown "brain" the skills read and
> write). Free, your own key. What tool should it plug into next?
