# Show HN — ready-to-post copy

**The angle that works on HN:** not "look at my 1,117 skills" (dies), but a *lesson learned* or a *provocation*. HN upvotes the insight, then discovers the repo. Ship it Tue–Thu, ~8–10am ET, and be present in the comments all day.

> ⚠️ Post this **after** the README hero + persona packs are live, so the traffic converts. One shot per repo, roughly.

---

## Title (pick one)
- **Show HN: I wrote 1,117 Agent Skills to find where LLMs are actually weak**
- **Show HN: Plain-markdown skills that make Claude/ChatGPT do real-world tasks to a pro's standard**
- **Show HN: A skill library for life's hardest paperwork — leases, layoffs, grief, debt**

## Body

> I've been building an open-source library of "Agent Skills" — plain-markdown `SKILL.md` files that teach an AI assistant to do *one* real task to a senior professional's standard: decode a lease, run a blameless postmortem, negotiate a raise, notify everyone after a death, respond to a wage garnishment.
>
> What started as a catalogue became an experiment in where LLMs fall down. A few things I learned writing 1,117 of them:
>
> - **LLMs are "too correct."** On open-ended tasks they give the safe, average, textbook answer. The skills that work hardest are the ones that force a *specific* framework — severity scales, decision rules, output templates — instead of vibes.
> - **The highest-value skills aren't the work ones.** The lease decoder and the "money in crisis" triage get more use than any PRD template. People are drowning in life's paperwork, and generic AI gives them filler.
> - **Format is portable, runtime isn't.** Each skill is markdown with no runtime — it renders to Claude, ChatGPT, Gemini, Cursor, Codex and 8 more tools from one source. No lock-in, no telemetry.
>
> Everything runs free in the browser (no key needed to try), it's MIT-licensed, and every skill passes a spec conformance gate + a security audit in CI.
>
> Playground: [link] · Repo: [link]
>
> Happy to talk about the SkillSpec standard, the CI gates, or why "too correct" is the real LLM failure mode. What tasks do *you* wish your AI did to a real professional's standard?

## Comment-thread prep (have these ready)
- **"Isn't this just prompts?"** → Yes, disciplined ones — a spec (inputs, framework, output, quality checks, anti-patterns) + a conformance gate, so quality is enforced not hoped. Link SKILLSPEC.md.
- **"How is this different from Anthropic's official skills?"** → Complementary; this is a large, standardized, multi-tool, life-*and*-work library with a browser Playground and a security audit. MIT.
- **"Security?"** → `skill-audit.mjs` scans every skill for injection/exfiltration in CI; and there's a `skill-vetting` skill for auditing *anyone's* skills before install.
- **Have the demo GIF ready to drop as the first comment.**
