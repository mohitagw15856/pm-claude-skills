# Worked Example — Discovery Interview Guide Skill

A gold-standard run of this skill: an interview guide built to test a problem the CEO already "knows" the answer to — without letting that answer leak into a single question.

## The brief

Harbourline sells a front-desk PMS to ~340 independent boutique hotels (20–80 rooms). The CEO is convinced the next product is a housekeeping mobile app and wants it validated "quickly." PM Rosa Adeyemi negotiates one step back: 8 one-hour discovery interviews to establish whether *room-turn coordination* is a painful, frequent problem at all — before any app is designed. Known hazard: two customer-success anecdotes suggest housekeepers at these properties often don't carry phones on the floor, and several teams work across language barriers, so "housekeepers want an app" is a hypothesis to protect against, not confirm.

## The output

### Discovery Interview Guide — Room-Turn Coordination at Independent Hotels — June 2026

**Research Goal:** Decide whether room-turn coordination between housekeeping and the front desk is a frequent, costly problem for independent hotels (20–80 rooms) — informing a go/no-go on a Q4 housekeeping module discovery track.
**Target Participant Profile:** GM or operations manager at an independent (non-chain) hotel of 20–80 rooms, who personally built or supervised the housekeeping room-assignment plan within the last 30 days.

**Screener Questions** (for recruiting):
1. "How many rooms does your property have, and is it independently owned or part of a chain or franchise group?" → Must answer: 20–80 rooms, independent (≤2 properties under same ownership)
2. "Think back to yesterday or your last operating day — who decided which rooms each housekeeper cleaned, and in what order? What was your part in that?" → Must answer: participant made the assignments personally or directly supervised the person who did
3. "Which property-management system do you use, and do you actively use a housekeeping module inside it today?" → Disqualify if: actively using an integrated housekeeping module (their coordination problem is already solved; we'd be interviewing about switching, not about the problem)

**Interview Guide:**

**1. Warm-Up (5 min)** — rapport only, no topic yet
- "Tell me a bit about your property and what a typical day looks like for you."
- "What tools or systems do you rely on most to run the hotel day-to-day?"

**2. Context Setting (10 min)**
- "Walk me through how a room goes from guest checkout to guest-ready on a busy Saturday — start to finish."
- "Who's involved in that, and how does information move between them?"
- "How do you find out a room is ready? How does housekeeping find out a guest checked out late?"

**3. Problem Exploration (25 min) — THE CORE**

⚠️ *Interviewer note: Harbourline, the app concept, and the word "app" do not exist during this phase. If the participant asks what we're building, answer "we're still deciding — that's why we're here" and return the question.*

- "Tell me about the last time a guest arrived before their room was ready. What happened, minute by minute?"
- "What was the hardest part of that for you personally?"
- "How did you handle it in the moment? What did you try before settling on that?"
- "What did that cost you?" *(probe all four: time, money — comp night, upgrade — stress, reputation — review, walked guest)*
- "How often does something like that happen in a normal month?"
- "Tell me about the last time housekeeping and the front desk had different pictures of which rooms were ready. How did you find out?"
- "If you could wave a magic wand and change one thing about how room status moves around your hotel, what would it be?"

*Confirmation-bias rewrite, kept in the guide as a reminder:* the draft question from the product team — "Don't you find WhatsApp chaotic for tracking room status?" — was cut. Its replacement is above: "How does room status get from housekeeping to the front desk today?" Let them call it chaotic, or not.

**4. Current Solutions (10 min)**
- "What do you use today to track room status — boards, printed sheets, radios, group chats, the PMS?"
- "What do you like about that setup? What frustrates you about it?"
- "Have you tried anything else — other tools, other routines? What happened?"
- "How do instructions reach a housekeeper who's mid-floor — and does that work the same for every member of the team?" *(listens for the no-phones-on-floor and language-barrier reality without proposing an app)*

**5. Wrap-Up (10 min)**
- "Is there anything about turning rooms we haven't covered that you think I should know?"
- "Is there anyone else — maybe your head housekeeper — you'd recommend I speak to?"
- "Would you be open to a follow-up if I have more questions?"

**Synthesis Template** (fill after each interview, never during):
- Key quote: "[verbatim]"
- Core pain: [1 sentence]
- Current workaround: [what they're doing today — board, chat, radio, sheet]
- Intensity (1–5): [how painful — anchor 5 to "comped a room or walked a guest over it in the last quarter"]
- Surprise/unexpected finding: [anything that challenged our assumptions — especially anything about how housekeepers actually receive information]

**Pattern Detection** (after 5+ interviews; planned n = 8):
- Pain mentioned by [X/8] participants: [theme]
- Workaround used by [X/8] participants: [theme]
- Cost type most often cited unprompted: [time / money / stress / reputation]
- Most emotionally charged moment in interviews: [observation]
- Evidence for/against the phones-on-floor assumption: [what participants said about how housekeepers get information — count both directions]

## Why it's shaped this way

- **Every problem question is anchored to a past event** ("the last time a guest arrived before their room was ready") — Core Principle 1 and the quality checks ban future-tense questions outright: "'Would you use X?' tells you nothing."
- **The app never appears — not in the screener, not in any question** — and the guide carries an inline interviewer note with a scripted deflection, because the quality check requires the product stay unmentioned "until after pain is confirmed" and the anti-patterns warn that mentioning it "anchors the participant's responses and invalidates the discovery."
- **Screener Q2 asks what the participant did yesterday, not what they think or want** — the anti-pattern says screeners must not be "too easy to pass"; a behaviour question ("who decided, and what was your part?") is hard to guess the right answer to, unlike "are you responsible for housekeeping?"
- **The disqualifier removes hotels already using an integrated housekeeping module** — recruiting people whose problem is solved would produce switching-cost conversations, not problem discovery; the Output Format requires an explicit disqualify condition.
- **The team's leading question is shown crossed out with its open rewrite** — the Guidelines require flagging confirmation bias and rewriting questions "that lead toward a predetermined answer as open-ended alternatives"; keeping the rewrite visible trains the interviewer, not just the document.
- **The CEO's hypothesis gets a trap laid for it, in both directions** — the Current Solutions question about how instructions reach a mid-floor housekeeper, and the pattern-detection row counting evidence *for and against* the phones-on-floor assumption, let the risky assumption be tested without ever proposing the app.
- **Pattern detection is gated at 5+ interviews with counts out of the planned 8** — the anti-patterns forbid synthesising across fewer than 5 interviews ("themes from 2–3 interviews reflect anecdote, not pattern"), and the X/8 format forces frequency claims instead of vibes.
- **The cost question probes all four cost types** (time, money, stress, reputation) exactly as the Interview Structure specifies — comp nights and bad reviews are the numbers that will eventually size the business case, and they only surface if asked for.
