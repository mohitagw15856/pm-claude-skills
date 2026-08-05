---
trigger: model_decision
description: "Pick the karaoke song that actually fits your voice and the room — so you land it instead of dying on a key change. Use when asked what karaoke song should I sing, pick me a karaoke song, what should I sing for [occasion], or a song for my voice. Produces a few tailored song picks matched to your range and skill, why each works (and the tricky bit to watch), a crowd-pleaser vs a show-off pick, a group/duet option, and a safe fallback for when nerves hit."
---

# Karaoke Song Picker

The wrong karaoke song is a long three minutes — too high, too fast, or too obscure for the room. This picks songs that fit your actual voice and the crowd, warns you about the one hard part, and always keeps a banker in your back pocket for when the confidence wobbles.

## What This Skill Produces

- **A few tailored picks** — songs matched to your vocal range, skill, and the vibe
- **Why each works + the trap** — the reason it suits you, and the tricky bit (the big note, the fast verse) to prepare for
- **A crowd-pleaser vs a show-off** — one everyone sings along to, one that shows range if you've got it
- **A group/duet option** — so you're not carrying it alone
- **The safe fallback** — a near-guaranteed win if nerves hit or the room's tough

## Required Inputs

Ask for these if not provided:
- **Your voice** — rough range (low/medium/high), and honest skill level
- **The room** — friends, work party, strangers, competitive crowd
- **The vibe** — sing-along fun, impress people, comedic, romantic duet
- **Preferences** — genres/eras you love or refuse, and anything you already nail
- **Solo or group** — flying solo or have a partner/crowd to bring in

## Framework: Fit The Voice, Read The Room

1. **Match the range honestly.** The #1 fail is a song that goes too high — pick within a comfortable range, or a song with an easy escape (talk-sing, drop the octave).
2. **Prize familiarity.** A song the room knows carries you; obscure picks leave you alone up there.
3. **Match energy to skill.** Big vocal showcases reward real singers; everyone else wins with rhythm, attitude, and a crowd chorus.
4. **Flag the hard part.** Name the key change, the sustained note, or the tongue-twister verse so it's not a surprise.
5. **Always hold a banker.** Keep one high-familiarity, low-risk song ready for nerves or a cold crowd.

## Output Format

### Karaoke: [voice/range] · [skill] · [room] · [vibe]

**🎤 Crowd-pleaser:** [song] — works because [familiar/singable]. Watch: [the tricky bit].
**🎤 Show-off (if you've got it):** [song] — shows [range/control]. Watch: [the hard part].
**🎤 Group/duet:** [song] — brings people in.

**Safe fallback:** [near-guaranteed win].
**Tip:** [key change / drop the octave / own the chorus].

## Quality Checks
- [ ] Picks fit the stated vocal range (nothing that forces an impossible high note)
- [ ] Each pick names why it works and the one part to watch
- [ ] Includes both a crowd-pleaser and a range-shower (if skill allows)
- [ ] Offers a group/duet option and a safe fallback
- [ ] Respects genre likes/dislikes and the room

## Anti-Patterns
- **Songs that soar out of range** — the classic karaoke disaster.
- **Obscure picks** the room can't sing along to.
- **Ignoring skill** — handing a casual singer a vocal marathon.
- **No warning** about the key change or big note.
- **No fallback** for nerves or a tough crowd.

## Example Trigger Phrases
- "What karaoke song should I sing? I've got a low voice and I'm not a great singer."
- "Pick me something to impress at a work party."
- "A fun duet for me and my partner."
- "Something everyone will sing along to."
- "I always pick songs too high — give me safe options."
