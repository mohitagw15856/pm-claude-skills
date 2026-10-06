---
name: clip-factory
description: "Turn one long video, podcast, or stream transcript into 8-12 short-form clips — each with a hook line, cut timestamps, captions, and a platform note for TikTok/Reels/Shorts — plus an honesty gate that kills clips that misrepresent the source. Use when someone says 'clip this podcast', 'make shorts from my video', 'what's clippable here', or runs a clipping side hustle. Produces a ranked clip sheet ready for an editor or a clipping app."
homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/clip-factory.html
metadata:
  {
    "openclaw": { "emoji": "🧠" }
  }
---

# Clip Factory Skill

Clipping is a real economy now — creators pay per viral clip, and one
90-minute conversation can feed a channel for two weeks. But most clip sheets
are made by scrubbing for loud moments, which finds volume, not virality. The
clips that travel have a *complete arc in under 60 seconds*: a hook that
creates a question, a middle that pays it, an end that lands before attention
dies. This skill mines a transcript for those arcs, writes the hooks, marks
the cuts — and runs the gate clip farms skip: does this clip mean what the
speaker meant? Out-of-context bait gets engagement and burns the channel that
posted it.

## What This Skill Produces

- A **ranked clip sheet**: 8–12 clips, best first, each with hook text (first
  1.5 seconds on screen), cut timestamps, runtime, and why it works
- **Caption blocks** per clip: on-screen hook, caption text, 3–5 tags that
  are actually about the content
- A **platform note** per clip: where it fits best and any recut (Shorts
  favours faster cold opens; TikTok tolerates 5 more seconds of setup)
- The **honesty gate log**: clips that were strong but cut for
  misrepresentation, and what would make them fair

## Required Inputs

Ask for (if not already provided):
- The transcript, with timestamps if available (or the video/audio to
  transcribe if tooling allows; without timestamps, mark cuts by quote and
  say so)
- Whose channel the clips serve (the creator's own? a clipping account with
  permission?) and the tone that channel runs
- Platform targets and any hard rules (no swearing cuts, brand-safe, etc.)
- What the source is really about — the thesis the clips must not betray

## Framework: what makes a clip travel

1. **Mine for arcs, not moments.** Scan the transcript for: claims that
   surprise ("most people believe X — it's backwards") · stories with a turn ·
   strong disagreements · numbered lists compressible to one item · emotional
   peaks *with their setup nearby*. A great line without its setup is a hook
   with no payoff — check the 30 seconds before it.
2. **Write the hook as a question the viewer must answer.** The first line on
   screen is the whole game: "the mistake every first-time founder makes" beats
   the quote itself. Hook text ≠ first words spoken — it's the overlay that
   makes them stay for the first words spoken.
3. **Cut to the arc, not the clock.** In at the last possible second before
   context is lost; out on the landed line, not the trailing "…so yeah."
   20–45s is the sweet spot; 60s+ needs a mid-clip re-hook to survive.
4. **Run the honesty gate.** For each clip: would the speaker say "yes,
   that's what I meant" seeing it cold? Sarcasm clipped straight, positions
   stated-to-refute, jokes clipped as claims — killed or fixed with a context
   caption. The gate is non-negotiable; it's also self-interest, because
   "misleading clip" replies kill channels slower but just as dead.
5. **Rank by arc-completeness × hook strength**, not by how loud the moment
   was. Note the one clip most likely to travel and why.

## Output Format

```
## Clip sheet: [source title] ([N] clips from [runtime])
### 1. [Working title] — [in]–[out] ([runtime]s) ⭐ best bet
Hook (on screen ≤1.5s): "…"
Arc: [setup → turn → landing, one line]
Captions: [text] · Tags: [3-5]
Platform: [fit + recut note]
[…repeat, ranked…]

## Killed at the honesty gate
| Clip | Why killed | What would make it fair |
```

## Quality Checks

- [ ] Every clip has a complete arc — hook, payoff, landing — verifiable from
      the quoted timestamps
- [ ] Hooks create a question; zero hooks are just the quote restated
- [ ] The honesty gate ran and its log is present (even when empty: "nothing
      cut")
- [ ] Tags describe the content, not trending-tag spam
- [ ] Cut points respect sentence boundaries — no clips ending mid-thought
      unless the cliffhanger is the point and the payoff is in the caption

## Anti-Patterns

- [ ] Do not clip sarcasm, hypotheticals, or steelmanned opposing views as
      sincere claims — that's the gate's kill list
- [ ] Do not write rage-bait hooks the content can't cash
- [ ] Do not produce 30 mediocre clips instead of 10 good ones — the sheet is
      ranked and short because editor time is the scarce resource
- [ ] Do not ignore rights: clipping someone else's content needs their
      permission or their program's terms — ask whose channel this serves

## Related

[[youtube-script]] writes the long-form these clips come from;
[[thumbnail-creator]] for the packaging; [[viral-content-framework]] for why
the hooks work.

## Example Trigger Phrases

- "Clip this podcast."
- "Make shorts from my video."
- "What's clippable here?"
