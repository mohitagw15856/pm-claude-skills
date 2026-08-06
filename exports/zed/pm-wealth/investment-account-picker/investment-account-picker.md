# Investment-Account Picker

*Where* you hold your investments can matter as much as *what* you invest in — the right tax-advantaged account can save you thousands, and using the wrong wrapper (or missing free ones) leaves money on the table. But account types are a confusing, jurisdiction-specific alphabet soup. This explains the common *categories* in plain language, matches them to your goals, and gives a sensible priority order — then sends you to verify the specifics locally. Not financial advice.

## What This Skill Produces

- **The account categories, plainly** — the common types by *purpose* (retirement/tax-advantaged, general/taxable brokerage, education/other goal-specific, and short-term/cash) — described generically since names vary by country
- **Goal-to-account matching** — which kind of account fits which money (retirement money vs. a house deposit vs. general investing)
- **A priority order** — the sensible sequence (e.g. grab any matched retirement account first — free money — then other tax-advantaged, then taxable)
- **The free-benefits check** — the tax breaks and employer matches people commonly miss
- **What to verify locally** — a clear flag that exact account names, limits, and rules are jurisdiction-specific and must be confirmed

## Required Inputs

Ask for these if not provided:
- **Your goals** — what the money is for and when you'll need it (retirement, a home, general growth, near-term)
- **Your region** — the key input, since accounts and tax are country-specific
- **What you have access to** — an employer retirement plan/match, existing accounts
- **Your situation** — employed/self-employed, and any known contribution room

## Framework: Match Money To Wrapper, In The Right Order

1. **Sort by purpose.** Group the money by goal and timeline — retirement money, a specific goal (house, education), general investing, and short-term cash each suit different account types.
2. **Explain the categories generically.** Because names differ by country, describe the *kinds* (tax-advantaged retirement, taxable/general, goal-specific, cash) and what each is for.
3. **Grab free money first.** Any employer match is an instant return — prioritize capturing it before anything else.
4. **Then tax-advantaged, then taxable.** Generally: max sensible tax-advantaged space for the goal, then use a taxable/general account for the rest. Match near-term money to safe/cash accounts, not market-risk ones.
5. **Flag the free-benefit misses.** Unclaimed matches, unused tax-advantaged room, and holding long-term money in low-return cash are the common leaks.
6. **Send them to verify.** Exact account names, contribution limits, and tax rules are jurisdiction-specific — clearly direct them to confirm locally.

## Output Format

### Account picker: goals [x] · [region]

**Your money, by purpose**
| This money (goal/timeline) | Suits this kind of account |
|---|---|
| [retirement] | [tax-advantaged retirement type] |
| [a specific goal] | [goal-specific or general] |
| [general investing] | [taxable/general] |
| [near-term/cash] | [cash/safe — not market risk] |

**Priority order:** grab employer match (free) → tax-advantaged space → taxable/general.
**Free benefits you might be missing:** [unclaimed match · unused tax-advantaged room · long-term money sitting in cash].
**Verify for [region]:** exact account names, limits, and tax rules.

> Not financial advice. Account types, names, limits, and tax treatment are jurisdiction-specific — confirm locally or with a fee-only adviser.

## Quality Checks
- [ ] Explains account categories by purpose, generically (names vary by country)
- [ ] Matches the person's goals/timelines to account types
- [ ] Prioritizes capturing free money (match) first
- [ ] Gives a sensible tax-advantaged-then-taxable order
- [ ] Flags commonly-missed free benefits
- [ ] Clearly states account rules are jurisdiction-specific; not financial advice

## Anti-Patterns
- **Naming specific country accounts** as if universal.
- **Ignoring the employer match** (free money) priority.
- **Putting near-term money** into market-risk accounts.
- **Missing unused tax-advantaged room.**
- **Presenting as personalized financial advice.**

## Example Trigger Phrases
- "Which type of account should I invest through?"
- "What's the difference between all these account types?"
- "Where should I put money for retirement vs. a house deposit?"
- "Explain tax-advantaged accounts — am I missing free benefits?"
- "I have savings to invest — which account is right?"
