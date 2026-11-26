# Worked Example — RICE Prioritisation

## The brief

FreshCrate is an online grocery marketplace with ~250,000 monthly active shoppers across 14 cities. The Q3 2026 backlog has seven candidate initiatives and capacity for roughly three. The primary metric for the quarter is **90-day repeat order rate** (currently 31%). Order data shows 38% of orders contain at least one out-of-stock substitution. The CEO is personally sponsoring a paid loyalty tier ("FreshCrate+") and believes it should top the list. Engineering has flagged that the ageing payments provider must be migrated this year regardless. Reach figures come from last quarter's analytics except where noted.

## The output

### RICE Prioritisation: FreshCrate Q3 2026 Backlog

Goal metric for all scores: 90-day repeat order rate (31% today). Reach = shoppers affected per quarter.

| Initiative | Reach | Impact | Confidence | Effort | RICE Score | Notes |
|------------|-------|--------|------------|--------|------------|-------|
| One-tap reorder from last basket | 120,000 | 1 | 80% | 2 | **48,000** | Quick win — but blocked by payment tokenisation (see dependencies) |
| Smart substitutions v2 | 95,000 | 2 | 80% | 5 | **30,400** | Reach from order data (38% of orders hit an OOS item) |
| Payments provider migration | 250,000 | 0.25 | 100% | 6 | **10,417** | Confidence 100% because reach is deterministic — every checkout passes through it. Unblocks one-tap reorder |
| Post-delivery tip adjustment | 40,000 | 0.25 | 80% | 1 | **8,000** | Quick win — top driver-related support complaint |
| Checkout accessibility rebuild | 60,000 | 0.5 | 80% | 3 | **8,000** | Reach revised down from 250,000 after validation (see below). Tie with tip adjustment broken by the January accessibility-compliance deadline |
| Supplier portal bulk inventory upload | 30,000 | 1 | 50% | 3 | **5,000** | Low-confidence — effort is a PM estimate, engineering has not sized it |
| FreshCrate+ loyalty subscription | 25,000 | 3 | 50% | 8 | **4,688** | Moonshot, low-confidence — CEO disputes the reach estimate (see data gaps) |

**Validation performed:** the accessibility rebuild initially ranked #2 with reach 250,000 ("every shopper uses checkout"). Investigated per process step 7 — the repeat-rate lift concentrates in shoppers using assistive tech or keyboard navigation plus mobile-web users hitting the broken flows, not the whole base. Reach revised to 60,000; the surprising rank disappeared.

#### Recommended Sequence

1. **Payments provider migration (start week 1)** — ranks #3 by score but sequences first: it is a hard dependency for one-tap reorder's payment tokenisation, and engineering must ship it this year regardless. Starting it first lets #2 land inside Q3.
2. **One-tap reorder** — highest RICE score and only 2 person-months; begins as soon as tokenisation is available (~week 6).
3. **Smart substitutions v2** — the strongest direct attack on the repeat-rate problem (38% of orders hit an OOS item); runs in parallel with the migration since it touches a different surface.
4. **Post-delivery tip adjustment** — 1 person-month; slot in alongside the bigger bets.
5. **Checkout accessibility rebuild** — scores level with tip adjustment but carries a January compliance deadline; scheduled to start late Q3 so it completes in Q4 with margin.

**Not this quarter:** FreshCrate+ and the supplier portal. Neither is rejected — both go to the data-gap list below so they can be re-scored for Q4 with real evidence.

#### Quick Wins (high score, low effort)

- **One-tap reorder** — 48,000 score at 2 person-months (once unblocked).
- **Post-delivery tip adjustment** — modest score but 1 person-month and removes the top driver-related complaint.

#### Data Gaps to Address

- **FreshCrate+ reach (owner: PM + research, by week 4).** Scored at 25,000 (10% adoption, analogue benchmarks); the CEO believes 60,000. Note: even at the CEO's number, the score is (60,000 × 3 × 0.5) / 8 = 11,250 — rank #3, still not top. A willingness-to-pay survey settles it either way; confidence stays at 50% until then.
- **Substitutions impact (owner: analytics).** Impact 2 rests on a correlation between OOS experiences and churn; instrument the OOS → repeat-rate link this quarter so the Q4 re-score can move confidence to 100%.
- **Supplier portal effort (owner: engineering lead).** Current 3 person-months is a PM-only guess; get an engineering estimate before this item is scored again.

## Why it's shaped this way

- **Confidence is 50% on FreshCrate+ and the supplier portal** because neither reach estimate has data behind it — the skill explicitly bans defaulting to 100% confidence without supporting evidence, even (especially) on the CEO's pet project.
- **The one 100% confidence score is justified in the Notes column** (reach is deterministic — every checkout passes through payments), so the exception to the "no unexamined 100%" rule carries its reasoning with it.
- **The payments migration sequences first despite ranking #3**, because the skill requires dependency notes to override raw score order — one-tap reorder's top rank is worthless if its blocker starts late.
- **The accessibility rebuild's revised reach is shown, not hidden.** The skill's validation step says investigate any surprising rank; documenting the 250,000 → 60,000 revision keeps the table honest and teaches the team the failure mode.
- **The CEO's disagreement is handled with arithmetic, not politics:** the data-gaps section re-runs the score at the disputed reach and shows the conclusion barely moves — RICE is used to structure the conversation, not end it ("RICE is a tool, not a verdict").
- **Every initiative is scored against the same metric** (90-day repeat order rate), stated above the table — the supplier portal is scored on its indirect shopper effect, not on supplier satisfaction, to avoid mixing goals.
- **Impact scores are spread across the scale** (3 down to 0.25) rather than clustering at "high" — the anti-pattern list warns that uniform impact scores produce no signal.
- **Quick wins and the moonshot are explicitly flagged**, and deprioritised items leave with a named owner and a date for the data that would revive them, so nothing exits the backlog silently.
